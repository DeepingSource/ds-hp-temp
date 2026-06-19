import {
  AlertCircle,
  Trash2,
  Package,
  UserX,
  Thermometer,
  Store,
  Coffee,
  ShoppingBag,
  Building2,
  PiggyBank,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cctvImages } from '@/data/cctvImages';

/* ─── 알림 카드 데이터 ─── */

export interface AlertCard {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

export const alertCards: AlertCard[] = [
  {
    icon: AlertCircle,
    title: '냉동고 온도 경고',
    desc: '냉동고 온도 이상을 감지했습니다. 제품 상태에 문제가 생기기 전에 빠르게 대응해주세요.',
    color: 'red',
  },
  {
    icon: Trash2,
    title: '청결 미흡',
    desc: '[쓰레기통] 50분째 청결이 확인되지 않았습니다. 확인이 필요합니다.',
    color: 'amber',
  },
  {
    icon: Package,
    title: '진열 미흡',
    desc: '1시간째 [과자 진열대] 재고 보충이 필요합니다.',
    color: 'blue',
  },
];

/* ─── 고객 후기 ─── */

export interface Testimonial {
  type: string;
  name: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    type: '편의점',
    name: '서초구 편의점 / 조OO 점주',
    quote: '월요일 아침마다 2시간씩 매장 돌아다녔는데, 이제는 알림만 확인해요. 주 4번 방문이 주 1번으로 줄었어요.',
  },
  {
    type: '카페',
    name: '강남 카페 / 최OO 점주',
    quote:
      '야간 알바비 월 120만원이 → 월 2만 4천원으로 줄었어요. AI가 대신 지켜봐주니 밤에도 안심이에요.',
  },
  {
    type: '무인매장',
    name: '홍대 무인문구점 / 권OO 점주',
    quote: '냉동고 고장 3시간 뒤에 알았는데, 이제는 5분 만에 알아요. 제품 손실이 거의 없어졌어요.',
  },
];

/* ─── Before/After 지표 ─── */

export interface MetricValue {
  value: number;
  unit: string;
  suffix: string;
}

export interface Metric {
  label: string;
  before: MetricValue;
  after: MetricValue;
  reduction: string;
}

export const metrics: Metric[] = [
  {
    label: 'CCTV 확인 횟수',
    before: { value: 6, unit: '회', suffix: '/일' },
    after: { value: 1, unit: '회', suffix: '/일' },
    reduction: '83%',
  },
  {
    label: 'CCTV 확인 시간',
    before: { value: 28, unit: '분', suffix: '/일' },
    after: { value: 7, unit: '분', suffix: '/일' },
    reduction: '75%',
  },
  {
    label: '매장 방문 횟수',
    before: { value: 12, unit: '회', suffix: '/주' },
    after: { value: 3, unit: '회', suffix: '/주' },
    reduction: '75%',
  },
];

/* ─── 감지 기능 ─── */

export interface Detection {
  icon: LucideIcon;
  title: string;
  desc: string;
  details: string[];
  image: { src: string; alt: string };
}

export const detections: Detection[] = [
  {
    icon: Trash2,
    title: '오염 감지',
    desc: '테이블·바닥 청결을 자동으로 체크해줘요',
    details: [
      '구역별 오염 상태를 3단계(양호·주의·위험)로 판정',
      '50분 이상 방치 시 자동 안내 발송',
      '일별·주별 청결 추이 리포트 제공',
    ],
    image: { src: cctvImages.cafeHall.src, alt: 'StoreCare 오염 감지 — 카페 테이블 잔여물 자동 감지' },
  },
  {
    icon: UserX,
    title: '비정상 체류 포착',
    desc: '문제 상황이 생기기 전에 이상 체류를 먼저 알려줘요',
    details: [
      '구역별 정상 체류 시간을 학습하여 이상 판단',
      '야간 시간대 무인매장 침입·장기 체류 포착',
      '위험 행동(넘어짐, 쓰러짐) 인식 및 실시간 안내',
    ],
    image: { src: cctvImages.unmannedNight.src, alt: 'StoreCare 야간 감지 — 무인매장 IR 나이트비전 이상 체류 감지' },
  },
  {
    icon: Package,
    title: '진열 검출',
    desc: '비어가는 매대를 알려줘서 판매 기회를 놓치지 않게 도와줘요',
    details: [
      '고객의 Pick-up 이벤트 정교한 형태 분석',
      '진열대 빈 공간 비율을 실시간 모니터링',
      '결품 노티 및 구매 전환율 데이터 생성',
    ],
    image: { src: cctvImages.heroShelfEmpty.src, alt: 'StoreCare 진열 감지 — EMPTY SHELF DETECTED AI 오버레이' },
  },
  {
    icon: Thermometer,
    title: '설비 이상 인식',
    desc: '설비 이상을 빨리 찾아서 상품 손상과 클레임을 줄여줘요',
    details: [
      '냉장·냉동고 온도를 5분 간격으로 모니터링',
      '설정 범위 이탈 시 실시간 알림 (식품 안전 기준 연동)',
      '조명 꺼짐, 간판 이상 등 설비 상태 자동 체크',
    ],
    image: { src: cctvImages.heroFridgeOpen.src, alt: 'StoreCare 설비 감지 — DOOR OPEN 4min 냉장고 문열림 실시간 감지' },
  },
];

/* ─── ROI / 비즈니스 가치 ─── */

export interface BusinessValue {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  highlight: string;
  highlightLabel: string;
  desc: string;
  details: string;
  stat: string;
  statLabel: string;
  color: string;
}

export const businessValues: BusinessValue[] = [
  {
    icon: PiggyBank,
    title: '비용 절감',
    subtitle: '점주 안심 여유',
    highlight: '시급 34원',
    highlightLabel: 'AI 알바생',
    desc: '야간 무인매장 안심 관리',
    details:
      '야간 아르바이트 한 명 월 인건비 약 120만 원 대비, 스토어케어는 일 800원 수준으로 24시간 매장을 관리합니다. 야간 운영도 문제 상황만 알려주어 안심하고 쉴 수 있습니다.',
    stat: '일 800원',
    statLabel: '24시간 관리 비용',
    color: 'emerald',
  },
  {
    icon: TrendingUp,
    title: '매출 증대',
    subtitle: '판매 기회 극대화',
    highlight: '진열 공백 최소화',
    highlightLabel: '실시간 모니터링',
    desc: '시간대별 진열 공백 최소화',
    details:
      '진열대가 비어있으면 고객은 그냥 지나치며 매출 하락으로 이어질 수 있습니다. 고객 행동을 분석해 결품을 방지하고 판매 기회 손실을 최소화합니다.',
    stat: '0건',
    statLabel: '놓친 판매 기회',
    color: 'blue',
  },
  {
    icon: ShieldCheck,
    title: '리스크 관리',
    subtitle: '본사 표준화',
    highlight: '5분 이내 감지',
    highlightLabel: '설비 이상 알림',
    desc: '전국 매장 퀄리티 컨트롤',
    details:
      '냉장·냉동고 온도 이상을 5분 내에 감지하여 대규모 식품 안전 사고를 예방합니다. 본사 차원에서 전국 매장의 위생과 설비 상태를 데이터로 파악하고 관리하세요.',
    stat: '5분',
    statLabel: '이상 감지 속도',
    color: 'violet',
  },
];

/* ─── 업종별 솔루션 ─── */

export interface Industry {
  icon: LucideIcon;
  title: string;
  desc: string;
  features: string[];
  image: string;
  imageAlt: string;
}

export const industries: Industry[] = [
  {
    icon: Store,
    title: '편의점 / 무인매장',
    desc: '재고 부족, 청결 문제, 야간 이상 상황을 실시간으로 감지하고 알림을 받아보세요.',
    features: ['진열 빈 공간 검출', '야간 비정상 체류 통보', '냉장고 온도 모니터링'],
    image: '/images/storecare-industry-convenience.webp',
    imageAlt: '편의점 내부 전경',
  },
  {
    icon: Coffee,
    title: '카페 / 음식점',
    desc: '테이블 회전율, 청결 상태를 실시간으로 체크하여 고객 만족도를 높이세요.',
    features: ['테이블 오염 감지', '피크타임 대응 알림', '위생 상태 리포트'],
    image: '/images/storecare-industry-cafe.webp',
    imageAlt: '카페 매장 전경',
  },
  {
    icon: ShoppingBag,
    title: '리테일 매장',
    desc: '진열 상태를 자동으로 점검하고 설비 이상을 빠르게 감지하여 운영 효율을 높이세요.',
    features: ['진열 상태 모니터링', '매장 조명 관리', '설비 이상 알림'],
    image: '/images/storecare-industry-retail.webp',
    imageAlt: '리테일 매장 전경',
  },
  {
    icon: Building2,
    title: '물류 / 창고',
    desc: '냉동·냉장 창고 온도를 24시간 모니터링하고 안전 사고를 예방하세요.',
    features: ['냉동창고 온도 관리', '위험구역 출입 감지', '안전 사고 예방'],
    image: '/images/storecare-industry-warehouse.webp',
    imageAlt: '물류창고 랙 전경',
  },
];

/* ─── 요금제 ─── */

export interface PlanFeature {
  text: string;
  desc: string;
}

export interface Plan {
  name: string;
  price: string;
  recommended: boolean;
  badge: string;
  features: PlanFeature[];
  note?: string;
}

export const plans: Plan[] = [
  {
    name: '전체 관리',
    price: '24,500',
    recommended: true,
    badge: '편의점 점주 73% 선택',
    features: [
      { text: '테이블·매대 청결 알림', desc: '오염 발견 시 바로 알려드려요' },
      { text: '야간 안전 알림', desc: '침입·이상 행동 감지 시 즉시 알림' },
      { text: '조명·간판 점검', desc: '불꺼짐이나 이상 자동 체크' },
      { text: '냉장고 온도 알림', desc: '5분마다 체크하고 이상 시 바로 알림' },
    ],
  },
  {
    name: '기본 관리',
    price: '14,900',
    recommended: false,
    badge: '카페·음식점 추천',
    features: [
      { text: '테이블·매대 청결 알림', desc: '오염 발견 시 바로 알려드려요' },
      { text: '야간 안전 알림', desc: '침입·이상 행동 감지 시 즉시 알림' },
      { text: '조명·간판 점검', desc: '불꺼짐이나 이상 자동 체크' },
    ],
  },
  {
    name: '온도만 볼래요',
    price: '10,000',
    recommended: false,
    badge: '냉장고 많은 매장',
    features: [
      { text: '냉장고 온도 알림', desc: '5분마다 체크하고 이상 시 바로 알림' },
    ],
    note: '냉장/냉동고 5대 기준 (추가 5대마다 +5,000원)',
  },
];

/* ─── 알림 카드 색상 ─── */

export const alertColorMap: Record<string, { card: string; icon: string }> = {
  red: { card: 'border-red-200 bg-red-50', icon: 'text-red-500' },
  amber: { card: 'border-amber-200 bg-amber-50', icon: 'text-amber-500' },
  blue: { card: 'border-blue-200 bg-blue-50', icon: 'text-blue-500' },
};

/* ─── ROI 색상 매핑 ─── */

export const roiColorMap: Record<string, { bg: string; iconBg: string; statText: string; highlight: string; ring: string }> = {
  emerald: { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', statText: 'text-emerald-600', highlight: 'text-emerald-600', ring: 'ring-emerald-200' },
  blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', statText: 'text-blue-600', highlight: 'text-blue-600', ring: 'ring-blue-200' },
  violet: { bg: 'bg-violet-50', iconBg: 'bg-violet-100', statText: 'text-violet-600', highlight: 'text-violet-600', ring: 'ring-violet-200' },
};

/* ─── JSON-LD 구조화 데이터 ─── */

export const storeCareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'STORECARE',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description: 'CCTV 기반 AI 공간 모니터링. 냉장고 이상, 매대 빈 곳, 청결 미흡을 자동 감지하고 실시간 알림을 전송합니다.',
  url: 'https://storeagent.kr/storecare',
  offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: 'https://storeagent.kr/contact' },
  provider: { '@type': 'Organization', name: 'DeepingSource', url: 'https://www.deepingsource.io' },
};
