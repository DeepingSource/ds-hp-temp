import type { Metadata } from 'next';
import ModelsView from '@/components/corporate/views/ModelsView';

export const metadata: Metadata = {
  title: 'Vision Models — 비전 모델 카탈로그 | DeepingSource',
  description:
    '익명화·인식·공간·흐름·변화·생성 등 카테고리로 구성된 비전 모델 카탈로그. 각 모델의 역할과 적용 단계를 정리합니다.',
  alternates: {
    canonical: '/ko/technology/models',
    languages: {
      'x-default': '/technology/models',
      en: '/technology/models',
      ko: '/ko/technology/models',
      ja: '/jp/technology/models',
    },
  },
  openGraph: {
    title: 'Vision Models — 비전 모델 카탈로그 | DeepingSource',
    description: '익명화·인식·공간·흐름·변화·생성 카테고리의 비전 모델 카탈로그.',
    url: '/ko/technology/models',
  },
};

// Korean Vision Models — /ko/technology/models (PLAN_v1.1 D6 path-prefix i18n)
export default function KoModelsPage() {
  return <ModelsView locale="ko" />;
}
