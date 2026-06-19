import type { Metadata } from 'next';
import ModelsView from '@/components/corporate/views/ModelsView';

export const metadata: Metadata = {
  title: 'Vision Models — ビジョンモデルカタログ | DeepingSource',
  description:
    '匿名化・認識・空間・フロー・変化・生成などのカテゴリで構成されたビジョンモデルカタログ。各モデルの役割と適用段階を整理します。',
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
    title: 'Vision Models — ビジョンモデルカタログ | DeepingSource',
    description: '匿名化・認識・空間・フロー・変化・生成カテゴリのビジョンモデルカタログ。',
    url: '/jp/technology/models',
  },
};

// Japanese Vision Models — /jp/technology/models (PLAN_v1.1 D6 path-prefix i18n)
export default function JpModelsPage() {
  return <ModelsView locale="jp" />;
}
