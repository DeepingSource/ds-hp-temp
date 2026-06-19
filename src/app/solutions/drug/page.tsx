import type { Metadata } from 'next';
import DrugView from '@/components/corporate/views/DrugView';

export const metadata: Metadata = {
  title: 'Drugstore Solutions | Deeping Source',
  description:
    'Display consistency, out-of-stock prevention, and customer flow. A drugstore solution that helps every format run like one store.',
  alternates: {
    canonical: '/solutions/drug',
    languages: {
      en: '/solutions/drug',
      ko: '/ko/solutions/drug',
      ja: '/jp/solutions/drug',
    },
  },
  openGraph: {
    title: 'Drugstore Solutions | Deeping Source',
    description: 'Display, out-of-stock, and flow, by the same standard. Drugstores run like one store, whatever the format.',
    url: '/solutions/drug',
  },
};

export default function Page() {
  return <DrugView locale="en" />;
}
