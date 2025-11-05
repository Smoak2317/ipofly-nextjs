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
    { value: 'all', label: 'All', icon: '🌍' },
    { value: 'upcoming', label: 'Upcoming', icon: '📅' },
    { value: 'ongoing', label: 'LIVE', icon: '', hasLiveDot: true },
  ];

  const categoryFilters = [
    { value: 'all', label: 'All IPOs', icon: '🌐' },
    { value: 'mainboard', label: 'Mainboard', icon: '🏛️' },
    { value: 'sme', label: 'SME', icon: '🚀' },
  ];

  const getStatusButtonClass = (value: string, isActive: boolean) => {
    const baseClass = "px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105";

    if (isActive) {
      const activeColors: Record<string, string> = {
        all: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg",
        upcoming: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg",
        ongoing: "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg",
      };
      return `${baseClass} ${activeColors[value]}`;
    }

    const inactiveColors: Record<string, string> = {
      all: "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600",
      upcoming: "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-blue-300 dark:border-blue-600",
      ongoing: "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-green-400 dark:border-green-600",
    };
    return `${baseClass} ${inactiveColors[value]}`;
  };

  const getCategoryButtonClass = (value: string, isActive: boolean) => {
    const baseClass = "px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105";

    if (isActive) {
      const activeColors: Record<string, string> = {
        all: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg",
        mainboard: "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg",
        sme: "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg",
      };
      return `${baseClass} ${activeColors[value]}`;
    }

    const inactiveColors: Record<string, string> = {
      all: "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600",
      mainboard: "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-indigo-400 dark:border-indigo-600",
      sme: "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-purple-400 dark:border-purple-600",
    };
    return `${baseClass} ${inactiveColors[value]}`;
  };

  return (
    <div>
      {/* Mobile Filter Toggle Buttons */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-2 gap-2">
          {/* Status Dropdown */}
          {!hideStatus && (
            <div className="relative">
              <div className="text-[10px] font-bold text-gray-500 dark:text-gray-500 mb-1 px-0.5 uppercase tracking-wide">Status</div>
              <button
                onClick={() => setShowMobileFilters(showMobileFilters === 'status' ? '' : 'status')}
                className="w-full flex items-center justify-between px-2.5 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm font-semibold text-xs active:scale-95 transition-transform"
              >
                <span className="flex items-center gap-1 truncate">
                  {statusFilter === 'ongoing' && (
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                  )}
                  <span className="truncate">
                    {statusFilters.find(f => f.value === statusFilter)?.label || 'Select'}
                  </span>
                </span>
                <span className={`text-sm ml-1 transition-transform flex-shrink-0 ${showMobileFilters === 'status' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Status Dropdown Menu */}
              {showMobileFilters === 'status' && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-56 overflow-y-auto">
                  {statusFilters.map(filter => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setStatusFilter(filter.value);
                        setShowMobileFilters('');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 active:scale-95 ${
                        statusFilter === filter.value
                          ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {filter.hasLiveDot && (
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                        )}
                        {filter.icon && <span className="text-sm">{filter.icon}</span>}
                        <span>{filter.label}</span>
                      </span>
                      {statusFilter === filter.value && <span className="text-indigo-600 dark:text-indigo-400 text-sm">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Category Dropdown */}
          {!hideCategory && (
            <div className="relative">
              <div className="text-[10px] font-bold text-gray-500 dark:text-gray-500 mb-1 px-0.5 uppercase tracking-wide">Category</div>
              <button
                onClick={() => setShowMobileFilters(showMobileFilters === 'category' ? '' : 'category')}
                className="w-full flex items-center justify-between px-2.5 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm font-semibold text-xs active:scale-95 transition-transform"
              >
                <span className="truncate">
                  {categoryFilters.find(f => f.value === categoryFilter)?.label || 'Select'}
                </span>
                <span className={`text-sm ml-1 transition-transform flex-shrink-0 ${showMobileFilters === 'category' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Category Dropdown Menu */}
              {showMobileFilters === 'category' && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-56 overflow-y-auto">
                  {categoryFilters.map(filter => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setCategoryFilter(filter.value);
                        setShowMobileFilters('');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 active:scale-95 ${
                        categoryFilter === filter.value
                          ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="text-sm">{filter.icon}</span>
                        <span>{filter.label}</span>
                      </span>
                      {categoryFilter === filter.value && <span className="text-indigo-600 dark:text-indigo-400 text-sm">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-800/50">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Status Filters */}
          {!hideStatus && (
            <div className="flex-1">
              <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-widest">
                📅 Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {statusFilters.map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    className={getStatusButtonClass(filter.value, statusFilter === filter.value)}
                  >
                    <span className="flex items-center gap-1.5">
                      {filter.hasLiveDot && (
                        <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse flex-shrink-0" />
                      )}
                      {filter.icon && <span>{filter.icon}</span>}
                      <span>{filter.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category Filters */}
          {!hideCategory && (
            <div className="flex-1">
              <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-widest">
                📊 Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categoryFilters.map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setCategoryFilter(filter.value)}
                    className={getCategoryButtonClass(filter.value, categoryFilter === filter.value)}
                  >
                    {filter.icon} {filter.label}
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