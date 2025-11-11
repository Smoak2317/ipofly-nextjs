export interface GmpHistory {
  date: string;
  gmp: string;
  ipoPrice?: string;
  expectedPrice?: string;
}

export interface SubscriptionHistory {
  category: string;
  subscriptionTimes: string;
  sharesOffered: string;
  sharesBid: string;
}
export interface AIAnalysis {
  rating: 'STRONG_APPLY' | 'APPLY' | 'CONSIDER_APPLYING' | 'NEUTRAL' | 'AVOID' | 'STRONG_AVOID' | 'HIGH_RISK_AVOID';
  score: number;
  recommendation: string;
  riskLevel: 'LOW' | 'LOW_TO_MEDIUM' | 'MEDIUM' | 'MEDIUM_TO_HIGH' | 'HIGH';
  confidence: number;
  factorAnalysis: {
    GMP_Strength: number;
    Subscription_Demand: number;
    Financial_Health: number;
    Valuation_Attractiveness: number;
    Company_Fundamentals: number;
    Market_Sentiment: number;
    Allotment_Probability: number;
    Listing_Gain_Potential: number;
  };
  factorInsights?: Record<string, string>;
  keyMetrics: Record<string, string>;
  applicationStrategy?: {
    suggestedAction: string;
    lotSize: string;
    bidPrice: string;
    riskLevel: string;
  };
  expectedReturns?: {
    listingGain: string;
    probability: string;
  };
  timelineAdvice?: string;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
export interface IPO {
  _id?: string;
  name: string;
  logoUrl?: string;
  category: string;
  status: string;
  gmp: string;
  gmpPercentage?: string;
  issuePrice: string;
  lotSize: string;
  issueSize: string;
  minInvestment: string;
  maxRetailInvestment?: string;
  issueOpenDate: string;
  issueCloseDate: string;
  allotmentDate?: string;
  listingDate?: string;
  expectedListingPrice?: string;
  subscription?: string;
  companyDescription?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  registrarName?: string;
  registrarPhone?: string;
  registrarEmail?: string;
  registrarWebsite?: string;
  gmpHistory?: GmpHistory[];
  subscriptionHistory?: SubscriptionHistory[];
  ipoObjectives?: string[];
  aiAnalysis?: AIAnalysis;
}

export interface ApiResponse {
  success: boolean;
  data: IPO[];
  message?: string;
}

export type CategoryType = 'all' | 'mainboard' | 'sme';
export type StatusType = 'all' | 'upcoming' | 'ongoing' | 'closed' | 'listed' | 'allotted';
