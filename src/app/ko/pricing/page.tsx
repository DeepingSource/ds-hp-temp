import type { Metadata } from 'next';
import PricingClientView from '@/components/pricing/PricingClientView';

export const metadata: Metadata = {
  title: '요금 안내 | DeepingSource',
  description:
    'Store Care · Store Insight · Store Agent 요금을 한눈에 비교하세요. 매장 규모와 필요에 맞는 플랜을 선택하세요.',
  alternates: {
    canonical: '/ko/pricing',
    languages: {
      en: '/pricing',
      ko: '/ko/pricing',
      ja: '/jp/pricing',
    },
  },
  openGraph: {
    title: '요금 안내 | DeepingSource',
    description: 'Store Care · Store Insight · Store Agent 요금을 한눈에 비교하세요.',
    url: '/ko/pricing',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: '요금 안내 | DeepingSource' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '요금 안내 | DeepingSource',
    description: 'Store Care · Store Insight · Store Agent 요금을 한눈에 비교하세요.',
  },
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-36 lg:pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">
            Pricing
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            어떤 목표를 달성하고 싶으신가요?
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            원하는 성과에 맞는 제품을 선택하고, 투명하고 합리적인 요금을 확인하세요.
          </p>
        </div>
      </section>

      <PricingClientView locale="ko" />
    </>
  );
}
