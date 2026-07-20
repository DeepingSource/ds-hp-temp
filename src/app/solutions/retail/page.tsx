import type { Metadata } from 'next';
import RetailView from '@/components/corporate/views/RetailView';

export const metadata: Metadata = {
  title: 'Retail & Convenience Solutions | DEEPINGSOURCE',
  description:
    'Out-of-stock, store-to-store inconsistency, and anomalies. A retail, convenience, and drugstore solution that watches the core problems of store operations by the same standard.',
  alternates: {
    canonical: '/solutions/retail',
    languages: {
      en: '/solutions/retail',
      ko: '/ko/solutions/retail',
      ja: '/jp/solutions/retail',
    },
  },
  openGraph: {
    title: 'Retail & Convenience Solutions | DEEPINGSOURCE',
    description:
      'Out-of-stock, inconsistency, and anomaly detection — the core problems of store operations, by the same standard. Never miss what matters.',
    url: '/solutions/retail',
  },
};

export default function Page() {
  return <RetailView locale="en" />;
}
