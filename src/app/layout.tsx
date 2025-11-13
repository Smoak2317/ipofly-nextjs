import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateHomeMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PWARegister from "@/components/PWARegister";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  ...generateHomeMetadata(),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6366f1" },
    { media: "(prefers-color-scheme: dark)", color: "#1e293b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'IpoFly',
    description: 'Track Live IPO GMP Today - Grey Market Premium for Mainboard & SME IPOs in India',
    url: 'https://ipofly.com',
    logo: 'https://ipofly.com/android-chrome-512x512.png',
    image: 'https://ipofly.com/og-image.png',
    publisher: {
      '@type': 'Organization',
      name: 'IpoFly',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ipofly.com/android-chrome-512x512.png',
        width: 512,
        height: 512
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ipofly.com/?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    sameAs: [
      'https://twitter.com/ipofly',
      'https://facebook.com/ipofly'
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-Flicker Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (darkMode) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* Explicit Favicon Links - CRITICAL FOR GOOGLE */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Ipofly" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6366f1" />

        {/* MS Tile */}
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="IpoFly" />

        {/* iOS Splash Screens */}
        <link
          rel="apple-touch-startup-image"
          href="/splash-1242x2688.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://ipofly.com/" />

        {/* Preconnect to Backend - FIXED: Use env variable */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_BACKEND_URL} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YHLY88C18C"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YHLY88C18C', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>

      <body className={`${inter.variable} antialiased`}>
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
          <Navbar />
          <main>{children}</main>
          <PWARegister />
          <Footer />
        </div>
      </body>
    </html>
  );
}