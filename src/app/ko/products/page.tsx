import type { Metadata } from 'next';
import ProductsView from '@/components/corporate/views/ProductsView';

export const metadata: Metadata = {
  title: '제품 | DeepingSource — 모든 매장을 한 매장처럼',
  description:
    'store insight·store agent·store care·SAAI. 엔터프라이즈 공간 분석부터 점주용 안심 솔루션, B2C 콘텐츠까지. 모든 매장을 한 매장처럼 운영하는 DeepingSource의 제품 라인업.',
  keywords: ['DeepingSource', '제품', 'store insight', 'store agent', 'store care', 'SAAI', '매장 분석', '공간 인텔리전스'],
  alternates: {
    canonical: '/ko/products',
    languages: {
      en: '/products',
      ko: '/ko/products',
      ja: '/jp/products',
    },
  },
  openGraph: {
    title: '제품 | DeepingSource',
    description: '모든 매장을 한 매장처럼. 엔터프라이즈 분석부터 점주용 안심, B2C 콘텐츠까지.',
    type: 'website',
  },
};

export default function Page() {
  return <ProductsView locale="ko" />;
}
