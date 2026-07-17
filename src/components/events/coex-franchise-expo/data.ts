import {
  Filter, Users, TrendingUp, Wrench, Download, ShieldCheck,
  ImageUp, Wand2, Rocket, Zap, MessageSquare, ClipboardList, Palette,
  type LucideIcon,
} from 'lucide-react';

/**
 * COEX 프랜차이즈 창업박람회 전용 랜딩 — 콘텐츠 상수 (KR 단일 소스).
 * 날짜·부스·CTA는 MDX 프론트매터(Event)가 SoT이므로 여기 두지 않는다.
 * en/jp는 후속: 이 파일을 로케일 맵으로 감싸 확장한다(계획 §7).
 *
 * 감지 그리드·POP before는 브로슈어 추출본(미보유) 대신 리포 고해상 자산으로 대체(계획 §5).
 */

export interface FeatureCard {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface DetectionCell {
  img: string;
  alt: string;
  label: string;
  desc: string;
  /** 상태칩 라벨 + Tailwind 색 (정상=success·주의=warning·감지=error) */
  status: string;
  statusClass: string;
}

export interface FlowStep {
  icon: LucideIcon;
  title: string;
  desc?: string;
}

const IMG = '/images';

/** 섹션 1 — 히어로 */
export const hero = {
  eyebrow: '무인매장 창업부터 운영까지',
  // 'AI'만 강조
  titlePre: '',
  titleAccent: 'AI',
  titlePost: '로 더 간편하게',
  sub: '상권 분석 · 매장 관리 · POP 제작을 하나의 흐름으로',
  scrollLabel: '부스에서 보실 것',
  products: [
    { key: 'count', label: 'saai count', sub: '상권분석' },
    { key: 'care', label: 'saai care', sub: '이상 상황 알림' },
    { key: 'store', label: 'saai store', sub: 'POP메이커' },
  ],
};

/** 섹션 2 — saai count (상권분석) */
export const count = {
  eyebrow: 'saai count',
  eyebrowSub: '상권분석',
  question: '매장을 열고 싶은데, 이 자리가 괜찮은 곳일까?',
  lead: '매장을 열고 싶은 자리의 유동인구와 주요 고객층을 확인해, 매장 입지를 선정하는 데 활용할 수 있습니다.',
  features: [
    { icon: Filter, title: '유입 퍼널 분석', desc: '유동 → 입장 → 유입률까지 한 흐름으로' },
    { icon: Users, title: '성별·연령대 분석', desc: '지나가는 사람과 들어온 손님을 비교' },
    { icon: TrendingUp, title: '상권 변화 확인', desc: '시간대별 통행량과 성·연령 추이' },
    { icon: Wrench, title: '간편한 설치', desc: 'AI 박스와 모바일 설정 단 5분' },
  ] as FeatureCard[],
  download: { icon: Download, text: '분석 결과는 엑셀로 바로 내려받을 수 있습니다.' },
  privacy: {
    icon: ShieldCheck,
    text: '영상은 익명화한 상태에서만 분석하고 즉시 삭제하며, 통계 정보만 저장합니다.',
  },
};

/** 섹션 3 — saai care (이상 상황 알림) */
export const care = {
  eyebrow: 'saai care',
  eyebrowSub: '이상 상황 알림',
  question: '계속 지켜볼 수 없는데, 매장 상태는 괜찮을까?',
  lead: '매대가 비거나 바닥이 오염되고, 냉장고 온도가 오르는 등 확인이 필요한 상황을 AI가 빠르게 감지해 알려드립니다.',
  detections: [
    { img: `${IMG}/storecare-equipment-detection.webp`, alt: '냉장 설비 온도 감지 화면', label: '설비 상태', desc: '냉장 온도가 오르면 알려요', status: '정상', statusClass: 'text-success' },
    { img: `${IMG}/storecare-front-facing-display.webp`, alt: '진열대 정면 상태 감지 화면', label: '진열 상태', desc: '빈 매대를 바로 알려요', status: '주의', statusClass: 'text-warning' },
    { img: `${IMG}/storecare-contamination-detection.webp`, alt: '바닥 오염 감지 화면', label: '오염 상태', desc: '치워야 할 곳만 콕 짚어요', status: '감지', statusClass: 'text-error' },
    { img: `${IMG}/storecare-fridge-door-open.webp`, alt: '냉장고 문 열림 감지 화면', label: '문 열림 감지', desc: '냉장고·출입문 열림을 알려요', status: '주의', statusClass: 'text-warning' },
  ] as DetectionCell[],
};

/** 섹션 4 — saai store (POP메이커) */
export const store = {
  eyebrow: 'saai store',
  eyebrowSub: 'POP메이커',
  question: '할인특가 행사 중인데, 어떻게 눈에 띄게 알리지?',
  // saai.store/features/pop-maker 기준 정본 카피
  lead: '상품 이미지와 행사 내용만 입력하면, 고객 눈에 띄는 POP을 1분 안에 만들어 바로 붙일 수 있습니다.',
  beforeAfter: {
    heading: '상품이 더 잘 보이면, 판매도 더 쉬워집니다',
    sub: '고객 눈에 띄는 POP을 쉽고 빠르게 만들어, 그냥 지나칠 고객까지 멈추게 해보세요.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    // Before = 손글씨 느낌의 밋밋한 안내(CSS). After = AI가 만든 1+1 할인 POP(랜딩 전용 자산).
    beforeText: '할인특가',
    beforeSubText: '1 + 1',
    afterImg: `${IMG}/events/coex-franchise-expo-84/pop-after.webp`,
    afterAlt: 'AI가 만든 1+1 이벤트 할인 POP',
  },
  // saai.store 3스텝
  steps: [
    { icon: ImageUp, title: '상품 이미지 업로드', desc: '팔고 싶은 상품 사진 한 장' },
    { icon: Wand2, title: '행사 내용 입력', desc: '1+1 · 덤증정 · 신상 · 품절 등' },
    { icon: Palette, title: '디자인 설정', desc: '배경 스타일 · 방향 선택' },
  ] as FlowStep[],
  // 한 번에 만드는 POP 종류(saai.store)
  popTypesLabel: '한 번에 만드는 POP',
  popTypes: ['뱃지', '하이라이트', '띠지', '가격표', '광고지'],
  // POP메이커 바로 써보기 CTA (saai.store "무료로 사용하기")
  cta: {
    label: '무료로 POP 만들기',
    href: 'https://saai.store/pop?utm_source=coex-expo-84&utm_medium=event&utm_campaign=franchise2026',
  },
};

/** 섹션 5 — 현장 프로그램 */
export const program = {
  heading: '부스에서 직접 체험하세요',
  cards: [
    { icon: Zap, title: '5분 설치 체험', desc: 'AI 박스와 모바일 설정만으로 시작하는 과정을 직접 해보실 수 있습니다.' },
    { icon: Rocket, title: 'POP 1분 제작', desc: '상품을 올리고 문구·분위기를 고르면 즉석에서 POP가 완성됩니다.' },
    { icon: MessageSquare, title: '1:1 창업 상담', desc: '자리와 업종에 맞는 구성을 상담으로 함께 잡아드립니다.' },
  ] as FeatureCard[],
};

/** 섹션 6 — 방문 예약 CTA */
export const booth = {
  heading: '부스 방문을 미리 예약하시면 대기 없이 상담해 드립니다',
  icon: ClipboardList,
};
