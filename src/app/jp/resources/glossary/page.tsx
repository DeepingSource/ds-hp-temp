import type { Metadata } from 'next';
import GlossaryView from '@/components/corporate/views/GlossaryView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: '用語集 | DEEPINGSOURCE',
  description:
    '店舗ヒートマップ、匿名化CCTV、滞在時間、転換率など、プライバシーAIと空間分析の主要な用語を現場の言葉でやさしく説明します。',
  alternates: {
    canonical: '/jp/resources/glossary',
    languages: {
      en: '/resources/glossary',
      ko: '/ko/resources/glossary',
      ja: '/jp/resources/glossary',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ja_JP',
    title: '用語集 | DEEPINGSOURCE',
    description: 'プライバシーAIと空間分析の主要な用語をやさしく説明します。',
    url: '/jp/resources/glossary',
  },
};

export default function JpResourcesGlossaryPage() {
  return <GlossaryView locale="jp" />;
}
