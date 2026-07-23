import siteContent from './generated/site-content.json';

/**
 * Team member data — SOURCE OF TRUTH is the CMS: content/site/team.yaml,
 * edited at /keystatic ("팀 페이지 인물 (Team)", avatar image upload included).
 * `npm run gen:content` (auto on predev/prebuild) compiles the yaml into
 * src/data/generated/site-content.json → consumed here. Do NOT hand-edit the
 * member list in this file — it only re-exports the generated data with types.
 */

export type TeamGroup =
  | 'Leadership'
  | 'Research & AI'
  | 'Engineering'
  | 'Product & Design'
  | 'Business & Operations';

/** What a member's testimony is bragging about (PLAN_TEAM_VOICES §2.1).
 *  craft = 제품·기술 (내가 만든 것) · culture = 팀·문화 (함께 일하는 방식·동료)
 *  · philosophy = 철학·소신 (왜 이 문제를, 왜 이 방식으로) */
export type VoiceTheme = 'craft' | 'culture' | 'philosophy';

/** First-person testimony collected via the 3-question interview
 *  (PLAN_TEAM_VOICES §2.3). `short` feeds the wall card / hero ticker;
 *  `story` (optional) is the spotlight-dialog payload. Editing rule: edit,
 *  never ghost-write — keep each person's actual voice. Publish only after
 *  the member confirms their own text. */
export interface MemberVoice {
  theme: VoiceTheme;
  shortKo: string;
  shortEn: string;
  shortJp?: string;
  /** 2–3 short paragraphs for the spotlight dialog. Use \n\n between paragraphs. */
  storyKo?: string;
  storyEn?: string;
  storyJp?: string;
  /** Conversation-starter chips shown in the spotlight (e.g. for candidates). */
  askMeAbout?: string[];
}

export interface TeamMember {
  id: string;
  nameKo: string;
  nameEn: string;
  group: TeamGroup;
  roleKo: string;
  roleEn: string;
  roleJp: string;
  quoteKo: string;
  quoteEn: string;
  /** jp quote — falls back to quoteKo when absent. */
  quoteJp?: string;
  /** Voice testimony (PLAN_TEAM_VOICES). When absent, UI falls back to quoteKo/En. */
  voice?: MemberVoice;
  /** Cross-bragging: id of the member this testimony praises (spotlight cross-link). */
  endorses?: string;
  isLeadership?: boolean;
  avatarUrl: string;
  avatarColor?: string;
}

/** CMS-compiled member list (content/site/team.yaml → gen-site-content.mjs). */
export const TEAM_MEMBERS: TeamMember[] =
  (siteContent as unknown as { team?: TeamMember[] }).team ?? [];

/** Locale-aware one-liner: voice.short first, legacy quote as fallback. */
export function memberShort(m: TeamMember, locale: 'ko' | 'en' | 'jp'): string {
  if (m.voice) {
    if (locale === 'en') return m.voice.shortEn;
    if (locale === 'jp') return m.voice.shortJp ?? m.voice.shortKo;
    return m.voice.shortKo;
  }
  if (locale === 'en') return m.quoteEn;
  if (locale === 'jp') return m.quoteJp ?? m.quoteKo;
  return m.quoteKo;
}

/** Locale-aware story paragraphs for the spotlight; empty array = no story yet. */
export function memberStory(m: TeamMember, locale: 'ko' | 'en' | 'jp'): string[] {
  const raw =
    locale === 'en' ? m.voice?.storyEn : locale === 'jp' ? (m.voice?.storyJp ?? m.voice?.storyKo) : m.voice?.storyKo;
  return raw ? raw.split(/\n\n+/).map((p) => p.trim()).filter(Boolean) : [];
}
