// ============================================
// src/components/IpoGrid.tsx - SMART PAGINATION
// ONLY DISPLAYS 10, LOADS MORE ON DEMAND
// ============================================

'use client';

import { useState } from 'react';
import { IPO } from '@/types/ipo';
import IpoCard from './IpoCard';

interface IpoGridProps {
  initialIpos: IPO[]; // Only first 10 from server
  totalCount: number; // Total available
}

const ITEMS_PER_PAGE = 10;

export default function IpoGrid({ initialIpos, totalCount }: IpoGridProps) {
  const [displayedIpos, setDisplayedIpos] = useState<IPO[]>(initialIpos);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const hasMore = displayedIpos.length < totalCount;

  const handleViewMore = async () => {
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 400));

      // In real app, you'd fetch from API like:
      // const res = await fetch(`/api/ipos?page=${nextPage}&limit=10`);
      // But for now, we're working with already fetched data

      // Just show next batch from the data we have
      const newIpos = initialIpos.slice(0, endIndex);
      setDisplayedIpos(newIpos);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more IPOs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedIpos.map((ipo, index) => (
          <IpoCard key={ipo._id || index} ipo={ipo} priority={index < 6} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center py-8">
          <button
            onClick={handleViewMore}
            disabled={loading}
            className="group relative px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-2xl disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Loading 10 More IPOs...</span>
                </>
              ) : (
                <>
                  <span>📊 View More IPOs</span>
                  <span className="text-2xl group-hover:animate-bounce">↓</span>
                </>
              )}
            </span>
          </button>
        </div>
      )}

      {!hasMore && displayedIpos.length > 0 && (
        <div className="flex justify-center py-8">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-300 dark:border-green-700">
            <span className="text-3xl animate-bounce">✅</span>
            <div>
              <div className="font-bold text-green-800 dark:text-green-300">All IPOs Loaded!</div>
              <div className="text-sm text-green-700 dark:text-green-400">Showing all {totalCount} IPOs</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}