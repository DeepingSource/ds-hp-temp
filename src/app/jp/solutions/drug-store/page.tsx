import type { Metadata } from 'next';
import DrugView from '@/components/corporate/views/DrugView';

export const metadata: Metadata = {
  title: 'ドラッグストアソリューション | DEEPINGSOURCE',
  description:
    '陳列の一貫性、欠品の防止、顧客の動線まで。カテゴリーの多いドラッグストアの運営を同じ基準で整える、ドラッグストア向けソリューションです。',
  alternates: {
    canonical: '/jp/solutions/drug-store',
    languages: {
      en: '/solutions/drug-store',
      ko: '/ko/solutions/drug-store',
      ja: '/jp/solutions/drug-store',
    },
  },
  openGraph: {
    locale: 'ja_JP',
    title: 'ドラッグストアソリューション | DEEPINGSOURCE',
    description: '陳列·欠品·動線を同じ基準で。カテゴリーが多くても乱れないドラッグストア。',
    url: '/jp/solutions/drug-store',
  },
};

export default function Page() {
  return <DrugView locale="jp" />;
}
