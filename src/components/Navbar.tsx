import { Suspense } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import DarkModeToggle from './DarkModeToggle';
import Logo from './logo';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo - Large size in navbar */}
          <Logo size="xl" showText={true} />

          <div className="hidden md:flex items-center gap-6">
            <Link href="/mainboard" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Mainboard
            </Link>
            <Link href="/sme" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              SME
            </Link>
            <Link href="/upcoming" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Upcoming
            </Link>
            <Link href="/ongoing" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Ongoing
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Suspense fallback={
                <div className="w-64 h-10 bg-gray-100 dark:bg-gray-900 rounded-xl animate-pulse" />
              }>
                <SearchBar />
              </Suspense>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}