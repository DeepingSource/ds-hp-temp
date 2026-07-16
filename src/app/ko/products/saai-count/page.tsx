import type { Metadata } from 'next';
import StoreCountView from '@/components/corporate/views/StoreCountView';

export const metadata: Metadata = {
  title: 'store count | DEEPINGSOURCE',
  description:
    '매장 앞 유동인구부터 들어온 고객, 유입률까지 — 카메라 한 대로, 사람 없이, 매일 상시로 셉니다. 매장에서 상권까지 잇는 상권분석, 프라이버시는 설계로.',
  keywords: ['store count', '상권분석', '유동인구', '카운팅', '유입률', '리테일 분석', '익명 카운팅', 'DeepingSource'],
  alternates: {
    canonical: '/ko/products/saai-count',
    languages: {
      en: '/products/saai-count',
      ko: '/ko/products/saai-count',
      ja: '/jp/products/saai-count',
    },
  },
  openGraph: {
    title: 'store count | DEEPINGSOURCE',
    description: '해야 하는데 못 하던 상권분석 — 카메라 한 대로, 매일, 사람 없이.',
    type: 'website',
  },
};

export default function Page() {
  return <StoreCountView locale="ko" />;
}
