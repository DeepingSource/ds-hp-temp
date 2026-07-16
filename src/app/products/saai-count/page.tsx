import type { Metadata } from 'next';
import StoreCountView from '@/components/corporate/views/StoreCountView';

export const metadata: Metadata = {
  title: 'store count | DEEPINGSOURCE',
  description:
    'Count the footfall passing your store, the customers who walk in, and your inflow rate — from a single camera, every day, with no staff. Trade-area analytics from store to site, privacy by design.',
  keywords: ['store count', 'footfall counting', 'trade area analysis', 'people counting', 'inflow rate', 'retail analytics', 'anonymized counting', 'DeepingSource'],
  alternates: {
    canonical: '/products/saai-count',
    languages: {
      en: '/products/saai-count',
      ko: '/ko/products/saai-count',
      ja: '/jp/products/saai-count',
    },
  },
  openGraph: {
    title: 'store count | DEEPINGSOURCE',
    description: 'Trade-area analysis you knew you needed, from one camera — every day, no staff.',
    type: 'website',
  },
};

export default function Page() {
  return <StoreCountView locale="en" />;
}
