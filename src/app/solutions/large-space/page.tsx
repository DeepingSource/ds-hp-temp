import type { Metadata } from 'next';
import LargeSpaceView from '@/components/corporate/views/LargeSpaceView';

export const metadata: Metadata = {
  title: 'Large-Space Solutions | Deeping Source',
  description:
    'Hypermarkets, malls, and conventions — even vast spaces, run like one store. Crowd management, flow analysis, and anomaly detection, unified with MTMC Spatial AI.',
  alternates: {
    canonical: '/solutions/large-space',
    languages: {
      en: '/solutions/large-space',
      ko: '/ko/solutions/large-space',
      ja: '/jp/solutions/large-space',
    },
  },
  openGraph: {
    title: 'Large-Space Solutions | Deeping Source',
    description: 'Every space, like one. A large-space solution that helps vast spaces run like a single store.',
    url: '/solutions/large-space',
  },
};

export default function Page() {
  return <LargeSpaceView locale="en" />;
}
