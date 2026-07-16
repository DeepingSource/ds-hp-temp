import type { Metadata } from 'next';
import StoreInsightView from '@/components/corporate/views/StoreInsightView';

export const metadata: Metadata = {
  title: 'saai insight — store insight | DEEPINGSOURCE',
  description:
    'Read your store with an analyst’s composure. Enterprise spatial analytics that cross-analyze flow, dwell, and conversion to pinpoint what moves revenue. POS only knows what sold; store insight knows what almost sold.',
  keywords: ['saai insight', 'store insight', 'spatial analytics', 'store data', 'flow analysis', 'conversion', 'revenue analysis', 'DeepingSource'],
  alternates: {
    canonical: '/products/saai-insight',
    languages: {
      en: '/products/saai-insight',
      ko: '/ko/products/saai-insight',
      ja: '/jp/products/saai-insight',
    },
  },
  openGraph: {
    title: 'saai insight — store insight | DEEPINGSOURCE',
    description: 'Read your store with an analyst’s composure. The cause of revenue changes, in data.',
    type: 'website',
  },
};

export default function Page() {
  return <StoreInsightView locale="en" />;
}
