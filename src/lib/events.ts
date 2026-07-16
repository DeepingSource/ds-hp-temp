import { events as allRaw, type Event as VeliteEvent } from '../../.velite';
import type { Event } from '@/data/events/types';
import { logicalEventSlug } from '@/data/events/types';
import type { Locale } from '@/lib/i18n';

// Compile-time check: Velite output must be assignable to our Event interface.
const allEvents: Event[] = allRaw satisfies VeliteEvent[] as Event[];
const published: Event[] = allEvents.filter((e) => !e.draft);

// KST "today" (YYYY-MM-DD) — same basis as the articles date gate.
const kstOffset = 9 * 60 * 60 * 1000;
function today(): string {
  return new Date(Date.now() + kstOffset).toISOString().split('T')[0];
}

// Preference when resolving a logical slug for a locale: exact locale > ko fallback > other.
function localeScore(e: Event, locale: Locale): number {
  if (e.lang === locale) return 2;
  if (e.lang === 'ko') return 1;
  return 0;
}

/** Has the event ended (publishUntil, else endDate, before today)? Drives the archive banner. */
export function isPastEvent(e: Event): boolean {
  const end = e.publishUntil || e.endDate;
  return !!end && end < today();
}

/**
 * Events listed for a locale: one entry per logical slug, resolved to the locale's
 * translation when it exists, otherwise the Korean original. Applies the visibility
 * window — `publishFrom` in the future hides it; a past `publishUntil` drops it from the
 * list unless `includeArchived`. Sorted by startDate, soonest/most-recent first.
 */
export function getEventsForLocale(locale: Locale, opts?: { includeArchived?: boolean }): Event[] {
  const t = today();
  const byLogical = new Map<string, Event>();
  for (const e of published) {
    if (e.publishFrom && e.publishFrom > t) continue; // not yet visible
    if (!opts?.includeArchived && e.publishUntil && e.publishUntil < t) continue; // archived
    const logical = logicalEventSlug(e.slug);
    const existing = byLogical.get(logical);
    if (!existing || localeScore(e, locale) > localeScore(existing, locale)) {
      byLogical.set(logical, e);
    }
  }
  return [...byLogical.values()].sort((a, b) => b.startDate.localeCompare(a.startDate));
}

/**
 * Resolve one event for a route (logical slug + locale), with Korean fallback. An event
 * page stays live even after `publishUntil` (archive) — only the listing hides it.
 */
export function getEventForRoute(logicalSlug: string, locale: Locale): Event | undefined {
  const candidates = published.filter((e) => logicalEventSlug(e.slug) === logicalSlug);
  if (candidates.length === 0) return undefined;
  return candidates.sort((a, b) => localeScore(b, locale) - localeScore(a, locale))[0];
}

/** Logical slugs to statically generate for a locale (all non-draft, incl. archived). */
export function getEventStaticSlugs(): string[] {
  return [...new Set(published.map((e) => logicalEventSlug(e.slug)))];
}

export type { Event } from '@/data/events/types';
