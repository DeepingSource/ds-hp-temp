#!/usr/bin/env node
// 진단 시뮬레이터 CLI (E2 — diagnosis-v4-engine-plan §5). Run: `npm run sim:diagnosis`.
// 컴파일된 지식 베이스(diagnosis.json)를 로드해 전 경로를 열거하고 골든 패스
// 픽스처를 검증한다. 엔진·시뮬레이터 코어는 src/lib/diagnosis/의 순수 TS 모듈을
// 그대로 import (Node 23.6+ type stripping — 이중 구현 없음). 위반 시 exit 1.
// CI(vitest)는 같은 코어를 src/lib/diagnosis/engine.test.ts 에서 실행한다.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { enumerateAll, runFixture, runFixtureAdaptive, equivalenceReport } from '../src/lib/diagnosis/simulate.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const kb = JSON.parse(readFileSync(path.join(ROOT, 'src/data/generated/diagnosis.json'), 'utf8'));

let failed = false;

// ── 전 경로 열거 리포트 ──────────────────────────────────────────────────────
const r = enumerateAll(kb);
console.log('── 진단 전 경로 열거 (fixed selector) ──');
console.log(`경로 수: ${r.pathCount} (결과 도달) · exit: ${JSON.stringify(r.exitCounts)}`);
console.log(`경로 길이: ${r.pathLengths.min}~${r.pathLengths.max}문항`);
console.log('slug별 도달 경로 수:');
for (const [slug, n] of Object.entries(r.resultCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${slug}`);
}
if (r.unreachable.length > 0) {
  console.error(`✗ 도달 불가 slug ${r.unreachable.length}건: ${r.unreachable.join(', ')}`);
  failed = true;
} else {
  console.log('✓ 도달 불가 slug 0');
}
if (r.deadQuestions.length > 0 || r.deadOptions.length > 0) {
  console.error(`✗ dead copy — 질문: [${r.deadQuestions.join(', ')}] 옵션: [${r.deadOptions.join(', ')}]`);
  failed = true;
} else {
  console.log('✓ dead copy 0 (전 질문·정적 옵션 출제됨)');
}

// ── 골든 패스 픽스처 ────────────────────────────────────────────────────────
console.log(`\n── 골든 패스 픽스처 ${kb.fixtures.length}종 ──`);
for (const fx of kb.fixtures) {
  const run = runFixture(kb, fx);
  console.log(`${run.ok ? '✓' : '✗'} ${run.name} — ${run.detail}`);
  if (!run.ok) failed = true;
}

// ── adaptive 전 경로 열거 (E3 — v4 §5: reject 루프 종료 보장) ────────────────
const adaptiveKb = { ...kb, flow: { ...kb.flow, selector: 'adaptive' } };
const ra = enumerateAll(adaptiveKb);
console.log('\n── 진단 전 경로 열거 (adaptive selector) ──');
console.log(`경로 수: ${ra.pathCount} · 확인 스텝 노출: ${ra.confirmCount}회 · exit: ${JSON.stringify(ra.exitCounts)}`);
console.log(`경로 길이: ${ra.pathLengths.min}~${ra.pathLengths.max}문항 (flow min ${kb.flow.adaptive.minQuestions} · max ${kb.flow.adaptive.maxQuestions})`);
if (ra.unreachable.length > 0) {
  console.error(`✗ [adaptive] 도달 불가 slug ${ra.unreachable.length}건: ${ra.unreachable.join(', ')}`);
  failed = true;
} else {
  console.log('✓ [adaptive] 도달 불가 slug 0 · 열거 완주 = 확인 부정 루프 종료 보장');
}
if (ra.pathLengths.max > kb.flow.adaptive.maxQuestions) {
  console.error(`✗ [adaptive] 경로 길이 ${ra.pathLengths.max} > maxQuestions ${kb.flow.adaptive.maxQuestions}`);
  failed = true;
}

// ── 셀렉터 동등성 리포트 (v4 §5 — E3 전환 승인 근거 자료) ────────────────────
console.log('\n── 셀렉터 동등성 (fixed vs adaptive) ──');
const eq = equivalenceReport(kb, kb.fixtures.filter((f) => !f.expect.exit));
for (const row of eq) {
  const mark = row.match ? '✓' : '✗';
  console.log(
    `${mark} ${row.fixture} — fixed: ${row.fixedResult} (${row.fixedQuestions}문항) · adaptive: ${row.adaptiveResult} (${row.adaptiveQuestions}문항)`,
  );
  if (!row.match) failed = true;
}
const avgF = eq.reduce((n, r2) => n + r2.fixedQuestions, 0) / eq.length;
const avgA = eq.reduce((n, r2) => n + r2.adaptiveQuestions, 0) / eq.length;
console.log(`평균 질문 수 — fixed ${avgF.toFixed(1)} · adaptive ${avgA.toFixed(1)} (배포 기준: adaptive ≤ fixed, v4 §6)`);

// ── 3로케일 낭독 대본 (G3 게이트 검수용 — --script 옵션) ────────────────────
if (process.argv.includes('--script')) {
  console.log('\n── 픽스처 대본 (ko · fixed) ──');
  for (const fx of kb.fixtures) {
    const run = runFixture(kb, fx);
    console.log(`\n[${fx.name}]`);
    for (const t of run.transcript) console.log(`  Q: ${t.question}\n  A: ${t.answer}`);
  }
  console.log('\n── 픽스처 대본 (ko · adaptive — 확인 스텝 포함) ──');
  for (const fx of kb.fixtures.filter((f) => !f.expect.exit)) {
    const run = runFixtureAdaptive(kb, fx);
    console.log(`\n[${fx.name}] (${run.questionCount}문항${run.confirmShown ? ' + 확인' : ''})`);
    for (const t of run.transcript) console.log(`  Q: ${t.question}\n  A: ${t.answer}`);
  }
}

if (failed) {
  console.error('\n시뮬레이터 검증 실패 — 위 항목을 수정하세요.');
  process.exit(1);
}
console.log('\n시뮬레이터 리포트 클린.');
