// src/components/AIAnalysisFallback.tsx
export default function AIAnalysisFallback() {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🤖</span>
        <div>
          <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-1">
            AI Analysis Coming Soon
          </h3>
          <p className="text-yellow-700 dark:text-yellow-400 text-sm">
            AI-powered investment analysis will be available soon for this IPO.
          </p>
        </div>
      </div>
    </div>
  );
}