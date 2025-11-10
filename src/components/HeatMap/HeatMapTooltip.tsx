// src/components/HeatMap/HeatMapTooltip.tsx
'use client';

import { IPO } from '@/types/ipo';
import { parseGMP, normalizeStatus } from '@/lib/api';

interface HeatMapTooltipProps {
  ipo: IPO;
  position: { x: number; y: number };
}

export default function HeatMapTooltip({ ipo, position }: HeatMapTooltipProps) {
  const { amountText, percentText } = parseGMP(ipo.gmp);
  const status = normalizeStatus(ipo.status);

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x + 20,
        top: position.y + 20,
      }}
    >
      <div className="bg-gray-900 text-white rounded-lg shadow-2xl p-4 max-w-xs sm:max-w-sm border border-gray-700">
        <h3 className="font-bold text-sm mb-2 line-clamp-2">{ipo.name}</h3>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">GMP:</span>
            <span className="font-semibold">{amountText}</span>
          </div>
          {percentText && (
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">Percentage:</span>
              <span className="font-semibold">{percentText}</span>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Price:</span>
            <span>{ipo.issuePrice}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Size:</span>
            <span>{ipo.issueSize}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Subscription:</span>
            <span>{ipo.subscription || 'N/A'}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Status:</span>
            <span className="capitalize">{status}</span>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-2">Click for details</p>
      </div>
    </div>
  );
}