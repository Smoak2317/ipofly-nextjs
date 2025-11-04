import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipofly-273428006377.asia-south1.run.app',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Allow local images from public folder
    unoptimized: false,
  },
    output: 'export', // Enables static export (Next 13+)
  basePath: '/ipofly-nextjs', // Required for GitHub Pages
  assetPrefix: '/ipofly-nextjs/', // Required for GitHub Pages
  reactStrictMode: true,
};

export default nextConfig;