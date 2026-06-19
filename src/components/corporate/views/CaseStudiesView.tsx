import Link from 'next/link';
import {
  Store,
  Building2,
  Pill,
  Coffee,
  Landmark,
  Search,
  SearchCheck,
  Languages,
  Share2,
  RefreshCw,
  ArrowRight,
  Quote,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CaseStudyChartMockup } from '@/components/mockups';
import { crumb } from '@/lib/breadcrumb-labels';
import { type Locale, localeHref } from '@/lib/i18n';

/**
 * CaseStudiesView — shared case-studies composition.
 * Rendered by `/resources/case-studies` (en), `/ko/resources/case-studies`,
 * `/jp/resources/case-studies` with the locale prop (PLAN_v1.1 D6 path-prefix i18n).
 * Product names stay identical across locales.
 */

const stepIcons = [Search, SearchCheck, Languages, Share2, RefreshCw];
const caseIcons = [Store, Building2, Pill, Coffee, Landmark];
const caseIds = ['smb-53', 'cvs-100', 'drug-translate', 'cafe-sync', 'space-remeasure'];
const caseSteps = ['01', '02', '03', '04', '05'];
const caseProducts = [
  ['StoreCare Anomaly', 'StoreCare Clean', 'StoreCare Refrig', 'StoreCare Shelf'],
  ['Store Insight', 'Store Agent', 'Store Care'],
  ['Store Insight', 'Store Agent'],
  ['Store Care (Clean)', 'Store Insight'],
  ['Anonymizer (SEAL)', 'Spatial AI (MTMC)', 'Store Insight'],
];
// metric verified flags are locale-invariant
const metricVerified = [
  [true, true, true, true],
  [false, false, false, true],
  [false, false, false, false],
  [false, false, false, true],
  [false, false, false, false],
];

type StepCopy = { en: string; title: string };
type CaseCopy = {
  stepTitle: string;
  industry: string;
  audience: string;
  headline: string;
  sub: string;
  context: string;
  before: string;
  after: string;
  metrics: { label: string; value: string }[];
  quotes: { text: string; who: string }[];
  note: string;
};

const C: Record<Locale, {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  goldenEyebrow: string;
  goldenHeading: string;
  goldenSubBefore: string;
  goldenEnterprise: string;
  goldenSubAfter: string;
  steps: StepCopy[];
  disclaimerMeasured: string;
  disclaimerMeasuredRest: string;
  disclaimerIllustrative: string;
  disclaimerIllustrativeRest: string;
  audienceLabel: string;
  beforeLabel: string;
  afterLabel: string;
  measuredBadge: string;
  illustrativeBadge: string;
  cases: CaseCopy[];
  ctaEyebrow: string;
  ctaHeading: string;
  ctaButton: string;
}> = {
  ko: {
    eyebrow: 'Case Studies',
    heroTitle: '약속이 아니라 측정',
    heroSub: '5건의 사례를 Golden Case 5단계 — 발견·검증·번역·전파·재측정 — 순서대로 읽으면 한 매장의 성공이 어떻게 전국으로 옮겨가는지 보입니다.',
    goldenEyebrow: 'Golden Case',
    goldenHeading: '한 매장의 성공을 전국으로 옮기는 5단계',
    goldenSubBefore: '아래 5건의 사례는 각 단계를 대표합니다. 본사 운영 사이클과의 연결은 ',
    goldenEnterprise: 'Enterprise',
    goldenSubAfter: ' 페이지에서 더 볼 수 있습니다.',
    steps: [
      { en: 'Discover', title: '발견' },
      { en: 'Verify', title: '검증' },
      { en: 'Translate', title: '번역' },
      { en: 'Sync', title: '전파' },
      { en: 'Re-measure', title: '재측정' },
    ],
    disclaimerMeasured: '실측',
    disclaimerMeasuredRest: '으로 표기된 수치는 2025.12~2026.01 53개 매장 현장 측정값입니다.',
    disclaimerIllustrative: ' 예시',
    disclaimerIllustrativeRest: '로 표기된 수치는 설명을 돕기 위한 가상의 값으로, 실제 도입 성과를 보장하지 않습니다.',
    audienceLabel: '청자 · ',
    beforeLabel: 'Before',
    afterLabel: 'After',
    measuredBadge: '실측',
    illustrativeBadge: '예시',
    cases: [
      {
        stepTitle: '발견',
        industry: '편의점 · 무인매장',
        audience: '점주 (본사 보강)',
        headline: '53개 매장이 증명한 변화',
        sub: '약속이 아니라 측정. 편의점 32곳·무인매장 21곳, 두 달의 기록.',
        context: '53명 점주의 하루는 CCTV를 반복해 들여다보는 일에서 시작됐습니다. StoreCare 4개 모듈을 전수 도입해, 매장에 없어도 이상·청결·냉장·진열을 알림으로 먼저 받도록 바꿨습니다.',
        before: '하루 종일 CCTV를 직접 확인 · 문제는 늘 사후 대응',
        after: '이상 상황을 알림으로 먼저 인지 · 즉시 대응',
        metrics: [
          { label: 'CCTV 확인 시간', value: '30분 → 8분 (약 73% 단축)' },
          { label: 'CCTV 확인 횟수', value: '6회 → 3회 (약 50% 감소)' },
          { label: '대응 시점', value: '사후 → 즉시' },
          { label: '실측 표본', value: '53개 매장 (편의점 32 · 무인 21)' },
        ],
        quotes: [
          { text: '매장에 없어도 알림이 오니까 마음이 편해요.', who: '서초구 편의점 조OO' },
          { text: '새벽에 바로 알았어요. 폐기 손실을 막았습니다.', who: '홍대 무인문구점 권OO' },
        ],
        note: 'Golden Case의 출발점. 53개 매장의 실측이 이후 사례들의 근거 자산이 됩니다.',
      },
      {
        stepTitle: '검증',
        industry: '편의점 본사',
        audience: '본사 임원 (운영·SV 본부)',
        headline: '100개 매장이 한 호흡으로',
        sub: '하루 수백 개 알림 중 오늘 봐야 할 한 줄을, 본사가 같은 기준으로.',
        context: '편의점 프랜차이즈 본사 운영 본부의 화면에는 매일 수백 개의 알림과 KPI가 흘러내립니다. Store Insight가 가설 한 줄로 묶고, Store Agent가 우선순위를 권고해 “왜 그런가”를 확인하는 검증 사이클을 만듭니다.',
        before: '매장별 제각각 운영 · 무엇부터 볼지 판단 불가',
        after: '가설 카드로 우선순위 한 줄 도출 · 100점포 동일 기준',
        metrics: [
          { label: '동시 도입 매장', value: '100개 매장' },
          { label: '일일 확인 KPI 수', value: '예시: 1,000 → 12 수준으로 압축' },
          { label: 'SV 출장 일정', value: '예시: 약 40% 감소' },
          { label: '점주 알림 KPI', value: '실측 4종은 Case 1에서 인용' },
        ],
        quotes: [
          { text: '여러 매장이 한 매장처럼 운영됩니다.', who: 'A편의점 본사 운영 본부장 (예시 인용)' },
          { text: '우리 점주들이 먼저 도입을 요청합니다.', who: 'A편의점 가맹사업본부장 (예시 인용)' },
        ],
        note: '본사 마스터 “모든 매장을 한 매장처럼”이 헤드라인에 박히는 검증 단계의 원형.',
      },
      {
        stepTitle: '번역',
        industry: '드럭스토어 본사',
        audience: '본사 임원 (MD·운영)',
        headline: "'옮기세요'가 아니라 '옮기면 객단가 +8%'",
        sub: '결품 응답의 본사 한 줄이 점주의 언어로 번역되는 순간.',
        context: '본사 MD의 결품 알림은 점주에게 잘 도달하지 않았습니다. 점주는 “왜 옮겨야 하는지”를 몰랐기 때문입니다. Store Insight의 가설을 Store Agent가 점주 언어로 옮겨, “왜”가 “얼마”로 바뀝니다.',
        before: "본사 권고가 점주에게 '왜'로만 남음",
        after: "권고가 점주 언어 '옮기면 +8%'로 번역되어 실행률 상승",
        metrics: [
          { label: '점주 권고 실행률', value: '예시: 약 87% 수준' },
          { label: '권고 → 실행 시간', value: '예시: 약 4.5일 → 1.7일' },
          { label: '매장 평균 객단가', value: '예시: 약 +8%' },
          { label: 'MD 1인 담당 매장', value: '예시: 12 → 30 수준' },
        ],
        quotes: [
          { text: "점주가 '왜'를 묻지 않게 됐어요.", who: 'B드럭스토어 MD 팀장 (예시 인용)' },
          { text: '옮기라 하면 안 옮기던 분들이 +8%라고 하면 옮깁니다.', who: 'B드럭스토어 운영팀장 (예시 인용)' },
        ],
        note: '본사 도구만으로 깊이를 보여주는 사례. 본사와 점주 사이의 언어 격차를 메우는 번역 단계의 원형.',
      },
      {
        stepTitle: '전파',
        industry: '카페 체인',
        audience: '본사 · 점주 양시각',
        headline: '본사가 본 청결, 점주가 받은 청결',
        sub: '본사 대시보드의 KPI와 점주 모바일 알림이 같은 한 자리를 보는 주.',
        context: '본사의 “주간 청결 점수”와 점주의 “테이블 어지러움 알림”은 서로 다른 단어였습니다. Store Insight의 청결 KPI 임계값을 Store Care 알림 임계값과 동기화해, 본사가 한 줄만 조정하면 전 매장이 같은 주부터 같은 자리를 봅니다.',
        before: '본사 KPI와 점주 알림이 다른 언어로 분리',
        after: '임계값 동기화로 전 매장이 같은 기준의 청결을 봄',
        metrics: [
          { label: '본사 ↔ 점주 KPI 정합률', value: '예시: 64% → 100%' },
          { label: '청결 알림 노이즈', value: '예시: 38% → 9%' },
          { label: '점주 알림 실행률', value: '예시: 71% → 92%' },
          { label: '청결 모듈 점주 KPI', value: '실측 4종은 Case 1에서 인용' },
        ],
        quotes: [
          { text: '본사 화면이 점주 폰과 같은 말을 합니다.', who: 'C카페 가맹사업본부장 (예시 인용)' },
          { text: '알림이 줄었는데 매장은 더 깨끗합니다.', who: 'C카페 점주 김OO · 강남 매장 (예시 인용)' },
        ],
        note: '두 마스터 카피가 한 페이지의 다른 면에 박히는 사례 — 상단 본사 “모든 매장을 한 매장처럼”, 하단 점주 “우리 매장이 대표 매장처럼”.',
      },
      {
        stepTitle: '재측정',
        industry: '대형 공간 (전시·박물관)',
        audience: '기술 의사결정자 (CTO·CISO)',
        headline: '얼굴 없이도 동선을 봅니다',
        sub: '익명화 위에서 6개월간 운영. 효과 미달 자리는 다시 번역으로 되돌린 기록.',
        context: '전시 공간의 동선 분석은 얼굴 인식 없이는 불가능하다고 여겨졌습니다. Anonymizer와 Spatial AI 위에서 얼굴 없이 동선을 6개월간 운영하고, 재측정 시점에 효과 미달 자리는 정직하게 다시 번역 단계로 되돌립니다.',
        before: '개인정보·보안 부담으로 영상 동선 분석 도입 보류',
        after: '실시간 익명화 위에서 동선 운영 · 재측정으로 효과 검증',
        metrics: [
          { label: '효과 입증 자리', value: '예시: 22개 중 18개 (약 82%)' },
          { label: '효과 미달 자리', value: '예시: 4개 → 다시 번역(3단계)으로' },
          { label: '얼굴 인식', value: '0건 (SEAL 익명화 보장)' },
          { label: 'MTMC 트래킹', value: '예시: 정확도 약 94%' },
        ],
        quotes: [
          { text: '얼굴 없이도 동선이 보입니다.', who: 'D 시설 운영 본부장 (예시 인용)' },
          { text: '효과 미달을 숨기지 않는 데이터입니다.', who: 'D 시설 보안 책임자 (예시 인용)' },
        ],
        note: '5건 중 유일한 비-리테일 사례. “효과 미달도 숨기지 않는다”는 재측정 단계의 원형이자 Beyond Retail의 첫 증명.',
      },
    ],
    ctaEyebrow: '상담 문의',
    ctaHeading: '우리 조직의 첫 Golden Case를 함께 찾아보세요',
    ctaButton: '도입 문의하기',
  },
  en: {
    eyebrow: 'Case Studies',
    heroTitle: 'Measured, not promised',
    heroSub: 'Read these five cases in Golden Case order — Discover, Verify, Translate, Sync, Re-measure — and you see how one store’s success travels nationwide.',
    goldenEyebrow: 'Golden Case',
    goldenHeading: 'Five stages that scale one store’s success nationwide',
    goldenSubBefore: 'Each of the five cases below represents one stage. For how they connect to the HQ operating cycle, see the ',
    goldenEnterprise: 'Enterprise',
    goldenSubAfter: ' page.',
    steps: [
      { en: 'Discover', title: 'Discover' },
      { en: 'Verify', title: 'Verify' },
      { en: 'Translate', title: 'Translate' },
      { en: 'Sync', title: 'Sync' },
      { en: 'Re-measure', title: 'Re-measure' },
    ],
    disclaimerMeasured: 'Measured',
    disclaimerMeasuredRest: ' figures are on-site measurements from 53 stores between Dec 2025 and Jan 2026.',
    disclaimerIllustrative: ' Illustrative',
    disclaimerIllustrativeRest: ' figures are hypothetical values used to aid explanation and do not guarantee actual deployment outcomes.',
    audienceLabel: 'Audience · ',
    beforeLabel: 'Before',
    afterLabel: 'After',
    measuredBadge: 'Measured',
    illustrativeBadge: 'Illustrative',
    cases: [
      {
        stepTitle: 'Discover',
        industry: 'Convenience · Unmanned stores',
        audience: 'Owners (HQ-reinforced)',
        headline: 'The change 53 stores proved',
        sub: 'Measured, not promised. 32 convenience stores and 21 unmanned stores, over two months.',
        context: 'For 53 owners, the day began with scanning CCTV over and over. We deployed all four StoreCare modules across every store, so anomalies, cleanliness, refrigeration, and shelves arrive as alerts first — even when the owner is away.',
        before: 'Checking CCTV all day · always reacting after the fact',
        after: 'Anomalies recognized first via alerts · acting immediately',
        metrics: [
          { label: 'CCTV review time', value: '30 min → 8 min (about 73% less)' },
          { label: 'CCTV review frequency', value: '6× → 3× (about 50% fewer)' },
          { label: 'Response timing', value: 'After the fact → immediate' },
          { label: 'Measured sample', value: '53 stores (32 convenience · 21 unmanned)' },
        ],
        quotes: [
          { text: 'Alerts come even when I’m not at the store, so I feel at ease.', who: 'Cho, convenience store, Seocho-gu' },
          { text: 'I knew at dawn, right away. It prevented disposal losses.', who: 'Kwon, unmanned stationery store, Hongdae' },
        ],
        note: 'The starting point of the Golden Case. Measurements from 53 stores become the evidence base for every case that follows.',
      },
      {
        stepTitle: 'Verify',
        industry: 'Convenience-store HQ',
        audience: 'HQ executives (Operations · SV division)',
        headline: '100 stores, in one breath',
        sub: 'Out of hundreds of daily alerts, the one line to act on today — held to the same standard by HQ.',
        context: 'Each day, hundreds of alerts and KPIs scroll across the screens of a convenience franchise’s HQ operations division. Store Insight binds them into a single hypothesis line, and Store Agent recommends priorities, creating a verification cycle that confirms the “why.”',
        before: 'Each store run differently · no way to judge what to look at first',
        after: 'A single priority line drawn from hypothesis cards · one standard across 100 stores',
        metrics: [
          { label: 'Stores deployed at once', value: '100 stores' },
          { label: 'Daily KPIs to review', value: 'Illustrative: compressed from ~1,000 to ~12' },
          { label: 'SV field-visit schedule', value: 'Illustrative: about 40% fewer' },
          { label: 'Owner alert KPIs', value: 'The 4 measured metrics are cited from Case 1' },
        ],
        quotes: [
          { text: 'Multiple stores run like one store.', who: 'HQ Operations Director, Convenience Chain A (illustrative)' },
          { text: 'Our owners are the ones asking us to adopt it first.', who: 'Franchise Business Head, Convenience Chain A (illustrative)' },
        ],
        note: 'The archetype of the verification stage, where the HQ master copy “Every store, like one” lands in the headline.',
      },
      {
        stepTitle: 'Translate',
        industry: 'Drugstore HQ',
        audience: 'HQ executives (MD · Operations)',
        headline: 'Not “move it” but “move it for +8% per ticket”',
        sub: 'The moment HQ’s one-line stockout response is translated into the owner’s language.',
        context: 'HQ MD’s stockout alerts rarely reached owners, because owners didn’t know “why they should move it.” Store Agent translates Store Insight’s hypothesis into the owner’s language, turning the “why” into a “how much.”',
        before: 'HQ recommendations remain only a “why” to owners',
        after: 'Recommendations translated into the owner’s language — “move it for +8%” — lifting execution',
        metrics: [
          { label: 'Owner recommendation execution', value: 'Illustrative: about 87%' },
          { label: 'Recommendation → execution time', value: 'Illustrative: about 4.5 days → 1.7 days' },
          { label: 'Avg. ticket per store', value: 'Illustrative: about +8%' },
          { label: 'Stores per MD', value: 'Illustrative: from ~12 to ~30' },
        ],
        quotes: [
          { text: 'Owners stopped asking “why.”', who: 'MD Team Lead, Drugstore B (illustrative)' },
          { text: 'People who wouldn’t move it when told to, move it when they hear +8%.', who: 'Operations Lead, Drugstore B (illustrative)' },
        ],
        note: 'A case that shows depth with HQ tools alone — the archetype of the translation stage that bridges the language gap between HQ and owners.',
      },
      {
        stepTitle: 'Sync',
        industry: 'Cafe chain',
        audience: 'HQ · owners, both views',
        headline: 'Cleanliness as HQ saw it, as owners received it',
        sub: 'The week HQ dashboard KPIs and owner mobile alerts watch the very same spot.',
        context: 'HQ’s “weekly cleanliness score” and owners’ “table-clutter alert” were different words. By syncing Store Insight’s cleanliness KPI thresholds with Store Care alert thresholds, one adjustment by HQ means every store sees the same spot from the same week.',
        before: 'HQ KPIs and owner alerts split into different languages',
        after: 'Threshold sync lets every store see cleanliness by one standard',
        metrics: [
          { label: 'HQ ↔ owner KPI alignment', value: 'Illustrative: 64% → 100%' },
          { label: 'Cleanliness alert noise', value: 'Illustrative: 38% → 9%' },
          { label: 'Owner alert execution', value: 'Illustrative: 71% → 92%' },
          { label: 'Cleanliness module owner KPIs', value: 'The 4 measured metrics are cited from Case 1' },
        ],
        quotes: [
          { text: 'The HQ screen speaks the same language as the owner’s phone.', who: 'Franchise Business Head, Cafe C (illustrative)' },
          { text: 'Alerts dropped, yet the stores are cleaner.', who: 'Kim, owner · Gangnam store, Cafe C (illustrative)' },
        ],
        note: 'A case where both master copies land on different sides of one page — HQ’s “Every store, like one” above, owner’s “Our store, like the best” below.',
      },
      {
        stepTitle: 'Re-measure',
        industry: 'Large venues (exhibitions · museums)',
        audience: 'Technical decision-makers (CTO · CISO)',
        headline: 'Reading flow without faces',
        sub: 'Six months of operation atop anonymization. A record of returning underperforming spots back to translation.',
        context: 'Flow analysis in exhibition spaces was thought impossible without facial recognition. We ran flow without faces for six months atop Anonymizer and Spatial AI, and at re-measurement, honestly returned underperforming spots back to the translation stage.',
        before: 'Video flow analysis shelved over privacy and security concerns',
        after: 'Flow operated atop real-time anonymization · effectiveness verified by re-measurement',
        metrics: [
          { label: 'Spots proven effective', value: 'Illustrative: 18 of 22 (about 82%)' },
          { label: 'Underperforming spots', value: 'Illustrative: 4 → back to translation (stage 3)' },
          { label: 'Facial recognition', value: '0 cases (guaranteed by SEAL anonymization)' },
          { label: 'MTMC tracking', value: 'Illustrative: about 94% accuracy' },
        ],
        quotes: [
          { text: 'We can see flow without faces.', who: 'Facility Operations Director, Venue D (illustrative)' },
          { text: 'It’s data that doesn’t hide what underperforms.', who: 'Facility Security Lead, Venue D (illustrative)' },
        ],
        note: 'The only non-retail case of the five. The archetype of the re-measurement stage — “we don’t hide what underperforms” — and the first proof of Beyond Retail.',
      },
    ],
    ctaEyebrow: 'Get in touch',
    ctaHeading: 'Let’s find your organization’s first Golden Case together',
    ctaButton: 'Contact us',
  },
  jp: {
    eyebrow: 'Case Studies',
    heroTitle: '約束ではなく、測定',
    heroSub: '5件の事例を Golden Case の5段階 — 発見・検証・翻訳・展開・再測定 — の順に読むと、ひとつの店舗の成功がどのように全国へ広がっていくかが見えてきます。',
    goldenEyebrow: 'Golden Case',
    goldenHeading: 'ひとつの店舗の成功を全国へ広げる5段階',
    goldenSubBefore: '以下の5件の事例は、それぞれの段階を代表しています。本社の運営サイクルとのつながりは、',
    goldenEnterprise: 'Enterprise',
    goldenSubAfter: ' ページでさらにご覧いただけます。',
    steps: [
      { en: 'Discover', title: '発見' },
      { en: 'Verify', title: '検証' },
      { en: 'Translate', title: '翻訳' },
      { en: 'Sync', title: '展開' },
      { en: 'Re-measure', title: '再測定' },
    ],
    disclaimerMeasured: '実測',
    disclaimerMeasuredRest: 'と表記された数値は、2025.12〜2026.01に53店舗で実測した現場の測定値です。',
    disclaimerIllustrative: ' 例',
    disclaimerIllustrativeRest: 'と表記された数値は説明を助けるための仮の値であり、実際の導入成果を保証するものではありません。',
    audienceLabel: '対象 · ',
    beforeLabel: 'Before',
    afterLabel: 'After',
    measuredBadge: '実測',
    illustrativeBadge: '例',
    cases: [
      {
        stepTitle: '発見',
        industry: 'コンビニ · 無人店舗',
        audience: '店主（本社が補強）',
        headline: '53店舗が証明した変化',
        sub: '約束ではなく、測定。コンビニ32店・無人店舗21店、2か月の記録。',
        context: '53名の店主の一日は、CCTVを繰り返し見続けることから始まっていました。StoreCareの4モジュールを全店に導入し、店舗にいなくても異常・清潔・冷蔵・陳列をまず通知で受け取れるように変えました。',
        before: '一日中CCTVを直接確認 · 問題は常に事後対応',
        after: '異常をまず通知で把握 · 即時に対応',
        metrics: [
          { label: 'CCTV確認時間', value: '30分 → 8分（約73%短縮）' },
          { label: 'CCTV確認回数', value: '6回 → 3回（約50%減少）' },
          { label: '対応のタイミング', value: '事後 → 即時' },
          { label: '実測サンプル', value: '53店舗（コンビニ32 · 無人21）' },
        ],
        quotes: [
          { text: '店舗にいなくても通知が来るので、気持ちが楽です。', who: 'ソウル瑞草区のコンビニ チョ氏' },
          { text: '明け方すぐにわかりました。廃棄ロスを防げました。', who: '弘大の無人文具店 クォン氏' },
        ],
        note: 'Golden Caseの出発点。53店舗の実測が、以降の事例の根拠となる資産になります。',
      },
      {
        stepTitle: '検証',
        industry: 'コンビニ本社',
        audience: '本社幹部（運営 · SV本部）',
        headline: '100店舗が、ひとつの呼吸で',
        sub: '一日数百件の通知の中から、今日見るべき一行を、本社が同じ基準で。',
        context: 'コンビニフランチャイズ本社の運営本部の画面には、毎日数百件の通知とKPIが流れていきます。Store Insightが仮説の一行にまとめ、Store Agentが優先順位を提案し、「なぜそうなのか」を確認する検証サイクルをつくります。',
        before: '店舗ごとにばらばらの運営 · 何から見るべきか判断できない',
        after: '仮説カードから優先順位の一行を導出 · 100店舗で同一基準',
        metrics: [
          { label: '同時導入店舗', value: '100店舗' },
          { label: '日次確認KPI数', value: '例：1,000 → 12程度に圧縮' },
          { label: 'SV出張スケジュール', value: '例：約40%減少' },
          { label: '店主向け通知KPI', value: '実測4種はCase 1から引用' },
        ],
        quotes: [
          { text: '複数の店舗がひとつの店舗のように運営されます。', who: 'Aコンビニ本社 運営本部長（例として引用）' },
          { text: '当社の店主たちが、自ら導入を求めてきます。', who: 'Aコンビニ 加盟事業本部長（例として引用）' },
        ],
        note: '本社のマスターコピー「すべての店舗を、ひとつの店舗のように。」が見出しに刻まれる、検証段階の原型。',
      },
      {
        stepTitle: '翻訳',
        industry: 'ドラッグストア本社',
        audience: '本社幹部（MD · 運営）',
        headline: '「移してください」ではなく「移せば客単価+8%」',
        sub: '欠品対応の本社の一行が、店主の言葉へと翻訳される瞬間。',
        context: '本社MDの欠品通知は、店主になかなか届きませんでした。店主は「なぜ移すべきか」を知らなかったからです。Store Insightの仮説をStore Agentが店主の言葉へと翻訳し、「なぜ」が「いくら」に変わります。',
        before: '本社の提案が店主には「なぜ」のままで残る',
        after: '提案が店主の言葉「移せば+8%」に翻訳され、実行率が上昇',
        metrics: [
          { label: '店主の提案実行率', value: '例：約87%程度' },
          { label: '提案 → 実行までの時間', value: '例：約4.5日 → 1.7日' },
          { label: '店舗平均客単価', value: '例：約+8%' },
          { label: 'MD1人あたり担当店舗', value: '例：12 → 30程度' },
        ],
        quotes: [
          { text: '店主が「なぜ」と尋ねなくなりました。', who: 'Bドラッグストア MDチーム長（例として引用）' },
          { text: '移せと言っても動かなかった人が、+8%と言えば動きます。', who: 'Bドラッグストア 運営チーム長（例として引用）' },
        ],
        note: '本社ツールだけで深さを示す事例。本社と店主の間の言葉の隔たりを埋める、翻訳段階の原型。',
      },
      {
        stepTitle: '展開',
        industry: 'カフェチェーン',
        audience: '本社 · 店主の両視点',
        headline: '本社が見た清潔、店主が受け取った清潔',
        sub: '本社ダッシュボードのKPIと店主のモバイル通知が、同じ一点を見る週。',
        context: '本社の「週間清潔スコア」と店主の「テーブルの乱れ通知」は、別々の言葉でした。Store Insightの清潔KPIしきい値をStore Careの通知しきい値と同期させ、本社が一行を調整するだけで、全店舗が同じ週から同じ一点を見ます。',
        before: '本社KPIと店主通知が別々の言葉に分かれていた',
        after: 'しきい値の同期で、全店舗が同一基準の清潔を見る',
        metrics: [
          { label: '本社 ↔ 店主 KPI整合率', value: '例：64% → 100%' },
          { label: '清潔通知のノイズ', value: '例：38% → 9%' },
          { label: '店主の通知実行率', value: '例：71% → 92%' },
          { label: '清潔モジュールの店主KPI', value: '実測4種はCase 1から引用' },
        ],
        quotes: [
          { text: '本社の画面が、店主のスマホと同じ言葉を話します。', who: 'Cカフェ 加盟事業本部長（例として引用）' },
          { text: '通知は減ったのに、店舗はもっと清潔です。', who: 'Cカフェ 店主 キム氏 · 江南店（例として引用）' },
        ],
        note: '2つのマスターコピーが1ページの表裏に刻まれる事例 — 上部に本社「すべての店舗を、ひとつの店舗のように。」、下部に店主「私たちの店が、代表店のように。」。',
      },
      {
        stepTitle: '再測定',
        industry: '大型空間（展示 · 博物館）',
        audience: '技術意思決定者（CTO · CISO）',
        headline: '顔がなくても、動線が見えます',
        sub: '匿名化の上で6か月間運用。効果が及ばなかった箇所は、再び翻訳へ戻した記録。',
        context: '展示空間の動線分析は、顔認識なしには不可能だと考えられていました。AnonymizerとSpatial AIの上で、顔なしの動線を6か月間運用し、再測定の時点で効果が及ばなかった箇所は、正直に再び翻訳段階へ戻します。',
        before: '個人情報・セキュリティの負担から、映像動線分析の導入を保留',
        after: 'リアルタイム匿名化の上で動線を運用 · 再測定で効果を検証',
        metrics: [
          { label: '効果を実証した箇所', value: '例：22か所中18か所（約82%）' },
          { label: '効果が及ばなかった箇所', value: '例：4か所 → 再び翻訳（第3段階）へ' },
          { label: '顔認識', value: '0件（SEAL匿名化で保証）' },
          { label: 'MTMCトラッキング', value: '例：精度 約94%' },
        ],
        quotes: [
          { text: '顔がなくても、動線が見えます。', who: 'D施設 運営本部長（例として引用）' },
          { text: '効果不足を隠さないデータです。', who: 'D施設 セキュリティ責任者（例として引用）' },
        ],
        note: '5件のうち唯一の非リテール事例。「効果不足も隠さない」という再測定段階の原型であり、Beyond Retailの最初の証明。',
      },
    ],
    ctaEyebrow: 'お問い合わせ',
    ctaHeading: '貴社にとって最初のGolden Caseを、一緒に見つけましょう',
    ctaButton: '導入のお問い合わせ',
  },
};

export default function CaseStudiesView({ locale }: { locale: Locale }) {
  const t = C[locale];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('resources', locale), path: '/resources' }, { name: crumb('case-studies', locale), path: '/resources/case-studies' }]} locale={locale} tone="dark" className="mb-6" />
          <p className="text-sm font-medium text-primary mb-4 tracking-wider uppercase">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            {t.heroTitle}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* Golden Case 5단계 안내 */}
      <AnimatedSection className="py-14 lg:py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.goldenEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">
              {t.goldenHeading}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed break-keep">
              {t.goldenSubBefore}
              <Link href={localeHref(locale, '/enterprise')} className="text-primary underline underline-offset-2">
                {t.goldenEnterprise}
              </Link>
              {t.goldenSubAfter}
            </p>
          </div>
          <ol className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {t.steps.map((s, i) => {
              const Icon = stepIcons[i];
              const n = caseSteps[i];
              return (
                <li key={n} className="card flex flex-col items-center text-center gap-2 p-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary">{n}</span>
                  <span className="text-sm font-bold text-gray-900">{s.title}</span>
                  <span className="text-2xs text-gray-500 uppercase tracking-wide">{s.en}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </AnimatedSection>

      {/* 면책 — 수치 라벨 안내 */}
      <section className="bg-amber-50/60 border-b border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-xs text-amber-800 leading-relaxed break-keep">
            <span className="font-medium">{t.disclaimerMeasured}</span>{t.disclaimerMeasuredRest}
            <span className="font-medium">{t.disclaimerIllustrative}</span>{t.disclaimerIllustrativeRest}
          </p>
        </div>
      </section>

      {/* Cases */}
      <AnimatedSection className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          {t.cases.map((c, ci) => {
            const Icon = caseIcons[ci];
            return (
              <div key={caseIds[ci]}>
              <article className="card p-7 sm:p-9">
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                    {caseSteps[ci]} {c.stepTitle}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                    <Icon className="w-4 h-4" />
                    {c.industry}
                  </span>
                  <span className="text-xs text-gray-500">{t.audienceLabel}{c.audience}</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-2 break-keep">{c.headline}</h2>
                <p className="text-base text-gray-600 leading-relaxed mb-5 break-keep">{c.sub}</p>

                {/* Product tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {caseProducts[ci].map((p) => (
                    <span
                      key={p}
                      className="rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-6 break-keep">{c.context}</p>

                {/* Before / After */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-500 mb-1.5">{t.beforeLabel}</p>
                    <p className="text-sm text-gray-700 leading-relaxed break-keep">{c.before}</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 p-4">
                    <p className="text-xs font-medium text-primary mb-1.5">{t.afterLabel}</p>
                    <p className="text-sm text-gray-800 leading-relaxed break-keep">{c.after}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {c.metrics.map((m, mi) => {
                    const verified = metricVerified[ci][mi];
                    return (
                      <div key={m.label} className="rounded-lg border border-gray-100 p-3.5">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span
                            className={
                              verified
                                ? 'rounded bg-primary/10 px-1.5 py-0.5 text-3xs font-bold text-primary'
                                : 'rounded bg-gray-100 px-1.5 py-0.5 text-3xs font-bold text-gray-500'
                            }
                          >
                            {verified ? t.measuredBadge : t.illustrativeBadge}
                          </span>
                        </div>
                        <p className="text-2xs text-gray-500 mb-0.5">{m.label}</p>
                        <p className="text-sm font-medium text-gray-900 leading-snug break-keep">{m.value}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Quotes */}
                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                  {c.quotes.map((q) => (
                    <blockquote key={q.text} className="rounded-lg bg-slate-50 p-4">
                      <Quote className="w-4 h-4 text-primary/40 mb-2" aria-hidden="true" />
                      <p className="text-sm text-gray-700 leading-relaxed break-keep">{q.text}</p>
                      <footer className="text-xs text-gray-500 mt-2">— {q.who}</footer>
                    </blockquote>
                  ))}
                </div>

                <p className="text-xs text-gray-500 leading-relaxed break-keep border-t border-gray-100 pt-4">
                  {c.note}
                </p>
              </article>

              {/* #12 StoreCare before/after adoption chart — paired with Case 1 (53-store) */}
              {ci === 0 && (
                <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-8">
                  <CaseStudyChartMockup locale={locale} />
                </div>
              )}
              </div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.ctaEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep">
            {t.ctaHeading}
          </h2>
          <Link href={localeHref(locale, '/contact')} className="btn-primary gap-2">
            {t.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
