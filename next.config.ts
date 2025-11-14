import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    trailingSlash: false,
  images: {
    remotePatterns: [
      // ✅ Local backend (Spring Boot)
            {
              protocol: 'http',
              hostname: 'localhost',
              port: '8080',
              pathname: '/**',
            },
            // ✅ Production backend (Cloud Run)
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
  reactStrictMode: true,
  // ✅ Rewrites configuration
    async rewrites() {
      return [
        // Forward only API requests to your backend
        {
          source: '/api/:path*',
          destination: 'https://ipofly-273428006377.asia-south1.run.app/api/:path*',
        },
      ];
    },
};

export default nextConfig;