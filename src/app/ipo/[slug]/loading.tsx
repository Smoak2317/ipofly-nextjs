export default function IpoLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-pulse">
        <div className="bg-gray-200 dark:bg-gray-700 h-64"></div>
        <div className="p-8 space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}