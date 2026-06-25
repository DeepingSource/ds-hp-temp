import { config, fields, singleton } from '@keystatic/core';

/** An id-keyed array item: a fixed id (structure lives in code) + localized copy fields. */
const idItem = (
  label: string,
  itemLabel: string,
  copy: Record<string, ReturnType<typeof fields.object>>,
) =>
  fields.array(
    fields.object({ id: fields.text({ label: 'ID (코드와 연결 — 변경 금지)' }), ...copy }),
    { label, itemLabel: (p) => p.fields.id.value || itemLabel },
  );

/**
 * Keystatic CMS — Phase 0 (local mode).
 * Proof slice: the homepage master copy as an editable, per-locale singleton.
 * Admin UI at /keystatic (dev/server only — stripped from the static export).
 * Storage stays in-repo (content/) so edits become git commits.
 */

/** A KO/EN/JP text triple — mirrors the site's i18n shape. */
const localized = (label: string) =>
  fields.object(
    {
      ko: fields.text({ label: 'KO', multiline: true }),
      en: fields.text({ label: 'EN', multiline: true }),
      jp: fields.text({ label: 'JP', multiline: true }),
    },
    { label },
  );

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'DeepingSource' },
  },
  singletons: {
    home: singleton({
      label: 'Home — master copy',
      path: 'content/site/home',
      format: { data: 'yaml' },
      schema: {
        masterCompany: localized('본사 마스터 카피 (masterCompany)'),
        masterOwner: localized('점주 마스터 카피 (masterOwner)'),
        heroSub: localized('Hero 서브카피 (heroSub)'),
        ctaPrimary: localized('CTA · Primary (ctaPrimary)'),
        ctaSecondary: localized('CTA · Secondary (ctaSecondary)'),
      },
    }),
    products: singleton({
      label: 'Products — 제품 허브 카피',
      path: 'content/site/products',
      format: { data: 'yaml' },
      schema: {
        eyebrow: localized('Eyebrow'),
        heroTitle: localized('Hero 제목 (heroTitle)'),
        umbrella: localized('우산 한 줄 (umbrella)'),
        solutionEyebrow: localized('SOLUTION Eyebrow'),
        toolEyebrow: localized('SOURCE Eyebrow'),
        toolBadge: localized('도구 배지 · 곧 출시 (toolBadge)'),
        toolLive: localized('도구 배지 · 운영 중 (toolLive)'),
        detail: localized('“자세히 보기” 라벨 (detail)'),
        visit: localized('“바로가기” 라벨 (visit)'),
        seedLine: localized('SEED 기술 한 줄 (seedLine)'),
        seedCta: localized('SEED CTA (seedCta)'),
        cta: localized('하단 CTA (cta)'),
        live: idItem('SOLUTION 제품 (live)', 'product', {
          kicker: localized('Kicker'),
          func: localized('기능 태그 (func)'),
          desc: localized('설명 (desc)'),
          alt: localized('이미지 대체텍스트 (alt)'),
        }),
        tools: idItem('SOURCE 도구 (tools)', 'tool', {
          desc: localized('설명 (desc)'),
        }),
      },
    }),
  },
});
