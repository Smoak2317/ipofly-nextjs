// src/app/heatmap/page.tsx
import { fetchAllIPOs, sortIPOsByPriority } from "@/lib/api";
import HeatMapClient from "@/components/HeatMap/HeatMapClient";
import Link from "next/link";

export const revalidate = 300;

export const metadata = {
  title: "IPO Heat Map - Live Performance Dashboard | IpoFly",
  description: "Visual IPO heat map with color-coded GMP percentage performance for all mainboard and SME IPOs in India.",
};

export default async function HeatMapPage() {
  const allIPOs = await fetchAllIPOs();
  const sortedIPOs = sortIPOsByPriority(allIPOs);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 py-2">
        <ol className="flex items-center space-x-2 text-xs">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium">Heat Map</li>
        </ol>
      </nav>

      {/* Heat Map Component */}
      <HeatMapClient ipos={sortedIPOs} />
    </>
  );
}