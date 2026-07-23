import type { Metadata } from 'next';
import ResourcesView from '@/components/corporate/views/ResourcesView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Resources | DEEPINGSOURCE',
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
    ...OG_BASE,
    locale: 'en_US',
    title: 'Resources | DEEPINGSOURCE',
    description: 'Blog, case studies, product docs, glossary, and FAQ in one place.',
    url: '/resources',
  },
};

export default function Page() {
  return <ResourcesView locale="en" />;
}
