import type { Metadata } from 'next';
import StoreInsightView from '@/components/corporate/views/StoreInsightView';

export const metadata: Metadata = {
  title: 'Store Insight | Deeping Source — 店舗を読み解く空間分析',
  description:
    'アナリストの冷静さで店舗を読み解きます。動線・滞在・転換を掛け合わせて分析し、売上変化の要因を突き止めるエンタープライズ空間分析。POS は売れたものしか分かりません。Store Insight は売れかけたものも分かります。',
  keywords: ['Store Insight', '空間分析', '店舗データ', '動線分析', '転換率', '売上要因分析', 'Deeping Source'],
  alternates: {
    canonical: '/jp/products/store-insight',
    languages: {
      en: '/products/store-insight',
      ko: '/ko/products/store-insight',
      ja: '/jp/products/store-insight',
    },
  },
  openGraph: {
    title: 'Store Insight | Deeping Source',
    description: 'アナリストの冷静さで店舗を読み解きます。売上変化の要因を、データで。',
    type: 'website',
  },
};

export default function Page() {
  return <StoreInsightView locale="jp" />;
}
