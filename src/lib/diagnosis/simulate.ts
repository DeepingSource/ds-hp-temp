/**
 * diagnosis simulate — E2 시뮬레이션 하네스 코어 (diagnosis-v4-engine-plan §5).
 *
 * React 무의존 순수 함수: scripts/diagnosis-sim.mjs(리포트 CLI)와 vitest
 * (engine.test.ts — CI 회귀 검출)가 이 모듈을 공유한다. "시나리오는 쓰는 것이
 * 아니라 돌려보는 것" — 전 경로를 BFS/DFS로 열거해 도달 불가 slug·경로 길이
 * 위반·dead copy(한 번도 출제되지 않는 질문/옵션)를 기계적으로 잡는다.
 */

import {
  applyAnswer,
  applyConfirm,
  createState,
  deriveClusters,
  nextStep,
  resumeFromExit,
  type DiagnosisKB,
  type EngineState,
  type Question,
} from './engine.ts';

export interface SimReport {
  /** 결과에 도달한 경로 총수 */
  pathCount: number;
  /** slug → 도달 경로 수 */
  resultCounts: Record<string, number>;
  /** 어떤 답 조합으로도 도달할 수 없는 시나리오 slug */
  unreachable: string[];
  /** 결과 경로의 질문 수 분포 */
  pathLengths: { min: number; max: number };
  /** exit 종류 → 경로 수 */
  exitCounts: Record<string, number>;
  /** 한 번도 출제되지 않은 질문 id (dead copy) */
  deadQuestions: string[];
  /** 한 번도 선택 가능 상태로 노출되지 않은 정적 옵션 "questionId:optionId" */
  deadOptions: string[];
  /** adaptive 전용 — 확인 스텝 노출 횟수와 reject 루프 종료 보장 확인 (v4 §5) */
  confirmCount: number;
}

/** 활성 질문의 선택 가능한 옵션 id 목록 — 런타임 파생 옵션(업종·클러스터) 포함 */
export function optionsFor(kb: DiagnosisKB, state: EngineState, q: Question): string[] {
  if (q.kind === 'industry-grid') {
    // 시나리오가 있는 업종만 (UI의 industryHasScenarios 필터와 동일)
    return [...new Set(Object.values(kb.scenarios).map((s) => s.industry))];
  }
  if (q.kind === 'cluster-list') {
    const clusters = deriveClusters(kb, state.signals.industry ?? '');
    return [...clusters.map((c) => c.key), ...(q.universalOptions ?? []).map((o) => o.id)];
  }
  return (q.options ?? []).map((o) => o.id);
}

/** 전 경로 열거 — preset 없는 기본 진입 기준 (프리셋 경로는 fixture로 검증) */
export function enumerateAll(kb: DiagnosisKB): SimReport {
  const resultCounts: Record<string, number> = {};
  const exitCounts: Record<string, number> = {};
  const seenQuestions = new Set<string>();
  const seenOptions = new Set<string>();
  let pathCount = 0;
  let minLen = Infinity;
  let maxLen = 0;

  let confirmCount = 0;

  const stack: EngineState[] = [createState()];
  while (stack.length > 0) {
    const state = stack.pop()!;
    const step = nextStep(kb, state);
    // adaptive 확인 스텝 — 긍정/부정 두 분기 모두 열거. 부정은 rejects 증가로
    // 유한(maxRejects 초과 시 closest 종결) — 무한 루프면 이 열거가 발산해 잡힌다.
    if (step.kind === 'confirm') {
      confirmCount++;
      stack.push(applyConfirm(kb, state, true));
      stack.push(applyConfirm(kb, state, false));
      continue;
    }
    if (step.kind === 'result') {
      pathCount++;
      resultCounts[step.slug] = (resultCounts[step.slug] ?? 0) + 1;
      minLen = Math.min(minLen, state.answers.length);
      maxLen = Math.max(maxLen, state.answers.length);
      continue;
    }
    if (step.kind === 'exit') {
      exitCounts[step.to] = (exitCounts[step.to] ?? 0) + 1;
      // exit-owner의 "계속 진단" 재진입 분기도 전 경로에 포함 (v3 §7 E-1:
      // 재진입 후 규모 질문이 owner 문구 — scale-owner가 이 분기에서만 출제됨)
      if (step.to === 'exit-owner') stack.push(resumeFromExit(state));
      continue;
    }
    const q = step.question;
    seenQuestions.add(q.id);
    for (const optionId of optionsFor(kb, state, q)) {
      // 정적 옵션만 dead copy 추적 대상 (파생 옵션은 콘텐츠에서 나오므로 제외)
      if ((q.options ?? []).some((o) => o.id === optionId) || (q.universalOptions ?? []).some((o) => o.id === optionId)) {
        seenOptions.add(`${q.id}:${optionId}`);
      }
      stack.push(applyAnswer(kb, state, q.id, optionId));
    }
  }

  const unreachable = Object.keys(kb.scenarios).filter((slug) => !(slug in resultCounts));
  const deadQuestions = kb.questions
    .filter((q) => !seenQuestions.has(q.id))
    .map((q) => q.id)
    // industry 확인(confirm) 변형은 프리셋 전용이라 기본 열거에서 미출제여도 정상 —
    // 질문 자체(industry)는 일반 그리드로 출제되므로 여기 걸리지 않는다.
    .filter((id) => id !== '');
  const deadOptions = kb.questions
    .flatMap((q) => [
      ...(q.options ?? []).map((o) => `${q.id}:${o.id}`),
      ...(q.universalOptions ?? []).map((o) => `${q.id}:${o.id}`),
    ])
    .filter((key) => !seenOptions.has(key));

  return {
    pathCount,
    resultCounts,
    unreachable,
    pathLengths: { min: minLen === Infinity ? 0 : minLen, max: maxLen },
    exitCounts,
    deadQuestions,
    deadOptions,
    confirmCount,
  };
}

export interface Fixture {
  name: string;
  preset?: { industry?: string; persona?: string };
  answers: string[];
  expect: { result?: string; exit?: string; maxQuestions?: number };
}

export interface FixtureRun {
  name: string;
  ok: boolean;
  detail: string;
  transcript: { question: string; answer: string }[];
}

/** 골든 패스 실행 — answers를 순서대로 적용하며 기대 결과와 대조 (v4 §2-4) */
export function runFixture(kb: DiagnosisKB, fx: Fixture): FixtureRun {
  let state = createState(fx.preset);
  const transcript: { question: string; answer: string }[] = [];

  for (const optionId of fx.answers) {
    let step = nextStep(kb, state);
    // exit-owner에서 답이 더 남아 있으면 "계속 진단" 재진입으로 해석 (E-1 확장 경로)
    if (step.kind === 'exit' && step.to === 'exit-owner') {
      state = resumeFromExit(state);
      step = nextStep(kb, state);
    }
    if (step.kind !== 'question') {
      const at = step.kind === 'exit' ? step.to : step.kind === 'result' ? step.slug : 'confirm';
      return {
        name: fx.name,
        ok: false,
        detail: `답 "${optionId}"를 적용할 질문이 없습니다 — 현재 스텝: ${at}`,
        transcript,
      };
    }
    const valid = optionsFor(kb, state, step.question);
    if (!valid.includes(optionId)) {
      return {
        name: fx.name,
        ok: false,
        detail: `질문 "${step.question.id}"에 옵션 "${optionId}"가 없습니다 (가능: ${valid.join(', ')})`,
        transcript,
      };
    }
    transcript.push({ question: step.question.text.ko, answer: optionId });
    state = applyAnswer(kb, state, step.question.id, optionId);
  }

  const final = nextStep(kb, state);
  if (fx.expect.exit) {
    const ok = final.kind === 'exit' && final.to === fx.expect.exit;
    return { name: fx.name, ok, detail: ok ? 'exit 일치' : `기대 exit ${fx.expect.exit}, 실제 ${final.kind === 'exit' ? final.to : final.kind}`, transcript };
  }
  if (final.kind !== 'result') {
    const at =
      final.kind === 'question' ? `question:${final.question.id}` : final.kind === 'exit' ? final.to : 'confirm';
    return { name: fx.name, ok: false, detail: `결과에 도달하지 못했습니다 — 스텝: ${at}`, transcript };
  }
  if (fx.expect.result && final.slug !== fx.expect.result) {
    return { name: fx.name, ok: false, detail: `기대 ${fx.expect.result}, 실제 ${final.slug}`, transcript };
  }
  if (fx.expect.maxQuestions && state.answers.length > fx.expect.maxQuestions) {
    return { name: fx.name, ok: false, detail: `질문 수 ${state.answers.length} > 최대 ${fx.expect.maxQuestions}`, transcript };
  }
  return { name: fx.name, ok: true, detail: `${final.slug} (${state.answers.length}문항)`, transcript };
}

// ═══ E3 셀렉터 동등성 (v4 §5) ══════════════════════════════════════════════════

/** fixture answers(fixedOrder 위치 기반)를 질문 group → 답 매핑으로 변환 */
const GROUP_SLOT: Record<string, number> = { role: 0, industry: 1, scale: 2, problem: 3, refine: 4, goal: 5 };

export interface AdaptiveRun {
  name: string;
  ok: boolean;
  detail: string;
  questionCount: number;
  confirmShown: boolean;
  transcript: { question: string; answer: string }[];
}

/**
 * adaptive 셀렉터로 fixture 재생 — 질문이 어떤 순서로 나와도 group 슬롯으로 답을
 * 찾는다. 확인 스텝은 긍정으로 응답(골든 패스 = 사용자가 요약에 동의하는 경로).
 * cluster 답은 fixture의 clusterId를 복합키로 변환해 적용한다.
 */
export function runFixtureAdaptive(kb: DiagnosisKB, fx: Fixture): AdaptiveRun {
  const adaptiveKb: DiagnosisKB = { ...kb, flow: { ...kb.flow, selector: 'adaptive' } };
  let state = createState(fx.preset);
  const transcript: { question: string; answer: string }[] = [];
  let confirmShown = false;

  // 발산 방어 — maxQuestions + 확인 reject 상한을 넘는 스텝 수는 구성 오류
  for (let guard = 0; guard < 32; guard++) {
    let step = nextStep(adaptiveKb, state);
    if (step.kind === 'exit') {
      if (step.to === 'exit-owner' && fx.answers.length > transcript.length) {
        state = resumeFromExit(state);
        step = nextStep(adaptiveKb, state);
      } else {
        const ok = fx.expect.exit === step.to;
        return { name: fx.name, ok, detail: ok ? 'exit 일치' : `exit ${step.to}`, questionCount: state.answers.length, confirmShown, transcript };
      }
    }
    if (step.kind === 'confirm') {
      confirmShown = true;
      state = applyConfirm(adaptiveKb, state, true);
      continue;
    }
    if (step.kind === 'result') {
      const ok = !fx.expect.result || step.slug === fx.expect.result;
      return {
        name: fx.name,
        ok,
        detail: ok ? `${step.slug} (${state.answers.length}문항)` : `기대 ${fx.expect.result}, 실제 ${step.slug}`,
        questionCount: state.answers.length,
        confirmShown,
        transcript,
      };
    }
    if (step.kind !== 'question') break;
    const q = step.question;
    const slot = GROUP_SLOT[q.group];
    let answer = slot != null ? fx.answers[slot] : undefined;
    // cluster는 복합키 변환, 슬롯에 답이 없으면(짧은 exit fixture 등) 첫 옵션으로 진행
    if (q.signal === 'cluster' && answer) answer = `${state.signals.industry}:${answer.includes(':') ? answer.split(':')[1] : answer}`;
    const valid = optionsFor(adaptiveKb, state, q);
    if (!answer || !valid.includes(answer)) answer = valid[0];
    if (!answer) {
      return { name: fx.name, ok: false, detail: `질문 "${q.id}"에 적용할 답이 없습니다`, questionCount: state.answers.length, confirmShown, transcript };
    }
    transcript.push({ question: q.text.ko, answer });
    state = applyAnswer(adaptiveKb, state, q.id, answer);
  }
  return { name: fx.name, ok: false, detail: '스텝 상한 초과 — 종료 조건 미충족(구성 오류)', questionCount: state.answers.length, confirmShown, transcript };
}

export interface EquivalenceRow {
  fixture: string;
  fixedResult: string;
  adaptiveResult: string;
  fixedQuestions: number;
  adaptiveQuestions: number;
  match: boolean;
}

/** 셀렉터 동등성 리포트 — 동일 fixture에 대한 fixed vs adaptive 결과·질문 수 비교 (v4 §5) */
export function equivalenceReport(kb: DiagnosisKB, fixtures: Fixture[]): EquivalenceRow[] {
  const fixedKb: DiagnosisKB = { ...kb, flow: { ...kb.flow, selector: 'fixed' } };
  return fixtures.map((fx) => {
    const fixed = runFixture(fixedKb, fx);
    const adaptive = runFixtureAdaptive(kb, fx);
    const fixedResult = fixed.ok ? fixed.detail.split(' ')[0] : `FAIL:${fixed.detail}`;
    const adaptiveResult = adaptive.ok ? adaptive.detail.split(' ')[0] : `FAIL:${adaptive.detail}`;
    return {
      fixture: fx.name,
      fixedResult,
      adaptiveResult,
      fixedQuestions: fixed.transcript.length,
      adaptiveQuestions: adaptive.questionCount,
      match: fixed.ok && adaptive.ok && fixedResult === adaptiveResult,
    };
  });
}
