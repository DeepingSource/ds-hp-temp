import Link from 'next/link';
import {
  ArrowRight,
  PackageX,
  GitCompareArrows,
  ShieldAlert,
  Quote,
  Store,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, service } from '@/lib/structured-data';

/**
 * RetailView — shared retail solution composition.
 * Rendered by `/solutions/retail` (en), `/ko/solutions/retail`, `/jp/solutions/retail`
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
  baEyebrow: string;
  baHeading: string;
  beforeAfter: { before: string; after: string }[];
  quote: string;
  quoteName: string;
  quoteRole: string;
  ctaEyebrow: string;
  ctaTitle: [string, string];
  ctaSub: string;
  ctaButton: string;
}> = {
  ko: {
    badge: '리테일 · 편의점 · 드럭스토어',
    heroTitle: ['업종이 달라도', '한 매장처럼'],
    heroSub: '결품, 매장 간 운영 편차, 놓치기 쉬운 이상 상황까지. 매장 운영의 핵심 문제를 같은 기준으로 살펴 일관된 운영을 돕습니다.',
    heroCta: '도입 상담 신청',
    scenarios: [
      { tag: '결품', title: '빈 매대가 매출이 됩니다', body: '잘 팔리는 상품일수록 매대가 비는 순간 매출이 빠져나갑니다. 매대 상태를 상시로 살펴 결품 신호를 빠르게 알려, 채워야 할 때를 놓치지 않도록 돕습니다.' },
      { tag: '운영 편차', title: '매장마다 다른 운영을 하나로', body: '같은 브랜드라도 매장마다 진열, 청결, 응대 수준이 다릅니다. 매장별 운영 상태를 같은 기준으로 비교해, 잘하는 매장의 기준을 모든 매장으로 넓힙니다.' },
      { tag: '이상 감지', title: '놓치기 쉬운 순간을 먼저', body: '혼잡, 낙상, 비정상 동선처럼 사람이 매번 지켜보기 어려운 상황을 대신 살핍니다. 이상 신호가 보이면 담당자에게 즉시 전달해 빠른 대응을 돕습니다.' },
    ],
    scenariosEyebrow: '자주 마주치는 현장 문제',
    scenariosHeading: '현장의 세 가지 순간',
    baEyebrow: '무엇이 달라지나요',
    baHeading: '지켜보던 운영에서, 먼저 아는 운영으로',
    beforeAfter: [
      { before: '매대가 빈 줄 모르고 지나가다 뒤늦게 발견', after: '결품 신호를 받아 채워야 할 매대를 먼저 확인' },
      { before: '매장마다 제각각인 운영 수준', after: '같은 기준으로 비교되는, 한 매장처럼 일관된 운영' },
      { before: '사람이 종일 모니터를 지켜봐야 하는 감시', after: '이상 상황만 골라 알려주는 선택적 확인' },
    ],
    quote: '"매대가 비는 걸 손님보다 먼저 알게 되니까, 채워야 할 타이밍을 놓치지 않게 됐어요. 여러 매장을 같은 눈으로 보는 느낌입니다."',
    quoteName: '편의점 운영 점주',
    quoteRole: '다점포 운영',
    ctaEyebrow: '무료 상담',
    ctaTitle: ['우리 매장에 맞는', '운영 기준을 만들어 보세요'],
    ctaSub: '매장 현황을 알려주시면 적합한 적용 방안을 안내해 드립니다.',
    ctaButton: '도입 상담 신청',
  },
  en: {
    badge: 'Retail · Convenience · Drugstore',
    heroTitle: ['Different formats,', 'one store'],
    heroSub: 'Out-of-stock, store-to-store inconsistency, and easy-to-miss anomalies. We watch the core problems of store operations by the same standard, for consistent operations.',
    heroCta: 'Request a consultation',
    scenarios: [
      { tag: 'Out-of-stock', title: 'An empty shelf is lost revenue', body: 'The better a product sells, the more revenue slips away the moment its shelf goes empty. We watch shelf status continuously and flag out-of-stock signals quickly, so you never miss the moment to restock.' },
      { tag: 'Inconsistency', title: 'Many stores, run as one', body: 'Even within one brand, display, cleanliness, and service vary by store. We compare each store by the same standard, so the best stores set the bar for every store.' },
      { tag: 'Anomaly detection', title: 'Catch the moments easily missed', body: 'Crowding, falls, abnormal movement — situations hard for people to watch every time, watched for you. When an anomaly appears, it is sent to the right person at once for a fast response.' },
    ],
    scenariosEyebrow: 'Common on-site problems',
    scenariosHeading: 'Three moments on the floor',
    baEyebrow: 'What changes',
    baHeading: 'From watching, to knowing first',
    beforeAfter: [
      { before: 'Walking past an empty shelf, noticing too late', after: 'Getting an out-of-stock signal and checking the shelf first' },
      { before: 'Operating standards that differ store by store', after: 'Compared by one standard — consistent, run as one store' },
      { before: 'Surveillance that needs someone watching the monitor all day', after: 'Selective review — only anomalies are surfaced' },
    ],
    quote: '"I find out a shelf is empty before the customer does, so I never miss the moment to restock. It feels like seeing every store through one set of eyes."',
    quoteName: 'Convenience store owner',
    quoteRole: 'Multi-store operation',
    ctaEyebrow: 'Free consultation',
    ctaTitle: ['Build the operating standard', 'that fits your store'],
    ctaSub: 'Tell us about your store and we will guide you to the right approach.',
    ctaButton: 'Request a consultation',
  },
  jp: {
    badge: 'リテール · コンビニ · ドラッグストア',
    heroTitle: ['業種が違っても', 'ひとつの店舗のように'],
    heroSub: '欠品、店舗間の運営のばらつき、見逃しやすい異常まで。店舗運営の核心的な課題を同じ基準で見守り、一貫した運営を支援します。',
    heroCta: '導入のご相談',
    scenarios: [
      { tag: '欠品', title: '空いた棚は売上になります', body: 'よく売れる商品ほど、棚が空いた瞬間に売上が逃げていきます。棚の状態を常時見守って欠品のサインをすばやくお知らせし、補充すべきタイミングを逃さないよう支援します。' },
      { tag: '運営のばらつき', title: '店舗ごとに異なる運営をひとつに', body: '同じブランドでも、店舗ごとに陳列・清潔・接客の水準は異なります。店舗ごとの運営状態を同じ基準で比較し、優れた店舗の基準をすべての店舗へ広げます。' },
      { tag: '異常検知', title: '見逃しやすい瞬間を先に', body: '混雑・転倒・異常な動線など、人が毎回見守るのが難しい状況を代わりに見守ります。異常のサインがあれば担当者へただちにお伝えし、迅速な対応を支援します。' },
    ],
    scenariosEyebrow: 'よく直面する現場の課題',
    scenariosHeading: '現場の三つの瞬間',
    baEyebrow: '何が変わるのか',
    baHeading: '見守る運営から、先に気づく運営へ',
    beforeAfter: [
      { before: '棚が空いたことに気づかず通り過ぎ、後から発見', after: '欠品のサインを受け取り、補充すべき棚を先に確認' },
      { before: '店舗ごとにばらばらな運営水準', after: '同じ基準で比較される、ひとつの店舗のような一貫した運営' },
      { before: '人が一日中モニターを見守る監視', after: '異常な状況だけを選んでお知らせする選択的な確認' },
    ],
    quote: '「棚が空くのをお客様より先に気づけるので、補充すべきタイミングを逃さなくなりました。複数の店舗を同じ目で見ている感覚です。」',
    quoteName: 'コンビニ運営の店主',
    quoteRole: '多店舗運営',
    ctaEyebrow: '無料相談',
    ctaTitle: ['自店に合った', '運営基準をつくりましょう'],
    ctaSub: '店舗の状況をお知らせいただければ、最適な導入方法をご案内します。',
    ctaButton: '導入のご相談',
  },
};

export default function RetailView({ locale }: { locale: Locale }) {
  const t = C[locale];

  const icons = [PackageX, GitCompareArrows, ShieldAlert];
  const scenarios = t.scenarios.map((s, i) => ({ ...s, icon: icons[i] }));

  return (
    <div className="bg-white min-h-screen">
      <JsonLd
        data={service({
          name: `${t.heroTitle[0]} ${t.heroTitle[1]}`,
          description: t.heroSub,
          path: '/solutions/retail',
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
          <Breadcrumb items={[{ name: crumb('solutions', locale), path: '/solutions' }, { name: crumb('retail', locale), path: '/solutions/retail' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <Store className="w-3.5 h-3.5" />
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

      {/* ── 3 시나리오 ── */}
      <AnimatedSection className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">
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

      {/* ── Before / After ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">
              {t.baEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep">
              {t.baHeading}
            </h2>
          </div>

          <div className="space-y-4">
            {t.beforeAfter.map((row, i) => (
              <div
                key={i}
                className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-4 bg-white rounded-2xl border border-gray-100 p-6"
              >
                <p className="text-sm text-gray-500 line-through break-keep">{row.before}</p>
                <ArrowRight className="w-5 h-5 text-primary mx-auto rotate-90 sm:rotate-0" />
                <p className="text-sm font-medium text-gray-900 break-keep">{row.after}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── 점주 후기 ── */}
      <AnimatedSection className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="card relative bg-gradient-to-br from-primary/[0.04] to-white border-primary/10">
            <Quote className="w-10 h-10 text-primary/20 mb-4" />
            <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed break-keep mb-6">
              {t.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Store className="w-5 h-5 text-primary" />
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
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.ctaEyebrow}</p>
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
