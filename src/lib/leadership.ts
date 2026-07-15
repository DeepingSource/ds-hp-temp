import siteContent from '@/data/generated/site-content.json';
import { type Locale } from './i18n';

/**
 * leadership.ts — 경영진 단일 출처(SOT).
 *
 * 데이터는 Keystatic `leadership` 싱글톤(content/site/leadership.yaml) → site-content.json.
 * About(필수)·Career(선택)에서 공유. 실명 공개 확정(2026-06). photo 미지정 시 initials 렌더.
 */

export type Leader = {
  key: string;
  name: string;
  role: string;
  /** 한 줄 책임 영역 */
  focus: string;
  /** 1~2문장 약력 */
  bio: string;
  /** 사진 미지정 시 아바타에 표시할 이니셜 */
  initials: string;
  /** 추후 실제 사진 경로 (선택) */
  photo?: string;
};

export const leadership = siteContent.leadership as Record<Locale, Leader[]>;
