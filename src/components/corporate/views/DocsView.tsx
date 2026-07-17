import Link from 'next/link';
import { BarChart3, Bot, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import DocsSidebar from '@/components/docs/DocsSidebar';
import { DocIcon } from '@/components/docs/docIcons';
import { crumb } from '@/lib/breadcrumb-labels';
import { type Locale, localeHref } from '@/lib/i18n';
import { getDocsForLocale } from '@/lib/docs';
import { docSectionOrder, docSectionLabelI18n, logicalDocSlug } from '@/data/docs/types';

/**
 * DocsView — product-docs hub. Nav (sidebar + section cards) is generated from the
 * Velite `docs` collection (single source of truth); only the hero + featured/
 * coming-soon manual copy is a locale record. (DOCS_WIKI_PLAN IA-3.)
 */
const C: Record<Locale, {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  sidebarLabel: string;
  manualSectionTitle: string;
  featuredTitle: string;
  featuredDesc: string;
  comingSoon: string;
  comingSoonManuals: { title: string; desc: string }[];
}> = {
  ko: {
    eyebrow: 'Docs',
    heroTitle: '제품 문서',
    heroSub: 'DeepingSource 제품의 설치, 연동, 운영에 필요한 기술 문서를 제공합니다. 아래에서 필요한 주제를 골라 시작하세요.',
    sidebarLabel: '제품 문서',
    manualSectionTitle: '제품별 매뉴얼',
    featuredTitle: 'store insight 사용자 매뉴얼',
    featuredDesc: '로그인·기간 설정부터 방문자 분석, 히트맵, 동선, 퍼널, 구매 전환율까지 — 대시보드 리포트 읽는 법을 안내합니다.',
    comingSoon: '준비 중',
    comingSoonManuals: [],
  },
  en: {
    eyebrow: 'Docs',
    heroTitle: 'Product Docs',
    heroSub: 'Technical documentation for installing, integrating, and operating DeepingSource products. Pick a topic below to get started.',
    sidebarLabel: 'Product Docs',
    manualSectionTitle: 'Manuals by Product',
    featuredTitle: 'store insight User Manual',
    featuredDesc: 'From login and date ranges to visitor analysis, heatmaps, flow, funnels, and purchase conversion — a guide to reading the dashboard report.',
    comingSoon: 'Coming soon',
    comingSoonManuals: [],
  },
  jp: {
    eyebrow: 'Docs',
    heroTitle: '製品ドキュメント',
    heroSub: 'DeepingSource 製品の導入、連携、運用に必要な技術文書をご提供します。下から必要なトピックを選んで始めてください。',
    sidebarLabel: '製品ドキュメント',
    manualSectionTitle: '製品別マニュアル',
    featuredTitle: 'store insight ユーザーマニュアル',
    featuredDesc: 'ログイン・期間設定から、来店者分析、ヒートマップ、動線、ファネル、購買転換率まで — ダッシュボードレポートの読み方をご案内します。',
    comingSoon: '準備中',
    comingSoonManuals: [],
  },
};

const comingSoonIcons = [Bot, ShieldCheck];

export default function DocsView({ locale }: { locale: Locale }) {
  const t = C[locale];
  const docs = getDocsForLocale(locale);
  // Section cards: general docs only — product-guide chapters (parent set) live under
  // their product landing (below) so store insight / store care don't intermix here.
  const sections = docSectionOrder
    .filter((s) => s !== 'manual')
    .map((section) => ({
      section,
      label: docSectionLabelI18n[locale][section],
      items: docs.filter((d) => d.section === section && !d.parent),
    }))
    .filter((g) => g.items.length > 0);
  // Product-guide landings (store insight / store care), rendered as featured cards.
  const productLandings = ['store-insight', 'store-care', 'store-agent']
    .map((s) => docs.find((d) => logicalDocSlug(d.slug) === s))
    .filter((d): d is NonNullable<typeof d> => !!d);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <Breadcrumb items={[{ name: crumb('resources', locale), path: '/resources' }, { name: crumb('docs', locale), path: '/resources/docs' }]} locale={locale} tone="light" className="mb-6" />
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar — shared, generated from the collection */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-bold text-gray-900">{t.sidebarLabel}</span>
              </div>
              <DocsSidebar locale={locale} />
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.eyebrow}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">{t.heroTitle}</h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">{t.heroSub}</p>

            {/* Manuals by product */}
            <div className="mb-12">
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">{t.manualSectionTitle}</p>
              <div className="space-y-3">
                {productLandings.map((d) => (
                  <Link
                    key={d.slug}
                    href={localeHref(locale, `/resources/docs/${logicalDocSlug(d.slug)}`)}
                    className="group flex items-start gap-4 p-5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors no-underline"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <DocIcon name={d.icon} className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">{d.title}</h3>
                      {d.excerpt && <p className="text-xs text-gray-600 leading-relaxed break-keep">{d.excerpt}</p>}
                    </div>
                    <span className="text-primary text-sm shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                ))}

                {t.comingSoonManuals.map((m, i) => {
                  const Icon = comingSoonIcons[i];
                  return (
                    <div key={m.title} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50/60">
                      <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-gray-400" aria-hidden="true" />
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

            {/* Section cards — from the collection */}
            <div className="space-y-12">
              {sections.map((group) => (
                <section key={group.section} className="scroll-mt-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{group.label}</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {group.items.map((d) => (
                      <Link
                        key={d.slug}
                        href={localeHref(locale, `/resources/docs/${logicalDocSlug(d.slug)}`)}
                        className="group card p-5 hover:border-primary-light transition-colors flex items-start gap-3 no-underline"
                      >
                        <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <DocIcon name={d.icon} className="w-4 h-4 text-primary" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">{d.title}</h3>
                          {d.excerpt && <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-0.5 break-keep">{d.excerpt}</p>}
                        </div>
                        <span className="text-primary text-sm shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
