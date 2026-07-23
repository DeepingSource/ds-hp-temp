'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { industryColorMap } from '@/data/industryList';
import {
  DIAGNOSIS_UI,
  PERSONA_OPTIONS,
  Q3_UNIVERSAL_OPTIONS,
  Q3_CLUSTER_LABEL,
  TIEBREAK_QUESTIONS,
  EXIT_OWNER,
  EXIT_PRIVACY,
  EXIT_UNSURE,
} from '@/data/diagnosis-i18n';
import { localeHref, type Locale } from '@/lib/i18n';
import { useDiagnosisEngine, type DiagnosisPreset } from './useDiagnosisEngine';
import ResultPanel from './ResultPanel';

interface DiagnosisConversationProps {
  locale: Locale;
  preset?: DiagnosisPreset;
  compact?: boolean;
}

export default function DiagnosisConversation({
  locale,
  preset,
  compact = false,
}: DiagnosisConversationProps) {
  const ui = DIAGNOSIS_UI[locale];

  const engine = useDiagnosisEngine(locale, preset);
  const {
    step,
    persona,
    industry,
    cluster,
    resultSlug,
    privacySelected,
    transcript,
    availableIndustries,
    clusters,
    stepNumber,
    totalSteps,
    indLabel,
    selectPersona,
    selectIndustry,
    selectUniversal,
    selectCluster,
    selectTiebreak,
    rewindToStep,
    restart,
    setStep,
  } = engine;

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isAnalyzingResult, setIsAnalyzingResult] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when step or transcript updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step, transcript.length, isTyping, isAnalyzingResult]);

  // Handle typing indicator delay on step change
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    if (step === 'result') {
      setIsAnalyzingResult(true);
      const timer = setTimeout(() => {
        setIsAnalyzingResult(false);
      }, 750);
      return () => clearTimeout(timer);
    } else if (['q1', 'q2', 'q3', 'q4'].includes(step)) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const progressPercent = Math.min(100, Math.round((stepNumber / totalSteps) * 100));
  const showChrome = !['result', 'exit-owner', 'exit-privacy', 'exit-unsure'].includes(step);

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      {/* Top Header & Progress */}
      {showChrome && (
        <div className={compact ? 'mb-4' : 'mb-6'}>
          <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-2">
            {/* compact(모달)에서는 eyebrow를 숨긴다 — 모달 헤더가 이미 같은 문구를
                제목으로 띄우고 있어 중복이다. 단계 표시와 진행바는 유지. */}
            {compact ? (
              <span aria-hidden="true" />
            ) : (
              <span className="flex items-center gap-1.5 text-primary font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                {ui.eyebrow}
              </span>
            )}
            <span className="tabular-nums font-bold">{ui.stepLabel(stepNumber, totalSteps)}</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Conversation Flow */}
      <div className={`flex-1 flex flex-col overflow-y-auto pr-1 ${compact ? 'gap-4' : 'gap-5'}`}>
        {/* Render History (Transcript) */}
        {transcript.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2.5">
            {/* Assistant Question Bubble */}
            <div className="self-start max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl bg-white border border-gray-150 text-gray-900 text-sm sm:text-base font-bold shadow-2xs break-keep">
              {item.questionText}
            </div>

            {/* User Answer Bubble with Edit/Rewind option */}
            <div className="group relative self-end max-w-[85%] sm:max-w-[75%]">
              <div className="p-3.5 px-4 rounded-2xl bg-primary-lighter text-primary-dark text-sm sm:text-base font-bold break-keep">
                {item.userAnswerText}
              </div>
              <button
                type="button"
                onClick={() => rewindToStep(item.step)}
                className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity absolute -left-16 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-2xs font-bold text-gray-600 cursor-pointer"
                title={ui.chatConnectors.rewindHover}
              >
                <RotateCcw className="w-3 h-3" />
                {ui.chatConnectors.rewindHover}
              </button>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="self-start p-3.5 px-4 rounded-2xl bg-white border border-gray-150 flex items-center gap-1.5 text-gray-400">
            <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        {/* Current Active Step Input / Options */}
        {!isTyping && (
          <>
            {step === 'q1' && (
              <div className="flex flex-col gap-3 self-start w-full">
                <div className="p-4 rounded-2xl bg-white border border-gray-150 text-gray-900 text-sm sm:text-base font-bold shadow-2xs break-keep max-w-[85%] sm:max-w-[75%]">
                  {ui.q1Question}
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {PERSONA_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => selectPersona(opt.id, opt.label[locale])}
                      className="px-4 py-3 rounded-xl border border-gray-200 hover:border-primary-light hover:bg-primary-lighter/40 text-left text-xs sm:text-sm font-medium text-gray-800 transition-all cursor-pointer break-keep"
                    >
                      {opt.label[locale]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'q2' && (
              <div className="flex flex-col gap-3 self-start w-full">
                <div className="p-4 rounded-2xl bg-white border border-gray-150 text-gray-900 text-sm sm:text-base font-bold shadow-2xs break-keep max-w-[85%] sm:max-w-[75%]">
                  {ui.q2Question}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {availableIndustries.map((ind) => {
                    const colors = industryColorMap[ind.color] ?? industryColorMap.slate;
                    const Icon = ind.icon;
                    const label = indLabel(ind.slug, ind.label);
                    return (
                      <button
                        key={ind.slug}
                        type="button"
                        onClick={() => selectIndustry(ind.slug, label)}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${colors.border} ${colors.bg}`}
                      >
                        <span className={`flex shrink-0 w-7 h-7 rounded-lg items-center justify-center bg-white/80 ${colors.text}`}>
                          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                        <span className={`font-bold text-xs sm:text-sm ${colors.text} truncate`}>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 'q3' && industry && (
              <div className="flex flex-col gap-3 self-start w-full">
                <div className="p-4 rounded-2xl bg-white border border-gray-150 text-gray-900 text-sm sm:text-base font-bold shadow-2xs break-keep max-w-[85%] sm:max-w-[75%]">
                  {ui.q3Question}
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  {clusters.map((c) => {
                    const label = Q3_CLUSTER_LABEL[c.key]?.[locale] ?? c.clusterId;
                    return (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => selectCluster(c, label)}
                        className="flex items-center justify-between p-3.5 px-4 rounded-xl border border-gray-200 hover:border-primary-light hover:bg-primary-lighter/40 text-left text-xs sm:text-sm font-medium text-gray-800 transition-all cursor-pointer break-keep"
                      >
                        <span>{label}</span>
                        <ArrowRight className="w-4 h-4 text-gray-300" />
                      </button>
                    );
                  })}
                  <div className="pt-2 mt-2 border-t border-gray-100 flex flex-col gap-1.5">
                    {Q3_UNIVERSAL_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => selectUniversal(opt.id, opt.label[locale])}
                        className="text-left text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer py-1"
                      >
                        {opt.label[locale]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 'q4' && cluster && (
              <div className="flex flex-col gap-3 self-start w-full">
                <div className="p-4 rounded-2xl bg-white border border-gray-150 text-gray-900 text-sm sm:text-base font-bold shadow-2xs break-keep max-w-[85%] sm:max-w-[75%]">
                  {TIEBREAK_QUESTIONS[cluster.key]?.question[locale] ?? ''}
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  {(TIEBREAK_QUESTIONS[cluster.key]?.options ?? []).map((opt) => (
                    <button
                      key={opt.slug}
                      type="button"
                      onClick={() => selectTiebreak(opt.slug, opt.label[locale])}
                      className="p-3.5 px-4 rounded-xl border border-gray-200 hover:border-primary-light hover:bg-primary-lighter/40 text-left text-xs sm:text-sm font-medium text-gray-800 transition-all cursor-pointer break-keep"
                    >
                      {opt.label[locale]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Analyzing Result State */}
            {isAnalyzingResult && (
              <div className="self-start p-4 rounded-2xl bg-white border border-gray-150 flex items-center gap-3 text-gray-600 text-xs sm:text-sm font-medium animate-pulse">
                <Sparkles className="w-4 h-4 text-primary animate-spin" />
                {ui.chatConnectors.analyzing}
              </div>
            )}

            {/* Result Stage */}
            {!isAnalyzingResult && step === 'result' && resultSlug && (
              <ResultPanel
                slug={resultSlug}
                industry={industry}
                persona={persona}
                privacySelected={privacySelected}
                locale={locale}
                onRestart={restart}
              />
            )}

            {/* Exit States */}
            {!isAnalyzingResult && step === 'exit-owner' && (
              <ExitBlock
                title={EXIT_OWNER[locale].title}
                body={EXIT_OWNER[locale].body}
                linkHref={localeHref(locale, '/products/saai-for-owners')}
                linkLabel={EXIT_OWNER[locale].linkLabel}
                secondaryLabel={EXIT_OWNER[locale].continueLabel}
                onSecondary={() => setStep('q2')}
              />
            )}

            {!isAnalyzingResult && step === 'exit-privacy' && (
              <ExitBlock
                title={EXIT_PRIVACY[locale].title}
                body={EXIT_PRIVACY[locale].body}
                linkHref={localeHref(locale, '/technology/anonymizer')}
                linkLabel={EXIT_PRIVACY[locale].linkLabel}
                secondaryLabel={ui.restart}
                onSecondary={restart}
              />
            )}

            {!isAnalyzingResult && step === 'exit-unsure' && industry && (
              <ExitBlock
                title={EXIT_UNSURE[locale].title}
                body={EXIT_UNSURE[locale].body(
                  indLabel(industry, availableIndustries.find((i) => i.slug === industry)?.label ?? industry),
                )}
                linkHref={localeHref(locale, `/solutions#industry-${industry}`)}
                linkLabel={EXIT_UNSURE[locale].linkLabel}
                secondaryLabel={ui.restart}
                onSecondary={restart}
              />
            )}
          </>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
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
    <div className="p-6 rounded-2xl bg-white border border-gray-150 animate-in fade-in duration-300">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 break-keep">{title}</h2>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-keep mb-6">{body}</p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <Link
          href={linkHref}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-dark transition-colors text-center"
        >
          {linkLabel}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button
          type="button"
          onClick={onSecondary}
          className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-pointer py-2 text-center"
        >
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}
