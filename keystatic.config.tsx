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

/** A KO/EN/JP list of strings (e.g. a plan's bullet items). */
const localizedList = (label: string) =>
  fields.object(
    {
      ko: fields.array(fields.text({ label: 'KO' }), { label: 'KO', itemLabel: (p) => p.value }),
      en: fields.array(fields.text({ label: 'EN' }), { label: 'EN', itemLabel: (p) => p.value }),
      jp: fields.array(fields.text({ label: 'JP' }), { label: 'JP', itemLabel: (p) => p.value }),
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
    saai: singleton({
      label: 'saai.store — B2C 제품 카피',
      path: 'content/site/saai',
      format: { data: 'yaml' },
      schema: {
        heroBadge: localized('Hero 배지 (heroBadge)'),
        heroTitle: localized('Hero 제목 (heroTitle)'),
        heroSub: localized('Hero 서브 (heroSub)'),
        heroCta: localized('Hero CTA (heroCta)'),
        heroNote: localized('Hero 보조문구 (heroNote)'),
        loopEyebrow: localized('루프 Eyebrow (loopEyebrow)'),
        loopHeading: localized('루프 제목 (loopHeading)'),
        loopSub: localized('루프 서브 (loopSub)'),
        loopFootnote: localized('루프 각주 (loopFootnote)'),
        toolsEyebrow: localized('도구 Eyebrow (toolsEyebrow)'),
        toolsHeading: localized('도구 제목 (toolsHeading)'),
        toolsSub: localized('도구 서브 (toolsSub)'),
        trendNote: localized('trend fit 주석 (trendNote)'),
        planEyebrow: localized('요금 Eyebrow (planEyebrow)'),
        planHeading: localized('요금 제목 (planHeading)'),
        planSub: localized('요금 서브 (planSub)'),
        planNote: localized('요금 각주 (planNote)'),
        featureCta: localized('하단 CTA (featureCta)'),
        featureNote: localized('하단 보조문구 (featureNote)'),
        otherProducts: localized('“다른 제품” 링크 (otherProducts)'),
        loop: idItem('주간 운영 루프 (loop)', 'step', {
          name: localized('단계 이름 (name)'),
          role: localized('단계 역할 (role)'),
        }),
        tools: idItem('도구 (tools)', 'tool', {
          name: localized('도구 이름 (name)'),
          desc: localized('도구 설명 (desc)'),
        }),
        plans: idItem('요금제 (plans)', 'plan', {
          tier: localized('티어 (tier)'),
          price: localized('가격 (price)'),
          desc: localized('한 줄 설명 (desc)'),
          items: localizedList('포함 항목 (items)'),
        }),
      },
    }),
  },
});
