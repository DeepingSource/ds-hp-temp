import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ArrowRight, ArrowDown } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { formatEventDateRange, type Event } from '@/data/events/types';
import { isPastEvent } from '@/lib/events';
import { type Locale } from '@/lib/i18n';
import { hero } from '../data';

/**
 * 섹션 1 — 브로슈어 표지 재현. 좌측 태그라인/일정/CTA, 우측 CSS 브랜드 플로우(심볼+3제품).
 * 히어로 아이소메트릭 원본이 리포에 없어 CSS 합성으로 대체(계획 §5).
 */
export default function ExpoHero({ event, locale }: { event: Event; locale: Locale }) {
  const dateText = formatEventDateRange(event.startDate, event.endDate, locale);
  const past = isPastEvent(event);

  return (
    <section className="relative pt-24 pb-16 lg:pb-24 bg-surface-dark overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[520px] h-[520px] bg-primary/20 blur-[130px] rounded-full" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <Breadcrumb
          items={[
            { name: crumb('events', locale), path: '/events' },
            { name: event.title, path: `/events/${event.slug}` },
          ]}
          locale={locale}
          tone="dark"
          className="mb-8"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 텍스트 */}
          <div>
            <p className="text-sm font-bold text-primary tracking-wide mb-4">{hero.eyebrow}</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] break-keep">
              {hero.titlePre}
              <span className="text-primary">{hero.titleAccent}</span>
              {hero.titlePost}
            </h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed break-keep">{hero.sub}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
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

            <div className="mt-9 flex flex-wrap items-center gap-4">
              {event.ctaLabel && event.ctaHref && !past && (
                <Link href={event.ctaHref} className="btn-primary btn-lg inline-flex items-center gap-2">
                  {event.ctaLabel}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              )}
              <a href="#count" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                {hero.scrollLabel}
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* CSS 브랜드 플로우 */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-7">
              <div className="flex items-center gap-3 pb-5 border-b border-white/10">
                <span className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <Image src="/images/saai-symbol.svg" alt="" width={22} height={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">하나의 흐름으로</p>
                  <p className="text-xs text-slate-400">상권 · 관리 · 홍보</p>
                </div>
              </div>
              <ol className="mt-5 space-y-1">
                {hero.products.map((p, i) => (
                  <li key={p.key}>
                    <div className="flex items-center gap-3 py-2.5">
                      <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-white lowercase">{p.label}</p>
                        <p className="text-xs text-slate-400">{p.sub}</p>
                      </div>
                    </div>
                    {i < hero.products.length - 1 && <div className="ml-3.5 h-4 w-px bg-white/15" aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
