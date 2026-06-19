import type { Metadata } from 'next';
import SealView from '@/components/corporate/views/SealView';

export const metadata: Metadata = {
  title: 'SEAL SDK — 비식별화 처리 통합 SDK | DeepingSource',
  description:
    'SEAL SDK는 영상 비식별화·인식·공간 분석 파이프라인을 애플리케이션에 통합하기 위한 개발 키트입니다. Secure, Embeddable, Adaptable, Lightweight 4가지 설계 원칙을 정리합니다.',
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
    title: 'SEAL SDK — 비식별화 처리 통합 SDK | DeepingSource',
    description: '비식별화 처리 파이프라인을 애플리케이션에 통합하기 위한 SDK.',
    url: '/ko/technology/seal',
  },
};

// Korean SEAL SDK — /ko/technology/seal (PLAN_v1.1 D6 path-prefix i18n)
export default function KoSealPage() {
  return <SealView locale="ko" />;
}
