import type { Metadata } from 'next';
import CaseStudiesView from '@/components/corporate/views/CaseStudiesView';

export const metadata: Metadata = {
  title: 'ケーススタディ | DeepingSource',
  description:
    'コンビニ53店舗の実測から本社100店舗への展開、ドラッグストアの欠品標準化、カフェの清潔KPI同期、大型空間の匿名化まで。Golden Caseの5段階で読む DeepingSource 導入事例。',
  alternates: {
    canonical: '/jp/resources/case-studies',
    languages: {
      en: '/resources/case-studies',
      ko: '/ko/resources/case-studies',
      ja: '/jp/resources/case-studies',
    },
  },
  openGraph: {
    title: 'ケーススタディ | DeepingSource',
    description: 'Golden Caseの5段階で読む導入事例 — 発見・検証・翻訳・展開・再測定。',
    url: '/jp/resources/case-studies',
  },
};

export default function Page() {
  return <CaseStudiesView locale="jp" />;
}
