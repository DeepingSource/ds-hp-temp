'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

import SlidingIndicator from '@/components/ui/SlidingIndicator';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import LocaleSwitcher from '@/components/layout/LocaleSwitcher';
import { springGentle } from '@/lib/spring-config';
import { productPrimary, type ProductKey } from '@/lib/brand-canon';
import { localeHref, stripLocale, type Locale, homeCopy } from '@/lib/i18n';

type Tri = Record<Locale, string>;
const L = (ko: string, en: string, jp: string): Tri => ({ ko, en, jp });

const PN = (k: ProductKey): Tri => {
  const n = productPrimary(k);
  return L(n, n, n);
};

type NavLeaf =
  | { header: Tri }
  | { href: string; label: Tri; desc?: Tri; external?: boolean };
type NavItem =
  | { type: 'link'; href: string; label: Tri }
  | { type: 'menu'; key: string; label: Tri; base: string; items: NavLeaf[] };

/** Reading-progress bar appears only past this much scrollable distance (px) —
 *  roughly "more than a couple of screens of content". */
const PROGRESS_MIN_SCROLL = 1200;

const NAV: NavItem[] = [
  {
    type: 'menu', key: 'products', label: L('제품', 'Products', '製品'), base: '/products', items: [
      { href: '/products', label: L('제품 전체', 'All products', '製品一覧'), desc: L('운영 체계 한눈에', 'The operating loop at a glance', 'オペレーションループを一望') },
      { header: L('SAAI 3대 핵심 모드', 'SAAI 3 Core Modes', 'SAAI 3つのコアモード') },
      { href: '/products/saai-care', label: PN('care'), desc: L('탐지·감지 · 지금 무슨 일이 일어나는가', 'Detect · what is happening now', '検知 · 今、何が起きているか') },
      { href: '/products/saai-insight', label: PN('insight'), desc: L('분석 · 어제까지 무엇이 있었나', 'Analyze · what happened until yesterday', '分析 · 昨日まで何があったか') },
      { href: '/products/saai-agent', label: PN('agent'), desc: L('제안·운영 · 다음에 무엇을 할까', 'Advise · what to do next', '提案・運営 · 次に何をするか') },
      { header: L('기능 모듈 & 라인업', 'Modules & Functions', '機能モジュール') },
      { href: '/products/functions', label: L('기능 라이브러리', 'Function library', '機能ライブラリ'), desc: L('count·queue·pop·fit — 4개 기능 × 3모드', 'count·queue·pop·fit — 4 functions × 3 modes', 'count・queue・pop・fit — 4機能 × 3モード') },
      { href: '/products/store-count', label: L('saai count', 'saai count', 'saai count'), desc: L('방문·재실 인원 — 상권·통행·유입률', 'Footfall & occupancy — trade area, passers-by, capture rate', '来店・滞在人数 — 商圏・通行・流入率') },
      { href: '/products/saai-ads-insight', label: L('saai ads insight', 'saai ads insight', 'saai ads insight'), desc: L('시선 · 주목도 전용 분석', 'Gaze & attention analytics', '視線・注目度分析') },
      { header: L('소상공인·사장님 전용', 'For Store Owners', '店舗オーナー向け') },
      { href: '/products/saai-for-owners', label: L('사장님 전용 SAAI 모음', 'SAAI for Store Owners', 'オーナー専用 SAAI 集'), desc: L('카메라리스 운영 & 보안 알림', 'Camera-less & Security Suite', 'カメラレス運営・セキュリティ') },
    ],
  },
  {
    type: 'menu', key: 'technology', label: L('기술', 'Technology', '技術'), base: '/technology', items: [
      { href: '/technology', label: L('기술 개요', 'Overview', '技術概要'), desc: L('프라이버시 공간 AI', 'Privacy Spatial AI', 'プライバシー空間AI') },
      { header: L('3대 핵심 기술 파이프라인', '3 Core Tech Pipeline', '3大コア技術パイプライン') },
      { href: '/technology/anonymizer', label: L('Anonymizer', 'Anonymizer', 'Anonymizer'), desc: L('원천 익명화 모듈', 'Source Anonymization', '元本匿名化モジュール') },
      { href: '/technology/spatial-ai', label: L('Spatial AI', 'Spatial AI', 'Spatial AI'), desc: L('MTMC 3D 공간 인지', 'MTMC 3D Trajectory Sensing', 'MTMC 3D空間動線認識') },
      { href: '/technology/agentic-ai', label: L('Agentic AI', 'Agentic AI', 'Agentic AI'), desc: L('접근 철학·자율화 단계', 'Principles & levels of autonomy', 'アプローチの哲学・自律化の段階') },
      { header: L('부차적 지원 모듈', 'Supporting Tech Modules', '補助技術モジュール') },
      { href: '/technology/seal', label: L('SEAL', 'SEAL', 'SEAL'), desc: L('Edge SDK', 'Edge SDK', 'Edge SDK') },
      { href: '/technology/models', label: L('Vision Models', 'Vision Models', 'Vision Models'), desc: L('모델 카탈로그', 'Model catalog', 'モデルカタログ') },
    ],
  },
  {
    type: 'menu', key: 'solutions', label: L('솔루션', 'Solutions', 'ソリューション'), base: '/solutions', items: [
      { href: '/solutions', label: L('솔루션 전체', 'All solutions', 'ソリューション一覧') },
      { href: '/solutions/retail', label: L('리테일·편의점', 'Retail', '小売・コンビニ') },
      { href: '/solutions/food-beverage', label: L('카페·음식점', 'Food & Beverage', 'カフェ・飲食') },
      { href: '/solutions/drug-store', label: L('드럭스토어', 'Drugstore', 'ドラッグストア') },
      { href: '/solutions/large-space', label: L('대형 공간', 'Large space', '大型空間') },
    ],
  },
  {
    type: 'menu', key: 'company', label: L('회사', 'Company', '会社'), base: '/company', items: [
      { href: '/company/about', label: L('회사 소개', 'About', '会社紹介'), desc: L('DEEPINGSOURCE Inc.', 'DEEPINGSOURCE Inc.', 'DEEPINGSOURCE Inc.') },
      { href: '/company/team', label: L('팀원 & 사람', 'People & Team', 'チーム & 人々'), desc: L('SAAI를 만드는 사람들', 'Meet the SAAI team', 'SAAIを創る人々') },
      { href: '/company/news', label: L('보도자료', 'News', 'プレスリリース') },
      { href: '/events', label: L('이벤트', 'Events', 'イベント'), desc: L('박람회·컨벤션', 'Expos & conventions', '展示会・コンベンション') },
      { href: '/company/career', label: L('채용 & 문화', 'Careers', '採用・文化') },
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
  const openTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  // Starts false so the bar never flashes on a short page before the first measure.
  const [showProgress, setShowProgress] = useState(false);

  // Clears any pending open/close timers — called before every state change
  // below so a stale timer can never fire after a newer, more-explicit action
  // (a click, Escape, route change, or outside click) already decided the state.
  const clearOpenCloseTimers = useCallback(() => {
    if (openTimeout.current) { clearTimeout(openTimeout.current); openTimeout.current = null; }
    if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
  }, []);

  // Hover-intent: opening waits ~100ms so a pointer merely passing over the bar
  // (e.g. gliding from "제품" toward "요금") doesn't flash the mega menu open.
  // Closing keeps its existing 150ms grace period so moving into the dropdown
  // panel itself doesn't prematurely close it.
  const handleEnter = useCallback((key: string) => {
    clearOpenCloseTimers();
    openTimeout.current = setTimeout(() => setOpenKey(key), 100);
  }, [clearOpenCloseTimers]);

  const handleLeave = useCallback(() => {
    clearOpenCloseTimers();
    closeTimeout.current = setTimeout(() => setOpenKey(null), 150);
  }, [clearOpenCloseTimers]);

  // Click is an explicit, immediate action — it should never wait on the hover
  // intent delay, and it cancels any pending hover timer so a click-close isn't
  // silently reopened a moment later by a leftover hover-enter timeout.
  const handleToggleClick = useCallback((key: string, isOpen: boolean) => {
    clearOpenCloseTimers();
    setOpenKey(isOpen ? null : key);
  }, [clearOpenCloseTimers]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { clearOpenCloseTimers(); setIsMenuOpen(false); setOpenKey(null); }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [clearOpenCloseTimers]);

  useEffect(() => {
    if (!openKey) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        clearOpenCloseTimers();
        setOpenKey(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [openKey, clearOpenCloseTimers]);

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    clearOpenCloseTimers();
    setIsMenuOpen(false); setOpenKey(null); setMobileOpenKey(null);
  }, [pathname, clearOpenCloseTimers]);

  useEffect(() => () => clearOpenCloseTimers(), [clearOpenCloseTimers]);

  // Reading-progress bar scope (P2-9). The bar is meaningful on long, content-heavy
  // pages (blog/docs); on short ones (pricing, contact…) it sits under the header as
  // a line that never moves much. Rather than plumbing a per-template flag through
  // the global header, measure the actual scrollable distance and hide below the
  // threshold. Re-measured on route change and resize; images/fonts settling after
  // paint are covered by the ResizeObserver on <body>.
  useEffect(() => {
    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setShowProgress(scrollable >= PROGRESS_MIN_SCROLL);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[var(--z-header)]">
      <div
        className={`relative backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-200 ease-[var(--ease-out-cubic)] border-b ${
          isScrolled || isMenuOpen || openKey
            ? 'bg-white/95 border-gray-200/80 shadow-sm'
            : 'bg-white/80 border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={localeHref(locale, '/')}
            className="text-xl font-bold tracking-wider text-gray-900 font-display hover:opacity-90 transition-opacity"
          >
            DEEPINGSOURCE
          </Link>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-1" aria-label="Main menu">
            {NAV.map((item) => {
              if (item.type === 'link') {
                const active = path === item.href;
                return (
                  <Link
                    key={item.href}
                    href={localeHref(locale, item.href)}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors ease-[var(--ease-out-cubic)] rounded-lg ${
                      active ? 'text-primary' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label[locale]}
                    {active && (
                      <SlidingIndicator layoutId="nav-indicator" className="absolute inset-0 -z-10 rounded-lg bg-primary-lighter" />
                    )}
                  </Link>
                );
              }

              const open = openKey === item.key;
              const active = path.startsWith(item.base);

              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => handleEnter(item.key)}
                  onMouseLeave={handleLeave}
                >
                  <button
                    onClick={() => handleToggleClick(item.key, open)}
                    className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors ease-[var(--ease-out-cubic)] rounded-lg cursor-pointer ${
                      active || open ? 'text-primary' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    } ${open ? 'bg-gray-50' : ''}`}
                    aria-expanded={open}
                    aria-haspopup="true"
                  >
                    {item.label[locale]}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ease-[var(--ease-out-cubic)] ${open ? 'rotate-180' : ''}`} />
                    {active && (
                      <SlidingIndicator layoutId="nav-indicator" className="absolute inset-0 -z-10 rounded-lg bg-primary-lighter" />
                    )}
                  </button>

                  {/* Dropdown / Mega Menu Panel.
                      Motion runs on framer's springGentle (site motion language, P2-8)
                      instead of a CSS transition. Deliberately NOT AnimatePresence:
                      unmounting when closed would strip ~30 nav links from the server
                      HTML on every page. The panel stays mounted (crawlable) and is
                      taken out of the a11y/pointer tree with aria-hidden + inert. */}
                  <motion.div
                    aria-hidden={!open}
                    inert={!open || undefined}
                    initial={false}
                    animate={{ opacity: open ? 1 : 0, y: open ? 0 : -4 }}
                    transition={springGentle}
                    className={`absolute top-full left-0 pt-2 ${
                      open ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                  >
                    {item.key === 'products' ? (
                      /* Mega Menu Panel for Products */
                      <div className="w-[620px] bg-white rounded-2xl border border-gray-200/90 shadow-2xl shadow-gray-900/10 p-6 overflow-hidden">
                        <div className="grid grid-cols-12 gap-6">
                          {/* Left Column: SAAI 3 Core Modes */}
                          <div className="col-span-7 space-y-2">
                            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                              <p className="text-2xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5"><SaaiSymbol className="w-4 h-2.5 text-primary" ariaHidden={true} />
                                {L('SAAI 3대 핵심 모드', 'SAAI 3 Core Modes', 'SAAI 3つのコアモード')[locale]}
                              </p>
                              <Link href={localeHref(locale, '/products')} className="text-2xs font-semibold text-gray-500 hover:text-primary transition-colors">
                                {L('제품 전체 →', 'All products →', 'すべて見る →')[locale]}
                              </Link>
                            </div>
                            <div className="space-y-1.5 pt-1">
                              <Link
                                href={localeHref(locale, '/products/saai-care')}
                                className="group flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors"
                              >
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary text-white text-2xs font-bold uppercase leading-none shrink-0 whitespace-nowrap">
                                  <SaaiSymbol className="w-2.5 h-2.5 shrink-0 text-white" />
                                  care
                                </span>
                                <div>
                                  <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">saai care</p>
                                  <p className="text-2xs text-gray-500 leading-normal">{L('지금 · 실시간 이상 감지', 'Detect · live anomaly', '検知 · 今、何が起きているか')[locale]}</p>
                                </div>
                              </Link>

                              <Link
                                href={localeHref(locale, '/products/saai-insight')}
                                className="group flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors"
                              >
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary text-white text-2xs font-bold uppercase leading-none shrink-0 whitespace-nowrap">
                                  <SaaiSymbol className="w-2.5 h-2.5 shrink-0 text-white" />
                                  insight
                                </span>
                                <div>
                                  <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">saai insight</p>
                                  <p className="text-2xs text-gray-500 leading-normal">{L('어제 · 추세 분석', 'Analyze · trend analytics', '分析 · 昨日まで何があったか')[locale]}</p>
                                </div>
                              </Link>

                              <Link
                                href={localeHref(locale, '/products/saai-agent')}
                                className="group flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors"
                              >
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary text-white text-2xs font-bold uppercase leading-none shrink-0 whitespace-nowrap">
                                  <SaaiSymbol className="w-2.5 h-2.5 shrink-0 text-white" />
                                  agent
                                </span>
                                <div>
                                  <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">saai agent</p>
                                  <p className="text-2xs text-gray-500 leading-normal">{L('다음 · 자율 현장 운영 제안', 'Advise · autonomous ops', '提案 · 次に何をするか')[locale]}</p>
                                </div>
                              </Link>
                            </div>
                          </div>

                          {/* Right Column: Functions & Modules */}
                          <div className="col-span-5 space-y-2">
                            <p className="text-2xs font-bold uppercase tracking-wider text-gray-400 pb-2 border-b border-gray-100">
                              {L('기능 모듈 & 라인업', 'Modules & Functions', '機能モジュール')[locale]}
                            </p>
                            <div className="space-y-1 pt-1">
                              <Link href={localeHref(locale, '/products/functions')} className="block p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                                <p className="text-xs font-bold text-gray-900">{L('기능 라이브러리', 'Function library', '機能ライブラリ')[locale]}</p>
                                <p className="text-2xs text-gray-500">{L('4개 기능 × 3모드', '4 functions × 3 modes', '4機能 × 3モード')[locale]}</p>
                              </Link>
                              <Link href={localeHref(locale, '/products/store-count')} className="block p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                                <p className="text-xs font-bold text-gray-900">saai count</p>
                                <p className="text-2xs text-gray-500">{L('유동인구 · 입문 모듈', 'Footfall & entry module', '来店人数・入門')[locale]}</p>
                              </Link>
                              <Link href={localeHref(locale, '/products/saai-ads-insight')} className="block p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                                <p className="text-xs font-bold text-gray-900">saai ads insight</p>
                                <p className="text-2xs text-gray-500">{L('시선 · 주목도 전용 분석', 'Gaze & attention', '視線・注目度分析')[locale]}</p>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Banner for Store Owners (B2C) */}
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <Link
                            href={localeHref(locale, '/products/saai-for-owners')}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white hover:bg-primary transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500 text-white font-bold text-2xs">B2C</span>
                              <span className="text-xs font-semibold">{L('소상공인·매장 사장님이신가요? 사장님 전용 서비스 보기', 'For Store Owners · View dedicated owner suite', '店舗オーナー様向けサービスを見る')[locale]}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      /* Standard Single Column Dropdown */
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
                    )}
                  </motion.div>
                </div>
              );
            })}
          </nav>

          {/* Right Action */}
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
            aria-label={(isMenuOpen ? L('메뉴 닫기', 'Close menu', 'メニューを閉じる') : L('메뉴 열기', 'Open menu', 'メニューを開く'))[locale]}
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

        {/* Reading-progress bar — long content pages only (see showProgress above) */}
        {showProgress && (
          <motion.div
            aria-hidden="true"
            className="absolute top-16 left-0 right-0 h-0.5 origin-left bg-primary"
            style={{ scaleX: scrollYProgress }}
          />
        )}

        {/* Mobile menu */}
        <div
          className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out-cubic)] ${
            isMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <nav
              id="mobile-menu"
              className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-6 space-y-1 border-t border-gray-100 bg-white"
              aria-label="Mobile menu"
            >
              {NAV.map((item) => {
                if (item.type === 'link') {
                  const active = path === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={localeHref(locale, item.href)}
                      className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors ease-[var(--ease-out-cubic)] ${
                        active ? 'text-primary bg-primary-lighter' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label[locale]}
                    </Link>
                  );
                }

                const open = mobileOpenKey === item.key;
                const active = path.startsWith(item.base);

                return (
                  <div key={item.key} className="rounded-xl overflow-hidden">
                    <button
                      onClick={() => setMobileOpenKey(open ? null : item.key)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-colors ease-[var(--ease-out-cubic)] cursor-pointer ${
                        active ? 'text-primary' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.label[locale]}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ease-[var(--ease-out-cubic)] ${open ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-cubic)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden bg-gray-50/70 rounded-xl my-1">
                        {item.items.map((leaf, i) => {
                          if ('header' in leaf) {
                            return (
                              <p key={i} className="px-6 pt-3 pb-1 text-2xs font-bold uppercase tracking-wider text-gray-400">
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
                              className={`block px-6 py-2.5 text-sm transition-colors ease-[var(--ease-out-cubic)] ${
                                leafActive ? 'text-primary' : 'text-gray-600 hover:text-gray-900'
                              }`}
                              aria-current={leafActive ? 'page' : undefined}
                            >
                              {leaf.label[locale]}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                <LocaleSwitcher />
                <Link
                  href={localeHref(locale, '/contact')}
                  className="flex-1 text-center px-5 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors"
                >
                  {homeCopy[locale].ctaPrimary}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
