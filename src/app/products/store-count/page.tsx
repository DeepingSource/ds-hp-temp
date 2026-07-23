import type { Metadata } from 'next';
import StoreCountView from '@/components/corporate/views/StoreCountView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'store count — footfall & capture rate | DEEPINGSOURCE',
  description:
    'Count the footfall passing your store, the customers who walk in, and your capture rate — from a single camera, every day, with no staff. Trade-area analytics from store to site, privacy by design.',
  keywords: ['saai count', 'store count', 'footfall counting', 'trade area analysis', 'people counting', 'capture rate', 'inflow rate', 'retail analytics', 'anonymized counting', 'DeepingSource'],
  alternates: {
    canonical: '/products/store-count',
    languages: {
      en: '/products/store-count',
      ko: '/ko/products/store-count',
      ja: '/jp/products/store-count',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: 'store count — footfall & capture rate | DEEPINGSOURCE',
    description: 'Trade-area analysis you knew you needed, from one camera — every day, no staff.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <StoreCountView locale="en" />;
}
