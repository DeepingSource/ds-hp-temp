import type { Metadata } from 'next';
import RetailView from '@/components/corporate/views/RetailView';

export const metadata: Metadata = {
  title: 'Retail & Convenience Solutions | DeepingSource',
  description:
    'Out-of-stock, store-to-store inconsistency, and anomalies. A retail, convenience, and drugstore solution that helps every format run like one store.',
  alternates: {
    canonical: '/solutions/retail',
    languages: {
      en: '/solutions/retail',
      ko: '/ko/solutions/retail',
      ja: '/jp/solutions/retail',
    },
  },
  openGraph: {
    title: 'Retail & Convenience Solutions | DeepingSource',
    description:
      'Out-of-stock, inconsistency, and anomaly detection — the core problems of store operations, by the same standard. Different formats, run as one.',
    url: '/solutions/retail',
  },
};

export default function Page() {
  return <RetailView locale="en" />;
}
