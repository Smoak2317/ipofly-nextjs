'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import DarkModeToggle from './DarkModeToggle';
import Logo from './logo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Replace with actual auth state

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* LEFT: Mobile Menu Button (Desktop: Navigation Links) */}
          <div className="flex items-center gap-2 flex-1 lg:flex-none">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/mainboard"
                className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
              >
                Mainboard
              </Link>
              <Link
                href="/sme"
                className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
              >
                SME
              </Link>
              <Link
                href="/upcoming"
                className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
              >
                Upcoming
              </Link>
              <Link
                href="/ongoing"
                className="relative px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all"
              >
                <span className="flex items-center gap-2">
                  Live
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </span>
              </Link>
            </div>
          </div>

          {/* CENTER: Logo - Absolutely centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Logo size="3xl" showText={false} />
          </div>

          {/* RIGHT: Search + Dark Mode + Profile */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <Suspense fallback={
                <div className="w-64 h-11 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
              }>
                <SearchBar />
              </Suspense>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle search"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Dark Mode Toggle - HIDDEN ON MOBILE, VISIBLE ON DESKTOP */}
            <div className="hidden sm:flex items-center">
              <DarkModeToggle />
            </div>

            {/* Profile Section */}
            <div className="relative">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="p-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
                    aria-label="Profile menu"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 animate-slide-down">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          My Profile
                        </span>
                      </Link>
                      <Link
                        href="/watchlist"
                        className="block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Watchlist
                        </span>
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                          </svg>
                          Logout
                        </span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 dark:border-gray-800 animate-slide-down">
            <Suspense fallback={
              <div className="w-full h-10 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
            }>
              <SearchBar />
            </Suspense>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800 animate-slide-down">
            <div className="flex flex-col gap-2">
              <Link
                href="/mainboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
              >
                Mainboard IPOs
              </Link>
              <Link
                href="/sme"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
              >
                SME IPOs
              </Link>
              <Link
                href="/upcoming"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
              >
                Upcoming IPOs
              </Link>
              <Link
                href="/ongoing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all flex items-center justify-between"
              >
                <span>Live IPOs</span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </Link>
              <div className="my-2 border-t border-gray-200 dark:border-gray-800"></div>

              {/* Dark Mode Toggle - ONLY IN MOBILE MENU */}
              <div className="px-4 py-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dark Mode</span>
                <DarkModeToggle />
              </div>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}