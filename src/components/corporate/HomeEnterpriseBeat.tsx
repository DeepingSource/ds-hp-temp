'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
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
 *
 * 피드백 재설계(2026-07): 목업이 커지며 컨테이너가 깨지던 5:7 배치를 6:6으로 되돌리고
 * 목업은 max-w-md 상한의 보조 증거로 축소 — 대신 "편차 → 하나의 표준" 등화 애니메이션
 * 비주얼을 메시지 중심에 놓는다(들쭉날쭉한 매장 막대가 하나의 기준선으로 정렬).
 */

const dict: Record<
  Locale,
  { eyebrow: string; heading: string; body: string; before: string; after: string; cta: string; mockupCaption: string }
> = {
  ko: {
    eyebrow: '모든 매장을, 한 매장처럼',
    heading: '가장 잘되는 매장을, 전국 표준으로.',
    body: '잘되는 이유를 데이터로 찾아, 전 매장에 옮깁니다. 흩어진 전국 매장을 하나의 기준으로 — 본사 한 화면에서.',
    before: '편차 100개',
    after: '하나의 표준',
    cta: '본사 맞춤 제안 받기',
    mockupCaption: '본사 한 화면 — 전 매장을 같은 기준으로 봅니다',
  },
  en: {
    eyebrow: 'Scattered stores, one standard',
    heading: 'Make your best store the national standard.',
    body: 'Find in data why the best store works, and carry it to every store. Scattered stores nationwide onto one standard — on one HQ screen.',
    before: '100 variances',
    after: 'One standard',
    cta: 'Get an HQ proposal',
    mockupCaption: 'One HQ screen — every store against the same standard',
  },
  jp: {
    eyebrow: 'バラバラの全店舗を、ひとつの基準へ',
    heading: '一番良い店舗を、全国の標準に。',
    body: '良い理由をデータで見つけ、全店舗へ展開します。バラバラの全店舗をひとつの基準へ — 本部のひとつの画面で。',
    before: 'ばらつき100',
    after: 'ひとつの標準',
    cta: '本部向けのご提案を受け取る',
    mockupCaption: '本部のひとつの画面 — 全店舗を同じ基準で見ます',
  },
};

// 매장별 편차 막대(px) — 등화 후 전부 STANDARD_H로 정렬된다
const VARIANCE_HEIGHTS = [46, 68, 30, 58, 38, 76, 48, 26, 62];
const STANDARD_H = 64;

/** "편차 100개 → 하나의 표준" — 막대들이 하나의 기준선으로 등화되는 메시지 비주얼 */
function StandardizeBars({ before, after }: { before: string; after: string }) {
  const reduced = usePrefersReducedMotion();
  // safetyNet: false — 등화는 원샷 재생 게이트라 3초 폴백이 켜져 있으면 화면 밖 소진(D4)
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.5, safetyNet: false });
  const [equalized, setEqualized] = useState(false);

  useEffect(() => {
    if (!isVisible || reduced) return;
    const id = setTimeout(() => setEqualized(true), 900);
    return () => clearTimeout(id);
  }, [isVisible, reduced]);

  // reduced-motion은 전환 없이 최종(표준) 상태를 바로 렌더
  const standardized = reduced || equalized;

  return (
    <div ref={ref} className="mt-8 max-w-md rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm sm:p-6">
      <div className="relative flex h-20 items-end justify-center gap-2" aria-hidden="true">
        {/* 기준선 — 등화 완료 시 드러난다 */}
        <span
          className={`absolute inset-x-2 border-t-2 border-dashed border-primary/40 transition-opacity duration-500 ${
            standardized ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ bottom: `${STANDARD_H}px` }}
        />
        {VARIANCE_HEIGHTS.map((h, i) => (
          <span
            key={i}
            className={`w-3 rounded-t-sm transition-all duration-700 ease-out sm:w-3.5 ${
              standardized ? 'bg-primary' : 'bg-gray-300'
            }`}
            style={{
              height: `${standardized ? STANDARD_H : h}px`,
              transitionDelay: reduced ? '0ms' : `${i * 55}ms`,
            }}
          />
        ))}
      </div>
      {/* 비강조 상태도 gray-500 바닥 유지 — 11px 텍스트 WCAG AA(4.5:1) 하한 */}
      <div className="mt-4 flex items-center justify-center gap-3 text-2xs font-semibold uppercase tracking-[0.15em]">
        <span className={`transition-colors duration-500 ${standardized ? 'text-gray-500' : 'text-gray-600'}`}>
          {before}
        </span>
        <ArrowRight
          className={`h-3.5 w-3.5 shrink-0 transition-colors duration-500 ${standardized ? 'text-primary' : 'text-gray-400'}`}
          aria-hidden="true"
        />
        <span className={`transition-colors duration-500 ${standardized ? 'text-primary' : 'text-gray-500'}`}>
          {after}
        </span>
      </div>
    </div>
  );
}

export default function HomeEnterpriseBeat({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section variant="default" pad="compact">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary-lighter/60 via-white to-white px-6 py-10 sm:px-10 sm:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* 메시지 컬럼 — 헤드라인 + 등화 비주얼이 주인공 */}
            <div>
              <Eyebrow tone="primary" className="mb-3">{t.eyebrow}</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display tracking-tight">
                {t.heading}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600 break-keep">{t.body}</p>

              <StandardizeBars before={t.before} after={t.after} />

              <Link
                href={localeHref(locale, '/enterprise')}
                className="btn-primary btn-lg mt-8 inline-flex"
              >
                {t.cta}
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* 보조 증거 — HQ 대시보드 목업(max-w-md 상한, 레이아웃을 밀지 않는다) */}
            <div className="mx-auto w-full max-w-md">
              {/* 크기·프레임은 목업(MockupViewport+디바이스 프레임) 소관 — 호출부는 폭만(v2 계약) */}
              <MultiStoreDashboardMockup locale={locale} />
              <p className="mt-3 text-center text-xs text-gray-500 break-keep">{t.mockupCaption}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
