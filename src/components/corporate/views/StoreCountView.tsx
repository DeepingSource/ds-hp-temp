import SaaiSymbol from '@/components/ui/SaaiSymbol';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import DoorSplitDiagram from '@/components/mockups/DoorSplitDiagram';
import {
  Clock,
  Users,
  UserCircle2,
  TrendingUp,
  Wallet,
  Layers,
  LineChart,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import WordRise from '@/components/ui/WordRise';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { perfectSpace, productNaming, productPrimary } from '@/lib/brand-canon';
import { FunctionModeStrip } from '@/components/corporate/FunctionModeMatrix';

/**
 * StoreCountView — saai count product-detail composition.
 * Rendered by `/products/store-count` (en), `/ko/products/store-count`,
 * `/jp/products/store-count` with the locale prop.
 * Source of truth: StoreCount 리플렛(양면 A4 v2 · 상권분석 퍼널).
 * Narrative: 못 하고 있죠 → 우리가 대신 셉니다 → 무엇을 알 수 있나 →
 * 싸고 간편·여럿 동시·결정 근거 → From Store to Site → 정확도 → 프라이버시 → CTA.
 *
 * REFRAME (reorg Phase 4 · 2026-07-20): under Function × Mode Matrix v1.0 `count` is a
 * FUNCTION, not a fourth product. The URL stays (/products/store-count) so the footfall
 * search equity is kept — no 301 — but the page now says what count is and how all
 * three modes use it, and links out to the function library.
 */

/** count-as-a-function framing. KO from the matrix SOT; EN/JP draft — 검수 대기. */
const COUNT_AS_FUNCTION: Record<Locale, { eyebrow: string; title: string; sub: string; libraryCta: string }> = {
  ko: {
    eyebrow: '기능 × 3모드',
    title: 'count는 기능입니다 — 네 번째 제품이 아닙니다',
    sub: '기능은 한 제품에 속하지 않습니다. 같은 count를 care는 지금으로, insight는 어제로, agent는 다음으로 통과시킵니다.',
    libraryCta: '기능 라이브러리 전체 보기',
  },
  en: {
    eyebrow: 'Function × three modes',
    title: 'count is a function — not a fourth product',
    sub: 'A function does not belong to one product. The same count runs through care as now, through insight as yesterday, and through agent as next.',
    libraryCta: 'See the whole function library',
  },
  jp: {
    eyebrow: '機能 × 3モード',
    title: 'count は機能です — 4番目の製品ではありません',
    sub: '機能は一つの製品に属しません。同じ count を care は「今」として、insight は「昨日」として、agent は「次」として通します。',
    libraryCta: '機能ライブラリをすべて見る',
  },
};

/** OBSERVE 입문 라벨 — count는 루프의 첫 걸음(관찰)이자 saai insight로 가는 다리 (기능페이지 작업문서 v1 §2). */
const ENTRY_NOTE: Record<Locale, string> = {
  ko: 'OBSERVE · 입문 도구 — saai insight로 가는 첫 걸음',
  en: 'OBSERVE · entry tool — the first step toward saai insight',
  jp: 'OBSERVE · 入門ツール — saai insight への第一歩',
};

type Stuck = { tag: string; h: string; d: string };
type Metric = { label: string; desc: string };
type Pillar = { no: string; h: string; d: string; meta: string };
type AccTile = { v: string; label: string; when: string };
type PrivacyItem = { em: string; desc: string };

type Copy = {
  heroEyebrow: string;
  heroTitle: [string, string];
  heroSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  problemHeading: string;
  stuck: [Stuck, Stuck];
  turnKicker: string;
  turnTitle: [string, string];
  turnDesc: string;
  whatHeading: string;
  whatSub: string;
  metrics: [Metric, Metric, Metric, Metric];
  pillarsHeading: string;
  pillarsSub: string;
  pillars: [Pillar, Pillar, Pillar];
  hqKicker: string;
  hqTitle: [string, string];
  hqDesc: string;
  hqVizLabel: string;
  hqVizDash: string;
  accHeading: string;
  accSub: string;
  accBig: string;
  accBigCap: string;
  accTiles: [AccTile, AccTile, AccTile];
  accNote: string;
  installHeading: string;
  installSteps: { step: string; desc: string }[];
  installNote: string;
  privacyTitle: string;
  privacySub: string;
  privacy: [PrivacyItem, PrivacyItem, PrivacyItem];
  finalTitle: string;
  finalSub: string;
  finalCta: string;
  otherProducts: string;
};

const C: Record<Locale, Copy> = {
  ko: {
    heroEyebrow: '상권분석 · 오프라인 현장 데이터',
    heroTitle: ['상권분석, 해야 하는데', '못 하고 계셨죠?'],
    heroSub:
      '방법은 둘 중 하나였습니다 — 사람을 세워 비싸게 세거나, 부담돼 아예 손을 놓거나. saai count는 카메라 한 대로 매장 앞 유동인구부터 들어온 고객, 유입률까지 사람 없이 매일 상시로 셉니다.',
    ctaPrimary: '도입 문의',
    ctaSecondary: '무엇을 알 수 있나',
    problemHeading: '지금까지는, 둘 중 하나였습니다',
    stuck: [
      { tag: '지금 비싸게 하는 곳', h: '사람이 눈으로 셉니다', d: '카운터를 세워 직접 셉니다. 일당 부담에 며칠치 표본이 전부 — 매일, 전 매장을 보는 건 불가능합니다.' },
      { tag: '아예 못 하는 곳', h: '방법도, 예산도 없습니다', d: '통신사 데이터는 매장 단위로 비싸고, 결제 건수는 들어오기 전을 모릅니다. 그래서 시작조차 못 합니다.' },
    ],
    turnKicker: '그래서 — saai count가 대신 셉니다',
    turnTitle: ['매장 앞 유동인구부터,', '들어온 고객까지.'],
    turnDesc: '카메라 한 대로 매장 앞을 지나간 사람과 안으로 들어온 고객, 그리고 유입률까지 — 사람 없이, 매일 상시로 셉니다.',
    whatHeading: '무엇을 알 수 있나',
    whatSub: '지나간 사람을 세기 시작하면, 어제는 비로소 데이터가 됩니다. 유입률(입장 ÷ 통행)이 낮으면 매장의 문제, 통행 자체가 적으면 입지의 문제 — 원인이 갈립니다.',
    metrics: [
      { label: '시간대', desc: '언제 붐비는지' },
      { label: '성별', desc: '방문 구성' },
      { label: '연령', desc: '고객 층위' },
      { label: '유입률', desc: '입점 / 유동인구' },
    ],
    pillarsHeading: '지금까지 못 하던 걸, 이제 합니다',
    pillarsSub: '외주를 쓰든 사람을 쓰든 결국 한 매장의 며칠치 스냅샷입니다. saai count는 전국 매장의 상권을, 매일 이어서 봅니다.',
    pillars: [
      { no: '01', h: '싸고, 간편합니다', d: '외주 상권분석 한 번 값이면, saai count는 매달 상시로.', meta: '월 30만원 대여형 · 전원 1구와 와이파이면 5분 설치 — 공사도, 사람도 없이.' },
      { no: '02', h: '빠르고, 여럿 동시에', d: '한 매장이 아니라 전국 매장을 같은 날, 같은 기준으로.', meta: '표본 며칠이 아니라 매일 — 상시 측정. 매장이 늘어도 기준은 하나.' },
      { no: '03', h: '결정의 근거가 됩니다', d: '매장이 잘 되고 있는지, 상권이 이상해지진 않았는지 — 본사 화면에서.', meta: '번거롭고 비싼 외부 조사 대신, 상시 데이터로 무엇을 바꿀지 정합니다.' },
    ],
    hqKicker: '모든 공간을, 완벽하게 · From Store to Site',
    hqTitle: ['상권의 변화를 읽고,', '다음 매장 전략을.'],
    hqDesc: '관심 매장의 주변 상권이 예전 대비 어떻게 변했는지 — 통행량·연령·성별의 추이를 봅니다. 그 위에서 출점·리뉴얼·타겟 조정까지, 흩어진 매장을 한 매장처럼 결정합니다.',
    hqVizLabel: '전국 매장 — 매일·동시 측정',
    hqVizDash: '본사 대시보드 · 통행량 · 연령 · 성별 추이',
    accHeading: '검증된 정확도',
    accSub: '사람이 직접 센 결과와 비교한 카운팅 정확도입니다.',
    accBig: '95~96%',
    accBigCap: '사람이 직접 센 결과 대비 카운팅 정확도',
    accTiles: [
      { v: '95.8%', label: '편의점', when: '2025 Q1' },
      { v: '96.6%', label: '차량전시장', when: '2025 Q3' },
      { v: '95.1%', label: '복합문화공간', when: '2025 Q2' },
    ],
    accNote: '* 사람이 직접 센 결과 대비 카운팅 정확도 · 각 현장 검증 기준 · 측정 시점은 타일별 표기. 현장 조건에 따라 결과가 달라질 수 있습니다.',
    installHeading: '설치는 6단계, 전원 1구면 됩니다',
    installSteps: [
      { step: '카메라 부착', desc: '흡착 마운트로 벽·유리에 — 대로와 출입구가 한 화면에 담기게' },
      { step: 'AI 박스 연결', desc: '매장 안 전원 콘센트 1구에 꽂으면 자동으로 켜집니다' },
      { step: '핸드폰 연결', desc: '키보드·마우스 없이 핸드폰 브라우저로 바로 설정' },
      { step: '기준선 긋기', desc: '통행 선과 유입 선을 화면 위에 손가락으로' },
      { step: '측정 시작', desc: '버튼 하나로 상시 측정이 시작됩니다' },
      { step: '결과 받기', desc: 'CSV로 내려받아 엑셀에서 바로 엽니다' },
    ],
    installNote: '공사 없이 흡착 마운트로 고정합니다. 장기 측정은 상시 전원 연결을 권장합니다.',
    privacyTitle: 'Privacy by Design',
    privacySub: '익명화가 1번입니다 — SEAL 엔진',
    privacy: [
      { em: '영상 저장 X', desc: '분석 후 삭제, 통계값만' },
      { em: '원본 보관 X', desc: '원본은 남기지 않음' },
      { em: '개인 식별 X', desc: '신원 지우고 흐름만' },
    ],
    finalTitle: '상권분석, 이제 미루지 마세요.',
    finalSub: '매장 하나로 시작해, 전국을 한 화면으로 — 카메라 한 대면 됩니다.',
    finalCta: '도입 문의',
    otherProducts: '다른 제품 보기',
  },
  en: {
    heroEyebrow: 'Trade-area analytics · on-the-ground data',
    heroTitle: ['Trade-area analysis you knew you needed,', 'but never could.'],
    heroSub:
      'There were only two options — pay people to count by eye, or give up entirely. saai count counts the footfall passing your store, the customers who walk in, and your capture rate — from a single camera, every day, with no staff.',
    ctaPrimary: 'Talk to us',
    ctaSecondary: 'What you get',
    problemHeading: 'Until now, it was one of two',
    stuck: [
      { tag: 'The expensive way', h: 'People count by eye', d: 'You station counters to tally by hand. Day-rate costs cap you at a few days of sampling — counting every store, every day is impossible.' },
      { tag: 'The no way', h: 'No method, no budget', d: 'Carrier data is expensive per store, and payment counts miss everyone who never came in. So it never even starts.' },
    ],
    turnKicker: 'So — saai count counts for you',
    turnTitle: ['From the footfall outside,', 'to the customers inside.'],
    turnDesc: 'One camera counts who passes your store, who walks in, and your capture rate — with no staff, every single day.',
    whatHeading: 'What you get',
    whatSub: 'Once you start counting who passed by, yesterday finally becomes data. A low capture rate (entries ÷ footfall) points to a store problem; low footfall points to a location problem.',
    metrics: [
      { label: 'Time of day', desc: 'When it gets busy' },
      { label: 'Gender', desc: 'Visit mix' },
      { label: 'Age', desc: 'Customer tiers' },
      { label: 'Capture rate', desc: 'Entries / footfall' },
    ],
    pillarsHeading: 'What you could not do before, you do now',
    pillarsSub: 'Whether you outsource or staff it, it ends up a few-day snapshot of one store. saai count reads the trade area of every store, day after day.',
    pillars: [
      { no: '01', h: 'Cheap and simple', d: 'For the price of one outsourced study, saai count runs every month.', meta: 'Rental from 300K KRW/mo · 5-minute setup with one outlet and Wi-Fi — no construction, no staff.' },
      { no: '02', h: 'Fast, many at once', d: 'Not one store but every store, same day, same standard.', meta: 'Not a few days of sampling but daily, always-on. One standard, however many stores.' },
      { no: '03', h: 'A basis for decisions', d: 'Whether a store is doing well, whether its trade area is shifting — on the HQ screen.', meta: 'Instead of costly one-off surveys, decide what to change on always-on data.' },
    ],
    hqKicker: 'Every store as one · From Store to Site',
    hqTitle: ['Read how the trade area shifts,', 'set the next-store strategy.'],
    hqDesc: 'See how a store’s surrounding trade area has changed versus before — trends in footfall, age, and gender. On top of that, decide openings, renewals, and targeting, running scattered stores as one.',
    hqVizLabel: 'Every store — measured daily, together',
    hqVizDash: 'HQ dashboard · footfall · age · gender trends',
    accHeading: 'Proven accuracy',
    accSub: 'Counting accuracy compared against a manual hand count.',
    accBig: '95–96%',
    accBigCap: 'Counting accuracy vs. a manual hand count',
    accTiles: [
      { v: '95.8%', label: 'Convenience store', when: '2025 Q1' },
      { v: '96.6%', label: 'Car showroom', when: '2025 Q3' },
      { v: '95.1%', label: 'Cultural complex', when: '2025 Q2' },
    ],
    accNote: '* Counting accuracy vs. our own manual hand count · per-site verification · measurement period noted per tile. Results may vary with on-site conditions.',
    installHeading: 'Six steps to install — one outlet is all it takes',
    installSteps: [
      { step: 'Mount the camera', desc: 'Suction mount on a wall or glass — street and entrance in one frame' },
      { step: 'Plug in the AI box', desc: 'One indoor outlet; it powers up on its own' },
      { step: 'Connect your phone', desc: 'No keyboard or mouse — set up right from the phone browser' },
      { step: 'Draw the lines', desc: 'Trace the footfall and entry lines on screen with a finger' },
      { step: 'Start measuring', desc: 'One button starts always-on measurement' },
      { step: 'Get the results', desc: 'Download as CSV and open straight in a spreadsheet' },
    ],
    installNote: 'No construction — the suction mount holds it. For long-running measurement, wire to constant power.',
    privacyTitle: 'Privacy by Design',
    privacySub: 'Anonymization comes first — the SEAL engine',
    privacy: [
      { em: 'No video stored', desc: 'Deleted after analysis, stats only' },
      { em: 'No originals kept', desc: 'Source footage is never retained' },
      { em: 'No re-identification', desc: 'Identity removed, flow only' },
    ],
    finalTitle: 'Stop putting off trade-area analysis.',
    finalSub: 'Start with one store, see the whole country on one screen — one camera is all it takes.',
    finalCta: 'Talk to us',
    otherProducts: 'See other products',
  },
  jp: {
    heroEyebrow: '商圏分析 · オフライン現場データ',
    heroTitle: ['商圏分析、やるべきなのに', 'できていませんでしたよね？'],
    heroSub:
      '方法は二つに一つでした — 人を立てて高く数えるか、負担で手を止めるか。saai count はカメラ1台で、店前の通行人から入店客、流入率まで、人手なしで毎日常時数えます。',
    ctaPrimary: '導入のお問い合わせ',
    ctaSecondary: '何がわかるか',
    problemHeading: 'これまでは、二つに一つでした',
    stuck: [
      { tag: '今、高く行うところ', h: '人が目で数えます', d: 'カウンターを立てて手で数えます。日当の負担で数日分のサンプルが精一杯 — 毎日、全店舗を見るのは不可能です。' },
      { tag: 'まったくできないところ', h: '方法も、予算もありません', d: '通信会社データは店舗単位で高く、決済件数は入店前を捉えません。だから始めることすらできません。' },
    ],
    turnKicker: 'だから — saai count が代わりに数えます',
    turnTitle: ['店前の通行人から、', '入ってきたお客様まで。'],
    turnDesc: 'カメラ1台で、店前を通り過ぎた人と中に入ったお客様、そして流入率まで — 人手なしで、毎日常時数えます。',
    whatHeading: '何がわかるか',
    whatSub: '通り過ぎた人を数え始めると、昨日がはじめてデータになります。流入率（入店 ÷ 通行）が低ければ店舗の問題、通行そのものが少なければ立地の問題 — 原因が分かれます。',
    metrics: [
      { label: '時間帯', desc: 'いつ混むか' },
      { label: '性別', desc: '来店構成' },
      { label: '年齢', desc: '顧客層' },
      { label: '流入率', desc: '入店 / 通行人' },
    ],
    pillarsHeading: 'これまでできなかったことを、いまできます',
    pillarsSub: '外注でも人手でも、結局は一店舗の数日分のスナップショットです。saai count は全国店舗の商圏を、毎日続けて見ます。',
    pillars: [
      { no: '01', h: '安く、手軽です', d: '外注の商圏分析一回分で、saai count は毎月常時。', meta: '月30万 KRW のレンタル型 · 電源1口とWi-Fiで5分設置 — 工事も、人手も不要。' },
      { no: '02', h: '速く、同時に多数', d: '一店舗ではなく全国店舗を、同じ日に、同じ基準で。', meta: '数日のサンプルではなく毎日 — 常時測定。店舗が増えても基準は一つ。' },
      { no: '03', h: '意思決定の根拠に', d: '店舗が好調か、商圏が変調していないか — 本部の画面で。', meta: '面倒で高い外部調査の代わりに、常時データで何を変えるかを決めます。' },
    ],
    hqKicker: 'すべての店舗をひとつの店舗のように · From Store to Site',
    hqTitle: ['商圏の変化を読み、', '次の出店戦略を。'],
    hqDesc: '注目店舗の周辺商圏が以前と比べどう変わったか — 通行量・年齢・性別の推移を見ます。その上で出店・リニューアル・ターゲット調整まで、散らばった店舗を一店舗のように決めます。',
    hqVizLabel: '全国店舗 — 毎日・同時測定',
    hqVizDash: '本部ダッシュボード · 通行量 · 年齢 · 性別の推移',
    accHeading: '検証済みの精度',
    accSub: '人が直接数えた結果と比較したカウント精度です。',
    accBig: '95〜96%',
    accBigCap: '人が直接数えた結果に対するカウント精度',
    accTiles: [
      { v: '95.8%', label: 'コンビニ', when: '2025 Q1' },
      { v: '96.6%', label: '自動車ショールーム', when: '2025 Q3' },
      { v: '95.1%', label: '複合文化空間', when: '2025 Q2' },
    ],
    accNote: '* 人が直接数えた結果に対するカウント精度 · 各現場の検証基準 · 測定時点はタイル別に表記。現場条件により結果は変わり得ます。',
    installHeading: '設置は6ステップ、電源1口だけ',
    installSteps: [
      { step: 'カメラを取り付け', desc: '吸着マウントで壁・ガラスに — 通りと入口をひとつの画面に' },
      { step: 'AIボックスを接続', desc: '店内のコンセント1口に挿すだけで自動起動' },
      { step: 'スマホを接続', desc: 'キーボード・マウス不要、スマホのブラウザでそのまま設定' },
      { step: '基準線を引く', desc: '通行ラインと流入ラインを画面上で指でなぞる' },
      { step: '測定開始', desc: 'ボタンひとつで常時測定が始まります' },
      { step: '結果を受け取る', desc: 'CSVでダウンロードし、表計算ソフトですぐ開けます' },
    ],
    installNote: '工事は不要 — 吸着マウントで固定します。長期間の測定は常時電源への接続をおすすめします。',
    privacyTitle: 'Privacy by Design',
    privacySub: '匿名化が1番です — SEAL エンジン',
    privacy: [
      { em: '映像保存なし', desc: '分析後に削除、統計値のみ' },
      { em: '原本保管なし', desc: '原本は残しません' },
      { em: '個人特定不可', desc: '身元を消し、流れだけ' },
    ],
    finalTitle: '商圏分析、もう後回しにしないでください。',
    finalSub: '一店舗から始めて、全国を一画面に — カメラ1台あれば十分です。',
    finalCta: '導入のお問い合わせ',
    otherProducts: '他の製品を見る',
  },
};

export default function StoreCountView({ locale }: { locale: Locale }) {
  const t = C[locale];
  const metricIcons = [Clock, Users, UserCircle2, TrendingUp];
  const pillarIcons = [Wallet, Layers, LineChart];

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={softwareApplication({ name: productPrimary('count'), alternateName: productNaming.count.store, description: t.heroSub, path: '/products/store-count', locale })} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-16 lg:pt-40 lg:pb-20 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: productPrimary('count'), path: '/products/store-count' }]} locale={locale} tone="light" className="mb-6 justify-center" />
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter border border-primary/10 rounded-full text-sm text-primary font-medium mb-6">
            <SaaiSymbol className="w-4 h-4 text-primary" />
            {productPrimary('count')} · {t.heroEyebrow}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-6">
            <WordRise text={t.heroTitle[0]} /><br /><WordRise text={t.heroTitle[1]} className="text-primary" />
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto break-keep mb-4">
            {t.heroSub}
          </p>
          <p className="mb-10 text-sm font-medium text-primary break-keep">{ENTRY_NOTE[locale]}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg">
              {t.ctaPrimary}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="#what" className="inline-flex items-center justify-center px-7 py-4 text-base font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
              {t.ctaSecondary}
            </a>
          </div>
          <div className="mt-14 mx-auto max-w-3xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card bg-slate-900">
              <Image
                src="/images/cctv/cctv-hero-cvs-topdown.webp"
                alt={t.turnDesc}
                fill
                priority
                sizes="(min-width:768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-gray-400 text-center break-keep">{t.privacy[2].em} · {t.privacy[2].desc}</p>
          </div>
        </div>
      </section>

      {/* ── count는 기능이다 — 3모드에서의 쓰임 (재정돈 Phase 4 · Matrix v1.0) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide">{COUNT_AS_FUNCTION[locale].eyebrow}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep mb-3">
            {COUNT_AS_FUNCTION[locale].title}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed break-keep mb-10 max-w-2xl">
            {COUNT_AS_FUNCTION[locale].sub}
          </p>
          <FunctionModeStrip fn="count" locale={locale} />
          <Link
            href={localeHref(locale, '/products/functions')}
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {COUNT_AS_FUNCTION[locale].libraryCta}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </AnimatedSection>

      {/* ── 문 밖 ↔ 문 안 (count ↔ insight 경계, D4) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <DoorSplitDiagram locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── Problem: two stuck states ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center break-keep">{t.problemHeading}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.stuck.map((s) => (
              <div key={s.h} className="rounded-2xl border border-gray-200 bg-white p-7">
                <span className="inline-block text-xs font-bold tracking-wide text-red-700 bg-red-50 border border-red-100 rounded-full px-3 py-1 mb-4">{s.tag}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.h}</h3>
                <p className="text-base text-gray-500 leading-relaxed break-keep">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── The turn ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-surface-navy text-white px-8 py-12 lg:px-12 lg:py-16 text-center">
            <p className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-primary-light mb-3">{t.turnKicker}</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight break-keep mb-5">
              {t.turnTitle[0]}<br /><span className="text-white">{t.turnTitle[1]}</span>
            </h2>
            <p className="text-base sm:text-lg text-primary-lighter/90 leading-relaxed max-w-2xl mx-auto break-keep">{t.turnDesc}</p>
          </div>
        </div>
      </AnimatedSection>

      {/* ── What you get: 4 metrics ── */}
      <AnimatedSection id="what" className="py-16 lg:py-24 bg-white scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{t.whatHeading}</h2>
            <p className="text-base text-gray-500 break-keep">{t.whatSub}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {t.metrics.map((m, i) => {
              const Icon = metricIcons[i];
              return (
                <div key={m.label} className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
                  <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-base font-bold text-gray-900">{m.label}</div>
                  <div className="text-sm text-gray-500 mt-1 break-keep">{m.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ── 3 pillars ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{t.pillarsHeading}</h2>
            <p className="text-base text-gray-500 leading-relaxed break-keep">{t.pillarsSub}</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {t.pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <div key={p.no} className="rounded-2xl border border-gray-200 bg-white p-7 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold tracking-widest text-primary-light">{p.no}</span>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{p.h}</h3>
                  <p className="text-base text-gray-500 leading-relaxed break-keep">{p.d}</p>
                  <p className="mt-4 pt-4 border-t border-dashed border-gray-200 text-sm text-gray-600 leading-relaxed break-keep">{p.meta}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ── 설치 6단계 (설치·사용 설명서 v3) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center break-keep">{t.installHeading}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {t.installSteps.map((s, i) => (
              <div key={s.step} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/60">
                <p className="text-2xs font-mono font-medium text-primary mb-2">0{i + 1}</p>
                <p className="text-sm font-bold text-gray-900 mb-1">{s.step}</p>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-gray-500 break-keep">{t.installNote}</p>
        </div>
      </AnimatedSection>

      {/* ── From Store to Site (HQ band) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-primary/15 bg-primary-lighter/60 p-8 lg:p-12 grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-primary mb-3">{t.hqKicker}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight break-keep mb-4">
                {t.hqTitle[0]}<br /><span className="text-primary">{t.hqTitle[1]}</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed break-keep">{t.hqDesc}</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-primary/15 bg-white shadow-card">
                <Image
                  src="/images/industries/convenience-dashboard.webp"
                  alt={t.hqVizDash}
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-gray-500 text-center break-keep">{t.hqVizLabel}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Accuracy ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{t.accHeading}</h2>
            <p className="text-base text-gray-500 break-keep">{t.accSub}</p>
          </div>
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-none">{t.accBig}</div>
              <div className="text-sm text-gray-600 font-medium mt-3 break-keep">{t.accBigCap}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {t.accTiles.map((tile) => (
                <div key={tile.label} className="rounded-2xl border border-gray-200 bg-white p-5 text-center">
                  <div className="text-2xl font-bold text-primary tracking-tight">{tile.v}</div>
                  <div className="text-sm font-bold text-gray-900 mt-2 break-keep">{tile.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{tile.when}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mt-6 break-keep">{t.accNote}</p>
        </div>
      </AnimatedSection>

      {/* ── Privacy by Design ── */}
      <AnimatedSection className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-primary/15 bg-primary-lighter/50 p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-start gap-3 shrink-0">
              <ShieldCheck className="w-6 h-6 text-primary mt-0.5" />
              <div>
                <div className="text-base font-bold text-primary leading-tight">{t.privacyTitle}</div>
                <div className="text-sm text-gray-500 mt-1 break-keep">{t.privacySub}</div>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-5 lg:ml-auto w-full lg:w-auto">
              {t.privacy.map((p) => (
                <div key={p.em}>
                  <div className="text-sm font-bold text-primary">{p.em}</div>
                  <div className="text-xs text-gray-500 mt-1 break-keep">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Final CTA ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-bold tracking-[0.18em] uppercase text-primary mb-3">{perfectSpace.your[locale]}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{t.finalTitle}</h2>
          <p className="text-gray-500 text-lg mb-9 break-keep">{t.finalSub}</p>
          <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg gap-2">
            {t.finalCta}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-6 text-sm text-gray-500">
            <Link href={localeHref(locale, '/products')} className="text-primary hover:text-primary-dark transition-colors">
              {t.otherProducts}
            </Link>
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
