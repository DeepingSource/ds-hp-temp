'use client';

import { useState, useMemo, useCallback } from 'react';
import { industryList } from '@/data/industryList';
import {
  getClustersForIndustry,
  industryHasSolutions,
  type ClusterOption,
} from '@/data/diagnosisData';
import {
  DIAGNOSIS_UI,
  TIEBREAK_QUESTIONS,
  type PersonaId,
} from '@/data/diagnosis-i18n';
import { industryLabelI18n } from '@/data/solutions-i18n';
import type { Locale } from '@/lib/i18n';

export type Step =
  | 'q1'
  | 'q2'
  | 'q3'
  | 'q4'
  | 'result'
  | 'exit-owner'
  | 'exit-privacy'
  | 'exit-unsure';

export interface TranscriptItem {
  step: Step;
  questionText: string;
  userAnswerText: string;
}

export interface DiagnosisPreset {
  industry?: string;
  persona?: PersonaId;
}

export function useDiagnosisEngine(locale: Locale, preset?: DiagnosisPreset) {
  const ui = DIAGNOSIS_UI[locale];
  const isKo = locale === 'ko';

  const initialStep: Step = preset?.industry ? 'q3' : preset?.persona ? 'q2' : 'q1';
  const initialIndustry = preset?.industry ?? null;
  const initialPersona = preset?.persona ?? null;

  const [step, setStep] = useState<Step>(initialStep);
  const [persona, setPersona] = useState<PersonaId | null>(initialPersona);
  const [industry, setIndustry] = useState<string | null>(initialIndustry);
  const [cluster, setCluster] = useState<ClusterOption | null>(null);
  const [resultSlug, setResultSlug] = useState<string | null>(null);
  const [privacySelected, setPrivacySelected] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);

  const availableIndustries = useMemo(
    () => industryList.filter((ind) => industryHasSolutions(ind.slug)),
    [],
  );

  const clusters = useMemo(
    () => (industry ? getClustersForIndustry(industry) : []),
    [industry],
  );

  const indLabel = useCallback(
    (slug: string, fallback: string) =>
      isKo ? fallback : (industryLabelI18n[slug]?.[locale] ?? fallback),
    [isKo, locale],
  );

  const selectPersona = useCallback(
    (id: PersonaId, labelText: string) => {
      setPersona(id);
      setTranscript((prev) => [
        ...prev,
        { step: 'q1', questionText: ui.q1Question, userAnswerText: labelText },
      ]);

      if (id === 'owner') {
        setStep('exit-owner');
      } else {
        setStep('q2');
      }
    },
    [ui.q1Question],
  );

  const selectIndustry = useCallback(
    (slug: string, labelText: string) => {
      setIndustry(slug);
      setTranscript((prev) => [
        ...prev,
        { step: 'q2', questionText: ui.q2Question, userAnswerText: labelText },
      ]);
      setStep('q3');
    },
    [ui.q2Question],
  );

  const selectUniversal = useCallback(
    (id: 'privacy' | 'unsure', labelText: string) => {
      if (id === 'privacy') {
        setPrivacySelected(true);
      }
      setTranscript((prev) => [
        ...prev,
        { step: 'q3', questionText: ui.q3Question, userAnswerText: labelText },
      ]);
      setStep(id === 'privacy' ? 'exit-privacy' : 'exit-unsure');
    },
    [ui.q3Question],
  );

  const selectCluster = useCallback(
    (c: ClusterOption, labelText: string) => {
      setCluster(c);
      setTranscript((prev) => [
        ...prev,
        { step: 'q3', questionText: ui.q3Question, userAnswerText: labelText },
      ]);

      if (c.slugs.length === 1) {
        setResultSlug(c.slugs[0]);
        setStep('result');
      } else {
        setStep('q4');
      }
    },
    [ui.q3Question],
  );

  const selectTiebreak = useCallback(
    (slug: string, labelText: string) => {
      const q4Question = cluster ? TIEBREAK_QUESTIONS[cluster.key]?.question[locale] ?? '' : '';
      setResultSlug(slug);
      setTranscript((prev) => [
        ...prev,
        { step: 'q4', questionText: q4Question, userAnswerText: labelText },
      ]);
      setStep('result');
    },
    [cluster, locale],
  );

  const rewindToStep = useCallback((targetStep: Step) => {
    setTranscript((prev) => {
      const idx = prev.findIndex((t) => t.step === targetStep);
      if (idx === -1) return prev;
      return prev.slice(0, idx);
    });

    setStep(targetStep);
    if (targetStep === 'q1') {
      setPersona(null);
      setIndustry(preset?.industry ?? null);
      setCluster(null);
      setResultSlug(null);
    } else if (targetStep === 'q2') {
      setIndustry(preset?.industry ?? null);
      setCluster(null);
      setResultSlug(null);
    } else if (targetStep === 'q3') {
      setCluster(null);
      setResultSlug(null);
    } else if (targetStep === 'q4') {
      setResultSlug(null);
    }
  }, [preset]);

  const restart = useCallback(() => {
    setPersona(initialPersona);
    setIndustry(initialIndustry);
    setCluster(null);
    setResultSlug(null);
    setPrivacySelected(false);
    setTranscript([]);
    setStep(initialStep);
  }, [initialStep, initialIndustry, initialPersona]);

  const stepNumber = useMemo(() => {
    const map: Record<Step, number> = {
      q1: 1,
      q2: 2,
      q3: 3,
      q4: 4,
      result: cluster && cluster.slugs.length > 1 ? 4 : 3,
      'exit-owner': 1,
      'exit-privacy': 3,
      'exit-unsure': 3,
    };
    return map[step];
  }, [step, cluster]);

  const totalSteps = useMemo(
    () => (step === 'q4' || (cluster && cluster.slugs.length > 1) ? 4 : 3),
    [step, cluster],
  );

  return {
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
  };
}
