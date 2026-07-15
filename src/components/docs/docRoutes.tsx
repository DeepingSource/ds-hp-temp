import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDocForRoute, getDocStaticSlugs } from '@/lib/docs';
import { isGatedSlug } from '@/lib/docs-access';
import { localePrefix, type Locale } from '@/lib/i18n';
import DocDetailView from './DocDetailView';

/**
 * Shared route helpers for the wiki-style docs detail pages. Each locale's
 * [slug]/page.tsx (en at /resources/docs, ko at /ko/…, jp at /jp/…) delegates here.
 * URL uses the locale-agnostic logical slug; content falls back to Korean until a
 * translation exists (see src/lib/docs.ts).
 */
type Params = Promise<{ slug: string }>;

const TITLE_SUFFIX: Record<Locale, string> = {
  ko: '제품 문서 | DEEPINGSOURCE',
  en: 'Docs | DEEPINGSOURCE',
  jp: '製品ドキュメント | DEEPINGSOURCE',
};

const NOT_FOUND_TITLE: Record<Locale, string> = {
  ko: '문서를 찾을 수 없습니다',
  en: 'Document not found',
  jp: 'ドキュメントが見つかりません',
};

export function docStaticParams(locale: Locale): { slug: string }[] {
  let slugs = getDocStaticSlugs(locale);
  // GH-Pages static export has no proxy to gate access, so exclude gated docs from
  // the export entirely (they stay on the Vercel deploy, gated by the proxy).
  if (process.env.GH_PAGES === '1') slugs = slugs.filter((s) => !isGatedSlug(s));
  const params = slugs.map((slug) => ({ slug }));
  return params.length > 0 ? params : [{ slug: '__none__' }];
}

export async function docDetailMetadata(locale: Locale, params: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocForRoute(slug, locale);
  if (!doc) return { title: NOT_FOUND_TITLE[locale] };

  const path = `${localePrefix(locale)}/resources/docs/${slug}`;
  return {
    title: `${doc.title} | ${TITLE_SUFFIX[locale]}`,
    description: doc.excerpt || undefined,
    alternates: { canonical: path },
    openGraph: { title: doc.title, description: doc.excerpt || undefined, url: path },
  };
}

export async function DocDetailPage(locale: Locale, params: Params) {
  const { slug } = await params;
  const doc = getDocForRoute(slug, locale);
  if (!doc) notFound();
  return <DocDetailView doc={doc} locale={locale} />;
}
