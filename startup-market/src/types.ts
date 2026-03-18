export interface StartupMetrics {
  mrr: string;
  growth: string;
  users: string;
  retention: string;
}

export interface Startup {
  id: number;
  name: string;
  logo: string;
  hero: string;
  tagline: string;
  sector: string;
  stage: string;
  location: string;
  raise: string;
  equity: string;
  minInvestment: string;
  valuation: string;
  description: string;
  metrics: StartupMetrics;
  tags: string[];
  founded: string;
  team: number;
  views: number;
  savedBy: number;
  raised: string;
  founderName: string;
  founderId: number;
  deck: boolean;
  video: boolean;
  gradient: string;
}

export interface Investor {
  id: number;
  name: string;
  avatar: string;
  title: string;
  fund: string;
  location: string;
  totalInvested: string;
  portfolio: number;
  sectors: string[];
  stages: string[];
  ticketSize: string;
  bio: string;
  deals: string[];
  joined: string;
  verified: boolean;
  initials: string;
  gradient: string;
}

export interface UserData {
  role: "investor" | "startup";
  name?: string;
  title?: string;
  fund?: string;
  bio?: string;
  sectors?: string;
  stages?: string;
  ticket?: string;
  geo?: string;
  startupName?: string;
  tagline?: string;
  sector?: string;
  stage?: string;
  raise?: string;
  viewed?: number;
  saved?: number;
  requests?: number;
  views?: number;
  raised?: string;
  [key: string]: string | number | undefined;
}

export interface TabDef {
  key: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}
