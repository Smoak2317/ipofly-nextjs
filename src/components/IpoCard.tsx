// src/components/IpoCard.tsx - FIXED AI BAR VERSION
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

  const aiAnalysis = ipo.aiAnalysis;
  const hasAIAnalysis = !!aiAnalysis && typeof aiAnalysis === 'object';
  const aiScore = hasAIAnalysis ? (aiAnalysis.score || 0) : 0;
  const aiRating = hasAIAnalysis ? (aiAnalysis.recommendation || 'NEUTRAL') : 'NEUTRAL';

  const getAIScoreColor = (score: number) => {
    if (score >= 75) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-green-400 to-green-500';
    if (score >= 50) return 'from-yellow-400 to-amber-500';
    if (score >= 40) return 'from-orange-400 to-orange-500';
    return 'from-red-500 to-rose-600';
  };

  const getAIRatingBadge = (recommendation: string) => {
    const recommendations: Record<string, { label: string; color: string; icon: string }> = {
      STRONG_APPLY: { label: 'Strong Apply', color: 'bg-green-600', icon: '🚀' },
      APPLY: { label: 'Apply', color: 'bg-green-500', icon: '✅' },
      CONSIDER_APPLYING: { label: 'Consider', color: 'bg-yellow-500', icon: '🤔' },
      NEUTRAL: { label: 'Neutral', color: 'bg-gray-500', icon: '⚖️' },
      AVOID: { label: 'Avoid', color: 'bg-orange-500', icon: '⚠️' },
      STRONG_AVOID: { label: 'Strong Avoid', color: 'bg-red-500', icon: '🛑' },
      HIGH_RISK_AVOID: { label: 'High Risk', color: 'bg-red-600', icon: '💀' },
    };
    return recommendations[recommendation] || recommendations.NEUTRAL;
  };

  const aiRatingInfo = getAIRatingBadge(aiRating);
  const aiScoreColor = getAIScoreColor(aiScore);

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; icon: JSX.Element }> = {
      ongoing: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-400',
        icon: (
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            LIVE
          </span>
        )
      },
      upcoming: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-400',
        icon: <span>Upcoming</span>
      },
      closed: {
        bg: 'bg-gray-100 dark:bg-gray-900/30',
        text: 'text-gray-700 dark:text-gray-400',
        icon: <span>Closed</span>
      },
      listed: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-700 dark:text-purple-400',
        icon: <span>Listed</span>
      },
      allotted: {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-700 dark:text-amber-400',
        icon: <span>Allotted</span>
      }
    };
    return configs[status] || configs.upcoming;
  };

  const statusConfig = getStatusConfig(status);

  return (
    <Link href={`/ipo/${slug}`}>
      <article className="group relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:shadow-2xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden h-full flex flex-col">

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300 rounded-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          {/* TOP SECTION: Logo + Status + Category */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Logo */}
              {ipo.logoUrl && (
                <div className="w-14 h-14 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-1 bg-white overflow-hidden shadow-sm flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${ipo.logoUrl}`}
                    alt={`${ipo.name} logo`}
                    width={56}
                    height={56}
                    className="object-contain w-full h-full"
                    priority={priority}
                  />
                </div>
              )}

              {/* Company Name + Badges */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors mb-2 leading-tight">
                  {ipo.name}
                </h3>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-bold rounded-md ${statusConfig.bg} ${statusConfig.text}`}>
                    {statusConfig.icon}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase">
                    {category === 'sme' ? 'SME' : 'Mainboard'}
                  </span>
                </div>
              </div>
            </div>

            {/* GMP Badge - Compact */}
            <div className={`flex-shrink-0 px-3 py-2 rounded-xl text-right shadow-md ${
              isPositive
                ? "bg-gradient-to-br from-green-500 to-emerald-600"
                : "bg-gradient-to-br from-red-500 to-rose-600"
            }`}>
              <div className="text-[9px] font-bold text-white/80 mb-0.5">GMP</div>
              <div className="text-sm font-bold text-white leading-tight">
                {amountText}
              </div>
              {percentText && (
                <div className="text-[10px] font-bold text-white/90">
                  {percentText}
                </div>
              )}
            </div>
          </div>

          {/* AI ANALYSIS SECTION - Updated Progress Bar */}
          {hasAIAnalysis && (
            <div className="mb-3">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-gray-900 dark:text-gray-100 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{aiRatingInfo.icon}</span>
                    <span className="text-xs font-bold">{aiRatingInfo.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold">AI Score</span>
                    <span className="text-2xl font-black">{aiScore}</span>
                  </div>
                </div>

                {/* AI Score Progress Bar */}
                <div className="relative w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${aiScoreColor} rounded-full transition-all duration-500`}
                    style={{ width: `${aiScore}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* KEY METRICS GRID */}
          <div className="grid grid-cols-2 gap-2 mb-3 flex-1">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-2 border border-blue-200 dark:border-blue-700">
              <div className="text-[10px] text-gray-600 dark:text-gray-400 mb-0.5 font-semibold">Price Range</div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 truncate">{ipo.issuePrice}</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-2 border border-purple-200 dark:border-purple-700">
              <div className="text-[10px] text-gray-600 dark:text-gray-400 mb-0.5 font-semibold">Lot Size</div>
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 truncate">{ipo.lotSize}</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-2 border border-green-200 dark:border-green-700">
              <div className="text-[10px] text-gray-600 dark:text-gray-400 mb-0.5 font-semibold">Issue Size</div>
              <div className="text-xs font-bold text-green-600 dark:text-green-400 truncate">{ipo.issueSize}</div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg p-2 border border-amber-200 dark:border-amber-700">
              <div className="text-[10px] text-gray-600 dark:text-gray-400 mb-0.5 font-semibold">Subscription</div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 truncate">{ipo.subscription || '—'}</div>
            </div>
          </div>

          {/* DATES SECTION - Compact */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-2 mb-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">Open:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">{ipo.issueOpenDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">Close:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">{ipo.issueCloseDate}</span>
              </div>
            </div>
          </div>

          {/* CTA BUTTON */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              {hasAIAnalysis && (
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  🤖 AI Powered
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 group-hover:gap-3 transition-all">
              <span>{hasAIAnalysis ? 'View Analysis' : 'View Details'}</span>
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
