// src/components/HeatMap/HeatMapTile.tsx - BIGGER TILES VERSION
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

  const getPercentageValue = (): number => {
    if (!percentText) return 0;
    const match = percentText.match(/\(([-+]?\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const percentValue = getPercentageValue();

  const getStatusBasedStyle = () => {
    // Status-based styling for non-open IPOs
    const statusStyles: Record<string, any> = {
      upcoming: {
        bg: 'from-blue-400 to-blue-500',
        border: 'border-blue-600',
        text: 'text-white',
        glow: 'hover:shadow-blue-500/40',
        size: 'col-span-2 row-span-2',
        fontSize: 'text-sm',
        logoSize: 'w-16 h-16',
        minHeight: 'min-h-[140px]'
      },
      closed: {
        bg: 'from-gray-400 to-gray-500',
        border: 'border-gray-600',
        text: 'text-white',
        glow: 'hover:shadow-gray-500/30',
        size: 'col-span-2 row-span-2',
        fontSize: 'text-sm',
        logoSize: 'w-16 h-16',
        minHeight: 'min-h-[140px]'
      },
      allotted: {
        bg: 'from-amber-400 to-amber-500',
        border: 'border-amber-600',
        text: 'text-white',
        glow: 'hover:shadow-amber-500/40',
        size: 'col-span-2 row-span-2',
        fontSize: 'text-sm',
        logoSize: 'w-16 h-16',
        minHeight: 'min-h-[140px]'
      },
      listed: {
        bg: 'from-purple-400 to-purple-500',
        border: 'border-purple-600',
        text: 'text-white',
        glow: 'hover:shadow-purple-500/40',
        size: 'col-span-2 row-span-2',
        fontSize: 'text-sm',
        logoSize: 'w-16 h-16',
        minHeight: 'min-h-[140px]'
      }
    };

    if (statusStyles[status]) {
      return statusStyles[status];
    }

    // For ongoing IPOs, use GMP-based styling with larger sizes
    if (percentValue >= 150) {
      return {
        bg: 'from-emerald-700 to-green-800',
        border: 'border-green-900',
        text: 'text-white',
        glow: 'hover:shadow-green-700/60',
        size: 'col-span-5 row-span-5',
        fontSize: 'text-4xl sm:text-5xl',
        logoSize: 'w-40 h-40',
        minHeight: 'min-h-[400px]'
      };
    } else if (percentValue >= 100) {
      return {
        bg: 'from-emerald-600 to-green-700',
        border: 'border-green-800',
        text: 'text-white',
        glow: 'hover:shadow-green-600/50',
        size: 'col-span-4 row-span-4',
        fontSize: 'text-3xl sm:text-4xl',
        logoSize: 'w-32 h-32',
        minHeight: 'min-h-[320px]'
      };
    } else if (percentValue >= 70) {
      return {
        bg: 'from-emerald-500 to-green-600',
        border: 'border-green-700',
        text: 'text-white',
        glow: 'hover:shadow-green-500/40',
        size: 'col-span-4 row-span-3',
        fontSize: 'text-2xl sm:text-3xl',
        logoSize: 'w-28 h-28',
        minHeight: 'min-h-[240px]'
      };
    } else if (percentValue >= 50) {
      return {
        bg: 'from-green-400 to-emerald-500',
        border: 'border-green-600',
        text: 'text-white',
        glow: 'hover:shadow-green-400/40',
        size: 'col-span-3 row-span-3',
        fontSize: 'text-xl sm:text-2xl',
        logoSize: 'w-24 h-24',
        minHeight: 'min-h-[220px]'
      };
    } else if (percentValue >= 30) {
      return {
        bg: 'from-lime-400 to-green-500',
        border: 'border-green-600',
        text: 'text-white',
        glow: 'hover:shadow-lime-500/40',
        size: 'col-span-3 row-span-2',
        fontSize: 'text-lg sm:text-xl',
        logoSize: 'w-20 h-20',
        minHeight: 'min-h-[180px]'
      };
    } else if (percentValue >= 20) {
      return {
        bg: 'from-yellow-400 to-amber-500',
        border: 'border-amber-600',
        text: 'text-gray-900',
        glow: 'hover:shadow-yellow-500/40',
        size: 'col-span-2 row-span-2',
        fontSize: 'text-base sm:text-lg',
        logoSize: 'w-18 h-18',
        minHeight: 'min-h-[140px]'
      };
    } else if (percentValue >= 10) {
      return {
        bg: 'from-yellow-300 to-amber-400',
        border: 'border-amber-500',
        text: 'text-gray-900',
        glow: 'hover:shadow-yellow-400/40',
        size: 'col-span-2 row-span-2',
        fontSize: 'text-sm sm:text-base',
        logoSize: 'w-16 h-16',
        minHeight: 'min-h-[130px]'
      };
    } else if (percentValue >= 0) {
      return {
        bg: 'from-orange-300 to-yellow-400',
        border: 'border-orange-500',
        text: 'text-gray-900',
        glow: 'hover:shadow-orange-400/40',
        size: 'col-span-2 row-span-2',
        fontSize: 'text-sm',
        logoSize: 'w-14 h-14',
        minHeight: 'min-h-[120px]'
      };
    } else if (percentValue >= -20) {
      return {
        bg: 'from-orange-400 to-red-500',
        border: 'border-red-600',
        text: 'text-white',
        glow: 'hover:shadow-red-500/40',
        size: 'col-span-2 row-span-2',
        fontSize: 'text-sm',
        logoSize: 'w-14 h-14',
        minHeight: 'min-h-[120px]'
      };
    } else {
      return {
        bg: 'from-red-500 to-rose-600',
        border: 'border-red-700',
        text: 'text-white',
        glow: 'hover:shadow-red-500/40',
        size: 'col-span-2 row-span-2',
        fontSize: 'text-sm',
        logoSize: 'w-14 h-14',
        minHeight: 'min-h-[120px]'
      };
    }
  };

  const style = getStatusBasedStyle();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(ipo);
  };

  const getStatusBadge = () => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      upcoming: { bg: 'bg-blue-500', text: 'text-white', label: 'Upcoming' },
      ongoing: { bg: 'bg-green-500', text: 'text-white', label: 'LIVE' },
      closed: { bg: 'bg-gray-500', text: 'text-white', label: 'Closed' },
      allotted: { bg: 'bg-amber-500', text: 'text-white', label: 'Allotted' },
      listed: { bg: 'bg-purple-500', text: 'text-white', label: 'Listed' }
    };

    return badges[status] || null;
  };

  const statusBadge = getStatusBadge();

  return (
    <div
      className={`group relative bg-gradient-to-br ${style.bg} ${style.border} ${style.size} border-3 rounded-xl p-3 sm:p-4 transition-all duration-200 hover:scale-105 ${style.glow} hover:shadow-2xl cursor-pointer overflow-hidden flex flex-col items-center justify-center ${style.minHeight}`}
      onMouseEnter={() => onHover(ipo)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-2 w-full h-full p-2">
        {/* Logo - Much Bigger */}
        {ipo.logoUrl && (
          <div className={`${style.logoSize} rounded-lg bg-white p-2 shadow-xl flex-shrink-0 mb-2 ring-2 ring-white/30`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${ipo.logoUrl}`}
              alt={`${ipo.name} logo`}
              width={160}
              height={160}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Company Name */}
        <h3 className={`${style.fontSize} font-bold text-center line-clamp-3 ${style.text} group-hover:underline px-2 break-words w-full leading-tight`}>
          {ipo.name}
        </h3>

        {/* Percentage */}
        {percentText && (
          <div className={`${style.size.includes('col-span-5') ? 'text-3xl' : style.size.includes('col-span-4') ? 'text-2xl' : style.size.includes('col-span-3') ? 'text-xl' : 'text-base'} font-black ${style.text} whitespace-nowrap mt-2 px-3 py-1 bg-black/10 rounded-lg`}>
            {percentText}
          </div>
        )}

        {/* Status Badge */}
        {statusBadge && (
          <div className="absolute top-2 left-2">
            <div className={`px-2 py-1 rounded-lg ${statusBadge.bg} ${statusBadge.text} ${style.size.includes('col-span-4') ? 'text-sm' : 'text-xs'} font-bold shadow-lg`}>
              {statusBadge.label}
            </div>
          </div>
        )}

        {/* Live Status Indicator */}
        {status === 'ongoing' && (
          <div className="absolute top-2 right-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}