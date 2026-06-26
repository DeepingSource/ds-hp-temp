import { type Locale } from './i18n';
import { COMPANY } from './company-data';

/**
 * company-milestones.ts — 회사 연혁 단일 출처(SOT).
 *
 * About(요약)·Investors(전체)가 공유합니다. 값이 바뀌면 여기만 수정하세요.
 * - `highlight: true` → About 연혁 요약 카드에 노출 (4개 권장)
 * - 전체 목록은 Investors 마일스톤 타임라인에 노출
 *
 * 근거: 공개 보도(시리즈 A 약 55억·KDDI 리드 / 프리-B 약 160억 / SOC 2·NextRise 2024 /
 * KDDI 전략투자 2025·해외 매출 50% 돌파). 금액 비공개 항목은 금액을 표기하지 않습니다.
 */

export type Milestone = {
  year: string;
  /** 짧은 라벨 (About 카드 제목 / Investors 타임라인 제목) */
  title: string;
  desc: string;
  /** About 요약 카드에 노출할지 여부 */
  highlight?: boolean;
};

export const milestones: Record<Locale, Milestone[]> = {
  ko: [
    { year: `${COMPANY.foundingYear}`, title: '창업', desc: '한 점주의 질문에서 출발 — 영상 익명화 AI로 오프라인 공간을 이해하다.', highlight: true },
    { year: '2020', title: 'NVIDIA Inception · 시리즈 A', desc: 'NVIDIA Inception 파트너 합류, 시리즈 A 약 55억 원 유치(일본 KDDI 리드).', highlight: true },
    { year: '2022', title: '프리-B 투자', desc: '약 160억 원 규모 프리-B 라운드 — 공간을 읽는 AI 상용화를 가속.' },
    { year: '2024', title: 'SOC 2 · Top Innovator', desc: 'SOC 2 인증 취득, NextRise 2024 ‘Top Innovator’ 수상.', highlight: true },
    { year: '2025', title: 'KDDI 전략투자 · 글로벌', desc: 'KDDI 오픈이노베이션펀드 3호 전략투자, 해외 매출 비중 50% 돌파 — 일본 등 글로벌 확장.' },
    { year: '현재', title: `특허 ${COMPANY.patents}건`, desc: COMPANY.patentsLabel, highlight: true },
    { year: '2031', title: '비전', desc: COMPANY.vision },
  ],
  en: [
    { year: `${COMPANY.foundingYear}`, title: 'Founded', desc: 'Born from one store owner’s question — understanding offline space with video anonymization AI.', highlight: true },
    { year: '2020', title: 'NVIDIA Inception · Series A', desc: 'Joined as NVIDIA Inception Partner; raised a ~₩5.5B Series A (led by Japan’s KDDI).', highlight: true },
    { year: '2022', title: 'Pre-B funding', desc: 'A ~₩16B Pre-B round — accelerating commercialization of space-reading AI.' },
    { year: '2024', title: 'SOC 2 · Top Innovator', desc: 'Achieved SOC 2 certification; won the NextRise 2024 ‘Top Innovator’ award.', highlight: true },
    { year: '2025', title: 'KDDI strategic investment · Global', desc: 'Strategic investment from KDDI Open Innovation Fund III; overseas revenue passed 50% — global expansion incl. Japan.' },
    { year: 'Today', title: `${COMPANY.patents} patents`, desc: 'Registered 66 · Pending 37', highlight: true },
    { year: '2031', title: 'Vision', desc: 'All the world’s data, kept safe — all the world’s spaces, made perfect.' },
  ],
  jp: [
    { year: `${COMPANY.foundingYear}`, title: '創業', desc: '一人の店主の問いから出発 — 映像の匿名化AIでオフライン空間を理解する。', highlight: true },
    { year: '2020', title: 'NVIDIA Inception · シリーズA', desc: 'NVIDIA Inception パートナーに参加、シリーズA 約55億ウォンを調達（日本KDDIがリード）。', highlight: true },
    { year: '2022', title: 'プレB 投資', desc: '約160億ウォン規模のプレBラウンド — 空間を読むAIの商用化を加速。' },
    { year: '2024', title: 'SOC 2 · Top Innovator', desc: 'SOC 2 認証を取得、NextRise 2024「Top Innovator」を受賞。', highlight: true },
    { year: '2025', title: 'KDDI 戦略投資 · グローバル', desc: 'KDDIオープンイノベーションファンド3号から戦略投資、海外売上比率50%突破 — 日本などグローバル展開。' },
    { year: '現在', title: `特許${COMPANY.patents}件`, desc: '登録66件 · 出願37件', highlight: true },
    { year: '2031', title: 'ビジョン', desc: '世界中のすべてのデータを安全に、世界中のすべての空間を完璧に。' },
  ],
};

/** About 요약용 — highlight 항목만 */
export const milestoneHighlights = (locale: Locale): Milestone[] =>
  milestones[locale].filter((m) => m.highlight);
