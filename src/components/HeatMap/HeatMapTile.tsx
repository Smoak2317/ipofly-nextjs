// src/components/HeatMap/HeatMapTile.tsx - FIXED CLICK HANDLER
'use client';

import { IPO } from '@/types/ipo';
import { parseGMP, normalizeStatus, slugify } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

interface HeatMapTileProps {
  ipo: IPO;
  onHover: (ipo: IPO | null) => void;
  onClick: (ipo: IPO) => void;
}

export default function HeatMapTile({ ipo, onHover, onClick }: HeatMapTileProps) {
  const { percentText } = parseGMP(ipo.gmp);
  const status = normalizeStatus(ipo.status);
  const slug = slugify(ipo.name || 'unknown');

  // Safe AI analysis access
  const aiAnalysis = ipo.aiAnalysis;
  const hasAIAnalysis = !!aiAnalysis && typeof aiAnalysis === 'object';

  // Get tile color and size based on GMP percentage (3 colors only: High, Moderate, Low)
  const getGMPStyle = () => {
    const percentMatch = percentText?.match(/\(([-+]?\d+\.?\d*)/);
    const percent = percentMatch ? parseFloat(percentMatch[1]) : 0;

    // Closed/Listed IPOs - Gray with normal size
    if (status === 'closed' || status === 'listed' || status === 'allotted') {
      return {
        bg: 'from-gray-400 to-gray-500',
        border: 'border-gray-600',
        text: 'text-white',
        glow: 'hover:shadow-gray-500/30',
        size: 'col-span-1 row-span-1',
        fontSize: 'text-xs'
      };
    }

    // HIGH (50%+) - Bright Green - LARGE (2x2)
    if (percent >= 50) {
      return {
        bg: 'from-emerald-500 to-green-600',
        border: 'border-green-700',
        text: 'text-white',
        glow: 'hover:shadow-green-500/40',
        size: 'col-span-2 row-span-2',
        fontSize: 'text-base sm:text-lg'
      };
    }
    // MODERATE (0% to 50%) - Yellow/Amber - MEDIUM (1x1)
    else if (percent >= 0) {
      return {
        bg: 'from-yellow-400 to-amber-500',
        border: 'border-yellow-600',
        text: 'text-gray-900',
        glow: 'hover:shadow-yellow-500/40',
        size: 'col-span-1 row-span-1',
        fontSize: 'text-xs sm:text-sm'
      };
    }
    // LOW (Below 0%) - Red - SMALL (1x1)
    else {
      return {
        bg: 'from-red-500 to-rose-600',
        border: 'border-red-700',
        text: 'text-white',
        glow: 'hover:shadow-red-500/40',
        size: 'col-span-1 row-span-1',
        fontSize: 'text-xs'
      };
    }
  };

  const style = getGMPStyle();

  // Handle click
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('HeatMapTile clicked:', ipo.name);
    onClick(ipo);
  };

  return (
    <div
      className={`group relative bg-gradient-to-br ${style.bg} ${style.border} ${style.size} border-2 rounded-lg p-2 sm:p-3 transition-all duration-200 hover:scale-105 ${style.glow} hover:shadow-xl cursor-pointer overflow-hidden flex flex-col items-center justify-center min-h-[80px] sm:min-h-[100px]`}
      onMouseEnter={() => onHover(ipo)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full p-1">
        {/* Logo */}
        {ipo.logoUrl && (
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-white/90 p-0.5 shadow-sm flex-shrink-0 mb-1">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ipofly-273428006377.asia-south1.run.app'}${ipo.logoUrl}`}
              alt={`${ipo.name} logo`}
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Company Name - Always visible, word-wrap enabled */}
        <h3 className={`${style.fontSize} font-bold text-center line-clamp-2 ${style.text} group-hover:underline px-1 break-words w-full leading-tight`}>
          {ipo.name}
        </h3>

        {/* Percentage */}
        {percentText && (
          <div className={`${style.fontSize === 'text-base sm:text-lg' ? 'text-sm' : 'text-xs'} font-bold ${style.text} whitespace-nowrap mt-1`}>
            {percentText}
          </div>
        )}

        {/* AI Score Badge - Small and subtle */}
        {hasAIAnalysis && (
          <div className="absolute top-1 right-1">
            <div className={`px-1 py-0.5 rounded text-[8px] font-bold ${
              aiAnalysis.score >= 70 ? 'bg-green-500 text-white' :
              aiAnalysis.score >= 50 ? 'bg-yellow-500 text-gray-900' :
              'bg-red-500 text-white'
            }`}>
              {aiAnalysis.score}
            </div>
          </div>
        )}

        {/* Status Badge - Blinking red dot for ongoing */}
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