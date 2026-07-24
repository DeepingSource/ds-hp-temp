import { describe, it, expect } from 'vitest';
import kbJson from '@/data/generated/diagnosis.json';
import {
  applyAnswer,
  createState,
  nextStep,
  rewindTo,
  type DiagnosisKB,
  applyConfirm,
  liveCandidates,
  scoreCandidates,
  usefulness,
} from './engine.ts';
import { enumerateAll, runFixture, runFixtureAdaptive, equivalenceReport, type Fixture } from './simulate.ts';

/**
 * E2 CI (diagnosis-v4-engine-plan §5) — 카피나 태그 수정이 결과를 바꾸면 즉시 검출.
 * 컴파일된 지식 베이스(diagnosis.json) 기준: gen 검증 5종은 빌드에서, 경로 성질은
 * 여기서 지킨다. 리포트 CLI는 `npm run sim:diagnosis` (같은 simulate 코어).
 */

const kb = kbJson as unknown as DiagnosisKB;

describe('diagnosis engine — 전 경로 열거 (E2)', () => {
  const report = enumerateAll(kb);

  it('모든 시나리오 slug가 최소 1개 경로로 도달 가능하다', () => {
    expect(report.unreachable).toEqual([]);
  });

  it('dead copy가 없다 — 전 질문·정적 옵션이 출제된다', () => {
    expect(report.deadQuestions).toEqual([]);
    expect(report.deadOptions).toEqual([]);
  });

  it('결과 경로는 항상 6문항 고정이다 (v3 §3 — 진행바가 흔들리지 않는다)', () => {
    expect(report.pathLengths.min).toBe(6);
    expect(report.pathLengths.max).toBe(6);
  });

  it('이탈 3종이 전부 존재한다', () => {
    expect(Object.keys(report.exitCounts).sort()).toEqual([
      'exit-owner',
      'exit-privacy',
      'exit-unsure',
    ]);
  });
});

describe('diagnosis engine — 골든 패스 픽스처 (v4 §2-4)', () => {
  for (const fx of kb.fixtures as Fixture[]) {
    it(fx.name, () => {
      const run = runFixture(kb, fx);
      expect(run.detail && run.ok, run.detail).toBe(true);
    });
  }
});

describe('diagnosis engine — 되감기 신호 재구축 (v3 §7 시나리오 D)', () => {
  it('중간 답을 되감으면 하류 신호·결과가 재구축된다', () => {
    let s = createState();
    s = applyAnswer(kb, s, 'role', 'hq_sv');
    s = applyAnswer(kb, s, 'industry', 'cafe');
    s = applyAnswer(kb, s, 'scale-stores', 'mid');
    s = applyAnswer(kb, s, 'problem-cluster', 'cafe:congestion');
    s = applyAnswer(kb, s, 'refine-cafe-congestion', 'cafe-customer-wait-time');
    expect(s.resultSlug).toBe('cafe-customer-wait-time');

    // 문제 영역(problem-cluster)으로 되감기 — 클러스터·결과·증상이 리셋되고
    // 역할·업종·규모 신호는 유지되어야 한다
    const rewound = rewindTo(kb, s, 'problem-cluster');
    expect(rewound.signals.persona).toBe('hq_sv');
    expect(rewound.signals.industry).toBe('cafe');
    expect(rewound.signals.scale).toBe('mid');
    expect(rewound.signals.cluster).toBeNull();
    expect(rewound.resultSlug).toBeNull();

    // 다른 클러스터로 재진행 — 1-slug 직행 + 증상 질문 경유
    const s2 = applyAnswer(kb, rewound, 'problem-cluster', 'cafe:merchandising');
    expect(s2.resultSlug).toBe('cafe-low-seat-turnover');
    const next = nextStep(kb, s2);
    expect(next.kind).toBe('question');
    if (next.kind === 'question') expect(next.question.id).toBe('refine-cafe-turnover');
  });

  it('프리셋 industry는 되감기 후에도 유지된다', () => {
    let s = createState({ industry: 'cafe' });
    s = applyAnswer(kb, s, 'role', 'hq_sv');
    s = applyAnswer(kb, s, 'industry', 'cafe');
    const rewound = rewindTo(kb, s, 'industry');
    expect(rewound.presetIndustry).toBe('cafe');
    expect(rewound.signals.persona).toBe('hq_sv');
  });
});


// ═══ E3 적응형 (v4 §3·§5 — Stage 8) ═══════════════════════════════════════════

const adaptiveKb: DiagnosisKB = { ...kb, flow: { ...kb.flow, selector: 'adaptive' } };
const fixtures = kb.fixtures as Fixture[];

describe('diagnosis engine — E3 점수 모델·usefulness (v4 §3-1·§3-2)', () => {
  it('evidence 일치가 점수를 올리고, 정렬은 결정적이다', () => {
    let s = createState();
    s = applyAnswer(kb, s, 'role', 'hq_sv');
    s = applyAnswer(kb, s, 'industry', 'convenience');
    const before = scoreCandidates(kb, s);
    // 증상 답(night)은 convenience-night-theft의 태그와 일치 — 점수 상승
    s = applyAnswer(kb, s, 'problem-cluster', 'convenience:theft_loss');
    s = applyAnswer(kb, s, 'refine-convenience-theft', 'night');
    const after = scoreCandidates(kb, s);
    expect(after[0].slug).toBe('convenience-night-theft');
    expect(after[0].evidence).toBeGreaterThan(0);
    // 하드 필터: cluster 지정 후 후보는 해당 클러스터로 축소
    expect(after.length).toBeLessThanOrEqual(before.length);
    // 재실행 동일 결과 (랜덤성 금지)
    expect(scoreCandidates(kb, s)).toEqual(after);
  });

  it('usefulness — 갈라놓지 못하는 질문은 0, industry는 최대 분별', () => {
    const s = createState();
    const candidates = liveCandidates(kb, s);
    const industryQ = kb.questions.find((q) => q.id === 'industry')!;
    const goalQ = kb.questions.find((q) => q.id === 'goal')!;
    expect(usefulness(kb, industryQ, candidates)).toBeGreaterThan(0);
    // goal은 시나리오 태그에 없음 — 분별 0 (필러로만 출제)
    expect(usefulness(kb, goalQ, candidates)).toBe(0);
  });

  it('rejectedSlugs는 후보에서 제외된다', () => {
    let s = createState();
    s = applyAnswer(kb, s, 'industry', 'convenience');
    const all = liveCandidates(kb, s);
    const excluded = { ...s, rejectedSlugs: [all[0]] };
    expect(liveCandidates(kb, excluded)).not.toContain(all[0]);
  });
});

describe('diagnosis engine — E3 확인 스텝·reject 루프 (v4 §3-3)', () => {
  const reachConfirm = () => {
    let s = createState();
    s = applyAnswer(adaptiveKb, s, 'role', 'hq_sv');
    // adaptive가 어떤 순서로 묻든 답을 공급해 confirm까지 전진
    for (let i = 0; i < 12; i++) {
      const step = nextStep(adaptiveKb, s);
      if (step.kind === 'confirm') return s;
      if (step.kind !== 'question') throw new Error(`unexpected ${step.kind}`);
      const q = step.question;
      const pick =
        q.id === 'industry' ? 'convenience'
        : q.signal === 'cluster' ? 'convenience:theft_loss'
        : (q.options ?? [])[0]?.id;
      if (!pick) throw new Error(`no option for ${q.id}`);
      s = applyAnswer(adaptiveKb, s, q.id, pick);
    }
    throw new Error('confirm 미도달');
  };

  it('종료 조건 충족 시 confirm 스텝이 나온다 (minQuestions 이상)', () => {
    const s = reachConfirm();
    expect(s.answers.length).toBeGreaterThanOrEqual(adaptiveKb.flow.adaptive.minQuestions);
    const step = nextStep(adaptiveKb, s);
    expect(step.kind).toBe('confirm');
  });

  it('긍정 → 결과 확정, 부정 반복 → maxRejects 초과 시 closest 종결', () => {
    const s = reachConfirm();
    const step = nextStep(adaptiveKb, s);
    if (step.kind !== 'confirm') throw new Error('confirm 아님');

    const accepted = applyConfirm(adaptiveKb, s, true);
    expect(accepted.resultSlug).toBe(step.top);
    expect(accepted.resultClosest).toBe(false);

    // 부정 → top 제외. maxRejects(1) 초과되는 두 번째 부정 → closest
    let r = applyConfirm(adaptiveKb, s, false);
    expect(r.rejectedSlugs).toContain(step.top);
    // 재개 후 다음 confirm(또는 질문 소진 시 즉시)에서 다시 부정
    for (let i = 0; i < 12 && !r.resultSlug; i++) {
      const st = nextStep(adaptiveKb, r);
      if (st.kind === 'confirm') r = applyConfirm(adaptiveKb, r, false);
      else if (st.kind === 'question') {
        const pick = (st.question.options ?? [])[0]?.id;
        if (!pick) throw new Error(`no option for ${st.question.id}`);
        r = applyAnswer(adaptiveKb, r, st.question.id, pick);
      } else break;
    }
    expect(r.resultSlug).toBeTruthy();
    expect(r.resultClosest).toBe(true);
    // 차순위가 있으면 부정한 top이 그대로 나오지 않고, 없으면(1-slug 클러스터)
    // "그나마 가장 가까운" top이 closest 톤으로 재제시된다 — 어느 쪽이든 종결(v4 §3-3)
    if (r.rejectedSlugs.length < liveCandidates(kb, { ...r, rejectedSlugs: [] }).length) {
      expect(r.rejectedSlugs).toContain(step.top);
    }
  });
});

describe('diagnosis engine — E3 전 경로 열거·동등성 (v4 §5)', () => {
  it('adaptive 전 경로: 도달 불가 0 · reject 루프 종료 · 질문 수 상한 준수', () => {
    const report = enumerateAll(adaptiveKb);
    expect(report.unreachable).toEqual([]);
    expect(report.confirmCount).toBeGreaterThan(0);
    expect(report.pathLengths.max).toBeLessThanOrEqual(adaptiveKb.flow.adaptive.maxQuestions);
    expect(report.pathCount).toBeGreaterThan(0); // 발산 없이 완주 = 종료 보장
  });

  it('fixtures 전건: fixed와 adaptive가 같은 결과에 도달한다', () => {
    const rows = equivalenceReport(kb, fixtures.filter((f) => !f.expect.exit));
    for (const row of rows) {
      expect(row.match, `${row.fixture}: fixed=${row.fixedResult} adaptive=${row.adaptiveResult}`).toBe(true);
    }
  });

  it('adaptive 평균 질문 수 ≤ fixed (v4 §6 배포 기준의 정적 근사)', () => {
    const rows = equivalenceReport(kb, fixtures.filter((f) => !f.expect.exit));
    const avgFixed = rows.reduce((n, r) => n + r.fixedQuestions, 0) / rows.length;
    const avgAdaptive = rows.reduce((n, r) => n + r.adaptiveQuestions, 0) / rows.length;
    expect(avgAdaptive).toBeLessThanOrEqual(avgFixed);
  });

  it('확인 스텝이 골든 패스에서 노출된다 (Akinator 체감 — v4 §3-3)', () => {
    const runs = fixtures.filter((f) => !f.expect.exit).map((f) => runFixtureAdaptive(kb, f));
    expect(runs.every((r) => r.confirmShown)).toBe(true);
  });
});
