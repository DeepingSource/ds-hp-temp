import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import {
  ArrowRight, Briefcase, Heart, Compass, Sparkles, Mail,
  Coffee, GraduationCap, Home, Users, Cpu,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import { roleFamilies } from '@/lib/careers';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';

/**
 * CareerView — shared locale-aware Careers composition.
 * Rendered by `/company/career` (en), `/ko/company/career`, `/jp/company/career`.
 */

type Copy = {
  badge: string;
  heroMaster: string;
  heroMasterAccent: string;
  heroSub: string;
  cultureEyebrow: string;
  cultureHeading: string;
  cultureSub: string;
  culture: { title: string; desc: string }[];
  benefitsEyebrow: string;
  benefitsHeading: string;
  benefitsSub: string;
  benefits: { title: string; desc: string }[];
  rolesEyebrow: string;
  rolesHeading: string;
  rolesSub: string;
  rolesApply: string;
  processEyebrow: string;
  processHeading: string;
  processSub: string;
  process: { step: string; title: string; desc: string }[];
  mailSubject: string;
  ctaHeading: string;
  ctaSub: string;
  ctaApply: string;
  ctaGeneral: string;
};

const C: Record<Locale, Copy> = {
  ko: {
    badge: 'Careers',
    heroMaster: '모든 매장을 한 매장처럼 —',
    heroMasterAccent: '그 한 회사를 함께 짜는 자리',
    heroSub: '지금 공개된 채용 공고는 없습니다. 함께하고 싶은 마음이 있다면 언제든 먼저 이야기를 들려주세요.',
    cultureEyebrow: 'How We Work',
    cultureHeading: '우리가 일하는 법',
    cultureSub: `“${COMPANY.vision}” — 비전과 프라이버시 원칙이 일상의 의사결정으로 이어집니다.`,
    culture: [
      { title: '문제에서 출발', desc: '기술이 아니라 현장의 진짜 문제에서 시작합니다. 점주의 질문 하나가 우리의 출발점이었습니다.' },
      { title: '원칙을 지키는 기술', desc: `${COMPANY.privacyPrinciple} 타협하지 않는 프라이버시 원칙 위에서 일합니다.` },
      { title: '실행으로 증명', desc: '분석에서 멈추지 않고 실행과 결과로 증명합니다. 학습 루프가 일하는 방식입니다.' },
      { title: '한 팀, 한 매장처럼', desc: '경계를 나누지 않고 같은 목표를 봅니다. 모든 매장을 한 매장처럼 — 우리 팀도 한 팀처럼 움직입니다.' },
    ],
    benefitsEyebrow: 'Benefits & Culture',
    benefitsHeading: '잘 일하기 위한 환경',
    benefitsSub: '좋은 결과는 좋은 환경에서 나옵니다. 집중하고 성장할 수 있도록 지원합니다.',
    benefits: [
      { title: '유연한 근무', desc: '자율 출퇴근과 집중 근무 환경. 결과로 신뢰하는 문화입니다.' },
      { title: '성장 지원', desc: '컨퍼런스 · 도서 · 교육 지원으로 기술과 시야를 함께 키웁니다.' },
      { title: '개발 도구', desc: 'NVIDIA Inception 파트너로서 AI 개발에 필요한 컴퓨팅과 도구를 갖춥니다.' },
      { title: '일하기 좋은 환경', desc: '강남 본사, 집중과 협업이 균형을 이루는 업무 공간.' },
    ],
    rolesEyebrow: 'Open Roles',
    rolesHeading: '상시 영입 직군',
    rolesSub: '지금 정해진 공고는 없지만, 아래 직군은 늘 좋은 동료를 기다립니다. 관심 직군으로 먼저 이야기를 들려주세요.',
    rolesApply: '이 직군으로 지원',
    processEyebrow: 'Process',
    processHeading: '채용은 이렇게 진행됩니다',
    processSub: '복잡하지 않게, 서로를 충분히 알 수 있도록.',
    process: [
      { step: '01', title: '지원', desc: '이력서·포트폴리오를 메일로 보내 주세요. 직군이 정해지지 않아도 괜찮습니다.' },
      { step: '02', title: '대화', desc: '직무·팀과의 인터뷰로 서로의 방향을 맞춥니다 (보통 1~2회).' },
      { step: '03', title: '과제 · 심층', desc: '직무에 따라 과제 또는 심층 인터뷰로 함께 일하는 모습을 그려 봅니다.' },
      { step: '04', title: '오퍼 · 합류', desc: '처우를 협의하고, 한 팀으로 합류합니다.' },
    ],
    mailSubject: '채용 문의',
    ctaHeading: '맞는 자리가 없어도 괜찮습니다',
    ctaSub: '함께하고 싶은 마음이 있다면, 먼저 이야기를 들려주세요',
    ctaApply: '지원 · 문의하기',
    ctaGeneral: '일반 문의',
  },
  en: {
    badge: 'Careers',
    heroMaster: 'Every store, like one —',
    heroMasterAccent: 'the role of weaving that one company',
    heroSub: 'We have no open roles right now. If you’d like to work with us, reach out anytime — we’d love to hear from you.',
    cultureEyebrow: 'How We Work',
    cultureHeading: 'How we work',
    cultureSub: `“${COMPANY.vision}” — our vision and privacy principle carry through to everyday decisions.`,
    culture: [
      { title: 'Start from the problem', desc: 'We start from real on-site problems, not technology. A single store owner’s question was our starting point.' },
      { title: 'Technology that keeps its principles', desc: `${COMPANY.privacyPrinciple} We work on an uncompromising privacy principle.` },
      { title: 'Prove it through execution', desc: 'We don’t stop at analysis — we prove it through execution and results. The learning loop is how we work.' },
      { title: 'One team, like one store', desc: 'We share the same goal without drawing boundaries. Every store, like one — and our team moves like one team, too.' },
    ],
    benefitsEyebrow: 'Benefits & Culture',
    benefitsHeading: 'An environment to do great work',
    benefitsSub: 'Good results come from a good environment. We support you to focus and grow.',
    benefits: [
      { title: 'Flexible work', desc: 'Flexible hours and a focused work environment. A culture that trusts results.' },
      { title: 'Growth support', desc: 'Conference, book, and education support to grow both your skills and your perspective.' },
      { title: 'Best-in-class tools', desc: 'As an NVIDIA Inception partner, we provide the compute and tools needed for AI development.' },
      { title: 'A great place to work', desc: 'A Gangnam headquarters where focus and collaboration are in balance.' },
    ],
    rolesEyebrow: 'Open Roles',
    rolesHeading: 'Roles we’re always hiring for',
    rolesSub: 'No specific opening right now, but these families are always open to great people. Reach out about the one that fits you.',
    rolesApply: 'Apply for this role',
    processEyebrow: 'Process',
    processHeading: 'How hiring works',
    processSub: 'Simple, with enough room for both sides to get to know each other.',
    process: [
      { step: '01', title: 'Apply', desc: 'Send your résumé/portfolio by email — even if you’re not sure which role fits.' },
      { step: '02', title: 'Conversations', desc: 'Interviews with the role and team to align on direction (usually 1–2 rounds).' },
      { step: '03', title: 'Assignment · deep dive', desc: 'Depending on the role, a take-home or deep-dive to picture working together.' },
      { step: '04', title: 'Offer · join', desc: 'We agree on terms and you join the team.' },
    ],
    mailSubject: 'Careers inquiry',
    ctaHeading: 'No matching role? That’s okay',
    ctaSub: 'If you’d like to join us, tell us your story first.',
    ctaApply: 'Apply · inquire',
    ctaGeneral: 'General inquiry',
  },
  jp: {
    badge: 'Careers',
    heroMaster: 'すべての店舗を、ひとつの店舗のように —',
    heroMasterAccent: 'そのひとつの会社をともに織りなす場所',
    heroSub: '現在、公開中の募集はありません。一緒に働きたい方は、いつでもまずはお声がけください。',
    cultureEyebrow: 'How We Work',
    cultureHeading: '私たちの働き方',
    cultureSub: `「${COMPANY.vision}」 — ビジョンとプライバシー原則が、日々の意思決定につながります。`,
    culture: [
      { title: '問題から出発する', desc: '技術ではなく、現場の本当の問題から始めます。店主の一つの問いが、私たちの出発点でした。' },
      { title: '原則を守る技術', desc: `${COMPANY.privacyPrinciple} 妥協しないプライバシー原則の上で働きます。` },
      { title: '実行で証明する', desc: '分析で止まらず、実行と結果で証明します。学習ループが私たちの働き方です。' },
      { title: 'ひとつのチーム、ひとつの店舗のように', desc: '境界を分けず、同じ目標を見ます。すべての店舗を、ひとつの店舗のように — 私たちのチームもひとつのチームとして動きます。' },
    ],
    benefitsEyebrow: 'Benefits & Culture',
    benefitsHeading: 'よい仕事のための環境',
    benefitsSub: 'よい結果は、よい環境から生まれます。集中し、成長できるよう支援します。',
    benefits: [
      { title: '柔軟な働き方', desc: '自律的な勤務時間と集中できる環境。結果で信頼する文化です。' },
      { title: '成長支援', desc: 'カンファレンス · 書籍 · 教育の支援で、技術と視野をともに育てます。' },
      { title: '最高のツール', desc: 'NVIDIA Inceptionパートナーとして、AI開発に必要なコンピューティングとツールを備えます。' },
      { title: '働きやすい環境', desc: '江南本社、集中と協働がバランスする業務空間。' },
    ],
    rolesEyebrow: 'Open Roles',
    rolesHeading: '通年で募集している職種',
    rolesSub: '今は特定の公募はありませんが、以下の職種はいつでも良い仲間を待っています。気になる職種でまずはお声がけください。',
    rolesApply: 'この職種で応募',
    processEyebrow: 'Process',
    processHeading: '採用の進め方',
    processSub: '複雑にせず、お互いを十分に知れるように。',
    process: [
      { step: '01', title: '応募', desc: '履歴書・ポートフォリオをメールでお送りください。職種が決まっていなくても大丈夫です。' },
      { step: '02', title: '対話', desc: '職務・チームとのインタビューで方向性をすり合わせます（通常1〜2回）。' },
      { step: '03', title: '課題 · 深掘り', desc: '職務に応じて課題または深掘りインタビューで、一緒に働く姿を描きます。' },
      { step: '04', title: 'オファー · 参加', desc: '条件を協議し、ひとつのチームとして参加いただきます。' },
    ],
    mailSubject: '採用のお問い合わせ',
    ctaHeading: '合うポジションがなくても大丈夫です',
    ctaSub: 'ともに働きたいお気持ちがあれば、まずはお話を聞かせてください。',
    ctaApply: '応募 · お問い合わせ',
    ctaGeneral: '一般のお問い合わせ',
  },
};

const cultureIcons = [Compass, Heart, Sparkles, Users];
const benefitIcons = [Home, GraduationCap, Cpu, Coffee];

export default function CareerView({ locale }: { locale: Locale }) {
  const t = C[locale];
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-surface-dark" aria-hidden="true" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('career', locale), path: '/company/career' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <Briefcase className="w-3.5 h-3.5" />
            {t.badge}
          </HeroBadge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-6 break-keep">
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

      {/* ── 우리가 일하는 법 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.cultureEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.cultureHeading}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto break-keep">
              {t.cultureSub}
            </p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 gap-6">
            {t.culture.map((c, i) => {
              const Icon = cultureIcons[i];
              return (
                <StaggerItem key={c.title}>
                  <div className="p-8 rounded-3xl border border-gray-100 bg-slate-50 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 break-keep">{c.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{c.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 상시 영입 직군 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.rolesEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.rolesHeading}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto break-keep">
              {t.rolesSub}
            </p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 gap-5">
            {roleFamilies[locale].map((r) => (
              <StaggerItem key={r.key}>
                <a
                  href={`mailto:${COMPANY.contactEmail}?subject=${encodeURIComponent(`${t.mailSubject} — ${r.title}`)}`}
                  className="group flex items-start gap-4 p-7 rounded-3xl border border-gray-100 bg-white h-full hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow] duration-300"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 break-keep group-hover:text-primary transition-colors">{r.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep mb-4">{r.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {t.rolesApply} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 복지 · 문화 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.benefitsEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.benefitsHeading}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto break-keep">
              {t.benefitsSub}
            </p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.benefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <StaggerItem key={b.title}>
                  <div className="p-7 rounded-3xl border border-gray-100 bg-slate-50 h-full">
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

      {/* ── 채용 절차 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.processEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.processHeading}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto break-keep">
              {t.processSub}
            </p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.process.map((p) => (
              <StaggerItem key={p.step}>
                <div className="p-7 rounded-3xl border border-gray-100 bg-white h-full">
                  <span className="text-2xl font-bold text-gray-200 tabular-nums">{p.step}</span>
                  <h3 className="mt-3 text-base font-bold text-gray-900 mb-2 break-keep">{p.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep">
            {t.ctaHeading}
          </h2>
          <p className="text-slate-300 text-lg mb-10 break-keep">
            {t.ctaSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`mailto:${COMPANY.contactEmail}?subject=${encodeURIComponent(t.mailSubject)}`} className="btn-primary-dark btn-lg gap-2 rounded-xl">
              {t.ctaApply} <ArrowRight className="w-4 h-4" />
            </a>
            <Link href={localeHref(locale, '/contact')} className="btn-ghost-dark btn-lg gap-2 rounded-xl">
              {t.ctaGeneral}
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
