'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { store } from './data';

/**
 * saai POP 메이커 '생성 애니메이션' 목업 — 손 안내문(before) → 생성 중 → 완성 POP(after)를
 * 예시별로 순환 재현한다. 이미지는 실제 POP메이커 결과물(pop 폴더 → webp).
 * SVG가 아닌 HTML/이미지 모션이므로 정적 export + ssr:false에서 하이드레이션 안전.
 * reduced-motion이면 첫 예시의 완성 POP를 정적으로 노출.
 */

type Kind = 'before' | 'gen' | 'after';

const EXAMPLES = store.examples;
// 예시마다 before → gen → after 3단계. 마지막 after는 조금 길게 머문다.
const PHASES: { ex: number; kind: Kind }[] = EXAMPLES.flatMap((_, i) => [
  { ex: i, kind: 'before' as const },
  { ex: i, kind: 'gen' as const },
  { ex: i, kind: 'after' as const },
]);
const INTERVALS = EXAMPLES.flatMap(() => [1300, 1700, 2900]);

const KIND_CHIP: Record<Kind, { label: string; cls: string }> = {
  before: { label: '입력', cls: 'bg-gray-100 text-gray-500' },
  gen: { label: '생성 중', cls: 'bg-primary/10 text-primary' },
  after: { label: '완성', cls: 'bg-success/10 text-success' },
};

export default function PopMakerMockup({ active = true }: { active?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ once: false, threshold: 0.2 });
  const { step } = useMockupLoop({
    steps: PHASES.length,
    intervals: INTERVALS,
    active: active && isVisible,
  });

  const cur = reduced ? { ex: 0, kind: 'after' as Kind } : PHASES[step];
  const ex = EXAMPLES[cur.ex];
  const kind = cur.kind;
  const showAfter = kind === 'after';
  const genMs = INTERVALS[cur.ex * 3 + 1];

  return (
    <div ref={ref} className="w-full max-w-[420px] mx-auto">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
        {/* 앱 헤더 */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100">
          <Image src="/images/saai-symbol.svg" alt="" width={18} height={18} aria-hidden="true" />
          <span className="text-sm font-bold text-gray-900">saai POP 메이커</span>
          <span className={`ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-2xs font-bold ${KIND_CHIP[kind].cls}`}>
            {kind === 'gen' && <Sparkles className="w-3 h-3" aria-hidden="true" />}
            {kind === 'after' && <Check className="w-3 h-3" aria-hidden="true" />}
            {KIND_CHIP[kind].label}
          </span>
        </div>

        {/* 캔버스 — 다크 아트보드, object-contain으로 POP 전체 노출 */}
        <div className="relative aspect-[4/3] bg-gray-950 overflow-hidden">
          {/* before (손 안내문) — key로 예시 경계에서 노드를 새로 마운트해 다음 예시 완성본의
              스포일러 페이드아웃을 차단. 예시 내부(before→gen→after)는 key 불변 → 리빌 크로스페이드 유지. */}
          <Image
            key={`${cur.ex}-before`}
            src={ex.before}
            alt={showAfter ? '' : ex.beforeAlt}
            aria-hidden={showAfter}
            fill
            sizes="(max-width: 640px) 90vw, 420px"
            className={`object-contain transition-opacity duration-500 ${showAfter ? 'opacity-0' : 'opacity-100'}`}
          />
          {/* after (완성 POP) */}
          <Image
            key={`${cur.ex}-after`}
            src={ex.after}
            alt={showAfter ? ex.afterAlt : ''}
            aria-hidden={!showAfter}
            fill
            sizes="(max-width: 640px) 90vw, 420px"
            className={`object-contain transition-opacity duration-500 ${showAfter ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* 생성 중 오버레이 — 스캔 스윕 + 딤 + 라벨 */}
          {kind === 'gen' && !reduced && (
            <>
              <div className="absolute inset-0 bg-gray-950/35" aria-hidden="true" />
              <motion.div
                className="absolute inset-x-0 h-20 bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0"
                initial={{ y: '-30%' }}
                animate={{ y: '130%' }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  saai가 POP를 만드는 중
                  <Dots />
                </span>
              </div>
            </>
          )}

          {/* 완성 배지 */}
          {showAfter && !reduced && (
            <motion.span
              key={`${cur.ex}-done`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-2xs font-bold text-white shadow-md"
            >
              <Check className="w-3 h-3" aria-hidden="true" />
              1분 완성
            </motion.span>
          )}

          {/* 하단 태그 pill */}
          <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-2xs font-semibold text-white backdrop-blur-sm">
            {ex.tag}
          </span>
        </div>

        {/* 푸터 — 단계별 진행/캡션 */}
        <div className="px-4 py-3 min-h-[3.25rem] flex items-center">
          {kind === 'gen' && !reduced ? (
            <div className="w-full">
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <motion.div
                  key={`${cur.ex}-bar`}
                  className="h-full rounded-full bg-primary"
                  initial={{ width: '4%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: genMs / 1000, ease: 'easeInOut' }}
                />
              </div>
              <p className="mt-1.5 text-2xs text-gray-400">배경·문구·색을 자동으로 맞추는 중…</p>
            </div>
          ) : showAfter ? (
            <p className="text-sm font-semibold text-gray-900 break-keep">
              <span className="text-success">✓</span> {ex.caption}
            </p>
          ) : (
            <p className="text-sm text-gray-500 break-keep">손으로 붙여둔 안내문을 그대로 올리면 돼요.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/** 생성 중 … 점 3개 애니메이션 */
function Dots() {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1 h-1 rounded-full bg-white"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}
