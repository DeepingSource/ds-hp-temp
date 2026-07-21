import type { Metadata } from 'next';
import ProductsView from '@/components/corporate/views/ProductsView';

export const metadata: Metadata = {
  title: 'Products | DEEPINGSOURCE — Perfect every space.',
  description:
    'Anonymized Spatial AI — saai insight · saai agent · saai care · SAAI. From enterprise spatial analytics to owner peace-of-mind and B2C content, the DeepingSource product line that runs every store like one.',
  keywords: ['DeepingSource', 'Products', 'saai insight', 'saai agent', 'saai care', 'SAAI', 'store analytics', 'spatial intelligence', 'Anonymized Spatial AI'],
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
    description: 'Perfect every space. From enterprise analytics to owner peace-of-mind and B2C content.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <ProductsView locale="en" />;
}
