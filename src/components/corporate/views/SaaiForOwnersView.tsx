'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  Store, 
  ShieldAlert, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Smartphone, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';

/* MM Phase 3(D12): 점주 1인칭 체험 목업 배치 — dynamic(ssr:false) + 비율 placeholder(CLS 0).
   RoiCalculatorWidget은 ProductsView와 공유 — 공용 래퍼 RoiCalculatorLazy를 그대로 import. */
import RoiCalculatorLazy from '@/components/corporate/products/RoiCalculatorLazy';

const AgentDaySimulator = dynamic(
  () => import('@/components/mockups/AgentDaySimulator'),
  {
    ssr: false,
    /* MockupViewport(phone 390×844) 자리 예약과 동일 비율 */
    loading: () => <div className="aspect-[390/844] w-full animate-pulse rounded-[2.5rem] bg-gray-100" />,
  },
);

const COPY: Record<Locale, {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  saaiStoreTitle: string;
  saaiStoreSub: string;
  saaiStoreDesc: string;
  storeCareTitle: string;
  storeCareSub: string;
  storeCareDesc: string;
  features: string[];
  demoHeading: string;
  demoSub: string;
  ctaHeading: string;
  ctaSub: string;
}> = {
  ko: {
    eyebrow: 'B2C · 소상공인·매장 사장님 전용',
    heroTitle: '복잡한 장비 없이, 사장님의 스마트폰 하나로 시작하는 SAAI 소상공인 서비스',
    heroSub: '매장 크기나 복잡한 인프라 공사 걱정 없이 — 모바일 및 카메라리스 전용 솔루션부터 지능형 보안·이상 알림까지, 사장님에게 꼭 필요한 서비스만 골라 이용하세요.',
    saaiStoreTitle: 'saai.store — 카메라리스 사장님 운영 Suite',
    saaiStoreSub: 'CCTV 공사 없이 스마트폰 앱 하나로 유동인구 감지 및 매장 운영 관리',
    saaiStoreDesc: '특허받은 모바일 신호 및 센서 기술로 매장 앞을 지나는 손님 수와 유입률을 측정하고, 오늘 해야 할 일과 발주서 생성을 도와드립니다.',
    storeCareTitle: 'storecare.ai — 사장님 전용 도난·보안·이상 알림',
    storeCareSub: '야간 무인 매장 및 소상공인을 위한 AI 실시간 보안 & 위기 대응',
    storeCareDesc: '냉장고 문 열림, 침입, 야간 이상 행동 등 매장 위협 순간을 AI가 감지하여 사장님 스마트폰으로 즉시 긴급 알림을 보냅니다.',
    features: [
      '별도 서버나 복잡한 공사 없이 10분 만에 즉시 도입',
      '사장님 전용 모바일 앱으로 언제 어디서나 매장 상태 확인',
      '월 구독 형태의 합리적인 소상공인 맞춤 가격 체계',
    ],
    demoHeading: '도입 전에, 여기서 먼저 체험해보세요',
    demoSub: '에이전트가 제안한 하루를 직접 결정해보고, ROI 계산기로 우리 매장의 도입 효과를 추정해보세요.',
    ctaHeading: '우리 매장에 딱 맞는 사장님 전용 서비스를 경험해보세요',
    ctaSub: '지금 바로 사장님 전용 서비스 사이트에서 자세한 기능과 시연을 확인하실 수 있습니다.',
  },
  en: {
    eyebrow: 'B2C OWNER SUITE · FOR STORE OWNERS',
    heroTitle: 'SAAI services built specifically for store owners — start right from your smartphone',
    heroSub: 'No complicated hardware or wiring needed. Choose lightweight mobile & camera-less solutions or intelligent security and anomaly alerts tailored for your business.',
    saaiStoreTitle: 'saai.store — Camera-less Owner Suite',
    saaiStoreSub: 'Footfall detection and store management right on your mobile phone',
    saaiStoreDesc: 'Measure passers-by and entry rates without CCTV installation. Get automated daily task guides and order sheet generation.',
    storeCareTitle: 'storecare.ai — Owner Security & Anomaly Alerts',
    storeCareSub: 'Real-time AI security & crisis response for uncrewed & small business stores',
    storeCareDesc: 'Instant alerts on your smartphone for open fridge doors, intrusion, or suspicious night activities.',
    features: [
      'Set up in 10 minutes with zero server or hardware wiring',
      'Check live store status anytime via the dedicated owner app',
      'Affordable monthly subscription tailored for small business owners',
    ],
    demoHeading: 'Try it here before you install',
    demoSub: 'Decide an agent-proposed day yourself, then estimate the impact on your store with the ROI calculator.',
    ctaHeading: 'Experience SAAI services designed for store owners',
    ctaSub: 'Visit our dedicated owner service sites to explore features and live demos.',
  },
  jp: {
    eyebrow: 'B2C OWNER SUITE · 店舗オーナー専用',
    heroTitle: '複雑な工事不要、スマホ一台で始める店舗オーナー向け SAAI サービス',
    heroSub: 'インフラ工事の心配なく — モジュール型カメラレスソリューションからAIセキュリティ・異常アラートまで、店舗オーナーに必要な機能だけを選択。',
    saaiStoreTitle: 'saai.store — カメラレス店舗運営スイート',
    saaiStoreSub: 'CCTV工事不要、スマホアプリで来店者数計測と店舗運営を管理',
    saaiStoreDesc: '特許取得のセンサー技術で通行人数と流入率を計測し、今日のタスクと発注書作成を自動化します。',
    storeCareTitle: 'storecare.ai — 店舗専用セキュリティ・異常アラート',
    storeCareSub: '無人店舗・小規模店舗のためのAIリアルタイムセキュリティ＆危機対応',
    storeCareDesc: '冷蔵庫の開けっぱなし、侵入、夜間の異常行動をAIが検치し、オーナーのスマホへ即座に緊急通知。',
    features: [
      'サーバーや工事不要、10分で即時導入可能',
      '専用アプリでいつでもどこでも店舗状態を確認',
      '小規模店舗に最適な月額サブスクリプション体系',
    ],
    demoHeading: '導入前に、ここでまず体験してください',
    demoSub: 'エージェントが提案する一日を自分で決定し、ROI計算機で店舗への導入効果を試算できます。',
    ctaHeading: '店舗オーナー専用の SAAI サービスを体験',
    ctaSub: '専用サイトで詳細な機能とデモをご確認いただけます。',
  },
};

export default function SaaiForOwnersView({ locale }: { locale: Locale }) {
  const c = COPY[locale];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-32 pb-20 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
          <div className="absolute -top-24 right-1/3 w-[36rem] h-[36rem] bg-emerald-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-primary/30 rounded-full blur-[100px]" />
        </div>

        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { name: crumb('products', locale), path: '/products' },
              { name: '사장님 전용 (B2C)', path: '/products/saai-for-owners' },
            ]}
            locale={locale}
            tone="dark"
            className="mb-6"
          />

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-6 backdrop-blur-sm">
              <SaaiSymbol className="w-3.5 h-3.5 text-emerald-300" />
              {c.eyebrow}
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-white mb-6 font-display break-keep">
              <WordRise text={c.heroTitle} />
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed break-keep font-normal">
              {c.heroSub}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Two Services Grid ── */}
      <Section variant="default" pad="default">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Service 1: saai.store */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 lg:p-10 shadow-card flex flex-col justify-between hover:border-primary/40 transition">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-primary/10 text-primary">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    Camera-less Mobile Suite
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3 break-keep">
                  {c.saaiStoreTitle}
                </h2>
                <p className="text-sm font-semibold text-primary mb-4 break-keep">
                  {c.saaiStoreSub}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 break-keep">
                  {c.saaiStoreDesc}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <a
                  href="https://saai.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-primary"
                >
                  <span>saai.store 바로가기</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Service 2: storecare.ai */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 lg:p-10 shadow-card flex flex-col justify-between hover:border-emerald-500/40 transition">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
                    AI Security & Emergency
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3 break-keep">
                  {c.storeCareTitle}
                </h2>
                <p className="text-sm font-semibold text-emerald-600 mb-4 break-keep">
                  {c.storeCareSub}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 break-keep">
                  {c.storeCareDesc}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <a
                  href="https://storecare.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-emerald-600"
                >
                  <span>storecare.ai 바로가기</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Key Benefits ── */}
      <Section variant="alt" pad="default">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep">
              왜 소상공인 사장님들이 SAAI를 선택할까요?
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {c.features.map((feat, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm mb-4">
                  0{idx + 1}
                </div>
                <p className="text-sm font-medium text-gray-800 leading-relaxed break-keep">
                  {feat}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Try-it Demos — MM Phase 3(D12): AgentDaySimulator(점주 1인칭 하루 체험) +
          RoiCalculatorWidget(ProductsView와 공유) 배치. CTA 직전 체험 슬롯. ── */}
      <Section variant="default" pad="default">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep">
              {c.demoHeading}
            </h2>
            <p className="mt-3 text-gray-600 break-keep">
              {c.demoSub}
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center max-w-5xl mx-auto">
            {/* 폭만 지정 — 크기는 MockupViewport(phone) 비율 스케일 소관(v2 계약) */}
            <div className="w-full max-w-sm mx-auto">
              <AgentDaySimulator locale={locale} />
            </div>
            <RoiCalculatorLazy locale={locale} />
          </div>
        </Container>
      </Section>

      {/* ── Bottom CTA ── */}
      <section className="bg-slate-900 py-16 text-white text-center">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 break-keep">
              {c.ctaHeading}
            </h2>
            <p className="text-slate-400 text-sm mb-8 break-keep">
              {c.ctaSub}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://saai.store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                <span>saai.store 접속</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://storecare.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-700"
              >
                <span>storecare.ai 접속</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
