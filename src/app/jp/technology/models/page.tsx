import type { Metadata } from 'next';
import ModelsView from '@/components/corporate/views/ModelsView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Vision Models — ビジョンモデルカタログ | DEEPINGSOURCE',
  description:
    '匿名化・認識・空間・フロー・変化・生成などのカテゴリで構成されたビジョンモデルカタログ。各モデルの役割と適用段階を整理します。',
  // 임시 숨김(② D1) — 데모 영상 확보 후 복귀. 색인·네비만 차단, 라우트는 보존.
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/jp/technology/models',
    languages: {
      'x-default': '/technology/models',
      en: '/technology/models',
      ko: '/ko/technology/models',
      ja: '/jp/technology/models',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ja_JP',
    title: 'Vision Models — ビジョンモデルカタログ | DEEPINGSOURCE',
    description: '匿名化・認識・空間・フロー・変化・生成カテゴリのビジョンモデルカタログ。',
    url: '/jp/technology/models',
  },
};

// Japanese Vision Models — /jp/technology/models (PLAN_v1.1 D6 path-prefix i18n)
export default function JpModelsPage() {
  return <ModelsView locale="jp" />;
}
