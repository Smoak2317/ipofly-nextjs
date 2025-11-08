// src/app/mainboard/page.tsx - FIXED VERSION
import { fetchIPOsByCategory, sortIPOsByPriority } from "@/lib/api";
import SmartFilters from "@/components/SmartFilters";
import Link from "next/link";

export const revalidate = 300;
export const metadata = { title: "Mainboard IPO | IpoFly" };

export default async function MainboardPage() {
  let ipos;
  let error = null;

  try {
    ipos = await fetchIPOsByCategory("mainboard");
  } catch (e) {
    console.error('Error in MainboardPage:', e);
    error = e instanceof Error ? e.message : 'Failed to load IPO data';
    ipos = [];
  }

  const sortedIPOs = sortIPOsByPriority(ipos);

  // If there's an error, show error UI
  if (error && sortedIPOs.length === 0) {
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

        {/* Error State */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-12 text-center border-2 border-red-200 dark:border-red-800">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Failed to Load IPO Data</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-colors"
              >
                Go Home
              </Link>
            </div>
            <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg text-left max-w-2xl mx-auto">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Troubleshooting:</strong></p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>Check your internet connection</li>
                <li>The backend server might be down</li>
                <li>API URL: {process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ipofly-273428006377.asia-south1.run.app'}</li>
              </ul>
            </div>
          </div>
        </section>
      </>
    );
  }

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
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:40px_40px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold mb-6 border border-white/20 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
              NSE & BSE Listed Companies
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Mainboard IPO
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                GMP Tracker
              </span>
            </h1>

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