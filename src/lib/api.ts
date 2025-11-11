// src/lib/api.ts - COMPLETE FIXED VERSION
import { IPO } from '@/types/ipo';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ipofly-273428006377.asia-south1.run.app';

export function getIPOStatusColor(status: string): string {
  const normalized = normalizeStatus(status);

  switch (normalized) {
    case 'ongoing':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'closed':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    case 'listed':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    case 'allotted':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  }
}

export function getIPOStatusIcon(status: string): string {
  const normalized = normalizeStatus(status);

  switch (normalized) {
    case 'ongoing':
      return '🔴';
    case 'upcoming':
      return '📅';
    case 'closed':
      return '✅';
    case 'listed':
      return '📈';
    case 'allotted':
      return '🎯';
    default:
      return '📊';
  }
}

export async function fetchIPOsByCategory(category: 'mainboard' | 'sme'): Promise<IPO[]> {
  try {
    const allIPOs = await fetchAllIPOs();
    return allIPOs.filter(ipo => normalizeCategory(ipo.category) === category);
  } catch (error) {
    console.error(`Error fetching ${category} IPOs:`, error);
    return [];
  }
}

export async function fetchIPOsByStatus(status: 'upcoming' | 'ongoing' | 'closed' | 'listed' | 'allotted'): Promise<IPO[]> {
  try {
    const allIPOs = await fetchAllIPOs();
    return allIPOs.filter(ipo => normalizeStatus(ipo.status) === status);
  } catch (error) {
    console.error(`Error fetching ${status} IPOs:`, error);
    return [];
  }
}

// Existing functions with all fixes...
export function slugify(text: string | null | undefined): string {
  if (!text) {
    console.warn('slugify: Received null or undefined text');
    return 'unknown-ipo';
  }

  if (typeof text !== 'string') {
    console.warn('slugify: Received non-string value:', typeof text, text);
    return 'unknown-ipo';
  }

  if (text.trim() === '') {
    console.warn('slugify: Received empty string');
    return 'unknown-ipo';
  }

  try {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      || 'unknown-ipo';
  } catch (error) {
    console.error('Error in slugify function:', error, 'Text:', text);
    return 'unknown-ipo';
  }
}

export function parseGMP(gmp: string | null | undefined) {
  if (!gmp) {
    return { amountText: 'N/A', percentText: null, isPositive: false };
  }

  const amountMatch = gmp.match(/₹\s*([\d,]+)/);
  const percentMatch = gmp.match(/\(([-+]?\d+\.?\d*)%?\)/);

  const amount = amountMatch ? amountMatch[1].replace(/,/g, '') : '0';
  const percent = percentMatch ? parseFloat(percentMatch[1]) : 0;

  return {
    amountText: `₹${amount}`,
    percentText: percent !== 0 ? `(${percent > 0 ? '+' : ''}${percent.toFixed(2)}%)` : null,
    isPositive: percent > 0
  };
}

export function normalizeCategory(category: string | null | undefined): string {
  if (!category) return 'mainboard';

  const cat = category.toLowerCase();
  if (cat.includes('sme')) return 'sme';
  if (cat.includes('main') || cat.includes('board')) return 'mainboard';
  return cat;
}

export function normalizeStatus(status: string | null | undefined): string {
  if (!status) return 'upcoming';

  const stat = status.toLowerCase();
  if (stat.includes('ongoing') || stat.includes('live') || stat.includes('open')) return 'ongoing';
  if (stat.includes('upcoming') || stat.includes('forthcoming')) return 'upcoming';
  if (stat.includes('closed') || stat.includes('completed')) return 'closed';
  if (stat.includes('listed')) return 'listed';
  if (stat.includes('allotted') || stat.includes('allotment')) return 'allotted';
  return stat;
}

export async function fetchAllIPOs(): Promise<IPO[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/ipos`, {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.data) {
      return data.data;
    } else {
      console.error('API response format error:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching IPOs:', error);
    return [];
  }
}

export async function fetchIPOBySlug(slug: string): Promise<IPO | null> {
  try {
    if (!slug || slug === 'unknown') {
      return null;
    }

    const allIPOs = await fetchAllIPOs();
    const ipo = allIPOs.find(ipo => {
      try {
        const ipoSlug = slugify(ipo.name);
        return ipoSlug === slug;
      } catch (error) {
        console.error('Error processing IPO:', ipo.name, error);
        return false;
      }
    });

    return ipo || null;
  } catch (error) {
    console.error('Error fetching IPO by slug:', slug, error);
    return null;
  }
}

export function sortIPOsByPriority(ipos: IPO[]): IPO[] {
  return [...ipos].sort((a, b) => {
    const aStatus = normalizeStatus(a.status);
    const bStatus = normalizeStatus(b.status);

    if (aStatus === 'ongoing' && bStatus !== 'ongoing') return -1;
    if (bStatus === 'ongoing' && aStatus !== 'ongoing') return 1;

    if (aStatus === 'upcoming' && bStatus !== 'upcoming') return -1;
    if (bStatus === 'upcoming' && aStatus !== 'upcoming') return 1;

    const aGmp = parseGMP(a.gmp);
    const bGmp = parseGMP(b.gmp);

    const aPercent = aGmp.percentText ? parseFloat(aGmp.percentText.replace(/[()%+]/g, '')) : 0;
    const bPercent = bGmp.percentText ? parseFloat(bGmp.percentText.replace(/[()%+]/g, '')) : 0;

    return bPercent - aPercent;
  });
}