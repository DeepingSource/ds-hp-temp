import type { Metadata } from 'next';
import SaaiView from '@/components/corporate/views/SaaiView';

export const metadata: Metadata = {
  title: 'saai.store | DeepingSource — Camera-less owner suite',
  description:
    'A camera-less suite for store owners — from ordering to POP, in one flow. saai.store is the owner-facing B2C product within SAAI. (POP maker is one tool in the suite.)',
  keywords: ['saai.store', 'SAAI', 'store owner suite', 'POP maker', 'content archive', 'seasonal content'],
  alternates: {
    canonical: '/products/saai',
    languages: {
      en: '/products/saai',
      ko: '/ko/products/saai',
      ja: '/jp/products/saai',
    },
  },
  openGraph: {
    title: 'saai.store | DeepingSource',
    description: 'Camera-less suite for store owners — from ordering to POP, in one flow.',
    type: 'website',
  },
};

export default function Page() {
  return <SaaiView locale="en" />;
}
