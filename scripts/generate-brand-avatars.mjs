/**
 * generate-brand-avatars.mjs — 브랜드 톤 통일 팀 아바타 생성 (gpt-image-1, batch)
 *
 * 기존 generate-gpt-avatars.mjs / generate-openai-avatars.mjs를 대체한다.
 * 핵심 차이:
 *   1) STYLE LOCK  — 스타일 레퍼런스 이미지를 매 요청에 함께 전달(멀티 이미지 edit)
 *                    + 홈페이지 컬러 스킴(#376AE2 계열)을 명시한 고정 프롬프트.
 *   2) BATCH       — 동시 4요청 풀 + 429/5xx 지수 백오프 재시도 (40장 ≈ 3~4분).
 *   3) SAFE OUTPUT — public/images/team-v2/ 스테이징에 생성 → 검수 후 --apply로 교체.
 *                    --post 로 640px webp 변환 + 배경 순백 검증 + 컨택트 시트 생성.
 *
 * 사용 순서 (golden-sample 워크플로우):
 *   0) export OPENAI_API_KEY=sk-...   (또는 .env.local 에 OPENAI_API_KEY=)
 *   1) 파일럿: 한 명으로 3안 뽑아 톤 확정
 *        node scripts/generate-brand-avatars.mjs --pilot jamin-park --variants 3
 *      → public/images/team-v2/_pilot/ 확인, 마음에 드는 파일을 스타일 앵커로 지정
 *        cp public/images/team-v2/_pilot/jamin-park_2.png scripts/avatar-style-ref.png
 *   2) 전체 배치 (앵커 기준으로 40명 통일):
 *        node scripts/generate-brand-avatars.mjs
 *   3) 후처리 + 검수 시트:
 *        node scripts/generate-brand-avatars.mjs --post
 *      → team-v2/webp/*.webp + team-v2/contact-sheet.png 확인
 *   4) 반영:
 *        node scripts/generate-brand-avatars.mjs --apply
 *
 * 옵션: --only id1,id2 · --limit N · --force · --concurrency N(기본 4)
 *       --quality high|medium(기본 high) · --variants N(pilot 전용) · --dry-run
 */

import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import OpenAI, { toFile } from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RAW_DIR = path.join(ROOT, 'person-raw');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'team-v2');
const FINAL_DIR = path.join(ROOT, 'public', 'images', 'team');
const STYLE_REF = path.join(__dirname, 'avatar-style-ref.png');

/* ── .env.local 간이 로더 (dotenv 의존성 없이) ── */
for (const f of ['.env.local', '.env']) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"#\n]+)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

/* ── 40명 전원: id ↔ person-raw 원본 파일 매핑 ── */
const MEMBERS = [
  { id: 'taehoon-kim', raw: '김태훈.png' },
  { id: 'sumin-lee', raw: '이수민.png' },
  { id: 'sangho-kum', raw: '금상호.png' },
  { id: 'bongkyung-ko', raw: '고봉경.png' },
  { id: 'sukbum-choi', raw: '최석범.png' },
  { id: 'inbeom-hwang', raw: '황인범.png' },
  { id: 'chaeheum-park', raw: '박채흠.png' },
  { id: 'sangkeun-park', raw: '박상근.png' },
  { id: 'juyoung-yoon', raw: '윤주영.png' },
  { id: 'yeonhui-kim', raw: '김연희.png' },
  { id: 'myeongjun-kim', raw: '김명준.png' },
  { id: 'jaewon-jang', raw: '장재원.png' },
  { id: 'kyudong-kim', raw: '김규동.png' },
  { id: 'joongwoo-park', raw: '박중우.png' },
  { id: 'jaeyung-park', raw: '박재영.png' },
  { id: 'jaesun-lee', raw: '이재선.png' },
  { id: 'myounggeun-jang', raw: '장명근.png' },
  { id: 'jaekyu-kang', raw: '강재규.png' },
  { id: 'jaeyoung-an', raw: '안재영.png' },
  { id: 'yongwoo-kim', raw: '김용우.png' },
  { id: 'yejin-jin', raw: '진예진.png' },
  { id: 'san-kim', raw: '김산.png' },
  { id: 'jamin-park', raw: '박재민.png' },
  { id: 'sehyun-jung', raw: '정세현.png' },
  { id: 'seulgi-jo', raw: '조슬기.png' },
  { id: 'youngseob-lee', raw: '이영섭.png' },
  { id: 'jeongyeon-kwon', raw: '권정연.png' },
  { id: 'jeongeun-hyeon', raw: '현정은.png' },
  { id: 'eunji-kim', raw: '김은지.png' },
  { id: 'eunyoung-park', raw: '박은영.png' },
  { id: 'sungryong-mo', raw: '모성룡.png' },
  { id: 'hoyong-lee', raw: '이호용.png' },
  { id: 'heesoo-kim', raw: '김희수.png' },
  { id: 'sophie-son', raw: '손지혜.png' },
  { id: 'sungkyu-park', raw: '박성규.png' },
  { id: 'kyungdong-kim', raw: '김경동.png' },
  { id: 'seorim-hwang', raw: '황서림.png' },
  { id: 'yoonjung-hwang', raw: '황윤정.png' },
  { id: 'jiyeon-dong', raw: '동지연.png' },
  { id: 'nanwoo-kim', raw: '김난우.png' },
];

/* ── 브랜드 스타일 프롬프트 (홈페이지 톤/컬러 스킴 고정) ──
 * 사이트 토큰: primary #376AE2 · primary-light #5B86EA · primary-lighter #E5EDFC
 * 팀 페이지는 흰 배경 + mix-blend-multiply 파스텔 틴트이므로 배경은 반드시 순백. */
const STYLE_PROMPT = `Redraw the person from the FIRST image (the reference photo) as a minimalist hand-drawn character illustration for a tech startup team page. Preserve their real identity: exact face shape, hairstyle, glasses if any, and expression.

STYLE CONTRACT — must be IDENTICAL across the whole team set:
- Smooth confident black ink outlines with one uniform medium line weight. No pencil grain, no sketchy hatching, no paper texture, no rough edges.
- Flat minimal coloring only: keep skin paper-white (uncolored). Clothing filled with a single flat tone from this palette: brand blue #376AE2, soft blue #5B86EA, pale blue #E5EDFC, or light warm gray. Maximum two colors per portrait, subtle and desaturated.
- Friendly approachable expression with a subtle smile.
- Composition: upper-body three-quarter portrait, centered, head about 45% of canvas height, eyes on the upper-third line, small even margin above the hair. Same framing and scale for every portrait.
- Background: pure solid white #FFFFFF, completely empty. No gradients, no shapes, no shadow, no vignette.
- No text, no watermark, no signature, no border, no logo.

If a SECOND image is provided, it is the STYLE ANCHOR: copy its exact line weight, coloring approach, and rendering style precisely. Take only the identity from the first photo, only the style from the second.`;

/* ── CLI ── */
const { values: args } = parseArgs({
  options: {
    only: { type: 'string' },
    limit: { type: 'string' },
    force: { type: 'boolean', default: false },
    concurrency: { type: 'string', default: '4' },
    quality: { type: 'string', default: 'high' },
    pilot: { type: 'string' },
    variants: { type: 'string', default: '3' },
    post: { type: 'boolean', default: false },
    apply: { type: 'boolean', default: false },
    'dry-run': { type: 'boolean', default: false },
  },
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── 생성 1건: 원본 사진(+스타일 앵커) → gpt-image-1 edit, 재시도 3회 ── */
async function generateOne(openai, member, outPath, useStyleRef) {
  const rawPath = path.join(RAW_DIR, member.raw);
  if (!fs.existsSync(rawPath)) throw new Error(`source photo missing: person-raw/${member.raw}`);

  const images = [await toFile(fs.createReadStream(rawPath), member.raw, { type: 'image/png' })];
  if (useStyleRef) {
    images.push(await toFile(fs.createReadStream(STYLE_REF), 'style-ref.png', { type: 'image/png' }));
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await openai.images.edit({
        model: 'gpt-image-1',
        image: images.length === 1 ? images[0] : images,
        prompt: STYLE_PROMPT,
        size: '1024x1024',
        quality: args.quality,
        input_fidelity: 'high', // 얼굴 특징 보존 강화
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
      console.warn(`  ↻ ${member.id}: ${status || e.message} — ${Math.round(wait / 1000)}s 후 재시도 (${attempt}/3)`);
      await sleep(wait);
    }
  }
}

/* ── 동시성 풀 ── */
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
          console.log(`✅ ${item.id} (${((Date.now() - t0) / 1000).toFixed(1)}s) — 완료 ${ok + fail}/${items.length}`);
        } catch (e) {
          fail++;
          failures.push(item.id);
          console.error(`❌ ${item.id}: ${e?.message ?? e}`);
        }
      }
    }),
  );
  return { ok, fail, failures };
}

/* ── --post: 640px webp + 배경 순백 검증 + 컨택트 시트 ── */
async function postProcess() {
  const sharp = (await import('sharp')).default;
  const webpDir = path.join(OUT_DIR, 'webp');
  fs.mkdirSync(webpDir, { recursive: true });
  const pngs = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.png'));
  if (!pngs.length) return console.error('❌ team-v2/ 에 생성된 PNG가 없습니다. 먼저 배치를 실행하세요.');

  const warnings = [];
  for (const f of pngs) {
    const src = path.join(OUT_DIR, f);
    const img = sharp(src).resize(640, 640, { fit: 'cover' });
    await img.webp({ quality: 82 }).toFile(path.join(webpDir, f.replace('.png', '.webp')));
    // 배경 검증: 좌상단 8x8 평균이 순백(>250)인지
    const { data } = await sharp(src).extract({ left: 2, top: 2, width: 8, height: 8 }).raw().toBuffer({ resolveWithObject: true });
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    if (avg < 250) warnings.push(`${f} (bg avg ${avg.toFixed(0)} — 순백 아님, 재생성 권장)`);
  }
  if (warnings.length) console.warn(`⚠️  배경 검증 경고:\n  - ${warnings.join('\n  - ')}`);

  // 컨택트 시트 (8열)
  const cols = 8, cell = 256;
  const rows = Math.ceil(pngs.length / cols);
  const composites = await Promise.all(
    pngs.map(async (f, i) => ({
      input: await sharp(path.join(OUT_DIR, f)).resize(cell, cell).toBuffer(),
      left: (i % cols) * cell,
      top: Math.floor(i / cols) * cell,
    })),
  );
  await sharp({ create: { width: cols * cell, height: rows * cell, channels: 3, background: '#ffffff' } })
    .composite(composites)
    .png()
    .toFile(path.join(OUT_DIR, 'contact-sheet.png'));
  console.log(`🖼  ${pngs.length}장 webp 변환 + contact-sheet.png 생성 → ${path.relative(ROOT, OUT_DIR)}`);
}

/* ── --apply: 검수 통과분을 실서비스 경로로 교체 ── */
function applyWebp() {
  const webpDir = path.join(OUT_DIR, 'webp');
  if (!fs.existsSync(webpDir)) return console.error('❌ 먼저 --post 를 실행하세요.');
  const files = fs.readdirSync(webpDir).filter((f) => f.endsWith('.webp'));
  for (const f of files) fs.copyFileSync(path.join(webpDir, f), path.join(FINAL_DIR, f));
  console.log(`🚀 ${files.length}장을 public/images/team/ 에 반영했습니다.`);
}

/* ── main ── */
async function main() {
  if (args.post) return postProcess();
  if (args.apply) return applyWebp();

  if (!args['dry-run'] && !process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY 가 필요합니다 (환경변수 또는 .env.local).');
    process.exit(1);
  }
  const openai = args['dry-run'] ? null : new OpenAI();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const useStyleRef = fs.existsSync(STYLE_REF);
  console.log(useStyleRef
    ? `🎯 스타일 앵커 사용: scripts/avatar-style-ref.png`
    : `⚠️  스타일 앵커 없음 — 프롬프트만으로 생성합니다. 파일럿으로 앵커를 먼저 확정하는 걸 권장합니다.`);

  /* 파일럿 모드: 한 명 N안 → 앵커 선정용 */
  if (args.pilot) {
    const m = MEMBERS.find((x) => x.id === args.pilot);
    if (!m) return console.error(`❌ 알 수 없는 id: ${args.pilot}`);
    const n = parseInt(args.variants, 10) || 3;
    const pilotDir = path.join(OUT_DIR, '_pilot');
    fs.mkdirSync(pilotDir, { recursive: true });
    console.log(`🧪 파일럿: ${m.id} × ${n}안`);
    const variants = Array.from({ length: n }, (_, i) => ({ id: `${m.id}_${i + 1}` }));
    const { ok, fail } = await runPool(
      variants,
      (v) => generateOne(openai, m, path.join(pilotDir, `${v.id}.png`), useStyleRef),
      parseInt(args.concurrency, 10),
    );
    console.log(`\n📊 파일럿 완료: ${ok}성공/${fail}실패 → ${path.relative(ROOT, pilotDir)}`);
    console.log(`   마음에 드는 안을 앵커로: cp ${path.relative(ROOT, pilotDir)}/${m.id}_N.png scripts/avatar-style-ref.png`);
    return;
  }

  /* 배치 모드 */
  let targets = MEMBERS;
  if (args.only) {
    const ids = args.only.split(',').map((s) => s.trim());
    targets = MEMBERS.filter((m) => ids.includes(m.id));
  }
  if (!args.force) {
    targets = targets.filter((m) => !fs.existsSync(path.join(OUT_DIR, `${m.id}.png`)));
  }
  if (args.limit) targets = targets.slice(0, parseInt(args.limit, 10));

  if (!targets.length) return console.log('✨ 생성할 대상이 없습니다 (모두 존재 — --force 로 재생성).');
  console.log(`🚀 ${targets.length}명 생성 시작 (동시 ${args.concurrency}, quality=${args.quality})`);
  if (args['dry-run']) return targets.forEach((m) => console.log(`  · ${m.id} ← person-raw/${m.raw}`));

  const t0 = Date.now();
  const { ok, fail, failures } = await runPool(
    targets,
    (m) => generateOne(openai, m, path.join(OUT_DIR, `${m.id}.png`), useStyleRef),
    parseInt(args.concurrency, 10),
  );
  console.log(`\n📊 완료: ${ok}성공 / ${fail}실패 — ${((Date.now() - t0) / 60000).toFixed(1)}분`);
  if (failures.length) console.log(`   실패분 재실행: node scripts/generate-brand-avatars.mjs --only ${failures.join(',')}`);
  console.log(`   다음 단계: node scripts/generate-brand-avatars.mjs --post`);
}

main();
