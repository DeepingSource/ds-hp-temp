import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import ProcessStepper from '@/components/ui/ProcessStepper';
import {
  ArrowRight, Briefcase, Mail, ShieldCheck, Award,
  Coffee, GraduationCap, Home, Users, Cpu,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import siteContent from '@/data/generated/site-content.json';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';

/**
 * CareerView — shared locale-aware Careers composition.
 * Rendered by `/company/career` (en), `/ko/company/career`, `/jp/company/career`.
 * Copy is edited via the Keystatic `career` singleton (content/site/career.yaml);
 * {nvidiaPartner}/{patents} tokens are substituted at build by gen-site-content.
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

const C = siteContent.career as Record<Locale, Copy>;

const cultureIcons = [ShieldCheck, Cpu, Award, Users];
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
            <WordRise text={t.heroMaster} /><br />
            <WordRise text={t.heroMasterAccent} className="text-primary-light" />
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* ── People & Team Banner ── */}
      <section className="py-8 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary-light shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {locale === 'ko' ? '딥핑소스 40여 명의 뛰어난 팀원들을 만나보세요' : locale === 'jp' ? 'DEEPINGSOURCE のチームメンバーを見る' : 'Meet 40+ DeepingSource team members'}
              </p>
              <p className="text-xs text-slate-400">
                {locale === 'ko' ? '연구원, 개발자, PM, 디자이너의 소속과 역할을 한눈에 확인하세요.' : locale === 'jp' ? '研究員、エンジニア、PM、デザイナーの役割を確認できます。' : 'Explore roles, teams, and leadership behind SAAI.'}
              </p>
            </div>
          </div>
          <Link
            href={localeHref(locale, '/company/team')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors shrink-0"
          >
            <span>{locale === 'ko' ? '팀원 & 리더십 갤러리 →' : locale === 'jp' ? 'チーム & リーダーシップ →' : 'View Team & Leadership →'}</span>
          </Link>
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

      {/* ── 인재 풀 등록 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.rolesEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.rolesHeading}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto break-keep mb-10">
            {t.rolesSub}
          </p>
          <a
            href={`mailto:${COMPANY.contactEmail}?subject=${encodeURIComponent(t.rolesApply)}`}
            className="btn-primary btn-lg gap-2 rounded-xl"
          >
            {t.rolesApply} <ArrowRight className="w-4 h-4" />
          </a>
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
          <ProcessStepper
            ariaLabel={t.processHeading}
            steps={t.process.map((p) => ({ label: p.step, title: p.title, desc: p.desc }))}
          />
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
