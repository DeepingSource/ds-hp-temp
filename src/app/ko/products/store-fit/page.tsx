import type { Metadata } from 'next';
import FunctionToolView from '@/components/corporate/views/FunctionToolView';

export const metadata: Metadata = {
  title: 'store fit — 트렌드 적합 | DEEPINGSOURCE',
  description: '신상품이 이 매장에 맞는지 — 시선·집어듦·재방문으로, 진열 첫 주에. saai care·insight·agent 세 모드를 가로지르는 기능.',
  keywords: ['store fit', '트렌드 적합', '신상품 반응', 'gaze to pick', '익명화 공간 AI', '딥핑소스'],
  alternates: {
    canonical: '/ko/products/store-fit',
    languages: { en: '/products/store-fit', ko: '/ko/products/store-fit', ja: '/jp/products/store-fit' },
  },
  openGraph: {
    title: 'store fit — 트렌드 적합 | DEEPINGSOURCE',
    description: '잘 나갈 상품인지, 진열 첫 주에 압니다.',
    type: 'website',
  },
};

export default function Page() {
  return <FunctionToolView tool="fit" locale="ko" />;
}
