import type { Metadata } from 'next';
import SpatialAiView from '@/components/corporate/views/SpatialAiView';

export const metadata: Metadata = {
  title: 'Spatial AI — MTMC Multi-Camera Analytics | DeepingSource',
  description:
    'Multi-Target Multi-Camera (MTMC) unifies observations from multiple cameras into a single spatial coordinate system to analyze the continuous movement of multiple objects. Definition, calibration, coordinate pipeline, and output.',
  alternates: {
    canonical: '/technology/spatial-ai',
    languages: {
      'x-default': '/technology/spatial-ai',
      en: '/technology/spatial-ai',
      ko: '/ko/technology/spatial-ai',
      ja: '/jp/technology/spatial-ai',
    },
  },
  openGraph: {
    title: 'Spatial AI — MTMC Multi-Camera Analytics | DeepingSource',
    description: 'A technical overview of MTMC, which unifies multiple cameras into a single spatial coordinate system.',
    url: '/technology/spatial-ai',
  },
};

export default function SpatialAiPage() {
  return <SpatialAiView locale="en" />;
}
