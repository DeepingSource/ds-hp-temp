import { type Locale } from './i18n';

/**
 * brand-canon.ts — single source for brand copy lifted from the brand-system SOT.
 *
 * SOT: SAAI_AI_Handoff.md
 *      — Voice_v2.5 (messaging spine · two master copies)
 *      — Architecture_v4 (SEED·SOURCE·SOLUTION)
 *      — Copy_Decision_v1 (두 마스터)
 *
 * RULE: do not invent copy here — only lift from the SOT. The two master copies
 * (모든 매장을 한 매장처럼 / 우리 매장이 대표 매장처럼) live in i18n.ts homeCopy;
 * this file holds the *texture* lines the site was missing.
 *
 * NOTE (jp): the SOT copy spine is ko/en authoritative. Japanese renderings below
 * are FINALIZED (2026-05-29).
 */

/**
 * 시그니처 — 마스터 카피를 받치는 카테고리 정의 (SAAI_AI_Handoff.md · Voice_v2.5).
 */
export const signature: Record<Locale, string> = {
  ko: '보는 AI를 넘어, 매장을 운영하는 AI.',
  en: 'Beyond seeing — AI that operates space.',
  jp: '見るAIを超え、空間を運営するAI。',
};

/** Brand signature (5자) — SAAI_AI_Handoff.md · A2. EN/JP per the weaving frame. */
export const seam: Record<Locale, string> = {
  ko: '사이를 메웁니다.',
  en: 'We weave the in-between.',
  jp: '間を紡ぐ。',
};

/**
 * Perfect Space — the two-level promise (launch film 00:0 / 09:5).
 * your = SAAI(당신의 공간) · every = DeepingSource(모든 공간).
 */
export const perfectSpace: { your: Record<Locale, string>; every: Record<Locale, string> } = {
  your: { ko: '당신의 공간을, 완벽하게', en: 'Perfect your space.', jp: 'あなたの空間を、完璧に。' },
  every: { ko: '모든 공간을, 완벽하게', en: 'Perfect every space.', jp: 'すべての空間を、完璧に。' },
};

/** Category definition — the recurring thesis. */
export const categoryLine: Record<Locale, string> = {
  ko: '이미 달린 CCTV 위에서, 누구가 아니라 무엇을 어떻게. 익명으로 관찰하고, 분석하고, 제안하고, 학습하는 AI.',
  en: 'On the CCTV you already have — not who, but what and how. AI that observes, analyzes, suggests, and learns, anonymously.',
  jp: 'すでにあるCCTVの上で、誰かではなく、何をどう。匿名で観察し、分析し、提案し、学習するAI。',
};

/**
 * Operating loop — Observe · Analyze · Suggest · Learn (SAAI_AI_Handoff.md · A4).
 * Replaces the retired 3-step Read·Alert·Act. phase = the time axis (어제/지금/알림/다음).
 * (KO/JP wording is a handoff-faithful draft pending brand sign-off.)
 */
export const operatingLoop: Record<Locale, { label: string; phase: string }[]> = {
  ko: [
    { label: '관찰', phase: '어제' },
    { label: '분석', phase: '지금' },
    { label: '제안', phase: '알림' },
    { label: '학습', phase: '다음' },
  ],
  en: [
    { label: 'Observe', phase: 'Yesterday' },
    { label: 'Analyze', phase: 'Now' },
    { label: 'Suggest', phase: 'Alert' },
    { label: 'Learn', phase: 'Next' },
  ],
  jp: [
    { label: '観察', phase: '昨日' },
    { label: '分析', phase: '今' },
    { label: '提案', phase: '通知' },
    { label: '学習', phase: '次' },
  ],
};

/** 회사 한 줄 — 창업 서사 (SAAI_AI_Handoff.md · Copy_Decision_v1 회사 한 줄). */
export const companyLine: Record<Locale, string> = {
  ko: '2018년부터 영상의 익명화를 깎아 온 회사.',
  en: 'Honing video anonymization since 2018.',
  jp: '2018年から、映像の匿名化を磨いてきた会社。',
};

/** 이름 유래 — DeepingSource = Deep Learning + Source (Architecture §1 Layer 0). */
export const nameOrigin: Record<Locale, string> = {
  ko: 'DeepingSource = Deep Learning + Source — 깊은 학습과 source code 위에 선 회사.',
  en: 'DeepingSource = Deep Learning + Source — built on deep learning and source code.',
  jp: 'DeepingSource = Deep Learning + Source — 深い学習とソースコードの上に立つ会社。',
};

/**
 * 3 SOLUTION 시간축 태그라인 — read·alert·act (SAAI_AI_Handoff.md · Copy_Decision_v1).
 * store insight 어제를 읽다 / store care 지금을 알리다 / store agent 다음을 실행하다.
 */
export const solutionTaglines: Record<'insight' | 'care' | 'agent', Record<Locale, string>> = {
  insight: { ko: '어제를 읽다', en: 'Reads yesterday', jp: '昨日を読む' },
  care: { ko: '지금을 알리다', en: 'Flags the now', jp: '今を知らせる' },
  agent: { ko: '다음을 실행하다', en: 'Acts on next', jp: '次を動かす' },
};

/**
 * Glanceable function-category label per product — so a cold visitor knows the
 * category in one glance (benchmark gap vs competitors). Privacy-safe framing:
 * store care = anomaly detection, NOT "safety/surveillance".
 */
export const productFunction: Record<'insight' | 'care' | 'agent', Record<Locale, string>> = {
  insight: { ko: '공간 분석 AI', en: 'Spatial Analytics AI', jp: '空間分析AI' },
  care: { ko: '이상 감지 AI', en: 'Anomaly Detection AI', jp: '異常検知AI' },
  agent: { ko: '운영 제안 AI', en: 'Operations Copilot AI', jp: '運営提案AI' },
};

/**
 * 점주/SMB 척추 CTA (Master Copy Decision §7 · D4).
 * D4=(b): 본문 중립 CTA 유지, 점주 섹션에만 사용.
 */
export const ownerCta: Record<Locale, string> = {
  ko: '첫 달 무료로 받기',
  en: 'Start your first month free',
  jp: '初月無料で受け取る',
};

/**
 * SEAL 익명화 신뢰 헌장 (External Brand Brief v1.2 §6.2).
 * tagline = KR/EN authoritative (SOT). 3약속 line = SOT 그대로.
 * jp = 위 파일 규칙대로의 finalized 렌더링(검수 대상): 신원만 제거하는 익명화 결을 유지.
 */
export type SealPromise = { key: 'no-original' | 'no-human' | 'no-reid'; term: string; line: string };

export const sealCharter: Record<Locale, { tagline: string; promises: SealPromise[] }> = {
  ko: {
    tagline: '누구가 아니라, 무슨 일을 봅니다.',
    promises: [
      { key: 'no-original', term: '원본 미보존', line: '첫 단계에서 익명화. 원본은 시스템 어디에도 남지 않습니다.' },
      { key: 'no-human', term: '사람 미열람', line: '사람의 눈은 닿지 않습니다. 기계가 봅니다.' },
      { key: 'no-reid', term: '재식별 불가', line: '익명화된 데이터로부터 신원을 되찾을 수 없습니다.' },
    ],
  },
  en: {
    tagline: 'We see what is happening, not who is there.',
    promises: [
      { key: 'no-original', term: 'No original kept', line: 'Anonymized at the first step. The original is left nowhere in the system.' },
      { key: 'no-human', term: 'No human viewing', line: 'No human eye reaches it. The machine sees.' },
      { key: 'no-reid', term: 'No re-identification', line: 'Identity cannot be recovered from anonymized data.' },
    ],
  },
  jp: {
    tagline: '誰かではなく、何が起きているかを見ます。',
    promises: [
      { key: 'no-original', term: '原本を残さない', line: '最初の段階で匿名化。原本はシステムのどこにも残しません。' },
      { key: 'no-human', term: '人が見ない', line: '人の目は触れません。機械が見ます。' },
      { key: 'no-reid', term: '再識別できない', line: '匿名化されたデータから身元を復元できません。' },
    ],
  },
};

/**
 * Purpose 결구 (External Brand Brief v1.2 §4 Manifesto · §1 Purpose).
 * closing = 매니페스토 결구(선언형 하라 → 웹 밴드용 평서 결로 정리), statement = Purpose 한 줄.
 * KR/EN = SOT. jp = finalized 렌더링(검수 대상).
 */
export const purpose: Record<Locale, { closing: string; statement: string }> = {
  ko: {
    closing: '측정할 수 있으면, 나아질 수 있습니다.',
    statement: '온라인을 바꾼 그 힘으로 — 사람이 일하고, 사람이 사는 모든 공간을 다시 만듭니다.',
  },
  en: {
    closing: 'If you can measure it, you can improve it.',
    statement: 'The force that remade online — now for every space where people work and live.',
  },
  jp: {
    closing: '測定できれば、よくできます。',
    statement: 'オンラインを変えたその力で — 人が働き、人が暮らす、すべての空間を作り直します。',
  },
};
