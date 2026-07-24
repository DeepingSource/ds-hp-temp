import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { CountUp } from '@/components/ui/CountUp';
import { AnonymizationPipeline } from '@/components/technology/AnonymizationPipeline';
import LoopVideo from '@/components/ui/LoopVideo';
import IntegratedLoopDiagram, { type IntegratedLoopCopy } from '@/components/mockups/IntegratedLoopDiagram';
import type { DeepPartial } from '@/components/mockups/types';
import {
  Fingerprint, Grid3x3, Shield, ArrowRight,
  CheckCircle2, AlertCircle, Zap, BrainCircuit,
} from 'lucide-react';
import { PRIVACY_COPY } from '@/data/mockup-scenarios/technology';
import { COMPANY } from '@/lib/company-data';
import siteContent from '@/data/generated/site-content.json';
import { localeHref, type Locale } from '@/lib/i18n';
import RelatedGlossary from '@/components/corporate/RelatedGlossary';
import DiagnosisLauncher from '@/components/corporate/diagnosis/DiagnosisLauncher';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';

type StackItem = { tag: string; title: string; desc: string };
type DemoItem = { label: string; desc: string };
type ComplianceItem = { region: string; law: string; desc: string };
type ProductItem = { name: string; desc: string };

type Copy = {
  heroBadge: string;
  heroTitleA: string;
  heroTitleB: string;
  heroSub: string;
  heroPatentsLabel: string;
  heroStackLine: string;

  problemEyebrow: string;
  problemTitle: string;
  problemSub: string;
  dilemmaNote: string;
  oldTag: string;
  oldTitle: string;
  dilemmaOld: string[];
  newTag: string;
  newTitle: string;
  dilemmaNew: string[];

  howEyebrow: string;
  howTitle: string;
  howSub: string;

  demoEyebrow: string;
  demoTitle: string;
  demoSub: string;
  demoItems: DemoItem[];
  demoCaption: string;
  demoAria: string;

  coreEyebrow: string;
  coreTitle: string;
  coreSub: string;
  stack: StackItem[];
  learnMore: string;

  complianceEyebrow: string;
  complianceTitle: string;
  complianceSub: string;
  complianceDataSpec: string;
  complianceItems: ComplianceItem[];

  patentsLabel: string;
  patentsStackLine: string;
  poweredLabel: string;
  poweredProducts: ProductItem[];

  ctaBadge: string;
  ctaTitle: string;
  ctaSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

// stack CMS는 3대 핵심 기술 축(Anonymizer · Spatial AI · Agentic AI) + 부차적 SDK(SEAL) 순서.
const stackHrefs = [
  '/technology/anonymizer',
  '/technology/spatial-ai',
  '/technology/agentic-ai',
  '/technology/seal',
];
const stackIcons = [Fingerprint, Grid3x3, BrainCircuit, Shield];
const poweredHrefs = [
  '/products/store-count',
  '/products/saai-insight',
  '/products/saai-agent',
  '/products/saai-care',
];

const CMS = siteContent.technology as unknown as Record<Locale, Copy>;

/**
 * 기술 허브 전용 루프 카피 오버라이드(② D3·§1-2) — 제품 3형제 서사 대신 기술 3축
 * (Anonymize → Spatial AI → Agentic AI) 어휘로 재구성. 기본 COPY(제품 축)는
 * SaaiView·MockupGallery가 계속 쓰므로 여기서만 mergeMockupContent로 주입한다.
 * 브랜치 3노드는 스택 갤러리 3카드와 동일 명칭·순서(Anonymize→Spatial→Agentic)를 따른다.
 */
const TECH_LOOP: Record<Locale, DeepPartial<IntegratedLoopCopy>> = {
  ko: {
    eyebrow: '기술 3축 루프',
    heading: '세 기술 축이 하나의 루프로 닫힙니다',
    lead: '입력은 먼저 익명화되고(Anonymize), 공간 좌표와 동선으로 정합되며(Spatial AI), 판단과 제안으로 이어집니다(Agentic AI). 사람의 행동 결과가 되먹임되어 루프가 닫힙니다.',
    nodes: {
      seal: { label: 'Anonymize · SEAL', tip: '축 1 — 입력 시점 익명화. 원본은 저장하지 않습니다.' },
      hub: { label: '익명 공간 데이터', tip: '세 축이 공유하는 단일 익명 이벤트 스트림.' },
      insight: { label: 'Spatial AI · 분석', tip: '축 2 — 공간 좌표·동선으로 어제의 패턴을 설명합니다.' },
      care: { label: 'Spatial AI · 감지', tip: '축 2 — 공간 신호로 지금의 이상을 알립니다.' },
      agent: { label: 'Agentic AI · 제안', tip: '축 3 — 신호를 판단해 다음 행동을 제안합니다.' },
    },
    cards: [
      { no: '01', title: '익명화가 먼저입니다', body: '모든 신호는 입력 시점에 익명화됩니다(Anonymize). 원본 없이 시작해야 규제 걱정 없이 확장됩니다.' },
      { no: '02', title: '공간 지능이 좌표를 만듭니다', body: 'Spatial AI가 흩어진 카메라 신호를 하나의 공간 좌표·동선으로 정합합니다(MTMC).' },
      { no: '03', title: '에이전트가 행동으로 잇습니다', body: 'Agentic AI가 신호를 판단해 다음 행동을 제안합니다. 결정과 책임은 끝까지 사람의 자리.' },
    ],
    cta: '이 루프가 제품이 됩니다 — SAAI 제품 보기 →',
    svgTitle: '기술 3축 신호 흐름 다이어그램',
    svgDesc: '입력(CCTV·POS·외부 컨텍스트·유입 관측)이 입력 시점 익명화(Anonymize)를 거쳐 익명 공간 데이터로 모이고, Spatial AI의 분석·감지와 Agentic AI의 제안으로 흐른 뒤 사람의 결정과 행동으로 이어지며, 그 결과가 되먹임되는 기술 루프.',
  },
  en: {
    eyebrow: 'The three-axis loop',
    heading: 'Three technology axes close into one loop',
    lead: 'Input is anonymized first (Anonymize), aligned into spatial coordinates and journeys (Spatial AI), and carried into judgment and suggestions (Agentic AI). Human actions feed back and close the loop.',
    nodes: {
      seal: { label: 'Anonymize · SEAL', tip: 'Axis 1 — anonymized at the point of capture. No raw footage is stored.' },
      hub: { label: 'Anonymized spatial data', tip: 'One anonymized event stream shared by all three axes.' },
      insight: { label: 'Spatial AI · analyze', tip: 'Axis 2 — explains yesterday’s patterns through coordinates and journeys.' },
      care: { label: 'Spatial AI · detect', tip: 'Axis 2 — flags what is happening now from spatial signals.' },
      agent: { label: 'Agentic AI · suggest', tip: 'Axis 3 — judges the signals and proposes the next action.' },
    },
    cards: [
      { no: '01', title: 'Anonymization comes first', body: 'Every signal is anonymized on capture (Anonymize). Starting without raw footage is what lets it scale without regulatory risk.' },
      { no: '02', title: 'Spatial AI builds the coordinates', body: 'Spatial AI aligns scattered camera signals into one spatial coordinate system and journey (MTMC).' },
      { no: '03', title: 'The agent turns it into action', body: 'Agentic AI judges the signals and proposes what to do next. Decisions and accountability stay with people.' },
    ],
    cta: 'This loop becomes the product — see SAAI →',
    svgTitle: 'Three-axis technology signal-flow diagram',
    svgDesc: 'Inputs (CCTV, POS, external context, footfall sensing) are anonymized on capture (Anonymize), gather as anonymized spatial data, flow through Spatial AI analysis/detection and Agentic AI suggestions into human decision and action, and feed back into the loop.',
  },
  jp: {
    eyebrow: '技術3軸ループ',
    heading: '三つの技術軸が一つのループへと閉じます',
    lead: '入力はまず匿名化され（Anonymize）、空間座標と動線に整合され（Spatial AI）、判断と提案へつながります（Agentic AI）。人の行動の結果がフィードバックされ、ループが閉じます。',
    nodes: {
      seal: { label: 'Anonymize · SEAL', tip: '軸1 — 取得時点の匿名化。原本は保存しません。' },
      hub: { label: '匿名空間データ', tip: '三つの軸が共有する単一の匿名イベントストリーム。' },
      insight: { label: 'Spatial AI · 分析', tip: '軸2 — 空間座標・動線で昨日のパターンを説明します。' },
      care: { label: 'Spatial AI · 検知', tip: '軸2 — 空間信号で今の異常を知らせます。' },
      agent: { label: 'Agentic AI · 提案', tip: '軸3 — 信号を判断し、次の行動を提案します。' },
    },
    cards: [
      { no: '01', title: '匿名化が先です', body: 'すべての信号は取得時点で匿名化されます（Anonymize）。原本なしで始めるから、規制の心配なく拡張できます。' },
      { no: '02', title: '空間知能が座標をつくります', body: 'Spatial AIが散在するカメラ信号を一つの空間座標・動線に整合します（MTMC）。' },
      { no: '03', title: 'エージェントが行動へつなぎます', body: 'Agentic AIが信号を判断し、次の行動を提案します。判断と責任は最後まで人の領域です。' },
    ],
    cta: 'このループが製品になります — SAAI製品を見る →',
    svgTitle: '技術3軸の信号フロー図',
    svgDesc: '入力（CCTV・POS・外部コンテキスト・流入観測）が取得時点の匿名化（Anonymize）を経て匿名空間データに集まり、Spatial AIの分析・検知と Agentic AIの提案へ流れ、人の判断・行動につながり、その結果がフィードバックされる技術ループです。',
  },
};


export default function TechnologyView({ locale }: { locale: Locale }) {
  const t = CMS[locale];
  const pj = PRIVACY_COPY[locale];
  const patentsBreakdown: Record<Locale, string> = {
    ko: '등록 66개 · 출원 37개',
    en: 'Registered 66 · Pending 37',
    jp: '登録66件 · 出願37件',
  };

  const stack = t.stack.map((s, i) => ({ ...s, icon: stackIcons[i], href: stackHrefs[i] }));
  const poweredProducts = t.poweredProducts.map((p, i) => ({ ...p, href: poweredHrefs[i] }));

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-24 lg:pt-36 overflow-hidden section-dark">
        <div className="absolute inset-0 bg-surface-dark" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Breadcrumb items={[{ name: crumb('technology', locale), path: '/technology' }]} locale={locale} tone="dark" className="mb-6" />
            <HeroBadge tone="dark">
              <Fingerprint className="w-3.5 h-3.5" />
              {t.heroBadge}
            </HeroBadge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-6 break-keep">
              <WordRise text={t.heroTitleA} /><br className="hidden sm:block" />
              <WordRise text={t.heroTitleB} className="text-primary-light" />
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-6 max-w-2xl break-keep">
              {t.heroSub}
            </p>
            <div className="mb-8">
              <DiagnosisLauncher variant="inline" locale={locale} className="text-primary-light hover:text-white" />
            </div>
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/15 rounded-2xl backdrop-blur-sm">
              <div className="text-center">
                <CountUp to={COMPANY.patents} className="text-4xl font-bold text-white tabular-nums" />
                <p className="text-xs text-slate-300 font-medium mt-0.5">{t.heroPatentsLabel}</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">{t.heroStackLine}</p>
                <p className="text-xs text-slate-300 mt-0.5">{patentsBreakdown[locale]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 딜레마와 해법 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.problemEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.problemTitle}</h2>
            <p className="text-lg text-gray-500 max-w-xl break-keep">
              {t.problemSub}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="p-8 bg-red-50 rounded-3xl border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-sm font-bold text-red-600 uppercase tracking-wide">{t.oldTag}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.oldTitle}</h3>
              <div className="space-y-3">
                {t.dilemmaOld.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-red-200 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-0.5 bg-red-500 rounded" />
                    </div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 bg-primary-lighter rounded-3xl border border-primary/15">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-bold text-primary uppercase tracking-wide">{t.newTag}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.newTitle}</h3>
              <div className="space-y-3">
                {t.dilemmaNew.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-8 max-w-4xl text-center text-sm sm:text-base text-gray-500 break-keep">
            {t.dilemmaNote}
          </p>

          {/* 3단계 프로세스 — 딜레마와 같은 섹션으로 압축(②1-1: Layer 1 익명화를 1~2섹션으로).
              "왜 익명화가 먼저인가"의 근거와 방법을 한 호흡으로 읽게 한다. */}
          <div className="mt-16 pt-14 border-t border-gray-100">
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.howEyebrow}</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{t.howTitle}</h3>
              <p className="text-lg text-gray-500 max-w-xl break-keep">{t.howSub}</p>
            </div>
            <AnonymizationPipeline locale={locale} />
          </div>
        </div>
      </AnimatedSection>

      {/* ── Anonymizer 데모 (Privacy by Design proof 통합) ── */}
      <AnimatedSection className="py-20 lg:py-28 section-dark bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light mb-3">{t.demoEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 break-keep">{t.demoTitle}</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6 break-keep">
              {t.demoSub}
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {t.demoItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <figure className="rounded-2xl overflow-hidden border border-white/10 bg-gray-900 shadow-card">
            <div className="overflow-x-auto">
              <LoopVideo
                mp4="/videos/anon-3panel-demo.mp4"
                poster="/images/technology/anon-3panel-poster.webp"
                ariaLabel={t.demoAria}
                className="block h-auto w-full min-w-[680px]"
              />
            </div>
            {/* PROOF BAR — 0.03s erase + no original kept (merged from the retired Privacy Journey) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 px-5 py-3.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-xs font-bold text-success tabular-nums">
                <Zap className="w-3.5 h-3.5" aria-hidden="true" />&lt; {pj.procChip}
              </span>
              <p className="text-sm font-medium text-white break-keep">{pj.heading}</p>
            </div>
            <figcaption className="px-5 py-3 text-xs text-slate-400 break-keep border-t border-white/10">{t.demoCaption}</figcaption>
          </figure>
        </div>
      </AnimatedSection>

      {/* ── 기술 스택 갤러리 (3 축: anonymizer · spatial · agentic) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.coreEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.coreTitle}</h2>
            <p className="text-lg text-gray-500 max-w-xl break-keep">{t.coreSub}</p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stack.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.tag}>
                  <Link href={s.href} className="group flex flex-col h-full p-7 bg-white rounded-2xl border border-gray-200 hover:border-primary-light hover:shadow-[0_8px_30px_rgba(55,106,226,0.08)] transition-[border-color,box-shadow]">
                    <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <p className="text-2xs font-bold uppercase tracking-wider text-gray-500 mb-1">{s.tag}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1 break-keep">{s.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {t.learnMore}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 기술 3축 루프 — 세 축을 소개한 뒤 "이 셋이 하나의 루프로 닫힌다" (②1-1 순서·1-2 D3 오버라이드) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <IntegratedLoopDiagram locale={locale} content={TECH_LOOP[locale]} />
        </div>
      </AnimatedSection>

      {/* ── 규제 준수 + 특허 + 제품 연결 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-10 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary-lighter flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">{t.complianceEyebrow}</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 break-keep">{t.complianceTitle}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-3 break-keep">
                {t.complianceSub}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 break-keep">
                {t.complianceDataSpec}
              </p>
              <div className="space-y-4">
                {t.complianceItems.map((item) => (
                  <div key={item.law} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-gray-900">{item.region}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.law}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-primary ml-auto shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-10 section-dark rounded-3xl text-center flex-1 flex flex-col justify-center">
                <p className="text-5xl sm:text-7xl font-bold mb-2 text-white">{COMPANY.patents}</p>
                <p className="text-lg font-bold mb-1 text-white">{t.patentsLabel}</p>
                <p className="text-sm text-slate-300 font-medium mb-1">{patentsBreakdown[locale]}</p>
                <p className="text-slate-400 text-sm">{t.patentsStackLine}</p>
              </div>
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-sm font-bold text-gray-500 mb-4">{t.poweredLabel}</p>
                <div className="flex flex-col gap-2">
                  {poweredProducts.map((p) => (
                    <Link key={p.name} href={p.href} className="flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors group">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full text-primary bg-primary-lighter">{p.name}</span>
                        <span className="text-sm text-gray-600">{p.desc}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-[color,transform]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <RelatedGlossary
        slugs={['computer-vision', 'anonymized-cctv', 'cctv-analytics', 'behavior-analysis', 'anomaly-detection', 'pos-data-limitations']}
        locale={locale}
      />

      {/* ── CTA ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter border border-primary/15 rounded-full text-sm text-primary font-medium mb-8">
            <Fingerprint className="w-3.5 h-3.5" />
            {t.ctaBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 break-keep">
            {t.ctaTitle}
          </h2>
          <p className="text-gray-500 text-lg mb-10 break-keep">{t.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg">{t.ctaPrimary}</Link>
            <Link href={localeHref(locale, '/products')} className="inline-flex items-center justify-center px-9 py-4 text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-[14px] hover:border-primary-light transition-colors">{t.ctaSecondary}</Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
