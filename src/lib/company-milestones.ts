import siteContent from '@/data/generated/site-content.json';
import { type Locale } from './i18n';

/**
 * company-milestones.ts — 회사 연혁 단일 출처(SOT).
 *
 * 데이터는 Keystatic `milestones` 싱글톤(content/site/milestones.yaml) → site-content.json.
 * `{foundingYear}`/`{patents}`/`{patentsLabel}`/`{vision}` 토큰은 gen-site-content 가 company
 * 값으로 치환하므로(빌드 시), 이 모듈은 치환 완료된 문자열을 그대로 노출한다.
 * About(요약, highlight)·Investors(전체)가 공유.
 */

export type Milestone = {
  year: string;
  /** 짧은 라벨 (About 카드 제목 / Investors 타임라인 제목) */
  title: string;
  desc: string;
  /** About 요약 카드에 노출할지 여부 */
  highlight?: boolean;
};

export const milestones = siteContent.milestones as Record<Locale, Milestone[]>;

/** About 요약용 — highlight 항목만 */
export const milestoneHighlights = (locale: Locale): Milestone[] =>
  milestones[locale].filter((m) => m.highlight);
