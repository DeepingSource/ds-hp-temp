import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { solutionsData, solutionsBySlug } from '@/data/solutionsData';
import SolutionDetailView from '@/components/corporate/views/SolutionDetailView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return solutionsData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sol = solutionsBySlug[slug];
  if (!sol) return {};

  return {
    title: `${sol.title} | SAAI 솔루션`,
    description: sol.metaDescription,
    alternates: {
      canonical: `/ko/solutions/${slug}`,
      languages: {
        en: `/solutions/${slug}`,
        ko: `/ko/solutions/${slug}`,
        ja: `/jp/solutions/${slug}`,
      },
    },
    openGraph: {
      title: sol.title,
      description: sol.metaDescription,
      url: `/ko/solutions/${slug}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const sol = solutionsBySlug[slug];
  if (!sol) notFound();

  return <SolutionDetailView sol={sol} locale="ko" />;
}
