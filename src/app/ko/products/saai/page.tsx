import type { Metadata } from 'next';
import SaaiView from '@/components/corporate/views/SaaiView';

export const metadata: Metadata = {
  title: 'saai.store | DEEPINGSOURCE — 카메라리스 사장님 suite',
  description:
    '발주부터 POP까지, 하나의 흐름으로 — 사장님을 위한 카메라리스 suite. saai.store는 SAAI의 사장님용 B2C 제품입니다. (POP 메이커는 suite 안의 한 도구입니다.)',
  keywords: ['saai.store', 'SAAI', '사장님 suite', 'POP 메이커', '콘텐츠 아카이브', '시즌 콘텐츠'],
  alternates: {
    canonical: '/ko/products/saai',
    languages: {
      en: '/products/saai',
      ko: '/ko/products/saai',
      ja: '/jp/products/saai',
    },
  },
  openGraph: {
    title: 'saai.store | DEEPINGSOURCE',
    description: '사장님을 위한 카메라리스 suite — 발주부터 POP까지, 하나의 흐름으로.',
    type: 'website',
  },
};

export default function Page() {
  return <SaaiView locale="ko" />;
}
