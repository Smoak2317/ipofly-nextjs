'use client';

import { useState } from 'react';

export default function LoadMoreButton({ totalIPOs }: { totalIPOs: number }) {
  const [displayCount, setDisplayCount] = useState(12);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + 10);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={loadMore}
        disabled={loading || displayCount >= totalIPOs}
        className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
      >
        {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
        {loading ? 'Loading...' : 'Load More IPOs'}
      </button>
    </div>
  );
}