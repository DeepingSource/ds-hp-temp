import type { Locale } from '@/lib/i18n';

/**
 * Static chrome copy for the case-studies index + detail pages (hero, Golden Case
 * banner, disclaimer, badge/section labels, CTA). Per-CASE content lives in the
 * Keystatic `caseStudies` collection; this is the surrounding page furniture, kept
 * verbatim from the original CaseStudiesView so the design is unchanged.
 */
export type CaseStudiesCopy = {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  goldenEyebrow: string;
  goldenHeading: string;
  goldenSubBefore: string;
  goldenEnterprise: string;
  goldenSubAfter: string;
  disclaimerMeasured: string;
  disclaimerMeasuredRest: string;
  disclaimerIllustrative: string;
  disclaimerIllustrativeRest: string;
  audienceLabel: string;
  beforeLabel: string;
  afterLabel: string;
  measuredBadge: string;
  illustrativeBadge: string;
  ctaEyebrow: string;
  ctaHeading: string;
  ctaButton: string;
  cardMore: string;
  backToList: string;
};

export const caseStudiesCopy: Record<Locale, CaseStudiesCopy> = {
  ko: {
    eyebrow: 'Case Studies',
    heroTitle: '약속이 아니라 측정',
    heroSub:
      '5건의 사례를 Golden Case 5단계 — 발견·검증·번역·전파·재측정 — 순서대로 읽으면 한 매장의 성공이 어떻게 전국으로 옮겨가는지 보입니다.',
    goldenEyebrow: 'Golden Case',
    goldenHeading: '한 매장의 성공을 전국으로 옮기는 5단계',
    goldenSubBefore: '아래 사례들은 각 단계를 대표합니다. 본사 운영 사이클과의 연결은 ',
    goldenEnterprise: 'Enterprise',
    goldenSubAfter: ' 페이지에서 더 볼 수 있습니다.',
    disclaimerMeasured: '실측',
    disclaimerMeasuredRest: '으로 표기된 수치는 2025.12~2026.01 53개 매장 현장 측정값입니다.',
    disclaimerIllustrative: ' 예시',
    disclaimerIllustrativeRest:
      '로 표기된 수치는 설명을 돕기 위한 가상의 값으로, 실제 도입 성과를 보장하지 않습니다.',
    audienceLabel: '청자 · ',
    beforeLabel: 'Before',
    afterLabel: 'After',
    measuredBadge: '실측',
    illustrativeBadge: '예시',
    ctaEyebrow: '상담 문의',
    ctaHeading: '우리 조직의 첫 Golden Case를 함께 찾아보세요',
    ctaButton: '우리 첫 Golden Case 시작하기',
    cardMore: '자세히 보기',
    backToList: '사례 목록으로',
  },
  en: {
    eyebrow: 'Case Studies',
    heroTitle: 'Measured, not promised',
    heroSub:
      'Read these cases in Golden Case order — Discover, Verify, Translate, Sync, Re-measure — and you see how one store’s success travels nationwide.',
    goldenEyebrow: 'Golden Case',
    goldenHeading: 'Five stages that scale one store’s success nationwide',
    goldenSubBefore: 'The cases below each represent one stage. For how they connect to the HQ operating cycle, see the ',
    goldenEnterprise: 'Enterprise',
    goldenSubAfter: ' page.',
    disclaimerMeasured: 'Measured',
    disclaimerMeasuredRest: ' figures are on-site measurements from 53 stores between Dec 2025 and Jan 2026.',
    disclaimerIllustrative: ' Illustrative',
    disclaimerIllustrativeRest:
      ' figures are hypothetical values used to aid explanation and do not guarantee actual deployment outcomes.',
    audienceLabel: 'Audience · ',
    beforeLabel: 'Before',
    afterLabel: 'After',
    measuredBadge: 'Measured',
    illustrativeBadge: 'Illustrative',
    ctaEyebrow: 'Get in touch',
    ctaHeading: 'Let’s find your organization’s first Golden Case together',
    ctaButton: 'Start our first Golden Case',
    cardMore: 'Read more',
    backToList: 'Back to case studies',
  },
  jp: {
    eyebrow: 'Case Studies',
    heroTitle: '約束ではなく、測定',
    heroSub:
      '事例を Golden Case の5段階 — 発見・検証・翻訳・展開・再測定 — の順に読むと、ひとつの店舗の成功がどのように全国へ広がっていくかが見えてきます。',
    goldenEyebrow: 'Golden Case',
    goldenHeading: 'ひとつの店舗の成功を全国へ広げる5段階',
    goldenSubBefore: '以下の事例は、それぞれの段階を代表しています。本社の運営サイクルとのつながりは、',
    goldenEnterprise: 'Enterprise',
    goldenSubAfter: ' ページでさらにご覧いただけます。',
    disclaimerMeasured: '実測',
    disclaimerMeasuredRest: 'と表記された数値は、2025.12〜2026.01に53店舗で実測した現場の測定値です。',
    disclaimerIllustrative: ' 例',
    disclaimerIllustrativeRest:
      'と表記された数値は説明を助けるための仮の値であり、実際の導入成果を保証するものではありません。',
    audienceLabel: '対象 · ',
    beforeLabel: 'Before',
    afterLabel: 'After',
    measuredBadge: '実測',
    illustrativeBadge: '例',
    ctaEyebrow: 'お問い合わせ',
    ctaHeading: '貴社にとって最初のGolden Caseを、一緒に見つけましょう',
    ctaButton: '最初のGolden Caseを始める',
    cardMore: '詳しく見る',
    backToList: '事例一覧へ',
  },
};
