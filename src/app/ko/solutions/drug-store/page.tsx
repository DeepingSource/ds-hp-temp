import type { Metadata } from 'next';
import DrugView from '@/components/corporate/views/DrugView';

export const metadata: Metadata = {
  title: '드럭스토어 솔루션 | 딥핑소스',
  description:
    '진열 일관성, 결품 방지, 고객 동선까지. 카테고리가 많아도 흐트러지지 않도록 돕는 드럭스토어 솔루션입니다.',
  alternates: {
    canonical: '/ko/solutions/drug-store',
    languages: {
      en: '/solutions/drug-store',
      ko: '/ko/solutions/drug-store',
      ja: '/jp/solutions/drug-store',
    },
  },
  openGraph: {
    locale: 'ko_KR',
    title: '드럭스토어 솔루션 | 딥핑소스',
    description: '진열·결품·동선을 같은 기준으로. 카테고리가 많아도 흐트러지지 않는 드럭스토어.',
    url: '/ko/solutions/drug-store',
  },
};

export default function Page() {
  return <DrugView locale="ko" />;
}
