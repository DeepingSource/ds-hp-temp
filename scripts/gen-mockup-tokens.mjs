#!/usr/bin/env node
// SAAI 목업 토큰 codegen — design-system/design.tokens.md(YAML frontmatter, read-only SSOT)를
// 파싱해 목업이 소비하는 두 산출물을 생성한다 (MOCKUP_MASTER_PLAN_v1 §2-A · D1):
//   1) src/lib/mockup-tokens.gen.ts   — TS 상수 (SAAI_COLORS/TYPE/ROUNDED/SPACING/MOTION)
//   2) src/app/saai-tokens.gen.css    — `.saai-scope { --saai-* }` CSS 변수 블록
// design-system/ 을 직접 import하는 대신 이 산출물만 소비한다(직접 import 금지 — D1).
// Run: `npm run gen:mockup-tokens` (predev/prebuild 자동 실행). 산출물은 커밋된다(tsc 무의존).
// 멱등: 출력이 입력에 결정적 — 같은 SSOT면 재실행 diff 0.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'design-system', 'design.tokens.md');
const OUT_TS = path.join(ROOT, 'src', 'lib', 'mockup-tokens.gen.ts');
const OUT_CSS = path.join(ROOT, 'src', 'app', 'saai-tokens.gen.css');

// ── frontmatter 파싱 ─────────────────────────────────────────────────────────
const raw = fs.readFileSync(SRC, 'utf8');
const lines = raw.split('\n');
if (lines[0].trim() !== '---') throw new Error('design.tokens.md: frontmatter 시작(---) 없음');
const end = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
if (end < 0) throw new Error('design.tokens.md: frontmatter 종료(---) 없음');
const fm = yaml.load(lines.slice(1, end).join('\n'));

// ── `{colors.xxx}` 참조 해석 ────────────────────────────────────────────────
const REF = /^\{colors\.([A-Za-z0-9-]+)\}$/;
function resolveColors(colors) {
  const out = {};
  for (const [k, v] of Object.entries(colors)) {
    const m = typeof v === 'string' && v.match(REF);
    if (!m) {
      out[k] = String(v);
      continue;
    }
    const target = colors[m[1]];
    if (typeof target !== 'string' || REF.test(target)) {
      throw new Error(`colors.${k}: 참조 ${v} 해석 불가 (중첩 참조 또는 미정의)`);
    }
    out[k] = target;
  }
  return out;
}

const colors = resolveColors(fm.colors);
const typography = fm.typography;
const rounded = fm.rounded;
const spacing = fm.spacing;

// ── motion — SSOT frontmatter에 `motion` 최상위 키가 없어(정찰 확인) 여기 상수로
//    소싱한다. 출처: design-system/DESIGN.md ## Motion (out_quint 단일 곡선,
//    bounce·spring·overshoot 금지). SSOT에 motion 키가 생기면 이 블록을 파싱으로 교체.
const motion = {
  ease: {
    'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
    'out-bg': 'ease-out',
  },
  durationMs: {
    instant: 0,
    fast: 150,
    base: 300,
    pane: 480,
    pulse: 800,
    'history-highlight': 1500,
    shimmer: 1500,
  },
};

// ── 산출물 1: TS ────────────────────────────────────────────────────────────
const j = (v) => JSON.stringify(v, null, 2);
const ts = `// ⚠️ 자동 생성 파일 — 손수정 금지.
// 원천: design-system/design.tokens.md (YAML frontmatter, read-only SSOT)
// 생성: scripts/gen-mockup-tokens.mjs — \`npm run gen:mockup-tokens\`
// 규칙(D1): 목업 내부는 이 파일(또는 --saai-* CSS 변수)로만 SAAI DS를 소비한다.
//           design-system/ 직접 import 금지. (MOCKUP_MASTER_PLAN_v1 §2-A)

/** SAAI 컬러 — 스케일(grey/blue/data hues) + semantic alias + status + 차트 팔레트 전체 (참조 해석 완료) */
export const SAAI_COLORS = ${j(colors)} as const;

export type SaaiColorKey = keyof typeof SAAI_COLORS;

/** SAAI 타이포 트랙 — heading/body/special/chart (fontSize·fontWeight·lineHeight) */
export const SAAI_TYPE = ${j(typography)} as const;

/** SAAI 라운딩 스케일 */
export const SAAI_ROUNDED = ${j(rounded)} as const;

/** SAAI 스페이싱 스케일 */
export const SAAI_SPACING = ${j(spacing)} as const;

/** SAAI 모션 — out_quint 단일 곡선, bounce·spring·overshoot 금지 (DESIGN.md ## Motion) */
export const SAAI_MOTION = ${j(motion)} as const;
`;

// ── 산출물 2: CSS ───────────────────────────────────────────────────────────
const cssVars = [];
for (const [k, v] of Object.entries(colors)) cssVars.push(`  --saai-${k}: ${v};`);
for (const [k, v] of Object.entries(rounded)) cssVars.push(`  --saai-rounded-${k}: ${typeof v === 'number' ? `${v}px` : v};`);
for (const [k, v] of Object.entries(spacing)) cssVars.push(`  --saai-space-${k}: ${typeof v === 'number' ? `${v}px` : v};`);
for (const [k, v] of Object.entries(motion.ease)) cssVars.push(`  --saai-ease-${k}: ${v};`);
for (const [k, v] of Object.entries(motion.durationMs)) cssVars.push(`  --saai-dur-${k}: ${v}ms;`);

const css = `/* ⚠️ 자동 생성 파일 — 손수정 금지.
 * 원천: design-system/design.tokens.md (YAML frontmatter, read-only SSOT)
 * 생성: scripts/gen-mockup-tokens.mjs — \`npm run gen:mockup-tokens\`
 * 소비: MockupViewport가 루트에 .saai-scope를 부여 → 목업 내부에서
 *       bg-(--saai-bg-app) 식 Tailwind v4 임의 변수 문법으로 사용. (§2-A·§2-B)
 * 네이밍은 design-system/dist/saai-tokens.css의 --saai-* 선례를 따른다. */

.saai-scope {
${cssVars.join('\n')}
}
`;

fs.writeFileSync(OUT_TS, ts);
fs.writeFileSync(OUT_CSS, css);
console.log(`✓ generated ${path.relative(ROOT, OUT_TS)} (${Object.keys(colors).length} colors, ${Object.keys(typography).length} type tracks)`);
console.log(`✓ generated ${path.relative(ROOT, OUT_CSS)} (${cssVars.length} --saai-* vars)`);
