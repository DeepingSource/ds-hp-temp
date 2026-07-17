import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Archive } from 'lucide-react';
import { formatEventDateRange, type Event } from '@/data/events/types';
import { isPastEvent } from '@/lib/events';
import { type Locale } from '@/lib/i18n';
import { booth } from '../data';

const ARCHIVE: Record<Locale, string> = {
  ko: '종료된 이벤트입니다. 아래 내용은 기록용으로 보관됩니다.',
  en: 'This event has ended. The details below are kept for the record.',
  jp: '終了したイベントです。以下の内容は記録として保管しています。',
};

/** 섹션 6 — 방문 예약 CTA. 다크 배너. 과거 이벤트면 CTA 대신 아카이브 안내. */
export default function BoothCta({ event, locale }: { event: Event; locale: Locale }) {
  const past = isPastEvent(event);
  const dateText = formatEventDateRange(event.startDate, event.endDate, locale);

  return (
    <section className="relative py-20 bg-surface-dark overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/15 blur-[120px] rounded-full" aria-hidden="true" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {past ? (
          <div className="inline-flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-slate-300 text-left">
            <Archive className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
            <span className="break-keep">{ARCHIVE[locale]}</span>
          </div>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug break-keep">
              {booth.heading}
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed break-keep">{booth.sub}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
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
            {event.ctaLabel && event.ctaHref && (
              <div className="mt-9">
                <Link href={event.ctaHref} className="btn-primary btn-lg inline-flex items-center gap-2">
                  {event.ctaLabel}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
