// A-1 재발 방지: 블로그 글의 프론트매터 키가 Keystatic `articles` 스키마에 모두
// 존재하는지 검사한다. 스키마에 없는 키는 편집자가 Keystatic에서 저장하는 순간
// 조용히 삭제되므로(relatedSlugs 유실 버그와 동일 클래스), 새 프론트매터 키를
// 추가할 때 keystatic.config.tsx 스키마 편입을 강제하기 위한 가드.
//
// 사용: npm run lint:frontmatter  (CI/커밋 전)
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'content/articles');

// keystatic.config.tsx 의 articles 스키마 필드와 1:1. 새 필드 추가 시 여기도 갱신.
// (body 는 contentField 라 프론트매터가 아님 → 제외.)
const SCHEMA_KEYS = new Set([
  'title', 'slug', 'excerpt', 'category', 'date', 'readTime', 'tags',
  'icon', 'cover', 'coverAlt', 'lang', 'target', 'draft', 'featured', 'relatedSlugs',
]);

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.mdx'));
const offenders = [];

for (const file of files) {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) continue;
  let fm;
  try {
    fm = yaml.load(m[1]) ?? {};
  } catch (err) {
    offenders.push(`${file}: 프론트매터 YAML 파싱 실패 — ${err.message}`);
    continue;
  }
  for (const key of Object.keys(fm)) {
    if (!SCHEMA_KEYS.has(key)) {
      offenders.push(`${file}: 알 수 없는 키 "${key}" — keystatic.config.tsx articles 스키마에 없음(저장 시 유실 위험)`);
    }
  }
}

if (offenders.length > 0) {
  console.error(`✗ 프론트매터 키 ${offenders.length}건이 Keystatic 스키마에 없습니다:\n`);
  for (const o of offenders) console.error(`  - ${o}`);
  console.error('\n→ keystatic.config.tsx articles 스키마에 해당 필드를 추가하거나, 프론트매터에서 제거하세요.');
  process.exit(1);
}

console.log(`✓ ${files.length}개 글의 프론트매터 키가 모두 Keystatic 스키마 안에 있습니다.`);
