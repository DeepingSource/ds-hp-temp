import type { Metadata } from 'next';
import FaqView from '@/components/corporate/views/FaqView';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | DeepingSource',
  description:
    'Answers to frequently asked questions about DeepingSource product onboarding, pricing, data security, features, and more.',
  alternates: {
    canonical: '/resources/faq',
    languages: {
      en: '/resources/faq',
      ko: '/ko/resources/faq',
      ja: '/jp/resources/faq',
    },
  },
  openGraph: {
    title: 'Frequently Asked Questions | DeepingSource',
    description: 'Answers to common questions about onboarding, pricing, and data security.',
    url: '/resources/faq',
  },
};

export default function Page() {
  return <FaqView locale="en" />;
}
