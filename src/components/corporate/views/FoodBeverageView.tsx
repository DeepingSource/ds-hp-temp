import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  ArrowRight,
  Sparkles,
  Clock,
  ClipboardList,
  Quote,
  Coffee,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { localeHref, type Locale } from '@/lib/i18n';
import SolutionCaseStudies from '@/components/corporate/SolutionCaseStudies';
import BeforeAfterToggle from '@/components/solutions/BeforeAfterToggle';
import CategoryHeroDemo from '@/components/solutions/CategoryHeroDemo';
import ProblemSignal from '@/components/solutions/ProblemSignal';
import AdoptionJourney from '@/components/solutions/AdoptionJourney';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import DiagnosisLauncher from '@/components/corporate/diagnosis/DiagnosisLauncher';
import MidCta from '@/components/corporate/MidCta';
import SolutionTrustBand from '@/components/corporate/SolutionTrustBand';
import { CTA_TRACK_E, CTA_TRACK_O, OWNER_START_URL, contactEnterpriseHref } from '@/lib/cta-canon';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, service } from '@/lib/structured-data';
import siteContent from '@/data/generated/site-content.json';

/**
 * FoodBeverageView — shared café & F&B solution composition.
 * Rendered by `/solutions/food-beverage` (en), `/ko/solutions/food-beverage`,
 * `/jp/solutions/food-beverage` with the locale prop (PLAN_v1.1 D6 path-prefix i18n).
 */

const HERO_IMG = '/images/industries/cafe-hero.webp';
const SCENARIO_IMGS = [
  '/images/cctv/cctv-cafe-counter.webp',
  '/images/cctv/cctv-cafe-hall.webp',
  '/images/cctv/cctv-restaurant-kitchen.webp',
];

type Copy = {
  badge: string;
  heroTitle: [string, string];
  heroSub: string;
  heroCta: string;
  scenarios: { tag: string; title: string; body: string }[];
  scenariosEyebrow: string;
  scenariosHeading: string;
  quote: string;
  quoteName: string;
  quoteRole: string;
  resultsLine: string;
  resultsNote: string;
  ctaEyebrow: string;
  ctaTitle: [string, string];
  ctaSub: string;
  ctaButton: string;
};

const CMS = siteContent.foodBeverage as unknown as Record<Locale, Copy>;

// 10-C: 진단 헤드 — '외식 프랜차이즈 사례' 프레이밍 (3로케일)
const DIAG_TITLE: Record<Locale, string> = {
  ko: '지금 겪는 문제를 알려주시면, 외식 프랜차이즈 사례 중 맞는 답을 찾아드립니다',
  en: "Tell us what you're facing — we'll match it to real F&B franchise cases",
  jp: 'いま抱えている課題を教えてください。外食フランチャイズの事例から最適な答えを見つけます',
};

// ①1-3에서 '분석 화면 예시' 정적 이미지 제거 — 라이브 목업(CategoryHeroDemo·OrderFlow)이 그림 역할을 대신한다.

// 10-C: 실증 사례 카드 — 기존 ko 하드코딩을 3로케일화
const PROOF_CARD: Record<Locale, { badge: string; title: string; body: string }> = {
  ko: {
    badge: '실제 현장 개선 사례',
    title: '4인 테이블 실제 평균 이용 1.1~1.8명 → 2인 세트로 배치 변경 후 매출 +10% 증대',
    body: '매장 체류 데이터 교차 분석으로 4인석의 불필요한 공석 정체를 짚어내고, 2인 좌석 및 회전율 중심 세트 메뉴를 배치하여 피크타임 매출과 회전율을 동시에 끌어올렸습니다.',
  },
  en: {
    badge: 'Real on-site improvement',
    title: '4-top tables averaging 1.1–1.8 diners → +10% revenue after switching to 2-top sets',
    body: 'Cross-analyzing dwell data exposed idle capacity at 4-top tables; rearranging into 2-tops with turnover-focused set menus lifted peak-hour revenue and table turnover together.',
  },
  jp: {
    badge: '実際の現場改善事例',
    title: '4人席の実平均利用1.1〜1.8名 → 2人席セットへ変更後、売上+10%',
    body: '滞在データのクロス分析で4人席の無駄な空席滞留を特定し、2人席と回転率重視のセットメニューを配置して、ピーク時の売上と回転率を同時に引き上げました。',
  },
};

// 10-C: 최종 CTA — ①본사 도입 상담(primary) ②단일 매장 사장님 경로(secondary)
const OWNER_PATH_LABEL: Record<Locale, string> = {
  ko: '단일 매장 사장님이신가요? → 사장님 전용',
  en: 'Running a single store? → Owner suite',
  jp: '1店舗のオーナー様ですか？ → オーナー専用',
};

const MID_CTA_LEAD: Record<Locale, string> = {
  ko: '우리 매장 조건으로도 되는지 궁금하시다면',
  en: 'Wondering if this works for your site?',
  jp: '自店の条件でも可能か気になったら',
};

// 자동 발주 라이브 목업 (Phase 3: 주문·발주 흐름 = F&B 핵심 서사).
// placeholder는 MockupViewport phone 캔버스(390×844) 자리 예약과 동일 비율 — CLS 0.
const OrderFlowMockup = dynamic(() => import('@/components/mockups/OrderFlowMockup'), {
  loading: () => <div className="aspect-[390/844] animate-pulse rounded-[2.5rem] bg-gray-100" />,
});

// 섹션 연결 문구 — 목업 자체 카피(자동 발주·승인 한 번으로)와 톤 정합, 3로케일 동시 작성
const orderFlowCopy: Record<Locale, { eyebrow: string; heading: string }> = {
  ko: { eyebrow: '실제 화면', heading: '재고가 떨어지기 전에, 승인 한 번으로 발주까지' },
  en: { eyebrow: 'Live preview', heading: 'Approve once — ordered before you run out' },
  jp: { eyebrow: '実際の画面', heading: '在庫が切れる前に、承認ひとつで発注まで' },
};

// ①5-2 — 발주 목업 업종화: 편의점 품목(삼각김밥) → 카페 품목 오버라이드(mergeMockupContent).
// 수량·금액은 목업 내부 상수(40개·₩52,000)를 공유하므로 수량과 어울리는 품목(우유 팩)으로 맞춘다.
const ORDER_CAFE: Record<Locale, Partial<import('@/components/mockups/OrderFlowMockup').OrderFlowCopy>> = {
  ko: {
    sub: '도심 카페 · 승인 한 번으로',
    cardTitle: '우유(900ml) 40팩 추가 발주',
    cardReason: '주말 라떼 수요 대비 재고 소진 예상 — 일요일 오전 결품 위험',
    item: '바리스타용 우유 900ml',
    vendor: '유제품 물류센터',
  },
  en: {
    sub: 'Downtown café · one tap to approve',
    cardTitle: 'Reorder 40 milk packs',
    cardReason: 'Weekend latte demand will deplete stock — stockout risk Sunday morning',
    item: 'Barista milk 900ml',
    vendor: 'Dairy DC',
  },
  jp: {
    sub: '都心のカフェ · 承認ひとつで',
    cardTitle: '牛乳(900ml) 40パックの追加発注',
    cardReason: '週末のラテ需要で在庫が枯渇する見込み — 日曜午前に欠品の恐れ',
    item: 'バリスタ用牛乳900ml',
    vendor: '乳製品物流センター',
  },
};

export default function FoodBeverageView({ locale }: { locale: Locale }) {
  const t = CMS[locale];

  const icons = [Sparkles, Clock, ClipboardList];
  const scenarios = t.scenarios.map((s, i) => ({ ...s, icon: icons[i] }));

  return (
    <div className="bg-white min-h-screen">
      <JsonLd
        data={service({
          name: `${t.heroTitle[0]} ${t.heroTitle[1]}`,
          description: t.heroSub,
          path: '/solutions/food-beverage',
          locale,
          serviceType: t.badge,
        })}
      />

      {/* ── 히어로 ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-surface-dark">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO_IMG} alt="" fill priority sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/75 via-surface-dark/85 to-surface-dark" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" aria-hidden="true" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* ①1-9: 업종 전환 링크를 브레드크럼 라인과 같은 행으로 정렬 */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Breadcrumb items={[{ name: crumb('solutions', locale), path: '/solutions' }, { name: crumb('food-beverage', locale), path: '/solutions/food-beverage' }]} locale={locale} tone="dark" />
            <Link href={localeHref(locale, '/solutions')} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-light hover:text-white transition-colors">
              {locale === 'ko' ? '다른 업종 문제 찾기' : locale === 'jp' ? '他の業種の課題を探す' : 'Browse other industries'}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
          <HeroBadge tone="dark">
            <Coffee className="w-3.5 h-3.5" />
            {t.badge}
          </HeroBadge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            {t.heroTitle[0]}
            <br />
            <span className="text-primary">{t.heroTitle[1]}</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto break-keep">
            {t.heroSub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={localeHref(locale, contactEnterpriseHref())} className="btn-primary-dark gap-2 w-full sm:w-auto">
              {t.heroCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {/* §2-1: 점주 자가 시작 경로는 secondary로 병기 */}
            <a
              href={OWNER_START_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {CTA_TRACK_O[locale]}
            </a>
          </div>
        </div>
      </section>

      {/* Contextual Diagnosis Launcher */}
      <section className="py-6 bg-gray-50/70 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <DiagnosisLauncher variant="banner" preset={{ industry: 'cafe' }} locale={locale} customTitle={DIAG_TITLE[locale]} />
        </div>
      </section>

      {/* ── 시나리오 ── */}
      <AnimatedSection className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">
              {t.scenariosEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep">
              {t.scenariosHeading}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {scenarios.map((s, i) => (
              <div key={s.tag} className="stagger-child group card overflow-hidden p-0 flex flex-col transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="relative aspect-[16/10] w-full">
                  <Image src={SCENARIO_IMGS[i]} alt={s.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <span className="self-start px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary">{s.tag}</span>
                  <h3 className="text-lg font-bold text-gray-900 break-keep">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep">{s.body}</p>
                  <ProblemSignal icon={s.icon} locale={locale} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Before/After 토글 — 핵심 가치, 상단부로 이동 (10-C) ── */}
      <AnimatedSection className="py-16 lg:py-24 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <BeforeAfterToggle category="food-beverage" locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── 카테고리 히어로 데모 (좌석·대기 게이지 · V3) ── */}
      <AnimatedSection className="py-12 lg:py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <CategoryHeroDemo category="food-beverage" locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── 자동 발주 라이브 목업 (관찰→분석→실행 서사의 '실행' 비트) ── */}
      <AnimatedSection className="py-16 lg:py-24 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">
              {orderFlowCopy[locale].eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep">
              {orderFlowCopy[locale].heading}
            </h2>
          </div>
          {/* 폭만 지정(v2 계약) — 크기는 목업의 MockupViewport(phone 390×844) 소관 */}
          <div className="max-w-[300px] mx-auto">
            <OrderFlowMockup locale={locale} content={ORDER_CAFE[locale]} />
          </div>
        </div>
      </AnimatedSection>

      {/* ── 후기 ── */}
      {/* ── 실증 서사 & 후기 ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Concrete Before -> After Story Card */}
          <div className="mb-10 p-6 rounded-2xl bg-white border border-primary/20 shadow-sm">
            <span className="text-2xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 inline-block">
              {PROOF_CARD[locale].badge}
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-2 break-keep">
              {PROOF_CARD[locale].title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed break-keep">
              {PROOF_CARD[locale].body}
            </p>
          </div>

          <div className="card relative bg-primary/5 border-primary/10">
            <Quote className="w-10 h-10 text-primary/20 mb-4" />
            <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed break-keep mb-6">
              {t.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{t.quoteName}</p>
                <p className="text-xs text-gray-500">{t.quoteRole}</p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-base text-gray-600 break-keep">{t.resultsLine}</p>
          <p className="mt-2 text-center text-xs text-gray-400 break-keep">{t.resultsNote}</p>

          {/* 미드 CTA — 증거(실증 사례·후기) 직후 (④8-0 ②지점) */}
          <MidCta locale={locale} lead={MID_CTA_LEAD[locale]} className="mt-10" />
        </div>
      </AnimatedSection>

      {/* ── 도입 프로세스 (①1-2 — 파일럿→검증→확산) ── */}
      <AnimatedSection className="py-16 lg:py-24 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AdoptionJourney locale={locale} />
        </div>
      </AnimatedSection>

      <SolutionCaseStudies solutionSlug="food-beverage" locale={locale} />

      {/* ── CTA — 본사 primary + 사장님 경로 secondary (10-C) · 신뢰 스트립 직전 삽입 ── */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <SolutionTrustBand locale={locale} industry="food-beverage" className="mb-12" />
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.ctaEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep">
            {t.ctaTitle[0]}
            <br />
            {t.ctaTitle[1]}
          </h2>
          <p className="text-slate-300 text-lg mb-10 break-keep">
            {t.ctaSub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={localeHref(locale, contactEnterpriseHref())} className="btn-primary-dark gap-2">
              <span>{CTA_TRACK_E[locale]}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={localeHref(locale, '/products/saai-for-owners')} className="btn-ghost-dark gap-2">
              <span>{OWNER_PATH_LABEL[locale]}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
