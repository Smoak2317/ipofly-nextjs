import { fetchAllIPOs, sortIPOsByPriority } from "@/lib/api";
import Hero from "@/components/Hero";
import SmartFilters from "@/components/SmartFilters";
import PullToRefresh from '@/components/PullToRefresh';

export const revalidate = 300;

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const searchQuery = params.q?.toLowerCase() || '';

  const allIPOs = await fetchAllIPOs();

  // Filter by search query if provided
  const filteredIPOs = searchQuery
    ? allIPOs.filter(ipo => ipo.name.toLowerCase().includes(searchQuery))
    : allIPOs;

  const sortedIPOs = sortIPOsByPriority(filteredIPOs);

  return (
    <>
      <Hero />

      {/* Show search results info if searching */}
      {searchQuery && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <p className="text-blue-900 dark:text-blue-100">
              <span className="font-semibold">Search results for:</span> &quot;{params.q}&quot;
              <span className="ml-2 text-blue-700 dark:text-blue-300">({sortedIPOs.length} IPOs found)</span>
            </p>
          </div>
        </div>
      )}

      {/* Smart Filters - Show Both Category and Status */}
      <SmartFilters allIpos={sortedIPOs} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          About IpoFly - India&apos;s #1 Live IPO GMP Tracker
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            IpoFly is India&apos;s most trusted platform for tracking <strong>Live IPO GMP (Grey Market Premium)</strong>.
            We provide real-time IPO data including GMP rates, kostak rates, subscription status,
            and allotment details for all <strong>mainboard IPOs</strong> and <strong>SME IPOs</strong> in India.
          </p>
        </div>
      </section>
    </>


  );
}