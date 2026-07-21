import type { Metadata } from 'next';
import GlossaryView from '@/components/corporate/views/GlossaryView';

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
    locale: 'en_US',
    title: 'Glossary | DEEPINGSOURCE',
    description: 'Plain-language explanations of the core privacy-AI and spatial-analytics terms.',
    url: '/resources/glossary',
  },
};

export default function ResourcesGlossaryPage() {
  return <GlossaryView locale="en" />;
}
