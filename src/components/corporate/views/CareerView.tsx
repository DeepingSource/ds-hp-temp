import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import {
  ArrowRight, Briefcase, Heart, Compass, Sparkles, Mail,
  Coffee, GraduationCap, Home, Users, FileCheck, MessageSquare, UserCheck, PartyPopper, Cpu,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
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
  rolesNotePre: string;
  rolesNoteIllustrative: string;
  rolesNotePost: string;
  teams: { team: string; roles: { title: string; type: string }[] }[];
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
    heroSub: `${COMPANY.foundingYear}년 한 점주의 질문에서 시작한 여정에, 다음 장을 함께 쓸 동료를 찾습니다.`,
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
      { title: '최고의 도구', desc: 'NVIDIA Inception 파트너로서 AI 개발에 필요한 컴퓨팅과 도구를 갖춥니다.' },
      { title: '일하기 좋은 환경', desc: '강남 본사, 집중과 협업이 균형을 이루는 업무 공간.' },
    ],
    rolesEyebrow: 'Open Roles',
    rolesHeading: '팀별 오픈 포지션',
    rolesNotePre: '※ 아래는 구성 ',
    rolesNoteIllustrative: '예시 포지션',
    rolesNotePost: '입니다. 실제 채용 공고는 추후 업데이트됩니다.',
    teams: [
      { team: 'Engineering', roles: [
        { title: 'Computer Vision Engineer (예시)', type: '정규직 · 서울' },
        { title: 'Backend / Platform Engineer (예시)', type: '정규직 · 서울' },
        { title: 'MLOps Engineer (예시)', type: '정규직 · 서울' },
      ] },
      { team: 'AI Research', roles: [
        { title: 'AI Research Scientist — 익명화 · 영상 이해 (예시)', type: '정규직 · 서울' },
        { title: 'Applied Research Engineer (예시)', type: '정규직 · 서울' },
      ] },
      { team: 'Sales · Partnership', roles: [
        { title: 'Sales / Partnership Manager (예시)', type: '정규직 · 서울' },
        { title: 'Solution Consultant (예시)', type: '정규직 · 서울' },
      ] },
      { team: 'Operations · Product', roles: [
        { title: 'Product Manager (예시)', type: '정규직 · 서울' },
        { title: 'Customer Success Manager (예시)', type: '정규직 · 서울' },
      ] },
    ],
    processEyebrow: 'Process',
    processHeading: '채용 절차',
    processSub: '서로를 충분히 알아가는 과정입니다. 보통 2~4주가 소요됩니다.',
    process: [
      { step: '01', title: '서류 전형', desc: '이력서와 포트폴리오로 첫 만남을 시작합니다.' },
      { step: '02', title: '실무 인터뷰', desc: '함께 일할 팀과 직무 역량 · 협업 방식을 이야기합니다.' },
      { step: '03', title: '컬처 · 리더 인터뷰', desc: '비전과 일하는 방식이 서로 맞는지 확인합니다.' },
      { step: '04', title: '처우 협의 · 합류', desc: '조건을 조율하고 다음 장을 함께 시작합니다.' },
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
    heroSub: `We’re looking for colleagues to write the next chapter of a journey that began in ${COMPANY.foundingYear} with one store owner’s question.`,
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
    rolesHeading: 'Open positions by team',
    rolesNotePre: '※ The roles below are ',
    rolesNoteIllustrative: 'illustrative positions',
    rolesNotePost: '. Actual job postings will be updated later.',
    teams: [
      { team: 'Engineering', roles: [
        { title: 'Computer Vision Engineer (Illustrative)', type: 'Full-time · Seoul' },
        { title: 'Backend / Platform Engineer (Illustrative)', type: 'Full-time · Seoul' },
        { title: 'MLOps Engineer (Illustrative)', type: 'Full-time · Seoul' },
      ] },
      { team: 'AI Research', roles: [
        { title: 'AI Research Scientist — Anonymization · Video Understanding (Illustrative)', type: 'Full-time · Seoul' },
        { title: 'Applied Research Engineer (Illustrative)', type: 'Full-time · Seoul' },
      ] },
      { team: 'Sales · Partnership', roles: [
        { title: 'Sales / Partnership Manager (Illustrative)', type: 'Full-time · Seoul' },
        { title: 'Solution Consultant (Illustrative)', type: 'Full-time · Seoul' },
      ] },
      { team: 'Operations · Product', roles: [
        { title: 'Product Manager (Illustrative)', type: 'Full-time · Seoul' },
        { title: 'Customer Success Manager (Illustrative)', type: 'Full-time · Seoul' },
      ] },
    ],
    processEyebrow: 'Process',
    processHeading: 'Hiring process',
    processSub: 'A process to get to know each other well. It usually takes 2–4 weeks.',
    process: [
      { step: '01', title: 'Application review', desc: 'We begin with your résumé and portfolio.' },
      { step: '02', title: 'Working interview', desc: 'We discuss role skills and ways of collaborating with the team you’ll join.' },
      { step: '03', title: 'Culture · leadership interview', desc: 'We check that vision and ways of working fit on both sides.' },
      { step: '04', title: 'Offer · onboarding', desc: 'We align on terms and start the next chapter together.' },
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
    heroSub: `${COMPANY.foundingYear}年、一軒の店主の問いから始まった歩みに、次の章をともに書く仲間を探しています。`,
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
    rolesHeading: 'チーム別オープンポジション',
    rolesNotePre: '※ 以下は構成の',
    rolesNoteIllustrative: '例ポジション',
    rolesNotePost: 'です。実際の採用情報は今後更新されます。',
    teams: [
      { team: 'Engineering', roles: [
        { title: 'Computer Vision Engineer (例)', type: '正社員 · ソウル' },
        { title: 'Backend / Platform Engineer (例)', type: '正社員 · ソウル' },
        { title: 'MLOps Engineer (例)', type: '正社員 · ソウル' },
      ] },
      { team: 'AI Research', roles: [
        { title: 'AI Research Scientist — 匿名化 · 映像理解 (例)', type: '正社員 · ソウル' },
        { title: 'Applied Research Engineer (例)', type: '正社員 · ソウル' },
      ] },
      { team: 'Sales · Partnership', roles: [
        { title: 'Sales / Partnership Manager (例)', type: '正社員 · ソウル' },
        { title: 'Solution Consultant (例)', type: '正社員 · ソウル' },
      ] },
      { team: 'Operations · Product', roles: [
        { title: 'Product Manager (例)', type: '正社員 · ソウル' },
        { title: 'Customer Success Manager (例)', type: '正社員 · ソウル' },
      ] },
    ],
    processEyebrow: 'Process',
    processHeading: '採用プロセス',
    processSub: 'お互いを十分に知り合う過程です。通常2〜4週間ほどかかります。',
    process: [
      { step: '01', title: '書類選考', desc: '履歴書とポートフォリオで最初の出会いを始めます。' },
      { step: '02', title: '実務インタビュー', desc: 'ともに働くチームと、職務能力 · 協働の進め方についてお話しします。' },
      { step: '03', title: 'カルチャー · リーダー面談', desc: 'ビジョンと働き方が互いに合うかを確認します。' },
      { step: '04', title: '条件調整 · ご参加', desc: '条件を調整し、次の章をともに始めます。' },
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
const processIcons = [FileCheck, MessageSquare, UserCheck, PartyPopper];

export default function CareerView({ locale }: { locale: Locale }) {
  const t = C[locale];
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(55,106,226,0.18),transparent)]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('career', locale), path: '/company/career' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <Briefcase className="w-3.5 h-3.5" />
            {t.badge}
          </HeroBadge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-6 break-keep">
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

      {/* ── 우리가 일하는 법 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.cultureEyebrow}</p>
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

      {/* ── 복지 · 문화 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.benefitsEyebrow}</p>
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

      {/* ── 팀별 오픈 포지션 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.rolesEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.rolesHeading}</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto break-keep">
              {t.rolesNotePre}<strong className="text-gray-500">{t.rolesNoteIllustrative}</strong>{t.rolesNotePost}
            </p>
          </div>
          <div className="space-y-10">
            {t.teams.map((group) => (
              <div key={group.team}>
                <h3 className="text-sm font-black text-primary mb-4 tracking-wide flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {group.team}
                </h3>
                <StaggerContainer className="space-y-3">
                  {group.roles.map((r, i) => (
                    <StaggerItem key={i}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-5 rounded-2xl border border-gray-100 bg-slate-50">
                        <div className="flex-1">
                          <p className="text-base font-bold text-gray-900 break-keep">{r.title}</p>
                        </div>
                        <p className="text-sm text-gray-500 shrink-0">{r.type}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── 채용 프로세스 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.processEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.processHeading}</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto break-keep">
              {t.processSub}
            </p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.process.map((p, i) => {
              const Icon = processIcons[i];
              return (
                <StaggerItem key={p.step}>
                  <div className="p-7 rounded-3xl border border-gray-100 bg-white h-full">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-2xl font-black text-gray-200">{p.step}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 break-keep">{p.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{p.desc}</p>
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
