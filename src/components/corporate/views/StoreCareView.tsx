import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StoreCareDeviceTabs from '@/components/corporate/views/StoreCareDeviceTabs';
import HqRollupDashboardMockup from '@/components/mockups/HqRollupDashboardMockup';
import { Store, ArrowUpRight, ShieldCheck, Eye, Bell } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines, productNaming, productPrimary } from '@/lib/brand-canon';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import WordRise from '@/components/ui/WordRise';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import ModeFunctionSection from '@/components/corporate/ModeFunctionSection';

/**
 * StoreCareView — shared saai care product-detail composition.
 * Rendered by `/products/saai-care` (en), `/ko/products/saai-care`,
 * `/jp/products/saai-care` with the locale prop. Product name stays identical.
 * External CTAs keep storecare.ai.
 */

const C: Record<Locale, {
  heroTitle: string;
  heroSub: string;
  heroCta: string;
  heroPrice: string;
  mockupHeading: string;
  mockupSub: string;
  mockupNote: string;
  mockupTabs: { store: string; phone: string };
  scenariosHeading: string;
  scenariosSub: string;
  scenarios: string[];
  values: { title: string; desc: string }[];
  valueCta: string;
  valueNote: [string, string];
  otherProducts: string;
  entEyebrow: string;
  entHeadline: string;
  entSub: string;
  entPillars: { title: string; desc: string }[];
  entPrivacy: string;
  entCtaHq: string;
  entCtaOwner: string;
  entDashAria: string;
}> = {
  ko: {
    heroTitle: '누가 일해도, 언제나 완벽한 매장.',
    heroSub: '인건비는 오르고 사람 구하긴 어렵죠. saai care는 24시간 매장을 대신 지켜보는 눈 — 공간에 직원 한 명이 더 있는 셈입니다. 빈 매대도, 바닥 오염도, 냉장고 문 열림도, 채워야 할 그 순간을 짚어드려요.',
    heroCta: 'saai care 시작하기',
    heroPrice: '월 14,900원부터 · storecare.ai에서 운영돼요',
    mockupHeading: '필요한 순간만, 손안으로',
    mockupSub: '하루 1,247건 쏟아지는 알림 대신 — 정작 필요한 세 건만 골라 휴대폰으로 바로 알려드려요.',
    mockupNote: '* AI 분석 예시 화면이에요.',
    mockupTabs: { store: '매장이 보는 것', phone: '내 손에 오는 것' },
    scenariosHeading: '이런 순간을, 놓치지 않아요',
    scenariosSub: '고객이 떠난 뒤에야 알게 되는 진열, 퇴근 후엔 확인할 수 없는 온도, 녹화만 되고 들여다볼 시간 없는 CCTV — saai care가 대신 살핍니다.',
    scenarios: ['빈 매대', '냉장고 문 열림', '바닥 오염', '심야 이상 상황'],
    values: [
      { title: '24시간, 직원 한 명 더', desc: '매장을 비워도 괜찮아요. saai care가 곳곳을 대신 지켜봐요.' },
      { title: '필요한 세 건만', desc: '빈 매대·바닥 오염·냉장고 문 열림·심야 이상 상황까지, 손쓸 순간만 콕 짚어 알려줘요.' },
      { title: '대응 시간이 줄어요', desc: '진열 공백 대응 45분→15분, 오염 대응 30분→8분 — 자사 실험 매장 기준 예시예요. 빠른 대응이 매출과 경험을 지켜요.' },
    ],
    valueCta: 'storecare.ai 바로가기',
    valueNote: ['saai care는 DeepingSource의 사장님용 서비스로, 별도 사이트 storecare.ai에서 운영됩니다.', ''],
    otherProducts: '다른 제품 보기',
    entEyebrow: '다점포 본사를 위한 · 손실예방 & 컴플라이언스',
    entHeadline: '모든 매장을 같은 기준으로 지켜봅니다 — 한 화면에서.',
    entSub: 'saai care는 도난·위생·설비를 모든 매장에서 같은 눈으로 살피고, 모든 알림을 본사로 모읍니다. 원본 영상은 남기지 않습니다.',
    entPillars: [
      { title: '표준화된 손실예방', desc: '도난과 영업 외 시간 이상 징후를, 그날 누가 근무하든 같은 기준으로 감지합니다. 여러 매장에서 반복되는 패턴은 본사 화면에 떠오릅니다. 개별 사건이 아니라 추세에 대응하세요.' },
      { title: '위생·설비, 기록으로', desc: '냉장 온도, 바닥 누수, 막힌 비상구, 열린 문 — 24시간 점검하고 시각을 남깁니다. "아마 괜찮겠지"를 보여줄 수 있는 감사 증빙으로 바꿉니다.' },
      { title: '전 매장을 한 화면에', desc: 'store count·saai insight처럼 saai care도 본사로 모입니다. 사고 건수로 매장을 정렬하고, 방문이 필요한 곳을 가려내고, 작은 실수가 리콜이 되기 전에 개입하세요.' },
    ],
    entPrivacy: 'SEAL이 촬영하는 순간 익명화합니다. 원본은 저장하지 않고 신원은 즉시 지워지며, 사건만 남습니다. 프라이버시를 내주지 않고도 지켜내는 컴플라이언스.',
    entCtaHq: '다점포 도입 상담하기',
    entCtaOwner: '한 매장만 운영하세요? storecare.ai에서 시작',
    entDashAria: '전국 매장의 이상 감지·위생/온도 컴플라이언스·매장 랭킹·실시간 알림을 한 화면에 보여주는 saai care 본사 대시보드',
  },
  en: {
    heroTitle: 'Always the perfect store — no matter who’s on shift.',
    heroSub: 'Labor costs climb, good help is hard to find. saai care is a second set of eyes on your store, 24/7 — like one more employee on the floor. Empty shelves, a dirty aisle, a fridge door left open: it catches the moment that needs you.',
    heroCta: 'Get started with saai care',
    heroPrice: 'From 14,900 KRW/month · Operated on storecare.ai',
    mockupHeading: 'Only the moments that matter — in your hand',
    mockupSub: 'Most tools flood you with 1,247 alerts a day. saai care surfaces the three that actually need you, straight to your phone.',
    mockupNote: '* Sample AI analysis screen.',
    mockupTabs: { store: 'What the store sees', phone: 'What reaches you' },
    scenariosHeading: 'It won’t miss moments like these',
    scenariosSub: 'Displays you only hear about after the customer walks out, temperatures you can’t check after closing, CCTV that records but never gets watched — saai care keeps watch for you.',
    scenarios: ['Empty shelf', 'Fridge door open', 'Floor spill', 'After-hours anomaly'],
    values: [
      { title: 'One more employee, 24/7', desc: 'Leave the floor with confidence. saai care keeps watch across the whole store.' },
      { title: 'Just the three that matter', desc: 'Empty shelves, a dirty aisle, an open fridge door, after-hours anomalies — it flags the moment to act, and only that.' },
      { title: 'Faster response', desc: 'Restock response 45→15 min, cleanup 30→8 min — illustrative figures from our own test stores. Acting sooner protects sales and the customer experience.' },
    ],
    valueCta: 'Go to storecare.ai',
    valueNote: ['saai care is DeepingSource’s service for store owners, operated on the separate site storecare.ai.', ''],
    otherProducts: 'See other products',
    entEyebrow: 'For multi-store HQ · loss prevention & compliance',
    entHeadline: 'Every store watched to the same standard — from one screen.',
    entSub: 'saai care puts the same trained eye on theft, hygiene, and equipment in every location — and rolls every alert up to headquarters. No raw footage, ever.',
    entPillars: [
      { title: 'Loss prevention, standardized', desc: "Theft and after-hours anomalies caught by one consistent standard in every store — not the judgment of whoever's on shift. Patterns that repeat across locations surface on the HQ screen, so you act on the trend, not just the incident." },
      { title: 'Hygiene & equipment, on the record', desc: 'Fridge temperatures, floor spills, blocked exits, doors left open — checked around the clock and time-stamped. Turn "we\'re pretty sure it\'s fine" into an audit trail you can show.' },
      { title: 'The whole fleet, one screen', desc: 'Like store count and saai insight, saai care rolls up to HQ. Rank stores by incidents, see which sites need a visit, and step in before a small lapse becomes a recall.' },
    ],
    entPrivacy: 'Anonymized at the point of capture by SEAL. No footage is stored and identities are erased on the spot — only the events are kept. Compliance you can defend, without trading away privacy to get it.',
    entCtaHq: 'Talk to us about a fleet rollout',
    entCtaOwner: 'Running a single store? Start on storecare.ai',
    entDashAria: 'saai care HQ dashboard: fleet-wide incidents, hygiene and temperature compliance, store ranking and a live alert feed across stores.',
  },
  jp: {
    heroTitle: '誰が働いても、いつも完璧な店舗。',
    heroSub: '人件費は上がり、人手は集まりにくい時代です。saai care は24時間、店舗を代わりに見守る目 — 売り場にもう一人スタッフがいるようなもの。空いた棚も、床の汚れも、冷蔵庫の扉の開けっ放しも、手を打つべきその瞬間をお知らせします。',
    heroCta: 'saai care を始める',
    heroPrice: '月額14,900 KRWから · storecare.ai で運営しています',
    mockupHeading: '必要な瞬間だけ、手のひらに',
    mockupSub: '1日1,247件あふれる通知ではなく — 本当に必要な3件だけを選んで、スマートフォンへすぐにお知らせします。',
    mockupNote: '※ AI分析のサンプル画面です。',
    mockupTabs: { store: '店舗が見ているもの', phone: '手元に届くもの' },
    scenariosHeading: 'こんな瞬間を、見逃しません',
    scenariosSub: 'お客様が帰ったあとに気づく陳列、退勤後には確かめられない温度、録画されるだけで見る時間のないCCTV — saai care が代わりに見守ります。',
    scenarios: ['空いた棚', '冷蔵庫の扉開き', '床の汚れ', '深夜の異常'],
    values: [
      { title: '24時間、もう一人のスタッフ', desc: '店舗を離れても大丈夫。saai care がすみずみを代わりに見守ります。' },
      { title: '必要な3件だけ', desc: '空いた棚・床の汚れ・冷蔵庫の扉開き・深夜の異常まで、手を打つべき瞬間だけを的確にお知らせします。' },
      { title: '対応時間が短くなる', desc: '陳列の空白対応は45分→15分、汚れ対応は30分→8分 — 自社実験店舗ベースの例です。早い対応が売上と体験を守ります。' },
    ],
    valueCta: 'storecare.ai へ',
    valueNote: ['saai care は DeepingSource の店主向けサービスで、別サイトの storecare.ai で運営しています。', ''],
    otherProducts: '他の製品を見る',
    entEyebrow: '多店舗本部向け · 防損 & コンプライアンス',
    entHeadline: 'すべての店舗を同じ基準で見守る — ひとつの画面で。',
    entSub: 'saai care は盗難・衛生・設備をすべての店舗で同じ目で見張り、すべてのアラートを本部に集約します。元映像は残しません。',
    entPillars: [
      { title: '標準化された防損', desc: '盗難や営業時間外の異常の兆候を、その日に誰が勤務していても同じ基準で検知します。複数店舗で繰り返すパターンは本部の画面に浮かび上がります。個別の事件ではなく、傾向に対応してください。' },
      { title: '衛生・設備を記録に', desc: '冷蔵温度、床の水漏れ、塞がれた非常口、開いたままの扉 — 24時間点検し、時刻を残します。「たぶん大丈夫」を、提示できる監査証跡に変えます。' },
      { title: '全店舗をひとつの画面に', desc: 'store count・saai insight と同じく、saai care も本部に集約します。事故件数で店舗を並べ、訪問が必要な場所を見極め、小さな見落としがリコールになる前に対処してください。' },
    ],
    entPrivacy: 'SEAL が撮影する瞬間に匿名化します。原本は保存せず、身元は即座に消え、事象だけが残ります。プライバシーを手放さずに守るコンプライアンス。',
    entCtaHq: '多店舗導入のご相談',
    entCtaOwner: '一店舗のみの運営ですか? storecare.ai で開始',
    entDashAria: '全国店舗の異常検知・衛生/温度コンプライアンス・店舗ランキング・リアルタイムアラートをひとつの画面で示す saai care 本部ダッシュボード',
  },
};

/** 탐지 시나리오 대표 CCTV 컷 (로케일 무관) — 라벨 순서와 1:1 대응 */
const SCENARIO_IMGS = [
  '/images/cctv/cctv-hero-shelf-empty.webp',
  '/images/cctv/cctv-hero-fridge-open.webp',
  '/images/cctv/cctv-contam-floor-spill.webp',
  '/images/cctv/cctv-intrusion-night-ir.webp',
];

/**
 * 감지 항목 카탈로그 — care가 '지금(DETECT)' 잡아내는 항목들. keep(손실 방지)·shelf(매대·재고)는
 * 기능 라이브러리에서 care 감지 항목으로 편입(기능페이지 작업문서 v1 §6). 신원이 아니라 위험·상태만.
 */
const DETECTION_CATALOG: Record<Locale, { eyebrow: string; title: string; sub: string; items: { name: string; desc: string }[] }> = {
  ko: {
    eyebrow: '감지 항목',
    title: '무엇을 감지하나',
    sub: '실시간(지금)으로 잡아내는 항목들 — 신원이 아니라 위험·상태만 봅니다.',
    items: [
      { name: '손실 방지', desc: '이상 행동·이탈·분실 위험을 실시간으로 감지합니다. 신원이 아니라 위험 행동만.' },
      { name: '매대·재고', desc: '결품·흐트러짐·가격표 오류·오염을 실시간으로 감지합니다.' },
      { name: '위생·설비', desc: '냉장 온도 이탈·청결 상태·설비 이상을 실시간으로 감지합니다.' },
      { name: '안전·이상 상황', desc: '넘어짐·정체·비정상 동선 등 개입이 필요한 순간을 감지합니다.' },
    ],
  },
  en: {
    eyebrow: 'What it detects',
    title: 'The detection catalog',
    sub: 'Caught live (now) — never identity, only risk and state.',
    items: [
      { name: 'Loss prevention', desc: 'Abnormal behavior, walk-outs and shrink risk, detected live. Never who — only the risky action.' },
      { name: 'Shelf & stock', desc: 'Out-of-stock, disarray, price-tag errors and spills, detected live.' },
      { name: 'Hygiene & equipment', desc: 'Fridge-temperature drift, cleanliness and equipment faults, detected live.' },
      { name: 'Safety & incidents', desc: 'Falls, congestion and abnormal paths — the moments that need a person.' },
    ],
  },
  jp: {
    eyebrow: '検知項目',
    title: '何を検知するか',
    sub: 'リアルタイム(今)で捉える項目 — 身元ではなく、リスク・状態だけを見ます。',
    items: [
      { name: '防損', desc: '異常行動・離脱・紛失リスクをリアルタイムに検知します。身元ではなく、危険な行動だけを。' },
      { name: '棚・在庫', desc: '欠品・乱れ・価格表示の誤り・汚れをリアルタイムに検知します。' },
      { name: '衛生・設備', desc: '冷蔵温度の逸脱・清潔状態・設備の異常をリアルタイムに検知します。' },
      { name: '安全・異常', desc: '転倒・滞留・不自然な動線など、介入が必要な瞬間を検知します。' },
    ],
  },
};

export default function StoreCareView({ locale }: { locale: Locale }) {
  const t = C[locale];

  const valueIcons = [Eye, Bell, ShieldCheck];

  return (
    <>
      <JsonLd data={softwareApplication({ name: productPrimary('care'), alternateName: productNaming.care.store, description: t.heroSub, path: '/products/saai-care', locale })} />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-16 lg:pt-40 lg:pb-20 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: productPrimary('care'), path: '/products/saai-care' }]} locale={locale} tone="light" className="mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter border border-primary/10 rounded-full text-sm text-primary font-medium mb-6">
            <Store className="w-4 h-4" />
            {productPrimary('care')}
            <span className="font-normal text-primary/55">· {productNaming.care.store} · storecare.ai</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-6">
            <WordRise text={t.heroTitle} />
          </h1>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">
            {solutionTaglines.care[locale]}
          </p>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto break-keep mb-10">
            {t.heroSub}
          </p>
          <a
            href="https://storecare.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-lg"
          >
            {t.heroCta}
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </a>
          <p className="mt-4 text-sm text-gray-500">{t.heroPrice}</p>
        </div>
      </section>

      {/* ── 엔터프라이즈 — 다점포 본사 (HQ 롤업, dual-face) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase break-keep">{t.entEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.entHeadline}</h2>
            <p className="text-lg text-gray-600 leading-relaxed break-keep">{t.entSub}</p>
          </div>

          <div className="mb-10">
            <HqRollupDashboardMockup locale={locale} ariaLabel={t.entDashAria} />
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {t.entPillars.map((p, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6">
                <span className="text-2xs font-mono font-medium text-gray-400">0{i + 1}</span>
                <h3 className="mt-2 text-base font-bold text-gray-900 mb-2 break-keep">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{p.desc}</p>
              </div>
            ))}
          </div>

          <p className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-white p-5 text-sm text-gray-600 leading-relaxed break-keep mb-8">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            {t.entPrivacy}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={localeHref(locale, '/contact') + '?product=StoreCare'} className="btn-primary">
              {t.entCtaHq}
            </Link>
            <a
              href="https://storecare.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 text-sm font-bold text-gray-700 border border-gray-300 rounded-xl hover:border-primary hover:text-primary transition-colors"
            >
              {t.entCtaOwner}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 목업 미리보기 (실시간 알림 화면) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">
              {t.mockupHeading}
            </h2>
            <p className="text-base text-gray-500 break-keep">
              {t.mockupSub}
            </p>
          </div>
          <StoreCareDeviceTabs locale={locale} labels={t.mockupTabs} />
          <p className="mt-6 text-center text-xs text-gray-500 break-keep">
            {t.mockupNote}
          </p>
        </div>
      </AnimatedSection>

      {/* ── 탐지 시나리오 (무엇을 잡아내는가) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{t.scenariosHeading}</h2>
            <p className="text-base text-gray-500 leading-relaxed break-keep">{t.scenariosSub}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {t.scenarios.map((label, i) => (
              <div key={label} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="relative aspect-[16/9] w-full bg-slate-900">
                  <Image
                    src={SCENARIO_IMGS[i]}
                    alt={label}
                    fill
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="px-4 py-3 text-sm font-bold text-gray-900 break-keep">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── 감지 항목 카탈로그 (keep·shelf 편입 · 기능페이지 §6) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{DETECTION_CATALOG[locale].eyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{DETECTION_CATALOG[locale].title}</h2>
            <p className="text-lg text-gray-500 leading-relaxed break-keep">{DETECTION_CATALOG[locale].sub}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {DETECTION_CATALOG[locale].items.map((it) => (
              <li key={it.name} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <h3 className="text-base font-bold text-gray-900 break-keep">{it.name}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{it.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* ── 기능 × care 열 (Matrix v1.0 · 재정돈 Phase 4) ── */}
      <ModeFunctionSection mode="care" locale={locale} />

      {/* ── Value (3 cards) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {t.values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <div key={v.title} className="card flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0 mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed break-keep">{v.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://storecare.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-lg"
            >
              {t.valueCta}
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </a>
            <p className="mt-6 text-sm text-gray-500 break-keep">
              {t.valueNote[0]}{' '}
              <Link href={localeHref(locale, '/products')} className="text-primary hover:text-primary-dark transition-colors">
                {t.otherProducts}
              </Link>
            </p>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
