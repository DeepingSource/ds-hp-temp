import type { Metadata } from 'next';
import RetailView from '@/components/corporate/views/RetailView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'リテール·コンビニソリューション | DEEPINGSOURCE',
  description:
    '欠品、店舗間の運営のばらつき、異常まで。店舗運営の核心的な課題を同じ基準で見守る、リテール·コンビニ向けソリューションです。',
  alternates: {
    canonical: '/jp/solutions/retail',
    languages: {
      en: '/solutions/retail',
      ko: '/ko/solutions/retail',
      ja: '/jp/solutions/retail',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ja_JP',
    title: 'リテール·コンビニソリューション | DEEPINGSOURCE',
    description:
      '欠品、運営のばらつき、異常検知まで。店舗運営の核心的な課題を一度に。欠品も異常も見逃さず。',
    url: '/jp/solutions/retail',
  },
};

export default function Page() {
  return <RetailView locale="jp" />;
}
