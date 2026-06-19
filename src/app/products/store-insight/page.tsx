import type { Metadata } from 'next';
import StoreInsightView from '@/components/corporate/views/StoreInsightView';

export const metadata: Metadata = {
  title: 'Store Insight | Deeping Source — Spatial analytics that read your store',
  description:
    'Read your store with an analyst’s composure. Enterprise spatial analytics that cross-analyze flow, dwell, and conversion to pinpoint what moves revenue. POS only knows what sold; Store Insight knows what almost sold.',
  keywords: ['Store Insight', 'spatial analytics', 'store data', 'flow analysis', 'conversion', 'revenue analysis', 'Deeping Source'],
  alternates: {
    canonical: '/products/store-insight',
    languages: {
      en: '/products/store-insight',
      ko: '/ko/products/store-insight',
      ja: '/jp/products/store-insight',
    },
  },
  openGraph: {
    title: 'Store Insight | Deeping Source',
    description: 'Read your store with an analyst’s composure. The cause of revenue changes, in data.',
    type: 'website',
  },
};

export default function Page() {
  return <StoreInsightView locale="en" />;
}
