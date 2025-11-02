'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">⚠️</div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Oops!
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Something went wrong
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          We encountered an error while loading this page. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}