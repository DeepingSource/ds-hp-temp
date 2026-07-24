'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { localeHref, type Locale } from '@/lib/i18n';

const MultiStoreDashboardMockup = dynamic(
  () => import('@/components/mockups/MultiStoreDashboardMockup'),
  {
    // MockupViewport(desktop 1280×800) 자리 예약과 동일 비율 — 로드 전후 CLS 0
    loading: () => <div className="aspect-[1280/800] animate-pulse rounded-2xl bg-gray-100" />,
  }
);

/**
 * HomeEnterpriseBeat — the HQ answer (랜딩_전환재정렬_v2 §6), home #2.5.
 * Resolves the HQ-scale tension ProblemBeat's third card raises (편차 100개): find why the
 * best store works and replicate it, all stores to one standard on one HQ screen. The single
 * conversion bridge to /enterprise.
 */

const dict: Record<
  Locale,
  { eyebrow: string; heading: string; body: string; before: string; after: string; cta: string }
> = {
  ko: {
    eyebrow: '모든 매장을, 한 매장처럼',
    heading: '가장 잘되는 매장을, 전국 표준으로.',
    body: '잘되는 이유를 데이터로 찾아, 전 매장에 옮깁니다. 흩어진 전국 매장을 하나의 기준으로 — 본사 한 화면에서.',
    before: '편차 100개',
    after: '하나의 표준',
    cta: '본사 맞춤 제안 받기',
  },
  en: {
    eyebrow: 'Scattered stores, one standard',
    heading: 'Make your best store the national standard.',
    body: 'Find in data why the best store works, and carry it to every store. Scattered stores nationwide onto one standard — on one HQ screen.',
    before: '100 variances',
    after: 'One standard',
    cta: 'Get an HQ proposal',
  },
  jp: {
    eyebrow: 'バラバラの全店舗を、ひとつの基準へ',
    heading: '一番良い店舗を、全国の標準に。',
    body: '良い理由をデータで見つけ、全店舗へ展開します。バラバラの全店舗をひとつの基準へ — 本部のひとつの画面で。',
    before: 'ばらつき100',
    after: 'ひとつの標準',
    cta: '本部向けのご提案を受け取る',
  },
};

export default function HomeEnterpriseBeat({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section variant="default" pad="compact">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary-lighter/60 via-white to-white px-6 py-10 sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <Eyebrow tone="primary" className="mb-3">{t.eyebrow}</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display tracking-tight">
                {t.heading}
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed break-keep max-w-xl">{t.body}</p>
              
              {/* Variance bar indicator */}
              <div className="mt-8 mb-6 p-4 rounded-2xl bg-white/80 border border-gray-100 shadow-sm max-w-md">
                <div className="flex items-end justify-center gap-6 sm:gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 items-end gap-1.5" aria-hidden="true">
                      {[42, 68, 30, 54, 38, 76, 48].map((h, i) => (
                        <span key={i} className="w-2 rounded-t-sm bg-gray-300" style={{ height: `${h}px` }} />
                      ))}
                    </div>
                    <span className="text-2xs font-semibold uppercase tracking-[0.15em] text-gray-500">{t.before}</span>
                  </div>
                  <ArrowRight className="mb-6 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 items-end" aria-hidden="true">
                      <span className="w-8 rounded-t-md bg-primary shadow-card" style={{ height: '76px' }} />
                    </div>
                    <span className="text-2xs font-semibold uppercase tracking-[0.15em] text-primary">{t.after}</span>
                  </div>
                </div>
              </div>

              <Link
                href={localeHref(locale, '/enterprise')}
                className="btn-primary btn-lg inline-flex"
              >
                {t.cta}
                <ArrowRight className="ml-1.5 w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* HQ Multi-Store Control Dashboard Mockup */}
            <div className="lg:col-span-6">
              {/* 크기·프레임은 목업(MockupViewport+디바이스 프레임) 소관 — 호출부는 폭만(v2 계약).
                  구 overflow-hidden ring/scale-95 래퍼는 이중 프레이밍이라 제거. */}
              <div className="max-w-xl mx-auto">
                <MultiStoreDashboardMockup locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
