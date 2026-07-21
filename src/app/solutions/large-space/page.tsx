import type { Metadata } from 'next';
import LargeSpaceView from '@/components/corporate/views/LargeSpaceView';

export const metadata: Metadata = {
  title: 'Large-Space Solutions | DEEPINGSOURCE',
  description:
    'Hypermarkets, malls, and conventions — even vast spaces, managed at a glance. Crowd management, flow analysis, and anomaly detection, unified with MTMC Spatial AI.',
  alternates: {
    canonical: '/solutions/large-space',
    languages: {
      en: '/solutions/large-space',
      ko: '/ko/solutions/large-space',
      ja: '/jp/solutions/large-space',
    },
  },
  openGraph: {
    locale: 'en_US',
    title: 'Large-Space Solutions | DEEPINGSOURCE',
    description: 'Even the largest space, at a glance. A large-space solution that unifies crowd, flow, and anomaly detection.',
    url: '/solutions/large-space',
  },
};

export default function Page() {
  return <LargeSpaceView locale="en" />;
}
