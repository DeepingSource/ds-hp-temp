import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Clock,
  ClipboardList,
  Quote,
  Coffee,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, service } from '@/lib/structured-data';

/**
 * FoodBeverageView — shared café & F&B solution composition.
 * Rendered by `/solutions/food-beverage` (en), `/ko/solutions/food-beverage`,
 * `/jp/solutions/food-beverage` with the locale prop (PLAN_v1.1 D6 path-prefix i18n).
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
    badge: '카페 · 음식점',
    heroTitle: ['업종이 달라도', '한 매장처럼'],
    heroSub: '위생, 대기와 회전, 발주 타이밍까지. 바쁜 외식 매장의 운영을 같은 기준으로 살펴 흔들림 없는 서비스를 돕습니다.',
    heroCta: '도입 상담 신청',
    scenarios: [
      { tag: '위생', title: '매장 위생을 일관된 기준으로', body: '청결은 매장의 첫인상이자 신뢰입니다. 정리·청결 상태를 같은 기준으로 살펴, 바쁜 시간대에도 위생 수준이 흔들리지 않도록 돕습니다.' },
      { tag: '대기·회전', title: '붐비는 순간을 미리 읽습니다', body: '대기 줄이 길어지면 이탈로 이어집니다. 혼잡과 좌석 상태를 살펴 붐비는 흐름을 빠르게 파악하고, 응대와 회전을 준비할 수 있도록 돕습니다.' },
      { tag: '발주', title: '발주 타이밍을 놓치지 않게', body: '재료 소진과 매대 상태를 참고해 발주가 필요한 시점을 가늠합니다. 모자라거나 남기는 일을 줄이고 운영 리듬을 안정적으로 유지하도록 돕습니다.' },
    ],
    scenariosEyebrow: '외식 매장의 현장 문제',
    scenariosHeading: '피크 타임에도 무너지지 않는 운영',
    quote: '"피크 타임에 직접 다 챙기기 어려웠는데, 붐비는 흐름과 위생 상태를 같이 보니 미리 준비하게 됩니다. 직원이 바뀌어도 운영이 흔들리지 않아요."',
    quoteName: '카페 운영 점주',
    quoteRole: '외식 매장',
    ctaEyebrow: '무료 상담',
    ctaTitle: ['바쁜 시간에도', '흔들리지 않는 매장으로'],
    ctaSub: '매장 운영 상황을 알려주시면 적합한 적용 방안을 안내해 드립니다.',
    ctaButton: '도입 상담 신청',
  },
  en: {
    badge: 'Café & F&B',
    heroTitle: ['Different formats,', 'one store'],
    heroSub: 'Hygiene, waits and turnover, and reorder timing. We watch the operations of busy food-service stores by the same standard, for service that never wavers.',
    heroCta: 'Request a consultation',
    scenarios: [
      { tag: 'Hygiene', title: 'Hygiene held to one standard', body: 'Cleanliness is a store’s first impression and its trust. We watch tidiness and cleanliness by the same standard, so hygiene holds steady even at the busiest hours.' },
      { tag: 'Waits & turnover', title: 'Read the rush before it hits', body: 'Long lines turn into walk-aways. We watch crowding and seat status to read the rush early, so you can prepare service and turnover.' },
      { tag: 'Reordering', title: 'Never miss the reorder window', body: 'We gauge when to reorder from ingredient depletion and shelf status. Less running short, less waste — keeping your operating rhythm steady.' },
    ],
    scenariosEyebrow: 'On-site problems in food service',
    scenariosHeading: 'Operations that hold through peak hours',
    quote: '"It was hard to handle everything myself at peak time, but seeing the rush and hygiene together lets me prepare in advance. Even when staff change, operations don’t waver."',
    quoteName: 'Café owner',
    quoteRole: 'Food-service store',
    ctaEyebrow: 'Free consultation',
    ctaTitle: ['A store that holds steady', 'even at its busiest'],
    ctaSub: 'Tell us about your operations and we will guide you to the right approach.',
    ctaButton: 'Request a consultation',
  },
  jp: {
    badge: 'カフェ · 飲食店',
    heroTitle: ['業種が違っても', 'ひとつの店舗のように'],
    heroSub: '衛生、待ち時間と回転、発注のタイミングまで。忙しい飲食店の運営を同じ基準で見守り、ぶれないサービスを支援します。',
    heroCta: '導入のご相談',
    scenarios: [
      { tag: '衛生', title: '店舗の衛生を一貫した基準で', body: '清潔さは店舗の第一印象であり、信頼です。整理・清潔の状態を同じ基準で見守り、忙しい時間帯でも衛生水準がぶれないよう支援します。' },
      { tag: '待ち時間・回転', title: '混み合う瞬間を先に読み取ります', body: '待ち列が長くなると離脱につながります。混雑と座席の状態を見守って混み合う流れをすばやく把握し、接客と回転を準備できるよう支援します。' },
      { tag: '発注', title: '発注のタイミングを逃さないように', body: '材料の消費と棚の状態を参考に、発注が必要な時点を見極めます。不足や余りを減らし、運営のリズムを安定して保てるよう支援します。' },
    ],
    scenariosEyebrow: '飲食店の現場の課題',
    scenariosHeading: 'ピークタイムでも崩れない運営',
    quote: '「ピークタイムにすべてを自分で見るのは難しかったのですが、混み合う流れと衛生状態を一緒に見ることで前もって準備できます。スタッフが替わっても運営がぶれません。」',
    quoteName: 'カフェ運営の店主',
    quoteRole: '飲食店',
    ctaEyebrow: '無料相談',
    ctaTitle: ['忙しい時間でも', 'ぶれない店舗へ'],
    ctaSub: '店舗の運営状況をお知らせいただければ、最適な導入方法をご案内します。',
    ctaButton: '導入のご相談',
  },
};

export default function FoodBeverageView({ locale }: { locale: Locale }) {
  const t = C[locale];

  const icons = [Sparkles, Clock, ClipboardList];
  const scenarios = t.scenarios.map((s, i) => ({ ...s, icon: icons[i] }));

  return (
    <div className="bg-white min-h-screen">
      <JsonLd
        data={service({
          name: `${t.heroTitle[0]} ${t.heroTitle[1]}`,
          description: t.heroSub,
          path: '/solutions/food-beverage',
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
          <Breadcrumb items={[{ name: crumb('solutions', locale), path: '/solutions' }, { name: crumb('food-beverage', locale), path: '/solutions/food-beverage' }]} locale={locale} tone="dark" className="mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm font-semibold tracking-wide backdrop-blur-sm mb-8">
            <Coffee className="w-3.5 h-3.5" />
            {t.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 break-keep">
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
                  <span className="self-start px-2.5 py-1 rounded-lg text-xs font-black bg-primary/10 text-primary">
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
                <Coffee className="w-5 h-5 text-primary" />
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
