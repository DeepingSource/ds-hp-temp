/**
 * 회사 정보 중앙 관리 — 특허 수, 설립 연도 등 사이트 전역에서 쓰이는 상수.
 * 값은 `content/site/company.yaml` 에서 편집(Keystatic 「회사 정보」 싱글톤) →
 * gen-site-content 가 site-content.json 으로 컴파일 → 여기서 typed 로 re-export.
 * 코드는 계속 `import { COMPANY } from '@/lib/company-data'` 로 동일하게 사용한다.
 */
import siteContent from '@/data/generated/site-content.json';

export interface Company {
  name: string;
  nameKo: string;
  platform: string;
  foundingYear: number;
  patents: number;
  patentsRegistered: number;
  patentsPending: number;
  /** 특허 표기 문자열 — "등록 66개 · 출원 37개" */
  patentsLabel: string;
  partnerBrands: number;
  industries: number;
  /** 누적 투자 (억 원) — J4 확정 신뢰 수치, 신뢰 스트립 SOT */
  fundingCumulativeBillionKrw: number;
  /** 시리즈 A 규모 (억 원, KDDI 리드) */
  seriesABillionKrw: number;
  /** 인증 표기 — "SOC 2 · PIPA" */
  certLabel: string;
  nvidiaPartner: string;
  site: string;
  corporate: string;
  email: string;
  contactEmail: string;
  address: string;
  /** 사이트 태그라인 — Footer, meta 등에서 사용 */
  tagline: string;
  /** 기업 한 줄 소개 */
  companyIntro: string;
  /** 제품 한 줄 정의 */
  platformIntro: string;
  /** 핵심 비전 */
  vision: string;
  /** 프라이버시 원칙 */
  privacyPrinciple: string;
}

export const COMPANY: Company = siteContent.company as Company;
