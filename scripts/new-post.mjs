#!/usr/bin/env node
/**
 * new-post — scaffold a blog article MDX with correct frontmatter.
 *
 *   npm run new:post -- <slug> [category] [--title "제목"]
 *
 * category ∈ guide | case-study | insight | weekly  (default: insight)
 * readTime is intentionally omitted — Velite auto-estimates it from the body.
 */
import { writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const CATEGORIES = ['guide', 'case-study', 'insight', 'weekly'];

const argv = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--title') flags.title = argv[++i];
  else if (argv[i] === '--lang') flags.lang = argv[++i];
  else positional.push(argv[i]);
}

const slug = positional[0];
const category = positional[1] ?? 'insight';
const lang = flags.lang ?? 'ko';

if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('✗ Usage: npm run new:post -- <slug> [category] [--title "제목"]');
  console.error('  slug must be lowercase kebab-case (a-z, 0-9, -).');
  process.exit(1);
}
if (!CATEGORIES.includes(category)) {
  console.error(`✗ category must be one of: ${CATEGORIES.join(', ')}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const title = flags.title ?? slug.replace(/-/g, ' ');
const filePath = path.join('content', 'articles', category, `${slug}.mdx`);

try {
  await access(filePath);
  console.error(`✗ Already exists: ${filePath}`);
  process.exit(1);
} catch {
  /* ok — file does not exist */
}

const template = `---
slug: ${slug}
title: ${title}
excerpt: 한 줄 요약을 여기에 적으세요.
category: ${category}
date: ${today}
tags: []
icon: Newspaper
# cover: /images/blog/${slug}.webp   # (선택) 커버 이미지 — /public/images/blog/ 에 두세요
lang: ${lang}
---

여기에 도입 문단을 작성하세요. 본문 이미지는 아래처럼 넣습니다:

![대체 텍스트](/images/blog/${slug}-1.webp)

## 소제목

내용을 작성하세요.

<Tip title="팁">
  Stat · StatGroup · Tip · Checklist · Quote · Callout · Source · PrivacyNote 컴포넌트를 쓸 수 있습니다.
</Tip>
`;

await mkdir(path.dirname(filePath), { recursive: true });
await writeFile(filePath, template, 'utf8');
console.log(`✓ Created ${filePath}`);
console.log(`  readTime는 빌드 시 본문에서 자동 계산됩니다. 커버/본문 이미지는 /public/images/blog/ 에 두세요.`);
