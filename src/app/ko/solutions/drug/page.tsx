import type { Metadata } from 'next';
import DrugView from '@/components/corporate/views/DrugView';

export const metadata: Metadata = {
  title: '드럭스토어 솔루션 | 딥핑소스',
  description:
    '진열 일관성, 결품 방지, 고객 동선까지. 업종이 달라도 한 매장처럼 운영되도록 돕는 드럭스토어 운영 솔루션입니다.',
  alternates: {
    canonical: '/ko/solutions/drug',
    languages: {
      en: '/solutions/drug',
      ko: '/ko/solutions/drug',
      ja: '/jp/solutions/drug',
    },
  },
  openGraph: {
    title: '드럭스토어 솔루션 | 딥핑소스',
    description: '진열·결품·동선을 같은 기준으로. 업종이 달라도 한 매장처럼 운영되는 드럭스토어.',
    url: '/ko/solutions/drug',
  },
};

export default function Page() {
  return <DrugView locale="ko" />;
}
