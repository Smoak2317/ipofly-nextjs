'use client';

import { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import DarkModeToggle from './DarkModeToggle';
import Logo from './logo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; picture?: string } | null>(null);

  // Refs for click-outside detection
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const checkAuthState = useCallback(() => {
    const authToken = localStorage.getItem('authToken');
    const userString = localStorage.getItem('user');

    if (authToken && userString) {
      try {
        const userData = JSON.parse(userString);
        setUser(userData);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthState();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authStateChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleStorageChange);
    };
  }, [checkAuthState]);

  // ✅ Click-outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close mobile menu if clicked outside
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }

      // Close mobile search if clicked outside
      if (
        mobileSearchOpen &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(target) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(target)
      ) {
        setMobileSearchOpen(false);
      }

      // Close profile menu if clicked outside
      if (
        showProfileMenu &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen, mobileSearchOpen, showProfileMenu]);

  // ✅ Close menus on scroll (only if already open)
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);

      // Only close if user scrolled more than 50px
      if (scrollDelta > 50) {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (mobileSearchOpen) setMobileSearchOpen(false);
        if (showProfileMenu) setShowProfileMenu(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen, mobileSearchOpen, showProfileMenu]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setShowProfileMenu(false);

    window.dispatchEvent(new Event('storage'));
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 gap-2">
          {/* LEFT: Mobile Menu + Desktop Nav */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-1 lg:flex-none">
            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/mainboard"
                className="px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
              >
                Mainboard
              </Link>
              <Link
                href="/sme"
                className="px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
              >
                SME
              </Link>
              <Link
                href="/upcoming"
                className="px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
              >
                Upcoming
              </Link>
              <Link
                href="/ongoing"
                className="relative px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all"
              >
                <span className="flex items-center gap-1.5">
                  Live
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                </span>
              </Link>
            </div>
          </div>

          {/* CENTER: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Logo size="3xl" showText={false} />
          </div>

          {/* RIGHT: Search + Dark Mode + Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-end">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <Suspense fallback={
                <div className="w-48 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
              }>
                <SearchBar />
              </Suspense>
            </div>

            {/* Mobile Search Button */}
            <button
              ref={searchButtonRef}
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle search"
            >
              <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Dark Mode Toggle */}
            <div className="hidden sm:flex items-center">
              <DarkModeToggle />
            </div>

            {/* Profile Section */}
            <div className="relative">
              {isLoggedIn && user ? (
                <>
                  <button
                    ref={profileButtonRef}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Profile menu"
                  >
                    {user.picture ? (
                      <Image
                        src={user.picture}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full border-2 border-indigo-500"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </button>

                  {showProfileMenu && (
                    <div
                      ref={profileMenuRef}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 animate-slide-down z-50"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          {user.picture ? (
                            <Image
                              src={user.picture}
                              alt={user.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Link
                        href="/profile"
                        className="block px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          My Profile
                        </span>
                      </Link>

                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all text-sm flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
          <div ref={mobileSearchRef} className="md:hidden py-2 border-t border-gray-200 dark:border-gray-800 animate-slide-down">
            <Suspense fallback={
              <div className="w-full h-9 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
            }>
              <SearchBar autoFocus={true} />
            </Suspense>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div ref={mobileMenuRef} className="lg:hidden py-2 border-t border-gray-200 dark:border-gray-800 animate-slide-down">
            <div className="flex flex-col gap-1">
              <Link
                href="/mainboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
              >
                Mainboard IPOs
              </Link>
              <Link
                href="/sme"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
              >
                SME IPOs
              </Link>
              <Link
                href="/upcoming"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
              >
                Upcoming IPOs
              </Link>
              <Link
                href="/ongoing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all flex items-center justify-between"
              >
                <span>Live IPOs</span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              </Link>
              <div className="my-1 border-t border-gray-200 dark:border-gray-800"></div>
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dark Mode</span>
                <DarkModeToggle />
              </div>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
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