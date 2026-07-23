import type { Metadata } from 'next';
import FunctionToolView from '@/components/corporate/views/FunctionToolView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'store queue — queues & crowding | DEEPINGSOURCE',
  description: 'Checkout waiting and store crowding measured live — move staff before it gets busy. A function across saai care, insight and agent.',
  keywords: ['store queue', 'queue analytics', 'store crowding', 'wait time', 'anonymized spatial AI', 'DeepingSource'],
  alternates: {
    canonical: '/products/store-queue',
    languages: { en: '/products/store-queue', ko: '/ko/products/store-queue', ja: '/jp/products/store-queue' },
  },
  openGraph: {
    ...OG_BASE,
    title: 'store queue — queues & crowding | DEEPINGSOURCE',
    description: 'Waiting and crowding, measured live — move staff before it gets busy.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <FunctionToolView tool="queue" locale="en" />;
}
