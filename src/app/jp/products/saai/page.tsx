import type { Metadata } from 'next';
import SaaiView from '@/components/corporate/views/SaaiView';

export const metadata: Metadata = {
  title: 'AI POP | DeepingSource — 店舗のコンテンツ',
  description:
    'POPから季節コンテンツまで、店舗を引き立てるコンテンツを手軽に。AI POP は SAAI のコンテンツ製品で、saai.store で運営されます。',
  keywords: ['AI POP', 'SAAI', '店舗コンテンツ', 'POPメーカー', 'コンテンツアーカイブ', '季節コンテンツ', 'saai.store'],
  alternates: {
    canonical: '/jp/products/saai',
    languages: {
      en: '/products/saai',
      ko: '/ko/products/saai',
      ja: '/jp/products/saai',
    },
  },
  openGraph: {
    title: 'AI POP | DeepingSource',
    description: '店舗のコンテンツ。POPから季節コンテンツまで手軽に。',
    type: 'website',
  },
};

export default function Page() {
  return <SaaiView locale="jp" />;
}
