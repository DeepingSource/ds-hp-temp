import type { Metadata } from 'next';
import ProductsView from '@/components/corporate/views/ProductsView';

export const metadata: Metadata = {
  title: 'Products | Deeping Source — Every store, like one.',
  description:
    'Store Insight · Store Agent · Store Care · SAAI. From enterprise spatial analytics to peace-of-mind tools for owners and B2C content. The Deeping Source product line that runs every store like one.',
  keywords: ['Deeping Source', 'Products', 'Store Insight', 'Store Agent', 'Store Care', 'SAAI', 'store analytics', 'spatial intelligence'],
  alternates: {
    canonical: '/products',
    languages: {
      en: '/products',
      ko: '/ko/products',
      ja: '/jp/products',
    },
  },
  openGraph: {
    title: 'Products | Deeping Source',
    description: 'Every store, like one. From enterprise analytics to owner peace-of-mind and B2C content.',
    type: 'website',
  },
};

export default function Page() {
  return <ProductsView locale="en" />;
}
