export type PlanTier = 'free' | 'standard' | 'premium' | 'enterprise';

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: PlanTier;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  targetUser?: string;
  features: PlanFeature[];
  cta: string;
  ctaLink: string;
  popular?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: '기본형',
    price: '무료',
    description: '매일 아침 브리핑으로 시작하기',
    targetUser: '매장 운영 인사이트가 필요한 점주님',
    features: [
      { text: '매일 모닝 브리핑', included: true },
      { text: '날씨/이벤트 알림', included: true },
      { text: '운영 체크리스트', included: true },
      { text: '주간 뉴스레터', included: true },
      { text: 'POS 연동 분석', included: false },
      { text: '대화형 AI 채팅', included: false },
    ],
    cta: '무료로 시작하기',
    ctaLink: '/contact?plan=free',
  },
  {
    id: 'standard',
    name: 'POS 연동',
    price: '15,000원',
    priceNote: '/월',
    description: 'POS 데이터 기반 리포트 수신',
    targetUser: '데이터 기반 매출 분석이 필요한 점주님',
    features: [
      { text: '기본형 모든 기능', included: true },
      { text: 'POS 매출 연동', included: true },
      { text: '매출 예측 리포트', included: true },
      { text: '경쟁점 동향 분석', included: true },
      { text: 'AI 발주 추천', included: true },
      { text: '대화형 AI 채팅', included: false },
    ],
    cta: '무료 상담 신청',
    ctaLink: '/contact?plan=standard',
    popular: true,
  },
  {
    id: 'premium',
    name: 'AI 비서',
    price: '25,000원',
    priceNote: '/월',
    description: '대화형 채팅으로 매장을 관리',
    targetUser: 'AI와 대화하며 매장 운영을 최적화하는 점주님',
    features: [
      { text: 'POS 연동 모든 기능', included: true },
      { text: '대화형 AI 채팅', included: true },
      { text: '맞춤형 액션 카드', included: true },
      { text: 'AI 홍보물 자동 제작', included: true },
      { text: '프로모션 효과 분석', included: true },
      { text: '우선 지원', included: true },
    ],
    cta: '무료 상담 신청',
    ctaLink: '/contact?plan=premium',
  },
  {
    id: 'enterprise',
    name: '엔터프라이즈',
    price: '맞춤 견적',
    description: '카메라 AI 분석까지, 다점포·체인 맞춤 운영',
    targetUser: '카메라 AI 분석·다점포 통합이 필요한 사업자',
    features: [
      { text: 'AI 비서 모든 기능', included: true },
      { text: '카메라 AI 분석', included: true },
      { text: '전담 매니저', included: true },
      { text: '맞춤 온보딩·통합 지원', included: true },
    ],
    cta: '문의하기',
    ctaLink: '/contact?plan=enterprise',
  },
];

/** 일일 환산 가격 앵커 (마케팅 표시용) */
export const valueAnchors: Record<string, string> = {
  standard: '하루 500원',
  premium: '하루 833원',
};
