import { config, fields, singleton } from '@keystatic/core';

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
  },
});
