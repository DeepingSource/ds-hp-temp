import { describe, it, expect } from 'vitest';
import kbJson from '@/data/generated/diagnosis.json';
import {
  applyAnswer,
  createState,
  nextStep,
  rewindTo,
  type DiagnosisKB,
} from './engine.ts';
import { enumerateAll, runFixture, type Fixture } from './simulate.ts';

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
    let s2 = applyAnswer(kb, rewound, 'problem-cluster', 'cafe:merchandising');
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
