import Link from 'next/link';
import { Newspaper, Building2, BookOpen, Library, HelpCircle, ArrowRight, BarChart3 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { type Locale, localeHref } from '@/lib/i18n';

/**
 * ResourcesView — shared resources hub composition.
 * Rendered by `/resources` (en), `/ko/resources`, `/jp/resources` with the locale prop
 * (PLAN_v1.1 D6 path-prefix i18n).
 */

const C: Record<Locale, {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  featuredLabel: string;
  featuredTitle: string;
  featuredDesc: string;
  featuredCta: string;
  cardCta: string;
  resources: { href: string; title: string; description: string; label: string }[];
}> = {
  ko: {
    eyebrow: 'Resources',
    heroTitle: '필요한 자료를 한곳에서',
    heroSub: 'DeepingSource의 프라이버시 AI 솔루션을 더 깊이 이해하는 데 필요한 블로그, 케이스 스터디, 문서, 용어 사전, FAQ를 제공합니다.',
    featuredLabel: 'Featured',
    featuredTitle: 'Store Insight 사용자 매뉴얼',
    featuredDesc: '로그인·기간 설정부터 방문자 분석, 히트맵, 동선, 퍼널, 구매 전환율까지 — 대시보드 리포트를 처음부터 읽는 법을 단계별로 안내합니다.',
    featuredCta: '매뉴얼 보기',
    cardCta: '바로가기',
    resources: [
      { href: '/resources/blog', title: '블로그', description: '프라이버시 AI, 영상 익명화, 다점포 운영 표준화에 대한 인사이트와 실무 가이드를 정기적으로 발행합니다.', label: '인사이트 · 가이드' },
      { href: '/resources/case-studies', title: '케이스 스터디', description: '편의점 53개 매장 실측부터 본사 100점포 전파, 드럭스토어·카페·대형 공간까지 — Golden Case 5단계로 읽는 도입 사례.', label: '도입 사례' },
      { href: '/resources/docs', title: '제품 문서', description: 'Store Insight 사용자 매뉴얼을 비롯해 설치·연동·보안·분석 활용에 필요한 기술 문서를 제공합니다.', label: '기술 문서' },
      { href: '/resources/glossary', title: '용어 사전', description: '히트맵, 익명화 CCTV, 체류 시간, 구매 전환율 등 핵심 용어를 현장 언어로 쉽게 설명합니다.', label: '용어 정리' },
      { href: '/resources/faq', title: 'FAQ', description: '도입 절차, 요금, 데이터 보안과 익명화 동작 원리 등 자주 묻는 질문에 대한 답변을 모았습니다.', label: '자주 묻는 질문' },
    ],
  },
  en: {
    eyebrow: 'Resources',
    heroTitle: 'Everything you need, in one place',
    heroSub: 'Blog posts, case studies, product docs, a glossary, and FAQs to help you understand DeepingSource privacy AI more deeply.',
    featuredLabel: 'Featured',
    featuredTitle: 'Store Insight User Manual',
    featuredDesc: 'From login and date ranges to visitor analysis, heatmaps, flow, funnels, and purchase conversion — a step-by-step guide to reading the dashboard report from the very start.',
    featuredCta: 'View the manual',
    cardCta: 'Go',
    resources: [
      { href: '/resources/blog', title: 'Blog', description: 'Insights and hands-on guides on privacy AI, video anonymization, and standardizing multi-store operations, published regularly.', label: 'Insights · Guides' },
      { href: '/resources/case-studies', title: 'Case Studies', description: 'From a 53-store convenience-store field study to a 100-store HQ rollout, drugstores, cafés, and large spaces — deployments read through the 5-stage Golden Case.', label: 'Deployments' },
      { href: '/resources/docs', title: 'Product Docs', description: 'Technical documentation for installation, integration, security, and analytics, including the Store Insight user manual.', label: 'Technical Docs' },
      { href: '/resources/glossary', title: 'Glossary', description: 'Core terms like heatmaps, anonymized CCTV, dwell time, and purchase conversion, explained plainly in the language of the field.', label: 'Terms' },
      { href: '/resources/faq', title: 'FAQ', description: 'Answers to common questions on deployment, pricing, data security, and how anonymization works.', label: 'Common Questions' },
    ],
  },
  jp: {
    eyebrow: 'Resources',
    heroTitle: '必要な資料を、ひとつの場所に',
    heroSub: 'DeepingSource のプライバシー AI ソリューションをより深く理解するためのブログ、ケーススタディ、ドキュメント、用語集、FAQ をご用意しています。',
    featuredLabel: 'Featured',
    featuredTitle: 'Store Insight ユーザーマニュアル',
    featuredDesc: 'ログイン・期間設定から、来店者分析、ヒートマップ、動線、ファネル、購買転換率まで — ダッシュボードレポートを最初から読み解く方法を、ステップごとにご案内します。',
    featuredCta: 'マニュアルを見る',
    cardCta: '移動する',
    resources: [
      { href: '/resources/blog', title: 'ブログ', description: 'プライバシー AI、映像の匿名化、多店舗運営の標準化に関するインサイトと実務ガイドを、定期的に発信しています。', label: 'インサイト · ガイド' },
      { href: '/resources/case-studies', title: 'ケーススタディ', description: 'コンビニ 53 店舗の実測から本部 100 店舗への展開、ドラッグストア・カフェ・大型空間まで — Golden Case の 5 段階で読み解く導入事例。', label: '導入事例' },
      { href: '/resources/docs', title: '製品ドキュメント', description: 'Store Insight ユーザーマニュアルをはじめ、導入・連携・セキュリティ・分析活用に必要な技術文書をご提供します。', label: '技術ドキュメント' },
      { href: '/resources/glossary', title: '用語集', description: 'ヒートマップ、匿名化 CCTV、滞在時間、購買転換率など、主要な用語を現場の言葉でわかりやすくご説明します。', label: '用語整理' },
      { href: '/resources/faq', title: 'FAQ', description: '導入手順、料金、データセキュリティ、匿名化の仕組みなど、よくあるご質問への回答をまとめました。', label: 'よくあるご質問' },
    ],
  },
};

const icons = [Newspaper, Building2, BookOpen, Library, HelpCircle];

export default function ResourcesView({ locale }: { locale: Locale }) {
  const t = C[locale];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('resources', locale), path: '/resources' }]} locale={locale} tone="dark" className="mb-6" />
          <p className="text-sm font-semibold text-primary mb-4 tracking-wider uppercase">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            {t.heroTitle}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* Featured — Store Insight 사용자 매뉴얼 */}
      <AnimatedSection className="pt-16 lg:pt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.featuredLabel}</p>
          <Link
            href={localeHref(locale, '/resources/docs/store-insight')}
            className="group flex flex-col sm:flex-row items-start gap-5 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 hover:bg-primary/10 transition-colors"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BarChart3 className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors break-keep">
                {t.featuredTitle}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed break-keep">
                {t.featuredDesc}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {t.featuredCta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </AnimatedSection>

      {/* Cards */}
      <AnimatedSection className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.resources.map(({ href, title, description, label }, i) => {
              const Icon = icons[i];
              return (
                <Link
                  key={href}
                  href={localeHref(locale, href)}
                  className="group card flex flex-col gap-4 p-7 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:border-primary/30 transition-[box-shadow,border-color] duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">{label}</p>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed break-keep">{description}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {t.cardCta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
