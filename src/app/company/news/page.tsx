import type { Metadata } from 'next';
import NewsView from '@/components/corporate/views/NewsView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: 'Press & Media — DEEPINGSOURCE Inc.',
  description: `Press releases, media coverage, and announcements from ${COMPANY.name}, all in one place.`,
  keywords: ['DeepingSource', 'Press', 'News', 'Media', 'Press release', 'PR'],
  alternates: {
    canonical: 'https://www.deepingsource.io/company/news',
    languages: {
      en: 'https://www.deepingsource.io/company/news',
      ko: 'https://www.deepingsource.io/ko/company/news',
      ja: 'https://www.deepingsource.io/jp/company/news',
    },
  },
  openGraph: {
    title: 'Press & Media — DEEPINGSOURCE Inc.',
    description: `Press releases and media coverage from ${COMPANY.name}.`,
    url: 'https://www.deepingsource.io/company/news',
  },
};

export default function CompanyNewsPage() {
  return <NewsView locale="en" />;
}
