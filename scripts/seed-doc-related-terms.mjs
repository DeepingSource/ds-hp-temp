// seed-doc-related-terms — one-time: add `relatedTerms` (glossary slugs) to the
// frontmatter of docs that map to existing glossary terms, across all 3 locale
// files (ko/en/jp). relatedTerms are language-invariant slugs. Idempotent: skips
// a file that already has a relatedTerms key.
//
//   node scripts/seed-doc-related-terms.mjs
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.resolve(import.meta.dirname, '..', 'content', 'docs');

// logical slug → glossary term slugs (must exist in glossaryTerms.ts)
const MAP = {
  'how-anonymization-works': ['anonymized-cctv', 'cctv-analytics', 'computer-vision'],
  'data-retention-policy': ['anonymized-cctv'],
  compliance: ['anonymized-cctv'],
  'reading-heatmaps': ['store-heatmap', 'footfall-analysis', 'zone-analysis'],
  'dwell-conversion-metrics': ['dwell-time', 'purchase-conversion-rate'],
  'interpreting-reports': ['behavior-analysis', 'zone-analysis'],
  'period-over-period-analysis': ['footfall-analysis'],
  'product-overview': ['retail-ai', 'store-operations-automation'],
  'store-insight': ['store-heatmap', 'dwell-time', 'zone-analysis', 'footfall-analysis'],
  'cctv-integration': ['cctv-analytics'],
};

let changed = 0;
for (const [logical, terms] of Object.entries(MAP)) {
  for (const suffix of ['', '-en', '-jp']) {
    const file = path.join(DIR, `${logical}${suffix}.mdx`);
    if (!fs.existsSync(file)) continue;
    const raw = fs.readFileSync(file, 'utf8');
    if (/^relatedTerms:/m.test(raw)) continue; // idempotent

    const lines = raw.split('\n');
    // frontmatter closes at the second '---'
    const close = lines.indexOf('---', 1);
    if (close < 0) continue;
    const block = ['relatedTerms:', ...terms.map((t) => `  - "${t}"`)];
    lines.splice(close, 0, ...block);
    fs.writeFileSync(file, lines.join('\n'), 'utf8');
    changed++;
  }
}
console.log(`seed-doc-related-terms: added relatedTerms to ${changed} files`);
