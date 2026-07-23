/**
 * diagnosis engine — E1 고정 순서 인터프리터 (diagnosis-v4-engine-plan §2 · §8).
 *
 * React 무의존 순수 함수 모듈: 시뮬레이터(scripts/diagnosis-sim.mjs, Node type
 * stripping으로 이 파일을 직접 import)와 UI 훅(useDiagnosisEngine)이 같은 코어를
 * 공유한다. 지식 베이스(kb)는 src/data/generated/diagnosis.json — content/diagnosis
 * YAML + solutions 시나리오 태그를 gen-site-content가 컴파일한 산출물.
 *
 * 규율: 랜덤성 금지(동률은 order 필드로 결정적 타이브레이크 — 시뮬레이터 재현성),
 * selector 전환은 flow.yaml 단일 지점(E1 = 'fixed'; 'adaptive'는 E3에서 이 모듈에
 * 추가). E1에서 evidence weight는 전부 1 — 점수 모델은 E3 몫이고, 여기서는 답을
 * 신호(signals)로 저장하고 결과는 클러스터 직행/refine result로 결정한다(현행 동작
 * 보존 — v3 §3 "결과 slug는 여전히 문제 영역+증상 확인에서 결정").
 */

export type Tri = { ko: string; en: string; jp: string };

export interface QuestionOption {
  id: string;
  label: Tri;
  /** refine tiebreak — 이 옵션이 결과 slug를 하드 결정 */
  result?: string;
  /** E3 점수용 증거 (E1은 signal 저장에만 사용) */
  evidence?: { attribute: string; value: string; weight: number }[];
  /** 옵션 선택 직후의 반응 멘트 (예: 규모 large — v3 §4) */
  ack?: Tri;
}

export interface Question {
  id: string;
  group: string;
  phase: 'context' | 'problem' | 'refine' | 'confirm';
  kind: 'chip-wrap' | 'industry-grid' | 'cluster-list' | 'option-list';
  order: number;
  /** 답이 저장될 신호 이름 (persona/industry/scale/cluster/symptom/goal) */
  signal?: string;
  appliesWhen?: { industry?: string[]; persona?: string[]; cluster?: string[] };
  text: Tri;
  ack?: Tri;
  /** 런처 프리셋 진입 시 industry 질문의 확인 칩 카피 (v3 §3 단계 수 규칙) */
  confirm?: { text: Tri; yes: Tri; no: Tri };
  options?: QuestionOption[];
  /** problem-cluster 전용 — 클러스터 파생 옵션 뒤에 붙는 공통 탈출 옵션 */
  universalOptions?: { id: string; label: Tri }[];
}

export interface DiagnosisFlow {
  selector: 'fixed' | 'adaptive';
  fixedOrder: string[];
  adaptive: { minQuestions: number; maxQuestions: number; confirmThreshold: number; maxRejects: number };
  exits: { question: string; option: string; to: string }[];
}

export interface ScenarioTag {
  industry: string;
  cluster: string;
  attributes: { symptom?: string[]; persona?: string[]; scale?: string[] };
  prior: number;
}

export interface DiagnosisKB {
  flow: DiagnosisFlow;
  questions: Question[];
  scenarios: Record<string, ScenarioTag>;
  fixtures: unknown[];
}

export interface Signals {
  persona: string | null;
  industry: string | null;
  /** 복합키 "<industry>:<clusterId>" */
  cluster: string | null;
  scale: string | null;
  symptom: string | null;
  goal: string | null;
}

export interface Answer {
  questionId: string;
  optionId: string;
}

export interface EngineState {
  answers: Answer[];
  signals: Signals;
  resultSlug: string | null;
  /** 'exit-owner' | 'exit-privacy' | 'exit-unsure' | null */
  exit: string | null;
  /** 프리셋 industry — industry 질문을 확인 칩으로 렌더 (v3 §3) */
  presetIndustry: string | null;
  /** 프리셋 persona — rewind 재구축 시 초기 신호 복원용 */
  presetPersona: string | null;
}

export interface ClusterOption {
  clusterId: string;
  /** "<industrySlug>:<clusterId>" — 라벨(Q3_CLUSTER_LABEL)·appliesWhen 룩업 키 */
  key: string;
  slugs: string[];
}

const EMPTY_SIGNALS: Signals = {
  persona: null,
  industry: null,
  cluster: null,
  scale: null,
  symptom: null,
  goal: null,
};

export function createState(preset?: { industry?: string; persona?: string }): EngineState {
  return {
    answers: [],
    signals: { ...EMPTY_SIGNALS, persona: preset?.persona ?? null },
    resultSlug: null,
    exit: null,
    presetIndustry: preset?.industry ?? null,
    presetPersona: preset?.persona ?? null,
  };
}

/** 업종별 문제 클러스터 옵션 — 시나리오 태그에서 파생 (diagnosisData 대체 경로).
 *  순서는 kb.scenarios 삽입 순(= solutionPages order 정렬) — 결정적. */
export function deriveClusters(kb: DiagnosisKB, industry: string): ClusterOption[] {
  const byCluster = new Map<string, string[]>();
  for (const [slug, s] of Object.entries(kb.scenarios)) {
    if (s.industry !== industry) continue;
    byCluster.set(s.cluster, [...(byCluster.get(s.cluster) ?? []), slug]);
  }
  return Array.from(byCluster.entries()).map(([clusterId, slugs]) => ({
    clusterId,
    key: `${industry}:${clusterId}`,
    slugs,
  }));
}

export function industryHasScenarios(kb: DiagnosisKB, industry: string): boolean {
  return Object.values(kb.scenarios).some((s) => s.industry === industry);
}

function matchesWhen(q: Question, state: EngineState): boolean {
  const w = q.appliesWhen;
  if (!w) return true;
  if (w.industry && (!state.signals.industry || !w.industry.includes(state.signals.industry))) return false;
  if (w.persona && (!state.signals.persona || !w.persona.includes(state.signals.persona))) return false;
  if (w.cluster && (!state.signals.cluster || !w.cluster.includes(state.signals.cluster))) return false;
  return true;
}

const answered = (state: EngineState, questionId: string) =>
  state.answers.some((a) => a.questionId === questionId);

/**
 * 다음 스텝 — fixed selector: fixedOrder를 순회하며 아직 답하지 않은 첫 항목을
 * 찾는다. '@group'은 그룹 내 appliesWhen 충족 질문 중 order 최소 1개(없으면 그룹
 * 스킵 — 예: 프리셋 진입으로 persona가 없으면 역할 분기 scale 질문이 모두 불충족).
 */
export function nextStep(
  kb: DiagnosisKB,
  state: EngineState,
): { kind: 'question'; question: Question } | { kind: 'exit'; to: string } | { kind: 'result'; slug: string } {
  if (state.exit) return { kind: 'exit', to: state.exit };

  for (const entry of kb.flow.fixedOrder) {
    if (entry.startsWith('@')) {
      const group = entry.slice(1);
      const candidates = kb.questions
        .filter((q) => q.group === group && !answered(state, q.id) && matchesWhen(q, state))
        .sort((a, b) => a.order - b.order);
      // 그룹에서 이미 하나 답했으면(예: scale) 그 그룹은 완료로 본다
      const groupAnswered = kb.questions.some((q) => q.group === group && answered(state, q.id));
      if (groupAnswered) continue;
      if (candidates.length > 0) return { kind: 'question', question: candidates[0] };
      continue; // 충족 질문 없음 — 그룹 스킵
    }
    const q = kb.questions.find((x) => x.id === entry);
    if (!q) continue; // 검증 ④가 빌드에서 걸러줌 — 런타임 방어만
    if (answered(state, q.id)) continue;
    if (!matchesWhen(q, state)) continue;
    return { kind: 'question', question: q };
  }

  // 전 질문 소진 — 결과 (resultSlug는 cluster 직행 또는 refine result에서 확정됨)
  if (state.resultSlug) return { kind: 'result', slug: state.resultSlug };
  // 방어: 결과 미확정으로 소진되면 안 됨 — 시뮬레이터가 이 경로를 도달 불가로 리포트
  throw new Error('[diagnosis-engine] 질문이 소진됐지만 결과가 확정되지 않았습니다 — flow/질문 뱅크 구성 오류');
}

/**
 * 답 적용 — exits 규칙 → 신호 저장 → 결과 확정(클러스터 1-slug 직행 / refine result).
 * 순수 함수: 새 state를 반환한다.
 */
export function applyAnswer(
  kb: DiagnosisKB,
  state: EngineState,
  questionId: string,
  optionId: string,
): EngineState {
  const q = kb.questions.find((x) => x.id === questionId);
  if (!q) throw new Error(`[diagnosis-engine] 알 수 없는 질문: ${questionId}`);

  const next: EngineState = {
    ...state,
    answers: [...state.answers, { questionId, optionId }],
    signals: { ...state.signals },
  };

  // exit 규칙 (flow.yaml 단일 지점)
  const exitRule = kb.flow.exits.find((e) => e.question === questionId && e.option === optionId);
  if (exitRule) {
    next.exit = exitRule.to;
    // exit라도 신호는 저장 (owner '계속 진단' 재진입 시 역할 신호 유지)
    if (q.signal) next.signals[q.signal as keyof Signals] = optionId;
    return next;
  }

  // 신호 저장 — cluster 질문은 복합키, 나머지는 옵션 id
  if (q.signal === 'cluster') {
    next.signals.cluster = optionId; // optionId = "<industry>:<clusterId>" 복합키
    const cluster = deriveClusters(kb, state.signals.industry ?? '').find((c) => c.key === optionId);
    if (cluster && cluster.slugs.length === 1) {
      next.resultSlug = cluster.slugs[0]; // 1-slug 직행 — refine 증상 질문은 신호만 수집
    }
  } else if (q.signal) {
    next.signals[q.signal as keyof Signals] = optionId;
  }

  // refine tiebreak — 옵션이 결과 slug를 하드 결정
  const opt = (q.options ?? []).find((o) => o.id === optionId);
  if (opt?.result) next.resultSlug = opt.result;

  return next;
}

/** exit-owner의 "계속 진단" — 역할 답을 유지한 채 흐름으로 복귀 */
export function resumeFromExit(state: EngineState): EngineState {
  return { ...state, exit: null };
}

/**
 * 특정 질문으로 되감기 — 해당 질문의 답부터 절단하고, 남은 답을 처음부터 재적용해
 * 신호·결과를 재구축한다 (v3 §7 시나리오 D: 되감기 시 신호 정합).
 */
export function rewindTo(kb: DiagnosisKB, state: EngineState, questionId: string): EngineState {
  const idx = state.answers.findIndex((a) => a.questionId === questionId);
  if (idx < 0) return state;
  const kept = state.answers.slice(0, idx);
  let next = createState({
    industry: state.presetIndustry ?? undefined,
    persona: state.presetPersona ?? undefined,
  });
  for (const a of kept) next = applyAnswer(kb, next, a.questionId, a.optionId);
  return next;
}

/** 진행 표시 — 6문항 고정 (v3 §3: 진행바가 흔들리지 않는다. 프리셋도 스텝 수 유지) */
export function progress(kb: DiagnosisKB, state: EngineState): { stepNumber: number; totalSteps: number } {
  return { stepNumber: Math.min(state.answers.length + 1, 6), totalSteps: 6 };
}
