import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { MODE_ORDER } from '@/lib/brand-canon';
import { MODE_COPY, MATRIX_COPY } from '@/data/function-matrix-i18n';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import { TOOL_COPY, TOOL_SECTIONS, type ToolKey } from '@/data/tool-pages-i18n';

/**
 * FunctionToolView — the standard skeleton for an individual function tool
 * (기능페이지 작업문서 v1 §3–§5): hero → limits → solution → what → 3-mode strip →
 * mockup → connect·CTA. Driven by TOOL_COPY; the 3-mode strip reuses MATRIX_COPY so it
 * cannot drift from the library matrix. Mockup numbers are illustrative (예시).
 */

const HREF: Record<ToolKey, string> = {
  queue: '/products/store-queue',
  pop: '/products/store-pop',
  fit: '/products/store-fit',
};

/** Lightweight, self-contained mockup labels per tool per locale. */
const MOCK: Record<ToolKey, Record<Locale, Record<string, string>>> = {
  queue: {
    ko: { waiting: '대기 인원', minutes: '예상 대기', people: '4명', mins: '6분', peak: '요일별 혼잡 피크' },
    en: { waiting: 'People waiting', minutes: 'Est. wait', people: '4', mins: '6 min', peak: 'Crowding peak by day' },
    jp: { waiting: '待ち人数', minutes: '予想待ち', people: '4人', mins: '6分', peak: '曜日別の混雑ピーク' },
  },
  pop: {
    ko: { attention: '주목', conversion: '전환', a: 'POP A · 게시됨', b: 'POP B · 가려짐', c: 'POP C · 훼손' },
    en: { attention: 'Attention', conversion: 'Conversion', a: 'POP A · up', b: 'POP B · hidden', c: 'POP C · damaged' },
    jp: { attention: '注目', conversion: '転換', a: 'POP A · 掲出', b: 'POP B · 隠れ', c: 'POP C · 破損' },
  },
  fit: {
    ko: { score: '적합도', saw: '본 사람', pick: '집음', buy: '구매' },
    en: { score: 'Fit score', saw: 'Saw it', pick: 'Picked up', buy: 'Bought' },
    jp: { score: '適合度', saw: '見た人', pick: '手に取る', buy: '購入' },
  },
};

function ToolMockup({ tool, locale }: { tool: ToolKey; locale: Locale }) {
  const m = MOCK[tool][locale];
  if (tool === 'queue') {
    const bars = [40, 55, 48, 70, 92, 100, 62];
    return (
      <div>
        <div className="flex gap-3">
          <div className="flex-1 rounded-xl border border-primary/20 bg-primary-lighter/50 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-primary font-mono leading-none">{m.people}</p>
            <p className="mt-2 text-2xs text-primary/80">{m.waiting}</p>
          </div>
          <div className="flex-1 rounded-xl border border-gray-100 bg-slate-50 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 font-mono leading-none">{m.mins}</p>
            <p className="mt-2 text-2xs text-gray-500">{m.minutes}</p>
          </div>
        </div>
        <p className="mt-5 mb-2 text-2xs font-medium text-gray-400">{m.peak}</p>
        <div className="flex items-end gap-1.5 h-20">
          {bars.map((h, i) => (
            <div key={i} className={`flex-1 rounded-t ${h >= 92 ? 'bg-primary' : 'bg-primary/30'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    );
  }
  if (tool === 'pop') {
    return (
      <div>
        <div className="flex gap-3">
          <div className="flex-1 rounded-xl border border-gray-100 bg-slate-50 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 font-mono leading-none">62%</p>
            <p className="mt-2 text-2xs text-gray-500">{m.attention}</p>
          </div>
          <div className="flex-1 rounded-xl border border-primary/20 bg-primary-lighter/50 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-primary font-mono leading-none">8%</p>
            <p className="mt-2 text-2xs text-primary/80">{m.conversion}</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {[{ t: m.a, ok: true }, { t: m.b, ok: false }, { t: m.c, ok: false }].map((r) => (
            <li key={r.t} className="flex items-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-2 text-sm text-gray-700">
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${r.ok ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                {r.ok ? <Check className="h-2.5 w-2.5" aria-hidden="true" /> : <span className="block h-1.5 w-1.5 rounded-full bg-current" />}
              </span>
              {r.t}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // fit
  const funnel = [{ label: m.saw, value: '320' }, { label: m.pick, value: '96' }, { label: m.buy, value: '41' }];
  return (
    <div>
      <div className="rounded-xl border border-primary/20 bg-primary-lighter/40 p-5 text-center">
        <p className="text-4xl font-bold text-primary font-mono leading-none">78<span className="text-lg text-primary/50"> / 100</span></p>
        <p className="mt-2 text-2xs text-primary/80">{m.score}</p>
      </div>
      <div className="mt-4 flex items-end gap-2">
        {funnel.map((f, i) => (
          <div key={f.label} className="flex-1 text-center">
            <div className="flex h-16 items-end justify-center">
              <div className="w-full rounded-t-md bg-primary/70" style={{ height: `${[100, 45, 22][i]}%` }} />
            </div>
            <p className="mt-2 text-sm font-bold text-gray-900 font-mono">{f.value}</p>
            <p className="text-2xs text-gray-500">{f.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FunctionToolView({ tool, locale }: { tool: ToolKey; locale: Locale }) {
  const t = TOOL_COPY[tool][locale];
  const s = TOOL_SECTIONS[locale];
  const modes = MODE_COPY[locale];
  const cells = MATRIX_COPY[locale][tool];

  return (
    <>
      <JsonLd data={softwareApplication({ name: `store ${tool}`, description: t.sub, path: HREF[tool], locale })} />

      {/* ── ① Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[26rem] h-[26rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-14 lg:pt-36 text-center">
          <Breadcrumb
            items={[
              { name: crumb('products', locale), path: '/products' },
              { name: s.backToLibrary, path: '/products/functions' },
            ]}
            locale={locale}
            tone="light"
            className="mb-6 justify-center"
          />
          <p className="text-sm font-medium text-primary mb-4 tracking-wide">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-5 font-display">
            <WordRise text={t.h1} />
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto break-keep mb-4">{t.sub}</p>
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {t.privacy}
          </p>
        </div>
      </section>

      {/* ── ② Limits · ③ Solution ── */}
      <AnimatedSection className="py-16 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-7">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{s.limits}</p>
            <p className="text-gray-600 leading-relaxed break-keep">{t.limits}</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary-lighter/30 p-7">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">{s.solution}</p>
            <p className="text-gray-700 leading-relaxed break-keep">{t.solution}</p>
          </div>
        </div>
      </AnimatedSection>

      {/* ── ④ What you learn ── */}
      <Section variant="alt">
        <Container>
          <div className="mb-8 max-w-2xl">
            <Eyebrow className="mb-4">{s.what}</Eyebrow>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.what.map((w) => (
              <li key={w} className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm font-medium text-gray-700 break-keep">
                {w}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── ⑤ Through the three modes (from MATRIX_COPY) ── */}
      <Section variant="default">
        <Container>
          <div className="mb-8 max-w-2xl">
            <Eyebrow className="mb-4">{s.modes}</Eyebrow>
            <p className="text-gray-500 break-keep">{s.modesSub}</p>
          </div>
          <ul className="grid gap-5 lg:grid-cols-3">
            {MODE_ORDER.map((mode) => (
              <li key={mode} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-sm font-bold text-gray-900">{modes[mode].name}</span>
                  <span className="text-2xs font-mono text-primary">{modes[mode].mode} · {modes[mode].tense}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed break-keep">{cells[mode]}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── ⑥ Mockup (예시) ── */}
      <Section variant="alt">
        <Container>
          <div className="mb-8 max-w-2xl">
            <Eyebrow className="mb-4">{s.demo}</Eyebrow>
          </div>
          <div className="mx-auto max-w-lg rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-card">
            <div className="mb-5 flex justify-end">
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-2xs font-medium text-gray-500">{s.example}</span>
            </div>
            <ToolMockup tool={tool} locale={locale} />
          </div>
        </Container>
      </Section>

      {/* ── ⑧ Connect · CTA ── */}
      <AnimatedSection className="py-14 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Eyebrow className="mb-6 justify-center">{s.connect}</Eyebrow>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {t.connect.map((c) => {
              const isCta = c.href === '/contact';
              return (
                <Link
                  key={c.label}
                  href={localeHref(locale, c.href)}
                  className={isCta
                    ? 'btn-primary btn-lg inline-flex items-center gap-2'
                    : 'inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:border-primary-light transition-colors no-underline'}
                >
                  {c.label}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
          <Link
            href={localeHref(locale, '/products/functions')}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-primary transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {s.backToLibrary}
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}
