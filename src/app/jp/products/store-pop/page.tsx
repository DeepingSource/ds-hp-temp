import type { Metadata } from 'next';
import FunctionToolView from '@/components/corporate/views/FunctionToolView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'store pop — 販促物(POP) | DEEPINGSOURCE',
  description: '掲出した販促物の露出・注目・転換を測り、文言・位置・交換時期まで提案します。saai care・insight・agent の3モードを横断する機能。',
  keywords: ['store pop', 'POP 効果分析', '販促物', 'サイネージ 注目', '匿名化 空間AI', 'DeepingSource'],
  alternates: {
    canonical: '/jp/products/store-pop',
    languages: { en: '/products/store-pop', ko: '/ko/products/store-pop', ja: '/jp/products/store-pop' },
  },
  openGraph: {
    ...OG_BASE,
    title: 'store pop — 販促物(POP) | DEEPINGSOURCE',
    description: '貼ったPOP、本当に見られていますか? 露出・注目・転換を数字に。',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function Page() {
  return <FunctionToolView tool="pop" locale="jp" />;
}
