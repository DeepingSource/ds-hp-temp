import { industryThumbs, industryDashboardImages } from '@/data/siteImages';
import { COMPANY } from '@/lib/company-data';

export interface IndustryContent {
    id: string;
    hero: {
        headline: string;
        subheadline: string;
        visualConcept: string;
        heroImage?: string;
        heroVideo?: string;
    };
    /** 업종별 3개 핵심 수치 — 통계 배너에 사용 */
    stats: {
        icon: string;
        stat: string;
        label: string;
    }[];
    painPoints: {
        quote: string;
        description: string;
    }[];
    /** solutions 배열은 반드시 StoreCare → StoreInsight → StoreAgent 순서로 3개 */
    solutions: {
        title: string;
        items: string[];
        iconName: string;
        productName: 'StoreCare' | 'StoreInsight' | 'StoreAgent';
    }[];
    /** 3개 제품이 이 업종에서 어떻게 루프를 형성하는지 한 문장으로 */
    loopTagline: string;
    benefits: {
        target: string;
        iconName: string;
        description: string;
    }[];
    dashboardPreview: {
        content: string;
        detail: string;
        image?: string;
    };
    faq: {
        question: string;
        answer: string;
    }[];
    testimonials: {
        quote: string;
        speaker: string;
        metric?: string;
    }[];
    /** 매칭되는 StoreInsight 성공사례 (없으면 undefined) */
    caseStudy?: {
        title: string;
        metric: string;
        summary: string;
    };
    /** 이 업종에서 가장 많이 사용하는 기능 */
    popularFeature: string;
    /** 유사 업종 slug 배열 (2~3개) */
    relatedIndustries: string[];
    cta: {
        text: string;
    };
}

export const industryData: Record<string, IndustryContent> = {
    convenience: {
        id: 'convenience',
        hero: {
            headline: "POS는 팔린 것만 압니다.\nSAAI는 팔릴 뻔한 것도 압니다.",
            subheadline: "고객이 상품을 집었다 내려놓는 그 찰나, 매대 앞의 신호를 포착합니다. 데이터로 입증된 최적의 진열과 발주 전략을 경험하세요.",
            visualConcept: "편의점 매장 내 CCTV 화면이 데이터 노드로 변환되며, 고객이 물건을 집어 드는 순간을 AI가 인식해 분석하는 짧은 루핑 영상.",
            heroImage: industryThumbs.convenience[1],
        },
        stats: [
            { icon: 'TrendingUp', stat: '+23%', label: '매대 구매 전환율 상승' },
            { icon: 'Zap', stat: '-68%', label: '결품 대응 시간 단축' },
            { icon: 'ShieldCheck', stat: '98.2%', label: '야간 이상 감지 정확도' },
        ],
        painPoints: [
            {
                quote: "행사 매대를 바꿨는데, 실제로 더 팔렸는지 알 방법이 없습니다.",
                description: "POS 매출은 결제된 것만 찍힙니다. 고객이 집었다가 내려놓은 상품, 매대 앞에서 얼마나 머물다 돌아섰는지는 어디에도 기록되지 않습니다."
            },
            {
                quote: "새벽 시간대, 안심하고 매장을 맡길 수 있나요?",
                description: "야간 1인 근무나 무인 운영 중 도난·결품·취객이 생겨도 다음날 아침에야 알게 됩니다. 그 사이 손실은 고스란히 점주 몫입니다."
            },
            {
                quote: "본사 표준 진열이 우리 매장 상권에도 정답일까요?",
                description: "프랜차이즈 진열 기준은 전국 평균입니다. 우리 점포를 찾는 사람들의 구매 패턴은 다를 수 있는데, 그걸 입증할 데이터가 없습니다."
            }
        ],
        solutions: [
            {
                productName: 'StoreCare',
                title: "결품·청결·야간 이상 상황을 24시간 감지",
                iconName: "Eye",
                items: [
                    "주요 매대 재고 소진을 포착하면 실시간으로 알림을 전송합니다.",
                    "야간 비정상 체류, 파손, 쓰러짐 등 이상 패턴을 자동 인식합니다.",
                    "현장 청결 미흡 상태를 인식해 관리 방문 타이밍을 알려줍니다."
                ]
            },
            {
                productName: 'StoreInsight',
                title: "상품 관여율부터 동선 히트맵까지 분석",
                iconName: "BarChart3",
                items: [
                    "고객이 집었다 내려놓은 상품 데이터로 매대별 구매 전환율을 확인합니다.",
                    "시간대·요일별 방문객 패턴을 시각화해 운영 전략의 근거를 만들어 드립니다.",
                    "핫존·콜드존 히트맵으로 어느 매대를 어떻게 바꿔야 할지 알 수 있습니다."
                ]
            },
            {
                productName: 'StoreAgent',
                title: "분석 결과를 아침 액션 카드로 정리합니다",
                iconName: "Target",
                items: [
                    "결품이 예측되면 발주 시점을 선제적으로 제안합니다.",
                    "프로모션 효과 데이터를 바탕으로 진열 변경 우선순위를 추천합니다.",
                    "매일 아침 오늘 해야 할 운영 액션을 한눈에 정리해 전달합니다."
                ]
            }
        ],
        loopTagline: "결품을 발견하고, 패턴을 확인하고, 발주를 제안하는 루프가 가게를 알아서 채웁니다.",
        benefits: [
            {
                target: "가맹점주",
                iconName: "TrendingUp",
                description: "어느 매대에서 손님을 놓치고 있는지 데이터로 확인하면 진열 개선 우선순위가 명확해집니다. 야간 이상 탐지로 새벽에도 안심하고 가게를 맡길 수 있습니다."
            },
            {
                target: "프랜차이즈 본사",
                iconName: "BarChart3",
                description: "다점포 데이터를 통합해 어느 지점의 진열이 실제로 효과적인지 비교합니다. 프로모션 A/B 결과를 수치로 검증해 경영 지도의 설득력이 달라집니다."
            }
        ],
        dashboardPreview: {
            content: "시간대별 방문객, 매대 체류 시간, 상품 관여도를 한눈에",
            detail: "시간대별 방문객 추이, 행사 매대 체류 시간 분포, 상품 관여 상위 리스트를 직관적인 차트로 확인합니다. 어느 매대가 지금 기회를 날리고 있는지 바로 보입니다.",
            image: industryDashboardImages.convenience,
        },
        faq: [
            { question: '편의점에 카메라를 몇 대 설치해야 하나요?', answer: '매장 규모에 따라 다르지만, 일반 편의점(20~40평) 기준 4~6대면 주요 매대와 출입구를 커버할 수 있습니다. 현장 진단을 통해 최적 배치를 안내해 드립니다.' },
            { question: '프랜차이즈 본사에서 전 매장 데이터를 볼 수 있나요?', answer: '네. 본사 대시보드에서 전 지점의 진열 상태, 결품율, 방문객 패턴을 통합 조회할 수 있습니다. 점포별 비교 리포트도 자동 생성됩니다.' },
            { question: '야간 무인 시간대에도 작동하나요?', answer: '24시간 상시 가동됩니다. 야간에는 이상 행동 탐지 민감도가 자동으로 높아지며, 실시간 알림이 발송됩니다.' },
            { question: '기존 CCTV를 그대로 사용할 수 있나요?', answer: 'IP 카메라(ONVIF 호환)라면 대부분 그대로 연동 가능합니다. 아날로그 카메라도 인코더를 통해 연결할 수 있습니다.' },
            { question: '설치부터 운영까지 얼마나 걸리나요?', answer: '현장 진단 후 평균 3~5영업일 내에 설치와 초기 세팅이 완료됩니다. 첫 주 인사이트 리포트까지 약 1주일입니다.' },
        ],
        testimonials: [
            { quote: '잘 되는 지점의 패턴을 데이터로 보니, 전 점포에 그대로 적용할 수 있었습니다. 지점 간 편차가 눈에 띄게 줄었어요.', speaker: '편의점 프랜차이즈 A 운영혁신팀', metric: '지점간 편차 23% 감소' },
            { quote: '야간 결품을 아침에야 알았는데, 이제 발생 즉시 알림이 옵니다. 폐기 비용이 절반 이하로 줄었습니다.', speaker: '편의점 B 점주', metric: '폐기 비용 60% 절감' },
        ],
        caseStudy: {
            title: '진열 배치 최적화로 매출 증가',
            metric: '안주류 매출 15% 기여',
            summary: '안주류 구역 전환율 분석 후 매대 위치를 변경해 한 달 만에 매출 15% 상승을 달성했습니다.',
        },
        popularFeature: '야간 진열 결품 실시간 감지',
        relatedIndustries: ['cafe', 'drugstore'],
        cta: {
            text: "지금 현장에서 매출 기회를 놓치고 있는 매대, 무료 상담으로 찾아드립니다.",
        }
    },

    cafe: {
        id: 'cafe',
        hero: {
            headline: "피크타임에 놓친 매출,\n이제 숫자로 관리하세요.",
            subheadline: "어느 테이블이 비었는지, 언제 사람이 몰리는지 실시간으로 파악합니다. 최적의 회전율과 효율적인 인력 배치로 카페의 수익성을 높이세요.",
            visualConcept: "카페나 식당의 도면(평면도) 위로 각 테이블의 실시간 점유 상태가 색상(빈자리 초록, 장기 체류 붉은색)으로 표시되는 직관적 대시보드.",
            heroImage: industryThumbs.cafe[0],
        },
        stats: [
            { icon: 'RotateCcw', stat: '+22%', label: '좌석 회전율 향상' },
            { icon: 'Users', stat: '-31%', label: '피크타임 이탈 감소' },
            { icon: 'Target', stat: '91%', label: '혼잡도 예측 정확도' },
        ],
        painPoints: [
            {
                quote: "피크타임, 문 앞에서 줄 보고 돌아가는 손님이 얼마나 될까요?",
                description: "POS에는 찍히지 않는 이탈 고객입니다. 이 손님이 하루 매출에서 차지하는 비중을 알면 대응이 달라지지만, 지금은 추정도 못합니다."
            },
            {
                quote: "회전율이 생명인데, 빈 테이블 현황이 한눈에 안 보입니다.",
                description: "규모가 크거나 층이 나뉜 곳은 직원이 일일이 확인해야 합니다. 그 사이 빈 자리는 낭비되고, 손님은 기다립니다."
            },
            {
                quote: "알바 스케줄, 언제가 진짜 바쁜지 정확히 알고 짜고 계신가요?",
                description: "요일·시간대별 실제 혼잡도 데이터 없이 짠 스케줄은 항상 어딘가 삐거덕거립니다. 한쪽은 3명이 놀고, 한쪽은 1명이 뛰는 상황이 반복됩니다."
            }
        ],
        solutions: [
            {
                productName: 'StoreCare',
                title: "테이블 점유·대기열·청결을 실시간 감지",
                iconName: "Timer",
                items: [
                    "각 테이블의 착석 여부와 체류 시간을 실시간으로 모니터링합니다.",
                    "입구 대기 인원이 임계치 초과 시 실시간 알림을 전송합니다.",
                    "청결 미흡 구역을 포착해 직원 응대 타이밍을 놓치지 않도록 돕습니다."
                ]
            },
            {
                productName: 'StoreInsight',
                title: "회전율·피크 패턴·구역 선호도를 분석",
                iconName: "BarChart3",
                items: [
                    "요일·시간대별 실제 방문객 데이터로 진짜 피크타임을 파악합니다.",
                    "장기 체류 구역과 회전율이 낮은 좌석 패턴을 파악해 공간 최적화 근거를 제공합니다.",
                    "고객이 선호하는 구역과 기피하는 구역을 히트맵으로 시각화합니다."
                ]
            },
            {
                productName: 'StoreAgent',
                title: "혼잡도 알림부터 스케줄 제안까지 실행",
                iconName: "Target",
                items: [
                    "혼잡도 데이터를 바탕으로 파트타임 스케줄 최적화 제안을 제공합니다.",
                    "피크타임 전에 추가 인력 투입 또는 POS 오픈 타이밍을 알려줍니다.",
                    "매일 아침 오늘의 예상 혼잡도와 대응 액션을 브리핑합니다."
                ]
            }
        ],
        loopTagline: "빈 테이블을 포착하고, 회전율 패턴을 확인하고, 스케줄을 최적화하는 루프가 돌아갈수록 공간 효율이 높아집니다.",
        benefits: [
            {
                target: "매장 점주",
                iconName: "TrendingUp",
                description: "피크타임 이탈 손님을 줄이면 매출이 달라집니다. 실제 혼잡도 데이터로 스케줄을 짜면 인건비 효율이 높아집니다. 숫자로 보이면 결정이 쉬워집니다."
            },
            {
                target: "고객 경험",
                iconName: "Heart",
                description: "대기 시간이 줄고 직원 응대가 빨라집니다. 혼잡하지 않은 공간은 재방문율에 직접 영향을 미칩니다."
            }
        ],
        dashboardPreview: {
            content: "라이브 테이블 맵으로 매장 전체를 한눈에",
            detail: "공간 도면 위에 테이블별 점유 상태와 체류 시간이 실시간으로 표시됩니다. 어느 자리가 비었는지, 어느 구역이 막히는지 화면 하나로 파악합니다.",
            image: industryDashboardImages.cafe,
        },
        faq: [
            { question: '테이블 점유 상태를 어떻게 인식하나요?', answer: '천장 카메라가 좌석별 점유 여부를 실시간으로 판별합니다. 좌석 형태(2인석, 4인석, 바 좌석)와 관계없이 99% 이상 정확도로 인식합니다.' },
            { question: '소규모 카페(10평 이하)에도 적용 가능한가요?', answer: '네. 카메라 1~2대로 소규모 매장도 충분히 커버됩니다. 좌석 수가 적을수록 회전율 개선 효과가 바로 체감됩니다.' },
            { question: 'POS 시스템과 연동이 되나요?', answer: '주요 POS(토스, 키오스크형 등)와 API 연동이 가능합니다. 주문 시점과 좌석 점유를 매칭해 회전율을 정확하게 측정합니다.' },
            { question: '피크타임 인력 배치를 자동으로 추천해 주나요?', answer: 'StoreAgent가 과거 데이터 기반으로 시간대별 최적 인원을 추천합니다. 인건비 절감과 서비스 품질 유지를 동시에 달성합니다.' },
            { question: '고객 얼굴을 촬영하나요?', answer: '아닙니다. SAAI는 얼굴 식별 없이 동선과 점유만 파악하는 익명화 기술을 사용합니다. 개인정보보호법을 준수합니다.' },
        ],
        testimonials: [
            { quote: '테이블 회전율이 숫자로 보이니까 피크타임 운영이 완전히 달라졌습니다. 대기 고객 이탈이 확 줄었어요.', speaker: '카페 C 대표', metric: '회전율 23% 향상' },
            { quote: '어떤 좌석이 인기 있고, 어떤 시간대에 비는지 데이터로 알게 되니 인테리어 개편 방향이 명확해졌습니다.', speaker: '프랜차이즈 카페 D 기획팀' },
        ],
        caseStudy: {
            title: '피크타임 동선 분석으로 회전율 개선',
            metric: '점심 회전율 18% 향상',
            summary: '카운터 픽업 동선을 분리해 대기시간을 절반으로 줄이고, 시간당 11명 추가 수용을 달성했습니다.',
        },
        popularFeature: '테이블 점유율 실시간 모니터링',
        relatedIndustries: ['convenience', 'exhibition'],
        cta: {
            text: "피크타임에 돌아가는 손님을 줄일 수 있습니다.",
        }
    },

    unmanned: {
        id: 'unmanned',
        hero: {
            headline: "새벽 3시에도, 매장의 이상 상황을\n실시간으로 확인하세요.",
            subheadline: "AI 상황 감지 알림부터 청결 상태 체크까지. 현장에 상주하지 않아도 24시간 안심할 수 있는 무인 점포 관리 환경을 제공합니다.",
            visualConcept: "한쪽은 점주가 집에서 스마트폰으로 안심하고 쉬는 모습, 다른 한쪽은 새벽 무인매장에서 AI가 비정상 움직임을 인식하고 알림을 보내는 장면.",
            heroImage: industryThumbs.unmanned[1],
            heroVideo: '/videos/unmanned-security-alert.mp4',
        },
        stats: [
            { icon: 'MapPin', stat: '-78%', label: '불필요 방문 횟수 감소' },
            { icon: 'ShieldCheck', stat: '99.1%', label: '이상 감지 정확도' },
            { icon: 'TrendingDown', stat: '-35%', label: '매장 손실율 감소' },
        ],
        painPoints: [
            {
                quote: "새벽에 취객이 매장에서 누워있다면, 어떻게 하실 건가요?",
                description: "장기 체류, 파손, 노숙 등 심야 상황은 다음날 아침에야 알게 됩니다. 그때는 이미 손실이 생겼고, 대처도 늦습니다."
            },
            {
                quote: "음료가 쏟아져 있는데, 다음 손님이 들어오면 어떡하죠?",
                description: "현장 오염이 방치되면 고객 경험이 떨어지고, 반복되면 단골이 끊깁니다. 직접 확인하러 가지 않는 이상 모르고 지나가게 됩니다."
            },
            {
                quote: "현장을 보러 하루에 몇 번이나 나가고 계신가요?",
                description: "'혹시 모르니까' 하는 불안감으로 발걸음이 늘어납니다. 갈 때마다 별일 없는 게 반복되면, 현장 방문 자체가 낭비처럼 느껴집니다."
            }
        ],
        solutions: [
            {
                productName: 'StoreCare',
                title: "이상 행동·청결 방치·출입자를 24시간 감지",
                iconName: "Siren",
                items: [
                    "배회, 쓰러짐, 파손 등 비정상 패턴을 AI가 실시간으로 인식합니다.",
                    "청결 미흡 상태를 인식하여 방치 시간이 길어지기 전에 알림을 전송합니다.",
                    "시간대별 출입자 수와 미결제 이탈 고객 수를 자동으로 집계합니다."
                ]
            },
            {
                productName: 'StoreInsight',
                title: "방문 패턴과 미구매 이탈 동선을 분석",
                iconName: "BarChart3",
                items: [
                    "방문객의 시간대·요일별 패턴을 파악해 운영 관리 일정을 최적화합니다.",
                    "물건을 사지 않고 나간 고객의 동선을 파악해 상품·매대 배치 개선 근거를 제공합니다.",
                    "이상 행동 발생 빈도와 시간대 패턴을 데이터화해 운영 취약 시간대를 파악합니다."
                ]
            },
            {
                productName: 'StoreAgent',
                title: "필요한 순간에만, 정확하게 알려드립니다",
                iconName: "Target",
                items: [
                    "이상 행동 포착 시 해당 클립 영상과 함께 점주 앱으로 실시간 푸시 알림을 전송합니다.",
                    "청소가 필요한 시점에만 알림이 오기 때문에 불필요한 방문 횟수가 줄어듭니다.",
                    "운영 취약 시간대를 파악해 관리 방문 일정 최적화를 제안합니다."
                ]
            }
        ],
        loopTagline: "이상 행동을 탐지하고, 방문 패턴을 파악하고, 필요한 순간에만 알리는 루프가 점주의 발걸음을 줄여줍니다.",
        benefits: [
            {
                target: "운영 효율",
                iconName: "Clock",
                description: "불필요한 현장 방문이 줄어듭니다. '혹시 모르니까' 가던 발걸음이 '문제 생기면 알림 오니까'로 바뀌면 일상이 달라집니다."
            },
            {
                target: "리스크 관리",
                iconName: "Shield",
                description: "기물 파손과 청결 방치를 빠르게 잡으면 로스율이 낮아지고, 쾌적한 환경이 유지되어 단골 고객이 늘어납니다."
            }
        ],
        dashboardPreview: {
            content: "스마트폰에서 바로 보는 24시간 알림 센터",
            detail: "이상 행동 확인 시 알림이 오고, 터치하면 바로 해당 CCTV 화면과 타임라인으로 연결됩니다. 어디서든 현장 상태를 확인할 수 있습니다.",
            image: industryDashboardImages.unmanned,
        },
        faq: [
            { question: '24시간 무인 운영 시 AI 모니터링의 신뢰도는 어느 정도인가요?', answer: '이상 행동(장기 체류, 기물 접촉, 출입 이상) 탐지 정확도 96% 이상입니다. 오탐 시에도 관리자가 실시간 영상을 확인해 빠르게 판단할 수 있습니다.' },
            { question: '도난이 발생하면 어떻게 대응하나요?', answer: '이상 행동 확인 시 관리자 앱으로 푸시 알림 + 해당 CCTV 화면이 전송됩니다. 설정에 따라 경고 음성 송출이나 경비업체 자동 연락도 가능합니다.' },
            { question: '기존 무인매장 키오스크와 연동되나요?', answer: '주요 키오스크·출입관리 시스템과 API 연동이 가능합니다. 결제 이력과 출입 이력을 매칭해 이상 거래를 자동 식별합니다.' },
            { question: '원격으로 여러 지점을 동시에 관리할 수 있나요?', answer: '네. 멀티 점포 대시보드에서 모든 지점의 상태를 한눈에 확인할 수 있습니다. 이상 발생 시 해당 지점 화면으로 바로 전환됩니다.' },
            { question: '야간 조명이 없어도 인식이 가능한가요?', answer: 'IR(적외선) 카메라를 지원하므로 완전 암흑 환경에서도 정상 작동합니다. 저조도 환경에 최적화된 AI 모델을 사용합니다.' },
        ],
        testimonials: [
            { quote: '심야에 이상 행동이 포착되면 30초 안에 알림이 옵니다. 원격으로 확인하고 바로 조치할 수 있어 안심됩니다.', speaker: '무인매장 E 운영자', metric: '사고 대응 시간 68% 단축' },
            { quote: '직원 없이 3개 지점을 운영하는데, SAAI 없이는 불가능했을 겁니다. 도난 시도가 눈에 띄게 줄었어요.', speaker: '무인매장 F 대표', metric: '도난 시도 45% 감소' },
        ],
        popularFeature: '24시간 이상 행동 감지 및 실시간 알림',
        relatedIndustries: ['convenience', 'logistics'],
        cta: {
            text: "오늘 밤부터 AI가 현장을 지켜드립니다.",
        }
    },

    drugstore: {
        id: 'drugstore',
        hero: {
            headline: "테스터를 쥔 그 찰나의 관심이\n다음 달의 히트 상품이 됩니다.",
            subheadline: "매대 앞 체류 시간과 테스터 접촉 횟수를 데이터로 전환합니다. 감에 의존하던 VMD 전략을 수치 기반의 과학적 기획으로 바꾸세요.",
            visualConcept: "프로모션 매대 앞에서 고객이 화장품 테스터를 확인하는 순간, AI가 그 행동을 인식하고 인터랙션 데이터가 팝업되는 모션 그래픽.",
            heroImage: industryThumbs.drugstore[1],
        },
        stats: [
            { icon: 'Sparkles', stat: '+19%', label: 'VMD 전환율 향상' },
            { icon: 'Search', stat: '3.2x', label: '잠재 히트 상품 발굴' },
            { icon: 'Clock', stat: '-65%', label: '기획 보고 시간 단축' },
        ],
        painPoints: [
            {
                quote: "이번 달 기획 매대, 자리값만큼 효율을 내고 있나요?",
                description: "눈에 띄는 위치에 배치했지만 고객이 실제로 얼마나 멈추고, 몇 명이 상품을 손에 들어봤는지 파악이 안 됩니다. '잘 될 것 같아서'는 근거가 되지 않습니다."
            },
            {
                quote: "수많은 테스터 중, 고객이 진짜 관심을 보인 제품은 무엇인가요?",
                description: "구매로 이어지지 않더라도 오래 테스트한 상품에는 신호가 담겨 있습니다. 지금은 그 신호를 잡을 방법이 없습니다."
            },
            {
                quote: "뷰티 코너에서 건강기능식품으로 넘어가는 손님이 얼마나 될까요?",
                description: "구역 간 이동 비율과 교차 판매 동선을 파악하지 못하면, 연관 매대 배치의 효과를 확인할 수가 없습니다."
            }
        ],
        solutions: [
            {
                productName: 'StoreCare',
                title: "테스터 접촉·매대 체류·구역 인원을 감지",
                iconName: "HandHeart",
                items: [
                    "매대 앞 체류 시간과 제품을 직접 집거나 발라보는 행동을 정밀 인식합니다.",
                    "방문객의 성별·연령대를 추정해 구역별 실제 타겟 유입률을 확인합니다.",
                    "VMD 변경 전후의 인터랙션 데이터를 기록해 비교 평가의 기반을 만듭니다."
                ]
            },
            {
                productName: 'StoreInsight',
                title: "관여도·전환율·구역 간 이동 흐름을 분석",
                iconName: "Crosshair",
                items: [
                    "매대별 체류 시간과 테스터 접촉 횟수를 집계해 진짜 관심 상품을 파악합니다.",
                    "스킨케어에서 헤어케어로 넘어가는 비율 등 구역 간 이동 흐름을 매핑합니다.",
                    "프로모션 전후 인터랙션 데이터를 비교해 행사 효과를 수치로 평가합니다."
                ]
            },
            {
                productName: 'StoreAgent',
                title: "VMD 개선 제안과 성과 보고를 자동화합니다",
                iconName: "Target",
                items: [
                    "체류 시간과 전환율 데이터를 바탕으로 다음 VMD 배치를 구체적으로 제안합니다.",
                    "잠재 히트 상품을 조기에 발견해 다음 기획 회의 전에 데이터를 정리해 드립니다.",
                    "프로모션 성과 보고서를 자동 생성해 본사 보고 시간을 단축합니다."
                ]
            }
        ],
        loopTagline: "테스터 반응을 포착하고, 관여도를 평가하고, 다음 VMD를 제안하는 루프가 히트 상품 발굴을 빠르게 합니다.",
        benefits: [
            {
                target: "본사 VMD·마케터",
                iconName: "Sparkles",
                description: "프로모션 성과를 '잘 된 것 같다'가 아닌 체류 시간과 인터랙션 수치로 보고할 수 있습니다. 잠재 히트 상품을 조기에 발견해 다음 기획에 반영하세요."
            },
            {
                target: "매장 점장",
                iconName: "LayoutGrid",
                description: "어느 구역에 고객이 몰리는지 알면 매대 배치 우선순위가 명확해집니다. 발길이 닿지 않는 구석 공간을 줄이고 객단가를 높이세요."
            }
        ],
        dashboardPreview: {
            content: "VMD 성과를 수치로 측정하는 전용 대시보드",
            detail: "공간 도면을 구역별로 나누고, 특정 매대를 선택하면 체류 고객 수 → 테스터 사용률 → 구매 전환율이 퍼널 차트로 표시됩니다. '느낌'이 아닌 숫자로 평가하세요.",
            image: industryDashboardImages.drugstore,
        },
        faq: [
            { question: '드럭스토어 매대 감지 정밀도는 어느 정도인가요?', answer: '진열대 단위(선반 1칸)까지 식별 가능합니다. 상품이 빠진 빈 칸을 자동 감지해 보충 알림을 보냅니다.' },
            { question: '화장품 테스터 사용률도 분석할 수 있나요?', answer: '네. 특정 매대 앞 체류 시간과 상품 관여(집어 듦/내려놓음) 이벤트를 집계해 테스터 활용도를 수치로 측정합니다.' },
            { question: '다층 매장(1~2층)도 지원하나요?', answer: '층별 카메라 배치와 층간 이동 패턴 파악을 지원합니다. 층별 트래픽 비교 리포트도 자동 생성됩니다.' },
            { question: 'VMD 변경 효과를 측정할 수 있나요?', answer: 'VMD 변경 전후의 체류 시간, 전환율, 동선 패턴을 자동 비교해 성과 리포트를 제공합니다.' },
            { question: '성별·연령대별 분석이 가능한가요?', answer: '익명화된 영상에서 대략적인 성별·연령대 추정이 가능합니다. 개인 식별 없이 고객군 트렌드만 파악합니다.' },
        ],
        testimonials: [
            { quote: '매대가 비는 타이밍을 AI가 포착하니까 기회 손실이 확연히 줄었습니다. 보충 속도가 체감될 정도로 빨라졌어요.', speaker: '드럭스토어 G 매장운영팀', metric: '결품 확인 후 보충 시간 82% 단축' },
            { quote: 'VMD 변경 전후 효과를 숫자로 볼 수 있어서, 본사 보고 자료가 훨씬 설득력 있어졌습니다.', speaker: '드럭스토어 H 마케팅팀' },
        ],
        caseStudy: {
            title: '성별 히트맵으로 마케팅 전략 수립',
            metric: '남성 전환율 3배 (11%→33%)',
            summary: '남성 고객 동선 파악 후 입구 매대를 교체해 타겟 상품 판매량이 67% 증가했습니다.',
        },
        popularFeature: '매대 결품 실시간 감지 및 VMD 효과 측정',
        relatedIndustries: ['convenience', 'mart'],
        cta: {
            text: "다음 행사 매대 배치, 데이터 근거를 가지고 결정하세요.",
        }
    },

    mart: {
        id: 'mart',
        hero: {
            headline: "카트를 버리고 떠난 고객의 동선,\n데이터로 분석하세요.",
            subheadline: "입구부터 계산대까지 고객의 전 여정을 매핑합니다. 병목 구간을 해소하고, 데드존을 매출 활성화 구역으로 재설계하세요.",
            visualConcept: "대형마트 전체 평면도가 내려다보이고, 수많은 고객의 이동 궤적이 데이터 흐름으로 매핑되며 메인 동선과 서브 동선이 시각화되는 장면.",
            heroImage: industryThumbs.mart[1],
        },
        stats: [
            { icon: 'ShoppingCart', stat: '-28%', label: '계산대 이탈 감소' },
            { icon: 'Map', stat: '99%', label: '동선 분석 커버리지' },
            { icon: 'TrendingUp', stat: '+15%', label: '데드존 구역 매출 활성화' },
        ],
        painPoints: [
            {
                quote: "고객은 우유를 사러 와서 어떤 경로로 매장을 빠져나갈까요?",
                description: "입점부터 퇴점까지 전체 동선을 파악하지 못하면 교차 판매 기회를 구조적으로 놓칩니다. 어디를 지나치고 어디를 건너뛰는지 알아야 레이아웃을 바꿀 수 있습니다."
            },
            {
                quote: "주말 피크타임, 계산대 줄 때문에 카트를 버리고 가는 고객들.",
                description: "수동적인 인력 배치로 고객 불만이 쌓이고 이탈이 생깁니다. 줄이 얼마나 길어지면 손님이 포기하는지, 지금은 감으로만 판단합니다."
            },
            {
                quote: "축구장만 한 매장, 어느 구역이 지금 죽어가고 있는지 아세요?",
                description: "넓은 면적의 층별·코너별 체류 인원과 유입률을 정밀하게 진단하기 어렵습니다. 데드 스페이스를 방치하면 임대 공간 효율이 낮아집니다."
            }
        ],
        solutions: [
            {
                productName: 'StoreCare',
                title: "대기열·층별 유입·데드 스페이스를 실시간 감지",
                iconName: "Eye",
                items: [
                    "계산대와 인기 코너의 대기 인원·대기 시간을 실시간으로 측정합니다.",
                    "넓은 공간의 층별·구역별 체류 인원과 유입률을 사각지대 없이 파악합니다.",
                    "아무도 가지 않는 구역을 실시간으로 포착해 데드 스페이스를 특정합니다."
                ]
            },
            {
                productName: 'StoreInsight',
                title: "동선 매핑·구역 성과 비교·쇼핑 패턴 분석",
                iconName: "PieChart",
                items: [
                    "다수의 카메라를 연동해 입구부터 계산대까지 주요 이동 경로를 파악합니다.",
                    "층별·카테고리별 구역 유입률과 매대 체류 시간을 다층적으로 진단합니다.",
                    "고객이 지나가는 골든 존과 건너뛰는 구역을 데이터로 특정합니다."
                ]
            },
            {
                productName: 'StoreAgent',
                title: "병목 알림·인력 배치·레이아웃 개선을 제안합니다",
                iconName: "Target",
                items: [
                    "계산대 대기 인원이 임계치를 초과하면 추가 계산대 개방 타이밍을 실시간으로 알립니다.",
                    "실제 트래픽 데이터를 바탕으로 시간대별 최적 인력 배치를 제안합니다.",
                    "데드 스페이스 해소와 동선 재설계에 필요한 구체적인 개선 안을 정리합니다."
                ]
            }
        ],
        loopTagline: "동선을 파악하고, 병목과 데드존을 진단하고, 인력 배치를 제안하는 루프가 대형 공간을 효율적으로 운영합니다.",
        benefits: [
            {
                target: "운영 효율",
                iconName: "Route",
                description: "계산대 병목이 해소되면 고객이 카트를 버리고 나가는 일이 줄어듭니다. 실시간 데이터로 인력을 배치하면 피크타임 대응이 달라집니다."
            },
            {
                target: "매출 증대",
                iconName: "TrendingUp",
                description: "동선 데이터를 바탕으로 레이아웃을 재설계하면 충동구매와 연관 구매가 늘어납니다. 데드 스페이스를 활성화하는 것만으로 매출 밀도가 높아집니다."
            }
        ],
        dashboardPreview: {
            content: "다중 카메라 히트맵과 층별 트래픽을 한 화면에",
            detail: "현장 전체의 실시간 히트맵과 층별 트래픽 흐름도를 통합 모니터링합니다. 어느 구역이 지금 뜨겁고 어느 구역이 비어 있는지 대규모 데이터를 한눈에 확인합니다.",
            image: industryDashboardImages.mart,
        },
        faq: [
            { question: '대형 매장(500평 이상)에 카메라가 몇 대 필요한가요?', answer: '매장 규모와 천장 높이에 따라 다르지만, 500평 기준 15~25대로 주요 동선과 매대를 커버합니다. 현장 진단에서 최적 배치를 제안합니다.' },
            { question: '기존 매장 CCTV 시스템과 호환되나요?', answer: 'IP 카메라(ONVIF 호환) 기반이면 기존 인프라를 그대로 활용합니다. VMS(영상관리시스템)와도 연동 가능합니다.' },
            { question: '구역별 매출 기여도를 알 수 있나요?', answer: '구역별 방문 트래픽 × 체류 시간 × POS 매출을 매칭해 각 구역의 실제 매출 기여도를 산출합니다.' },
            { question: '프로모션 효과를 실시간으로 측정할 수 있나요?', answer: '프로모션 매대 앞 트래픽 변화, 체류 시간, 전환율을 실시간 대시보드에서 확인할 수 있습니다. A/B 비교도 가능합니다.' },
            { question: 'ROI는 어느 정도 기대할 수 있나요?', answer: '도입 고객 평균 3~6개월 내 투자비 회수, 운영비 15~35% 절감 효과를 경험하고 있습니다.' },
        ],
        testimonials: [
            { quote: '500평 공간에서 어느 구역이 비효율적인지 한눈에 보입니다. 프로모션 배치를 바꿨더니 해당 구역 매출이 35% 올랐어요.', speaker: '대형마트 I 점장', metric: '프로모션 구역 매출 35% 증가' },
            { quote: '계산대 대기줄이 길어지면 자동 알림이 와서 바로 추가 개장합니다. 고객 불만이 확 줄었습니다.', speaker: '대형마트 J 운영팀장' },
        ],
        popularFeature: '구역별 트래픽 × 매출 기여도 분석',
        relatedIndustries: ['drugstore', 'logistics'],
        cta: {
            text: "어느 구역에서 매출이 새고 있는지 확인해 보세요.",
        }
    },

    exhibition: {
        id: 'exhibition',
        hero: {
            headline: "작품 앞의 시선이 머무는 시간,\n데이터가 기획의 성과를 말해줍니다.",
            subheadline: "티켓 판매량 너머의 관람객 반응을 포착합니다. 작품별 체류 시간과 동선을 분석하여 큐레이션의 가치를 수치로 증명하고 최적의 전시 환경을 조성하세요.",
            visualConcept: "갤러리 도면 위로, 작품 앞에 관람객이 머물 때마다 바닥에 히트맵이 번져나가고, '평균 체류 시간 3분 20초'라는 데이터 태그가 떠오르는 장면.",
            heroImage: industryThumbs.exhibition[1],
        },
        stats: [
            { icon: 'Star', stat: '+28%', label: '관람 만족도 향상' },
            { icon: 'Clock', stat: '3.2x', label: '주요 작품 체류 시간 증가' },
            { icon: 'AlertTriangle', stat: '-91%', label: '밀집 혼잡 사고 예방' },
        ],
        painPoints: [
            {
                quote: "기획 의도대로 관람객이 순서에 맞게 이동하고 있을까요?",
                description: "관람객의 실제 이동 순서를 확인하지 못하면 역주행이나 이탈 구간을 발견하지 못합니다. 스토리텔링이 잘 전달되는지 알 방법이 없습니다."
            },
            {
                quote: "가장 공들인 메인 작품, 실제로 발길을 얼마나 붙잡았나요?",
                description: "티켓 예매율로는 개별 작품과 구역에 대한 실제 반응도를 알 수 없습니다. '반응이 좋았습니다'를 후원사와 기관에 수치로 전달하기 어렵습니다."
            },
            {
                quote: "주말 오후, 특정 전시실에만 사람이 몰리는 병목 현상.",
                description: "실시간 밀집도를 파악하지 못하면 관람 포기와 안전 문제가 생겨도 늦게 대응하게 됩니다."
            }
        ],
        solutions: [
            {
                productName: 'StoreCare',
                title: "작품별 체류·관람 흐름·구역 밀집도를 감지",
                iconName: "Eye",
                items: [
                    "개별 전시물 앞 체류 시간과 관람객이 멈춘 비율(Stop Rate)을 정밀 측정합니다.",
                    "입구부터 출구까지 관람 동선의 실제 흐름을 데이터로 기록합니다.",
                    "특정 구역의 인원 밀집도가 임계치를 넘으면 운영자에게 실시간 알림을 전송합니다."
                ]
            },
            {
                productName: 'StoreInsight',
                title: "작품 반응도·이탈 구간·관람 패턴을 분석",
                iconName: "BarChart3",
                items: [
                    "체류 시간·Stop Rate 기반으로 반응이 좋았던 작품과 외면받은 작품을 랭킹화합니다.",
                    "관람객이 스쳐 지나가는 구역을 파악해 조명·배치 개선 근거를 제공합니다.",
                    "요일·시간대별 관람 패턴을 파악해 혼잡도 예측과 운영 계획에 활용합니다."
                ]
            },
            {
                productName: 'StoreAgent',
                title: "밀집도 알림과 성과 보고서를 자동화합니다",
                iconName: "Target",
                items: [
                    "구역 밀집도 초과 시 실시간 알림과 함께 동선 분산 안내를 지원합니다.",
                    "전시 기간 동안의 관람 데이터를 정리한 성과 보고서를 자동 생성합니다.",
                    "다음 전시 기획을 위한 작품별 반응도 인사이트를 브리핑 형태로 제공합니다."
                ]
            }
        ],
        loopTagline: "관람 반응을 포착하고, 작품 성과를 평가하고, 운영 알림을 자동화하는 루프가 전시 기획을 데이터화합니다.",
        benefits: [
            {
                target: "기획자·큐레이터",
                iconName: "BookOpen",
                description: "감에 의존하던 전시 성과를 작품별 체류 시간과 동선 데이터로 측정할 수 있습니다. 후원사와 기관에 '반응이 좋았습니다'가 아닌 수치로 보고하세요."
            },
            {
                target: "공간 운영자",
                iconName: "Building2",
                description: "병목 구간을 사전에 파악하고 안전하고 쾌적한 관람 환경을 유지합니다. 데이터는 다음 기획의 설득력을 높이는 자산이 됩니다."
            }
        ],
        dashboardPreview: {
            content: "작품별 체류 시간 랭킹과 실시간 혼잡도를 한눈에",
            detail: "공간 전체의 실시간 혼잡도 게이지와 체류 시간 TOP 작품 차트를 한 화면에서 확인합니다. 전시 현장에서 바로 활용할 수 있는 미니멀한 인터페이스입니다.",
            image: industryDashboardImages.exhibition,
        },
        faq: [
            { question: '단기 전시(1~2주)에도 설치할 수 있나요?', answer: '네. 이동식 카메라 키트로 1일 내 설치·철거가 가능합니다. 단기 팝업이나 행사 전용 패키지도 제공합니다.' },
            { question: '관람객 동선 히트맵의 정밀도는 어느 정도인가요?', answer: '1~2m 단위의 위치 정밀도로 동선을 분석합니다. 작품/부스 앞 체류 시간까지 초 단위로 측정합니다.' },
            { question: '관람객 개인정보는 어떻게 보호하나요?', answer: '얼굴 인식 없이 신체 실루엣만으로 동선을 파악합니다. 영상은 현장 기기에만 저장되며 외부 전송되지 않습니다.' },
            { question: '실시간 혼잡도 안내가 가능한가요?', answer: '구역별 혼잡도 데이터를 실시간으로 디지털 사이니지나 모바일 앱에 연동할 수 있습니다. 관람객 분산 유도에 활용됩니다.' },
            { question: '전시 종료 후 성과 리포트를 받을 수 있나요?', answer: '전시 기간 전체의 방문자 수, 동선 패턴, 작품별 체류 시간 랭킹을 정리한 종합 리포트를 제공합니다.' },
        ],
        testimonials: [
            { quote: '어떤 작품 앞에서 관람객이 오래 머무는지 데이터로 보니, 다음 전시 기획이 훨씬 수월해졌습니다.', speaker: '국립박물관 K 전시기획팀', metric: '관람 체류시간 41% 증가' },
            { quote: '혼잡 구역을 실시간으로 파악해서 안내 인력을 배치하니 관람 만족도 설문 점수가 크게 올랐어요.', speaker: '전시장 L 운영팀' },
        ],
        caseStudy: {
            title: '관람 동선 최적화로 만족도 향상',
            metric: '평균 체류 시간 25% 증가',
            summary: '입구 안내 동선을 역방향으로 전환해 혼잡을 분산시키고 전체 관람 체류시간을 25% 늘렸습니다.',
        },
        popularFeature: '관람 동선 히트맵 및 실시간 혼잡도',
        relatedIndustries: ['mart', 'logistics'],
        cta: {
            text: "다음 전시의 성과를 데이터로 증명할 수 있습니다.",
        }
    },

    logistics: {
        id: 'logistics',
        hero: {
            headline: "사고가 나기 전에 막는 AI,\n현장의 안전과 효율을 지킵니다.",
            subheadline: "안전 장구 미착용부터 위험 구역 무단 접근까지 실시간으로 감지합니다. 데이터 기반의 동선 최적화로 물류 생산성을 극대화하세요.",
            visualConcept: "물류창고 도면 위로 지게차와 작업자의 이동 경로가 실시간으로 매핑되고, 두 동선이 교차하는 위험 구간에 경고 아이콘이 표시되는 장면.",
            heroImage: industryThumbs.logistics[1],
        },
        stats: [
            { icon: 'ShieldAlert', stat: '-82%', label: '안전 사고 발생율 감소' },
            { icon: 'Route', stat: '+18%', label: '작업 동선 효율 향상' },
            { icon: 'HardHat', stat: '99.5%', label: '안전 장구 미착용 감지율' },
        ],
        painPoints: [
            {
                quote: "사각지대에서 장비와 작업자가 마주친다면?",
                description: "장비와 도보 작업자의 동선이 뒤섞인 현장에서 충돌 위험은 언제나 있습니다. 이미 일어난 다음에 알게 되는 구조입니다."
            },
            {
                quote: "수백 명의 작업자, 안전 장구를 규정대로 착용하는지 어떻게 확인하나요?",
                description: "넓은 현장에서 관리자가 일일이 확인하는 건 불가능합니다. 누락이 생겨도 모르고 넘어가면 사고 책임이 커집니다."
            },
            {
                quote: "오늘 출고 속도가 유독 느린 이유, 데이터로 찾고 있나요?",
                description: "작업자의 비효율적인 이동 경로나 특정 구역 병목을 육안으로 파악하기 어렵습니다. 경험에 의존한 개선에는 한계가 있습니다."
            }
        ],
        solutions: [
            {
                productName: 'StoreCare',
                title: "안전 장구 미착용·위험 접근·장비 근접을 감지",
                iconName: "HardHat",
                items: [
                    "안전모, 형광 조끼 등 안전 장구 착용 여부를 24시간 실시간으로 확인합니다.",
                    "지게차·AGV와 작업자의 거리를 확인해 충돌 위험 상황 전에 선제적으로 탐지합니다.",
                    "비인가 인원의 위험 구역 접근을 실시간으로 검출합니다."
                ]
            },
            {
                productName: 'StoreInsight',
                title: "작업 동선 히트맵·병목 구간·피킹 효율을 분석",
                iconName: "Route",
                items: [
                    "작업자들의 주요 이동 경로를 데이터화해 반복적인 병목 구간을 파악합니다.",
                    "피킹 동선 효율을 진단해 보행 거리 단축과 생산성 향상 근거를 제공합니다.",
                    "시간대·구역별 작업자 밀집도를 측정해 인력 재배치의 기준을 만듭니다."
                ]
            },
            {
                productName: 'StoreAgent',
                title: "안전 위반 실시간 알림과 레이아웃 개선을 제안합니다",
                iconName: "RadioTower",
                items: [
                    "미착용, 위험 구역 접근, 장비 근접 확인 시 중앙 관리자에게 실시간 알림을 전송합니다.",
                    "병목 구간 분석 결과를 바탕으로 창고 레이아웃 최적화 방안을 제안합니다.",
                    "안전 규정 준수 현황과 작업 효율 지표를 정기 보고서 형태로 정리합니다."
                ]
            }
        ],
        loopTagline: "위험 상황을 탐지하고, 동선을 진단하고, 즉각 조치를 실행하는 루프가 현장을 안전하고 효율적으로 유지합니다.",
        benefits: [
            {
                target: "안전 관리",
                iconName: "ShieldCheck",
                description: "중대재해는 한 번으로도 현장 전체를 멈출 수 있습니다. AI가 사전에 위험 신호를 잡아내면 사고 발생률을 낮추고 규제 컴플라이언스 관리 부담이 줄어듭니다."
            },
            {
                target: "운영 효율",
                iconName: "Gauge",
                description: "작업 동선 데이터를 바탕으로 레이아웃을 최적화하면 물류 처리 시간이 단축됩니다. 경험이 아닌 수치로 현장 개선의 우선순위를 정하세요."
            }
        ],
        dashboardPreview: {
            content: "현장 도면 기반 안전·물류 통합 관제 센터",
            detail: "실시간 안전 장구 미착용 알림 로그와 구역별 작업자 밀집도 차트를 한 화면에서 모니터링합니다. 현장 도면 위에 직관적으로 표시됩니다.",
            image: industryDashboardImages.logistics,
        },
        faq: [
            { question: '냉동·냉장 창고에서도 카메라가 정상 작동하나요?', answer: '저온 환경(-25°C) 전용 카메라와 히터 하우징을 지원합니다. 결로 방지 기능으로 영상 품질이 유지됩니다.' },
            { question: '안전 장구 미착용을 자동 감지할 수 있나요?', answer: '안전모, 안전조끼, 안전화 등의 착용 여부를 AI가 자동 판별합니다. 미착용 시 관리자 알림이 자동 발송됩니다.' },
            { question: '작업자 프라이버시는 어떻게 보호하나요?', answer: '개인 식별 없이 안전 장구 착용 여부와 동선만 분석합니다. 영상 데이터는 현장 서버에만 저장됩니다.' },
            { question: '기존 WMS(창고관리시스템)와 연동되나요?', answer: '주요 WMS와 API 연동이 가능합니다. 입출고 데이터와 동선 데이터를 매칭해 작업 효율을 정밀 분석합니다.' },
            { question: '넓은 물류센터(1,000평 이상)도 커버 가능한가요?', answer: '구역별 카메라 배치와 엣지 서버 분산 구조로 대규모 시설도 안정적으로 운영합니다. 다중 현장 통합 관제도 지원합니다.' },
        ],
        testimonials: [
            { quote: '안전모 미착용 검출이 도입된 후 안전 규정 준수율이 98%까지 올라갔습니다. 사고가 나기 전에 막아주니 안심됩니다.', speaker: '물류센터 M 안전관리팀', metric: '안전 규정 준수율 98%' },
            { quote: '냉동창고 온도 이상을 3분 만에 감지해서 수억 원 규모의 식자재 손실을 막았습니다.', speaker: '물류기업 N 현장관리팀', metric: '이상 감지 시간 3분 이내' },
        ],
        popularFeature: '안전 장구 미착용 자동 감지',
        relatedIndustries: ['mart', 'unmanned'],
        cta: {
            text: "안전사고가 나기 전에 막을 수 있습니다.",
        }
    },

    fashion: {
        id: 'fashion',
        hero: {
            headline: "디스플레이의 진짜 성과,\n이제 감이 아닌 숫자로 증명하세요.",
            subheadline: "어떤 상품군에 고객이 머무는지, 피팅룸은 얼마나 효율적으로 운영되는지 실시간으로 파악합니다. 데이터로 공간 경험을 정밀하게 설계하세요.",
            visualConcept: "패션 매장 내부에서 고객이 특정 디스플레이 앞에서 멈추는 순간, AI가 체류 시간과 관심도를 데이터로 변환하는 장면.",
            heroImage: industryThumbs.fashion[0],
        },
        stats: [
            { icon: 'Sparkles', stat: '+24%', label: 'VMD 전환율 향상' },
            { icon: 'Users', stat: '3.5x', label: '관심 상품군 발굴 속도' },
            { icon: 'RotateCcw', stat: '+18%', label: '피팅룸 회전율 향상' },
        ],
        painPoints: [
            {
                quote: "디스플레이를 바꿨는데, 실제로 고객이 더 멈추게 됐나요?",
                description: "시즌마다 VMD를 교체하지만 효과를 측정할 방법이 없습니다. '이번 디스플레이 반응이 좋았다'는 직원의 체감에 의존하고 있습니다."
            },
            {
                quote: "고객이 어떤 상품군에 관심을 보이는지, 매출 말고는 알 방법이 없습니다.",
                description: "POS 데이터는 구매한 것만 기록합니다. 오래 살펴봤지만 사지 않은 상품, 만져봤지만 내려놓은 상품에 담긴 신호를 놓치고 있습니다."
            },
            {
                quote: "피팅룸이 항상 부족한데, 실제 활용률은 모릅니다.",
                description: "피팅룸 대기 때문에 고객이 이탈하는지, 비어있는 시간이 얼마나 되는지 파악이 안 되면 공간 배치를 최적화할 수 없습니다."
            }
        ],
        solutions: [
            {
                productName: 'StoreCare',
                title: "디스플레이 체류·피팅룸 점유·구역 인원을 감지",
                iconName: "Eye",
                items: [
                    "주요 디스플레이 앞 체류 시간과 고객이 상품을 만지는 관여 행동을 실시간 인식합니다.",
                    "피팅룸 점유 상태와 대기 인원을 자동으로 모니터링합니다.",
                    "공간 내 구역별 방문 인원과 체류 패턴을 데이터로 수집합니다."
                ]
            },
            {
                productName: 'StoreInsight',
                title: "VMD 효과·동선 히트맵·상품군 관심도를 분석",
                iconName: "BarChart3",
                items: [
                    "디스플레이 교체 전후의 체류 시간과 전환율을 비교해 VMD 효과를 수치로 평가합니다.",
                    "입구에서 피팅룸, 계산대까지 주요 동선을 히트맵으로 시각화합니다.",
                    "상품군별(아우터, 니트, 데님 등) 관심도를 체류 데이터로 순위화합니다."
                ]
            },
            {
                productName: 'StoreAgent',
                title: "VMD 변경 제안과 스태프 배치를 최적화합니다",
                iconName: "Target",
                items: [
                    "관심도가 높은 상품군을 동선 핵심 위치에 배치하는 VMD 변경안을 제안합니다.",
                    "피팅룸 대기가 길어지면 스태프 추가 배치 알림을 보냅니다.",
                    "주간 VMD 성과 리포트와 다음 주 추천 배치를 자동 생성합니다."
                ]
            }
        ],
        loopTagline: "고객 관심을 감지하고, 상품군 트렌드를 파악하고, VMD를 제안하는 루프가 공간을 데이터로 설계합니다.",
        benefits: [
            {
                target: "브랜드 본사 MD팀",
                iconName: "Sparkles",
                description: "VMD 교체 효과를 체류 시간과 전환율로 측정할 수 있습니다. 어떤 디스플레이가 실제로 고객을 멈추게 했는지 데이터로 보고하세요."
            },
            {
                target: "매장 점장",
                iconName: "LayoutGrid",
                description: "동선 데이터를 바탕으로 상품 배치를 최적화하면 객단가가 올라갑니다. 피팅룸 활용률을 높이면 구매 전환이 달라집니다."
            },
            {
                target: "고객 경험",
                iconName: "Heart",
                description: "관심 상품을 찾기 쉬운 동선, 대기 없는 피팅룸, 트렌드에 맞는 디스플레이 — 데이터 기반 설계가 고객 만족도를 높입니다."
            }
        ],
        dashboardPreview: {
            content: "디스플레이별 관심도와 동선 히트맵을 한눈에",
            detail: "공간 도면 위에 구역별 체류 밀도가 히트맵으로 표시되고, 디스플레이별 관심도 랭킹과 피팅룸 활용률을 실시간으로 확인합니다.",
        },
        faq: [
            { question: '의류 매장에서 카메라 배치는 어떻게 하나요?', answer: '천장 카메라로 전체 동선을 커버하고, 주요 디스플레이와 피팅룸 입구에 추가 배치합니다. 30~50평 기준 4~8대로 충분합니다.' },
            { question: '피팅룸 내부도 촬영하나요?', answer: '아닙니다. 피팅룸 입구의 점유 여부만 감지합니다. 내부 촬영은 하지 않으며, 출입 시점만 기록해 활용률을 분석합니다.' },
            { question: 'VMD 변경 효과를 얼마나 빠르게 확인할 수 있나요?', answer: 'VMD 변경 직후부터 데이터 수집이 시작됩니다. 일반적으로 3~5일이면 변경 전후 비교가 가능합니다.' },
            { question: '고객 개인정보는 어떻게 보호하나요?', answer: 'SAAI는 얼굴 인식 없이 신체 실루엣만으로 동선을 분석합니다. 개인 식별이 불가능한 익명화 기술({COMPANY.patentsLabel})을 사용합니다.' },
            { question: '여러 지점을 한꺼번에 비교할 수 있나요?', answer: '네. 본사 대시보드에서 전 지점의 VMD 성과, 동선 패턴, 피팅룸 활용률을 통합 비교할 수 있습니다.' },
        ],
        testimonials: [
            { quote: '디스플레이를 바꿀 때마다 효과를 숫자로 확인할 수 있으니, VMD 기획이 완전히 달라졌습니다. 본사 보고도 훨씬 명확해졌어요.', speaker: '패션 브랜드 O VMD팀', metric: '디스플레이 전환율 31% 향상' },
            { quote: '피팅룸 대기 때문에 이탈하는 고객이 많았는데, 활용률 데이터를 보고 운영을 바꿨더니 구매율이 올라갔습니다.', speaker: '의류 매장 P 매니저', metric: '피팅룸 이탈 42% 감소' },
        ],
        caseStudy: {
            title: 'VMD 동선 분석으로 매출 증가',
            metric: '주력 상품군 매출 22% 상승',
            summary: '입구 디스플레이 교체 후 동선 데이터를 확인해 아우터 구역 배치를 최적화, 한 달 만에 해당 카테고리 매출 22% 상승을 달성했습니다.',
        },
        popularFeature: 'VMD 효과 측정 및 상품군 관심도 분석',
        relatedIndustries: ['drugstore', 'exhibition'],
        cta: {
            text: "다음 시즌 VMD, 데이터 근거를 가지고 설계하세요.",
        }
    }
};
