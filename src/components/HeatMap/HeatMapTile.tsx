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
  const { amount, percentText } = parseGMP(ipo.gmp);
  const status = normalizeStatus(ipo.status);

  // Get tile color based on GMP percentage (not absolute value)
  const getGMPColor = () => {
    const percentMatch = percentText?.match(/\(([-+]?\d+\.?\d*)/);
    const percent = percentMatch ? parseFloat(percentMatch[1]) : 0;

    // Closed/Listed IPOs - Gray
    if (status === 'closed' || status === 'listed' || status === 'allotted') {
      return {
        bg: 'from-gray-400 to-gray-500',
        border: 'border-gray-600',
        text: 'text-white',
        glow: 'hover:shadow-gray-500/30'
      };
    }

    // Color scale based on percentage gains
    if (percent >= 100) {
      // Exceptional (100%+) - Bright Green
      return {
        bg: 'from-emerald-500 to-green-600',
        border: 'border-green-700',
        text: 'text-white',
        glow: 'hover:shadow-green-500/40'
      };
    } else if (percent >= 50) {
      // Excellent (50-100%) - Green
      return {
        bg: 'from-green-400 to-emerald-500',
        border: 'border-green-600',
        text: 'text-white',
        glow: 'hover:shadow-green-400/40'
      };
    } else if (percent >= 25) {
      // Very Good (25-50%) - Light Green
      return {
        bg: 'from-lime-400 to-green-400',
        border: 'border-lime-600',
        text: 'text-gray-900',
        glow: 'hover:shadow-lime-400/40'
      };
    } else if (percent >= 10) {
      // Good (10-25%) - Yellow-Green
      return {
        bg: 'from-yellow-300 to-lime-400',
        border: 'border-yellow-500',
        text: 'text-gray-900',
        glow: 'hover:shadow-yellow-400/40'
      };
    } else if (percent >= 0) {
      // Moderate (0-10%) - Yellow
      return {
        bg: 'from-yellow-400 to-amber-400',
        border: 'border-yellow-600',
        text: 'text-gray-900',
        glow: 'hover:shadow-yellow-500/40'
      };
    } else if (percent >= -10) {
      // Slightly Negative (0 to -10%) - Orange
      return {
        bg: 'from-orange-400 to-amber-500',
        border: 'border-orange-600',
        text: 'text-white',
        glow: 'hover:shadow-orange-500/40'
      };
    } else if (percent >= -25) {
      // Negative (-10 to -25%) - Dark Orange
      return {
        bg: 'from-orange-500 to-red-500',
        border: 'border-orange-700',
        text: 'text-white',
        glow: 'hover:shadow-orange-600/40'
      };
    } else {
      // Very Negative (-25% or below) - Red
      return {
        bg: 'from-red-500 to-rose-600',
        border: 'border-red-700',
        text: 'text-white',
        glow: 'hover:shadow-red-500/40'
      };
    }
  };

  const colors = getGMPColor();

  return (
    <Link
      href={`/ipo/${slugify(ipo.name)}`}
      className={`group relative bg-gradient-to-br ${colors.bg} ${colors.border} border-2 rounded-lg p-2 sm:p-3 transition-all duration-200 hover:scale-105 ${colors.glow} hover:shadow-xl cursor-pointer overflow-hidden aspect-square flex flex-col items-center justify-center`}
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
      <div className="relative z-10 flex flex-col items-center justify-center gap-1 w-full h-full">
        {/* Logo */}
        {ipo.logoUrl && (
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-white/90 p-1 shadow-sm flex-shrink-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ipofly-273428006377.asia-south1.run.app'}${ipo.logoUrl}`}
              alt={`${ipo.name} logo`}
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Company Name */}
        <h3 className={`font-bold text-[10px] sm:text-xs lg:text-sm text-center line-clamp-2 ${colors.text} group-hover:underline px-1`}>
          {ipo.name}
        </h3>

        {/* Percentage */}
        {percentText && (
          <div className={`text-xs sm:text-sm lg:text-base font-bold ${colors.text}`}>
            {percentText}
          </div>
        )}

        {/* Status Badge - Only for ongoing */}
        {status === 'ongoing' && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg" />
        )}
      </div>
    </Link>
  );
}