import type { Metadata } from 'next';
import ProductsView from '@/components/corporate/views/ProductsView';

export const metadata: Metadata = {
  title: '製品 | DeepingSource — すべての店舗を、ひとつの店舗のように。',
  description:
    'store insight・store agent・store care・SAAI。エンタープライズ空間分析から店主向けの安心ソリューション、B2Cコンテンツまで。すべての店舗をひとつの店舗のように運営する DeepingSource の製品ラインナップ。',
  keywords: ['DeepingSource', '製品', 'store insight', 'store agent', 'store care', 'SAAI', '店舗分析', '空間インテリジェンス'],
  alternates: {
    canonical: '/jp/products',
    languages: {
      en: '/products',
      ko: '/ko/products',
      ja: '/jp/products',
    },
  },
  openGraph: {
    title: '製品 | DeepingSource',
    description: 'すべての店舗を、ひとつの店舗のように。エンタープライズ分析から店主向けの安心、B2Cコンテンツまで。',
    type: 'website',
  },
};

export default function Page() {
  return <ProductsView locale="jp" />;
}
