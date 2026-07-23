import Link from 'next/link';
import type { ComponentType } from 'react';
import { ArrowRight, ArrowUpRight, Cpu } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import OperatingLoopDemo from '@/components/corporate/OperatingLoopDemo';
import SaaiPillarsSection from '@/components/corporate/products/SaaiPillarsSection';
import SaaiSuiteSection from '@/components/corporate/products/SaaiSuiteSection';
import RelatedGlossary from '@/components/corporate/RelatedGlossary';
import DiagnosisLauncher from '@/components/corporate/diagnosis/DiagnosisLauncher';
import { localeHref, type Locale } from '@/lib/i18n';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, itemList, softwareApplication } from '@/lib/structured-data';
import { productNaming } from '@/lib/brand-canon';
import siteContent from '@/data/generated/site-content.json';

type CardCopy = { desc: string };
type ProductsCopy = {
  eyebrow: string; heroTitle: string; heroSub: string;
  loopEyebrow: string; suiteTitle: string; suiteSub: string; ownersEyebrow: string;
  categoryTitle: string; categoryBody: string; casesCta: string;
  detail: string; visit: string; seedLine: string; seedCta: string; cta: string;
  loop: Record<string, CardCopy>;
  owners: Record<string, CardCopy>;
};
const PRODUCTS = siteContent.products as Record<Locale, ProductsCopy>;

const ADS_CARD: Record<Locale, { stage: string; desc: string }> = {
  ko: { stage: '특화 · 시선', desc: '사이니지·전시물·매대 앞의 통행·주목(시선)·행동을 측정 — 무엇을 어디에 걸지 제안합니다.' },
  en: { stage: 'Focus · gaze', desc: 'Traffic, attention (gaze) and action in front of signage, displays and shelves — suggesting what goes where.' },
  jp: { stage: '特化 · 視線', desc: 'サイネージ・展示物・棚前の通行・注目(視線)・行動を計測 — 何をどこに掲げるか提案します。' },
};

const FUNCTIONS_CARD: Record<Locale, { stage: string; title: string; desc: string; cta: string }> = {
  ko: { stage: '가로축', title: '기능 라이브러리', desc: 'store count·queue·pop·fit — 네 개의 기능은 한 제품에 속하지 않고 세 모드를 모두 가로지릅니다.', cta: '매트릭스 보기' },
  en: { stage: 'Across', title: 'Function library', desc: 'store count, queue, pop, fit — four capabilities that belong to no single product and cross all three modes.', cta: 'See the matrix' },
  jp: { stage: '横軸', title: '機能ライブラリ', desc: 'store count・queue・pop・fit — 4つの機能は一つの製品に属さず、3つのモードを横断します。', cta: 'マトリクスを見る' },
};

type OwnerStruct = { id: string; name: string; href: string };
const OWNER_STRUCT: OwnerStruct[] = [
  { id: 'saai-store', name: 'saai.store', href: 'https://saai.store' },
  { id: 'storecare-ai', name: 'storecare.ai', href: 'https://storecare.ai' },
];

const BELIEF_COPY: Record<Locale, { belief: string; whyTitle: string; whyBody: string }> = {
  ko: {
    belief: '오프라인 공간도, 단 한 사람도 특정하지 않고 완벽하게 이해될 수 있습니다.',
    whyTitle: '공간엔, 왜 공간의 AI가 필요한가',
    whyBody: '범용 AI는 당신의 매대·동선을 못 봅니다. 공간을 이해하려면, 공간에서 시작하는 전용 AI가 필요합니다 — 누구인지는 남기지 않고.',
  },
  en: {
    belief: 'Physical spaces can be perfectly understood without identifying a single person.',
    whyTitle: 'Why spaces need spatial AI',
    whyBody: 'General AI is blind to your store aisles and footfall. Understanding physical space requires spatial-native AI — with zero identity retained.',
  },
  jp: {
    belief: 'オフライン空間も、単一の個人を特定することなく完璧に理解できます。',
    whyTitle: 'なぜ空間には空間のAIが必要なのか',
    whyBody: '汎用AIはあなたの棚や動線を見ることができません。オフライン空間を理解するには、空間から始まる専用AIが必要です。',
  },
};

type IndustryStruct = { name: string; desc: string; href: string };
const INDUSTRIES: Record<Locale, { eyebrow: string; title: string; fieldLine: string; list: IndustryStruct[] }> = {
  ko: {
    eyebrow: 'BEYOND RETAIL · 모든 공간',
    title: '매장을 넘어, 모든 공간에서.',
    fieldLine: '리테일·F&B·무인매장·대형 공간 등 실제 공간 최적화 유스케이스가 준비되어 있습니다.',
    list: [
      { name: '편의점 · 미니마트', desc: '심야 이상 탐지 및 결품 방지', href: '/solutions/convenience-night-theft' },
      { name: '카페 · F&B', desc: '모닝 러시 동선 및 혼잡 최적화', href: '/solutions/food-beverage' },
      { name: '드럭스토어 · 코스메틱', desc: '매대 주시율 및 구역 관심도', href: '/solutions/drug-store' },
      { name: '대형 유통 · 백화점', desc: '층별 앵커 동선 및 체류 분석', href: '/solutions/large-space' },
      { name: '무인 매장 · 24h', desc: '무인 출입 및 이상 상태 자동 알림', href: '/solutions/retail' },
      { name: '전시장 · 물류 센터', desc: '관람객 동선 및 안전 구역 감시', href: '/solutions/large-space' },
    ],
  },
  en: {
    eyebrow: 'BEYOND RETAIL · EVERY SPACE',
    title: 'Beyond retail — into every physical space.',
    fieldLine: 'Field-tested use cases across retail, F&B, unmanned stores, and large exhibition spaces.',
    list: [
      { name: 'Convenience & Mini-marts', desc: 'After-hours anomaly and stock-out alerts', href: '/solutions/convenience-night-theft' },
      { name: 'Cafes & F&B', desc: 'Morning rush bottleneck optimization', href: '/solutions/food-beverage' },
      { name: 'Drugstores & Beauty', desc: 'Shelf gaze rate and zone dwell', href: '/solutions/drug-store' },
      { name: 'Department Stores', desc: 'Floor anchor trajectory analysis', href: '/solutions/large-space' },
      { name: 'Unmanned Stores', desc: '24/7 automated safety & entry alerts', href: '/solutions/retail' },
      { name: 'Exhibitions & Logistics', desc: 'Visitor flow & safety zone tracking', href: '/solutions/large-space' },
    ],
  },
  jp: {
    eyebrow: 'BEYOND RETAIL · すべての空間',
    title: '店舗を越えて、すべての空間へ。',
    fieldLine: 'リテール・F&B・無人店舗・大型空間など実際の最適化ユースケースを用意しています。',
    list: [
      { name: 'コンビニ・ミニマート', desc: '深夜異常検知および欠品防止', href: '/solutions/convenience-night-theft' },
      { name: 'カフェ・F&B', desc: 'モーニングラッシュ動線最適化', href: '/solutions/food-beverage' },
      { name: 'ドラッグストア・コスメ', desc: '棚注視率およびゾーン関心度', href: '/solutions/drug-store' },
      { name: '大型商業・百貨店', desc: 'フロア動線および滞在分析', href: '/solutions/large-space' },
      { name: '無人店舗・24h', desc: '無人出入りおよび異常自動通知', href: '/solutions/retail' },
      { name: '展示場・物流センター', desc: '観覧客動線および安全区域監視', href: '/solutions/large-space' },
    ],
  },
};

const jsonLdProducts: Record<Locale, { name: string; description: string; path: string }[]> = {
  ko: [
    { name: productNaming.insight.saai ?? 'saai insight', description: '어제 매장의 체류·전환·동선을 데이터로 읽는 SAAI 분석 모드.', path: '/products/saai-insight' },
    { name: productNaming.care.saai ?? 'saai care', description: '지금 매장의 결품·온도·도난을 24시간 실시간 감지하는 SAAI 감지 모드.', path: '/products/saai-care' },
    { name: productNaming.agent.saai ?? 'saai agent', description: '오늘의 현장 발주·진열·행동 가이드를 자율 제안하는 SAAI 실행 모드.', path: '/products/saai-agent' },
    { name: 'store count', description: 'CCTV 1대로 유동인구 대비 입문 유입률을 파악하는 입문 기능 모듈.', path: '/products/store-count' },
  ],
  en: [
    { name: productNaming.insight.saai ?? 'saai insight', description: 'Analyze yesterday floor flow, dwell, and pre-purchase conversion.', path: '/products/saai-insight' },
    { name: productNaming.care.saai ?? 'saai care', description: 'Detect live stock-outs, fridge alerts, and anomalies 24/7.', path: '/products/saai-care' },
    { name: productNaming.agent.saai ?? 'saai agent', description: 'Act on daily automated action guides for stocking and floor staff.', path: '/products/saai-agent' },
    { name: 'store count', description: 'Single camera footfall capture rate module.', path: '/products/store-count' },
  ],
  jp: [
    { name: productNaming.insight.saai ?? 'saai insight', description: '昨日の滞在・転換・動線をデータで分析する SAAI insight。', path: '/products/saai-insight' },
    { name: productNaming.care.saai ?? 'saai care', description: '今の欠品・温度・防損を24時間リアルタイム検知する SAAI care。', path: '/products/saai-care' },
    { name: productNaming.agent.saai ?? 'saai agent', description: '今日の現場発注・陳列・行動ガイドを自律提案する SAAI agent。', path: '/products/saai-agent' },
    { name: 'store count', description: 'カメラ1台で通行と入店率を比較する store count 모듈。', path: '/products/store-count' },
  ],
};

export default function ProductsView({ locale }: { locale: Locale }) {
  const c = PRODUCTS[locale];
  const belief = BELIEF_COPY[locale];
  const useCase = INDUSTRIES[locale];
  const ads = ADS_CARD[locale];
  const fnCard = FUNCTIONS_CARD[locale];

  const owners = OWNER_STRUCT.map((s) => ({
    ...s,
    desc: c.owners[s.id]?.desc ?? '',
  }));

  return (
    <>
      <JsonLd
        data={itemList(
          jsonLdProducts[locale].map((p) =>
            softwareApplication({
              name: p.name,
              description: p.description,
              path: p.path,
              locale,
            }),
          ),
        )}
      />

      {/* ── Beat 1 — Hero (WHY: Belief + Vision) ── */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 bg-white border-b border-gray-100 overflow-hidden">
        <Container>
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }]} locale={locale} className="mb-6" />
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-widest text-primary uppercase mb-4 animate-fade-in-up">
              {belief.belief}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight font-display break-keep mb-6">
              <WordRise text={c.heroTitle} />
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed break-keep max-w-2xl mb-6">
              {c.heroSub}
            </p>
            <DiagnosisLauncher variant="inline" locale={locale} />
          </div>
        </Container>
      </section>

      {/* ── Beat 2 — Why Band (WHY: Why spaces need spatial AI) ── */}
      <AnimatedSection className="py-16 bg-slate-900 text-white noise-overlay">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-light mb-3">
            <SaaiSymbol className="w-3.5 h-3.5 text-primary-light" />
            {belief.whyTitle}
          </span>
          <p className="text-xl sm:text-2xl font-bold leading-relaxed text-slate-100 break-keep">
            "{belief.whyBody}"
          </p>
        </div>
      </AnimatedSection>

      {/* ── Beat 3 — SAAI Definition & Pillars (WHAT: S-A-A-I Foundational Layer promoted to front) ── */}
      <SaaiPillarsSection locale={locale} />

      {/* ── Beat 4 — Operating Loop Interactive Demo (HOW: Proof after foundation) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Eyebrow className="mb-3 justify-center">{c.loopEyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep mb-4">
              {locale === 'ko' ? '네 개의 근거가, 하나의 루프로 돌아갑니다' : locale === 'jp' ? '4つの根拠が、ひとつのループで回ります' : 'Four foundational pillars in one operational loop'}
            </h2>
            <p className="text-lg text-gray-600 break-keep">
              {locale === 'ko' ? 'OBSERVE → ANALYZE → DETECT → ACT → LEARN 단계별 인터랙티브 실증' : locale === 'jp' ? 'OBSERVE → ANALYZE → DETECT → ACT → LEARN ステップ別実証' : 'Interactive proof across Observe, Analyze, Detect, Act, and Learn.'}
            </p>
          </div>
          <OperatingLoopDemo locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── Beat 5 — saai suite (HOW: Single consolidated 3-mode showcase) ── */}
      <SaaiSuiteSection locale={locale} />

      {/* ── Beat 6 — Function Modules & Specialized Cards (HOW: Pick & Choose) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <Eyebrow className="mb-2">MODULES & FUNCTIONS</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">
              {locale === 'ko' ? '필요한 것부터, 전부까지 — 독립 모듈' : locale === 'jp' ? '必要なものから、すべてまで — 独立モジュール' : 'Start from what you need — modular capabilities'}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed break-keep">
              {locale === 'ko' ? 'saai suite 코어를 사지 않아도 필요한 모듈부터 개별 도입할 수 있습니다.' : locale === 'jp' ? 'saai suite コアを購入しなくても、必要なモジュールから個別導入できます。' : 'Adopt individual modules independently without requiring the full suite core.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* store count (entry module) */}
            <div className="p-7 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-2xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4 inline-block">
                  입문 모듈 · OBSERVE
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">store count</h3>
                <p className="text-sm text-gray-600 leading-relaxed break-keep mb-6">
                  CCTV 1대로 매장 밖 유동인구와 입문 고객을 비교해 유입률을 파악합니다. 상권 문제인지 매장 문제인지 정밀하게 구분합니다.
                </p>
              </div>
              <Link
                href={localeHref(locale, '/products/store-count')}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                <span>store count 자세히 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* saai ads insight */}
            <div className="p-7 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-2xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-4 inline-block">
                  {ads.stage}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">saai ads insight</h3>
                <p className="text-sm text-gray-600 leading-relaxed break-keep mb-6">
                  {ads.desc}
                </p>
              </div>
              <Link
                href={localeHref(locale, '/products/saai-ads-insight')}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                <span>saai ads insight 자세히 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Function library matrix */}
            <div className="p-7 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-2xs font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-3 py-1 rounded-full mb-4 inline-block">
                  {fnCard.stage}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{fnCard.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed break-keep mb-6">
                  {fnCard.desc}
                </p>
              </div>
              <Link
                href={localeHref(locale, '/products/functions')}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                <span>{fnCard.cta} →</span>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Beat 7 — Industries & Expansion (WHAT IF: Beyond Retail) ── */}
      <Section variant="default">
        <Container>
          <div className="mb-10 max-w-2xl">
            <Eyebrow className="mb-2">{useCase.eyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep">{useCase.title}</h2>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCase.list.map((ind, i) => (
              <li key={i}>
                <Link
                  href={localeHref(locale, ind.href)}
                  className="group flex items-center justify-between p-6 rounded-2xl border border-gray-200 bg-white hover:border-primary-light hover:shadow-card transition-all no-underline"
                >
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">{ind.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed break-keep">{ind.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Beat 8 — Tech Foundation (SEED) & Owner Sites (WHAT IF: Trust & Channels) ── */}
      <Section variant="alt" pad="compact">
        <Container>
          <div className="grid lg:grid-cols-12 gap-8 items-center mb-8">
            <div className="lg:col-span-8 p-6 rounded-2xl border border-gray-200 bg-white flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <p className="flex-1 text-sm text-gray-600 leading-relaxed break-keep">{c.seedLine}</p>
              <Link
                href={localeHref(locale, '/technology')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark shrink-0"
              >
                <span>{c.seedCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl border border-gray-200 bg-white">
              <p className="text-2xs font-bold uppercase tracking-wider text-gray-400 mb-2">{c.ownersEyebrow}</p>
              <div className="flex items-center gap-4">
                {owners.map((o) => (
                  <a
                    key={o.id}
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-gray-900 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <span>{o.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-primary" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <RelatedGlossary
        slugs={['store-heatmap', 'dwell-time', 'purchase-conversion-rate', 'store-operations-automation', 'store-automation-agent', 'retail-ai']}
        locale={locale}
      />

      {/* ── Beat 9 — Closing & Primary CTA (WHAT IF: Invitation) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-900 text-white noise-overlay">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-light mb-4">
            <SaaiSymbol className="w-3.5 h-3.5 text-primary-light" />
            REINVENT OFFLINE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-display break-keep">
            모든 공간을, 완벽하게.
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl mx-auto break-keep">
            어떤 솔루션과 모듈이 당신의 매장과 본사에 가장 적합할지, 딥핑소스 기술팀이 함께 상담해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg inline-flex items-center gap-2">
              {c.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={localeHref(locale, '/resources/case-studies')} className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl transition-colors">
              {c.casesCta}
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
