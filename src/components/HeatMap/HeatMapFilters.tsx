
'use client';

interface HeatMapFiltersProps {
  sectors: string[];
  months: string[];
  selectedSector: string;
  selectedMonth: string;
  selectedPerformance: string;
  onSectorChange: (sector: string) => void;
  onMonthChange: (month: string) => void;
  onPerformanceChange: (performance: string) => void;
  onExport: () => void;
}

export default function HeatMapFilters({
  sectors,
  months,
  selectedSector,
  selectedMonth,
  selectedPerformance,
  onSectorChange,
  onMonthChange,
  onPerformanceChange,
  onExport
}: HeatMapFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">Filters</span>
        </h2>

        <button
          onClick={onExport}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Sector Filter */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Sector
          </label>
          <select
            value={selectedSector}
            onChange={(e) => onSectorChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
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
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            {months.map(month => (
              <option key={month} value={month}>
                {month === 'all' ? 'All Months' : month}
              </option>
            ))}
          </select>
        </div>

        {/* Performance Filter */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Performance
          </label>
          <select
            value={selectedPerformance}
            onChange={(e) => onPerformanceChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="all">All Performance</option>
            <option value="exceptional">🟢 Exceptional (100%+)</option>
            <option value="excellent">🟢 Excellent (50-100%)</option>
            <option value="very-good">🟡 Very Good (25-50%)</option>
            <option value="good">🟡 Good (10-25%)</option>
            <option value="moderate">🟡 Moderate (0-10%)</option>
            <option value="slightly-negative">🟠 Slightly Negative (0 to -10%)</option>
            <option value="negative">🔴 Negative (-10 to -25%)</option>
            <option value="very-negative">🔴 Very Negative (-25% or below)</option>
          </select>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Legend</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-emerald-500 to-green-600 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Exceptional (100%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Excellent (50-100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-lime-400 to-green-400 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Very Good (25-50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-300 to-lime-400 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Good (10-25%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-amber-400 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Moderate (0-10%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-orange-400 to-amber-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Slightly Negative</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-orange-500 to-red-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Negative</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-red-500 to-rose-600 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Very Negative</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-gray-400 to-gray-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Closed/Listed</span>
          </div>
        </div>
      </div>
    </div>
  );
}