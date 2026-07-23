import type { Metadata } from 'next';
import DiagnosisView from '@/components/corporate/views/DiagnosisView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: '課題診断 — いくつかの質問で最適なソリューションを見つける | DEEPINGSOURCE',
  description: '業種と今抱えている課題を教えていただければ、該当するSAAIソリューション・製品・実際の結果をすぐにお見せします。',
  alternates: {
    canonical: '/jp/solutions/diagnosis',
    languages: {
      en: '/solutions/diagnosis',
      ko: '/ko/solutions/diagnosis',
      ja: '/jp/solutions/diagnosis',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ja_JP',
    title: '課題診断 — いくつかの質問で最適なソリューションを見つける | DEEPINGSOURCE',
    description: '業種と課題を教えていただければ、該当するソリューションをすぐにお見せします。',
    url: '/jp/solutions/diagnosis',
  },
};

export default function Page() {
  return <DiagnosisView locale="jp" />;
}
