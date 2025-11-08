// src/components/LoadingSkeletons.tsx
// ✅ Optimized loading skeletons for better UX

export function IpoCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 animate-pulse">
      <div className="flex justify-between items-start gap-2 mb-2 sm:mb-3">
        <div className="flex-1 min-w-0">
          {/* Logo skeleton */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-200 dark:bg-gray-700 mb-2" />

          {/* Title skeleton */}
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />

          {/* Badges skeleton */}
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>

        {/* GMP skeleton */}
        <div className="flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>

      {/* Details grid skeleton */}
      <div className="grid grid-cols-2 gap-2 py-2 border-t border-gray-100 dark:border-gray-700">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-1">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          </div>
        ))}
      </div>

      {/* Footer skeleton */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
      </div>
    </div>
  );
}

export function IpoListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <IpoCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 py-12 md:py-16">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-pulse">
          <div className="inline-block w-48 h-8 bg-white/20 rounded-full mb-6" />
          <div className="h-16 bg-white/20 rounded-lg max-w-3xl mx-auto mb-6" />
          <div className="h-12 bg-white/20 rounded-lg max-w-2xl mx-auto mb-8" />
          <div className="flex gap-4 justify-center">
            <div className="w-40 h-12 bg-white/20 rounded-xl" />
            <div className="w-40 h-12 bg-white/20 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FilterSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-pulse">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-5" />
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-5" />
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}