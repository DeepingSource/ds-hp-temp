import type { Metadata } from 'next';
import ProductsView from '@/components/corporate/views/ProductsView';

export const metadata: Metadata = {
  title: '제품 | Deeping Source — 모든 매장을 한 매장처럼',
  description:
    'Store Insight·Store Agent·Store Care·SAAI. 엔터프라이즈 공간 분석부터 점주용 안심 솔루션, B2C 콘텐츠까지. 모든 매장을 한 매장처럼 운영하는 Deeping Source의 제품 라인업.',
  keywords: ['Deeping Source', '제품', 'Store Insight', 'Store Agent', 'Store Care', 'SAAI', '매장 분석', '공간 인텔리전스'],
  alternates: {
    canonical: '/ko/products',
    languages: {
      en: '/products',
      ko: '/ko/products',
      ja: '/jp/products',
    },
  },
  openGraph: {
    title: '제품 | Deeping Source',
    description: '모든 매장을 한 매장처럼. 엔터프라이즈 분석부터 점주용 안심, B2C 콘텐츠까지.',
    type: 'website',
  },
};

export default function Page() {
  return <ProductsView locale="ko" />;
}
