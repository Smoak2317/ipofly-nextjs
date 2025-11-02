export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
          Loading IPO data...
        </p>
      </div>
    </div>
  );
}