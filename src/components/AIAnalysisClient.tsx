// src/components/AIAnalysisClient.tsx - NEW FILE
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IPO } from '@/types/ipo';
import { parseGMP, slugify } from '@/lib/api';

interface AIAnalysisClientProps {
  ipo: IPO;
}

export default function AIAnalysisClient({ ipo }: AIAnalysisClientProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const { amountText, percentText, isPositive } = parseGMP(ipo.gmp);
  const aiAnalysis = ipo.aiAnalysis!;

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-green-400 to-green-500';
    if (score >= 50) return 'from-yellow-400 to-amber-500';
    if (score >= 40) return 'from-orange-400 to-orange-500';
    return 'from-red-500 to-rose-600';
  };

  const getRatingInfo = (rating: string) => {
    const ratings: Record<string, { label: string; color: string; icon: string; description: string }> = {
      STRONG_APPLY: {
        label: 'Strong Apply',
        color: 'bg-green-600',
        icon: '🚀',
        description: 'Excellent opportunity with high potential returns'
      },
      APPLY: {
        label: 'Apply',
        color: 'bg-green-500',
        icon: '✅',
        description: 'Good opportunity for investment'
      },
      CONSIDER_APPLYING: {
        label: 'Consider Applying',
        color: 'bg-yellow-500',
        icon: '🤔',
        description: 'Moderate opportunity, evaluate carefully'
      },
      NEUTRAL: {
        label: 'Neutral',
        color: 'bg-gray-500',
        icon: '⚖️',
        description: 'Mixed signals, proceed with caution'
      },
      AVOID: {
        label: 'Avoid',
        color: 'bg-orange-500',
        icon: '⚠️',
        description: 'Not recommended at this time'
      },
      STRONG_AVOID: {
        label: 'Strong Avoid',
        color: 'bg-red-500',
        icon: '🛑',
        description: 'Significant concerns identified'
      },
      HIGH_RISK_AVOID: {
        label: 'High Risk - Avoid',
        color: 'bg-red-600',
        icon: '💀',
        description: 'Very high risk, not recommended'
      },
    };
    return ratings[rating] || ratings.NEUTRAL;
  };



  const ratingInfo = getRatingInfo(aiAnalysis.rating);
  const scoreColor = getScoreColor(aiAnalysis.score);

  const sections = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'factors', label: 'Factor Analysis', icon: '🎯' },
    { id: 'strategy', label: 'Investment Strategy', icon: '💡' },
    { id: 'returns', label: 'Expected Returns', icon: '💰' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header with IPO Info */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8">
          <div className="flex items-center gap-6">
            {ipo.logoUrl && (
              <div className="w-20 h-20 rounded-xl border-2 border-white/20 bg-white p-2 overflow-hidden flex-shrink-0">
                <Image
                  src={`https://ipofly-273428006377.asia-south1.run.app${ipo.logoUrl}`}
                  alt={ipo.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{ipo.name}</h1>
              <p className="text-white/80">AI-Powered Investment Analysis</p>
            </div>
          </div>
        </div>

        {/* AI Rating Banner */}
        <div className={`bg-gradient-to-r ${scoreColor} p-6 text-white`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-6xl font-black mb-2">{aiAnalysis.score}</div>
              <div className="text-sm font-semibold opacity-90">AI Score (out of 100)</div>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-2">{ratingInfo.icon}</div>
              <div className="text-2xl font-bold mb-1">{ratingInfo.label}</div>
              <div className="text-sm opacity-90">{ratingInfo.description}</div>
            </div>

            <div className="text-center">
              <div className="text-sm font-semibold opacity-90 mb-2">Risk Level</div>
              <div className="text-3xl font-bold">{aiAnalysis.riskLevel.replace(/_/g, ' ')}</div>
              <div className="text-sm opacity-90 mt-2">Confidence: {aiAnalysis.confidence}%</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <nav className="flex justify-center sm:justify-start px-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                  activeSection === section.id
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <span>{section.icon}</span>
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">AI Recommendation</h2>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {aiAnalysis.recommendation}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <span>📊</span> Current Metrics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">GMP:</span>
                      <span className={`font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {amountText} {percentText}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Price:</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{ipo.issuePrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subscription:</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{ipo.subscription || 'TBA'}</span>
                    </div>
                  </div>
                </div>

                {aiAnalysis.keyMetrics && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <span>🔑</span> Key Metrics
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(aiAnalysis.keyMetrics).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{key.replace(/_/g, ' ')}:</span>
                          <span className="font-bold text-gray-900 dark:text-gray-100">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === 'factors' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Factor Analysis Breakdown</h2>

              {Object.entries(aiAnalysis.factorAnalysis).map(([key, value]) => {
                const score = Number(value);
                const percentage = score * 10;

                return (
                  <div key={key} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {key.replace(/_/g, ' ')}
                      </h3>
                      <span className={`text-2xl font-bold ${
                        score >= 7 ? 'text-green-600' :
                        score >= 5 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {score}/10
                      </span>
                    </div>

                    <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                          score >= 7 ? 'bg-green-500' :
                          score >= 5 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {aiAnalysis.factorInsights && aiAnalysis.factorInsights[key] && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                        {aiAnalysis.factorInsights[key]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeSection === 'strategy' && aiAnalysis.applicationStrategy && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Investment Strategy</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Suggested Action</h3>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {aiAnalysis.applicationStrategy.suggestedAction}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Recommended Lot Size</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {aiAnalysis.applicationStrategy.lotSize}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Bid Price</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {aiAnalysis.applicationStrategy.bidPrice}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Risk Level</h3>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {aiAnalysis.applicationStrategy.riskLevel}
                  </p>
                </div>
              </div>

              {aiAnalysis.timelineAdvice && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border-l-4 border-yellow-500">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <span>⏰</span> Timeline Advice
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {aiAnalysis.timelineAdvice}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeSection === 'returns' && aiAnalysis.expectedReturns && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Expected Returns</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8 border border-green-200 dark:border-green-700 text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Expected Listing Gain</h3>
                  <p className="text-5xl font-black text-green-600 dark:text-green-400 mb-2">
                    {aiAnalysis.expectedReturns.listingGain}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Based on current market conditions</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-700 text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Success Probability</h3>
                  <p className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-2">
                    {aiAnalysis.expectedReturns.probability}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI confidence level</p>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-3 flex items-center gap-2">
                  <span>⚠️</span> Important Disclaimer
                </h3>
                <p className="text-sm text-red-700 dark:text-red-400">
                  These predictions are based on AI analysis of current market conditions and historical data.
                  Past performance does not guarantee future results. Always consult with a SEBI-registered
                  financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/ipo/${slugify(ipo.name)}`}
              className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors text-center"
            >
              View Full IPO Details
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}