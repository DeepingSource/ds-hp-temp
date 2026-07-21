import type { Metadata } from 'next';
import ModelsView from '@/components/corporate/views/ModelsView';

export const metadata: Metadata = {
  title: 'Vision Models — Vision Model Catalog | DEEPINGSOURCE',
  description:
    'A vision model catalog organized into categories including anonymization, recognition, space, flow, change, and generation. The role and applicable stage of each model.',
  alternates: {
    canonical: '/technology/models',
    languages: {
      'x-default': '/technology/models',
      en: '/technology/models',
      ko: '/ko/technology/models',
      ja: '/jp/technology/models',
    },
  },
  openGraph: {
    locale: 'en_US',
    title: 'Vision Models — Vision Model Catalog | DEEPINGSOURCE',
    description: 'A vision model catalog across the anonymization, recognition, space, flow, change, and generation categories.',
    url: '/technology/models',
  },
};

export default function ModelsPage() {
  return <ModelsView locale="en" />;
}
