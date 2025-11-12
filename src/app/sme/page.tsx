import { fetchIPOsByCategory, sortIPOsByPriority } from "@/lib/api";
import SmartFilters from "@/components/SmartFilters";
import Link from "next/link";

export const revalidate = 300;
export const metadata = {
  title: "SME IPO GMP Today | Live Grey Market Premium | IpoFly",
  description: "Track SME IPO GMP Today ✓ BSE SME IPO List ✓ NSE Emerge IPO ✓ Live Grey Market Premium ✓ Latest SME IPO India 2025",
  keywords: "sme ipo, sme ipo gmp, bse sme ipo, nse emerge, sme ipo list, sme ipo today",
  openGraph: {
    title: "SME IPO GMP Today | Live Grey Market Premium",
    description: "Track all SME IPOs with live GMP, subscription status, and allotment details",
    url: "https://ipofly.com/sme",
    type: "website",
  },
  alternates: {
    canonical: "https://ipofly.com/sme",
  },
};

export default async function SmePage() {
  const ipos = await fetchIPOsByCategory("sme");
  const sortedIPOs = sortIPOsByPriority(ipos);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium">SME</li>
        </ol>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 dark:from-purple-950 dark:via-pink-950 dark:to-rose-950 py-16 md:py-8">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:40px_40px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold mb-6 border border-white/20 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              Small & Medium Enterprises
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              SME IPO
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                GMP Today
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover high-growth SME IPOs with live Grey Market Premium tracking.
              <br className="hidden sm:block" />
              Smart investment opportunities in emerging businesses with detailed analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Smart Filters */}
      <SmartFilters
        allIpos={sortedIPOs}
        hideCategory={true}
        defaultCategory="sme"
      />
    </>
  );
}