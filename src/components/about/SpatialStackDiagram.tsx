'use client';

import { ShieldCheck, Layers, Bot, type LucideIcon } from 'lucide-react';

/**
 * SpatialStackDiagram — About Beat 3의 3층 파운데이션 스택
 * (01 익명화 토대 → 02 공간 지능 → 03 에이전트 AI).
 *
 * ①8-3 재디자인: 층 사이 작은 화살표 배지(겹침·과소)를 제거하고, 세 층이 물리적으로
 * 맞붙어 아래가 위를 받치는 하나의 적층 블록으로 표현한다. 방향은 화살표 대신
 * 층 경계(divider) · 색 위계(토대=진한 다크 → 위=옅은 파랑) · 좌측 레벨 레일 정렬로 준다.
 * 모바일에서는 레일이 상단 스트립으로 접혀 겹치지 않는다.
 *
 * 카피는 about.yaml `method.*`가 SOT다 (AB §1-A A3). AboutView가 생성 JSON(t.method*)을
 * `copy`로 주입하고, 이 컴포넌트는 레이어 프레젠테이션(level/name/아이콘/스타일)만 소유한다.
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

type Tone = 'top' | 'mid' | 'base';

/** 렌더 순서 = 위(agentic)→토대(anonymizer). level/name/tone은 프레젠테이션 상수. */
const LAYER_PRESENTATION: {
  id: string;
  num: string;
  level: string;
  name: string;
  icon: LucideIcon;
  tone: Tone;
}[] = [
  { id: 'agentic', num: '03', level: 'TOP', name: 'Agentic AI', icon: Bot, tone: 'top' },
  { id: 'spatial', num: '02', level: 'MID', name: 'Spatial AI', icon: Layers, tone: 'mid' },
  { id: 'anonymizer', num: '01', level: 'BASE', name: 'Anonymizer', icon: ShieldCheck, tone: 'base' },
];

/** 색 위계: 토대=진한 다크(모든 것의 시작), 위로 갈수록 옅은 파랑 → 위로 받치는 관계. */
const TONE_STYLE: Record<Tone, { row: string; rail: string; num: string; level: string; title: string; desc: string; tag: string; icon: string }> = {
  top: {
    row: 'bg-gradient-to-r from-primary-lighter/50 via-white to-white',
    rail: 'bg-primary/10 text-primary',
    num: 'text-primary',
    level: 'text-primary',
    title: 'text-gray-900',
    desc: 'text-gray-600',
    tag: 'bg-primary/10 text-primary',
    icon: 'bg-white text-primary border border-primary/20',
  },
  mid: {
    row: 'bg-white',
    rail: 'bg-primary/15 text-primary',
    num: 'text-primary',
    level: 'text-primary',
    title: 'text-gray-900',
    desc: 'text-gray-600',
    tag: 'bg-gray-100 text-gray-600',
    icon: 'bg-primary/10 text-primary border border-primary/20',
  },
  base: {
    row: 'bg-slate-900',
    rail: 'bg-primary text-white',
    num: 'text-white',
    level: 'text-primary-light',
    title: 'text-white',
    desc: 'text-slate-300',
    tag: 'bg-slate-800 text-slate-300',
    icon: 'bg-primary text-white shadow-lg shadow-primary/30',
  },
};

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

      {/* 하나의 물리적 적층 블록 — 세 층이 맞붙고, 층 경계(divide)가 화살표를 대신한다.
          토대(다크)가 아래에서 위를 받치는 구조. */}
      <div className="max-w-3xl mx-auto overflow-hidden rounded-3xl border border-gray-200 shadow-xl divide-y divide-gray-200">
        {LAYER_PRESENTATION.map((layer) => {
          const step = copy.steps[layer.id];
          if (!step) return null;
          const Icon = layer.icon;
          const s = TONE_STYLE[layer.tone];

          return (
            <div
              key={layer.id}
              className={`grid grid-cols-1 sm:grid-cols-[6rem_1fr] ${s.row}`}
            >
              {/* 레벨 레일 — BASE/MID/TOP + 01/02/03 정렬(①8-3: 층 라벨 정렬).
                  모바일: 상단 가로 스트립 / sm+: 좌측 세로 컬럼 */}
              <div className={`flex sm:flex-col items-center justify-center gap-2 sm:gap-1 px-4 py-2.5 sm:py-6 ${s.rail}`}>
                <span className="font-mono text-2xl sm:text-3xl font-bold leading-none tabular-nums">{layer.num}</span>
                <span className="font-mono text-2xs font-bold uppercase tracking-[0.18em] leading-none opacity-90">
                  {layer.level}
                </span>
              </div>

              {/* 콘텐츠 */}
              <div className="flex items-start gap-4 px-6 py-6 sm:py-7">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${s.icon}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`font-mono text-2xs font-bold uppercase tracking-wider ${s.level}`}>
                      {layer.name}
                    </span>
                    <span className={`text-2xs font-semibold px-2 py-0.5 rounded-full ${s.tag}`}>
                      {step.tag}
                    </span>
                  </div>
                  <h4 className={`text-lg font-bold break-keep ${s.title}`}>{step.title}</h4>
                  <p className={`mt-1 text-xs sm:text-sm leading-relaxed break-keep ${s.desc}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
