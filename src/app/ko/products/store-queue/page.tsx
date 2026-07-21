import type { Metadata } from 'next';
import FunctionToolView from '@/components/corporate/views/FunctionToolView';

export const metadata: Metadata = {
  title: 'store queue — 대기·혼잡 | DEEPINGSOURCE',
  description: '계산대 대기와 매장 혼잡을 실시간으로 재, 붐비기 전에 인력을 옮깁니다. saai care·insight·agent 세 모드를 가로지르는 기능.',
  keywords: ['store queue', '대기열 분석', '매장 혼잡', '대기시간', '익명화 공간 AI', '딥핑소스'],
  alternates: {
    canonical: '/ko/products/store-queue',
    languages: { en: '/products/store-queue', ko: '/ko/products/store-queue', ja: '/jp/products/store-queue' },
  },
  openGraph: {
    title: 'store queue — 대기·혼잡 | DEEPINGSOURCE',
    description: '대기와 혼잡을 실시간으로 재, 붐비기 전에 인력을 옮깁니다.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Page() {
  return <FunctionToolView tool="queue" locale="ko" />;
}
