'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Linkedin, Instagram } from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import { stripLocale, localeHref, type Locale } from '@/lib/i18n';

type Tri = Record<Locale, string>;
const L = (ko: string, en: string, jp: string): Tri => ({ ko, en, jp });
type FLink = { href: string; label: Tri };

const productLinks: FLink[] = [
  { href: '/products/store-insight', label: L('store insight', 'store insight', 'store insight') },
  { href: '/products/store-agent', label: L('store agent', 'store agent', 'store agent') },
  { href: '/products/store-care', label: L('store care', 'store care', 'store care') },
  { href: '/products#ai-pop', label: L('AI POP', 'AI POP', 'AI POP') },
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
  { title: L('Company', 'Company', '会社'), links: companyLinks },
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
              <span className="text-xl font-bold text-white tracking-tight">DeepingSource</span>
            </Link>
            <p className="text-sm text-gray-300 break-keep">{footerIntro[locale]}</p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-gray-700 opacity-30 cursor-not-allowed" title="준비 중" aria-hidden="true">
                <Linkedin className="w-4 h-4" />
              </span>
              <span className="text-gray-700 opacity-30 cursor-not-allowed" title="준비 중" aria-hidden="true">
                <Instagram className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-8 sm:gap-12">
            {columns.map((col) => (
              <div key={col.title.en}>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">{col.title[locale]}</p>
                <nav className="flex flex-col gap-2" aria-label={col.title[locale]}>
                  {col.links.map((link) => (
                    <Link
                      key={link.href}
                      href={localeHref(locale, link.href)}
                      className="text-sm text-gray-300 hover:text-white hover:underline transition-colors"
                    >
                      {link.label[locale]}
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
