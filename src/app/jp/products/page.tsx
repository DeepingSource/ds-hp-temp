import type { Metadata } from 'next';
import ProductsView from '@/components/corporate/views/ProductsView';

export const metadata: Metadata = {
  title: '製品 | DEEPINGSOURCE — すべての空間を、完璧に。',
  description:
    '匿名化空間AI — saai insight・saai agent・saai care・SAAI。エンタープライズ空間分析から店主向けの安心ソリューション、B2Cコンテンツまで。すべての店舗をひとつの店舗のように運営する DeepingSource の製品ラインナップ。',
  keywords: ['DeepingSource', '製品', 'saai insight', 'saai agent', 'saai care', 'SAAI', '店舗分析', '空間インテリジェンス', '匿名化空間AI'],
  alternates: {
    canonical: '/jp/products',
    languages: {
      en: '/products',
      ko: '/ko/products',
      ja: '/jp/products',
    },
  },
  openGraph: {
    title: '製品 | DEEPINGSOURCE',
    description: 'すべての空間を、完璧に。エンタープライズ分析から店主向けの安心、B2Cコンテンツまで。',
    type: 'website',
  },
};

export default function Page() {
  return <ProductsView locale="jp" />;
}
