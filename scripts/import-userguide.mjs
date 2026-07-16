#!/usr/bin/env node
/**
 * import-userguide.mjs — Astro Starlight 사용자 가이드(StoreInsight/StoreCare)를
 * 사이트의 content/docs/*.mdx 로 이식. (USERGUIDE_IMPORT_PLAN)
 *
 * 사용: node scripts/import-userguide.mjs <storecare|storeinsight> [--write]
 *   --write 없으면 dry-run(요약만), 있으면 파일 생성 + 이미지 복사.
 *
 * 변환: Starlight 컴포넌트 → 마크다운/표준 HTML(우리 docs MDXRemote는 h2/a/img/table/code만
 * 커스텀하므로 커스텀 컴포넌트를 남기면 렌더 에러). import 제거, src={var}→절대경로,
 * Aside→blockquote, LinkCard/CardGrid/Card→마크다운, 내부 링크 /v{ver}/→/resources/docs/<slug>.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, resolve, relative, basename, join } from 'node:path';
import yaml from 'js-yaml';

const ROOT = new URL('..', import.meta.url).pathname;
const product = process.argv[2];
const WRITE = process.argv.includes('--write');

const CFG = {
  storecare: {
    repo: 'content/_import/storecare-user-guide/content/docs',
    landingSlug: 'store-care',
    landingTitle: { ko: 'store care 사용자 매뉴얼', en: 'store care user guide', jp: 'store care ユーザーマニュアル' },
    locales: { ko: 'v1', en: 'en/v1' }, // jp 없음
    ver: 'v1',
    section: { 'getting-started': 'getting-started', live: 'analytics', report: 'analytics', notification: 'manual', '': 'manual' },
    slugPrefix: 'storecare',
  },
  storeinsight: {
    repo: 'content/_import/storeinsight-user-guide/content/docs',
    landingSlug: 'store-insight',
    landingTitle: { ko: 'store insight 사용자 매뉴얼', en: 'store insight user guide', jp: 'store insight ユーザーマニュアル' },
    locales: { ko: 'v35', en: 'en/v35', jp: 'ja/v35' },
    ver: 'v35',
    section: { 'getting-started': 'getting-started', reports: 'analytics', settings: 'integration', '': 'manual' },
    slugPrefix: 'storeinsight',
  },
}[product];

if (!CFG) { console.error('사용: node scripts/import-userguide.mjs <storecare|storeinsight> [--write]'); process.exit(1); }

const ICON = { 'getting-started': 'Rocket', analytics: 'BarChart3', integration: 'SlidersHorizontal', privacy: 'ShieldCheck', manual: 'BookOpen' };

// ── 슬러그 규칙: <prefix>-<name> (index면 폴더명; 루트 index면 landingSlug) ──
function slugFor(relPath) {
  const noExt = relPath.replace(/\.mdx?$/, '');
  const parts = noExt.split('/');
  const name = parts[parts.length - 1];
  if (name === 'index') {
    if (parts.length === 1) return CFG.landingSlug; // 루트 랜딩
    return `${CFG.slugPrefix}-${parts[parts.length - 2]}`;
  }
  return `${CFG.slugPrefix}-${name}`;
}
function sectionFor(relPath) {
  const top = relPath.includes('/') ? relPath.split('/')[0] : '';
  return CFG.section[top] ?? 'manual';
}

// ── 이미지 참조 경로 → 사이트 public 경로 (구조 그대로 보존: content/docs/ 이후) ──
function imgPublicPath(absImgPath) {
  const idx = absImgPath.indexOf('/content/docs/');
  let rel = absImgPath.slice(idx + '/content/docs/'.length); // 예: v1/live/_images/status.png
  // version 디렉토리(v1/v35) 제거 — URL에 /vN/ 이 남으면 내부링크 변환 정규식과 충돌한다.
  rel = rel.replace(new RegExp(`(^|/)${CFG.ver}/`), '$1'); // v1/live/… → live/…, en/v1/… → en/…
  return { url: `/images/docs/${product}/${rel}`, dest: join(ROOT, 'public/images/docs', product, rel) };
}

// ── 본문 변환 ──
function convertBody(raw, docDir, locale, copySet) {
  let s = raw;

  // 1a) named import ({ CardGrid, LinkCard } 등, 컴포넌트) 제거
  s = s.replace(/^import\s+\{[^}]*\}\s+from\s+['"][^'"]+['"];?[ \t]*\r?\n/gm, '');
  // 1b) default import (변수 → resolved 절대경로) 수집 + 라인 제거
  const imports = {};
  s = s.replace(/^import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?[ \t]*\r?\n/gm, (m, v, p) => {
    if (p.startsWith('.')) {
      const clean = p.replace(/\?url$/, '');
      imports[v] = resolve(docDir, clean);
    }
    return ''; // drop import line
  });

  const resolveImg = (v) => {
    const abs = imports[v];
    if (!abs) return null;
    const { url, dest } = imgPublicPath(abs);
    copySet.set(abs, dest);
    return url;
  };

  // 2) <Screenshot src={var} alt="..." caption="..." density={n} /> → 마크다운 이미지 + 캡션
  s = s.replace(/<Screenshot\b[^>]*?\/>/gs, (tag) => {
    const v = (tag.match(/src=\{(\w+)\}/) || [])[1];
    const alt = (tag.match(/alt="([^"]*)"/) || [])[1] || '';
    const cap = (tag.match(/caption="([^"]*)"/) || [])[1] || '';
    const url = v && resolveImg(v);
    if (!url) return '';
    return `![${alt}](${url})${cap ? `\n\n*${cap}*` : ''}`;
  });

  // 3) <DemoVideo src={var} caption loop /> → <video>
  s = s.replace(/<DemoVideo\b[^>]*?\/>/gs, (tag) => {
    const v = (tag.match(/src=\{(\w+)\}/) || [])[1];
    const cap = (tag.match(/caption="([^"]*)"/) || [])[1] || '';
    const url = v && resolveImg(v);
    if (!url) return '';
    return `<video controls loop muted playsinline src="${url}" style={{ maxWidth: '100%', borderRadius: '0.5rem' }}></video>${cap ? `\n\n*${cap}*` : ''}`;
  });

  // 4) <Aside type="tip|note|caution">…</Aside> → blockquote
  const asideLabel = { tip: '💡 팁', note: '📌 참고', caution: '⚠️ 주의' };
  s = s.replace(/<Aside\s+type="(tip|note|caution)"\s*>([\s\S]*?)<\/Aside>/g, (m, type, body) => {
    const lines = body.trim().split('\n').map((l) => `> ${l}`).join('\n');
    return `> **${asideLabel[type]}**\n>\n${lines}`;
  });

  // 5) ::note/:::tip/:::caution 디렉티브 → blockquote
  s = s.replace(/:::(tip|note|caution)\s*\r?\n([\s\S]*?):::/g, (m, type, body) => {
    const lines = body.trim().split('\n').map((l) => `> ${l}`).join('\n');
    return `> **${asideLabel[type]}**\n>\n${lines}`;
  });

  // 6) <LinkCard title href description /> → 마크다운 리스트 항목 (앞 들여쓰기 제거)
  s = s.replace(/^[ \t]*<LinkCard\b[^>]*?\/>/gms, (tag) => {
    const title = (tag.match(/title="([^"]*)"/) || [])[1] || '';
    const href = (tag.match(/href="([^"]*)"/) || [])[1] || '';
    const desc = (tag.match(/description="([^"]*)"/) || [])[1] || '';
    return `- [${title}](${href})${desc ? ` — ${desc}` : ''}`;
  });

  // 7) <Card title icon>…</Card> → 소제목 + 본문
  s = s.replace(/<Card\s+([^>]*)>([\s\S]*?)<\/Card>/g, (m, attrs, body) => {
    const title = (attrs.match(/title="([^"]*)"/) || [])[1] || '';
    return `**${title}**\n\n${body.trim()}`;
  });

  // 8) <CardGrid> wrapper 제거 (내부는 이미 변환)
  s = s.replace(/<\/?CardGrid\b[^>]*>/g, '');

  // 9) <ReportSummary>…</ReportSummary> → unwrap
  s = s.replace(/<\/?ReportSummary\b[^>]*>/g, '');

  // 10) 내부 링크 /v{ver}/…/ 및 /{locale}/v{ver}/…/ → /[locale/]resources/docs/<slug>
  const localePrefix = locale === 'ko' ? '' : `/${locale === 'jp' ? 'jp' : locale}`;
  s = s.replace(new RegExp(`/(?:en|ja)?/?${CFG.ver}/([a-z0-9/-]*)/?`, 'g'), (m, path) => {
    // 이미지 URL(/images/…)이나 빈 매치는 건드리지 않음
    if (m.startsWith('/images/')) return m;
    const clean = path.replace(/\/$/, '');
    if (!clean) return `${localePrefix}/resources/docs/${CFG.landingSlug}`;
    const targetSlug = slugFor(clean.endsWith('index') ? clean : `${clean}/x`).replace(/-x$/, '')
      || slugFor(clean);
    // 마지막 세그먼트 기반 슬러그 (링크는 폴더/파일 모두 디렉토리형)
    const seg = clean.split('/');
    const last = seg[seg.length - 1];
    const slug = `${CFG.slugPrefix}-${last}`;
    return `${localePrefix}/resources/docs/${slug}`;
  });

  return s.trim() + '\n';
}

// ── mdx 파일 목록 (버전 디렉토리 하위) ──
function listMdx(baseDir) {
  const out = [];
  (function walk(d) {
    for (const e of readdirSync(d)) {
      const p = join(d, e);
      if (statSync(p).isDirectory()) { if (e !== '_images' && e !== '_videos') walk(p); }
      else if (e.endsWith('.mdx') || e.endsWith('.md')) out.push(p);
    }
  })(baseDir);
  return out;
}

// ── frontmatter 파싱 ──
function parseFm(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { fm: {}, body: raw };
  return { fm: yaml.load(m[1]) || {}, body: m[2] };
}

// ── 메인 ──
const copySet = new Map(); // abs src → dest
const outFiles = [];
const slugSeen = new Map();

for (const [locale, verDir] of Object.entries(CFG.locales)) {
  const baseDir = join(ROOT, CFG.repo, verDir);
  if (!existsSync(baseDir)) { console.warn(`skip ${locale}: ${baseDir} 없음`); continue; }
  for (const abs of listMdx(baseDir)) {
    const relPath = relative(baseDir, abs); // 예: live/anomalies.mdx
    const { fm, body } = parseFm(readFileSync(abs, 'utf8'));
    const slug = slugFor(relPath);
    const section = relPath === 'index.mdx' ? 'manual' : sectionFor(relPath);
    const suffix = locale === 'ko' ? '' : locale === 'jp' ? '-jp' : '-en';
    const outSlug = slug + suffix;
    const isLanding = slug === CFG.landingSlug;

    const converted = convertBody(body, dirname(abs), locale, copySet);
    const front = {
      slug: outSlug,
      title: (isLanding && CFG.landingTitle[locale]) || fm.title || slug,
      excerpt: fm.description || '',
      section,
      order: isLanding ? 0 : (fm.sidebar?.order ?? 50),
      parent: isLanding ? undefined : CFG.landingSlug,
      icon: isLanding ? 'BookOpen' : (ICON[section] || 'BookOpen'),
      lang: locale === 'ko' ? 'ko' : locale === 'jp' ? 'jp' : 'en',
      draft: false,
      access: 'public',
      relatedSlugs: [],
      relatedTerms: [],
    };
    // undefined 제거
    Object.keys(front).forEach((k) => front[k] === undefined && delete front[k]);
    const fmYaml = Object.entries(front).map(([k, v]) => {
      if (Array.isArray(v)) return `${k}: []`;
      if (typeof v === 'string') return `${k}: ${JSON.stringify(v)}`;
      return `${k}: ${v}`;
    }).join('\n');
    const content = `---\n${fmYaml}\n---\n\n${converted}`;
    outFiles.push({ path: join(ROOT, 'content/docs', `${outSlug}.mdx`), content, slug: outSlug, locale, section });

    const key = `${slug}|${locale}`;
    if (slugSeen.has(key)) console.warn(`⚠️ 슬러그 충돌: ${key} (${relPath} vs ${slugSeen.get(key)})`);
    slugSeen.set(key, relPath);
  }
}

// 요약
const byLoc = {};
for (const f of outFiles) byLoc[f.locale] = (byLoc[f.locale] || 0) + 1;
console.log(`[${product}] 문서 ${outFiles.length}편`, JSON.stringify(byLoc), `| 이미지/비디오 ${copySet.size}개`);
const sections = {};
for (const f of outFiles) if (f.locale === 'ko') sections[f.section] = (sections[f.section] || 0) + 1;
console.log('ko 섹션 분포:', JSON.stringify(sections));

if (WRITE) {
  for (const f of outFiles) writeFileSync(f.path, f.content);
  for (const [src, dest] of copySet) {
    if (!existsSync(src)) { console.warn(`이미지 없음: ${src}`); continue; }
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
  }
  console.log(`✅ ${outFiles.length}편 작성 + ${copySet.size}개 에셋 복사`);
} else {
  console.log('(dry-run — --write로 실제 생성)');
  // ko 슬러그 목록 미리보기
  console.log('ko 슬러그:', outFiles.filter((f) => f.locale === 'ko').map((f) => f.slug).join(', '));
}
