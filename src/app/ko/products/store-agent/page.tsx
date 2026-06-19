import type { Metadata } from 'next';
import StoreAgentView from '@/components/corporate/views/StoreAgentView';

export const metadata: Metadata = {
  title: 'Store Agent | Deeping Source — 다음 한 수를 제안하는 매장 AI',
  description:
    'Executive의 판단을 매장 운영에 더합니다. 오늘 무엇을, 얼마나, 어디에 둘지 — Store Agent가 데이터를 결정으로 옮깁니다. L0부터 L5까지, 매장 자율 운영의 단계.',
  keywords: ['Store Agent', '매장 AI', '운영 자동화', '의사결정 AI', '매장 자율 운영', 'Deeping Source'],
  alternates: {
    canonical: '/ko/products/store-agent',
    languages: {
      en: '/products/store-agent',
      ko: '/ko/products/store-agent',
      ja: '/jp/products/store-agent',
    },
  },
  openGraph: {
    title: 'Store Agent | Deeping Source',
    description: '데이터를 넘어 결정으로. 매장 운영의 다음 한 수를 제안합니다.',
    type: 'website',
  },
};

export default function Page() {
  return <StoreAgentView locale="ko" />;
}
