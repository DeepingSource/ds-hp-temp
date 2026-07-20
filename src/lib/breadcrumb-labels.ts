import { type Locale } from '@/lib/i18n';

/**
 * breadcrumb-labels — localized labels for breadcrumb trail segments.
 * Keyed by the last URL segment. Brand/product names (store insight, SEAL …)
 * are identical across locales and passed as literals by the caller instead.
 *
 * NOTE: there is no /company index page (404), so company subpages use a
 * two-level trail (Home > {page}) and skip a "Company" segment.
 */

type Tri = Record<Locale, string>;

export const crumbLabels: Record<string, Tri> = {
  // section landings
  products: { ko: '제품', en: 'Products', jp: '製品' },
  technology: { ko: '기술', en: 'Technology', jp: '技術' },
  solutions: { ko: '솔루션', en: 'Solutions', jp: 'ソリューション' },
  resources: { ko: '리소스', en: 'Resources', jp: 'リソース' },
  enterprise: { ko: '엔터프라이즈', en: 'Enterprise', jp: 'エンタープライズ' },
  pricing: { ko: '요금 안내', en: 'Pricing', jp: '料金' },
  contact: { ko: '문의하기', en: 'Contact', jp: 'お問い合わせ' },

  // company pages (no /company index)
  about: { ko: '회사 소개', en: 'About', jp: '会社紹介' },
  news: { ko: '뉴스', en: 'News', jp: 'ニュース' },
  career: { ko: '채용', en: 'Careers', jp: '採用' },
  partnership: { ko: '파트너십', en: 'Partnership', jp: 'パートナーシップ' },
  investors: { ko: 'IR', en: 'Investors', jp: 'IR' },

  // resources pages
  'case-studies': { ko: '고객 사례', en: 'Case Studies', jp: '導入事例' },
  docs: { ko: '문서', en: 'Docs', jp: 'ドキュメント' },
  glossary: { ko: '용어 사전', en: 'Glossary', jp: '用語辞典' },
  faq: { ko: 'FAQ', en: 'FAQ', jp: 'FAQ' },
  events: { ko: '이벤트', en: 'Events', jp: 'イベント' },

  // technology pages
  anonymizer: { ko: 'Anonymizer', en: 'Anonymizer', jp: 'Anonymizer' },
  seal: { ko: 'SEAL', en: 'SEAL', jp: 'SEAL' },
  'spatial-ai': { ko: 'Spatial AI', en: 'Spatial AI', jp: 'Spatial AI' },
  models: { ko: '비전 모델', en: 'Vision Models', jp: 'ビジョンモデル' },

  // solution industries
  retail: { ko: '리테일·편의점', en: 'Retail', jp: '小売・コンビニ' },
  'food-beverage': { ko: '카페·음식점', en: 'Food & Beverage', jp: 'カフェ・飲食' },
  drug: { ko: '드럭스토어', en: 'Drugstore', jp: 'ドラッグストア' },
  'large-space': { ko: '대형 공간', en: 'Large Spaces', jp: '大型空間' },
};

/** Convenience: label for a segment key in a locale, falling back to the key. */
export function crumb(key: string, locale: Locale): string {
  return crumbLabels[key]?.[locale] ?? key;
}
