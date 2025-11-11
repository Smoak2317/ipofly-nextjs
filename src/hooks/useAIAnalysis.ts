// src/hooks/useAIAnalysis.ts
import { AIAnalysis } from '@/types/ipo';

export const useAIAnalysis = (analysis: any): AIAnalysis | null => {
  if (!analysis || typeof analysis !== 'object') {
    return null;
  }

  // Safe defaults
  const safeAnalysis: AIAnalysis = {
    rating: analysis.rating || 'NEUTRAL',
    score: typeof analysis.score === 'number' ? analysis.score : 50,
    recommendation: analysis.recommendation || 'Analysis not available',
    riskLevel: analysis.riskLevel || 'MEDIUM',
    confidence: typeof analysis.confidence === 'number' ? analysis.confidence : 0.5,
    factorAnalysis: analysis.factorAnalysis || {
      Financials: 50,
      Fundamentals: 50,
      GMP: 50,
      Subscription: 50,
      Market: 50,
    },
    keyMetrics: analysis.keyMetrics || {},
    investmentHorizon: analysis.investmentHorizon || 'MEDIUM_TERM',
    ratingColor: analysis.ratingColor || '#f59e0b',
    riskColor: analysis.riskColor || '#eab308',
  };

  return safeAnalysis;
};