'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { stripLocale, localeHref, homeCopy, type Locale } from '@/lib/i18n';
import LocaleSwitcher from './LocaleSwitcher';

type Tri = Record<Locale, string>;
const L = (ko: string, en: string, jp: string): Tri => ({ ko, en, jp });
type NavLeaf =
  | { header: Tri }
  | { href: string; label: Tri; desc?: Tri; external?: boolean };
type NavItem =
  | { type: 'link'; href: string; label: Tri }
  | { type: 'menu'; key: string; label: Tri; base: string; items: NavLeaf[] };

const NAV: NavItem[] = [
  {
    type: 'menu', key: 'products', label: L('제품', 'Products', '製品'), base: '/products', items: [
      { href: '/products', label: L('제품 전체', 'All products', '製品一覧'), desc: L('운영 루프 한눈에', 'The operating loop at a glance', 'オペレーションループを一望') },
      { header: L('엔터프라이즈 — 매장 운영 루프', 'Enterprise — operating loop', 'エンタープライズ — 店舗オペレーションループ') },
      { href: '/products/store-count', label: L('store count', 'store count', 'store count'), desc: L('문 밖 · 상권·통행·흡인율', 'Measure · footfall outside', '店の外 · 商圏・通行・捕捉率') },
      { href: '/products/store-insight', label: L('store insight', 'store insight', 'store insight'), desc: L('문 안 · 동선·체류·전환', 'Analyze · flow·dwell·conversion', '店の中 · 動線・滞在・転換') },
      { href: '/products/store-care', label: L('store care', 'store care', 'store care'), desc: L('지금 · 손실예방·컴플라이언스', 'Detect · loss prevention·compliance', 'いま · 防損・コンプライアンス') },
      { href: '/products/store-agent', label: L('store agent', 'store agent', 'store agent'), desc: L('다음 · 추천·발주·자율운영', 'Act · recommend·order', '次の一手 · 推奨・発注・自律運営') },
      { header: L('점주를 위한 — B2C (별도 사이트)', 'For owners — B2C (separate sites)', '店長向け — B2C（別サイト）') },
      { href: 'https://saai.store', external: true, label: L('saai.store', 'saai.store', 'saai.store'), desc: L('카메라리스 점주 suite', 'Camera-less owner suite', 'カメラレス店長スイート') },
      { href: 'https://storecare.ai', external: true, label: L('storecare.ai', 'storecare.ai', 'storecare.ai'), desc: L('점주용 보안·이상 알림', 'Security & anomaly alerts', '店長向けセキュリティ・異常アラート') },
    ],
  },
  {
    type: 'menu', key: 'technology', label: L('기술', 'Technology', '技術'), base: '/technology', items: [
      { href: '/technology', label: L('기술 개요', 'Overview', '技術概要'), desc: L('프라이버시 AI', 'Privacy AI', 'プライバシーAI') },
      { href: '/technology/anonymizer', label: L('Anonymizer', 'Anonymizer', 'Anonymizer'), desc: L('익명화 모듈', 'Anonymization', '匿名化モジュール') },
      { href: '/technology/seal', label: L('SEAL', 'SEAL', 'SEAL'), desc: L('SDK', 'SDK', 'SDK') },
      { href: '/technology/spatial-ai', label: L('Spatial AI', 'Spatial AI', 'Spatial AI'), desc: L('MTMC', 'MTMC', 'MTMC') },
      { href: '/technology/models', label: L('Vision Models', 'Vision Models', 'Vision Models'), desc: L('20여 개 카탈로그', '20+ catalog', '20以上のカタログ') },
    ],
  },
  {
    type: 'menu', key: 'solutions', label: L('솔루션', 'Solutions', 'ソリューション'), base: '/solutions', items: [
      { href: '/solutions', label: L('솔루션 전체', 'All solutions', 'ソリューション一覧') },
      { href: '/solutions/retail', label: L('리테일·편의점', 'Retail', '小売・コンビニ') },
      { href: '/solutions/food-beverage', label: L('카페·음식점', 'Food & Beverage', 'カフェ・飲食') },
      { href: '/solutions/drug', label: L('드럭스토어', 'Drugstore', 'ドラッグストア') },
      { href: '/solutions/large-space', label: L('대형 공간', 'Large space', '大型空間') },
    ],
  },
  {
    type: 'menu', key: 'company', label: L('Company', 'Company', '会社'), base: '/company', items: [
      { href: '/company/about', label: L('회사 소개', 'About', '会社紹介'), desc: L('DeepingSource Inc.', 'DeepingSource Inc.', 'DeepingSource Inc.') },
      { href: '/company/news', label: L('보도자료', 'News', 'プレスリリース') },
      { href: '/company/career', label: L('채용', 'Careers', '採用') },
      { href: '/company/partnership', label: L('파트너십', 'Partnership', 'パートナーシップ') },
      { href: '/company/investors', label: L('IR', 'Investors', 'IR') },
    ],
  },
  {
    type: 'menu', key: 'resources', label: L('리소스', 'Resources', 'リソース'), base: '/resources', items: [
      { href: '/resources/blog', label: L('블로그', 'Blog', 'ブログ') },
      { href: '/resources/case-studies', label: L('도입 사례', 'Case studies', '導入事例') },
      { href: '/resources/docs', label: L('문서', 'Docs', 'ドキュメント') },
      { href: '/resources/glossary', label: L('용어 사전', 'Glossary', '用語集') },
      { href: '/resources/faq', label: L('FAQ', 'FAQ', 'FAQ') },
    ],
  },
  { type: 'link', href: '/pricing', label: L('요금', 'Pricing', '料金') },
  { type: 'link', href: '/enterprise', label: L('엔터프라이즈', 'Enterprise', 'エンタープライズ') },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpenKey, setMobileOpenKey] = useState<string | null>(null);
  const pathname = usePathname();
  const { locale, path } = stripLocale(pathname);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const handleEnter = useCallback((key: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenKey(key);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => setOpenKey(null), 150);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsMenuOpen(false); setOpenKey(null); }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!openKey) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenKey(null);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [openKey]);

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    // 라우트 변경 시 열린 메뉴를 닫는다 (외부 시스템=router 와 동기화).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false); setOpenKey(null); setMobileOpenKey(null);
  }, [pathname]);

  useEffect(() => () => { if (closeTimeout.current) clearTimeout(closeTimeout.current); }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-gray-100/80'
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href={localeHref(locale, '/')} className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold tracking-tight text-gray-900">DeepingSource</span>
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-0.5" aria-label="메인 내비게이션">
          {NAV.map((item) => {
            if (item.type === 'link') {
              const active = path === item.href;
              return (
                <Link
                  key={item.href}
                  href={localeHref(locale, item.href)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active ? 'text-primary bg-primary-lighter' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label[locale]}
                </Link>
              );
            }
            const active = path.startsWith(item.base);
            const open = openKey === item.key;
            return (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => handleEnter(item.key)}
                onMouseLeave={handleLeave}
              >
                <button
                  type="button"
                  onClick={() => setOpenKey(open ? null : item.key)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    active || open ? 'text-primary bg-primary-lighter' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  aria-expanded={open}
                  aria-haspopup="true"
                >
                  {item.label[locale]}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                </button>
                <div
                  aria-hidden={!open}
                  inert={!open || undefined}
                  className={`absolute top-full left-0 pt-2 transition-[opacity,transform] duration-200 ${
                    open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                  }`}
                >
                  <div className="w-64 bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-200/60 py-2">
                    {item.items.map((leaf, i) => {
                      if ('header' in leaf) {
                        return (
                          <p key={i} className="px-4 pt-3 pb-1 text-2xs font-bold uppercase tracking-wider text-gray-400">
                            {leaf.header[locale]}
                          </p>
                        );
                      }
                      const leafActive = !leaf.external && path === leaf.href;
                      return (
                        <Link
                          key={leaf.href}
                          href={leaf.external ? leaf.href : localeHref(locale, leaf.href)}
                          {...(leaf.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            leafActive ? 'text-primary bg-primary-lighter font-medium' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                          }`}
                          aria-current={leafActive ? 'page' : undefined}
                        >
                          <span className="block font-medium">
                            {leaf.label[locale]}
                            {leaf.external && <span aria-hidden="true"> ↗</span>}
                          </span>
                          {leaf.desc && <span className="block text-xs text-gray-500">{leaf.desc[locale]}</span>}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <LocaleSwitcher />
          <Link href={localeHref(locale, '/contact')} className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors">
            {homeCopy[locale].ctaPrimary}
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <nav
            id="mobile-menu"
            className="bg-white/95 backdrop-blur-xl border-t border-gray-100 max-w-6xl mx-auto px-4 py-3 space-y-1 max-h-[calc(100dvh-4rem)] overflow-y-auto"
            aria-label="모바일 내비게이션"
          >
            {NAV.map((item) => {
              if (item.type === 'link') {
                return (
                  <Link
                    key={item.href}
                    href={localeHref(locale, item.href)}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    {item.label[locale]}
                  </Link>
                );
              }
              const open = mobileOpenKey === item.key;
              return (
                <div key={item.key}>
                  <button
                    type="button"
                    onClick={() => setMobileOpenKey(open ? null : item.key)}
                    className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors cursor-pointer"
                    aria-expanded={open}
                  >
                    {item.label[locale]}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="pl-3 pr-1 py-1 space-y-0.5">
                        {item.items.map((leaf, i) => {
                          if ('header' in leaf) {
                            return (
                              <p key={i} className="px-3 pt-2 pb-1 text-2xs font-bold uppercase tracking-wider text-gray-400">
                                {leaf.header[locale]}
                              </p>
                            );
                          }
                          return (
                            <Link
                              key={leaf.href}
                              href={leaf.external ? leaf.href : localeHref(locale, leaf.href)}
                              {...(leaf.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                            >
                              {leaf.label[locale]}
                              {leaf.external && <span aria-hidden="true"> ↗</span>}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <hr className="border-gray-100 my-1" />
            <div className="px-3 py-2">
              <LocaleSwitcher />
            </div>
            <div className="pt-1 pb-2">
              <Link
                href={localeHref(locale, '/contact')}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full py-3 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors text-center"
              >
                {homeCopy[locale].ctaPrimary}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
