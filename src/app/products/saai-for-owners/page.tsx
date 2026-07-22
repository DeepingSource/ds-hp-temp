import type { Metadata } from 'next';
import SaaiForOwnersView from '@/components/corporate/views/SaaiForOwnersView';

export const metadata: Metadata = {
  title: 'SAAI for Store Owners — B2C Solutions | DEEPINGSOURCE',
  description:
    'SAAI services built specifically for store owners — start right from your smartphone without complicated hardware.',
  keywords: ['saai.store', 'storecare.ai', 'small business AI', 'camera-less footfall', 'store owner suite', 'DeepingSource'],
  alternates: {
    canonical: '/products/saai-for-owners',
    languages: {
      en: '/products/saai-for-owners',
      ko: '/ko/products/saai-for-owners',
      ja: '/jp/products/saai-for-owners',
    },
  },
};

export default function Page() {
  return <SaaiForOwnersView locale="en" />;
}
