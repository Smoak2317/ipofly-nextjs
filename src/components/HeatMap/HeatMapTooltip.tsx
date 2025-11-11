// src/components/HeatMap/HeatMapTooltip.tsx - FIXED VERSION
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

  // Safe AI analysis access
  const aiAnalysis = ipo.aiAnalysis;
  const hasAIAnalysis = !!aiAnalysis && typeof aiAnalysis === 'object';

  return (
    <div
      className="fixed z-50 pointer-events-none transition-all duration-200"
      style={{
        left: Math.min(position.x + 20, window.innerWidth - 300),
        top: Math.min(position.y + 20, window.innerHeight - 200),
      }}
    >
      <div className="bg-gray-900 text-white rounded-lg shadow-2xl p-3 max-w-xs border border-gray-700 backdrop-blur-sm">
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
          {hasAIAnalysis && (
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">AI Score:</span>
              <span className="font-semibold">{aiAnalysis.score}/100</span>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Price:</span>
            <span>{ipo.issuePrice || 'N/A'}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Size:</span>
            <span>{ipo.issueSize || 'N/A'}</span>
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