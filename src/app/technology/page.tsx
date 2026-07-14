import type { Metadata } from 'next';
import TechnologyView from '@/components/corporate/views/TechnologyView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: 'Technology — Anonymized Spatial AI | DEEPINGSOURCE',
  description: `Analyze space without ever touching personal data. Explore DeepingSource’s Anonymizer, SEAL, Spatial AI, and Vision Models technology, protected by ${COMPANY.patents} patents.`,
  keywords: ['Anonymization AI', 'Anonymizer', 'SEAL', 'Spatial AI', 'MTMC', 'Vision Models', 'Privacy AI', 'GDPR AI', 'Spatial data analytics', 'PII removal'],
  alternates: {
    canonical: '/technology',
    languages: {
      'x-default': '/technology',
      en: '/technology',
      ko: '/ko/technology',
      ja: '/jp/technology',
    },
  },
  openGraph: {
    title: 'Technology — Anonymized Spatial AI | DEEPINGSOURCE',
    description: `We never touch personal data. You never lose the data. DeepingSource technology, backed by ${COMPANY.patents} patents.`,
    url: '/technology',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'DeepingSource Anonymized Spatial AI technology' }],
  },
};

const technologyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Technology — Anonymized Spatial AI',
  description: `Analyze space without ever touching personal data. DeepingSource technology, protected by ${COMPANY.patents} patents.`,
  url: 'https://deepingsource.io/technology',
  provider: { '@type': 'Organization', name: 'DeepingSource Inc.', url: 'https://deepingsource.io' },
};

export default function TechnologyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(technologyJsonLd).replace(/</g, '\\u003c') }} />
      <TechnologyView locale="en" />
    </>
  );
}
