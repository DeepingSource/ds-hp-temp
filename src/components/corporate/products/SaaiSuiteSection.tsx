'use client';

import Link from 'next/link';
import { LineChart, ShieldAlert, BrainCircuit, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import { localeHref, type Locale } from '@/lib/i18n';

const COPY: Record<Locale, {
  eyebrow: string;
  headline: string;
  sub: string;
  modes: {
    key: 'insight' | 'care' | 'agent';
    code: string;
    phase: string;
    name: string;
    tagline: string;
    desc: string;
    href: string;
    features: string[];
  }[];
}> = {
  ko: {
    eyebrow: 'SAAI SUITE · 엔터프라이즈 코어 패키지',
    headline: '세 가지 모드가 하나의 루프로 도는 saai suite',
    sub: '어제의 데이터를 읽고(insight), 지금의 위협을 알리며(care), 다음 행동을 자율 제안(agent)하는 닫힌 운영 구조. 중복 없이 단 하나의 시스템으로 동작합니다.',
    modes: [
      {
        key: 'insight',
        code: '01 · ANALYZE · 어제',
        phase: '분석',
        name: 'saai insight',
        tagline: '감으로 알던 매장을, 데이터로 읽습니다.',
        desc: '매장 안 구역 체류, 동선 병목, 구매 전 이탈 구간을 교차 분석하여 POS가 놓친 구매 전 행동까지 데이터로 정밀하게 읽어냅니다.',
        href: '/products/saai-insight',
        features: ['매장 구역별 체류·전환 heat map', 'POS 매출 데이터 결합 분석', '상권 유입 vs 매장 유입 비교'],
      },
      {
        key: 'care',
        code: '02 · DETECT · 지금',
        phase: '감지',
        name: 'saai care',
        tagline: '종일 지켜보던 매장을, 필요한 순간만 봅니다.',
        desc: '결품, 오염, 냉장고 온도 이탈, 도난 및 침입 위험을 24시간 감시하고, 사람이 즉시 개입해야 할 중요한 3가지 순간만 스마트폰으로 알립니다.',
        href: '/products/saai-care',
        features: ['실시간 매대 결품 및 오염 탐지', '냉장/냉동 설비 이상 알림', '야간 이상 행동 및 손실 방지'],
      },
      {
        key: 'agent',
        code: '03 · ACT · 다음',
        phase: '실행',
        name: 'saai agent',
        tagline: '사람이 못 하던 운영을, 매일 대신합니다.',
        desc: 'POS 매출과 비전 동선 데이터를 단일 엔진으로 처리하여, 오늘 현장에서 발주·진열·인력 배치를 어떻게 바꿀지 최적의 행동 가이드를 제시합니다.',
        href: '/products/saai-agent',
        features: ['오늘의 1가지 현장 행동 가이드', '자율 발주 및 수량 자동 추정', '단일 매장 학습의 프랜차이즈 전파'],
      },
    ],
  },
  en: {
    eyebrow: 'SAAI SUITE · ENTERPRISE CORE',
    headline: 'Three modes operating in one seamless loop.',
    sub: 'Analyzing yesterday (insight), detecting live risks (care), and advising next actions (agent). One closed-loop intelligence system.',
    modes: [
      {
        key: 'insight',
        code: '01 · ANALYZE · Yesterday',
        phase: 'Analyze',
        name: 'saai insight',
        tagline: 'Turn intuition into precise floor data.',
        desc: 'Cross-analyzing zone dwell, footfall bottlenecks, and drop-off points — capturing pre-purchase behavior missed by payment logs.',
        href: '/products/saai-insight',
        features: ['Zone dwell & conversion heatmaps', 'POS sales correlation', 'Footfall capture rate analysis'],
      },
      {
        key: 'care',
        code: '02 · DETECT · Live',
        phase: 'Detect',
        name: 'saai care',
        tagline: 'Alerting only when it truly matters.',
        desc: 'Monitoring shelf stock, fridge doors, floor spills, and loss risks 24/7 — surfacing only the critical moments needing staff action.',
        href: '/products/saai-care',
        features: ['Real-time out-of-stock detection', 'Equipment & fridge alerts', 'After-hours anomaly prevention'],
      },
      {
        key: 'agent',
        code: '03 · ACT · Next',
        phase: 'Act',
        name: 'saai agent',
        tagline: 'Executing daily store decisions automatically.',
        desc: 'Combining POS and vision in one engine — providing direct daily action guides on stocking, placement, and staffing.',
        href: '/products/saai-agent',
        features: ['Single daily priority guide for staff', 'Automated stock & order estimation', 'Cross-store fleet intelligence transfer'],
      },
    ],
  },
  jp: {
    eyebrow: 'SAAI SUITE · エンタープライズコア',
    headline: '3つのモードがひとつのループで回る saai suite',
    sub: '過去を分析し(insight)、今を検지し(care)、次を提案(agent)する閉じた運用構造。重複なしの単一システム。',
    modes: [
      {
        key: 'insight',
        code: '01 · ANALYZE · 過去',
        phase: '分析',
        name: 'saai insight',
        tagline: '勘に頼っていた店舗を、データで読み解く。',
        desc: 'ゾーン滞在・動線ボトルネック・離脱ポイントを交差分析し、POSが見落とす購入前行動をデータ化。',
        href: '/products/saai-insight',
        features: ['ゾーン滞在・転換ヒートマップ', 'POS売上結合分析', '立地流入vs入店比較'],
      },
      {
        key: 'care',
        code: '02 · DETECT · 今',
        phase: '検知',
        name: 'saai care',
        tagline: '一日中見張るのではなく、必要な瞬間だけ通知。',
        desc: '欠品・汚れ・冷蔵温度・防損リスクを24時間監視し、現場の介入が必要な瞬間だけをスマートフォンへ通知。',
        href: '/products/saai-care',
        features: ['リアルタイム棚欠品・汚れ検知', '冷蔵設備異常アラート', '深夜異常行動・損失防止'],
      },
      {
        key: 'agent',
        code: '03 · ACT · 次',
        phase: '実行',
        name: 'saai agent',
        tagline: '人ができなかった運営を、毎日代行。',
        desc: 'POSとビジョンデータを単一エンジンで処理し、今日の陳列・発注・配置をどう変更すべきか自動ガイド。',
        href: '/products/saai-agent',
        features: ['今日の1つの現場行動ガイド', '自動発注・数量推定', '1店舗学習の全店波及'],
      },
    ],
  },
};

const ICONS = {
  insight: LineChart,
  care: ShieldAlert,
  agent: BrainCircuit,
};

export default function SaaiSuiteSection({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <AnimatedSection className="py-20 lg:py-28 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <SaaiSymbol className="w-3.5 h-3.5 text-primary" />
            {t.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4 font-display break-keep">
            {t.headline}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed break-keep">
            {t.sub}
          </p>
        </div>

        {/* 3 Core Suite Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {t.modes.map((mode) => {
            const Icon = ICONS[mode.key];
            return (
              <div
                key={mode.key}
                className="rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50/50 to-white p-8 flex flex-col justify-between hover:border-primary/40 hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {mode.code}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <SaaiSymbol className="w-4 h-4 text-primary" />
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight font-display">
                      {mode.name}
                    </h3>
                  </div>

                  <p className="text-sm font-semibold text-primary mb-4 break-keep">
                    {mode.tagline}
                  </p>

                  <p className="text-sm text-gray-600 leading-relaxed break-keep mb-6">
                    {mode.desc}
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-gray-100 mb-8">
                    {mode.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="break-keep">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={localeHref(locale, mode.href)}
                  className="inline-flex items-center justify-between w-full px-5 py-3 rounded-2xl bg-gray-900 text-white text-xs font-bold hover:bg-primary transition-colors"
                >
                  <span>{mode.name} 자세히 보기</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
