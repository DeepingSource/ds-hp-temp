import type { Metadata } from 'next';
import ModelsView from '@/components/corporate/views/ModelsView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Vision Models — 비전 모델 카탈로그 | DEEPINGSOURCE',
  description:
    '익명화·인식·공간·흐름·변화·생성 등 카테고리로 구성된 비전 모델 카탈로그. 각 모델의 역할과 적용 단계를 정리합니다.',
  // 임시 숨김(② D1) — 데모 영상 확보 후 복귀. 색인·네비만 차단, 라우트는 보존.
  robots: { index: false, follow: false },
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
    ...OG_BASE,
    locale: 'ko_KR',
    title: 'Vision Models — 비전 모델 카탈로그 | DEEPINGSOURCE',
    description: '익명화·인식·공간·흐름·변화·생성 카테고리의 비전 모델 카탈로그.',
    url: '/ko/technology/models',
  },
};

// Korean Vision Models — /ko/technology/models (PLAN_v1.1 D6 path-prefix i18n)
export default function KoModelsPage() {
  return <ModelsView locale="ko" />;
}
