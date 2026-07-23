import type { Metadata } from 'next';
import HomeView from '@/components/corporate/HomeView';
import { OG_BASE } from '@/lib/og';

const languages = {
  'x-default': 'https://deepingsource.io',
  en: 'https://deepingsource.io',
  ko: 'https://deepingsource.io/ko',
  ja: 'https://deepingsource.io/jp',
};

export const metadata: Metadata = {
  title: 'DEEPINGSOURCE | Anonymized Spatial AI — Perfect every space',
  description: 'Anonymized Spatial AI that reads every store safely — and leaves you one thing to do today. store insight · store care · store agent · SAAI.',
  alternates: { canonical: '/', languages },
  openGraph: {
    ...OG_BASE,
    title: 'DEEPINGSOURCE | Anonymized Spatial AI',
    description: 'Anonymized Spatial AI that reads every store safely — and leaves you one thing to do today.',
    url: 'https://deepingsource.io',
    locale: 'en_US',
    type: 'website',
  },
};

// deepingsource.io home — en default (PLAN_v1.1 D6: `/` = en, `/ko` `/jp` prefixed)
export default function Home() {
  return <HomeView locale="en" />;
}
