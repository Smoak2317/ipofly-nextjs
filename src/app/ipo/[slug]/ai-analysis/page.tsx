// src/app/ipo/[slug]/ai-analysis/page.tsx - FIXED VERSION
import { fetchIPOBySlug } from '@/lib/api';
import { notFound, redirect } from 'next/navigation';
import AIAnalysisDetail from '@/components/AIAnalysisDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AIAnalysisPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug === 'unknown') {
    redirect('/');
  }

  const ipo = await fetchIPOBySlug(slug);

  if (!ipo || !ipo.aiAnalysis) {
    notFound();
  }

  return <AIAnalysisDetail ipo={ipo} />;
}