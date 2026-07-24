import type { Metadata } from 'next';
import ModelsView from '@/components/corporate/views/ModelsView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Vision Models — Vision Model Catalog | DEEPINGSOURCE',
  description:
    'A vision model catalog organized into categories including anonymization, recognition, space, flow, change, and generation. The role and applicable stage of each model.',
  // 임시 숨김(② D1) — 데모 영상 확보 후 복귀. 색인·네비만 차단, 라우트는 보존.
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/technology/models',
    languages: {
      'x-default': '/technology/models',
      en: '/technology/models',
      ko: '/ko/technology/models',
      ja: '/jp/technology/models',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'en_US',
    title: 'Vision Models — Vision Model Catalog | DEEPINGSOURCE',
    description: 'A vision model catalog across the anonymization, recognition, space, flow, change, and generation categories.',
    url: '/technology/models',
  },
};

export default function ModelsPage() {
  return <ModelsView locale="en" />;
}
