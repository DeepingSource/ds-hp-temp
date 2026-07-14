import type { Metadata } from 'next';
import ProductsView from '@/components/corporate/views/ProductsView';

export const metadata: Metadata = {
  title: 'Products | DEEPINGSOURCE — Every store, like one.',
  description:
    'store insight · store agent · store care · SAAI. From enterprise spatial analytics to peace-of-mind tools for owners and B2C content. The DeepingSource product line that runs every store like one.',
  keywords: ['DeepingSource', 'Products', 'store insight', 'store agent', 'store care', 'SAAI', 'store analytics', 'spatial intelligence'],
  alternates: {
    canonical: '/products',
    languages: {
      en: '/products',
      ko: '/ko/products',
      ja: '/jp/products',
    },
  },
  openGraph: {
    title: 'Products | DEEPINGSOURCE',
    description: 'Every store, like one. From enterprise analytics to owner peace-of-mind and B2C content.',
    type: 'website',
  },
};

export default function Page() {
  return <ProductsView locale="en" />;
}
