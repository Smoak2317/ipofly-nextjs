'use client';

import { useState, useMemo } from 'react';
import { IPO } from '@/types/ipo';
import { normalizeCategory, normalizeStatus } from '@/lib/api';
import ClientPagination from './ClientPagination';

interface SmartFiltersProps {
  allIpos: IPO[];
  hideCategory?: boolean;
  hideStatus?: boolean;
  defaultCategory?: string;
  defaultStatus?: string;
}

export default function SmartFilters({
  allIpos,
  hideCategory = false,
  hideStatus = false,
  defaultCategory = 'all',
  defaultStatus = 'all'
}: SmartFiltersProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>(defaultCategory);
  const [statusFilter, setStatusFilter] = useState<string>(defaultStatus);
  const [showMobileFilters, setShowMobileFilters] = useState<string>('');

  const filteredIpos = useMemo(() => {
    return allIpos.filter(ipo => {
      const ipoCategory = normalizeCategory(ipo.category);
      const ipoStatus = normalizeStatus(ipo.status);

      const categoryMatch = categoryFilter === 'all' || ipoCategory === categoryFilter;
      const statusMatch = statusFilter === 'all' || ipoStatus === statusFilter;

      return categoryMatch && statusMatch;
    });
  }, [allIpos, categoryFilter, statusFilter]);

  const statusFilters = [
    {
      value: 'all',
      label: 'All',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      value: 'upcoming',
      label: 'Upcoming',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      value: 'ongoing',
      label: 'LIVE',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      ),
      hasLiveDot: true
    },
  ];

  const categoryFilters = [
    {
      value: 'all',
      label: 'All IPOs',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
      )
    },
    {
      value: 'mainboard',
      label: 'Mainboard',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      value: 'sme',
      label: 'SME',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      )
    },
  ];

  const getStatusButtonClass = (value: string, isActive: boolean) => {
    const baseClass = "px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2";

    if (isActive) {
      const activeColors: Record<string, string> = {
        all: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50",
        upcoming: "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50",
        ongoing: "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/50",
      };
      return `${baseClass} ${activeColors[value]}`;
    }

    const inactiveColors: Record<string, string> = {
      all: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600",
      upcoming: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-blue-300 dark:border-blue-600 hover:border-blue-400 dark:hover:border-blue-500",
      ongoing: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-green-300 dark:border-green-600 hover:border-green-400 dark:hover:border-green-500",
    };
    return `${baseClass} ${inactiveColors[value]}`;
  };

  const getCategoryButtonClass = (value: string, isActive: boolean) => {
    const baseClass = "px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2";

    if (isActive) {
      const activeColors: Record<string, string> = {
        all: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50",
        mainboard: "bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-lg shadow-indigo-500/50",
        sme: "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50",
      };
      return `${baseClass} ${activeColors[value]}`;
    }

    const inactiveColors: Record<string, string> = {
      all: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600",
      mainboard: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-indigo-300 dark:border-indigo-600 hover:border-indigo-400 dark:hover:border-indigo-500",
      sme: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-purple-300 dark:border-purple-600 hover:border-purple-400 dark:hover:border-purple-500",
    };
    return `${baseClass} ${inactiveColors[value]}`;
  };

  return (
    <div id="ipos">
      {/* Mobile Filter Toggle Buttons */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Status Dropdown */}
          {!hideStatus && (
            <div className="relative">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 px-1 uppercase tracking-wide flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Status
              </div>
              <button
                onClick={() => setShowMobileFilters(showMobileFilters === 'status' ? '' : 'status')}
                className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm font-semibold text-sm active:scale-95 transition-transform"
              >
                <span className="flex items-center gap-2 truncate">
                  {statusFilter === 'ongoing' && (
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                  )}
                  {statusFilters.find(f => f.value === statusFilter)?.icon}
                  <span className="truncate">
                    {statusFilters.find(f => f.value === statusFilter)?.label || 'Select'}
                  </span>
                </span>
                <svg className={`w-5 h-5 ml-2 transition-transform flex-shrink-0 ${showMobileFilters === 'status' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showMobileFilters === 'status' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 z-50 max-h-64 overflow-y-auto">
                  {statusFilters.map(filter => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setStatusFilter(filter.value);
                        setShowMobileFilters('');
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 active:scale-95 ${
                        statusFilter === filter.value
                          ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {filter.hasLiveDot && (
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                        )}
                        {filter.icon}
                        <span>{filter.label}</span>
                      </span>
                      {statusFilter === filter.value && (
                        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Category Dropdown */}
          {!hideCategory && (
            <div className="relative">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 px-1 uppercase tracking-wide flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                Category
              </div>
              <button
                onClick={() => setShowMobileFilters(showMobileFilters === 'category' ? '' : 'category')}
                className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm font-semibold text-sm active:scale-95 transition-transform"
              >
                <span className="flex items-center gap-2 truncate">
                  {categoryFilters.find(f => f.value === categoryFilter)?.icon}
                  <span className="truncate">
                    {categoryFilters.find(f => f.value === categoryFilter)?.label || 'Select'}
                  </span>
                </span>
                <svg className={`w-5 h-5 ml-2 transition-transform flex-shrink-0 ${showMobileFilters === 'category' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showMobileFilters === 'category' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 z-50 max-h-64 overflow-y-auto">
                  {categoryFilters.map(filter => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setCategoryFilter(filter.value);
                        setShowMobileFilters('');
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 active:scale-95 ${
                        categoryFilter === filter.value
                          ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {filter.icon}
                        <span>{filter.label}</span>
                      </span>
                      {categoryFilter === filter.value && (
                        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Status Filters */}
          {!hideStatus && (
            <div className="flex-1">
              <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-5 uppercase tracking-widest flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Status
              </h3>
              <div className="flex flex-wrap gap-3">
                {statusFilters.map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    className={getStatusButtonClass(filter.value, statusFilter === filter.value)}
                  >
                    {filter.hasLiveDot && (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0" />
                    )}
                    {filter.icon}
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category Filters */}
          {!hideCategory && (
            <div className="flex-1">
              <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-5 uppercase tracking-widest flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                Category
              </h3>
              <div className="flex flex-wrap gap-3">
                {categoryFilters.map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setCategoryFilter(filter.value)}
                    className={getCategoryButtonClass(filter.value, categoryFilter === filter.value)}
                  >
                    {filter.icon}
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredIpos.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
            <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No IPOs Found</h2>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters</p>
          </div>
        ) : (
          <ClientPagination allIpos={filteredIpos} />
        )}
      </section>
    </div>
  );
}