/**
 * 회사 정보 중앙 관리
 * 특허 수, 설립 연도 등 사이트 전역에서 사용되는 상수.
 * 값이 변경되면 여기만 수정하면 전체 반영됩니다.
 */

export const COMPANY = {
  name: 'DEEPINGSOURCE Inc.',
  nameKo: '딥핑소스',
  platform: 'SAAI',
  foundingYear: 2018,
  patents: 103,
  patentsRegistered: 66,
  patentsPending: 37,
  /** 특허 표기 문자열 — "등록 66개 · 출원 37개" */
  patentsLabel: '등록 66개 · 출원 37개',
  partnerBrands: 8,
  industries: 7,
  nvidiaPartner: 'NVIDIA Inception Partner',
  site: 'https://storeagent.kr',
  corporate: 'https://www.deepingsource.io',
  email: 'SAAI@deepingsource.io',
  contactEmail: 'contact@deepingsource.io',
  address: '5F 508, Eonju-ro, Gangnam-gu, Seoul, Republic of Korea',
  /** 사이트 태그라인 — Footer, meta 등에서 사용 */
  tagline: '오프라인 공간 AI 플랫폼',
  /** 기업 한 줄 소개 */
  companyIntro: '딥핑소스는 익명화 AI 기술로 세상 모든 오프라인 공간을 안전하게 이해하고 최적화하는 AI 기업입니다.',
  /** 제품 한 줄 정의 */
  platformIntro: 'SAAI(사이)는 딥핑소스의 철학이 구현된 리테일 Spatial Agentic AI 플랫폼입니다.',
  /** 핵심 비전 */
  vision: '세상 모든 데이터를 안전하게, 세상 모든 공간을 완벽하게',
  /** 프라이버시 원칙 */
  privacyPrinciple: '개인정보를 건드리지 않고 공간을 이해합니다.',
} as const;
