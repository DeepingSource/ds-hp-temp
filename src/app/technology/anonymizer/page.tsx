import type { Metadata } from 'next';
import AnonymizerView from '@/components/corporate/views/AnonymizerView';

export const metadata: Metadata = {
  title: 'Anonymizer — Video De-identification Module | DEEPINGSOURCE',
  description:
    'A de-identification module that removes personally identifiable information from CCTV and video streams in real time while preserving the behavioral and movement signals analytics needs. Processing mechanism, specifications, and compliance.',
  alternates: {
    canonical: '/technology/anonymizer',
    languages: {
      'x-default': '/technology/anonymizer',
      en: '/technology/anonymizer',
      ko: '/ko/technology/anonymizer',
      ja: '/jp/technology/anonymizer',
    },
  },
  openGraph: {
    locale: 'en_US',
    title: 'Anonymizer — Video De-identification Module | DEEPINGSOURCE',
    description:
      'A technical overview of a video de-identification module that removes personally identifiable information while preserving the analytical signal.',
    url: '/technology/anonymizer',
  },
};

export default function AnonymizerPage() {
  return <AnonymizerView locale="en" />;
}
