import type { Metadata } from 'next';
import ResourcesView from '@/components/corporate/views/ResourcesView';

export const metadata: Metadata = {
  title: 'Resources | DeepingSource',
  description:
    'Blog posts, case studies, product docs, a glossary, and FAQs — everything you need to understand DeepingSource privacy AI solutions, in one place.',
  alternates: {
    canonical: '/resources',
    languages: {
      en: '/resources',
      ko: '/ko/resources',
      ja: '/jp/resources',
    },
  },
  openGraph: {
    title: 'Resources | DeepingSource',
    description: 'Blog, case studies, product docs, glossary, and FAQ in one place.',
    url: '/resources',
  },
};

export default function Page() {
  return <ResourcesView locale="en" />;
}
