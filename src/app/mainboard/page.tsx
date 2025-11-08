import { fetchIPOsByCategory, sortIPOsByPriority } from "@/lib/api";
import SmartFilters from "@/components/SmartFilters";
import Link from "next/link";

export const revalidate = 300;
export const metadata = { title: "Mainboard IPO | IpoFly" };

export default async function MainboardPage() {
  const ipos = await fetchIPOsByCategory("mainboard");
  const sortedIPOs = sortIPOsByPriority(ipos);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium">Mainboard</li>
        </ol>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-600 dark:from-indigo-950 dark:via-blue-950 dark:to-purple-950 py-16 md:py-8">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:40px_40px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold mb-6 border border-white/20 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
              NSE & BSE Listed Companies
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Mainboard IPO
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                GMP Tracker
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Track real-time Grey Market Premium for all Mainboard IPOs listed on NSE & BSE.
              <br className="hidden sm:block" />
              Get accurate subscription data, allotment status, and listing predictions.
            </p>
          </div>
        </div>
      </section>

      {/* Smart Filters */}
      <SmartFilters
        allIpos={sortedIPOs}
        hideCategory={true}
        defaultCategory="mainboard"
      />
    </>
  );
}