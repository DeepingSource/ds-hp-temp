'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import PhoneFrame from './PhoneFrame';
import TabletFrame from './TabletFrame';
import MacBookFrame from './MacBookFrame';

/**
 * MockupViewport — 목업 크기 계약 (MOCKUP_MASTER_PLAN_v1 §2-B).
 *
 * 문제의 본질은 "목업이 유동 폭에 리플로우" — 페이지마다 컨테이너 폭이 다르면
 * 내부 줄바꿈·오버플로·잘림이 제각각이었다(실증: HqRollup 랭킹 배지 잘림 A8).
 * 해결은 고정 설계 캔버스 + 비율 스케일:
 *
 *   <MockupViewport design="phone">   ← 390×844 고정 캔버스
 *     <StoreCareMockup … />           ← 내부는 항상 390px 기준으로만 설계
 *   </MockupViewport>
 *
 * - 표준 캔버스 3종: phone 390×844 · desktop 1280×800 · card 480×가변.
 * - 컨테이너 폭 → transform: scale(w/390). 내부 줄바꿈은 어떤 페이지에서도 불변.
 * - 고정비 캔버스는 aspect-ratio로 자리를 예약해 CLS 0 (SSR/JS 이전에도 성립).
 * - 루트에 `.saai-scope`를 부여 — 목업 내부는 `bg-(--saai-bg-app)` 식으로
 *   SAAI DS 변수(saai-tokens.gen.css)를 소비한다 (§2-A · D1 경계).
 * - 호출부는 "폭"만 지정한다(className/부모 컨테이너). 높이·비율 지정 금지.
 * - 스케일은 transform이라 스크린리더에는 원문 그대로 노출된다.
 * - 목업 내부 루프의 reduced-motion 정지는 각 목업의 기존 가드(usePrefersReducedMotion
 *   ·useMockupLoop) 소관 — Viewport는 크기 계약만 담당한다.
 */

type DesignCanvas = 'phone' | 'desktop' | 'card';
type FrameKind = 'none' | 'phone' | 'tablet' | 'macbook';

const CANVAS: Record<DesignCanvas, { w: number; h: number | null }> = {
  phone: { w: 390, h: 844 },
  desktop: { w: 1280, h: 800 },
  card: { w: 480, h: null }, // 높이 가변 — 콘텐츠가 결정
};

interface MockupViewportProps {
  design?: DesignCanvas;
  /** 캔버스를 디바이스 프레임으로 감쌀 때. 목업이 자체 프레임(PhoneFrame 등)을
   *  이미 포함하면 'none'(기본) — 프레임은 어느 쪽이든 Viewport "안쪽"에 있다. */
  frame?: FrameKind;
  /** 극좁 컨테이너 가독성 하한 (§7 리스크: <280px). 기본 0.4 */
  minScale?: number;
  /** 원본 초과 확대 상한 — 기본 1 (키우면 텍스트가 흐려진다) */
  maxScale?: number;
  className?: string;
  children: ReactNode;
}

export default function MockupViewport({
  design = 'phone',
  frame = 'none',
  minScale = 0.4,
  maxScale = 1,
  className = '',
  children,
}: MockupViewportProps) {
  const canvas = CANVAS[design];
  const outerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  // card(가변 높이) 캔버스만 콘텐츠 높이를 측정해 자리를 잡는다
  const [contentH, setContentH] = useState<number | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const measure = () => {
      const w = outer.clientWidth;
      if (w > 0) {
        setScale(Math.min(maxScale, Math.max(minScale, w / canvas.w)));
      }
      if (canvas.h == null && contentRef.current) {
        setContentH(contentRef.current.offsetHeight);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    if (canvas.h == null && contentRef.current) ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [canvas.w, canvas.h, minScale, maxScale]);

  const framed =
    frame === 'phone' ? (
      <PhoneFrame>{children}</PhoneFrame>
    ) : frame === 'tablet' ? (
      <TabletFrame>{children}</TabletFrame>
    ) : frame === 'macbook' ? (
      <MacBookFrame>{children}</MacBookFrame>
    ) : (
      children
    );

  return (
    <div ref={outerRef} className={`relative w-full ${className}`}>
      {/* 자리 예약 — 고정비 캔버스는 aspect-ratio(CLS 0), card는 측정 높이 × scale.
          maxWidth 캡: scale이 maxScale로 캡될 때 예약 박스도 함께 캡해야
          컨테이너가 캔버스보다 넓을 때 하단·우측 여백이 생기지 않는다. */}
      <div
        style={
          canvas.h != null
            ? { aspectRatio: `${canvas.w} / ${canvas.h}`, maxWidth: canvas.w * maxScale }
            : contentH != null
              ? { height: contentH * scale, maxWidth: canvas.w * maxScale }
              : { maxWidth: canvas.w * maxScale }
        }
        className={`mx-auto ${canvas.h == null && contentH == null ? '' : 'overflow-hidden'}`}
      >
        <div
          ref={contentRef}
          className="saai-scope origin-top-left"
          style={{ width: canvas.w, transform: `scale(${scale})` }}
        >
          {framed}
        </div>
      </div>
    </div>
  );
}
