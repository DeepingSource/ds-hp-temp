import type { Metadata } from 'next';
import SaaiView from '@/components/corporate/views/SaaiView';

export const metadata: Metadata = {
  title: 'AI POP | DeepingSource — 매장의 콘텐츠',
  description:
    'POP부터 시즌 콘텐츠까지, 매장을 돋보이게 하는 콘텐츠를 손쉽게. AI POP은 SAAI의 콘텐츠 제품으로, saai.store에서 운영됩니다.',
  keywords: ['AI POP', 'SAAI', '매장 콘텐츠', 'POP 메이커', '콘텐츠 아카이브', '시즌 콘텐츠', 'saai.store'],
  alternates: {
    canonical: '/ko/products/saai',
    languages: {
      en: '/products/saai',
      ko: '/ko/products/saai',
      ja: '/jp/products/saai',
    },
  },
  openGraph: {
    title: 'AI POP | DeepingSource',
    description: '매장의 콘텐츠. POP부터 시즌 콘텐츠까지 손쉽게.',
    type: 'website',
  },
};

export default function Page() {
  return <SaaiView locale="ko" />;
}
