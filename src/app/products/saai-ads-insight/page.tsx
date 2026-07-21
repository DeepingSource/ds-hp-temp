import type { Metadata } from 'next';
import SaaiAdsInsightView from '@/components/corporate/views/SaaiAdsInsightView';

export const metadata: Metadata = {
  title: 'saai ads insight — signage & display response | DEEPINGSOURCE',
  description:
    'Traffic, approach, attention and action in front of signage, displays and shelf products — measured anonymously. A saai product across care, insight and agent.',
  keywords: ['saai ads insight', 'signage analytics', 'attention measurement', 'gaze analytics', 'display effectiveness', 'anonymized spatial AI', 'DeepingSource'],
  alternates: {
    canonical: '/products/saai-ads-insight',
    languages: { en: '/products/saai-ads-insight', ko: '/ko/products/saai-ads-insight', ja: '/jp/products/saai-ads-insight' },
  },
  openGraph: {
    title: 'saai ads insight — signage & display response | DEEPINGSOURCE',
    description: 'Traffic, approach, attention and action in front of signage and displays — measured anonymously.',
    type: 'website',
  },
};

export default function Page() {
  return <SaaiAdsInsightView locale="en" />;
}
