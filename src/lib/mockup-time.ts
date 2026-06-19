/**
 * 목업 전용 시간 유틸리티
 *
 * 기존 timeUtils.ts의 날짜/시간대 함수를 재사용하면서,
 * 목업 컴포넌트 전용 실시간 시각 훅과 포맷터를 추가.
 */

'use client';

import { useState, useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/prefersReducedMotion';
import type { Locale } from '@/lib/i18n';

// 기존 timeUtils에서 re-export (목업에서 이 파일만 import하면 되도록)
export {
  getTimeSlot,
  getTimeLabel,
  getBriefingTitle,
  getBriefingTime,
  getToday,
  getCurrentSeason,
  getWeekDates,
  getWeekTitle,
} from '@/lib/timeUtils';
export type { TimeSlot, Season, WeekDateInfo } from '@/lib/timeUtils';

// ── 시각 포맷터 ─────────────────────────────────────────────────────────

/** HH:MM 형식 (24시간제) */
export function formatTime(date: Date = new Date()): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

/** HH:MM:SS 형식 (24시간제) */
export function formatTimeWithSeconds(date: Date = new Date()): string {
  return `${formatTime(date)}:${String(date.getSeconds()).padStart(2, '0')}`;
}

/** 요일 배열 (로케일별) */
const WEEKDAYS: Record<Locale, string[]> = {
  ko: ['일', '월', '화', '수', '목', '금', '토'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  jp: ['日', '月', '火', '水', '木', '金', '土'],
};
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 날짜 형식 — ko: "6월 2일 (월)" · en: "Mon, Jun 2" · jp: "6月2日(月)" */
export function formatDate(date: Date = new Date(), locale: Locale = 'ko'): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = WEEKDAYS[locale][date.getDay()];
  if (locale === 'en') return `${weekday}, ${MONTHS_EN[date.getMonth()]} ${day}`;
  if (locale === 'jp') return `${month}月${day}日(${weekday})`;
  return `${month}월 ${day}일 (${weekday})`;
}

/** M/D 짧은 형식 */
export function formatDateShort(date: Date = new Date()): string {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

// ── 실시간 시각 훅 ──────────────────────────────────────────────────────

interface UseCurrentTimeOptions {
  /** 갱신 주기 (ms). 기본 60000 (1분). 초 단위 필요 시 1000. */
  interval?: number;
  /** false이면 시각 갱신 중지 (탭 비활성 시) */
  active?: boolean;
  /** 날짜 포맷 로케일 (기본 ko — 미니사이트 하위호환) */
  locale?: Locale;
}

/**
 * 목업 내 실시간 시각 표시용 훅.
 *
 * @returns { time, date, timeWithSeconds } — 각각 HH:MM, M월 D일 (요일), HH:MM:SS
 *
 * @example
 * const { time, date } = useCurrentTime({ interval: 60000, active });
 * // time = "14:35", date = "3월 11일 (화)"
 */
export function useCurrentTime({ interval = 60000, active = true, locale = 'ko' }: UseCurrentTimeOptions = {}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!active || prefersReducedMotion) return;

    // 즉시 갱신
    setNow(new Date());

    const id = setInterval(() => setNow(new Date()), interval);
    return () => clearInterval(id);
  }, [interval, active]);

  return {
    time: formatTime(now),
    timeWithSeconds: formatTimeWithSeconds(now),
    date: formatDate(now, locale),
    dateShort: formatDateShort(now),
    raw: now,
  };
}
