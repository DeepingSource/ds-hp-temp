export type GlossaryCategory = 'ai' | 'analytics' | 'retail' | 'operations';

export interface GlossaryTerm {
  slug: string;
  title: string;
  englishTitle: string;
  category: GlossaryCategory;
  categoryLabel: string;
  tagline: string;
  definition: string;
  body: {
    heading: string;
    paragraphs: string[];
  }[];
  saaiUsage: string;
  relatedTerms: string[];
  relatedIndustries: string[];
  metaDescription: string;
}

export const glossaryCategoryLabel: Record<GlossaryCategory, string> = {
  ai: 'AI 기술',
  analytics: '데이터 분석',
  retail: '리테일',
  operations: '매장 운영',
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: 'store-heatmap',
    title: '매장 히트맵',
    englishTitle: 'Store Heatmap',
    category: 'analytics',
    categoryLabel: '데이터 분석',
    tagline: '고객이 어디에 오래 머물렀는지 색상으로 보는 공간 데이터',
    definition:
      '매장 히트맵(Store Heatmap)이란 매장 내 특정 구역에 고객이 얼마나 오래 머물렀는지, 얼마나 자주 방문했는지를 색상 농도로 시각화한 데이터 지도입니다. 빨간색 구역은 집중 체류 지점, 파란색은 방문이 드문 사각지대를 의미합니다.',
    body: [
      {
        heading: '매장 히트맵이 필요한 이유',
        paragraphs: [
          '매장 운영자가 가장 많이 받는 질문 중 하나는 "어떤 매대가 실제로 고객의 눈길을 끄는가?"입니다. 매출 데이터는 무엇이 팔렸는지 알려주지만, 팔리지 않은 이유는 알려주지 않습니다. 히트맵은 바로 그 공백을 채워줍니다.',
          '고객이 특정 구역에서 30초 이상 머무르는 비율이 높다면 그 구역은 주목도가 높은 "골든 존"입니다. 반대로 체류 시간이 짧고 이동 경로에서 자주 생략된다면 진열 방식이나 위치를 재검토해야 한다는 신호입니다.',
          '히트맵을 활용하면 진열 개편 전후를 비교하거나, 시간대별 고객 행동을 분석해 직원 배치와 재고 보충 타이밍을 최적화할 수 있습니다.',
        ],
      },
      {
        heading: '히트맵 데이터를 얻는 방법',
        paragraphs: [
          '과거에는 와이파이 신호 추적이나 전용 센서 설치가 필요했습니다. 하지만 최근에는 기존 CCTV 영상을 AI가 실시간으로 분석해 별도 하드웨어 없이 히트맵을 생성하는 방식이 확산되고 있습니다.',
          '익명화 기반 AI는 개인을 특정하지 않고 "이 구역에 누군가 있었다"는 점유 정보만 추출합니다. 이를 통해 개인정보보호법을 준수하면서도 고해상도 공간 분석이 가능합니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI의 store care는 기존 CCTV 영상을 실시간으로 분석해 구역별 체류 히트맵을 자동 생성합니다. 얼굴이나 개인정보는 일절 수집하지 않으며, 익명화된 행동 데이터만 활용합니다. 히트맵 데이터는 store insight 대시보드에서 시간대별, 요일별로 비교 분석할 수 있어 진열 개편 의사결정의 근거로 사용됩니다.',
    relatedTerms: ['dwell-time', 'zone-analysis', 'purchase-conversion-rate', 'anonymized-cctv'],
    relatedIndustries: ['convenience', 'drugstore', 'mart'],
    metaDescription:
      '매장 히트맵이란? 고객 체류 패턴을 색상으로 시각화하는 공간 분석 기술. CCTV AI 분석으로 진열 최적화와 매출 개선에 활용하는 방법을 알아보세요.',
  },
  {
    slug: 'anonymized-cctv',
    title: '익명화 CCTV 분석',
    englishTitle: 'Anonymized CCTV Analytics',
    category: 'ai',
    categoryLabel: 'AI 기술',
    tagline: '얼굴·개인정보 없이 행동 패턴만 추출하는 AI 분석 기술',
    definition:
      '익명화 CCTV 분석이란 CCTV 영상에서 개인을 식별할 수 있는 정보(얼굴, 이름, 번호판 등)를 AI가 자동으로 제거하거나 처리하지 않고, 위치·이동·체류 등 행동 패턴 데이터만 추출하는 기술입니다. 개인정보보호법을 준수하면서 매장 분석에 필요한 인사이트를 확보할 수 있습니다.',
    body: [
      {
        heading: '익명화 CCTV가 필요한 법적 배경',
        paragraphs: [
          '국내 개인정보보호법에 따르면 CCTV로 특정인을 식별하거나 그 영상을 분석·보관하려면 정보주체의 동의가 필요합니다. 불특정 다수가 방문하는 매장에서 개별 동의를 받는 것은 현실적으로 불가능합니다.',
          '익명화 AI는 이 문제를 근본적으로 해결합니다. 영상에서 "어떤 사람"이 아닌 "어떤 행동"만을 추출하기 때문에 개인정보에 해당하는 데이터 자체를 수집하지 않습니다. 법적 리스크 없이 매장 운영 데이터를 확보할 수 있는 이유입니다.',
        ],
      },
      {
        heading: '익명화 처리의 기술적 원리',
        paragraphs: [
          'AI 모델은 영상 내 사람을 감지하되 얼굴 특징점을 추출하지 않습니다. 대신 실루엣·골격(스켈레톤) 또는 바운딩 박스로 사람의 위치와 이동만을 분석합니다. 이 데이터는 좌표값과 타임스탬프로만 구성되어 있어 원본 영상과 연결해도 개인 식별이 불가합니다.',
          '고급 익명화 시스템은 실시간 엣지 처리(카메라 또는 로컬 서버)를 통해 원본 영상이 외부 서버로 전송되기 전 모든 식별 가능 정보를 제거합니다. SAAI의 경우 원본 CCTV 영상은 매장 내 장치에만 머물고, 분석된 행동 데이터만 암호화되어 클라우드로 전송됩니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI의 모든 제품(store care, store insight, store agent)은 익명화 엔진을 기반으로 동작합니다. 카메라로부터 영상을 받는 순간 익명화 처리가 이루어지며, SAAI 서버에는 행동 패턴 데이터만 저장됩니다. 개인정보보호위원회 가이드라인을 준수하는 구조로 설계되어 있습니다.',
    relatedTerms: ['computer-vision', 'store-heatmap', 'cctv-analytics', 'retail-ai'],
    relatedIndustries: ['convenience', 'unmanned', 'logistics'],
    metaDescription:
      '익명화 CCTV 분석이란? 얼굴·개인정보 없이 행동 패턴만 추출하는 AI 기술. 개인정보보호법 준수 방법과 매장 분석에 활용하는 법을 알아보세요.',
  },
  {
    slug: 'dwell-time',
    title: '체류 시간 분석',
    englishTitle: 'Dwell Time Analysis',
    category: 'analytics',
    categoryLabel: '데이터 분석',
    tagline: '고객이 특정 공간에 머문 시간으로 관심도를 측정하는 지표',
    definition:
      '체류 시간(Dwell Time)이란 고객이 매장 또는 매장 내 특정 구역에 머문 총 시간을 의미합니다. 체류 시간이 길수록 해당 공간에 대한 관심도나 구매 고민이 높다고 해석할 수 있으며, 이를 분석해 매장 레이아웃과 진열 전략을 최적화합니다.',
    body: [
      {
        heading: '체류 시간이 매출에 미치는 영향',
        paragraphs: [
          '소매 업계 연구에 따르면 매장 내 평균 체류 시간이 1분 늘어날 때 구매 금액이 약 2–3% 증가하는 상관관계가 있습니다. 체류 시간은 단순한 방문 데이터가 아니라 구매 의도의 선행 지표입니다.',
          '반면 특정 구역에서의 체류 시간이 지나치게 짧다면 해당 상품에 관심을 가졌지만 구매하지 않았거나, 심지어 관심을 갖기 전에 이동했다는 의미일 수 있습니다. 이는 진열 위치나 상품 구성을 재검토해야 한다는 신호입니다.',
        ],
      },
      {
        heading: '체류 시간 분석의 실제 활용',
        paragraphs: [
          '카페·음식점에서는 테이블별 체류 시간을 측정해 좌석 회전율을 파악합니다. 특정 테이블의 회전율이 현저히 낮다면 위치, 조명, 소음 등 환경 요인을 점검할 수 있습니다.',
          '전시 공간에서는 부스별 평균 체류 시간으로 어떤 전시물이 가장 주목받는지 정량적으로 측정합니다. 행사 후 데이터를 분석해 다음 기획에 반영할 수 있습니다.',
          '편의점·드럭스토어에서는 고마진 상품 구역의 체류 시간을 높이는 것이 매출 증대의 핵심 전략입니다. 샘플·테스터 배치, 동선 설계가 체류 시간에 직접적인 영향을 줍니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI store insight는 구역별 체류 시간을 자동 측정해 시간대, 요일, 이벤트 전후 비교를 실시간 대시보드로 제공합니다. store care의 실시간 감지 데이터를 기반으로 평균 체류 시간, 최장 체류 위치, 구역 이탈률 등 다차원 분석이 가능합니다.',
    relatedTerms: ['store-heatmap', 'zone-analysis', 'seat-turnover-rate', 'footfall-analysis'],
    relatedIndustries: ['cafe', 'exhibition', 'drugstore'],
    metaDescription:
      '체류 시간 분석이란? 고객이 특정 구역에 머문 시간으로 관심도를 측정하는 핵심 리테일 지표. 매장 레이아웃 최적화와 매출 개선에 활용하는 방법을 설명합니다.',
  },
  {
    slug: 'purchase-conversion-rate',
    title: '구매 전환율',
    englishTitle: 'Purchase Conversion Rate',
    category: 'retail',
    categoryLabel: '리테일',
    tagline: '방문한 고객 중 실제로 구매한 비율, 매장 효율의 핵심 지표',
    definition:
      '구매 전환율(Purchase Conversion Rate)이란 매장에 입장한 전체 방문객 중 실제로 구매 행동(결제)으로 이어진 고객의 비율입니다. 방문 100명 중 30명이 구매했다면 전환율은 30%입니다. 매장의 진열, 동선, 상품 구성, 직원 서비스의 종합적 효율을 나타내는 지표입니다.',
    body: [
      {
        heading: '구매 전환율의 업종별 평균',
        paragraphs: [
          '업종에 따라 구매 전환율의 기준이 크게 다릅니다. 편의점·슈퍼마켓은 구매 목적으로 방문하는 경우가 많아 전환율이 50–70%에 달하는 경우도 있습니다. 반면 드럭스토어나 뷰티숍은 탐색형 방문이 많아 20–40%가 평균적입니다.',
          '중요한 것은 절대적인 수치보다 변화 추세입니다. 진열을 바꾼 뒤 전환율이 상승했다면 긍정적인 변화입니다. 특정 시간대에 전환율이 급락한다면 그 시간대의 서비스 품질이나 진열 상태를 점검해야 합니다.',
        ],
      },
      {
        heading: '전환율을 높이는 요소들',
        paragraphs: [
          '고객 체류 시간과 구매 전환율은 강한 상관관계가 있습니다. 체류 시간이 길수록 더 많은 상품을 탐색하고, 충동 구매 가능성도 높아집니다. 동선 설계는 고객이 매장을 충분히 둘러보도록 유도하는 데 핵심입니다.',
          '집고 내려놓는 행동(Pick-up & Put-down)을 AI가 감지하면 구매 직전 단계를 포착할 수 있습니다. 특정 상품의 픽업률이 높지만 전환율이 낮다면 가격, 용량, 포장 등에 개선이 필요하다는 신호입니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI는 POS 결제 데이터와 CCTV 기반 방문자 수를 연동해 정확한 구매 전환율을 산출합니다. 단순 전환율뿐만 아니라 매대별 전환율, 시간대별 전환율 변화를 store insight 대시보드에서 실시간으로 확인할 수 있습니다. store agent는 전환율 하락 패턴을 감지하면 자동으로 진열 개선 제안을 전송합니다.',
    relatedTerms: ['store-heatmap', 'dwell-time', 'footfall-analysis', 'pos-data-limitations'],
    relatedIndustries: ['convenience', 'drugstore', 'mart'],
    metaDescription:
      '구매 전환율이란? 방문 고객 중 실제 구매로 이어진 비율. 편의점·드럭스토어·마트별 평균과 AI 분석으로 전환율을 높이는 방법을 설명합니다.',
  },
  {
    slug: 'seat-turnover-rate',
    title: '좌석 회전율',
    englishTitle: 'Seat Turnover Rate',
    category: 'retail',
    categoryLabel: '리테일',
    tagline: '카페·음식점 수익성의 핵심, 테이블이 하루 몇 번 교체되는가',
    definition:
      '좌석 회전율(Seat Turnover Rate)이란 일정 시간 동안 하나의 좌석(테이블)이 몇 번 새로운 고객에게 사용되었는지를 나타내는 지표입니다. 카페·음식점의 경우 피크 타임에 회전율이 낮으면 대기 고객 이탈, 매출 손실로 이어집니다.',
    body: [
      {
        heading: '좌석 회전율이 카페 수익에 미치는 영향',
        paragraphs: [
          '단위 면적당 매출(매출/㎡)을 높이려면 좌석 회전율 개선이 가장 빠른 방법입니다. 점심 피크 타임 2시간 동안 테이블 1개의 회전율이 1.5회에서 2.0회로 높아지면, 동일 인원이 근무하는 조건에서 최대 33%의 매출 증가를 기대할 수 있습니다.',
          '장시간 체류 고객(이른바 "공부족"이나 재택근무자)은 운영자 입장에서 딜레마입니다. 이들을 무작정 내보낼 수 없지만, 피크 시간 좌석 블로킹 문제는 실질적인 손실입니다. 데이터 기반으로 피크 타임을 정확히 파악하고, 자리 예약·테이크아웃 유도 전략을 수립하는 것이 해결책입니다.',
        ],
      },
      {
        heading: '좌석 회전율 측정 방법',
        paragraphs: [
          '수기 기록이나 결제 시간 기반 분석은 실제 착석 시간과 오차가 큽니다. AI 기반 좌석 점유 감지는 착석 시작과 이석 시점을 자동으로 감지해 정확한 체류 시간과 회전율을 산출합니다.',
          '이 데이터를 활용하면 특정 테이블의 평균 체류 시간, 요일·시간대별 회전율 트렌드, 장기 체류 고객 비율 등을 파악해 운영 전략을 데이터로 뒷받침할 수 있습니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI store care는 카메라로 테이블별 착석 여부를 실시간 감지합니다. store insight는 좌석별 평균 체류 시간, 시간대별 회전율, 만석률 추이를 분석해 최적 운영 시간대를 도출합니다. store agent는 피크 타임 전 체류 시간이 기준치를 초과하는 경우 자동으로 알림을 전송합니다.',
    relatedTerms: ['dwell-time', 'footfall-analysis', 'behavior-analysis'],
    relatedIndustries: ['cafe'],
    metaDescription:
      '좌석 회전율이란? 카페·음식점 매출 핵심 지표인 테이블 전환 횟수. 측정 방법, 업계 평균, AI 분석으로 회전율을 높이는 전략을 알아보세요.',
  },
  {
    slug: 'anomaly-detection',
    title: '이상 감지 (Anomaly Detection)',
    englishTitle: 'Anomaly Detection',
    category: 'ai',
    categoryLabel: 'AI 기술',
    tagline: 'AI가 정상 패턴을 학습해 비정상 상황을 자동으로 탐지하는 기술',
    definition:
      '이상 감지(Anomaly Detection)란 AI가 정상적인 패턴을 학습한 후, 그 패턴에서 벗어나는 비정상적인 상황을 실시간으로 탐지해 알림을 발생시키는 기술입니다. 매장 환경에서는 무인 시간대 침입, 장시간 배회, 쓰러짐, 기물 파손 등의 이상 행동을 감지하는 데 활용됩니다.',
    body: [
      {
        heading: '이상 감지가 필요한 매장 상황',
        paragraphs: [
          '무인매장·편의점 심야 운영, 창고·물류센터에서는 실시간 모니터링 인력이 없는 상황이 일반적입니다. 사고나 도난이 발생해도 다음날 출근 시 CCTV를 직접 확인해야 알 수 있어 대응이 늦어집니다.',
          'AI 이상 감지는 24시간 카메라 영상을 분석해 미리 정의된 이상 행동 패턴이 감지되면 실시간으로 문자·앱 알림을 전송합니다. 운영자가 잠든 새벽에도 실시간 대응이 가능해집니다.',
        ],
      },
      {
        heading: '이상 감지 AI의 작동 원리',
        paragraphs: [
          '딥러닝 기반 이상 감지 모델은 수천 시간의 정상 매장 영상을 학습해 "일반적인 행동 범위"를 구성합니다. 특정 구역에 허용 시간 이상 체류하거나, 특이한 이동 패턴, 쓰러지는 동작 등이 감지되면 이상 이벤트로 분류합니다.',
          '단순 움직임 감지(Motion Detection)와의 차이는 "의미 있는" 이상만을 필터링한다는 점입니다. 냉방기 바람에 흔들리는 배너나 배달 직원의 정상적인 이동은 정상으로 처리해 오경보를 최소화합니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI store care의 이상 감지 기능은 무인매장·편의점 야간 운영에서 검증된 98.2%의 감지 정확도를 제공합니다. 침입, 배회, 쓰러짐, 냉장 진열대 장시간 열림 등 업종별 특화 이상 시나리오를 지원하며, 감지 시 앱 푸시 알림을 자동 전송합니다.',
    relatedTerms: ['computer-vision', 'anonymized-cctv', 'night-monitoring', 'cctv-analytics'],
    relatedIndustries: ['unmanned', 'convenience', 'logistics'],
    metaDescription:
      '이상 감지(Anomaly Detection)란? AI가 비정상 상황을 자동 탐지하는 기술. 무인매장·편의점 야간 도난·사고 예방에 활용하는 방법을 알아보세요.',
  },
  {
    slug: 'computer-vision',
    title: '컴퓨터 비전 (Computer Vision)',
    englishTitle: 'Computer Vision',
    category: 'ai',
    categoryLabel: 'AI 기술',
    tagline: '카메라 영상을 AI가 이해하고 분석하는 핵심 기반 기술',
    definition:
      '컴퓨터 비전(Computer Vision)이란 카메라로 촬영된 이미지나 영상을 딥러닝 AI가 분석해 사람, 물체, 행동을 인식하고 의미 있는 데이터로 변환하는 기술입니다. 소매업에서는 고객 동선 분석, 재고 감지, 이상 행동 탐지 등에 광범위하게 활용됩니다.',
    body: [
      {
        heading: '컴퓨터 비전이 리테일을 바꾸는 이유',
        paragraphs: [
          '카메라는 이미 대부분의 매장에 설치되어 있습니다. 문제는 그 영상이 \'사건 발생 후 확인용\'으로만 쓰인다는 점입니다. 컴퓨터 비전은 카메라를 수동적 녹화 장치에서 능동적 분석 도구로 전환합니다.',
          '매장 직원이 눈으로 모든 것을 관찰하는 데는 한계가 있습니다. 여러 매대를 동시에 모니터링하거나, 바쁜 시간대에 모든 고객의 행동을 기록할 수 없습니다. AI는 초당 수십 프레임의 영상을 지치지 않고 분석해 인간이 포착할 수 없는 패턴을 발견합니다.',
        ],
      },
      {
        heading: '리테일 컴퓨터 비전의 주요 기능',
        paragraphs: [
          '**사람 감지 및 동선 분석**: 매장 내 방문객 수, 동선, 구역별 이동 패턴 분석.',
          '**행동 인식**: 제품을 집어 드는 행동, 장시간 배회, 쓰러짐 등 특정 행동 분류.',
          '**재고 및 환경 감지**: 진열대 결품, 냉장고 도어 장시간 열림, 바닥 이물질 등 매장 상태 모니터링.',
        ],
      },
    ],
    saaiUsage:
      'SAAI는 자체 개발한 컴퓨터 비전 엔진을 통해 기존 CCTV 영상에서 행동 데이터를 추출합니다. 별도의 전용 카메라나 센서 없이 기존 인프라를 활용하므로 도입 비용이 낮습니다. 엣지 디바이스에서 실시간 처리를 수행해 영상이 외부로 전송되지 않습니다.',
    relatedTerms: ['anonymized-cctv', 'retail-ai', 'anomaly-detection', 'store-heatmap'],
    relatedIndustries: ['convenience', 'unmanned', 'logistics'],
    metaDescription:
      '컴퓨터 비전이란? CCTV 영상을 AI가 분석하는 핵심 기술. 소매점·무인매장·물류에서의 활용 방법과 기존 CCTV로 구현하는 방법을 설명합니다.',
  },
  {
    slug: 'zone-analysis',
    title: '구역별 분석 (Zone Analysis)',
    englishTitle: 'Zone Analysis',
    category: 'analytics',
    categoryLabel: '데이터 분석',
    tagline: '매장을 구역으로 나눠 어떤 공간이 매출에 기여하는지 측정',
    definition:
      '구역별 분석(Zone Analysis)이란 매장을 여러 구역으로 구분하고, 각 구역의 방문률, 체류 시간, 전환율을 개별적으로 측정·비교하는 분석 방법입니다. 어떤 구역이 고객의 주목을 받고 어떤 구역이 사각지대인지를 파악해 레이아웃과 진열을 최적화합니다.',
    body: [
      {
        heading: '구역별 분석이 드러내는 것들',
        paragraphs: [
          '동일한 매장 면적이지만 모든 구역이 동등하게 활용되지는 않습니다. 입구 쪽과 안쪽, 왼쪽 동선과 오른쪽 동선은 방문 빈도와 체류 패턴이 다릅니다. 구역별 분석은 이 차이를 정량화합니다.',
          '예를 들어 드럭스토어에서 고마진 스킨케어 구역의 방문률이 30%에 불과하다면, 해당 구역으로의 동선을 유도하는 사인물이나 체험 프로모션을 추가할 수 있습니다. 분석 없이는 "왜 안 팔리는지"를 직관으로만 판단할 수밖에 없습니다.',
        ],
      },
      {
        heading: '구역 설정 기준',
        paragraphs: [
          '구역은 물리적 매대 배치, 상품 카테고리, 또는 분석 목적에 따라 자유롭게 설정합니다. SAAI에서는 카메라 영상 위에 가상 구역(Virtual Zone)을 드래그로 그려 즉시 분석을 시작할 수 있습니다.',
          '시간이 지남에 따라 구역 설정을 변경하거나 새로운 프로모션 구역을 추가해 진열 개편 전후 효과를 비교 측정할 수 있습니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI store insight의 구역별 분석 기능은 최대 20개 가상 구역을 동시에 모니터링합니다. 각 구역의 방문객 수, 평균 체류 시간, 재방문율을 시간대별로 집계하며, 구역 간 이동 패턴(어느 구역에서 어느 구역으로 이동하는지)도 분석합니다.',
    relatedTerms: ['store-heatmap', 'dwell-time', 'purchase-conversion-rate'],
    relatedIndustries: ['drugstore', 'mart', 'exhibition'],
    metaDescription:
      '구역별 분석이란? 매장을 공간으로 나눠 방문률·체류·전환율을 측정하는 리테일 분석법. 사각지대 파악과 레이아웃 최적화에 활용하는 방법을 알아보세요.',
  },
  {
    slug: 'footfall-analysis',
    title: '방문객 분석 (Footfall Analysis)',
    englishTitle: 'Footfall Analysis',
    category: 'analytics',
    categoryLabel: '데이터 분석',
    tagline: '시간대·요일별 방문객 흐름을 정밀하게 측정하는 기초 분석',
    definition:
      '방문객 분석(Footfall Analysis)이란 매장을 방문하는 고객의 수와 시간 패턴을 자동으로 측정하는 분석입니다. 입장 인원, 시간대별 유입량, 피크 타임, 방문 빈도 등을 파악해 인력 배치, 재고 보충, 프로모션 타이밍을 최적화하는 기반 데이터를 제공합니다.',
    body: [
      {
        heading: '방문객 수를 왜 정확히 측정해야 하는가',
        paragraphs: [
          '매출만 보면 "얼마를 벌었는가"는 알 수 있지만 "얼마나 많은 기회를 놓쳤는가"는 알 수 없습니다. 방문객 분석은 방문했지만 구매하지 않은 고객의 규모를 파악해 전환율 개선의 기준을 제공합니다.',
          '또한 시간대별 방문 패턴은 직원 배치의 근거 데이터가 됩니다. 오전 11시~오후 1시 방문이 집중된다면 그 시간대에 추가 인력을 배치하고, 한가한 오후 3시에는 재고 정리나 청소를 배치하는 식으로 운영 효율을 높일 수 있습니다.',
        ],
      },
      {
        heading: '방문객 분석 데이터 활용 예시',
        paragraphs: [
          '편의점에서 방문객 분석과 POS 매출을 연동하면 구매 전환율을 정확히 계산할 수 있습니다. 요일별, 시간대별 전환율 변화를 추적해 진열 개편이나 프로모션의 효과를 검증합니다.',
          '물류센터에서는 구역별 작업자 이동 빈도를 측정해 동선을 최적화하거나 안전 사각지대를 식별합니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI store care는 입구 카메라를 통해 시간당 방문객 수를 자동 집계합니다. 익명화 처리로 개인정보 없이 "방문했다"는 사실만 기록합니다. store insight 대시보드에서 전년 동기 대비, 이벤트 전후, 날씨 연동 분석이 가능합니다.',
    relatedTerms: ['purchase-conversion-rate', 'dwell-time', 'zone-analysis'],
    relatedIndustries: ['convenience', 'mart', 'logistics'],
    metaDescription:
      '방문객 분석(Footfall Analysis)이란? 매장 방문객 수와 시간 패턴을 자동으로 측정하는 기술. 인력 배치·전환율 계산·프로모션 효과 측정에 활용하는 방법을 설명합니다.',
  },
  {
    slug: 'vmd-optimization',
    title: 'VMD 최적화',
    englishTitle: 'Visual Merchandising (VMD) Optimization',
    category: 'retail',
    categoryLabel: '리테일',
    tagline: '데이터 기반으로 상품 진열과 매장 연출을 과학적으로 개선하는 방법',
    definition:
      'VMD(Visual Merchandising) 최적화란 상품 진열, 사인물 배치, 동선 설계 등 매장의 시각적 연출이 실제로 고객 행동에 미치는 영향을 데이터로 측정하고 개선하는 과정입니다. 직관이나 경험에 의존하던 진열 결정을 AI 분석 데이터로 검증하고 개선합니다.',
    body: [
      {
        heading: 'VMD의 데이터화가 중요한 이유',
        paragraphs: [
          '전통적인 VMD는 MD 담당자의 경험과 브랜드 가이드라인에 의존합니다. 이 방식은 일관성은 있지만 "우리 매장의 특정 고객에게 실제로 효과적인가"를 검증하기 어렵습니다.',
          '데이터 기반 VMD는 진열 변경 전후의 고객 체류 시간, 상품 픽업률, 구매 전환율을 비교해 A/B 테스트를 수행하는 것과 같습니다. 어떤 배치가 우리 매장 고객에게 더 효과적인지 숫자로 증명할 수 있습니다.',
        ],
      },
      {
        heading: 'VMD 최적화의 실제 적용',
        paragraphs: [
          '드럭스토어에서는 테스터 상품 위치를 바꾼 후 해당 구역의 체류 시간과 픽업률이 어떻게 변화했는지 측정합니다. 효과가 없다면 원상복구, 효과가 있다면 다른 구역에 동일 전략을 적용합니다.',
          '편의점에서는 계산대 앞 충동구매 구역의 상품 배치를 주기적으로 변경하면서 충동 구매율 변화를 측정합니다. 어떤 상품 카테고리가 최고의 충동 구매율을 보이는지 데이터로 파악합니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI store insight는 진열 구역별 고객 체류 시간과 상품 픽업(집고 내려놓는 행동) 데이터를 수집합니다. store agent는 분석 결과를 바탕으로 "B 구역의 체류 시간이 이번 주 20% 감소했습니다 — 진열 상태를 확인하세요"와 같은 actionable 알림을 자동으로 전송합니다.',
    relatedTerms: ['store-heatmap', 'dwell-time', 'zone-analysis', 'purchase-conversion-rate'],
    relatedIndustries: ['drugstore', 'convenience', 'mart'],
    metaDescription:
      'VMD 최적화란? 상품 진열 효과를 데이터로 측정하고 개선하는 방법. 드럭스토어·편의점·마트에서 AI 분석으로 VMD를 과학적으로 관리하는 법을 알아보세요.',
  },
  {
    slug: 'stockout-detection',
    title: '결품 감지 (Stockout Detection)',
    englishTitle: 'Stockout Detection',
    category: 'operations',
    categoryLabel: '매장 운영',
    tagline: '진열대 빈 공간을 AI가 자동으로 감지해 실시간 알림 발송',
    definition:
      '결품 감지(Stockout Detection)란 매장 진열대에서 상품이 소진되어 빈 공간이 발생하는 순간을 AI 카메라가 자동으로 감지하고 담당자에게 알림을 전송하는 기능입니다. POS 데이터로는 알 수 없는 "팔리지 못한 손실"을 방지합니다.',
    body: [
      {
        heading: '결품이 매출에 미치는 실제 영향',
        paragraphs: [
          '업계 연구에 따르면 소매점의 평균 결품률은 7–10% 수준입니다. 결품이 발생하면 고객은 대체 상품을 구매하거나(전환 구매), 구매 자체를 포기하거나(구매 포기), 다른 매장으로 이동합니다. 각 시나리오 모두 수익 손실을 의미합니다.',
          '특히 편의점·슈퍼마켓에서 인기 상품의 결품은 고객 신뢰도에도 영향을 줍니다. "항상 없는 매장"이라는 인식이 형성되면 방문 빈도 자체가 줄어들 수 있습니다.',
        ],
      },
      {
        heading: 'AI 결품 감지 vs POS 기반 재고 관리',
        paragraphs: [
          'POS 기반 재고 관리는 판매 수량을 역산해 이론적 재고를 계산합니다. 하지만 반품, 파손, 도난 등으로 실제 재고가 이론치와 다른 경우가 많습니다. 또한 진열대 보충이 안 된 상태로 창고에 재고가 있는 경우도 POS로는 파악할 수 없습니다.',
          'AI 카메라 기반 결품 감지는 진열대를 직접 확인하기 때문에 이런 오차가 없습니다. 카메라가 "해당 위치에 물건이 없다"는 사실을 직접 감지하므로 즉각적이고 정확합니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI store care는 주요 매대 CCTV 영상을 분석해 결품 발생 시 실시간 앱 알림을 전송합니다. 알림에는 발생 시간, 해당 매대 위치, 카메라 캡처 이미지가 포함되어 담당자가 바로 확인할 수 있습니다. 결품 지속 시간과 빈도도 기록되어 재발 방지 발주 계획 수립에 활용됩니다.',
    relatedTerms: ['anomaly-detection', 'vmd-optimization', 'footfall-analysis'],
    relatedIndustries: ['convenience', 'mart', 'drugstore'],
    metaDescription:
      '결품 감지란? AI 카메라로 진열대 빈 공간을 자동 감지하는 기술. POS 재고 관리의 한계를 극복하고 매출 손실을 방지하는 방법을 알아보세요.',
  },
  {
    slug: 'behavior-analysis',
    title: '고객 행동 분석',
    englishTitle: 'Customer Behavior Analysis',
    category: 'analytics',
    categoryLabel: '데이터 분석',
    tagline: '고객이 매장에서 무엇을 하는지 데이터로 이해하는 분석 방법',
    definition:
      '고객 행동 분석(Customer Behavior Analysis)이란 매장을 방문한 고객의 이동 경로, 체류 패턴, 상품 접촉 행동, 구매 결정 과정을 데이터로 수집하고 분석하는 방법입니다. 고객 설문이나 POS 데이터만으로는 파악하기 어려운 현장에서의 실제 행동을 AI 카메라로 포착합니다.',
    body: [
      {
        heading: '왜 고객 행동을 직접 관찰해야 하는가',
        paragraphs: [
          '"고객이 왜 사지 않았는가"는 가장 중요하지만 가장 답하기 어려운 질문입니다. 구매하지 않은 고객은 설문에 응하지 않고, 구매한 고객도 자신의 구매 동기를 정확히 설명하지 못할 수 있습니다. 직접 행동 데이터만이 진실을 담습니다.',
          '매장 방문 후 구매하지 않은 고객의 행동을 분석하면 "어느 구역에서 멈췄는지", "어떤 상품을 집었다 내려놓았는지"를 알 수 있습니다. 이 데이터는 진열, 가격, 상품 구성 개선의 직접적인 근거가 됩니다.',
        ],
      },
      {
        heading: '행동 분석 데이터의 활용 범위',
        paragraphs: [
          '단순한 체류 시간과 동선 분석을 넘어, 고객 행동 분석은 마케팅 효과 측정에도 활용됩니다. 특정 POP(Point of Purchase) 광고물이 설치된 후 해당 구역의 방문률과 체류 시간이 증가했다면 해당 광고의 효과가 입증된 것입니다.',
          '매장 직원의 고객 응대가 구매 전환에 미치는 영향도 분석 가능합니다. 직원이 고객에게 먼저 접근했을 때와 그렇지 않을 때의 구매율 차이를 측정해 서비스 표준을 수립할 수 있습니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI의 store insight는 방문객 동선, 구역별 체류 패턴, 상품 픽업 행동을 종합한 고객 행동 리포트를 주간·월간으로 자동 생성합니다. 익명화 처리로 개인정보 없이 행동 패턴만 분석하며, A/B 테스트 형태로 진열 개편 전후 효과를 비교 분석합니다.',
    relatedTerms: ['store-heatmap', 'dwell-time', 'purchase-conversion-rate', 'footfall-analysis'],
    relatedIndustries: ['convenience', 'drugstore', 'mart'],
    metaDescription:
      '고객 행동 분석이란? 매장에서 고객의 이동·체류·상품 접촉 행동을 데이터로 파악하는 방법. AI 카메라 기반 분석으로 매출을 높이는 실용 가이드.',
  },
  {
    slug: 'crowd-density-analysis',
    title: '혼잡도 분석',
    englishTitle: 'Crowd Density Analysis',
    category: 'analytics',
    categoryLabel: '데이터 분석',
    tagline: '공간별 인구 밀도를 실시간으로 측정해 혼잡을 사전에 관리',
    definition:
      '혼잡도 분석(Crowd Density Analysis)이란 매장이나 특정 구역에 동시에 존재하는 사람의 수와 밀도를 실시간으로 측정하는 분석입니다. 혼잡 상황을 사전에 감지해 입장 제한, 인력 배치, 동선 분산 등의 조치를 취할 수 있습니다.',
    body: [
      {
        heading: '혼잡도 관리가 필요한 이유',
        paragraphs: [
          '혼잡한 매장은 고객 경험을 저하시키고 구매 포기율을 높입니다. 계산대 앞에 5명 이상이 줄을 서면 상당수 고객이 그냥 나간다는 연구 결과가 있습니다. 혼잡도 데이터가 있으면 추가 계산대를 언제 열어야 하는지 예측할 수 있습니다.',
          '전시 공간·행사장에서는 특정 부스의 과도한 집중이 다른 구역의 고객 경험을 방해합니다. 실시간 혼잡도 데이터로 스태프 배치와 안내 방송을 통해 흐름을 분산시킬 수 있습니다.',
        ],
      },
      {
        heading: '운영에서의 실제 활용 사례',
        paragraphs: [
          '대형마트에서 혼잡도 분석을 활용하면 요일·시간대별 혼잡 예측 모델을 만들 수 있습니다. 이를 바탕으로 직원 스케줄링, 계산대 운영 계획, 쇼핑 카트 배치를 최적화합니다.',
          '물류센터에서는 구역별 작업자 밀집도를 모니터링해 특정 구역에 너무 많은 인원이 집중되는 상황을 방지합니다. 안전 사고 예방과 작업 효율 향상에 동시에 기여합니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI store care는 매장 전체와 구역별 동시 체류 인원을 실시간으로 카운팅합니다. 설정한 임계치(예: 계산대 구역 5명 이상)를 초과 시 실시간 알림을 전송합니다. store insight는 시간대별 혼잡 패턴을 분석해 다음 주 예측 혼잡도를 사전 제공합니다.',
    relatedTerms: ['footfall-analysis', 'zone-analysis', 'anomaly-detection'],
    relatedIndustries: ['mart', 'exhibition', 'logistics'],
    metaDescription:
      '혼잡도 분석이란? 매장 구역별 인구 밀도를 실시간으로 측정하는 기술. 대형마트·전시 공간·물류센터에서 혼잡을 사전에 관리하는 방법을 알아보세요.',
  },
  {
    slug: 'retail-ai',
    title: '리테일 AI',
    englishTitle: 'Retail AI',
    category: 'ai',
    categoryLabel: 'AI 기술',
    tagline: '소매업 운영을 자동화하고 최적화하는 인공지능 기술 총칭',
    definition:
      '리테일 AI(Retail AI)란 소매업 매장 운영, 재고 관리, 고객 행동 분석, 수요 예측 등에 적용되는 인공지능 기술의 총칭입니다. CCTV 기반 컴퓨터 비전, 머신러닝 수요 예측, 자동화된 발주 시스템 등이 모두 리테일 AI의 범주에 포함됩니다.',
    body: [
      {
        heading: '리테일 AI의 적용 영역',
        paragraphs: [
          '**고객 행동 분석**: 매장 내 이동, 체류, 상품 접촉 등 구매 전 행동 패턴 분석.',
          '**재고 및 진열 관리**: 결품 감지, 진열 이상 알림, AI 기반 자동 발주.',
          '**보안 및 이상 감지**: 야간 도난, 무인 시간대 이상 행동 감지.',
          '**수요 예측**: 날씨, 이벤트, 요일 등 외부 요인을 반영한 판매량 예측.',
        ],
      },
      {
        heading: '왜 지금 리테일 AI인가',
        paragraphs: [
          '최저임금 상승과 인건비 증가로 매장 운영 비용이 높아지는 반면, 온라인 커머스와의 경쟁은 심화되고 있습니다. 오프라인 매장의 경쟁력은 "온라인이 줄 수 없는 경험"에 있으며, 그 경험 최적화를 위해 데이터가 필수입니다.',
          '기존에는 대기업만 활용할 수 있던 AI 분석 기술이 중소형 매장에도 적용 가능한 수준으로 비용이 낮아졌습니다. 기존 CCTV를 활용하는 SAAI 방식은 하드웨어 추가 없이 AI 분석을 시작할 수 있어 진입 장벽이 낮습니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI는 편의점, 카페, 무인매장, 드럭스토어 등 7개 업종 특화 리테일 AI 솔루션을 제공합니다. 관찰(store care) → 분석(store insight) → 실행(store agent) → 학습 4단계로 AI가 매장 운영을 자동화합니다. 기존 CCTV에 소프트웨어만 연동하면 3일 이내 데이터 수집이 시작됩니다.',
    relatedTerms: ['computer-vision', 'anonymized-cctv', 'behavior-analysis', 'store-operations-automation'],
    relatedIndustries: ['convenience', 'cafe', 'unmanned'],
    metaDescription:
      '리테일 AI란? 소매업 운영을 자동화하는 인공지능 기술 가이드. 고객 행동 분석, 결품 감지, 이상 감지 등 실제 매장 적용 사례와 도입 방법을 설명합니다.',
  },
  {
    slug: 'cctv-analytics',
    title: 'CCTV 분석 솔루션',
    englishTitle: 'CCTV Analytics Solution',
    category: 'ai',
    categoryLabel: 'AI 기술',
    tagline: '보안용 CCTV를 매장 운영 데이터 수집 도구로 전환하는 솔루션',
    definition:
      'CCTV 분석 솔루션이란 매장에 이미 설치된 CCTV 카메라의 영상을 AI가 실시간으로 분석해 고객 행동 데이터, 이상 상황 감지, 공간 활용도 분석 등 운영 인사이트를 제공하는 소프트웨어 솔루션입니다. 새로운 하드웨어 없이 기존 인프라를 활용하는 것이 특징입니다.',
    body: [
      {
        heading: '기존 CCTV의 한계와 분석의 차이',
        paragraphs: [
          '보안 목적으로 설치된 CCTV는 "사건이 발생했을 때 확인하는" 수동적 도구입니다. 하루 24시간 녹화된 영상 대부분은 아무도 보지 않습니다. 매월 발생하는 CCTV 운영 비용 대비 활용도가 극히 낮습니다.',
          'CCTV 분석 솔루션은 같은 카메라를 24시간 능동적으로 활용합니다. 고객이 어느 구역에 얼마나 있었는지, 이상한 일이 발생했는지, 결품이 생겼는지를 자동으로 감지해 운영자에게 알려줍니다.',
        ],
      },
      {
        heading: '도입 시 고려사항',
        paragraphs: [
          '카메라의 해상도와 설치 각도가 분석 정확도에 영향을 줍니다. 일반적으로 1080p 이상의 IP 카메라가 권장되며, 천장 카메라(Bird\'s eye view)가 공간 분석에 가장 적합합니다.',
          '개인정보보호 측면에서는 익명화 처리 여부와 데이터 저장 위치를 반드시 확인해야 합니다. SAAI는 원본 영상을 외부로 전송하지 않고 매장 내 장치에서 익명화 처리를 수행합니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI는 대부분의 IP 카메라 브랜드와 호환되며, 기존 CCTV NVR/DVR 시스템에 연동할 수 있습니다. 소프트웨어 설치와 카메라 각도 조정만으로 도입이 완료되며, 현장 시공이나 배선 공사가 필요하지 않습니다. 도입 첫날부터 데이터 수집이 시작됩니다.',
    relatedTerms: ['anonymized-cctv', 'computer-vision', 'anomaly-detection', 'store-heatmap'],
    relatedIndustries: ['convenience', 'unmanned', 'logistics'],
    metaDescription:
      'CCTV 분석 솔루션이란? 기존 CCTV로 매장 운영 데이터를 수집하는 AI 소프트웨어. 고객 행동 분석, 이상 감지, 결품 감지까지 한 번에 해결하는 방법.',
  },
  {
    slug: 'store-operations-automation',
    title: '매장 운영 자동화',
    englishTitle: 'Store Operations Automation',
    category: 'operations',
    categoryLabel: '매장 운영',
    tagline: '반복적인 매장 점검과 대응을 AI가 자동으로 처리하는 운영 방식',
    definition:
      '매장 운영 자동화(Store Operations Automation)란 결품 확인, 이상 상황 모니터링, 고객 흐름 분석, 발주 제안 등 반복적으로 수행해야 하는 매장 운영 업무를 AI 시스템이 자동으로 처리하는 것입니다. 사람이 직접 순찰하거나 영상을 확인하는 시간을 줄이고 데이터 기반 의사결정을 빠르게 내릴 수 있습니다.',
    body: [
      {
        heading: '자동화가 필요한 매장 운영 업무들',
        paragraphs: [
          '점주와 매장 관리자가 매일 수행하는 업무 중 상당 부분은 반복적인 확인 작업입니다. 진열 상태 확인, 야간 CCTV 영상 체크, 혼잡 구역 파악, 청결 상태 확인 등은 시간과 노동력을 소모하지만 부가가치가 낮습니다.',
          'AI 자동화는 이런 반복 업무를 24시간 자동으로 수행하고, "이상이 있을 때만" 알림을 줍니다. 점주는 모든 것을 직접 확인하는 대신 중요한 결정에 집중할 수 있습니다.',
        ],
      },
      {
        heading: '자동화의 범위와 한계',
        paragraphs: [
          '현재 매장 AI 자동화가 잘 작동하는 영역: 이상 감지 알림, 결품 알림, 혼잡도 모니터링, 주간·월간 성과 리포트 자동 생성.',
          '여전히 사람의 판단이 필요한 영역: 고객 응대, 복잡한 공급업체 협상, 신상품 선정, 인테리어 전략 결정. AI 자동화는 정형적이고 반복적인 업무에서 가장 높은 ROI를 냅니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI store agent는 store care의 실시간 감지 데이터와 store insight의 패턴 분석을 결합해 actionable 알림을 자동 발송합니다. 운영자는 매일 아침 전날 야간 이상 요약, 결품 발생 현황, 금일 혼잡 예측이 담긴 리포트를 앱으로 받아볼 수 있습니다.',
    relatedTerms: ['retail-ai', 'anomaly-detection', 'stockout-detection', 'behavior-analysis'],
    relatedIndustries: ['convenience', 'unmanned', 'mart'],
    metaDescription:
      '매장 운영 자동화란? AI가 결품 확인, 이상 감지, 혼잡 모니터링 등 반복 업무를 자동 처리하는 방식. 점주가 중요한 결정에 집중할 수 있도록 돕는 AI 솔루션.',
  },
  {
    slug: 'night-monitoring',
    title: '야간 모니터링',
    englishTitle: 'Night Monitoring',
    category: 'operations',
    categoryLabel: '매장 운영',
    tagline: '무인 야간 운영 중 사고와 도난을 실시간으로 감지하고 대응',
    definition:
      '야간 모니터링이란 매장이 무인 또는 최소 인원으로 운영되는 야간 시간대에 CCTV와 AI를 활용해 도난, 침입, 이상 행동, 시설 이상을 실시간으로 감지하고 실시간 알림을 전송하는 운영 방식입니다. 다음날 아침까지 기다리지 않고 사건 발생 시 바로 대응할 수 있습니다.',
    body: [
      {
        heading: '야간 시간대의 매장 리스크',
        paragraphs: [
          '편의점 야간 근무자 1명이 감당해야 하는 상황은 많습니다. 주취 고객, 장시간 배회, 충전기·냉장 이상까지 혼자 모든 것을 처리해야 합니다. 무인매장이라면 더 심각합니다. 카메라가 있어도 아무도 보고 있지 않으면 무의미합니다.',
          'AI 야간 모니터링은 사람이 없어도 24시간 영상을 분석합니다. 미리 설정한 이상 패턴(침입, 배회 시간 초과, 냉장 도어 장시간 열림 등)이 감지되는 순간 문자·앱 알림이 발송됩니다.',
        ],
      },
      {
        heading: '야간 모니터링 설정 포인트',
        paragraphs: [
          '야간 모드에서는 주간보다 높은 감도로 감지 기준을 설정합니다. 야간에는 허가된 직원 외에 일반인이 매장 안에 있는 것 자체가 이상 상황일 수 있기 때문입니다.',
          '알림 수신자를 복수로 설정하는 것이 중요합니다. 점주 본인 외에 가족이나 직원 매니저가 보조 수신자로 설정되어 있으면, 점주가 연락 불가능한 상황에서도 대응이 가능합니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI store care의 야간 모니터링은 해가 진 후 자동으로 야간 모드로 전환됩니다. 침입 감지 알림은 평균 15초 이내에 발송되며, 앱 알림과 함께 감지 순간의 영상 캡처가 첨부됩니다. 무인매장의 경우 원격 잠금·경고음 연동도 지원합니다.',
    relatedTerms: ['anomaly-detection', 'cctv-analytics', 'store-operations-automation'],
    relatedIndustries: ['convenience', 'unmanned'],
    metaDescription:
      '야간 모니터링이란? 편의점·무인매장 야간 도난·침입을 AI가 실시간 감지하는 방법. 15초 이내 알림 발송으로 야간 운영 리스크를 최소화하는 방법을 알아보세요.',
  },
  {
    slug: 'pos-data-limitations',
    title: 'POS 데이터의 한계',
    englishTitle: 'Limitations of POS Data',
    category: 'analytics',
    categoryLabel: '데이터 분석',
    tagline: '결제된 것만 아는 POS, 놓치는 데이터가 더 많다',
    definition:
      'POS(Point of Sale) 데이터는 실제로 결제가 완료된 거래 기록만을 포함합니다. 방문했지만 구매하지 않은 고객, 집었다가 내려놓은 상품, 진열대가 비어 팔리지 못한 손실은 POS에 기록되지 않습니다. 이 "보이지 않는 데이터"가 매장 개선의 핵심입니다.',
    body: [
      {
        heading: 'POS가 알려주지 못하는 것들',
        paragraphs: [
          '**미결제 이탈**: 계산대 앞 대기열이 길어 결제를 포기한 고객은 POS에 흔적이 없습니다. 이 고객이 얼마나 자주, 어떤 요인으로 이탈하는지 알아야 계산대 운영을 최적화할 수 있습니다.',
          '**집고 내려놓은 상품**: 가격이나 용량을 보고 구매를 포기한 행동은 POS에 기록되지 않습니다. 하지만 이 데이터야말로 가격 조정과 패키지 개선의 가장 직접적인 신호입니다.',
          '**결품 손실**: 재고가 있는데 진열이 안 되어 팔리지 못한 경우, 또는 실제 결품으로 기회 손실이 발생한 경우—POS는 이 두 가지를 구별할 수 없습니다.',
        ],
      },
      {
        heading: 'AI 데이터로 POS 한계 보완하기',
        paragraphs: [
          'CCTV AI 분석은 POS 데이터의 "결과"와 매장 내 "과정"을 연결합니다. 특정 날 매출이 낮았다면 POS는 "그랬다"는 사실만 알려줍니다. AI 데이터는 "그 날 방문자가 적었는지, 방문자는 많았는데 전환율이 낮았는지, 결품이 많았는지"를 구별해줍니다.',
          '이 맥락 데이터가 있어야 개선 방향을 정확히 설정할 수 있습니다. 방문자가 적었다면 마케팅을 강화하고, 전환율이 낮았다면 진열을 바꾸고, 결품이 많았다면 발주 체계를 점검하는 식입니다.',
        ],
      },
    ],
    saaiUsage:
      'SAAI store insight는 POS 매출 데이터와 CCTV AI 분석 데이터를 하나의 대시보드에서 연동합니다. "방문자 수 대비 매출"을 실시간으로 확인하고, 전환율 하락 시 그 원인을 데이터로 추적할 수 있습니다. POS만으로는 보이지 않던 매출 손실 원인을 찾아 대응하는 것이 핵심입니다.',
    relatedTerms: ['purchase-conversion-rate', 'stockout-detection', 'footfall-analysis', 'behavior-analysis'],
    relatedIndustries: ['convenience', 'mart', 'drugstore'],
    metaDescription:
      'POS 데이터의 한계란? 결제된 것만 아는 POS로는 놓치는 고객 행동 데이터. AI 분석으로 POS 사각지대를 채우고 매출 손실 원인을 찾는 방법을 설명합니다.',
  },
  {
    slug: 'store-automation-agent',
    title: '매장 AI 에이전트',
    englishTitle: 'Store AI Agent',
    category: 'ai',
    categoryLabel: 'AI 기술',
    tagline: '데이터 분석 결과를 현장 행동으로 연결하는 자동화 실행 AI',
    definition:
      '매장 AI 에이전트(Store AI Agent)란 매장 운영 데이터를 분석한 결과를 바탕으로 구체적인 행동(알림 발송, 발주 제안, 직원 지시 등)을 자동으로 실행하는 AI 시스템입니다. 단순히 데이터를 보여주는 것을 넘어, 분석 결과가 실제 현장 개선으로 이어지도록 연결하는 역할을 합니다.',
    body: [
      {
        heading: 'AI 에이전트가 다른 분석 도구와 다른 점',
        paragraphs: [
          '대부분의 분석 도구는 대시보드와 리포트를 제공합니다. 하지만 "데이터를 보는 것"과 "데이터를 바탕으로 행동하는 것" 사이에는 여전히 사람의 해석과 결정이 필요합니다.',
          'AI 에이전트는 이 중간 단계를 자동화합니다. "B 구역 체류 시간이 전주 대비 20% 감소했습니다"라는 관찰에서 "B 구역 진열 상태를 바로 확인하세요"라는 알림으로, 더 나아가 자동으로 발주를 제안하거나 프로모션을 트리거합니다.',
        ],
      },
      {
        heading: '에이전트가 실행하는 작업들',
        paragraphs: [
          '**실시간 알림**: 결품, 이상 행동, 혼잡도 초과 시 실시간 알림.',
          '**패턴 기반 제안**: 주간 데이터를 분석해 발주 제안, 직원 배치 최적화 제안.',
          '**자동 리포트**: 일간·주간·월간 운영 성과 리포트 자동 생성 및 전송.',
          '**외부 시스템 연동**: POS, 발주 시스템, 메신저 등과 연동해 완전 자동화 가능.',
        ],
      },
    ],
    saaiUsage:
      'SAAI store agent는 store care의 실시간 감지와 store insight의 패턴 분석을 기반으로 동작합니다. 임계치 기반 실시간 알림부터 주간 인사이트 리포트, 검증된 패턴의 자동 실행까지 3단계로 매장 운영을 자동화합니다. 카카오 비즈니스, 네이버 톡톡, SMS 등 다양한 채널로 알림을 전송합니다.',
    relatedTerms: ['store-operations-automation', 'retail-ai', 'behavior-analysis', 'anomaly-detection'],
    relatedIndustries: ['convenience', 'unmanned', 'mart'],
    metaDescription:
      '매장 AI 에이전트란? 데이터 분석 결과를 자동으로 현장 행동으로 연결하는 AI 시스템. 알림 발송, 발주 제안, 자동 리포트로 매장 운영을 자동화하는 방법.',
  },
];

export const glossaryBySlug: Record<string, GlossaryTerm> = Object.fromEntries(
  glossaryTerms.map((term) => [term.slug, term]),
);
