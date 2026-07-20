#!/usr/bin/env node
/**
 * 블로그 큐레이션용 export (피드백 2-7).
 * content/articles 프론트매터 → docs/BLOG_CURATION_LIST.csv.
 *
 * 노출 규칙은 src/lib/articles.ts와 동일하게 재현:
 *   published        = date <= 오늘(KST) && !draft
 *   shown_on_blog    = published && category ∈ {insight, guide}  (weekly·case-study 제외)
 *
 * 선행: `npm run velite` 등으로 .velite/articles.json이 생성되어 있어야 함.
 * 실행: node scripts/export-blog-list.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const articles = JSON.parse(readFileSync(join(root, '.velite/articles.json'), 'utf8'));

// src/lib/articles.ts와 동일 기준(KST)
const kstOffset = 9 * 60 * 60 * 1000;
const todayStr = new Date(Date.now() + kstOffset).toISOString().split('T')[0];
const BLOG_CATS = ['insight', 'guide'];

const esc = (v) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const rows = articles
  .map((a) => {
    const published = a.date <= todayStr && !a.draft;
    return {
      slug: a.slug,
      title: a.title,
      category: a.category,
      date: a.date,
      lang: a.lang,
      draft: !!a.draft,
      published,
      shown_on_blog: published && BLOG_CATS.includes(a.category),
    };
  })
  .sort((x, y) => y.date.localeCompare(x.date));

const header = ['slug', 'title', 'category', 'date', 'lang', 'draft', 'published', 'shown_on_blog'];
const csv = [header.join(','), ...rows.map((r) => header.map((h) => esc(r[h])).join(','))].join('\n') + '\n';
writeFileSync(join(root, 'docs/BLOG_CURATION_LIST.csv'), csv);

const shown = rows.filter((r) => r.shown_on_blog).length;
console.log(`[export-blog-list] ${rows.length} articles → docs/BLOG_CURATION_LIST.csv (shown_on_blog: ${shown}, drafts: ${rows.filter((r) => r.draft).length})`);
