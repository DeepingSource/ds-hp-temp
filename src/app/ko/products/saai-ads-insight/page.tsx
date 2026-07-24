import type { Metadata } from 'next';
import SaaiAdsInsightView from '@/components/corporate/views/SaaiAdsInsightView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'saai ads insight — 사이니지·전시물 반응 | DEEPINGSOURCE',
  description:
    '사이니지·전시물·매대 상품 앞의 통행·접근·주목·행동을 익명으로 측정해, 무엇을 어디에 걸지 데이터로. saai care·insight·agent를 가로지르는 제품.',
  keywords: ['saai ads insight', '사이니지 분석', '주목도 측정', '시선 분석', '광고 효과', '익명화 공간 AI', '딥핑소스'],
  alternates: {
    canonical: '/ko/products/saai-ads-insight',
    languages: { en: '/products/saai-ads-insight', ko: '/ko/products/saai-ads-insight', ja: '/jp/products/saai-ads-insight' },
  },
  openGraph: {
    ...OG_BASE,
    title: 'saai ads insight — 사이니지·전시물 반응 | DEEPINGSOURCE',
    description: '사이니지·전시물 앞의 통행·접근·주목·행동을 익명으로 측정해, 무엇을 어디에 걸지 데이터로.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Page() {
  return <SaaiAdsInsightView locale="ko" />;
}
