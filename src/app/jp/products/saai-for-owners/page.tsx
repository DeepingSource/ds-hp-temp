import type { Metadata } from 'next';
import SaaiForOwnersView from '@/components/corporate/views/SaaiForOwnersView';

export const metadata: Metadata = {
  title: '店舗オーナー専用 SAAI サービス | DEEPINGSOURCE',
  description:
    '工事不要、スマホ一台で始める小規模店舗・店舗オーナー向け SAAI サービス (saai.store & storecare.ai)。',
  keywords: ['店舗AI', 'オーナー向けサービス', 'saai.store', 'storecare.ai', 'DeepingSource'],
  alternates: {
    canonical: '/jp/products/saai-for-owners',
    languages: {
      en: '/products/saai-for-owners',
      ko: '/ko/products/saai-for-owners',
      ja: '/jp/products/saai-for-owners',
    },
  },
};

export default function Page() {
  return <SaaiForOwnersView locale="jp" />;
}
