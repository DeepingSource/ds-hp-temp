import type { Metadata } from 'next';
import StoreCareView from '@/components/corporate/views/StoreCareView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'saai care — store care | DEEPINGSOURCE',
  description:
    'A reliable extra eye, even for small stores. A peace-of-mind solution for owners that watches for incidents, theft, and anomalies and alerts you. From ₩34 an hour, ₩14,900 a month. Operated on storecare.ai.',
  keywords: ['saai care', 'store care', 'store owners', 'store peace of mind', 'theft prevention', 'CCTV AI', 'SMB', 'storecare.ai'],
  alternates: {
    canonical: '/products/saai-care',
    languages: {
      en: '/products/saai-care',
      ko: '/ko/products/saai-care',
      ja: '/jp/products/saai-care',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: 'saai care — store care | DEEPINGSOURCE',
    description: 'Peace of mind, by the hour. An owner’s solution that protects small stores.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <StoreCareView locale="en" />;
}
