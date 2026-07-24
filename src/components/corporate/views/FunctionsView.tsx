import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import FunctionModeMatrix from '@/components/corporate/FunctionModeMatrix';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { MODE_ORDER, FUNCTION_ORDER, productPrimary } from '@/lib/brand-canon';
import { MODE_COPY, FUNCTIONS_PAGE_COPY } from '@/data/function-matrix-i18n';

/**
 * FunctionsView — /products/functions, the capability library (reorg Phase 4).
 *
 * SOT: brand-system/01_brand_system/SAAI_Function_Mode_Matrix_v1.0.md
 * This page exists to make ONE claim legible: the products are three modes, and the
 * four functions cross all of them. It is where `count` stops looking like a fourth
 * product. Rows/columns come from brand-canon, so the matrix cannot drift from code.
 *
 * ⚠️ EN/JP body copy is a draft rendering pending a copy round — see
 * `src/data/function-matrix-i18n.ts`.
 */

// PriorityEngineDiagram 배치 근거(MM Phase 3 D12): "신호 입력 → 점수화 → 분류 →
// Top 3" 파이프라인은 기능 단위 설명(모드가 모은 신호가 액션이 되는 과정)에 직결 —
// 개별 기능 상세(FunctionToolView: count/queue/pop/fit 단일 도구)에는 교차 서사가
// 없어 허브 FunctionsView의 매트릭스 직후가 적소다("표가 실제로 작동하는 모습").
// 서버 뷰라 ssr:false 불가(Next App Router 제약) — StoreInsightView 선례대로
// loading placeholder만 지정하고 클라이언트에서 지연 로드한다.
const PriorityEngineDiagram = dynamic(
  () => import('@/components/mockups/PriorityEngineDiagram'),
  {
    /* Viewport 예외 목업(고정 캔버스 없음) — 대략 높이 예약, 정확 비율 아님 */
    loading: () => <div className="h-[520px] animate-pulse rounded-2xl bg-gray-100 sm:h-[440px]" />,
  }
);

/** 매트릭스 → 다이어그램 연결 문구 (신규 카피 최소 — 3로케일 동시 작성). */
const ENGINE_COPY: Record<Locale, { heading: string; sub: string }> = {
  ko: {
    heading: '매트릭스가 실제로 작동하는 모습',
    sub: '기능이 모은 신호가 점수화·분류를 거쳐 상위 3개 액션으로 압축되는 과정 — agent 모드의 우선순위 엔진 예시입니다.',
  },
  en: {
    heading: 'The matrix at work',
    sub: 'Signals collected by the functions are scored, classified, and compressed into a top-3 shortlist — the agent-mode priority engine.',
  },
  jp: {
    heading: 'マトリクスが実際に動く様子',
    sub: '機能が集めたシグナルはスコア化・分類を経て上位3件のアクションに圧縮されます — agentモードの優先順位エンジンの例です。',
  },
};

/** Functions that currently own a page of their own. */
const FUNCTION_LINKS: Partial<Record<string, string>> = {
  count: '/products/store-count',
  queue: '/products/store-queue',
  pop: '/products/store-pop',
  fit: '/products/store-fit',
};

const MODE_HREF = {
  care: '/products/saai-care',
  insight: '/products/saai-insight',
  agent: '/products/saai-agent',
} as const;

export default function FunctionsView({ locale }: { locale: Locale }) {
  const c = FUNCTIONS_PAGE_COPY[locale];
  const modes = MODE_COPY[locale];
  const engine = ENGINE_COPY[locale];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-14 lg:pt-36 lg:pb-16 text-center">
          <Breadcrumb
            items={[
              { name: crumb('products', locale), path: '/products' },
              { name: c.eyebrow, path: '/products/functions' },
            ]}
            locale={locale}
            tone="light"
            className="mb-6 justify-center"
          />
          <p className="text-sm font-medium text-primary mb-4 tracking-wide">{c.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-5 font-display">
            <WordRise text={c.title} />
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto break-keep">
            {c.sub}
          </p>
        </div>
      </section>

      {/* ── The three modes (the vertical axis) ── */}
      <Section variant="alt" pad="compact">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep mb-3">{c.modeHeading}</h2>
          <p className="text-base text-gray-500 leading-relaxed break-keep mb-10 max-w-2xl">{c.modeSub}</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {MODE_ORDER.map((m) => (
              <Link
                key={m}
                href={localeHref(locale, MODE_HREF[m])}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-mono font-semibold uppercase tracking-wide text-primary">
                    {modes[m].mode} · {modes[m].tense}
                  </p>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-2xs font-semibold text-primary">
                    {locale === 'ko' ? (m === 'care' ? '실시간 감지' : m === 'insight' ? '추세 분석' : '현장 제안') : m}
                  </span>
                </div>
                <p className="mt-2 text-xl font-bold text-gray-900">{productPrimary(m)}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 break-keep">{modes[m].question}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {c.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── The matrix ── */}
      <Section>
        <Container>
          <FunctionModeMatrix locale={locale} />
          <p className="mt-6 text-sm font-medium text-primary break-keep">{c.countNote}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {FUNCTION_ORDER.filter((fn) => FUNCTION_LINKS[fn]).map((fn) => (
              <li key={fn}>
                <Link
                  href={localeHref(locale, FUNCTION_LINKS[fn]!)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary-light transition-colors no-underline"
                >
                  saai {fn}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Priority engine — 매트릭스가 작동하는 모습 (라이브 다이어그램) ── */}
          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep mb-3">
              {engine.heading}
            </h2>
            <p className="text-base text-gray-500 leading-relaxed break-keep mb-8 max-w-2xl">
              {engine.sub}
            </p>
            <PriorityEngineDiagram locale={locale} />
          </div>
        </Container>
      </Section>

      {/* ── How to read it · extension rule ── */}
      <Section variant="alt" pad="compact">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{c.readingTitle}</h2>
              <p className="text-base text-gray-600 leading-relaxed break-keep">{c.reading}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{c.extensionTitle}</h2>
              <p className="text-base text-gray-600 leading-relaxed break-keep">{c.extension}</p>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed break-keep">{c.promoted}</p>
              <Link
                href={localeHref(locale, '/products/saai-ads-insight')}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors no-underline"
              >
                saai ads insight
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
