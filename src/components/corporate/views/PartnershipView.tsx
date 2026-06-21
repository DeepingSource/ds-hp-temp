import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import {
  ArrowRight, Handshake, Store, Building2, Globe, Check,
  TrendingUp, BookOpen, LifeBuoy, Megaphone, ClipboardList, GraduationCap, Rocket, Repeat,
} from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';

/**
 * PartnershipView — shared locale-aware Partnership composition.
 * Rendered by `/company/partnership` (en), `/ko/company/partnership`, `/jp/company/partnership`.
 */

type Copy = {
  badge: string;
  heroMaster: string;
  heroMasterAccent: string;
  heroSub: string;
  tiersEyebrow: string;
  tiersHeading: string;
  tiersSub: string;
  tiers: { name: string; desc: string; perks: string[] }[];
  benefitsEyebrow: string;
  benefitsHeading: string;
  benefitsSub: string;
  partnerBenefits: { title: string; desc: string }[];
  onboardingEyebrow: string;
  onboardingHeading: string;
  onboardingSub: string;
  onboarding: { step: string; title: string; desc: string }[];
  ctaHeading: string;
  ctaSub: string;
  ctaButton: string;
};

const C: Record<Locale, Copy> = {
  ko: {
    badge: 'Partnership',
    heroMaster: '파트너의 매장도',
    heroMasterAccent: '한 매장처럼',
    heroSub: '리셀러·채널·기술 파트너로 함께 오프라인 공간 AI 시장을 넓혀갑니다. 역할에 맞는 협업 방법을 함께 찾아 드립니다.',
    tiersEyebrow: 'Partner Program',
    tiersHeading: '함께 성장하는 세 가지 길',
    tiersSub: '역할에 맞는 프로그램으로 시작하고, 함께 확장합니다',
    tiers: [
      { name: '리셀러 · 설치 파트너', desc: '현장 CCTV 환경 진단부터 설치, 초기 운영까지 담당하며 SAAI를 재판매하는 파트너', perks: ['설치 교육 · 인증 제공', '현장 진단 툴킷', '기술 지원 우선 채널'] },
      { name: '채널 · 영업 파트너', desc: 'SAAI를 자사 고객에게 제안하고 함께 성장하는 영업 파트너', perks: ['공동 영업 자료', '리드 공유 프로그램', '파트너 인센티브'] },
      { name: '기술 · SI 파트너', desc: 'POS·VMS 등 자사 솔루션과 SAAI를 연동·통합하는 기술 파트너', perks: ['API · 연동 문서', '공동 개발 협력', '레퍼런스 공동 마케팅'] },
    ],
    benefitsEyebrow: 'Why Partner',
    benefitsHeading: '파트너가 누리는 것',
    benefitsSub: '제품과 지원을 함께 제공해, 파트너의 비즈니스가 안정적으로 성장하도록 돕습니다.',
    partnerBenefits: [
      { title: '함께 키우는 시장', desc: 'SAAI와 함께 오프라인 공간 AI라는 새로운 매출 기회를 엽니다.' },
      { title: '교육 · 인증', desc: '제품 · 설치 · 영업 교육과 파트너 인증으로 빠르게 전문성을 갖춥니다.' },
      { title: '전담 기술 지원', desc: '온보딩부터 운영까지 파트너 전용 지원 채널이 함께합니다.' },
      { title: '공동 마케팅', desc: '레퍼런스 · 사례 기반의 공동 마케팅으로 신뢰를 함께 만듭니다.' },
    ],
    onboardingEyebrow: 'Onboarding',
    onboardingHeading: '파트너 온보딩 절차',
    onboardingSub: '신청부터 확장까지, 단계별로 함께합니다.',
    onboarding: [
      { step: '01', title: '신청 · 적합성 검토', desc: '파트너 유형과 사업 영역을 확인하고 협업 방향을 정합니다.' },
      { step: '02', title: '교육 · 인증', desc: '제품과 설치 · 영업 과정을 거쳐 파트너 인증을 받습니다.' },
      { step: '03', title: '공동 영업 · 파일럿', desc: '첫 레퍼런스를 함께 만들고 운영을 점검합니다.' },
      { step: '04', title: '확장 · 정산', desc: '검증된 모델을 반복 확장하고 인센티브를 정산합니다.' },
    ],
    ctaHeading: '파트너가 되어 함께 확장하세요',
    ctaSub: '어떤 역할이든, 함께할 방법을 찾아 드립니다',
    ctaButton: '파트너 신청 · 문의',
  },
  en: {
    badge: 'Partnership',
    heroMaster: 'Your store, partner,',
    heroMasterAccent: 'like one too',
    heroSub: 'As reseller, channel, and technology partners, we grow the offline spatial AI market together. We’ll find the way to collaborate that fits your role.',
    tiersEyebrow: 'Partner Program',
    tiersHeading: 'Three paths to grow together',
    tiersSub: 'Start with the program that fits your role, and expand together.',
    tiers: [
      { name: 'Reseller · Installation partner', desc: 'A partner who handles on-site CCTV assessment, installation, and early operations while reselling SAAI.', perks: ['Installation training · certification', 'On-site assessment toolkit', 'Priority technical-support channel'] },
      { name: 'Channel · Sales partner', desc: 'A sales partner who proposes SAAI to their own customers and grows with us.', perks: ['Joint sales materials', 'Lead-sharing program', 'Partner incentives'] },
      { name: 'Technology · SI partner', desc: 'A technology partner integrating SAAI with their own solutions such as POS and VMS.', perks: ['API · integration docs', 'Joint development', 'Co-marketing references'] },
    ],
    benefitsEyebrow: 'Why Partner',
    benefitsHeading: 'What partners gain',
    benefitsSub: 'With a product and support we provide together, we help your business grow steadily.',
    partnerBenefits: [
      { title: 'A market we grow together', desc: 'Open new revenue opportunities in offline spatial AI with SAAI.' },
      { title: 'Training · certification', desc: 'Build expertise fast through product, installation, and sales training plus partner certification.' },
      { title: 'Dedicated technical support', desc: 'A partner-only support channel accompanies you from onboarding to operations.' },
      { title: 'Co-marketing', desc: 'Build trust together through reference- and case-based co-marketing.' },
    ],
    onboardingEyebrow: 'Onboarding',
    onboardingHeading: 'Partner onboarding steps',
    onboardingSub: 'From application to expansion, we’re with you at every step.',
    onboarding: [
      { step: '01', title: 'Apply · fit review', desc: 'We confirm your partner type and business area and set the direction for collaboration.' },
      { step: '02', title: 'Training · certification', desc: 'You complete product, installation, and sales courses and earn partner certification.' },
      { step: '03', title: 'Joint sales · pilot', desc: 'We build the first reference together and review operations.' },
      { step: '04', title: 'Expansion · settlement', desc: 'We repeatedly scale the proven model and settle incentives.' },
    ],
    ctaHeading: 'Become a partner and expand with us',
    ctaSub: 'Whatever your role, we’ll find a way to work together.',
    ctaButton: 'Apply · inquire',
  },
  jp: {
    badge: 'Partnership',
    heroMaster: 'パートナーの店舗も',
    heroMasterAccent: 'ひとつの店舗のように',
    heroSub: 'リセラー · チャネル · 技術パートナーとして、ともにオフライン空間AI市場を拡げます。役割に合った協業の方法を、ともに見つけます。',
    tiersEyebrow: 'Partner Program',
    tiersHeading: 'ともに成長する三つの道',
    tiersSub: '役割に合うプログラムから始め、ともに拡張します。',
    tiers: [
      { name: 'リセラー · 設置パートナー', desc: '現場のCCTV環境の診断から設置、初期運用までを担い、SAAIを再販するパートナー', perks: ['設置トレーニング · 認証の提供', '現場診断ツールキット', '技術サポート優先チャネル'] },
      { name: 'チャネル · 営業パートナー', desc: 'SAAIを自社顧客に提案し、ともに成長する営業パートナー', perks: ['共同営業資料', 'リード共有プログラム', 'パートナーインセンティブ'] },
      { name: '技術 · SIパートナー', desc: 'POS · VMSなど自社ソリューションとSAAIを連携 · 統合する技術パートナー', perks: ['API · 連携ドキュメント', '共同開発', 'リファレンス共同マーケティング'] },
    ],
    benefitsEyebrow: 'Why Partner',
    benefitsHeading: 'パートナーが得られるもの',
    benefitsSub: '製品と支援をともに提供し、パートナーのビジネスが着実に成長できるよう支えます。',
    partnerBenefits: [
      { title: 'ともに育てる市場', desc: 'SAAIとともに、オフライン空間AIという新たな売上機会を開きます。' },
      { title: 'トレーニング · 認証', desc: '製品 · 設置 · 営業のトレーニングとパートナー認証で、素早く専門性を備えます。' },
      { title: '専任の技術サポート', desc: 'オンボーディングから運用まで、パートナー専用のサポートチャネルが伴走します。' },
      { title: '共同マーケティング', desc: 'リファレンス · 事例に基づく共同マーケティングで、信頼をともに築きます。' },
    ],
    onboardingEyebrow: 'Onboarding',
    onboardingHeading: 'パートナーオンボーディングの流れ',
    onboardingSub: 'お申し込みから拡張まで、段階ごとに伴走します。',
    onboarding: [
      { step: '01', title: '申請 · 適合性の確認', desc: 'パートナー種別と事業領域を確認し、協業の方向を定めます。' },
      { step: '02', title: 'トレーニング · 認証', desc: '製品と設置 · 営業の課程を経て、パートナー認証を取得します。' },
      { step: '03', title: '共同営業 · パイロット', desc: '最初のリファレンスをともに作り、運用を点検します。' },
      { step: '04', title: '拡張 · 精算', desc: '検証されたモデルを繰り返し拡張し、インセンティブを精算します。' },
    ],
    ctaHeading: 'パートナーとして、ともに拡張しましょう',
    ctaSub: 'どのような役割でも、ともに進む方法をご提案します。',
    ctaButton: 'パートナー申請 · お問い合わせ',
  },
};

const tierIcons = [Store, Building2, Globe];
const benefitIcons = [TrendingUp, BookOpen, LifeBuoy, Megaphone];
const onboardingIcons = [ClipboardList, GraduationCap, Rocket, Repeat];

export default function PartnershipView({ locale }: { locale: Locale }) {
  const t = C[locale];
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-surface-dark" aria-hidden="true" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('partnership', locale), path: '/company/partnership' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <Handshake className="w-3.5 h-3.5" />
            {t.badge}
          </HeroBadge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            {t.heroMaster}<br />
            <span className="text-primary-light">
              {t.heroMasterAccent}
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* ── 파트너 프로그램 유형 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.tiersEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.tiersHeading}</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto break-keep">
              {t.tiersSub}
            </p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-3 gap-6">
            {t.tiers.map((tier, i) => {
              const Icon = tierIcons[i];
              return (
                <StaggerItem key={tier.name}>
                  <div className="p-8 rounded-3xl border border-gray-100 bg-slate-50 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 break-keep">{tier.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6 break-keep">{tier.desc}</p>
                    <ul className="space-y-2.5 mt-auto">
                      {tier.perks.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="break-keep">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 파트너 혜택 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.benefitsEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.benefitsHeading}</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto break-keep">
              {t.benefitsSub}
            </p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.partnerBenefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <StaggerItem key={b.title}>
                  <div className="p-7 rounded-3xl border border-gray-100 bg-white h-full">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 break-keep">{b.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{b.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 온보딩 절차 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.onboardingEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.onboardingHeading}</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto break-keep">
              {t.onboardingSub}
            </p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.onboarding.map((o, i) => {
              const Icon = onboardingIcons[i];
              return (
                <StaggerItem key={o.step}>
                  <div className="p-7 rounded-3xl border border-gray-100 bg-slate-50 h-full">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-2xl font-bold text-gray-200">{o.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 break-keep">{o.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{o.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Handshake className="w-12 h-12 text-primary mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep">
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
