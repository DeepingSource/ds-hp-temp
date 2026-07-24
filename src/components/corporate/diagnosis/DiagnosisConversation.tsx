'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { industryColorMap } from '@/data/industryList';
import { DIAGNOSIS_UI, EXIT_OWNER, EXIT_PRIVACY, EXIT_UNSURE } from '@/data/diagnosis-i18n';
import { localeHref, type Locale } from '@/lib/i18n';
import { trackEvent } from '@/components/Analytics';
import { useDiagnosisEngine, type DiagnosisPreset } from './useDiagnosisEngine';
import ResultPanel from './ResultPanel';

/**
 * DiagnosisConversation — E1: 질문 트리는 diagnosis.json(지식 베이스)에서 온다.
 * 렌더는 질문 kind 4종(chip-wrap / industry-grid / cluster-list / option-list)의
 * 데이터 주도 — 새 질문은 YAML 파일 하나로 추가된다 (v4 §2 · MASTER 3-4).
 * 페이싱(v3 §6): 상단 앵커·타이핑 600ms·옵션 칩 850ms 스태거·결과 상단 정렬·
 * 되감기 연출 생략 — Stage 1-3 구현 그대로 승계.
 */

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
    uiStep,
    persona,
    industry,
    resultSlug,
    privacySelected,
    signals,
    reflectLine,
    transcript,
    availableIndustries,
    clusters,
    stepNumber,
    totalSteps,
    indLabel,
    clusterLabel,
    answer,
    answerConfirm,
    declineIndustryConfirm,
    rewindToQuestion,
    restart,
    continueFromExit,
    resultClosest,
    resultSecond,
    symptomLabel,
    candidateCount,
  } = engine;

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [isAnalyzingResult, setIsAnalyzingResult] = useState<boolean>(false);
  // §6-1(v3): 바닥 앵커 전면 폐지 — 새 어시스턴트 발화(활성 질문/결과/이탈 블록)의
  // "상단"을 정렬한다. 한 시점에 하나만 렌더되므로 블록들이 ref를 공유한다.
  const activeRef = useRef<HTMLDivElement>(null);
  const skipTheatricsRef = useRef(false); // §6-4: 되감기 시 연출 생략
  const lastManualScrollRef = useRef(0); // §6-1: 수동 스크롤 중 자동 스크롤 스킵
  const mountedRef = useRef(false); // 첫 로드에는 스크롤하지 않는다 (페이지 점프 방지)

  // 활성 스텝 식별자 — 타이밍/스크롤 effect의 트리거 (질문 id·exit 종류·확인·결과)
  const stepKey =
    uiStep.kind === 'question'
      ? `q:${uiStep.question.id}`
      : uiStep.kind === 'exit'
        ? uiStep.to
        : uiStep.kind === 'confirm'
          ? `confirm:${uiStep.top}` // reject 후 새 top이면 확인 연출 재생
          : 'result';
  const isResult = uiStep.kind === 'result';

  const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // §6-1: 직전 500ms 내 wheel/touch가 있으면 자동 스크롤을 건너뛴다 — 읽기를 끊지 않는다.
  useEffect(() => {
    const mark = () => {
      lastManualScrollRef.current = Date.now();
    };
    window.addEventListener('wheel', mark, { passive: true });
    window.addEventListener('touchmove', mark, { passive: true });
    return () => {
      window.removeEventListener('wheel', mark);
      window.removeEventListener('touchmove', mark);
    };
  }, []);

  // §6-2·6-3 공개 타이밍: 답 → 600ms 타이핑 → 질문 표시 → 250ms 후 옵션 칩.
  // 결과는 analyzing 900ms 후 마운트. reduced-motion·되감기 재방문은 전 단계 0ms.
  useEffect(() => {
    const skip = skipTheatricsRef.current || prefersReduced();
    skipTheatricsRef.current = false;

    if (isResult) {
      if (skip) {
        setIsAnalyzingResult(false);
        return;
      }
      setIsAnalyzingResult(true);
      const timer = setTimeout(() => setIsAnalyzingResult(false), 900);
      return () => clearTimeout(timer);
    }
    if (skip) {
      setIsTyping(false);
      setShowOptions(true);
      return;
    }
    setIsTyping(true);
    setShowOptions(false);
    const typingTimer = setTimeout(() => setIsTyping(false), 600);
    const optionsTimer = setTimeout(() => setShowOptions(true), 850);
    return () => {
      clearTimeout(typingTimer);
      clearTimeout(optionsTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepKey]);

  // §6-1 스크롤 앵커: 새 어시스턴트 콘텐츠가 나타날 때 1회만 — 타이핑/analyzing
  // 인디케이터·옵션 칩·transcript 추가로는 발동하지 않는다.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (isTyping || isAnalyzingResult) return; // 인디케이터 표시로는 발동 금지
    if (Date.now() - lastManualScrollRef.current < 500) return;
    activeRef.current?.scrollIntoView({
      behavior: prefersReduced() ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [stepKey, isTyping, isAnalyzingResult]);

  // §6-2: 옵션 칩 페이드인(스태거 40ms/개) — 자리는 아래로 자라는 채팅 흐름
  const CHIP_ANIM = 'animate-in fade-in fill-mode-both duration-300 motion-reduce:animate-none';
  const chipDelay = (i: number) => ({ animationDelay: `${i * 40}ms` });

  // 계측 (v3 §8 Phase 4 · Stage 4-2): 답변마다 diagnosis_step(6스텝 체계),
  // 결과 도달 시 diagnosis_signal(goal·scale) 1회 — 완료율·신호 분포 추적(G4 지표)
  const answerTracked = (optionId: string, answerText: string, qText: string) => {
    if (uiStep.kind === 'question') {
      trackEvent('diagnosis_step', {
        step: uiStep.question.id,
        n: stepNumber,
        option: optionId,
        // E4(v4 §6): 답변 시점의 생존 후보 수 — 연속 이벤트 차분이 질문별 분별 기여도
        candidates: candidateCount,
      });
    }
    answer(optionId, answerText, qText);
  };
  const signalTrackedRef = useRef(false);
  useEffect(() => {
    if (!isResult || !resultSlug || signalTrackedRef.current) return;
    signalTrackedRef.current = true;
    trackEvent('diagnosis_signal', {
      goal: signals.goal ?? 'none',
      scale: signals.scale ?? 'none',
      result: resultSlug,
      // E4: closest 종결 여부 — 확인 부정 경로의 품질 추적(v4 §6 배포 기준 재료)
      closest: resultClosest ? 1 : 0,
    });
  }, [isResult, resultSlug, signals.goal, signals.scale]);


  const progressPercent = Math.min(100, Math.round((stepNumber / totalSteps) * 100));
  const showChrome = uiStep.kind === 'question' || uiStep.kind === 'confirm';

  // E3 확인 스텝 문구(v4 §3-3) — 자유 작문이 아니라 템플릿+태그 라벨 조합.
  // "정리하면"(요약)이지 "제 추측엔"(추리 연출)이 아니다(§3-4 정직성 가드레일).
  const confirmText =
    uiStep.kind === 'confirm' && industry && signals.cluster
      ? ui.adaptiveConfirm.text(
          indLabel(industry, availableIndustries.find((i) => i.slug === industry)?.label ?? industry),
          clusterLabel(signals.cluster),
          symptomLabel,
        )
      : '';

  // ── 활성 질문 텍스트·옵션 해석 ────────────────────────────────────────────
  const q = uiStep.kind === 'question' ? uiStep.question : null;
  const presetIndustryLabel = preset?.industry
    ? indLabel(
        preset.industry,
        availableIndustries.find((i) => i.slug === preset.industry)?.label ?? preset.industry,
      )
    : '';
  const questionText = q
    ? uiStep.kind === 'question' && uiStep.isIndustryConfirm && q.confirm
      ? q.confirm.text[locale].replace('{label}', presetIndustryLabel)
      : q.text[locale]
    : '';

  const questionBubble = (
    <div className="p-4 rounded-2xl bg-white border border-gray-150 text-gray-900 text-sm sm:text-base font-bold shadow-2xs break-keep max-w-[85%] sm:max-w-[75%]">
      {questionText}
    </div>
  );

  const listButtonClass = `p-3.5 px-4 rounded-xl border border-gray-200 hover:border-primary-light hover:bg-primary-lighter/40 text-left text-xs sm:text-sm font-medium text-gray-800 transition-all cursor-pointer break-keep ${CHIP_ANIM}`;

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
                onClick={() => {
                  // §6-4: 이미 본 질문에 타이핑 연출을 반복하지 않는다 — 상단 정렬만
                  skipTheatricsRef.current = true;
                  rewindToQuestion(item.questionId);
                }}
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
            <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce motion-reduce:animate-none" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce motion-reduce:animate-none" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce motion-reduce:animate-none" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        {/* Current Active Question — kind 기반 데이터 주도 렌더 */}
        {!isTyping && q && (
          <div ref={activeRef} className="flex flex-col gap-3 self-start w-full scroll-mt-3">
            {questionBubble}

            {showOptions && uiStep.kind === 'question' && uiStep.isIndustryConfirm && q.confirm && (
              // 프리셋 확인 칩 (v3 §3 — 확인도 한 스텝, 스텝 수 유지)
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => answerTracked(preset!.industry!, q.confirm!.yes[locale], questionText)}
                  className={`px-4 py-3 rounded-xl border border-primary-light bg-primary-lighter/40 text-left text-xs sm:text-sm font-bold text-primary-dark transition-all cursor-pointer break-keep ${CHIP_ANIM}`}
                  style={chipDelay(0)}
                >
                  {q.confirm.yes[locale]}
                </button>
                <button
                  type="button"
                  onClick={declineIndustryConfirm}
                  className={`px-4 py-3 rounded-xl border border-gray-200 hover:border-primary-light text-left text-xs sm:text-sm font-medium text-gray-600 transition-all cursor-pointer break-keep ${CHIP_ANIM}`}
                  style={chipDelay(1)}
                >
                  {q.confirm.no[locale]}
                </button>
              </div>
            )}

            {showOptions && !(uiStep.kind === 'question' && uiStep.isIndustryConfirm) && (
              <>
                {q.kind === 'chip-wrap' && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(q.options ?? []).map((opt, i) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => answerTracked(opt.id, opt.label[locale], questionText)}
                        className={`px-4 py-3 rounded-xl border border-gray-200 hover:border-primary-light hover:bg-primary-lighter/40 text-left text-xs sm:text-sm font-medium text-gray-800 transition-all cursor-pointer break-keep ${CHIP_ANIM}`}
                        style={chipDelay(i)}
                      >
                        {opt.label[locale]}
                      </button>
                    ))}
                  </div>
                )}

                {q.kind === 'industry-grid' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {availableIndustries.map((ind, i) => {
                      const colors = industryColorMap[ind.color] ?? industryColorMap.slate;
                      const Icon = ind.icon;
                      const label = indLabel(ind.slug, ind.label);
                      return (
                        <button
                          key={ind.slug}
                          type="button"
                          onClick={() => answerTracked(ind.slug, label, questionText)}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${colors.border} ${colors.bg} ${CHIP_ANIM}`}
                          style={chipDelay(i)}
                        >
                          <span className={`flex shrink-0 w-7 h-7 rounded-lg items-center justify-center bg-white/80 ${colors.text}`}>
                            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                          </span>
                          <span className={`font-bold text-xs sm:text-sm ${colors.text} truncate`}>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.kind === 'cluster-list' && (
                  <div className="flex flex-col gap-2 pt-1">
                    {clusters.map((c, i) => {
                      const label = clusterLabel(c.key);
                      return (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => answerTracked(c.key, label, questionText)}
                          className={`flex items-center justify-between ${listButtonClass}`}
                          style={chipDelay(i)}
                        >
                          <span>{label}</span>
                          <ArrowRight className="w-4 h-4 text-gray-300" />
                        </button>
                      );
                    })}
                    <div className="pt-2 mt-2 border-t border-gray-100 flex flex-col gap-1.5">
                      {(q.universalOptions ?? []).map((opt, i) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => answerTracked(opt.id, opt.label[locale], questionText)}
                          className={`text-left text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer py-1 ${CHIP_ANIM}`}
                          style={chipDelay(clusters.length + i)}
                        >
                          {opt.label[locale]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {q.kind === 'option-list' && (
                  <div className="flex flex-col gap-2 pt-1">
                    {(q.options ?? []).map((opt, i) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => answerTracked(opt.id, opt.label[locale], questionText)}
                        className={listButtonClass}
                        style={chipDelay(i)}
                      >
                        {opt.label[locale]}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* E3 Confirm Step — 진단 요약 확인 (v4 §3-3 Akinator 체감의 핵심) */}
        {!isTyping && uiStep.kind === 'confirm' && (
          <div ref={activeRef} className="flex flex-col gap-3 self-start w-full scroll-mt-3">
            <div className="p-4 rounded-2xl bg-white border border-gray-150 text-gray-900 text-sm sm:text-base font-bold shadow-2xs break-keep max-w-[85%] sm:max-w-[75%]">
              {confirmText}
            </div>
            {showOptions && (
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    // E4: 확인 부정률 = no 비율 (v4 §6 배포 기준 — 20% 미만)
                    trackEvent('diagnosis_confirm', { accepted: 'yes', top: uiStep.kind === 'confirm' ? uiStep.top : '' });
                    answerConfirm(true);
                  }}
                  className={`px-4 py-3 rounded-xl border border-primary-light bg-primary-lighter/40 text-left text-xs sm:text-sm font-bold text-primary-dark transition-all cursor-pointer break-keep ${CHIP_ANIM}`}
                  style={chipDelay(0)}
                >
                  {ui.adaptiveConfirm.yes}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('diagnosis_confirm', { accepted: 'no', top: uiStep.kind === 'confirm' ? uiStep.top : '' });
                    answerConfirm(false);
                  }}
                  className={`px-4 py-3 rounded-xl border border-gray-200 hover:border-primary-light text-left text-xs sm:text-sm font-medium text-gray-600 transition-all cursor-pointer break-keep ${CHIP_ANIM}`}
                  style={chipDelay(1)}
                >
                  {ui.adaptiveConfirm.no}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Analyzing Result State */}
        {isAnalyzingResult && (
          <div className="self-start p-4 rounded-2xl bg-white border border-gray-150 flex items-center gap-3 text-gray-600 text-xs sm:text-sm font-medium animate-pulse motion-reduce:animate-none">
            <Sparkles className="w-4 h-4 text-primary animate-spin motion-reduce:animate-none" />
            {ui.chatConnectors.analyzing}
          </div>
        )}

        {/* Result Stage — §6-3: 패널 상단을 정렬(1회)하고 이후 자동 스크롤 없음. */}
        {!isAnalyzingResult && isResult && resultSlug && (
          <div ref={activeRef} className="scroll-mt-3">
            <ResultPanel
              slug={resultSlug}
              industry={industry}
              persona={persona}
              privacySelected={privacySelected}
              scale={signals.scale}
              goal={signals.goal}
              reflectLine={reflectLine}
              closest={resultClosest}
              secondSlug={resultSecond}
              locale={locale}
              onRestart={restart}
            />
          </div>
        )}

        {/* Exit States — §7 시나리오 E: 페이싱 규칙 동일 적용, 바닥 앵커 잔재 없음 */}
        {!isTyping && uiStep.kind === 'exit' && uiStep.to === 'exit-owner' && (
          <div ref={activeRef} className="scroll-mt-3">
            <ExitBlock
              title={EXIT_OWNER[locale].title}
              body={EXIT_OWNER[locale].body}
              linkHref={localeHref(locale, '/products/saai-for-owners')}
              linkLabel={EXIT_OWNER[locale].linkLabel}
              secondaryLabel={EXIT_OWNER[locale].continueLabel}
              onSecondary={continueFromExit}
            />
          </div>
        )}

        {!isTyping && uiStep.kind === 'exit' && uiStep.to === 'exit-privacy' && (
          <div ref={activeRef} className="scroll-mt-3">
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

        {!isTyping && uiStep.kind === 'exit' && uiStep.to === 'exit-unsure' && industry && (
          <div ref={activeRef} className="scroll-mt-3">
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
          </div>
        )}
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
