import type { Metadata } from 'next';
import StoreCareView from '@/components/corporate/views/StoreCareView';

export const metadata: Metadata = {
  title: 'saai care — store care | DEEPINGSOURCE',
  description:
    '작은 매장에도 든든한 눈 하나. 사고·도난·이상 상황을 살피고 알려주는 사장님용 안심 솔루션. 시급 34원, 월 14,900원부터. storecare.ai에서 운영됩니다.',
  keywords: ['saai care', 'store care', '사장님', '매장 안심', '도난 방지', 'CCTV AI', 'SMB', 'storecare.ai'],
  alternates: {
    canonical: '/ko/products/store-care',
    languages: {
      en: '/products/store-care',
      ko: '/ko/products/store-care',
      ja: '/jp/products/store-care',
    },
  },
  openGraph: {
    title: 'saai care — store care | DEEPINGSOURCE',
    description: '시급 34원의 안심. 작은 매장을 지켜주는 사장님용 솔루션.',
    type: 'website',
  },
};

export default function Page() {
  return <StoreCareView locale="ko" />;
}
