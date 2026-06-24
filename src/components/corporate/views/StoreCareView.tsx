import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StoreCareMockup from '@/components/mockups/StoreCareMockup';
import { KakaoAlertMockup } from '@/components/mockups';
import { Store, ArrowUpRight, ShieldCheck, Eye, Bell } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines } from '@/lib/brand-canon';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';

/**
 * StoreCareView — shared store care product-detail composition.
 * Rendered by `/products/store-care` (en), `/ko/products/store-care`,
 * `/jp/products/store-care` with the locale prop. Product name stays identical.
 * External CTAs keep storecare.ai.
 */

const C: Record<Locale, {
  heroTitle: string;
  heroSub: string;
  heroCta: string;
  heroPrice: string;
  mockupHeading: string;
  mockupSub: string;
  mockupNote: string;
  scenariosHeading: string;
  scenariosSub: string;
  scenarios: string[];
  values: { title: string; desc: string }[];
  valueCta: string;
  valueNote: [string, string];
  otherProducts: string;
}> = {
  ko: {
    heroTitle: '누가 일해도, 언제나 완벽한 매장.',
    heroSub: '인건비는 오르고 사람 구하긴 어렵죠. store care는 24시간 매장을 대신 지켜보는 눈 — 공간에 직원 한 명이 더 있는 셈입니다. 빈 매대도, 바닥 오염도, 냉장고 문 열림도, 채워야 할 그 순간을 짚어드려요.',
    heroCta: 'store care 시작하기',
    heroPrice: '월 14,900원부터 · storecare.ai에서 운영돼요',
    mockupHeading: '필요한 순간만, 손안으로',
    mockupSub: '하루 1,247건 쏟아지는 알림 대신 — 정작 필요한 세 건만 골라 휴대폰으로 바로 알려드려요.',
    mockupNote: '* AI 분석 예시 화면이에요.',
    scenariosHeading: '이런 순간을, 놓치지 않아요',
    scenariosSub: '직원이 못 본 사이에도 — store care는 매대·위생·설비·보안을 한눈에 살핍니다.',
    scenarios: ['빈 매대', '냉장고 문 열림', '바닥 오염', '심야 이상 상황'],
    values: [
      { title: '24시간, 직원 한 명 더', desc: '매장을 비워도 괜찮아요. store care가 곳곳을 대신 지켜봐요.' },
      { title: '필요한 세 건만', desc: '빈 매대·바닥 오염·냉장고 문 열림·심야 이상 상황까지, 손쓸 순간만 콕 짚어 알려줘요.' },
      { title: '대응 시간이 줄어요', desc: '진열 공백 대응 45분→15분, 오염 대응 30분→8분. 빠른 대응이 매출과 경험을 지켜요.' },
    ],
    valueCta: 'storecare.ai 바로가기',
    valueNote: ['store care는 DeepingSource의 점주용 서비스로, 별도 사이트 storecare.ai에서 운영됩니다.', ''],
    otherProducts: '다른 제품 보기',
  },
  en: {
    heroTitle: 'Always the perfect store — no matter who’s on shift.',
    heroSub: 'Labor costs climb, good help is hard to find. store care is a second set of eyes on your store, 24/7 — like one more employee on the floor. Empty shelves, a dirty aisle, a fridge door left open: it catches the moment that needs you.',
    heroCta: 'Get started with store care',
    heroPrice: 'From ₩14,900/month · Operated on storecare.ai',
    mockupHeading: 'Only the moments that matter — in your hand',
    mockupSub: 'Most tools flood you with 1,247 alerts a day. store care surfaces the three that actually need you, straight to your phone.',
    mockupNote: '* Sample AI analysis screen.',
    scenariosHeading: 'It won’t miss moments like these',
    scenariosSub: 'Even when no one’s looking — store care watches shelves, hygiene, equipment, and security at once.',
    scenarios: ['Empty shelf', 'Fridge door open', 'Floor spill', 'After-hours anomaly'],
    values: [
      { title: 'One more employee, 24/7', desc: 'Leave the floor with confidence. store care keeps watch across the whole store.' },
      { title: 'Just the three that matter', desc: 'Empty shelves, a dirty aisle, an open fridge door, after-hours anomalies — it flags the moment to act, and only that.' },
      { title: 'Faster response', desc: 'Restock response 45→15 min, cleanup 30→8 min. Acting sooner protects sales and the customer experience.' },
    ],
    valueCta: 'Go to storecare.ai',
    valueNote: ['store care is DeepingSource’s service for store owners, operated on the separate site storecare.ai.', ''],
    otherProducts: 'See other products',
  },
  jp: {
    heroTitle: '誰が働いても、いつも完璧な店舗。',
    heroSub: '人件費は上がり、人手は集まりにくい時代です。store care は24時間、店舗を代わりに見守る目 — 売り場にもう一人スタッフがいるようなもの。空いた棚も、床の汚れも、冷蔵庫の扉の開けっ放しも、手を打つべきその瞬間をお知らせします。',
    heroCta: 'store care を始める',
    heroPrice: '月額14,900ウォンから · storecare.ai で運営しています',
    mockupHeading: '必要な瞬間だけ、手のひらに',
    mockupSub: '1日1,247件あふれる通知ではなく — 本当に必要な3件だけを選んで、スマートフォンへすぐにお知らせします。',
    mockupNote: '※ AI分析のサンプル画面です。',
    scenariosHeading: 'こんな瞬間を、見逃しません',
    scenariosSub: 'スタッフが見ていない間も — store care は棚・衛生・設備・防犯をひと目で見守ります。',
    scenarios: ['空いた棚', '冷蔵庫の扉開き', '床の汚れ', '深夜の異常'],
    values: [
      { title: '24時間、もう一人のスタッフ', desc: '店舗を離れても大丈夫。store care がすみずみを代わりに見守ります。' },
      { title: '必要な3件だけ', desc: '空いた棚・床の汚れ・冷蔵庫の扉開き・深夜の異常まで、手を打つべき瞬間だけを的確にお知らせします。' },
      { title: '対応時間が短くなる', desc: '陳列の空白対応は45分→15分、汚れ対応は30分→8分。早い対応が売上と体験を守ります。' },
    ],
    valueCta: 'storecare.ai へ',
    valueNote: ['store care は DeepingSource の店主向けサービスで、別サイトの storecare.ai で運営しています。', ''],
    otherProducts: '他の製品を見る',
  },
};

/** 탐지 시나리오 대표 CCTV 컷 (로케일 무관) — 라벨 순서와 1:1 대응 */
const SCENARIO_IMGS = [
  '/images/cctv/cctv-hero-shelf-empty.webp',
  '/images/cctv/cctv-hero-fridge-open.webp',
  '/images/cctv/cctv-contam-floor-spill.webp',
  '/images/cctv/cctv-intrusion-night-ir.webp',
];

export default function StoreCareView({ locale }: { locale: Locale }) {
  const t = C[locale];

  const valueIcons = [Eye, Bell, ShieldCheck];

  return (
    <>
      <JsonLd data={softwareApplication({ name: 'store care', description: t.heroSub, path: '/products/store-care', locale })} />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-16 lg:pt-40 lg:pb-20 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: 'store care', path: '/products/store-care' }]} locale={locale} tone="light" className="mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter border border-primary/10 rounded-full text-sm text-primary font-medium mb-6">
            <Store className="w-4 h-4" />
            store care · storecare.ai
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">
            {solutionTaglines.care[locale]}
          </p>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto break-keep mb-10">
            {t.heroSub}
          </p>
          <a
            href="https://storecare.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-lg"
          >
            {t.heroCta}
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </a>
          <p className="mt-4 text-sm text-gray-500">{t.heroPrice}</p>
        </div>
      </section>

      {/* ── 목업 미리보기 (실시간 알림 화면) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">
              {t.mockupHeading}
            </h2>
            <p className="text-base text-gray-500 break-keep">
              {t.mockupSub}
            </p>
          </div>
          <div className="max-w-[300px] mx-auto">
            <StoreCareMockup locale={locale} />
          </div>
          <p className="mt-6 text-center text-xs text-gray-500 break-keep">
            {t.mockupNote}
          </p>
          <div className="mx-auto max-w-md px-4 mt-12">
            <KakaoAlertMockup locale={locale} />
          </div>
        </div>
      </AnimatedSection>

      {/* ── 탐지 시나리오 (무엇을 잡아내는가) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{t.scenariosHeading}</h2>
            <p className="text-base text-gray-500 leading-relaxed break-keep">{t.scenariosSub}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {t.scenarios.map((label, i) => (
              <div key={label} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="relative aspect-[16/9] w-full bg-slate-900">
                  <Image
                    src={SCENARIO_IMGS[i]}
                    alt={label}
                    fill
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="px-4 py-3 text-sm font-bold text-gray-900 break-keep">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Value (3 cards) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {t.values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <div key={v.title} className="card flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0 mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed break-keep">{v.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://storecare.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-lg"
            >
              {t.valueCta}
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </a>
            <p className="mt-6 text-sm text-gray-500 break-keep">
              {t.valueNote[0]}{' '}
              <Link href={localeHref(locale, '/products')} className="text-primary hover:text-primary-dark transition-colors">
                {t.otherProducts}
              </Link>
            </p>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
