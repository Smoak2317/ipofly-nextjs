'use client';

import { useState, useMemo, useRef } from 'react';
import { IPO } from '@/types/ipo';
import { parseGMP, normalizeCategory, normalizeStatus } from '@/lib/api';
import Link from 'next/link';
import { slugify } from '@/lib/api';
import html2canvas from 'html2canvas';

interface HeatMapClientProps {
  ipos: IPO[];
}

export default function HeatMapClient({ ipos }: HeatMapClientProps) {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedPerformance, setSelectedPerformance] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [hoveredIPO, setHoveredIPO] = useState<IPO | null>(null);
  const [selectedIPO, setSelectedIPO] = useState<IPO | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heatmapRef = useRef<HTMLDivElement>(null);

  // Extract sectors from company descriptions and categories
  const sectors = useMemo(() => {
    const sectorSet = new Set<string>();

    ipos.forEach(ipo => {
      const desc = ipo.companyDescription?.toLowerCase() || '';
      const name = ipo.name.toLowerCase();

      // Detect sectors from description and name
      if (desc.includes('tech') || name.includes('tech') || desc.includes('software') || desc.includes('digital')) {
        sectorSet.add('Technology');
      }
      if (desc.includes('finance') || desc.includes('fintech') || name.includes('finance')) {
        sectorSet.add('Finance');
      }
      if (desc.includes('healthcare') || desc.includes('pharma') || desc.includes('medical')) {
        sectorSet.add('Healthcare');
      }
      if (desc.includes('fmcg') || desc.includes('food') || desc.includes('beverage') || desc.includes('consumer')) {
        sectorSet.add('FMCG');
      }
      if (desc.includes('energy') || desc.includes('power') || desc.includes('solar') || desc.includes('green')) {
        sectorSet.add('Energy');
      }
      if (desc.includes('infrastructure') || desc.includes('construction') || desc.includes('real estate')) {
        sectorSet.add('Infrastructure');
      }
      if (desc.includes('retail') || desc.includes('e-commerce') || desc.includes('eyewear') || name.includes('lenskart')) {
        sectorSet.add('Retail');
      }
      if (desc.includes('manufacturing') || desc.includes('industrial')) {
        sectorSet.add('Manufacturing');
      }
      if (desc.includes('logistics') || desc.includes('transport')) {
        sectorSet.add('Logistics');
      }
      if (desc.includes('education') || desc.includes('edtech')) {
        sectorSet.add('Education');
      }
      if (desc.includes('auto') || desc.includes('automotive')) {
        sectorSet.add('Automotive');
      }

      // Default sector if none matched
      if (![...sectorSet].some(s => {
        const lowerDesc = desc + name;
        return lowerDesc.includes(s.toLowerCase());
      })) {
        sectorSet.add('Others');
      }
    });

    return ['all', ...Array.from(sectorSet).sort()];
  }, [ipos]);

  // Extract months from issue dates
  const months = useMemo(() => {
    const monthSet = new Set<string>();

    ipos.forEach(ipo => {
      try {
        const date = new Date(ipo.issueOpenDate);
        if (!isNaN(date.getTime())) {
          const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          monthSet.add(monthYear);
        }
      } catch (e) {
        // Skip invalid dates
      }
    });

    return ['all', ...Array.from(monthSet).sort((a, b) => {
      if (a === 'all') return -1;
      if (b === 'all') return 1;
      return new Date(a).getTime() - new Date(b).getTime();
    })];
  }, [ipos]);

  // Get sector for an IPO
  const getIPOSector = (ipo: IPO): string => {
    const desc = ipo.companyDescription?.toLowerCase() || '';
    const name = ipo.name.toLowerCase();

    if (desc.includes('tech') || name.includes('tech') || desc.includes('software') || desc.includes('digital')) return 'Technology';
    if (desc.includes('finance') || desc.includes('fintech') || name.includes('finance')) return 'Finance';
    if (desc.includes('healthcare') || desc.includes('pharma') || desc.includes('medical')) return 'Healthcare';
    if (desc.includes('fmcg') || desc.includes('food') || desc.includes('beverage') || desc.includes('consumer')) return 'FMCG';
    if (desc.includes('energy') || desc.includes('power') || desc.includes('solar') || desc.includes('green')) return 'Energy';
    if (desc.includes('infrastructure') || desc.includes('construction') || desc.includes('real estate')) return 'Infrastructure';
    if (desc.includes('retail') || desc.includes('e-commerce') || desc.includes('eyewear') || name.includes('lenskart')) return 'Retail';
    if (desc.includes('manufacturing') || desc.includes('industrial')) return 'Manufacturing';
    if (desc.includes('logistics') || desc.includes('transport')) return 'Logistics';
    if (desc.includes('education') || desc.includes('edtech')) return 'Education';
    if (desc.includes('auto') || desc.includes('automotive')) return 'Automotive';

    return 'Others';
  };

  // Filter IPOs
  const filteredIPOs = useMemo(() => {
    return ipos.filter(ipo => {
      // Sector filter
      if (selectedSector !== 'all') {
        const ipoSector = getIPOSector(ipo);
        if (ipoSector !== selectedSector) return false;
      }

      // Month filter
      if (selectedMonth !== 'all') {
        try {
          const date = new Date(ipo.issueOpenDate);
          const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          if (monthYear !== selectedMonth) return false;
        } catch (e) {
          return false;
        }
      }

      // Performance filter
      if (selectedPerformance !== 'all') {
        const { amount } = parseGMP(ipo.gmp);
        if (selectedPerformance === 'hot' && amount <= 50) return false;
        if (selectedPerformance === 'moderate' && (amount < 0 || amount > 50)) return false;
        if (selectedPerformance === 'weak' && amount >= 0) return false;
      }

      return true;
    });
  }, [ipos, selectedSector, selectedMonth, selectedPerformance]);

  // Get color based on GMP and subscription
  const getTileColor = (ipo: IPO): { bg: string; border: string; text: string; glow: string } => {
    const { amount } = parseGMP(ipo.gmp);
    const status = normalizeStatus(ipo.status);

    // Parse subscription (e.g., "15.5x" -> 15.5)
    const subMatch = ipo.subscription?.match(/(\d+\.?\d*)/);
    const subValue = subMatch ? parseFloat(subMatch[0]) : 0;

    // Closed/Listed IPOs
    if (status === 'closed' || status === 'listed' || status === 'allotted') {
      return {
        bg: 'bg-gradient-to-br from-gray-400 to-gray-500',
        border: 'border-gray-600',
        text: 'text-white',
        glow: 'shadow-gray-500/50'
      };
    }

    // Hot IPOs: GMP > 50 and high subscription
    if (amount > 50 && (subValue > 10 || status === 'ongoing')) {
      return {
        bg: 'bg-gradient-to-br from-green-500 to-emerald-600',
        border: 'border-green-700',
        text: 'text-white',
        glow: 'shadow-green-500/50'
      };
    }

    // Moderate IPOs: GMP 0-50
    if (amount >= 0 && amount <= 50) {
      return {
        bg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
        border: 'border-yellow-600',
        text: 'text-white',
        glow: 'shadow-yellow-500/50'
      };
    }

    // Weak IPOs: Negative GMP
    if (amount < 0) {
      return {
        bg: 'bg-gradient-to-br from-red-500 to-rose-600',
        border: 'border-red-700',
        text: 'text-white',
        glow: 'shadow-red-500/50'
      };
    }

    // Default (Upcoming with no GMP data)
    return {
      bg: 'bg-gradient-to-br from-blue-400 to-blue-500',
      border: 'border-blue-600',
      text: 'text-white',
      glow: 'shadow-blue-500/50'
    };
  };

  // Get tile size based on issue size
  const getTileSize = (ipo: IPO): string => {
    const sizeStr = ipo.issueSize.replace(/[^0-9.]/g, '');
    const size = parseFloat(sizeStr);

    if (size > 5000) return 'col-span-2 row-span-2'; // Large
    if (size > 1000) return 'col-span-2 row-span-1'; // Medium
    return 'col-span-1 row-span-1'; // Small
  };

  // Export as image
  const exportAsImage = async () => {
    if (!heatmapRef.current) return;

    try {
      // Create a temporary canvas
      const element = heatmapRef.current;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Set canvas size
      canvas.width = element.offsetWidth * 2;
      canvas.height = element.offsetHeight * 2;

      // Scale for better quality
      ctx.scale(2, 2);

      // Draw white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add text info
      ctx.fillStyle = '#000000';
      ctx.font = '24px Arial';
      ctx.fillText('IPO Heat Map - IpoFly', 20, 40);
      ctx.font = '16px Arial';
      ctx.fillText(`Generated: ${new Date().toLocaleDateString()}`, 20, 70);

      // Download
      const link = document.createElement('a');
      link.download = `ipo-heatmap-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      alert('Heat map exported successfully! Note: For full visual export, use browser screenshot (Ctrl+Shift+S or Cmd+Shift+4)');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please use browser screenshot feature instead.');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Filters
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => setViewMode(viewMode === '2d' ? '3d' : '2d')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {viewMode === '2d' ? '3D View' : '2D View'}
            </button>

            <button
              onClick={exportAsImage}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sector Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Sector
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {months.map(month => (
                <option key={month} value={month}>
                  {month === 'all' ? 'All Months' : month}
                </option>
              ))}
            </select>
          </div>

          {/* Performance Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Performance
            </label>
            <select
              value={selectedPerformance}
              onChange={(e) => setSelectedPerformance(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Performance</option>
              <option value="hot">🟢 Hot (GMP &gt; 50)</option>
              <option value="moderate">🟡 Moderate (GMP 0-50)</option>
              <option value="weak">🔴 Weak (GMP &lt; 0)</option>
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">🟢 Hot (GMP &gt; 50)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">🟡 Moderate (GMP 0-50)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-rose-600 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">🔴 Weak (Negative GMP)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">⚫ Closed/Listed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">🔵 Upcoming</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            * Tile size represents issue size (larger = bigger IPO)
          </p>
        </div>
      </div>

      {/* Heat Map Grid */}
      <div ref={heatmapRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Market Overview ({filteredIPOs.length} IPOs)
          </h2>
        </div>

        {filteredIPOs.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No IPOs Found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters</p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-fr ${viewMode === '3d' ? 'perspective-1000' : ''}`}
            onMouseMove={handleMouseMove}
          >
            {filteredIPOs.map((ipo) => {
              const colors = getTileColor(ipo);
              const { amountText, isPositive } = parseGMP(ipo.gmp);
              const status = normalizeStatus(ipo.status);
              const size = getTileSize(ipo);

              return (
                <Link
                  key={ipo._id}
                  href={`/ipo/${slugify(ipo.name)}`}
                  className={`${size} ${colors.bg} ${colors.border} border-2 rounded-lg p-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${colors.glow} cursor-pointer relative overflow-hidden group ${
                    viewMode === '3d' ? 'transform-gpu hover:rotate-y-6' : ''
                  }`}
                  onMouseEnter={() => setHoveredIPO(ipo)}
                  onMouseLeave={() => setHoveredIPO(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedIPO(ipo);
                  }}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold mb-2 ${
                      status === 'ongoing'
                        ? 'bg-green-500/20 text-green-100 border border-green-400/30'
                        : status === 'upcoming'
                        ? 'bg-blue-500/20 text-blue-100 border border-blue-400/30'
                        : 'bg-gray-500/20 text-gray-100 border border-gray-400/30'
                    }`}>
                      {status === 'ongoing' && <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>}
                      {status.toUpperCase()}
                    </div>

                    {/* IPO Name */}
                    <h3 className={`font-bold text-xs mb-2 line-clamp-2 ${colors.text} group-hover:underline`}>
                      {ipo.name}
                    </h3>

                    {/* GMP */}
                    <div className="flex items-center gap-1 mb-1">
                      <svg className="w-3 h-3 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-bold">{amountText}</span>
                    </div>

                    {/* Category */}
                    <div className="text-[10px] opacity-80 uppercase tracking-wide">
                      {normalizeCategory(ipo.category)}
                    </div>

                    {/* Issue Size */}
                    <div className="text-[10px] opacity-80 mt-1">
                      {ipo.issueSize}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Tooltip */}
      {hoveredIPO && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y + 20,
          }}
        >
          <div className="bg-gray-900 text-white rounded-lg shadow-2xl p-4 max-w-sm border border-gray-700">
            <h3 className="font-bold text-sm mb-2">{hoveredIPO.name}</h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">GMP:</span>
                <span className="font-semibold">{parseGMP(hoveredIPO.gmp).amountText}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price:</span>
                <span>{hoveredIPO.issuePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Size:</span>
                <span>{hoveredIPO.issueSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Subscription:</span>
                <span>{hoveredIPO.subscription || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="capitalize">{normalizeStatus(hoveredIPO.status)}</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">Click for details</p>
          </div>
        </div>
      )}

      {/* Modal for Selected IPO */}
      {selectedIPO && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedIPO(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedIPO.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      normalizeStatus(selectedIPO.status) === 'ongoing'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : normalizeStatus(selectedIPO.status) === 'upcoming'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {normalizeStatus(selectedIPO.status)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400">
                      {normalizeCategory(selectedIPO.category)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIPO(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">GMP</div>
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {parseGMP(selectedIPO.gmp).amountText}
                  </div>
                  {parseGMP(selectedIPO.gmp).percentText && (
                    <div className="text-sm text-indigo-500 dark:text-indigo-400">
                      {parseGMP(selectedIPO.gmp).percentText}
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Issue Size</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {selectedIPO.issueSize}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Issue Price</div>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {selectedIPO.issuePrice}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Subscription</div>
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {selectedIPO.subscription || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Important Dates</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Open:</span>
                    <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">{selectedIPO.issueOpenDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Close:</span>
                    <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">{selectedIPO.issueCloseDate}</span>
                  </div>
                  {selectedIPO.allotmentDate && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Allotment:</span>
                      <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">{selectedIPO.allotmentDate}</span>
                    </div>
                  )}
                  {selectedIPO.listingDate && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Listing:</span>
                      <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">{selectedIPO.listingDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {selectedIPO.companyDescription && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">About</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4">
                    {selectedIPO.companyDescription}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  href={`/ipo/${slugify(selectedIPO.name)}`}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all text-center"
                  onClick={() => setSelectedIPO(null)}
                >
                  View Full Details
                </Link>
                <button
                  onClick={() => setSelectedIPO(null)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}