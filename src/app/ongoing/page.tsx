import { fetchIPOsByStatus, sortIPOsByPriority } from "@/lib/api";
import SmartFilters from "@/components/SmartFilters";
import Link from "next/link";

export const revalidate = 300;
export const metadata = {
  title: "Live IPO | Ongoing IPO Today | Open for Bidding | IpoFly",
  description: "Apply for Live IPO Today ✓ Ongoing IPO List ✓ Open for Bidding ✓ Real-time Subscription Status ✓ Live IPO GMP India 2025",
  keywords: "live ipo, ongoing ipo, ipo open today, ipo bidding, current ipo, apply ipo today",
  openGraph: {
    title: "Live IPO | Ongoing IPO Today | Open for Bidding",
    description: "Apply now for currently open IPOs with real-time subscription tracking",
    url: "https://ipofly.com/ongoing",
    type: "website",
  },
  alternates: {
    canonical: "https://ipofly.com/ongoing",
  },
};

export default async function OngoingPage() {
  const ipos = await fetchIPOsByStatus("ongoing");
  const sortedIPOs = sortIPOsByPriority(ipos);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium">Live</li>
        </ol>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 py-16 md:py-8">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:40px_40px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Live Badge with Animation */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold mb-6 border border-white/20 shadow-lg animate-pulse">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
              </span>
              🔴 LIVE NOW - Apply Today
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Live IPOs
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                Open for Bidding
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Apply now for currently open IPOs with real-time Grey Market Premium updates.
              <br className="hidden sm:block" />
              Live subscription tracking and instant allotment status.
            </p>

            {/* Live Counter */}
            {sortedIPOs.length > 0 ? (
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white font-bold text-md">{sortedIPOs.length}</span>
                </div>
                <span className="text-white/90">IPO{sortedIPOs.length > 1 ? 's' : ''} Open Now</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-white/90">No IPOs currently open. Check upcoming IPOs!</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Smart Filters */}
      <SmartFilters
        allIpos={sortedIPOs}
        hideStatus={true}
        defaultStatus="ongoing"
      />
    </>
  );
}