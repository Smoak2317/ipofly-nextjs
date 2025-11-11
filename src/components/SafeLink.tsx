// src/components/SafeLink.tsx
'use client';

import Link from 'next/link';
import { slugify } from '@/lib/api';

interface SafeLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function SafeLink({ href, children, className, onClick }: SafeLinkProps) {
  const safeHref = href.replace(/\/ipo\/[^/]+\/ai-analysis/, (match) => {
    // Extract the IPO name and safely slugify it
    const ipoNameMatch = match.match(/\/ipo\/([^/]+)\/ai-analysis/);
    if (ipoNameMatch && ipoNameMatch[1]) {
      const safeSlug = slugify(ipoNameMatch[1]);
      return `/ipo/${safeSlug}/ai-analysis`;
    }
    return match;
  });

  return (
    <Link href={safeHref} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}