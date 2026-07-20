import type { Metadata } from 'next';
import SealView from '@/components/corporate/views/SealView';

export const metadata: Metadata = {
  title: 'SEAL — Video De-identification That Keeps Data Useful | DEEPINGSOURCE',
  description:
    'SEAL removes every face and license plate from video while preserving the features AI needs — delivered as an embeddable SDK. See before/after, vision-task proof, and how it compares to blur and masking.',
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
    title: 'SEAL — Video De-identification That Keeps Data Useful | DEEPINGSOURCE',
    description: 'Erase faces and license plates from video while keeping the data AI training needs — as an embeddable SDK.',
    url: '/technology/seal',
    images: [{ url: '/images/og/seal.png', width: 2500, height: 1313, alt: 'SEAL — video de-identification that keeps data useful' }],
  },
};

export default function SealPage() {
  return <SealView locale="en" />;
}
