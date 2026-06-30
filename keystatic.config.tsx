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
        heroSub: localized('Hero 서브 (heroSub)'),
        loopEyebrow: localized('운영 루프 Eyebrow (loopEyebrow)'),
        ownersEyebrow: localized('점주용 Eyebrow (ownersEyebrow)'),
        detail: localized('“자세히 보기” 라벨 (detail)'),
        visit: localized('“바로가기” 라벨 (visit)'),
        seedLine: localized('SEED 기술 한 줄 (seedLine)'),
        seedCta: localized('SEED CTA (seedCta)'),
        cta: localized('하단 CTA (cta)'),
        loop: idItem('운영 루프 제품 (loop)', 'product', {
          desc: localized('카드 한 줄 (desc)'),
        }),
        owners: idItem('점주용 사이트 (owners)', 'site', {
          desc: localized('카드 한 줄 (desc)'),
        }),
      },
    }),
    storeAgent: singleton({
      label: 'store agent — 제품 상세 카피',
      path: 'content/site/store-agent',
      format: { data: 'yaml' },
      schema: {
        heroTitle: localized('Hero 제목 (heroTitle)'),
        heroSub: localized('Hero 서브 (heroSub)'),
        ctaPrimary: localized('CTA · Primary (ctaPrimary)'),
        ctaSecondary: localized('CTA · Secondary (ctaSecondary)'),
        stepsHeading: localized('How-it-works 제목 (stepsHeading)'),
        stepsSub: localized('How-it-works 서브 (stepsSub)'),
        pricingHeading: localized('요금 티저 제목 (pricingHeading)'),
        pricingSub: localized('요금 티저 서브 (pricingSub)'),
        pricingCta: localized('요금 티저 CTA (pricingCta)'),
        finalHeading: localized('하단 CTA 제목 (finalHeading)'),
        finalSub: localized('하단 CTA 서브 (finalSub)'),
        finalCta: localized('하단 CTA 버튼 (finalCta)'),
        steps: idItem('운영 단계 (steps)', 'step', {
          title: localized('단계 제목 (title)'),
          desc: localized('단계 설명 (desc)'),
        }),
      },
    }),
  },
});
