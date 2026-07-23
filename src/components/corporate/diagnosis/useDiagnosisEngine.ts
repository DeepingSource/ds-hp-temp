'use client';

import { useCallback, useMemo, useState } from 'react';
import { industryList } from '@/data/industryList';
import { Q3_CLUSTER_LABEL, type PersonaId } from '@/data/diagnosis-i18n';
import { industryLabelI18n } from '@/data/solutions-i18n';
import type { Locale } from '@/lib/i18n';
import diagnosisKbJson from '@/data/generated/diagnosis.json';
import {
  applyAnswer,
  createState,
  deriveClusters,
  industryHasScenarios,
  nextStep,
  progress,
  resumeFromExit,
  rewindTo,
  type ClusterOption,
  type DiagnosisKB,
  type EngineState,
  type Question,
} from '@/lib/diagnosis/engine';

/**
 * useDiagnosisEngine — E1: 진단 트리가 코드가 아니라 데이터다 (v4 §2 · MASTER 3-4).
 *
 * 질문·선택지·흐름은 content/diagnosis YAML → diagnosis.json(지식 베이스)이고,
 * 이 훅은 순수 엔진(src/lib/diagnosis/engine.ts)의 React 어댑터다: 엔진 state를
 * useState로 들고, transcript(표시 텍스트)와 로케일 해석·런타임 파생 옵션
 * (업종 그리드 = industryList, 클러스터 = 시나리오 태그)을 UI에 공급한다.
 * 6문항 체계(v3 §3): 역할 → 업종 → 규모 → 문제 영역 → 증상/타이브레이크 → 도입 목표.
 * 프리셋 진입 시 업종 질문은 확인 칩으로 대체되지만 스텝 수는 유지된다(v3 §3).
 */

const kb = diagnosisKbJson as unknown as DiagnosisKB;

export interface DiagnosisPreset {
  industry?: string;
  persona?: PersonaId;
}

export interface TranscriptItem {
  questionId: string;
  questionText: string;
  userAnswerText: string;
}

/** UI가 렌더할 활성 스텝 */
export type UiStep =
  | { kind: 'question'; question: Question; isIndustryConfirm: boolean }
  | { kind: 'exit'; to: string }
  | { kind: 'result'; slug: string };

export function useDiagnosisEngine(locale: Locale, preset?: DiagnosisPreset) {
  const [state, setState] = useState<EngineState>(() => createState(preset));
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  // 프리셋 확인 칩에서 "아니에요" — 같은 질문을 일반 그리드로 전환
  const [confirmDeclined, setConfirmDeclined] = useState(false);

  const engineStep = useMemo(() => nextStep(kb, state), [state]);

  const uiStep: UiStep = useMemo(() => {
    if (engineStep.kind === 'question') {
      return {
        kind: 'question',
        question: engineStep.question,
        isIndustryConfirm:
          engineStep.question.id === 'industry' && !!state.presetIndustry && !confirmDeclined,
      };
    }
    return engineStep;
  }, [engineStep, state.presetIndustry, confirmDeclined]);

  const availableIndustries = useMemo(
    () => industryList.filter((ind) => industryHasScenarios(kb, ind.slug)),
    [],
  );

  const clusters: ClusterOption[] = useMemo(
    () => (state.signals.industry ? deriveClusters(kb, state.signals.industry) : []),
    [state.signals.industry],
  );

  const indLabel = useCallback(
    (slug: string, fallback: string) =>
      locale === 'ko' ? fallback : (industryLabelI18n[slug]?.[locale] ?? fallback),
    [locale],
  );

  const clusterLabel = useCallback(
    (key: string) => Q3_CLUSTER_LABEL[key]?.[locale] ?? key.split(':')[1] ?? key,
    [locale],
  );

  /** 활성 질문에 답한다 — questionText/answerText는 transcript 표시용 */
  const answer = useCallback(
    (optionId: string, answerText: string, questionText: string) => {
      if (engineStep.kind !== 'question') return;
      setTranscript((t) => [
        ...t,
        { questionId: engineStep.question.id, questionText, userAnswerText: answerText },
      ]);
      setState((s) => applyAnswer(kb, s, engineStep.question.id, optionId));
    },
    [engineStep],
  );

  /** 프리셋 확인 칩 "아니에요" — 답 기록 없이 일반 업종 그리드로 전환 */
  const declineIndustryConfirm = useCallback(() => setConfirmDeclined(true), []);

  const rewindToQuestion = useCallback((questionId: string) => {
    setState((s) => rewindTo(kb, s, questionId));
    setTranscript((t) => {
      const idx = t.findIndex((item) => item.questionId === questionId);
      return idx < 0 ? t : t.slice(0, idx);
    });
  }, []);

  const restart = useCallback(() => {
    setState(createState(preset));
    setTranscript([]);
    setConfirmDeclined(false);
  }, [preset]);

  /** exit-owner "계속 진단" — 역할 답 유지한 채 흐름 복귀 (다음 질문 = 업종) */
  const continueFromExit = useCallback(() => {
    setState((s) => resumeFromExit(s));
  }, []);

  const { stepNumber, totalSteps } = progress(kb, state);

  // routing/ResultPanel 하위 호환 신호 (privacy는 exit 경로라 signals에 없음)
  const privacySelected = state.answers.some(
    (a) => a.questionId === 'problem-cluster' && a.optionId === 'privacy',
  );

  return {
    kb,
    uiStep,
    signals: state.signals,
    persona: state.signals.persona as PersonaId | null,
    industry: state.signals.industry,
    resultSlug: state.resultSlug,
    privacySelected,
    transcript,
    availableIndustries,
    clusters,
    stepNumber,
    totalSteps,
    indLabel,
    clusterLabel,
    answer,
    declineIndustryConfirm,
    rewindToQuestion,
    restart,
    continueFromExit,
  };
}
