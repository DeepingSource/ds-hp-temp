import type { Metadata } from 'next';
import StoreAgentContent from '@/components/pages/StoreAgentContent';

export const metadata: Metadata = {
  title: 'STOREAGENT — AI 매장 운영 자동화 | SAAI',
  description: '승인 한 번으로 최적화된 운영 가이드가 현장에 바로 전달됩니다. 발주, 진열, 프로모션까지 자동화하는 AI 매장 에이전트.',
  keywords: ['STOREAGENT', 'AI 발주 자동화', '매장 AI 에이전트', '발주 관리', '진열 자동화', '프로모션 자동화', '편의점 발주', '액션 카드', 'AI 브리핑', '매장 운영 자동화'],
  alternates: { canonical: 'https://storeagent.kr/storeagent' },
  openGraph: {
    title: 'STOREAGENT — AI 매장 운영 자동화 | SAAI',
    description: '사장님의 승인 한 번으로 최적화된 운영 가이드가 현장에 바로 전달됩니다. 발주, 진열, 프로모션까지 자동 제안.',
    url: 'https://storeagent.kr/storeagent',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'STOREAGENT — AI 매장 운영 자동화' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STOREAGENT — AI 매장 운영 자동화 | SAAI',
    description: '사장님의 승인 한 번으로 최적화된 운영 가이드가 현장에 바로 전달됩니다.',
  },
};

export default function StoreAgentPage() {
  return <StoreAgentContent />;
}
