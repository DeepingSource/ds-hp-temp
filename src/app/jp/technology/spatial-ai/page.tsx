import type { Metadata } from 'next';
import SpatialAiView from '@/components/corporate/views/SpatialAiView';

export const metadata: Metadata = {
  title: 'Spatial AI — MTMC 多カメラ分析 | DEEPINGSOURCE',
  description:
    'Multi-Target Multi-Camera（MTMC）は、複数カメラの観測を一つの空間座標系に統合し、複数オブジェクトの連続した動線を分析する技術です。定義、座標化、座標系の段階、結果を整理します。',
  alternates: {
    canonical: '/jp/technology/spatial-ai',
    languages: {
      'x-default': '/technology/spatial-ai',
      en: '/technology/spatial-ai',
      ko: '/ko/technology/spatial-ai',
      ja: '/jp/technology/spatial-ai',
    },
  },
  openGraph: {
    locale: 'ja_JP',
    title: 'Spatial AI — MTMC 多カメラ分析 | DEEPINGSOURCE',
    description: '複数のカメラを一つの空間座標系に統合するMTMC技術の概要。',
    url: '/jp/technology/spatial-ai',
  },
};

// Japanese Spatial AI — /jp/technology/spatial-ai (PLAN_v1.1 D6 path-prefix i18n)
export default function JpSpatialAiPage() {
  return <SpatialAiView locale="jp" />;
}
