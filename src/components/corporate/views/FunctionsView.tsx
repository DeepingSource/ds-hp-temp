import Link from 'next/link';
import { ArrowRight, Users, Timer, Megaphone, PackageSearch, Boxes, type LucideIcon } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import FunctionModeMatrix from '@/components/corporate/FunctionModeMatrix';
import MidCta from '@/components/corporate/MidCta';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { MODE_ORDER, FUNCTION_ORDER, productPrimary, type FunctionKey } from '@/lib/brand-canon';
import { FUNCTION_COPY, FUNCTIONS_PAGE_COPY } from '@/data/function-matrix-i18n';
import { FUNCTION_CANDIDATES } from '@/data/function-candidates';
import { contactEnterpriseHref } from '@/lib/cta-canon';

/**
 * FunctionsView — /products/functions, the capability library (③ 레인 C 재정비).
 *
 * SOT: brand-system/01_brand_system/SAAI_Function_Mode_Matrix_v1.0.md
 * 허브는 카탈로그다(③0): 중심은 기능 카드 그리드 + "준비 중" 슬롯(확장성 시각화),
 * 4×3 매트릭스는 "읽는 법" 보조 자료로 하단 이동(제품=모드/기능=가로축 캐논 유지).
 * 전환 페이지는 아니므로 하단 상담 CTA 1개만 둔다(§2-1 병합).
 *
 * ⚠️ EN/JP body copy is a draft rendering pending a copy round — see
 * `src/data/function-matrix-i18n.ts`.
 */

// PriorityEngineDiagram은 agentic AI 기술 서사에 속해 /technology/agentic-ai로
// 이관됨(③1-3 — 허브는 리스트업+라우팅에 집중).

/** Functions that currently own a page of their own. */
const FUNCTION_LINKS: Partial<Record<string, string>> = {
  count: '/products/store-count',
  queue: '/products/store-queue',
  pop: '/products/store-pop',
  fit: '/products/store-fit',
};

/** 기능별 아이콘 — FunctionModeMatrix와 동일 매핑(③1-4 재사용). */
const FUNCTION_ICONS: Record<FunctionKey, LucideIcon> = {
  count: Users,
  queue: Timer,
  pop: Megaphone,
  fit: PackageSearch,
};

const MODE_HREF = {
  care: '/products/saai-care',
  insight: '/products/saai-insight',
  agent: '/products/saai-agent',
} as const;

/** "AI가 하는 일" 동사 카피 — 카탈로그 카드 전용(③1-4). */
const FUNCTION_VERB: Record<Locale, Record<FunctionKey, string>> = {
  ko: {
    count: '문 앞을 지나는 사람과 들어온 사람을 셉니다.',
    queue: '줄과 혼잡을 실시간으로 지켜봅니다.',
    pop: '붙여둔 POP이 정말 보이는지 확인합니다.',
    fit: '신상품이 이 매장에 맞는지 가늠합니다.',
  },
  en: {
    count: 'Counts who passes the door and who walks in.',
    queue: 'Watches queues and crowding live.',
    pop: 'Checks whether your POP is actually seen.',
    fit: 'Gauges whether a new product fits this store.',
  },
  jp: {
    count: '店の前の通行と入店を数えます。',
    queue: '行列と混雑をリアルタイムで見張ります。',
    pop: '貼ったPOPが本当に見られているか確かめます。',
    fit: '新商品がこの店に合うかを見極めます。',
  },
};

export default function FunctionsView({ locale }: { locale: Locale }) {
  const c = FUNCTIONS_PAGE_COPY[locale];
  const fnCopy = FUNCTION_COPY[locale];
  const verbs = FUNCTION_VERB[locale];
  // 확장 후보 중 허브 노출은 planned만 (D2 — stock 1종. live 승격 시 자동 편입은 아래 그리드 참고)
  const plannedSlots = FUNCTION_CANDIDATES.filter((f) => f.status === 'planned');

  return (
    <>
      {/* ── Hero — 역량 카탈로그 선언 (③1-2) ── */}
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
            {c.sub.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br className="hidden sm:block" />}
                {i < arr.length - 1 && ' '}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ── 기능 카탈로그 그리드 (③1-4 — 허브의 중심) ── */}
      <Section variant="alt" pad="compact">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep mb-8">{c.catalogTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FUNCTION_ORDER.filter((fn) => FUNCTION_LINKS[fn]).map((fn) => {
              const Icon = FUNCTION_ICONS[fn];
              return (
                <Link
                  key={fn}
                  href={localeHref(locale, FUNCTION_LINKS[fn]!)}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition hover:border-primary/40 hover:shadow-lg no-underline"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-lighter">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </span>
                    <p className="text-lg font-bold text-gray-900">saai {fn}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700 break-keep">{fnCopy[fn]}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500 break-keep">{verbs[fn]}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {c.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
            {/* "준비 중" 슬롯(D1·D2) — 확장성을 물리적으로 보여주는 disabled 카드 */}
            {plannedSlots.map((f) => (
              <div
                key={f.key}
                aria-disabled="true"
                className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/60 p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                    <Boxes className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                  <p className="text-lg font-bold text-gray-400">{f.name[locale]}</p>
                </div>
                <p className="text-sm leading-relaxed text-gray-400 break-keep">{f.definition[locale]}</p>
                <span className="mt-4 inline-block rounded-full bg-gray-200 px-3 py-1 text-2xs font-bold text-gray-500">
                  {c.comingSoon}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-medium text-primary break-keep">{c.countNote}</p>
        </Container>
      </Section>

      {/* ── 매트릭스 — "읽는 법" 보조 자료 (하단 이동, ③1-4) ── */}
      <Section>
        <Container>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-keep mb-8">{c.matrixTitle}</h2>
          <FunctionModeMatrix locale={locale} />
          {/* 모드 유도 — 카드 대신 텍스트 링크 1줄(③1-1) */}
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
            <span className="font-medium">{c.modesLink}:</span>
            {MODE_ORDER.map((m) => (
              <Link
                key={m}
                href={localeHref(locale, MODE_HREF[m])}
                className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary-dark transition-colors no-underline"
              >
                {productPrimary(m)}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            ))}
          </p>
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

          {/* 하단 상담 CTA 1개 — dead-end 해소(§2-1 병합: 허브는 라우팅 집중 + 상담 1개만) */}
          <MidCta
            locale={locale}
            lead={c.consultLead}
            label={c.consultLabel}
            href={contactEnterpriseHref('functions')}
            className="mt-14"
          />
        </Container>
      </Section>
    </>
  );
}
