import type { Metadata } from 'next';
import RetailView from '@/components/corporate/views/RetailView';

export const metadata: Metadata = {
  title: 'リテール·コンビニソリューション | DeepingSource',
  description:
    '欠品、店舗間の運営のばらつき、異常まで。業種が違ってもひとつの店舗のように運営できるよう支援する、リテール·コンビニ·ドラッグストア向けソリューションです。',
  alternates: {
    canonical: '/jp/solutions/retail',
    languages: {
      en: '/solutions/retail',
      ko: '/ko/solutions/retail',
      ja: '/jp/solutions/retail',
    },
  },
  openGraph: {
    title: 'リテール·コンビニソリューション | DeepingSource',
    description:
      '欠品、運営のばらつき、異常検知まで。店舗運営の核心的な課題を一度に。業種が違ってもひとつの店舗のように。',
    url: '/jp/solutions/retail',
  },
};

export default function Page() {
  return <RetailView locale="jp" />;
}
