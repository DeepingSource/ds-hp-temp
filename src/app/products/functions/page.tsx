import type { Metadata } from 'next';
import FunctionsView from '@/components/corporate/views/FunctionsView';

export const metadata: Metadata = {
  title: 'Function library — functions cross all three modes | DEEPINGSOURCE',
  description:
    'Four capabilities — count, queue, pop, fit — and how saai care, saai insight and saai agent each put them to work. A function is not a product.',
  keywords: ['saai functions', 'store count', 'store queue', 'retail capability matrix', 'anonymized spatial AI', 'footfall', 'queue analytics', 'POP effectiveness', 'DeepingSource'],
  alternates: {
    canonical: '/products/functions',
    languages: {
      en: '/products/functions',
      ko: '/ko/products/functions',
      ja: '/jp/products/functions',
    },
  },
  openGraph: {
    title: 'Function library — functions cross all three modes | DEEPINGSOURCE',
    description: 'One count becomes live detection in care, trend analysis in insight, and an operating proposal in agent.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <FunctionsView locale="en" />;
}
