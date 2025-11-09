'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import IpoCard from '@/components/IpoCard';
import { IPO } from '@/types/ipo';

export default function WatchlistPage() {
  const router = useRouter();
  const [watchlist, setWatchlist] = useState<IPO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/login');
      return;
    }

    loadWatchlist();
  }, [router]);

  const loadWatchlist = () => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading watchlist:', error);
      }
    }
    setIsLoading(false);
  };

  const removeFromWatchlist = (ipoId: string) => {
    const updated = watchlist.filter(ipo => ipo._id !== ipoId);
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-3">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Watchlist</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Watchlist</h1>
              <p className="text-white/80">Track your favorite IPOs in one place</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">{watchlist.length}</div>
              <div className="text-sm text-white/80">Saved IPOs</div>
            </div>
          </div>
        </div>

        {/* Watchlist Content */}
        {watchlist.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
            <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No IPOs in Watchlist</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start adding IPOs to track them here</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse IPOs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map((ipo) => (
              <div key={ipo._id} className="relative">
                <IpoCard ipo={ipo} />
                <button
                  onClick={() => removeFromWatchlist(ipo._id!)}
                  className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-colors z-10"
                  title="Remove from watchlist"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
