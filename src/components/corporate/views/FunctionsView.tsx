import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import FunctionModeMatrix from '@/components/corporate/FunctionModeMatrix';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { MODE_ORDER, productPrimary } from '@/lib/brand-canon';
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

/** Functions that currently own a page of their own. */
const FUNCTION_LINKS: Partial<Record<string, string>> = {
  count: '/products/saai-count',
};

const MODE_HREF = {
  care: '/products/saai-care',
  insight: '/products/saai-insight',
  agent: '/products/saai-agent',
} as const;

export default function FunctionsView({ locale }: { locale: Locale }) {
  const c = FUNCTIONS_PAGE_COPY[locale];
  const modes = MODE_COPY[locale];

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
                <p className="text-2xs font-mono font-medium uppercase tracking-wide text-gray-400">
                  {modes[m].mode} · {modes[m].tense}
                </p>
                <p className="mt-1 text-lg font-bold text-gray-900">{productPrimary(m)}</p>
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
          {FUNCTION_LINKS.count && (
            <Link
              href={localeHref(locale, FUNCTION_LINKS.count)}
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary"
            >
              store count
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
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
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
