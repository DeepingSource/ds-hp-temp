import type { Metadata } from 'next';
import StoreInsightView from '@/components/corporate/views/StoreInsightView';

export const metadata: Metadata = {
  title: 'store insight | DeepingSource — Spatial analytics that read your store',
  description:
    'Read your store with an analyst’s composure. Enterprise spatial analytics that cross-analyze flow, dwell, and conversion to pinpoint what moves revenue. POS only knows what sold; store insight knows what almost sold.',
  keywords: ['store insight', 'spatial analytics', 'store data', 'flow analysis', 'conversion', 'revenue analysis', 'DeepingSource'],
  alternates: {
    canonical: '/products/store-insight',
    languages: {
      en: '/products/store-insight',
      ko: '/ko/products/store-insight',
      ja: '/jp/products/store-insight',
    },
  },
  openGraph: {
    title: 'store insight | DeepingSource',
    description: 'Read your store with an analyst’s composure. The cause of revenue changes, in data.',
    type: 'website',
  },
};

export default function Page() {
  return <StoreInsightView locale="en" />;
}
