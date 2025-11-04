'use client';

import { useState } from 'react';
import { IPO } from '@/types/ipo';
import IpoCard from './IpoCard';

interface ClientPaginationProps {
  allIpos: IPO[];
}

export default function ClientPagination({ allIpos }: ClientPaginationProps) {
  const [itemsToShow, setItemsToShow] = useState(10);
  const [loading, setLoading] = useState(false);

  const displayedIpos = allIpos.slice(0, itemsToShow);
  const hasMore = itemsToShow < allIpos.length;

  const handleLoadMore = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setItemsToShow(prev => prev + 10);
    setLoading(false);
  };

  return (
    <div className="space-y-12">
      {/* Grid of IPO Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedIpos.map((ipo, index) => (
          <IpoCard key={ipo._id || index} ipo={ipo} priority={index < 6} />
        ))}
      </div>

      {/* View More Button - REMOVED COUNT */}
      {hasMore && (
        <div className="flex flex-col items-center gap-6 py-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="group px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-xl hover:shadow-2xl disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Loading More...</span>
                </>
              ) : (
                <>
                  <span>📊 View More IPOs</span>
                  <span className="text-2xl group-hover:translate-y-1 transition-transform">↓</span>
                </>
              )}
            </div>
          </button>
        </div>
      )}

      {/* All Loaded Message */}
      {!hasMore && allIpos.length > 0 && (
        <div className="flex justify-center py-8">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-300 dark:border-green-700">
            <span className="text-3xl">✅</span>
            <div>
              <div className="font-bold text-green-800 dark:text-green-300">All IPOs Loaded!</div>
              <div className="text-sm text-green-700 dark:text-green-400">No more IPOs to display</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}