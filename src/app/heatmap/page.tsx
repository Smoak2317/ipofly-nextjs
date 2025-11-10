// src/app/heatmap/page.tsx
import { fetchAllIPOs, sortIPOsByPriority } from "@/lib/api";
import HeatMapClient from "@/components/HeatMap/HeatMapClient";
import Link from "next/link";

export const revalidate = 300;



export default async function HeatMapPage() {
  const allIPOs = await fetchAllIPOs();
  const sortedIPOs = sortIPOsByPriority(allIPOs);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium">Heat Map</li>
        </ol>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 dark:from-purple-950 dark:via-pink-950 dark:to-rose-950 py-16 md:py-8">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:40px_40px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold mb-6 border border-white/20 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Visual Market Performance
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              IPO Heat Map
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                Live Performance
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Visualize market performance at a glance with color-coded IPO tiles.
              <br className="hidden sm:block" />
              Larger tiles indicate higher GMP percentages. Red dot for live IPOs.
            </p>
          </div>
        </div>
      </section>

      {/* Heat Map Component */}
      <HeatMapClient ipos={sortedIPOs} />
    </>
  );
}