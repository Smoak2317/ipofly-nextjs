import { fetchIPOsByCategory, sortIPOsByPriority } from "@/lib/api";
import SmartFilters from "@/components/SmartFilters";
import Link from "next/link";

export const revalidate = 300;
export const metadata = { title: "SME IPO | IpoFly" };

export default async function SmePage() {
  const ipos = await fetchIPOsByCategory("sme");
  const sortedIPOs = sortIPOsByPriority(ipos);

  return (
    <>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium">SME</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            SME IPO GMP Today
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Track live Grey Market Premium for all SME IPOs in India
          </p>
        </div>
      </section>

      {/* Smart Filters - Hide Category, Show Status */}
      <SmartFilters
        allIpos={sortedIPOs}
        hideCategory={true}
        defaultCategory="sme"
      />
    </>
  );
}