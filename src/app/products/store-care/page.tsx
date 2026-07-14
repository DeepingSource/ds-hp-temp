import type { Metadata } from 'next';
import StoreCareView from '@/components/corporate/views/StoreCareView';

export const metadata: Metadata = {
  title: 'saai care — store care | DEEPINGSOURCE — Peace of mind, by the hour',
  description:
    'A reliable extra eye, even for small stores. A peace-of-mind solution for owners that watches for incidents, theft, and anomalies and alerts you. From ₩34 an hour, ₩14,900 a month. Operated on storecare.ai.',
  keywords: ['saai care', 'store care', 'store owners', 'store peace of mind', 'theft prevention', 'CCTV AI', 'SMB', 'storecare.ai'],
  alternates: {
    canonical: '/products/store-care',
    languages: {
      en: '/products/store-care',
      ko: '/ko/products/store-care',
      ja: '/jp/products/store-care',
    },
  },
  openGraph: {
    title: 'saai care — store care | DEEPINGSOURCE',
    description: 'Peace of mind, by the hour. An owner’s solution that protects small stores.',
    type: 'website',
  },
};

export default function Page() {
  return <StoreCareView locale="en" />;
}
