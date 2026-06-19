import type { Metadata } from 'next';
import SaaiView from '@/components/corporate/views/SaaiView';

export const metadata: Metadata = {
  title: 'SAAI | Deeping Source — 매장의 콘텐츠',
  description:
    'POP부터 시즌 콘텐츠까지, 매장을 돋보이게 하는 콘텐츠를 손쉽게. SAAI는 saai.store에서 운영되는 B2C 콘텐츠 서비스입니다.',
  keywords: ['SAAI', '매장 콘텐츠', 'POP 메이커', '콘텐츠 아카이브', '시즌 콘텐츠', 'B2C', 'saai.store'],
  alternates: {
    canonical: '/ko/products/saai',
    languages: {
      en: '/products/saai',
      ko: '/ko/products/saai',
      ja: '/jp/products/saai',
    },
  },
  openGraph: {
    title: 'SAAI | Deeping Source',
    description: '매장의 콘텐츠. POP부터 시즌 콘텐츠까지 손쉽게.',
    type: 'website',
  },
};

export default function Page() {
  return <SaaiView locale="ko" />;
}
