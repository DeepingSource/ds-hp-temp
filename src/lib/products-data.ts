export interface Product {
  id: string;
  name: string;
  step: string;
  tagline: string;
  description: string;
  href: string;
  features: string[];
  color: string;
  icon: 'Eye' | 'LayoutGrid' | 'Zap';
  external?: string;
}

export const products: Product[] = [
  {
    id: 'StoreCare',
    name: 'StoreCare',
    step: '01 관찰',
    tagline: '매장을 빠짐없이 기록합니다',
    description:
      'AI가 문제를 먼저 감지합니다. 냉장고, 매대, 청결까지.',
    href: '/storecare',
    features: [
      '냉장고·설비 온도 모니터링',
      '매대 빈 곳 감지',
      '청결 상태 자동 점검',
      '야간 이상 행동 알림',
    ],
    color: 'emerald',
    icon: 'Eye',
    external: 'https://landing.StoreCare.ai/',
  },
  {
    id: 'StoreInsight',
    name: 'StoreInsight',
    step: '02 분석',
    tagline: '매출이 새는 곳을 찾아드립니다',
    description:
      '숨겨진 매출 기회를 찾고, 잘 되는 매장의 패턴을 발견합니다.',
    href: '/storeinsight',
    features: [
      '매출 기회 발견',
      '잘 되는 매장 패턴 발견',
      '비식별 동선·체류 분석',
      '대시보드에서 원인 분석',
    ],
    color: 'violet',
    icon: 'LayoutGrid',
    external: '/contact?product=StoreInsight',
  },
  {
    id: 'StoreAgent',
    name: 'StoreAgent',
    step: '03 실행',
    tagline: '승인 한 번이면, 현장에 바로 전달',
    description:
      'AI가 할 일을 정리합니다. 승인하면 바로 현장에 전달.',
    href: '/storeagent',
    features: [
      '오늘 할 일 액션 카드',
      'AI 홍보물(POP) 자동 제작',
      '날씨·행사 연동 발주 제안',
      '근무 스케줄 최적화',
    ],
    color: 'blue',
    icon: 'Zap',
  },
];
