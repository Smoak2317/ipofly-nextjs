import { fetchIPOsByStatus, sortIPOsByPriority } from "@/lib/api";
import SmartFilters from "@/components/SmartFilters";
import Link from "next/link";

export const revalidate = 300;
export const metadata = {
  title: "Upcoming IPO | Future IPO List India 2025 | IpoFly",
  description: "Check Upcoming IPO ✓ Future IPO List ✓ IPO Calendar 2025-26 ✓ Expected IPO ✓ Upcoming Mainboard & SME IPO India",
  keywords: "upcoming ipo, future ipo, ipo calendar, expected ipo, upcoming ipo list, new ipo",
  openGraph: {
    title: "Upcoming IPO | Future IPO List India 2024",
    description: "Stay ahead with upcoming IPO list and expected launch dates",
    url: "https://ipofly.com/upcoming",
    type: "website",
  },
  alternates: {
    canonical: "https://ipofly.com/upcoming",
  },
};

export default async function UpcomingPage() {
  const ipos = await fetchIPOsByStatus("upcoming");
  const sortedIPOs = sortIPOsByPriority(ipos);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium">Upcoming</li>
        </ol>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-600 dark:from-blue-950 dark:via-cyan-950 dark:to-sky-950 py-16 md:py-8">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:40px_40px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold mb-6 border border-white/20 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Coming Soon to Market
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Upcoming IPOs
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                with Live GMP
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Stay ahead with early access to upcoming IPO information and Grey Market Premium.
              <br className="hidden sm:block" />
              Plan your investments with detailed company profiles and expected listing gains.
            </p>



            {/* Countdown/Stats */}
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">{sortedIPOs.length}</div>
                <div className="text-sm text-white/80">Upcoming IPOs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">
                  {sortedIPOs.filter(ipo => {
                    const openDate = new Date(ipo.issueOpenDate);
                    const today = new Date();
                    const diffDays = Math.ceil((openDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    return diffDays <= 7 && diffDays >= 0;
                  }).length}
                </div>
                <div className="text-sm text-white/80">Opening This Week</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Filters */}
      <SmartFilters
        allIpos={sortedIPOs}
        hideStatus={true}
        defaultStatus="upcoming"
      />
    </>
  );
}