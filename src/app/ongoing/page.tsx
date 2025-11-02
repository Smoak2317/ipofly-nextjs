import { fetchIPOsByStatus, sortIPOsByPriority } from "@/lib/api";
import Filters from "@/components/Filters";
import ClientPagination from "@/components/ClientPagination";
import Link from "next/link";

export const revalidate = 300;
export const metadata = { title: "Live IPO | IpoFly" };

export default async function OngoingPage() {
  const ipos = await fetchIPOsByStatus("ongoing");
  const sortedIPOs = sortIPOsByPriority(ipos);

  return (
    <>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium">Live</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm mb-6">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            🔴 LIVE - Apply Now
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Live IPO with Real-Time GMP
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Apply for currently open IPOs with real-time Grey Market Premium
          </p>
        </div>
      </section>

      <Filters />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedIPOs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-50">⏰</div>
            <h2 className="text-2xl font-bold">No Live IPOs Right Now</h2>
          </div>
        ) : (
          <ClientPagination allIpos={sortedIPOs} />
        )}
      </section>
    </>
  );
}