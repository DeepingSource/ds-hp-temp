import type { Metadata } from 'next';
import PricingClientView from '@/components/pricing/PricingClientView';
import siteContent from '@/data/generated/site-content.json';

const hero = siteContent.pricing.ko;

export const metadata: Metadata = {
  title: '요금 안내 | DEEPINGSOURCE',
  description:
    'store care · store insight · store agent 요금을 한눈에 비교하세요. 매장 규모와 필요에 맞는 플랜을 선택하세요.',
  alternates: {
    canonical: '/ko/pricing',
    languages: {
      en: '/pricing',
      ko: '/ko/pricing',
      ja: '/jp/pricing',
    },
  },
  openGraph: {
    locale: 'ko_KR',
    title: '요금 안내 | DEEPINGSOURCE',
    description: 'store care · store insight · store agent 요금을 한눈에 비교하세요.',
    url: '/ko/pricing',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: '요금 안내 | DeepingSource' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '요금 안내 | DEEPINGSOURCE',
    description: 'store care · store insight · store agent 요금을 한눈에 비교하세요.',
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
            {hero.heroTitle}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {hero.heroSub}
          </p>
        </div>
      </section>

      <PricingClientView locale="ko" />
    </>
  );
}
