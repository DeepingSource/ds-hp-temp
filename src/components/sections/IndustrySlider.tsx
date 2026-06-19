'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Store, Coffee, MonitorOff, ShoppingCart, Pill, Landmark, Warehouse } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { industrySliderImages } from '@/data/siteImages';

interface Industry {
  icon: LucideIcon;
  label: string;
  href: string;
  tagline: string;
  color: string;
  heroImage: string;
  metric: string;
}

const industries: Industry[] = [
  { icon: Store,        label: '편의점',         href: '/industries/convenience', tagline: '폐기를 줄이고, 빈 매대를 채웁니다',                 color: 'emerald', heroImage: industrySliderImages.convenience, metric: '폐기 60% 감소' },
  { icon: Coffee,       label: '카페·음식점',    href: '/industries/cafe',        tagline: '빈 테이블을 더 빨리 채우고, 청결까지 자동으로 관리합니다', color: 'amber',   heroImage: industrySliderImages.cafe,        metric: '회전율 +23%' },
  { icon: MonitorOff,   label: '무인매장',       href: '/industries/unmanned',    tagline: '사장님이 없어도 매장은 안전합니다',                 color: 'blue',    heroImage: industrySliderImages.unmanned,   metric: '사고 대응 -68%' },
  { icon: Pill,         label: '드럭스토어',     href: '/industries/drugstore',   tagline: '결품 알림 하나로 매출 누수를 막습니다',             color: 'rose',    heroImage: industrySliderImages.drugstore,     metric: '결품율 82% 감소' },
  { icon: ShoppingCart, label: '대형마트',       href: '/industries/mart',        tagline: '수천 평 매장도 한 화면에서 운영합니다',             color: 'violet',  heroImage: industrySliderImages.mart,          metric: '운영비 -35%' },
  { icon: Landmark,     label: '전시·공공 공간', href: '/industries/exhibition',  tagline: '관람객이 더 오래 머물고, 더 많이 봅니다',           color: 'sky',     heroImage: industrySliderImages.exhibition,   metric: '체류시간 +41%' },
  { icon: Warehouse,    label: '물류·창고',      href: '/industries/logistics',   tagline: '냉동 사고를 일어나기 전에 막습니다',               color: 'slate',   heroImage: industrySliderImages.logistics,      metric: '이상 감지 98.2%' },
];

const colorMap: Record<string, { accent: string; accentBg: string; dot: string; pillBg: string; pillText: string }> = {
  emerald: { accent: 'text-emerald-400', accentBg: 'bg-emerald-500/15', dot: 'bg-emerald-400', pillBg: 'bg-emerald-500/20', pillText: 'text-emerald-300' },
  amber:   { accent: 'text-amber-400',   accentBg: 'bg-amber-500/15',   dot: 'bg-amber-400',   pillBg: 'bg-amber-500/20',   pillText: 'text-amber-300' },
  blue:    { accent: 'text-blue-400',    accentBg: 'bg-blue-500/15',    dot: 'bg-blue-400',    pillBg: 'bg-blue-500/20',    pillText: 'text-blue-300' },
  rose:    { accent: 'text-rose-400',    accentBg: 'bg-rose-500/15',    dot: 'bg-rose-400',    pillBg: 'bg-rose-500/20',    pillText: 'text-rose-300' },
  violet:  { accent: 'text-violet-400',  accentBg: 'bg-violet-500/15',  dot: 'bg-violet-400',  pillBg: 'bg-violet-500/20',  pillText: 'text-violet-300' },
  sky:     { accent: 'text-sky-400',     accentBg: 'bg-sky-500/15',     dot: 'bg-sky-400',     pillBg: 'bg-sky-500/20',     pillText: 'text-sky-300' },
  slate:   { accent: 'text-slate-400',   accentBg: 'bg-slate-500/15',   dot: 'bg-slate-400',   pillBg: 'bg-slate-500/20',   pillText: 'text-slate-300' },
};

const INTERVAL = 5000;

export default function IndustrySlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setCurrent((prev) => (prev + dir + industries.length) % industries.length);
  }, []);

  // auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => go(1), INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, go]);

  const ind = industries[current];
  const c = colorMap[ind.color];
  const Icon = ind.icon;

  return (
    <section className="py-20 lg:py-28 bg-gray-950 overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">Industries</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 break-keep">
            어떤 업종이든, 매장이라면
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto">
            편의점·카페·약국, 업종마다 필요한 AI가 다릅니다. 우리 업종을 찾아보세요.
          </p>
        </div>
      </div>

      {/* Slider */}
      <div
        className="relative max-w-6xl mx-auto px-4 sm:px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Main slide */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/7] sm:aspect-[21/9]">
          {/* All images pre-rendered, opacity switch */}
          {industries.map((item, i) => (
            <Image
              key={item.label}
              src={item.heroImage}
              alt={item.label}
              fill
              className={`object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 768px) 100vw, 1152px"
              priority={i === 0}
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          ))}

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
            <div className="max-w-lg">
              {/* Industry icon + label */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${c.accentBg} backdrop-blur-sm flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${c.accent}`} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{ind.label}</h3>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-5">
                {ind.tagline}
              </p>

              {/* Metric + CTA */}
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${c.pillBg} ${c.pillText} backdrop-blur-sm`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                  {ind.metric}
                </span>
                <Link
                  href={ind.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors cursor-pointer"
                >
                  자세히 보기
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="이전 업종"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="다음 업종"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Dots + thumbnail strip */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {industries.map((item, i) => {
            const dc = colorMap[item.color];
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setCurrent(i)}
                className={`group relative flex items-center gap-2 px-3 py-2 rounded-full transition-colors cursor-pointer ${
                  i === current
                    ? 'bg-white/10'
                    : 'bg-transparent hover:bg-white/5'
                }`}
                aria-label={item.label}
                aria-current={i === current ? 'true' : undefined}
              >
                <span className={`w-2 h-2 rounded-full transition-colors ${i === current ? dc.dot : 'bg-gray-600 group-hover:bg-gray-500'}`} />
                <span className={`text-xs font-medium transition-colors hidden sm:inline ${i === current ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
