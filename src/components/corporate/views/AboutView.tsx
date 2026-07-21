import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import ProcessStepper from '@/components/ui/ProcessStepper';
import { CountUp } from '@/components/ui/CountUp';
import WordRise from '@/components/ui/WordRise';
import { OriginStoryTimeline } from '@/components/about/OriginStoryTimeline';
import VisionDiagram from '@/components/company/VisionDiagram';
import MasterPair from '@/components/corporate/MasterPair';
import VisionCoordinatesMockup from '@/components/mockups/VisionCoordinatesMockup';
import {
  ArrowRight, Calendar, Award, Handshake, ShieldCheck, Cpu,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import { milestoneHighlights } from '@/lib/company-milestones';
import { leadership } from '@/lib/leadership';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { perfectSpace, purpose, saaiPromiseLayer } from '@/lib/brand-canon';
import siteContent from '@/data/generated/site-content.json';

/**
 * AboutView — shared locale-aware About composition.
 * Rendered by `/company/about` (en), `/ko/company/about`, `/jp/company/about`.
 * VisionDiagram + OriginStoryTimeline keep their internal Korean (out of scope).
 */

type AboutCopy = {
  badge: string;
  heroEyebrowCompany: string;
  heroMasterCompany: string;
  heroEyebrowOwner: string;
  heroMasterOwner: string;
  companyIntro: string;
  companyIntro2: string;
  vmEyebrow: string;
  missionStatement: string;
  missionStatementSub: string;
  vision: string;
  visionLabel: string;
  missionLabel: string;
  mission: string;
  storyEyebrow: string;
  storyHeading: string;
  storySub: string;
  namingHeading: string;
  namingBody: string;
  leadershipEyebrow: string;
  leadershipHeading: string;
  leadershipSub: string;
  partnersEyebrow: string;
  partnersHeading: string;   // {partnerBrands} template
  partnersSub: string;       // {industries}/{nvidiaPartner} template
  partnerStatsNote: string;
  certsLabel: string;
  ctaHeading: string;
  ctaSub: string;
  ctaButton: string;
  partnerStatLabels: string[];
  methodEyebrow: string;
  methodHeading: string;
  methodIntro: string;
  certs: Record<string, { sub: string }>;
  methodSteps: Record<string, { term: string; promise: string }>;
};

const ABOUT = siteContent.about as Record<Locale, AboutCopy>;

// Cert labels + icons and the method closing line stay in code (labels are fixed
// credentials / a code value; closing is a brand-canon SOT value).
const CERTS_STRUCT: { id: string; label: string; icon: typeof ShieldCheck }[] = [
  { id: 'soc2', label: 'SOC 2', icon: ShieldCheck },
  { id: 'nextrise', label: 'NextRise 2024', icon: Award },
  { id: 'nvidia', label: COMPANY.nvidiaPartner, icon: Cpu },
];

const METHOD_STEPS_STRUCT = [{ id: 'anonymizer' }, { id: 'spatial' }, { id: 'agentic' }] as const;

/** ① 리드에서 primary로 강조할 단어(로케일별). '오프라인을 / 다시 만듭니다'의 '다시'. */
const LEAD_HL: Record<Locale, string> = { ko: '다시', en: 'Reinvent', jp: 'つくりなおす' };

/**
 * ③ 향후 5년 — 다크 챕터 카피(목적지·방법·SAAI 핸드오프). bridge 상단(회사→SAAI)을 React로.
 * bTitle/bLead는 method 카피 재사용(t.methodHeading·t.methodIntro), closing은 purpose SOT.
 */
const NEXT: Record<Locale, {
  eyebrow: string; h2: string; aTitle: string; aLead: string; cTransition: string;
  companyTag: string; companyPromise: string; connector: string;
  saaiTag: string; saaiName: string; saaiPromise: string; lettersLabel: string; saaiLink: string;
}> = {
  ko: {
    eyebrow: "What's next · 향후 5년",
    h2: '5년 뒤, 우리가 설 자리 — 그리고 거기까지 가는 법.',
    aTitle: 'Vision 2031 — 우리가 가려는 좌표',
    aLead: "익명화·공간·운영이 겹치는 거의 유일한 자리. 시장이 'Physical AI'를 말할 때, 공간 쪽에서 가장 먼저 불리는 이름.",
    cTransition: '이 세 축을, 하나의 플랫폼으로 묶었습니다.',
    companyTag: '회사 · DeepingSource', companyPromise: '모든 공간을, 완벽하게.', connector: '모든 공간을 완벽하게 하려면 — 당신의 공간부터',
    saaiTag: '플랫폼 · SAAI', saaiName: 'SAAI — 익명화 공간 AI', saaiPromise: '당신의 공간을, 완벽하게.', lettersLabel: 'S · A · A · I', saaiLink: 'SAAI란 무엇인가',
  },
  en: {
    eyebrow: "What's next · Next 5 years",
    h2: "Where we'll stand in five years — and how we get there.",
    aTitle: 'Vision 2031 — the coordinates we aim for',
    aLead: "One of the very few places where anonymization, space and operations overlap. When the market says 'Physical AI', the first name called on the spatial side.",
    cTransition: 'We tied these three layers into one platform.',
    companyTag: 'Company · DeepingSource', companyPromise: 'Every space, made perfect.', connector: 'To make every space perfect — start with your space',
    saaiTag: 'Platform · SAAI', saaiName: 'SAAI — anonymized spatial AI', saaiPromise: 'Your space, made perfect.', lettersLabel: 'S · A · A · I', saaiLink: 'What is SAAI',
  },
  jp: {
    eyebrow: "What's next · 今後5年",
    h2: '5年後に立つ場所 — そして、そこまで行く方法。',
    aTitle: 'Vision 2031 — 目指す座標',
    aLead: '匿名化・空間・運営が重なる、ほぼ唯一の場所。市場が「Physical AI」を語るとき、空間の側で最初に呼ばれる名前。',
    cTransition: 'この三つの軸を、一つのプラットフォームにまとめました。',
    companyTag: '会社 · DeepingSource', companyPromise: 'すべての空間を、完璧に。', connector: 'すべての空間を完璧にするには — あなたの空間から',
    saaiTag: 'プラットフォーム · SAAI', saaiName: 'SAAI — 匿名化空間AI', saaiPromise: 'あなたの空間を、完璧に。', lettersLabel: 'S · A · A · I', saaiLink: 'SAAIとは',
  },
};

/** ① 리드: 2줄 스택 + 강조어만 primary. */
function renderLead(text: string, hl: string) {
  const i = text.indexOf(hl);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-primary">{hl}</span>
      {text.slice(i + hl.length)}
    </>
  );
}

/** ④ 왜냐하면 — 이건 중요한 문제였습니다. head는 ③ methodIntro서 이관한 임팩트 문구. */
const WHY: Record<Locale, { eyebrow: string; head: string }> = {
  ko: { eyebrow: '왜냐하면 · Why', head: '카메라는 결국, 사람을 봅니다.' },
  en: { eyebrow: 'Why', head: 'A camera ultimately looks at people.' },
  jp: { eyebrow: 'なぜなら · Why', head: 'カメラは結局、人を見ます。' },
};

/** ⑤ 누가 만드나 — 리더십 아래 아웃바운드(엔터프라이즈·파트너십). bridge rails. */
const ROLES: Record<Locale, { strip: string; enterprise: string; partnership: string }> = {
  ko: { strip: '함께 만드는 곳', enterprise: '엔터프라이즈 도입', partnership: '파트너십 · 협업 문의' },
  en: { strip: 'Where it comes together', enterprise: 'For enterprise', partnership: 'Partnership & collaboration' },
  jp: { strip: '共に創る場所', enterprise: 'エンタープライズ導入', partnership: 'パートナーシップ・協業のお問い合わせ' },
};

/** ⑥ 이제, 당신의 공간부터 — SAAI 하단 브릿지(SAAI → 제품 3모드 → 문의). */
type ModeMini = { ph: string; name: string; tag: string; href: string };
const BRIDGE2: Record<Locale, { eyebrow: string; head: string; sub: string; cta: string; modes: [ModeMini, ModeMini, ModeMini] }> = {
  ko: {
    eyebrow: '이제, 당신의 공간부터', head: '네 개의 근거가, 하나의 루프로', sub: '어제를 읽고, 지금을 알리고, 다음을 실행합니다 — 하나의 운영 루프로.', cta: '제품 전체 보기',
    modes: [
      { ph: '어제 · Analyze', name: 'saai insight', tag: '어제를 읽다', href: '/products/saai-insight' },
      { ph: '지금 · Detect', name: 'saai care', tag: '지금을 알리다', href: '/products/saai-care' },
      { ph: '다음 · Act', name: 'saai agent', tag: '다음을 실행하다', href: '/products/saai-agent' },
    ],
  },
  en: {
    eyebrow: 'Now, start with your space', head: 'The grounds become one loop', sub: 'Read yesterday, flag the now, act on next — as one operating loop.', cta: 'See all products',
    modes: [
      { ph: 'Yesterday · Analyze', name: 'saai insight', tag: 'reads yesterday', href: '/products/saai-insight' },
      { ph: 'Now · Detect', name: 'saai care', tag: 'flags the now', href: '/products/saai-care' },
      { ph: 'Next · Act', name: 'saai agent', tag: 'acts on next', href: '/products/saai-agent' },
    ],
  },
  jp: {
    eyebrow: '今、あなたの空間から', head: '根拠が、一つのループに', sub: '昨日を読み、今を知らせ、次を実行する — 一つの運営ループで。', cta: '製品をすべて見る',
    modes: [
      { ph: '昨日 · Analyze', name: 'saai insight', tag: '昨日を読む', href: '/products/saai-insight' },
      { ph: '今 · Detect', name: 'saai care', tag: '今を知らせる', href: '/products/saai-care' },
      { ph: '次 · Act', name: 'saai agent', tag: '次を実行する', href: '/products/saai-agent' },
    ],
  },
};

/** ⑦ 함께하자 — Contact eyebrow. */
const TOGETHER: Record<Locale, string> = { ko: '함께하자 · Together', en: 'Together', jp: '一緒に · Together' };


export default function AboutView({ locale }: { locale: Locale }) {
  const t = ABOUT[locale];
  const nx = NEXT[locale];
  const promise = saaiPromiseLayer[locale];
  const why = WHY[locale];
  const roles = ROLES[locale];
  const bridge = BRIDGE2[locale];
  // rebuild the COMPANY-count interpolations from their CMS templates
  const partnersHeading = t.partnersHeading.replace('{partnerBrands}', String(COMPANY.partnerBrands));
  const partnersSub = t.partnersSub
    .replace('{industries}', String(COMPANY.industries))
    .replace('{nvidiaPartner}', COMPANY.nvidiaPartner);
  // cert label/icon stay in code; sub comes from the CMS
  const certs = CERTS_STRUCT.map((s) => ({ ...s, sub: t.certs[s.id]?.sub ?? '' }));
  // method copy (eyebrow/heading/intro/steps) from CMS; closing is a SOT value
  const method = {
    eyebrow: t.methodEyebrow,
    heading: t.methodHeading,
    intro: t.methodIntro,
    closing: purpose[locale].closing,
    steps: METHOD_STEPS_STRUCT.map((s) => ({ ...s, ...t.methodSteps[s.id] })),
  };
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero · 두 마스터 카피 미러 ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-surface-dark" aria-hidden="true" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('about', locale), path: '/company/about' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark" className="mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t.badge}
          </HeroBadge>

          {/* ① 선언 — REINVENT OFFLINE. 순수 히어로: H1 · 2줄 리드('다시' 파랑) · 대비카드 · 클로징 1줄 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-5">
            <WordRise text={t.missionStatement} />
          </h1>
          <p className="text-2xl sm:text-3xl font-bold text-white/90 leading-snug mb-14 break-keep whitespace-pre-line">
            {renderLead(t.missionStatementSub, LEAD_HL[locale])}
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">{t.heroEyebrowCompany}</p>
              <p className="text-2xl sm:text-3xl font-bold text-white leading-snug break-keep whitespace-pre-line">
                {t.heroMasterCompany}
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20 backdrop-blur-sm text-center">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">{t.heroEyebrowOwner}</p>
              <p className="text-2xl sm:text-3xl font-bold text-white leading-snug break-keep whitespace-pre-line">
                {t.heroMasterOwner}
              </p>
            </div>
          </div>

          <p className="mt-14 text-xl sm:text-2xl font-bold text-white max-w-2xl mx-auto leading-snug break-keep">
            {t.companyIntro2}
          </p>
        </div>
      </section>

      {/* ── ② 비전 — 모든 공간을, 완벽하게 (About 유일 등장 · §5-3 파랑 앵커) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-medium text-primary mb-5 tracking-wider uppercase">{t.vmEyebrow}</p>
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight break-keep leading-tight">
              {perfectSpace.every[locale]}
            </h2>
          </div>

          {/* 전개 — 당신의 공간 → 모든 공간 (SAAI 브릿지 복선) */}
          <p className="mt-8 text-xl text-gray-700 font-medium break-keep">{t.vision}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gray-200 bg-slate-50 px-4 py-2 text-sm font-bold text-gray-700 break-keep">{perfectSpace.your[locale]}</span>
            <ArrowRight className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary break-keep">{perfectSpace.every[locale]}</span>
          </div>

          {/* 믿음 본문 */}
          <p className="mt-10 text-lg text-gray-500 leading-relaxed break-keep max-w-2xl">{t.mission}</p>
        </div>
      </AnimatedSection>

      {/* ── 두 약속 미러 · 본부 ↔ 매장 ── */}
      <MasterPair locale={locale} />

      {/* ── ③ 향후 5년 — 목적지 · 방법 · SAAI 핸드오프 (다크 챕터 · bridge 상단 회사→SAAI) ── */}
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">
        <div className="absolute top-1/3 right-0 w-[36rem] h-[36rem] bg-primary/10 blur-[160px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          {/* 챕터 헤더 */}
          <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-sm font-medium text-primary-light mb-4 tracking-wider uppercase">{nx.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight break-keep leading-tight">{nx.h2}</h2>
          </AnimatedSection>

          {/* 블록 A · 목적지 (2031) */}
          <AnimatedSection className="mb-20">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-2xs font-black font-mono text-primary-light">A</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white break-keep">{nx.aTitle}</h3>
            </div>
            <p className="text-slate-300 leading-relaxed break-keep max-w-2xl mb-8">{nx.aLead}</p>
            <div className="rounded-3xl bg-white p-5 sm:p-7 shadow-card">
              <VisionCoordinatesMockup locale={locale} />
            </div>
          </AnimatedSection>

          {/* 블록 B · 어떻게 도달하나 (방법 3층) */}
          <AnimatedSection className="mb-20">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-2xs font-black font-mono text-primary-light">B</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white break-keep">{method.heading}</h3>
            </div>
            <p className="text-slate-300 leading-relaxed break-keep max-w-2xl mb-8">{method.intro}</p>
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card">
              <div className="mb-8">
                <VisionDiagram locale={locale} />
              </div>
              <ProcessStepper
                ariaLabel={method.heading}
                steps={method.steps.map((s, i) => ({ label: `0${i + 1}`, title: s.term, desc: s.promise }))}
              />
            </div>
          </AnimatedSection>

          {/* 블록 C · SAAI 핸드오프 (그림 상단: 회사 → SAAI) */}
          <AnimatedSection>
            <div className="flex items-baseline gap-3 mb-8 justify-center">
              <span className="text-2xs font-black font-mono text-primary-light">C</span>
              <p className="text-lg sm:text-xl font-medium text-white break-keep text-center">{nx.cTransition}</p>
            </div>

            <div className="mx-auto max-w-2xl">
              {/* 회사 노드 */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-2xs font-bold uppercase tracking-wider text-slate-300 mb-3">{nx.companyTag}</span>
                <p className="text-lg font-bold text-white break-keep">{nx.companyPromise}</p>
              </div>
              {/* 커넥터 */}
              <div className="flex flex-col items-center py-3">
                <span className="rounded-full bg-primary/15 border border-primary/25 px-4 py-1.5 text-xs font-medium text-primary-light break-keep text-center">{nx.connector}</span>
                <ArrowRight className="w-5 h-5 text-primary-light rotate-90 mt-2" aria-hidden="true" />
              </div>
              {/* SAAI 노드 */}
              <div className="rounded-3xl border-2 border-primary/50 bg-primary/10 p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-2xs font-bold uppercase tracking-wider text-white">{nx.saaiTag}</span>
                  <Link href={localeHref(locale, '/products/saai')} className="inline-flex items-center gap-1 text-sm font-medium text-primary-light hover:text-white transition-colors no-underline">
                    {nx.saaiLink} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
                <p className="text-lg font-bold text-white break-keep mb-1">{nx.saaiName}</p>
                <p className="text-primary-light font-medium break-keep mb-5">{nx.saaiPromise}</p>
                {/* S · A · A · I → 기술 딥링크 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {promise.pillars.map((p) => (
                    <Link
                      key={p.key}
                      href={localeHref(locale, p.tech)}
                      className="group rounded-xl border border-white/10 bg-slate-900/40 p-3 hover:border-primary/40 transition-colors no-underline"
                    >
                      <span className="block text-lg font-black font-mono text-primary-light leading-none">{p.letter}</span>
                      <span className="block text-2xs font-bold text-white mt-1 break-keep">{p.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-10 text-center text-base text-slate-400 italic break-keep">{method.closing}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── ④ 왜냐하면 — 이건 중요한 문제였습니다 (연혁·원류 서사) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{why.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 break-keep">
              {why.head}
            </h2>
            <p className="text-sm font-semibold text-primary mb-5 break-keep">{t.storyHeading}</p>
            <p className="text-lg text-gray-500 break-keep">
              {t.storySub}
            </p>
          </div>

          <div className="mb-16">
            <OriginStoryTimeline locale={locale} />
          </div>

          {/* 이름의 유래 — 딥핑소스 (블로그 창업/네이밍 서사 반영) */}
          <div className="mb-16 mx-auto max-w-3xl rounded-3xl border border-primary/15 bg-white p-8 sm:p-10">
            <p className="text-sm font-bold text-primary mb-3 tracking-wider uppercase">{t.namingHeading}</p>
            <p className="text-gray-600 leading-relaxed break-keep">{t.namingBody}</p>
          </div>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {milestoneHighlights(locale).map((m) => (
              <StaggerItem key={m.year}>
                <div className="p-6 bg-white rounded-2xl border border-gray-100 h-full text-center">
                  <Calendar className="w-5 h-5 text-primary mx-auto mb-3" />
                  <p className="text-2xl font-bold text-gray-900 mb-1">{m.year}</p>
                  <p className="text-sm font-bold text-primary mb-2 break-keep">{m.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed break-keep">{m.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 팀 / 리더십 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.leadershipEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.leadershipHeading}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto break-keep">{t.leadershipSub}</p>
          </div>

          <StaggerContainer className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {leadership[locale].map((l) => (
              <StaggerItem key={l.key}>
                <div className="p-7 rounded-3xl border border-gray-100 bg-slate-50 h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-5 flex items-center justify-center" aria-hidden="true">
                    <span className="text-2xl font-bold text-primary">{l.initials}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mb-0.5 break-keep">{l.name}</p>
                  <p className="text-sm font-bold text-primary mb-3 break-keep">{l.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep text-left">{l.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 파트너 신뢰 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Handshake className="w-7 h-7 text-primary mx-auto mb-5" />
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.partnersEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 break-keep">
            {partnersHeading}
          </h2>
          <p className="text-lg text-gray-500 mb-10 break-keep">
            {partnersSub}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[`${COMPANY.partnerBrands}`, `${COMPANY.industries}`, `${COMPANY.patents}`, 'PIPA'].map((stat, i) => (
              <div key={i} className="p-5 bg-white rounded-2xl border border-gray-100">
                <p className="text-2xl font-bold text-gray-900 mb-1">{i < 3 ? <CountUp to={Number(stat)} /> : stat}</p>
                <p className="text-xs text-gray-500 font-medium">
                  {t.partnerStatLabels[i]}
                </p>
              </div>
            ))}
          </div>
          <p className="text-2xs text-gray-400 mt-5 break-keep">{t.partnerStatsNote}</p>

          <p className="text-xs font-bold text-primary mt-12 mb-5 tracking-wider uppercase">{t.certsLabel}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {certs.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 text-left">
                  <span className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-gray-900 break-keep">{c.label}</span>
                    <span className="block text-xs text-gray-500 break-keep">{c.sub}</span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* ⑤ 누가 · 어디서 — 엔터프라이즈 · 파트너십 아웃바운드 (bridge rails) */}
          <p className="text-xs font-bold text-gray-400 mt-14 mb-4 tracking-wider uppercase">{roles.strip}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={localeHref(locale, '/enterprise')} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:border-primary-light transition-colors no-underline">
              {roles.enterprise} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href={localeHref(locale, '/contact')} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:border-primary-light transition-colors no-underline">
              {roles.partnership} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ── ⑥ 이제, 당신의 공간부터 — SAAI 하단 브릿지 (SAAI → 제품 3모드 → 문의) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{bridge.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{bridge.head}</h2>
            <p className="text-lg text-gray-500 break-keep">{bridge.sub}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {bridge.modes.map((m) => (
              <Link
                key={m.name}
                href={localeHref(locale, m.href)}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-card hover:border-primary-light transition-colors no-underline"
              >
                <p className="text-2xs font-mono font-medium text-primary mb-2 uppercase tracking-wide">{m.ph}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-1 lowercase">{m.name}</h3>
                <p className="text-sm text-gray-500 break-keep mb-5">{m.tag}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href={localeHref(locale, '/products')} className="btn-primary btn-lg gap-2 rounded-xl inline-flex items-center">
              {bridge.cta} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ── ⑦ 함께하자 — Contact ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Award className="w-12 h-12 text-primary mx-auto mb-6" />
          <p className="text-sm font-medium text-primary-light mb-4 tracking-wider uppercase">{TOGETHER[locale]}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep whitespace-pre-line">
            {t.ctaHeading}
          </h2>
          <p className="text-slate-300 text-lg mb-10 break-keep">
            {t.ctaSub}
          </p>
          <Link href={localeHref(locale, '/contact')} className="btn-primary-dark btn-lg gap-2 rounded-xl">
            {t.ctaButton} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
