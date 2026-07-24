import SaaiSymbol from '@/components/ui/SaaiSymbol';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StoreInsightDesktopMockup from '@/components/mockups/StoreInsightDesktopMockup';
import PosJoinDiagram from '@/components/mockups/PosJoinDiagram';
import ComparisonPrinciple from '@/components/corporate/ComparisonPrinciple';
import HubDataBand from '@/components/corporate/HubDataBand';
import dynamic from 'next/dynamic';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  LayoutGrid,
  GitCompare,
  Filter,
  CheckCheck,
  Users,
  Route,
  MousePointerClick,
  FileText,
  Blocks,
  type LucideIcon,
} from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import WordRise from '@/components/ui/WordRise';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import ModeFunctionSection from '@/components/corporate/ModeFunctionSection';
import RelatedGlossary from '@/components/corporate/RelatedGlossary';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines, productNaming } from '@/lib/brand-canon';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import { canonicalDoorTraffic } from '@/data/mockup-scenarios/canonical';

// 홈 ProblemBeat에서 이식한 매장 전체 퍼널(342→65) — 정제계획 §8-2 · C2.
// Beat 4 kpis(1,036·342·317·65)와 같은 숫자 세계관 (매대 단위 FunnelDiagram 대체)
// — canonicalDoorTraffic 파생 (MM Phase 2 2-⑥).
const InsightFunnelBlock = dynamic(() => import('@/components/corporate/InsightFunnelBlock'), {
  loading: () => <div className="h-[420px] animate-pulse rounded-2xl bg-gray-100" />,
});

// canonicalDoorTraffic 파생 표기 문자열 — Beat 4 kpis·funnelSub 3로케일 공유
const DT = {
  passersby: canonicalDoorTraffic.passersby.toLocaleString('en-US'), // '1,036'
  entered: String(canonicalDoorTraffic.entered), // '342'
  browsed: String(canonicalDoorTraffic.browsed), // '317'
  purchased: String(canonicalDoorTraffic.purchased), // '65'
};

const C: Record<Locale, {
  heroTitle: [string, string];
  heroSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  posComplementTitle: string;
  posComplementSub: string;
  dashEyebrow: string;
  dashTitle: string;
  dashSub: string;
  mockupNote: string;
  jobHeading: string;
  jobSub: string;
  jobs: { title: string; subtitle: string; desc: string }[];
  funnelHeading: string;
  funnelSub: string;
  kpis: { label: string; desc: string }[];
  baHeading: string;
  baBeforeLabel: string;
  baAfterLabel: string;
  before: string[];
  after: string[];
  baNote: string;
  featHeading: string;
  featSub: string;
  features: { name: string; desc: string }[];
  featGroups: string[];
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
    heroTitle: ['어제의 매장을,', '왜까지 읽습니다.'],
    heroSub: '무엇이 팔리고, 왜 안 팔렸는지 — 매일 아침 답합니다. 쓰던 CCTV 그대로, 원본 비디오 없이.',
    ctaPrimary: '도입 상담 신청',
    ctaSecondary: '분석 화면 보기',
    posComplementTitle: 'POS 매출 데이터에 매장 안의 "왜"를 더합니다',
    posComplementSub: 'POS는 "무엇이"를, saai insight는 "왜"를 압니다.',
    dashEyebrow: '대시보드 · 종합 관측',
    dashTitle: '어제의 매장을 한 화면에서 읽습니다',
    dashSub: '방문·동선·체류·전환을 한 화면으로. 입장 순간부터 결제 순간까지 — 매출 데이터가 놓친 구매 전 미세 행동이 보입니다.',
    mockupNote: '* AI 분석 예시 화면입니다.',
    jobHeading: '본사 MD와 SV의 4대 핵심 결정을 지원합니다',
    jobSub: '감으로 하던 매장 판단을 데이터 기반의 명확한 행동 가이드로 전환합니다.',
    jobs: [
      { title: '진열 · 레이아웃 결정', subtitle: '무엇을 어디에 놓을 것인가', desc: '안 팔리는 매대의 진짜 이유를 히트맵으로 짚습니다.' },
      { title: '매장 편차 해소', subtitle: '왜 이 매장만 매출이 다른가', desc: '잘되는 매장의 성공 요인을 또래 비교로 찾아 복제합니다.' },
      { title: '전환 · 이탈 지점 발굴', subtitle: '손님이 어디서 머뭇거리고 떠나는가', desc: '지나감→입장→체류→결제 퍼널에서 새는 구간을 찾습니다.' },
      { title: '개선 성과 검증', subtitle: '바꾼 레이아웃이 실제 먹혔는가', desc: '바꾼 레이아웃의 효과를 체류·전환 데이터로 입증합니다.' },
    ],
    funnelHeading: '지나감에서 결제까지, 보이지 않던 손님이 보입니다',
    funnelSub: `POS엔 결제한 ${DT.purchased}명만 남지만, saai insight는 문 앞의 ${DT.passersby}명 전체 행동 퍼널을 펼쳐 어디서 새는지 찾습니다.`,
    kpis: [
      { label: '지나감', desc: `매장 앞을 지난 ${DT.passersby}명` },
      { label: '입장', desc: `안으로 들어온 ${DT.entered}명` },
      { label: '체류', desc: `둘러보다 나간 ${DT.browsed}명` },
      { label: '결제', desc: `POS에 남은 ${DT.purchased}명` },
    ],
    baHeading: '감으로 보던 매장, 데이터로 봅니다',
    baBeforeLabel: 'BEFORE · 감으로 보던 매장',
    baAfterLabel: 'AFTER · saai insight 도입 후',
    before: [
      '"오늘 좀 한가했다"는 인상만 남고, 매출이 떨어진 날의 원인은 모릅니다.',
    ],
    after: [
      '방문·체류·응시·구매·이탈까지 19가지 분석으로 남습니다.',
      '동선 하나 바꿔 수익 +10%, 체류 +25% — 어제와 "왜"에 매일 답합니다.',
    ],
    baNote: '* 수치는 학원가 편의점·시립 전시관 등 실제 운영 사례를 설명하기 위한 예시입니다.',
    featHeading: '전체 기능 모듈 19가지 (참조 카탈로그)',
    featSub: '실시간 대시보드부터 CSV 내보내기까지 — saai insight가 제공하는 모듈형 분석입니다.',
    features: [
      { name: '실시간 대시보드', desc: '전체·구역별 방문객 수와 특성을 실시간으로' },
      { name: '방문자 분석', desc: '기간·시간대별 방문객 수·특성·체류 시간' },
      { name: '유입률 분석 (saai count)', desc: '유동인구 대비 방문객을 유입률(%)로' },
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
      { name: '광고 성과 (saai ads insight)', desc: '매장 내 광고의 노출률과 관심도 데이터화' },
      { name: '커스텀 리포트', desc: '기간·방문객 특성 조건별 일괄 리포트' },
      { name: '구매 전환 분석', desc: '성별·연령별 구매 전환 비율' },
      { name: 'CSV 내보내기', desc: '분석 항목별 데이터 파일 다운로드' },
      { name: '복수매장 통합 대시보드 *', desc: '다수 매장의 지표를 한 화면에' },
      { name: '에이전틱 AI 연동 *', desc: '행동 데이터에 매출·재고·날씨까지 결합해 예측·최적화' },
    ],
    featGroups: ['방문 · 유입', '동선 · 구역', '전환 · 관심', '리포트 · 연동', '확장 (별도 협의)'],
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
    handoffSub: '어제와 이유는 insight가 읽습니다. 무엇을 할지는 saai agent의 일 — 모든 추천은 하나의 엔진에서.',
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
    heroTitle: ['Reading yesterday’s store,', 'down to the why.'],
    heroSub: 'What sold, and why it didn’t — answered every morning. On the CCTV you already have, with zero raw video.',
    ctaPrimary: 'Request Consultation',
    ctaSecondary: 'View Dashboard',
    posComplementTitle: 'Adding the "why" inside your store to POS sales figures',
    posComplementSub: 'POS knows the “what.” saai insight knows the “why.”',
    dashEyebrow: 'DASHBOARD · Total Visibility',
    dashTitle: 'Read yesterday’s store on a single screen',
    dashSub: 'Entries, flow, dwell, and conversion consolidated into one view. Pre-purchase behavior that payment logs miss, made fully visible.',
    mockupNote: '* Sample AI analysis screen.',
    jobHeading: 'Supporting 4 Key Decisions for HQ MDs & Field SVs',
    jobSub: 'Transforming intuition-based store calls into data-driven actionable guides.',
    jobs: [
      { title: 'Display & Layout Decisions', subtitle: 'What goes where', desc: 'Heatmaps pinpoint why a shelf underperforms.' },
      { title: 'Eliminating Store Variance', subtitle: 'Why sales differ across stores', desc: 'Peer comparison finds what winning stores do — so you can replicate it.' },
      { title: 'Drop-off & Conversion Recovery', subtitle: 'Where shoppers hesitate & leave', desc: 'The pass–enter–dwell–pay funnel shows where you leak.' },
      { title: 'Measuring Optimization Impact', subtitle: 'Did the new layout work?', desc: 'Prove a layout change worked, with dwell and conversion data.' },
    ],
    funnelHeading: 'From passing by to paying — the invisible majority, made visible',
    funnelSub: `POS keeps only the ${DT.purchased} who paid. saai insight unfolds the ${DT.passersby} pre-entry funnel to pinpoint where leaks occur.`,
    kpis: [
      { label: 'Passed by', desc: `${DT.passersby} walked past` },
      { label: 'Entered', desc: `${DT.entered} came inside` },
      { label: 'Dwelled', desc: `${DT.browsed} browsed, then left` },
      { label: 'Paid', desc: `${DT.purchased} reached your POS` },
    ],
    baHeading: 'The store you ran on instinct, now seen in data',
    baBeforeLabel: 'BEFORE · Run on instinct',
    baAfterLabel: 'AFTER · With saai insight',
    before: [
      'You keep an impression — "quiet today" — and the cause of a down day stays unknown.',
    ],
    after: [
      'Visits, dwell, attention, purchase, drop-off — 19 analyses, recorded.',
      'One flow change lifted revenue +10% and dwell +25% — answering yesterday and "why," every day.',
    ],
    baNote: '* Figures illustrate real cases — a campus convenience store and a city exhibition hall.',
    featHeading: 'All 19 Feature Modules (Reference Catalog)',
    featSub: 'From the live dashboard to CSV export — modular analyses shipped with saai insight.',
    features: [
      { name: 'Live dashboard', desc: 'Visitor counts and traits, store-wide and by zone, in real time' },
      { name: 'Visitor analysis', desc: 'Counts, traits, and dwell time by period and hour' },
      { name: 'Capture rate (saai count)', desc: 'Entries against footfall outside, as a rate (%)' },
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
      { name: 'Ad performance (saai ads)', desc: 'Exposure and interest for in-store ads, as data' },
      { name: 'Custom reports', desc: 'Batch reports by period and visitor traits' },
      { name: 'Purchase conversion', desc: 'Conversion rates by gender and age band' },
      { name: 'CSV export', desc: 'Download the data behind every analysis' },
      { name: 'Multi-store dashboard *', desc: 'Every store’s metrics on one screen' },
      { name: 'Agentic AI Integration *', desc: 'Behavior data joined with sales, stock, and weather for prediction and optimization' },
    ],
    featGroups: ['Visits & capture', 'Flow & zones', 'Conversion & interest', 'Reports & export', 'Extensions (scoped separately)'],
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
    handoffSub: 'insight reads yesterday and the why. What to do next is saai agent’s job — every recommendation from one engine.',
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
    heroTitle: ['昨日の店舗を、', 'なぜまで読み解きます。'],
    heroSub: '何が売れ、なぜ売れなかったのか — 毎朝お答えします。既存CCTVそのまま、動画残さず。',
    ctaPrimary: '導入のご相談',
    ctaSecondary: '分析画面を見る',
    posComplementTitle: 'POS売上データに店舗内の「なぜ」を加えます',
    posComplementSub: 'POSは「何が」を、saai insight は「なぜ」を知っています。',
    dashEyebrow: 'DASHBOARD · 総合観測',
    dashTitle: '昨日の店舗を一画面で読み解きます',
    dashSub: '来店・動線・滞在・転換を一画面で。入店の瞬間から購入の瞬間まで — 決済データが見落とす購入前の行動が見えてきます。',
    mockupNote: '※ AI分析のサンプル画面です。',
    jobHeading: '本部MDとSVの4大意思決定を支援します',
    jobSub: '感覚頼みの店舗判断を、データに基づく明確な行動ガイドへ。',
    jobs: [
      { title: '陳列・レイアウト決定', subtitle: '何をどこに配置すべきか', desc: '売れない棚の本当の理由をヒートマップで特定します。' },
      { title: '店舗格差の解消', subtitle: 'なぜこの店舗だけ売上が違うのか', desc: '優良店の成功要因を同類比較で見つけ、複製します。' },
      { title: '転換・離脱ポイントの発見', subtitle: 'お客様はどこで躊躇し立ち去るか', desc: '通過→入店→滞在→決済のファネルで漏れを見つけます。' },
      { title: '改善成果の検証', subtitle: '変更したレイアウトは効果があったか', desc: '変更の効果を滞在・転換データで証明します。' },
    ],
    funnelHeading: '通過から決済まで、見えなかったお客様が見えます',
    funnelSub: `POS に残るのは決済した ${DT.purchased} 人だけ。saai insight は ${DT.passersby} 人の全体行動ファネルを広げ取りこぼしを探します。`,
    kpis: [
      { label: '通過', desc: `店頭を通った ${DT.passersby} 人` },
      { label: '入店', desc: `中に入った ${DT.entered} 人` },
      { label: '滞在', desc: `見て回り出た ${DT.browsed} 人` },
      { label: '決済', desc: `POS に残った ${DT.purchased} 人` },
    ],
    baHeading: '感覚で見ていた店舗を、データで見ます',
    baBeforeLabel: 'BEFORE · 感覚で見る店舗',
    baAfterLabel: 'AFTER · saai insight 導入後',
    before: [
      '「今日は暇だった」という印象だけが残り、売上が落ちた日の要因は分かりません。',
    ],
    after: [
      '来店・滞在・注視・購入・離脱まで、19種類の分析として残ります。',
      '動線を一つ変えるだけで売上 +10%、滞在 +25% — 昨日と「なぜ」に毎日お答えします。',
    ],
    baNote: '※ 数値は学習塾街のコンビニ・市立展示館などの実例を説明するための一例です。',
    featHeading: '全機能モジュール 19種 (参照カタログ)',
    featSub: 'リアルタイムダッシュボードからCSVエクスポートまで — saai insight が提供する分析モジュールです。',
    features: [
      { name: 'リアルタイムダッシュボード', desc: '全体・エリア別の来店数と特性をリアルタイムで' },
      { name: '来店者分析', desc: '期間・時間帯別の来店数・特性・滞在時間' },
      { name: '流入率分析 (saai count)', desc: '通行量に対する来店を流入率（%）で' },
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
      { name: '広告効果 (saai ads)', desc: '店内広告の露出率と関心度をデータ化' },
      { name: 'カスタムレポート', desc: '期間・来店者特性の条件で一括レポート' },
      { name: '購買転換分析', desc: '性別・年齢帯別の購買転換率' },
      { name: 'CSVエクスポート', desc: '分析項目ごとのデータをダウンロード' },
      { name: '複数店舗統合ダッシュボード *', desc: '複数店舗の指標を一画面に' },
      { name: 'エージェンティックAI連携 *', desc: '行動データに売上・在庫・天候まで結合し予測・最適化' },
    ],
    featGroups: ['来店 · 流入', '動線 · エリア', '転換 · 関心', 'レポート · 連携', '拡張（別途協議）'],
    featNote: '※ 複数店舗統合ダッシュボード・エージェンティックAIは別途協議のうえ提供します。',
    installHeading: '導入の進み方',
    installSteps: [
      { step: '初回訪問', desc: '現場環境を確認し、最適な画角の既存CCTVを選定・接続します。' },
      { step: '構成 · 配送', desc: '小型AI分析装置を構成し現場へ配送します。' },
      { step: '2回目訪問', desc: '装置を設置し正常稼働を確認後、ダッシュボードを構成します。' },
    ],
    installNote: '初回訪問から約3週間 — 既存CCTVを最大限活用しコストを抑えます。',
    handoffEyebrow: '分析から実行へ',
    handoffHeading: '理由はinsightが、何をするかはsaai agentが決定します。',
    handoffSub: '昨日と理由は insight が読みます。次に何をするかは saai agent の役目 — すべての推奨はひとつのエンジンから。',
    cardTitle: 'インサイトのアクションカード化',
    cardBody: '滞在2倍？saai insightが原因を特定すれば、saai agentが発注量やタイミングを提案します。',
    cardCta: 'saai agentを見る',
    boundaryLine: 'saai countは外の通行を、saai insightは店内の「なぜ」を、saai agentは次の行動を担当します。',
    finalHeading: '昨日と「なぜ」に、毎朝答えを受け取りましょう',
    finalSub: '既存のCCTVそのまま — 初回訪問から約3週間で開始。',
    finalCta: '導入のご相談',
    seeAgent: 'saai agentを見る',
    alreadyUsing: 'すでに利用中ですか？',
    manual: 'マニュアルを見る →',
  },
};

/** 4대 결정 카드의 시각 앵커 (재정돈 2026-07: 4줄 카드 → 1줄 아이콘 칩). */
const JOB_ICONS: LucideIcon[] = [LayoutGrid, GitCompare, Filter, CheckCheck];

/**
 * 기능 카탈로그 그룹핑 (재정돈 2026-07: 동일 카드 19장 → 5그룹 컴팩트 리스트).
 * idx는 `features` 배열의 순서 — 세 로케일이 같은 순서를 공유한다.
 * 라벨은 dict의 `featGroups`(같은 순서)에서 온다.
 */
const FEAT_GROUPS: { icon: LucideIcon; idx: number[] }[] = [
  { icon: Users, idx: [0, 1, 2, 3] },
  { icon: Route, idx: [4, 5, 6, 7, 8, 9] },
  { icon: MousePointerClick, idx: [10, 11, 12, 15] },
  { icon: FileText, idx: [13, 14, 16] },
  { icon: Blocks, idx: [17, 18] },
];

export default function StoreInsightView({ locale }: { locale: Locale }) {
  const t = C[locale];

  return (
    <div className="bg-white min-h-screen">
      <JsonLd
        data={softwareApplication({
          name: productNaming.insight.saai ?? 'saai insight',
          description: t.heroSub,
          path: '/products/saai-insight',
          locale,
        })}
      />

      {/* ── Beat 1 — Hero — 하단에 대시보드 창 상단이 걸친다(피크) ── */}
      <section className="relative pt-24 lg:pt-32 bg-surface-dark overflow-hidden text-white noise-overlay">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: productNaming.insight.saai ?? 'saai insight', path: '/products/saai-insight' }]} locale={locale} tone="dark" className="mb-6" />

          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-light mb-4">
            <SaaiSymbol className="w-3.5 h-3.5 text-primary-light" />
            ANALYZE · {solutionTaglines.insight[locale]}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep font-display">
            <WordRise text={t.heroTitle[0]} /><br />
            <WordRise text={t.heroTitle[1]} className="text-primary-light" />
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto break-keep mb-10">
            {t.heroSub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={localeHref(locale, '/contact?product=saai-insight')}
              className="btn-primary btn-lg inline-flex items-center justify-center gap-2"
            >
              <span>{t.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#dashboard-section"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl transition-colors"
            >
              <span>{t.ctaSecondary}</span>
            </a>
          </div>

          {/* 대시보드 피크 — 크롬 상단만 보이고 폴드에서 잘린다. #dashboard-section으로 유도 */}
          <a
            href="#dashboard-section"
            aria-label={t.ctaSecondary}
            className="relative mx-auto mt-14 block h-16 max-w-3xl sm:h-20"
          >
            <span className="absolute inset-x-0 top-0 block overflow-hidden rounded-t-2xl border border-white/15 bg-white/[0.06] shadow-elevated backdrop-blur-sm transition-colors hover:bg-white/10">
              <span className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </span>
                <span className="ml-1 text-xs font-bold lowercase text-white/85">{productNaming.insight.store}</span>
                <span className="ml-auto inline-flex items-center gap-1 text-2xs font-medium text-primary-light">
                  {t.ctaSecondary}
                  <ChevronDown className="h-3 w-3" aria-hidden="true" />
                </span>
              </span>
              <span className="block h-24 bg-white/[0.04]" aria-hidden="true" />
            </span>
          </a>
        </div>
      </section>

      {/* ── Beat 2 — 대시보드 목업(위) + 4대 결정 칩(아래) — 재정돈: 목업 우선 ── */}
      <Section variant="default" pad="default" id="dashboard-section">
        <Container>
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <Eyebrow className="mb-2 justify-center">FOR MD & SV LEADERS</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep mb-4">
              {t.jobHeading}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 break-keep">
              {t.jobSub}
            </p>
          </div>

          {/* Core Analytics Dashboard Mockup — 첫 비주얼 */}
          <div className="relative rounded-3xl border border-gray-200 bg-slate-900 p-3 shadow-2xl overflow-hidden mb-10">
            <div className="flex items-center justify-between px-4 py-2 text-xs font-bold text-slate-400 border-b border-slate-800 mb-2">
              <span className="flex items-center gap-1.5"><SaaiSymbol className="w-3.5 h-3.5 text-primary-light" />{t.dashTitle}</span>
              <span>{t.mockupNote}</span>
            </div>
            <StoreInsightDesktopMockup locale={locale} />
          </div>

          {/* 4 Key Decisions — 아이콘 칩 (1줄 desc) */}
          <div className="grid sm:grid-cols-2 gap-4">
            {t.jobs.map((job, i) => {
              const Icon = JOB_ICONS[i] ?? LayoutGrid;
              return (
                <div key={i} className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-card">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-lighter text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-gray-900 break-keep">{job.title}</h3>
                    <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1.5 break-keep">{job.subtitle}</p>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{job.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── Beat 3 — POS × insight 결합 — 재정돈: 텍스트 밴드 → 결합 다이어그램 ── */}
      <AnimatedSection className="py-16 lg:py-20 bg-slate-900 text-white noise-overlay">
        <Container className="max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-light mb-2 block">
            POS INTEGRATION & COMPLEMENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 break-keep">
            &ldquo;{t.posComplementTitle}&rdquo;
          </h2>
          <p className="text-base text-slate-300 leading-relaxed break-keep max-w-2xl mx-auto mb-10">
            {t.posComplementSub}
          </p>
          <PosJoinDiagram locale={locale} />
        </Container>
      </AnimatedSection>

      {/* ── Beat 4 — Proof: 4-Step Funnel & Before/After ── */}
      <Section variant="alt" pad="default">
        <Container>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <Eyebrow className="mb-2 justify-center">PROOF & FUNNEL</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep mb-4">
              {t.funnelHeading}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 break-keep">
              {t.funnelSub}
            </p>
          </div>

          {/* Store-wide behavior funnel — 홈에서 이식한 증거 블록 (§8-2) */}
          <div className="mb-12">
            <InsightFunnelBlock locale={locale} />
          </div>

          {/* Before & After Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-gray-900 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-center break-keep">{t.baHeading}</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xs font-bold uppercase text-rose-400 block mb-3">{t.baBeforeLabel}</span>
                <ul className="space-y-2 text-sm text-slate-300">
                  {t.before.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold shrink-0">✕</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20">
                <span className="text-2xs font-bold uppercase text-primary-light block mb-3">{t.baAfterLabel}</span>
                <ul className="space-y-2 text-sm text-slate-100 font-medium">
                  {t.after.map((a, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 text-center text-2xs text-slate-400">{t.baNote}</p>
          </div>
        </Container>
      </Section>

      {/* ── Beat 5 — Differentiator: Comparison Principle (증거 다음에 원칙) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-900 text-white noise-overlay">
        <Container>
          <ComparisonPrinciple locale={locale} />
        </Container>
      </AnimatedSection>

      {/* ── Beat 6 — Hub Data Band — 구 "매출 연동" 텍스트 밴드를 흡수(중복 삭제) ── */}
      <HubDataBand locale={locale} />

      {/* ── Beat 7 — Installation & Onboarding ── */}
      <Section variant="default" pad="compact">
        <Container className="max-w-4xl">
          <div className="mb-10 text-center">
            <Eyebrow className="mb-2 justify-center">ONBOARDING</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display break-keep">{t.installHeading}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-4">
            {t.installSteps.map((s, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-200 bg-white">
                <span className="text-xs font-bold text-primary uppercase mb-2 block">{s.step}</span>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 break-keep">{t.installNote}</p>
        </Container>
      </Section>

      {/* ── Beat 8 — Handoff: insight → agent ── */}
      <AnimatedSection className="py-20 bg-slate-900 text-white noise-overlay">
        <Container className="max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-light mb-2 block">{t.handoffEyebrow}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 break-keep">{t.handoffHeading}</h2>
            <p className="text-base text-slate-300 max-w-2xl mx-auto break-keep">{t.handoffSub}</p>
          </div>
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{t.cardTitle}</h3>
              <p className="text-sm text-slate-300 leading-relaxed break-keep">{t.cardBody}</p>
            </div>
            <Link
              href={localeHref(locale, '/products/saai-agent')}
              className="btn-primary btn-md inline-flex items-center gap-1.5 shrink-0"
            >
              <span>{t.cardCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </AnimatedSection>

      {/* ── Beat 9 — Feature Catalog — 재정돈: 동일 카드 19장 → 5그룹 컴팩트 리스트 ── */}
      <Section variant="alt" pad="default">
        <Container>
          <div className="mb-10 max-w-2xl">
            <Eyebrow className="mb-2">FEATURE CATALOG</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 break-keep">{t.featHeading}</h2>
            <p className="text-sm text-gray-600 leading-relaxed break-keep">{t.featSub}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {FEAT_GROUPS.map((g, gi) => {
              const Icon = g.icon;
              return (
                <div key={gi} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-card">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-lighter text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 break-keep">{t.featGroups[gi]}</h3>
                    <span className="ml-auto text-2xs font-bold tabular-nums text-gray-300">{g.idx.length}</span>
                  </div>
                  <ul className="space-y-3">
                    {g.idx.map((i) => {
                      const f = t.features[i];
                      return (
                        <li key={i} className="border-l-2 border-gray-100 pl-3">
                          <p className="text-sm font-semibold text-gray-800 break-keep">{f.name}</p>
                          <p className="text-xs text-gray-500 leading-relaxed break-keep">{f.desc}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 break-keep">{t.featNote}</p>
        </Container>
      </Section>

      <ModeFunctionSection mode="insight" locale={locale} />
      <RelatedGlossary
        slugs={['store-heatmap', 'dwell-time', 'footfall-analysis', 'zone-analysis']}
        locale={locale}
      />

      {/* ── Final Primary CTA ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-950 text-white noise-overlay">
        <Container className="text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-light mb-4">
            <SaaiSymbol className="w-3.5 h-3.5 text-primary-light" />
            ENTERPRISE INSIGHT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-display break-keep">
            {t.finalHeading}
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl mx-auto break-keep">
            {t.finalSub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={localeHref(locale, '/contact?product=saai-insight')}
              className="btn-primary btn-lg inline-flex items-center gap-2"
            >
              <span>{t.finalCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={localeHref(locale, '/products/saai-agent')}
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl transition-colors"
            >
              <span>{t.seeAgent}</span>
            </Link>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}
