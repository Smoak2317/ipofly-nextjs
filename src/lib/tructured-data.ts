import { IPO } from '@/types/ipo';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IpoFly',
    url: 'https://ipofly.com',
    logo: 'https://ipofly.com/logo.png',
    description: 'Live IPO GMP tracker for Indian IPOs',
    sameAs: [
      'https://twitter.com/IpoFly',
      'https://linkedin.com/company/ipofly',
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'IpoFly',
    url: 'https://ipofly.com',
    description: 'Track live IPO GMP for Indian IPOs',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://ipofly.com?search={search_term}',
      'query-input': 'required name=search_term',
    },
  };
}

export function generateIPOSchema(ipo: IPO) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${ipo.name} IPO`,
    description: ipo.companyDescription,
    url: `https://ipofly.com/ipo/${ipo.name.toLowerCase().replace(/\s+/g, '-')}`,
    provider: {
      '@type': 'Organization',
      name: ipo.name,
      url: ipo.website,
    },
  };
}