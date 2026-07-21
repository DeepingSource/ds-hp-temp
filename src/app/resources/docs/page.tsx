import type { Metadata } from 'next';
import DocsView from '@/components/corporate/views/DocsView';

export const metadata: Metadata = {
  title: 'Product Docs | DEEPINGSOURCE',
  description:
    'Technical documentation and manuals for installing, integrating, and operating DeepingSource products. Getting started, data integration, security, and analytics in one place.',
  alternates: {
    canonical: '/resources/docs',
    languages: {
      en: '/resources/docs',
      ko: '/ko/resources/docs',
      ja: '/jp/resources/docs',
    },
  },
  openGraph: {
    locale: 'en_US',
    title: 'Product Docs | DEEPINGSOURCE',
    description: 'Technical documentation and manuals for installing, integrating, and operating products.',
    url: '/resources/docs',
  },
};

export default function Page() {
  return <DocsView locale="en" />;
}
