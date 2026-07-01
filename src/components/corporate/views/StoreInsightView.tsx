import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import DoorSplitDiagram from '@/components/mockups/DoorSplitDiagram';
import StoreInsightDesktopMockup from '@/components/mockups/StoreInsightDesktopMockup';
import ComparisonPrinciple from '@/components/corporate/ComparisonPrinciple';
import HubDataBand from '@/components/corporate/HubDataBand';
import dynamic from 'next/dynamic';
import {
  BarChart3,
  ArrowRight,
  Users,
  Route,
  Repeat,
} from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines, productNaming, productPrimary } from '@/lib/brand-canon';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import WordRise from '@/components/ui/WordRise';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';

// Below-the-fold framer-motion mockup → deferred so its chunk stays out of the
// initial JS of /products/store-insight. Default SSR keeps the content prerendered.
const FunnelDiagram = dynamic(() => import('@/components/mockups/FunnelDiagram'), {
  loading: () => <div className="h-[420px] animate-pulse rounded-2xl bg-gray-100" />,
});

/**
 * StoreInsightView — shared store insight product-detail composition.
 * Rendered by `/products/store-insight` (en), `/ko/products/store-insight`,
 * `/jp/products/store-insight` with the locale prop. Product name stays identical.
 */

const C: Record<Locale, {
  heroTitle: [string, string];
  heroSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  dashEyebrow: string;
  dashTitle: string;
  dashSub: string;
  mockupNote: string;
  hypHeading: string;
  hypSub: string;
  hypotheses: { claim: string; answer: string; desc: string }[];
  funnelHeading: string;
  funnelSub: string;
  kpis: { label: string; desc: string }[];
  baHeading: string;
  before: string[];
  after: string[];
  baNote: string;
  handoffEyebrow: string;
  handoffHeading: string;
  handoffSub: string;
  cardTitle: string;
  cardBody: string;
  cardCta: string;
  boundaryLine: string;
  finalHeading: string;
  finalSub: string;
  finalCta: string;
  seeAgent: string;
  alreadyUsing: string;
  manual: string;
}> = {
  ko: {
    heroTitle: ['POS가 못 센 것을', '봅니다.'],
    heroSub: '둘러보다 그냥 나간 손님은 POS에 없습니다. store insight는 매출 너머 — 어제의 매장에서 무슨 일이 있었고, 왜 그랬는지를 읽습니다.',
    ctaPrimary: '도입 상담 신청',
    ctaSecondary: '무엇을 보나요',
    dashEyebrow: 'DASHBOARD',
    dashTitle: '어제의 매장을 한 화면에서 읽습니다',
    dashSub: '방문·동선·체류·전환을 한 화면으로. 손님이 어디서 멈추고 무엇을 놓쳤는지, 어제의 매장이 보입니다.',
    mockupNote: '* AI 분석 예시 화면입니다.',
    hypHeading: '매출이 미처 보지 못한 것을 읽습니다',
    hypSub: '매출만으로는 알 수 없던 질문에, store insight가 답합니다.',
    hypotheses: [
      { claim: 'POS는 결제한 65명만 압니다.', answer: 'store insight는 나머지를 봅니다.', desc: '어제 매장 앞을 지나간 1,160명, 들어온 382명 — 둘러보다 그냥 나간 317명까지 봅니다.' },
      { claim: '안 팔리던 매대, 이유는 감입니다.', answer: 'store insight는 히트맵으로 보여줍니다.', desc: '어디서 머물고 어디서 그냥 지나치는지 — 안 팔리던 매대의 진짜 이유가 드러납니다.' },
      { claim: '"오늘 손님이 적었다"는 인상입니다.', answer: 'store insight는 왜 그랬는지 설명합니다.', desc: '입장부터 퇴장까지 여정을 따라가, 어디서 발길을 돌리는지 이탈 지점을 짚습니다.' },
    ],
    funnelHeading: '지나감에서 결제까지, 보이지 않던 손님이 보입니다',
    funnelSub: 'POS엔 결제한 65명만 남습니다. 그 앞의 단계를 모두 펼쳐, 어디서 새는지 찾습니다.',
    kpis: [
      { label: '지나감', desc: '매장 앞을 지난 1,160명' },
      { label: '입장', desc: '안으로 들어온 382명' },
      { label: '체류', desc: '둘러보다 나간 317명' },
      { label: '결제', desc: 'POS에 남은 65명' },
    ],
    baHeading: '감으로 보던 매장, 데이터로 봅니다',
    before: [
      '"오늘 좀 한가했다"는 인상만 남습니다.',
      '매출이 떨어진 날, 원인을 모릅니다.',
    ],
    after: [
      '방문·체류·응시·구매·이탈까지 18가지 분석으로 남습니다.',
      '동선 하나 바꿔 수익 +10%, 체류 +25% — 어제와 "왜"에 매일 답합니다.',
    ],
    baNote: '* 수치는 학원가 편의점·시립 전시관 등 실제 운영 사례를 설명하기 위한 예시입니다.',
    handoffEyebrow: '분석에서 실행으로',
    handoffHeading: '이유는 insight가, 무엇을 할지는 store agent가 정합니다.',
    handoffSub: 'store insight는 어제를 읽고 그 이유를 설명합니다. 무엇을 채우고, 보충하고, 누구를 배치할지 정해야 하는 순간 — 그건 store agent의 일입니다. 모든 추천은 하나의 엔진에서.',
    cardTitle: '인사이트를 액션 카드로',
    cardBody: '음료 체류가 2배? store insight가 원인을 짚으면, store agent가 발주량·공급처·시점까지 담아 승인용 카드로 만듭니다. 어떤 인사이트에서든 클릭 한 번.',
    cardCta: 'store agent 보기',
    boundaryLine: 'store count는 문 밖의 통행을, store insight는 문 안에서 무슨 일이 왜 일어났는지를, store agent는 다음에 무엇을 할지를 — 각각 맡습니다.',
    finalHeading: '어제와 "왜"에, 매일 아침 답을 받으세요',
    finalSub: '이미 달린 CCTV 위에서 바로 시작할 수 있습니다.',
    finalCta: '도입 상담 신청',
    seeAgent: 'store agent 보기',
    alreadyUsing: '이미 사용 중이신가요?',
    manual: '사용자 매뉴얼 보기 →',
  },
  en: {
    heroTitle: ['See what your POS', 'never counted.'],
    heroSub: 'The shoppers who browsed and left aren’t in your POS. store insight reads beyond sales — what happened in your store yesterday, and why.',
    ctaPrimary: 'Request a consultation',
    ctaSecondary: 'What it shows',
    dashEyebrow: 'DASHBOARD',
    dashTitle: 'Read yesterday’s store on a single screen',
    dashSub: 'Visits, flow, dwell, and conversion on one screen. See where shoppers stopped and what they missed — yesterday, made visible.',
    mockupNote: '* Sample AI analysis screen.',
    hypHeading: 'See what your sales numbers never could',
    hypSub: 'store insight answers the questions sales data alone can’t.',
    hypotheses: [
      { claim: 'POS knows only the 65 who paid.', answer: 'store insight sees the rest.', desc: '1,160 passed your storefront yesterday, 382 came in — and 317 browsed and walked out. We see them too.' },
      { claim: 'Why a shelf underperforms is a guess.', answer: 'store insight shows it on a heatmap.', desc: 'Where people linger and where they walk past — the real reason that shelf isn’t selling.' },
      { claim: '"Quiet today" is an impression.', answer: 'store insight explains why.', desc: 'Follow the journey from entry to exit and pinpoint exactly where shoppers turn back.' },
    ],
    funnelHeading: 'From passing by to paying — the invisible majority, made visible',
    funnelSub: 'Your POS keeps only the 65 who paid. We unfold every step before it to find where it leaks.',
    kpis: [
      { label: 'Passed by', desc: '1,160 walked past' },
      { label: 'Entered', desc: '382 came inside' },
      { label: 'Dwelled', desc: '317 browsed, then left' },
      { label: 'Paid', desc: '65 reached your POS' },
    ],
    baHeading: 'The store you ran on instinct, now seen in data',
    before: [
      'All you keep is the impression that "it was quiet today."',
      'On days sales drop, the cause stays unknown.',
    ],
    after: [
      'Visits, dwell, attention, purchase, drop-off — 18 analyses, recorded.',
      'One flow change lifted revenue +10% and dwell +25% — answering yesterday and "why," every day.',
    ],
    baNote: '* Figures illustrate real cases — a campus convenience store and a city exhibition hall.',
    handoffEyebrow: 'From insight to action',
    handoffHeading: 'We show you why. store agent decides what to do.',
    handoffSub: "store insight reads yesterday and explains it. The moment it's time to decide what to stock, restock, or staff, that's store agent — one engine for every recommendation.",
    cardTitle: 'Turn an insight into an action card',
    cardBody: 'Beverage dwell up 2×? store insight flags the cause. store agent drafts the move — order quantity, supplier, timing — for your approval. One click from any insight.',
    cardCta: 'See store agent',
    boundaryLine: 'store count reads the footfall outside. store insight explains what happened inside, and why. store agent decides what to do next.',
    finalHeading: 'Get the answer to yesterday and "why," every morning',
    finalSub: 'Start right on the CCTV you already have.',
    finalCta: 'Request a consultation',
    seeAgent: 'See store agent',
    alreadyUsing: 'Already a user?',
    manual: 'View the user manual →',
  },
  jp: {
    heroTitle: ['POS が数えられなかったものを、', '見ます。'],
    heroSub: '見て回っただけで出ていったお客様は、POS に残りません。store insight は売上の先 — 昨日の店舗で何が起き、なぜそうなったのかを読み解きます。',
    ctaPrimary: '導入のご相談',
    ctaSecondary: '何が見えるのか',
    dashEyebrow: 'DASHBOARD',
    dashTitle: '昨日の店舗を一画面で読み解きます',
    dashSub: '来店・動線・滞在・転換を一画面で。お客様がどこで立ち止まり、何を見逃したのか — 昨日の店舗が見えてきます。',
    mockupNote: '※ AI分析のサンプル画面です。',
    hypHeading: '売上が見られなかったものを、見ます',
    hypSub: '売上だけでは分からなかった問いに、store insight がお答えします。',
    hypotheses: [
      { claim: 'POS は決済した 65 人しか分かりません。', answer: 'store insight は残りを見ます。', desc: '昨日、店頭を通った 1,160 人、入った 382 人 — 見て回っただけで出ていった 317 人まで見ます。' },
      { claim: '売れない棚の理由は、感覚頼みです。', answer: 'store insight はヒートマップで見せます。', desc: 'どこで留まり、どこを素通りするのか — 売れなかった棚の本当の理由が見えてきます。' },
      { claim: '「今日は客が少なかった」は印象です。', answer: 'store insight はなぜそうなのかを説明します。', desc: '入店から退店までの動線をたどり、どこで引き返すのか離脱地点を突き止めます。' },
    ],
    funnelHeading: '通過から決済まで、見えなかったお客様が見えます',
    funnelSub: 'POS に残るのは決済した 65 人だけ。その手前の段階をすべて広げ、どこで取りこぼすかを探します。',
    kpis: [
      { label: '通過', desc: '店頭を通った 1,160 人' },
      { label: '入店', desc: '中に入った 382 人' },
      { label: '滞在', desc: '見て回り出た 317 人' },
      { label: '決済', desc: 'POS に残った 65 人' },
    ],
    baHeading: '感覚で見ていた店舗を、データで見ます',
    before: [
      '「今日は少し暇だった」という印象だけが残ります。',
      '売上が落ちた日、その要因が分かりません。',
    ],
    after: [
      '来店・滞在・注視・購入・離脱まで、18種類の分析として残ります。',
      '動線を一つ変えるだけで売上 +10%、滞在 +25% — 昨日と「なぜ」に毎日お答えします。',
    ],
    baNote: '※ 数値は学習塾街のコンビニ・市立展示館などの実例を説明するための一例です。',
    handoffEyebrow: '分析から実行へ',
    handoffHeading: '理由は insight が、次の一手は store agent が決めます。',
    handoffSub: 'store insight は昨日を読み、その理由を説明します。何を仕入れ、補充し、誰を配置するか — それは store agent の役割。すべての推奨はひとつのエンジンから。',
    cardTitle: 'インサイトをアクションカードに',
    cardBody: '飲料の滞在が2倍? store insight が原因を示すと、store agent が発注量・仕入先・タイミングまで含めて承認用カードにします。どのインサイトからもワンクリック。',
    cardCta: 'store agent を見る',
    boundaryLine: 'store count は店の外の通行を、store insight は店の中で何がなぜ起きたかを、store agent は次に何をするかを — それぞれ担います。',
    finalHeading: '昨日と「なぜ」への答えを、毎朝お受け取りください',
    finalSub: 'すでにある CCTV の上で、すぐに始められます。',
    finalCta: '導入のご相談',
    seeAgent: 'store agent を見る',
    alreadyUsing: 'すでにご利用中ですか？',
    manual: 'ユーザーマニュアルを見る →',
  },
};

export default function StoreInsightView({ locale }: { locale: Locale }) {
  const t = C[locale];

  const hypIcons = [BarChart3, Route, Users];
  const kpiIcons = [Users, Route, BarChart3, Repeat];

  return (
    <>
      <JsonLd data={softwareApplication({ name: productPrimary('insight'), alternateName: productNaming.insight.store, description: t.heroSub, path: '/products/store-insight', locale })} />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20 lg:pt-40 lg:pb-24 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: productPrimary('insight'), path: '/products/store-insight' }]} locale={locale} tone="light" className="mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter border border-primary/10 rounded-full text-sm text-primary font-medium mb-6">
            <BarChart3 className="w-4 h-4" />
            {productPrimary('insight')}
            <span className="font-normal text-primary/55">· {productNaming.insight.store}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-6">
            <WordRise text={t.heroTitle[0]} />
            <br className="hidden sm:block" />
            <WordRise text={t.heroTitle[1]} className="text-primary" />
          </h1>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">
            {solutionTaglines.insight[locale]}
          </p>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto break-keep mb-10">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localeHref(locale, '/contact') + '?product=StoreInsight'} className="btn-primary btn-lg">
              {t.ctaPrimary}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="#hypotheses" className="btn-secondary btn-lg">
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Dashboard mockup (실제 데스크톱 분석 화면) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 lg:mb-14 max-w-2xl mx-auto">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.dashEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.dashTitle}
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed break-keep">
              {t.dashSub}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <StoreInsightDesktopMockup locale={locale} />
          </div>
          <p className="mt-6 text-center text-xs text-gray-500 break-keep">
            {t.mockupNote}
          </p>
        </div>
      </AnimatedSection>

      {/* ── Hypothesis cards ── */}
      <AnimatedSection id="hypotheses" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.hypHeading}
            </h2>
            <p className="text-lg text-gray-500 break-keep">
              {t.hypSub}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {t.hypotheses.map((h, i) => {
              const Icon = hypIcons[i];
              return (
                <div key={h.claim} className="card flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0 mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1 break-keep">{h.claim}</p>
                  <p className="text-lg font-bold text-gray-900 mb-3 break-keep">{h.answer}</p>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep mt-auto">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Funnel / KPI concept ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.funnelHeading}
            </h2>
            <p className="text-lg text-gray-500 break-keep">
              {t.funnelSub}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {t.kpis.map((k, i) => {
              const Icon = kpiIcons[i];
              return (
                <div key={k.label} className="card text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary-lighter flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 mb-1">STEP 0{i + 1}</span>
                  <p className="text-lg font-bold text-gray-900 mb-1">{k.label}</p>
                  <p className="text-sm text-gray-500 break-keep">{k.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mx-auto max-w-5xl px-4 sm:px-6 mt-12 lg:mt-16">
            <FunnelDiagram locale={locale} />
          </div>
        </div>
      </AnimatedSection>

      {/* ── Before / After ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.baHeading}
            </h2>
          </div>
          <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/images/storeinsight-pathway-beforeafter.webp"
                alt={t.baHeading}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-white">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Before</p>
              <ul className="space-y-3">
                {t.before.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-gray-500 break-keep">
                    <span className="text-gray-300 mt-0.5">—</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card border-primary/20">
              <p className="text-xs font-medium text-primary uppercase tracking-wider mb-4">After</p>
              <ul className="space-y-3">
                {t.after.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-gray-700 break-keep">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-gray-500 break-keep">
            {t.baNote}
          </p>
        </div>
      </AnimatedSection>

      {/* ── 숫자를 읽는 법 (period · peer · source) — 홈에서 이관 ── */}
      <ComparisonPrinciple locale={locale} />

      {/* ── 매출을 끌어다 놓으면: 체류 + 매출 한 축에서 — 홈에서 이관 ── */}
      <HubDataBand locale={locale} />

      {/* ── 문 밖 ↔ 문 안 (count ↔ insight 경계, D4) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <DoorSplitDiagram locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── insight → store agent 핸드오프 (경계: insight=원인, agent=행동) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.handoffEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{t.handoffHeading}</h2>
            <p className="text-gray-600 leading-relaxed break-keep">{t.handoffSub}</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-white p-6 sm:p-8 shadow-card">
            <p className="text-2xs font-bold uppercase tracking-wider text-primary mb-2">Powered by store agent</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2 break-keep">{t.cardTitle}</h3>
            <p className="text-sm text-gray-600 leading-relaxed break-keep mb-5">{t.cardBody}</p>
            <Link href={localeHref(locale, '/products/store-agent')} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors">
              {t.cardCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="mt-8 max-w-3xl text-sm text-gray-500 leading-relaxed break-keep border-l-2 border-primary pl-4">{t.boundaryLine}</p>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection className="section-dark relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight break-keep">
            {t.finalHeading}
          </h2>
          <p className="text-lg text-gray-300 mb-10 break-keep">
            {t.finalSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localeHref(locale, '/contact') + '?product=StoreInsight'} className="btn-primary btn-lg">
              {t.finalCta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href={localeHref(locale, '/products/store-agent')} className="btn-ghost-dark">
              {t.seeAgent}
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            {t.alreadyUsing}{' '}
            <Link href={localeHref(locale, '/resources/docs/store-insight')} className="text-white underline underline-offset-4 hover:text-primary-light transition-colors">
              {t.manual}
            </Link>
          </p>
        </div>
      </AnimatedSection>
    </>
  );
}
