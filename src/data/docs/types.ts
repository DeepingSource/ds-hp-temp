import type { Locale } from '@/lib/i18n';

export type DocSection = 'getting-started' | 'integration' | 'privacy' | 'analytics' | 'manual';

/** Sidebar group order (DOCS_WIKI_PLAN D6). */
export const docSectionOrder: DocSection[] = ['getting-started', 'integration', 'privacy', 'analytics', 'manual'];

/** Localized sidebar group labels — mirrors the previous DocsView navSections. */
export const docSectionLabelI18n: Record<Locale, Record<DocSection, string>> = {
  ko: {
    'getting-started': '시작하기',
    integration: '연동 가이드',
    privacy: '프라이버시 & 보안',
    analytics: '분석 활용',
    manual: '제품 매뉴얼',
  },
  en: {
    'getting-started': 'Getting Started',
    integration: 'Integration Guide',
    privacy: 'Privacy & Security',
    analytics: 'Using Analytics',
    manual: 'Product Manuals',
  },
  jp: {
    'getting-started': 'はじめに',
    integration: '連携ガイド',
    privacy: 'プライバシー & セキュリティ',
    analytics: '分析活用',
    manual: '製品マニュアル',
  },
};

export interface Doc {
  slug: string; // file slug (ko base has no suffix; en/jp carry -en/-jp)
  title: string;
  excerpt: string;
  section: DocSection;
  order: number;
  parent?: string;
  icon: string;
  lang: Locale;
  draft: boolean;
  access: 'public' | 'gated';
  updated?: string;
  relatedSlugs: string[];
  relatedTerms: string[];
  body: string; // raw MDX
}

export type DocMeta = Omit<Doc, 'body'>;

/** URL (logical) slug — the base slug shared across locales, so /resources/docs/[slug]
 *  is identical in en/ko/jp. Strips the -en/-jp file suffix. */
export function logicalDocSlug(fileSlug: string): string {
  return fileSlug.replace(/-(en|jp)$/, '');
}
