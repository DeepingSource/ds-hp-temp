import type { Metadata } from 'next';
import DiagnosisView from '@/components/corporate/views/DiagnosisView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Find Your Solution — 3-Question Diagnosis | DEEPINGSOURCE',
  description:
    'Answer a few questions about your industry and problem, and see the matching SAAI solution, product, and real results — no browsing required.',
  alternates: {
    canonical: '/solutions/diagnosis',
    languages: {
      en: '/solutions/diagnosis',
      ko: '/ko/solutions/diagnosis',
      ja: '/jp/solutions/diagnosis',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'en_US',
    title: 'Find Your Solution — 3-Question Diagnosis | DEEPINGSOURCE',
    description: 'Answer a few questions and see the matching SAAI solution right away.',
    url: '/solutions/diagnosis',
  },
};

export default function Page() {
  return <DiagnosisView locale="en" />;
}
