import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, CalendarDays } from 'lucide-react';
import { getEventsForLocale } from '@/lib/events';
import { formatEventDateRange } from '@/data/events/types';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';

const C: Record<Locale, { eyebrow: string; heading: string; sub: string; emptyTitle: string; emptyBody: string }> = {
  ko: {
    eyebrow: 'Events',
    heading: '이벤트 & 박람회',
    sub: '컨퍼런스, 박람회, 웨비나에서 딥핑소스를 만나보세요.',
    emptyTitle: '예정된 이벤트가 없습니다',
    emptyBody: '새로운 일정이 확정되면 이곳에서 안내드리겠습니다.',
  },
  en: {
    eyebrow: 'Events',
    heading: 'Events & Exhibitions',
    sub: 'Meet DeepingSource at conferences, expos, and webinars.',
    emptyTitle: 'No upcoming events',
    emptyBody: 'New dates will appear here as soon as they are confirmed.',
  },
  jp: {
    eyebrow: 'Events',
    heading: 'イベント＆展示会',
    sub: 'カンファレンス・展示会・ウェビナーでDeepingSourceにお会いください。',
    emptyTitle: '予定されているイベントはありません',
    emptyBody: '新しい日程が確定次第、こちらでご案内します。',
  },
};

export default function EventsIndexView({ locale }: { locale: Locale }) {
  const c = C[locale];
  const events = getEventsForLocale(locale);

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-28 pb-16 lg:pt-32 bg-surface-dark overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" aria-hidden="true" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('events', locale), path: '/events' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <CalendarDays className="w-3.5 h-3.5" />
            {c.eyebrow}
          </HeroBadge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            {c.heading}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed break-keep">{c.sub}</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {events.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16">
              <h2 className="text-lg font-bold text-gray-900 mb-2 break-keep">{c.emptyTitle}</h2>
              <p className="text-sm text-gray-500 leading-relaxed break-keep">{c.emptyBody}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <Link
                  key={event.slug}
                  href={localeHref(locale, `/events/${event.slug}`)}
                  className="group block rounded-2xl border border-gray-100 bg-white p-6 hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-[box-shadow,border-color] duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors break-keep mb-1">
                        {event.title}
                      </h2>
                      {event.subtitle && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 break-keep mb-3">{event.subtitle}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                          {formatEventDateRange(event.startDate, event.endDate, locale)}
                        </span>
                        {event.venue && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                            {event.venue}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-[color,transform] flex-shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
