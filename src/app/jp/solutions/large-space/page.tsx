import type { Metadata } from 'next';
import LargeSpaceView from '@/components/corporate/views/LargeSpaceView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: '大型空間ソリューション | DEEPINGSOURCE',
  description:
    'ハイパーマーケット、モール、コンベンションのような広い空間も、ひと目で。混雑管理、動線分析、異常検知を MTMC 空間AIで統合運営します。',
  alternates: {
    canonical: '/jp/solutions/large-space',
    languages: {
      en: '/solutions/large-space',
      ko: '/ko/solutions/large-space',
      ja: '/jp/solutions/large-space',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ja_JP',
    title: '大型空間ソリューション | DEEPINGSOURCE',
    description: '広い空間もひと目で。混雑·動線·異常を統合管理する大型空間ソリューション。',
    url: '/jp/solutions/large-space',
  },
};

export default function Page() {
  return <LargeSpaceView locale="jp" />;
}
