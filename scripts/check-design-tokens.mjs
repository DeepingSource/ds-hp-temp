#!/usr/bin/env node
/**
 * Design-token drift guard. Run: `npm run lint:tokens`.
 * - HARD FAIL: the deprecated blue (#1E88E5 / rgb(30,136,229)) appearing anywhere.
 * - HARD FAIL: brand-primary drift — the hand-mirrored primary hexes in
 *   globals.css `:root` must equal BRAND.* in src/lib/tokens.ts.
 * - WARN: hardcoded brand blue (#376AE2 / rgb(55,106,226)) or arbitrary color
 *   literals (bg/text/border/from/via/to/ring/stroke/fill-[#…]) outside the
 *   token Sources of Truth — these should use a token/utility instead.
 * Exempt (legitimately hold literals): the SoT files + the /demo mockup palette.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const SRC = 'src';
const EXEMPT = [
  /^src\/lib\/tokens\.ts$/,
  /^src\/lib\/mockup-tokens\.ts$/,
  /^src\/lib\/mockup-tokens\.gen\.ts$/, // codegen output (gen:mockup-tokens) — hex by design
  /^src\/app\/saai-tokens\.gen\.css$/, // codegen output — --saai-* var block
  /^src\/app\/globals\.css$/,
  /^src\/app\/icon\.svg$/,
];
// 목업 규칙 (MOCKUP_MASTER_PLAN_v1 §2-A 가드레일): 예전의 mockups/** 전면 예외를
// 철회하고, 목업 내부는 "gen 토큰(SAAI_*)·--saai-* 변수만 허용"을 원칙으로 raw hex를
// 검출한다. 실제 외부 브랜드 재현(카카오톡/LINE 스킨 등)만 파일 단위 명시 예외.
// severity: Phase 1(실사용 마이그레이션) 완료 전까지 WARN — 완료 시 FAIL로 승격.
const MOCKUP_DIR = /^src\/components\/mockups\//;
const MOCKUP_HEX_ALLOWLIST = [
  /^src\/components\/mockups\/KakaoAlertMockup\.tsx$/, // 카카오톡/LINE 실브랜드 스킨 재현
];
const RAW_HEX = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-fA-F])/;
const OLD_BLUE = /#1E88E5\b|rgba?\(\s*30\s*,\s*136\s*,\s*229/i;
const HARDCODED_PRIMARY = /#376AE2\b|rgb\(\s*55\s*,\s*106\s*,\s*226/i;
const ARB_COLOR = /\b(?:bg|text|border|from|via|to|ring|stroke|fill|shadow)-\[#[0-9a-fA-F]{3,8}/;

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|css|svg)$/.test(e)) out.push(p);
  }
  return out;
}

let failures = 0;
let warnings = 0;
let mockupHexWarnings = 0;
for (const file of walk(SRC)) {
  const rel = relative('.', file);
  if (EXEMPT.some((re) => re.test(rel))) continue;
  const isMockup = MOCKUP_DIR.test(rel);
  const mockupAllowed = MOCKUP_HEX_ALLOWLIST.some((re) => re.test(rel));
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (OLD_BLUE.test(line)) {
      console.error(`✗ OLD BLUE  ${rel}:${i + 1}  ${line.trim().slice(0, 100)}`);
      failures++;
    } else if (isMockup) {
      // 목업 내부: 모든 raw hex(SVG fill/stroke·gradient stop 포함)를 검출 —
      // 기존 ARB_COLOR는 Tailwind 클래스 형태만 잡아 목업 hex를 놓쳤다.
      if (!mockupAllowed && RAW_HEX.test(line)) {
        mockupHexWarnings++;
        if (mockupHexWarnings <= 10) {
          console.warn(`⚠ mockup raw hex  ${rel}:${i + 1}  ${line.trim().slice(0, 100)}`);
        }
      }
    } else if (HARDCODED_PRIMARY.test(line) || ARB_COLOR.test(line)) {
      console.warn(`⚠ hardcoded color  ${rel}:${i + 1}  ${line.trim().slice(0, 100)}`);
      warnings++;
    }
  });
}
if (mockupHexWarnings > 10) {
  console.warn(`⚠ mockup raw hex … +${mockupHexWarnings - 10} more (Phase 1 마이그레이션 대상 — SAAI_COLORS/--saai-* 로 전환)`);
}
warnings += mockupHexWarnings;

// --- brand-primary sync guard: globals.css :root  ==  tokens.ts BRAND.* ---
function grab(content, re) {
  const m = content.match(re);
  return m ? m[1].toLowerCase() : null;
}
const cssSrc = readFileSync('src/app/globals.css', 'utf8');
const tokensSrc = readFileSync('src/lib/tokens.ts', 'utf8');
const SYNC_PAIRS = [
  ['primary', /--primary:\s*(#[0-9a-fA-F]{6})/, /\bprimary:\s*'(#[0-9a-fA-F]{6})'/],
  ['primary-dark', /--primary-dark:\s*(#[0-9a-fA-F]{6})/, /\bprimaryDark:\s*'(#[0-9a-fA-F]{6})'/],
  ['primary-light', /--primary-light:\s*(#[0-9a-fA-F]{6})/, /\bprimaryLight:\s*'(#[0-9a-fA-F]{6})'/],
  ['primary-lighter', /--primary-lighter:\s*(#[0-9a-fA-F]{6})/, /\bprimaryLighter:\s*'(#[0-9a-fA-F]{6})'/],
];
for (const [name, cssRe, tsRe] of SYNC_PAIRS) {
  const c = grab(cssSrc, cssRe);
  const t = grab(tokensSrc, tsRe);
  if (!c || !t) {
    console.error(`✗ TOKEN SYNC  could not read ${name} (globals.css=${c}, tokens.ts=${t})`);
    failures++;
  } else if (c !== t) {
    console.error(`✗ TOKEN SYNC  ${name} drift: globals.css ${c} != tokens.ts ${t}`);
    failures++;
  }
}

console.log(`\ndesign-token check: ${failures} error(s), ${warnings} warning(s).`);
if (failures > 0) {
  console.error('Deprecated blue must be 0. Use --primary / BRAND.primary / text-primary.');
  process.exit(1);
}
