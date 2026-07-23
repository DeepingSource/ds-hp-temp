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

const AutonomyLadderTimeline = dynamic(() => import('@/components/mockups/AutonomyLadderTimeline'), {
  loading: () => <div className="h-[320px] animate-pulse rounded-2xl bg-gray-100" />,
});

const PosJoinDiagram = dynamic(() => import('@/components/mockups/PosJoinDiagram'), {
  loading: () => <div className="h-48 animate-pulse rounded-2xl bg-gray-100" />,
});

const LearningFlywheelDiagram = dynamic(() => import('@/components/mockups/LearningFlywheelDiagram'), {
  loading: () => <div className="h-[360px] animate-pulse rounded-2xl bg-slate-900" />,
});

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
const PILLAR_STRUCT = [
  { title: 'Harness', icon: Cpu },
  { title: 'Ontology', icon: Layers },
  { title: 'Domain Knowledge', icon: BrainCircuit },
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
            <p className="mt-6 border-l-2 border-primary/50 pl-4 text-sm leading-relaxed break-keep text-slate-400">
              {t.heroNote}
            </p>
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

      {/* ── Beat 2.5 — Differentiator: why our agent excels is not the LLM ── */}
      {t.differentiatorHeading && (
        <Section variant="alt" pad="default">
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
                      <h3 className="text-base font-bold text-gray-900 mb-2">{s.title}</h3>
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
          </Container>
        </Section>
      )}

      {/* ── Beat 3 — The three principles ── */}
      <Section variant="default" pad="default">
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

      {/* ── Beat 5 — The autonomy ladder (signature section with AutonomyLadderTimeline) ── */}
      <Section variant="default" pad="default">
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
                href={localeHref(locale, '/products/saai-agent')}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
              >
                {t.bridgeCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={localeHref(locale, '/contact')}
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
