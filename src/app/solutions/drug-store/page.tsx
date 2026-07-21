import type { Metadata } from 'next';
import DrugView from '@/components/corporate/views/DrugView';

export const metadata: Metadata = {
  title: 'Drugstore Solutions | DEEPINGSOURCE',
  description:
    'Display consistency, out-of-stock prevention, and customer flow. A drugstore solution that keeps category-heavy operations in order under the same standard.',
  alternates: {
    canonical: '/solutions/drug-store',
    languages: {
      en: '/solutions/drug-store',
      ko: '/ko/solutions/drug-store',
      ja: '/jp/solutions/drug-store',
    },
  },
  openGraph: {
    locale: 'en_US',
    title: 'Drugstore Solutions | DEEPINGSOURCE',
    description: 'Display, out-of-stock, and flow, by the same standard. Displays that stay in order, whatever the category.',
    url: '/solutions/drug-store',
  },
};

export default function Page() {
  return <DrugView locale="en" />;
}
