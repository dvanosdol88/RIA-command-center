import { GoogleGenAI } from "@google/genai";
import { VendorResult, WeightState } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const formatContext = (weights: WeightState, results: VendorResult[]) => {
  const weightsText = Object.entries(weights)
    .filter(([_, v]) => v > 0)
    .map(([k, v]) => `${k}: ${v}%`)
    .join(', ');

  const ranking = results.slice(0, 5).map((r, i) => `${i + 1}. ${r.name} (${r.finalScore})`).join('\n');

  return `
    Current Configuration:
    Weights: ${weightsText}
    
    Top Rankings:
    ${ranking}
  `;
};

export const analyzeSelection = async (
  winner: VendorResult,
  weights: WeightState,
  allResults: VendorResult[]
): Promise<string> => {
  try {
    const context = formatContext(weights, allResults);
    const prompt = `
      You are an expert RIA technology consultant following a specific Philosophy:
      1. Non-Custodial Orientation (Assets stay at Fidelity/Schwab).
      2. Anti-Bloat (Systems must be simple & stable).
      3. API-First (Avoid screen scraping).
      
      ${context}

      Task:
      Provide a concise, executive summary (max 150 words).
      1. Validate why ${winner.name} is the correct choice based specifically on the user's highest weighted categories.
      2. Mention one trade-off or risk compared to the runner-up (${allResults[1]?.name}).
      3. Use a professional, strategic tone.
    `;

    // Using gemini-3-pro-preview for complex reasoning and strategic analysis
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });

    return response.text || "Analysis could not be generated at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to connect to the Consultant AI. Please verify your API Key.";
  }
};

export const compareVendors = async (
  target: VendorResult,
  winner: VendorResult,
  weights: WeightState
): Promise<string> => {
  try {
    // Using gemini-2.5-flash for fast, tactical comparisons
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Compare ${target.name} vs ${winner.name} (The Winner).
        Context: The user values these weights: ${Object.entries(weights).filter(e => e[1] > 0).map(e => `${e[0]}=${e[1]}`).join(',')}.
        Scores: ${target.name}=${target.finalScore}, ${winner.name}=${winner.finalScore}.
        
        Provide a 2-sentence reason why ${target.name} lost to ${winner.name}, focusing on the weighted categories where they fell short.
      `,
    });
    return response.text || "Comparison unavailable.";
  } catch (error) {
    return "AI comparison unavailable.";
  }
};

export const getVendorInsight = async (
    vendor: VendorResult,
    weights: WeightState
): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `
                Analyze ${vendor.name} for an RIA.
                User Priorities: ${Object.entries(weights).filter(e => e[1] > 10).map(e => `${e[0]}`).join(', ')}.
                
                Philosophy:
                - Prefer API/OAuth over scraping.
                - Prefer simple/stable over complex/bloated.
                
                Provide 3 concise bullet points on how this vendor fits this philosophy.
            `
        });
        return response.text || "Insight unavailable.";
    } catch (error) {
        return "Insight unavailable.";
    }
}

export const getChatResponse = async (
  history: {role: 'user' | 'model', text: string}[],
  message: string,
  weights: WeightState,
  results: VendorResult[]
): Promise<string> => {
  try {
    const systemInstruction = `
      You are an intelligent assistant for the RIA Command Center.
      You MUST adhere to the "Technology & Vendors Master Document" philosophy:
      - Technology must enhance clarity.
      - Systems must be simple and stable.
      - Favor API-first integrations (Tier 1).
      - Avoid screen-scraping (Tier 3).
      - Non-custodial orientation.
      
      Current Matrix Context:
      ${formatContext(weights, results)}
      
      Keep answers concise (under 100 words) and helpful.
    `;

    // Using gemini-2.5-flash for interactive chat
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I didn't catch that.";
  } catch (error) {
    console.error(error);
    return "Sorry, I'm having trouble connecting right now.";
  }
};
