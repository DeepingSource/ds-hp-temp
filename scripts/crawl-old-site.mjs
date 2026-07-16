#!/usr/bin/env node
/**
 * crawl-old-site.mjs — 구 Webflow 사이트(www.deepingsource.io) URL 인벤토리 수집.
 * [1-1] 리다이렉트 맵 작업의 입력. sitemap.xml 파싱 + 홈 1뎁스 내부 링크 보강.
 * sitemap이 application/rss+xml 로 서빙될 수 있어 content-type 무시하고 <loc> 추출.
 * 출력: docs/old-site-inventory.json (URL 배열 + 분류).
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const BASE = 'https://www.deepingsource.io';
const OUT = new URL('../docs/old-site-inventory.json', import.meta.url).pathname;

async function fetchText(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'ds-redirect-audit/1.0' } });
    return { ok: res.ok, status: res.status, ct: res.headers.get('content-type') || '', body: await res.text(), finalUrl: res.url };
  } catch (e) {
    return { ok: false, status: 0, error: String(e), body: '', finalUrl: url };
  }
}

function extractLocs(xml) {
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].trim());
  return locs;
}

function extractInternalLinks(html, origin) {
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const out = new Set();
  for (const h of hrefs) {
    if (h.startsWith('#') || h.startsWith('mailto:') || h.startsWith('tel:')) continue;
    try {
      const u = new URL(h, origin);
      if (u.origin === origin || u.hostname.endsWith('deepingsource.io')) {
        out.add(u.pathname.replace(/\/$/, '') || '/');
      }
    } catch { /* ignore */ }
  }
  return [...out];
}

function classify(path) {
  if (path.startsWith('/blog') || path.startsWith('/post')) return 'blog';
  if (/store|product|saai|count|insight|care|agent/.test(path)) return 'product';
  if (/seal|tech|anonymiz|spatial|model/.test(path)) return 'technology';
  if (/about|company|career|news|investor|partner|ms-agent/.test(path)) return 'company';
  if (/pi-docs|pi-manual|glossary|faq|resource|doc/.test(path)) return 'resources';
  if (/privacy|terms|legal/.test(path)) return 'legal';
  if (/log-in|sign-up|user-account|password/.test(path)) return 'auth';
  return 'other';
}

async function main() {
  const inventory = new Map(); // path -> {source}
  const notes = [];

  // 1) sitemap 시도 (여러 후보)
  for (const sm of ['/sitemap.xml', '/sitemap-0.xml', '/sitemap_index.xml']) {
    const r = await fetchText(BASE + sm);
    notes.push(`GET ${sm} → ${r.status} (${r.ct})`);
    if (r.ok && /<loc>/.test(r.body)) {
      for (const loc of extractLocs(r.body)) {
        try {
          const u = new URL(loc);
          const p = u.pathname.replace(/\/$/, '') || '/';
          if (!inventory.has(p)) inventory.set(p, 'sitemap');
        } catch { /* ignore */ }
      }
    }
  }

  // 2) 홈 크롤 1뎁스 (내부 링크 보강)
  const home = await fetchText(BASE + '/');
  notes.push(`GET / → ${home.status} (${home.ct}) finalUrl=${home.finalUrl}`);
  if (home.ok) {
    for (const p of extractInternalLinks(home.body, BASE)) {
      if (!inventory.has(p)) inventory.set(p, 'home-link');
    }
  }

  const items = [...inventory.entries()]
    .map(([path, source]) => ({ path, source, category: classify(path) }))
    .sort((a, b) => a.path.localeCompare(b.path));

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ base: BASE, crawledCount: items.length, notes, items }, null, 2) + '\n');

  console.log(`inventory: ${items.length} URLs → ${OUT}`);
  console.log('notes:\n  ' + notes.join('\n  '));
  const byCat = {};
  for (const it of items) byCat[it.category] = (byCat[it.category] || 0) + 1;
  console.log('by category:', JSON.stringify(byCat));
  if (items.length === 0) console.log('⚠️ 0 URLs — 구 사이트 다운/차단 또는 이미 신 사이트로 전환됐을 수 있음. notes 확인.');
}

main();
