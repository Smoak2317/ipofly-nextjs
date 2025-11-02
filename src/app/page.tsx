import { fetchAllIPOs, sortIPOsByPriority, normalizeCategory, normalizeStatus } from "@/lib/api";
import Hero from "@/components/Hero";
import IpoCard from "@/components/IpoCard";
import Filters from "@/components/Filters";

export const revalidate = 300;

export default async function HomePage() {
  const allIPOs = await fetchAllIPOs();
  const sortedIPOs = sortIPOsByPriority(allIPOs);

  const categoryCounts = {
    all: allIPOs.length,
    mainboard: allIPOs.filter(ipo => normalizeCategory(ipo.category) === "mainboard").length,
    sme: allIPOs.filter(ipo => normalizeCategory(ipo.category) === "sme").length,
  };

  const statusCounts = {
    all: allIPOs.length,
    upcoming: allIPOs.filter(ipo => normalizeStatus(ipo.status) === "upcoming").length,
    ongoing: allIPOs.filter(ipo => normalizeStatus(ipo.status) === "ongoing").length,
    closed: allIPOs.filter(ipo => normalizeStatus(ipo.status) === "closed").length,
    listed: allIPOs.filter(ipo => normalizeStatus(ipo.status) === "listed").length,
    allotted: allIPOs.filter(ipo => normalizeStatus(ipo.status) === "allotted").length,
  };

  return (
    <>
      <Hero />
      <Filters categoryCounts={categoryCounts} statusCounts={statusCounts} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedIPOs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              No IPOs Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Check back soon for the latest IPO listings
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {sortedIPOs.map((ipo, index) => (
              <IpoCard key={ipo._id || index} ipo={ipo} priority={index < 6} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            About IpoFly - India's #1 Live IPO GMP Tracker
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              IpoFly is India's most trusted platform for tracking <strong>Live IPO GMP (Grey Market Premium)</strong>.
              We provide real-time IPO data including GMP rates, kostak rates, subscription status,
              and allotment details for all <strong>mainboard IPOs</strong> and <strong>SME IPOs</strong> in India.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}