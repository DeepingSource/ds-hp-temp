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
  const jp = glossaryCardI18n[slug]?.jp;
  const title = jp?.title ?? term.englishTitle;
  const description = jp?.definition ?? jp?.tagline ?? term.tagline;
  return {
    title: `${title}とは？ | SAAI用語辞典`,
    description,
    alternates: {
      canonical: `/jp/glossary/${slug}`,
      languages: {
        en: `/glossary/${slug}`,
        ko: `/ko/glossary/${slug}`,
        ja: `/jp/glossary/${slug}`,
      },
    },
    openGraph: {
      locale: 'ja_JP',
      title: `${title}とは？`,
      description,
      url: `/jp/glossary/${slug}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}

export default async function JpGlossaryDetailPage({ params }: Props) {
  const { slug } = await params;
  const term = glossaryBySlug[slug];
  if (!term) notFound();

  return <GlossaryDetailView term={term} locale="jp" />;
}
