import type { Metadata } from 'next';
import FunctionToolView from '@/components/corporate/views/FunctionToolView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'store queue — 待ち・混雑 | DEEPINGSOURCE',
  description: 'レジの待ちと店内の混雑をリアルタイムに測り、混む前に人員を動かします。saai care・insight・agent の3モードを横断する機能。',
  keywords: ['store queue', '待ち行列 分析', '店舗 混雑', '待ち時間', '匿名化 空間AI', 'DeepingSource'],
  alternates: {
    canonical: '/jp/products/store-queue',
    languages: { en: '/products/store-queue', ko: '/ko/products/store-queue', ja: '/jp/products/store-queue' },
  },
  openGraph: {
    ...OG_BASE,
    title: 'store queue — 待ち・混雑 | DEEPINGSOURCE',
    description: '待ちと混雑をリアルタイムに測り、混む前に人員を動かします。',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function Page() {
  return <FunctionToolView tool="queue" locale="jp" />;
}
