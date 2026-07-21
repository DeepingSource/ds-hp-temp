import type { Metadata } from 'next';
import SpatialAiView from '@/components/corporate/views/SpatialAiView';

export const metadata: Metadata = {
  title: 'Spatial AI — MTMC 다중 카메라 분석 | DEEPINGSOURCE',
  description:
    'Multi-Target Multi-Camera(MTMC)는 여러 카메라의 관측을 하나의 공간 좌표계로 통합하여 다중 객체의 연속 동선을 분석하는 기술입니다. 정의, 좌표화, 좌표계 단계, 결과를 정리합니다.',
  alternates: {
    canonical: '/ko/technology/spatial-ai',
    languages: {
      'x-default': '/technology/spatial-ai',
      en: '/technology/spatial-ai',
      ko: '/ko/technology/spatial-ai',
      ja: '/jp/technology/spatial-ai',
    },
  },
  openGraph: {
    locale: 'ko_KR',
    title: 'Spatial AI — MTMC 다중 카메라 분석 | DEEPINGSOURCE',
    description: '여러 카메라를 하나의 공간 좌표계로 통합하는 MTMC 기술 개요.',
    url: '/ko/technology/spatial-ai',
  },
};

// Korean Spatial AI — /ko/technology/spatial-ai (PLAN_v1.1 D6 path-prefix i18n)
export default function KoSpatialAiPage() {
  return <SpatialAiView locale="ko" />;
}
