import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, ShieldCheck, Clock } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import TrustStrip from '@/components/corporate/TrustStrip';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { MODE_ORDER } from '@/lib/brand-canon';
import { MODE_COPY, MATRIX_COPY } from '@/data/function-matrix-i18n';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import { TOOL_COPY, TOOL_SECTIONS, TOOL_EXTRA, TOOL_CTA, type ToolKey } from '@/data/tool-pages-i18n';

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
    ko: { waiting: '대기 인원', minutes: '예상 대기', people: '4명', mins: '6분', peak: '요일별 혼잡 피크', signage: '예상 대기 약 6분 · 잠시만 기다려 주세요', signageLabel: '고객 안내 사이니지' },
    en: { waiting: 'People waiting', minutes: 'Est. wait', people: '4', mins: '6 min', peak: 'Crowding peak by day', signage: 'About 6 min wait · thanks for your patience', signageLabel: 'Customer signage' },
    jp: { waiting: '待ち人数', minutes: '予想待ち', people: '4人', mins: '6分', peak: '曜日別の混雑ピーク', signage: '予想待ち 約6分 · 少々お待ちください', signageLabel: '顧客案内サイネージ' },
  },
  pop: {
    ko: { attention: '주목', conversion: '전환', a: 'POP A · 게시됨', b: 'POP B · 가려짐', c: 'POP C · 훼손' },
    en: { attention: 'Attention', conversion: 'Conversion', a: 'POP A · up', b: 'POP B · hidden', c: 'POP C · damaged' },
    jp: { attention: '注目', conversion: '転換', a: 'POP A · 掲出', b: 'POP B · 隠れ', c: 'POP C · 破損' },
  },
  fit: {
    ko: { score: '적합도', saw: '본 사람', pick: '집음', buy: '구매', trend: '외부 트렌드 신호', trendVal: '수제 약과 · 급상승', roadmap: '로드맵' },
    en: { score: 'Fit score', saw: 'Saw it', pick: 'Picked up', buy: 'Bought', trend: 'External trend signal', trendVal: 'Artisan snacks · rising', roadmap: 'roadmap' },
    jp: { score: '適合度', saw: '見た人', pick: '手に取る', buy: '購入', trend: '外部トレンド信号', trendVal: '手作り和菓子 · 急上昇', roadmap: 'ロードマップ' },
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
        {/* ③2-1 고객 경험: 고객 대면 디지털 사이니지 — 운영 지표(위 카드)와 시각 구분 */}
        <p className="mt-4 mb-1.5 text-3xs font-semibold uppercase tracking-wider text-gray-400">{m.signageLabel}</p>
        <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-center">
          <Clock className="h-4 w-4 text-primary-light shrink-0" aria-hidden="true" />
          <span className="text-sm font-bold text-white break-keep">{m.signage}</span>
        </div>
        <p className="mt-5 mb-2 text-2xs font-medium text-gray-500">{m.peak}</p>
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
      {/* ③4-1: 외부 트렌드 신호 미니 카드 — 현재 역량(적합도)과 시각 구분 위해 roadmap 배지 */}
      <div className="mb-3 flex items-center justify-between gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          {m.trend}
        </span>
        <span className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-800 tabular-nums">{m.trendVal}</span>
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-2xs font-bold uppercase tracking-wide text-gray-500">{m.roadmap}</span>
        </span>
      </div>
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
  const cta = TOOL_CTA[tool];
  const extras = TOOL_EXTRA[tool][locale];

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
          {/* Hero 이중 CTA(③0-A·7.5): 메인=맥락형 전환 + 보조=페이지 내 앵커(이탈 대신 하단 탐색) */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            {cta.mainHref.startsWith('http') ? (
              <a href={cta.mainHref} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg inline-flex items-center gap-2">
                {cta.main[locale]}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            ) : (
              <Link href={localeHref(locale, cta.mainHref)} className="btn-primary btn-lg inline-flex items-center gap-2">
                {cta.main[locale]}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            )}
            <a href="#what" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              {s.what}
              <ArrowRight className="w-4 h-4 rotate-90" aria-hidden="true" />
            </a>
          </div>
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
      <Section variant="alt" id="what">
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

      {/* ── ④.5 페이지별 핵심 블록 (③2-1·3-1·4-1) — 의사결정/경험·제작→측정 루프·신호원·발주 제안 ── */}
      <Section variant="default" pad="compact">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {extras.map((x) => (
              <div key={x.title} className="rounded-2xl border border-primary/15 bg-primary-lighter/20 p-7">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h2 className="text-base font-bold text-gray-900 break-keep">{x.title}</h2>
                  {x.badge && (
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-2xs font-semibold text-gray-500">{x.badge}</span>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed break-keep">{x.body}</p>
                {x.links && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {x.links.map((lk) => {
                      const external = lk.href.startsWith('http');
                      const cls = 'inline-flex items-center gap-1 rounded-lg border border-primary/25 bg-white px-3 py-1.5 text-xs font-semibold text-primary hover:border-primary transition-colors no-underline';
                      return external ? (
                        <a key={lk.label} href={lk.href} target="_blank" rel="noopener noreferrer" className={cls}>
                          {lk.label}
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link key={lk.label} href={localeHref(locale, lk.href)} className={cls}>
                          {lk.label}
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
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

      {/* ── ⑦ 증거 밴드 (③0-A: CTA 직전 신뢰 보강 — 각 페이지 증거 블록 1개 필수) ── */}
      <Section variant="default" pad="compact">
        <Container>
          <TrustStrip locale={locale} tone="light" className="mx-auto max-w-3xl" />
        </Container>
      </Section>

      {/* ── ⑧ Connect · CTA — 반론해소(프라이버시 재확인) 직후 맥락형 CTA(D4) + 옆길 순환 ── */}
      <AnimatedSection className="py-14 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {t.privacy}
          </p>
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {cta.mainHref.startsWith('http') ? (
              <a href={cta.mainHref} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg inline-flex items-center gap-2">
                {cta.main[locale]}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            ) : (
              <Link href={localeHref(locale, cta.mainHref)} className="btn-primary btn-lg inline-flex items-center gap-2">
                {cta.main[locale]}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            )}
            {cta.secondary && (
              <Link
                href={localeHref(locale, cta.secondary.href)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:border-primary-light transition-colors no-underline"
              >
                {cta.secondary.label[locale]}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            )}
          </div>
          <Eyebrow className="mb-6 justify-center">{s.connect}</Eyebrow>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {t.connect.filter((c) => c.href !== '/contact').map((c) => (
              <Link
                key={c.label}
                href={localeHref(locale, c.href)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:border-primary-light transition-colors no-underline"
              >
                {c.label}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            ))}
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
