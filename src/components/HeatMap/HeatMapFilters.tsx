// src/components/HeatMap/HeatMapFilters.tsx
'use client';

interface HeatMapFiltersProps {
  sectors: string[];
  months: string[];
  categories: string[];
  statuses: string[];
  selectedSector: string;
  selectedMonth: string;
  selectedCategory: string;
  selectedStatus: string;
  selectedPerformance: string;
  onSectorChange: (sector: string) => void;
  onMonthChange: (month: string) => void;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onPerformanceChange: (performance: string) => void;
  onExport: () => void;
}

export default function HeatMapFilters({
  sectors,
  months,
  categories,
  statuses,
  selectedSector,
  selectedMonth,
  selectedCategory,
  selectedStatus,
  selectedPerformance,
  onSectorChange,
  onMonthChange,
  onCategoryChange,
  onStatusChange,
  onPerformanceChange,
  onExport
}: HeatMapFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-8 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">Filters</span>
        </h2>

        <button
          onClick={onExport}
          className="px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 text-xs sm:text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Filter Controls - Compact Mobile Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-[10px] sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All' : category === 'mainboard' ? 'Mainboard' : 'SME'}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-[10px] sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sector Filter */}
        <div>
          <label className="block text-[10px] sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Sector
          </label>
          <select
            value={selectedSector}
            onChange={(e) => onSectorChange(e.target.value)}
            className="w-full px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
          >
            {sectors.map(sector => (
              <option key={sector} value={sector}>
                {sector === 'all' ? 'All Sectors' : sector}
              </option>
            ))}
          </select>
        </div>

        {/* Month Filter */}
        <div>
          <label className="block text-[10px] sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="w-full px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
          >
            {months.map(month => (
              <option key={month} value={month}>
                {month === 'all' ? 'All Months' : month}
              </option>
            ))}
          </select>
        </div>

        {/* Performance Filter */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[10px] sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Performance
          </label>
          <select
            value={selectedPerformance}
            onChange={(e) => onPerformanceChange(e.target.value)}
            className="w-full px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
          >
            <option value="all">All</option>
            <option value="high">🟢 High (50%+)</option>
            <option value="moderate">🟡 Moderate (0-50%)</option>
            <option value="low">🔴 Low (Below 0%)</option>
          </select>
        </div>
      </div>

      {/* Legend - Updated */}
      <div className="mt-3 sm:mt-6 pt-3 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Legend</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-emerald-700 to-green-800 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">150%+</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-emerald-500 to-green-600 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">50-100%</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">10-50%</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-red-500 to-rose-600 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Negative</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-blue-400 to-blue-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Upcoming</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-gray-400 to-gray-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
}