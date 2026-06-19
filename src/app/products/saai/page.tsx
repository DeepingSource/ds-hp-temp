import type { Metadata } from 'next';
import SaaiView from '@/components/corporate/views/SaaiView';

export const metadata: Metadata = {
  title: 'SAAI | Deeping Source — Content for your store',
  description:
    'From POP to seasonal campaigns, create the content that makes a store stand out — effortlessly. SAAI is a B2C content service operated on saai.store.',
  keywords: ['SAAI', 'store content', 'POP maker', 'content archive', 'seasonal content', 'B2C', 'saai.store'],
  alternates: {
    canonical: '/products/saai',
    languages: {
      en: '/products/saai',
      ko: '/ko/products/saai',
      ja: '/jp/products/saai',
    },
  },
  openGraph: {
    title: 'SAAI | Deeping Source',
    description: 'Content for your store. From POP to seasonal campaigns, effortlessly.',
    type: 'website',
  },
};

export default function Page() {
  return <SaaiView locale="en" />;
}
