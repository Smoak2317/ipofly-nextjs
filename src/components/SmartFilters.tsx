'use client';

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { IPO } from '@/types/ipo';
import { normalizeCategory, normalizeStatus } from '@/lib/api';
import ClientPagination from './ClientPagination';

interface SmartFiltersProps {
  allIpos: IPO[];
  hideCategory?: boolean; // Hide category filter on category-specific pages
  hideStatus?: boolean;   // Hide status filter on status-specific pages
  defaultCategory?: string; // Default category (mainboard, sme)
  defaultStatus?: string;   // Default status (upcoming, ongoing)
}

export default function SmartFilters({
  allIpos,
  hideCategory = false,
  hideStatus = false,
  defaultCategory = 'all',
  defaultStatus = 'all'
}: SmartFiltersProps) {
  const pathname = usePathname();
  const [categoryFilter, setCategoryFilter] = useState<string>(defaultCategory);
  const [statusFilter, setStatusFilter] = useState<string>(defaultStatus);

  // Filter IPOs based on both category AND status
  const filteredIpos = useMemo(() => {
    return allIpos.filter(ipo => {
      const ipoCategory = normalizeCategory(ipo.category);
      const ipoStatus = normalizeStatus(ipo.status);

      const categoryMatch = categoryFilter === 'all' || ipoCategory === categoryFilter;
      const statusMatch = statusFilter === 'all' || ipoStatus === statusFilter;

      return categoryMatch && statusMatch;
    });
  }, [allIpos, categoryFilter, statusFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-800/50">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Status Filters - Show unless hideStatus is true */}
          {!hideStatus && (
            <div className="flex-1">
              <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-widest">
                📅 Status
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                    statusFilter === 'all'
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600"
                  }`}
                >
                  🌍 All
                </button>

                <button
                  onClick={() => setStatusFilter('upcoming')}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                    statusFilter === 'upcoming'
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-blue-300 dark:border-blue-600"
                  }`}
                >
                  📅 Upcoming
                </button>

                <button
                  onClick={() => setStatusFilter('ongoing')}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 relative group ${
                    statusFilter === 'ongoing'
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-green-400 dark:border-green-600"
                  }`}
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block mr-1" />
                  🔴 LIVE
                </button>

                <button
                  onClick={() => setStatusFilter('closed')}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                    statusFilter === 'closed'
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-red-300 dark:border-red-600"
                  }`}
                >
                  🔒 Closed
                </button>

                <button
                  onClick={() => setStatusFilter('listed')}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                    statusFilter === 'listed'
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-purple-300 dark:border-purple-600"
                  }`}
                >
                  📈 Listed
                </button>
              </div>
            </div>
          )}

          {/* Category Filters - Show unless hideCategory is true */}
          {!hideCategory && (
            <div className="flex-1">
              <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-widest">
                📊 Category
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                    categoryFilter === 'all'
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600"
                  }`}
                >
                  🌐 All IPOs
                </button>

                <button
                  onClick={() => setCategoryFilter('mainboard')}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                    categoryFilter === 'mainboard'
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-indigo-400 dark:border-indigo-600"
                  }`}
                >
                  🏛️ Mainboard
                </button>

                <button
                  onClick={() => setCategoryFilter('sme')}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                    categoryFilter === 'sme'
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-purple-400 dark:border-purple-600"
                  }`}
                >
                  🚀 SME
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination with filtered data */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredIpos.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">No IPOs Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <ClientPagination allIpos={filteredIpos} />
        )}
      </section>
    </div>
  );
}