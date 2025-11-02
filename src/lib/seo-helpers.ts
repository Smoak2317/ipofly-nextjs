import { Metadata } from 'next';

export function generateBaseMetadata(): Metadata {
  return {
    metadataBase: new URL('https://ipofly.com'),
    title: {
      default: 'IpoFly - Live IPO GMP Today | Grey Market Premium Tracker India 2024',
      template: '%s | IpoFly',
    },
    description: 'Track Live IPO GMP Today ✓ Grey Market Premium ✓ Mainboard & SME IPO ✓ Subscription Status ✓ Allotment Status. Real-time IPO tracking for smart investors.',
    keywords: [
      'ipo gmp',
      'ipo gmp today',
      'grey market premium',
      'live ipo gmp',
      'ipo tracker',
      'mainboard ipo',
      'sme ipo',
      'ipo subscription',
      'ipo allotment',
    ],
    authors: [{ name: 'IpoFly' }],
    creator: 'IpoFly',
    publisher: 'IpoFly',
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: 'IpoFly',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@IpoFly',
    },
  };
}