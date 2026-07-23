import type { Metadata } from 'next';
import FunctionToolView from '@/components/corporate/views/FunctionToolView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'store pop — 판촉물(POP) | DEEPINGSOURCE',
  description: '게시된 판촉물의 노출·주목·전환을 재고, 문구·위치·교체 시점까지 제안합니다. saai care·insight·agent 세 모드를 가로지르는 기능.',
  keywords: ['store pop', 'POP 효과 분석', '판촉물', '사이니지 주목', '익명화 공간 AI', '딥핑소스'],
  alternates: {
    canonical: '/ko/products/store-pop',
    languages: { en: '/products/store-pop', ko: '/ko/products/store-pop', ja: '/jp/products/store-pop' },
  },
  openGraph: {
    ...OG_BASE,
    title: 'store pop — 판촉물(POP) | DEEPINGSOURCE',
    description: '붙여둔 POP이 정말 보이고 있나요? 노출·주목·전환을 숫자로.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Page() {
  return <FunctionToolView tool="pop" locale="ko" />;
}
