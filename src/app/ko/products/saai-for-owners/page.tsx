import type { Metadata } from 'next';
import SaaiForOwnersView from '@/components/corporate/views/SaaiForOwnersView';

export const metadata: Metadata = {
  title: '소상공인·사장님 전용 SAAI 서비스 | DEEPINGSOURCE',
  description:
    '복잡한 장비 공사 없이 스마트폰 하나로 시작하는 소상공인·매장 사장님 전용 SAAI 서비스 (saai.store & storecare.ai).',
  keywords: ['소상공인 AI', '매장 사장님 서비스', 'saai.store', 'storecare.ai', '카메라리스 분석', '딥핑소스'],
  alternates: {
    canonical: '/ko/products/saai-for-owners',
    languages: {
      en: '/products/saai-for-owners',
      ko: '/ko/products/saai-for-owners',
      ja: '/jp/products/saai-for-owners',
    },
  },
};

export default function Page() {
  return <SaaiForOwnersView locale="ko" />;
}
