"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface FiltersProps {
  categoryCounts: {
    all: number;
    mainboard: number;
    sme: number;
  };
  statusCounts: {
    all: number;
    upcoming: number;
    ongoing: number;
    closed: number;
    listed: number;
    allotted: number;
  };
}

export default function Filters({ categoryCounts, statusCounts }: FiltersProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Status Filters */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
            Status
          </h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive("/")
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:scale-105"
              }`}
            >
              All Status
            </Link>
            <Link
              href="/upcoming"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                isActive("/upcoming")
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:scale-105"
              }`}
            >
              Upcoming
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-bold">
                {statusCounts.upcoming}
              </span>
            </Link>
            <Link
              href="/ongoing"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                isActive("/ongoing")
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-green-500 hover:scale-105"
              }`}
            >
              Ongoing
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-bold">
                {statusCounts.ongoing}
              </span>
            </Link>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
            Category
          </h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive("/")
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:scale-105"
              }`}
            >
              All IPOs
            </Link>
            <Link
              href="/mainboard"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                isActive("/mainboard")
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:scale-105"
              }`}
            >
              Mainboard
              <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-xs font-bold">
                {categoryCounts.mainboard}
              </span>
            </Link>
            <Link
              href="/sme"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                isActive("/sme")
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:scale-105"
              }`}
            >
              SME
              <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-bold">
                {categoryCounts.sme}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}