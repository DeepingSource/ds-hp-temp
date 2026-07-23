'use client';

import { ShieldCheck, Layers, Bot, ArrowUp } from 'lucide-react';
import { type Locale } from '@/lib/i18n';
import { saaiPromiseLayer } from '@/lib/brand-canon';

interface SpatialStackDiagramProps {
  locale?: Locale;
  className?: string;
}

const stackCopy: Record<Locale, {
  eyebrow: string;
  heading: string;
  sub: string;
  layers: [
    { level: string; name: string; title: string; desc: string; tag: string },
    { level: string; name: string; title: string; desc: string; tag: string },
    { level: string; name: string; title: string; desc: string; tag: string },
  ];
}> = {
  ko: {
    eyebrow: '3-TIER ARCHITECTURE · 3층 구조',
    heading: '익명화 위에 공간 지능, 그 위에 에이전트 AI',
    sub: '세 개의 층이 바닥부터 탄탄하게 쌓여, 안전하고 강력한 오프라인 인텔리전스를 완성합니다.',
    layers: [
      {
        level: 'TOP LAYER · 03',
        name: 'Agentic AI',
        title: '에이전트 AI (실행)',
        desc: '오늘 현장에서 무엇을 바꿀지 짚어주고 실시간 가이드를 안내합니다 (결정은 사람).',
        tag: '자율 제안 · 행동 가이드',
      },
      {
        level: 'MID LAYER · 02',
        name: 'Spatial AI',
        title: '공간 지능 (분석)',
        desc: 'CCTV를 하나의 공간 좌표로 묶어 사람과 사물의 동선·체류·밀도를 정밀하게 읽습니다.',
        tag: '좌표 정합 · 흐름 인지',
      },
      {
        level: 'BASE LAYER · 01',
        name: 'Anonymizer',
        title: '익명화 파운데이션 (토대)',
        desc: '얼굴과 신원은 입력 시점에 원천 삭제되어 규제 리스크 없이 공간 전체를 분석합니다.',
        tag: '신원 원천 삭제 · SEAL',
      },
    ],
  },
  en: {
    eyebrow: '3-TIER ARCHITECTURE',
    heading: 'Agentic AI on Spatial AI, built on Anonymization',
    sub: 'Three layers stacked from the ground up, completing safe and powerful offline intelligence.',
    layers: [
      {
        level: 'TOP LAYER · 03',
        name: 'Agentic AI',
        title: 'Agentic AI (Act)',
        desc: 'Points to what to change on the floor with live staff guides (People decide).',
        tag: 'Proactive Advice · Staff Guide',
      },
      {
        level: 'MID LAYER · 02',
        name: 'Spatial AI',
        title: 'Spatial Intelligence (Analyze)',
        desc: 'Binds CCTVs into spatial coordinates to read traffic, dwell, and density.',
        tag: 'Coordinate Alignment · Flow Sensing',
      },
      {
        level: 'BASE LAYER · 01',
        name: 'Anonymizer',
        title: 'Anonymization Foundation (Base)',
        desc: 'Identities are erased permanently at capture — zero compliance risk across the space.',
        tag: 'Instant Erasure · SEAL',
      },
    ],
  },
  jp: {
    eyebrow: '3-TIER ARCHITECTURE · 3層構造',
    heading: '匿名化の上に空間知能、その上にエージェントAI',
    sub: '3つの層が土台から堅固に積み重なり、安全で強力なオフラインインテリジェンスを完成させます。',
    layers: [
      {
        level: 'TOP LAYER · 03',
        name: 'Agentic AI',
        title: 'エージェントAI (実行)',
        desc: '今日現場で何を改善すべきかを示し、リアルタイムガイドを案内します (決定は人)。',
        tag: '自律提案 · 行動ガイド',
      },
      {
        level: 'MID LAYER · 02',
        name: 'Spatial AI',
        title: '空間知能 (分析)',
        desc: 'CCTVをひとつの空間座標に統合し、人やモノの動線・滞在・密度を精密に読み取ります。',
        tag: '座標整合 · 流れの認識',
      },
      {
        level: 'BASE LAYER · 01',
        name: 'Anonymizer',
        title: '匿名化ファウンデーション (土台)',
        desc: '顔と身元は入力時点で消去され、規制リスクなく空間全体を分析します。',
        tag: '身元消去 · SEAL',
      },
    ],
  },
};

const layerIcons = [Bot, Layers, ShieldCheck];

export default function SpatialStackDiagram({ locale = 'ko', className }: SpatialStackDiagramProps) {
  const t = stackCopy[locale];

  return (
    <div className={className}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary mb-3">
          {t.eyebrow}
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 mb-3 break-keep">
          {t.heading}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-keep">
          {t.sub}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3 relative">
        {t.layers.map((layer, index) => {
          const Icon = layerIcons[index];
          const isBase = index === 2;
          const isTop = index === 0;

          return (
            <div key={layer.name} className="relative">
              {/* Stack layer card */}
              <div
                className={`rounded-2xl p-6 sm:p-7 border transition-shadow ${
                  isBase
                    ? 'bg-slate-900 text-white border-slate-800 shadow-xl'
                    : isTop
                      ? 'bg-gradient-to-r from-primary-lighter/40 via-white to-white border-primary/30 shadow-md'
                      : 'bg-white border-gray-200 shadow-card'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isBase
                          ? 'bg-primary text-white shadow-lg shadow-primary/30'
                          : 'bg-primary/10 text-primary border border-primary/20'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`font-mono text-2xs font-bold uppercase tracking-wider ${
                            isBase ? 'text-primary-light' : 'text-primary'
                          }`}
                        >
                          {layer.level}
                        </span>
                        <span
                          className={`text-2xs font-semibold px-2 py-0.5 rounded-full ${
                            isBase
                              ? 'bg-slate-800 text-slate-300'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {layer.tag}
                        </span>
                      </div>
                      <h4
                        className={`text-lg font-bold break-keep ${
                          isBase ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {layer.title}
                      </h4>
                      <p
                        className={`mt-1 text-xs sm:text-sm leading-relaxed break-keep ${
                          isBase ? 'text-slate-300' : 'text-gray-600'
                        }`}
                      >
                        {layer.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upward stack indicator arrow between layers */}
              {!isBase && (
                <div className="flex justify-center -my-1.5 relative z-10 pointer-events-none">
                  <div className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-primary">
                    <ArrowUp className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
