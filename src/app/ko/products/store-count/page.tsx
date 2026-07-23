import type { Metadata } from 'next';
import StoreCountView from '@/components/corporate/views/StoreCountView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'store count — 상권·유입 카운팅 | DEEPINGSOURCE',
  description:
    '매장 앞 유동인구부터 들어온 고객, 유입률까지 — 카메라 한 대로, 사람 없이, 매일 상시로 셉니다. 매장에서 상권까지 잇는 상권분석, 프라이버시는 설계로.',
  keywords: ['saai count', 'store count', '상권분석', '유동인구', '카운팅', '유입률', '리테일 분석', '익명 카운팅', 'DeepingSource'],
  alternates: {
    canonical: '/ko/products/store-count',
    languages: {
      en: '/products/store-count',
      ko: '/ko/products/store-count',
      ja: '/jp/products/store-count',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: 'store count — 상권·유입 카운팅 | DEEPINGSOURCE',
    description: '해야 하는데 못 하던 상권분석 — 카메라 한 대로, 매일, 사람 없이.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Page() {
  return <StoreCountView locale="ko" />;
}
