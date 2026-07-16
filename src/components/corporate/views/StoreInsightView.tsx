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
// initial JS of /products/saai-insight. Default SSR keeps the content prerendered.
const FunnelDiagram = dynamic(() => import('@/components/mockups/FunnelDiagram'), {
  loading: () => <div className="h-[420px] animate-pulse rounded-2xl bg-gray-100" />,
});

/**
 * StoreInsightView — shared saai insight product-detail composition.
 * Rendered by `/products/saai-insight` (en), `/ko/products/saai-insight`,
 * `/jp/products/saai-insight` with the locale prop. Product name stays identical.
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
  featHeading: string;
  featSub: string;
  features: { name: string; desc: string }[];
  featNote: string;
  installHeading: string;
  installSteps: { step: string; desc: string }[];
  installNote: string;
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
    heroSub: '둘러보다 그냥 나간 손님은 POS에 없습니다. saai insight는 매출 너머 — 어제의 매장에서 무슨 일이 있었고, 왜 그랬는지를 읽습니다.',
    ctaPrimary: '도입 상담 신청',
    ctaSecondary: '무엇을 보나요',
    dashEyebrow: 'DASHBOARD',
    dashTitle: '어제의 매장을 한 화면에서 읽습니다',
    dashSub: '방문·동선·체류·전환을 한 화면으로. 방문하는 순간부터 구매하는 순간까지 — 결제 데이터가 놓친 구매 전 행동이 보입니다.',
    mockupNote: '* AI 분석 예시 화면입니다.',
    hypHeading: '매출이 미처 보지 못한 것을 읽습니다',
    hypSub: '매출만으로는 알 수 없던 질문에, saai insight가 답합니다.',
    hypotheses: [
      { claim: 'POS는 결제한 65명만 압니다.', answer: 'saai insight는 나머지를 봅니다.', desc: '어제 매장 앞을 지나간 1,160명, 들어온 382명 — 둘러보다 그냥 나간 317명까지 봅니다.' },
      { claim: '안 팔리던 매대, 이유는 감입니다.', answer: 'saai insight는 히트맵으로 보여줍니다.', desc: '어디서 머물고 어디서 그냥 지나치는지 — 안 팔리던 매대의 진짜 이유가 드러납니다.' },
      { claim: '"오늘 손님이 적었다"는 인상입니다.', answer: 'saai insight는 왜 그랬는지 설명합니다.', desc: '입장부터 퇴장까지 여정을 따라가, 어디서 발길을 돌리는지 이탈 지점을 짚습니다.' },
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
    featHeading: '전체 기능 17가지',
    featSub: '실시간 대시보드부터 CSV 내보내기까지 — saai insight가 기본으로 제공하는 분석입니다.',
    features: [
      { name: '실시간 대시보드', desc: '전체·구역별 방문객 수와 특성을 실시간으로' },
      { name: '방문자 분석', desc: '기간·시간대별 방문객 수·특성·체류 시간' },
      { name: '유입률 분석', desc: '유동인구 대비 방문객을 유입률(%)로' },
      { name: '좌석 점유율', desc: '좌석 이용 현황을 기간·시간대별로' },
      { name: '라인 분석', desc: '출입구마다 가상의 선을 두고 방문객 수·특성 측정' },
      { name: '구역별 분석', desc: '진열대·전시물 단위의 방문·특성·체류' },
      { name: '방문자 동선', desc: '특정 시점의 매장 현황과 고객 동선 재구성' },
      { name: '구역 간 통행량', desc: '구역에서 구역으로의 이동 횟수·비율' },
      { name: '대표 동선', desc: '입장부터 퇴장까지 방문한 순서' },
      { name: '방문객 플로우', desc: '진열대 사이의 흐름을 생키 차트로' },
      { name: '히트맵', desc: '트래픽 히트맵 + 오래 머문 고객 히트맵' },
      { name: '구역 관심도', desc: '방문 대비 머묾 기준 4개 유형 분류' },
      { name: '퍼널 분석', desc: '진열대별 방문→픽업 단계 전환율' },
      { name: '광고 성과', desc: '매장 내 광고의 노출률과 관심도 데이터화' },
      { name: '커스텀 리포트', desc: '기간·방문객 특성 조건별 일괄 리포트' },
      { name: '구매 전환 분석', desc: '성별·연령별 구매 전환 비율' },
      { name: 'CSV 내보내기', desc: '분석 항목별 데이터 파일 다운로드' },
      { name: '복수매장 통합 대시보드 *', desc: '다수 매장의 지표를 한 화면에' },
      { name: '에이전틱 AI *', desc: '행동 데이터에 매출·재고·날씨까지 결합해 예측·최적화' },
    ],
    featNote: '* 복수매장 통합 대시보드·에이전틱 AI는 별도 협의로 제공됩니다.',
    installHeading: '도입은 이렇게 진행됩니다',
    installSteps: [
      { step: '1차 방문', desc: '현장 환경을 검토하고, 최적 화각의 기존 CCTV를 선택·연결합니다.' },
      { step: '구성 · 배송', desc: '소형 AI 분석장치를 구성해 현장으로 배송합니다.' },
      { step: '2차 방문', desc: '장치를 설치하고 정상 구동을 확인한 뒤, 맞춤 대시보드를 구성합니다.' },
    ],
    installNote: '1차 방문 이후 약 3주 — 상황에 따라 조정·협의할 수 있습니다. 기존 CCTV를 최대한 활용해 추가 비용을 최소화합니다.',
    handoffEyebrow: '분석에서 실행으로',
    handoffHeading: '이유는 insight가, 무엇을 할지는 saai agent가 정합니다.',
    handoffSub: 'saai insight는 어제를 읽고 그 이유를 설명합니다. 무엇을 채우고, 보충하고, 누구를 배치할지 정해야 하는 순간 — 그건 saai agent의 일입니다. 모든 추천은 하나의 엔진에서.',
    cardTitle: '인사이트를 액션 카드로',
    cardBody: '음료 체류가 2배? saai insight가 원인을 짚으면, saai agent가 발주량·공급처·시점까지 담아 승인용 카드로 만듭니다. 어떤 인사이트에서든 클릭 한 번.',
    cardCta: 'saai agent 보기',
    boundaryLine: 'saai count는 문 밖의 통행을, saai insight는 문 안에서 무슨 일이 왜 일어났는지를, saai agent는 다음에 무엇을 할지를 — 각각 맡습니다.',
    finalHeading: '어제와 "왜"에, 매일 아침 답을 받으세요',
    finalSub: '이미 달린 CCTV 그대로 — 1차 방문 후 약 3주면 시작합니다.',
    finalCta: '도입 상담 신청',
    seeAgent: 'saai agent 보기',
    alreadyUsing: '이미 사용 중이신가요?',
    manual: '사용자 매뉴얼 보기 →',
  },
  en: {
    heroTitle: ['See what your POS', 'never counted.'],
    heroSub: 'The shoppers who browsed and left aren’t in your POS. saai insight reads beyond sales — what happened in your store yesterday, and why.',
    ctaPrimary: 'Request a consultation',
    ctaSecondary: 'What it shows',
    dashEyebrow: 'DASHBOARD',
    dashTitle: 'Read yesterday’s store on a single screen',
    dashSub: 'Visits, flow, dwell, and conversion on one screen. From the moment they walk in to the moment they pay — the pre-purchase behavior payment data misses, made visible.',
    mockupNote: '* Sample AI analysis screen.',
    hypHeading: 'See what your sales numbers never could',
    hypSub: 'saai insight answers the questions sales data alone can’t.',
    hypotheses: [
      { claim: 'POS knows only the 65 who paid.', answer: 'saai insight sees the rest.', desc: '1,160 passed your storefront yesterday, 382 came in — and 317 browsed and walked out. We see them too.' },
      { claim: 'Why a shelf underperforms is a guess.', answer: 'saai insight shows it on a heatmap.', desc: 'Where people linger and where they walk past — the real reason that shelf isn’t selling.' },
      { claim: '"Quiet today" is an impression.', answer: 'saai insight explains why.', desc: 'Follow the journey from entry to exit and pinpoint exactly where shoppers turn back.' },
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
    featHeading: 'All 17 features',
    featSub: 'From the live dashboard to CSV export — the analyses saai insight ships with.',
    features: [
      { name: 'Live dashboard', desc: 'Visitor counts and traits, store-wide and by zone, in real time' },
      { name: 'Visitor analysis', desc: 'Counts, traits, and dwell time by period and hour' },
      { name: 'Capture rate', desc: 'Entries against footfall outside, as a rate (%)' },
      { name: 'Seat occupancy', desc: 'Seat usage by period and hour' },
      { name: 'Line analysis', desc: 'Virtual lines per entrance — counts and traits across each' },
      { name: 'Zone analysis', desc: 'Visits, traits, and dwell per shelf or display' },
      { name: 'Visitor pathways', desc: 'Reconstruct the floor and customer flow at any moment' },
      { name: 'Zone-to-zone traffic', desc: 'How often customers move between zones, and at what rate' },
      { name: 'Representative path', desc: 'The order of stops from entry to exit' },
      { name: 'Visitor flow', desc: 'Flows between shelves, simplified as a Sankey chart' },
      { name: 'Heatmap', desc: 'Traffic heatmap, plus a long-dwell heatmap' },
      { name: 'Zone interest', desc: 'Four types by visits versus lingering' },
      { name: 'Funnel analysis', desc: 'Visit-to-pickup conversion per shelf' },
      { name: 'Ad performance', desc: 'Exposure and interest for in-store ads, as data' },
      { name: 'Custom reports', desc: 'Batch reports by period and visitor traits' },
      { name: 'Purchase conversion', desc: 'Conversion rates by gender and age band' },
      { name: 'CSV export', desc: 'Download the data behind every analysis' },
      { name: 'Multi-store dashboard *', desc: 'Every store’s metrics on one screen' },
      { name: 'Agentic AI *', desc: 'Behavior data joined with sales, stock, and weather for prediction and optimization' },
    ],
    featNote: '* Multi-store dashboard and agentic AI are scoped separately.',
    installHeading: 'How onboarding works',
    installSteps: [
      { step: 'First visit', desc: 'We review the site and select and connect the existing CCTV with the best angles.' },
      { step: 'Build & ship', desc: 'A compact AI analysis device is configured and shipped to your site.' },
      { step: 'Second visit', desc: 'We install the device, verify it runs cleanly, and set up your custom dashboard.' },
    ],
    installNote: 'About three weeks from the first visit — adjustable by situation. We reuse your existing CCTV to keep extra cost to a minimum.',
    handoffEyebrow: 'From insight to action',
    handoffHeading: 'We show you why. saai agent decides what to do.',
    handoffSub: "saai insight reads yesterday and explains it. The moment it's time to decide what to stock, restock, or staff, that's saai agent — one engine for every recommendation.",
    cardTitle: 'Turn an insight into an action card',
    cardBody: 'Beverage dwell up 2×? saai insight flags the cause. saai agent drafts the move — order quantity, supplier, timing — for your approval. One click from any insight.',
    cardCta: 'See saai agent',
    boundaryLine: 'saai count reads the footfall outside. saai insight explains what happened inside, and why. saai agent decides what to do next.',
    finalHeading: 'Get the answer to yesterday and "why," every morning',
    finalSub: 'On the CCTV you already have — up and running about three weeks after the first visit.',
    finalCta: 'Request a consultation',
    seeAgent: 'See saai agent',
    alreadyUsing: 'Already a user?',
    manual: 'View the user manual →',
  },
  jp: {
    heroTitle: ['POS が数えられなかったものを、', '見ます。'],
    heroSub: '見て回っただけで出ていったお客様は、POS に残りません。saai insight は売上の先 — 昨日の店舗で何が起き、なぜそうなったのかを読み解きます。',
    ctaPrimary: '導入のご相談',
    ctaSecondary: '何が見えるのか',
    dashEyebrow: 'DASHBOARD',
    dashTitle: '昨日の店舗を一画面で読み解きます',
    dashSub: '来店・動線・滞在・転換を一画面で。入店の瞬間から購入の瞬間まで — 決済データが見落とす購入前の行動が見えてきます。',
    mockupNote: '※ AI分析のサンプル画面です。',
    hypHeading: '売上が見られなかったものを、見ます',
    hypSub: '売上だけでは分からなかった問いに、saai insight がお答えします。',
    hypotheses: [
      { claim: 'POS は決済した 65 人しか分かりません。', answer: 'saai insight は残りを見ます。', desc: '昨日、店頭を通った 1,160 人、入った 382 人 — 見て回っただけで出ていった 317 人まで見ます。' },
      { claim: '売れない棚の理由は、感覚頼みです。', answer: 'saai insight はヒートマップで見せます。', desc: 'どこで留まり、どこを素通りするのか — 売れなかった棚の本当の理由が見えてきます。' },
      { claim: '「今日は客が少なかった」は印象です。', answer: 'saai insight はなぜそうなのかを説明します。', desc: '入店から退店までの動線をたどり、どこで引き返すのか離脱地点を突き止めます。' },
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
    featHeading: '全機能 17種',
    featSub: 'リアルタイムダッシュボードからCSVエクスポートまで — saai insight が標準で提供する分析です。',
    features: [
      { name: 'リアルタイムダッシュボード', desc: '全体・エリア別の来店数と特性をリアルタイムで' },
      { name: '来店者分析', desc: '期間・時間帯別の来店数・特性・滞在時間' },
      { name: '流入率分析', desc: '通行量に対する来店を流入率（%）で' },
      { name: '座席占有率', desc: '座席の利用状況を期間・時間帯別に' },
      { name: 'ライン分析', desc: '出入口ごとの仮想ラインで来店数・特性を測定' },
      { name: 'エリア別分析', desc: '棚・展示物単位の来店・特性・滞在' },
      { name: '来店者動線', desc: '特定時点の店内状況と動線を再構成' },
      { name: 'エリア間通行量', desc: 'エリア間の移動回数・比率' },
      { name: '代表動線', desc: '入店から退店までの立ち寄り順序' },
      { name: '来店者フロー', desc: '棚の間の流れをサンキーチャートで' },
      { name: 'ヒートマップ', desc: 'トラフィック＋長時間滞在のヒートマップ' },
      { name: 'エリア関心度', desc: '来訪と滞留の比較で4タイプに分類' },
      { name: 'ファネル分析', desc: '棚ごとの来訪→ピックアップ転換率' },
      { name: '広告効果', desc: '店内広告の露出率と関心度をデータ化' },
      { name: 'カスタムレポート', desc: '期間・来店者特性の条件で一括レポート' },
      { name: '購買転換分析', desc: '性別・年齢帯別の購買転換率' },
      { name: 'CSVエクスポート', desc: '分析項目ごとのデータをダウンロード' },
      { name: '複数店舗統合ダッシュボード *', desc: '複数店舗の指標を一画面に' },
      { name: 'エージェンティックAI *', desc: '行動データに売上・在庫・天候まで結合し予測・最適化' },
    ],
    featNote: '※ 複数店舗統合ダッシュボード・エージェンティックAIは別途協議のうえ提供します。',
    installHeading: '導入の進み方',
    installSteps: [
      { step: '初回訪問', desc: '現場環境を確認し、最適な画角の既存CCTVを選定・接続します。' },
      { step: '構成 · 配送', desc: '小型AI分析デバイスを構成し、現場へお届けします。' },
      { step: '2回目訪問', desc: 'デバイスを設置して正常稼働を確認し、カスタムダッシュボードを構成します。' },
    ],
    installNote: '初回訪問から約3週間 — 状況に応じて調整・協議できます。既存のCCTVを最大限活用し、追加コストを最小限に抑えます。',
    handoffEyebrow: '分析から実行へ',
    handoffHeading: '理由は insight が、次の一手は saai agent が決めます。',
    handoffSub: 'saai insight は昨日を読み、その理由を説明します。何を仕入れ、補充し、誰を配置するか — それは saai agent の役割。すべての推奨はひとつのエンジンから。',
    cardTitle: 'インサイトをアクションカードに',
    cardBody: '飲料の滞在が2倍? saai insight が原因を示すと、saai agent が発注量・仕入先・タイミングまで含めて承認用カードにします。どのインサイトからもワンクリック。',
    cardCta: 'saai agent を見る',
    boundaryLine: 'saai count は店の外の通行を、saai insight は店の中で何がなぜ起きたかを、saai agent は次に何をするかを — それぞれ担います。',
    finalHeading: '昨日と「なぜ」への答えを、毎朝お受け取りください',
    finalSub: 'すでにある CCTV のままで — 初回訪問から約3週間で始められます。',
    finalCta: '導入のご相談',
    seeAgent: 'saai agent を見る',
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
      <JsonLd data={softwareApplication({ name: productPrimary('insight'), alternateName: productNaming.insight.store, description: t.heroSub, path: '/products/saai-insight', locale })} />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20 lg:pt-40 lg:pb-24 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: productPrimary('insight'), path: '/products/saai-insight' }]} locale={locale} tone="light" className="mb-6" />
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

      {/* ── 전체 기능 17가지 + 도입 프로세스 (솔루션 소개서 260209 부록) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.featHeading}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto break-keep">{t.featSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {t.features.map((f) => (
              <div key={f.name} className="p-4 rounded-xl border border-gray-100 bg-gray-50/60">
                <p className="text-sm font-bold text-gray-900 mb-1">{f.name}</p>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400 break-keep">{t.featNote}</p>

          <div className="mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center break-keep">{t.installHeading}</h3>
            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {t.installSteps.map((s, i) => (
                <div key={s.step} className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
                  <p className="text-2xs font-mono font-medium text-primary mb-2">0{i + 1}</p>
                  <p className="text-sm font-bold text-gray-900 mb-1">{s.step}</p>
                  <p className="text-xs text-gray-500 leading-relaxed break-keep">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-xs text-gray-500 break-keep">{t.installNote}</p>
          </div>
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

      {/* ── insight → saai agent 핸드오프 (경계: insight=원인, agent=행동) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.handoffEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{t.handoffHeading}</h2>
            <p className="text-gray-600 leading-relaxed break-keep">{t.handoffSub}</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-white p-6 sm:p-8 shadow-card">
            <p className="text-2xs font-bold uppercase tracking-wider text-primary mb-2">Powered by saai agent</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2 break-keep">{t.cardTitle}</h3>
            <p className="text-sm text-gray-600 leading-relaxed break-keep mb-5">{t.cardBody}</p>
            <Link href={localeHref(locale, '/products/saai-agent')} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors">
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
            <Link href={localeHref(locale, '/products/saai-agent')} className="btn-ghost-dark">
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
