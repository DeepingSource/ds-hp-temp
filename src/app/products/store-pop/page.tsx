import type { Metadata } from 'next';
import FunctionToolView from '@/components/corporate/views/FunctionToolView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'store pop — in-store promotion (POP) | DEEPINGSOURCE',
  description: 'Measure the visibility, attention and conversion of posted promotions — down to wording, placement and refresh timing. A function across saai care, insight and agent.',
  keywords: ['store pop', 'POP effectiveness', 'in-store promotion', 'signage attention', 'anonymized spatial AI', 'DeepingSource'],
  alternates: {
    canonical: '/products/store-pop',
    languages: { en: '/products/store-pop', ko: '/ko/products/store-pop', ja: '/jp/products/store-pop' },
  },
  openGraph: {
    ...OG_BASE,
    title: 'store pop — in-store promotion (POP) | DEEPINGSOURCE',
    description: 'Is that POP actually being seen? Visibility, attention and conversion, as numbers.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <FunctionToolView tool="pop" locale="en" />;
}
