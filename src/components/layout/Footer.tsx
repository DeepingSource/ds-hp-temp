'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPANY } from '@/lib/company-data';
import { productPrimary, type ProductKey } from '@/lib/brand-canon';
import { stripLocale, localeHref, type Locale } from '@/lib/i18n';

type Tri = Record<Locale, string>;
const L = (ko: string, en: string, jp: string): Tri => ({ ko, en, jp });
/** Product label from the naming SOT (locale-invariant lowercase). */
const PN = (k: ProductKey): Tri => {
  const n = productPrimary(k);
  return L(n, n, n);
};
type FLink = { href: string; label: Tri; external?: boolean };

// 세 모드(matrix order) → 기능 라이브러리 → B2C. count는 제품이 아니라 기능이므로
// 기능 라이브러리 아래에 둔다 (Function × Mode Matrix v1.0 · reorg Phase 4).
const productLinks: FLink[] = [
  { href: '/products/saai-care', label: PN('care') },
  { href: '/products/saai-insight', label: PN('insight') },
  { href: '/products/saai-agent', label: PN('agent') },
  { href: '/products/functions', label: L('기능 라이브러리', 'Function library', '機能ライブラリ') },
  { href: '/products/store-count', label: L('store count', 'store count', 'store count') },
  { href: 'https://saai.store', external: true, label: L('saai.store', 'saai.store', 'saai.store') },
  { href: 'https://storecare.ai', external: true, label: L('storecare.ai', 'storecare.ai', 'storecare.ai') },
];

const techLinks: FLink[] = [
  { href: '/technology/anonymizer', label: L('Anonymizer', 'Anonymizer', 'Anonymizer') },
  { href: '/technology/seal', label: L('SEAL', 'SEAL', 'SEAL') },
  { href: '/technology/spatial-ai', label: L('Spatial AI', 'Spatial AI', 'Spatial AI') },
  { href: '/technology/models', label: L('Vision Models', 'Vision Models', 'Vision Models') },
];

const companyLinks: FLink[] = [
  { href: '/company/about', label: L('회사 소개', 'About', '会社紹介') },
  { href: '/company/news', label: L('보도자료', 'News', 'プレスリリース') },
  { href: '/events', label: L('이벤트', 'Events', 'イベント') },
  { href: '/company/career', label: L('채용', 'Careers', '採用') },
  { href: '/company/partnership', label: L('파트너십', 'Partnership', 'パートナーシップ') },
  { href: '/company/investors', label: L('IR', 'Investors', 'IR') },
];

const resourceLinks: FLink[] = [
  { href: '/resources/blog', label: L('블로그', 'Blog', 'ブログ') },
  { href: '/resources/case-studies', label: L('도입 사례', 'Case studies', '導入事例') },
  { href: '/resources/docs', label: L('문서', 'Docs', 'ドキュメント') },
  { href: '/resources/glossary', label: L('용어 사전', 'Glossary', '用語集') },
  { href: '/resources/faq', label: L('FAQ', 'FAQ', 'FAQ') },
];

const legalLinks: FLink[] = [
  { href: '/legal/privacy', label: L('개인정보 처리방침', 'Privacy', 'プライバシー') },
  { href: '/legal/terms', label: L('이용약관', 'Terms', '利用規約') },
];

const columns: { title: Tri; links: FLink[] }[] = [
  { title: L('제품', 'Products', '製品'), links: productLinks },
  { title: L('기술', 'Technology', '技術'), links: techLinks },
  { title: L('회사', 'Company', '会社'), links: companyLinks },
  { title: L('리소스', 'Resources', 'リソース'), links: resourceLinks },
];

const footerIntro: Tri = {
  ko: '딥핑소스는 익명화 AI 기술로 세상 모든 오프라인 공간을 안전하게 이해하고 최적화하는 AI 기업입니다.',
  en: 'DeepingSource is an AI company that safely understands and optimizes every offline space with anonymized AI.',
  jp: 'DeepingSourceは、匿名化AIで世界中のオフライン空間を安全に理解し最適化するAI企業です。',
};
const inquiryLabel: Tri = { ko: '문의', en: 'Contact', jp: 'お問い合わせ' };

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { locale } = stripLocale(usePathname());

  return (
    <footer className="bg-gray-900 text-gray-300 noise-overlay">
      <div className="h-px bg-primary/20" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href={localeHref(locale, '/')} className="inline-block mb-2">
              <span className="font-brand text-xl font-bold text-white tracking-wide">DEEPINGSOURCE</span>
            </Link>
            <p className="text-sm text-gray-300 break-keep">{footerIntro[locale]}</p>
          </div>

          {/* Link columns — 모바일 2열 그리드, sm+ 가로 배치 */}
          <div className="grid grid-cols-2 gap-8 sm:flex sm:flex-wrap sm:gap-12">
            {columns.map((col) => (
              <div key={col.title.en}>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">{col.title[locale]}</p>
                <nav className="flex flex-col gap-2" aria-label={col.title[locale]}>
                  {col.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.external ? link.href : localeHref(locale, link.href)}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-gray-300 hover:text-white hover:underline transition-colors"
                    >
                      {link.label[locale]}
                      {link.external && <span aria-hidden="true"> ↗</span>}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={localeHref(locale, link.href)}
                className="text-xs text-gray-400 hover:text-white hover:underline transition-colors"
              >
                {link.label[locale]}
              </Link>
            ))}
            <Link href={localeHref(locale, '/contact')} className="text-xs text-gray-400 hover:text-white hover:underline transition-colors">
              {inquiryLabel[locale]}
            </Link>
          </div>
          <p className="text-xs text-gray-400">{COMPANY.address}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm text-gray-300">
              &copy; {currentYear} {COMPANY.name} All rights reserved.
            </p>
            <a
              href={`mailto:${COMPANY.contactEmail}`}
              className="text-sm text-gray-300 hover:text-white hover:underline transition-colors"
            >
              {COMPANY.contactEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
