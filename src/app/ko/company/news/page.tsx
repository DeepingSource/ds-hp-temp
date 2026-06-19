import type { Metadata } from 'next';
import NewsView from '@/components/corporate/views/NewsView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: '보도자료 · 미디어 — DeepingSource Inc.',
  description: `${COMPANY.nameKo}의 보도자료, 언론 보도, 미디어 커버리지를 한곳에서 확인하세요.`,
  keywords: ['DeepingSource', '딥핑소스', '보도자료', '뉴스', '미디어', '언론 보도', 'PR'],
  alternates: {
    canonical: 'https://www.deepingsource.io/ko/company/news',
    languages: {
      en: 'https://www.deepingsource.io/company/news',
      ko: 'https://www.deepingsource.io/ko/company/news',
      ja: 'https://www.deepingsource.io/jp/company/news',
    },
  },
  openGraph: {
    title: '보도자료 · 미디어 — DeepingSource Inc.',
    description: `${COMPANY.nameKo}의 보도자료와 미디어 커버리지.`,
    url: 'https://www.deepingsource.io/ko/company/news',
  },
};

export default function KoCompanyNewsPage() {
  return <NewsView locale="ko" />;
}
