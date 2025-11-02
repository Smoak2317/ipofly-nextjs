// ============================================
// src/components/Filters.tsx - FINAL CLEAN
// ============================================

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Filters() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-800/50">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Status Filters */}
        <div className="flex-1">
          <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-widest">
            📅 Filter by Status
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className={`px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                isActive("/")
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400"
              }`}
            >
              🌍 All Status
            </Link>

            <Link
              href="/upcoming"
              className={`px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                isActive("/upcoming")
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-blue-300 dark:border-blue-600 hover:border-blue-500 dark:hover:border-blue-400"
              }`}
            >
              📅 Upcoming
            </Link>

            <Link
              href="/ongoing"
              className={`px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 relative group ${
                isActive("/ongoing")
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/50"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-green-400 dark:border-green-600 hover:border-green-500 dark:hover:border-green-400"
              }`}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              🔴 LIVE
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-black rounded-full flex items-center justify-center animate-bounce">
                !
              </span>
            </Link>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex-1">
          <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-widest">
            📊 Filter by Category
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className={`px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                isActive("/")
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400"
              }`}
            >
              🌐 All IPOs
            </Link>

            <Link
              href="/mainboard"
              className={`px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                isActive("/mainboard")
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/50"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-indigo-400 dark:border-indigo-600 hover:border-indigo-500 dark:hover:border-indigo-400"
              }`}
            >
              🏛️ Mainboard
            </Link>

            <Link
              href="/sme"
              className={`px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                isActive("/sme")
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/50"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-purple-400 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-400"
              }`}
            >
              🚀 SME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}