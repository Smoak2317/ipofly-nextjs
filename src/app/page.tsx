import { fetchAllIPOs, sortIPOsByPriority } from "@/lib/api";
import Hero from "@/components/Hero";
import SmartFilters from "@/components/SmartFilters";

export const revalidate = 300;

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata = {
  title: "Ipofly - Live IPO GMP Today | Grey Market Premium Tracker India 2025",
  description: "Track Live IPO GMP Today ✓ Grey Market Premium ✓ Mainboard & SME IPO ✓ Subscription Status ✓ Allotment Status ✓ Latest IPO News India 2025",
  keywords: [
    "ipo gmp",
    "ipo gmp today",
    "grey market premium",
    "live ipo gmp",
    "mainboard ipo",
    "sme ipo",
    "upcoming ipo",
    "ongoing ipo",
    "ipo subscription status",
    "ipo allotment status"
  ],
  openGraph: {
    title: "Ipofly - Live IPO GMP Today | Grey Market Premium Tracker",
    description: "India's Most Trusted Platform for Live IPO GMP Tracking",
    url: "https://ipofly.com",
    siteName: "Ipofly",
    type: "website",
    images: [
      {
        url: "https://ipofly.com/logo-light.png",
        width: 1200,
        height: 630,
        alt: "Ipofly - Live IPO GMP Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ipofly - Live IPO GMP Today",
    description: "Track Live IPO GMP with Real-time Updates",
    images: ["https://ipofly.com/twitter-image.png"],
  },
  alternates: {
    canonical: "https://ipofly.com",
  },
};
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
          About Ipofly - India&apos;s #1 Live IPO GMP Tracker
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Ipofly is India&apos;s most trusted platform for tracking <strong>Live IPO GMP (Grey Market Premium)</strong>.
            We provide real-time IPO data including GMP rates, kostak rates, subscription status,
            and allotment details for all <strong>mainboard IPOs</strong> and <strong>SME IPOs</strong> in India.
          </p>
        </div>
      </section>
    </>
  );
}