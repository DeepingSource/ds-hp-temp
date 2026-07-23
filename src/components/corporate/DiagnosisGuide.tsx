'use client';

import { useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { industryList, industryColorMap } from '@/data/industryList';
import { solutionsBySlug, type SolutionPage } from '@/data/solutionsData';
import { industryLabelI18n, solutionCardI18n, solutionDetailI18n } from '@/data/solutions-i18n';
import { localeHref, type Locale } from '@/lib/i18n';
import {
  getClustersForIndustry,
  industryHasSolutions,
  type ClusterOption,
} from '@/data/diagnosisData';
import {
  DIAGNOSIS_UI,
  PERSONA_OPTIONS,
  Q3_UNIVERSAL_OPTIONS,
  Q3_CLUSTER_LABEL,
  TIEBREAK_QUESTIONS,
  EXIT_OWNER,
  EXIT_PRIVACY,
  EXIT_UNSURE,
  type PersonaId,
} from '@/data/diagnosis-i18n';
import Card from '@/components/ui/Card';
import RelatedGlossary from '@/components/corporate/RelatedGlossary';

/**
 * DiagnosisGuide — the interactive Q&A for /solutions/diagnosis.
 *
 * Shape: an adaptive 3–4 question flow (role → industry → problem → optional
 * tiebreak) that resolves to one of the 21 content/solutions/*.yaml scenarios,
 * reusing the exact same data the /solutions explorer and /solutions/[slug] pages
 * already render from (solutionsData / solutionCardI18n / solutionDetailI18n) —
 * no new content is authored here, only the question flow and result-card shell.
 *
 * "Diagnosis," not "game": per SAAI_AI_Handoff.md (Quiet Utility, no marketing
 * tone, no inflated adjectives), the guessing-game shape stays but the voice
 * doesn't — no playful reveal copy, results lead with the problem statement and
 * cite the same figures the detail page shows.
 */

type Step = 'q1' | 'q2' | 'q3' | 'q4' | 'result' | 'exit-owner' | 'exit-privacy' | 'exit-unsure';

export default function DiagnosisGuide({ locale }: { locale: Locale }) {
  const ui = DIAGNOSIS_UI[locale];
  const isKo = locale === 'ko';

  const [step, setStep] = useState<Step>('q1');
  const [industry, setIndustry] = useState<string | null>(null);
  const [cluster, setCluster] = useState<ClusterOption | null>(null);
  const [resultSlug, setResultSlug] = useState<string | null>(null);

  const availableIndustries = useMemo(
    () => industryList.filter((ind) => industryHasSolutions(ind.slug)),
    [],
  );
  const clusters = industry ? getClustersForIndustry(industry) : [];

  const indLabel = (slug: string, fallback: string) =>
    isKo ? fallback : (industryLabelI18n[slug]?.[locale] ?? fallback);

  function selectPersona(id: PersonaId) {
    if (id === 'owner') {
      setStep('exit-owner');
      return;
    }
    setStep('q2');
  }
  function selectIndustry(slug: string) {
    setIndustry(slug);
    setStep('q3');
  }
  function selectUniversal(id: 'privacy' | 'unsure') {
    setStep(id === 'privacy' ? 'exit-privacy' : 'exit-unsure');
  }
  function selectCluster(c: ClusterOption) {
    if (c.slugs.length === 1) {
      setResultSlug(c.slugs[0]);
      setStep('result');
    } else {
      setCluster(c);
      setStep('q4');
    }
  }
  function selectTiebreak(slug: string) {
    setResultSlug(slug);
    setStep('result');
  }
  function restart() {
    setIndustry(null);
    setCluster(null);
    setResultSlug(null);
    setStep('q1');
  }
  function back() {
    switch (step) {
      case 'q2':
        setStep('q1');
        break;
      case 'q3':
        setStep('q2');
        break;
      case 'q4':
        setStep('q3');
        break;
      case 'result':
        setStep(cluster && cluster.slugs.length > 1 ? 'q4' : 'q3');
        break;
      case 'exit-owner':
        setStep('q1');
        break;
      case 'exit-privacy':
      case 'exit-unsure':
        setStep('q3');
        break;
    }
  }

  const stepNumber: Record<Step, number> = {
    q1: 1,
    q2: 2,
    q3: 3,
    q4: 4,
    result: cluster && cluster.slugs.length > 1 ? 4 : 3,
    'exit-owner': 1,
    'exit-privacy': 3,
    'exit-unsure': 3,
  };
  const totalSteps = step === 'q4' || (cluster && cluster.slugs.length > 1) ? 4 : 3;
  const showBack = step !== 'q1';
  const showChrome = !['result', 'exit-owner', 'exit-privacy', 'exit-unsure'].includes(step);
  const resultSol = resultSlug ? solutionsBySlug[resultSlug] : undefined;

  return (
    <>
    <Card className="p-6 sm:p-10">
      {showChrome && (
        <div className="flex items-center justify-between mb-8">
          {showBack ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {ui.back}
            </button>
          ) : (
            <span />
          )}
          <span className="text-xs font-bold tabular-nums text-gray-300">
            {ui.stepLabel(stepNumber[step], totalSteps)}
          </span>
        </div>
      )}

      {step === 'q1' && (
        <QuestionBlock question={ui.q1Question}>
          {PERSONA_OPTIONS.map((opt) => (
            <OptionButton key={opt.id} onClick={() => selectPersona(opt.id)}>
              {opt.label[locale]}
            </OptionButton>
          ))}
        </QuestionBlock>
      )}

      {step === 'q2' && (
        <QuestionBlock question={ui.q2Question}>
          <div className="grid sm:grid-cols-2 gap-3">
            {availableIndustries.map((ind) => {
              const colors = industryColorMap[ind.color] ?? industryColorMap.slate;
              const Icon = ind.icon;
              return (
                <button
                  key={ind.slug}
                  type="button"
                  onClick={() => selectIndustry(ind.slug)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-colors cursor-pointer ${colors.border} ${colors.bg}`}
                >
                  <span className={`flex shrink-0 w-9 h-9 rounded-lg items-center justify-center bg-white/70 ${colors.text}`}>
                    <Icon className="w-4.5 h-4.5" aria-hidden="true" />
                  </span>
                  <span className={`font-bold text-sm ${colors.text}`}>{indLabel(ind.slug, ind.label)}</span>
                </button>
              );
            })}
          </div>
        </QuestionBlock>
      )}

      {step === 'q3' && industry && (
        <QuestionBlock question={ui.q3Question}>
          {clusters.map((c) => (
            <OptionButton key={c.key} onClick={() => selectCluster(c)}>
              {Q3_CLUSTER_LABEL[c.key]?.[locale] ?? c.clusterId}
            </OptionButton>
          ))}
          <div className="pt-2 mt-2 border-t border-gray-100 flex flex-col gap-2">
            {Q3_UNIVERSAL_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => selectUniversal(opt.id)}
                className="text-left text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer py-1"
              >
                {opt.label[locale]}
              </button>
            ))}
          </div>
        </QuestionBlock>
      )}

      {step === 'q4' && cluster && (
        <QuestionBlock question={TIEBREAK_QUESTIONS[cluster.key]?.question[locale] ?? ''}>
          {(TIEBREAK_QUESTIONS[cluster.key]?.options ?? []).map((opt) => (
            <OptionButton key={opt.slug} onClick={() => selectTiebreak(opt.slug)}>
              {opt.label[locale]}
            </OptionButton>
          ))}
        </QuestionBlock>
      )}

      {step === 'result' && resultSlug && (
        <ResultCard slug={resultSlug} locale={locale} onRestart={restart} />
      )}

      {step === 'exit-owner' && (
        <ExitBlock
          title={EXIT_OWNER[locale].title}
          body={EXIT_OWNER[locale].body}
          linkHref={localeHref(locale, '/products/saai-for-owners')}
          linkLabel={EXIT_OWNER[locale].linkLabel}
          secondaryLabel={EXIT_OWNER[locale].continueLabel}
          onSecondary={() => setStep('q2')}
        />
      )}

      {step === 'exit-privacy' && (
        <div className="space-y-8">
          <ExitBlock
            title={EXIT_PRIVACY[locale].title}
            body={EXIT_PRIVACY[locale].body}
            linkHref={localeHref(locale, '/technology/anonymizer')}
            linkLabel={EXIT_PRIVACY[locale].linkLabel}
            secondaryLabel={ui.restart}
            onSecondary={restart}
          />
        </div>
      )}

      {step === 'exit-unsure' && industry && (
        <ExitBlock
          title={EXIT_UNSURE[locale].title}
          body={EXIT_UNSURE[locale].body(indLabel(industry, availableIndustries.find((i) => i.slug === industry)?.label ?? industry))}
          linkHref={localeHref(locale, `/solutions#industry-${industry}`)}
          linkLabel={EXIT_UNSURE[locale].linkLabel}
          secondaryLabel={ui.restart}
          onSecondary={restart}
        />
      )}
    </Card>
    {step === 'result' && resultSol && (
      <div className="mt-6">
        <RelatedGlossary slugs={resultSol.relatedTerms} locale={locale} />
      </div>
    )}
    </>
  );
}

function QuestionBlock({ question, children }: { question: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 break-keep">{question}</h2>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function OptionButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-gray-200 text-left text-sm font-medium text-gray-800 hover:border-primary-light hover:bg-primary-lighter/40 transition-colors cursor-pointer"
    >
      <span className="break-keep">{children}</span>
      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-[color,transform] shrink-0" aria-hidden="true" />
    </button>
  );
}

function ExitBlock({
  title,
  body,
  linkHref,
  linkLabel,
  secondaryLabel,
  onSecondary,
}: {
  title: string;
  body: string;
  linkHref: string;
  linkLabel: string;
  secondaryLabel: string;
  onSecondary: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 break-keep">{title}</h2>
      <p className="text-gray-600 leading-relaxed break-keep mb-6">{body}</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Link
          href={linkHref}
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
        >
          {linkLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          type="button"
          onClick={onSecondary}
          className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}

function ResultCard({ slug, locale, onRestart }: { slug: string; locale: Locale; onRestart: () => void }) {
  const ui = DIAGNOSIS_UI[locale];
  const isKo = locale === 'ko';
  const sol: SolutionPage | undefined = solutionsBySlug[slug];
  if (!sol) return null;

  const card = solutionCardI18n[slug]?.[locale];
  const detail = solutionDetailI18n[slug]?.[locale];
  const title = (!isKo && card?.title) || sol.title;
  const excerpt = (!isKo && card?.excerpt) || sol.excerpt;
  const impactLabel = (!isKo && card?.impactLabel) || sol.impactLabel;

  const relatedSolutionObjects = sol.relatedSolutions
    .map((s) => solutionsBySlug[s])
    .filter((x): x is SolutionPage => x !== undefined)
    .slice(0, 3);

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{ui.resultKicker}</p>

      <div className="flex items-center gap-2 mb-4">
        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary-lighter text-primary-dark">
          {sol.impact} {impactLabel}
        </span>
      </div>

      <p className="text-sm font-medium text-gray-400 mb-2 break-keep">{ui.problemHeading}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{title}</h2>
      <p className="text-gray-600 leading-relaxed break-keep mb-8">{excerpt}</p>

      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{ui.stepsHeading}</p>
      <div className="space-y-3 mb-8">
        {sol.steps.map((step, i) => {
          const stepTitle = (!isKo && detail?.steps[i]?.title) || step.title;
          const productLabel = (!isKo && detail?.steps[i]?.productLabel) || step.productLabel;
          return (
            <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-primary mb-1">{productLabel}</p>
                <p className="font-bold text-gray-900 text-sm mb-1 break-keep">{stepTitle}</p>
                <p className="text-sm text-gray-500 leading-relaxed break-keep">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{ui.resultsHeading}</p>
      <div className="grid grid-cols-3 gap-3 mb-3">
        {sol.results.map((r, i) => {
          const label = (!isKo && detail?.results[i]) || r.label;
          return (
            <div key={i} className="p-4 rounded-xl bg-gray-50 text-center">
              <p className="text-xl font-bold text-primary mb-1">{r.stat}</p>
              <p className="text-2xs text-gray-500 leading-snug break-keep">{label}</p>
            </div>
          );
        })}
      </div>
      <p className="text-2xs text-gray-400 mb-8">{ui.resultsNote}</p>

      {relatedSolutionObjects.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
            {ui.relatedSolutionsHeading}
          </p>
          <div className="flex flex-col gap-2">
            {relatedSolutionObjects.map((rs) => {
              const rsCard = solutionCardI18n[rs.slug]?.[locale];
              const rsTitle = (!isKo && rsCard?.title) || rs.title;
              return (
                <Link
                  key={rs.slug}
                  href={localeHref(locale, `/solutions/${rs.slug}`)}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-100 hover:border-primary-light transition-colors text-sm font-medium text-gray-700 hover:text-primary"
                >
                  <span className="break-keep">{rsTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
        <Link
          href={localeHref(locale, `/contact?solution=${slug}`)}
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
        >
          {ui.ctaPrimary}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href={localeHref(locale, `/solutions/${slug}`)}
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:border-primary-light transition-colors"
        >
          {ui.ctaSecondary}
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-pointer ml-auto"
        >
          {ui.restart}
        </button>
      </div>
    </div>
  );
}
