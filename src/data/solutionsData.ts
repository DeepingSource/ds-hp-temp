export interface SolutionCause {
  title: string;
  desc: string;
}

export interface SolutionStep {
  product: 'StoreCare' | 'StoreInsight' | 'StoreAgent';
  productLabel: string;
  productColor: 'emerald' | 'violet' | 'blue';
  title: string;
  desc: string;
}

export interface SolutionResult {
  stat: string;
  label: string;
}

export interface SolutionPage {
  slug: string;
  industry: string;
  industryLabel: string;
  title: string;
  excerpt: string;
  impact: string;
  impactLabel: string;
  problem: string;
  background: {
    heading: string;
    body: string;
  };
  causes: SolutionCause[];
  steps: SolutionStep[];
  results: SolutionResult[];
  relatedTerms: string[];
  relatedSolutions: string[];
  metaDescription: string;
}

const PRODUCT_STEPS = {
  storecare: (title: string, desc: string): SolutionStep => ({
    product: 'StoreCare',
    productLabel: '01 관찰 · store care',
    productColor: 'emerald',
    title,
    desc,
  }),
  storeinsight: (title: string, desc: string): SolutionStep => ({
    product: 'StoreInsight',
    productLabel: '02 분석 · store insight',
    productColor: 'violet',
    title,
    desc,
  }),
  storeagent: (title: string, desc: string): SolutionStep => ({
    product: 'StoreAgent',
    productLabel: '03 실행 · store agent',
    productColor: 'blue',
    title,
    desc,
  }),
};

export const solutionsData: SolutionPage[] = [
  // ── 편의점 ──
  {
    slug: 'convenience-night-theft',
    industry: 'convenience',
    industryLabel: '편의점',
    title: '편의점 야간 도난 방지',
    excerpt: '야간 무인·1인 운영 중 도난과 이상 행동을 AI가 실시간으로 감지하는 방법',
    impact: '-68%',
    impactLabel: '야간 도난 손실 감소',
    problem:
      '야간 시간대 편의점은 최소 인원으로 운영되거나 완전 무인 상태가 됩니다. 도난이 발생해도 다음 날 아침에야 알게 되어 손실이 누적됩니다.',
    background: {
      heading: '야간 편의점, 왜 도난에 취약한가',
      body: '통계청 자료에 따르면 편의점 절도의 70% 이상이 심야·새벽 시간대에 집중됩니다. 근무자 혼자인 상황에서 여러 고객을 동시에 관찰하는 것은 불가능합니다. CCTV가 있어도 실시간으로 모니터링하는 사람이 없으면 사후 확인 도구에 불과합니다. 사건 발생 후 영상을 찾아보는 동안 손실은 이미 발생한 상태입니다.',
    },
    causes: [
      {
        title: '실시간 모니터링 부재',
        desc: 'CCTV가 녹화 중이지만 야간에 영상을 실시간으로 확인하는 사람이 없습니다. 이상 상황이 발생해도 다음날 아침까지 발견이 늦어집니다.',
      },
      {
        title: '1인 근무의 사각지대',
        desc: '근무자 1명이 계산대 업무를 보는 동안 공간 내부 전체를 동시에 관찰할 수 없습니다. 음료수 코너, 주류 구역 등 사각지대가 발생합니다.',
      },
      {
        title: '이상 행동 식별 어려움',
        desc: '장시간 배회, 여러 번 다른 구역을 반복 방문하는 행동이 실제 도난 시도 신호임에도 그 자리에서 판단하고 대응하기 어렵습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '야간 이상 행동 실시간 포착',
        'AI가 현장 내 고객의 행동 패턴을 실시간으로 파악합니다. 특정 구역 장시간 배회(설정값 초과), 무릎을 굽히거나 몸을 숨기는 비정상적 자세, 그룹 행동 패턴을 인식하면 즉시 안내를 발송합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '시간대별 도난 위험 패턴 분석',
        '어느 시간대, 어느 구역에서 이상 탐지 빈도가 높은지 누적 데이터로 파악합니다. 주간 리포트로 도난 위험이 높은 구역과 시간을 확인해 카메라 추가 설치나 진열 재배치에 활용합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '이상 발생 시 자동 알림 및 대응',
        '이상 포착 시 점주 앱으로 15초 이내에 푸시 알림과 영상 캡처가 전송됩니다. 경고 방송 자동 실행, 원격 잠금 시스템과 연동도 가능합니다.',
      ),
    ],
    results: [
      { stat: '-68%', label: '야간 도난 손실 감소' },
      { stat: '98.2%', label: '이상 감지 정확도' },
      { stat: '15초', label: '알림 발송 소요 시간' },
    ],
    relatedTerms: ['anomaly-detection', 'night-monitoring', 'anonymized-cctv', 'cctv-analytics'],
    relatedSolutions: ['convenience-inventory-loss', 'unmanned-theft-prevention', 'unmanned-remote-monitoring'],
    metaDescription:
      '편의점 야간 도난 방지 방법. AI 이상 감지로 야간 도난 손실을 68% 줄이는 솔루션. 15초 이내 알림 발송, 98.2% 감지 정확도. 무료 상담 신청.',
  },
  {
    slug: 'convenience-inventory-loss',
    industry: 'convenience',
    industryLabel: '편의점',
    title: '편의점 결품 및 재고 손실 관리',
    excerpt: 'AI 카메라로 결품 발생을 실시간 감지해 매출 손실과 고객 이탈을 방지하는 방법',
    impact: '-42%',
    impactLabel: '결품으로 인한 매출 손실 감소',
    problem:
      '편의점의 재고 결품은 POS 데이터만으로는 파악할 수 없습니다. 창고에 재고가 있어도 진열이 안 된 상태로 방치되거나, 실제 결품이 장시간 지속되어 기회 손실이 누적됩니다.',
    background: {
      heading: '결품 1시간이 만드는 손실',
      body: '편의점에서 인기 음료나 즉석 식품이 1시간 결품이면 평균 5–8건의 구매 기회가 사라집니다. 특히 출근·점심·퇴근 피크 타임에 결품이 발생하면 고객은 다른 매장으로 이동하고, 이 경험이 반복되면 방문 자체가 줄어듭니다. POS 기록에는 "팔리지 않은 것"이 표시되지 않기 때문에 점주는 손실이 얼마나 컸는지조차 모릅니다.',
    },
    causes: [
      {
        title: 'POS 재고 관리의 실제 재고 괴리',
        desc: '이론적 재고(POS 계산)와 실제 진열 재고 사이에는 도난, 파손, 보충 누락으로 항상 차이가 생깁니다. POS가 "재고 있음"이라고 해도 실제 매대는 비어 있을 수 있습니다.',
      },
      {
        title: '바쁜 시간대 보충 지연',
        desc: '점심·저녁 피크 타임에는 계산과 고객 응대에 집중하다 보니 매대 보충이 늦어집니다. 결품이 발생해도 당장 처리하지 못하고 30분~1시간이 지나는 경우가 빈번합니다.',
      },
      {
        title: '창고 재고와 진열 재고의 단절',
        desc: '창고에 재고가 있어도 누군가가 직접 확인하지 않으면 진열 보충이 이루어지지 않습니다. 특히 야간·새벽 근무자는 어떤 매대를 보충해야 하는지 파악하기 어렵습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '주요 매대 결품 자동 확인',
        '지정한 주요 매대의 진열 상태를 AI 카메라가 주기적으로 확인합니다. 진열 공간의 일정 비율 이상이 비어 있거나 상품이 쓰러진 상태가 발견되면 실시간 통보를 발송합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '결품 빈도 및 손실 패턴 분석',
        '어느 매대, 어느 상품이 어떤 시간대에 결품이 자주 발생하는지 누적 데이터로 파악합니다. 결품 지속 시간과 빈도를 기반으로 발주 주기 조정을 위한 인사이트를 제공합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '보충 안내 자동 발송',
        '결품 발견 시 근무자 또는 점주에게 "A 매대 음료 보충 필요"와 같은 구체적인 푸시 전송이 이루어집니다. 알림에는 해당 매대의 현재 상태 사진이 포함되어 바로 확인할 수 있습니다.',
      ),
    ],
    results: [
      { stat: '-42%', label: '결품 지속 시간 감소' },
      { stat: '+23%', label: '매대 구매 전환율 상승' },
      { stat: '<5분', label: '결품 알림 발송 시간' },
    ],
    relatedTerms: ['stockout-detection', 'pos-data-limitations', 'store-operations-automation'],
    relatedSolutions: ['convenience-night-theft', 'convenience-planogram', 'mart-checkout-congestion'],
    metaDescription:
      '편의점 결품·재고 손실 관리 방법. AI 카메라로 결품 실시간 감지, 빠른 알림 발송. POS로 놓치는 매출 손실을 줄이는 SAAI 솔루션.',
  },
  {
    slug: 'convenience-planogram',
    industry: 'convenience',
    industryLabel: '편의점',
    title: '편의점 진열 최적화 (플래노그램)',
    excerpt: '고객 행동 데이터로 어떤 진열이 실제로 매출을 올리는지 검증하는 방법',
    impact: '+18%',
    impactLabel: '진열 최적화 후 매출 증가',
    problem:
      '본사 표준 진열 기준이 우리 매장 상권과 고객에게 최적인지 알 수 없습니다. 진열을 바꿔도 효과를 측정할 방법이 없어 감(感)에만 의존합니다.',
    background: {
      heading: '표준 진열이 항상 답은 아닌 이유',
      body: '프랜차이즈 편의점의 진열 기준은 전국 평균 판매 데이터를 기반으로 설계됩니다. 하지만 오피스 상권 매장과 주택가 가게, 대학가 가게의 고객 구성과 구매 패턴은 완전히 다릅니다. 어떤 상품이 우리 매장 고객에게 가장 눈길을 끄는지, 집었다 내려놓는 상품은 무엇인지 알면 진열 전략을 맞춤화할 수 있습니다.',
    },
    causes: [
      {
        title: '구매 직전 포기 행동 미파악',
        desc: '고객이 상품을 집었다가 내려놓는 행동은 POS에 기록되지 않습니다. 이 상품에 관심은 있지만 가격, 용량, 포장 등 무언가가 구매를 막고 있다는 신호인데 파악할 방법이 없습니다.',
      },
      {
        title: '진열 개편 효과 측정 불가',
        desc: '매대 위치를 바꾸거나 신규 상품을 배치한 후 "더 잘 팔리는 것 같다"는 느낌은 있지만, 정확히 얼마나 효과적이었는지 데이터로 증명할 수 없습니다.',
      },
      {
        title: '주목도 낮은 상품 구역 미인지',
        desc: '어떤 매대는 고객이 거의 지나가지 않는 사각지대에 위치합니다. 하지만 현장에서 직접 보지 않으면 어느 구역이 사각지대인지 파악하기 어렵습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '구역별 고객 접촉 패턴 인식',
        '각 매대 앞에서 고객이 멈추는 빈도, 상품을 집어 드는 횟수, 체류 시간을 자동으로 포착합니다. 픽업 후 내려놓는 행동도 기록해 구매 전 단계 데이터를 수집합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '매대별 전환율 및 주목도 분석',
        '매대별 방문률, 평균 체류 시간, 픽업 대비 구매 전환율을 파악합니다. 진열 개편 전후를 A/B 형태로 비교해 어떤 배치가 더 효과적인지 데이터로 확인합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '진열 최적화 제안 자동 전송',
        '주간 인사이트 리포트에 "C 매대의 픽업률이 높지만 전환율이 낮습니다 — 가격 또는 포장 검토를 권장합니다"와 같은 actionable 제안이 포함됩니다.',
      ),
    ],
    results: [
      { stat: '+18%', label: '진열 최적화 후 매출 증가' },
      { stat: '+31%', label: '픽업률 상승 품목 전환율' },
      { stat: '3주', label: '첫 인사이트 도출 기간' },
    ],
    relatedTerms: ['vmd-optimization', 'store-heatmap', 'purchase-conversion-rate', 'pos-data-limitations'],
    relatedSolutions: ['convenience-inventory-loss', 'drugstore-vmd-optimization', 'mart-zone-conversion'],
    metaDescription:
      '편의점 진열 최적화 방법. AI로 고객 픽업 행동 파악, 매대별 전환율 측정. 표준 진열 대신 우리 매장 데이터 기반 진열 전략 수립. SAAI 무료 상담.',
  },

  // ── 카페·음식점 ──
  {
    slug: 'cafe-low-seat-turnover',
    industry: 'cafe',
    industryLabel: '카페·음식점',
    title: '카페 낮은 좌석 회전율 개선',
    excerpt: '피크 타임 장시간 체류 고객으로 인한 좌석 회전율 문제를 데이터로 해결하는 방법',
    impact: '+22%',
    impactLabel: '피크 타임 좌석 회전율 향상',
    problem:
      '피크 타임에 좌석은 꽉 찼지만 새로운 고객을 받지 못하고 있습니다. 언제 어느 테이블이 얼마나 오래 사용되었는지 파악할 방법이 없어 운영 전략을 세우기 어렵습니다.',
    background: {
      heading: '좌석 회전율 1회 차이가 만드는 매출 차이',
      body: '10테이블 카페에서 피크 타임 2시간 동안 테이블 회전율이 1.5회에서 2.0회로 높아지면, 동일 인원으로 약 33% 더 많은 고객을 응대할 수 있습니다. 하지만 어느 테이블이 얼마나 오래 점유 중인지, 대기 고객이 몇 명인지를 실시간으로 파악하지 못하면 적절한 조치를 취할 수 없습니다.',
    },
    causes: [
      {
        title: '장시간 체류 패턴 파악 불가',
        desc: '특정 고객이 2–3시간 이상 머무르는 경우가 잦지만, 이 패턴이 어느 테이블에서, 어느 시간대에 주로 발생하는지 데이터 없이는 알 수 없습니다.',
      },
      {
        title: '피크 타임 예측 불가',
        desc: '언제 바쁠지 경험적으로는 알지만 정확한 수치 데이터가 없어 직원 배치나 사전 준비를 최적화하기 어렵습니다.',
      },
      {
        title: '테이블별 상태 파악의 어려움',
        desc: '홀이 넓거나 층이 여러 개인 경우, 모든 테이블의 착석 상태를 실시간으로 파악하려면 직원이 자주 홀을 순회해야 해 서비스 집중도가 낮아집니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '테이블별 착석 여부 실시간 인식',
        'AI 카메라가 테이블별 착석 시작과 이석을 자동으로 파악합니다. 각 테이블의 실시간 점유 상태, 현재 체류 시간, 장시간 체류 여부를 대시보드에서 확인할 수 있습니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '좌석 회전율 및 체류 시간 분석',
        '시간대별, 요일별, 테이블별 평균 체류 시간과 회전율을 파악합니다. 장시간 체류가 집중되는 패턴(예: 오후 2–4시 특정 구역)을 확인해 운영 전략 수립에 활용합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '피크 타임 운영 최적화 안내',
        '테이블 체류 시간이 설정 기준(예: 3시간)을 초과하면 푸시 전송이 이루어집니다. 피크 타임 30분 전 예상 혼잡도를 예측해 직원 배치와 사전 준비를 도웁니다.',
      ),
    ],
    results: [
      { stat: '+22%', label: '피크 타임 좌석 회전율 향상' },
      { stat: '-15분', label: '평균 테이블 대기 시간 감소' },
      { stat: '정확도 95%', label: '착석 감지 정확도' },
    ],
    relatedTerms: ['seat-turnover-rate', 'dwell-time', 'footfall-analysis', 'crowd-density-analysis'],
    relatedSolutions: ['cafe-peak-hour-management', 'cafe-customer-wait-time', 'exhibition-visitor-dwell-time'],
    metaDescription:
      '카페 좌석 회전율 개선 방법. AI로 테이블별 체류 시간 자동 측정, 피크 타임 운영 최적화. 22% 회전율 향상 사례. SAAI 무료 상담 신청.',
  },
  {
    slug: 'cafe-peak-hour-management',
    industry: 'cafe',
    industryLabel: '카페·음식점',
    title: '카페 혼잡 시간대 운영 최적화',
    excerpt: '점심·저녁 피크 타임의 혼잡과 대기를 데이터 기반으로 사전에 관리하는 방법',
    impact: '-28%',
    impactLabel: '피크 타임 평균 대기 시간 감소',
    problem:
      '점심 시간과 저녁 피크 타임에 주문이 몰려 대기가 길어지고 고객이 그냥 나갑니다. 언제 얼마나 바쁠지 미리 예측하고 준비하기 어렵습니다.',
    background: {
      heading: '피크 타임 준비의 한계',
      body: '경험상 "오늘은 바빌 것 같다"는 느낌은 있지만, 정확히 몇 시에 몇 명이 올지 예측하기 어렵습니다. 직원을 미리 더 배치하려면 비용이 들고, 너무 적게 배치하면 고객 불만이 생깁니다. 방문 패턴 데이터가 있으면 다음 주 목요일 오후 12시~1시에 얼마나 바쁠지 예측해 정확하게 준비할 수 있습니다.',
    },
    causes: [
      {
        title: '방문 패턴 데이터 부재',
        desc: '매출은 알지만 시간대별 방문자 수, 주문 대기 시간, 고객 이탈 패턴은 기록되지 않습니다. 데이터 없이는 피크 예측이 경험에만 의존하게 됩니다.',
      },
      {
        title: '대기 포기 고객 측정 불가',
        desc: '줄을 보고 그냥 나간 고객은 POS에 흔적이 없습니다. 실제 수요는 매출보다 훨씬 클 수 있는데 이를 파악할 방법이 없습니다.',
      },
      {
        title: '직원 배치의 비효율',
        desc: '피크와 비피크의 방문 차이를 정확히 모르면 인력 배치가 과잉(비피크 시간)이거나 부족(피크 시간)해 비용 낭비와 서비스 저하가 동시에 발생합니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '시간대별 방문객 수 자동 집계',
        '입구 카메라가 시간대별 입장 고객 수를 자동으로 집계합니다. 대기 줄 길이, 줄 해소 시간, 대기 중 이탈 고객 수도 측정합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '방문 패턴 분석 및 피크 예측',
        '2–4주간 누적 데이터로 요일별·시간대별 방문 패턴 모델을 구성합니다. 날씨, 주변 이벤트 등 외부 요인과 연동해 다음 주 혼잡도를 예측합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '피크 예측 안내 및 준비 가이드',
        '피크 타임 30분 전 예상 방문객 수와 준비 사항을 실시간 통보로 전송합니다. "오늘 오후 1시 예상 피크 — 음료 3인 체제 준비 권장"과 같이 구체적인 행동 제안이 포함됩니다.',
      ),
    ],
    results: [
      { stat: '-28%', label: '피크 타임 평균 대기 시간' },
      { stat: '+15%', label: '피크 시간 주문 처리량' },
      { stat: '4주', label: '패턴 예측 모델 완성 기간' },
    ],
    relatedTerms: ['footfall-analysis', 'crowd-density-analysis', 'dwell-time', 'behavior-analysis'],
    relatedSolutions: ['cafe-low-seat-turnover', 'cafe-customer-wait-time', 'mart-checkout-congestion'],
    metaDescription:
      '카페 혼잡 시간대 관리 방법. AI로 피크 타임 방문 패턴 예측, 직원 배치 최적화. 대기 시간 28% 감소 사례. SAAI 무료 상담.',
  },
  {
    slug: 'cafe-customer-wait-time',
    industry: 'cafe',
    industryLabel: '카페·음식점',
    title: '카페 고객 대기 시간 단축',
    excerpt: '대기 중 이탈 고객을 줄이고 주문부터 제공까지 흐름을 최적화하는 방법',
    impact: '+19%',
    impactLabel: '대기 고객 전환율 향상',
    problem:
      '카운터 앞 대기 줄이 길어지면 고객이 그냥 나갑니다. 대기 이탈 고객이 얼마나 되는지, 어떤 조건에서 이탈이 급증하는지 파악하지 못합니다.',
    background: {
      heading: '대기 이탈 고객의 보이지 않는 손실',
      body: '3명 이상 줄이 서면 약 25%의 고객이 포기한다는 연구가 있습니다. 이 고객들은 POS에 기록되지 않지만 실질적인 매출 손실입니다. 특히 카드 결제가 보편화된 현재, 줄 서는 시간에 대한 민감도는 과거보다 높아졌습니다. 빠른 처리를 위한 메뉴판 배치, 모바일 주문 유도, 직원 배치 최적화가 핵심입니다.',
    },
    causes: [
      {
        title: '대기 이탈 고객 규모 미파악',
        desc: '가게 앞을 지나치거나 줄을 보고 포기하는 고객의 수를 측정하지 못해 실제 수요가 얼마나 큰지 알 수 없습니다.',
      },
      {
        title: '병목 구간 식별 어려움',
        desc: '주문, 결제, 픽업 중 어느 단계에서 대기가 집중되는지 파악하지 못해 개선 포인트를 찾기 어렵습니다.',
      },
      {
        title: '동선 혼잡으로 인한 불편',
        desc: '주문 대기 줄과 픽업 대기 구역이 겹치면 혼잡이 가중됩니다. 동선 재배치가 필요하지만 데이터 없이 결정하기 어렵습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '대기 줄 길이 및 이탈 고객 실시간 파악',
        '입구와 카운터 카메라로 대기 줄 인원과 이탈 고객 수를 자동으로 집계합니다. 줄 길이가 임계치를 초과 시 즉시 안내를 발송합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '대기 패턴 분석 및 병목 구간 파악',
        '시간대별 대기 인원, 평균 대기 시간, 이탈률을 파악합니다. 주문/결제/픽업 단계별 소요 시간을 비교해 병목 구간을 찾아냅니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '대기 최소화를 위한 운영 제안',
        '대기 줄이 기준치를 넘으면 추가 카운터 오픈 안내를 전송합니다. 피크 예측 데이터를 기반으로 미리 준비해 대기 발생 자체를 줄이는 전략을 제안합니다.',
      ),
    ],
    results: [
      { stat: '+19%', label: '대기 고객 구매 전환율' },
      { stat: '-22%', label: '평균 대기 줄 길이' },
      { stat: '-31%', label: '대기 이탈 고객 수' },
    ],
    relatedTerms: ['crowd-density-analysis', 'footfall-analysis', 'behavior-analysis'],
    relatedSolutions: ['cafe-peak-hour-management', 'cafe-low-seat-turnover', 'mart-checkout-congestion'],
    metaDescription:
      '카페 대기 시간 단축 방법. AI로 대기 줄 길이 실시간 감지, 이탈 고객 측정, 병목 구간 파악. 고객 전환율 19% 향상 방법 알아보기.',
  },

  // ── 무인매장 ──
  {
    slug: 'unmanned-theft-prevention',
    industry: 'unmanned',
    industryLabel: '무인매장',
    title: '무인매장 도난 방지 시스템',
    excerpt: '사람이 없는 환경에서 AI가 24시간 매장을 지키는 완전 자동화 도난 방지 방법',
    impact: '-35%',
    impactLabel: '무인 운영 손실률 감소',
    problem:
      '무인매장은 운영 비용은 낮지만 도난 위험에 그대로 노출됩니다. 카메라가 있어도 실시간으로 모니터링하는 사람이 없어 도난이 발생해도 다음 날에야 알게 됩니다.',
    background: {
      heading: '무인매장의 구조적 도난 취약성',
      body: '무인매장 도입 기업 대상 설문에서 "도난·손실 관리"가 운영 최대 고민 1위로 꼽혔습니다. 직원이 없기 때문에 고객의 행동을 제지하거나 즉시 대응하기 불가능합니다. 카메라는 증거 수집용이지 예방용이 되지 못합니다. AI 이상 탐지가 이 문제의 구조적 해결책입니다.',
    },
    causes: [
      {
        title: '실시간 모니터링 인력 부재',
        desc: '무인 운영의 특성상 이상 상황을 즉시 발견하고 대응할 사람이 없습니다. 경고나 제지 없이 도난이 완성됩니다.',
      },
      {
        title: '사후 확인만 가능한 CCTV',
        desc: '기존 CCTV는 사건 후 영상을 찾아보는 용도입니다. 실시간으로 이상을 탐지해 알려주는 기능이 없습니다.',
      },
      {
        title: '조용한 누적 손실',
        desc: '한 번에 큰 도난 사고가 아닌 소액 절도가 반복되는 경우, 재고 장부와 실제 재고 차이로만 뒤늦게 발견됩니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '무인 환경 특화 이상 행동 탐지',
        '영업 시간 외 침입, 상품을 봉지나 가방에 넣는 행동, 카메라 가리기 시도, 비정상적인 장시간 체류를 실시간으로 포착합니다. 이상 포착 시 경고 방송을 자동 실행합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '도난 위험 패턴 누적 분석',
        '이상 탐지 이벤트 로그를 확인해 도난 위험이 높은 시간대와 구역을 파악합니다. 반복적으로 이상 행동이 발견되는 고객 패턴을 조사해 예방적 조치를 준비합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '다중 알림 및 원격 대응',
        '이상 확인 시 점주 앱, 경비 업체 연동 알림을 동시에 발송합니다. 원격 잠금, 경보음 활성화, 경고 방송 자동 실행으로 즉각 대응이 가능합니다.',
      ),
    ],
    results: [
      { stat: '-35%', label: '무인 운영 손실률 감소' },
      { stat: '98.2%', label: '이상 감지 정확도' },
      { stat: '15초', label: '알림 발송 소요 시간' },
    ],
    relatedTerms: ['anomaly-detection', 'night-monitoring', 'cctv-analytics', 'store-operations-automation'],
    relatedSolutions: ['convenience-night-theft', 'unmanned-remote-monitoring', 'unmanned-anomaly-detection'],
    metaDescription:
      '무인매장 도난 방지 방법. AI 실시간 이상 감지로 손실률 35% 감소. 15초 알림, 원격 잠금, 경고 방송 자동화. SAAI 무료 상담 신청.',
  },
  {
    slug: 'unmanned-anomaly-detection',
    industry: 'unmanned',
    industryLabel: '무인매장',
    title: '무인매장 이상 감지 자동화',
    excerpt: '침입, 파손, 냉장 이상까지 무인 환경의 모든 이상 상황을 AI가 자동으로 감지하는 방법',
    impact: '-82%',
    impactLabel: '이상 상황 발견 지연 시간 감소',
    problem:
      '냉장 진열대 도어가 열린 채 방치되거나, 물건이 쏟아져 있어도 다음날 출근 전까지 아무도 모릅니다. 작은 이상들이 쌓여 큰 손실이 됩니다.',
    background: {
      heading: '무인매장에서 발생하는 이상 상황의 범위',
      body: '도난 외에도 무인매장에서는 다양한 이상 상황이 발생합니다. 냉장고 도어가 닫히지 않아 식품이 상하거나, 물건이 통로에 쓰러져 안전 위협이 되거나, 음주 고객이 장시간 배회하는 상황 등입니다. 이런 상황들이 발생해도 직원이 없으면 즉각 발견이 불가능합니다.',
    },
    causes: [
      {
        title: '다양한 이상 유형에 대한 개별 대응 불가',
        desc: '도난, 시설 이상, 안전 위협 등 각기 다른 유형의 이상 상황에 단일 솔루션으로 대응하기 어렵습니다.',
      },
      {
        title: '야간·새벽 사각지대',
        desc: '가장 문제가 되는 심야 시간대에 아무도 모니터링하지 않습니다. 문제가 수 시간 동안 지속될 수 있습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '다유형 이상 상황 동시 탐지',
        '도난 의심 행동, 냉장 도어 장시간 열림, 상품 쏟아짐, 장시간 체류, 영업 외 시간 침입을 각각 독립적으로 인식합니다. 이상 유형별로 알림 수신자와 대응 방식을 다르게 설정할 수 있습니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '이상 이벤트 로그 및 통계 분석',
        '일별·주별 이상 이벤트 발생 건수, 유형별 분포, 해결 완료 시간을 집계해 운영 개선 방향을 도출합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '이상 유형별 자동 대응 실행',
        '냉장 도어 장시간 열림 → 경고 방송, 침입 확인 → 경보음 + 점주 알림 + 경비 업체 알림, 상품 쏟아짐 → 담당자 알림과 같이 이상 유형별로 미리 설정한 대응을 자동으로 실행합니다.',
      ),
    ],
    results: [
      { stat: '-82%', label: '이상 상황 발견 지연 시간' },
      { stat: '5가지', label: '동시 감지 이상 유형 수' },
      { stat: '24시간', label: '무중단 자동 모니터링' },
    ],
    relatedTerms: ['anomaly-detection', 'night-monitoring', 'store-operations-automation'],
    relatedSolutions: ['unmanned-theft-prevention', 'unmanned-remote-monitoring', 'convenience-night-theft'],
    metaDescription:
      '무인매장 이상 감지 자동화. 도난·냉장 이상·파손 등 5가지 이상 유형을 AI가 동시에 감지. 발견 지연 82% 감소. SAAI 솔루션 알아보기.',
  },
  {
    slug: 'unmanned-remote-monitoring',
    industry: 'unmanned',
    industryLabel: '무인매장',
    title: '무인매장 원격 관리 및 모니터링',
    excerpt: '스마트폰 하나로 여러 무인매장을 동시에 관리하는 원격 운영 방법',
    impact: '-60%',
    impactLabel: '현장 방문 없이 처리 가능한 이슈 증가',
    problem:
      '여러 개의 무인매장을 운영하면서 각 지점을 주기적으로 방문 확인해야 합니다. 현장 방문 없이는 상태 파악이 불가능해 운영 효율이 낮습니다.',
    background: {
      heading: '다점포 무인매장 운영의 현실',
      body: '무인매장의 경쟁력은 인건비 절감과 24시간 운영에 있지만, 다점포를 운영하는 경우 점검 방문 자체가 새로운 비용이 됩니다. AI 원격 모니터링으로 현장 방문 없이도 모든 지점의 상태를 실시간으로 파악하고, 이슈 발생 시에만 방문하는 방식으로 운영 효율을 높일 수 있습니다.',
    },
    causes: [
      {
        title: '다점포 동시 모니터링 불가',
        desc: '지점이 여러 곳이면 동시에 모든 현장의 상태를 확인할 방법이 없습니다. 문제가 생겨도 직접 방문 전까지 파악이 어렵습니다.',
      },
      {
        title: '불필요한 현장 방문 비용',
        desc: '아무 이상이 없는데도 정기 확인을 위해 방문해야 합니다. 이동 시간과 비용이 낭비됩니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '다점포 실시간 상태 통합 대시보드',
        '여러 무인매장의 현재 상태(방문객 수, 이상 여부, 시설 상태)를 하나의 앱에서 실시간으로 확인합니다. 이상이 있는 지점만 강조 표시되어 우선 확인이 가능합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '지점별 운영 성과 비교 분석',
        '지점별 방문객 수, 이상 탐지 빈도, 결품 발생 건수를 비교해 운영 효율이 낮은 지점과 개선이 필요한 부분을 파악합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '이상 발생 시에만 선택적 방문 알림',
        '일반적인 상태에서는 모든 것이 정상으로 표시됩니다. 방문이 필요한 이상 상황(결품, 시설 이상, 도난 의심)이 확인된 경우에만 실시간 통보로 방문을 권고합니다.',
      ),
    ],
    results: [
      { stat: '-60%', label: '불필요한 현장 방문 감소' },
      { stat: '10개+', label: '동시 모니터링 가능 매장 수' },
      { stat: '15초', label: '이상 알림 발송 시간' },
    ],
    relatedTerms: ['store-operations-automation', 'anomaly-detection', 'cctv-analytics'],
    relatedSolutions: ['unmanned-theft-prevention', 'unmanned-anomaly-detection', 'convenience-night-theft'],
    metaDescription:
      '무인매장 원격 관리 방법. AI로 다점포를 스마트폰 하나로 통합 모니터링. 불필요한 방문 60% 감소. 이상 발생 시에만 방문하는 스마트 운영 방법.',
  },

  // ── 드럭스토어 ──
  {
    slug: 'drugstore-vmd-optimization',
    industry: 'drugstore',
    industryLabel: '드럭스토어',
    title: '드럭스토어 VMD 최적화',
    excerpt: '구역별 고객 체류 데이터로 고마진 상품 구역의 주목도를 높이는 방법',
    impact: '+12%',
    impactLabel: '고마진 구역 구매 단가 상승',
    problem:
      '고마진 스킨케어·헬스케어 구역으로 고객을 유도하고 싶지만 어떤 진열 방식이 효과적인지 데이터로 확인할 방법이 없습니다.',
    background: {
      heading: '드럭스토어에서 VMD 데이터가 중요한 이유',
      body: '드럭스토어는 저마진 생활용품부터 고마진 뷰티·건강기능식품까지 다양한 상품군이 공존합니다. 고마진 구역으로 고객 동선을 유도하는 것이 매출 향상의 핵심이지만, 어떤 진열이 실제로 효과적인지 측정하지 못하면 경험과 직관에만 의존하게 됩니다.',
    },
    causes: [
      {
        title: '구역별 방문률 데이터 부재',
        desc: '어느 구역을 방문하는 고객이 많은지, 어떤 경로로 이동하는지 확인하지 못해 동선 유도 전략을 데이터 기반으로 수립하기 어렵습니다.',
      },
      {
        title: '테스터 효과 측정 불가',
        desc: '테스터 상품 배치가 판매에 실제로 도움이 되는지, 어떤 위치의 테스터가 가장 체험 빈도가 높은지 알 수 없습니다.',
      },
      {
        title: '진열 개편 효과 검증 어려움',
        desc: '시즌마다 진열을 바꾸지만 이전 대비 효과가 좋아졌는지 나빠졌는지 정량적으로 비교하기 어렵습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '구역별 체류 시간 및 테스터 접촉 포착',
        '각 진열 구역의 고객 체류 시간, 방문 빈도, 테스터 상품 접촉 횟수를 자동으로 측정합니다. 어떤 상품 구역이 주목받고 있는지 실시간으로 파악합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '구역 성과 비교 및 동선 패턴 분석',
        '고마진 구역과 저마진 구역의 체류 시간 비율, 방문 후 구매 전환율을 비교합니다. 고객이 어떤 경로로 공간을 돌아다니는지 동선을 확인해 유도 전략을 수립합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        'VMD 최적화 제안 및 효과 측정',
        '진열 개편 후 해당 구역의 체류 시간과 전환율 변화를 자동으로 측정합니다. "A 구역 체류 시간이 전월 대비 18% 증가했습니다" 형태로 개편 효과를 주간 리포트에 포함합니다.',
      ),
    ],
    results: [
      { stat: '+12%', label: '고마진 구역 구매 단가 상승' },
      { stat: '+25%', label: '테스터 구역 체류 시간 증가' },
      { stat: '4주', label: '첫 VMD 인사이트 도출 기간' },
    ],
    relatedTerms: ['vmd-optimization', 'zone-analysis', 'dwell-time', 'purchase-conversion-rate'],
    relatedSolutions: ['drugstore-zone-performance', 'convenience-planogram', 'mart-zone-conversion'],
    metaDescription:
      '드럭스토어 VMD 최적화 방법. AI로 구역별 체류 시간 측정, 테스터 효과 평가, 진열 개편 효과 검증. 고마진 구역 단가 12% 향상 방법.',
  },
  {
    slug: 'drugstore-zone-performance',
    industry: 'drugstore',
    industryLabel: '드럭스토어',
    title: '드럭스토어 구역별 성과 분석',
    excerpt: '매장 내 어떤 구역이 매출에 기여하고 어떤 구역이 사각지대인지 파악하는 방법',
    impact: '+20%',
    impactLabel: '사각지대 구역 방문률 향상',
    problem:
      '공간 안에서도 고객이 잘 가지 않는 구역이 있습니다. 어떤 구역이 사각지대인지, 왜 방문이 적은지 파악하지 못해 레이아웃 최적화를 할 수 없습니다.',
    background: {
      heading: '모든 구역이 동등하게 활용되지 않는다',
      body: '드럭스토어 현장 내에서도 입구 근처와 안쪽 구역, 주 동선과 옆 구역의 방문 빈도는 크게 다릅니다. 이 차이를 파악하지 못하면 비싼 임대 공간의 일부가 낭비되고, 잠재 수익을 창출할 수 있는 상품이 주목받지 못합니다.',
    },
    causes: [
      {
        title: '구역별 방문 빈도 미측정',
        desc: '어느 구역을 몇 명이 방문하는지 데이터가 없어 레이아웃 문제를 파악하기 어렵습니다.',
      },
      {
        title: '사각지대 구역의 상품 배치 비효율',
        desc: '방문이 적은 구역에 어떤 상품을 배치해야 방문을 유도할 수 있는지 알 수 없습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '전 구역 방문률 및 체류 시간 측정',
        '공간을 최대 20개 가상 구역으로 분할해 각 구역의 방문 고객 수, 체류 시간, 재방문 패턴을 자동으로 측정합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '구역별 성과 히트맵 및 이동 경로 분석',
        '전체 공간 구역을 방문률 기반 색상 히트맵으로 시각화합니다. 고객이 어떤 경로로 이동하는지 확인해 사각지대 원인을 파악합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '사각지대 개선 제안',
        '"D 구역 방문률이 평균 대비 40% 낮습니다 — 입구 사인물 추가 또는 프로모션 상품 배치를 권장합니다"와 같은 구체적 개선 제안을 자동으로 제공합니다.',
      ),
    ],
    results: [
      { stat: '+20%', label: '사각지대 구역 방문률 향상' },
      { stat: '3배', label: '레이아웃 개편 효과 측정 속도' },
      { stat: '20개', label: '동시 분석 가능 구역 수' },
    ],
    relatedTerms: ['zone-analysis', 'store-heatmap', 'footfall-analysis', 'vmd-optimization'],
    relatedSolutions: ['drugstore-vmd-optimization', 'mart-zone-conversion', 'exhibition-booth-performance'],
    metaDescription:
      '드럭스토어 구역별 성과 분석. AI로 사각지대 파악, 방문률 히트맵 생성. 사각지대 방문률 20% 향상 방법과 레이아웃 최적화 전략.',
  },
  {
    slug: 'drugstore-tester-interaction',
    industry: 'drugstore',
    industryLabel: '드럭스토어',
    title: '드럭스토어 테스터 상호작용 분석',
    excerpt: '어떤 위치의 테스터가 실제 구매로 이어지는지 데이터로 검증하는 방법',
    impact: '+16%',
    impactLabel: '테스터 구역 구매 전환율 향상',
    problem:
      '테스터 상품을 배치하는 비용은 들지만 실제로 판매에 얼마나 기여하는지 측정하기 어렵습니다. 어떤 테스터가 효과적이고 어떤 위치가 최적인지 알 수 없습니다.',
    background: {
      heading: '테스터의 효과를 데이터로 측정하는 방법',
      body: '드럭스토어·뷰티숍에서 테스터는 구매 결정에 중요한 역할을 합니다. 하지만 어떤 상품의 테스터가 가장 체험 빈도가 높은지, 테스터 체험 후 구매로 이어지는 비율이 얼마나 되는지는 주관적 판단에 의존하게 됩니다.',
    },
    causes: [
      {
        title: '테스터 체험 빈도 미측정',
        desc: '고객이 어떤 테스터를 몇 번이나 체험했는지, 어느 시간대에 테스터 접촉이 많은지 파악하지 못합니다.',
      },
      {
        title: '테스터 위치 최적화 기준 부재',
        desc: '어느 위치에 테스터를 두어야 가장 많은 고객이 접촉하는지 데이터 없이 감으로 배치합니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '테스터 접촉 행동 자동 인식',
        '특정 상품을 집어 드는 행동, 얼굴에 가져가는 테스트 동작을 AI가 포착하고 횟수를 집계합니다. 테스터 구역 체류 시간도 함께 측정합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '테스터 접촉 대비 구매 전환율 분석',
        '테스터를 체험한 고객 중 해당 상품 또는 인근 상품을 구매한 비율을 POS 데이터와 연동해 확인합니다. 시간대별, 테스터 위치별 효과 비교도 가능합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '최적 테스터 배치 제안',
        '체험 빈도는 높지만 구매 전환율이 낮은 테스터 상품을 식별하고 개선 방향(가격 조정, 위치 변경, 함께 배치할 상품 추가)을 제안합니다.',
      ),
    ],
    results: [
      { stat: '+16%', label: '테스터 구역 구매 전환율' },
      { stat: '+34%', label: '테스터 접촉 후 체류 시간' },
      { stat: '2배', label: '테스터 ROI 측정 정확도' },
    ],
    relatedTerms: ['vmd-optimization', 'dwell-time', 'purchase-conversion-rate', 'behavior-analysis'],
    relatedSolutions: ['drugstore-vmd-optimization', 'drugstore-zone-performance', 'convenience-planogram'],
    metaDescription:
      '드럭스토어 테스터 효과 측정. AI로 테스터 접촉 횟수 집계, 구매 전환율 연동 평가. 테스터 구역 전환율 16% 향상 방법과 최적 배치 전략.',
  },

  // ── 대형마트 ──
  {
    slug: 'mart-checkout-congestion',
    industry: 'mart',
    industryLabel: '대형마트',
    title: '마트 계산대 혼잡 관리',
    excerpt: '계산대 앞 대기 줄을 데이터로 예측하고 최적화해 고객 이탈을 방지하는 방법',
    impact: '-32%',
    impactLabel: '계산대 평균 대기 시간 감소',
    problem:
      '피크 타임에 계산대 앞 줄이 길어지면 고객이 카트를 버리고 나가는 경우가 발생합니다. 언제 추가 계산대를 열어야 하는지, 실제 이탈이 얼마나 되는지 파악하기 어렵습니다.',
    background: {
      heading: '마트 계산대 이탈의 실제 비용',
      body: '마트 방문 고객이 상품을 골라 카트에 담은 후 계산대에서 포기하는 경우, 담아놓은 상품을 원래 자리에 돌려놓는 비용(직원 시간)과 매출 손실이 동시에 발생합니다. 대기 시간이 3분을 넘으면 약 15%의 고객이 포기한다는 연구 결과가 있습니다.',
    },
    causes: [
      {
        title: '계산대 수요 예측 불가',
        desc: '언제 몇 명이 계산대로 올지 예측하지 못해 대기 줄이 이미 길어진 후에야 추가 계산대를 열게 됩니다.',
      },
      {
        title: '대기 이탈 고객 측정 불가',
        desc: '줄을 보고 포기한 고객이 얼마나 되는지 파악하지 못해 실제 손실 규모를 알 수 없습니다.',
      },
      {
        title: '비효율적인 계산대 배분',
        desc: '한쪽 계산대는 긴 줄, 다른 쪽은 여유 있는 상황이 발생해도 고객이 자발적으로 이동하지 않으면 해소되지 않습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '계산대별 대기 줄 실시간 모니터링',
        '각 계산대의 대기 인원과 예상 대기 시간을 실시간으로 측정합니다. 설정 임계치(예: 5명 이상)를 초과 시 즉시 안내를 발송합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '피크 타임 계산대 수요 예측',
        '현장 내 방문객 수와 구역별 체류 패턴을 파악해 15–30분 후 계산대로 이동할 예상 인원을 예측합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '계산대 선제적 운영 안내',
        '"15분 후 계산대 예상 대기 15명 — 추가 계산대 오픈 권장" 푸시 전송을 피크 시작 전에 보내 선제적 대응을 지원합니다.',
      ),
    ],
    results: [
      { stat: '-32%', label: '계산대 평균 대기 시간' },
      { stat: '-18%', label: '계산대 이탈 고객 수' },
      { stat: '15분', label: '피크 예측 선행 시간' },
    ],
    relatedTerms: ['crowd-density-analysis', 'footfall-analysis', 'store-operations-automation'],
    relatedSolutions: ['mart-cart-path-optimization', 'cafe-peak-hour-management', 'cafe-customer-wait-time'],
    metaDescription:
      '마트 계산대 혼잡 관리 방법. AI로 대기 줄 실시간 모니터링, 피크 예측으로 선제적 대응. 대기 시간 32% 감소, 이탈 고객 18% 감소 방법.',
  },
  {
    slug: 'mart-cart-path-optimization',
    industry: 'mart',
    industryLabel: '대형마트',
    title: '마트 카트 동선 및 체류 시간 최적화',
    excerpt: '고객이 마트를 어떻게 돌아다니는지 파악해 매출 동선을 설계하는 방법',
    impact: '+20%',
    impactLabel: '평균 체류 시간 및 구매 금액 증가',
    problem:
      '고객이 마트에서 어떤 경로로 이동하는지, 어느 구역에서 오래 머무는지 파악하지 못합니다. 동선 설계가 매출에 미치는 영향을 데이터로 검증할 수 없습니다.',
    background: {
      heading: '마트 동선 설계와 매출의 관계',
      body: '대형마트의 레이아웃은 고객이 가능한 한 많은 구역을 지나가도록 설계됩니다. 필수 품목(달걀, 우유 등)을 공간 안쪽에 배치하는 것이 대표적인 전략입니다. 하지만 실제 고객이 이 설계대로 이동하는지, 어느 구역이 동선에서 자주 생략되는지 데이터 없이는 검증할 수 없습니다.',
    },
    causes: [
      {
        title: '다중 카메라 동선 파악 부재',
        desc: '대형 공간에서는 여러 카메라의 데이터를 연결해야 하나, 이를 통합하는 시스템이 없어 전체 이동 경로를 파악하지 못합니다.',
      },
      {
        title: '구역별 방문률 데이터 부재',
        desc: '어느 구역이 고객 동선에서 자주 생략되는지 파악하지 못해 레이아웃 개선에 데이터 근거가 없습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '다중 카메라 연속 동선 연결',
        '카메라 간 핸드오버 기술로 익명화된 객체의 입장부터 퇴장까지 전체 이동 경로를 연속으로 연결합니다. 익명화 처리로 개인정보 없이 동선 데이터만 수집합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '동선 패턴 및 구역 방문률 분석',
        '가장 많이 이용되는 동선과 생략되는 구역을 히트맵으로 시각화합니다. 시간대별 동선 변화도 파악해 레이아웃 개편 방향을 결정합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '동선 최적화 레이아웃 제안',
        '방문률이 낮은 구역의 원인(접근성 불편, 사인물 부족 등)을 진단하고 구체적인 개선 제안을 제공합니다.',
      ),
    ],
    results: [
      { stat: '+20%', label: '평균 체류 시간 증가' },
      { stat: '+15%', label: '구역별 방문률 균형 향상' },
      { stat: '3주', label: '동선 패턴 분석 완성 기간' },
    ],
    relatedTerms: ['zone-analysis', 'store-heatmap', 'dwell-time', 'behavior-analysis'],
    relatedSolutions: ['mart-checkout-congestion', 'mart-zone-conversion', 'drugstore-zone-performance'],
    metaDescription:
      '마트 카트 동선 최적화 방법. AI 다중 카메라 연속 동선 추적으로 이동 경로 파악. 체류 시간 20% 증가, 사각지대 방문률 향상 방법 알아보기.',
  },
  {
    slug: 'mart-zone-conversion',
    industry: 'mart',
    industryLabel: '대형마트',
    title: '마트 구역별 전환율 분석',
    excerpt: '어느 구역의 방문이 실제 구매로 이어지는지 파악해 배치를 최적화하는 방법',
    impact: '+17%',
    impactLabel: '고마진 구역 전환율 향상',
    problem:
      '방문객은 많은데 특정 구역의 매출 전환율이 낮습니다. 어떤 구역에서 고객이 구매를 포기하는지, 왜 그런지 파악하지 못합니다.',
    background: {
      heading: '구역별 전환율 차이가 드러내는 것',
      body: '같은 방문객 수여도 어떤 구역에서는 70%가 구매하고, 어떤 구역에서는 20%만 구매합니다. 이 차이는 진열 방식, 가격 표시, 상품 구성, 접근성의 문제를 드러냅니다. 구역별 전환율을 파악하면 개선 포인트를 정확히 찾을 수 있습니다.',
    },
    causes: [
      {
        title: '구역별 방문 대비 구매 데이터 미연동',
        desc: 'POS 매출과 구역별 방문자 수 데이터가 연동되지 않아 전환율을 계산할 수 없습니다.',
      },
      {
        title: '구매 포기 원인 불명확',
        desc: '방문은 했지만 구매하지 않은 고객이 왜 포기했는지 원인을 확인하기 어렵습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '구역별 방문객 수 및 체류 행동 측정',
        '각 구역을 방문한 고객 수, 평균 체류 시간, 상품 접촉(픽업) 빈도를 자동으로 측정합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        'POS 연동 구역별 전환율 계산',
        '구역별 방문객 수와 POS 해당 카테고리 매출을 연동해 구역별 전환율을 산출합니다. 전환율 낮은 구역의 원인 진단(체류 시간, 픽업 대비 구매율)을 제공합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '전환율 개선 구역 우선순위 제안',
        '"E 구역 방문률 상위 30%이지만 전환율 하위 20% — 가격 표시 또는 상품 구성 개선 필요" 형태의 우선순위 개선 과제를 자동으로 제안합니다.',
      ),
    ],
    results: [
      { stat: '+17%', label: '고마진 구역 전환율' },
      { stat: '3배', label: '개선 과제 파악 속도' },
      { stat: '20개', label: '동시 분석 가능 구역 수' },
    ],
    relatedTerms: ['zone-analysis', 'purchase-conversion-rate', 'vmd-optimization'],
    relatedSolutions: ['mart-checkout-congestion', 'mart-cart-path-optimization', 'drugstore-vmd-optimization'],
    metaDescription:
      '마트 구역별 전환율 분석 방법. AI로 방문객 수와 POS 매출 연동, 구역별 전환율 자동 산출. 고마진 구역 전환율 17% 향상 전략.',
  },

  // ── 전시 공간 ──
  {
    slug: 'exhibition-visitor-dwell-time',
    industry: 'exhibition',
    industryLabel: '전시 공간',
    title: '전시 공간 방문객 체류 시간 분석',
    excerpt: '어떤 전시물이 관람객의 주목을 끌고 얼마나 오래 머무르게 하는지 측정하는 방법',
    impact: '+28%',
    impactLabel: '관람 만족도 향상',
    problem:
      '어떤 전시물이 관람객에게 가장 인상적인지, 어느 구역에서 오래 머무르는지 정량적으로 알 방법이 없습니다. 행사 후 개선점을 데이터로 도출하기 어렵습니다.',
    background: {
      heading: '전시 기획에서 데이터의 역할',
      body: '전시 기획자는 어떤 배치가 관람객의 동선과 관심을 자연스럽게 유도하는지 항상 고민합니다. 하지만 행사 후 설문지나 직원 관찰에 의존하면 객관성이 부족합니다. 체류 시간 데이터는 관람객의 실제 반응을 있는 그대로 보여주는 가장 객관적인 지표입니다.',
    },
    causes: [
      {
        title: '부스·작품별 주목도 정량화 불가',
        desc: '어떤 작품 앞에 얼마나 오래 서 있었는지 수작업으로 측정하기 어렵습니다.',
      },
      {
        title: '관람 동선 분석 부재',
        desc: '관람객이 전시 공간을 어떤 순서로 돌아다니는지 확인하지 못해 다음 배치 전략에 활용하기 어렵습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '부스·작품별 체류 시간 자동 측정',
        '전시 공간 내 각 구역(부스, 작품, 설치물)의 방문객 수와 체류 시간을 실시간으로 자동 집계합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '관람 동선 및 주목도 분석',
        '관람객의 이동 경로와 체류 시간을 히트맵으로 시각화합니다. 어떤 작품이 가장 주목받았는지, 어떤 구역이 상대적으로 방문이 적었는지 파악합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '행사 종료 후 인사이트 리포트 자동 생성',
        '행사 기간 동안의 방문객 통계, 피크 시간, 구역별 주목도 순위 등이 담긴 종합 리포트를 자동으로 생성해 다음 행사 기획에 활용합니다.',
      ),
    ],
    results: [
      { stat: '+28%', label: '관람 만족도 향상' },
      { stat: '전 부스', label: '실시간 체류 시간 측정' },
      { stat: '자동', label: '행사 종료 후 리포트 생성' },
    ],
    relatedTerms: ['dwell-time', 'footfall-analysis', 'zone-analysis', 'crowd-density-analysis'],
    relatedSolutions: ['exhibition-booth-performance', 'exhibition-crowd-flow', 'cafe-low-seat-turnover'],
    metaDescription:
      '전시 공간 관람객 체류 시간 분석. AI로 부스·작품별 주목도 측정, 관람 동선 파악. 관람 만족도 28% 향상. 행사 기획 최적화 방법.',
  },
  {
    slug: 'exhibition-booth-performance',
    industry: 'exhibition',
    industryLabel: '전시 공간',
    title: '전시 부스 성과 분석',
    excerpt: '각 참가 기업 부스의 방문객 유치 성과를 객관적 데이터로 측정하는 방법',
    impact: '3배',
    impactLabel: '부스 성과 측정 정확도 향상',
    problem:
      '박람회·전시회에서 각 부스가 얼마나 많은 방문객을 유치했는지 객관적으로 측정하기 어렵습니다. 참가사 만족도와 재참가 결정에 데이터 근거가 없습니다.',
    background: {
      heading: '부스 성과 측정의 중요성',
      body: '전시 주최사 입장에서 참가 기업에게 "우리 행사가 얼마나 효과적이었는지" 데이터로 보여줄 수 있다면 재참가율과 참가비 정당성을 높일 수 있습니다. 참가사 입장에서도 부스 투자 대비 효과를 정량적으로 평가할 수 있습니다.',
    },
    causes: [
      {
        title: '주관적 성과 측정',
        desc: '부스 방문객 수를 직원이 수작업으로 집계하거나 명함 수로 대략 추정합니다. 정확도가 낮고 비교 기준이 없습니다.',
      },
      {
        title: '부스 간 방문객 분포 파악 불가',
        desc: '어떤 부스가 상대적으로 방문이 많은지, 위치의 영향이 얼마나 큰지 객관적으로 파악하기 어렵습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '부스별 방문객 수 자동 집계',
        '전시 공간 전체 카메라로 부스별 방문객 수, 체류 시간, 혼잡도를 자동으로 측정합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '부스 성과 비교 및 위치 효과 분석',
        '부스 위치(입구 근처 vs 안쪽), 크기, 디자인 요소별 방문률 차이를 비교합니다. 동일 행사 내 부스 성과 순위를 객관적으로 산출합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '참가사별 성과 리포트 자동 제공',
        '행사 종료 후 각 참가사에게 "귀사 부스 방문객 수, 평균 체류 시간, 전체 대비 성과 비교" 리포트를 자동으로 제공합니다.',
      ),
    ],
    results: [
      { stat: '3배', label: '부스 성과 측정 정확도' },
      { stat: '전 부스', label: '방문객 수 자동 집계' },
      { stat: '자동', label: '행사 종료 후 리포트 자동화' },
    ],
    relatedTerms: ['footfall-analysis', 'dwell-time', 'zone-analysis'],
    relatedSolutions: ['exhibition-visitor-dwell-time', 'exhibition-crowd-flow'],
    metaDescription:
      '전시 부스 성과 분석 방법. AI로 부스별 방문객 수 자동 집계, 성과 비교 리포트 자동 생성. 참가사 만족도 향상과 재참가율 제고 방법.',
  },
  {
    slug: 'exhibition-crowd-flow',
    industry: 'exhibition',
    industryLabel: '전시 공간',
    title: '전시 공간 인파 흐름 관리',
    excerpt: '특정 구역의 과밀 집중을 실시간으로 감지하고 관람 흐름을 분산하는 방법',
    impact: '-25%',
    impactLabel: '관람 혼잡 발생 건수 감소',
    problem:
      '인기 부스나 특정 구역에 관람객이 집중되어 혼잡이 발생합니다. 실시간으로 파악하고 안내 방송이나 직원 배치로 분산하기 어렵습니다.',
    background: {
      heading: '전시 혼잡의 두 가지 문제',
      body: '과밀 혼잡은 관람 경험을 저하시킬 뿐 아니라 안전 위험도 초래합니다. 반면 방문이 적은 구역은 참가 기업의 투자 대비 성과가 낮아집니다. 실시간 혼잡도 데이터가 있으면 안내 방송이나 직원 배치로 흐름을 분산해 이 두 가지 문제를 동시에 개선할 수 있습니다.',
    },
    causes: [
      {
        title: '실시간 혼잡도 파악 불가',
        desc: '어느 구역에 지금 몇 명이 집중되어 있는지 실시간으로 파악하는 수단이 없습니다.',
      },
      {
        title: '분산 조치 타이밍 늦음',
        desc: '혼잡이 이미 발생한 후에야 직원이 발견하고 조치를 취해 효과가 제한됩니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '구역별 실시간 혼잡도 모니터링',
        '전시 공간 전체 구역의 동시 체류 인원을 실시간으로 측정합니다. 설정 임계치를 초과 시 푸시 전송이 이루어집니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '인파 흐름 패턴 분석',
        '행사 기간 중 인파 집중이 발생하는 시간대, 구역, 원인을 파악합니다. 다음 행사의 레이아웃 설계에 활용합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '혼잡 조기 포착 및 분산 알림',
        '혼잡이 예상되는 15분 전에 담당자에게 실시간 통보를 발송합니다. "A 구역 혼잡 예상 — 인근 직원 배치 또는 안내 방송 권장" 형태로 구체적인 대응 방안을 제안합니다.',
      ),
    ],
    results: [
      { stat: '-25%', label: '혼잡 발생 건수 감소' },
      { stat: '15분', label: '혼잡 예측 선행 시간' },
      { stat: '전 구역', label: '실시간 모니터링 범위' },
    ],
    relatedTerms: ['crowd-density-analysis', 'footfall-analysis', 'anomaly-detection'],
    relatedSolutions: ['exhibition-visitor-dwell-time', 'exhibition-booth-performance', 'mart-checkout-congestion'],
    metaDescription:
      '전시 공간 인파 흐름 관리 방법. AI로 구역별 혼잡도 실시간 모니터링, 15분 전 예측 알림. 혼잡 발생 25% 감소. 전시·박람회 운영 최적화 방법.',
  },

  // ── 물류·창고 ──
  {
    slug: 'logistics-worker-safety',
    industry: 'logistics',
    industryLabel: '물류·창고',
    title: '물류 작업자 안전 모니터링',
    excerpt: 'AI 카메라로 창고 내 안전 사각지대와 위험 행동을 실시간으로 감지하는 방법',
    impact: '-45%',
    impactLabel: '안전 사고 위험 요소 감소',
    problem:
      '넓은 물류센터에서 모든 작업 구역의 안전을 동시에 관찰하기 어렵습니다. 안전 규정 위반(보호구 미착용, 위험 구역 진입)을 실시간으로 파악하고 대응하는 체계가 없습니다.',
    background: {
      heading: '물류센터 안전 사고의 현실',
      body: '물류·창고 업종은 산업재해 발생률이 높은 업종 중 하나입니다. 지게차 충돌, 높은 곳에서의 낙하, 무거운 물체에 깔리는 사고가 빈번합니다. 안전 관리자 1명이 수백 평 넓이의 창고를 동시에 확인할 수 없습니다. AI 카메라가 이 문제를 해결합니다.',
    },
    causes: [
      {
        title: '광범위한 관찰 범위',
        desc: '물류센터의 넓은 면적을 소수의 안전 관리자가 동시에 확인하기 불가능합니다.',
      },
      {
        title: '보호구 착용 여부 실시간 확인 불가',
        desc: '헬멧, 조끼 등 안전 보호구 착용 여부를 모든 작업자에 대해 실시간으로 확인하기 어렵습니다.',
      },
      {
        title: '위험 구역 접근 통제 어려움',
        desc: '지게차 운행 구역, 고압 전기 구역 등 출입 제한 구역에 대한 접근을 실시간으로 확인하고 제한하기 어렵습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '보호구 착용 및 위험 구역 접근 실시간 확인',
        '작업자의 헬멧·안전 조끼 착용 여부를 AI가 자동으로 인식합니다. 위험 구역(가상 경계선 설정)에 사람이 접근하면 자동으로 경보음과 알림을 발송합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '구역별 안전 위반 패턴 분석',
        '안전 위반이 발생하는 구역, 시간대, 작업 유형을 누적 집계합니다. 반복적으로 위반이 발생하는 패턴을 파악해 근본적인 환경 개선에 활용합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '실시간 경보 및 자동 기록',
        '안전 위반 확인 시 자동으로 현장 경보음 + 관리자 앱 푸시 전송이 이루어집니다. 모든 이벤트는 자동으로 기록되어 안전 감사와 규정 준수 증빙에 활용합니다.',
      ),
    ],
    results: [
      { stat: '-45%', label: '안전 위험 요소 감지 지연 감소' },
      { stat: '24시간', label: '무중단 자동 모니터링' },
      { stat: '24/7', label: '위반 이벤트 자동 기록' },
    ],
    relatedTerms: ['anomaly-detection', 'crowd-density-analysis', 'store-operations-automation'],
    relatedSolutions: ['logistics-efficiency-zones', 'logistics-ppe-compliance', 'unmanned-anomaly-detection'],
    metaDescription:
      '물류 작업자 안전 모니터링. AI로 보호구 미착용·위험 구역 접근 실시간 감지. 안전 위험 요소 45% 감소. 물류센터 24시간 자동 안전 관리 방법.',
  },
  {
    slug: 'logistics-efficiency-zones',
    industry: 'logistics',
    industryLabel: '물류·창고',
    title: '물류 구역별 작업 효율 분석',
    excerpt: '어느 구역에서 작업 병목이 발생하는지 데이터로 파악하고 물류 동선을 최적화하는 방법',
    impact: '+15%',
    impactLabel: '구역별 처리량 효율 향상',
    problem:
      '특정 구역에서 작업이 몰리거나 대기가 발생하는데 정확한 원인을 파악하기 어렵습니다. 작업자 동선이 최적화되어 있는지 데이터 없이 판단하기 어렵습니다.',
    background: {
      heading: '물류 효율의 데이터화',
      body: '물류센터의 처리 효율은 각 구역의 처리량, 대기 시간, 동선 거리에 따라 결정됩니다. 특정 피킹 구역에서 작업자가 불필요하게 길게 이동하거나, 특정 통로가 병목이 되는 경우를 데이터로 확인하면 레이아웃 최적화와 작업 배분 개선이 가능합니다.',
    },
    causes: [
      {
        title: '구역별 처리량 실시간 측정 부재',
        desc: '각 구역에서 시간당 처리되는 물량을 실시간으로 집계하는 수단이 없습니다.',
      },
      {
        title: '작업 병목 구간 파악 어려움',
        desc: '어느 구역에서 작업이 막히고 대기가 발생하는지 관리자가 실시간으로 파악하기 어렵습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '구역별 작업자 분포 및 이동 패턴 측정',
        '물류센터 내 각 구역의 작업자 수, 평균 체류 시간, 이동 거리를 자동으로 측정합니다. 특정 구역 과밀이나 공백을 실시간으로 파악합니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '작업 병목 구간 및 효율 저하 패턴 분석',
        '시간대별 구역별 처리량을 집계해 병목이 발생하는 시간대와 구역을 파악합니다. 불필요하게 긴 이동 동선을 식별해 레이아웃 개선 방향을 제안합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        '실시간 작업 배분 최적화 알림',
        '특정 구역에 작업자가 과밀하거나 부족할 때 즉시 안내를 발송합니다. 주간 리포트로 구역별 효율 트렌드를 제공해 시프트 계획 최적화를 지원합니다.',
      ),
    ],
    results: [
      { stat: '+15%', label: '구역별 처리량 효율 향상' },
      { stat: '-20%', label: '불필요 이동 거리 감소' },
      { stat: '전 구역', label: '실시간 효율 모니터링' },
    ],
    relatedTerms: ['zone-analysis', 'footfall-analysis', 'store-operations-automation'],
    relatedSolutions: ['logistics-worker-safety', 'logistics-ppe-compliance'],
    metaDescription:
      '물류 구역별 작업 효율 분석. AI로 작업 병목 구간 진단, 작업자 동선 최적화. 처리량 15%, 불필요 이동 20% 감소. 물류센터 운영 효율화 방법.',
  },
  {
    slug: 'logistics-ppe-compliance',
    industry: 'logistics',
    industryLabel: '물류·창고',
    title: '물류 보호구 착용 준수 자동화',
    excerpt: 'AI로 모든 작업자의 안전 보호구 착용 여부를 자동으로 확인하는 방법',
    impact: '-70%',
    impactLabel: '보호구 미착용 사고 위험 감소',
    problem:
      '안전 규정상 모든 작업자가 헬멧·안전화·형광 조끼를 착용해야 하지만 이를 일일이 확인하기 어렵습니다. 특히 야간·새벽 근무나 인력이 많은 경우 관리가 어렵습니다.',
    background: {
      heading: 'PPE 준수가 산업재해를 줄이는 방법',
      body: '산업안전보건공단 데이터에 따르면 물류·제조업 사망 사고의 상당수가 개인 보호구(PPE) 미착용 상태에서 발생합니다. 규정은 있지만 높은 준수율을 사람이 일일이 확인하기는 현실적으로 어렵습니다. AI가 이 역할을 자동화하면 관리자의 부담을 줄이면서 준수율을 높일 수 있습니다.',
    },
    causes: [
      {
        title: '전 작업자 실시간 확인 불가',
        desc: '작업자가 많고 구역이 넓으면 모든 사람의 보호구 착용 여부를 안전 관리자 1명이 확인할 수 없습니다.',
      },
      {
        title: '비준수 기록 및 추적 어려움',
        desc: '누가, 언제, 어디서 보호구를 착용하지 않았는지 기록하지 못해 반복 위반자 파악과 교육이 어렵습니다.',
      },
    ],
    steps: [
      PRODUCT_STEPS.storecare(
        '보호구 착용 여부 AI 자동 검출',
        '카메라가 작업자의 헬멧, 안전 조끼, 안전화 착용 여부를 자동으로 확인합니다. 미착용 발견 시 경고 방송 + 관리자 알림이 자동 발송됩니다.',
      ),
      PRODUCT_STEPS.storeinsight(
        '구역별·시간대별 준수율 분석',
        '어느 구역에서 어느 시간대에 미착용이 많은지 확인합니다. 반복적으로 미착용이 발견되는 패턴을 파악해 집중 교육 대상과 환경 개선 방향을 제안합니다.',
      ),
      PRODUCT_STEPS.storeagent(
        'PPE 준수율 자동 리포트',
        '일별·주별 PPE 준수율, 미착용 이벤트 수, 구역별 현황을 자동 리포트로 제공합니다. 산업안전보건법 준수 증빙 자료로도 활용 가능합니다.',
      ),
    ],
    results: [
      { stat: '-70%', label: 'PPE 미착용 이벤트 감소' },
      { stat: '+90%', label: 'PPE 준수율 달성' },
      { stat: '24/7', label: '미착용 이벤트 자동 기록' },
    ],
    relatedTerms: ['anomaly-detection', 'store-operations-automation', 'cctv-analytics'],
    relatedSolutions: ['logistics-worker-safety', 'logistics-efficiency-zones'],
    metaDescription:
      '물류 보호구 착용 준수 자동화. AI로 헬멧·조끼 착용 여부 자동 감지, PPE 준수율 90% 달성. 미착용 이벤트 70% 감소. 산업안전보건법 준수 방법.',
  },
];

export const solutionsBySlug: Record<string, SolutionPage> = Object.fromEntries(
  solutionsData.map((s) => [s.slug, s]),
);

export const solutionsByIndustry: Record<string, SolutionPage[]> = solutionsData.reduce(
  (acc, s) => {
    if (!acc[s.industry]) acc[s.industry] = [];
    acc[s.industry].push(s);
    return acc;
  },
  {} as Record<string, SolutionPage[]>,
);
