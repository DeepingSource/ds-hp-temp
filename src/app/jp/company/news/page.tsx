import type { Metadata } from 'next';
import NewsView from '@/components/corporate/views/NewsView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: 'プレス · メディア — DEEPINGSOURCE Inc.',
  description: `${COMPANY.name}のプレスリリース、メディア掲載、お知らせを一か所でご確認いただけます。`,
  keywords: ['DeepingSource', 'プレス', 'ニュース', 'メディア', 'プレスリリース', 'PR'],
  alternates: {
    canonical: 'https://www.deepingsource.io/jp/company/news',
    languages: {
      en: 'https://www.deepingsource.io/company/news',
      ko: 'https://www.deepingsource.io/ko/company/news',
      ja: 'https://www.deepingsource.io/jp/company/news',
    },
  },
  openGraph: {
    title: 'プレス · メディア — DEEPINGSOURCE Inc.',
    description: `${COMPANY.name}のプレスリリースとメディア掲載。`,
    url: 'https://www.deepingsource.io/jp/company/news',
  },
};

export default function JpCompanyNewsPage() {
  return <NewsView locale="jp" />;
}
