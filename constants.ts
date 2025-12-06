import { Category, Vendor, Narrative } from './types';

export const CATEGORIES: Category[] = [
  { id: "plan", name: "Planning", defaultWeight: 0.15 },
  { id: "crm", name: "CRM", defaultWeight: 0.15 },
  { id: "agg", name: "Agg/API", defaultWeight: 0.12 },
  { id: "rep", name: "Reporting", defaultWeight: 0.10 },
  { id: "ui", name: "UI/UX", defaultWeight: 0.10 },
  { id: "int", name: "Integrations", defaultWeight: 0.10 },
  { id: "work", name: "Workflow", defaultWeight: 0.08 },
  { id: "bill", name: "Billing", defaultWeight: 0.05 },
  { id: "comp", name: "Compliance", defaultWeight: 0.05 },
  { id: "onb", name: "Onboarding", defaultWeight: 0.05 },
  { id: "price", name: "Pricing", defaultWeight: 0.05 }
];

export const VENDORS: Vendor[] = [
  { name: "RightCapital", scores: [10, 5, 9, 6, 9, 8, 7, 5, 6, 8, 9] }, // Strong Plan/UI/Agg
  { name: "Wealthbox", scores: [4, 10, 7, 5, 10, 10, 9, 4, 5, 9, 9] }, // Elite CRM/UI
  { name: "Redtail", scores: [5, 8, 6, 5, 6, 9, 7, 5, 7, 7, 9] }, // Solid CRM, older UI
  { name: "Advyzon", scores: [6, 8, 8, 10, 7, 7, 8, 9, 7, 8, 7] }, // All-in-one, strong reporting
  { name: "Orion", scores: [7, 5, 9, 10, 6, 9, 8, 9, 9, 7, 4] }, // Enterprise reporting, complex
  { name: "Black Diamond", scores: [6, 4, 8, 10, 9, 7, 7, 8, 6, 7, 3] }, // High end reporting/UI, expensive
  { name: "eMoney", scores: [10, 5, 9, 7, 6, 7, 6, 6, 7, 6, 5] }, // Deep planning, older UX
  { name: "Salesforce FSC", scores: [5, 9, 8, 7, 6, 9, 10, 6, 8, 5, 2] }, // Enterprise CRM, expensive
  { name: "RIA in a Box", scores: [2, 3, 2, 2, 7, 6, 9, 2, 10, 10, 7] } // Specialist: Compliance/Onboarding
];

export const NARRATIVES: Record<string, Narrative> = {
  "RightCapital": {
      pros: ["Modern UI/UX", "Strong Tax & Cash Flow Viz", "Good Aggregation"],
      cons: ["Less Estate Planning depth than eMoney", "Newer entrant"],
      bestFor: "The 'v1' Launch Stack recommendation."
  },
  "Wealthbox": {
      pros: ["Modern 'social' design", "Zero training time", "Strong API"],
      cons: ["Light on compliance features", "Not an all-in-one"],
      bestFor: "Agile firms prioritizing speed & UX."
  },
  "Redtail": {
      pros: ["Industry standard", "Deep workflow history", "Cost effective"],
      cons: ["Dated Interface", "Slower innovation cycle"],
      bestFor: "Firms wanting the 'safe' standard choice."
  },
  "Advyzon": {
      pros: ["True All-In-One (CRM+Rep+Bill)", "Single database structure", "High support touch"],
      cons: ["Planning module is basic", "Proprietary ecosystem"],
      bestFor: "Advisors wanting one login for everything."
  },
  "Orion": {
      pros: ["Massive integration marketplace", "Deepest reporting/billing", "Trading capabilities"],
      cons: ["Overkill for <$100M AUM", "Steep learning curve", "Expensive"],
      bestFor: "Scaling firms anticipating >500 clients."
  },
  "Black Diamond": {
      pros: ["Beautiful client portal", "Excellent alternative asset reporting", "Concierge service"],
      cons: ["Very expensive", "Weak CRM (recommends integration)"],
      bestFor: "High-Net-Worth / Boutique focus."
  },
  "eMoney": {
      pros: ["Gold standard for cash flow", "Deep estate planning", "Client portal is sticky"],
      cons: ["Expensive", "UI feeling dated vs RightCapital"],
      bestFor: "Planning-centric firms doing deep estate work."
  },
  "Salesforce FSC": {
      pros: ["Infinite customization", "Enterprise scale", "Ecosystem"],
      cons: ["Requires consultant to setup", "Very expensive", "Overwhelming"],
      bestFor: "Large enterprises (> $1B AUM)."
  },
  "RIA in a Box": {
      pros: ["Automated compliance calendar", "Registration expertise", "Audit prep tools"],
      cons: ["Specialist tool (not a core stack replacement)", "Separate login"],
      bestFor: "Firms needing a dedicated Compliance OS."
  }
};