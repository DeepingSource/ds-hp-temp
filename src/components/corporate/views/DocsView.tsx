import Link from 'next/link';
import { BookOpen, Rocket, Plug, Shield, BarChart3, FileText, Bot, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { type Locale, localeHref } from '@/lib/i18n';

/**
 * DocsView — shared product-docs hub composition.
 * Rendered by `/resources/docs` (en), `/ko/resources/docs`, `/jp/resources/docs` with the
 * locale prop (PLAN_v1.1 D6 path-prefix i18n).
 */

const C: Record<Locale, {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  sidebarLabel: string;
  noticeBefore: string;
  noticeLink: string;
  noticeAfter: string;
  manualSectionTitle: string;
  featuredTitle: string;
  featuredDesc: string;
  comingSoon: string;
  docComingSoon: string;
  navSections: { id: string; title: string; items: { title: string; slug?: string }[] }[];
  comingSoonManuals: { title: string; desc: string }[];
}> = {
  ko: {
    eyebrow: 'Docs',
    heroTitle: '제품 문서',
    heroSub: 'DeepingSource 제품의 설치, 연동, 운영에 필요한 기술 문서를 제공합니다. 아래에서 필요한 주제를 골라 시작하세요.',
    sidebarLabel: '제품 문서',
    noticeBefore: '상세 문서는 순차적으로 공개 예정입니다. 지금 필요한 자료가 있다면 ',
    noticeLink: '문의',
    noticeAfter: '해 주세요.',
    manualSectionTitle: '제품별 매뉴얼',
    featuredTitle: 'store insight 사용자 매뉴얼',
    featuredDesc: '로그인·기간 설정부터 방문자 분석, 히트맵, 동선, 퍼널, 구매 전환율까지 — 대시보드 리포트 읽는 법을 안내합니다.',
    comingSoon: '준비 중',
    docComingSoon: '문서 준비 중',
    navSections: [
      { id: 'getting-started', title: '시작하기', items: [
        { title: '제품 개요', slug: 'product-overview' },
        { title: '도입 절차', slug: 'deployment-steps' },
        { title: '환경 요구사항', slug: 'environment-requirements' },
        { title: '첫 리포트 받기', slug: 'your-first-report' },
      ] },
      { id: 'integration', title: '연동 가이드', items: [{ title: 'CCTV 연동', slug: 'cctv-integration' }, { title: 'POS 연동', slug: 'pos-integration' }, { title: '대시보드 접근', slug: 'dashboard-access' }, { title: 'API 개요', slug: 'api-overview' }] },
      { id: 'privacy', title: '프라이버시 & 보안', items: [{ title: '익명화 동작 원리', slug: 'how-anonymization-works' }, { title: '데이터 보관 정책', slug: 'data-retention-policy' }, { title: '접근 권한 관리' }, { title: '컴플라이언스' }] },
      { id: 'analytics', title: '분석 활용', items: [{ title: '히트맵 읽는 법' }, { title: '체류·전환 지표' }, { title: '리포트 해석' }, { title: '기간 비교 분석' }] },
    ],
    comingSoonManuals: [
      { title: 'store agent 사용자 매뉴얼', desc: '본사 권고를 점주 언어로 번역하고 운영 우선순위를 제안하는 store agent 매뉴얼입니다.' },
      { title: 'store care 사용자 매뉴얼', desc: '이상·청결·냉장·진열 모듈의 알림 설정과 점주 모바일 운영을 다루는 store care 매뉴얼입니다.' },
    ],
  },
  en: {
    eyebrow: 'Docs',
    heroTitle: 'Product Docs',
    heroSub: 'Technical documentation for installing, integrating, and operating DeepingSource products. Pick a topic below to get started.',
    sidebarLabel: 'Product Docs',
    noticeBefore: 'Detailed docs are rolling out in stages. If you need something now, ',
    noticeLink: 'get in touch',
    noticeAfter: '.',
    manualSectionTitle: 'Manuals by Product',
    featuredTitle: 'store insight User Manual',
    featuredDesc: 'From login and date ranges to visitor analysis, heatmaps, flow, funnels, and purchase conversion — a guide to reading the dashboard report.',
    comingSoon: 'Coming soon',
    docComingSoon: 'Doc coming soon',
    navSections: [
      { id: 'getting-started', title: 'Getting Started', items: [
        { title: 'Product Overview', slug: 'product-overview' },
        { title: 'Deployment Steps', slug: 'deployment-steps' },
        { title: 'Environment Requirements', slug: 'environment-requirements' },
        { title: 'Your First Report', slug: 'your-first-report' },
      ] },
      { id: 'integration', title: 'Integration Guide', items: [{ title: 'CCTV Integration', slug: 'cctv-integration' }, { title: 'POS Integration', slug: 'pos-integration' }, { title: 'Dashboard Access', slug: 'dashboard-access' }, { title: 'API Overview', slug: 'api-overview' }] },
      { id: 'privacy', title: 'Privacy & Security', items: [{ title: 'How Anonymization Works', slug: 'how-anonymization-works' }, { title: 'Data Retention Policy', slug: 'data-retention-policy' }, { title: 'Access Control' }, { title: 'Compliance' }] },
      { id: 'analytics', title: 'Using Analytics', items: [{ title: 'Reading Heatmaps' }, { title: 'Dwell & Conversion Metrics' }, { title: 'Interpreting Reports' }, { title: 'Period-over-Period Analysis' }] },
    ],
    comingSoonManuals: [
      { title: 'store agent User Manual', desc: 'The store agent manual that translates HQ guidance into owner-friendly language and proposes operational priorities.' },
      { title: 'store care User Manual', desc: 'The store care manual covering alert settings for the anomaly, cleanliness, refrigeration, and display modules, and mobile operations for owners.' },
    ],
  },
  jp: {
    eyebrow: 'Docs',
    heroTitle: '製品ドキュメント',
    heroSub: 'DeepingSource 製品の導入、連携、運用に必要な技術文書をご提供します。下から必要なトピックを選んで始めてください。',
    sidebarLabel: '製品ドキュメント',
    noticeBefore: '詳細なドキュメントは順次公開予定です。今すぐ必要な資料がございましたら、',
    noticeLink: 'お問い合わせ',
    noticeAfter: 'ください。',
    manualSectionTitle: '製品別マニュアル',
    featuredTitle: 'store insight ユーザーマニュアル',
    featuredDesc: 'ログイン・期間設定から、来店者分析、ヒートマップ、動線、ファネル、購買転換率まで — ダッシュボードレポートの読み方をご案内します。',
    comingSoon: '準備中',
    docComingSoon: 'ドキュメント準備中',
    navSections: [
      { id: 'getting-started', title: 'はじめに', items: [
        { title: '製品概要', slug: 'product-overview' },
        { title: '導入手順', slug: 'deployment-steps' },
        { title: '動作環境', slug: 'environment-requirements' },
        { title: '初めてのレポート', slug: 'your-first-report' },
      ] },
      { id: 'integration', title: '連携ガイド', items: [{ title: 'CCTV 連携', slug: 'cctv-integration' }, { title: 'POS 連携', slug: 'pos-integration' }, { title: 'ダッシュボードへのアクセス', slug: 'dashboard-access' }, { title: 'API 概要', slug: 'api-overview' }] },
      { id: 'privacy', title: 'プライバシー & セキュリティ', items: [{ title: '匿名化の仕組み', slug: 'how-anonymization-works' }, { title: 'データ保管ポリシー', slug: 'data-retention-policy' }, { title: 'アクセス権限の管理' }, { title: 'コンプライアンス' }] },
      { id: 'analytics', title: '分析活用', items: [{ title: 'ヒートマップの読み方' }, { title: '滞在・転換指標' }, { title: 'レポートの解釈' }, { title: '期間比較分析' }] },
    ],
    comingSoonManuals: [
      { title: 'store agent ユーザーマニュアル', desc: '本部の推奨を店主の言葉に翻訳し、運営の優先順位を提案する store agent のマニュアルです。' },
      { title: 'store care ユーザーマニュアル', desc: '異常・清潔・冷蔵・陳列モジュールの通知設定と、店主向けモバイル運用を扱う store care のマニュアルです。' },
    ],
  },
};

const navIcons = [Rocket, Plug, Shield, BarChart3];
const comingSoonIcons = [Bot, ShieldCheck];

export default function DocsView({ locale }: { locale: Locale }) {
  const t = C[locale];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <Breadcrumb items={[{ name: crumb('resources', locale), path: '/resources' }, { name: crumb('docs', locale), path: '/resources/docs' }]} locale={locale} tone="light" className="mb-6" />
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-gray-900">{t.sidebarLabel}</span>
              </div>
              <nav className="space-y-6">
                {t.navSections.map((section) => (
                  <div key={section.id}>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
                      {section.title}
                    </p>
                    <ul className="space-y-1 border-l border-gray-100 pl-3">
                      {section.items.map((item) => (
                        <li key={item.title}>
                          {item.slug ? (
                            <Link
                              href={localeHref(locale, `/resources/docs/${item.slug}`)}
                              className="block text-sm text-gray-700 font-medium hover:text-primary py-1 transition-colors"
                            >
                              {item.title}
                            </Link>
                          ) : (
                            <a
                              href={`#${section.id}`}
                              className="block text-sm text-gray-500 hover:text-primary py-1 transition-colors"
                            >
                              {item.title}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.eyebrow}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-6 break-keep">
              {t.heroSub}
            </p>

            <div className="flex items-start gap-2 px-4 py-3 bg-amber-50 border border-amber-100 rounded-lg mb-12">
              <FileText className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                {t.noticeBefore}
                <Link href={localeHref(locale, '/contact')} className="underline underline-offset-2 hover:text-amber-900 transition-colors">
                  {t.noticeLink}
                </Link>
                {t.noticeAfter}
              </p>
            </div>

            {/* 제품별 매뉴얼 */}
            <div className="mb-12">
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">{t.manualSectionTitle}</p>
              <div className="space-y-3">
                <Link
                  href={localeHref(locale, '/resources/docs/store-insight')}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      {t.featuredTitle}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed break-keep">
                      {t.featuredDesc}
                    </p>
                  </div>
                  <span className="text-primary text-sm shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>

                {t.comingSoonManuals.map((m, i) => {
                  const Icon = comingSoonIcons[i];
                  return (
                    <div
                      key={m.title}
                      className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50/60"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-gray-500">{m.title}</h3>
                          <span className="rounded bg-gray-200 px-1.5 py-0.5 text-3xs font-bold text-gray-500">{t.comingSoon}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed break-keep">{m.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-12">
              {t.navSections.map((section, i) => {
                const Icon = navIcons[i];
                return (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {section.items.map((item) => (
                        item.slug ? (
                          <Link
                            key={item.title}
                            href={localeHref(locale, `/resources/docs/${item.slug}`)}
                            className="group card p-5 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors flex items-center justify-between"
                          >
                            <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                            <span className="text-primary text-sm shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                          </Link>
                        ) : (
                          <div
                            key={item.title}
                            className="card p-5"
                          >
                            <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">{t.docComingSoon}</p>
                          </div>
                        )
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
