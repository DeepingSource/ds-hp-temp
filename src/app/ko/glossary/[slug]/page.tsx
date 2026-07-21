import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { glossaryTerms, glossaryBySlug } from '@/data/glossaryTerms';
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
  return {
    title: `${term.title}(${term.englishTitle})란? | SAAI 용어 사전`,
    description: term.metaDescription,
    alternates: {
      canonical: `/ko/glossary/${slug}`,
      languages: {
        en: `/glossary/${slug}`,
        ko: `/ko/glossary/${slug}`,
        ja: `/jp/glossary/${slug}`,
      },
    },
    openGraph: {
      locale: 'ko_KR',
      title: `${term.title}(${term.englishTitle})란?`,
      description: term.metaDescription,
      url: `/ko/glossary/${slug}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}

export default async function KoGlossaryDetailPage({ params }: Props) {
  const { slug } = await params;
  const term = glossaryBySlug[slug];
  if (!term) notFound();

  return <GlossaryDetailView term={term} locale="ko" />;
}
