'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SearchBarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  // Initialize query from URL params after mount
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/');
    }
  }, [query, router]);

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-500px">
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg opacity-50">🔍</span>
        <input
          type="text"
          placeholder="Search IPO by company name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900/50 transition-all"
        />
      </div>
    </form>
  );
}

export default function SearchBar() {
  return (
    <SearchBarContent />
  );
}