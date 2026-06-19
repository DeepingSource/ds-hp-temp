'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import Image from 'next/image';
import { ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { springGentle } from '@/lib/spring-config';
import { useCountUp } from '@/hooks/useCountUp';
import { cctvImages } from '@/data/cctvImages';
import type { Locale } from '@/lib/i18n';

// Real retail CCTV still used for the before/after comparison (checkout scene with people).
const SCENE = cctvImages.checkout;

// Detected person/face regions as % of the frame — heavy mosaic + AI bbox on the anonymized side.
// Coords approximate the likely standing-customer positions at a checkout aisle.
const FACE_REGIONS = [
  { left: 26, top: 24, size: 17 },
  { left: 52, top: 19, size: 15 },
  { left: 72, top: 27, size: 14 },
];

// Base CCTV still — shared by both layers.
function SceneImage() {
  return (
    <Image
      src={SCENE.src}
      alt=""
      fill
      className="object-cover"
      sizes="320px"
      aria-hidden="true"
    />
  );
}

// Camera timestamp / id overlay matching the previous SVG chrome.
function CamOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-cyan-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
        2026-03-02 14:23:07
      </span>
      <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-cyan-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
        {SCENE.cam}
      </span>
    </div>
  );
}

const OriginalScene = memo(function OriginalScene() {
  return (
    <div className="absolute inset-0">
      <SceneImage />
      {/* Subtle vignette so the still reads as a monitor feed */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
      <CamOverlay />
    </div>
  );
});

const AnonymizedScene = memo(function AnonymizedScene() {
  return (
    <div className="absolute inset-0">
      {/* Whole-frame light blur baseline (privacy filter applied to the feed) */}
      <div className="absolute inset-0" style={{ filter: 'blur(1.5px)' }}>
        <SceneImage />
      </div>
      {/* Heavy mosaic blocks over detected face/person regions */}
      {FACE_REGIONS.map((r, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${r.left}%`,
            top: `${r.top}%`,
            width: `${r.size}%`,
            height: `${r.size}%`,
          }}
        >
          {/* Pixelation: the still cropped to this region, scaled down then back up so it renders as blocky mosaic */}
          <div
            className="absolute inset-0 overflow-hidden rounded-sm"
            style={{ filter: 'blur(3px) contrast(1.1)', imageRendering: 'pixelated' }}
          >
            <Image
              src={SCENE.src}
              alt=""
              fill
              className="scale-[3] object-cover"
              sizes="80px"
              aria-hidden="true"
            />
          </div>
          {/* Mosaic grid overlay for a clearly de-identified, blocky look */}
          <div
            className="absolute inset-0 rounded-sm mix-blend-overlay opacity-70"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.45) 1px, transparent 1px)',
              backgroundSize: '25% 25%',
            }}
            aria-hidden="true"
          />
          {/* AI detection bounding box + label */}
          <div className="absolute -inset-[3px] rounded-sm border border-dashed border-emerald-400/90" />
          <span className="absolute -top-3.5 left-0 font-mono text-4xs font-bold text-emerald-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            AI
          </span>
        </div>
      ))}
      {/* Faint green processing tint */}
      <div className="pointer-events-none absolute inset-0 bg-emerald-500/5" />
      <CamOverlay />
    </div>
  );
});

interface Props { active?: boolean; locale?: Locale; }

type Copy = {
  title: string; sub: string; original: string; anonymized: string;
  procTime: string; detected: string; today: string; peopleUnit: string;
  checklist: string; realtime: string; items: [string, string, string];
};

const COPY: Record<Locale, Copy> = {
  ko: {
    title: 'AI 비식별화 처리', sub: '실시간 · 온디바이스', original: '원본', anonymized: 'AI 비식별화',
    procTime: '처리 시간', detected: '감지 인원', today: '오늘 처리', peopleUnit: '명',
    checklist: '처리 항목', realtime: '실시간 처리',
    items: ['얼굴 비식별화', '차량번호 마스킹', '개인정보 보호'],
  },
  en: {
    title: 'AI anonymization', sub: 'Real-time · on-device', original: 'Original', anonymized: 'Anonymized',
    procTime: 'Process time', detected: 'Detected', today: 'Today', peopleUnit: '',
    checklist: 'Processing', realtime: 'Live',
    items: ['Face anonymization', 'Plate masking', 'PII protection'],
  },
  jp: {
    title: 'AI匿名化処理', sub: 'リアルタイム · オンデバイス', original: '原本', anonymized: 'AI匿名化',
    procTime: '処理時間', detected: '検知人数', today: '本日処理', peopleUnit: '名',
    checklist: '処理項目', realtime: 'リアルタイム',
    items: ['顔の匿名化', 'ナンバーマスキング', '個人情報保護'],
  },
};

export default function AnonymizationMockup({ active = true, locale = 'en' }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const t = COPY[locale] ?? COPY.en;
  const [sliderPct, setSliderPct] = useState(50);
  const sliderPctRef = useRef(50);
  const sliderRaf = useRef<number>(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef(true);            // false면 자동 왕복 일시정지 (사용자 조작 중/직후)
  const startRef = useRef(0);              // sin 왕복 기준 시각 (재개 시 재앵커링)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draggingRef = useRef(false);
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  const updatePct = useCallback((pct: number) => {
    const clamped = Math.min(98, Math.max(2, pct));
    sliderPctRef.current = clamped;
    setSliderPct(clamped);
  }, []);

  // 현재 위치(pct)에서 sin 위상을 역산 → 자동 왕복을 이음새 없이 재개
  const anchorAuto = useCallback((now: number) => {
    const s = Math.min(1, Math.max(-1, ((sliderPctRef.current - 15) / 70) * 2 - 1));
    const phase = Math.asin(s) + Math.PI / 2; // [0, π]
    startRef.current = now - (phase / (Math.PI * 2)) * 5000;
  }, []);

  // 자동 왕복 루프 (autoRef === true 동안만 pct 갱신). reduced-motion: 50 고정.
  useEffect(() => {
    if (!isVisible || !active || reducedMotion) return;
    anchorAuto(performance.now());
    const tick = (now: number) => {
      if (autoRef.current) {
        const p = ((now - startRef.current) % 5000) / 5000;
        updatePct(15 + 70 * (0.5 + 0.5 * Math.sin(p * Math.PI * 2 - Math.PI / 2)));
      }
      sliderRaf.current = requestAnimationFrame(tick);
    };
    sliderRaf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(sliderRaf.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isVisible, active, anchorAuto, updatePct, reducedMotion]);

  // ── 사용자 조작: 포인터 드래그 + 키보드 ──
  const pctFromClientX = useCallback((clientX: number) => {
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    updatePct(((clientX - rect.left) / rect.width) * 100);
  }, [updatePct]);

  const beginInteract = useCallback(() => {
    autoRef.current = false;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  }, []);

  const endInteract = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      anchorAuto(performance.now());
      autoRef.current = true;
    }, 2500);
  }, [anchorAuto]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    draggingRef.current = true;
    beginInteract();
    e.currentTarget.setPointerCapture(e.pointerId);
    pctFromClientX(e.clientX);
  }, [beginInteract, pctFromClientX]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    pctFromClientX(e.clientX);
  }, [pctFromClientX]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* noop */ }
    endInteract();
  }, [endInteract]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    beginInteract();
    updatePct(sliderPctRef.current + (e.key === 'ArrowRight' ? 4 : -4));
    endInteract();
  }, [beginInteract, updatePct, endInteract]);

  const processedCount = useCountUp(2847, isVisible && active, 2500);

  return (
    <div ref={containerRef}>
      <PhoneFrame>
        <PhoneScreen statusBarBg="bg-violet-950" homeBg="bg-gray-900">

          {/* Header */}
          <div className="bg-violet-950 px-5 py-3 shrink-0">
            <div className="flex items-center justify-between text-white">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-violet-300" aria-hidden="true" />
                  {t.title}
                </h3>
                <p className="text-violet-400 text-xs mt-0.5">{t.sub}</p>
              </div>
              <div className="flex items-center gap-1.5 bg-violet-800/80 px-2.5 py-1.5 rounded-lg">
                <Zap className="w-3 h-3 text-yellow-400" aria-hidden="true" />
                <span className="text-xs font-bold text-yellow-300">&lt; 0.03s</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3">
            {/* Comparison scene — 드래그/방향키로 비식별화 경계를 직접 조작 */}
            <div
              ref={sceneRef}
              role="slider"
              tabIndex={0}
              aria-label={`${t.original} / ${t.anonymized}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPct)}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onKeyDown={onKeyDown}
              className="relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700 cursor-ew-resize touch-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              style={{ aspectRatio: '4/3' }}
            >
              {/* Original layer (always visible) */}
              <div className="absolute inset-0">
                <OriginalScene />
              </div>
              {/* Anonymized layer — clipped to show right of slider */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 0 0 ${sliderPct}%)` }}
              >
                <AnonymizedScene />
              </div>
              {/* Slider divider */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                style={{ left: `${sliderPct}%` }}
                aria-hidden="true"
              >
                {/* Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-2.5 bg-gray-400 rounded-full" />
                    <div className="w-0.5 h-2.5 bg-gray-400 rounded-full" />
                  </div>
                </div>
              </div>
              {/* Side labels */}
              <div className="absolute bottom-2 left-0 flex justify-center pr-2" style={{ width: `${sliderPct}%` }}>
                <span className="text-3xs font-bold text-white/80 bg-black/50 px-1.5 py-0.5 rounded-full">{t.original}</span>
              </div>
              <div className="absolute bottom-2 right-0 flex justify-center pl-2" style={{ width: `${100 - sliderPct}%` }}>
                <span className="text-3xs font-bold text-green-300 bg-black/50 px-1.5 py-0.5 rounded-full">{t.anonymized}</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
                <p className="text-3xs text-gray-500 mb-1">{t.procTime}</p>
                <p className="text-base font-bold text-green-400 tabular-nums">&lt; 0.03s</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
                <p className="text-3xs text-gray-500 mb-1">{t.detected}</p>
                <p className="text-base font-bold text-white tabular-nums">{FACE_REGIONS.length}{t.peopleUnit}</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
                <p className="text-3xs text-gray-500 mb-1">{t.today}</p>
                <p className="text-base font-bold text-violet-400 tabular-nums">{processedCount.toLocaleString('en-US')}</p>
              </div>
            </div>

            {/* Processing checklist */}
            <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-300">{t.checklist}</span>
                <span className="flex items-center gap-1 text-3xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none" />
                  {t.realtime}
                </span>
              </div>
              <div className="space-y-2" aria-hidden="true">
                {t.items.map((label, idx) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-3xs text-gray-500 flex-1 min-w-0 truncate">{label}</span>
                    <div className="w-14 shrink-0 bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="h-full bg-emerald-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ ...springGentle, delay: idx * 0.15 + 0.5 }}
                        style={{ originX: 0 }}
                      />
                    </div>
                    <span className="text-3xs text-emerald-400 font-bold">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </PhoneScreen>
      </PhoneFrame>
    </div>
  );
}
