import type { Metadata } from 'next';
import AboutView from '@/components/corporate/views/AboutView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: '会社情報 — DEEPINGSOURCE Inc. | すべての店舗を、ひとつの店舗のように。',
  description: `ディーピングソースは、匿名化AI技術で世界中のすべてのオフライン空間を安全に理解し、最適化するAI企業です。${COMPANY.foundingYear}年設立、特許${COMPANY.patents}件。`,
  keywords: ['DeepingSource', '会社情報', 'About', 'AI企業', 'Spatial Agentic AI', '匿名化AI'],
  alternates: {
    canonical: 'https://www.deepingsource.io/jp/company/about',
    languages: {
      en: 'https://www.deepingsource.io/company/about',
      ko: 'https://www.deepingsource.io/ko/company/about',
      ja: 'https://www.deepingsource.io/jp/company/about',
    },
  },
  openGraph: {
    title: '会社情報 — DEEPINGSOURCE Inc.',
    description: `ディーピングソースは、匿名化AI技術で世界中のすべてのオフライン空間を安全に理解し、最適化するAI企業です。特許${COMPANY.patents}件。`,
    url: 'https://www.deepingsource.io/jp/company/about',
  },
};

export default function JpCompanyAboutPage() {
  return <AboutView locale="jp" />;
}
