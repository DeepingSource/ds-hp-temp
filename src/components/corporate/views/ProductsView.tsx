import Link from 'next/link';
import type { ComponentType } from 'react';
import { ArrowRight, ArrowUpRight, Cpu, Grid3x3, Radar, ClipboardCheck, Eye } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import AnimatedSection from '@/components/ui/AnimatedSection';
import OperatingLoopDemo from '@/components/corporate/OperatingLoopDemo';
import { localeHref, type Locale } from '@/lib/i18n';
import RelatedGlossary from '@/components/corporate/RelatedGlossary';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, itemList, softwareApplication } from '@/lib/structured-data';
import { productNaming, productSecondary, saaiPromiseLayer, categoryKeyword, operatingLoop, type ModeKey } from '@/lib/brand-canon';
import siteContent from '@/data/generated/site-content.json';

/**
 * ProductsView — SAAI brand hub (SITE_IMPROVEMENT P2-1 · 5-part arc):
 * ① SAAI definition (saaiPromiseLayer 4-up → tech anchors) → ② the operating
 * loop (count→insight→care→agent, hero graphic + Tier-1 cards) → ③ category
 * keyword (익명화 공간 AI) → ④ domain implementations (saai.store / storecare.ai ↗)
 * → ⑤ cases · CTA. /products/saai stays the B2C product page (no absorption).
 * Copy is CMS-editable (content/site/products.yaml → generated JSON); structure
 * (stage, icon, href, external) stays in code and is merged with copy by id.
 */

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

/**
 * The three modes, in temporal loop order (insight → care → agent · 어제 → 지금 → 다음).
 *
 * RELABELED 2026-07-21 (제품체계 재설계 v1 §3·§6.3): the loop now reads in time order
 * to match the operating-loop story — insight(분석·어제) → care(감지·지금) → agent(실행·다음).
 * count is NOT here: it's a FUNCTION (OBSERVE·입문), living in the function library
 * (/products/functions). Stage labels come from brand-canon `operatingLoop` (care=Detect,
 * agent=Act). `id` still matches the CMS copy keys in content/site/products.yaml.
 */
type LoopStruct = { id: string; key: ModeKey; icon: ComponentType<{ className?: string }>; href: string; emphasis?: boolean };
const LOOP_STRUCT: LoopStruct[] = [
  { id: 'store-insight', key: 'insight', icon: Grid3x3, href: '/products/saai-insight' },
  { id: 'store-care', key: 'care', icon: Radar, href: '/products/saai-care' },
  { id: 'store-agent', key: 'agent', icon: ClipboardCheck, href: '/products/saai-agent', emphasis: true },
];

/**
 * Specialized product — saai ads insight (gaze 승격, 기능페이지 §6). Not a core loop
 * mode; a saai product MODULE for signage·displays·shelf attention, adoptable on its own
 * (제품_모듈체계_네이밍_v2). Sits after the three modes with a "특화 · 시선" stage label so it
 * reads as a specialized module, not a 4th mode.
 */
const ADS_CARD: Record<Locale, { stage: string; desc: string }> = {
  ko: { stage: '특화 · 시선', desc: '사이니지·전시물·매대 앞의 통행·주목(시선)·행동을 재고 — 무엇을 어디에 걸지 제안합니다.' },
  en: { stage: 'Focus · gaze', desc: 'Traffic, attention (gaze) and action in front of signage, displays and shelves — suggesting what goes where.' },
  jp: { stage: '特化 · 視線', desc: 'サイネージ・展示物・棚前の通行・注目(視線)・行動を計測 — 何をどこに掲げるか提案します。' },
};

/** Function-library card that closes the row — count et al. live here, not on the loop. */
const FUNCTIONS_CARD: Record<Locale, { stage: string; title: string; desc: string; cta: string }> = {
  ko: { stage: '가로축', title: '기능 라이브러리', desc: 'count·queue·pop·fit — 네 개의 기능은 한 제품에 속하지 않고 세 모드를 모두 가로지릅니다.', cta: '매트릭스 보기' },
  en: { stage: 'Across', title: 'Function library', desc: 'count, queue, pop, fit — four capabilities that belong to no single product and cross all three modes.', cta: 'See the matrix' },
  jp: { stage: '横軸', title: '機能ライブラリ', desc: 'count・queue・pop・fit — 4つの機能は一つの製品に属さず、3つのモードを横断します。', cta: 'マトリクスを見る' },
};

type OwnerStruct = { id: string; name: string; href: string };
const OWNER_STRUCT: OwnerStruct[] = [
  { id: 'saai-store', name: 'saai.store', href: 'https://saai.store' },
  { id: 'storecare-ai', name: 'storecare.ai', href: 'https://storecare.ai' },
];

/** ② Who / What — 누구고 무엇을 주는가 (products 프런트 카피 v1 §②). */
const WHO_WHAT: Record<Locale, { eyebrow: string; title: string; body: string }> = {
  ko: {
    eyebrow: 'Who · What',
    title: '보는 데서 멈추지 않습니다 — 운영까지.',
    body: '딥핑소스는 익명화 AI로 오프라인 공간을 안전하게 읽는 회사입니다. saai suite는 어제를 분석하고(insight), 지금을 감지하고(care), 다음을 실행하는(agent) 하나의 운영 루프입니다. 영상은 남기지 않고, 결정은 언제나 사람이 합니다.',
  },
  en: {
    eyebrow: 'Who · What',
    title: 'It doesn’t stop at seeing — it operates.',
    body: 'DeepingSource reads offline spaces safely with anonymized AI. saai suite is one operating loop that analyzes yesterday (insight), detects the now (care), and acts on next (agent). We keep no footage, and the decision is always a person’s.',
  },
  jp: {
    eyebrow: 'Who · What',
    title: '見るだけで終わりません — 運営まで。',
    body: 'ディーピングソースは、匿名化AIでオフライン空間を安全に読み取る会社です。saai suite は、昨日を分析し（insight）、今を検知し（care）、次を実行する（agent）ひとつのオペレーションループです。映像は残さず、決定はいつも人が下します。',
  },
};

/** ③ Three promises — 페이지 척추 (products 프런트 카피 v1 §③). 밝힘·덜어냄·가능케 함 → insight·care·agent. */
type SpinePromise = { head: string; body: string; product: string; href: string };
const SPINE: Record<Locale, { eyebrow: string; title: string; promises: [SpinePromise, SpinePromise, SpinePromise] }> = {
  ko: {
    eyebrow: 'Three promises',
    title: '감으로 알던 매장을, 데이터로.',
    promises: [
      { head: '감으로 알던 매장을, 데이터로 읽습니다.', body: 'POS가 못 보던 매장 안까지 — “왜 안 팔렸는지”에 답합니다.', product: 'saai insight', href: '/products/saai-insight' },
      { head: '종일 지켜보던 매장을, 필요한 순간만 봅니다.', body: '쏟아지는 알림 대신, 손쓸 순간만 손안으로. 지켜보는 일은 기계가, 결정은 사람이.', product: 'saai care', href: '/products/saai-care' },
      { head: '사람이 못 하던 운영을, 매일 대신합니다.', body: '전국 매장을 같은 기준으로 — 다음에 할 일을 발주서까지. 권고는 AI가, 결정은 사람이.', product: 'saai agent', href: '/products/saai-agent' },
    ],
  },
  en: {
    eyebrow: 'Three promises',
    title: 'From gut feel to data.',
    promises: [
      { head: 'The store you knew by gut feel — now read as data.', body: 'Past what POS could see, inside the store — it answers “why it didn’t sell.”', product: 'saai insight', href: '/products/saai-insight' },
      { head: 'The store you watched all day — now only when it matters.', body: 'Instead of a flood of alerts, just the moments to act. Machines watch; people decide.', product: 'saai care', href: '/products/saai-care' },
      { head: 'The operations no one could keep up with — now handled daily.', body: 'Every store to one standard — the next task, down to the order sheet. AI advises; people decide.', product: 'saai agent', href: '/products/saai-agent' },
    ],
  },
  jp: {
    eyebrow: 'Three promises',
    title: '勘で見ていた店を、データで。',
    promises: [
      { head: '勘で見ていた店を、データで読みます。', body: 'POSでは見えなかった店内まで —「なぜ売れなかったか」に答えます。', product: 'saai insight', href: '/products/saai-insight' },
      { head: '一日中見張っていた店を、必要な瞬間だけ。', body: 'あふれる通知ではなく、手を打つ瞬間だけ。見張るのは機械、決めるのは人。', product: 'saai care', href: '/products/saai-care' },
      { head: '人には無理だった運営を、毎日代わりに。', body: '全店を同じ基準で — 次にやることを発注書まで。推奨はAI、決定は人。', product: 'saai agent', href: '/products/saai-agent' },
    ],
  },
};

/** ⑥ Use case — 업종·솔루션 연결 (products 프런트 카피 v1 §⑥, 가벼운 수준). */
type IndustryLink = { label: string; desc: string; href: string };
const USE_CASE: Record<Locale, { eyebrow: string; title: string; body: string; industries: IndustryLink[]; fieldLine: string }> = {
  ko: {
    eyebrow: 'Where',
    title: '매장을 넘어, 모든 공간에서',
    body: '익명화는 공간을 가리지 않습니다. 업종을 골라, 그 공간의 운영 루프를 확인하세요.',
    industries: [
      { label: '리테일·편의점', desc: '진열·동선·결제까지', href: '/solutions/retail' },
      { label: '카페·음식점', desc: '대기·좌석 회전·피크 흐름', href: '/solutions/food-beverage' },
      { label: '드럭스토어', desc: '카테고리별 관심·체류', href: '/solutions/drug-store' },
      { label: '대형 마트·물류', desc: '동선·혼잡·안전', href: '/solutions/large-space' },
      { label: '전시·박물관', desc: '관람 동선·인기 구역', href: '/solutions' },
      { label: '무인매장', desc: '무인 감지·즉시 알림', href: '/solutions' },
    ],
    fieldLine: '현장에서 — 학원가 편의점, 동선 하나로 매출이. 시립 전시관, 동선으로 체류가.',
  },
  en: {
    eyebrow: 'Where',
    title: 'Beyond the store — in every space',
    body: 'Anonymization works in any space. Pick an industry and see its operating loop.',
    industries: [
      { label: 'Retail & convenience', desc: 'Shelves, flow, checkout', href: '/solutions/retail' },
      { label: 'Cafés & restaurants', desc: 'Waiting, seat turnover, peak flow', href: '/solutions/food-beverage' },
      { label: 'Drugstores', desc: 'Interest & dwell by category', href: '/solutions/drug-store' },
      { label: 'Large marts & logistics', desc: 'Flow, congestion, safety', href: '/solutions/large-space' },
      { label: 'Exhibits & museums', desc: 'Visitor paths, popular zones', href: '/solutions' },
      { label: 'Unmanned stores', desc: 'Unmanned detection, instant alerts', href: '/solutions' },
    ],
    fieldLine: 'On the floor — a campus-area store moved revenue with one path; a city exhibit grew dwell by route.',
  },
  jp: {
    eyebrow: 'Where',
    title: '店舗を超えて、すべての空間で',
    body: '匿名化は空間を選びません。業種を選び、その空間のオペレーションループをご覧ください。',
    industries: [
      { label: 'リテール・コンビニ', desc: '陳列・動線・会計まで', href: '/solutions/retail' },
      { label: 'カフェ・飲食店', desc: '待ち・席の回転・ピークの流れ', href: '/solutions/food-beverage' },
      { label: 'ドラッグストア', desc: 'カテゴリー別の関心・滞在', href: '/solutions/drug-store' },
      { label: '大型スーパー・物流', desc: '動線・混雑・安全', href: '/solutions/large-space' },
      { label: '展示・博物館', desc: '観覧動線・人気エリア', href: '/solutions' },
      { label: '無人店舗', desc: '無人検知・即時アラート', href: '/solutions' },
    ],
    fieldLine: '現場で — 学生街のコンビニは動線ひとつで売上が、市立展示館は動線で滞在が。',
  },
};

/**
 * Modules — the pick-what-you-need layer (제품_모듈체계_네이밍_v2 §3). Sits right after the
 * suite section so suite ↔ modules reads as "the whole thing ↔ pick and choose": modules are
 * not add-ons bolted onto a core — each is its own entry. Chips are brand tokens (saai products
 * · store functions), kept in code like ADS_CARD/FUNCTIONS_CARD. No unreleased names/dates —
 * only a "more coming" growth signal (§6).
 */
type ModuleChip = { name: string; href: string; badge?: string; entry?: boolean };
const MODULE_ITEMS: { saai: ModuleChip[]; store: ModuleChip[] } = {
  saai: [
    { name: 'insight', href: '/products/saai-insight' },
    { name: 'care', href: '/products/saai-care' },
    { name: 'agent', href: '/products/saai-agent' },
    { name: 'ads insight', href: '/products/saai-ads-insight', badge: 'NEW' },
  ],
  store: [
    { name: 'count', href: '/products/store-count', entry: true },
    { name: 'queue', href: '/products/store-queue' },
    { name: 'pop', href: '/products/store-pop' },
    { name: 'fit', href: '/products/store-fit' },
  ],
};
const MODULES: Record<Locale, {
  eyebrow: string; title: string; sub: string;
  saaiLabel: string; storeLabel: string; entryTag: string; growth: string; note: string;
}> = {
  ko: {
    eyebrow: '모듈 · Modules',
    title: '필요한 것부터, 전부까지 — 그리고 계속 늘어납니다.',
    sub: 'SAAI는 골라 쓰는 모듈입니다. 기능 하나로 시작하거나, 세 모드를 saai suite로 한 번에 — 당신의 공간에 맞게. 새 공간·새 대상이 생기면, 새 모듈이 더해집니다.',
    saaiLabel: 'saai 제품',
    storeLabel: 'store 기능',
    entryTag: '입문',
    growth: '곧 더 늘어납니다.',
    note: '어떤 조합이 맞을지는 상담에서.',
  },
  en: {
    eyebrow: 'Modules',
    title: 'From what you need, to the whole thing — always growing.',
    sub: 'SAAI is modular. Start with a single function, or run all three modes together as saai suite — tuned to your space. A new space or target → a new module.',
    saaiLabel: 'saai products',
    storeLabel: 'store functions',
    entryTag: 'entry',
    growth: 'More coming soon.',
    note: 'We’ll find the right mix with you.',
  },
  jp: {
    eyebrow: 'モジュール · Modules',
    title: '必要なものから、全部まで — そして増え続けます。',
    sub: 'SAAIは選んで使うモジュールです。機能ひとつから始めても、3モードを saai suite でまとめても — あなたの空間に合わせて。新しい空間・対象には、新しいモジュールを。',
    saaiLabel: 'saai 製品',
    storeLabel: 'store 機能',
    entryTag: '入門',
    growth: 'まもなく、さらに。',
    note: '最適な組み合わせはご相談で。',
  },
};

export default function ProductsView({ locale }: { locale: Locale }) {
  const c = PRODUCTS[locale];
  const mod = MODULES[locale];
  const promise = saaiPromiseLayer[locale];
  // Stage label + time phase per mode, read from the loop SOT so the two never drift.
  const loopSteps = operatingLoop[locale];
  const loop = LOOP_STRUCT.map((s, i) => {
    const step = loopSteps.find((x) => x.mode === s.key);
    return {
      ...s,
      stageNo: String(i + 1).padStart(2, '0'),
      stage: step ? `${step.label} · ${step.phase}` : '',
      name: productNaming[s.key].store,
      saaiName: productNaming[s.key].saai,
      secondary: productSecondary(s.key),
      desc: c.loop[s.id]?.desc ?? '',
    };
  });
  const owners = OWNER_STRUCT.map((s) => ({ ...s, desc: c.owners[s.id]?.desc ?? '' }));
  const who = WHO_WHAT[locale];
  const spine = SPINE[locale];
  const useCase = USE_CASE[locale];

  return (
    <>
      <JsonLd
        data={itemList([
          ...loop.map((p) => softwareApplication({ name: p.saaiName ?? p.name, alternateName: p.secondary ?? undefined, description: p.desc, path: p.href, locale })),
          softwareApplication({ name: 'saai ads insight', description: ADS_CARD[locale].desc, path: '/products/saai-ads-insight', locale }),
        ])}
      />

      {/* ── Hero + operating-loop graphic ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-14 lg:pt-36 lg:pb-16 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }]} locale={locale} tone="light" className="mb-6 justify-center" />
          <p className="text-sm font-medium text-primary mb-4 tracking-wide">{c.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-5 font-display">
            <WordRise text={c.heroTitle} />
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto break-keep mb-12 lg:mb-14">
            {c.heroSub}
          </p>
        </div>
      </section>

      {/* ── ★ Operating-loop demo — 단계를 누르면 실제 화면 (데모시각 설계 §2, 주인공) ── */}
      <AnimatedSection className="py-14 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <OperatingLoopDemo locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── ② Who / What — 누구고 무엇을 주는가 ── */}
      <AnimatedSection className="py-16 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Eyebrow className="mb-4 justify-center">{who.eyebrow}</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{who.title}</h2>
          <p className="text-base text-gray-500 leading-relaxed break-keep">{who.body}</p>
        </div>
      </AnimatedSection>

      {/* ── ③ 세 가지 약속 — 페이지 척추 (밝힘·덜어냄·가능케 함 → insight·care·agent) ── */}
      <Section variant="alt">
        <Container>
          <div className="mb-9 max-w-2xl">
            <Eyebrow className="mb-4">{spine.eyebrow}</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep">{spine.title}</h2>
          </div>
          <ul className="grid gap-5 lg:grid-cols-3">
            {spine.promises.map((p) => (
              <li key={p.product} className="stagger-child">
                <Link
                  href={localeHref(locale, p.href)}
                  className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-7 shadow-card hover:border-primary-light transition-colors no-underline"
                >
                  <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 break-keep">{p.head}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep mb-6">{p.body}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary lowercase">
                    {p.product}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── ① SAAI 정의 — 약속 층 4-up (brand-canon saaiPromiseLayer SOT) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-slate-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <Eyebrow className="mb-4">{promise.eyebrow}</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{promise.heading}</h2>
            <p className="text-gray-500 break-keep">{promise.sub}</p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {promise.pillars.map((p) => (
              <li key={p.key}>
                <Link
                  href={localeHref(locale, p.tech)}
                  className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-6 hover:border-primary-light transition-colors no-underline"
                >
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-primary font-mono leading-none">{p.letter}</span>
                    <span className="text-sm font-bold text-gray-900">{p.label}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep">{p.promise}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-gray-500 break-keep">{promise.bridge}</p>
        </div>
      </AnimatedSection>

      {/* ── ② Tier 1 — Enterprise · the operating loop ── */}
      <Section variant="default">
        <Container>
          <Eyebrow className="mb-4">{c.loopEyebrow}</Eyebrow>
          <div className="mb-9 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{c.suiteTitle}</h2>
            <p className="text-gray-500 leading-relaxed break-keep">{c.suiteSub}</p>
          </div>
          <AnimatedSection>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {loop.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.id} className="stagger-child">
                    <Link
                      href={localeHref(locale, p.href)}
                      className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-card hover:border-primary-light transition-colors no-underline"
                    >
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white mb-5 ${p.emphasis ? 'ring-2 ring-primary/25 ring-offset-2' : ''}`}>
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <p className="text-2xs font-mono font-medium text-gray-400 mb-1">{p.stageNo} · {p.stage}</p>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{p.saaiName ?? p.name}</h3>
                      {p.secondary && <p className="text-xs font-medium text-gray-400 lowercase mb-2">{p.secondary}</p>}
                      <p className="text-sm text-gray-500 leading-relaxed break-keep mb-5">{p.desc}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        {c.detail}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
              {/* Specialized product — saai ads insight (시선·주목), a vertical of the suite. */}
              <li className="stagger-child">
                <Link
                  href={localeHref(locale, '/products/saai-ads-insight')}
                  className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-card hover:border-primary-light transition-colors no-underline"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white mb-5">
                    <Eye className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <p className="text-2xs font-mono font-medium text-gray-400 mb-1">{ADS_CARD[locale].stage}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">saai ads insight</h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep mb-5 mt-2">{ADS_CARD[locale].desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {c.detail}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
              {/* The horizontal axis — functions, which sit across the three modes. */}
              <li className="stagger-child">
                <Link
                  href={localeHref(locale, '/products/functions')}
                  className="group flex flex-col h-full rounded-2xl border border-dashed border-primary/40 bg-primary-lighter/30 p-6 hover:border-primary transition-colors no-underline"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary border border-primary/20 mb-5">
                    <Grid3x3 className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <p className="text-2xs font-mono font-medium text-primary/70 mb-1">{FUNCTIONS_CARD[locale].stage}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{FUNCTIONS_CARD[locale].title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep mb-5 mt-2">{FUNCTIONS_CARD[locale].desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {FUNCTIONS_CARD[locale].cta}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            </ul>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Modules — pick-what-you-need, right after suite (전부 다 ↔ 골라 쓰기) ── */}
      <Section variant="alt">
        <Container>
          <div className="mb-8 max-w-2xl">
            <Eyebrow className="mb-4">{mod.eyebrow}</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{mod.title}</h2>
            <p className="text-gray-500 leading-relaxed break-keep">{mod.sub}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-2xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">{mod.saaiLabel}</p>
              <ul className="flex flex-wrap gap-2">
                {MODULE_ITEMS.saai.map((m) => (
                  <li key={m.name}>
                    <Link
                      href={localeHref(locale, m.href)}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:border-primary-light hover:text-primary transition-colors no-underline"
                    >
                      {m.name}
                      {m.badge && (
                        <span className="rounded-full bg-primary px-1.5 py-0.5 text-2xs font-bold leading-none text-white">{m.badge}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-2xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">{mod.storeLabel}</p>
              <ul className="flex flex-wrap gap-2">
                {MODULE_ITEMS.store.map((m) => (
                  <li key={m.name}>
                    <Link
                      href={localeHref(locale, m.href)}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:border-primary-light hover:text-primary transition-colors no-underline"
                    >
                      {m.name}
                      {m.entry && <span className="text-2xs font-semibold text-primary">· {mod.entryTag}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="inline-flex w-fit items-center rounded-full border border-dashed border-primary/40 bg-primary-lighter/30 px-4 py-2 text-sm font-medium text-primary">
              + {mod.growth}
            </span>
            <p className="text-sm text-gray-500 break-keep">{mod.note}</p>
          </div>
        </Container>
      </Section>

      {/* ── ⑥ 어디서 쓰나 — use case · solution 연결 ── */}
      <Section variant="default">
        <Container>
          <div className="mb-9 max-w-2xl">
            <Eyebrow className="mb-4">{useCase.eyebrow}</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{useCase.title}</h2>
            <p className="text-gray-500 leading-relaxed break-keep">{useCase.body}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {useCase.industries.map((ind) => (
              <li key={ind.label}>
                <Link
                  href={localeHref(locale, ind.href)}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 hover:border-primary-light transition-colors no-underline"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-gray-900 break-keep">{ind.label}</span>
                    <span className="block text-xs text-gray-500 break-keep">{ind.desc}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-gray-200 bg-slate-50 px-6 py-5">
            <p className="flex-1 text-sm text-gray-600 leading-relaxed break-keep">{useCase.fieldLine}</p>
            <Link
              href={localeHref(locale, '/resources/case-studies')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors shrink-0"
            >
              {c.casesCta}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── ③ 카테고리 키워드 — 익명화 공간 AI (categoryKeyword SOT) ── */}
      <AnimatedSection className="py-16 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Eyebrow className="mb-4 justify-center">{categoryKeyword[locale]}</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{c.categoryTitle}</h2>
          <p className="text-gray-500 leading-relaxed break-keep">{c.categoryBody}</p>
        </div>
      </AnimatedSection>

      {/* ── ④ 도메인 구현 — For owners · B2C (separate sites) ── */}
      <Section variant="alt">
        <Container>
          <Eyebrow className="mb-7">{c.ownersEyebrow}</Eyebrow>
          <ul className="grid sm:grid-cols-2 gap-5">
            {owners.map((o) => (
              <li key={o.id}>
                <a
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-6 hover:border-primary-light transition-colors no-underline"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {o.name}
                    <span aria-hidden="true" className="text-primary"> ↗</span>
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep mb-5">{o.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {c.visit}
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Tech foundation (SEED) one-liner ── */}
      <Section variant="default" pad="compact">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5">
            <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <p className="flex-1 text-base text-gray-600 leading-relaxed break-keep">{c.seedLine}</p>
            <Link
              href={localeHref(locale, '/technology')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors shrink-0"
            >
              {c.seedCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </Section>

      <RelatedGlossary
        slugs={['store-heatmap', 'dwell-time', 'purchase-conversion-rate', 'store-operations-automation', 'store-automation-agent', 'retail-ai']}
        locale={locale}
      />

      {/* ── ⑤ 사례 · CTA ── */}
      <AnimatedSection className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg inline-flex items-center gap-2">
              {c.cta}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href={localeHref(locale, '/resources/case-studies')} className="btn-secondary btn-lg inline-flex items-center gap-2">
              {c.casesCta}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
