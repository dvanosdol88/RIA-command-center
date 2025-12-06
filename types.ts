export interface Category {
  id: string;
  name: string;
  defaultWeight: number;
}

export interface Vendor {
  name: string;
  scores: number[]; // Maps to category indices
}

export interface Narrative {
  pros: string[];
  cons: string[];
  bestFor: string;
}

export interface VendorResult extends Vendor {
  finalScore: number;
}

export interface WeightState {
  [categoryId: string]: number; // 0 to 100 integer
}

export type ViewState = 'dashboard' | 'cards' | 'matrix' | 'dependency';
