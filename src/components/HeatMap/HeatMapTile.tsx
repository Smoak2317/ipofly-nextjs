// src/components/HeatMap/HeatMapTile.tsx
'use client';

import { IPO } from '@/types/ipo';
import { parseGMP, normalizeCategory, normalizeStatus, slugify } from '@/lib/api';
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

  return (
    <Link
      href={`/ipo/${slugify(ipo.name)}`}
      className={`group relative bg-gradient-to-br ${style.bg} ${style.border} ${style.size} border-2 rounded-lg p-3 sm:p-4 transition-all duration-200 hover:scale-105 ${style.glow} hover:shadow-xl cursor-pointer overflow-hidden flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px]`}
      onMouseEnter={() => onHover(ipo)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => {
        e.preventDefault();
        onClick(ipo);
      }}
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 w-full h-full">
        {/* Logo */}
        {ipo.logoUrl && (
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg bg-white/90 p-1.5 shadow-sm flex-shrink-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ipofly-273428006377.asia-south1.run.app'}${ipo.logoUrl}`}
              alt={`${ipo.name} logo`}
              width={56}
              height={56}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Company Name - Always visible, word-wrap enabled */}
        <h3 className={`${style.fontSize} font-bold text-center line-clamp-3 ${style.text} group-hover:underline px-2 break-words w-full`}>
          {ipo.name}
        </h3>

        {/* Percentage */}
        {percentText && (
          <div className={`${style.fontSize} font-bold ${style.text} whitespace-nowrap`}>
            {percentText}
          </div>
        )}

        {/* Status Badge - Blinking red dot for ongoing */}
        {status === 'ongoing' && (
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}