import type { LucideIcon } from 'lucide-react';
import {
  Route,
  MapPin,
  HandMetal,
  BarChart3,
  TrendingUp,
  Camera,
  Building2,
  Ticket,
  Landmark,
  Coffee,
  Fingerprint,
  Layers,
  Cpu,
  Server,
  Scale,
} from 'lucide-react';

/* ─── Types ─── */

export interface ValueItem {
  icon: LucideIcon;
  title: string;
  highlight: string;
  desc: string;
  dashboardType: 'revenue' | 'realtime' | 'multistore';
}

export interface SolutionItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  metrics: string[];
  image: { src: string; alt: string };
}

export interface SolutionSummaryItem {
  feature: string;
  input: string;
  output: string;
  benefit: string;
}

export interface CaseStudy {
  category: string;
  title: string;
  metric: string;
  problem: string;
  solution: string;
  result: string;
  image1?: string;
  title1?: string;
  image2?: string;
  title2?: string;
  image3?: string;
  title3?: string;
  image?: string;
  imageGuide?: string;
  quote?: string;
  quoteName?: string;
}

export interface TechDiffItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
  color: string;
}

export interface PrivacyPoint {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface UseCaseItem {
  icon: LucideIcon;
  label: string;
  desc: string;
  details: string[];
  metric: string;
  href: string;
  /** 산업 페이지 미구현 — 상담 문의로 연결되는 카드 */
  isConsultation?: boolean;
}

/* ─── 핵심 가치 3종 — CSS 기반 대시보드 미니 시각화 ─── */
export const values: ValueItem[] = [
  {
    icon: TrendingUp,
    title: '매출과 연결된 인사이트',
    highlight: '진열 바꾸면 매출이 오르는지 확인해요',
    desc: '동선·제품 접촉 데이터로 숨은 판매 기회를 찾아드려요.',
    dashboardType: 'revenue',
  },
  {
    icon: BarChart3,
    title: '실시간 대시보드',
    highlight: '별도 설치 없이 웹에서 바로',
    desc: '설치 없이 브라우저에서 실시간 매장 현황을 확인해요.',
    dashboardType: 'realtime',
  },
  {
    icon: Camera,
    title: '여러 매장 한눈에',
    highlight: '수백 개 매장도 한 화면으로',
    desc: '전국 매장을 한 화면에서 실시간 비교·관리해요.',
    dashboardType: 'multistore',
  },
];

/* ─── 분석 솔루션 ─── */
export const solutions: SolutionItem[] = [
  {
    icon: Route,
    title: '동선 분석',
    desc: '실시간 동선 히트맵으로 병목 구간을 바로 파악해요.',
    metrics: ['구역별 방문자 수', '평균 이동 경로', '병목 구간 확인'],
    image: { src: '/images/storeinsight-pathway-beforeafter.webp', alt: 'StoreInsight 동선 분석 Before/After — 레이아웃 변경 전후 비교' },
  },
  {
    icon: MapPin,
    title: '체류·관심 영역',
    desc: '체류 히트맵으로 관심 집중 구역을 한눈에 파악해요.',
    metrics: ['구역별 평균 체류 시간', '관심 집중 히트맵', '시간대별 체류 변화'],
    image: { src: '/images/storeinsight-dwell-chart.webp', alt: 'StoreInsight 체류 관심 영역 차트 — 구역별 체류 집중도 시각화' },
  },
  {
    icon: HandMetal,
    title: '제품 상호작용',
    desc: '실시간 Pick-up 집계로 인기 제품과 구매 전환을 파악해요.',
    metrics: ['제품 집어 본 횟수', '장바구니 전환율', '쇼핑 시간 측정'],
    image: { src: '/images/storeinsight-product-interaction.webp', alt: 'StoreInsight 제품 상호작용 분석 — Pick-up 이벤트 및 구매 전환 퍼널' },
  },
  {
    icon: BarChart3,
    title: '매출 원인 분석',
    desc: '동선·POS·날씨 교차 분석으로 매출 원인을 찾아요.',
    metrics: ['POS + 동선 합친 분석', '날씨·요일·이벤트 상관관계', '프로모션 효과 리포트'],
    image: { src: '/images/storeinsight-cross-analysis.webp', alt: 'StoreInsight 교차 분석 — 날씨 데이터, 점포 히트맵 및 매출 추정' },
  },
  {
    icon: TrendingUp,
    title: '성공 패턴 찾기',
    desc: '우수 매장 동선 패턴을 찾아 맞춤 제안해줘요.',
    metrics: ['우수 매장 진열 방법', '매대 배치 시뮬레이션', '적용 후 결과 리뷰'],
    image: { src: '/images/storeinsight-success-pattern.webp', alt: 'StoreInsight 성공 패턴 발견 — 우수 매장 데이터 벤치마크 차트' },
  },
];

/* ─── 솔루션 요약 테이블 데이터 ─── */
export const solutionSummary: SolutionSummaryItem[] = [
  { feature: '이동 패턴 분석', input: 'CCTV 영상', output: '동선 히트맵, 병목 구간', benefit: '레이아웃 최적화' },
  { feature: '체류·관심 영역', input: '구역별 카메라', output: '체류 시간 히트맵', benefit: '진열 배치 개선' },
  { feature: '제품 상호작용', input: '매대 카메라', output: 'Pick-up 퍼널', benefit: '전환율 향상' },
  { feature: '매출 교차 분석', input: 'POS + 날씨 + 동선', output: '상관 분석 리포트', benefit: '매출 원인 파악' },
  { feature: '성공 패턴 발견', input: '다점포 데이터', output: '액션 카드', benefit: '즉시 실행 가이드' },
];

/* ─── 실제 사례 ─── */
export const caseStudies: CaseStudy[] = [
  {
    category: '역세권 편의점',
    title: '진열 배치 바꿔 안주류 매출 15%↑',
    metric: '안주류 매출 15% 상승',
    problem: '손님은 들어오는데 안주류 코너는 조용했어요. POS만으로는 어디서 고객을 잃는지 몰랐죠.',
    solution: 'SAAI가 알려줬어요: "안주류 구역 전환율 23% — 입구 구역과 교체하면 매출 +12~18%"',
    result: '매대 옮긴 당일부터 매출이 오르기 시작해 한 달 만에 15% 늘었어요.',
    quote: '감으로 하던 진열을 데이터가 잡아줘요. 하루 만에 결과가 보였어요.',
    quoteName: '편의점 점주 K',
    image1: '/images/storeinsight-case1-beforeafter.webp',
    title1: '보이지 않는 이탈',
    image2: '/images/storeinsight-case1-action.webp',
    title2: 'SAAI 솔루션',
    image3: '/images/storeinsight-case1-chart.webp',
    title3: '개선 결과',
  },
  {
    category: '학원가 편의점',
    title: '안 쓰는 테이블 철수하고 매대 늘려 수익 10%↑',
    metric: '판매 면적 30% 확대',
    problem: '테이블 사용이 하루 15분뿐이었는데, 직감으로만 판단해서 방치하고 있었어요.',
    solution: 'SAAI가 알려줬어요: "창가 테이블 사용 15분. 스낵 매대로 바꾸면 하교 피크타임을 잡을 수 있어요."',
    result: '테이블 하나 철수하고 스낵 매대를 만들었더니 전체 수익이 10% 늘었어요.',
    quote: '테이블 쓰는 사람이 거의 없다는 걸 숫자로 보니 바로 결정할 수 있었어요.',
    quoteName: '편의점 점주 L',
    image1: '/images/storeinsight-case2-chart.webp',
    title1: '도입 전 현황',
    image2: '/images/storeinsight-case2-beforeafter.webp',
    title2: 'SAAI 솔루션',
    image3: '/images/storeinsight-case2-action.webp',
    title3: '개선 결과',
  },
  {
    category: '로드숍 드럭스토어',
    title: '남성 고객 이탈 구역 찾아 전환율 3배로',
    metric: '남성 전환율 3배 (11% → 33%)',
    problem: '남성 고객은 많이 오는데 구매율이 너무 낮았어요. 어디가 문제인지 몰랐죠.',
    solution: 'SAAI 히트맵이 보여줬어요: "남성 70%가 입구 3m에서 나가요. 입구에 남성 화장품을 배치하세요."',
    result: '입구 매대만 바꿨더니 남성 상품 판매가 67% 늘었어요.',
    quote: '남성 고객이 어디서 나가는지 처음 알았어요. 히트맵 하나가 매출을 바꿨어요.',
    quoteName: '드럭스토어 매니저 P',
    image1: '/images/storeinsight-case3-problem.webp',
    title1: '도입 전 현황',
    image2: '/images/storeinsight-case3-heatmap.webp',
    title2: 'SAAI 솔루션',
    image3: '/images/storeinsight-case3-action.webp',
    title3: '개선 결과',
  },
  {
    category: '오피스 상권 카페',
    title: '점심 피크타임 병목 제거하고 회전율 18%↑',
    metric: '점심 회전율 18% 향상',
    problem: '점심시간에 주문 줄과 픽업 줄이 뒤엉켜서 매장이 마비됐어요.',
    solution: 'SAAI가 알려줬어요: "카운터 앞 픽업 동선을 2m 우측으로 분리하면 돼요."',
    result: '레이아웃 안 바꾸고 대기시간이 8분에서 4분으로 줄어 시간당 11명 더 받을 수 있게 됐어요.',
    quote: '줄이 왜 막히는지 눈으로 봐도 몰랐는데, 동선 데이터가 답을 줬어요.',
    quoteName: '카페 점주 S',
    image1: '/images/storeinsight-case4-heatmap.webp',
    title1: '도입 전 현황',
    image2: '/images/storeinsight-case4-beforeafter.webp',
    title2: 'SAAI 솔루션',
    image3: '/images/storeinsight-case4-result.webp',
    title3: '개선 결과',
  },
  {
    category: '시립 전시관',
    title: '인파 분산시켜 체류 시간 25% 늘려',
    metric: '평균 체류 시간 25% 증가',
    problem: '입구 A구역만 붐비고 C구역은 관람률이 8%에 불과했어요.',
    solution: 'SAAI가 즉시 알려줬어요: "입구 안내 화살표를 C구역으로 돌리고 안내판을 설치하세요."',
    result: '자연스럽게 인파가 분산돼서 전체 전시를 관람하게 되고 체류시간이 크게 늘었어요.',
    quote: '특정 구역만 붐비는 원인을 몰랐는데, 동선 데이터가 해결해줬어요.',
    quoteName: '전시기획 담당자 J',
    image1: '/images/storeinsight-case5-heatmap.webp',
    title1: '도입 전 현황',
    image2: '/images/storeinsight-case5-action.webp',
    title2: 'SAAI 솔루션',
    image3: '/images/storeinsight-case5-result.webp',
    title3: '개선 결과',
  },
];

/* ─── 기술 차별점 ─── */
export const techDiffs: TechDiffItem[] = [
  {
    icon: Fingerprint,
    title: '세계 최초 AI 익명화 기술',
    desc: '얼굴·형체를 실시간 제거하고 행동 데이터만 보존합니다.',
    tag: 'Privacy-First',
    color: 'violet',
  },
  {
    icon: Layers,
    title: '다중 카메라 연속 동선 분석 (MTMC)',
    desc: '여러 카메라를 하나로 연결해 끊김 없이 동선을 분석합니다.',
    tag: 'Multi-Camera',
    color: 'emerald',
  },
  {
    icon: Cpu,
    title: 'On-Device Edge AI 처리',
    desc: '매장 내 장치에서 처리하며 영상은 외부로 전송되지 않습니다.',
    tag: 'High-Security',
    color: 'blue',
  },
  {
    icon: Landmark,
    title: '검증된 글로벌 엔터프라이즈 솔루션',
    desc: 'GDPR·CCPA 등 글로벌 보안 규제를 통과한 검증된 기술입니다.',
    tag: 'Global-Scale',
    color: 'slate',
  },
];

/* ─── 개인정보 보호 포인트 ─── */
export const privacyPoints: PrivacyPoint[] = [
  {
    icon: Fingerprint,
    title: 'AI 익명화 (특허 기술)',
    desc: '영상 속 인물을 철저히 익명화하면서도 행동 분석 정확도를 유지하는 독자 기술.',
  },
  {
    icon: Server,
    title: 'On-Device 처리',
    desc: '원본 영상이 외부 서버로 전송되지 않습니다. 결과 데이터만 대시보드로 전달됩니다.',
  },
  {
    icon: Scale,
    title: '글로벌 규제 준수',
    desc: 'GDPR(EU), CCPA(미국), 개인정보보호법(한국) 등 주요 규제를 모두 준수합니다.',
  },
];

/* ─── 적용 분야 — 확장된 콘텐츠 ─── */
export const useCases: UseCaseItem[] = [
  {
    icon: Building2,
    label: '리테일 매장',
    desc: '고객 동선 최적화, 진열 배치 개선, 프로모션 효과 측정',
    details: ['진열대별 전환율 퍼널 구축', '시간대별 동선 패턴 비교', '매대 조합 시뮬레이션'],
    metric: '평균 매출 +15%',
    href: '/industries/convenience',
  },
  {
    icon: Ticket,
    label: '전시회 · 박람회',
    desc: '부스별 방문자 분석, 관람 동선 파악, 혼잡도 관리',
    details: ['부스별 체류시간 랭킹', '혼잡도 실시간 모니터링', '관람 동선 최적화 보고서'],
    metric: '체류시간 +25%',
    href: '/industries/exhibition',
  },
  {
    icon: Landmark,
    label: '공공시설',
    desc: '시설 이용 패턴 분석, 공간 효율화, 안전 관리',
    details: ['구역별 이용률 히트맵', '혼잡 시간대 예측', '안전 동선 분석'],
    metric: '공간 효율 +20%',
    href: '/contact?product=StoreInsight',
    isConsultation: true,
  },
  {
    icon: Coffee,
    label: 'F&B 매장',
    desc: '좌석 회전율 분석, 메뉴 배치 최적화, 피크타임 인력 배치',
    details: ['좌석별 회전율 측정', '주문 대기 병목 분석', '피크타임 인력 최적화'],
    metric: '회전율 +18%',
    href: '/industries/cafe',
  },
];

/* ─── JSON-LD ─── */
export const storeInsightJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'STOREINSIGHT',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description: '날씨·동선·POS 교차 분석으로 매출 원인을 찾아주는 매장 데이터 분석 대시보드.',
  url: 'https://storeagent.kr/storeinsight',
  offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: 'https://storeagent.kr/contact' },
  provider: { '@type': 'Organization', name: 'DeepingSource', url: 'https://www.deepingsource.io' },
};
