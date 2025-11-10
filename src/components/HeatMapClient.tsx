'use client';

import { useState, useMemo } from 'react';
import { IPO } from '@/types/ipo';
import { normalizeCategory, normalizeStatus, slugify } from '@/lib/api';
import Link from 'next/link';

interface HeatMapClientProps {
  ipos: IPO[];
}

export default function HeatMapClient({ ipos }: HeatMapClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<'mainboard' | 'sme'>('mainboard');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [hoveredIPO, setHoveredIPO] = useState<IPO | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Filter IPOs by category and status
  const filteredIPOs = useMemo(() => {
    return ipos.filter(ipo => {
      const category = normalizeCategory(ipo.category);
      const status = normalizeStatus(ipo.status);

      // Category filter
      if (category !== selectedCategory) return false;

      // Status filter
      if (selectedStatus === 'all') return true;
      if (selectedStatus === 'live') return status === 'ongoing';
      if (selectedStatus === 'upcoming') return status === 'upcoming';
      if (selectedStatus === 'closed') return status === 'closed' || status === 'listed' || status === 'allotted';

      return true;
    });
  }, [ipos, selectedCategory, selectedStatus]);

  // Get GMP percentage for color calculation
  const getGMPPercentage = (ipo: IPO): number => {
    try {
      const gmpStr = ipo.gmpPercentage || ipo.gmp;
      const match = gmpStr.match(/(-?\d+\.?\d*)/);
      if (match) {
        return parseFloat(match[0]);
      }
      return 0;
    } catch {
      return 0;
    }
  };

  // Professional color scheme based on GMP percentage
  const getTileColor = (ipo: IPO): { bg: string; border: string; text: string } => {
    const status = normalizeStatus(ipo.status);
    const percentage = getGMPPercentage(ipo);

    // Closed/Listed - Neutral Gray
    if (status === 'closed' || status === 'listed' || status === 'allotted') {
      return {
        bg: 'bg-slate-100 dark:bg-slate-800',
        border: 'border-slate-300 dark:border-slate-600',
        text: 'text-slate-700 dark:text-slate-300'
      };
    }

    // Upcoming with no GMP - Light Blue
    if (percentage === 0 && status === 'upcoming') {
      return {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-700',
        text: 'text-blue-900 dark:text-blue-100'
      };
    }

    // Color based on percentage (finance-standard colors)
    if (percentage >= 20) {
      // Strong Gain - Deep Green
      return {
        bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        border: 'border-emerald-400 dark:border-emerald-600',
        text: 'text-emerald-900 dark:text-emerald-100'
      };
    } else if (percentage >= 10) {
      // Good Gain - Green
      return {
        bg: 'bg-green-100 dark:bg-green-900/30',
        border: 'border-green-400 dark:border-green-600',
        text: 'text-green-900 dark:text-green-100'
      };
    } else if (percentage >= 5) {
      // Moderate Gain - Light Green
      return {
        bg: 'bg-lime-100 dark:bg-lime-900/30',
        border: 'border-lime-400 dark:border-lime-600',
        text: 'text-lime-900 dark:text-lime-100'
      };
    } else if (percentage > 0) {
      // Small Gain - Yellow
      return {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        border: 'border-yellow-400 dark:border-yellow-600',
        text: 'text-yellow-900 dark:text-yellow-100'
      };
    } else if (percentage >= -5) {
      // Small Loss - Orange
      return {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        border: 'border-orange-400 dark:border-orange-600',
        text: 'text-orange-900 dark:text-orange-100'
      };
    } else {
      // Significant Loss - Red
      return {
        bg: 'bg-red-100 dark:bg-red-900/30',
        border: 'border-red-400 dark:border-red-600',
        text: 'text-red-900 dark:text-red-100'
      };
    }
  };

  // Get tile size based on issue size
  const getTileSize = (ipo: IPO): string => {
    const sizeStr = ipo.issueSize.replace(/[^0-9.]/g, '');
    const size = parseFloat(sizeStr);

    if (size > 5000) return 'col-span-2 row-span-2';
    if (size > 2000) return 'col-span-2 row-span-1';
    return 'col-span-1 row-span-1';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Compact Header */}
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          IPO Heat Map
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Color-coded by GMP percentage for quick performance analysis
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 mb-4">
        {/* Category Tabs */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setSelectedCategory('mainboard')}
            className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              selectedCategory === 'mainboard'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Mainboard
          </button>
          <button
            onClick={() => setSelectedCategory('sme')}
            className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              selectedCategory === 'sme'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            SME
          </button>
        </div>

        {/* Status Filters */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-2 sm:px-3 py-1.5 rounded-lg font-semibold text-[10px] sm:text-xs transition-all ${
              selectedStatus === 'all'
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedStatus('live')}
            className={`px-2 sm:px-3 py-1.5 rounded-lg font-semibold text-[10px] sm:text-xs transition-all flex items-center justify-center gap-1 ${
              selectedStatus === 'live'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {selectedStatus === 'live' && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
            Live
          </button>
          <button
            onClick={() => setSelectedStatus('upcoming')}
            className={`px-2 sm:px-3 py-1.5 rounded-lg font-semibold text-[10px] sm:text-xs transition-all ${
              selectedStatus === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setSelectedStatus('closed')}
            className={`px-2 sm:px-3 py-1.5 rounded-lg font-semibold text-[10px] sm:text-xs transition-all ${
              selectedStatus === 'closed'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Closed
          </button>
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
            GMP % Legend:
          </div>
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 text-[9px] sm:text-[10px]">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-emerald-400 dark:bg-emerald-600 rounded"></div>
              <span className="text-gray-700 dark:text-gray-300">≥20%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-400 dark:bg-green-600 rounded"></div>
              <span className="text-gray-700 dark:text-gray-300">10-20%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-lime-400 dark:bg-lime-600 rounded"></div>
              <span className="text-gray-700 dark:text-gray-300">5-10%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-400 dark:bg-yellow-600 rounded"></div>
              <span className="text-gray-700 dark:text-gray-300">0-5%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-400 dark:bg-orange-600 rounded"></div>
              <span className="text-gray-700 dark:text-gray-300">-5 to 0%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-400 dark:bg-red-600 rounded"></div>
              <span className="text-gray-700 dark:text-gray-300">&lt;-5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Heat Map Grid */}
      {filteredIPOs.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gray-600 dark:text-gray-400">No IPOs found with current filters</p>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 auto-rows-fr"
          onMouseMove={handleMouseMove}
        >
          {filteredIPOs.map((ipo) => {
            const colors = getTileColor(ipo);
            const percentage = getGMPPercentage(ipo);
            const status = normalizeStatus(ipo.status);
            const size = getTileSize(ipo);

            return (
              <Link
                key={ipo._id}
                href={`/ipo/${slugify(ipo.name)}`}
                className={`${size} ${colors.bg} ${colors.border} border-2 rounded-lg p-2 sm:p-3 transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer relative overflow-hidden group`}
                onMouseEnter={() => setHoveredIPO(ipo)}
                onMouseLeave={() => setHoveredIPO(null)}
              >
                {/* Status Badge */}
                {status === 'ongoing' && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}

                {/* Content */}
                <div className="relative z-10">
                  <h3 className={`font-bold text-[10px] sm:text-xs mb-1 line-clamp-2 ${colors.text}`}>
                    {ipo.name}
                  </h3>

                  {/* GMP Percentage - Main Focus */}
                  <div className={`text-base sm:text-lg font-bold mb-0.5 ${colors.text}`}>
                    {percentage > 0 ? '+' : ''}{percentage.toFixed(1)}%
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-0.5">
                    <div className={`text-[9px] sm:text-[10px] ${colors.text} opacity-80`}>
                      {ipo.issuePrice}
                    </div>
                    <div className={`text-[9px] sm:text-[10px] ${colors.text} opacity-70`}>
                      {ipo.subscription || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className={`w-3 h-3 ${colors.text}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Tooltip */}
      {hoveredIPO && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: Math.min(mousePosition.x + 15, window.innerWidth - 220),
            top: Math.min(mousePosition.y + 15, window.innerHeight - 200),
          }}
        >
          <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg shadow-2xl p-3 max-w-[200px] border border-gray-700">
            <h3 className="font-bold text-xs mb-2 line-clamp-2">{hoveredIPO.name}</h3>
            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between gap-2">
                <span className="text-gray-400">GMP:</span>
                <span className="font-semibold">
                  {getGMPPercentage(hoveredIPO) > 0 ? '+' : ''}
                  {getGMPPercentage(hoveredIPO).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-400">Price:</span>
                <span>{hoveredIPO.issuePrice}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-400">Size:</span>
                <span>{hoveredIPO.issueSize}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-400">Sub:</span>
                <span>{hoveredIPO.subscription || 'N/A'}</span>
              </div>
            </div>
            <p className="text-[9px] text-gray-400 mt-2 italic">Click for details</p>
          </div>
        </div>
      )}
    </div>
  );
}