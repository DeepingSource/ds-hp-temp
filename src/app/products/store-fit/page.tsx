import type { Metadata } from 'next';
import FunctionToolView from '@/components/corporate/views/FunctionToolView';

export const metadata: Metadata = {
  title: 'store fit — trend fit | DEEPINGSOURCE',
  description: 'Whether a new product fits this store — from attention, pickup and return visits, in its first week. A function across saai care, insight and agent.',
  keywords: ['store fit', 'trend fit', 'new product reaction', 'gaze to pick', 'anonymized spatial AI', 'DeepingSource'],
  alternates: {
    canonical: '/products/store-fit',
    languages: { en: '/products/store-fit', ko: '/ko/products/store-fit', ja: '/jp/products/store-fit' },
  },
  openGraph: {
    title: 'store fit — trend fit | DEEPINGSOURCE',
    description: 'Whether a product will sell — you know in its first week on the shelf.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <FunctionToolView tool="fit" locale="en" />;
}
