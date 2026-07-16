import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getEventForRoute, getEventStaticSlugs } from '@/lib/events';
import { localePrefix, type Locale } from '@/lib/i18n';
import EventDetailView from './EventDetailView';
import EventsIndexView from './EventsIndexView';

/**
 * Shared route helpers for the events pages. Each locale's page.tsx (en at /events,
 * ko at /ko/events, jp at /jp/events) delegates here. URL uses the locale-agnostic
 * logical slug; content falls back to Korean until a translation exists.
 */
type Params = Promise<{ slug: string }>;

const TITLE_SUFFIX: Record<Locale, string> = {
  ko: '이벤트 | DEEPINGSOURCE',
  en: 'Events | DEEPINGSOURCE',
  jp: 'イベント | DEEPINGSOURCE',
};
const NOT_FOUND_TITLE: Record<Locale, string> = {
  ko: '이벤트를 찾을 수 없습니다',
  en: 'Event not found',
  jp: 'イベントが見つかりません',
};
const INDEX_META: Record<Locale, { title: string; desc: string }> = {
  ko: { title: '이벤트 & 박람회 | DEEPINGSOURCE', desc: '컨퍼런스·박람회·웨비나에서 딥핑소스를 만나보세요.' },
  en: { title: 'Events & Exhibitions | DEEPINGSOURCE', desc: 'Meet DeepingSource at conferences, expos, and webinars.' },
  jp: { title: 'イベント＆展示会 | DEEPINGSOURCE', desc: 'カンファレンス・展示会・ウェビナーでDeepingSourceにお会いください。' },
};

export function eventStaticParams(): { slug: string }[] {
  const params = getEventStaticSlugs().map((slug) => ({ slug }));
  // `output: export` rejects an empty generateStaticParams().
  return params.length > 0 ? params : [{ slug: '__none__' }];
}

export async function eventDetailMetadata(locale: Locale, params: Params): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventForRoute(slug, locale);
  if (!event) return { title: NOT_FOUND_TITLE[locale], robots: { index: false, follow: false } };

  const path = `${localePrefix(locale)}/events/${slug}`;
  return {
    title: `${event.title} | ${TITLE_SUFFIX[locale]}`,
    description: event.subtitle || undefined,
    alternates: { canonical: path },
    openGraph: { title: event.title, description: event.subtitle || undefined, url: path },
    // Invite-only events opt out of indexing.
    ...(event.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export async function EventDetailPage(locale: Locale, params: Params) {
  const { slug } = await params;
  const event = getEventForRoute(slug, locale);
  if (!event) notFound();
  return <EventDetailView event={event} locale={locale} />;
}

export function eventsIndexMetadata(locale: Locale): Metadata {
  const m = INDEX_META[locale];
  const path = `${localePrefix(locale)}/events`;
  return {
    title: m.title,
    description: m.desc,
    alternates: { canonical: path },
    openGraph: { title: m.title, description: m.desc, url: path },
  };
}

export function EventsIndexPage(locale: Locale) {
  return <EventsIndexView locale={locale} />;
}
