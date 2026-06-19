import Link from 'next/link';
import {
  ArrowRight,
  Users,
  Route,
  ShieldAlert,
  Quote,
  Building2,
  Layers,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, service } from '@/lib/structured-data';

/**
 * LargeSpaceView — shared large-space solution composition.
 * Rendered by `/solutions/large-space` (en), `/ko/solutions/large-space`,
 * `/jp/solutions/large-space` with the locale prop (PLAN_v1.1 D6 path-prefix i18n).
 */

const C: Record<Locale, {
  badge: string;
  heroTitle: [string, string];
  heroSub: string;
  heroCta: string;
  scenarios: { tag: string; title: string; body: string }[];
  scenariosEyebrow: string;
  scenariosHeading: string;
  mtmcBadge: string;
  mtmcHeading: string;
  mtmcBody: string;
  mtmcLink: string;
  mtmcItems: string[];
  quote: string;
  quoteName: string;
  quoteRole: string;
  ctaEyebrow: string;
  ctaTitle: [string, string];
  ctaSub: string;
  ctaButton: string;
}> = {
  ko: {
    badge: '하이퍼마켓 · 몰 · 컨벤션',
    heroTitle: ['Every space,', 'like one.'],
    heroSub: '아무리 넓은 공간도 하나의 매장처럼. 혼잡 관리, 동선 분석, 이상 감지를 같은 기준으로 통합해 대형 공간 운영을 돕습니다.',
    heroCta: '본사 도입 상담',
    scenarios: [
      { tag: '혼잡 관리', title: '넓은 공간의 흐름을 한눈에', body: '넓고 층이 많은 공간일수록 어디가 붐비는지 파악하기 어렵습니다. 구역별 혼잡 흐름을 한 화면에서 살펴, 인력 배치와 안내를 미리 준비하도록 돕습니다.' },
      { tag: '동선 분석', title: '방문객 동선을 공간 운영에', body: '입구부터 매장, 편의시설까지 이어지는 동선의 흐름을 살핍니다. 머무는 구역과 비는 구역을 파악해 배치와 안내 동선을 다듬는 근거로 활용하도록 돕습니다.' },
      { tag: '이상 감지', title: '사각지대 없는 안전 확인', body: '넓은 공간일수록 사람이 모든 곳을 지켜보기 어렵습니다. 혼잡 과밀, 낙상, 비정상 상황 같은 신호를 살펴 담당자에게 즉시 전달, 빠른 대응을 돕습니다.' },
    ],
    scenariosEyebrow: '대형 공간의 운영 과제',
    scenariosHeading: '넓은 공간도, 하나의 흐름으로',
    mtmcBadge: 'Spatial AI · MTMC',
    mtmcHeading: '여러 카메라를 하나의 공간으로',
    mtmcBody: 'MTMC(Multi-Target Multi-Camera) 공간 AI는 흩어진 여러 카메라의 시야를 하나의 공간으로 이어 붙입니다. 넓은 매장과 층을 넘나드는 흐름도 끊김 없이 이해해, 대형 공간을 한 매장처럼 살필 수 있도록 돕습니다.',
    mtmcLink: '공간 AI 기술 자세히 보기',
    mtmcItems: [
      '여러 카메라 시야를 하나의 공간 좌표로 통합',
      '층과 구역을 넘나드는 연속된 흐름 추적',
      '구역별 혼잡과 동선을 같은 기준으로 비교',
    ],
    quote: '"넓고 층이 많아 어디가 붐비는지 파악이 어려웠는데, 전체 공간을 한 화면으로 보니 인력 배치와 안내를 미리 준비할 수 있게 됐습니다."',
    quoteName: '대형 공간 운영 담당',
    quoteRole: '하이퍼마켓 · 몰',
    ctaEyebrow: '본사 도입',
    ctaTitle: ['여러 공간을', '하나의 운영 체계로'],
    ctaSub: '운영 중인 공간 규모와 환경을 알려주시면 본사 단위 적용 방안을 안내해 드립니다.',
    ctaButton: '본사 도입 상담',
  },
  en: {
    badge: 'Hypermarket · Mall · Convention',
    heroTitle: ['Every space,', 'like one.'],
    heroSub: 'However large the space, run it like one store. We unify crowd management, flow analysis, and anomaly detection under the same standard to support large-space operations.',
    heroCta: 'Enterprise consultation',
    scenarios: [
      { tag: 'Crowd management', title: 'See the flow of a vast space at a glance', body: 'The larger and more multi-level a space, the harder it is to tell where it’s crowded. Watch zone-by-zone crowd flow on one screen, and prepare staffing and guidance in advance.' },
      { tag: 'Flow analysis', title: 'Bring visitor flow into space operations', body: 'We watch the flow from entrance to stores to amenities. Identify where people linger and where they don’t — a basis for refining layout and guidance routes.' },
      { tag: 'Anomaly detection', title: 'Safety checks with no blind spots', body: 'The larger the space, the harder for people to watch everywhere. We watch signals like overcrowding, falls, and abnormal situations, and send them to the right person at once for a fast response.' },
    ],
    scenariosEyebrow: 'Operating challenges of large spaces',
    scenariosHeading: 'Even a vast space, one flow',
    mtmcBadge: 'Spatial AI · MTMC',
    mtmcHeading: 'Many cameras, as one space',
    mtmcBody: 'MTMC (Multi-Target Multi-Camera) Spatial AI stitches the views of scattered cameras into a single space. It follows flow seamlessly across wide floors and levels, so a large space can be watched like one store.',
    mtmcLink: 'Explore Spatial AI technology',
    mtmcItems: [
      'Unify multiple camera views into one spatial coordinate system',
      'Track continuous flow across floors and zones',
      'Compare zone-by-zone crowding and flow by the same standard',
    ],
    quote: '"It was large and multi-level, so it was hard to tell where it was crowded — but seeing the whole space on one screen lets us prepare staffing and guidance in advance."',
    quoteName: 'Large-space operations lead',
    quoteRole: 'Hypermarket · Mall',
    ctaEyebrow: 'Enterprise rollout',
    ctaTitle: ['Bring many spaces', 'into one operating system'],
    ctaSub: 'Tell us the scale and environment of the spaces you run, and we will guide you to an enterprise-wide approach.',
    ctaButton: 'Enterprise consultation',
  },
  jp: {
    badge: 'ハイパーマーケット · モール · コンベンション',
    heroTitle: ['Every space,', 'like one.'],
    heroSub: 'どれほど広い空間も、ひとつの店舗のように。混雑管理、動線分析、異常検知を同じ基準で統合し、大型空間の運営を支援します。',
    heroCta: '本社導入のご相談',
    scenarios: [
      { tag: '混雑管理', title: '広い空間の流れをひと目で', body: '広く階数の多い空間ほど、どこが混んでいるか把握しにくくなります。区域ごとの混雑の流れを一つの画面で見守り、人員配置と案内を前もって準備できるよう支援します。' },
      { tag: '動線分析', title: '来訪者の動線を空間運営に', body: '入口から店舗、付帯施設まで続く動線の流れを見守ります。留まる区域と空く区域を把握し、配置と案内動線を整える根拠として活用できるよう支援します。' },
      { tag: '異常検知', title: '死角のない安全確認', body: '広い空間ほど、人がすべての場所を見守るのは困難です。過密、転倒、異常な状況といったサインを見守り、担当者へただちにお伝えして迅速な対応を支援します。' },
    ],
    scenariosEyebrow: '大型空間の運営課題',
    scenariosHeading: '広い空間も、ひとつの流れで',
    mtmcBadge: 'Spatial AI · MTMC',
    mtmcHeading: '複数のカメラをひとつの空間へ',
    mtmcBody: 'MTMC(Multi-Target Multi-Camera)空間AIは、散らばった複数カメラの視野をひとつの空間へとつなぎ合わせます。広い店舗や階をまたぐ流れも途切れなく理解し、大型空間をひとつの店舗のように見守れるよう支援します。',
    mtmcLink: '空間AI技術を詳しく見る',
    mtmcItems: [
      '複数カメラの視野をひとつの空間座標に統合',
      '階と区域をまたぐ連続した流れの追跡',
      '区域ごとの混雑と動線を同じ基準で比較',
    ],
    quote: '「広く階数が多くどこが混んでいるか把握が難しかったのですが、空間全体を一つの画面で見ることで、人員配置と案内を前もって準備できるようになりました。」',
    quoteName: '大型空間運営の担当者',
    quoteRole: 'ハイパーマーケット · モール',
    ctaEyebrow: '本社導入',
    ctaTitle: ['複数の空間を', 'ひとつの運営体系へ'],
    ctaSub: '運営中の空間の規模と環境をお知らせいただければ、本社単位の導入方法をご案内します。',
    ctaButton: '本社導入のご相談',
  },
};

export default function LargeSpaceView({ locale }: { locale: Locale }) {
  const t = C[locale];

  const icons = [Users, Route, ShieldAlert];
  const scenarios = t.scenarios.map((s, i) => ({ ...s, icon: icons[i] }));

  return (
    <div className="bg-white min-h-screen">
      <JsonLd
        data={service({
          name: `${t.heroTitle[0]} ${t.heroTitle[1]}`,
          description: t.heroSub,
          path: '/solutions/large-space',
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
          <Breadcrumb items={[{ name: crumb('solutions', locale), path: '/solutions' }, { name: crumb('large-space', locale), path: '/solutions/large-space' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <Building2 className="w-3.5 h-3.5" />
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

      {/* ── MTMC 대형 공간 적용 ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-slate-950 overflow-hidden relative">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/10 blur-[140px] rounded-full" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-semibold mb-6">
                <Layers className="w-3.5 h-3.5" />
                {t.mtmcBadge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep leading-tight">
                {t.mtmcHeading}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed break-keep mb-8">
                {t.mtmcBody}
              </p>
              <Link
                href={localeHref(locale, '/technology/spatial-ai')}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                {t.mtmcLink}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <ul className="space-y-4">
              {t.mtmcItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-slate-200 text-sm leading-relaxed break-keep">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 후기 ── */}
      <AnimatedSection className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="card relative bg-gradient-to-br from-primary/[0.04] to-white border-primary/10">
            <Quote className="w-10 h-10 text-primary/20 mb-4" />
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 leading-relaxed break-keep mb-6">
              {t.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{t.quoteName}</p>
                <p className="text-xs text-gray-500">{t.quoteRole}</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 본사 도입 CTA ── */}
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
