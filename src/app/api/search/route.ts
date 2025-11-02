import { fetchAllIPOs, slugify, normalizeCategory, normalizeStatus } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q')?.toLowerCase() || '';
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    const ipos = await fetchAllIPOs();

    let filtered = ipos.filter(ipo =>
      !query || ipo.name.toLowerCase().includes(query)
    );

    if (category && category !== 'all') {
      filtered = filtered.filter(ipo => normalizeCategory(ipo.category) === category);
    }

    if (status && status !== 'all') {
      filtered = filtered.filter(ipo => normalizeStatus(ipo.status) === status);
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      count: filtered.length,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}