import type { Metadata } from 'next';
import PricingClientView from '@/components/pricing/PricingClientView';
import siteContent from '@/data/generated/site-content.json';

const hero = siteContent.pricing.en;

export const metadata: Metadata = {
  title: 'Pricing | DEEPINGSOURCE',
  description:
    'A pricing guide and quote that fit your store size — store care · store insight · store agent, configured to your goal.',
  alternates: {
    canonical: '/pricing',
    languages: {
      en: '/pricing',
      ko: '/ko/pricing',
      ja: '/jp/pricing',
    },
  },
  openGraph: {
    locale: 'en_US',
    title: 'Pricing | DEEPINGSOURCE',
    description: 'A pricing guide and quote that fit your store size.',
    url: '/pricing',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Pricing | DeepingSource' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | DEEPINGSOURCE',
    description: 'A pricing guide and quote that fit your store size.',
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

      <PricingClientView locale="en" />
    </>
  );
}
