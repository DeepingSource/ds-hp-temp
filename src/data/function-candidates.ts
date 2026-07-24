import type { Locale } from '@/lib/i18n';

/**
 * 확장형 기능 후보 (③§6 · D1~D3 확정) — 허브 "준비 중" 슬롯과 향후 개별 페이지 로드맵.
 * 상태 1곳에서 관리: 페이지가 준비되면 status를 'live'로 바꾸고 href를 부여하면
 * 허브 카탈로그 그리드가 자동 승격 렌더한다.
 *
 * - planned: 허브에 "준비 중" disabled 카드로 노출 (D1·D2 — 현재 stock 1종)
 * - backlog: 내부 로드맵 — 허브 미노출
 * - gated: 프라이버시 민감(D3) — 모든 노출 카피에 "개인 식별 없음 · 익명·비식별 추정"
 *   병기 필수, 개별 페이지 제작은 법적 검토 통과 후
 */
export type FunctionCandidateStatus = 'live' | 'planned' | 'backlog' | 'gated';

export interface FunctionCandidate {
  key: string;
  status: FunctionCandidateStatus;
  /** live 승격 시 부여 (예: '/products/store-stock') */
  href?: string;
  name: Record<Locale, string>;
  definition: Record<Locale, string>;
}

export const FUNCTION_CANDIDATES: FunctionCandidate[] = [
  {
    key: 'stock',
    status: 'planned',
    name: { ko: 'stock — 진열·결품', en: 'stock — shelf & stock-outs', jp: 'stock — 陳列・欠品' },
    definition: {
      ko: '매대 결품과 진열 흐트러짐을 감지합니다.',
      en: 'Detects empty shelves and shelf disarray.',
      jp: '棚の欠品と陳列の乱れを検知します。',
    },
  },
  {
    key: 'flow',
    status: 'backlog',
    name: { ko: 'flow — 동선·체류', en: 'flow — journeys & dwell', jp: 'flow — 動線・滞在' },
    definition: {
      ko: '매장 내 동선·체류 히트맵.',
      en: 'In-store journey and dwell heatmaps.',
      jp: '店内の動線・滞在ヒートマップ。',
    },
  },
  {
    key: 'zone',
    status: 'backlog',
    name: { ko: 'zone — 구역 성과', en: 'zone — zone performance', jp: 'zone — ゾーン成果' },
    definition: {
      ko: '매대·구역별 유입과 전환.',
      en: 'Traffic and conversion by shelf and zone.',
      jp: '棚・ゾーン別の流入と転換。',
    },
  },
  {
    key: 'demographics',
    status: 'gated',
    name: { ko: 'demographics — 객층', en: 'demographics', jp: 'demographics — 客層' },
    definition: {
      // D3: 익명·비식별 전제 병기 — 노출 시 이 문구 그대로 사용할 것
      ko: '연령대·성별을 개인 식별 없이 익명·비식별로 추정하는 객층 분석.',
      en: 'Customer-mix analysis via anonymous, de-identified estimation — no one is identified.',
      jp: '個人を特定せず、匿名・非識別の推定による客層分析。',
    },
  },
  {
    key: 'safety',
    status: 'gated',
    name: { ko: 'safety — 이상·안전', en: 'safety', jp: 'safety — 異常・安全' },
    definition: {
      // D3: 보조 도구 포지셔닝(과대약속 금지) + 익명 전제 병기
      ko: '낙상·이상 체류를 개인 식별 없이 감지하는 보조 도구.',
      en: 'An assistive tool that detects falls and unusual dwell — with no one identified.',
      jp: '転倒・異常滞在を個人特定なしで検知する補助ツール。',
    },
  },
];
