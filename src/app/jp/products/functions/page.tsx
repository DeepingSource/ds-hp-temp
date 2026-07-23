import type { Metadata } from 'next';
import FunctionsView from '@/components/corporate/views/FunctionsView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: '機能ライブラリ — 機能は3つのモードを横断します | DEEPINGSOURCE',
  description:
    '4つの機能 — count・queue・pop・fit — を saai care・insight・agent の3モードがそれぞれどう使うか。機能は製品ではありません。',
  keywords: ['saai 機能', 'store count', 'store trail', '機能マトリクス', '匿名化空間AI', '来店計測', '待ち行列分析', '棚モニタリング', 'DeepingSource'],
  alternates: {
    canonical: '/jp/products/functions',
    languages: {
      en: '/products/functions',
      ko: '/ko/products/functions',
      ja: '/jp/products/functions',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: '機能ライブラリ — 機能は3つのモードを横断します | DEEPINGSOURCE',
    description: '一つの count が、care ではリアルタイム検知に、insight では推移分析に、agent では運営提案になります。',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function Page() {
  return <FunctionsView locale="jp" />;
}
