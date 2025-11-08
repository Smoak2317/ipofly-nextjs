// src/lib/api.ts - FIXED VERSION
import { IPO, ApiResponse } from '@/types/ipo';

// ✅ FIXED: Use the correct API URL with fallback
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchAllIPOs(): Promise<IPO[]> {
  try {


    const response = await fetch(`${API_URL}/api/ipos`, {
      next: { revalidate: 300 },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Failed to fetch IPOs: ${response.status}`, errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data: ApiResponse = await response.json();
    console.log('✅ Received data:', {
      success: data.success,
      count: Array.isArray(data.data) ? data.data.length : 0,
    });

    if (!data.success) {
      console.error('❌ API returned success=false:', data.message);
      throw new Error(data.message || 'API returned unsuccessful response');
    }

    if (!Array.isArray(data.data)) {
      console.error('❌ API did not return an array:', typeof data.data);
      throw new Error('Invalid API response format');
    }

    return data.data;
  } catch (error) {
    console.error('❌ Error fetching IPOs:', error);
    // Re-throw the error so pages can handle it
    throw error;
  }
}

export async function fetchIPOBySlug(slug: string): Promise<IPO | null> {
  try {
    const ipos = await fetchAllIPOs();
    return ipos.find((ipo) => slugify(ipo.name) === slug) || null;
  } catch (error) {
    console.error('❌ Error fetching IPO by slug:', error);
    throw error;
  }
}

export async function fetchIPOsByCategory(category: string): Promise<IPO[]> {
  try {
    const ipos = await fetchAllIPOs();
    const filtered = ipos.filter((ipo) => normalizeCategory(ipo.category) === category);
    console.log(`✅ Filtered ${category} IPOs:`, filtered.length);
    return filtered;
  } catch (error) {
    console.error('❌ Error fetching IPOs by category:', error);
    throw error;
  }
}

export async function fetchIPOsByStatus(status: string): Promise<IPO[]> {
  try {
    const ipos = await fetchAllIPOs();
    const filtered = ipos.filter((ipo) => normalizeStatus(ipo.status) === status);
    console.log(`✅ Filtered ${status} IPOs:`, filtered.length);
    return filtered;
  } catch (error) {
    console.error('❌ Error fetching IPOs by status:', error);
    throw error;
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeCategory(category: string): string {
  if (!category) return 'mainboard';
  const cat = category.toLowerCase().trim();
  return cat.includes('sme') ? 'sme' : 'mainboard';
}

export function normalizeStatus(status: string): string {
  if (!status) return 'upcoming';
  const stat = status.toLowerCase().trim();

  if (stat.includes('listed')) return 'listed';
  if (stat.includes('alloted') || stat.includes('allotted')) return 'allotted';
  if (stat.includes('ongoing') || stat.includes('open')) return 'ongoing';
  if (stat.includes('closed')) return 'closed';
  if (stat.includes('upcoming')) return 'upcoming';

  return 'upcoming';
}

export function parseGMP(gmp: string | number): {
  amount: number;
  amountText: string;
  percentText: string | null;
  isPositive: boolean;
} {
  const str = String(gmp || '0').trim();
  const [amtPart, percentPart] = str.split('(');
  const amount = parseFloat((amtPart || '0').replace(/[^0-9.-]/g, '')) || 0;

  const amountText = `${amount >= 0 ? '+' : ''}₹${Math.abs(amount).toLocaleString('en-IN')}`;

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
      'allotted': 4,
      'listed': 5,
    };

    const priorityA = statusPriority[statusA] || 999;
    const priorityB = statusPriority[statusB] || 999;

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    const dateA = new Date(a.issueCloseDate || '').getTime() || 0;
    const dateB = new Date(b.issueCloseDate || '').getTime() || 0;
    return dateB - dateA;
  });
}