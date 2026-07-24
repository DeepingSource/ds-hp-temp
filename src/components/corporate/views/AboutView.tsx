'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import WordRise from '@/components/ui/WordRise';
import { OriginStoryTimeline } from '@/components/about/OriginStoryTimeline';
import SpatialStackDiagram from '@/components/about/SpatialStackDiagram';
import VisionCoordinatesMockup from '@/components/mockups/VisionCoordinatesMockup';
import {
  ArrowRight, Award, Handshake, ShieldCheck, Cpu, Users, Sparkles,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import { leadership } from '@/lib/leadership';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { perfectSpace, purpose, saaiPromiseLayer } from '@/lib/brand-canon';
import siteContent from '@/data/generated/site-content.json';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

type AboutCopy = {
  badge: string;
  heroFactValues: string[];
  heroFactLabels: string[];
  missionStatement: string;
  missionStatementSub: string;
  // vision·mission: yaml에 존재, Stage 6에서 렌더 연결 예정 (AB A3 · 1-2 지침)
  vision: string;
  mission: string;
  storyHeading: string;
  storySub: string;
  namingHeading: string;
  namingBody: string;
  leadershipEyebrow: string;
  leadershipHeading: string;
  leadershipSub: string;
  partnersEyebrow: string;
  partnersHeading: string;
  partnersSub: string;
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
  methodSteps: Record<string, { title: string; desc: string; tag: string }>;
};

const ABOUT = siteContent.about as Record<Locale, AboutCopy>;

const CERTS_STRUCT: { id: string; label: string; icon: typeof ShieldCheck }[] = [
  { id: 'soc2', label: 'SOC 2', icon: ShieldCheck },
  { id: 'nextrise', label: 'NextRise 2024', icon: Award },
  { id: 'nvidia', label: COMPANY.nvidiaPartner, icon: Cpu },
];

const LEAD_HL: Record<Locale, string> = { ko: '다시', en: 'Reinvent', jp: 'つくりなおす' };

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

function renderLead(text: string, hl: string) {
  const i = text.indexOf(hl);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-primary-light font-extrabold">{hl}</span>
      {text.slice(i + hl.length)}
    </>
  );
}

const WHY: Record<Locale, { eyebrow: string; head: string }> = {
  ko: { eyebrow: '왜냐하면 · Why', head: '카메라는 결국, 사람을 봅니다.' },
  en: { eyebrow: 'Why', head: 'A camera ultimately looks at people.' },
  jp: { eyebrow: 'なぜなら · Why', head: 'カメラは結局、人を見ます。' },
};

const ROLES: Record<Locale, { strip: string; enterprise: string; partnership: string }> = {
  ko: { strip: '함께 만드는 곳', enterprise: '엔터프라이즈 도입', partnership: '파트너십 · 협업 문의' },
  en: { strip: 'Where it comes together', enterprise: 'For enterprise', partnership: 'Partnership & collaboration' },
  jp: { strip: '共に創る場所', enterprise: 'エンタープライズ導入', partnership: 'パートナーシップ・協業のお問い合わせ' },
};

type ModeMini = { ph: string; name: string; tag: string; href: string };
const BRIDGE2: Record<Locale, { eyebrow: string; head: string; sub: string; cta: string; modes: [ModeMini, ModeMini, ModeMini] }> = {
  ko: {
    eyebrow: '이제, 당신의 공간부터', head: '세 개의 근거가, 하나의 흐름으로', sub: '어제를 읽고, 지금을 알리고, 다음을 실행합니다 — 하나의 흐름으로.', cta: '제품 전체 보기',
    modes: [
      { ph: '어제 · Analyze', name: 'saai insight', tag: '어제를 읽다', href: '/products/saai-insight' },
      { ph: '지금 · Detect', name: 'saai care', tag: '지금을 알리다', href: '/products/saai-care' },
      { ph: '다음 · Act', name: 'saai agent', tag: '다음을 실행하다', href: '/products/saai-agent' },
    ],
  },
  en: {
    eyebrow: 'Now, start with your space', head: 'Three grounds, one flow', sub: 'Read yesterday, flag the now, act on next — as one flow.', cta: 'See all products',
    modes: [
      { ph: 'Yesterday · Analyze', name: 'saai insight', tag: 'reads yesterday', href: '/products/saai-insight' },
      { ph: 'Now · Detect', name: 'saai care', tag: 'flags the now', href: '/products/saai-care' },
      { ph: 'Next · Act', name: 'saai agent', tag: 'acts on next', href: '/products/saai-agent' },
    ],
  },
  jp: {
    eyebrow: '今、あなたの空間から', head: '三つの根拠が、一つの流れに', sub: '昨日を読み、今を知らせ、次を実行する — 一つの流れで。', cta: '製品をすべて見る',
    modes: [
      { ph: '昨日 · Analyze', name: 'saai insight', tag: '昨日を読む', href: '/products/saai-insight' },
      { ph: '今 · Detect', name: 'saai care', tag: '今を知らせる', href: '/products/saai-care' },
      { ph: '次 · Act', name: 'saai agent', tag: '次を実行する', href: '/products/saai-agent' },
    ],
  },
};

const TOGETHER: Record<Locale, string> = { ko: '함께하자 · Together', en: 'Together', jp: '一緒に · Together' };

const ALL_TEAM_LINK: Record<Locale, string> = {
  ko: '딥핑소스 사람들 전체 보기',
  en: 'Meet the entire DeepingSource team',
  jp: 'ディーピングソースの全メンバーを見る',
};

export default function AboutView({ locale }: { locale: Locale }) {
  const t = ABOUT[locale];
  const nx = NEXT[locale];
  const promise = saaiPromiseLayer[locale];
  const why = WHY[locale];
  const roles = ROLES[locale];
  const bridge = BRIDGE2[locale];

  const partnersHeading = t.partnersHeading.replace('{partnerBrands}', String(COMPANY.partnerBrands));
  const partnersSub = t.partnersSub
    .replace('{industries}', String(COMPANY.industries))
    .replace('{nvidiaPartner}', COMPANY.nvidiaPartner);
  const certs = CERTS_STRUCT.map((s) => ({ ...s, sub: t.certs[s.id]?.sub ?? '' }));

  return (
    <div className="bg-white min-h-screen">
      {/* ── Beat 1 — Hero (선언): H1 + sub 1회 + 신뢰 사실 스트립, 1뷰포트 (AB B1·D2).
          배경은 라벨 없는 야간 매장 컷(J5) — 추적 ID 박스가 '감시' 어감을 만들던 컷 교체. ── */}
      <section className="relative pt-28 pb-16 lg:pt-36 overflow-hidden bg-surface-dark">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity"
          style={{ backgroundImage: `url(${BASE}/images/hero/hero-about-night.webp)` }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('about', locale), path: '/company/about' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark" className="mb-8">
            <Sparkles className="w-3.5 h-3.5 text-primary-light" />
            {t.badge}
          </HeroBadge>

          {/* AB §1-A A4: yaml 개행(\n)을 WordRise 밖에서 줄 단위로 분리 — WordRise는 공백만
              split하므로 \n 포함 토큰이 inline-block으로 묶여 3줄 계단이 생겼다. 줄별 WordRise
              + <br/>로 정상 개행, start로 stagger 연속. 폰트도 한 단계 축소해 한 줄 수용 폭 확보. */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6 font-display break-keep leading-[1.18]">
            {t.missionStatement.split('\n').map((line, li, lines) => (
              <Fragment key={li}>
                <WordRise
                  text={line}
                  start={lines.slice(0, li).reduce((n, l) => n + l.split(' ').length, 0) * 60}
                />
                {li < lines.length - 1 && <br />}
              </Fragment>
            ))}
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-slate-300 leading-snug mb-12 break-keep whitespace-pre-line">
            {renderLead(t.missionStatementSub, LEAD_HL[locale])}
          </p>

          {/* 신뢰 사실 스트립 (AB B1) — 선언 반복(카드 2장 + 말미 문장) 자리를 사실로 대체 */}
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 max-w-3xl mx-auto">
            {t.heroFactValues.map((v, i) => (
              <div key={i} className="bg-surface-dark/90 px-4 py-5 text-center">
                <dd className="text-xl sm:text-2xl font-bold text-white tabular-nums break-keep">
                  {v
                    .replace('{foundingYear}', String(COMPANY.foundingYear))
                    .replace('{patents}', String(COMPANY.patents))}
                </dd>
                <dt className="mt-1 text-2xs font-semibold uppercase tracking-widest text-slate-400 break-keep">
                  {t.heroFactLabels[i]}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Beat 2 — Why Us / Origin (자격 / 원류): 연혁 & 스토리 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xs font-bold text-primary mb-3 tracking-widest uppercase">{why.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 break-keep font-display">
              {why.head}
            </h2>
            <p className="text-base sm:text-lg font-bold text-primary mb-4 break-keep">{t.storyHeading}</p>
            <p className="text-base text-gray-600 leading-relaxed break-keep">
              {t.storySub}
            </p>
          </div>

          <div className="mb-16">
            <OriginStoryTimeline locale={locale} />
          </div>

          {/* Naming Origin — Deeping Source */}
          <div className="mb-16 mx-auto max-w-3xl rounded-3xl border border-primary/15 bg-white p-8 sm:p-10 shadow-card">
            <p className="text-xs font-bold text-primary mb-3 tracking-widest uppercase">{t.namingHeading}</p>
            <p className="text-gray-600 leading-relaxed break-keep">{t.namingBody}</p>
          </div>

          {/* 마일스톤 카드 4장은 타임라인과 연혁 이중화라 삭제(AB B2) — 고유 사실
              (시리즈 A 55억·SOC 2 연도·특허 수)은 타임라인 항목으로 흡수. */}
        </div>
      </AnimatedSection>

      {/* ── Beat 3 — Method / 3-Tier Stack (방법): SpatialStackDiagram ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* 카피 SOT = about.yaml method.* (AB A3 역전 — Keystatic 편집이 화면에 반영됨) */}
          <SpatialStackDiagram
            copy={{
              eyebrow: t.methodEyebrow,
              heading: t.methodHeading,
              sub: t.methodIntro,
              steps: t.methodSteps,
            }}
          />
        </div>
      </AnimatedSection>

      {/* ── Beat 4 — Coordinates / Vision 2031 (좌표): 5년 뒤 우리가 설 자리 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <p className="text-xs font-bold text-primary mb-3 tracking-widest uppercase">{nx.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-display break-keep">{nx.aTitle}</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed break-keep">{nx.aLead}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 sm:p-8 border border-gray-200/80 shadow-card">
            <VisionCoordinatesMockup locale={locale} />
          </div>
        </div>
      </AnimatedSection>

      {/* ── Beat 5 — People / Leadership (사람): Illustrated Portraits + Team Page Link ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-xs font-bold text-primary mb-3 tracking-widest uppercase">{t.leadershipEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-display break-keep">{t.leadershipHeading}</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto break-keep">{t.leadershipSub}</p>
          </div>

          <StaggerContainer margin="0px" className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {leadership[locale].map((l) => (
              <StaggerItem key={l.key}>
                <div className="p-7 rounded-3xl border border-gray-200/80 bg-slate-50/60 h-full flex flex-col justify-between hover:border-primary/40 transition-colors shadow-sm">
                  <div>
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 bg-white mx-auto mb-5 relative shadow-md">
                      {l.photo ? (
                        <Image
                          src={l.photo}
                          alt={l.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">{l.initials}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xl font-bold text-gray-900 mb-1 break-keep text-center">{l.name}</p>
                    <p className="text-xs font-bold text-primary mb-4 break-keep text-center">{l.role}</p>
                    <p className="text-xs font-semibold text-gray-500 mb-3 break-keep text-center">{l.focus}</p>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{l.bio}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Link to full team page */}
          <div className="text-center">
            <Link
              href={localeHref(locale, '/company/team')}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-slate-50 px-6 py-3 text-sm font-bold text-gray-800 hover:border-primary/40 hover:bg-white transition-colors no-underline shadow-sm"
            >
              <Users className="w-4 h-4 text-primary" />
              <span>{ALL_TEAM_LINK[locale]}</span>
              <ArrowRight className="w-4 h-4 text-primary" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Beat 6 — Trust, Partners & Final CTA (신뢰 + 전환) ── */}
      {/* 6A. Partners & Certifications */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Handshake className="w-8 h-8 text-primary mx-auto mb-5" />
          <p className="text-xs font-bold text-primary mb-3 tracking-widest uppercase">{t.partnersEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 font-display break-keep">
            {partnersHeading}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-10 break-keep">
            {partnersSub}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[`${COMPANY.partnerBrands}`, `${COMPANY.industries}`, `${COMPANY.patents}`, 'PIPA'].map((stat, i) => (
              <div key={i} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                {/* AB §1-A A2: 카운트업 램프가 8·7 같은 작은 수를 '0'으로 노출 — 신뢰 스탯은
                    항상 최종값을 정적 표시 (모션은 섹션 fade가 담당) */}
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat}</p>
                <p className="text-xs text-gray-500 font-medium">
                  {t.partnerStatLabels[i]}
                </p>
              </div>
            ))}
          </div>
          <p className="text-2xs text-gray-400 mt-5 break-keep">{t.partnerStatsNote}</p>

          <p className="text-xs font-bold text-primary mt-12 mb-5 tracking-widest uppercase">{t.certsLabel}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {certs.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm text-left">
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

          {/* Outbound enterprise & partnership links */}
          <p className="text-xs font-bold text-gray-400 mt-14 mb-4 tracking-widest uppercase">{roles.strip}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={localeHref(locale, '/enterprise')} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:border-primary-light hover:text-primary transition-colors no-underline shadow-sm">
              {roles.enterprise} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href={localeHref(locale, '/contact')} className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:border-primary-light hover:text-primary transition-colors no-underline shadow-sm">
              {roles.partnership} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* 6B. SAAI 3-Mode Bridge */}
      <AnimatedSection className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-xs font-bold text-primary mb-3 tracking-widest uppercase">{bridge.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-display break-keep">{bridge.head}</h2>
            <p className="text-base sm:text-lg text-gray-600 break-keep">{bridge.sub}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {bridge.modes.map((m) => (
              <Link
                key={m.name}
                href={localeHref(locale, m.href)}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-card hover:border-primary-light transition-colors no-underline"
              >
                <p className="text-2xs font-mono font-bold text-primary mb-2 uppercase tracking-wide">{m.ph}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-1 lowercase">{m.name}</h3>
                <p className="text-sm text-gray-500 break-keep mb-5">{m.tag}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-primary">
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

      {/* 6C. Final CTA Section */}
      <AnimatedSection className="py-20 lg:py-28 bg-surface-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Award className="w-10 h-10 text-primary-light mx-auto mb-6" />
          <p className="text-xs font-bold text-primary-light mb-4 tracking-widest uppercase">{TOGETHER[locale]}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-display break-keep whitespace-pre-line">
            {t.ctaHeading}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-10 break-keep">
            {t.ctaSub}
          </p>
          <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg gap-2 rounded-xl inline-flex items-center">
            {t.ctaButton} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
