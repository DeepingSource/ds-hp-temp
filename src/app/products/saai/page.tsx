import type { Metadata } from 'next';
import SaaiView from '@/components/corporate/views/SaaiView';

export const metadata: Metadata = {
  title: 'AI POP | DeepingSource — Content for your store',
  description:
    'From POP to seasonal campaigns, create the content that makes a store stand out — effortlessly. AI POP is the content product within SAAI, operated on saai.store.',
  keywords: ['AI POP', 'SAAI', 'store content', 'POP maker', 'content archive', 'seasonal content', 'saai.store'],
  alternates: {
    canonical: '/products/saai',
    languages: {
      en: '/products/saai',
      ko: '/ko/products/saai',
      ja: '/jp/products/saai',
    },
  },
  openGraph: {
    title: 'AI POP | DeepingSource',
    description: 'Content for your store. From POP to seasonal campaigns, effortlessly.',
    type: 'website',
  },
};

export default function Page() {
  return <SaaiView locale="en" />;
}
