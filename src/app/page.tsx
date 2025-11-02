import { fetchAllIPOs, sortIPOsByPriority } from "@/lib/api";
import Hero from "@/components/Hero";
import SmartFilters from "@/components/SmartFilters";

export const revalidate = 300;

export default async function HomePage() {
  const allIPOs = await fetchAllIPOs();
  const sortedIPOs = sortIPOsByPriority(allIPOs);

  return (
    <>
      <Hero />

      {/* Smart Filters - Show Both Category and Status */}
      <SmartFilters allIpos={sortedIPOs} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          About IpoFly - India's #1 Live IPO GMP Tracker
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            IpoFly is India's most trusted platform for tracking <strong>Live IPO GMP (Grey Market Premium)</strong>.
            We provide real-time IPO data including GMP rates, kostak rates, subscription status,
            and allotment details for all <strong>mainboard IPOs</strong> and <strong>SME IPOs</strong> in India.
          </p>
        </div>
      </section>
    </>
  );
}