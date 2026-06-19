import type { Metadata } from 'next';
import SealView from '@/components/corporate/views/SealView';

export const metadata: Metadata = {
  title: 'SEAL SDK — De-identification Integration SDK | DeepingSource',
  description:
    'SEAL SDK is a development kit for integrating video de-identification, recognition, and spatial-analytics pipelines into your application. It covers the four design principles: Secure, Embeddable, Adaptable, Lightweight.',
  alternates: {
    canonical: '/technology/seal',
    languages: {
      'x-default': '/technology/seal',
      en: '/technology/seal',
      ko: '/ko/technology/seal',
      ja: '/jp/technology/seal',
    },
  },
  openGraph: {
    title: 'SEAL SDK — De-identification Integration SDK | DeepingSource',
    description: 'An SDK for integrating the de-identification processing pipeline into your application.',
    url: '/technology/seal',
  },
};

export default function SealPage() {
  return <SealView locale="en" />;
}
