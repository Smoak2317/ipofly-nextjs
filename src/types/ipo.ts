// src/types/ipo.ts

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
}

export interface ApiResponse {
  success: boolean;
  data: IPO[];
  message?: string;
}

export type CategoryType = 'all' | 'mainboard' | 'sme';
export type StatusType = 'all' | 'upcoming' | 'ongoing' | 'closed' | 'listed' | 'allotted';