import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { glossaryTerms, glossaryBySlug } from '@/data/glossaryTerms';
import { glossaryCardI18n } from '@/data/glossary-i18n';
import GlossaryDetailView from '@/components/corporate/views/GlossaryDetailView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return glossaryTerms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = glossaryBySlug[slug];
  if (!term) return {};
  const en = glossaryCardI18n[slug]?.en;
  const title = en?.title ?? term.englishTitle;
  const description = en?.definition ?? en?.tagline ?? term.tagline;
  return {
    title: `What is ${title}? | SAAI Glossary`,
    description,
    alternates: {
      canonical: `/glossary/${slug}`,
      languages: {
        en: `/glossary/${slug}`,
        ko: `/ko/glossary/${slug}`,
        ja: `/jp/glossary/${slug}`,
      },
    },
    openGraph: {
      title: `What is ${title}?`,
      description,
      url: `/glossary/${slug}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}

export default async function GlossaryDetailPage({ params }: Props) {
  const { slug } = await params;
  const term = glossaryBySlug[slug];
  if (!term) notFound();

  return <GlossaryDetailView term={term} locale="en" />;
}
