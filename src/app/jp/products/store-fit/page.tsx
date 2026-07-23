import type { Metadata } from 'next';
import FunctionToolView from '@/components/corporate/views/FunctionToolView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'store fit — トレンド適合 | DEEPINGSOURCE',
  description: '新商品がこの店に合うか — 視線・手に取る・再来店から、陳列の初週に。saai care・insight・agent の3モードを横断する機能。',
  keywords: ['store fit', 'トレンド適合', '新商品 反応', 'gaze to pick', '匿名化 空間AI', 'DeepingSource'],
  alternates: {
    canonical: '/jp/products/store-fit',
    languages: { en: '/products/store-fit', ko: '/ko/products/store-fit', ja: '/jp/products/store-fit' },
  },
  openGraph: {
    ...OG_BASE,
    title: 'store fit — トレンド適合 | DEEPINGSOURCE',
    description: '売れる商品かどうか、陳列の初週にわかります。',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function Page() {
  return <FunctionToolView tool="fit" locale="jp" />;
}
