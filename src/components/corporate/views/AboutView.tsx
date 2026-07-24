'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import WordRise from '@/components/ui/WordRise';
import { OriginStoryTimeline } from '@/components/about/OriginStoryTimeline';
import SpatialStackDiagram from '@/components/about/SpatialStackDiagram';
import { trustedBrands } from '@/components/corporate/PartnerGrid';
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
  namingDetail: string;
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
  eyebrow: string; aTitle: string; aLead: string; goalLabel: string; goals: [string, string, string];
}> = {
  ko: {
    eyebrow: '향후 5년',
    aTitle: 'Vision 2031, 우리가 가려는 좌표',
    aLead: '익명화·공간·운영을 한 회사가 다 하는 곳은 드뭅니다. 우리는 그 교집합에 서 있습니다.',
    goalLabel: '목표',
    goals: [
      '국내 리테일: 편의점·드럭스토어·카페·무인매장의 디지털 매장 운영 인프라',
      '공간 확장: 공장·물류·시설·병원으로, 매장 외 매출 비중 30% 이상 (2031)',
      "글로벌: 일본·동남아 확장, '익명화 공간 AI' 선도 상위 3사",
    ],
  },
  en: {
    eyebrow: 'Next 5 years',
    aTitle: 'Vision 2031, the coordinates we aim for',
    aLead: 'Few companies do anonymization, space, and operations in one place. We stand at that intersection.',
    goalLabel: 'Goal',
    goals: [
      'Korean retail: the digital store-operations infrastructure for convenience stores, drugstores, cafés, and unmanned stores',
      'Beyond stores: factories, logistics, facilities, and hospitals; 30%+ of revenue outside stores (2031)',
      "Global: expansion across Japan and Southeast Asia; a top-3 leader in 'anonymized spatial AI'",
    ],
  },
  jp: {
    eyebrow: '今後5年',
    aTitle: 'Vision 2031、目指す座標',
    aLead: '匿名化・空間・運営をひとつの会社で担う所は多くありません。私たちはその交差点に立っています。',
    goalLabel: '目標',
    goals: [
      '国内リテール: コンビニ・ドラッグストア・カフェ・無人店舗のデジタル店舗運営インフラ',
      '空間の拡張: 工場・物流・施設・病院へ、店舗外売上比率30%以上 (2031)',
      'グローバル: 日本・東南アジアへ拡張、「匿名化空間AI」のトップ3',
    ],
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
  ko: { eyebrow: '왜 우리인가', head: '카메라는 결국, 사람을 봅니다.' },
  en: { eyebrow: 'Why us', head: 'A camera ultimately looks at people.' },
  jp: { eyebrow: 'なぜ私たちか', head: 'カメラは結局、人を見ます。' },
};

const ROLES: Record<Locale, { strip: string; enterprise: string; partnership: string }> = {
  ko: { strip: '함께 만드는 곳', enterprise: '엔터프라이즈 도입', partnership: '파트너십 · 협업 문의' },
  en: { strip: 'Where it comes together', enterprise: 'For enterprise', partnership: 'Partnership & collaboration' },
  jp: { strip: '共に創る場所', enterprise: 'エンタープライズ導入', partnership: 'パートナーシップ・協業のお問い合わせ' },
};

// 6B SAAI 브릿지는 홈·제품 재탕이라 한 줄 링크로 축소(AB B3) — CTA 섹션이 흡수.
const PRODUCTS_LINE: Record<Locale, { line: string; cta: string }> = {
  ko: { line: '이 방식은 세 제품이 되어 매장에서 돌아갑니다.', cta: '제품 보기' },
  en: { line: 'This approach runs in stores as three products.', cta: 'See the products' },
  jp: { line: 'この方式は、三つの製品として店舗で動いています。', cta: '製品を見る' },
};

const FUNDING_TOTAL: Record<Locale, string> = { ko: '약 300억', en: '~₩30B', jp: '約300億' };

const NAMING_MORE: Record<Locale, string> = { ko: '창업 배경', en: 'Founding story', jp: '創業の背景' };

const VM_LABELS: Record<Locale, { vision: string; mission: string }> = {
  ko: { vision: '비전', mission: '미션' },
  en: { vision: 'Vision', mission: 'Mission' },
  jp: { vision: 'ビジョン', mission: 'ミッション' },
};

const TOGETHER: Record<Locale, string> = { ko: '함께', en: 'Together', jp: '共に' };

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
  const productsLine = PRODUCTS_LINE[locale];

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

          {/* 마일스톤 카드 4장은 타임라인과 연혁 이중화라 삭제(AB B2) — 고유 사실
              (시리즈 A 55억·SOC 2 연도·특허 수)은 타임라인 항목으로 흡수. */}
        </div>
      </AnimatedSection>


      {/* ── 철학 — 이름의 유래 + Vision·Mission 실제 렌더 (AB §3 순서 3 · A3 완결) ── */}
      <Section variant="default" className="border-b border-gray-100">
        <Container size="medium">
          <div className="mx-auto max-w-3xl rounded-3xl border border-primary/15 bg-white p-8 sm:p-10 shadow-card">
            <Eyebrow className="mb-3">{t.namingHeading}</Eyebrow>
            <p className="text-gray-600 leading-relaxed break-keep">{t.namingBody}</p>
            {/* B5 읽기 레이어 — 스캔은 위 2문장으로 완결, 창업 배경은 펼침 */}
            <details className="mt-3 group">
              <summary className="cursor-pointer list-none text-sm font-bold text-primary inline-flex items-center gap-1">
                {NAMING_MORE[locale]}
                <span className="transition-transform group-open:rotate-90" aria-hidden="true">›</span>
              </summary>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed break-keep">{t.namingDetail}</p>
            </details>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="p-7 rounded-2xl bg-slate-50 border border-gray-100">
              <Eyebrow className="mb-2">{VM_LABELS[locale].vision}</Eyebrow>
              <p className="text-lg font-bold text-gray-900 break-keep leading-snug">{t.vision}</p>
            </div>
            <div className="p-7 rounded-2xl bg-slate-50 border border-gray-100">
              <Eyebrow className="mb-2">{VM_LABELS[locale].mission}</Eyebrow>
              <p className="text-lg font-bold text-gray-900 break-keep leading-snug">{t.mission}</p>
            </div>
          </div>
        </Container>
      </Section>

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
                    {/* J6: bio가 빈 리더(VPE)는 focus까지만 — 직함 동어반복 bio 제거 */}
                    {l.bio && <p className="text-sm text-gray-600 leading-relaxed break-keep">{l.bio}</p>}
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
          {/* 로고 밴드(AB B4) — 홈 PartnerGrid의 브랜드 명판 이식(로고 스프라이트 전환은 PR-17) */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 max-w-3xl mx-auto mb-10">
            {trustedBrands[locale].map((b) => (
              <span key={b} className="text-sm font-semibold text-gray-400 break-keep">{b}</span>
            ))}
          </div>

          {/* 스탯 재구성(AB B4): 약한 숫자(업종 7) 강등, 누적 투자 승격, 인증 셀 통합 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[FUNDING_TOTAL[locale], `${COMPANY.patents}`, `${COMPANY.partnerBrands}`, 'SOC 2 · PIPA'].map((stat, i) => (
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

      {/* ── 향후 5년 (축소 — AB B3·J1·D7): 다크 목업 대신 텍스트 3줄, 목표는 '목표' 라벨 ── */}
      <Section variant="default" className="border-b border-gray-100">
        <Container size="medium">
          <div className="text-center max-w-3xl mx-auto">
            <Eyebrow className="mb-3">{nx.eyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-display break-keep">{nx.aTitle}</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed break-keep">{nx.aLead}</p>
          </div>
          <ul className="mt-10 max-w-2xl mx-auto space-y-3">
            {nx.goals.map((g) => (
              <li key={g} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-gray-100">
                <span className="shrink-0 mt-0.5 inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-2xs font-bold text-primary">
                  {nx.goalLabel}
                </span>
                <span className="text-sm text-gray-700 break-keep leading-relaxed">{g}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 6C. Final CTA Section */}
      <AnimatedSection className="py-20 lg:py-28 bg-surface-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Award className="w-10 h-10 text-primary-light mx-auto mb-6" />
          <p className="text-xs font-bold text-primary-light mb-4 tracking-widest uppercase">{TOGETHER[locale]}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-display break-keep whitespace-pre-line">
            {t.ctaHeading}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-6 break-keep">
            {t.ctaSub}
          </p>
          {/* 구 6B 브릿지의 축소형(AB B3) — 제품 설득은 제품 페이지의 잡, 여기선 한 줄 */}
          <p className="text-sm text-slate-400 mb-10 break-keep">
            {productsLine.line}{' '}
            <Link href={localeHref(locale, '/products')} className="font-bold text-primary-light hover:text-white transition-colors">
              {productsLine.cta} →
            </Link>
          </p>
          <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg gap-2 rounded-xl inline-flex items-center">
            {t.ctaButton} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
