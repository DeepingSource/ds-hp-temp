import type { Metadata } from 'next';
import PricingClientView from '@/components/pricing/PricingClientView';

export const metadata: Metadata = {
  title: 'Pricing | DeepingSource',
  description:
    'Compare Store Care · Store Insight · Store Agent pricing at a glance. Choose the plan that fits your store size and needs.',
  alternates: {
    canonical: '/pricing',
    languages: {
      en: '/pricing',
      ko: '/ko/pricing',
      ja: '/jp/pricing',
    },
  },
  openGraph: {
    title: 'Pricing | DeepingSource',
    description: 'Compare Store Care · Store Insight · Store Agent pricing at a glance.',
    url: '/pricing',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Pricing | DeepingSource' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | DeepingSource',
    description: 'Compare Store Care · Store Insight · Store Agent pricing at a glance.',
  },
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-36 lg:pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">
            Pricing
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            What goal do you want to achieve?
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Pick the product that matches the outcome you want, with transparent and fair pricing.
          </p>
        </div>
      </section>

      <PricingClientView locale="en" />
    </>
  );
}
