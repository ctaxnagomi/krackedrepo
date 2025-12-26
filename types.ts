
export interface FileData {
  name: string;
  content: string;
  type: string;
}

export interface TechItem {
  name: string;
  role: string;
}

export interface MVPData {
  projectName: string;
  tagline: string;
  overview: string;
  techStack: TechItem[];
  features: string[];
  roadmap: string[];
  suggestedMvpVersion: string;
  valuationUSD: number;
  valuationMYR: number;
}

export interface Funder {
  name: string;
  amount: number;
  date: string;
}

export interface AppState {
  isConverting: boolean;
  mvpData: MVPData | null;
  backers: Funder[];
  showSponsorModal: boolean;
  activeTab: 'overview' | 'tech' | 'funding' | 'community';
}
