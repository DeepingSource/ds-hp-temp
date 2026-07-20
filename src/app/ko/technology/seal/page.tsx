import type { Metadata } from 'next';
import SealView from '@/components/corporate/views/SealView';

export const metadata: Metadata = {
  title: 'SEAL — 데이터는 살리는 영상 비식별화 | DEEPINGSOURCE',
  description:
    '영상 속 얼굴과 번호판을 지우면서 AI에 필요한 특징은 그대로 남기는 영상 비식별화 솔루션 SEAL. 비식별화 전후 비교, 비전 태스크 입증, 블러·마스크와의 차이, 내장 SDK까지.',
  alternates: {
    canonical: '/ko/technology/seal',
    languages: {
      'x-default': '/technology/seal',
      en: '/technology/seal',
      ko: '/ko/technology/seal',
      ja: '/jp/technology/seal',
    },
  },
  openGraph: {
    title: 'SEAL — 데이터는 살리는 영상 비식별화 | DEEPINGSOURCE',
    description: '얼굴·번호판은 지우고 AI 학습에 필요한 데이터는 남기는 영상 비식별화 — 내장형 SDK로 제공.',
    url: '/ko/technology/seal',
    images: [{ url: '/images/og/seal.png', width: 2500, height: 1313, alt: 'SEAL — 데이터는 살리는 영상 비식별화' }],
  },
};

// Korean SEAL SDK — /ko/technology/seal (PLAN_v1.1 D6 path-prefix i18n)
export default function KoSealPage() {
  return <SealView locale="ko" />;
}
