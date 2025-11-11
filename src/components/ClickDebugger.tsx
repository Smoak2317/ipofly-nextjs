// Add this temporary debug component to see if clicks are working
'use client';

import { useEffect } from 'react';

export function ClickDebugger() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      console.log('🔍 Global click detected:', {
        target: e.target,
        currentTarget: e.currentTarget,
        coordinates: { x: e.clientX, y: e.clientY }
      });
    };

    document.addEventListener('click', handleClick, true); // Use capture phase

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return null;
}

// Add this to your HeatMapClient component temporarily:
// <ClickDebugger />