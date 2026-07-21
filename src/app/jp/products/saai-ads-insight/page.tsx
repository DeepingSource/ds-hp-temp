import type { Metadata } from 'next';
import SaaiAdsInsightView from '@/components/corporate/views/SaaiAdsInsightView';

export const metadata: Metadata = {
  title: 'saai ads insight — サイネージ・展示物の反応 | DEEPINGSOURCE',
  description:
    'サイネージ・展示物・棚商品前の通行・接近・注目・行動を匿名で計測、何をどこに掲げるかをデータで。saai care・insight・agentを横断する製品。',
  keywords: ['saai ads insight', 'サイネージ分析', '注目度測定', '視線分析', '広告効果', '匿名化空間AI', 'DeepingSource'],
  alternates: {
    canonical: '/jp/products/saai-ads-insight',
    languages: { en: '/products/saai-ads-insight', ko: '/ko/products/saai-ads-insight', ja: '/jp/products/saai-ads-insight' },
  },
  openGraph: {
    title: 'saai ads insight — サイネージ・展示物の反応 | DEEPINGSOURCE',
    description: 'サイネージ・展示物前の通行・接近・注目・行動を匿名で計測、何をどこに掲げるかをデータで。',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function Page() {
  return <SaaiAdsInsightView locale="jp" />;
}
