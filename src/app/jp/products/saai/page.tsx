import type { Metadata } from 'next';
import SaaiView from '@/components/corporate/views/SaaiView';

export const metadata: Metadata = {
  title: 'SAAI | Deeping Source — 店舗のコンテンツ',
  description:
    'POPから季節コンテンツまで、店舗を引き立てるコンテンツを手軽に。SAAI は saai.store で運営される B2C コンテンツサービスです。',
  keywords: ['SAAI', '店舗コンテンツ', 'POPメーカー', 'コンテンツアーカイブ', '季節コンテンツ', 'B2C', 'saai.store'],
  alternates: {
    canonical: '/jp/products/saai',
    languages: {
      en: '/products/saai',
      ko: '/ko/products/saai',
      ja: '/jp/products/saai',
    },
  },
  openGraph: {
    title: 'SAAI | Deeping Source',
    description: '店舗のコンテンツ。POPから季節コンテンツまで手軽に。',
    type: 'website',
  },
};

export default function Page() {
  return <SaaiView locale="jp" />;
}
