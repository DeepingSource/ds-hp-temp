import { isValidElement, type ReactNode } from 'react';
import { type Locale, htmlLang } from '@/lib/i18n';

/**
 * structured-data — JSON-LD helpers for AEO (Answer Engine Optimization).
 * Renders schema.org markup so AI answer engines (Google AI Overviews,
 * Perplexity, ChatGPT) can extract and cite the page. DC=a: schema only.
 */

const SITE = 'https://deepingsource.io';

/** Inline a JSON-LD blob. `<` is escaped per the layout's existing pattern. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
          .replace(/</g, '\\u003c')
          .replace(/>/g, '\\u003e')
          .replace(/&/g, '\\u0026'),
      }}
    />
  );
}

/** Absolute URL for a path, with optional locale prefix (/ko · /jp). */
export function absUrl(path: string, locale: Locale = 'en'): string {
  const prefix = locale === 'ko' ? '/ko' : locale === 'jp' ? '/jp' : '';
  const p = path === '/' ? '' : path;
  return `${SITE}${prefix}${p}`;
}

/** DefinedTerm — glossary entries (highest AEO value). */
export function definedTerm(opts: {
  name: string;
  description: string;
  path: string; // base path e.g. /glossary/store-heatmap
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: opts.name,
    description: opts.description,
    inDefinedTermSet: `${SITE}/resources/glossary`,
    url: absUrl(opts.path, opts.locale),
    inLanguage: htmlLang(opts.locale),
  };
}

/** SoftwareApplication — product pages. */
export function softwareApplication(opts: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    description: opts.description,
    applicationCategory: opts.category ?? 'BusinessApplication',
    operatingSystem: 'Web',
    url: absUrl(opts.path, opts.locale),
    inLanguage: htmlLang(opts.locale),
    provider: {
      '@type': 'Organization',
      name: 'DeepingSource',
      url: SITE,
    },
  };
}

/** Flatten a ReactNode answer to plain text for schema (dependency-free). */
export function nodeToText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join(' ');
  if (isValidElement(node)) return nodeToText((node.props as { children?: ReactNode }).children);
  return '';
}

/** FAQPage — Q&A blocks. */
export function faqPage(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

/** BreadcrumbList — for nested pages (used by the Breadcrumb component). */
export function breadcrumbList(items: { name: string; path: string }[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absUrl(it.path, locale),
    })),
  };
}

/** ItemList — wraps an ordered set of entities (e.g. products). Nested objects'
 *  own '@context' is stripped (inherited from the list). */
export function itemList(items: object[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => {
      const node = { ...(item as Record<string, unknown>) };
      delete node['@context'];
      return { '@type': 'ListItem', position: i + 1, item: node };
    }),
  };
}

/** Article — blog / insight posts (freshness + citation signal). */
export function article(opts: {
  headline: string;
  description?: string;
  path: string;
  locale: Locale;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified || opts.datePublished
      ? { dateModified: opts.dateModified ?? opts.datePublished }
      : {}),
    inLanguage: htmlLang(opts.locale),
    mainEntityOfPage: absUrl(opts.path, opts.locale),
    author: { '@type': 'Organization', name: 'DeepingSource', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'DeepingSource',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/icon.svg` },
    },
  };
}

/** DefinedTermSet — the glossary hub that DefinedTerm entries point to. */
export function definedTermSet(opts: {
  name: string;
  description: string;
  locale: Locale;
  terms: { name: string; description: string; path: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: opts.name,
    description: opts.description,
    url: absUrl('/resources/glossary', opts.locale),
    inLanguage: htmlLang(opts.locale),
    hasDefinedTerm: opts.terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.name,
      description: t.description,
      url: absUrl(t.path, opts.locale),
    })),
  };
}

/** Service — industry solution pages. */
export function service(opts: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  serviceType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    ...(opts.serviceType ? { serviceType: opts.serviceType } : {}),
    url: absUrl(opts.path, opts.locale),
    inLanguage: htmlLang(opts.locale),
    provider: { '@type': 'Organization', name: 'DeepingSource', url: SITE },
    areaServed: ['KR', 'JP'],
  };
}
