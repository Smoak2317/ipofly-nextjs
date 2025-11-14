// src/components/logo.tsx - OPTIMIZED
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  showText?: boolean;
}

const sizeMap = {
  sm: { container: 'w-10 h-10', image: 40 },
  md: { container: 'w-14 h-14', image: 56 },
  lg: { container: 'w-20 h-20', image: 80 },
  xl: { container: 'w-24 h-24', image: 96 },
  '2xl': { container: 'w-32 h-32', image: 128 },
  '3xl': { container: 'w-40 h-40', image: 160 },
};

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check immediately without delay
    setIsDark(document.documentElement.classList.contains('dark'));
    setMounted(true);

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const { container, image } = sizeMap[size];

  // Render with default logo to prevent flicker
  const logoSrc = mounted ? (isDark ? "/logo-dark.png" : "/logo-light.png") : "/logo-light.png";

  return (
    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <div className={`relative ${container} flex-shrink-0`}>
        <Image
          src={logoSrc}
          alt="Ipofly Logo"
          width={image}
          height={image}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      {showText && (
        <div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">Ipofly</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Live GMP Tracker</div>
        </div>
      )}
    </Link>
  );
}