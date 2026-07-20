import type { Metadata } from 'next';
import DrugView from '@/components/corporate/views/DrugView';

export const metadata: Metadata = {
  title: 'Drugstore Solutions | DEEPINGSOURCE',
  description:
    'Display consistency, out-of-stock prevention, and customer flow. A drugstore solution that helps every format run like one store.',
  alternates: {
    canonical: '/solutions/drug-store',
    languages: {
      en: '/solutions/drug-store',
      ko: '/ko/solutions/drug-store',
      ja: '/jp/solutions/drug-store',
    },
  },
  openGraph: {
    title: 'Drugstore Solutions | DEEPINGSOURCE',
    description: 'Display, out-of-stock, and flow, by the same standard. Drugstores run like one store, whatever the format.',
    url: '/solutions/drug-store',
  },
};

export default function Page() {
  return <DrugView locale="en" />;
}
