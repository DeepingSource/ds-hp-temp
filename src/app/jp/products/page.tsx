import type { Metadata } from 'next';
import ProductsView from '@/components/corporate/views/ProductsView';

export const metadata: Metadata = {
  title: '製品 | Deeping Source — すべての店舗を、ひとつの店舗のように。',
  description:
    'Store Insight・Store Agent・Store Care・SAAI。エンタープライズ空間分析から店主向けの安心ソリューション、B2Cコンテンツまで。すべての店舗をひとつの店舗のように運営する Deeping Source の製品ラインナップ。',
  keywords: ['Deeping Source', '製品', 'Store Insight', 'Store Agent', 'Store Care', 'SAAI', '店舗分析', '空間インテリジェンス'],
  alternates: {
    canonical: '/jp/products',
    languages: {
      en: '/products',
      ko: '/ko/products',
      ja: '/jp/products',
    },
  },
  openGraph: {
    title: '製品 | Deeping Source',
    description: 'すべての店舗を、ひとつの店舗のように。エンタープライズ分析から店主向けの安心、B2Cコンテンツまで。',
    type: 'website',
  },
};

export default function Page() {
  return <ProductsView locale="jp" />;
}
