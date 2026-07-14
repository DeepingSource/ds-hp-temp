import type { Metadata } from 'next';
import TechnologyView from '@/components/corporate/views/TechnologyView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: 'テクノロジー — 匿名化空間AI | DEEPINGSOURCE',
  description: `個人情報に触れることなく空間を分析します。${COMPANY.patents}件の特許で保護されたディーピングソースの匿名化・SEAL・Spatial AI・ビジョンモデル技術をご紹介します。`,
  keywords: ['匿名化AI', 'Anonymizer', 'SEAL', 'Spatial AI', 'MTMC', 'Vision Models', 'プライバシーAI', 'GDPR AI', '空間データ分析', 'PII除去'],
  alternates: {
    canonical: '/jp/technology',
    languages: {
      'x-default': '/technology',
      en: '/technology',
      ko: '/ko/technology',
      ja: '/jp/technology',
    },
  },
  openGraph: {
    title: 'テクノロジー — 匿名化空間AI | DEEPINGSOURCE',
    description: `個人情報には一切触れません。データは失われません。${COMPANY.patents}件の特許に支えられたディーピングソースの技術。`,
    url: '/jp/technology',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'DeepingSource 匿名化空間AI技術' }],
  },
};

// Japanese technology — /jp/technology (PLAN_v1.1 D6 path-prefix i18n)
export default function JpTechnologyPage() {
  return <TechnologyView locale="jp" />;
}
