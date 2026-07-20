import Link from 'next/link';
import { HelpCircle, ArrowRight } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import FaqAnswer from '@/components/faq/FaqAnswer';
import { getFaqsByGroup, faqAnswerText } from '@/lib/faq';
import { faqGroupOrder, faqGroupMeta, faqGroupKind } from '@/data/faq/types';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, faqPage } from '@/lib/structured-data';

/**
 * FaqView — shared FAQ composition.
 * Rendered by `/resources/faq` (en), `/ko/resources/faq`, `/jp/resources/faq`
 * with the locale prop (PLAN_v1.1 D6 path-prefix i18n).
 *
 * Content comes from the Velite `faq` collection (content/faq/*.mdx), grouped by
 * `group` and ordered by `order`; en/jp fall back to Korean per item.
 */

const C: Record<Locale, {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaButton: string;
  commonLabel: string;
  sectionCta: string;
}> = {
  en: {
    eyebrow: 'FAQ',
    heroTitle: 'Frequently asked questions',
    heroSub: 'Answers to the questions we hear most — about onboarding, pricing, data security, and more.',
    ctaEyebrow: 'Still curious?',
    ctaTitle: 'Our team answers any remaining questions',
    ctaButton: 'Contact us',
    commonLabel: 'Common',
    sectionCta: 'Ask us about this',
  },
  ko: {
    eyebrow: 'FAQ',
    heroTitle: '자주 묻는 질문',
    heroSub: '도입 절차, 요금, 데이터 보안 등 가장 많이 받는 질문에 대한 답변을 모았습니다.',
    ctaEyebrow: '더 궁금한 점이 있다면',
    ctaTitle: '남은 질문은 담당자가 직접 답변드립니다',
    ctaButton: '문의하기',
    commonLabel: '공통',
    sectionCta: '이 주제로 문의하기',
  },
  jp: {
    eyebrow: 'FAQ',
    heroTitle: 'よくあるご質問',
    heroSub: '導入の流れ、料金、データセキュリティなど、最も多くいただく質問への回答をまとめました。',
    ctaEyebrow: 'さらにご質問があれば',
    ctaTitle: '残りのご質問は担当者が直接お答えします',
    ctaButton: 'お問い合わせ',
    commonLabel: '共通',
    sectionCta: 'この件について問い合わせる',
  },
};

export default function FaqView({ locale }: { locale: Locale }) {
  const c = C[locale];

  const sections = faqGroupOrder
    .map((group) => {
      const meta = faqGroupMeta[group];
      const faqs = getFaqsByGroup(group, locale);
      return {
        id: group,
        label: meta.label[locale],
        kind: faqGroupKind[group]?.[locale] ?? null,
        product: meta.product,
        faqs,
        items: faqs.map((f) => ({
          question: f.question,
          answer: <FaqAnswer body={f.body} locale={locale} />,
        })),
      };
    })
    .filter((s) => s.items.length > 0);

  const faqItems = sections.flatMap((s) =>
    s.faqs.map((f) => ({ question: f.question, answer: faqAnswerText(f.body) })),
  ).filter((it) => it.answer.length > 0);

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={faqPage(faqItems)} />
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-16 bg-surface-dark overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" aria-hidden="true" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('resources', locale), path: '/resources' }, { name: crumb('faq', locale), path: '/resources/faq' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <HelpCircle className="w-3.5 h-3.5" />
            {c.eyebrow}
          </HeroBadge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            {c.heroTitle}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed break-keep">
            {c.heroSub}
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              {section.kind && (
                <p className="text-2xs font-mono font-medium uppercase tracking-wide text-gray-400">{section.kind}</p>
              )}
              <h2 className="text-xl font-bold text-gray-900 mb-2">{section.label}</h2>
              <Accordion items={section.items} idPrefix={`faq-${section.id}`} />
              <div className="mt-4 text-right">
                <Link
                  href={localeHref(locale, '/contact') + (section.product ? `?product=${section.product}` : '')}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  {c.sectionCta}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{c.ctaEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep">
            {c.ctaTitle}
          </h2>
          <Link href={localeHref(locale, '/contact')} className="btn-primary gap-2">
            {c.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
