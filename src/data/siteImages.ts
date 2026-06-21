/**
 * 사이트 이미지 레지스트리
 *
 * 이미지 교체 시 이 파일의 경로만 수정하면 됩니다.
 * CCTV 이미지는 별도 파일: src/data/cctvImages.ts
 */

// ── 업종 이미지 ──────────────────────────────────────────────────────────────

/** 업종별 히어로 목업 썸네일 (2장 세트) — IndustryHeroMockup에서 사용 */
export const industryThumbs: Record<string, [string, string]> = {
  convenience: ['/images/industries/convenience-hero-interior.webp', '/images/industries/convenience-hero-night.webp'],
  cafe:        ['/images/industries/cafe-hero-morning.webp',          '/images/industries/cafe-hero.webp'],
  unmanned:    ['/images/industries/unmanned-hero-interior.webp',     '/images/industries/unmanned-hero-night.webp'],
  drugstore:   ['/images/industries/drugstore-hero.webp',             '/images/industries/drugstore-hero-aisle.webp'],
  mart:        ['/images/industries/mart-hero.webp',                  '/images/industries/mart-hero-produce.webp'],
  exhibition:  ['/images/industries/exhibition-hero.webp',            '/images/industries/exhibition-hero-hall.webp'],
  logistics:   ['/images/industries/logistics-hero.webp',             '/images/industries/logistics-hero-rack.webp'],
  fashion:     ['/images/industries/fashion-hero.webp',              '/images/industries/fashion-hero.webp'],
};

// ── 기술 페이지 이미지 ───────────────────────────────────────────────────────

export const technologyImages = {
  anonBeforeAfter: { src: '/images/technology/tech-anon-before-after.webp', alt: '익명화 전/후 비교 — 좌: 원본 CCTV, 우: PII 제거 후' },
  mtmcTracking:    { src: '/images/technology/tech-mtmc-tracking.webp',     alt: '3대 카메라가 동일 인물의 동선을 연속 연결하는 CCTV 화면' },
  edgeDevice:      { src: '/images/technology/tech-edge-device.webp',       alt: '매장 천장에 설치된 CCTV와 엣지 AI 디바이스' },
  mtmcWide:        { src: '/images/technology/tech-mtmc-wide.webp',         alt: '편의점 전체 CCTV — 5명 고객의 동선 감지' },
} as const;

// ── 제품 페이지 이미지 ───────────────────────────────────────────────────────

export const productImages = {
  storecarePrivacy:  { src: '/images/storecare-privacy.webp',          alt: 'store care 프라이버시 보호 — AI 익명화 처리' },
  storeagentMockup:  { src: '/images/storeagent-ai-pop-mockup.webp',  alt: 'store agent AI 팝업 목업' },
} as const;
