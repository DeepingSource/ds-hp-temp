import type { Metadata } from 'next';
import SaaiView from '@/components/corporate/views/SaaiView';

export const metadata: Metadata = {
  title: 'saai.store | DeepingSource — 카메라리스 점주 suite',
  description:
    '발주부터 POP까지, 하나의 흐름으로 — 점주를 위한 카메라리스 suite. saai.store는 SAAI의 점주용 B2C 제품입니다. (POP 메이커는 suite 안의 한 도구입니다.)',
  keywords: ['saai.store', 'SAAI', '점주 suite', 'POP 메이커', '콘텐츠 아카이브', '시즌 콘텐츠'],
  alternates: {
    canonical: '/ko/products/saai',
    languages: {
      en: '/products/saai',
      ko: '/ko/products/saai',
      ja: '/jp/products/saai',
    },
  },
  openGraph: {
    title: 'saai.store | DeepingSource',
    description: '점주를 위한 카메라리스 suite — 발주부터 POP까지, 하나의 흐름으로.',
    type: 'website',
  },
};

export default function Page() {
  return <SaaiView locale="ko" />;
}
