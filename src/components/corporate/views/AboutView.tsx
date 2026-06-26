import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import ProcessStepper from '@/components/ui/ProcessStepper';
import { OriginStoryTimeline } from '@/components/about/OriginStoryTimeline';
import VisionDiagram from '@/components/company/VisionDiagram';
import MasterPair from '@/components/corporate/MasterPair';
import VisionCoordinatesMockup from '@/components/mockups/VisionCoordinatesMockup';
import {
  ArrowRight, Lock, Maximize, Calendar, Award, Handshake, ShieldCheck, Cpu,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import { milestoneHighlights } from '@/lib/company-milestones';
import { leadership } from '@/lib/leadership';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { companyLine, perfectSpace, purpose } from '@/lib/brand-canon';

/**
 * AboutView — shared locale-aware About composition.
 * Rendered by `/company/about` (en), `/ko/company/about`, `/jp/company/about`.
 * VisionDiagram + OriginStoryTimeline keep their internal Korean (out of scope).
 */

type Copy = {
  badge: string;
  heroEyebrowCompany: string;
  heroMasterCompany: string;
  heroEyebrowOwner: string;
  heroMasterOwner: string;
  companyIntro: string;
  companyIntro2: string;
  vmEyebrow: string;
  vision: string;
  visionLabel: string;
  missionLabel: string;
  mission: string;
  storyEyebrow: string;
  storyHeading: string;
  storySub: string;
  leadershipEyebrow: string;
  leadershipHeading: string;
  leadershipSub: string;
  partnersEyebrow: string;
  partnersHeading: string;
  partnersSub: string;
  partnerStatLabels: string[];
  partnerStatsNote: string;
  certsLabel: string;
  certs: { label: string; sub: string }[];
  ctaHeading: string;
  ctaSub: string;
  ctaButton: string;
};

const C: Record<Locale, Copy> = {
  ko: {
    badge: 'About DeepingSource',
    heroEyebrowCompany: '온라인은',
    heroMasterCompany: '측정으로\n최적화됐다',
    heroEyebrowOwner: '현장은',
    heroMasterOwner: '거의\n그대로였다',
    companyIntro: '온라인은 지난 20년, 끊임없이 측정하고 개선해 왔습니다. 그동안 현장은 사람의 손과 눈에 기대어, 거의 그대로였습니다.',
    companyIntro2: '딥핑소스는 그 현장을 다시 만듭니다.',
    vmEyebrow: 'Vision & Mission',
    vision: '당신의 공간에서, 모든 공간으로',
    visionLabel: 'Vision',
    missionLabel: 'Mission',
    mission: '측정할 수 있으면, 나아질 수 있습니다. 온라인을 바꾼 그 힘을, 이제 물리 세계로.',
    storyEyebrow: 'Our Story',
    storyHeading: '익명화에서, 물리 세계로',
    storySub: '우리는 익명화에서 시작했습니다. 비전 AI로 공간을 읽다가, 사람이 일하는 물리 세계를 만났습니다.',
    leadershipEyebrow: 'Leadership',
    leadershipHeading: '공간을 다시 만드는 사람들',
    leadershipSub: '익명화의 뿌리, 글로벌 사업, 엔지니어링 실행 — 세 축이 같은 목표를 봅니다.',
    partnersEyebrow: 'Trusted Partners',
    partnersHeading: `${COMPANY.partnerBrands}개 파트너 브랜드가 함께합니다`,
    partnersSub: `${COMPANY.industries}개 업종에서 검증된 SAAI. ${COMPANY.nvidiaPartner}로서 글로벌 표준을 따릅니다.`,
    partnerStatLabels: ['파트너 브랜드', '지원 업종', '특허', '규제 준수'],
    partnerStatsNote: '* 파트너·업종·특허 수는 자사 집계 기준 (2026). 규제 준수는 개인정보보호법(PIPA) 기준.',
    certsLabel: 'Awards & Credentials',
    certs: [
      { label: 'SOC 2', sub: '정보보안 통제 인증 (2024)' },
      { label: 'NextRise 2024', sub: '‘Top Innovator’ 수상' },
      { label: COMPANY.nvidiaPartner, sub: '글로벌 AI 스타트업 프로그램' },
    ],
    ctaHeading: '데이터센터가 아니라,\n사람이 사는 세상을',
    ctaSub: '도입 문의부터 협업 제안까지, 무엇이든 편하게 연락 주세요',
    ctaButton: '문의하기',
  },
  en: {
    badge: 'About DeepingSource',
    heroEyebrowCompany: 'Online',
    heroMasterCompany: 'got optimized\nby measurement.',
    heroEyebrowOwner: 'The physical world',
    heroMasterOwner: 'stayed\nlargely the same.',
    companyIntro: 'For twenty years, online never stopped measuring and improving. The physical world, meanwhile, leaned on human hands and eyes — and barely changed.',
    companyIntro2: 'DeepingSource is here to reinvent it.',
    vmEyebrow: 'Vision & Mission',
    vision: 'From your space — to every space.',
    visionLabel: 'Vision',
    missionLabel: 'Mission',
    mission: 'If you can measure it, you can improve it. We bring the force that remade online to the physical world.',
    storyEyebrow: 'Our Story',
    storyHeading: 'From anonymization to the physical world',
    storySub: 'We started with anonymization. Reading space with vision AI, we met the physical world — where people work and live.',
    leadershipEyebrow: 'Leadership',
    leadershipHeading: 'The people remaking space',
    leadershipSub: 'Roots in anonymization, global business, and engineering execution — three axes, one goal.',
    partnersEyebrow: 'Trusted Partners',
    partnersHeading: `${COMPANY.partnerBrands} partner brands work with us`,
    partnersSub: `SAAI proven across ${COMPANY.industries} industries. As an ${COMPANY.nvidiaPartner}, we follow the global standard.`,
    partnerStatLabels: ['Partner brands', 'Industries served', 'Patents', 'Compliance'],
    partnerStatsNote: '* Partner, industry, and patent counts are company figures (as of 2026). Compliance per Korea PIPA.',
    certsLabel: 'Awards & Credentials',
    certs: [
      { label: 'SOC 2', sub: 'Security controls certification (2024)' },
      { label: 'NextRise 2024', sub: '‘Top Innovator’ award' },
      { label: COMPANY.nvidiaPartner, sub: 'Global AI startup program' },
    ],
    ctaHeading: 'Not a world in a data center —\nthe world people live in',
    ctaSub: 'From adoption inquiries to partnership proposals, reach out anytime.',
    ctaButton: 'Get in touch',
  },
  jp: {
    badge: 'About DeepingSource',
    heroEyebrowCompany: 'オンラインは',
    heroMasterCompany: '測定で\n最適化された。',
    heroEyebrowOwner: '現場は',
    heroMasterOwner: 'ほぼ\nそのままだった。',
    companyIntro: 'オンラインはこの20年、絶えず測定し改善し、最適化されてきました。その間、現場は人の手と目に頼り、ほぼそのままでした。',
    companyIntro2: 'ディーピングソースは、その現場を作り直します。',
    vmEyebrow: 'Vision & Mission',
    vision: 'あなたの空間から、すべての空間へ。',
    visionLabel: 'Vision',
    missionLabel: 'Mission',
    mission: '測定できれば、よくできます。オンラインを変えたその力を、いま物理世界へ。',
    storyEyebrow: 'Our Story',
    storyHeading: '匿名化から、物理世界へ',
    storySub: '私たちは匿名化から始めました。ビジョンAIで空間を読むうちに、人が働く物理世界に出会いました。',
    leadershipEyebrow: 'Leadership',
    leadershipHeading: '空間を作り直す人々',
    leadershipSub: '匿名化のルーツ、グローバル事業、エンジニアリングの実行 — 三つの軸が同じ目標を見ます。',
    partnersEyebrow: 'Trusted Partners',
    partnersHeading: `${COMPANY.partnerBrands}社のパートナーブランドがともにあります`,
    partnersSub: `${COMPANY.industries}業種で実証されたSAAI。${COMPANY.nvidiaPartner}として、グローバル標準に準拠します。`,
    partnerStatLabels: ['パートナーブランド', '対応業種', '特許', '規制準拠'],
    partnerStatsNote: '* パートナー・業種・特許数は自社集計基準 (2026)。規制準拠は個人情報保護法(PIPA)基準。',
    certsLabel: 'Awards & Credentials',
    certs: [
      { label: 'SOC 2', sub: '情報セキュリティ統制認証 (2024)' },
      { label: 'NextRise 2024', sub: '「Top Innovator」受賞' },
      { label: COMPANY.nvidiaPartner, sub: 'グローバルAIスタートアップ・プログラム' },
    ],
    ctaHeading: 'データセンターの中ではなく、\n人が暮らす世界を',
    ctaSub: '導入のお問い合わせから協業のご提案まで、お気軽にご連絡ください。',
    ctaButton: 'お問い合わせ',
  },
};

type MethodStep = { key: string; term: string; promise: string };

const methodCopy: Record<Locale, { eyebrow: string; heading: string; intro: string; steps: MethodStep[]; closing: string }> = {
  ko: {
    eyebrow: 'How we work',
    heading: '익명화 위에 공간 지능, 그 위에 에이전트 AI',
    intro: '비전 AI는 결국 사람을 봅니다. 우리는 익명화에서 시작해, 세 개의 축으로 공간을 읽고 운영합니다.',
    steps: [
      { key: 'anonymizer', term: '① 익명화 · Anonymizer', promise: '입력 시점에 신원을 지웁니다. 누구인지는 남기지 않고, 무엇을 어떻게만 봅니다.' },
      { key: 'spatial', term: '② 공간 지능 · Spatial AI', promise: '머문 곳, 흐른 길, 닿은 손길까지 — 비전 모델로 공간을 좌표 위에 읽어냅니다.' },
      { key: 'agentic', term: '③ 에이전트 AI · Agentic AI', promise: '보는 데서 그치지 않고 다음 한 수를 권합니다. 권고는 AI가, 결정은 사람이.' },
    ],
    closing: purpose.ko.closing,
  },
  en: {
    eyebrow: 'How we work',
    heading: 'Spatial AI on anonymization, agents on top',
    intro: 'Vision AI ultimately looks at people. We start with anonymization, then read and run the space across three layers.',
    steps: [
      { key: 'anonymizer', term: '① Anonymizer', promise: 'Identity is erased at the moment of input. Never who — only what and how.' },
      { key: 'spatial', term: '② Spatial AI', promise: 'Where people pause, how they flow, what they touch — vision models map the space onto coordinates.' },
      { key: 'agentic', term: '③ Agentic AI', promise: 'It does not stop at seeing. It recommends the next move — AI advises, people decide.' },
    ],
    closing: purpose.en.closing,
  },
  jp: {
    eyebrow: 'How we work',
    heading: '匿名化の上に空間知能、その上にエージェントAI',
    intro: 'ビジョンAIは結局、人を見ます。私たちは匿名化から始め、三つの軸で空間を読み、運営します。',
    steps: [
      { key: 'anonymizer', term: '① 匿名化 · Anonymizer', promise: '入力の時点で身元を消します。誰かではなく、何をどうだけを見ます。' },
      { key: 'spatial', term: '② 空間知能 · Spatial AI', promise: '滞留した場所、流れた道、触れた手まで — ビジョンモデルが空間を座標の上に読み解きます。' },
      { key: 'agentic', term: '③ エージェントAI · Agentic AI', promise: '見るだけで終わらず、次の一手を提案します。推奨はAI、決定は人。' },
    ],
    closing: purpose.jp.closing,
  },
};

const certIcons = [ShieldCheck, Award, Cpu];

export default function AboutView({ locale }: { locale: Locale }) {
  const t = C[locale];
  const method = methodCopy[locale];
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero · 두 마스터 카피 미러 ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-surface-dark" aria-hidden="true" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('about', locale), path: '/company/about' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark" className="mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t.badge}
          </HeroBadge>

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

          <h1 className="mt-10 text-xl sm:text-2xl font-bold text-white max-w-2xl mx-auto leading-snug break-keep">
            {companyLine[locale]}
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.companyIntro}
          </p>
          <p className="mt-3 text-lg text-white font-medium max-w-2xl mx-auto leading-relaxed break-keep">
            {t.companyIntro2}
          </p>
          <p className="mt-6 text-sm text-slate-400 max-w-xl mx-auto break-keep">
            {perfectSpace.your[locale]} → {perfectSpace.every[locale]}
          </p>
        </div>
      </section>

      {/* ── 비전 / 미션 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.vmEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep">{t.vision}</h2>
          </div>

          <div className="mb-12">
            <VisionDiagram locale={locale} />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="p-8 rounded-3xl bg-slate-50 border border-gray-100">
              <Lock className="w-6 h-6 text-primary mb-4" />
              <p className="text-xs font-bold text-primary mb-2 tracking-wider uppercase">{t.visionLabel}</p>
              <p className="text-gray-900 font-medium text-lg break-keep">{t.vision}</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-gray-100">
              <Maximize className="w-6 h-6 text-primary mb-4" />
              <p className="text-xs font-bold text-primary mb-2 tracking-wider uppercase">{t.missionLabel}</p>
              <p className="text-gray-900 font-medium text-lg break-keep">{t.mission}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 두 약속 미러 · 본부 ↔ 매장 ── */}
      <MasterPair locale={locale} />

      {/* ── Vision 2031 좌표 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <VisionCoordinatesMockup locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── 우리가 일하는 법 · 익명화 → 공간 지능 → 에이전트 AI ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{method.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{method.heading}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto break-keep">{method.intro}</p>
          </div>

          <ProcessStepper
            ariaLabel={method.heading}
            steps={method.steps.map((s, i) => ({ label: `0${i + 1}`, title: s.term, desc: s.promise }))}
          />

          <p className="mt-12 text-center text-base sm:text-lg text-gray-500 italic break-keep">
            {method.closing}
          </p>
        </div>
      </AnimatedSection>

      {/* ── 연혁 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.storyEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.storyHeading}
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto break-keep">
              {t.storySub}
            </p>
          </div>

          <div className="mb-16">
            <OriginStoryTimeline locale={locale} />
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
            {t.partnersHeading}
          </h2>
          <p className="text-lg text-gray-500 mb-10 break-keep">
            {t.partnersSub}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[`${COMPANY.partnerBrands}`, `${COMPANY.industries}`, `${COMPANY.patents}`, 'PIPA'].map((stat, i) => (
              <div key={i} className="p-5 bg-white rounded-2xl border border-gray-100">
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat}</p>
                <p className="text-xs text-gray-500 font-medium">
                  {t.partnerStatLabels[i]}
                </p>
              </div>
            ))}
          </div>
          <p className="text-2xs text-gray-400 mt-5 break-keep">{t.partnerStatsNote}</p>

          <p className="text-xs font-bold text-primary mt-12 mb-5 tracking-wider uppercase">{t.certsLabel}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {t.certs.map((c, i) => {
              const Icon = certIcons[i];
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
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Award className="w-12 h-12 text-primary mx-auto mb-8" />
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
