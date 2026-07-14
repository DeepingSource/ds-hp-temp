import type { Metadata } from 'next';
import SolutionsView from '@/components/corporate/views/SolutionsView';

export const metadata: Metadata = {
  title: 'Solutions by Industry — Problem-Solution Guide | DEEPINGSOURCE',
  description: 'Convenience-store theft prevention, café turnover, unmanned-store anomaly detection, and more. See how SAAI’s Anonymized Spatial AI solves real problems by industry.',
  alternates: {
    canonical: '/solutions',
    languages: {
      en: '/solutions',
      ko: '/ko/solutions',
      ja: '/jp/solutions',
    },
  },
  openGraph: {
    title: 'Solutions by Industry — Problem-Solution Guide | DEEPINGSOURCE',
    description: 'See how SAAI solves on-site problems by industry, with concrete cases.',
    url: '/solutions',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Solutions by Industry — Problem-Solution Guide | DeepingSource' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solutions by Industry — Problem-Solution Guide | DEEPINGSOURCE',
    description: 'See how SAAI solves on-site problems by industry, with concrete cases.',
  },
};

export default function Page() {
  return <SolutionsView locale="en" />;
}
