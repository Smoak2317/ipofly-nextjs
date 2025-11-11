// src/components/HeatMap/HeatMapTile.tsx - FIXED with GMP percentage-based sizing
'use client';

import { IPO } from '@/types/ipo';
import { parseGMP, normalizeStatus } from '@/lib/api';
import Image from 'next/image';

interface HeatMapTileProps {
  ipo: IPO;
  onHover: (ipo: IPO | null) => void;
  onClick: (ipo: IPO) => void;
}

export default function HeatMapTile({ ipo, onHover, onClick }: HeatMapTileProps) {
  const { percentText } = parseGMP(ipo.gmp);
  const status = normalizeStatus(ipo.status);

  const aiAnalysis = ipo.aiAnalysis;
  const hasAIAnalysis = !!aiAnalysis && typeof aiAnalysis === 'object';

  // Extract percentage value for sizing
  const getPercentageValue = (): number => {
    if (!percentText) return 0;
    const match = percentText.match(/\(([-+]?\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const percentValue = getPercentageValue();

  // Get tile style based on GMP percentage
  const getGMPStyle = () => {
    // Closed/Listed IPOs - Gray with normal size
    if (status === 'closed' || status === 'listed' || status === 'allotted') {
      return {
        bg: 'from-gray-400 to-gray-500',
        border: 'border-gray-600',
        text: 'text-white',
        glow: 'hover:shadow-gray-500/30',
        size: 'col-span-1 row-span-1',
        fontSize: 'text-xs',
        minHeight: 'min-h-[80px]'
      };
    }

    // Size categories based on GMP percentage
    // EXTRA LARGE: 100%+
    if (percentValue >= 100) {
      return {
        bg: 'from-emerald-600 to-green-700',
        border: 'border-green-800',
        text: 'text-white',
        glow: 'hover:shadow-green-600/50',
        size: 'col-span-3 row-span-3', // 3x3
        fontSize: 'text-xl sm:text-2xl',
        minHeight: 'min-h-[240px]'
      };
    }
    // LARGE: 50-100%
    else if (percentValue >= 50) {
      return {
        bg: 'from-emerald-500 to-green-600',
        border: 'border-green-700',
        text: 'text-white',
        glow: 'hover:shadow-green-500/40',
        size: 'col-span-2 row-span-2', // 2x2
        fontSize: 'text-lg sm:text-xl',
        minHeight: 'min-h-[160px]'
      };
    }
    // MEDIUM: 20-50%
    else if (percentValue >= 20) {
      return {
        bg: 'from-yellow-400 to-amber-500',
        border: 'border-yellow-600',
        text: 'text-gray-900',
        glow: 'hover:shadow-yellow-500/40',
        size: 'col-span-2 row-span-1', // 2x1
        fontSize: 'text-sm sm:text-base',
        minHeight: 'min-h-[100px]'
      };
    }
    // SMALL: 0-20%
    else if (percentValue >= 0) {
      return {
        bg: 'from-yellow-300 to-amber-400',
        border: 'border-yellow-500',
        text: 'text-gray-900',
        glow: 'hover:shadow-yellow-400/40',
        size: 'col-span-1 row-span-1', // 1x1
        fontSize: 'text-xs',
        minHeight: 'min-h-[80px]'
      };
    }
    // NEGATIVE: Below 0%
    else {
      return {
        bg: 'from-red-500 to-rose-600',
        border: 'border-red-700',
        text: 'text-white',
        glow: 'hover:shadow-red-500/40',
        size: 'col-span-1 row-span-1', // 1x1
        fontSize: 'text-xs',
        minHeight: 'min-h-[80px]'
      };
    }
  };

  const style = getGMPStyle();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(ipo);
  };

  return (
    <div
      className={`group relative bg-gradient-to-br ${style.bg} ${style.border} ${style.size} border-2 rounded-lg p-2 sm:p-3 transition-all duration-200 hover:scale-105 ${style.glow} hover:shadow-xl cursor-pointer overflow-hidden flex flex-col items-center justify-center ${style.minHeight}`}
      onMouseEnter={() => onHover(ipo)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full p-1">
        {/* Logo - Larger for bigger tiles */}
        {ipo.logoUrl && (
          <div className={`${style.size.includes('col-span-3') ? 'w-16 h-16' : style.size.includes('col-span-2') ? 'w-10 h-10' : 'w-6 h-6'} rounded bg-white/90 p-0.5 shadow-sm flex-shrink-0 mb-1`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ipofly-273428006377.asia-south1.run.app'}${ipo.logoUrl}`}
              alt={`${ipo.name} logo`}
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Company Name */}
        <h3 className={`${style.fontSize} font-bold text-center line-clamp-2 ${style.text} group-hover:underline px-1 break-words w-full leading-tight`}>
          {ipo.name}
        </h3>

        {/* Percentage - Prominent for larger tiles */}
        {percentText && (
          <div className={`${style.size.includes('col-span-3') ? 'text-lg' : style.size.includes('col-span-2') ? 'text-sm' : 'text-xs'} font-bold ${style.text} whitespace-nowrap mt-1`}>
            {percentText}
          </div>
        )}

        {/* AI Score Badge */}
        {hasAIAnalysis && (
          <div className="absolute top-1 right-1">
            <div className={`px-1 py-0.5 rounded ${style.size.includes('col-span-3') ? 'text-xs' : 'text-[8px]'} font-bold ${
              aiAnalysis.score >= 70 ? 'bg-green-500 text-white' :
              aiAnalysis.score >= 50 ? 'bg-yellow-500 text-gray-900' :
              'bg-red-500 text-white'
            }`}>
              {aiAnalysis.score.toFixed(0)}
            </div>
          </div>
        )}

        {/* Live Status - Blinking red dot */}
        {status === 'ongoing' && (
          <div className="absolute top-1 left-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}