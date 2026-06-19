import Link from 'next/link';
import { HelpCircle, ArrowRight } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import { commonFaqs, storeCareFaqs, storeInsightFaqs, faqData } from '@/data/faq-data';
import { faqI18n } from '@/data/faq-i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, faqPage, nodeToText } from '@/lib/structured-data';

/**
 * FaqView — shared FAQ composition.
 * Rendered by `/resources/faq` (en), `/ko/resources/faq`, `/jp/resources/faq`
 * with the locale prop (PLAN_v1.1 D6 path-prefix i18n).
 *
 * Korean is the source (faq-data.tsx). en/jp answers come from the faq-i18n
 * overlay; missing locales fall back to the Korean source.
 */

const C: Record<Locale, {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaButton: string;
  commonLabel: string;
}> = {
  en: {
    eyebrow: 'FAQ',
    heroTitle: 'Frequently asked questions',
    heroSub: 'Answers to the questions we hear most — about onboarding, pricing, data security, and more.',
    ctaEyebrow: 'Still curious?',
    ctaTitle: "Couldn't find your answer?",
    ctaButton: 'Contact us',
    commonLabel: 'Common',
  },
  ko: {
    eyebrow: 'FAQ',
    heroTitle: '자주 묻는 질문',
    heroSub: '도입 절차, 요금, 데이터 보안 등 가장 많이 받는 질문에 대한 답변을 모았습니다.',
    ctaEyebrow: '더 궁금한 점이 있다면',
    ctaTitle: '답을 찾지 못하셨나요?',
    ctaButton: '문의하기',
    commonLabel: '공통',
  },
  jp: {
    eyebrow: 'FAQ',
    heroTitle: 'よくあるご質問',
    heroSub: '導入の流れ、料金、データセキュリティなど、最も多くいただく質問への回答をまとめました。',
    ctaEyebrow: 'さらにご質問があれば',
    ctaTitle: '答えが見つかりませんでしたか？',
    ctaButton: 'お問い合わせ',
    commonLabel: '共通',
  },
};

export default function FaqView({ locale }: { locale: Locale }) {
  const c = C[locale];

  const storeAgentKo = faqData.flatMap((cat) => cat.items);

  const sections = [
    { id: 'common' as const, label: c.commonLabel, ko: commonFaqs },
    { id: 'storecare' as const, label: 'StoreCare', ko: storeCareFaqs },
    { id: 'storeinsight' as const, label: 'StoreInsight', ko: storeInsightFaqs },
    { id: 'storeagent' as const, label: 'StoreAgent', ko: storeAgentKo },
  ].map((s) => {
    const source = locale === 'ko' ? s.ko : (faqI18n[s.id]?.[locale] ?? s.ko);
    return {
      id: s.id,
      label: s.label,
      items: source.map((it) => ({
        question: it.question,
        answer: typeof it.answer === 'function' ? it.answer(locale) : it.answer,
      })),
    };
  });

  const faqItems = sections.flatMap((s) =>
    s.items.map((it) => ({
      question: it.question,
      answer: nodeToText(it.answer).replace(/\s+/g, ' ').trim(),
    })),
  ).filter((it) => it.answer.length > 0);

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={faqPage(faqItems)} />
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
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
              <h2 className="text-xl font-bold text-gray-900 mb-2">{section.label}</h2>
              <Accordion items={section.items} idPrefix={`faq-${section.id}`} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{c.ctaEyebrow}</p>
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
