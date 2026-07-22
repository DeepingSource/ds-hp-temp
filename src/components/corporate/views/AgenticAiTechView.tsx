'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BrainCircuit, 
  Share2, 
  Network, 
  LineChart, 
  Layers, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Database,
  CloudRain,
  ShoppingCart,
  TrendingUp,
  Boxes,
  Compass,
  Building2,
  GitFork
} from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';

/** Copy dictionary per locale for Agentic AI Tech Page */
const COPY: Record<Locale, {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  ontologyTitle: string;
  ontologySub: string;
  transferTitle: string;
  transferSub: string;
  simTitle: string;
  simSub: string;
  flywheelTitle: string;
  flywheelSub: string;
  ctaHeading: string;
  ctaSub: string;
  ctaBtn: string;
}> = {
  ko: {
    eyebrow: 'SAAI CORE TECHNOLOGY · AGENTIC AI',
    heroTitle: '공간 데이터를 온톨로지로 연결하여, 스스로 행동하고 학습을 전파하는 Agentic AI',
    heroSub: '단순한 영상 인지를 넘어, CCTV 동선(MTMC)·POS·재고·날씨 데이터를 매장 온톨로지로 구축합니다. 단 1개 매장에서 성공한 운영 패턴이 전국 지점으로 자동 전파되는 자율형 매장 지능을 경험하세요.',
    ontologyTitle: '매장·공간·프랜차이즈 온톨로지 (Spatial Ontology)',
    ontologySub: 'CCTV 시각 동선(MTMC)과 매장 운영 데이터가 단일 지식 그래프로 연결되어 AI가 매장의 맥락을 스스로 이해합니다.',
    transferTitle: '단일 매장 학습의 프랜차이즈 전파 (Cross-Store Intelligence Transfer)',
    transferSub: '강남 1호점에서 검증된 동선 최적화와 진열 패턴이 지식화되어, 전국 50개 지점으로 실시간 전파·자동 적용됩니다.',
    simTitle: 'MTMC 동선 데이터 기반 시뮬레이션 & 미래 예측',
    simSub: '다중 카메라(MTMC)로 수집된 방문객 이동 동선 데이터를 기반으로, 진열 재배치 및 인력 전환 시의 결과를 사전에 예측합니다.',
    flywheelTitle: '데이터 연결 지수와 AI 지능의 플라이휠',
    flywheelSub: 'CCTV 동선에 POS 결제, 날씨, 재고 데이터가 추가로 연결될수록 Agentic AI의 제안 정밀도가 기하급수적으로 상승합니다.',
    ctaHeading: '우리 매장에 자율형 Agentic AI를 도입하세요',
    ctaSub: 'SAAI Agentic AI 기술이 당신의 공간을 매순간 스스로 학습하고 최적화합니다.',
    ctaBtn: '도입 문의하기',
  },
  en: {
    eyebrow: 'SAAI CORE TECHNOLOGY · AGENTIC AI',
    heroTitle: 'Connecting spatial data into ontology — Autonomous Agentic AI that propagates intelligence',
    heroSub: 'Beyond visual recognition, we construct store ontologies linking MTMC CCTV trajectories, POS, inventory, and weather. Experience autonomous intelligence where patterns learned in one store automatically propagate across the entire franchise.',
    ontologyTitle: 'Spatial & Operational Store Ontology',
    ontologySub: 'MTMC visual pathways, POS transactions, inventory, and weather unite into a single knowledge graph, enabling AI to grasp store context autonomously.',
    transferTitle: 'Cross-Store Intelligence Transfer',
    transferSub: 'Optimization patterns validated at Location A are converted into knowledge and propagated to 50+ stores in real-time.',
    simTitle: 'Simulation & Prediction via MTMC Trajectories',
    simSub: 'Simulate footfall routing and predict waiting times before physically changing product displays or staffing.',
    flywheelTitle: 'Data Connection & Intelligence Flywheel',
    flywheelSub: 'As more data streams (POS, weather, inventory) connect with MTMC tracking, Agentic AI proposals become exponentially more precise.',
    ctaHeading: 'Bring Autonomous Agentic AI to your stores',
    ctaSub: 'Let SAAI Agentic AI continuously learn and optimize your spatial environments.',
    ctaBtn: 'Talk to us',
  },
  jp: {
    eyebrow: 'SAAI CORE TECHNOLOGY · AGENTIC AI',
    heroTitle: '空間データをオントロジーで接続し、自律行動と学習伝播を実現する Agentic AI',
    heroSub: '単なる映像認識を超え、CCTV動線(MTMC)・POS・在庫・気象データを店舗オントロジーとして構築。1店舗の成功パターンが全店舗へ自動伝播する自律型店舗知能。',
    ontologyTitle: '店舗・空間・フランチャイズオントロジー',
    ontologySub: 'MTMC視覚動線と店舗運営データが単一の知識グラフで統合され、AIが店舗のコンテキストを自律理解します。',
    transferTitle: '単一店舗学習の全店伝播 (Cross-Store Intelligence Transfer)',
    transferSub: '1号店で検証された動線最適化・陳列パターンがナレッジ化され、全国50店舗へリアルタイムで自動適用されます。',
    simTitle: 'MTMC動線データに基づくシミュレーションと予測',
    simSub: 'マルチカメラ(MTMC)で取得した訪問者動線データに基づき、棚替えや要員配置の変更結果を事前シ뮬レーション。',
    flywheelTitle: 'データ接続指数とAI知能のフライホイール',
    flywheelSub: 'POS、天候、在庫データがMTMC追跡と接続されるほど、Agentic AIの提案精度が飛躍的に向上します。',
    ctaHeading: '貴社の店舗に自律型 Agentic AI を導入',
    ctaSub: 'SAAI Agentic AI が空間を継続的に学習し、最適な運用を提案します。',
    ctaBtn: '導入のご相談',
  },
};

export default function AgenticAiTechView({ locale }: { locale: Locale }) {
  const c = COPY[locale];

  // Interactive state for Ontology Simulator
  const [selectedNode, setSelectedNode] = useState<'mtmc' | 'pos' | 'inventory' | 'weather'>('mtmc');
  // Interactive state for Cross-Store Transfer
  const [activeStore, setActiveStore] = useState<number>(1);
  // Interactive state for Simulation Mode
  const [simMode, setSimMode] = useState<'current' | 'optimized'>('optimized');

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-32 pb-20 lg:pt-36 lg:pb-28">
        <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
          <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-primary/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] bg-sky-500/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#376AE2_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { name: crumb('technology', locale), path: '/technology' },
              { name: 'Agentic AI', path: '/technology/agentic-ai' },
            ]}
            locale={locale}
            tone="dark"
            className="mb-6"
          />

          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary-light mb-6 backdrop-blur-sm">
              <BrainCircuit className="w-4 h-4 text-primary-light" aria-hidden="true" />
              {c.eyebrow}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mb-6 font-display break-keep">
              <WordRise text={c.heroTitle} />
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl break-keep font-normal">
              {c.heroSub}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Core Concept 1: Spatial & Operational Ontology ── */}
      <Section variant="default" pad="default">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-primary mb-2 block">
              1. Spatial Knowledge Graph
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display mb-4">
              {c.ontologyTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 break-keep">
              {c.ontologySub}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-center">
            {/* Interactive Selector */}
            <div className="lg:col-span-5 space-y-4">
              <div
                onClick={() => setSelectedNode('mtmc')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedNode === 'mtmc'
                    ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">MTMC 동선 데이터 (Spatial AI)</h3>
                    <p className="text-xs text-gray-500 mt-0.5">다중 카메라 구역 이동, 체류 시간, 정체 구간</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setSelectedNode('pos')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedNode === 'pos'
                    ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">POS & 결제 트랜잭션</h3>
                    <p className="text-xs text-gray-500 mt-0.5">시간대별 구매 품목, 교차 구매, 고객 단가</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setSelectedNode('inventory')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedNode === 'inventory'
                    ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">실시간 재고 & 진열 위치</h3>
                    <p className="text-xs text-gray-500 mt-0.5">선반 품절, 진열 배치(Planogram), 보유 재고량</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setSelectedNode('weather')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedNode === 'weather'
                    ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600">
                    <CloudRain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">외부 환경 & 상권 변수</h3>
                    <p className="text-xs text-gray-500 mt-0.5">기상 상태, 주변 이벤트, 인근 지하철 유동인구</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ontology Visual Graph Display */}
            <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-950 p-8 text-white relative overflow-hidden shadow-2xl min-h-[420px] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-primary-light" />
                  <span className="font-mono text-xs text-slate-400">STORE ONTOLOGY ENGINE v2.4</span>
                </div>
                <span className="text-2xs font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  REALTIME SYNAPSE ACTIVE
                </span>
              </div>

              {/* Dynamic Center Concept */}
              <div className="relative my-auto py-6">
                <div className="mx-auto w-28 h-28 rounded-full border-2 border-primary/50 bg-primary/20 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_50px_rgba(55,106,226,0.4)] animate-pulse mb-8">
                  <BrainCircuit className="w-8 h-8 text-primary-light mb-1" />
                  <span className="text-2xs font-bold text-white tracking-wider">SAAI AGENTIC CORE</span>
                </div>

                {/* Node Connection Description Box */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 backdrop-blur-md">
                  {selectedNode === 'mtmc' && (
                    <div>
                      <span className="text-2xs font-mono uppercase text-primary-light block mb-1">MTMC Trajectory Linked</span>
                      <h4 className="text-base font-bold text-white mb-2">동선 & 체류 맥락 형성</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        고객이 A구역 진열대를 거쳐 B구역 음료 코너로 이동하기까지의 유도선과 평균 42초의 체류 데이터를 온톨로지에 매핑합니다.
                      </p>
                    </div>
                  )}
                  {selectedNode === 'pos' && (
                    <div>
                      <span className="text-2xs font-mono uppercase text-emerald-400 block mb-1">Transaction Ontology Linked</span>
                      <h4 className="text-base font-bold text-white mb-2">구매 전환과의 상관관계 추론</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        특정 진열대 체류 고객의 78%가 결제한 연관 상품 패턴을 인식하여 매대 배치의 전환 효율을 스스로 판단합니다.
                      </p>
                    </div>
                  )}
                  {selectedNode === 'inventory' && (
                    <div>
                      <span className="text-2xs font-mono uppercase text-amber-400 block mb-1">Inventory State Linked</span>
                      <h4 className="text-base font-bold text-white mb-2">실시간 품절 위험 감지 및 대체 진열 제안</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        재고 소진 속도와 통행 동선을 대조하여 품절 임박 상품의 전면 진열 및 발주 요청을 자율적으로 생성합니다.
                      </p>
                    </div>
                  )}
                  {selectedNode === 'weather' && (
                    <div>
                      <span className="text-2xs font-mono uppercase text-sky-400 block mb-1">External Context Linked</span>
                      <h4 className="text-base font-bold text-white mb-2">날씨 변화에 대응하는 동적 매장 가이드</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        갑작스러운 우천 시 입구 유입 고객 유도선 변화를 감지하고 우산/핫팩 매대 배치 명령을 발주서까지 연동합니다.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center text-2xs text-slate-500 font-mono pt-4 border-t border-slate-800/80">
                <span>ONTOLOGY ENTITIES: 12,480+</span>
                <span>RELATIONSHIP WEIGHT: OPTIMAL</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Core Concept 2: Cross-Store Intelligence Transfer ── */}
      <Section variant="alt" pad="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-primary mb-2 block">
                2. Cross-Store Intelligence Transfer
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display mb-5">
                {c.transferTitle}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed break-keep mb-8">
                {c.transferSub}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">개별 매장의 성공 패턴 자율 추출</h4>
                    <p className="text-xs text-gray-500 mt-0.5">매장 A에서 입구 진열 변경 후 매출이 34% 증가한 동선 패턴을 AI가 학습.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary mt-0.5">
                    <GitFork className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">유사 상권/구조 매장으로의 즉각 파생</h4>
                    <p className="text-xs text-gray-500 mt-0.5">매장 면적과 동선 구조가 유사한 B, C, D 매장에 동일 최적화 가이드 전파.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">프랜차이즈 전체 지능의 동시 상승</h4>
                    <p className="text-xs text-gray-500 mt-0.5">매장이 늘어날수록 전파 속도가 빨라지며 지점 간 격차가 최소화됩니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visualizing 1 Store to 50 Stores Transfer */}
            <div className="lg:col-span-7 rounded-3xl border border-gray-200 bg-white p-8 shadow-card relative">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">지식 전파 네트워크 시뮬레이터</h3>
                  <p className="text-xs text-gray-500">1호점 학습 결과가 다른 지점으로 전파되는 현황</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveStore(1)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      activeStore === 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    1호점 학습 생성
                  </button>
                  <button
                    onClick={() => setActiveStore(50)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      activeStore === 50 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    전국 50개 지점 전파
                  </button>
                </div>
              </div>

              {/* Transfer Nodes Graphic */}
              <div className="grid grid-cols-3 gap-4">
                {/* Node 1 */}
                <div className="col-span-3 sm:col-span-1 rounded-2xl border border-primary/30 bg-primary/5 p-5 relative">
                  <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  <div className="font-mono text-2xs text-primary font-bold mb-1">ORIGIN STORE #01</div>
                  <h4 className="font-bold text-gray-900 text-sm">강남 플래그십점</h4>
                  <p className="text-2xs text-gray-500 mt-2">입구 삼각 동선 재배치 학습 완료</p>
                  <div className="mt-4 pt-3 border-t border-primary/20 text-2xs text-primary font-bold">
                    성공지표: 매출 +34%
                  </div>
                </div>

                {/* Node 2 */}
                <div className={`col-span-3 sm:col-span-1 rounded-2xl border p-5 transition-all duration-500 ${
                  activeStore === 50
                    ? 'border-emerald-300 bg-emerald-50/50 shadow-sm'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}>
                  <div className="font-mono text-2xs text-emerald-600 font-bold mb-1">PROPAGATED STORE #12</div>
                  <h4 className="font-bold text-gray-900 text-sm">판교 아브뉴프랑점</h4>
                  <p className="text-2xs text-gray-500 mt-2">유사 레이아웃 매장에 자동 적용</p>
                  <div className="mt-4 pt-3 border-t border-emerald-200 text-2xs text-emerald-600 font-bold">
                    {activeStore === 50 ? '동선 가이드 전파 완료' : '전파 대기 중'}
                  </div>
                </div>

                {/* Node 3 */}
                <div className={`col-span-3 sm:col-span-1 rounded-2xl border p-5 transition-all duration-500 ${
                  activeStore === 50
                    ? 'border-emerald-300 bg-emerald-50/50 shadow-sm'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}>
                  <div className="font-mono text-2xs text-emerald-600 font-bold mb-1">PROPAGATED STORE #38</div>
                  <h4 className="font-bold text-gray-900 text-sm">부산 센텀시티점</h4>
                  <p className="text-2xs text-gray-500 mt-2">동선 예측 알고리즘 자동 동기화</p>
                  <div className="mt-4 pt-3 border-t border-emerald-200 text-2xs text-emerald-600 font-bold">
                    {activeStore === 50 ? '동선 가이드 전파 완료' : '전파 대기 중'}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-slate-900 p-4 text-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-primary-light" />
                  <span>전국 프랜차이즈 네트워크 지능 동기화 상태: {activeStore === 50 ? '100% 완료' : '1호점 검증 완료'}</span>
                </div>
                <span className="font-mono text-2xs text-primary-light font-bold">CROSS-STORE SYNAPSE</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Core Concept 3: MTMC Simulation & Prediction ── */}
      <Section variant="default" pad="default">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-primary mb-2 block">
              3. Spatial AI & MTMC Simulation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display mb-4">
              {c.simTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 break-keep">
              {c.simSub}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 text-white shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
              <div>
                <span className="text-2xs font-mono text-primary-light uppercase tracking-wider block mb-1">MTMC PATH SIMULATOR</span>
                <h3 className="text-xl font-bold text-white">진열 및 동선 변경 사전 시뮬레이션</h3>
              </div>
              <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
                <button
                  onClick={() => setSimMode('current')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                    simMode === 'current' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  기존 진열 배치 (Current)
                </button>
                <button
                  onClick={() => setSimMode('optimized')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                    simMode === 'optimized' ? 'bg-primary text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Agentic AI 최적화 제안 (Optimized)
                </button>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 items-center">
              {/* Simulation Canvas / Graphic View */}
              <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 border border-slate-800 relative min-h-[300px] flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-3">
                  <span>MTMC CAMERA NODES: 6 UNITS ACTIVE</span>
                  <span className="font-mono text-primary-light">SIMULATION MODE: {simMode.toUpperCase()}</span>
                </div>

                {/* Simulated Visual Pathways */}
                <div className="my-8 relative">
                  {simMode === 'current' ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
                        <span>A구역 병목 현상 발생 (평균 대기시간: 4.8분)</span>
                        <span className="font-mono font-bold">BOTTLE NECK</span>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-400 text-xs flex items-center justify-between">
                        <span>C구역 사각지대 통행량 저하 (이동 비율: 12%)</span>
                        <span className="font-mono">DEAD ZONE</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                        <span>유동 동선 분산으로 체류 시간 +38% 상승 예측</span>
                        <span className="font-mono font-bold">SMOOTH FLOW</span>
                      </div>
                      <div className="p-4 rounded-xl bg-primary/20 border border-primary/40 text-primary-light text-xs flex items-center justify-between">
                        <span>사각지대 C구역 유입율 +140% 개선 시뮬레이션 완료</span>
                        <span className="font-mono font-bold">PREDICTED SUCCESS</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-2xs text-slate-500 font-mono flex justify-between pt-3 border-t border-slate-800">
                  <span>CONFIDENCE SCORE: 96.4%</span>
                  <span>MTMC TRACKING ACCURACY: 99.1%</span>
                </div>
              </div>

              {/* Simulation Result Numbers */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
                  <span className="text-2xs font-mono text-slate-400 block mb-1">EXPECTED DWELL TIME</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">
                      {simMode === 'optimized' ? '12.4분' : '6.2분'}
                    </span>
                    <span className={`text-xs font-bold ${simMode === 'optimized' ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {simMode === 'optimized' ? '(+100% 상승 예측)' : '(기존)'}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
                  <span className="text-2xs font-mono text-slate-400 block mb-1">FORECASTED REVENUE CONVERSION</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">
                      {simMode === 'optimized' ? '+24.5%' : '0%'}
                    </span>
                    <span className={`text-xs font-bold ${simMode === 'optimized' ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {simMode === 'optimized' ? '예상 매출 증가율' : '기준치'}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
                  <span className="text-2xs font-mono text-slate-400 block mb-1">RECOMMENDED ACTION</span>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {simMode === 'optimized'
                      ? '메인 통로 진열대 높이를 15cm 낮추고 인기 상품을 C구역 전면으로 이동 시 동선 분산 극대화'
                      : '기존 배치 유지 중 — 병목 현상 개선 대기'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Core Concept 4: Data Flywheel ── */}
      <Section variant="alt" pad="default">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-primary mb-2 block">
              4. Data Connection Flywheel
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display mb-4">
              {c.flywheelTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 break-keep">
              {c.flywheelSub}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card hover:border-primary/40 transition">
              <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-2xs font-mono font-bold text-gray-400 block mb-1">STAGE 1</span>
              <h3 className="font-bold text-gray-900 text-base mb-2">CCTV 동선 전용 (MTMC)</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                방문객 통행량, 대기열, 정체 구간 등 기본적인 공간 시각 데이터 분석.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 text-2xs font-bold text-gray-500">
                제안 정밀도: 60%
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card hover:border-primary/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <span className="text-2xs font-mono font-bold text-emerald-600 block mb-1">STAGE 2</span>
              <h3 className="font-bold text-gray-900 text-base mb-2">+ POS 결제 데이터 연동</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                체류 구간과 실제 구매 품목 간의 상관관계를 파악하여 진열 배치 추천.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 text-2xs font-bold text-emerald-600">
                제안 정밀도: 80%
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card hover:border-primary/40 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                <Boxes className="w-5 h-5" />
              </div>
              <span className="text-2xs font-mono font-bold text-amber-600 block mb-1">STAGE 3</span>
              <h3 className="font-bold text-gray-900 text-base mb-2">+ 재고 & ERP 데이터 연동</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                재고 소진율과 동선을 결합하여 품절 방지 및 자동 발주 서식 생성.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 text-2xs font-bold text-amber-600">
                제안 정밀도: 92%
              </div>
            </div>

            <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6 shadow-card relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-primary text-white text-2xs font-bold px-2.5 py-0.5 rounded-bl-lg">
                MAX POWER
              </span>
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xs font-mono font-bold text-primary block mb-1">STAGE 4 (FULL ONTOLOGY)</span>
              <h3 className="font-bold text-gray-900 text-base mb-2">+ 날씨/상권 외부 데이터</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                날씨 및 주변 환경까지 통합하여 현장에 가장 완벽한 자율 액션 수행.
              </p>
              <div className="mt-4 pt-3 border-t border-primary/20 text-2xs font-bold text-primary">
                제안 정밀도: 99.4% (자율 운영)
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden bg-primary py-20 text-white text-center">
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 break-keep font-display">
              {c.ctaHeading}
            </h2>
            <p className="text-lg text-primary-lighter leading-relaxed mb-8 break-keep">
              {c.ctaSub}
            </p>
            <Link
              href={localeHref(locale, '/contact')}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-primary shadow-xl transition-all hover:bg-slate-100 hover:scale-105"
            >
              {c.ctaBtn}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
