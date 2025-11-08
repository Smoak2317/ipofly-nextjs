// src/components/PullToRefresh.tsx
'use client';

import { useEffect, useState, useRef, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh?: () => Promise<void>;
}

export default function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const MAX_PULL = 100;
  const REFRESH_THRESHOLD = 80;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let scrollTop = 0;

    const handleTouchStart = (e: TouchEvent) => {
      scrollTop = window.scrollY;
      if (scrollTop === 0) {
        touchStartY = e.touches[0].clientY;
        startY.current = touchStartY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY !== 0 || isRefreshing) return;

      const touchY = e.touches[0].clientY;
      const distance = touchY - startY.current;

      if (distance > 0 && distance < MAX_PULL) {
        setIsPulling(true);
        setPullDistance(distance);

        // ✅ Haptic feedback at threshold (mobile only)
        if (distance > REFRESH_THRESHOLD && 'vibrate' in navigator) {
          navigator.vibrate(10);
        }
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance > REFRESH_THRESHOLD) {
        setIsRefreshing(true);

        // ✅ Haptic feedback on refresh
        if ('vibrate' in navigator) {
          navigator.vibrate(20);
        }

        try {
          if (onRefresh) {
            await onRefresh();
          } else {
            // Default: refresh page data
            router.refresh();
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } finally {
          setIsRefreshing(false);
        }
      }

      setIsPulling(false);
      setPullDistance(0);
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, isRefreshing, onRefresh, router]);

  const pullProgress = Math.min(pullDistance / REFRESH_THRESHOLD, 1);
  const shouldRefresh = pullDistance > REFRESH_THRESHOLD;

  return (
    <div ref={containerRef} className="relative">
      {/* Pull-to-Refresh Indicator */}
      {(isPulling || isRefreshing) && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
          style={{
            transform: `translateY(${isPulling ? pullDistance : isRefreshing ? 60 : 0}px)`,
            transition: isPulling ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-2xl p-4 border-2 border-indigo-500">
            {isRefreshing ? (
              <svg
                className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                className={`w-6 h-6 transition-all ${
                  shouldRefresh
                    ? 'text-green-600 dark:text-green-400 scale-110'
                    : 'text-indigo-600 dark:text-indigo-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  transform: `rotate(${pullProgress * 360}deg)`,
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
}