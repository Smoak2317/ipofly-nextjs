'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const sizeMap = {
  sm: { container: 'w-10 h-10', image: 40 },
  md: { container: 'w-14 h-14', image: 56 },
  lg: { container: 'w-20 h-20', image: 80 },
  xl: { container: 'w-24 h-24', image: 96 },
};

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const { container, image } = sizeMap[size];

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className={`relative ${container} bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse`} />
        {showText && (
          <div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">IpoFly</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Live GMP Tracker</div>
          </div>
        )}
      </Link>
    );
  }

  return (
    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <div className={`relative ${container} flex-shrink-0`}>
        <Image
          src={isDark ? "/logo-dark.png" : "/logo-light.png"}
          alt="IpoFly Logo"
          width={image}
          height={image}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      {showText && (
        <div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">IpoFly</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Live GMP Tracker</div>
        </div>
      )}
    </Link>
  );
}