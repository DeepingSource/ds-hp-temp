import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCaseStudiesByLocale, getCaseStudyBySlug } from '@/lib/case-studies';
import { localePrefix, type Locale } from '@/lib/i18n';
import CaseStudiesIndexView from './CaseStudiesIndexView';
import CaseStudyDetailView from './CaseStudyDetailView';
import { OG_BASE } from '@/lib/og';

/**
 * Shared route helpers for the locale-scoped case-studies collection. Each locale's
 * route files (en at /resources/case-studies, ko at /ko/…, jp at /jp/…) delegate
 * generateStaticParams / generateMetadata / render here, scoped by locale.
 */

type Params = Promise<{ slug: string }>;

const TITLE_SUFFIX: Record<Locale, string> = {
  ko: 'DEEPINGSOURCE 고객 사례',
  en: 'DEEPINGSOURCE Case Studies',
  jp: 'DEEPINGSOURCE 導入事例',
};

const NOT_FOUND_TITLE: Record<Locale, string> = {
  ko: '사례를 찾을 수 없습니다',
  en: 'Case study not found',
  jp: '事例が見つかりません',
};

const INDEX_META: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  ko: {
    title: '고객 사례 | DEEPINGSOURCE',
    description:
      '편의점·무인매장 53곳 현장 실측부터 100개 매장 본사 확산, 드럭스토어 결품 표준화, 카페 청결 KPI 동기화, 대형 공간 익명화까지 — DeepingSource 도입 사례를 Golden Case 5단계로 읽습니다.',
    ogDescription: 'DeepingSource 도입 사례를 Golden Case 5단계 — 발견·검증·번역·전파·재측정 — 로 읽습니다.',
  },
  en: {
    title: 'Case Studies | DEEPINGSOURCE',
    description:
      'From on-site measurement across 53 convenience and unmanned stores, to a 100-store HQ rollout, drugstore stockout standardization, cafe cleanliness KPI sync, and large-venue anonymization. DeepingSource deployment cases read through the five Golden Case stages.',
    ogDescription: 'Deployment cases read through the five Golden Case stages — Discover, Verify, Translate, Sync, Re-measure.',
  },
  jp: {
    title: '導入事例 | DEEPINGSOURCE',
    description:
      'コンビニ・無人店舗53店の現場実測から、100店舗の本社展開、ドラッグストアの欠品標準化、カフェの清潔KPI同期、大型空間の匿名化まで — DeepingSourceの導入事例を Golden Case の5段階で読み解きます。',
    ogDescription: 'DeepingSourceの導入事例を Golden Case の5段階 — 発見・検証・翻訳・展開・再測定 — で読み解きます。',
  },
};

function indexPath(locale: Locale): string {
  return `${localePrefix(locale)}/resources/case-studies`;
}

export function caseStudyIndexMetadata(locale: Locale): Metadata {
  const m = INDEX_META[locale];
  const url = indexPath(locale);
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        en: '/resources/case-studies',
        ko: '/ko/resources/case-studies',
        ja: '/jp/resources/case-studies',
      },
    },
    openGraph: { ...OG_BASE, title: m.title, description: m.ogDescription, url },
  };
}

export function CaseStudyIndexPage(locale: Locale) {
  return <CaseStudiesIndexView locale={locale} />;
}

export function caseStudyStaticParams(locale: Locale): { slug: string }[] {
  const params = getCaseStudiesByLocale(locale).map((c) => ({ slug: c.slug }));
  // `output: export` rejects an empty generateStaticParams(); emit a 404 sentinel.
  return params.length > 0 ? params : [{ slug: '__none__' }];
}

export async function caseStudyDetailMetadata(locale: Locale, params: Params): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug, locale);
  if (!cs) return { title: NOT_FOUND_TITLE[locale] };

  const path = `${localePrefix(locale)}/resources/case-studies/${slug}`;
  return {
    title: `${cs.title} | ${TITLE_SUFFIX[locale]}`,
    description: cs.sub,
    alternates: { canonical: path },
    openGraph: {
      ...OG_BASE,
      title: cs.title,
      description: cs.sub,
      url: path,
      type: 'article',
      publishedTime: `${cs.date}T00:00:00+09:00`,
    },
  };
}

export async function CaseStudyDetailPage(locale: Locale, params: Params) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug, locale);
  if (!cs) notFound();
  return <CaseStudyDetailView cs={cs} locale={locale} />;
}
