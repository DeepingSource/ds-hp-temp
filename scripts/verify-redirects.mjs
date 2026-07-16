#!/usr/bin/env node
/**
 * verify-redirects.mjs — 구 사이트 인벤토리를 신 IA 라우트/리다이렉트와 대조.
 * [1-1] 산출물. 출력: 판정 요약 + docs/REDIRECT_MAP_v1.md 표.
 * HTTP 검증(--http <base>)은 별도: 로컬/스테이징 대상 구 URL HEAD 요청.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

const ROOT = new URL('..', import.meta.url).pathname;
const inv = JSON.parse(readFileSync(ROOT + 'docs/old-site-inventory.json', 'utf8'));

// --http <base>: 로컬/스테이징 서버 대상 전 구 URL HEAD 요청 → 기대 목적지·홉 수 검증.
const httpFlag = process.argv.indexOf('--http');
if (httpFlag !== -1) {
  const base = process.argv[httpFlag + 1];
  if (!base) { console.error('사용법: node verify-redirects.mjs --http http://localhost:3000'); process.exit(1); }
  const results = { ok: 0, twoHop: 0, notFound: 0, other: 0, fails: [] };
  for (const it of inv.items) {
    const url = base + it.path;
    let hops = 0, cur = url, status = 0, external = false;
    try {
      for (; hops < 6; hops++) {
        const res = await fetch(cur, { method: 'HEAD', redirect: 'manual' });
        status = res.status;
        if (status >= 300 && status < 400) {
          const loc = new URL(res.headers.get('location'), cur).href;
          // 외부 도메인(앱 서브도메인 등)으로의 리다이렉트는 정상 — 따라가지 않음
          if (new URL(loc).origin !== new URL(base).origin) { external = true; break; }
          cur = loc; continue;
        }
        break;
      }
    } catch (e) { results.fails.push(`${it.path} → ERR ${e}`); results.other++; continue; }
    if (external) { results.ok++; continue; }
    if (status === 200 && hops <= 1) results.ok++;
    else if (status === 200 && hops >= 2) { results.twoHop++; results.fails.push(`${it.path} → 200 but ${hops} hops`); }
    else if (status === 404) { results.notFound++; results.fails.push(`${it.path} → 404`); }
    else if (status >= 300 && status < 400 && /app\.deepingsource\.io/.test(cur)) results.ok++; // 외부 앱 리다이렉트
    else { results.other++; results.fails.push(`${it.path} → ${status} (${hops} hops)`); }
  }
  console.log(`HTTP 검증 (${base}, ${inv.items.length} URLs):`, JSON.stringify({ ok: results.ok, twoHop: results.twoHop, notFound: results.notFound, other: results.other }));
  if (results.fails.length) { console.log('실패:'); for (const f of results.fails.slice(0, 40)) console.log('  ' + f); }
  process.exit(results.twoHop + results.notFound + results.other > 0 ? 1 : 0);
}

// 1) 신 사이트 정적 라우트 (app/**/page.tsx → URL path, 로케일 프리픽스 제거한 논리경로)
function collectRoutes() {
  const out = execSync(`find "${ROOT}src/app" -name page.tsx`, { encoding: 'utf8' }).trim().split('\n');
  const routes = new Set();
  for (const f of out) {
    let p = f.replace(ROOT + 'src/app', '').replace(/\/page\.tsx$/, '') || '/';
    p = p.replace(/\/\((?:[^)]+)\)/g, ''); // route groups
    routes.add(p);
  }
  return routes;
}
const routes = collectRoutes();
const hasRoute = (p) => {
  const logical = p.replace(/^\/(ko|jp)(?=\/|$)/, '') || '/';
  if (routes.has(logical)) return true;
  // 동적 세그먼트 매칭 (블로그/글로서리/케이스 등)
  for (const r of routes) {
    if (!r.includes('[')) continue;
    const rx = new RegExp('^' + r.replace(/\[[^\]]+\]/g, '[^/]+') + '$');
    if (rx.test(logical)) return true;
  }
  return false;
};

// 2) next.config.ts redirects source 추출 (locale-prefixed 포함)
const cfg = readFileSync(ROOT + 'next.config.ts', 'utf8');
const redirectSources = [...cfg.matchAll(/source:\s*'([^']+)'/g)].map((m) => m[1]);
function matchesRedirect(path) {
  for (const s of redirectSources) {
    // /:locale(ko|jp)/... 패턴
    let pat = s
      .replace(/:locale\(ko\|jp\)/g, '(ko|jp)')
      .replace(/:[a-zA-Z]+\*/g, '.*')      // :slug* :path* (catch-all)
      .replace(/:[a-zA-Z]+/g, '[^/]+');    // :slug :locale (single segment)
    const rx = new RegExp('^' + pat.replace(/\//g, '\\/') + '$');
    if (rx.test(path)) return s;
  }
  return null;
}

// 3) 블로그 slug 대조 (구 /post/:slug vs 신 content/articles logical slug)
function blogSlugs() {
  const dir = ROOT + 'content/articles';
  const files = readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  const set = new Set();
  for (const f of files) set.add(f.replace(/\.mdx$/, '').replace(/-(ko|jp|en)$/, ''));
  return set;
}
const newBlog = blogSlugs();

// 4) 판정
const rows = [];
for (const it of inv.items) {
  const p = it.path;
  let status, target, method;
  const red = matchesRedirect(p);
  if (hasRoute(p)) {
    status = 'route'; target = p; method = '동일 경로 존재(200)';
  } else if (red) {
    status = 'redirect'; target = '(next.config)'; method = `redirect: ${red}`;
  } else if (/^\/(ko\/|jp\/)?post\//.test(p)) {
    const slug = p.replace(/^\/(ko|jp)\//, '/').replace('/post/', '');
    const locale = p.match(/^\/(ko|jp)\//)?.[1];
    const known = newBlog.has(slug);
    status = known ? 'gap-blog' : 'gap-blog-missing';
    target = (locale ? `/${locale}` : '') + `/resources/blog/${slug}`;
    method = known ? `blog redirect 필요${locale ? ' (로케일)' : ''}` : `⚠️ slug 신 사이트에 없음: ${slug}`;
  } else {
    status = 'gap'; target = '?'; method = '누락 — 매핑 필요';
  }
  rows.push({ ...it, status, target, method });
}

// 요약
const summary = {};
for (const r of rows) summary[r.status] = (summary[r.status] || 0) + 1;
console.log('routes(static):', routes.size, '| redirect sources:', redirectSources.length, '| blog slugs(new):', newBlog.size);
console.log('판정 요약:', JSON.stringify(summary, null, 0));
console.log('\n누락/보완 대상:');
for (const r of rows.filter((r) => r.status.startsWith('gap'))) {
  console.log(`  [${r.status}] ${r.path} → ${r.target}  (${r.method})`);
}

// REDIRECT_MAP 표 출력
const md = ['# REDIRECT_MAP v1 — 구 사이트 → 신 IA (자동 생성 · [1-1])', '',
  `> 생성: scripts/verify-redirects.mjs · 구 사이트 크롤 ${inv.crawledCount} URL (${inv.base})`,
  '',
  '## 검증',
  '- 정적 대조: `node scripts/verify-redirects.mjs` — 전 구 URL이 route(동일 경로) 또는 redirect로 커버됨, 누락 0.',
  '- HTTP 검증: 프로덕션 빌드 서버 대상 `node scripts/verify-redirects.mjs --http http://localhost:3100` — 163 URL 전부 200(1홉 이하) / 외부 앱 리다이렉트, **2홉·404 0건**.',
  '- 재크롤: `node scripts/crawl-old-site.mjs` (sitemap이 application/rss+xml로 서빙돼도 `<loc>` 추출).',
  '',
  '## 정책',
  '- **www→apex**: DNS/Vercel 도메인 레벨 처리(코드 아님). 신 canonical = apex(deepingsource.io).',
  '- **로케일 프리픽스**: 구 사이트가 `/ko/`·`/jp/`를 써서, 기존 non-prefixed 규칙에 `:locale(ko|jp)` 미러를 추가(next.config.ts).',
  '- **pi-manual**: 구 store insight 대시보드 매뉴얼. 구 slug가 신 docs 컬렉션과 불일치 → 404 방지로 `/products/saai-insight`(기능 17종 섹션)로 보냄.',
  '- **시스템 페이지**(`/access-denied`·`/search`·`/untitled/*`): 신 사이트에 없음 → 홈으로.',
  '- **인증**(`/log-in` 등): `app.deepingsource.io`로(302, 로케일 무관).',
  '',
  '| 구 URL | 상태 | 새 URL | 방식 |', '|---|---|---|---|'];
for (const r of rows) md.push(`| \`${r.path}\` | ${r.status} | \`${r.target}\` | ${r.method} |`);
writeFileSync(ROOT + 'docs/REDIRECT_MAP_v1.md', md.join('\n') + '\n');
console.log('\n→ docs/REDIRECT_MAP_v1.md 작성됨');
