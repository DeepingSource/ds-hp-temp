import { solutionsBySlug, type SolutionPage } from '@/data/solutionsData';
import { getCaseStudiesForSolution } from '@/lib/case-studies';
import { localeHref, type Locale } from '@/lib/i18n';
import type { PersonaId } from '@/data/diagnosis-i18n';

export interface RouteCard {
  id: string;
  type: 'solution' | 'product' | 'case-study' | 'pricing' | 'technology' | 'enterprise';
  title: string;
  description: string;
  href: string;
  badge?: string;
  badgeColor?: 'blue' | 'slate' | 'emerald' | 'amber';
}

interface DiagnosisSignalInput {
  resultSlug: string | null;
  industry: string | null;
  persona: PersonaId | null;
  privacySelected?: boolean;
  locale: Locale;
}

const PRODUCT_INFO: Record<
  string,
  Record<Locale, { title: string; desc: string; href: string }>
> = {
  care: {
    ko: {
      title: 'saai care',
      desc: '현장 이상 탐지 및 실시간 알림 엔터프라이즈 케어 시스템',
      href: '/products/saai-care',
    },
    en: {
      title: 'saai care',
      desc: 'Real-time anomaly detection and operational alert system',
      href: '/products/saai-care',
    },
    jp: {
      title: 'saai care',
      desc: '現場の異常検知とリアルタイム通知システム',
      href: '/products/saai-care',
    },
  },
  insight: {
    ko: {
      title: 'saai insight',
      desc: '체류시간·동선 분석 및 매장 성과 리포트',
      href: '/products/saai-insight',
    },
    en: {
      title: 'saai insight',
      desc: 'Dwell time & path analytics and store performance reporting',
      href: '/products/saai-insight',
    },
    jp: {
      title: 'saai insight',
      desc: '滞在時間・動線分析および店舗成果レポート',
      href: '/products/saai-insight',
    },
  },
  agent: {
    ko: {
      title: 'saai agent',
      desc: '공간 분석 데이터 기반 자율 액션 에이전트',
      href: '/products/saai-agent',
    },
    en: {
      title: 'saai agent',
      desc: 'Autonomous spatial action agent built on site analytics',
      href: '/products/saai-agent',
    },
    jp: {
      title: 'saai agent',
      desc: ' spatialデータに基づく自律アクションエージェント',
      href: '/products/saai-agent',
    },
  },
};

const I18N_ROUTING = {
  ko: {
    caseStudyBadge: '고객 사례',
    productBadge: '관련 제품',
    pricingTitle: '가격 시뮬레이터',
    pricingDesc: '매장 규모 및 도입 수량에 맞춘 비용을 미리 산출해보세요.',
    pricingBadge: '시뮬레이터',
    enterpriseTitle: '엔터프라이즈 안내',
    enterpriseDesc: '전사 도입을 위한 전용 아키텍처 및 커스텀 보안 검토',
    enterpriseBadge: '엔터프라이즈',
    techTitle: 'Anonymizer (SEAL)',
    techDesc: '개인정보 걱정 없는 얼굴 익명화 및 프라이버시 보호 기술',
    techBadge: '프라이버시 기술',
  },
  en: {
    caseStudyBadge: 'Case Study',
    productBadge: 'Product',
    pricingTitle: 'Pricing Simulator',
    pricingDesc: 'Estimate implementation costs based on your store scale.',
    pricingBadge: 'Simulator',
    enterpriseTitle: 'Enterprise Overview',
    enterpriseDesc: 'Custom architecture and security evaluation for enterprise rollout.',
    enterpriseBadge: 'Enterprise',
    techTitle: 'Anonymizer (SEAL)',
    techDesc: 'Privacy-preserving face anonymization technology with 0 PII retention.',
    techBadge: 'Privacy Tech',
  },
  jp: {
    caseStudyBadge: '導入事例',
    productBadge: '関連製品',
    pricingTitle: '価格シミュレーター',
    pricingDesc: '店舗規模に応じた導入費用を事前に試算できます。',
    pricingBadge: 'シミュレーター',
    enterpriseTitle: 'エンタープライズ案内',
    enterpriseDesc: '全社導入のための専用アーキテクチャおよびセキュリティ検討',
    enterpriseBadge: 'エンタープライズ',
    techTitle: 'Anonymizer (SEAL)',
    techDesc: '個人情報を保護する顔匿名化およびプライバシー保護技術',
    techBadge: 'プライバシー技術',
  },
};

export function getDiagnosisRoutes(input: DiagnosisSignalInput): RouteCard[] {
  const { resultSlug, industry, persona, privacySelected, locale } = input;
  const cards: RouteCard[] = [];
  const text = I18N_ROUTING[locale];

  // 1. Matching Case Studies (Priority 1)
  if (industry) {
    const caseStudies = getCaseStudiesForSolution(industry, locale, 1);
    caseStudies.forEach((cs) => {
      cards.push({
        id: `case-${cs.slug}`,
        type: 'case-study',
        title: cs.title,
        description: cs.sub,
        href: localeHref(locale, `/resources/case-studies/${cs.slug}`),
        badge: text.caseStudyBadge,
        badgeColor: 'emerald',
      });
    });
  }

  // 2. Scenario-linked Product (Priority 2)
  if (resultSlug) {
    const sol: SolutionPage | undefined = solutionsBySlug[resultSlug];
    if (sol && sol.steps.length > 0) {
      const firstProductKey = sol.steps[0].product; // e.g. 'care', 'insight', 'agent'
      const prod = PRODUCT_INFO[firstProductKey]?.[locale];
      if (prod) {
        cards.push({
          id: `product-${firstProductKey}`,
          type: 'product',
          title: prod.title,
          description: prod.desc,
          href: localeHref(locale, prod.href),
          badge: text.productBadge,
          badgeColor: 'blue',
        });
      }
    }
  }

  // 3. Persona-driven cards (Pricing simulator / Enterprise)
  if (persona === 'exec') {
    cards.push({
      id: 'enterprise',
      type: 'enterprise',
      title: text.enterpriseTitle,
      description: text.enterpriseDesc,
      href: localeHref(locale, '/enterprise'),
      badge: text.enterpriseBadge,
      badgeColor: 'amber',
    });
  } else if (persona === 'hq_sv' || persona === 'owner') {
    cards.push({
      id: 'pricing',
      type: 'pricing',
      title: text.pricingTitle,
      description: text.pricingDesc,
      href: localeHref(locale, '/pricing/simulator'),
      badge: text.pricingBadge,
      badgeColor: 'amber',
    });
  }

  // 4. Privacy / Anonymizer technology card
  if (privacySelected) {
    cards.push({
      id: 'anonymizer',
      type: 'technology',
      title: text.techTitle,
      description: text.techDesc,
      href: localeHref(locale, '/technology/anonymizer'),
      badge: text.techBadge,
      badgeColor: 'slate',
    });
  }

  // Max 4 cards cutoff per docs/diagnosis-v2-plan.md §5
  return cards.slice(0, 4);
}
