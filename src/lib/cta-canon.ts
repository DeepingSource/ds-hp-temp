/**
 * 전환 CTA 캐논 (MASTER §2-1 · 2026-07-24 확정) — 세그먼트 2트랙 표준.
 *
 * - 트랙 E(본사·프랜차이즈·엔터프라이즈): 1차 라벨 "도입 상담 신청" → /contact?type=enterprise
 *   (Pricing만 "맞춤 견적 받기" 허용)
 * - 트랙 O(개별 점주): 1차 라벨 "무료로 시작하기" → saai.store 등 자가 시작 경로
 * - functions 레인(queue·pop·fit·ads-insight)은 페이지별 맥락형 라벨 예외(③7.5),
 *   단 목적지는 트랙 규칙(/contact 또는 자가 시작 경로)을 따른다.
 *
 * 새 CTA는 라벨·경로를 하드코딩하지 말고 반드시 여기서 참조한다.
 * contact 파라미터 표준은 `?type=enterprise` (§2-5 — `?type=hq` 표기는 전부 이걸로 읽는다).
 */
import type { Locale } from '@/lib/i18n';

/** 트랙 E 1차 CTA 라벨 — 전 구간 통일. */
export const CTA_TRACK_E: Record<Locale, string> = {
  ko: '도입 상담 신청',
  en: 'Request a consultation',
  jp: '導入のご相談',
};

/** 트랙 E 견적 변형 — Pricing 전용 허용. */
export const CTA_TRACK_E_QUOTE: Record<Locale, string> = {
  ko: '맞춤 견적 받기',
  en: 'Get a tailored quote',
  jp: 'カスタム見積もりを受け取る',
};

/** 트랙 O 1차 CTA 라벨 — 자가 시작. */
export const CTA_TRACK_O: Record<Locale, string> = {
  ko: '무료로 시작하기',
  en: 'Start for free',
  jp: '無料で始める',
};

/** 트랙 E 상담 목적지 — §2-5 확정 파라미터 표준. */
export const CONTACT_ENTERPRISE_PATH = '/contact?type=enterprise';

/** product 컨텍스트를 병기한 트랙 E 상담 경로 (예: contactEnterpriseHref('saai-care')). */
export const contactEnterpriseHref = (product?: string) =>
  product ? `${CONTACT_ENTERPRISE_PATH}&product=${product}` : CONTACT_ENTERPRISE_PATH;

/** 트랙 O 자가 시작 기본 URL — 제품별 오버라이드 가능(care는 storecare.ai). */
export const OWNER_START_URL = 'https://saai.store';
