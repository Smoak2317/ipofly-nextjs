// src/components/HeatMapClient.tsx
'use client';

import { useState, useMemo } from 'react';
import { IPO } from '@/types/ipo';
import { parseGMP } from '@/lib/api';
import HeatMapFilters from './HeatMapFilters';
import HeatMapTile from './HeatMapTile';
import HeatMapTooltip from './HeatMapTooltip';
import HeatMapModal from './HeatMapModal';

interface HeatMapClientProps {
  ipos: IPO[];
}

export default function HeatMapClient({ ipos }: HeatMapClientProps) {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedPerformance, setSelectedPerformance] = useState<string>('all');
  const [hoveredIPO, setHoveredIPO] = useState<IPO | null>(null);
  const [selectedIPO, setSelectedIPO] = useState<IPO | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Extract sectors from company descriptions and categories
  const sectors = useMemo(() => {
    const sectorSet = new Set<string>();

    ipos.forEach(ipo => {
      const desc = ipo.companyDescription?.toLowerCase() || '';
      const name = ipo.name.toLowerCase();

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
        const { percentText } = parseGMP(ipo.gmp);
        const percentMatch = percentText?.match(/\(([-+]?\d+\.?\d*)/);
        const percent = percentMatch ? parseFloat(percentMatch[1]) : 0;

        if (selectedPerformance === 'exceptional' && percent < 100) return false;
        if (selectedPerformance === 'excellent' && (percent < 50 || percent >= 100)) return false;
        if (selectedPerformance === 'very-good' && (percent < 25 || percent >= 50)) return false;
        if (selectedPerformance === 'good' && (percent < 10 || percent >= 25)) return false;
        if (selectedPerformance === 'moderate' && (percent < 0 || percent >= 10)) return false;
        if (selectedPerformance === 'slightly-negative' && (percent < -10 || percent >= 0)) return false;
        if (selectedPerformance === 'negative' && (percent < -25 || percent >= -10)) return false;
        if (selectedPerformance === 'very-negative' && percent >= -25) return false;
      }

      return true;
    });
  }, [ipos, selectedSector, selectedMonth, selectedPerformance]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleExport = () => {
    alert('To export the heat map, use your browser\'s screenshot feature (Ctrl+Shift+S or Cmd+Shift+4)');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Filters */}
      <HeatMapFilters
        sectors={sectors}
        months={months}
        selectedSector={selectedSector}
        selectedMonth={selectedMonth}
        selectedPerformance={selectedPerformance}
        onSectorChange={setSelectedSector}
        onMonthChange={setSelectedMonth}
        onPerformanceChange={setSelectedPerformance}
        onExport={handleExport}
      />

      {/* Heat Map Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
            Market Overview ({filteredIPOs.length} IPOs)
          </h2>
        </div>

        {filteredIPOs.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">No IPOs Found</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Try adjusting your filters</p>
          </div>
        ) : (
          <div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3"
            onMouseMove={handleMouseMove}
          >
            {filteredIPOs.map((ipo) => (
              <HeatMapTile
                key={ipo._id}
                ipo={ipo}
                onHover={setHoveredIPO}
                onClick={setSelectedIPO}
              />
            ))}
          </div>
        )}
      </div>

      {/* Tooltip */}
      {hoveredIPO && (
        <HeatMapTooltip ipo={hoveredIPO} position={mousePosition} />
      )}

      {/* Modal */}
      {selectedIPO && (
        <HeatMapModal ipo={selectedIPO} onClose={() => setSelectedIPO(null)} />
      )}
    </div>
  );
}