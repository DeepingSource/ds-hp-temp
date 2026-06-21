import type { Metadata } from 'next';
import LargeSpaceView from '@/components/corporate/views/LargeSpaceView';

export const metadata: Metadata = {
  title: '大型空間ソリューション | DeepingSource',
  description:
    'ハイパーマーケット、モール、コンベンションのような広い空間も、ひとつの店舗のように。混雑管理、動線分析、異常検知を MTMC 空間AIで統合運営します。',
  alternates: {
    canonical: '/jp/solutions/large-space',
    languages: {
      en: '/solutions/large-space',
      ko: '/ko/solutions/large-space',
      ja: '/jp/solutions/large-space',
    },
  },
  openGraph: {
    title: '大型空間ソリューション | DeepingSource',
    description: 'Every space, like one. 広い空間もひとつの店舗のように運営できるよう支援する大型空間ソリューション。',
    url: '/jp/solutions/large-space',
  },
};

export default function Page() {
  return <LargeSpaceView locale="jp" />;
}
