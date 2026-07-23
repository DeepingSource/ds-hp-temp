'use client';

import { ShieldCheck, Layers, Bot, ArrowUp, type LucideIcon } from 'lucide-react';

/**
 * SpatialStackDiagram — About Beat 3의 3층 수직 스택(01 익명화 → 02 공간지능 → 03 에이전트AI).
 *
 * 카피는 about.yaml `method.*`가 SOT다 (AB §1-A A3: 유령 CMS 필드 역전 — Keystatic에서
 * 고치면 화면이 바뀌어야 한다). AboutView가 생성 JSON(t.method*)을 `copy`로 주입하고,
 * 이 컴포넌트는 레이어 프레젠테이션(level/name/아이콘/스타일)만 소유한다.
 * steps는 id(anonymizer/spatial/agentic) 기준 매핑이라 yaml 순서(토대→위)와
 * 렌더 순서(위→토대)가 달라도 안전하다.
 */

export interface SpatialStackCopy {
  eyebrow: string;
  heading: string;
  sub: string;
  /** id(anonymizer/spatial/agentic) 키 — 생성 JSON(methodSteps)의 shape 그대로 */
  steps: Record<string, { title: string; desc: string; tag: string }>;
}

interface SpatialStackDiagramProps {
  copy: SpatialStackCopy;
  className?: string;
}

/** 렌더 순서 = 위(agentic)→토대(anonymizer). level/name은 프레젠테이션 상수. */
const LAYER_PRESENTATION: { id: string; level: string; name: string; icon: LucideIcon }[] = [
  { id: 'agentic', level: 'TOP LAYER · 03', name: 'Agentic AI', icon: Bot },
  { id: 'spatial', level: 'MID LAYER · 02', name: 'Spatial AI', icon: Layers },
  { id: 'anonymizer', level: 'BASE LAYER · 01', name: 'Anonymizer', icon: ShieldCheck },
];

export default function SpatialStackDiagram({ copy, className }: SpatialStackDiagramProps) {
  return (
    <div className={className}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary mb-3">
          {copy.eyebrow}
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 mb-3 break-keep">
          {copy.heading}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-keep">
          {copy.sub}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3 relative">
        {LAYER_PRESENTATION.map((layer, index) => {
          const step = copy.steps[layer.id];
          if (!step) return null;
          const Icon = layer.icon;
          const isBase = index === 2;
          const isTop = index === 0;

          return (
            <div key={layer.id} className="relative">
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
                          {step.tag}
                        </span>
                      </div>
                      <h4
                        className={`text-lg font-bold break-keep ${
                          isBase ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p
                        className={`mt-1 text-xs sm:text-sm leading-relaxed break-keep ${
                          isBase ? 'text-slate-300' : 'text-gray-600'
                        }`}
                      >
                        {step.desc}
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
