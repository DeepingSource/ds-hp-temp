import { type Locale } from './i18n';

/**
 * careers.ts — 상시 영입 직군 단일 출처(SOT).
 *
 * 현재 공개 공고(specific opening)는 없음 → "상시 영입 직군(role families)" 구조로 운영.
 * 추후 채용 솔루션(그리팅/노션 등) 연동 시 동적 포지션 배열로 확장.
 */

export type RoleFamily = {
  key: string;
  title: string;
  /** 한 줄 설명 */
  desc: string;
};

export const roleFamilies: Record<Locale, RoleFamily[]> = {
  ko: [
    { key: 'research', title: 'AI 리서치', desc: '컴퓨터 비전 · 익명화 · 공간 지능 모델을 연구하고 제품으로 잇습니다.' },
    { key: 'engineering', title: '엔지니어링', desc: '백엔드 · 데이터 · 엣지/디바이스 · 플랫폼 — 현장에서 동작하는 시스템을 만듭니다.' },
    { key: 'product', title: '제품 · 디자인', desc: 'SAAI 제품 기획과 UX. 현장의 진짜 문제를 쓰기 쉬운 제품으로 옮깁니다.' },
    { key: 'business', title: '사업 · 파트너십', desc: '국내외 영업과 파트너십. 일본 등 글로벌 확장을 함께 만듭니다.' },
  ],
  en: [
    { key: 'research', title: 'AI Research', desc: 'Research computer vision, anonymization, and spatial-intelligence models — and carry them into products.' },
    { key: 'engineering', title: 'Engineering', desc: 'Backend, data, edge/device, and platform — systems that work in the real world.' },
    { key: 'product', title: 'Product · Design', desc: 'SAAI product and UX. Turning real on-site problems into products people love to use.' },
    { key: 'business', title: 'Business · Partnerships', desc: 'Domestic and global sales and partnerships — building expansion incl. Japan together.' },
  ],
  jp: [
    { key: 'research', title: 'AIリサーチ', desc: 'コンピュータビジョン · 匿名化 · 空間知能モデルを研究し、製品へつなげます。' },
    { key: 'engineering', title: 'エンジニアリング', desc: 'バックエンド · データ · エッジ/デバイス · プラットフォーム — 現場で動くシステムを作ります。' },
    { key: 'product', title: 'プロダクト · デザイン', desc: 'SAAIの製品企画とUX。現場の本当の課題を使いやすい製品に変えます。' },
    { key: 'business', title: '事業 · パートナーシップ', desc: '国内外の営業とパートナーシップ。日本などグローバル展開をともに作ります。' },
  ],
};
