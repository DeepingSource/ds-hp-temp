import type { Metadata } from 'next';
import RetailView from '@/components/corporate/views/RetailView';

export const metadata: Metadata = {
  title: '리테일·편의점 솔루션 | 딥핑소스',
  description:
    '결품, 매장 간 운영 편차, 이상 상황까지. 매장 운영의 핵심 문제를 같은 기준으로 살펴 돕는 리테일·편의점 솔루션입니다.',
  alternates: {
    canonical: '/ko/solutions/retail',
    languages: {
      en: '/solutions/retail',
      ko: '/ko/solutions/retail',
      ja: '/jp/solutions/retail',
    },
  },
  openGraph: {
    locale: 'ko_KR',
    title: '리테일·편의점 솔루션 | 딥핑소스',
    description:
      '결품, 운영 편차, 이상 감지까지 매장 운영의 핵심 문제를 한 번에. 결품도 이상도 놓치지 않게.',
    url: '/ko/solutions/retail',
  },
};

export default function Page() {
  return <RetailView locale="ko" />;
}
