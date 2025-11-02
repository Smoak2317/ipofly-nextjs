import { fetchIPOsByStatus, sortIPOsByPriority } from "@/lib/api";
import { generateStatusMetadata } from "@/lib/seo";
import IpoCard from "@/components/IpoCard";
import Link from "next/link";

export const revalidate = 300;
export const metadata = generateStatusMetadata("ongoing");

export default async function OngoingPage() {
  const ipos = await fetchIPOsByStatus("ongoing");
  const sortedIPOs = sortIPOsByPriority(ipos);

  return (
    <>
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
          <li>/</li>
          <li className="font-medium">Ongoing IPO</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm mb-6">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            LIVE - Apply Now
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Ongoing IPO with Live GMP
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Apply for currently open IPOs with real-time Grey Market Premium
          </p>
          <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full text-white">
            <span>⚡</span>
            {sortedIPOs.length} IPOs Open for Subscription
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {sortedIPOs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⏰</div>
            <h2 className="text-2xl font-bold mb-2">No Ongoing IPOs Right Now</h2>
            <Link href="/upcoming" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg">
              View Upcoming IPOs →
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 rounded-lg">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                <strong>Apply Before It Closes!</strong> These IPOs are currently open for subscription.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedIPOs.map((ipo, index) => (
                <IpoCard key={ipo._id || index} ipo={ipo} priority={index < 6} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}