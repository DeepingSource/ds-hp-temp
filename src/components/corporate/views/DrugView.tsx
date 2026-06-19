import Link from 'next/link';
import {
  ArrowRight,
  LayoutGrid,
  PackageX,
  Footprints,
  Quote,
  Pill,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, service } from '@/lib/structured-data';

/**
 * DrugView — shared drugstore solution composition.
 * Rendered by `/solutions/drug` (en), `/ko/solutions/drug`, `/jp/solutions/drug`
 * with the locale prop (PLAN_v1.1 D6 path-prefix i18n).
 */

const C: Record<Locale, {
  badge: string;
  heroTitle: [string, string];
  heroSub: string;
  heroCta: string;
  scenarios: { tag: string; title: string; body: string }[];
  scenariosEyebrow: string;
  scenariosHeading: string;
  quote: string;
  quoteName: string;
  quoteRole: string;
  ctaEyebrow: string;
  ctaTitle: [string, string];
  ctaSub: string;
  ctaButton: string;
}> = {
  ko: {
    badge: '드럭스토어',
    heroTitle: ['업종이 달라도', '한 매장처럼'],
    heroSub: '진열 일관성, 결품 방지, 고객 동선까지. 카테고리가 많은 드럭스토어 운영을 같은 기준으로 살펴 깔끔하고 안정적인 매장을 돕습니다.',
    heroCta: '도입 상담 신청',
    scenarios: [
      { tag: '진열', title: '진열의 일관성을 모든 매장에', body: '카테고리가 많고 회전이 빠른 만큼 진열이 흐트러지기 쉽습니다. 매대 진열 상태를 같은 기준으로 살펴, 어느 매장이든 깔끔한 진열이 유지되도록 돕습니다.' },
      { tag: '결품', title: '인기 품목의 빈자리를 먼저', body: '찾는 손님이 많은 품목일수록 빈 매대가 곧 이탈로 이어집니다. 결품 신호를 빠르게 알려 채워야 할 매대를 먼저 확인하도록 돕습니다.' },
      { tag: '동선', title: '고객 동선을 운영에 반영', body: '사람이 많이 머무는 구역과 지나치는 구역의 흐름을 살핍니다. 진열과 배치를 점검하는 근거로 활용해 매장 경험을 다듬도록 돕습니다.' },
    ],
    scenariosEyebrow: '드럭스토어의 현장 문제',
    scenariosHeading: '많은 품목도, 한결같은 매장으로',
    quote: '"품목이 워낙 많아 진열이 자주 흐트러졌는데, 같은 기준으로 매장을 보게 되니 어느 지점이든 정돈된 모습을 유지하게 됐습니다."',
    quoteName: '드럭스토어 운영 점주',
    quoteRole: '다카테고리 매장',
    ctaEyebrow: '무료 상담',
    ctaTitle: ['모든 지점을', '한결같은 매장으로'],
    ctaSub: '매장 현황을 알려주시면 적합한 적용 방안을 안내해 드립니다.',
    ctaButton: '도입 상담 신청',
  },
  en: {
    badge: 'Drugstore',
    heroTitle: ['Different formats,', 'one store'],
    heroSub: 'Display consistency, out-of-stock prevention, and customer flow. We watch the operations of category-heavy drugstores by the same standard, for clean and steady stores.',
    heroCta: 'Request a consultation',
    scenarios: [
      { tag: 'Display', title: 'Display consistency in every store', body: 'With many categories and fast turnover, displays slip out of order easily. We watch shelf display by the same standard, so every store keeps a clean, orderly look.' },
      { tag: 'Out-of-stock', title: 'Catch the gaps in popular items first', body: 'The more in-demand an item, the faster an empty shelf turns into a walk-away. We flag out-of-stock signals quickly, so you check the shelves to restock first.' },
      { tag: 'Customer flow', title: 'Bring customer flow into operations', body: 'We watch the flow through areas where people linger and areas they pass by — a basis for reviewing display and layout and refining the store experience.' },
    ],
    scenariosEyebrow: 'On-site problems in drugstores',
    scenariosHeading: 'Many items, one consistent store',
    quote: '"With so many items, displays often slipped out of order, but seeing every store by the same standard means each location stays neat and tidy."',
    quoteName: 'Drugstore owner',
    quoteRole: 'Multi-category store',
    ctaEyebrow: 'Free consultation',
    ctaTitle: ['Make every location', 'one consistent store'],
    ctaSub: 'Tell us about your store and we will guide you to the right approach.',
    ctaButton: 'Request a consultation',
  },
  jp: {
    badge: 'ドラッグストア',
    heroTitle: ['業種が違っても', 'ひとつの店舗のように'],
    heroSub: '陳列の一貫性、欠品の防止、顧客の動線まで。カテゴリーの多いドラッグストアの運営を同じ基準で見守り、整った安定した店舗を支援します。',
    heroCta: '導入のご相談',
    scenarios: [
      { tag: '陳列', title: '陳列の一貫性をすべての店舗に', body: 'カテゴリーが多く回転が速いほど、陳列は崩れやすくなります。棚の陳列状態を同じ基準で見守り、どの店舗でも整った陳列が保たれるよう支援します。' },
      { tag: '欠品', title: '人気商品の空きを先に', body: '求めるお客様が多い商品ほど、空いた棚はすぐ離脱につながります。欠品のサインをすばやくお知らせし、補充すべき棚を先に確認できるよう支援します。' },
      { tag: '動線', title: '顧客の動線を運営に反映', body: '人が多く留まる区域と通り過ぎる区域の流れを見守ります。陳列と配置を点検する根拠として活用し、店舗体験を整えられるよう支援します。' },
    ],
    scenariosEyebrow: 'ドラッグストアの現場の課題',
    scenariosHeading: '多くの商品でも、変わらぬ店舗へ',
    quote: '「商品があまりに多く陳列がよく崩れていましたが、同じ基準で店舗を見られるようになり、どの店舗でも整った状態を保てるようになりました。」',
    quoteName: 'ドラッグストア運営の店主',
    quoteRole: '多カテゴリー店舗',
    ctaEyebrow: '無料相談',
    ctaTitle: ['すべての店舗を', '変わらぬ店舗へ'],
    ctaSub: '店舗の状況をお知らせいただければ、最適な導入方法をご案内します。',
    ctaButton: '導入のご相談',
  },
};

export default function DrugView({ locale }: { locale: Locale }) {
  const t = C[locale];

  const icons = [LayoutGrid, PackageX, Footprints];
  const scenarios = t.scenarios.map((s, i) => ({ ...s, icon: icons[i] }));

  return (
    <div className="bg-white min-h-screen">
      <JsonLd
        data={service({
          name: `${t.heroTitle[0]} ${t.heroTitle[1]}`,
          description: t.heroSub,
          path: '/solutions/drug',
          locale,
          serviceType: t.badge,
        })}
      />

      {/* ── 히어로 ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" aria-hidden="true" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('solutions', locale), path: '/solutions' }, { name: crumb('drug', locale), path: '/solutions/drug' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <Pill className="w-3.5 h-3.5" />
            {t.badge}
          </HeroBadge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            {t.heroTitle[0]}
            <br />
            <span className="text-primary">{t.heroTitle[1]}</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto break-keep">
            {t.heroSub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={localeHref(locale, '/contact')} className="btn-primary-dark gap-2 w-full sm:w-auto">
              {t.heroCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 시나리오 ── */}
      <AnimatedSection className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">
              {t.scenariosEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep">
              {t.scenariosHeading}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {scenarios.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.tag} className="card flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="self-start px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary">
                    {s.tag}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 break-keep">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ── 후기 ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="card relative bg-gradient-to-br from-primary/[0.04] to-white border-primary/10">
            <Quote className="w-10 h-10 text-primary/20 mb-4" />
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 leading-relaxed break-keep mb-6">
              {t.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{t.quoteName}</p>
                <p className="text-xs text-gray-500">{t.quoteRole}</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.ctaEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep">
            {t.ctaTitle[0]}
            <br />
            {t.ctaTitle[1]}
          </h2>
          <p className="text-slate-300 text-lg mb-10 break-keep">
            {t.ctaSub}
          </p>
          <Link href={localeHref(locale, '/contact')} className="btn-primary-dark gap-2">
            {t.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
