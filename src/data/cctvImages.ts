/**
 * CCTV 이미지 레지스트리
 *
 * 모든 CCTV 이미지 경로와 메타데이터를 중앙 관리합니다.
 * 이미지를 추가하거나 경로가 바뀌면 이 파일만 수정하면 됩니다.
 *
 * 사용법:
 *   import { cctvImages } from '@/data/cctvImages';
 *   <Image src={cctvImages.heroShelfEmpty.src} alt={cctvImages.heroShelfEmpty.alt} ... />
 */

export interface CctvImage {
  /** /images/cctv/*.webp 경로 */
  src: string;
  /** next/image alt 텍스트 (접근성) */
  alt: string;
  /** 짧은 한국어 라벨 (UI 표시용) */
  label: string;
  /** CCTV 카메라 번호 표시 (예: 'CAM 01') */
  cam: string;
  /** CCTV 하단 구역 설명 (모니터 UI용) */
  desc: string;
}

// ─── 이미지 레지스트리 ────────────────────────────────────────────────────────

export const cctvImages = {

  // ── Hero (주요 감지 데모용 4장) ───────────────────────────────────────────
  heroShelfEmpty: {
    src: '/images/cctv/cctv-hero-shelf-empty.webp',
    alt: '진열대 결품 감지 — EMPTY SHELF DETECTED',
    label: '진열 결품',
    cam: 'CAM 05',
    desc: '결품 감지',
  },
  heroFridgeOpen: {
    src: '/images/cctv/cctv-hero-fridge-open.webp',
    alt: '냉장고 문 열림 감지 — DOOR OPEN 4min',
    label: '냉장고 문열림',
    cam: 'CAM 02',
    desc: '냉장고 문 열림',
  },
  heroCvsTopdown: {
    src: '/images/cctv/cctv-hero-cvs-topdown.webp',
    alt: '편의점 전체 조감 CCTV 화면',
    label: '편의점 전체',
    cam: 'CAM 01',
    desc: '편의점 전체',
  },
  heroCafeDetection: {
    src: '/images/cctv/cctv-hero-cafe-detection.webp',
    alt: '카페 홀 AI 감지 오버레이',
    label: '카페 감지',
    cam: 'CAM 02',
    desc: '카페 홀',
  },

  // ── 카페 ─────────────────────────────────────────────────────────────────
  cafeHall: {
    src: '/images/cctv/cctv-cafe-hall.webp',
    alt: '카페 홀 테이블 잔여물 감지',
    label: '카페 홀',
    cam: 'CAM 03',
    desc: '카페 홀 오염',
  },
  cafeCounter: {
    src: '/images/cctv/cctv-cafe-counter.webp',
    alt: '카페 카운터 모니터링',
    label: '카페 카운터',
    cam: 'CAM 04',
    desc: '카운터',
  },

  // ── 편의점 ───────────────────────────────────────────────────────────────
  cvsEntrance: {
    src: '/images/cctv/cctv-cvs-entrance.webp',
    alt: '편의점 입구 청결 모니터링',
    label: '편의점 입구',
    cam: 'CAM 01',
    desc: '입구 청결 점검',
  },
  cvsFridge: {
    src: '/images/cctv/cctv-cvs-fridge.webp',
    alt: '편의점 냉장고 벽 진열 모니터링',
    label: '냉장고 벽',
    cam: 'CAM 08',
    desc: '냉장고 벽 점검',
  },

  // ── 소매 ─────────────────────────────────────────────────────────────────
  fashionFloor: {
    src: '/images/cctv/cctv-fashion-floor.webp',
    alt: '패션 매장 전체 진열 모니터링',
    label: '패션 매장',
    cam: 'CAM 06',
    desc: '패션 매장',
  },
  checkout: {
    src: '/images/cctv/cctv-checkout.webp',
    alt: '계산대 구역 모니터링',
    label: '계산대',
    cam: 'CAM 13',
    desc: '계산대',
  },
  martCheckout: {
    src: '/images/cctv/cctv-mart-checkout.webp',
    alt: '마트 셀프 계산대 모니터링',
    label: '셀프 계산대',
    cam: 'CAM 15',
    desc: '셀프 계산대',
  },
  drugstoreAisle: {
    src: '/images/cctv/cctv-drugstore-aisle.webp',
    alt: '드럭스토어 진열 상태 모니터링',
    label: '드럭스토어',
    cam: 'CAM 09',
    desc: '드럭스토어 진열',
  },
  supermarketProduce: {
    src: '/images/cctv/cctv-supermarket-produce.webp',
    alt: '슈퍼마켓 신선 채소 진열 모니터링',
    label: '슈퍼마켓 채소',
    cam: 'CAM 10',
    desc: '신선식품 진열',
  },
  bakeryShowcase: {
    src: '/images/cctv/cctv-bakery-showcase.webp',
    alt: '베이커리 쇼케이스 진열 모니터링',
    label: '베이커리',
    cam: 'CAM 11',
    desc: '베이커리 진열',
  },
  restaurantKitchen: {
    src: '/images/cctv/cctv-restaurant-kitchen.webp',
    alt: '음식점 주방 위생 모니터링',
    label: '음식점 주방',
    cam: 'CAM 12',
    desc: '주방 위생',
  },

  // ── 무인 / 야간 ───────────────────────────────────────────────────────────
  unmannedNight: {
    src: '/images/cctv/cctv-unmanned-night.webp',
    alt: '무인매장 야간 비정상 체류 감지 (IR)',
    label: '무인매장 야간',
    cam: 'CAM 07',
    desc: '야간 IR 감지',
  },
  parkingGate: {
    src: '/images/cctv/cctv-parking-gate.webp',
    alt: '주차장 입구 야간 이상 감지',
    label: '주차장 입구',
    cam: 'CAM 14',
    desc: '주차장 야간',
  },

  // ── 창고 / 물류 ───────────────────────────────────────────────────────────
  warehouseAisle: {
    src: '/images/cctv/cctv-warehouse-aisle.webp',
    alt: '창고 통로 재고 이동 모니터링',
    label: '창고 통로',
    cam: 'CAM 16',
    desc: '창고 통로',
  },
  warehouseLoading: {
    src: '/images/cctv/cctv-warehouse-loading.webp',
    alt: '창고 하역 도크 모니터링',
    label: '창고 도크',
    cam: 'CAM 17',
    desc: '창고 도크',
  },

  // ── 시설 / 공용 ───────────────────────────────────────────────────────────
  mallCorridor: {
    src: '/images/cctv/cctv-mall-corridor.webp',
    alt: '쇼핑몰 통로 보안 및 동선 모니터링',
    label: '쇼핑몰 통로',
    cam: 'CAM 18',
    desc: '쇼핑몰 통로',
  },

  // ── 시간대별 씬 (동일 편의점 4개 시점) ──────────────────────────────────────
  sceneMorning: {
    src: '/images/cctv/cctv-scene-0630-morning.webp',
    alt: '편의점 06:30 개점 전 청소·입고 준비 CCTV',
    label: '개점 준비',
    cam: 'CAM 01',
    desc: '06:30 개점 준비',
  },
  sceneNoon: {
    src: '/images/cctv/cctv-scene-1215-noon.webp',
    alt: '편의점 12:15 점심 피크타임 CCTV',
    label: '점심 피크',
    cam: 'CAM 01',
    desc: '12:15 점심 피크',
  },
  sceneEvening: {
    src: '/images/cctv/cctv-scene-2210-evening.webp',
    alt: '편의점 22:10 마감 직후 정리 CCTV',
    label: '마감 정리',
    cam: 'CAM 01',
    desc: '22:10 마감 정리',
  },
  sceneNightIr: {
    src: '/images/cctv/cctv-scene-0300-night-ir.webp',
    alt: '편의점 03:00 심야 IR 나이트비전 CCTV',
    label: '심야 IR',
    cam: 'CAM 01',
    desc: '03:00 심야 IR',
  },

  // ── 진열 감지 사례 ───────────────────────────────────────────────────────────
  displayFrontFacing: {
    src: '/images/storecare-front-facing-display.webp',
    alt: '전면 진열 감지 — 상품 전면 배치 확인',
    label: '전면 진열',
    cam: 'CAM 05',
    desc: '전면 진열 감지',
  },
  displayFrontFacing2: {
    src: '/images/storecare-front-facing-display-2.webp',
    alt: '전면 진열 감지 2 — 전면 배치 상태 점검',
    label: '전면 진열2',
    cam: 'CAM 06',
    desc: '전면 진열 감지',
  },
  displayDetection2: {
    src: '/images/storecare-display-detection-2.webp',
    alt: '진열 이상 감지 2 — 진열 상태 불량 마킹',
    label: '진열 이상2',
    cam: 'CAM 07',
    desc: '진열 이상 감지',
  },
  displayShelfRotated: {
    src: '/images/cctv/cctv-display-shelf-rotated.webp',
    alt: '진열대 상품 방향 불량 — 고객이 집었다 내려놓은 후 뒤집어진 상품',
    label: '진열 불량',
    cam: 'CAM 03',
    desc: '상품 방향 불량',
  },
  displayShelfEmptyWide: {
    src: '/images/cctv/cctv-display-shelf-empty-wide.webp',
    alt: '진열대 하단 결품 구역 — 2행 6열 공석 감지',
    label: '결품 구역',
    cam: 'CAM 05',
    desc: '결품 구역 감지',
  },
  displayPriceLabelMissing: {
    src: '/images/cctv/cctv-display-price-label-missing.webp',
    alt: '가격표 누락 감지 — 3개 상품 가격 라벨 없음',
    label: '가격표 누락',
    cam: 'CAM 06',
    desc: '가격표 미부착',
  },
  displayFashionFolding: {
    src: '/images/cctv/cctv-display-fashion-folding.webp',
    alt: '패션 매장 폴딩 불량 — 의류 진열 흐트러짐',
    label: '폴딩 불량',
    cam: 'CAM 08',
    desc: '의류 진열 불량',
  },

  // ── 설비 이상 감지 사례 ───────────────────────────────────────────────────────
  equipFridgeDoorOpen: {
    src: '/images/storecare-fridge-door-open.webp',
    alt: '냉장고 문 열림 — 냉기 유출 감지',
    label: '냉장고 문열림',
    cam: 'CAM 02',
    desc: '냉장고 문 열림',
  },
  equipDetection: {
    src: '/images/storecare-equipment-detection.webp',
    alt: '설비 이상 감지 — AI 오버레이 이상 마킹',
    label: '설비 이상',
    cam: 'CAM 03',
    desc: '설비 이상 감지',
  },
  equipFridgeFrost: {
    src: '/images/cctv/cctv-equip-fridge-frost.webp',
    alt: '냉장고 유리문 결빙 — 내부 온도 이상',
    label: '냉장고 결빙',
    cam: 'CAM 04',
    desc: '냉장고 결빙',
  },
  equipLightOff: {
    src: '/images/cctv/cctv-equip-light-off.webp',
    alt: '조명 2등 소등 — 매대 어두운 구역 발생',
    label: '조명 소등',
    cam: 'CAM 09',
    desc: '조명 이상',
  },
  equipAirconLeak: {
    src: '/images/cctv/cctv-equip-aircon-leak.webp',
    alt: '에어컨 결로 — 천장 누수 발생',
    label: '에어컨 결로',
    cam: 'CAM 11',
    desc: '에어컨 누수',
  },

  // ── 오염 감지 사례 ───────────────────────────────────────────────────────────
  contamCafeTable: {
    src: '/images/cctv/cctv-contam-cafe-table.webp',
    alt: '카페 테이블 잔여물 오염 감지 CCTV',
    label: '카페 테이블',
    cam: 'CAM 03',
    desc: '테이블 오염',
  },
  contamDirtyTable2: {
    src: '/images/storecare-dirty-table-2.webp',
    alt: '테이블 잔여물 오염 감지 — 미청소 상태 2',
    label: '테이블 오염2',
    cam: 'CAM 03',
    desc: '테이블 오염',
  },
  contamDetection: {
    src: '/images/storecare-contamination-detection.webp',
    alt: '오염 감지 AI 오버레이 — 구역별 오염 마킹',
    label: '오염 감지',
    cam: 'CAM 04',
    desc: '오염 감지',
  },
  contamFloorSpill: {
    src: '/images/cctv/cctv-contam-floor-spill.webp',
    alt: '통로 바닥 액체 유출 오염 감지 CCTV',
    label: '바닥 유출',
    cam: 'CAM 05',
    desc: '바닥 오염',
  },
  contamTrashOverflow: {
    src: '/images/cctv/cctv-contam-trash-overflow.webp',
    alt: '쓰레기통 오버플로우 감지 CCTV',
    label: '쓰레기통',
    cam: 'CAM 06',
    desc: '쓰레기통 과적',
  },
  contamKitchen: {
    src: '/images/cctv/cctv-contam-kitchen.webp',
    alt: '주방 조리대 오염 감지 CCTV',
    label: '주방 오염',
    cam: 'CAM 12',
    desc: '주방 오염',
  },
  contamGlassDoor: {
    src: '/images/cctv/cctv-contam-glass-door.webp',
    alt: '매장 전면 유리문 오염 감지 CCTV',
    label: '유리문 오염',
    cam: 'CAM 01',
    desc: '유리문 오염',
  },

  // ── 비정상 체류 감지 사례 ─────────────────────────────────────────────────────
  intrusionCounterEmpty: {
    src: '/images/cctv/cctv-intrusion-counter-empty.webp',
    alt: '카운터 무인 방치 감지 CCTV',
    label: '카운터 부재',
    cam: 'CAM 02',
    desc: '카운터 부재',
  },
  intrusionUnmannedDawn: {
    src: '/images/cctv/cctv-intrusion-unmanned-dawn.webp',
    alt: '새벽 무인 카운터 방치 감지 CCTV',
    label: '새벽 무인',
    cam: 'CAM 01',
    desc: '새벽 무인 카운터',
  },
  intrusionNightIr: {
    src: '/images/cctv/cctv-intrusion-night-ir.webp',
    alt: '야간 침입 IR 나이트비전 감지 CCTV',
    label: '야간 침입',
    cam: 'CAM 07',
    desc: '야간 침입 IR',
  },
  intrusionFittingRoom: {
    src: '/images/cctv/cctv-intrusion-fitting-room.webp',
    alt: '피팅룸 장시간 점유 감지 CCTV',
    label: '피팅룸 점유',
    cam: 'CAM 09',
    desc: '피팅룸 장시간',
  },
  intrusionWarehouse: {
    src: '/images/cctv/cctv-intrusion-warehouse.webp',
    alt: '창고 위험구역 무단 접근 감지 CCTV',
    label: '창고 무단접근',
    cam: 'CAM 16',
    desc: '창고 위험구역',
  },

} as const satisfies Record<string, CctvImage>;

export type CctvImageKey = keyof typeof cctvImages;
