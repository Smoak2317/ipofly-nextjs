// src/components/HeatMap/HeatMapModal.tsx
'use client';

import { IPO } from '@/types/ipo';
import { parseGMP, normalizeStatus, normalizeCategory, slugify } from '@/lib/api';
import Link from 'next/link';

interface HeatMapModalProps {
  ipo: IPO;
  onClose: () => void;
}

export default function HeatMapModal({ ipo, onClose }: HeatMapModalProps) {
  const { amountText, percentText } = parseGMP(ipo.gmp);
  const status = normalizeStatus(ipo.status);
  const category = normalizeCategory(ipo.category);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div className="flex-1 pr-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">{ipo.name}</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  status === 'ongoing'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : status === 'upcoming'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                }`}>
                  {status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400">
                  {category}
                </span>
              </div>
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

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-3 sm:p-4 border border-indigo-200 dark:border-indigo-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">GMP</div>
              <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {amountText}
              </div>
              {percentText && (
                <div className="text-sm text-indigo-500 dark:text-indigo-400">
                  {percentText}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-3 sm:p-4 border border-green-200 dark:border-green-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Issue Size</div>
              <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                {ipo.issueSize}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-3 sm:p-4 border border-blue-200 dark:border-blue-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Issue Price</div>
              <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                {ipo.issuePrice}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 sm:p-4 border border-purple-200 dark:border-purple-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Subscription</div>
              <div className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400">
                {ipo.subscription || 'N/A'}
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Important Dates</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Open:</span>
                <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">{ipo.issueOpenDate}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Close:</span>
                <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">{ipo.issueCloseDate}</span>
              </div>
              {ipo.allotmentDate && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Allotment:</span>
                  <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">{ipo.allotmentDate}</span>
                </div>
              )}
              {ipo.listingDate && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Listing:</span>
                  <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">{ipo.listingDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {ipo.companyDescription && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">About</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-4">
                {ipo.companyDescription}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/ipo/${slugify(ipo.name)}`}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all text-center text-sm"
              onClick={onClose}
            >
              View Full Details
            </Link>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}