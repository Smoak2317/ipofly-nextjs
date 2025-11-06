// ============================================
// src/app/ipo/[slug]/page.tsx - FIXED
// NO 'use client' - Server component with client tabs
// ============================================

import { notFound } from "next/navigation";
import Link from "next/link";
import { IPO } from "@/types/ipo";
import { slugify } from "@/lib/api";
import IpoDetailClient from "@/components/IpoDetailClient";
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
async function fetchIPOBySlug(slug: string): Promise<IPO | null> {
  try {
    const res = await fetch(`${BACKEND_API_URL}/api/ipos`, {
      next: { revalidate: 300 }
    });

    if (!res.ok) {
      console.error('Failed to fetch IPOs:', res.status);
      return null;
    }

    const data = await res.json();

    if (!data.success || !Array.isArray(data.data)) {
      console.error('Invalid API response');
      return null;
    }

    return data.data.find((ipo: IPO) => slugify(ipo.name) === slug) || null;
  } catch (error) {
    console.error('Error fetching IPO:', error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${BACKEND_API_URL}/api/ipos`, {
      next: { revalidate: 300 }
    });

    if (!res.ok) {
      console.error('Failed to fetch IPOs for static params:', res.status);
      return [];
    }

    const data = await res.json();

    if (!data.success || !Array.isArray(data.data)) {
      console.error('Invalid API response for static params');
      return [];
    }

    return data.data.map((ipo: IPO) => ({
      slug: slugify(ipo.name),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const ipo = await fetchIPOBySlug(params.slug);

  if (!ipo) {
    return { title: "IPO Not Found | IpoFly" };
  }

  return {
    title: `${ipo.name} IPO - GMP Tracker | IpoFly`,
    description: `${ipo.name} IPO details, GMP ₹${ipo.gmp}, subscription status, and allotment information.`,
  };
}

export default async function IPOPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const ipo = await fetchIPOBySlug(resolvedParams.slug);

  if (!ipo) {
    notFound();
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">IPOs</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium">{ipo.name}</li>
        </ol>
      </nav>

      {/* Pass to Client Component */}
      <IpoDetailClient ipo={ipo} />
    </>
  );
}