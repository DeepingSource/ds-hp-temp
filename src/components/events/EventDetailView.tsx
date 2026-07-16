import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Archive } from 'lucide-react';
import { mdxComponents } from '@/components/blog/mdx-components';
import { type Event } from '@/data/events/types';
import { formatEventDateRange } from '@/data/events/types';
import { isPastEvent } from '@/lib/events';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';

const C: Record<Locale, { archive: string; back: string }> = {
  ko: { archive: '종료된 이벤트입니다. 아래 내용은 기록용으로 보관됩니다.', back: '이벤트 목록으로' },
  en: { archive: 'This event has ended. The details below are kept for the record.', back: 'Back to events' },
  jp: { archive: '終了したイベントです。以下の内容は記録として保管しています。', back: 'イベント一覧へ' },
};

export default function EventDetailView({ event, locale }: { event: Event; locale: Locale }) {
  const c = C[locale];
  const past = isPastEvent(event);
  const dateText = formatEventDateRange(event.startDate, event.endDate, locale);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-12 bg-surface-dark overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" aria-hidden="true" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumb
            items={[
              { name: crumb('events', locale), path: '/events' },
              { name: event.title, path: `/events/${event.slug}` },
            ]}
            locale={locale}
            tone="dark"
            className="mb-6"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.15] mb-4 break-keep">
            {event.title}
          </h1>
          {event.subtitle && <p className="text-lg text-slate-300 leading-relaxed break-keep mb-6">{event.subtitle}</p>}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
              {dateText}
            </span>
            {event.venue && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                {event.venue}
              </span>
            )}
          </div>
        </div>
      </section>

      <article className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {past && (
            <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <Archive className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span className="break-keep">{c.archive}</span>
            </div>
          )}

          {event.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.cover}
              alt={event.coverAlt || event.title}
              loading="lazy"
              className="w-full rounded-2xl border border-gray-100 mb-10"
            />
          )}

          <div className="prose-docs space-y-6">
            <MDXRemote source={event.body} components={mdxComponents} />
          </div>

          {event.ctaLabel && event.ctaHref && !past && (
            <div className="mt-10">
              <Link href={event.ctaHref} className="btn-primary btn-lg inline-flex items-center gap-2">
                {event.ctaLabel}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href={localeHref(locale, '/events')}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {c.back}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
