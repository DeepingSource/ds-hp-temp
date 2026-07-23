import type { Metadata } from 'next';
import StoreAgentView from '@/components/corporate/views/StoreAgentView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'saai agent — store agent | DEEPINGSOURCE',
  description:
    'Executive의 판단을 매장 운영에 더합니다. 오늘 무엇을, 얼마나, 어디에 둘지 — store agent가 데이터를 결정으로 옮깁니다. 권고는 AI가, 결정은 사람이.',
  keywords: ['saai agent', 'store agent', '매장 AI', '운영 자동화', '의사결정 AI', '발주 자동화', 'DeepingSource'],
  alternates: {
    canonical: '/ko/products/saai-agent',
    languages: {
      en: '/products/saai-agent',
      ko: '/ko/products/saai-agent',
      ja: '/jp/products/saai-agent',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: 'saai agent — store agent | DEEPINGSOURCE',
    description: '데이터를 넘어 결정으로. 매장 운영의 다음 한 수를 제안합니다.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Page() {
  return <StoreAgentView locale="ko" />;
}
