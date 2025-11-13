// src/components/HeatMap/HeatMapModal.tsx - FIXED VERSION
'use client';

import { useEffect } from 'react';
import { IPO } from '@/types/ipo';
import { parseGMP, normalizeStatus, normalizeCategory, slugify } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

interface HeatMapModalProps {
  ipo: IPO;
  onClose: () => void;
}

export default function HeatMapModal({ ipo, onClose }: HeatMapModalProps) {
  // Safe data access with fallbacks
  const { amountText, percentText, isPositive } = parseGMP(ipo?.gmp);
  const status = normalizeStatus(ipo?.status);
  const category = normalizeCategory(ipo?.category);
  const slug = slugify(ipo?.name);

  // Safe AI analysis access
  const aiAnalysis = ipo?.aiAnalysis;
  const hasAIAnalysis = !!aiAnalysis && typeof aiAnalysis === 'object';

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!ipo) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                {ipo.logoUrl && (
                  <div className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-white overflow-hidden flex-shrink-0">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${ipo.logoUrl}`}
                      alt={ipo.name || 'IPO Logo'}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                    {ipo.name || 'Unknown IPO'}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                      status === 'ongoing'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : status === 'upcoming'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {status}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-bold uppercase bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                      {category}
                    </span>
                    {hasAIAnalysis && (
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        aiAnalysis.score >= 70 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        aiAnalysis.score >= 50 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        AI {aiAnalysis.score || 0}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {ipo.companyDescription && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {ipo.companyDescription}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-3 sm:p-4 border border-indigo-200 dark:border-indigo-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">GMP</div>
              <div className={`text-lg sm:text-xl font-bold ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {amountText}
              </div>
              {percentText && (
                <div className={`text-sm ${isPositive ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                  {percentText}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-3 sm:p-4 border border-green-200 dark:border-green-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Issue Size</div>
              <div className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
                {ipo.issueSize || 'N/A'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-3 sm:p-4 border border-blue-200 dark:border-blue-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Price Range</div>
              <div className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                {ipo.issuePrice || 'N/A'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 sm:p-4 border border-purple-200 dark:border-purple-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Subscription</div>
              <div className="text-sm sm:text-base font-bold text-purple-600 dark:text-purple-400">
                {ipo.subscription || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-300 mb-3">Important Dates</h3>
          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Open Date:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{ipo.issueOpenDate || "TBA"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Close Date:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{ipo.issueCloseDate || "TBA"}</span>
            </div>
            {ipo.allotmentDate && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Allotment:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{ipo.allotmentDate}</span>
              </div>
            )}
            {ipo.listingDate && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Listing:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{ipo.listingDate}</span>
              </div>
            )}
          </div>
        </div>

        {/* AI Recommendation */}
        {hasAIAnalysis && (
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <span>🤖</span>
              AI Recommendation
            </h3>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-700">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  aiAnalysis.recommendation === 'STRONG_APPLY' ? 'bg-green-500 text-white' :
                  aiAnalysis.recommendation === 'APPLY' ? 'bg-green-400 text-white' :
                  aiAnalysis.recommendation === 'CONSIDER_APPLYING' ? 'bg-yellow-500 text-gray-900' :
                  aiAnalysis.recommendation === 'NEUTRAL' ? 'bg-gray-400 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {(aiAnalysis.recommendation || 'NEUTRAL').replace(/_/g, ' ')}
                </span>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {(aiAnalysis.score || 0)}/100
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {aiAnalysis.recommendation || 'No recommendation available.'}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/ipo/${slug}`}
              className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all text-center text-sm"
              onClick={onClose}
            >
              View Full Details
            </Link>
            {hasAIAnalysis && (
              <Link
                href={`/ipo/${slug}/ai-analysis`}
                className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg transition-all text-center text-sm"
                onClick={onClose}
              >
                AI Analysis
              </Link>
            )}
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}