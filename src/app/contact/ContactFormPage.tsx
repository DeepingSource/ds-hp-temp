'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { CheckCircle2, Check, ArrowRight, Eye, BarChart3, Zap, AlertCircle } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { CTA_TRACK_O, OWNER_START_URL } from '@/lib/cta-canon';
import Spinner from '@/components/ui/Spinner';
import { trackEvent } from '@/components/Analytics';
import siteContent from '@/data/generated/site-content.json';

type Content = {
  loading: string;
  eyebrow: string;
  contextHeading: React.ReactNode;
  cards: { label: string; desc: string }[];
  provenLabel: string;
  provenText: string;
  partnerLabel: string;
  partnerText: string;
  contextFooter: string;
  mobileTrustLabel: string;
  mobileTrustBrands: string;
  formTitle: string;
  formTitleWith: (label: string) => string;
  formSubtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  contactLabel: string;
  contactPlaceholder: string;
  storeCountLabel: string;
  affiliationLabel: string;
  brandLabel: string;
  brandOptional: string;
  brandPlaceholder: string;
  selectPlaceholder: string;
  storeCountOptions: { value: string; label: string }[];
  affiliationTypeOptions: { value: string; label: string }[];
  submit: string;
  submitting: string;
  noticeBold: string;
  noticeIssue: React.ReactNode;
  backToHome: string;
  successTitle: string;
  successTitleWith: (label: string) => string;
  successSubtitle: string;
  insightPrompt: string;
  insightLink: string;
  errSubmitFailed: string;
  errTimeout: string;
  errGeneric: string;
  validation: {
    name: string;
    contact: string;
    storeCount: string;
    affiliationType: string;
  };
  planLabels: Record<string, string>;
  productLabels: Record<string, string>;
  /** 2-패스 트랙 스위치 (⑤1-4) — 점주 vs 본사·다점포 */
  trackHeading: string;
  trackOwner: { label: string; desc: string; formNote: string };
  trackEnterprise: { label: string; desc: string };
  enterpriseFormTitle: string;
  enterpriseFormSubtitle: string;
};

// Display prose comes from the CMS (content/site/contact.yaml → generated JSON);
// form options, validation, the URL-param label maps, the ReactNode headings, and the
// title interpolations stay in code, merged with the copy by contactCopy().
type CodeContent = Pick<
  Content,
  | 'contextHeading' | 'noticeIssue' | 'storeCountOptions' | 'affiliationTypeOptions'
  | 'planLabels' | 'productLabels' | 'formTitleWith' | 'successTitleWith' | 'validation'
  | 'trackHeading' | 'trackOwner' | 'trackEnterprise' | 'enterpriseFormTitle' | 'enterpriseFormSubtitle'
>;
type ContactCms = Omit<Content, keyof CodeContent | 'cards'> & {
  cards: Record<string, { label: string; desc: string }>;
};
const CONTACT = siteContent.contact as Record<Locale, ContactCms>;

const CODE: Record<Locale, CodeContent> = {
  ko: {
    contextHeading: (
      <>
        1개 매장부터 수백 개까지,<br />
        매장에 맞게 시작합니다
      </>
    ),
    formTitleWith: (label) => `${label} 맞춤 무료 상담`,
    storeCountOptions: [
      { value: '1', label: '1개' },
      { value: '2-3', label: '2-3개' },
      { value: '4-5', label: '4-5개' },
      { value: '6+', label: '6개 이상' },
    ],
    affiliationTypeOptions: [
      { value: 'franchisee', label: '가맹점주' },
      { value: 'hq-ops', label: '본사 운영팀' },
      { value: 'sv', label: 'SV (슈퍼바이저)' },
      { value: 'other', label: '기타' },
    ],
    noticeIssue: (
      <>
        폼 제출에 문제가 있나요? <a href="mailto:SAAI@deepingsource.io" className="text-primary font-medium hover:underline">SAAI@deepingsource.io</a>로 직접 문의해 주세요.
      </>
    ),
    successTitleWith: (label) => `${label} 상담 신청이 완료되었습니다!`,
    validation: {
      name: '이름을 입력해주세요',
      contact: '연락처를 정확히 입력해주세요',
      storeCount: '매장 수를 선택해주세요',
      affiliationType: '소속 유형을 선택해주세요',
    },
    planLabels: {
      standard: 'POS 연동 플랜',
      premium: 'AI 비서 플랜',
      enterprise: '엔터프라이즈',
    },
    productLabels: {
      StoreAgent: 'saai agent',
      StoreCare: 'saai care',
      StoreInsight: 'saai insight',
    },
    trackHeading: '어떤 방식으로 시작하시겠어요?',
    trackOwner: {
      label: '혼자 시작할게요 · 점주',
      desc: '내 매장 하나 — 앱으로 바로, 첫 달 무료',
      formNote: '상담을 원하시면 아래 폼으로 문의하셔도 됩니다.',
    },
    trackEnterprise: {
      label: '여러 매장 · 본사 도입',
      desc: '다점포 표준화 — 맞춤 상담과 견적',
    },
    enterpriseFormTitle: '본사·다점포 도입 상담',
    enterpriseFormSubtitle: '지점 규모와 현황을 알려주시면 본사 단위 도입 방안과 견적을 안내해 드립니다.',
  },
  en: {
    contextHeading: (
      <>
        From a single store to hundreds,<br />
        we start where your business is
      </>
    ),
    formTitleWith: (label) => `Request a free ${label} consultation`,
    storeCountOptions: [
      { value: '1', label: '1' },
      { value: '2-3', label: '2-3' },
      { value: '4-5', label: '4-5' },
      { value: '6+', label: '6 or more' },
    ],
    affiliationTypeOptions: [
      { value: 'franchisee', label: 'Franchise owner' },
      { value: 'hq-ops', label: 'HQ operations team' },
      { value: 'sv', label: 'SV (Supervisor)' },
      { value: 'other', label: 'Other' },
    ],
    noticeIssue: (
      <>
        Trouble submitting the form? Email us directly at <a href="mailto:SAAI@deepingsource.io" className="text-primary font-medium hover:underline">SAAI@deepingsource.io</a>.
      </>
    ),
    successTitleWith: (label) => `Your ${label} request has been submitted!`,
    validation: {
      name: 'Please enter your name',
      contact: 'Please enter a valid contact',
      storeCount: 'Please select the number of stores',
      affiliationType: 'Please select your role',
    },
    planLabels: {
      standard: 'POS Integration Plan',
      premium: 'AI Assistant Plan',
      enterprise: 'Enterprise',
    },
    productLabels: {
      StoreAgent: 'saai agent',
      StoreCare: 'saai care',
      StoreInsight: 'saai insight',
    },
    trackHeading: 'How would you like to start?',
    trackOwner: {
      label: 'On my own · store owner',
      desc: 'One store — start in the app, first month free',
      formNote: 'Prefer to talk? The form below works too.',
    },
    trackEnterprise: {
      label: 'Multi-store · HQ adoption',
      desc: 'Standardize across stores — tailored consultation & quote',
    },
    enterpriseFormTitle: 'HQ & multi-store consultation',
    enterpriseFormSubtitle: 'Tell us your store count and situation — we’ll propose an HQ-level rollout and quote.',
  },
  jp: {
    contextHeading: (
      <>
        1店舗から数百店舗まで、<br />
        店舗に合わせて始められます
      </>
    ),
    formTitleWith: (label) => `${label} の無料相談お申し込み`,
    storeCountOptions: [
      { value: '1', label: '1店舗' },
      { value: '2-3', label: '2-3店舗' },
      { value: '4-5', label: '4-5店舗' },
      { value: '6+', label: '6店舗以上' },
    ],
    affiliationTypeOptions: [
      { value: 'franchisee', label: '加盟店オーナー' },
      { value: 'hq-ops', label: '本部運営チーム' },
      { value: 'sv', label: 'SV（スーパーバイザー）' },
      { value: 'other', label: 'その他' },
    ],
    noticeIssue: (
      <>
        フォームの送信に問題がありますか？ <a href="mailto:SAAI@deepingsource.io" className="text-primary font-medium hover:underline">SAAI@deepingsource.io</a> まで直接お問い合わせください。
      </>
    ),
    successTitleWith: (label) => `${label} のご相談お申し込みが完了しました！`,
    validation: {
      name: 'お名前を入力してください',
      contact: 'ご連絡先を正しく入力してください',
      storeCount: '店舗数を選択してください',
      affiliationType: 'ご所属の種別を選択してください',
    },
    planLabels: {
      standard: 'POS連携プラン',
      premium: 'AIアシスタントプラン',
      enterprise: 'エンタープライズ',
    },
    productLabels: {
      StoreAgent: 'saai agent',
      StoreCare: 'saai care',
      StoreInsight: 'saai insight',
    },
    trackHeading: 'どの形で始めますか？',
    trackOwner: {
      label: '1人で始める · 店舗オーナー',
      desc: '1店舗 — アプリですぐ、初月無料',
      formNote: 'ご相談を希望の場合は、下のフォームもご利用いただけます。',
    },
    trackEnterprise: {
      label: '複数店舗 · 本部導入',
      desc: '多店舗標準化 — カスタム相談とお見積もり',
    },
    enterpriseFormTitle: '本部・多店舗導入のご相談',
    enterpriseFormSubtitle: '店舗数と状況をお知らせいただければ、本部単位の導入プランとお見積もりをご案内します。',
  },
};

function contactCopy(locale: Locale): Content {
  const c = CONTACT[locale];
  return {
    ...CODE[locale],
    ...c,
    cards: [c.cards.care, c.cards.insight, c.cards.agent],
  };
}

function buildSchema(t: Content) {
  return z.object({
    name: z.string().min(1, t.validation.name),
    contact: z.string().min(5, t.validation.contact),
    storeCount: z.string().min(1, t.validation.storeCount),
    affiliationType: z.string().min(1, t.validation.affiliationType),
    brandName: z.string().optional(),
  });
}

type FormData = z.infer<ReturnType<typeof buildSchema>>;

export default function ContactFormPage({ locale = 'en' }: { locale?: Locale }) {
  // 폼 골격을 즉시 렌더 (전면 Suspense fallback "Loading" 제거, 1-9).
  // 사전 선택 라벨(plan/product)은 CSR 전용이라 마운트 후 useEffect로 읽는다 —
  // 첫 페인트에는 없다가 하이드레이션 후 채워지는 부가 정보라 CLS 영향 미미.
  return <ContactForm locale={locale} />;
}

function ContactForm({ locale }: { locale: Locale }) {
  const t = contactCopy(locale);
  const [params, setParams] = useState<{ plan: string | null; product: string | null; source: string | null }>({ plan: null, product: null, source: null });
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    // `?type=enterprise` tags the lead source for Slack/CRM routing (see api/contact).
    setParams({ plan: sp.get('plan'), product: sp.get('product'), source: sp.get('type') === 'enterprise' ? 'enterprise' : null });
  }, []);
  const planParam = params.plan;
  const productParam = params.product;
  const sourceParam = params.source;
  const planLabel = planParam ? t.planLabels[planParam] : null;
  const productLabel = productParam ? t.productLabels[productParam] : null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schema = buildSchema(t);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // 2-패스 트랙 (⑤1-4): 명시 선택 > ?type=enterprise > 폼 신호(본사/SV 또는 6개 이상).
  const [track, setTrack] = useState<'owner' | 'enterprise' | null>(null);
  const watchedAffiliation = watch('affiliationType');
  const watchedStoreCount = watch('storeCount');
  const looksEnterprise =
    watchedAffiliation === 'hq-ops' || watchedAffiliation === 'sv' || watchedStoreCount === '6+';
  const effectiveTrack =
    track ?? (sourceParam === 'enterprise' || looksEnterprise ? 'enterprise' : null);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          plan: planParam ?? undefined,
          product: productParam ?? undefined,
          // 트랙 E로 판별·선택된 리드는 ?type=enterprise와 동일하게 태깅 (§2-5)
          source: effectiveTrack === 'enterprise' ? 'enterprise' : sourceParam ?? undefined,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? t.errSubmitFailed);
      }

      trackEvent('contact_submit', { plan: planParam ?? '', product: productParam ?? '' });
      setIsSubmitted(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError(t.errTimeout);
      } else {
        setError(err instanceof Error ? err.message : t.errGeneric);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success State
  if (isSubmitted) {
    const contextLabel = productLabel || planLabel;
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 animate-checkmark">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up delay-100">
            {contextLabel ? t.successTitleWith(contextLabel) : t.successTitle}
          </h1>
          <p className="text-gray-600 mb-8 animate-fade-in-up delay-200">
            {t.successSubtitle}
          </p>
          <div className="p-4 bg-gray-50 rounded-xl mb-6 animate-fade-in-up delay-300">
            <p className="text-sm text-gray-500 mb-2">{t.insightPrompt}</p>
            <Link
              href={localeHref(locale, '/resources/blog')}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              {t.insightLink}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Link
            href={localeHref(locale, '/')}
            className="inline-flex items-center justify-center px-6 py-3 text-gray-700 font-medium hover:text-gray-900 transition-colors animate-fade-in-up delay-400"
          >
            {t.backToHome}
          </Link>
        </div>
      </div>
    );
  }

  // Form State
  const cardIcons = [Eye, BarChart3, Zap];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full grid md:grid-cols-[1fr_1.1fr] gap-12 items-start">
        {/* Context Panel — 좌측 (데스크탑) / 상단 (모바일) */}
        <div className="hidden md:block p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm h-full">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">{t.eyebrow}</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-snug">
            {t.contextHeading}
          </h2>

          <div className="space-y-6 mb-8">
            {t.cards.map((item, i) => {
              const Icon = cardIcons[i];
              return (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-lighter border border-primary/15 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-sm font-bold text-gray-900 mb-1">{item.label}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t.provenLabel}</p>
              <p className="text-sm font-medium text-gray-900">{t.provenText}</p>
            </div>
            <div className="p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t.partnerLabel}</p>
              <p className="text-sm text-gray-600">{t.partnerText}</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            {t.contextFooter}
          </p>
        </div>

        {/* Form Column — 우측 (데스크탑) / 전체 (모바일) */}
        <div>
          {/* Mobile Trust Bar */}
          <div className="md:hidden mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
            <p className="text-xs text-gray-500 mb-1">{t.mobileTrustLabel}</p>
            <p className="text-sm font-medium text-gray-700">{t.mobileTrustBrands}</p>
          </div>
          {/* 2-패스 트랙 스위치 (⑤1-4) — 점주는 자가 시작으로, 본사는 상담·견적 문구로 분기 */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 mb-2 text-center">{t.trackHeading}</p>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label={t.trackHeading}>
              {(
                [
                  { key: 'owner' as const, label: t.trackOwner.label, desc: t.trackOwner.desc },
                  { key: 'enterprise' as const, label: t.trackEnterprise.label, desc: t.trackEnterprise.desc },
                ]
              ).map(({ key, label, desc }) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={effectiveTrack === key}
                  onClick={() => setTrack(key)}
                  className={`rounded-xl border p-3 text-left transition-colors cursor-pointer ${
                    effectiveTrack === key
                      ? 'border-primary bg-primary-lighter/40'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="block text-sm font-bold text-gray-900 break-keep">{label}</span>
                  <span className="block text-2xs text-gray-500 mt-0.5 break-keep">{desc}</span>
                </button>
              ))}
            </div>
            {effectiveTrack === 'owner' && (
              <div className="mt-3 p-4 rounded-xl bg-primary-lighter/30 border border-primary/15 text-center">
                <a
                  href={OWNER_START_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {CTA_TRACK_O[locale]}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <p className="mt-2 text-xs text-gray-500 break-keep">{t.trackOwner.formNote}</p>
              </div>
            )}
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {effectiveTrack === 'enterprise'
                ? t.enterpriseFormTitle
                : planLabel
                ? t.formTitleWith(planLabel)
                : productLabel
                ? t.formTitleWith(productLabel)
                : t.formTitle}
            </h1>
            <p className="text-gray-600">
              {effectiveTrack === 'enterprise' ? t.enterpriseFormSubtitle : t.formSubtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t.nameLabel} <span className="text-error">*</span>
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder={t.namePlaceholder}
                {...register('name')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 placeholder-gray-400 transition-shadow"
                disabled={isSubmitting}
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-error" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                {t.contactLabel} <span className="text-error">*</span>
              </label>
              <input
                id="contact"
                type="text"
                autoComplete="off"
                spellCheck="false"
                placeholder={t.contactPlaceholder}
                {...register('contact')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 placeholder-gray-400 transition-shadow"
                disabled={isSubmitting}
                aria-describedby={errors.contact ? 'contact-error' : undefined}
                aria-invalid={errors.contact ? 'true' : 'false'}
              />
              {errors.contact && (
                <p id="contact-error" className="mt-1 text-sm text-error" role="alert">
                  {errors.contact.message}
                </p>
              )}
            </div>

            {/* Store Count */}
            <div>
              <label htmlFor="storeCount" className="block text-sm font-medium text-gray-700 mb-1">
                {t.storeCountLabel} <span className="text-error">*</span>
              </label>
              <select
                id="storeCount"
                {...register('storeCount')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 bg-white transition-shadow"
                disabled={isSubmitting}
                aria-describedby={errors.storeCount ? 'store-error' : undefined}
                aria-invalid={errors.storeCount ? 'true' : 'false'}
              >
                <option value="">{t.selectPlaceholder}</option>
                {t.storeCountOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.storeCount && (
                <p id="store-error" className="mt-1 text-sm text-error" role="alert">
                  {errors.storeCount.message}
                </p>
              )}
            </div>

            {/* Affiliation Type + Brand Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="affiliationType" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.affiliationLabel} <span className="text-error">*</span>
                </label>
                <select
                  id="affiliationType"
                  {...register('affiliationType')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 bg-white transition-shadow"
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-describedby={errors.affiliationType ? 'affiliation-error' : undefined}
                  aria-invalid={errors.affiliationType ? 'true' : 'false'}
                >
                  <option value="">{t.selectPlaceholder}</option>
                  {t.affiliationTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.affiliationType && (
                  <p id="affiliation-error" className="mt-1 text-sm text-error" role="alert">
                    {errors.affiliationType.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.brandLabel} <span className="text-gray-500">{t.brandOptional}</span>
                </label>
                <input
                  id="brandName"
                  type="text"
                  placeholder={t.brandPlaceholder}
                  {...register('brandName')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 placeholder-gray-400 transition-shadow"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="flex items-center justify-center gap-1.5 text-sm text-error text-center" role="alert">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-4 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed group transition-[box-shadow,opacity]"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Spinner />
                    {t.submitting}
                  </>
                ) : (
                  <>
                    {t.submit}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>

            {/* Notice */}
            <div className="p-5 bg-gray-50 rounded-xl text-center border border-gray-100">
              <p className="text-sm text-gray-900 flex items-center justify-center gap-2 font-bold mb-3">
                <Check className="w-4 h-4 text-emerald-500" />
                {t.noticeBold}
              </p>
              <p className="text-xs text-gray-500 bg-white inline-block px-3 py-1.5 rounded-md shadow-sm border border-gray-200">
                {t.noticeIssue}
              </p>
            </div>
          </form>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link
              href={localeHref(locale, '/')}
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              {t.backToHome}
            </Link>
          </div>
        </div>{/* end form column */}
      </div>
    </div>
  );
}
