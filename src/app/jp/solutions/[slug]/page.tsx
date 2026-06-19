import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { solutionsData, solutionsBySlug } from '@/data/solutionsData';
import { solutionCardI18n } from '@/data/solutions-i18n';
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

  const card = solutionCardI18n[slug]?.jp;
  const title = card?.title ?? sol.title;
  const description = card?.excerpt ?? sol.metaDescription;

  return {
    title: `${title} | SAAI ソリューション`,
    description,
    alternates: {
      canonical: `/jp/solutions/${slug}`,
      languages: {
        en: `/solutions/${slug}`,
        ko: `/ko/solutions/${slug}`,
        ja: `/jp/solutions/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/jp/solutions/${slug}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const sol = solutionsBySlug[slug];
  if (!sol) notFound();

  return <SolutionDetailView sol={sol} locale="jp" />;
}
