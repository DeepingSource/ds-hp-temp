/**
 * Migration script: Convert 72 TypeScript article files to MDX
 * Run with: npx tsx scripts/migrate-to-mdx.mts
 */
import { readdir } from 'fs/promises';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const SRC_DIR = join(import.meta.dirname, '..', 'src', 'data', 'articles');
const OUT_DIR = join(import.meta.dirname, '..', 'content', 'articles');

const CATEGORIES = ['weekly', 'season', 'insight', 'tip'] as const;

interface ArticleBlock {
  type: string;
  text?: string;
  title?: string;
  label?: string;
  value?: string;
  change?: string;
  items?: string[];
  author?: string;
  variant?: string;
}

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  tags: string[];
  icon: string;
  content: ArticleBlock[];
  relatedSlugs?: string[];
}

function escapeYaml(str: string): string {
  // Wrap in quotes if it contains special chars
  if (/[:#\[\]{}&*!|>'"@`,%]/.test(str) || str.includes('\n')) {
    return `'${str.replace(/'/g, "''")}'`;
  }
  return str;
}

function blocksToMdx(blocks: ArticleBlock[]): string {
  const lines: string[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    switch (block.type) {
      case 'heading':
        lines.push(`## ${block.text}`);
        lines.push('');
        break;

      case 'paragraph':
        lines.push(block.text!);
        lines.push('');
        break;

      case 'divider':
        lines.push('---');
        lines.push('');
        break;

      case 'tip':
        lines.push(`<Tip title="${block.title}">`);
        lines.push(block.text!);
        lines.push('</Tip>');
        lines.push('');
        break;

      case 'stat': {
        // Check for consecutive stats to wrap in StatGroup
        const stats: ArticleBlock[] = [block];
        while (i + 1 < blocks.length && blocks[i + 1].type === 'stat') {
          i++;
          stats.push(blocks[i]);
        }

        if (stats.length > 1) {
          lines.push('<StatGroup>');
          for (const s of stats) {
            const changeAttr = s.change ? ` change="${s.change}"` : '';
            lines.push(`  <Stat label="${s.label}" value="${s.value}"${changeAttr} />`);
          }
          lines.push('</StatGroup>');
        } else {
          const changeAttr = block.change ? ` change="${block.change}"` : '';
          lines.push(`<Stat label="${block.label}" value="${block.value}"${changeAttr} />`);
        }
        lines.push('');
        break;
      }

      case 'checklist':
        lines.push('<Checklist>');
        for (const item of block.items!) {
          lines.push(`- ${item}`);
        }
        lines.push('</Checklist>');
        lines.push('');
        break;

      case 'quote':
        lines.push(`<Quote author="${block.author}">`);
        lines.push(block.text!);
        lines.push('</Quote>');
        lines.push('');
        break;

      case 'callout':
        lines.push(`<Callout variant="${block.variant}">`);
        lines.push(block.text!);
        lines.push('</Callout>');
        lines.push('');
        break;
    }

    i++;
  }

  return lines.join('\n').trim();
}

function articleToMdx(article: Article): string {
  const frontmatter: string[] = ['---'];
  frontmatter.push(`slug: ${escapeYaml(article.slug)}`);
  frontmatter.push(`title: ${escapeYaml(article.title)}`);
  frontmatter.push(`excerpt: ${escapeYaml(article.excerpt)}`);
  frontmatter.push(`category: ${article.category}`);
  frontmatter.push(`date: '${article.date}'`);
  frontmatter.push(`readTime: ${article.readTime}`);

  if (article.tags.length > 0) {
    frontmatter.push('tags:');
    for (const tag of article.tags) {
      frontmatter.push(`  - ${escapeYaml(tag)}`);
    }
  } else {
    frontmatter.push('tags: []');
  }

  frontmatter.push(`icon: ${article.icon}`);

  if (article.relatedSlugs && article.relatedSlugs.length > 0) {
    frontmatter.push('relatedSlugs:');
    for (const slug of article.relatedSlugs) {
      frontmatter.push(`  - ${slug}`);
    }
  }

  frontmatter.push('---');
  frontmatter.push('');

  const body = blocksToMdx(article.content);

  return frontmatter.join('\n') + body + '\n';
}

async function migrate() {
  let total = 0;

  for (const category of CATEGORIES) {
    const srcCategoryDir = join(SRC_DIR, category);
    const outCategoryDir = join(OUT_DIR, category);

    await mkdir(outCategoryDir, { recursive: true });

    let files: string[];
    try {
      files = (await readdir(srcCategoryDir)).filter(f => f.endsWith('.ts') && f !== 'types.ts');
    } catch {
      console.log(`  Skipping ${category}/ (directory not found)`);
      continue;
    }

    for (const file of files) {
      const filePath = join(srcCategoryDir, file);
      // Dynamic import of the TS file
      const mod = await import(filePath);
      const article: Article = mod.article;

      if (!article) {
        console.warn(`  WARN: No 'article' export in ${filePath}`);
        continue;
      }

      const mdxContent = articleToMdx(article);
      const outFile = join(outCategoryDir, `${article.slug}.mdx`);
      await writeFile(outFile, mdxContent, 'utf-8');
      total++;
      console.log(`  ✓ ${category}/${article.slug}.mdx`);
    }
  }

  console.log(`\nDone! Migrated ${total} articles.`);
}

migrate().catch(console.error);
