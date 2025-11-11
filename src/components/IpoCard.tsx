// src/components/IpoCard.tsx - FIXED OVERLAPPING ISSUE
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IPO } from '@/types/ipo';
import { slugify, parseGMP, normalizeCategory, normalizeStatus } from '@/lib/api';

interface IpoCardProps {
  ipo: IPO;
  priority?: boolean;
}

export default function IpoCard({ ipo, priority = false }: IpoCardProps) {
  const slug = slugify(ipo.name);
  const { amountText, percentText, isPositive } = parseGMP(ipo.gmp);
  const category = normalizeCategory(ipo.category);
  const status = normalizeStatus(ipo.status);

  // Safe AI Analysis access
  const aiAnalysis = ipo.aiAnalysis;
  const hasAIAnalysis = !!aiAnalysis && typeof aiAnalysis === 'object';
  const aiScore = hasAIAnalysis ? (aiAnalysis.score || 0) : 0;

  const getAIRatingConfig = (rating: string) => {
    const configs: Record<string, { bg: string; text: string; icon: string; label: string }> = {
      STRONG_APPLY: { bg: 'bg-gradient-to-r from-green-500 to-emerald-600', text: 'text-white', icon: '🚀', label: 'Strong Apply' },
      APPLY: { bg: 'bg-gradient-to-r from-green-400 to-emerald-500', text: 'text-white', icon: '📈', label: 'Apply' },
      CONSIDER_APPLYING: { bg: 'bg-gradient-to-r from-yellow-400 to-amber-500', text: 'text-gray-900', icon: '🤔', label: 'Consider' },
      NEUTRAL: { bg: 'bg-gradient-to-r from-gray-400 to-gray-500', text: 'text-white', icon: '⚖️', label: 'Neutral' },
      AVOID: { bg: 'bg-gradient-to-r from-orange-400 to-red-500', text: 'text-white', icon: '⚠️', label: 'Avoid' },
      STRONG_AVOID: { bg: 'bg-gradient-to-r from-red-500 to-rose-600', text: 'text-white', icon: '🛑', label: 'Strong Avoid' },
      HIGH_RISK_AVOID: { bg: 'bg-gradient-to-r from-red-600 to-red-700', text: 'text-white', icon: '💀', label: 'High Risk' },
    };
    return configs[rating] || configs.NEUTRAL;
  };

  const getRiskConfig = (riskLevel: string) => {
    const configs: Record<string, { bg: string; text: string }> = {
      LOW: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' },
      LOW_TO_MEDIUM: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-300' },
      MEDIUM: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400' },
      MEDIUM_TO_HIGH: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' },
      HIGH: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' },
    };
    return configs[riskLevel] || configs.MEDIUM;
  };

  const ratingConfig = hasAIAnalysis ? getAIRatingConfig(aiAnalysis.rating || 'NEUTRAL') : null;
  const riskConfig = hasAIAnalysis ? getRiskConfig(aiAnalysis.riskLevel || 'MEDIUM') : null;

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; icon: JSX.Element }> = {
      ongoing: {
        bg: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700',
        text: 'text-green-700 dark:text-green-300',
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      },
      upcoming: {
        bg: 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-700',
        text: 'text-blue-700 dark:text-blue-300',
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        )
      },
      closed: {
        bg: 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-700',
        text: 'text-red-700 dark:text-red-300',
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      },
      listed: {
        bg: 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700',
        text: 'text-purple-700 dark:text-purple-300',
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        )
      },
      allotted: {
        bg: 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-700',
        text: 'text-amber-700 dark:text-amber-300',
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      }
    };
    return configs[status] || configs.upcoming;
  };

  const statusConfig = getStatusConfig(status);

  return (
          <Link
            href={`/ipo/${slugify(ipo.name || 'unknown')}`}
            >
            <article className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 rounded-xl" />

              <div className="relative z-10">
                {/* Header Section - Better Layout */}
                <div className="flex justify-between items-start gap-2 mb-2 sm:mb-3">
                  <div className="flex-1 min-w-0">
                    {ipo.logoUrl && (
                      <div className="mb-2">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-white overflow-hidden shadow-sm">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ipofly-273428006377.asia-south1.run.app'}${ipo.logoUrl}`}
                            alt={`${ipo.name} logo`}
                            width={48}
                            height={48}
                            className="object-contain w-full h-full"
                            priority={priority}
                          />
                        </div>
                      </div>
                    )}

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1.5">
                      {ipo.name}
                    </h3>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg uppercase">
                        {category === 'sme' ? '🚀 SME' : '🏛️ Mainboard'}
                      </span>

                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg uppercase border ${statusConfig.bg} ${statusConfig.text}`}>
                        {status === 'ongoing' ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        ) : (
                          statusConfig.icon
                        )}
                        {status}
                      </span>
                    </div>
                  </div>

            <div className={`flex-shrink-0 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-right shadow-sm ${
              isPositive
                ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700"
                : "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 border border-red-200 dark:border-red-700"
            }`}>
              <div className="text-[9px] sm:text-xs font-medium text-gray-600 dark:text-gray-400 mb-0.5 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>GMP
              </div>
              <div className={`text-sm sm:text-base font-bold ${isPositive ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                {amountText}
              </div>
              {percentText && (
                <div className={`text-[9px] sm:text-xs font-semibold ${isPositive ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}>
                  {percentText}
                </div>
              )}
            </div>
          </div>

                {/* AI Risk Badge - Below Header */}
                {hasAIAnalysis && (
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg ${riskConfig?.bg || 'bg-gray-100'} ${riskConfig?.text || 'text-gray-700'}`}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {aiAnalysis.riskLevel || 'MEDIUM'} Risk
                    </span>

                    {/* AI Score Progress Bar */}
                    <div className="flex-1 max-w-[120px] ml-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-400">AI</span>
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{aiScore}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            aiScore >= 70 ? 'bg-green-500' :
                            aiScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${aiScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* IPO Details Grid */}
                <div className="grid grid-cols-2 gap-2 py-2 border-t border-gray-100 dark:border-gray-700">
                  {[
                    {
                      label: "Price",
                      value: ipo.issuePrice,
                      icon: "💰"
                    },
                    {
                      label: "Lot Size",
                      value: ipo.lotSize,
                      icon: "📦"
                    },
                    {
                      label: "Open",
                      value: ipo.issueOpenDate,
                      icon: "📅"
                    },
                    {
                      label: "Close",
                      value: ipo.issueCloseDate,
                      icon: "⏰"
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-sm">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-0.5">{item.label}</div>
                        <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-1.5">
                                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                  </svg>
                                  <div>
                                    <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Subscription</div>
                                    <div className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                      {ipo.subscription || "—"}
                                    </div>
                                  </div>
                                </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-3 transition-all">
                    <span>{hasAIAnalysis ? 'AI Analysis' : 'Details'}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        );
      }