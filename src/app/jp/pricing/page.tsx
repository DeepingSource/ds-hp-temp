import type { Metadata } from 'next';
import PricingClientView from '@/components/pricing/PricingClientView';

export const metadata: Metadata = {
  title: '料金のご案内 | DeepingSource',
  description:
    'store care · store insight · store agent の料金を一目で比較できます。店舗規模やニーズに合ったプランをお選びください。',
  alternates: {
    canonical: '/jp/pricing',
    languages: {
      en: '/pricing',
      ko: '/ko/pricing',
      ja: '/jp/pricing',
    },
  },
  openGraph: {
    title: '料金のご案内 | DeepingSource',
    description: 'store care · store insight · store agent の料金を一目で比較できます。',
    url: '/jp/pricing',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: '料金のご案内 | DeepingSource' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '料金のご案内 | DeepingSource',
    description: 'store care · store insight · store agent の料金を一目で比較できます。',
  },
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-36 lg:pb-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">
            Pricing
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            どのような目標を達成したいですか？
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            ご希望の成果に合った製品をお選びいただき、透明で合理的な料金をご確認ください。
          </p>
        </div>
      </section>

      <PricingClientView locale="jp" />
    </>
  );
}
