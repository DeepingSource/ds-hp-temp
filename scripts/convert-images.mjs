/**
 * PNG → WebP 일괄 변환 스크립트
 * 실행: node scripts/convert-images.mjs
 */

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const NEW_IMAGE = path.join(ROOT, 'new-image');
const NEW_260302 = path.join(ROOT, '260302_New');
const PUBLIC = path.join(ROOT, 'public/images');

// 각 폴더가 없으면 생성
['cctv', 'industries', 'technology'].forEach((dir) => {
  const p = path.join(PUBLIC, dir);
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
});

/**
 * 변환 태스크 목록
 * { src: 절대경로, dest: public/images 기준 상대경로, quality, width }
 */
const tasks = [
  // ── 시간대별 CCTV 씬 (new-image/) ────────────────────────────────────────
  { src: `${NEW_IMAGE}/Pasted image 20260302110003.png`, dest: 'cctv/cctv-scene-0630-morning.webp',      quality: 82 },
  { src: `${NEW_IMAGE}/Pasted image 20260302111317.png`, dest: 'cctv/cctv-scene-1215-noon.webp',         quality: 82 },
  { src: `${NEW_IMAGE}/Pasted image 20260302112957.png`, dest: 'cctv/cctv-scene-2210-evening.webp',      quality: 82 },
  { src: `${NEW_IMAGE}/Pasted image 20260302113116.png`, dest: 'cctv/cctv-scene-0300-night-ir.webp',     quality: 82 },

  // ── 오염 감지 (new-image/) ────────────────────────────────────────────────
  { src: `${NEW_IMAGE}/Pasted image 20260302113910.png`, dest: 'cctv/cctv-contam-cafe-table.webp',       quality: 82 },
  { src: `${NEW_IMAGE}/Pasted image 20260302114049.png`, dest: 'cctv/cctv-contam-floor-spill.webp',      quality: 82 },
  { src: `${NEW_IMAGE}/Pasted image 20260302114200.png`, dest: 'cctv/cctv-contam-trash-overflow.webp',   quality: 82 },
  { src: `${NEW_IMAGE}/Pasted image 20260302114312.png`, dest: 'cctv/cctv-contam-kitchen.webp',          quality: 82 },
  { src: `${NEW_IMAGE}/Pasted image 20260302114406.png`, dest: 'cctv/cctv-contam-glass-door.webp',       quality: 82 },

  // ── 비정상 체류 감지 (new-image/) ────────────────────────────────────────
  { src: `${NEW_IMAGE}/Pasted image 20260302114519.png`, dest: 'cctv/cctv-intrusion-counter-empty.webp', quality: 82 },
  { src: `${NEW_IMAGE}/Pasted image 20260302115254.png`, dest: 'cctv/cctv-intrusion-unmanned-dawn.webp', quality: 82 },
  { src: `${NEW_IMAGE}/Pasted image 20260302115324.png`, dest: 'cctv/cctv-intrusion-night-ir.webp',      quality: 82 },
  { src: `${NEW_IMAGE}/Pasted image 20260302115427.png`, dest: 'cctv/cctv-intrusion-fitting-room.webp',  quality: 82 },
  { src: `${NEW_IMAGE}/Pasted image 20260302115455.png`, dest: 'cctv/cctv-intrusion-warehouse.webp',     quality: 82 },

  // ── 진열 감지 (260302_New/) ───────────────────────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302121724.png`, dest: 'cctv/cctv-display-shelf-rotated.webp',       quality: 82 },
  { src: `${NEW_260302}/Pasted image 20260302121837.png`, dest: 'cctv/cctv-display-shelf-empty-wide.webp',    quality: 82 },
  { src: `${NEW_260302}/Pasted image 20260302121935.png`, dest: 'cctv/cctv-display-price-label-missing.webp', quality: 82 },
  { src: `${NEW_260302}/Pasted image 20260302122041.png`, dest: 'cctv/cctv-display-fashion-folding.webp',     quality: 82 },

  // ── 설비 이상 감지 (260302_New/) ─────────────────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302122126.png`, dest: 'cctv/cctv-equip-fridge-door-open.webp', quality: 82 },
  { src: `${NEW_260302}/Pasted image 20260302122311.png`, dest: 'cctv/cctv-equip-fridge-frost.webp',     quality: 82 },
  { src: `${NEW_260302}/Pasted image 20260302122420.png`, dest: 'cctv/cctv-equip-light-off.webp',        quality: 82 },
  { src: `${NEW_260302}/Pasted image 20260302122507.png`, dest: 'cctv/cctv-equip-aircon-leak.webp',      quality: 82 },

  // ── 솔루션 Hero — 편의점 (260302_New/) ───────────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302123441.png`, dest: 'industries/convenience-hero-night.webp',     quality: 85 },
  { src: `${NEW_260302}/Pasted image 20260302123532.png`, dest: 'industries/convenience-hero-interior.webp',  quality: 85 },

  // ── 솔루션 Hero — 카페 (260302_New/) ─────────────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302123656.png`, dest: 'industries/cafe-hero-morning.webp',     quality: 85 },
  { src: `${NEW_260302}/Pasted image 20260302123759.png`, dest: 'industries/cafe-hero-aerial.webp',      quality: 85 },

  // ── 솔루션 Hero — 무인매장 (260302_New/) ─────────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302123856.png`, dest: 'industries/unmanned-hero-night.webp',     quality: 85 },
  { src: `${NEW_260302}/Pasted image 20260302123950.png`, dest: 'industries/unmanned-hero-interior.webp',  quality: 85 },

  // ── 솔루션 Hero — 드럭스토어 (260302_New/) ───────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302124100.png`, dest: 'industries/drugstore-hero-aisle.webp',    quality: 85 },
  { src: `${NEW_260302}/Pasted image 20260302124218.png`, dest: 'industries/drugstore-hero-overview.webp', quality: 85 },

  // ── 솔루션 Hero — 대형마트 (260302_New/) ─────────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302124328.png`, dest: 'industries/mart-hero-produce.webp', quality: 85 },
  { src: `${NEW_260302}/Pasted image 20260302124620.png`, dest: 'industries/mart-hero-aisle.webp',   quality: 85 },

  // ── 솔루션 Hero — 전시/공공 (260302_New/) ────────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302125136.png`, dest: 'industries/exhibition-hero-hall.webp',   quality: 85 },
  { src: `${NEW_260302}/Pasted image 20260302125621.png`, dest: 'industries/exhibition-hero-atrium.webp', quality: 85 },

  // ── 솔루션 Hero — 물류창고 (260302_New/) ─────────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302130054.png`, dest: 'industries/logistics-hero-rack.webp',    quality: 85 },
  { src: `${NEW_260302}/Pasted image 20260302131926.png`, dest: 'industries/logistics-hero-loading.webp', quality: 85 },

  // ── 기술 페이지 — 엣지 처리 (260302_New/) ────────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302132135.png`, dest: 'technology/tech-edge-device.webp',  quality: 85 },
  { src: `${NEW_260302}/Pasted image 20260302132239.png`, dest: 'technology/tech-server-rack.webp',  quality: 85 },

  // ── 기술 페이지 — MTMC (260302_New/) ─────────────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302134149.png`, dest: 'technology/tech-mtmc-tracking.webp', quality: 85 },
  { src: `${NEW_260302}/Pasted image 20260302134303.png`, dest: 'technology/tech-mtmc-wide.webp',     quality: 85 },

  // ── 기술 페이지 — 익명화 (260302_New/) ───────────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302134359.png`, dest: 'technology/tech-anon-before-after.webp', quality: 85 },
  { src: `${NEW_260302}/Pasted image 20260302134451.png`, dest: 'technology/tech-anon-applied.webp',      quality: 85 },

  // ── About — 브랜드 스토리 Hero (260302_New/) ─────────────────────────────
  { src: `${NEW_260302}/Pasted image 20260302134551.png`, dest: 'about-brand-aerial.webp', quality: 85 },
  { src: `${NEW_260302}/Pasted image 20260302134705.png`, dest: 'about-brand-street.webp', quality: 85 },
];

let ok = 0;
let skip = 0;
let fail = 0;

for (const task of tasks) {
  const destPath = path.join(PUBLIC, task.dest);
  if (!existsSync(task.src)) {
    console.warn(`⚠  SKIP (없음): ${path.basename(task.src)}`);
    skip++;
    continue;
  }
  try {
    await sharp(task.src)
      .webp({ quality: task.quality ?? 82 })
      .toFile(destPath);
    console.log(`✓  ${path.basename(task.src)}  →  ${task.dest}`);
    ok++;
  } catch (err) {
    console.error(`✗  FAIL: ${path.basename(task.src)}`, err.message);
    fail++;
  }
}

console.log(`\n완료: ${ok}장 변환, ${skip}장 스킵, ${fail}장 실패`);
