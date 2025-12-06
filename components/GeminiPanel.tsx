import React, { useState } from 'react';
import { VendorResult, WeightState } from '../types';
import { analyzeSelection } from '../services/geminiService';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface GeminiPanelProps {
  winner: VendorResult;
  allResults: VendorResult[];
  weights: WeightState;
}

const GeminiPanel: React.FC<GeminiPanelProps> = ({ winner, weights, allResults }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await analyzeSelection(winner, weights, allResults);
      setAnalysis(result);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 rounded-lg p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h3 className="text-indigo-300 font-bold uppercase text-xs tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          AI Consultant
        </h3>
        {!analysis && !loading && (
          <button 
            onClick={handleAnalyze}
            className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-full transition shadow-lg shadow-indigo-900/50 flex items-center gap-1"
          >
            Analyze Selection
          </button>
        )}
      </div>

      <div className="relative z-10 min-h-[80px]">
        {loading ? (
          <div className="flex items-center justify-center h-full py-4 text-indigo-400 animate-pulse gap-2">
             <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing strategy...
          </div>
        ) : error ? (
           <div className="flex items-center justify-center h-full py-4 text-red-400 gap-2 text-sm">
             <AlertCircle className="w-4 h-4" /> Service unavailable.
          </div>
        ) : analysis ? (
          <div className="prose prose-invert prose-sm">
             <p className="text-slate-200 text-sm leading-relaxed">{analysis}</p>
             <button 
                onClick={handleAnalyze}
                className="mt-4 text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 uppercase tracking-wide font-bold"
              >
                <RefreshCw className="w-3 h-3" /> Refresh Analysis
              </button>
          </div>
        ) : (
          <p className="text-slate-500 text-sm italic">
            Tap the analyze button to get a Gemini-powered executive summary of why {winner.name} fits your specific weighting criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default GeminiPanel;
