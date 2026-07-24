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
  /** 결과 도입부 되받기 문장 — 증상 옵션 전용 (v3 §5, Stage 4에서 렌더) */
  reflect?: Tri;
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
  /** E3 확인 스텝에서 "조금 달라요"로 제외된 후보들 (v4 §3-3 reject 루프) */
  rejectedSlugs: string[];
  /** 확인 부정 횟수 — flow.adaptive.maxRejects 초과 시 차순위 closest 종결 */
  rejects: number;
  /** closest 종결 여부 — 결과를 "이 사례가 가장 가깝습니다" 톤으로 렌더 */
  resultClosest: boolean;
  /** adaptive 전용 — 확인 스텝을 거쳐 결과가 확정됐는가(E1 직행 resultSlug와 구분) */
  confirmed: boolean;
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
    rejectedSlugs: [],
    rejects: 0,
    resultClosest: false,
    confirmed: false,
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

// ═══ E3 적응형 — 점수 모델·질문 선택 (v4 §3-1·§3-2) ═══════════════════════════

export interface CandidateScore {
  slug: string;
  score: number;
  /** 디버깅용 분해 — dev 점수표 콘솔("왜 이 결과가 나왔나" 재현, v4 §3-1) */
  prior: number;
  evidence: number;
  /** E1 하드 결정(1-slug 직행·refine result)이 지목한 후보 — 정렬 최상위 pin */
  decided: boolean;
}

/**
 * 하드 필터 통과 후보 — industry·cluster는 후보군 축소(현행 동작 보존),
 * rejectedSlugs(확인 부정)는 제외. 순서는 kb.scenarios 삽입 순 — 결정적.
 */
export function liveCandidates(kb: DiagnosisKB, state: EngineState): string[] {
  const { industry, cluster } = state.signals;
  const clusterId = cluster ? cluster.split(':')[1] : null;
  return Object.entries(kb.scenarios)
    .filter(([slug, s]) => {
      if (state.rejectedSlugs.includes(slug)) return false;
      if (industry && s.industry !== industry) return false;
      if (clusterId && s.cluster !== clusterId) return false;
      return true;
    })
    .map(([slug]) => slug);
}

/**
 * 가중합 점수 (v4 §3-1): score = prior + Σ evidence.weight(답의 evidence가 후보
 * 태그와 일치). 베이지안 대신 설명 가능한 가중합 — 정렬은 점수 내림차순, 동률은
 * kb 삽입 순(결정적 타이브레이크, §8 랜덤성 금지).
 */
export function scoreCandidates(kb: DiagnosisKB, state: EngineState): CandidateScore[] {
  const candidates = liveCandidates(kb, state);
  const rows = candidates.map((slug, insertIdx) => {
    const s = kb.scenarios[slug];
    let evidence = 0;
    for (const a of state.answers) {
      const q = kb.questions.find((x) => x.id === a.questionId);
      const opt = (q?.options ?? []).find((o) => o.id === a.optionId);
      for (const ev of opt?.evidence ?? []) {
        const tagged = s.attributes[ev.attribute as keyof ScenarioTag['attributes']];
        if (tagged?.includes(ev.value)) evidence += ev.weight;
      }
    }
    const decided = state.resultSlug === slug;
    return { slug, score: s.prior + evidence, prior: s.prior, evidence, decided, insertIdx };
  });
  return rows
    .sort((a, b) => Number(b.decided) - Number(a.decided) || b.score - a.score || a.insertIdx - b.insertIdx)
    .map(({ insertIdx: _drop, ...row }) => row);
}

/** 옵션이 갈라놓는 후보 부분집합 — kind별 분기 기준이 다르다 */
function optionSubsets(kb: DiagnosisKB, q: Question, candidates: string[]): number[] {
  if (q.kind === 'industry-grid') {
    const byIndustry = new Map<string, number>();
    for (const slug of candidates) {
      const ind = kb.scenarios[slug].industry;
      byIndustry.set(ind, (byIndustry.get(ind) ?? 0) + 1);
    }
    return Array.from(byIndustry.values());
  }
  if (q.kind === 'cluster-list') {
    const byCluster = new Map<string, number>();
    for (const slug of candidates) {
      const c = kb.scenarios[slug].cluster;
      byCluster.set(c, (byCluster.get(c) ?? 0) + 1);
    }
    return Array.from(byCluster.values());
  }
  // 일반 옵션 질문 — evidence가 매칭되는 후보 수 (소프트 태그라 부분집합이 겹칠 수 있음)
  return (q.options ?? []).map((opt) => {
    let n = 0;
    for (const slug of candidates) {
      const s = kb.scenarios[slug];
      const hit = (opt.evidence ?? []).some((ev) => {
        const tagged = s.attributes[ev.attribute as keyof ScenarioTag['attributes']];
        return tagged?.includes(ev.value) ?? false;
      });
      if (hit) n += 1;
    }
    return n;
  });
}

/**
 * usefulness (v4 §3-2) — 분별력 최대화의 단순 근사: 최악의 답을 받아도 최소 몇 명의
 * 후보를 걸러내는가 = n − max(부분집합 크기). 3/3(→3) > 5/1(→1) > 6/0(→0=출제 불가).
 * evidence 없는 옵션(부분집합 0)은 분모에만 존재 — 균형도에 자연 반영.
 */
export function usefulness(kb: DiagnosisKB, q: Question, candidates: string[]): number {
  if (candidates.length <= 1) return 0;
  const subsets = optionSubsets(kb, q, candidates);
  if (subsets.length === 0) return 0;
  const max = Math.max(...subsets);
  if (max === 0) return 0; // 어떤 옵션도 후보와 접점이 없음 — 갈라놓지 못함
  return candidates.length - max;
}

/** adaptive phase 진행 순서 — 질문 뱅크의 phase 필드와 계약 (v4 §3-2 "현재 phase") */
const ADAPTIVE_PHASES: Question['phase'][] = ['context', 'problem', 'refine'];

function eligibleInPhase(kb: DiagnosisKB, state: EngineState, phase: Question['phase']): Question[] {
  return kb.questions
    .filter((q) => q.phase === phase && !answered(state, q.id) && matchesWhen(q, state))
    // cluster-list는 업종 신호가 있어야 옵션 파생 가능, 같은 그룹 1문항만(예: scale 분기)
    .filter((q) => !(q.signal === 'cluster' && !state.signals.industry))
    .filter((q) => !kb.questions.some((o) => o.group === q.group && answered(state, o.id)))
    .sort((a, b) => a.order - b.order);
}

const refineAskedOrNone = (kb: DiagnosisKB, state: EngineState) => {
  const eligible = eligibleInPhase(kb, state, 'refine').filter((q) => q.signal !== 'goal');
  const asked = kb.questions.some(
    (q) => q.phase === 'refine' && q.signal !== 'goal' && answered(state, q.id),
  );
  return asked || eligible.length === 0;
};

/**
 * adaptive 다음 스텝 (v4 §3-2·§3-3) — 종료 조건 충족 시 확인 스텝, 아니면
 * phase 순서대로 usefulness 최대 질문. usefulness 0-전원 phase는 건너뛰되,
 * minQuestions 미달·refine 미출제면 필러로 채운다(§3-2 되받기 최소 출제 —
 * 신호 수집 가치: role은 exits·routing, goal은 Stage 4 카드 재정렬에 쓰인다).
 */
function nextStepAdaptive(
  kb: DiagnosisKB,
  state: EngineState,
): { kind: 'question'; question: Question } | { kind: 'confirm'; top: string; second: string | null } | { kind: 'result'; slug: string } {
  // E1 직행 resultSlug는 adaptive에선 '강한 후보'일 뿐 — 확인 스텝을 거쳐야 결과(§3-3)
  if (state.resultSlug && state.confirmed) return { kind: 'result', slug: state.resultSlug };

  const { minQuestions, maxQuestions, confirmThreshold } = kb.flow.adaptive;
  const scored = scoreCandidates(kb, state);
  const asked = state.answers.length;

  const confirmStep = () => {
    if (scored.length === 0) {
      // 방어: 전 후보 소진(모두 reject) — 마지막 reject 후보를 closest로 복귀시키지
      // 않고 시뮬레이터가 도달 불가로 리포트하도록 던진다 (검증 ⑤가 실빌드 방어선)
      throw new Error('[diagnosis-engine] adaptive 후보가 소진됐습니다 — 시나리오 태깅/reject 구성 오류');
    }
    return { kind: 'confirm' as const, top: scored[0].slug, second: scored[1]?.slug ?? null };
  };

  // 종료 판정 (v4 §3-3): top1/top2 ≥ threshold 또는 후보 1개 또는 maxQuestions 도달.
  // minQuestions·refine 최소 출제는 확인 스텝의 선행 조건(§3-2).
  const ratioMet =
    scored.length === 1 ||
    scored[0]?.decided === true ||
    (scored.length >= 2 && scored[0].score >= confirmThreshold * scored[1].score);
  if (asked >= maxQuestions) return confirmStep();
  if (ratioMet && asked >= minQuestions && refineAskedOrNone(kb, state)) return confirmStep();

  const candidates = scored.map((c) => c.slug);

  // phase 순서대로 usefulness 최대 질문 (동률은 order — 결정적)
  for (const phase of ADAPTIVE_PHASES) {
    const eligible = eligibleInPhase(kb, state, phase);
    let best: Question | null = null;
    let bestU = 0;
    for (const q of eligible) {
      const u = usefulness(kb, q, candidates);
      if (u > bestU) {
        best = q;
        bestU = u;
      }
    }
    if (best) return { kind: 'question', question: best };
  }

  // 갈라놓는 질문이 없음 — 필러: ① refine 되받기 미출제분 ② minQuestions 미달 시
  // phase 순·order 순 첫 질문(role·goal 등 신호 수집)
  if (!refineAskedOrNone(kb, state)) {
    const refine = eligibleInPhase(kb, state, 'refine').filter((q) => q.signal !== 'goal');
    if (refine.length > 0) return { kind: 'question', question: refine[0] };
  }
  if (asked < minQuestions) {
    for (const phase of ADAPTIVE_PHASES) {
      const eligible = eligibleInPhase(kb, state, phase);
      if (eligible.length > 0) return { kind: 'question', question: eligible[0] };
    }
  }

  return confirmStep();
}

/**
 * 확인 스텝 응답 (v4 §3-3): 긍정 → 결과 확정. 부정 → top 제외 후 질문 재개,
 * maxRejects 초과 시 차순위를 closest 톤으로 종결(무한 루프 원천 차단).
 */
export function applyConfirm(kb: DiagnosisKB, state: EngineState, accepted: boolean): EngineState {
  const scored = scoreCandidates(kb, state);
  const top = scored[0]?.slug;
  if (!top) throw new Error('[diagnosis-engine] 확인할 후보가 없습니다');

  if (accepted) {
    return { ...state, resultSlug: top, resultClosest: false, confirmed: true };
  }

  const rejects = state.rejects + 1;
  const next: EngineState = {
    ...state,
    rejects,
    rejectedSlugs: [...state.rejectedSlugs, top],
    // E1 하드 결정이 부정됐으면 pin 해제 — 재개 질문·재확인은 나머지 후보 기준
    resultSlug: null,
  };
  const remaining = scoreCandidates(kb, next);
  // maxRejects 초과 — 또는 남은 후보가 아예 없음(1-slug 클러스터에서 부정 등):
  // 어느 쪽이든 closest 톤으로 종결해 무한 루프를 원천 차단(v4 §3-3).
  // 차순위가 없으면 방금 부정된 top이 그나마 가장 가깝다.
  if (rejects > kb.flow.adaptive.maxRejects || remaining.length === 0) {
    next.resultSlug = remaining[0]?.slug ?? top;
    next.resultClosest = true;
    next.confirmed = true;
  }
  return next;
}

export type EngineStep =
  | { kind: 'question'; question: Question }
  | { kind: 'exit'; to: string }
  | { kind: 'confirm'; top: string; second: string | null }
  | { kind: 'result'; slug: string };

/**
 * 다음 스텝 — selector 단일 지점 분기(v4 §2-3): fixed는 fixedOrder를 순회하며 아직
 * 답하지 않은 첫 항목, adaptive는 usefulness 선택 + 확인 스텝(nextStepAdaptive).
 * '@group'은 그룹 내 appliesWhen 충족 질문 중 order 최소 1개(없으면 그룹 스킵 —
 * 예: 프리셋 진입으로 persona가 없으면 역할 분기 scale 질문이 모두 불충족).
 */
export function nextStep(kb: DiagnosisKB, state: EngineState): EngineStep {
  if (state.exit) return { kind: 'exit', to: state.exit };
  if (kb.flow.selector === 'adaptive') return nextStepAdaptive(kb, state);

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

/**
 * 진행 표시 — fixed는 6문항 고정 (v3 §3: 진행바가 흔들리지 않는다). adaptive는
 * min~max 범위 기반의 잔여 감각만(v4 §3-4): 분모 = maxQuestions, 확인 스텝 포함
 * 상한 클램프 — "몇 번째/총 몇"의 확정 약속을 하지 않는 부드러운 진행.
 */
export function progress(kb: DiagnosisKB, state: EngineState): { stepNumber: number; totalSteps: number } {
  if (kb.flow.selector === 'adaptive') {
    const total = kb.flow.adaptive.maxQuestions;
    return { stepNumber: Math.min(state.answers.length + 1, total), totalSteps: total };
  }
  return { stepNumber: Math.min(state.answers.length + 1, 6), totalSteps: 6 };
}
