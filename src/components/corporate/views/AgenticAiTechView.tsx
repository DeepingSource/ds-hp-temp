'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  ShieldCheck,
  Compass,
  Network,
  Repeat,
  UserCheck,
  Quote,
  Bell,
  ArrowRight,
  Cpu,
  Layers,
  BrainCircuit,
  CheckCircle2,
} from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import siteContent from '@/data/generated/site-content.json';
import MidCta from '@/components/corporate/MidCta';

const AutonomyLadderTimeline = dynamic(() => import('@/components/mockups/AutonomyLadderTimeline'), {
  loading: () => <div className="h-[320px] animate-pulse rounded-2xl bg-gray-100" />,
});

const PosJoinDiagram = dynamic(() => import('@/components/mockups/PosJoinDiagram'), {
  loading: () => <div className="h-48 animate-pulse rounded-2xl bg-gray-100" />,
});

const LearningFlywheelDiagram = dynamic(() => import('@/components/mockups/LearningFlywheelDiagram'), {
  loading: () => <div className="h-[360px] animate-pulse rounded-2xl bg-slate-900" />,
});

// FunctionsView에서 이관(③1-3): "신호 입력 → 점수화 → 분류 → Top 3" 우선순위 엔진은
// agentic AI가 신호를 액션으로 바꾸는 과정의 예시 — 기술 서사(이 페이지)에 속한다.
const PriorityEngineDiagram = dynamic(
  () => import('@/components/mockups/PriorityEngineDiagram'),
  {
    /* Viewport 예외 목업(고정 캔버스 없음) — 대략 높이 예약, 정확 비율 아님 */
    loading: () => <div className="h-[520px] animate-pulse rounded-2xl bg-gray-100 sm:h-[440px]" />,
  }
);

/** 이관 카피(③1-3) — "표가 작동하는 모습"에서 "신호가 액션이 되는 방식"으로 톤 조정. */
const ENGINE_COPY: Record<Locale, { eyebrow: string; heading: string; sub: string }> = {
  ko: {
    eyebrow: '우선순위 엔진',
    heading: '신호가 액션이 되는 방식',
    sub: '기능들이 모은 신호가 점수화·분류를 거쳐 상위 3개 액션으로 압축됩니다 — 에이전트가 판단을 내리는 우선순위 엔진의 예시입니다.',
  },
  en: {
    eyebrow: 'Priority engine',
    heading: 'How signals become actions',
    sub: 'Signals collected by the functions are scored, classified, and compressed into a top-3 shortlist — the priority engine behind the agent’s judgement.',
  },
  jp: {
    eyebrow: '優先順位エンジン',
    heading: 'シグナルがアクションになる仕組み',
    sub: '機能が集めたシグナルはスコア化・分類を経て上位3件のアクションに圧縮されます — エージェントの判断を支える優先順位エンジンの例です。',
  },
};

/** 다매장 정규화 서사(②4-3) — 신규 블록 인라인 카피(추후 CMS 이관 가능). */
const NORMALIZE_COPY: Record<Locale, { heading: string; body: string; stores: [string, string, string]; schema: string }> = {
  ko: {
    heading: '다매장을 하나의 기준으로 — 온톨로지가 정규화합니다',
    body: '같은 진열대·같은 동선 개념이 매장 A와 매장 B에서 같은 좌표계·같은 정의로 매핑됩니다. 그래서 프랜차이즈 전 매장을 같은 기준으로 읽고, 한 매장에서 통한 판단을 다른 매장으로 옮길 수 있습니다.',
    stores: ['매장 A', '매장 B', '매장 C'],
    schema: '공통 스키마 · 같은 좌표계, 같은 정의',
  },
  en: {
    heading: 'Many stores, one standard — the ontology normalizes them',
    body: 'The same shelf and the same journey concept map to the same coordinates and definitions in store A and store B. That is what lets a franchise read every store by one standard — and carry a judgement that worked in one store to another.',
    stores: ['Store A', 'Store B', 'Store C'],
    schema: 'One shared schema · same coordinates, same definitions',
  },
  jp: {
    heading: '多店舗を一つの基準へ — オントロジーが正規化します',
    body: '同じ陳列棚・同じ動線の概念が、店舗Aと店舗Bで同じ座標系・同じ定義にマッピングされます。だからフランチャイズ全店舗を同じ基準で読み、1店舗で通用した判断を他店舗へ移せます。',
    stores: ['店舗A', '店舗B', '店舗C'],
    schema: '共通スキーマ · 同じ座標系、同じ定義',
  },
};

/** 3층 스택(②4-2) — heroNote의 "익명화 위에 공간 지능, 그 위에 에이전트"를 그림으로. */
const STACK_LAYERS: Record<Locale, [string, string, string]> = {
  ko: ['에이전트 AI — 판단·제안', '공간 지능 — 좌표·동선', '익명화 — 모든 것의 시작'],
  en: ['Agentic AI — judgement & suggestions', 'Spatial AI — coordinates & journeys', 'Anonymization — where everything begins'],
  jp: ['エージェントAI — 判断・提案', '空間知能 — 座標・動線', '匿名化 — すべての始まり'],
};

/**
 * AgenticAiTechView — the "Why & How" half of the Agentic AI ↔ saai agent pair
 * (PLAN_SA_AGENTIC_ROLES_v2 §2). This page carries background, principles and
 * baseline ONLY; product screens and feature scenarios belong to
 * /products/saai-agent and must not be reintroduced here.
 *
 * Copy lives in the CMS (content/site/agentic-ai.yaml → generated JSON). Icons,
 * links and the L0→L5 level labels stay in code and are merged by array order,
 * so reordering the CMS arrays reorders the icons too.
 */

type Item = { title: string; desc: string };
type Baseline = Item & { linkLabel: string };
type Rung = { label: string; line: string };

type AgenticCopy = {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  heroNote: string;
  problemEyebrow: string;
  problemTitle: string;
  problemSub: string;

  differentiatorEyebrow?: string;
  differentiatorHeading?: string;
  differentiatorBody1?: string;
  differentiatorBody2?: string;
  differentiatorBody3?: string;
  differentiatorBody4?: string;
  /** 3기둥 카드 문구 — 제목은 코드(PILLAR_STRUCT), 설명/푸터만 CMS. */
  pillars?: { desc: string; footer: string }[];

  philosophyEyebrow: string;
  philosophyHeading: string;
  philosophySub: string;
  philosophy: Item[];
  baselineEyebrow: string;
  baselineHeading: string;
  baselineSub: string;
  baseline: Baseline[];
  linkedSourcesLabel: string;
  linkedSources: { label: string }[];
  ladderEyebrow: string;
  ladderHeading: string;
  ladderSub: string;
  ladderNote: string;
  ladder: Rung[];
  bridgeEyebrow: string;
  bridgeHeading: string;
  bridgeSub: string;
  bridgeCta: string;
  bridgeCtaSecondary: string;
};

const AA = siteContent.agenticAi as Record<Locale, AgenticCopy>;

/** Order matches content/site/agentic-ai.yaml `philosophy`. */
const PHILOSOPHY_ICONS = [UserCheck, Quote, Bell] as const;

/** Order matches `baseline`. `href` null = no detail page to link to. */
/** Order matches content/site/agentic-ai.yaml `pillars`. Titles are proper nouns. */
// 1-키워드 배지(②4-1) — 기둥의 역할을 한 단어로 못박는다.
const PILLAR_STRUCT = [
  { title: 'Harness', icon: Cpu, badge: { ko: 'Guardrails', en: 'Guardrails', jp: 'Guardrails' } },
  { title: 'Ontology', icon: Layers, badge: { ko: 'Domain KG', en: 'Domain KG', jp: 'Domain KG' } },
  { title: 'Domain Knowledge', icon: BrainCircuit, badge: { ko: '현장 지식', en: 'Field knowledge', jp: '現場知識' } },
] as const;

const BASELINE_STRUCT = [
  { icon: ShieldCheck, href: '/technology/anonymizer' },
  { icon: Compass, href: '/technology/spatial-ai' },
  { icon: Network, href: null },
  { icon: Repeat, href: '/products/saai-agent' },
] as const;

export default function AgenticAiTechView({ locale }: { locale: Locale }) {
  const t = AA[locale];

  return (
    <>
      {/* ── Beat 1 — Hero: the background question ── */}
      <section className="section-dark noise-overlay relative overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-28">
        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { name: crumb('technology', locale), path: '/technology' },
              { name: 'Agentic AI', path: '/technology/agentic-ai' },
            ]}
            locale={locale}
            tone="dark"
            className="mb-6"
          />
          <div className="max-w-4xl">
            <Eyebrow tone="light" className="mb-5">{t.eyebrow}</Eyebrow>
            <h1 className="font-display mb-6 text-4xl font-bold leading-tight tracking-tight break-keep text-white sm:text-5xl lg:text-6xl">
              <WordRise text={t.heroTitle} />
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed break-keep text-slate-300 sm:text-xl">
              {t.heroSub}
            </p>
            {/* 3층 스택 시각화(②4-2) — heroNote 텍스트를 그림으로: 위에서부터 에이전트 ← 공간 ← 익명화 */}
            <div className="mt-8 max-w-md">
              <ol className="space-y-1.5" aria-label={t.heroNote}>
                {STACK_LAYERS[locale].map((layer, i) => (
                  <li
                    key={layer}
                    className={`rounded-xl border px-4 py-2.5 text-sm font-semibold break-keep ${
                      i === 0
                        ? 'border-primary/50 bg-primary/15 text-white'
                        : i === 1
                        ? 'ml-3 border-white/20 bg-white/8 text-slate-200'
                        : 'ml-6 border-white/15 bg-white/5 text-slate-300'
                    }`}
                  >
                    {layer}
                  </li>
                ))}
              </ol>
              <p className="mt-3 border-l-2 border-primary/50 pl-4 text-sm leading-relaxed break-keep text-slate-400">
                {t.heroNote}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Beat 2 — Background: why a dashboard is not enough ── */}
      <Section variant="default" pad="default">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-3">{t.problemEyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-bold break-keep text-gray-900 sm:text-4xl">
              {t.problemTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed break-keep text-gray-600 sm:text-lg">
              {t.problemSub}
            </p>
          </div>
        </Container>
      </Section>

      {/* ── Beat 3 — The three principles (차별점보다 앞 — 신념 먼저, ②4-4) ── */}
      <Section variant="alt" pad="default">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-3">{t.philosophyEyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-bold break-keep text-gray-900 sm:text-4xl">
              {t.philosophyHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed break-keep text-gray-600">
              {t.philosophySub}
            </p>
          </div>

          <ol className="mt-14 grid gap-6 lg:grid-cols-3">
            {t.philosophy.map((p, i) => {
              const Icon = PHILOSOPHY_ICONS[i] ?? UserCheck;
              return (
                <li
                  key={p.title}
                  className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="rounded-xl bg-primary/10 p-2.5 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-bold tracking-wider text-gray-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold break-keep text-gray-900">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed break-keep text-gray-600">{p.desc}</p>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* ── Beat 2.5 — Differentiator: why our agent excels is not the LLM ── */}
      {t.differentiatorHeading && (
        <Section variant="default" pad="default">
          <Container>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Eyebrow tone="primary" className="mb-3">{t.differentiatorEyebrow ?? '차별점'}</Eyebrow>
              <h2 className="font-display text-3xl font-bold break-keep text-gray-900 sm:text-4xl mb-4">
                {t.differentiatorHeading}
              </h2>
              <p className="text-lg font-semibold text-primary break-keep">
                {t.differentiatorBody1}
              </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-6 text-base text-gray-600 leading-relaxed break-keep">
              <p>{t.differentiatorBody2}</p>
              <p>{t.differentiatorBody3}</p>
              <p className="font-medium text-gray-900">{t.differentiatorBody4}</p>
            </div>

            {/* 3-Pillar Diagram (Harness · Ontology · Domain Knowledge).
                제목은 고유명이라 코드에 두고, 설명/푸터 문구는 CMS(pillars)에서 온다 —
                이전엔 한국어 하드코딩이라 en/jp 페이지에도 그대로 노출됐다. */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {(t.pillars ?? []).map((p, i) => {
                const s = PILLAR_STRUCT[i];
                if (!s) return null;
                const Icon = s.icon;
                return (
                  <div key={s.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-bold text-gray-900">{s.title}</h3>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-2xs font-bold text-primary">
                          {s.badge[locale]}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed break-keep">{p.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-2xs text-primary font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="break-keep">{p.footer}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── 다매장 정규화(②4-3) — 온톨로지가 왜 중요한가의 최강 근거 ── */}
            <div className="mt-14 mx-auto max-w-4xl rounded-3xl border border-primary/15 bg-white p-8 lg:p-10 shadow-card">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 break-keep">
                {NORMALIZE_COPY[locale].heading}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-keep mb-8">
                {NORMALIZE_COPY[locale].body}
              </p>
              {/* 미니 다이어그램: 매장 3개 → 공통 스키마 수렴 */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex flex-wrap justify-center gap-3">
                  {NORMALIZE_COPY[locale].stores.map((store) => (
                    <span key={store} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">
                      {store}
                    </span>
                  ))}
                </div>
                <span className="text-primary font-bold" aria-hidden="true">↓</span>
                <span className="rounded-xl border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-bold text-primary break-keep text-center">
                  {NORMALIZE_COPY[locale].schema}
                </span>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ── Beat 4 — Baseline: what makes the principles hold ── */}
      <Section variant="alt" pad="default">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-3">{t.baselineEyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-bold break-keep text-gray-900 sm:text-4xl">
              {t.baselineHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed break-keep text-gray-600">
              {t.baselineSub}
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {t.baseline.map((b, i) => {
              const s = BASELINE_STRUCT[i];
              const Icon = s?.icon ?? Network;
              return (
                <div
                  key={b.title}
                  className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
                >
                  <div>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="rounded-xl bg-primary/10 p-2.5 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-bold break-keep text-gray-900">{b.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed break-keep text-gray-600">{b.desc}</p>
                  </div>

                  {/* Task 3-2: The "connected data" card integrates PosJoinDiagram */}
                  {s?.href === null && (
                    <div className="mt-5 border-t border-gray-100 pt-5">
                      <p className="mb-3 text-xs font-semibold text-gray-500">
                        {t.linkedSourcesLabel}
                      </p>
                      <ul className="flex flex-wrap gap-2 mb-4">
                        {t.linkedSources.map((src) => (
                          <li
                            key={src.label}
                            className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
                          >
                            {src.label}
                          </li>
                        ))}
                      </ul>

                      {/* PosJoinDiagram component */}
                      <PosJoinDiagram locale={locale} className="mt-2" />
                    </div>
                  )}

                  {s?.href && (
                    <Link
                      href={localeHref(locale, s.href)}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      {b.linkLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Task 3-4: Compounding Loop (LearningFlywheelDiagram) */}
          <div className="mt-16">
            <LearningFlywheelDiagram locale={locale} />
          </div>
        </Container>
      </Section>

      {/* ── Beat 4.5 — Priority engine (③1-3 이관): 신호가 액션이 되는 방식 ── */}
      <Section variant="default" pad="default">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-10">
            <Eyebrow className="mb-3">{ENGINE_COPY[locale].eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-bold break-keep text-gray-900 sm:text-4xl">
              {ENGINE_COPY[locale].heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed break-keep text-gray-600">
              {ENGINE_COPY[locale].sub}
            </p>
          </div>
          <PriorityEngineDiagram locale={locale} />

          {/* 미드 CTA(②A-3) — 본문 약 60% 지점, 판단 메커니즘을 본 직후 */}
          <MidCta
            locale={locale}
            product="agentic-ai"
            className="mt-14"
            lead={
              locale === 'ko'
                ? '지금 있는 CCTV로 가능한지부터 — 기술 팀이 직접 확인해 드립니다.'
                : locale === 'jp'
                ? '今あるCCTVで可能かどうかから — 技術チームが直接ご確認します。'
                : 'Start by checking whether your existing CCTV is enough — our technical team will verify directly.'
            }
          />
        </Container>
      </Section>

      {/* ── Beat 5 — The autonomy ladder (signature section with AutonomyLadderTimeline) ── */}
      <Section variant="alt" pad="default">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-3">{t.ladderEyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-bold break-keep text-gray-900 sm:text-4xl">
              {t.ladderHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed break-keep text-gray-600">{t.ladderSub}</p>
          </div>

          {/* Task 3-1: Replaced static grid with AutonomyLadderTimeline and footnote override */}
          <div className="mt-14">
            <AutonomyLadderTimeline
              locale={locale}
              content={{ footnote: t.ladderNote }}
            />
          </div>
        </Container>
      </Section>

      {/* ── Beat 6 — Hand off to the product ── */}
      <Section variant="dark" pad="default">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="light" className="mb-3">{t.bridgeEyebrow}</Eyebrow>
            <h2 className="font-display text-3xl font-bold break-keep text-white sm:text-4xl">
              {t.bridgeHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed break-keep text-slate-300">
              {t.bridgeSub}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={localeHref(locale, '/contact')}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
              >
                {t.bridgeCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={localeHref(locale, '/products/saai-agent')}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {t.bridgeCtaSecondary}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
