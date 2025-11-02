// src/lib/api.ts

import { IPO, ApiResponse } from '@/types/ipo';

const API_URL = 'https://ipofly-273428006377.asia-south1.run.app/api';

export async function fetchAllIPOs(): Promise<IPO[]> {
  try {
    const response = await fetch(`${API_URL}/ipos`, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch IPOs');
    }

    const data: ApiResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching IPOs:', error);
    return [];
  }
}

export async function fetchIPOBySlug(slug: string): Promise<IPO | null> {
  const ipos = await fetchAllIPOs();
  const ipo = ipos.find((ipo) => slugify(ipo.name) === slug);
  return ipo || null;
}

export async function fetchIPOsByCategory(category: string): Promise<IPO[]> {
  const ipos = await fetchAllIPOs();
  return ipos.filter((ipo) => normalizeCategory(ipo.category) === category);
}

export async function fetchIPOsByStatus(status: string): Promise<IPO[]> {
  const ipos = await fetchAllIPOs();
  return ipos.filter((ipo) => normalizeStatus(ipo.status) === status);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function normalizeCategory(category: string): string {
  if (!category) return 'mainboard';
  const cat = category.toLowerCase();
  if (cat.includes('sme')) return 'sme';
  return 'mainboard';
}

export function normalizeStatus(status: string): string {
  if (!status) return 'upcoming';
  const stat = status.toLowerCase();

  if (stat.includes('listed')) return 'listed';
  if (stat.includes('alloted') || stat.includes('allotted')) return 'allotted';
  if (stat.includes('ongoing') || stat.includes('open')) return 'ongoing';
  if (stat.includes('closed')) return 'closed';
  if (stat.includes('upcoming')) return 'upcoming';

  return 'upcoming';
}

export function parseGMP(gmp: string): {
  amount: number;
  amountText: string;
  percentText: string | null;
  isPositive: boolean;
} {
  const str = String(gmp || '0');
  const [amtPart, percentPart] = str.split('(');
  const amount = parseFloat((amtPart || '0').replace(/[^0-9.-]/g, '')) || 0;

  const amountText = `${amount >= 0 ? '+' : '-'}₹${Math.abs(amount).toLocaleString('en-IN')}`;

  let percentText = null;
  if (percentPart) {
    const pct = percentPart.replace(/\)/g, '').trim();
    if (pct) percentText = `(${pct})`;
  }

  return {
    amount,
    amountText,
    percentText,
    isPositive: amount >= 0,
  };
}

export function sortIPOsByPriority(ipos: IPO[]): IPO[] {
  return [...ipos].sort((a, b) => {
    const statusA = normalizeStatus(a.status);
    const statusB = normalizeStatus(b.status);

    const statusPriority: Record<string, number> = {
      'ongoing': 1,
      'upcoming': 2,
      'closed': 3,
      'listed': 4,
      'allotted': 5,
    };

    const priorityA = statusPriority[statusA] || 999;
    const priorityB = statusPriority[statusB] || 999;

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    const dateA = Date.parse(a.issueCloseDate) || 0;
    const dateB = Date.parse(b.issueCloseDate) || 0;
    return dateB - dateA;
  });
}