/**
 * generate-hero-spaces.mjs — 랜딩 Hero 공간 회전 이미지 6종 생성 (gpt-image-1)
 *
 * docs/HERO_SPACES_PLAN_v1.md 의 실행 스크립트.
 * RotatingNoun 순서(매장→현장→전시장→물류센터→카페→무인매장)와 1:1로
 * CCTV 익명 추적 스타일 이미지 6장을 생성한다.
 *
 * 스타일 앵커: public/images/technology/tech-mtmc-wide.webp (현재 hero 이미지)를
 * 매 요청에 참조로 전달해 시각 언어(부감·회색 실루엣·블루 브래킷/동선·HUD)를 고정.
 * 6장 모두 타임스탬프 동일 + CAM 번호만 01~06 — "하나의 AI가 모든 공간을 동시에 본다".
 *
 * 사용 순서 (brand-avatars와 동일한 golden-sample 워크플로우):
 *   0) export OPENAI_API_KEY=sk-...   (또는 .env.local 에 OPENAI_API_KEY=)
 *   1) 파일럿 — 프롬프트 톤 확정 (store 1종 × 3안):
 *        node scripts/generate-hero-spaces.mjs --pilot store --variants 3
 *      → public/images/hero-v2/_pilot/ 확인. 실루엣 익명성·ID 개수·블루 톤 판정.
 *      → 어긋나면 아래 SPACES/PROMPT 를 수정해 재실행 (--dry-run 으로 프롬프트만 출력 가능)
 *   2) 전체 배치 (6공간 × 기본 2후보 = 12장, high 기준 약 $3):
 *        node scripts/generate-hero-spaces.mjs
 *   3) 후보 선정 → 대표 프레임 확정:
 *        node scripts/generate-hero-spaces.mjs --select "store=1,site=2,exhibition=1,logistics=2,cafe=1,unmanned=1"
 *   4) 후처리 — 16:10 크롭 + webp + 컨택트 시트:
 *        node scripts/generate-hero-spaces.mjs --post
 *      → hero-v2/webp/hero-*.webp + hero-v2/contact-sheet.png 검수
 *   5) 반영 — public/images/hero/ 로 복사:
 *        node scripts/generate-hero-spaces.mjs --apply
 *
 * 옵션: --only store,cafe · --candidates N(기본 2) · --force · --concurrency N(기본 3)
 *       --quality high|medium(기본 high) · --variants N(pilot 전용) · --dry-run
 */

import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import OpenAI, { toFile } from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STYLE_REF = path.join(ROOT, 'public', 'images', 'technology', 'tech-mtmc-wide.webp');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'hero-v2'); // 스테이징 (검수용)
const FINAL_DIR = path.join(ROOT, 'public', 'images', 'hero');  // 실서비스 경로

/* ── .env.local 간이 로더 (dotenv 의존성 없이 — brand-avatars와 동일) ── */
for (const f of ['.env.local', '.env']) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"#\n]+)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

/* ── 6개 공간 정의 — 순서는 brand-canon.ts heroQuestion.words 와 1:1 (계약) ──
 * 매장을 / 현장을 / 전시장을 / 물류센터를 / 카페를 / 무인매장을 */
const TIMESTAMP = '2026-07-23 15:33:48'; // 6장 공통 — 같은 순간, 다른 공간

const SPACES = [
  {
    key: 'store', cam: '01', people: 5,
    scene: 'a modern Korean convenience store interior — aisles of snack and instant-noodle shelves, a glass-door drink refrigerator wall along the left side, a POS checkout counter in the foreground; one silhouette is paying at the counter while the others browse different aisles',
  },
  {
    key: 'site', cam: '02', people: 4,
    scene: 'an industrial work floor in a light manufacturing plant — polished concrete floor with yellow safety-zone floor markings, steel material racks, a parked forklift at one side; every silhouette wears a hard-hat-shaped outline; one clearly marked hazard zone painted on the floor',
    overlayNote: 'One trajectory line visibly curves AROUND the marked hazard zone, showing safe routing; the others run along the working lanes.',
  },
  {
    key: 'exhibition', cam: '03', people: 5,
    scene: 'a bright museum exhibition hall — framed artworks along the walls, one central sculpture on a low pedestal, soft gallery lighting; two silhouettes dwell in front of the most popular artwork',
    overlayNote: 'The trajectory lines cluster and loop in front of the popular artwork (visible dwell), while other lines sweep smoothly through the hall.',
  },
  {
    key: 'logistics', cam: '04', people: 4,
    scene: 'a large logistics fulfillment warehouse — tall pallet racking forming long aisles, shrink-wrapped pallets, a forklift mid-aisle, high ceiling with industrial lights; silhouettes walk and pick along the aisles',
    overlayNote: 'Trajectory lines are long and straight down the aisles and cross at one intersection, hinting congestion awareness across a wide floor.',
  },
  {
    key: 'cafe', cam: '05', people: 5,
    scene: 'a cozy modern Korean café — espresso bar counter with a menu board, wooden tables and chairs, warm pendant lights; two silhouettes queue at the counter, others sit at tables',
    overlayNote: 'The queue trajectory bends from the entrance to the counter; seated silhouettes show small tight dwell loops at their tables.',
  },
  {
    key: 'unmanned', cam: '06', people: 3,
    scene: 'a small unmanned 24-hour self-service store at night — glowing self-checkout kiosks, bright clean interior contrasting with dark street windows, compact shelving, visibly NO staff anywhere; one silhouette stands at a kiosk, two browse shelves',
  },
];

/* ── 프롬프트 — 참조 이미지는 스타일만, 장면은 완전 신규 ── */
function buildPrompt(s) {
  const ids = Array.from({ length: s.people }, (_, i) => `"ID ${i + 1}"`).join(', ');
  return `Use the attached reference image ONLY as a strict STYLE guide — do NOT reuse its store layout or its contents. Match exactly: the elevated wide-angle ceiling-mounted CCTV camera perspective, the dark muted surveillance color grading, and the blue anonymized-tracking overlay language (thin bright-blue corner brackets around each person, small solid-blue rounded label chips with white text, smooth glowing blue curved trajectory lines drawn on the floor tracing each person's path, partially dashed where the path is older).

Create a completely NEW photorealistic scene: ${s.scene}.

PEOPLE / ANONYMIZATION CONTRACT:
- Exactly ${s.people} people, and every one of them is rendered as a flat, matte, light-gray anonymized SILHOUETTE — no faces, no skin, no hair color, no clothing detail, no identity. Identical silhouette treatment to the reference image.
- Each silhouette is enclosed in its own blue tracking bracket with exactly one label chip: ${ids}. No duplicate, missing, or extra IDs.
- Each person has exactly one continuous blue trajectory line on the floor.${s.overlayNote ? `\n- ${s.overlayNote}` : ''}

HUD TEXT (the ONLY text allowed to be legible in the image):
- Top-left corner: white monospace text "CAM ${s.cam}".
- Top-right corner: white monospace timestamp "${TIMESTAMP}".
- Environmental signage may exist but must be generic and unreadable — no real brand names, no logos, no watermarks.

Output: one single realistic CCTV frame, landscape, tone-consistent with the reference so all six frames in this set look like the same surveillance system.`;
}

/* ── CLI ── */
const { values: args } = parseArgs({
  options: {
    only: { type: 'string' },
    candidates: { type: 'string', default: '2' },
    force: { type: 'boolean', default: false },
    concurrency: { type: 'string', default: '3' },
    quality: { type: 'string', default: 'high' },
    pilot: { type: 'string' },
    variants: { type: 'string', default: '3' },
    select: { type: 'string' },
    post: { type: 'boolean', default: false },
    apply: { type: 'boolean', default: false },
    'dry-run': { type: 'boolean', default: false },
  },
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── 생성 1건: 스타일 참조 + 장면 프롬프트 → gpt-image-1 edit, 재시도 3회 ── */
async function generateOne(openai, space, outPath) {
  const styleRef = await toFile(fs.createReadStream(STYLE_REF), 'style-ref.webp', { type: 'image/webp' });
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await openai.images.edit({
        model: 'gpt-image-1',
        image: styleRef,
        prompt: buildPrompt(space),
        size: '1536x1024',
        quality: args.quality,
      });
      const b64 = res.data?.[0]?.b64_json;
      if (!b64) throw new Error('no image payload in response');
      fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
      return;
    } catch (e) {
      const status = e?.status ?? 0;
      const retryable = status === 429 || status >= 500 || /timeout|ECONN/i.test(String(e?.message));
      if (attempt === 3 || !retryable) throw e;
      const wait = 2000 * 2 ** (attempt - 1) + Math.random() * 1000;
      console.warn(`  ↻ ${space.key}: ${status || e.message} — ${Math.round(wait / 1000)}s 후 재시도 (${attempt}/3)`);
      await sleep(wait);
    }
  }
}

/* ── 동시성 풀 (brand-avatars와 동일) ── */
async function runPool(items, worker, concurrency) {
  const queue = [...items];
  let ok = 0, fail = 0;
  const failures = [];
  await Promise.all(
    Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
      while (queue.length) {
        const item = queue.shift();
        const t0 = Date.now();
        try {
          await worker(item);
          ok++;
          console.log(`✅ ${item.label} (${((Date.now() - t0) / 1000).toFixed(1)}s) — 완료 ${ok + fail}/${items.length}`);
        } catch (e) {
          fail++;
          failures.push(item.label);
          console.error(`❌ ${item.label}: ${e?.message ?? e}`);
        }
      }
    }),
  );
  return { ok, fail, failures };
}

/* ── --select: 후보 → 대표 프레임 확정 ("store=1,site=2,...") ── */
function selectCandidates(spec) {
  for (const pair of spec.split(',')) {
    const [key, n] = pair.split('=').map((s) => s.trim());
    const space = SPACES.find((s) => s.key === key);
    if (!space || !n) { console.error(`❌ 무시: "${pair}" (형식: store=1)`); continue; }
    const src = path.join(OUT_DIR, `${key}_${n}.png`);
    if (!fs.existsSync(src)) { console.error(`❌ 없음: ${path.relative(ROOT, src)}`); continue; }
    fs.copyFileSync(src, path.join(OUT_DIR, `${key}.png`));
    console.log(`✅ ${key} ← ${key}_${n}.png`);
  }
}

/* ── --post: 16:10 센터 크롭(1536×960) + webp + 컨택트 시트 ── */
async function postProcess() {
  const sharp = (await import('sharp')).default;
  const webpDir = path.join(OUT_DIR, 'webp');
  fs.mkdirSync(webpDir, { recursive: true });

  const finals = SPACES.map((s) => s.key).filter((k) => fs.existsSync(path.join(OUT_DIR, `${k}.png`)));
  const missing = SPACES.map((s) => s.key).filter((k) => !finals.includes(k));
  if (missing.length) console.warn(`⚠️  대표 프레임 미확정: ${missing.join(', ')} — --select 로 먼저 확정하세요.`);
  if (!finals.length) return console.error('❌ 변환할 대표 프레임(<key>.png)이 없습니다.');

  for (const key of finals) {
    const src = path.join(OUT_DIR, `${key}.png`);
    await sharp(src)
      .resize(1536, 960, { fit: 'cover', position: 'centre' }) // 16:10 — CorporateHeroFigure aspect
      .webp({ quality: 82 })
      .toFile(path.join(webpDir, `hero-${key}.webp`));
  }

  // 컨택트 시트 — 스테이징의 모든 PNG(후보 포함), 3열
  const sharp2 = sharp;
  const pngs = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.png')).sort();
  const cols = 3, cw = 512, ch = 341;
  const composites = await Promise.all(
    pngs.map(async (f, i) => ({
      input: await sharp2(path.join(OUT_DIR, f)).resize(cw, ch, { fit: 'cover' }).toBuffer(),
      left: (i % cols) * cw,
      top: Math.floor(i / cols) * ch,
    })),
  );
  await sharp2({ create: { width: cols * cw, height: Math.ceil(pngs.length / cols) * ch, channels: 3, background: '#111827' } })
    .composite(composites)
    .png()
    .toFile(path.join(OUT_DIR, 'contact-sheet.png'));
  console.log(`🖼  ${finals.length}장 webp 변환 + contact-sheet.png → ${path.relative(ROOT, OUT_DIR)}`);
  console.log(`   다음 단계: node scripts/generate-hero-spaces.mjs --apply`);
}

/* ── --apply: 검수 통과분을 실서비스 경로로 복사 ── */
function applyWebp() {
  const webpDir = path.join(OUT_DIR, 'webp');
  if (!fs.existsSync(webpDir)) return console.error('❌ 먼저 --post 를 실행하세요.');
  fs.mkdirSync(FINAL_DIR, { recursive: true });
  const files = fs.readdirSync(webpDir).filter((f) => f.endsWith('.webp'));
  for (const f of files) fs.copyFileSync(path.join(webpDir, f), path.join(FINAL_DIR, f));
  console.log(`🚀 ${files.length}장을 public/images/hero/ 에 반영했습니다.`);
  console.log(`   프론트 연동: src/data/siteImages.ts 의 heroSpaceImages 레지스트리 참조 (HERO_SPACES_PLAN_v1.md §3-4)`);
}

/* ── main ── */
async function main() {
  if (args.select) return selectCandidates(args.select);
  if (args.post) return postProcess();
  if (args.apply) return applyWebp();

  if (!fs.existsSync(STYLE_REF)) {
    console.error(`❌ 스타일 앵커가 없습니다: ${path.relative(ROOT, STYLE_REF)}`);
    process.exit(1);
  }
  if (!args['dry-run'] && !process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY 가 필요합니다 (환경변수 또는 .env.local).');
    process.exit(1);
  }
  const openai = args['dry-run'] ? null : new OpenAI();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  /* 파일럿 모드: 한 공간 N안 → 프롬프트 톤 확정용 */
  if (args.pilot) {
    const s = SPACES.find((x) => x.key === args.pilot);
    if (!s) return console.error(`❌ 알 수 없는 key: ${args.pilot} (${SPACES.map((x) => x.key).join('/')})`);
    if (args['dry-run']) return console.log(buildPrompt(s));
    const n = parseInt(args.variants, 10) || 3;
    const pilotDir = path.join(OUT_DIR, '_pilot');
    fs.mkdirSync(pilotDir, { recursive: true });
    console.log(`🧪 파일럿: ${s.key} × ${n}안 (quality=${args.quality})`);
    const variants = Array.from({ length: n }, (_, i) => ({ label: `${s.key}_${i + 1}` }));
    const { ok, fail } = await runPool(
      variants,
      (v) => generateOne(openai, s, path.join(pilotDir, `${v.label}.png`)),
      parseInt(args.concurrency, 10),
    );
    console.log(`\n📊 파일럿 완료: ${ok}성공/${fail}실패 → ${path.relative(ROOT, pilotDir)}`);
    console.log(`   판정 축: ① 실루엣이 완전 익명(회색·무표정)인가 ② ID 라벨 개수 정확한가 ③ 블루 톤·HUD가 기존 hero와 한 세트로 보이는가`);
    return;
  }

  /* 배치 모드: 6공간 × candidates */
  let targets = SPACES;
  if (args.only) {
    const keys = args.only.split(',').map((x) => x.trim());
    targets = SPACES.filter((s) => keys.includes(s.key));
  }
  const nCand = Math.max(1, parseInt(args.candidates, 10) || 2);
  let jobs = targets.flatMap((s) =>
    Array.from({ length: nCand }, (_, i) => ({
      space: s,
      label: nCand === 1 ? s.key : `${s.key}_${i + 1}`,
      out: path.join(OUT_DIR, `${nCand === 1 ? s.key : `${s.key}_${i + 1}`}.png`),
    })),
  );
  if (!args.force) jobs = jobs.filter((j) => !fs.existsSync(j.out));
  if (!jobs.length) return console.log('✨ 생성할 대상이 없습니다 (모두 존재 — --force 로 재생성).');

  console.log(`🚀 ${targets.length}공간 × ${nCand}후보 = ${jobs.length}장 생성 (동시 ${args.concurrency}, quality=${args.quality})`);
  if (args['dry-run']) return jobs.forEach((j) => console.log(`  · ${j.label}\n${'-'.repeat(60)}\n${buildPrompt(j.space)}\n`));

  const t0 = Date.now();
  const { ok, fail, failures } = await runPool(
    jobs,
    (j) => generateOne(openai, j.space, j.out),
    parseInt(args.concurrency, 10),
  );
  console.log(`\n📊 완료: ${ok}성공 / ${fail}실패 — ${((Date.now() - t0) / 60000).toFixed(1)}분`);
  if (failures.length) console.log(`   실패분 재실행: --only ${[...new Set(failures.map((l) => l.split('_')[0]))].join(',')} --force`);
  console.log(`   다음 단계: --select "store=1,..." → --post → --apply`);
}

main();
