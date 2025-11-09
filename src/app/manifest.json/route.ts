import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: 'IpoFly - Live IPO GMP Tracker',
    short_name: 'IpoFly',
    description: 'Track Live IPO GMP Today - Grey Market Premium for Mainboard & SME IPOs',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  return NextResponse.json(manifest);
}