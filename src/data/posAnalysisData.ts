export type AreaId = 'office' | 'residential' | 'university' | 'entertainment';

export interface SalesTrendItem {
  category: string;
  amount: number;
  change: number;
  barPercent: number;
}

export interface SalesTrendData {
  totalSales: string;
  totalChange: number;
  items: SalesTrendItem[];
}

export interface ForecastDay {
  day: string;
  predicted: number;
  barPercent: number;
  isToday?: boolean;
  isPeak?: boolean;
}

export interface SalesForecastData {
  weekTotal: string;
  weekChange: number;
  peakDay: string;
  peakReason: string;
  days: ForecastDay[];
}

export interface OrderRecommendation {
  product: string;
  currentStock: number;
  recommended: number;
  reason: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface OrderRecommendData {
  totalItems: number; // 전체 추천 품목 수 — items는 상위 추천만 표시
  estimatedSaving: string;
  items: OrderRecommendation[];
}

export interface CompetitorMetric {
  label: string;
  myValue: number;
  avgValue: number;
  unit: string;
  isHigherBetter: boolean;
}

export interface CompetitorData {
  radius: string;
  competitorCount: number;
  myRank: number;
  totalStores: number;
  metrics: CompetitorMetric[];
}

export interface POSAnalysis {
  salesTrend: SalesTrendData;
  salesForecast: SalesForecastData;
  orderRecommend: OrderRecommendData;
  competitor: CompetitorData;
}

export type POSAnalysisMap = Record<AreaId, POSAnalysis>;

export const posAnalysisData: POSAnalysisMap = {
  office: {
    salesTrend: {
      totalSales: '1,120만원',
      totalChange: 4.5,
      items: [
        { category: '도시락/삼각김밥', amount: 340, change: 9, barPercent: 100 },
        { category: '커피/음료', amount: 280, change: 4, barPercent: 82 },
        { category: '과자/간식', amount: 190, change: -2, barPercent: 55 },
        { category: '생활용품', amount: 160, change: 1, barPercent: 47 },
        { category: '유제품', amount: 150, change: 11, barPercent: 44 },
      ],
    },
    salesForecast: {
      weekTotal: '1,170만원',
      weekChange: 4.5,
      peakDay: '금요일',
      peakReason: '코엑스 세미나 + 월말 퇴근 피크',
      days: [
        { day: '월', predicted: 148, barPercent: 68 },
        { day: '화', predicted: 158, barPercent: 73, isToday: true },
        { day: '수', predicted: 195, barPercent: 90 },
        { day: '목', predicted: 158, barPercent: 73 },
        { day: '금', predicted: 215, barPercent: 100, isPeak: true },
        { day: '토', predicted: 148, barPercent: 68 },
        { day: '일', predicted: 148, barPercent: 68 },
      ],
    },
    orderRecommend: {
      totalItems: 9,
      estimatedSaving: '3.2만원',
      items: [
        { product: '삼각김밥 (참치마요)', currentStock: 8, recommended: 30, reason: '세미나 점심 수요 +38%', urgency: 'high' },
        { product: '캔커피 (레쓰비)', currentStock: 11, recommended: 36, reason: '출근 루틴 확인 상향', urgency: 'high' },
        { product: '컵라면 (신라면)', currentStock: 14, recommended: 28, reason: '야간 방문 +15%', urgency: 'medium' },
        { product: '삼각김밥 (연어)', currentStock: 4, recommended: 16, reason: '프리미엄 이동 트렌드', urgency: 'low' },
      ],
    },
    competitor: {
      radius: '500m',
      competitorCount: 4,
      myRank: 2,
      totalStores: 5,
      metrics: [
        { label: '일평균 매출', myValue: 160, avgValue: 129, unit: '만원', isHigherBetter: true },
        { label: '객단가', myValue: 4700, avgValue: 4100, unit: '원', isHigherBetter: true },
        { label: '일 방문객', myValue: 340, avgValue: 315, unit: '명', isHigherBetter: true },
        { label: '폐기율', myValue: 18.5, avgValue: 24, unit: '%', isHigherBetter: false },
      ],
    },
  },

  residential: {
    salesTrend: {
      totalSales: '880만원',
      totalChange: 3.2,
      items: [
        { category: '유제품/빵', amount: 240, change: 12, barPercent: 100 },
        { category: '생활용품/세제', amount: 210, change: 5, barPercent: 87 },
        { category: '즉석식품/반찬', amount: 185, change: -3, barPercent: 77 },
        { category: '과자/음료', amount: 145, change: 7, barPercent: 60 },
        { category: '아이스크림', amount: 100, change: -13, barPercent: 41 },
      ],
    },
    salesForecast: {
      weekTotal: '920만원',
      weekChange: 4.5,
      peakDay: '토요일',
      peakReason: '마트 정기 휴무로 대체 구매',
      days: [
        { day: '월', predicted: 110, barPercent: 56 },
        { day: '화', predicted: 108, barPercent: 55, isToday: true },
        { day: '수', predicted: 118, barPercent: 60 },
        { day: '목', predicted: 122, barPercent: 62 },
        { day: '금', predicted: 132, barPercent: 67 },
        { day: '토', predicted: 195, barPercent: 100, isPeak: true },
        { day: '일', predicted: 135, barPercent: 69 },
      ],
    },
    orderRecommend: {
      totalItems: 6,
      estimatedSaving: '2.8만원',
      items: [
        { product: '우유 (서울우유 1L)', currentStock: 5, recommended: 22, reason: '마트 휴무 대체 구매', urgency: 'high' },
        { product: '비닐우산', currentStock: 3, recommended: 12, reason: '오후 비 예보 즉석 수요', urgency: 'high' },
        { product: '식빵 (삼립)', currentStock: 8, recommended: 20, reason: '주말 샌드위치 수요', urgency: 'medium' },
        { product: '아이스크림 (메로나)', currentStock: 20, recommended: 28, reason: '기온 회복 외출 대비', urgency: 'low' },
      ],
    },
    competitor: {
      radius: '500m',
      competitorCount: 2,
      myRank: 1,
      totalStores: 3,
      metrics: [
        { label: '일평균 매출', myValue: 126, avgValue: 108, unit: '만원', isHigherBetter: true },
        { label: '객단가', myValue: 5200, avgValue: 4700, unit: '원', isHigherBetter: true },
        { label: '일 방문객', myValue: 310, avgValue: 275, unit: '명', isHigherBetter: true },
        { label: '폐기율', myValue: 17, avgValue: 24, unit: '%', isHigherBetter: false },
      ],
    },
  },

  university: {
    salesTrend: {
      totalSales: '1,050만원',
      totalChange: 8.2,
      items: [
        { category: '에너지드링크', amount: 285, change: 18, barPercent: 100 },
        { category: '커피/음료', amount: 245, change: 12, barPercent: 85 },
        { category: '라면/즉석식품', amount: 225, change: 9, barPercent: 78 },
        { category: '과자/초콜릿', amount: 165, change: 15, barPercent: 57 },
        { category: '도시락/삼각', amount: 130, change: 5, barPercent: 45 },
      ],
    },
    salesForecast: {
      weekTotal: '1,100만원',
      weekChange: 5,
      peakDay: '목요일',
      peakReason: '기말고사 벼락치기 특수',
      days: [
        { day: '월', predicted: 130, barPercent: 66 },
        { day: '화', predicted: 145, barPercent: 74, isToday: true },
        { day: '수', predicted: 160, barPercent: 82 },
        { day: '목', predicted: 195, barPercent: 100, isPeak: true },
        { day: '금', predicted: 175, barPercent: 89 },
        { day: '토', predicted: 145, barPercent: 74 },
        { day: '일', predicted: 95, barPercent: 48 },
      ],
    },
    orderRecommend: {
      totalItems: 15,
      estimatedSaving: '4만원',
      items: [
        { product: '레드불 250ml', currentStock: 8, recommended: 28, reason: '기말고사 D-4 소진 임박', urgency: 'high' },
        { product: '핫초코 (스위스)', currentStock: 6, recommended: 24, reason: '한파 예보 수요 2배', urgency: 'high' },
        { product: '진라면 (컵)', currentStock: 22, recommended: 36, reason: '야식 매출 집중 가속', urgency: 'medium' },
        { product: '가나 초콜릿', currentStock: 14, recommended: 22, reason: '스트레스 충동 구매', urgency: 'low' },
      ],
    },
    competitor: {
      radius: '500m',
      competitorCount: 5,
      myRank: 1,
      totalStores: 6,
      metrics: [
        { label: '일평균 매출', myValue: 150, avgValue: 128, unit: '만원', isHigherBetter: true },
        { label: '객단가', myValue: 3750, avgValue: 3100, unit: '원', isHigherBetter: true },
        { label: '일 방문객', myValue: 400, avgValue: 350, unit: '명', isHigherBetter: true },
        { label: '폐기율', myValue: 18, avgValue: 25, unit: '%', isHigherBetter: false },
      ],
    },
  },

  entertainment: {
    salesTrend: {
      totalSales: '1,380만원',
      totalChange: 6.5,
      items: [
        { category: '맥주/소주', amount: 410, change: 14, barPercent: 100 },
        { category: '안주/마른안주', amount: 290, change: 11, barPercent: 70 },
        { category: '음료/에너지', amount: 220, change: 7, barPercent: 53 },
        { category: '라면/즉석식품', amount: 210, change: 16, barPercent: 51 },
        { category: '껌/사탕/기타', amount: 160, change: 4, barPercent: 39 },
      ],
    },
    salesForecast: {
      weekTotal: '1,450만원',
      weekChange: 5.1,
      peakDay: '토요일',
      peakReason: 'K-POP 콘서트 특수',
      days: [
        { day: '월', predicted: 120, barPercent: 38 },
        { day: '화', predicted: 125, barPercent: 40, isToday: true },
        { day: '수', predicted: 150, barPercent: 48 },
        { day: '목', predicted: 185, barPercent: 59 },
        { day: '금', predicted: 280, barPercent: 90 },
        { day: '토', predicted: 310, barPercent: 100, isPeak: true },
        { day: '일', predicted: 280, barPercent: 90 },
      ],
    },
    orderRecommend: {
      totalItems: 22,
      estimatedSaving: '5.8만원',
      items: [
        { product: '카스 500ml (6캔)', currentStock: 8, recommended: 26, reason: '맥주 매출 +35% 집중', urgency: 'high' },
        { product: '마른안주 (오징어)', currentStock: 6, recommended: 16, reason: '주류 동반 68%', urgency: 'high' },
        { product: '소주 (참이슬)', currentStock: 14, recommended: 28, reason: '심야 심층 피크 대응', urgency: 'medium' },
        { product: '얼음 2kg', currentStock: 4, recommended: 15, reason: '얼음 소진 2배 가속', urgency: 'medium' },
      ],
    },
    competitor: {
      radius: '500m',
      competitorCount: 7,
      myRank: 3,
      totalStores: 8,
      metrics: [
        { label: '일평균 매출', myValue: 197, avgValue: 174, unit: '만원', isHigherBetter: true },
        { label: '객단가', myValue: 5400, avgValue: 4800, unit: '원', isHigherBetter: true },
        { label: '일 방문객', myValue: 465, avgValue: 415, unit: '명', isHigherBetter: true },
        { label: '폐기율', myValue: 14, avgValue: 18, unit: '%', isHigherBetter: false },
      ],
    },
  },
};
