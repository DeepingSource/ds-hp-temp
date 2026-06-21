import type { Metadata } from 'next';
import DrugView from '@/components/corporate/views/DrugView';

export const metadata: Metadata = {
  title: 'ドラッグストアソリューション | DeepingSource',
  description:
    '陳列の一貫性、欠品の防止、顧客の動線まで。業種が違ってもひとつの店舗のように運営できるよう支援する、ドラッグストア向け運営ソリューションです。',
  alternates: {
    canonical: '/jp/solutions/drug',
    languages: {
      en: '/solutions/drug',
      ko: '/ko/solutions/drug',
      ja: '/jp/solutions/drug',
    },
  },
  openGraph: {
    title: 'ドラッグストアソリューション | DeepingSource',
    description: '陳列·欠品·動線を同じ基準で。業種が違ってもひとつの店舗のように運営されるドラッグストア。',
    url: '/jp/solutions/drug',
  },
};

export default function Page() {
  return <DrugView locale="jp" />;
}
