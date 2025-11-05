'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { IPO } from '@/types/ipo';
import IpoCard from './IpoCard';

interface ClientPaginationProps {
  allIpos: IPO[];
}

export default function ClientPagination({ allIpos }: ClientPaginationProps) {
  const [itemsToShow, setItemsToShow] = useState(10);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const displayedIpos = allIpos.slice(0, itemsToShow);
  const hasMore = itemsToShow < allIpos.length;

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      setItemsToShow(prev => Math.min(prev + 10, allIpos.length));
      setLoading(false);
    }, 500);
  }, [loading, hasMore, allIpos.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadMore]);

  return (
    <div className="space-y-12">
      {/* Grid of IPO Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedIpos.map((ipo, index) => (
          <IpoCard key={ipo._id || index} ipo={ipo} priority={index < 6} />
        ))}
      </div>

      {/* Loading Indicator */}
      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-8">
          {loading && (
            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700">
              <div className="w-5 h-5 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Loading more IPOs...</span>
            </div>
          )}
        </div>
      )}

      {/* All Loaded Message */}
      {!hasMore && allIpos.length > 0 && (
        <div className="flex justify-center py-8">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-300 dark:border-green-700">
            <span className="text-3xl">✅</span>
            <div>
              <div className="font-bold text-green-800 dark:text-green-300">All IPOs Loaded!</div>
              <div className="text-sm text-green-700 dark:text-green-400">
                Showing all {allIpos.length} IPOs
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}