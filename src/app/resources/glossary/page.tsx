import type { Metadata } from 'next';
import GlossaryView from '@/components/corporate/views/GlossaryView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Glossary | DEEPINGSOURCE',
  description:
    'Plain-language explanations of the core privacy-AI and spatial-analytics terms — store heatmaps, anonymized CCTV, dwell time, conversion rate, and more.',
  alternates: {
    canonical: '/resources/glossary',
    languages: {
      en: '/resources/glossary',
      ko: '/ko/resources/glossary',
      ja: '/jp/resources/glossary',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'en_US',
    title: 'Glossary | DEEPINGSOURCE',
    description: 'Plain-language explanations of the core privacy-AI and spatial-analytics terms.',
    url: '/resources/glossary',
  },
};

export default function ResourcesGlossaryPage() {
  return <GlossaryView locale="en" />;
}
