import type { Metadata } from 'next';
import SolutionsView from '@/components/corporate/views/SolutionsView';

export const metadata: Metadata = {
  title: '業種別ソリューション — 現場の課題解決ガイド | DEEPINGSOURCE',
  description: 'コンビニの盗難防止、カフェの回転率改善、無人店舗の異常検知など、業種別の実際の課題を SAAI の匿名化空間AIがどう解決するのかご確認ください。',
  alternates: {
    canonical: '/jp/solutions',
    languages: {
      en: '/solutions',
      ko: '/ko/solutions',
      ja: '/jp/solutions',
    },
  },
  openGraph: {
    title: '業種別ソリューション — 現場の課題解決ガイド | DEEPINGSOURCE',
    description: '業種別の現場の課題を SAAI がどう解決するのか、具体的な事例でご確認ください。',
    url: '/jp/solutions',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: '業種別ソリューション — 現場の課題解決ガイド | DeepingSource' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '業種別ソリューション — 現場の課題解決ガイド | DEEPINGSOURCE',
    description: '業種別の現場の課題を SAAI がどう解決するのか、具体的な事例でご確認ください。',
  },
};

export default function Page() {
  return <SolutionsView locale="jp" />;
}
