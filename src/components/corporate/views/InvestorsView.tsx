import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { CountUp } from '@/components/ui/CountUp';
import {
  ArrowRight, TrendingUp, Cpu, FileText, Download, Mail, Target, Building2, Map,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';

/**
 * InvestorsView — shared locale-aware IR composition.
 * Rendered by `/company/investors` (en), `/ko/company/investors`, `/jp/company/investors`.
 */

type Copy = {
  badge: string;
  heroMaster: string;
  heroMasterAccent: string;
  heroSub: string;
  visionEyebrow: string;
  visionHeading: string;
  visionBody: string;
  marketEyebrow: string;
  marketHeading: string;
  marketSub: string;
  marketTracks: { title: string; desc: string }[];
  tractionEyebrow: string;
  tractionHeading: string;
  tractionSub: string;
  traction: { to: number; suffix: string; label: string; sub: string }[];
  tractionFootnote: string;
  milestonesEyebrow: string;
  milestonesHeading: string;
  milestones: { year: string; title: string; desc: string }[];
  downloadsEyebrow: string;
  downloadsHeading: string;
  downloadsNote: string;
  downloads: { name: string; desc: string }[];
  comingSoon: string;
  mailSubject: string;
  ctaHeading: string;
  ctaSub: string;
  ctaForm: string;
};

const C: Record<Locale, Copy> = {
  ko: {
    badge: 'Investor Relations',
    heroMaster: '모든 매장을',
    heroMasterAccent: '한 매장처럼.',
    heroSub: 'Physical AI 시대, 익명화 기술로 오프라인 공간을 이해하고 운영을 자동화합니다.',
    visionEyebrow: 'Vision 2031',
    visionHeading: COMPANY.vision,
    visionBody: `매장에서 시작해 빌딩 · 공공 · 레저까지. ${COMPANY.foundingYear}년 한 점주의 질문에서 출발한 익명화 AI를 세상 모든 오프라인 공간의 표준 인텔리전스로 확장합니다.`,
    marketEyebrow: 'Market',
    marketHeading: 'Physical AI — 다음 거대한 물결',
    marketSub: '디지털을 넘어 물리 세계를 이해하는 AI. 그 중심에 오프라인 공간 데이터가 있습니다.',
    marketTracks: [
      { title: '디지털 → 물리 세계로', desc: '언어 · 이미지를 넘어, AI가 물리 공간을 이해하고 행동하는 Physical AI로 패러다임이 이동합니다. 그 출발점이 오프라인 공간 데이터입니다.' },
      { title: '공간 인텔리전스의 표준', desc: '매장에서 검증한 익명화 공간 이해를 빌딩 · 공공 · 레저로 확장합니다. 개인정보를 건드리지 않고 모든 공간을 운영 가능한 데이터로 만듭니다.' },
    ],
    tractionEyebrow: 'Traction',
    tractionHeading: '숫자로 증명한 기술력',
    tractionSub: `${COMPANY.nvidiaPartner}로서, 검증된 특허와 레퍼런스를 쌓아왔습니다.`,
    traction: [
      { to: COMPANY.patents, suffix: '건', label: '누적 특허', sub: COMPANY.patentsLabel },
      { to: COMPANY.partnerBrands, suffix: '개', label: '파트너 브랜드', sub: '리테일 협력' },
      { to: COMPANY.industries, suffix: '개', label: '적용 업종', sub: '검증된 레퍼런스' },
    ],
    tractionFootnote: `${COMPANY.nvidiaPartner} · 설립 ${COMPANY.foundingYear}년`,
    milestonesEyebrow: 'Milestones',
    milestonesHeading: '한 점주의 질문에서 표준까지',
    milestones: [
      { year: `${COMPANY.foundingYear}`, title: '창업', desc: '한 점주의 질문에서 출발 — 익명화 AI로 오프라인 공간을 이해하다.' },
      { year: '2020', title: COMPANY.nvidiaPartner, desc: '글로벌 AI 스타트업 프로그램 합류로 기술 생태계 기반 확보.' },
      { year: '2023', title: '파트너 · 업종 확장', desc: `${COMPANY.partnerBrands}개 파트너 브랜드와 ${COMPANY.industries}개 업종으로 적용 범위 확대.` },
      { year: '2024', title: `특허 ${COMPANY.patents}건`, desc: `${COMPANY.patentsLabel} — 익명화 · 공간 이해 기술 포트폴리오 고도화.` },
      { year: '2025', title: 'SAAI 플랫폼', desc: '리테일 Spatial Agentic AI 플랫폼으로 운영 자동화 본격화.' },
      { year: '2031', title: '비전', desc: COMPANY.vision },
    ],
    downloadsEyebrow: 'Downloads',
    downloadsHeading: '자료실',
    downloadsNote: '※ 자료는 준비 중입니다. 공개 시 다운로드가 활성화됩니다.',
    downloads: [
      { name: 'Brand Deck', desc: '브랜드 · 비전 소개 자료' },
      { name: 'Brand Book', desc: '브랜드 가이드라인' },
      { name: 'OnePager', desc: '한 장 요약 소개서' },
      { name: 'IR Deck', desc: '투자 설명 자료' },
    ],
    comingSoon: '준비 중',
    mailSubject: 'IR 문의',
    ctaHeading: 'IR 문의',
    ctaSub: '투자 및 IR 관련 문의는 아래로 연락 주세요',
    ctaForm: '문의 양식',
  },
  en: {
    badge: 'Investor Relations',
    heroMaster: 'Every store,',
    heroMasterAccent: 'like one.',
    heroSub: 'In the Physical AI era, we understand offline spaces with anonymization technology and automate operations.',
    visionEyebrow: 'Vision 2031',
    visionHeading: 'All the world’s data, kept safe — all the world’s spaces, made perfect.',
    visionBody: `From stores to buildings, public spaces, and leisure. We scale the anonymization AI that began in ${COMPANY.foundingYear} with one store owner’s question into the standard intelligence for every offline space in the world.`,
    marketEyebrow: 'Market',
    marketHeading: 'Physical AI — the next great wave',
    marketSub: 'AI that understands the physical world beyond the digital. Offline spatial data sits at its center.',
    marketTracks: [
      { title: 'From digital to the physical world', desc: 'Beyond language and images, the paradigm is shifting to Physical AI — AI that understands and acts in physical space. Offline spatial data is its starting point.' },
      { title: 'The standard for spatial intelligence', desc: 'We extend the anonymized spatial understanding proven in stores to buildings, public spaces, and leisure — turning every space into operable data without ever touching personal data.' },
    ],
    tractionEyebrow: 'Traction',
    tractionHeading: 'Technical strength proven in numbers',
    tractionSub: `As an ${COMPANY.nvidiaPartner}, we have built verified patents and references.`,
    traction: [
      { to: COMPANY.patents, suffix: '', label: 'Cumulative patents', sub: 'Registered 66 · Pending 37' },
      { to: COMPANY.partnerBrands, suffix: '', label: 'Partner brands', sub: 'Retail collaborations' },
      { to: COMPANY.industries, suffix: '', label: 'Industries applied', sub: 'Verified references' },
    ],
    tractionFootnote: `${COMPANY.nvidiaPartner} · Founded ${COMPANY.foundingYear}`,
    milestonesEyebrow: 'Milestones',
    milestonesHeading: 'From one store owner’s question to the standard',
    milestones: [
      { year: `${COMPANY.foundingYear}`, title: 'Founded', desc: 'Born from one store owner’s question — understanding offline spaces with anonymization AI.' },
      { year: '2020', title: COMPANY.nvidiaPartner, desc: 'Secured a technology-ecosystem foundation by joining the global AI startup program.' },
      { year: '2023', title: 'Partner · industry expansion', desc: `Expanded reach to ${COMPANY.partnerBrands} partner brands across ${COMPANY.industries} industries.` },
      { year: '2024', title: `${COMPANY.patents} patents`, desc: 'Registered 66 · Pending 37 — advancing our anonymization and spatial-understanding portfolio.' },
      { year: '2025', title: 'SAAI platform', desc: 'Scaling operational automation as a retail Spatial Agentic AI platform.' },
      { year: '2031', title: 'Vision', desc: 'All the world’s data, kept safe — all the world’s spaces, made perfect.' },
    ],
    downloadsEyebrow: 'Downloads',
    downloadsHeading: 'Resources',
    downloadsNote: '※ Materials are in preparation. Downloads will be enabled once published.',
    downloads: [
      { name: 'Brand Deck', desc: 'Brand · vision overview' },
      { name: 'Brand Book', desc: 'Brand guidelines' },
      { name: 'OnePager', desc: 'One-page summary' },
      { name: 'IR Deck', desc: 'Investor presentation' },
    ],
    comingSoon: 'Coming soon',
    mailSubject: 'IR inquiry',
    ctaHeading: 'IR inquiries',
    ctaSub: 'For investment and IR inquiries, reach us below.',
    ctaForm: 'Inquiry form',
  },
  jp: {
    badge: 'Investor Relations',
    heroMaster: 'すべての店舗を',
    heroMasterAccent: 'ひとつの店舗のように。',
    heroSub: 'Physical AIの時代、匿名化技術でオフライン空間を理解し、運営を自動化します。',
    visionEyebrow: 'Vision 2031',
    visionHeading: '世界中のすべてのデータを安全に、世界中のすべての空間を完璧に。',
    visionBody: `店舗から始まり、ビル · 公共 · レジャーまで。${COMPANY.foundingYear}年、一軒の店主の問いから出発した匿名化AIを、世界中のすべてのオフライン空間の標準インテリジェンスへと拡張します。`,
    marketEyebrow: 'Market',
    marketHeading: 'Physical AI — 次の大きな波',
    marketSub: 'デジタルを超えて物理世界を理解するAI。その中心にオフライン空間データがあります。',
    marketTracks: [
      { title: 'デジタルから物理世界へ', desc: '言語 · 画像を超え、AIが物理空間を理解し行動するPhysical AIへとパラダイムが移行します。その出発点がオフライン空間データです。' },
      { title: '空間インテリジェンスの標準', desc: '店舗で検証した匿名化空間理解を、ビル · 公共 · レジャーへ拡張します。個人情報に触れることなく、すべての空間を運営可能なデータに変えます。' },
    ],
    tractionEyebrow: 'Traction',
    tractionHeading: '数字で証明した技術力',
    tractionSub: `${COMPANY.nvidiaPartner}として、検証された特許とリファレンスを積み重ねてきました。`,
    traction: [
      { to: COMPANY.patents, suffix: '件', label: '累計特許', sub: '登録66件 · 出願37件' },
      { to: COMPANY.partnerBrands, suffix: '社', label: 'パートナーブランド', sub: 'リテール協力' },
      { to: COMPANY.industries, suffix: '業種', label: '適用業種', sub: '検証されたリファレンス' },
    ],
    tractionFootnote: `${COMPANY.nvidiaPartner} · 設立${COMPANY.foundingYear}年`,
    milestonesEyebrow: 'Milestones',
    milestonesHeading: '一軒の店主の問いから標準まで',
    milestones: [
      { year: `${COMPANY.foundingYear}`, title: '創業', desc: '一軒の店主の問いから出発 — 匿名化AIでオフライン空間を理解する。' },
      { year: '2020', title: COMPANY.nvidiaPartner, desc: 'グローバルAIスタートアッププログラム参加で技術エコシステムの基盤を確保。' },
      { year: '2023', title: 'パートナー · 業種の拡大', desc: `${COMPANY.partnerBrands}社のパートナーブランドと${COMPANY.industries}業種へ適用範囲を拡大。` },
      { year: '2024', title: `特許${COMPANY.patents}件`, desc: '登録66件 · 出願37件 — 匿名化 · 空間理解の技術ポートフォリオを高度化。' },
      { year: '2025', title: 'SAAIプラットフォーム', desc: 'リテールSpatial Agentic AIプラットフォームとして運営自動化を本格化。' },
      { year: '2031', title: 'ビジョン', desc: '世界中のすべてのデータを安全に、世界中のすべての空間を完璧に。' },
    ],
    downloadsEyebrow: 'Downloads',
    downloadsHeading: '資料室',
    downloadsNote: '※ 資料は準備中です。公開時にダウンロードが有効になります。',
    downloads: [
      { name: 'Brand Deck', desc: 'ブランド · ビジョン紹介資料' },
      { name: 'Brand Book', desc: 'ブランドガイドライン' },
      { name: 'OnePager', desc: '一枚要約紹介書' },
      { name: 'IR Deck', desc: '投資説明資料' },
    ],
    comingSoon: '準備中',
    mailSubject: 'IRのお問い合わせ',
    ctaHeading: 'IRのお問い合わせ',
    ctaSub: '投資およびIRに関するお問い合わせは下記までご連絡ください。',
    ctaForm: 'お問い合わせフォーム',
  },
};

const marketIcons = [Cpu, Building2];

export default function InvestorsView({ locale }: { locale: Locale }) {
  const t = C[locale];
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(55,106,226,0.18),transparent)]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('investors', locale), path: '/company/investors' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <TrendingUp className="w-3.5 h-3.5" />
            {t.badge}
          </HeroBadge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            {t.heroMaster}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-primary-light">
              {t.heroMasterAccent}
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* ── 2031 비전 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Target className="w-7 h-7 text-primary mx-auto mb-5" />
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.visionEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 break-keep">{t.visionHeading}</h2>
          <p className="text-lg text-gray-500 leading-relaxed break-keep">
            {t.visionBody}
          </p>
        </div>
      </AnimatedSection>

      {/* ── 시장 (Physical AI 두 갈래) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Cpu className="w-7 h-7 text-primary mx-auto mb-5" />
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.marketEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.marketHeading}
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto break-keep">
              {t.marketSub}
            </p>
          </div>
          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {t.marketTracks.map((m, i) => {
              const Icon = marketIcons[i];
              return (
                <StaggerItem key={m.title}>
                  <div className="p-8 lg:p-10 bg-white rounded-3xl border border-gray-100 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 break-keep">{m.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{m.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 트랙션 지표 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.tractionEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.tractionHeading}</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto break-keep">
              {t.tractionSub}
            </p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-3 gap-5 mb-5">
            {t.traction.map((tr) => (
              <StaggerItem key={tr.label}>
                <div className="p-8 bg-slate-50 rounded-3xl border border-gray-100 h-full text-center">
                  <p className="text-4xl sm:text-5xl font-bold text-primary mb-3">
                    <CountUp to={tr.to} suffix={tr.suffix} />
                  </p>
                  <p className="text-base font-bold text-gray-900 mb-1 break-keep">{tr.label}</p>
                  <p className="text-xs text-gray-500 break-keep">{tr.sub}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="p-6 rounded-3xl border border-primary/15 bg-primary/[0.03] text-center">
            <p className="text-sm font-medium text-gray-700 break-keep">
              {t.tractionFootnote}
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 연혁 · 마일스톤 타임라인 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Map className="w-7 h-7 text-primary mx-auto mb-5" />
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.milestonesEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep">{t.milestonesHeading}</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gray-200" aria-hidden="true" />
            <StaggerContainer className="space-y-8">
              {t.milestones.map((m) => (
                <StaggerItem key={m.year}>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-slate-50" aria-hidden="true" />
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-sm font-bold text-primary">{m.year}</span>
                      <h3 className="text-base font-bold text-gray-900 break-keep">{m.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{m.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 자료 다운로드 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.downloadsEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.downloadsHeading}</h2>
            <p className="text-sm text-gray-500 break-keep">
              {t.downloadsNote}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.downloads.map((d) => (
              <div key={d.name} className="p-6 rounded-3xl border border-gray-100 bg-slate-50 text-center flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
                  <FileText className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{d.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-5 break-keep">{d.desc}</p>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="mt-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-gray-500 text-sm font-medium cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  {t.comingSoon}
                </button>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── IR Contact ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep">{t.ctaHeading}</h2>
          <p className="text-slate-300 text-lg mb-10 break-keep">
            {t.ctaSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`mailto:${COMPANY.contactEmail}?subject=${encodeURIComponent(t.mailSubject)}`} className="btn-primary-dark btn-lg gap-2 rounded-xl">
              {COMPANY.contactEmail} <ArrowRight className="w-4 h-4" />
            </a>
            <Link href={localeHref(locale, '/contact')} className="btn-ghost-dark btn-lg gap-2 rounded-xl">
              {t.ctaForm}
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
