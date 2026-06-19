import { type Locale } from '@/lib/i18n';
import type { AreaId } from '@/data/posAnalysisData';

/**
 * Localized overlay for the RENDERED string fields of `posAnalysisData`.
 *
 * posAnalysisData is single-consumer (POSAnalysisSection) but kept shape-stable;
 * this overlay holds only the user-visible strings translated to ko/en/jp.
 * ko values are verbatim, en concise, jp 丁寧体. Numeric fields, percentages,
 * barPercent, urgency, isHigherBetter, ranks, counts, etc. stay in the base data.
 *
 * Indexed fields (category items, forecast days, order items, competitor
 * metrics) are arrays aligned 1:1 with the base data order.
 */

export interface POSAnalysisCopy {
  totalSales: string;
  categories: string[];
  weekTotal: string;
  peakDay: string;
  peakReason: string;
  days: string[];
  estimatedSaving: string;
  products: string[];
  reasons: string[];
  metricLabels: string[];
  metricUnits: string[];
}

const data: Record<AreaId, Record<Locale, POSAnalysisCopy>> = {
  office: {
    ko: {
      totalSales: '1,120만원',
      categories: ['도시락/삼각김밥', '커피/음료', '과자/간식', '생활용품', '유제품'],
      weekTotal: '1,170만원',
      peakDay: '금요일',
      peakReason: '코엑스 세미나 + 월말 퇴근 피크',
      days: ['월', '화', '수', '목', '금', '토', '일'],
      estimatedSaving: '3.2만원',
      products: ['삼각김밥 (참치마요)', '캔커피 (레쓰비)', '컵라면 (신라면)', '삼각김밥 (연어)'],
      reasons: ['세미나 점심 수요 +38%', '출근 루틴 확인 상향', '야간 방문 +15%', '프리미엄 이동 트렌드'],
      metricLabels: ['일평균 매출', '객단가', '일 방문객', '폐기율'],
      metricUnits: ['만원', '원', '명', '%'],
    },
    en: {
      totalSales: '$8,400',
      categories: ['Lunchboxes/Rice Balls', 'Coffee/Drinks', 'Snacks', 'Household', 'Dairy'],
      weekTotal: '$8,780',
      peakDay: 'Friday',
      peakReason: 'COEX seminar + month-end commute peak',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      estimatedSaving: '$24',
      products: ['Rice Ball (Tuna Mayo)', 'Canned Coffee (Letsbe)', 'Cup Noodle (Shin)', 'Rice Ball (Salmon)'],
      reasons: ['Seminar lunch demand +38%', 'Commute routine confirmed up', 'Night visits +15%', 'Shift to premium'],
      metricLabels: ['Avg daily sales', 'Per-customer', 'Daily visitors', 'Waste rate'],
      metricUnits: ['', '', '', '%'],
    },
    jp: {
      totalSales: '1,120万ウォン',
      categories: ['弁当/おにぎり', 'コーヒー/飲料', 'お菓子/軽食', '生活用品', '乳製品'],
      weekTotal: '1,170万ウォン',
      peakDay: '金曜日',
      peakReason: 'COEXセミナー + 月末退勤ピーク',
      days: ['月', '火', '水', '木', '金', '土', '日'],
      estimatedSaving: '3.2万ウォン',
      products: ['おにぎり (ツナマヨ)', '缶コーヒー (レッツビー)', 'カップ麺 (辛ラーメン)', 'おにぎり (サーモン)'],
      reasons: ['セミナー昼需要 +38%', '出勤ルーティン上方修正', '夜間来店 +15%', 'プレミアム志向の流れ'],
      metricLabels: ['1日平均売上', '客単価', '1日来店客', '廃棄率'],
      metricUnits: ['万ウォン', 'ウォン', '人', '%'],
    },
  },

  residential: {
    ko: {
      totalSales: '880만원',
      categories: ['유제품/빵', '생활용품/세제', '즉석식품/반찬', '과자/음료', '아이스크림'],
      weekTotal: '920만원',
      peakDay: '토요일',
      peakReason: '마트 정기 휴무로 대체 구매',
      days: ['월', '화', '수', '목', '금', '토', '일'],
      estimatedSaving: '2.8만원',
      products: ['우유 (서울우유 1L)', '비닐우산', '식빵 (삼립)', '아이스크림 (메로나)'],
      reasons: ['마트 휴무 대체 구매', '오후 비 예보 즉석 수요', '주말 샌드위치 수요', '기온 회복 외출 대비'],
      metricLabels: ['일평균 매출', '객단가', '일 방문객', '폐기율'],
      metricUnits: ['만원', '원', '명', '%'],
    },
    en: {
      totalSales: '$6,600',
      categories: ['Dairy/Bread', 'Household/Detergent', 'Ready Meals/Sides', 'Snacks/Drinks', 'Ice Cream'],
      weekTotal: '$6,900',
      peakDay: 'Saturday',
      peakReason: 'Substitute buys during mart closing day',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      estimatedSaving: '$21',
      products: ['Milk (Seoul Milk 1L)', 'Umbrella', 'Bread (Samlip)', 'Ice Cream (Melona)'],
      reasons: ['Mart closed, substitute buys', 'Afternoon rain, on-the-spot demand', 'Weekend sandwich demand', 'Warmer weather, outings'],
      metricLabels: ['Avg daily sales', 'Per-customer', 'Daily visitors', 'Waste rate'],
      metricUnits: ['', '', '', '%'],
    },
    jp: {
      totalSales: '880万ウォン',
      categories: ['乳製品/パン', '生活用品/洗剤', '即席食品/惣菜', 'お菓子/飲料', 'アイスクリーム'],
      weekTotal: '920万ウォン',
      peakDay: '土曜日',
      peakReason: 'スーパー定休日による代替購入',
      days: ['月', '火', '水', '木', '金', '土', '日'],
      estimatedSaving: '2.8万ウォン',
      products: ['牛乳 (ソウル牛乳 1L)', 'ビニール傘', '食パン (サムリプ)', 'アイス (メロナ)'],
      reasons: ['スーパー休業の代替購入', '午後の雨予報で即席需要', '週末のサンドイッチ需要', '気温回復で外出に備え'],
      metricLabels: ['1日平均売上', '客単価', '1日来店客', '廃棄率'],
      metricUnits: ['万ウォン', 'ウォン', '人', '%'],
    },
  },

  university: {
    ko: {
      totalSales: '1,050만원',
      categories: ['에너지드링크', '커피/음료', '라면/즉석식품', '과자/초콜릿', '도시락/삼각'],
      weekTotal: '1,100만원',
      peakDay: '목요일',
      peakReason: '기말고사 벼락치기 특수',
      days: ['월', '화', '수', '목', '금', '토', '일'],
      estimatedSaving: '4만원',
      products: ['레드불 250ml', '핫초코 (스위스)', '진라면 (컵)', '가나 초콜릿'],
      reasons: ['기말고사 D-4 소진 임박', '한파 예보 수요 2배', '야식 매출 집중 가속', '스트레스 충동 구매'],
      metricLabels: ['일평균 매출', '객단가', '일 방문객', '폐기율'],
      metricUnits: ['만원', '원', '명', '%'],
    },
    en: {
      totalSales: '$7,875',
      categories: ['Energy Drinks', 'Coffee/Drinks', 'Noodles/Ready Meals', 'Snacks/Chocolate', 'Lunchboxes/Rice Balls'],
      weekTotal: '$8,250',
      peakDay: 'Thursday',
      peakReason: 'Finals cram-week surge',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      estimatedSaving: '$30',
      products: ['Red Bull 250ml', 'Hot Cocoa (Swiss)', 'Cup Ramen (Jin)', 'Ghana Chocolate'],
      reasons: ['Finals D-4, nearly out', 'Cold snap, demand x2', 'Late-night sales accelerating', 'Stress impulse buys'],
      metricLabels: ['Avg daily sales', 'Per-customer', 'Daily visitors', 'Waste rate'],
      metricUnits: ['', '', '', '%'],
    },
    jp: {
      totalSales: '1,050万ウォン',
      categories: ['エナジードリンク', 'コーヒー/飲料', 'ラーメン/即席食品', 'お菓子/チョコ', '弁当/おにぎり'],
      weekTotal: '1,100万ウォン',
      peakDay: '木曜日',
      peakReason: '期末試験の追い込み特需',
      days: ['月', '火', '水', '木', '金', '土', '日'],
      estimatedSaving: '4万ウォン',
      products: ['レッドブル 250ml', 'ホットココア (スイス)', 'カップ麺 (ジン)', 'ガナチョコ'],
      reasons: ['期末試験D-4で品薄間近', '寒波予報で需要2倍', '夜食売上が集中加速', 'ストレスの衝動買い'],
      metricLabels: ['1日平均売上', '客単価', '1日来店客', '廃棄率'],
      metricUnits: ['万ウォン', 'ウォン', '人', '%'],
    },
  },

  entertainment: {
    ko: {
      totalSales: '1,380만원',
      categories: ['맥주/소주', '안주/마른안주', '음료/에너지', '라면/즉석식품', '껌/사탕/기타'],
      weekTotal: '1,450만원',
      peakDay: '토요일',
      peakReason: 'K-POP 콘서트 특수',
      days: ['월', '화', '수', '목', '금', '토', '일'],
      estimatedSaving: '5.8만원',
      products: ['카스 500ml (6캔)', '마른안주 (오징어)', '소주 (참이슬)', '얼음 2kg'],
      reasons: ['맥주 매출 +35% 집중', '주류 동반 68%', '심야 심층 피크 대응', '얼음 소진 2배 가속'],
      metricLabels: ['일평균 매출', '객단가', '일 방문객', '폐기율'],
      metricUnits: ['만원', '원', '명', '%'],
    },
    en: {
      totalSales: '$10,350',
      categories: ['Beer/Soju', 'Bar Snacks/Dried', 'Drinks/Energy', 'Noodles/Ready Meals', 'Gum/Candy/Etc'],
      weekTotal: '$10,875',
      peakDay: 'Saturday',
      peakReason: 'K-POP concert surge',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      estimatedSaving: '$43',
      products: ['Cass 500ml (6-pack)', 'Dried Squid', 'Soju (Chamisul)', 'Ice 2kg'],
      reasons: ['Beer sales +35% concentrated', 'Paired with alcohol 68%', 'Late-night peak prep', 'Ice runs out x2 faster'],
      metricLabels: ['Avg daily sales', 'Per-customer', 'Daily visitors', 'Waste rate'],
      metricUnits: ['', '', '', '%'],
    },
    jp: {
      totalSales: '1,380万ウォン',
      categories: ['ビール/焼酎', 'おつまみ/乾き物', '飲料/エナジー', 'ラーメン/即席食品', 'ガム/飴/その他'],
      weekTotal: '1,450万ウォン',
      peakDay: '土曜日',
      peakReason: 'K-POPコンサート特需',
      days: ['月', '火', '水', '木', '金', '土', '日'],
      estimatedSaving: '5.8万ウォン',
      products: ['カス 500ml (6缶)', '乾きつまみ (イカ)', '焼酎 (チャミスル)', '氷 2kg'],
      reasons: ['ビール売上+35%が集中', '酒類との同時購入68%', '深夜ピークへの対応', '氷の消耗が2倍加速'],
      metricLabels: ['1日平均売上', '客単価', '1日来店客', '廃棄率'],
      metricUnits: ['万ウォン', 'ウォン', '人', '%'],
    },
  },
};

/** Resolve the localized copy for an area. */
export function getPOSCopy(id: AreaId, locale: Locale): POSAnalysisCopy {
  return data[id][locale];
}
