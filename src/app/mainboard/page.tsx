import { fetchIPOsByCategory, sortIPOsByPriority } from "@/lib/api";
import { generateCategoryMetadata } from "@/lib/seo";
import IpoCard from "@/components/IpoCard";
import Link from "next/link";

export const revalidate = 300;
export const metadata = generateCategoryMetadata("mainboard");

export default async function MainboardPage() {
  const ipos = await fetchIPOsByCategory("mainboard");
  const sortedIPOs = sortIPOsByPriority(ipos);

  return (
    <>
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
          <li>/</li>
          <li className="font-medium">Mainboard IPO</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Mainboard IPO GMP Today
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Track live Grey Market Premium for all Mainboard IPOs in India
          </p>
          <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full text-white">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {sortedIPOs.length} Mainboard IPOs Available
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {sortedIPOs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold mb-2">No Mainboard IPOs Found</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedIPOs.map((ipo, index) => (
              <IpoCard key={ipo._id || index} ipo={ipo} priority={index < 6} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}