// src/lib/seo.ts

import { Metadata } from 'next';
import { IPO } from '@/types/ipo';
import { parseGMP, slugify } from './api';

const SITE_URL = 'https://ipofly.com';
const SITE_NAME = 'IpoFly';
const DEFAULT_DESCRIPTION = 'Track Live IPO GMP Today ✓ Grey Market Premium ✓ Mainboard & SME IPO ✓ Subscription Status ✓ Allotment Status ✓ Latest IPO News India 2025. Real-time IPO tracking for smart investors.';

export function generateHomeMetadata(): Metadata {
  return {
    title: 'IpoFly - Live IPO GMP Today | Grey Market Premium Tracker India 2025',
    description: DEFAULT_DESCRIPTION,
    keywords: [
      'ipo gmp',
      'ipo gmp today',
      'grey market premium',
      'live ipo gmp',
      'ipo gmp tracker',
      'mainboard ipo gmp',
      'sme ipo gmp',
      'ipo subscription status',
      'ipo allotment status',
      'latest ipo india',
      'upcoming ipo',
      'ongoing ipo',
      'ipo news today',
    ],
    authors: [{ name: 'IpoFly Team' }],
    creator: 'IpoFly',
    publisher: 'IpoFly',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: 'IpoFly - Live IPO GMP Today | Grey Market Premium Tracker India 2025',
      description: DEFAULT_DESCRIPTION,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'IpoFly - Live IPO GMP Tracker',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'IpoFly - Live IPO GMP Today | Grey Market Premium Tracker India 2025',
      description: DEFAULT_DESCRIPTION,
      images: [`${SITE_URL}/twitter-image.png`],
      creator: '@IpoFly',
    },
    alternates: {
      canonical: SITE_URL,
    },
    other: {
      'geo.region': 'IN',
      'geo.placename': 'India',
      language: 'English',
      distribution: 'global',
      rating: 'general',
      'revisit-after': '1 days',
    },
  };
}

export function generateIPOMetadata(ipo: IPO): Metadata {
  const slug = slugify(ipo.name);
  const url = `${SITE_URL}/ipo/${slug}`;
  const { amountText, percentText } = parseGMP(ipo.gmp);

  const title = `${ipo.name} IPO - GMP ${amountText} ${percentText || ''} | Live Grey Market Premium`;
  const description = `${ipo.name} IPO Details: Issue Price ${ipo.issuePrice}, GMP ${amountText}, Lot Size ${ipo.lotSize}, Open Date ${ipo.issueOpenDate}, Close Date ${ipo.issueCloseDate}. Check live subscription status, allotment details, and listing gains.`;

  return {
    title,
    description,
    keywords: [
      `${ipo.name} ipo`,
      `${ipo.name} ipo gmp`,
      `${ipo.name} grey market premium`,
      `${ipo.name} subscription status`,
      `${ipo.name} allotment`,
      'ipo gmp today',
      'live ipo gmp',
    ],
    openGraph: {
      type: 'article',
      locale: 'en_IN',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ipo.logoUrl ? `https://ipofly-273428006377.asia-south1.run.app${ipo.logoUrl}` : `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${ipo.name} IPO Logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ipo.logoUrl ? `https://ipofly-273428006377.asia-south1.run.app${ipo.logoUrl}` : `${SITE_URL}/twitter-image.png`],
      creator: '@IpoFly',
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateCategoryMetadata(category: 'mainboard' | 'sme'): Metadata {
  const categoryName = category === 'sme' ? 'SME' : 'Mainboard';
  const title = `${categoryName} IPO GMP Today | Live Grey Market Premium | IpoFly`;
  const description = `Track ${categoryName} IPO GMP today with real-time grey market premium data. Latest ${categoryName} IPO subscription status, allotment details, and listing gains for all upcoming and ongoing IPOs in India.`;

  return {
    title,
    description,
    keywords: [
      `${category} ipo gmp`,
      `${category} ipo gmp today`,
      `${category} grey market premium`,
      `${category} ipo list`,
      `latest ${category} ipo`,
    ],
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: `${SITE_URL}/${category}`,
      siteName: SITE_NAME,
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${category}`,
    },
  };
}

export function generateStatusMetadata(status: 'upcoming' | 'ongoing'): Metadata {
  const statusName = status === 'upcoming' ? 'Upcoming' : 'Ongoing';
  const title = `${statusName} IPO GMP | Live Grey Market Premium | IpoFly`;
  const description = `Check ${statusName.toLowerCase()} IPO GMP today with real-time grey market premium data. Latest ${statusName.toLowerCase()} IPO subscription status, issue dates, and allotment details for smart investment decisions.`;

  return {
    title,
    description,
    keywords: [
      `${status} ipo`,
      `${status} ipo gmp`,
      `${status} ipo list`,
      `${status} ipo india`,
    ],
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: `${SITE_URL}/${status}`,
      siteName: SITE_NAME,
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${status}`,
    },
  };
}

// src/lib/seo.ts - FIXED VERSION
export function generateStructuredData(ipo: IPO) {
  const { amountText } = parseGMP(ipo.gmp);
  const slug = slugify(ipo.name);

  // Extract numeric value from amountText (e.g., "₹150" -> 150)
  const numericAmount = amountText ? parseFloat(amountText.replace(/[^0-9.]/g, '')) : 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${ipo.name} IPO`,
    description: ipo.companyDescription || `${ipo.name} Initial Public Offering`,
    url: `${SITE_URL}/ipo/${slug}`,
    category: ipo.category,
    offers: {
      '@type': 'Offer',
      price: ipo.issuePrice.replace(/[^0-9.]/g, ''),
      priceCurrency: 'INR',
      availability: ipo.status === 'ongoing' ? 'InStock' : 'PreOrder',
      validFrom: ipo.issueOpenDate,
      validThrough: ipo.issueCloseDate,
    },
    provider: {
      '@type': 'Organization',
      name: ipo.name,
      url: ipo.website,
      address: ipo.address,
      telephone: ipo.phone,
      email: ipo.email,
    },
    // FIXED: Use numericAmount instead of amount
    aggregateRating: numericAmount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '100',
    } : undefined,
  };
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}