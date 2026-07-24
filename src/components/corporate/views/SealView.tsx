import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Accordion from '@/components/ui/Accordion';
import { Package, ArrowRight, Plug, Code2, Cpu, ShieldCheck, Database, Share2, type LucideIcon } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, definedTerm } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { SealSdkMockup } from '@/components/mockups';
import LoopVideo from '@/components/ui/LoopVideo';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import MidCta from '@/components/corporate/MidCta';
import { contactEnterpriseHref } from '@/lib/cta-canon';

type Promise = { letter: string; word: string; desc: string };
type Step = { title: string; desc: string };
type FaqItem = { question: string; answer: string };
type BaPair = { label: string; alt: string; original: string; seal: string };
type VisionTask = { name: string; file: string };
type MatrixRow = { feature: string; seal: string; blur: string; mask: string };
type UseCase = { title: string; desc: string };

type Copy = {
  heroBadge: string;
  heroTitleA: string;
  heroTitleB: string;
  heroSub: string;
  heroVideoAria: string;

  problemEyebrow: string;
  problemTitle: string;
  problemSub: string;
  problemItems: { title: string; desc: string; img: string; alt: string }[];

  baEyebrow: string;
  baTitle: string;
  baSub: string;
  baBeforeLabel: string;
  baAfterLabel: string;
  baPairs: BaPair[];

  compareEyebrow: string;
  compareTitle: string;
  compareBody: string;
  fullLabel: string;
  partialLabel: string;
  fullAria: string;
  partialAria: string;
  utilityTitle: string;
  utilityBody: string;
  utilityAlt: string;

  visionEyebrow: string;
  visionTitle: string;
  visionSub: string;
  visionTasks: VisionTask[];

  howEyebrow: string;
  howTitle: string;
  howSub: string;
  howStepLabel: (n: number) => string;
  howSteps: Step[];

  matrixTitle: string;
  matrixSub: string;
  matrixHeadFeature: string;
  matrixHeadSeal: string;
  matrixHeadBlur: string;
  matrixHeadMask: string;
  matrixRows: MatrixRow[];

  dataEyebrow: string;
  dataTitle: string;
  dataSub: string;
  dataFields: { name: string; desc: string }[];
  legalTitle: string;
  legalItems: { region: string; law: string; quote: string }[];
  legalTimeline: { date: string; event: string }[];

  useEyebrow: string;
  useTitle: string;
  useSub: string;
  useCases: UseCase[];

  sdkSectionEyebrow: string;
  sdkSectionTitle: string;
  sdkSectionSub: string;
  promiseEyebrow: string;
  promiseTitle: string;
  promise: Promise[];

  integrationEyebrow: string;
  integrationTitle: string;
  integrationSub: string;
  integrationSteps: Step[];
  stepLabel: (n: number) => string;

  faqEyebrow: string;
  faqTitle: string;
  faqItems: FaqItem[];

  ctaTitle: string;
  ctaSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const VISION_TASKS = (names: string[]): VisionTask[] => [
  { name: names[0], file: 'action-recognition' },
  { name: names[1], file: 'car-detection' },
  { name: names[2], file: 'semantic-segmentation' },
  { name: names[3], file: 'depth-estimation' },
  { name: names[4], file: 'face-landmark' },
  { name: names[5], file: 'person-attribute' },
  { name: names[6], file: 'pose-estimation' },
  { name: names[7], file: 'gender-age' },
];

const ko: Copy = {
  heroBadge: 'SEAL',
  heroTitleA: '개인정보는 지우고,',
  heroTitleB: 'AI가 볼 것은 남깁니다',
  heroSub:
    '영상 속 얼굴과 번호판을 놓치지 않고 익명화하면서, AI 학습에 필요한 특징은 그대로 남기는 영상 익명화 솔루션입니다. 모자이크·블러와 달리 데이터 유용성을 보존하고, 엣지·온프레미스·기존 애플리케이션에 그대로 내장되는 SDK로 제공됩니다. 핵심 익명화 엔진은 Anonymizer이며, SEAL은 이를 SDK로 감싸 어떤 런타임에도 넣습니다.',
  heroVideoAria: '영상 속 얼굴과 번호판이 실시간으로 익명화되는 SEAL 데모',

  problemEyebrow: 'The Problem',
  problemTitle: '영상에는 개인정보가 있고, 가리면 쓸모가 사라집니다',
  problemSub:
    'AI 학습 데이터에서 모든 개인정보가 완벽히 제거됐는지 확인하셨나요? 그리고 기존의 모자이크·블러가 AI 모델의 정확도를 떨어뜨린다는 사실은 알고 계셨나요?',
  problemItems: [
    {
      title: '영상에는 얼굴과 번호판이 남습니다',
      desc: '영상 데이터에 담긴 사람의 얼굴과 자동차 번호판은 개인 식별 정보로 분류됩니다. 그대로 AI 학습이나 공유에 사용하면 개인정보 침해가 되므로, 적절한 비식별화 조치가 필요합니다.',
      img: '/images/technology/seal/problem-pii.webp',
      alt: '영상 프레임 안의 여러 얼굴과 자동차 번호판이 개인정보로 표시된 예시',
    },
    {
      title: '모자이크·블러는 데이터를 망칩니다',
      desc: '흐리게 처리하거나 모자이크를 씌우면 개인정보는 가려지지만, AI 학습에 필요한 특징까지 함께 사라집니다. 이렇게 처리된 영상으로 학습한 AI 모델은 정확도가 떨어집니다.',
      img: '/images/technology/seal/problem-blur.webp',
      alt: '모자이크·블러 처리로 형태가 뭉개져 AI가 인식하기 어려워진 영상 예시',
    },
  ],

  baEyebrow: 'Before / After',
  baTitle: '얼굴도 번호판도, 놓치지 않고 지웁니다',
  baSub:
    '크기·디자인에 관계없이 번호판을, 연령·성별·인종에 관계없이 얼굴을 익명화합니다. 매장·창구 같은 실제 공간에서도 신원만 지우고 장면은 그대로 남습니다. 손잡이를 드래그해 원본과 비교해 보세요.',
  baBeforeLabel: '원본',
  baAfterLabel: 'SEAL 익명화',
  baPairs: [
    { label: '얼굴', alt: '얼굴 익명화 전후 비교', original: '/images/technology/seal/face-original.webp', seal: '/images/technology/seal/face-seal.webp' },
    { label: '번호판', alt: '자동차 번호판 익명화 전후 비교', original: '/images/technology/seal/plate-original.webp', seal: '/images/technology/seal/plate-seal.webp' },
    { label: '매장', alt: '매장 내부 영상 익명화 전후 비교', original: '/images/technology/seal/scene-mart-original.webp', seal: '/images/technology/seal/scene-mart-seal.webp' },
    { label: '창구', alt: '은행 창구 영상 익명화 전후 비교', original: '/images/technology/seal/scene-bank-original.webp', seal: '/images/technology/seal/scene-bank-seal.webp' },
  ],

  compareEyebrow: '전체 vs 부분 익명화',
  compareTitle: '안전이 먼저냐, 활용이 먼저냐 — 둘 다입니다.',
  compareBody:
    '전체 익명화는 장면 전체를 지워 안전을 극대화합니다. 부분 익명화(SEAL)는 신원만 강하게 지우고 분석에 필요한 신호는 남겨, 같은 영상을 개인정보 침해 없이 계속 활용합니다.',
  fullLabel: '전체 익명화 · 안전 중심',
  partialLabel: '부분 익명화 · 활용성 중심',
  fullAria: '장면 전체를 노이즈로 익명화한 영상',
  partialAria: '신원 영역만 익명화하고 분석 신호는 남긴 부분 익명화 영상',
  utilityTitle: 'SEAL은 AI 학습에 필요한 데이터 유용성을 보존합니다',
  utilityBody:
    '흐릿하거나 모자이크 처리된 이미지로 학습한 AI 모델은 실제 대상을 놓칠 수 있습니다. SEAL은 신원을 제외한 필수적인 특징은 그대로 유지해, AI 모델이 올바르게 작동하도록 보장합니다.',
  utilityAlt: '블러·모자이크 처리본과 SEAL 처리본에서 AI 인식 결과가 달라지는 비교 이미지',

  visionEyebrow: 'Proven with Vision Tasks',
  visionTitle: '익명화해도, AI는 그대로 작동합니다',
  visionSub:
    'SEAL로 처리한 데이터는 다양한 AI 비전 태스크에 최적화되어, 개인정보를 보호하면서도 AI 유용성을 그대로 보존합니다.',
  visionTasks: VISION_TASKS([
    '행동 인식', '차량 검출', '시맨틱 분할', '깊이 추정',
    '얼굴 랜드마크', '인물 속성', '자세 추정', '성별·연령 분류',
  ]),

  howEyebrow: 'How it works',
  howTitle: 'SEAL 작동 원리',
  howSub: '업로드부터 규정 준수까지, 세 단계면 끝납니다.',
  howStepLabel: (n) => `Step ${n}`,
  howSteps: [
    { title: '업로드', desc: '간단한 스크립트 또는 GUI로 이미지·동영상을 업로드합니다.' },
    { title: '개인정보 자동 삭제', desc: '얼굴·번호판 등 개인 식별 정보를 자동으로 찾아 지웁니다.' },
    { title: '규정 준수', desc: '익명화된 데이터를 내보내, AI 모델이 개인정보 보호 규정을 준수하도록 합니다.' },
  ],

  matrixTitle: '블러·마스크와 무엇이 다른가',
  matrixSub: '같은 비식별화라도, 데이터의 쓸모가 남느냐가 다릅니다.',
  matrixHeadFeature: '구분',
  matrixHeadSeal: 'SEAL',
  matrixHeadBlur: '블러 처리',
  matrixHeadMask: '마스크 처리',
  matrixRows: [
    { feature: '비식별화', seal: '효율적이고 데이터 가치 유지', blur: '흐릿한 디테일', mask: '완전 마스킹' },
    { feature: '처리 속도', seal: '실시간 처리', blur: '느린 합성', mask: '보통' },
    { feature: '데이터 통합', seal: '핵심 AI 세부 정보 유지', blur: '선명도 손실', mask: '세부 정보 가려짐' },
    { feature: '데이터 유효성', seal: '완전 익명화 + 활용 가능', blur: '흐릿하고 데이터 손실', mask: '세부 정보 손실' },
  ],

  dataEyebrow: 'What Remains',
  dataTitle: '익명화 후, 남는 것의 전부',
  dataSub:
    '영상은 RAM(단기 메모리)에서 즉시 익명화·분석되고, 저장되지 않습니다. 시스템에 남는 로우 데이터는 아래가 전부 — 개인정보·민감정보를 포함하지 않습니다.',
  dataFields: [
    { name: '좌표 (X·Y)', desc: '평면도 기준 객체의 위치' },
    { name: '분석 일시', desc: '분석 일자와 시간' },
    { name: '객체 ID', desc: '신원과 무관한 임의 식별자' },
    { name: '성별대', desc: '성별 분석값' },
    { name: '연령대', desc: '연령 분석값' },
    { name: '직원 여부', desc: '직원·고객 구분' },
    { name: '시선', desc: '고개 방향 분석값' },
    { name: '픽업 여부', desc: '상호작용(집어 듦) 여부' },
  ],
  legalTitle: '각국 법이 정의한 익명 정보 — 그리고 우리가 확인한 것',
  legalItems: [
    { region: 'KR', law: '개인정보보호법 제58조의2', quote: '시간·비용·기술 등을 합리적으로 고려할 때 다른 정보를 사용하여도 더 이상 개인을 알아볼 수 없는 정보에는 적용하지 아니한다.' },
    { region: 'EU', law: 'GDPR Recital 26', quote: 'Anonymous data is not considered personal data. — 익명 정보는 개인정보로 보지 않습니다.' },
    { region: 'US', law: 'CCPA', quote: '비식별화된 소비자 정보의 수집·이용·보유를 제한하지 않습니다.' },
  ],
  legalTimeline: [
    { date: '2021.08', event: '개인정보보호위원회 유권해석 취득' },
    { date: '2021.12', event: '익명화 기술에 대한 법무 자문 완료' },
  ],

  useEyebrow: 'Use cases',
  useTitle: '이미 이렇게 쓰이고 있습니다',
  useSub: '실제 데이터를 개인정보 걱정 없이 쓰는 네 가지 방법.',
  useCases: [
    { title: 'AI 모델 개발', desc: '실제 현장 데이터로 모델 정확도를 높입니다.' },
    { title: '윤리적 AI', desc: '개인정보를 보호하며 윤리적 AI 연구를 진행합니다.' },
    { title: '실데이터 활용', desc: '배포 후에도 실제 데이터로 모델을 지속 개선합니다.' },
    { title: '데이터 공유', desc: '개인정보 문제 없이 데이터셋을 공유하고 장기 보관합니다.' },
  ],

  sdkSectionEyebrow: 'SEAL as an SDK',
  sdkSectionTitle: 'SEAL을 시스템에 넣는 법',
  sdkSectionSub:
    '제품으로서의 SEAL은 SDK로 제공됩니다. 아래 네 가지 설계 원칙과 통합 단계로, 기존 시스템에 익명화를 그대로 내장합니다.',
  promiseEyebrow: 'The SEAL Promise',
  promiseTitle: '네 글자에 담은 설계 원칙',
  promise: [
    { letter: 'S', word: 'Secure', desc: '입력 시점에 신원을 지웁니다. 원본 영상은 시스템 어디에도 남지 않고, 익명화된 데이터에서 신원을 되찾을 수 없습니다.' },
    { letter: 'E', word: 'Embeddable', desc: '엣지 장치·온프레미스 서버·기존 애플리케이션에 모듈 단위로 그대로 내장합니다. 영상은 밖으로 나가지 않습니다.' },
    { letter: 'A', word: 'Adaptable', desc: '여러 사람을 동시에, 동의 없이도 보호합니다. 입력 소스와 보호 강도를 현장에 맞춰 조정합니다.' },
    { letter: 'L', word: 'Lightweight', desc: '실시간 스트림을 그 자리에서 익명화하는 경량 런타임. 제약된 환경에서도 그대로 돌아갑니다.' },
  ],

  integrationEyebrow: 'Integration',
  integrationTitle: '통합 개요',
  integrationSub:
    '입력 연결부터 결과 소비까지 단계별 모듈로 구성되어, 필요한 단계만 골라 조합합니다. 익명화가 항상 첫 단계입니다.',
  integrationSteps: [
    { title: 'SDK 설치', desc: '대상 런타임에 SDK를 추가하고 처리 노드를 초기화합니다.' },
    { title: '입력 연결', desc: 'RTSP·파일·프레임 스트림 등 표준 입력 소스를 연결합니다.' },
    { title: '익명화 우선', desc: '입력 시점에 신원을 지운 뒤, 인식·공간 분석을 필요에 맞게 잇습니다.' },
    { title: '결과 소비', desc: '원본 없이, 익명화된 스트림과 분석 신호만 애플리케이션에서 받아 활용합니다.' },
  ],
  stepLabel: (n) => `step ${n}`,

  faqEyebrow: 'FAQ',
  faqTitle: '자주 묻는 질문',
  faqItems: [
    { question: 'SEAL은 무엇의 약자인가요?', answer: 'Secure, Embeddable, Adaptable, Lightweight — SDK의 4가지 설계 원칙을 나타냅니다.' },
    { question: '동영상도 처리할 수 있나요?', answer: '네. 이미지뿐 아니라 동영상도 익명화합니다. 도입 상담 시 샘플 영상으로 결과를 먼저 확인하실 수 있습니다.' },
    { question: '무료로 먼저 사용해 볼 수 있나요?', answer: '평가용으로 이미지·샘플 영상을 익명화해 결과를 미리 확인하실 수 있습니다. 필요한 분량을 알려 주시면 상담 시 안내드립니다.' },
    { question: '요금제는 어떻게 되나요?', answer: '처리하는 이미지 수·동영상 길이를 기준으로 하며, 대량 처리 시 할인이 적용됩니다. 요건을 공유해 주시면 견적을 드립니다.' },
    { question: 'SEAL 처리 후 데이터 라벨링도 가능한가요?', answer: '가능합니다. 작업·수량·형식·라벨 유형을 공유해 주시면, 견적과 라벨 제작 서비스를 함께 안내드립니다.' },
    { question: '신원은 언제 제거되나요?', answer: '입력 시점에 제거됩니다. 분석 이전, 데이터가 시스템에 들어오는 첫 순간에 얼굴과 신원을 지우고 — 그 뒤 단계는 익명화된 데이터만 다룹니다.' },
    { question: '동의 없이도 보호되나요?', answer: '네. 화면 안 여러 사람을 동시에, 개별 동의 없이 익명화하도록 설계되어 GDPR·CCPA·국내 개인정보보호법 요건에 맞춥니다.' },
    { question: '원본 영상을 보관하나요?', answer: '보관하지 않습니다. 원본은 시스템 어디에도 남지 않고, 익명화된 결과와 분석 신호만 전달합니다.' },
    { question: '익명화된 데이터로 신원을 다시 알 수 있나요?', answer: '없습니다. 재식별이 불가능하도록 설계되어, 익명화된 데이터에서 신원을 되찾을 수 없습니다.' },
    { question: '실시간 처리가 가능한가요?', answer: '실시간 스트림을 그 자리에서 익명화하도록 설계되었으며, 처리 성능은 입력 해상도와 배치 하드웨어에 따라 달라집니다.' },
    { question: '보안·인증은 어떻게 되나요?', answer: 'Privacy by Design을 기본으로, SOC 2 인증을 충족합니다. 어디에 배치하든 같은 프라이버시 기준이 적용됩니다.' },
  ],

  ctaTitle: '익명화를 처음부터, 설계에 넣습니다',
  ctaSub: '운영 환경과 연동 요건을 공유해 주시면, 신원 보호를 내장한 적합한 구성을 함께 설계합니다.',
  ctaPrimary: '도입 문의',
  ctaSecondary: '평가판·샘플 요청',
};

const en: Copy = {
  heroBadge: 'SEAL',
  heroTitleA: 'Erase the identity,',
  heroTitleB: 'keep what AI needs to see',
  heroSub:
    'A video de-identification solution that removes every face and license plate without missing one — while keeping the features AI training needs. Unlike mosaic or blur, it preserves data utility, and it ships as an SDK you embed straight into edge devices, on-prem servers, and existing apps. The core anonymization engine is Anonymizer; SEAL wraps it as an SDK you can drop into any runtime.',
  heroVideoAria: 'SEAL demo anonymizing faces and license plates in a video in real time',

  problemEyebrow: 'The Problem',
  problemTitle: 'Video holds personal data — and hiding it destroys the value',
  problemSub:
    'Have you confirmed every piece of personal data is removed from your AI training set? And did you know that conventional mosaic and blur drag down model accuracy?',
  problemItems: [
    {
      title: 'Faces and plates stay in the footage',
      desc: 'The faces and license plates captured in video are classified as personally identifiable information. Using them as-is for AI training or sharing is a privacy breach — proper de-identification is required.',
      img: '/images/technology/seal/problem-pii.webp',
      alt: 'Example showing multiple faces and license plates in a video frame flagged as personal data',
    },
    {
      title: 'Mosaic and blur ruin the data',
      desc: 'Blurring or masking hides personal data, but it also erases the features AI training relies on. A model trained on footage processed this way loses accuracy.',
      img: '/images/technology/seal/problem-blur.webp',
      alt: 'Example of footage where mosaic and blur smear shapes so AI can no longer recognize them',
    },
  ],

  baEyebrow: 'Before / After',
  baTitle: 'Faces and plates alike — erased, not missed',
  baSub:
    'Plates regardless of size or design, faces regardless of age, gender, or ethnicity. Even in real spaces like stores and teller counters, only identity is removed while the scene stays intact. Drag the handle to compare with the original.',
  baBeforeLabel: 'Original',
  baAfterLabel: 'SEAL',
  baPairs: [
    { label: 'Face', alt: 'Face before and after de-identification', original: '/images/technology/seal/face-original.webp', seal: '/images/technology/seal/face-seal.webp' },
    { label: 'License plate', alt: 'License plate before and after de-identification', original: '/images/technology/seal/plate-original.webp', seal: '/images/technology/seal/plate-seal.webp' },
    { label: 'Store', alt: 'In-store footage before and after de-identification', original: '/images/technology/seal/scene-mart-original.webp', seal: '/images/technology/seal/scene-mart-seal.webp' },
    { label: 'Counter', alt: 'Bank counter footage before and after de-identification', original: '/images/technology/seal/scene-bank-original.webp', seal: '/images/technology/seal/scene-bank-seal.webp' },
  ],

  compareEyebrow: 'Full vs partial anonymization',
  compareTitle: 'Safety first or utility first — both.',
  compareBody:
    'Full anonymization erases the whole scene for maximum safety. Partial anonymization (SEAL) strips only identity while keeping the signals analysis needs — so the same footage stays usable, with no privacy breach.',
  fullLabel: 'Full · safety-first',
  partialLabel: 'Partial · utility-first',
  fullAria: 'Footage with the entire scene anonymized to noise',
  partialAria: 'Partial anonymization — only identity regions erased, analysis signals kept',
  utilityTitle: 'SEAL preserves the data utility AI training needs',
  utilityBody:
    'A model trained on blurred or mosaicked images can miss the real target. SEAL keeps every essential feature except identity, so the AI model keeps working correctly.',
  utilityAlt: 'Comparison of AI recognition results on blur/mosaic footage versus SEAL-processed footage',

  visionEyebrow: 'Proven with Vision Tasks',
  visionTitle: 'De-identified, and AI still works',
  visionSub:
    'Data processed with SEAL is optimized for a range of AI vision tasks, preserving AI utility while guaranteeing privacy.',
  visionTasks: VISION_TASKS([
    'Action Recognition', 'Car Detection', 'Semantic Segmentation', 'Depth Estimation',
    'Face Landmark Detection', 'Person Attribute', 'Pose Estimation', 'Gender / Age Classification',
  ]),

  howEyebrow: 'How it works',
  howTitle: 'How SEAL works',
  howSub: 'From upload to compliance — three steps and you are done.',
  howStepLabel: (n) => `Step ${n}`,
  howSteps: [
    { title: 'Upload', desc: 'Upload images or video through a simple script or GUI.' },
    { title: 'Auto-remove personal data', desc: 'Faces, license plates, and other PII are detected and erased automatically.' },
    { title: 'Stay compliant', desc: 'Export the de-identified data so your AI model meets privacy regulations.' },
  ],

  matrixTitle: 'What sets it apart from blur and masking',
  matrixSub: 'Same de-identification — but the difference is whether the data stays useful.',
  matrixHeadFeature: 'Feature',
  matrixHeadSeal: 'SEAL',
  matrixHeadBlur: 'Blur',
  matrixHeadMask: 'Masking',
  matrixRows: [
    { feature: 'De-identification', seal: 'Efficient, keeps data value', blur: 'Blurred detail', mask: 'Full masking' },
    { feature: 'Speed', seal: 'Real-time', blur: 'Slow synthesis', mask: 'Moderate' },
    { feature: 'Data integrity', seal: 'Keeps key AI detail', blur: 'Loses sharpness', mask: 'Detail hidden' },
    { feature: 'Data validity', seal: 'Fully anonymized + usable', blur: 'Blurred, data loss', mask: 'Detail lost' },
  ],

  dataEyebrow: 'What Remains',
  dataTitle: 'Everything that remains after anonymization',
  dataSub:
    'Footage is anonymized and analyzed in RAM — volatile, never stored. The raw data the system keeps is all of the following, and none of it is personal or sensitive.',
  dataFields: [
    { name: 'Coordinates (X·Y)', desc: 'Position on the floor plan' },
    { name: 'Date & time', desc: 'When the analysis ran' },
    { name: 'Object ID', desc: 'Random identifier, unrelated to identity' },
    { name: 'Gender band', desc: 'Estimated value' },
    { name: 'Age band', desc: 'Estimated value' },
    { name: 'Staff flag', desc: 'Staff vs. customer' },
    { name: 'Gaze', desc: 'Head-direction estimate' },
    { name: 'Pickup', desc: 'Interaction flag' },
  ],
  legalTitle: 'How the law defines anonymous data — and what we confirmed',
  legalItems: [
    { region: 'KR', law: 'PIPA Article 58-2', quote: 'The Act does not apply to information that can no longer identify an individual, even combined with other information, considering time, cost, and technology.' },
    { region: 'EU', law: 'GDPR Recital 26', quote: 'Anonymous data is not considered personal data.' },
    { region: 'US', law: 'CCPA', quote: 'Does not restrict a business’s ability to collect, use, retain, sell, or disclose consumer information that is deidentified.' },
  ],
  legalTimeline: [
    { date: 'Aug 2021', event: 'Interpretation obtained from Korea’s Personal Information Protection Commission' },
    { date: 'Dec 2021', event: 'Legal opinion on the anonymization technology completed' },
  ],

  useEyebrow: 'Use cases',
  useTitle: 'Already put to work',
  useSub: 'Four ways to use real data without the privacy worry.',
  useCases: [
    { title: 'AI model development', desc: 'Raise model accuracy with real field data.' },
    { title: 'Ethical AI', desc: 'Run ethical AI research while protecting personal data.' },
    { title: 'Real-world data', desc: 'Keep improving models with real data after deployment.' },
    { title: 'Data sharing', desc: 'Share and archive datasets long-term with no privacy concerns.' },
  ],

  sdkSectionEyebrow: 'SEAL as an SDK',
  sdkSectionTitle: 'How you put SEAL into your system',
  sdkSectionSub:
    'As a product, SEAL ships as an SDK. The four design principles and integration steps below embed de-identification straight into your existing system.',
  promiseEyebrow: 'The SEAL Promise',
  promiseTitle: 'Design principles in four letters',
  promise: [
    { letter: 'S', word: 'Secure', desc: 'Identity is removed at the moment of input. The original footage is left nowhere in the system, and identity cannot be recovered from anonymized data.' },
    { letter: 'E', word: 'Embeddable', desc: 'Embed it as discrete modules in edge devices, on-prem servers, and existing apps. The video never leaves your environment.' },
    { letter: 'A', word: 'Adaptable', desc: 'Protect everyone in frame — privacy by design, no individual opt-in needed. Tune input sources and protection strength to the site.' },
    { letter: 'L', word: 'Lightweight', desc: 'A lightweight runtime that anonymizes live streams in place — running even in constrained environments.' },
  ],

  integrationEyebrow: 'Integration',
  integrationTitle: 'Integration overview',
  integrationSub:
    'Stage-by-stage modules from input connection to result consumption — pick and combine only what you need. Anonymization is always the first stage.',
  integrationSteps: [
    { title: 'Install the SDK', desc: 'Add the SDK to the target runtime and initialize the processing node.' },
    { title: 'Connect inputs', desc: 'Connect standard input sources such as RTSP, files, and frame streams.' },
    { title: 'Anonymize first', desc: 'Strip identity at the moment of input, then chain recognition and spatial analytics as needed.' },
    { title: 'Consume results', desc: 'No original kept — your app receives only the anonymized stream and analytical signals.' },
  ],
  stepLabel: (n) => `step ${n}`,

  faqEyebrow: 'FAQ',
  faqTitle: 'Frequently asked questions',
  faqItems: [
    { question: 'What does SEAL stand for?', answer: 'Secure, Embeddable, Adaptable, Lightweight — the SDK’s four design principles.' },
    { question: 'Can it process video too?', answer: 'Yes. It de-identifies video as well as images. During an adoption consultation you can see the result on a sample clip first.' },
    { question: 'Can I try it first?', answer: 'You can de-identify sample images or video for evaluation and review the result up front. Tell us the volume you need and we’ll guide you during the consultation.' },
    { question: 'How is it priced?', answer: 'Pricing is based on the number of images and video length, with discounts for high-volume processing. Share your requirements and we’ll prepare a quote.' },
    { question: 'Can data be labeled after SEAL processing?', answer: 'Yes. Share the task, quantity, format, and label types, and we’ll provide a quote and labeling service together.' },
    { question: 'When is identity removed?', answer: 'At the moment of input. Before any analysis, faces and identity are stripped the instant data enters the system — every stage after that handles only anonymized data.' },
    { question: 'Does it work without consent?', answer: 'Yes. It’s designed to anonymize many people in frame at once, with no individual consent required, to meet GDPR, CCPA, and local privacy-law requirements.' },
    { question: 'Is the original footage retained?', answer: 'No. The original is left nowhere in the system; only anonymized results and analytical signals move forward.' },
    { question: 'Can identity be recovered from anonymized data?', answer: 'No. It’s built so re-identification is impossible — identity cannot be recovered from anonymized data.' },
    { question: 'Is real-time processing possible?', answer: 'It’s designed to anonymize live streams in place; performance varies with input resolution and deployment hardware.' },
    { question: 'What about security and certification?', answer: 'Privacy by Design by default, and SOC 2 certified. The same privacy standard applies wherever you deploy.' },
  ],

  ctaTitle: 'We design anonymization in from the start',
  ctaSub: 'Share your operating environment and integration requirements, and we’ll design a fit with identity protection built in.',
  ctaPrimary: 'Get in touch',
  ctaSecondary: 'Request a trial & sample',
};

const jp: Copy = {
  heroBadge: 'SEAL',
  heroTitleA: '個人情報は消し、',
  heroTitleB: 'AIが見るべきものは残す',
  heroSub:
    '映像の中の顔とナンバープレートを見逃さず匿名化しながら、AI学習に必要な特徴はそのまま残す映像匿名化ソリューションです。モザイクやブラーと違いデータの有用性を保ち、エッジ・オンプレミス・既存アプリケーションにそのまま組み込めるSDKとして提供します。中核の匿名化エンジンはAnonymizerであり、SEALはそれをSDKとして包み、どのランタイムにも組み込みます。',
  heroVideoAria: '映像の中の顔とナンバープレートをリアルタイムで匿名化するSEALのデモ',

  problemEyebrow: 'The Problem',
  problemTitle: '映像には個人情報があり、隠すと価値が失われます',
  problemSub:
    'AI学習データからすべての個人情報が完全に取り除かれているか、確認されましたか。そして従来のモザイクやブラーがAIモデルの精度を下げることを、ご存じでしたか。',
  problemItems: [
    {
      title: '映像には顔とナンバープレートが残ります',
      desc: '映像データに含まれる人の顔や自動車のナンバープレートは、個人識別情報に分類されます。そのままAI学習や共有に使うと個人情報侵害になるため、適切な匿名化が必要です。',
      img: '/images/technology/seal/problem-pii.webp',
      alt: '映像フレーム内の複数の顔と自動車のナンバープレートが個人情報として示された例',
    },
    {
      title: 'モザイク・ブラーはデータを損ないます',
      desc: 'ぼかしやモザイクをかけると個人情報は隠れますが、AI学習に必要な特徴まで一緒に失われます。こうして処理した映像で学習したAIモデルは精度が落ちます。',
      img: '/images/technology/seal/problem-blur.webp',
      alt: 'モザイク・ブラー処理で形が崩れ、AIが認識しにくくなった映像の例',
    },
  ],

  baEyebrow: 'Before / After',
  baTitle: '顔もナンバープレートも、見逃さず消します',
  baSub:
    'サイズやデザインに関係なくナンバープレートを、年齢・性別・人種に関係なく顔を匿名化します。店舗やカウンターのような実際の空間でも、身元だけを消して場面はそのまま残します。ハンドルをドラッグして原本と比べてみてください。',
  baBeforeLabel: '原本',
  baAfterLabel: 'SEAL',
  baPairs: [
    { label: '顔', alt: '顔の匿名化 前後比較', original: '/images/technology/seal/face-original.webp', seal: '/images/technology/seal/face-seal.webp' },
    { label: 'ナンバープレート', alt: '自動車ナンバープレートの匿名化 前後比較', original: '/images/technology/seal/plate-original.webp', seal: '/images/technology/seal/plate-seal.webp' },
    { label: '店舗', alt: '店内映像の匿名化 前後比較', original: '/images/technology/seal/scene-mart-original.webp', seal: '/images/technology/seal/scene-mart-seal.webp' },
    { label: 'カウンター', alt: '銀行カウンター映像の匿名化 前後比較', original: '/images/technology/seal/scene-bank-original.webp', seal: '/images/technology/seal/scene-bank-seal.webp' },
  ],

  compareEyebrow: '全体 vs 部分匿名化',
  compareTitle: '安全が先か、活用が先か——どちらもです。',
  compareBody:
    '全体匿名化は場面全体を消して安全を最大化します。部分匿名化（SEAL）は身元だけを強く消し、分析に必要な信号は残すため、同じ映像をプライバシー侵害なく使い続けられます。',
  fullLabel: '全体・安全重視',
  partialLabel: '部分・活用重視',
  fullAria: '場面全体をノイズで匿名化した映像',
  partialAria: '身元領域だけを匿名化し、分析信号は残した部分匿名化の映像',
  utilityTitle: 'SEALはAI学習に必要なデータの有用性を保ちます',
  utilityBody:
    'ぼやけた画像やモザイク処理された画像で学習したAIモデルは、実際の対象を見逃すことがあります。SEALは身元を除く必須の特徴をそのまま維持し、AIモデルが正しく動作するよう保証します。',
  utilityAlt: 'ブラー・モザイク処理本とSEAL処理本でAIの認識結果が変わる比較画像',

  visionEyebrow: 'Proven with Vision Tasks',
  visionTitle: '匿名化しても、AIはそのまま動きます',
  visionSub:
    'SEALで処理したデータはさまざまなAIビジョンタスクに最適化され、個人情報を保護しながらAIの有用性をそのまま保ちます。',
  visionTasks: VISION_TASKS([
    '行動認識', '車両検出', 'セマンティック分割', '深度推定',
    '顔ランドマーク', '人物属性', '姿勢推定', '性別・年齢分類',
  ]),

  howEyebrow: 'How it works',
  howTitle: 'SEALの仕組み',
  howSub: 'アップロードから規制順守まで、3ステップで完了します。',
  howStepLabel: (n) => `Step ${n}`,
  howSteps: [
    { title: 'アップロード', desc: '簡単なスクリプトまたはGUIで画像・動画をアップロードします。' },
    { title: '個人情報を自動削除', desc: '顔・ナンバープレートなどの個人識別情報を自動で見つけて消します。' },
    { title: '規制順守', desc: '匿名化されたデータを書き出し、AIモデルが個人情報保護規制を順守するようにします。' },
  ],

  matrixTitle: 'ブラー・マスクと何が違うのか',
  matrixSub: '同じ匿名化でも、データの有用性が残るかどうかが違います。',
  matrixHeadFeature: '項目',
  matrixHeadSeal: 'SEAL',
  matrixHeadBlur: 'ブラー処理',
  matrixHeadMask: 'マスク処理',
  matrixRows: [
    { feature: '匿名化', seal: '効率的でデータ価値を維持', blur: 'ぼやけたディテール', mask: '完全マスキング' },
    { feature: '処理速度', seal: 'リアルタイム処理', blur: '遅い合成', mask: '普通' },
    { feature: 'データ統合', seal: '重要なAI詳細を維持', blur: '鮮明度の損失', mask: '詳細が隠れる' },
    { feature: 'データ有効性', seal: '完全匿名化＋活用可能', blur: 'ぼやけてデータ損失', mask: '詳細が損失' },
  ],

  dataEyebrow: 'What Remains',
  dataTitle: '匿名化のあとに残るもの、そのすべて',
  dataSub:
    '映像はRAM（短期メモリ）上で即座に匿名化・分析され、保存されません。システムに残るローデータは以下がすべてで、個人情報・機微情報を含みません。',
  dataFields: [
    { name: '座標（X·Y）', desc: '平面図基準の位置' },
    { name: '分析日時', desc: '分析の日付と時刻' },
    { name: 'オブジェクトID', desc: '身元と無関係なランダム識別子' },
    { name: '性別帯', desc: '推定値' },
    { name: '年齢帯', desc: '推定値' },
    { name: 'スタッフ判定', desc: 'スタッフ・顧客の区分' },
    { name: '視線', desc: '頭の向きの推定値' },
    { name: 'ピックアップ', desc: '手に取ったかどうか' },
  ],
  legalTitle: '各国の法が定義する匿名情報 — そして私たちが確認したこと',
  legalItems: [
    { region: 'KR', law: '個人情報保護法 第58条の2', quote: '時間・費用・技術などを合理的に考慮したとき、他の情報を用いてももはや個人を識別できない情報には適用しない。' },
    { region: 'EU', law: 'GDPR Recital 26', quote: 'Anonymous data is not considered personal data. — 匿名情報は個人データとみなされません。' },
    { region: 'US', law: 'CCPA', quote: '非識別化された消費者情報の収集・利用・保持を制限しません。' },
  ],
  legalTimeline: [
    { date: '2021.08', event: '個人情報保護委員会の有権解釈を取得' },
    { date: '2021.12', event: '匿名化技術に関する法務意見を完了' },
  ],

  useEyebrow: 'Use cases',
  useTitle: 'すでにこう使われています',
  useSub: '実データをプライバシーの心配なく使う、4つの方法。',
  useCases: [
    { title: 'AIモデル開発', desc: '実際の現場データでモデルの精度を高めます。' },
    { title: '倫理的AI', desc: '個人情報を守りながら倫理的AI研究を進めます。' },
    { title: '実データ活用', desc: '配置後も実データでモデルを継続的に改善します。' },
    { title: 'データ共有', desc: '個人情報の心配なくデータセットを共有し、長期保管します。' },
  ],

  sdkSectionEyebrow: 'SEAL as an SDK',
  sdkSectionTitle: 'SEALをシステムに組み込む方法',
  sdkSectionSub:
    '製品としてのSEALはSDKとして提供されます。以下の4つの設計原則と統合ステップで、既存システムに匿名化をそのまま組み込みます。',
  promiseEyebrow: 'The SEAL Promise',
  promiseTitle: '4つの文字に込めた設計原則',
  promise: [
    { letter: 'S', word: 'Secure', desc: '入力の時点で身元を消します。原本映像はシステムのどこにも残らず、匿名化されたデータから身元を復元することはできません。' },
    { letter: 'E', word: 'Embeddable', desc: 'エッジ機器・オンプレミスサーバー・既存アプリケーションにモジュール単位でそのまま組み込みます。映像は外に出ません。' },
    { letter: 'A', word: 'Adaptable', desc: '複数の人を同時に、同意なしでも保護します。入力ソースと保護の強度を現場に合わせて調整できます。' },
    { letter: 'L', word: 'Lightweight', desc: 'リアルタイムのストリームをその場で匿名化する軽量ランタイム。制約のある環境でもそのまま動きます。' },
  ],

  integrationEyebrow: 'Integration',
  integrationTitle: '統合の概要',
  integrationSub:
    '入力接続から結果の利用まで段階ごとのモジュールで構成され、必要な段階だけを選んで組み合わせられます。匿名化が常に最初の段階です。',
  integrationSteps: [
    { title: 'SDKのインストール', desc: '対象ランタイムにSDKを追加し、処理ノードを初期化します。' },
    { title: '入力の接続', desc: 'RTSP・ファイル・フレームストリームなど標準的な入力ソースを接続します。' },
    { title: 'まず匿名化', desc: '入力の時点で身元を消し、その後に認識・空間分析を必要に応じてつなぎます。' },
    { title: '結果の利用', desc: '原本を残さず、匿名化されたストリームと分析信号だけをアプリケーションで受け取り活用します。' },
  ],
  stepLabel: (n) => `step ${n}`,

  faqEyebrow: 'FAQ',
  faqTitle: 'よくあるご質問',
  faqItems: [
    { question: 'SEALは何の略ですか？', answer: 'Secure, Embeddable, Adaptable, Lightweight——SDKの4つの設計原則を表します。' },
    { question: '動画も処理できますか？', answer: 'はい。画像だけでなく動画も匿名化します。導入のご相談時に、サンプル映像で結果を先にご確認いただけます。' },
    { question: 'まず無料で試せますか？', answer: '評価用に画像・サンプル映像を匿名化し、結果を事前にご確認いただけます。必要な分量をお知らせいただければ、ご相談時にご案内します。' },
    { question: '料金プランはどうなっていますか？', answer: '処理する画像数・動画の長さを基準とし、大量処理には割引が適用されます。要件を共有いただければお見積もりをご用意します。' },
    { question: 'SEAL処理後のデータラベリングは可能ですか？', answer: '可能です。作業・数量・形式・ラベルの種類を共有いただければ、お見積もりとラベル作成サービスを併せてご案内します。' },
    { question: '身元はいつ消されますか？', answer: '入力の時点です。分析の前、データがシステムに入る最初の瞬間に顔と身元を消し——その後の段階は匿名化されたデータのみを扱います。' },
    { question: '同意なしでも保護されますか？', answer: 'はい。画面内の複数の人を同時に、個別の同意なしで匿名化するよう設計され、GDPR・CCPA・国内の個人情報保護法の要件に適合します。' },
    { question: '原本映像を保管しますか？', answer: '保管しません。原本はシステムのどこにも残さず、匿名化された結果と分析信号のみを受け渡します。' },
    { question: '匿名化されたデータから身元を再び特定できますか？', answer: 'できません。再識別が不可能になるよう設計され、匿名化されたデータから身元を復元することはできません。' },
    { question: 'リアルタイム処理は可能ですか？', answer: 'リアルタイムのストリームをその場で匿名化するよう設計されており、処理性能は入力解像度や配置ハードウェアによって異なります。' },
    { question: 'セキュリティ・認証はどうなっていますか？', answer: 'Privacy by Designを基本とし、SOC 2認証を満たします。どこに配置しても同じプライバシー基準が適用されます。' },
  ],

  ctaTitle: '匿名化を、最初から設計に組み込みます',
  ctaSub: '運用環境と連携要件を共有いただければ、身元保護を内蔵した適切な構成を一緒に設計します。',
  ctaPrimary: 'お問い合わせ',
  ctaSecondary: '評価版・サンプルを申請',
};

const C: Record<Locale, Copy> = { ko, en, jp };
const useCaseIcons: LucideIcon[] = [Cpu, ShieldCheck, Database, Share2];

export default function SealView({ locale }: { locale: Locale }) {
  const t = C[locale];

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={definedTerm({ name: t.heroBadge, description: t.heroSub, path: '/technology/seal', locale })} />

      {/* 1. Hero + intro video */}
      <section className="relative pt-28 pb-20 lg:pt-36 bg-slate-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: crumb('technology', locale), path: '/technology' }, { name: crumb('seal', locale), path: '/technology/seal' }]} locale={locale} tone="light" className="mb-6" />
          <HeroBadge tone="light">
            <Package className="w-3.5 h-3.5" />
            {t.heroBadge}
          </HeroBadge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-6 break-keep">
            <WordRise text={t.heroTitleA} /><br className="hidden sm:block" />
            <WordRise text={t.heroTitleB} />
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl break-keep mb-10">
            {t.heroSub}
          </p>
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 shadow-card">
            <LoopVideo mp4="/videos/seal-intro.mp4" poster="/images/technology/seal/seal-intro-poster.webp" ariaLabel={t.heroVideoAria} className="block h-auto w-full" />
          </div>
        </div>
      </section>

      {/* 2. Problem */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.problemEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{t.problemTitle}</h2>
            <p className="text-gray-600 leading-relaxed break-keep">{t.problemSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.problemItems.map((p) => (
              <div key={p.title} className="rounded-2xl border border-gray-100 bg-gray-50/60 overflow-hidden">
                <div className="relative aspect-[3/2] w-full bg-gray-100">
                  <Image src={p.img} alt={p.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-2 break-keep">{p.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Before/After 증명 — 문제 제기와 한 섹션으로 병합(②5-1: 가장 강한 시각 증거를 바로 잇는다) */}
          <div className="mt-16 pt-14 border-t border-gray-100">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.baEyebrow}</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{t.baTitle}</h3>
              <p className="text-gray-600 leading-relaxed break-keep">{t.baSub}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {t.baPairs.map((pair, i) => (
                <BeforeAfterSlider
                  key={pair.label}
                  beforeSrc={pair.original}
                  afterSrc={pair.seal}
                  beforeLabel={t.baBeforeLabel}
                  afterLabel={t.baAfterLabel}
                  caption={pair.label}
                  alt={pair.alt}
                  nudge={i === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 2. 왜 블러·마스크가 아닌가 — compare + utility + matrix 통합(②5-1 중복 제거) */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.compareEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{t.compareTitle}</h2>
            <p className="text-gray-600 leading-relaxed break-keep">{t.compareBody}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <figure>
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 shadow-card">
                <LoopVideo mp4="/videos/seal-full-anon.mp4" poster="/images/technology/seal-full-poster.webp" ariaLabel={t.fullAria} className="block h-auto w-full" />
              </div>
              <figcaption className="mt-3 text-sm font-medium text-gray-900 break-keep">{t.fullLabel}</figcaption>
            </figure>
            <figure>
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 shadow-card">
                <LoopVideo mp4="/videos/seal-partial-anon.mp4" poster="/images/technology/seal-partial-poster.webp" ariaLabel={t.partialAria} className="block h-auto w-full" />
              </div>
              <figcaption className="mt-3 text-sm font-medium text-primary break-keep">{t.partialLabel}</figcaption>
            </figure>
          </div>

          <div className="mt-16 grid lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 break-keep">{t.utilityTitle}</h3>
              <p className="text-gray-600 leading-relaxed break-keep">{t.utilityBody}</p>
            </div>
            <div className="relative aspect-[5/2] w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm">
              <Image src="/images/technology/seal/utility-preserved.webp" alt={t.utilityAlt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            </div>
          </div>

          {/* 비교 매트릭스 — compare·utility와 같은 주장이라 한 섹션으로 통합(②5-1) */}
          <div className="mt-16 pt-14 border-t border-gray-100">
            <div className="mb-10 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 break-keep">{t.matrixTitle}</h3>
              <p className="text-gray-600 leading-relaxed break-keep">{t.matrixSub}</p>
            </div>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-gray-500 py-3 px-4 border-b border-gray-200">{t.matrixHeadFeature}</th>
                    <th className="text-left font-bold text-primary py-3 px-4 border-b-2 border-primary bg-primary-lighter rounded-t-lg">{t.matrixHeadSeal}</th>
                    <th className="text-left font-medium text-gray-700 py-3 px-4 border-b border-gray-200">{t.matrixHeadBlur}</th>
                    <th className="text-left font-medium text-gray-700 py-3 px-4 border-b border-gray-200">{t.matrixHeadMask}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.matrixRows.map((row) => (
                    <tr key={row.feature}>
                      <td className="py-3 px-4 border-b border-gray-100 font-medium text-gray-900 break-keep">{row.feature}</td>
                      <td className="py-3 px-4 border-b border-gray-100 bg-primary-lighter/50 text-gray-900 font-medium break-keep">{row.seal}</td>
                      <td className="py-3 px-4 border-b border-gray-100 text-gray-500 break-keep">{row.blur}</td>
                      <td className="py-3 px-4 border-b border-gray-100 text-gray-500 break-keep">{row.mask}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. Vision tasks */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.visionEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{t.visionTitle}</h2>
            <p className="text-gray-600 leading-relaxed break-keep">{t.visionSub}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {t.visionTasks.map((task) => (
              <figure key={task.file} className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                <div className="relative aspect-[3/2] w-full bg-gray-100">
                  <Image src={`/images/technology/seal/tasks/${task.file}.webp`} alt={task.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                </div>
                <figcaption className="px-4 py-3 text-sm font-medium text-gray-900 break-keep">{task.name}</figcaption>
              </figure>
            ))}
          </div>

          {/* 작동 3단계 — 검증(vision tasks)과 메커니즘을 한 섹션으로(②5-1 재편) */}
          <div className="mt-16 pt-14 border-t border-gray-200">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.howEyebrow}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 break-keep">{t.howTitle}</h3>
              <p className="text-gray-600 leading-relaxed break-keep">{t.howSub}</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {t.howSteps.map((step, i) => (
                <div key={step.title} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                  <div className="relative aspect-[3/2] w-full bg-gray-100 border-b border-gray-100">
                    <Image src={`/images/technology/seal/flow-0${i + 1}.webp`} alt={`${t.howStepLabel(i + 1)} — ${step.title}`} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-mono font-bold text-primary">{t.howStepLabel(i + 1)}</span>
                    <h4 className="text-base font-bold text-gray-900 mt-1 mb-2 break-keep">{step.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 미드 CTA(②A-3·5-2) — 검증을 본 직후, 샘플로 확인 유도 */}
          <MidCta
            locale={locale}
            className="mt-14"
            label={t.ctaSecondary}
            href={contactEnterpriseHref('seal')}
            lead={
              locale === 'ko'
                ? '샘플 영상으로 결과를 먼저 확인해 보세요.'
                : locale === 'jp'
                ? 'サンプル映像で結果を先にご確認ください。'
                : 'See the result on a sample video first.'
            }
          />
        </div>
      </AnimatedSection>

      {/* 8. What remains — raw-data spec + legal basis */}
      <AnimatedSection className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.dataEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{t.dataTitle}</h2>
            <p className="text-gray-600 leading-relaxed break-keep">{t.dataSub}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
            {t.dataFields.map((f) => (
              <div key={f.name} className="p-4 rounded-xl border border-gray-100 bg-gray-50/60">
                <p className="text-sm font-bold text-gray-900 mb-1">{f.name}</p>
                <p className="text-xs text-gray-500 break-keep">{f.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 break-keep">{t.legalTitle}</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {t.legalItems.map((item) => (
              <div key={item.law} className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">{item.region}</span>
                  <p className="text-sm font-bold text-gray-900">{item.law}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">“{item.quote}”</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {t.legalTimeline.map((item) => (
              <div key={item.date} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-lighter border border-primary/10">
                <span className="text-sm font-bold font-mono text-primary shrink-0">{item.date}</span>
                <span className="text-sm text-gray-700 break-keep">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 10. SEAL as an SDK — promise + code mockup + integration (+ use cases 흡수, ②5-1) */}
      <AnimatedSection className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.sdkSectionEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{t.sdkSectionTitle}</h2>
            <p className="text-gray-600 leading-relaxed break-keep">{t.sdkSectionSub}</p>
          </div>

          {/* S/E/A/L promise */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {t.promise.map((p) => (
              <div key={p.letter} className="card p-7 h-full">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-primary font-mono leading-none">{p.letter}</span>
                  <span className="text-base font-bold text-gray-900">{p.word}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* SDK code-editor showcase */}
          <div className="rounded-2xl overflow-hidden bg-slate-900 p-6 sm:p-10 mb-16">
            <SealSdkMockup locale={locale} />
          </div>

          {/* Integration overview */}
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.integrationEyebrow}</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 break-keep">{t.integrationTitle}</h3>
            <p className="text-gray-600 leading-relaxed break-keep">{t.integrationSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.integrationSteps.map((step, i) => (
              <div key={step.title} className="card p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary-lighter flex items-center justify-center shrink-0">
                    {i === 0 ? <Code2 className="w-4 h-4 text-primary" /> : <Plug className="w-4 h-4 text-primary" />}
                  </div>
                  <span className="text-xs font-mono font-medium text-gray-500">{t.stepLabel(i + 1)}</span>
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Use cases — SDK 도입 실무 하위로 흡수(②5-1) */}
          <div className="mt-16 pt-14 border-t border-gray-100">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.useEyebrow}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 break-keep">{t.useTitle}</h3>
              <p className="text-gray-600 leading-relaxed break-keep">{t.useSub}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {t.useCases.map((u, i) => {
                const Icon = useCaseIcons[i];
                return (
                  <div key={u.title} className="card p-7 h-full">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-2 break-keep">{u.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{u.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 11. FAQ */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.faqEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep">
              {t.faqTitle}
            </h2>
          </div>
          <Accordion items={t.faqItems} idPrefix="seal-faq" />
        </div>
      </AnimatedSection>

      {/* 12. CTA */}
      <AnimatedSection className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 break-keep">
            {t.ctaTitle}
          </h2>
          <p className="text-gray-600 text-lg mb-9 break-keep">
            {t.ctaSub}
          </p>
          {/* 이중 CTA(② D2·5-2): 주=도입 문의(트랙 E 표준 목적지), 보조=평가판·샘플(FAQ 무료 평가 연결) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localeHref(locale, contactEnterpriseHref('seal'))} className="btn-primary btn-lg gap-2">
              {t.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:SAAI@deepingsource.io?subject=${encodeURIComponent(t.ctaSecondary)}`}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-[14px] hover:border-primary-light transition-colors"
            >
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
