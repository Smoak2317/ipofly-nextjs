// src/components/AIAnalysisDetail.tsx - FIXED with 2 decimal places
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IPO } from '@/types/ipo';
import { parseGMP, normalizeCategory, slugify } from '@/lib/api';

interface AIAnalysisDetailProps {
  ipo: IPO;
}

export default function AIAnalysisDetail({ ipo }: AIAnalysisDetailProps) {
  const router = useRouter();
  const { amountText, isPositive } = parseGMP(ipo?.gmp);
  const category = normalizeCategory(ipo?.category);
  const aiAnalysis = ipo?.aiAnalysis;
  const slug = slugify(ipo?.name);

  if (!ipo || !aiAnalysis) {
    router.push('/');
    return null;
  }

  const getRatingColor = (rating: string) => {
    const colors: Record<string, string> = {
      STRONG_APPLY: 'from-green-500 to-emerald-600',
      APPLY: 'from-green-400 to-emerald-500',
      CONSIDER_APPLYING: 'from-yellow-400 to-amber-500',
      NEUTRAL: 'from-gray-400 to-gray-500',
      AVOID: 'from-orange-400 to-red-500',
      STRONG_AVOID: 'from-red-500 to-rose-600',
      HIGH_RISK_AVOID: 'from-red-600 to-red-700',
    };
    return colors[rating] || colors.NEUTRAL;
  };

  const getRiskColor = (riskLevel: string) => {
    const colors: Record<string, string> = {
      LOW: 'text-green-600 dark:text-green-400',
      LOW_TO_MEDIUM: 'text-green-500 dark:text-green-300',
      MEDIUM: 'text-yellow-600 dark:text-yellow-400',
      MEDIUM_TO_HIGH: 'text-orange-600 dark:text-orange-400',
      HIGH: 'text-red-600 dark:text-red-400',
    };
    return colors[riskLevel] || colors.MEDIUM;
  };

  const getFactorColor = (score: number) => {
    if (score >= 70) return 'text-green-600 dark:text-green-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getFactorBg = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {ipo.logoUrl && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 border-white/20 bg-white p-2 overflow-hidden flex-shrink-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ipofly-273428006377.asia-south1.run.app'}${ipo.logoUrl}`}
                alt={ipo.name || 'IPO Logo'}
                width={80}
                height={80}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold text-white mb-2">
              {ipo.name || 'Unknown IPO'}
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded uppercase">
                {category}
              </span>
              <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded">
                AI Analysis
              </span>
            </div>
          </div>
          <Link
            href={`/ipo/${slug}`}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            ← Back to IPO
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main AI Analysis Card */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Overall Rating */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              AI Investment Rating
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              {/* Rating Badge */}
              <div className={`bg-gradient-to-r ${getRatingColor(aiAnalysis.rating || 'NEUTRAL')} rounded-2xl p-4 sm:p-6 text-center min-w-[140px]`}>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {(aiAnalysis.rating || 'NEUTRAL').replace(/_/g, ' ')}
                </div>
                <div className="text-lg sm:text-xl font-semibold text-white/90">
                  {(aiAnalysis.score || 0).toFixed(2)}/100
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {aiAnalysis.factorAnalysis && Object.entries(aiAnalysis.factorAnalysis).map(([factor, score]) => (
                    <div key={factor} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">
                          {factor.replace(/_/g, ' ')}
                        </span>
                        <span className={`text-sm font-bold ${getFactorColor(score || 0)}`}>
                          {(score || 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getFactorBg(score || 0)}`}
                          style={{ width: `${score || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation & Risk */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span className="text-xl">💡</span>
                Recommendation
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {aiAnalysis.recommendation || 'No recommendation available.'}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                Risk Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Risk Level</span>
                  <span className={`font-bold ${getRiskColor(aiAnalysis.riskLevel || 'MEDIUM')}`}>
                    {aiAnalysis.riskLevel || 'MEDIUM'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Confidence</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {((aiAnalysis.confidence || 0) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Factor Insights */}
          {aiAnalysis.factorInsights && Object.keys(aiAnalysis.factorInsights).length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="text-xl">🔍</span>
                Factor Insights
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(aiAnalysis.factorInsights).map(([factor, insight]) => (
                  <div key={factor} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 capitalize">
                      {factor.replace(/_/g, ' ')}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {insight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6 sm:space-y-8">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">IPO Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">GMP</span>
                <span className={`text-sm font-bold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {amountText}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Price Range</span>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{ipo.issuePrice || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Issue Size</span>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{ipo.issueSize || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Subscription</span>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{ipo.subscription || '—'}</span>
              </div>
            </div>
          </div>

          {/* Application Strategy */}
          {aiAnalysis.applicationStrategy && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Application Strategy</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Action</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {aiAnalysis.applicationStrategy.suggestedAction || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Lot Size</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {aiAnalysis.applicationStrategy.lotSize || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Bid Price</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {aiAnalysis.applicationStrategy.bidPrice || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Expected Returns */}
          {aiAnalysis.expectedReturns && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Expected Returns</h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {aiAnalysis.expectedReturns.listingGain || 'N/A'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {aiAnalysis.expectedReturns.probability || 'N/A'} Probability
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4 border border-yellow-200 dark:border-yellow-700">
            <div className="flex items-start gap-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-lg">⚠️</span>
              <div>
                <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-300 mb-1">AI Disclaimer</h4>
                <p className="text-xs text-yellow-700 dark:text-yellow-400">
                  This analysis is generated by AI and should not be considered as financial advice.
                  Always consult with a SEBI-registered advisor before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}