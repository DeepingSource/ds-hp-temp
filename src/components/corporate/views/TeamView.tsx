'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, X, Users, ShieldCheck, HeartHandshake, Zap, Quote, Maximize2 } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import { TEAM_MEMBERS, memberShort, memberStory, type TeamGroup, type TeamMember, type VoiceTheme } from '@/data/teamMembers';
import { localeHref, type Locale } from '@/lib/i18n';
import { crumb } from '@/lib/breadcrumb-labels';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * TeamView — light-toned "compact roster + spotlight" (DESIGN_v2 §6.3: no full-page
 * dark for marketing; dark reserved for the closing CTA via Section variant="dark").
 *
 * Avatars stay SMALL by default: every tile is a compact card with a circular
 * avatar (pastel tint + mix-blend-multiply) beside name/role — the wall reads as
 * a quiet roster, not an image gallery. The LARGE portrait lives only in the
 * SPOTLIGHT — click any card to open an accessible dialog with the full-size
 * portrait, quote, and prev/next browsing (arrow keys / Esc). Leadership uses a
 * slightly larger avatar + a visible one-line quote; everyone else sits in the
 * denser roster grid.
 */

const GROUPS: { key: TeamGroup | 'All'; labelKo: string; labelEn: string; labelJp: string }[] = [
  { key: 'All', labelKo: '전체', labelEn: 'All People', labelJp: 'すべて' },
  { key: 'Leadership', labelKo: '리더십', labelEn: 'Leadership', labelJp: 'リーダーシップ' },
  { key: 'Research & AI', labelKo: 'AI & 연구', labelEn: 'Research & AI', labelJp: 'AI & 研究' },
  { key: 'Engineering', labelKo: '엔지니어링', labelEn: 'Engineering', labelJp: 'エンジニアリング' },
  { key: 'Product & Design', labelKo: '제품 & 디자인', labelEn: 'Product & Design', labelJp: 'プロダクト & デザイン' },
  { key: 'Business & Operations', labelKo: '비즈니스 & 운영', labelEn: 'Business & Operations', labelJp: 'ビジネス & オペレーション' },
];

const GROUP_KO_MAP: Record<TeamGroup, string> = {
  Leadership: '리더십',
  'Research & AI': 'AI & 연구',
  Engineering: '엔지니어링',
  'Product & Design': '제품 & 디자인',
  'Business & Operations': '비즈니스 & 운영',
};

/** Voice theme labels (PLAN_TEAM_VOICES §2.1) — shown as a second filter axis
 *  and as a badge in the spotlight. Only rendered once voice data exists. */
const THEME_META: Record<VoiceTheme, { ko: string; en: string; jp: string }> = {
  craft: { ko: '제품 · 기술', en: 'Craft', jp: 'プロダクト・技術' },
  culture: { ko: '팀 · 문화', en: 'Team & Culture', jp: 'チーム・文化' },
  philosophy: { ko: '철학', en: 'Philosophy', jp: '哲学' },
};
const THEME_ORDER: VoiceTheme[] = ['craft', 'culture', 'philosophy'];

function themeLabel(t: VoiceTheme, locale: Locale): string {
  return locale === 'ko' ? THEME_META[t].ko : locale === 'jp' ? THEME_META[t].jp : THEME_META[t].en;
}

/** Round-robin by theme so the wall never reads 3+ same-theme cards in a row.
 *  Members without voice data keep their relative order in a fourth bucket. */
function interleaveByTheme(list: TeamMember[]): TeamMember[] {
  if (!list.some((m) => m.voice)) return list;
  const buckets: TeamMember[][] = [...THEME_ORDER.map((t) => list.filter((m) => m.voice?.theme === t)), list.filter((m) => !m.voice)];
  const out: TeamMember[] = [];
  for (let i = 0; out.length < list.length; i++) {
    for (const b of buckets) if (i < b.length) out.push(b[i]);
  }
  return out;
}

/** Per-person pastel tints — soft, brand-adjacent. Illustrations sit on top with
 *  mix-blend-multiply so their white/near-white backgrounds take the tint. */
const TINTS = ['#EEF3FE', '#FDF3E7', '#EFF6EF', '#FBF0F3', '#F3F0FB', '#FDF8E8'] as const;

function tintFor(m: TeamMember): string {
  if (m.avatarColor) return m.avatarColor;
  // deterministic: stable across filters (hash by id, not render index)
  let h = 0;
  for (let i = 0; i < m.id.length; i++) h = (h * 31 + m.id.charCodeAt(i)) | 0;
  return TINTS[Math.abs(h) % TINTS.length];
}

/** Each principle is the company's sentence; `voiceOf` attaches members whose
 *  testimony PROVES it (declaration → evidence, PLAN_TEAM_VOICES Beat 4).
 *  Quotes come from the member data, so they update as real voices arrive. */
const CULTURE_ITEMS = [
  {
    icon: ShieldCheck,
    titleKo: '프라이버시 First',
    titleEn: 'Privacy First',
    titleJp: 'プライバシーファースト',
    descKo: '단 한 사람의 개인정보도 남기지 않으면서 오프라인 공간을 완벽하게 이해하는 기술적 자부심을 공유합니다.',
    descEn: 'We hold pride in perfectly understanding physical spaces while leaving zero personal identity.',
    descJp: '個人情報を残さずにオフライン空間を完璧に理解する技術的誇りを共有します。',
    voiceOf: ['taehoon-kim'],
  },
  {
    icon: Zap,
    titleKo: '권고는 AI가, 결정은 사람이',
    titleEn: 'AI Advises, People Decide',
    titleJp: 'AIが提案し、人が決定する',
    descKo: 'AI 기술로 현장 종사자의 번거로움을 줄이고, 인간의 결정과 서비스 가치를 극대화합니다.',
    descEn: 'We use AI to eliminate frontline friction and maximize human decision-making and service value.',
    descJp: 'AI技術で現場の煩わしさを減らし、人間の決定とサービス価値を最大化します。',
    voiceOf: ['bongkyung-ko'],
  },
  {
    icon: HeartHandshake,
    titleKo: '자율과 책임의 문화',
    titleEn: 'Autonomy & Ownership',
    titleJp: '自律と責任の文化',
    descKo: '각자의 분야에서 뛰어난 몰입과 주도성을 갖고, 수평적이고 솔직한 커뮤니케이션으로 제품을 만듭니다.',
    descEn: 'We thrive on high autonomy and deep ownership, creating products through honest and flat collaboration.',
    descJp: '高い自律と深いオーナーシップを持ち、フラットで率直なコミュニケーションで製品を作ります。',
    voiceOf: ['sumin-lee'],
  },
];

export default function TeamView({ locale }: { locale: Locale }) {
  const [selectedGroup, setSelectedGroup] = useState<TeamGroup | 'All'>('All');
  const [selectedTheme, setSelectedTheme] = useState<VoiceTheme | 'All'>('All');
  const [spotlightId, setSpotlightId] = useState<string | null>(null);

  const leaderships = useMemo(() => TEAM_MEMBERS.filter((m) => m.isLeadership), []);
  // Theme filter axis appears only once real voice data exists.
  const themesPresent = useMemo(() => {
    const s = new Set<VoiceTheme>();
    TEAM_MEMBERS.forEach((m) => m.voice && s.add(m.voice.theme));
    return THEME_ORDER.filter((t) => s.has(t));
  }, []);
  const filteredMembers = useMemo(() => {
    const byGroup = selectedGroup === 'All' ? TEAM_MEMBERS : TEAM_MEMBERS.filter((m) => m.group === selectedGroup);
    const byTheme = selectedTheme === 'All' ? byGroup : byGroup.filter((m) => m.voice?.theme === selectedTheme);
    return selectedTheme === 'All' ? interleaveByTheme(byTheme) : byTheme;
  }, [selectedGroup, selectedTheme]);

  // Spotlight browses within the list the user is currently looking at; if the
  // clicked person isn't in the active filter (e.g. a leadership tile), browse all.
  const spotlightList =
    spotlightId && filteredMembers.some((m) => m.id === spotlightId) ? filteredMembers : TEAM_MEMBERS;

  return (
    <div className="bg-white min-h-screen">
      {/* ── Beat 1 — Hero (light, standard subpage pattern) ── */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 bg-[var(--layer-bg-hero,#FCFCFE)] border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-dot-light opacity-60 pointer-events-none" aria-hidden="true" />
        <Container className="relative">
          <Breadcrumb items={[{ name: crumb('team', locale), path: '/company/team' }]} locale={locale} className="mb-6" />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-wider text-primary mb-6">
              <SaaiSymbol className="w-3.5 h-3.5 text-primary" />
              {locale === 'ko' ? '딥핑소스 사람들 · People' : locale === 'jp' ? 'DEEPINGSOURCE の人々 · People' : 'DeepingSource People'}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight font-display break-keep mb-6">
              <WordRise text={locale === 'ko' ? '물리적 공간을 다시 만드는 사람들.' : locale === 'jp' ? '物理的空間を再構築する人々。' : 'Reinventing physical space.'} />
            </h1>
            <p className="text-base sm:text-xl text-gray-600 leading-relaxed break-keep max-w-2xl">
              {locale === 'ko'
                ? 'AI 연구자, 소프트웨어 엔지니어, 리테일 전문가, 데이터 분석가가 모여 오프라인 공간의 무한한 가능성을 데이터와 지능으로 바꿉니다.'
                : locale === 'jp'
                ? 'AI研究者、ソフトウェアエンジニア、リテール専門家、データアナリストが集まり、空間の無限の可能性を現実へと変えます。'
                : 'AI researchers, software engineers, retail experts, and data analysts coming together to transform physical spaces.'}
            </p>
            {/* Face pile — people first, right from the hero */}
            <div className="mt-8 flex items-center gap-4">
              <ul className="flex -space-x-3" aria-hidden="true">
                {TEAM_MEMBERS.slice(0, 7).map((m, i) => (
                  <li
                    key={m.id}
                    className="w-11 h-11 rounded-full ring-2 ring-white overflow-hidden"
                    style={{ backgroundColor: tintFor(m), zIndex: 7 - i }}
                  >
                    <Image src={m.avatarUrl} alt="" width={44} height={44} unoptimized className="w-full h-full object-cover mix-blend-multiply" />
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-gray-500">
                {locale === 'ko' ? `${TEAM_MEMBERS.length}명이 함께 만들고 있습니다` : locale === 'jp' ? `${TEAM_MEMBERS.length}名のチーム` : `${TEAM_MEMBERS.length} people and growing`}
              </p>
            </div>
            {/* First testimony — the page speaks in members' voices from the hero */}
            <HeroVoiceTicker locale={locale} onOpen={setSpotlightId} />
          </div>
        </Container>
      </section>

      {/* ── Beat 2 — Leadership (light, larger tiles + one-line quote) ── */}
      <Section variant="default">
        <Container>
          <div className="mb-12 max-w-3xl">
            <Eyebrow className="mb-3">Leadership</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep mb-3">
              {locale === 'ko' ? '방향을 만드는 사람들' : locale === 'jp' ? '方向を創る人々' : 'The people setting the direction'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 break-keep">
              {locale === 'ko' ? '세계 최고 수준의 프라이버시 공간 AI를 현실로 만드는 딥핑소스의 리더들입니다.' : locale === 'jp' ? '世界最高水準の空間AIを現実にするリーダーたちです。' : 'Leaders making privacy-first spatial AI real at scale.'}
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {leaderships.map((m) => (
              <li key={m.id}>
                <PortraitTile member={m} locale={locale} size="lg" eager onOpen={() => setSpotlightId(m.id)} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Beat 3 — Portrait Wall (filter + dense, quiet grid) ── */}
      <Section variant="alt" id="people">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Eyebrow className="mb-3 justify-center">People</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep mb-4">
              {locale === 'ko' ? '딥핑소스의 팀원들을 만나보세요' : locale === 'jp' ? 'チームメンバーに会いましょう' : 'Meet the team behind SAAI'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 break-keep">
              {locale === 'ko' ? '카드를 누르면 큰 초상과 각 팀원의 이야기를 볼 수 있어요.' : locale === 'jp' ? 'カードを押すと大きなポートレートと各メンバーのストーリーが見られます。' : 'Tap any card to see the full portrait and each person’s story.'}
            </p>
          </div>

          {/* Group filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12" role="group" aria-label={locale === 'ko' ? '팀 그룹 필터' : 'Team group filter'}>
            {GROUPS.map((g) => {
              const active = selectedGroup === g.key;
              const count = g.key === 'All' ? TEAM_MEMBERS.length : TEAM_MEMBERS.filter((m) => m.group === g.key).length;
              return (
                <button
                  key={g.key}
                  onClick={() => setSelectedGroup(g.key)}
                  aria-pressed={active}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    active
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900'
                  }`}
                >
                  <span>{locale === 'ko' ? g.labelKo : locale === 'jp' ? g.labelJp : g.labelEn}</span>
                  <span className={`text-xs font-bold ${active ? 'text-white/60' : 'text-gray-400'}`}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Theme filter — "무엇에 대한 이야기인가" 축. voice 데이터가 생기면 나타난다. */}
          {themesPresent.length > 0 && (
            <div
              className="-mt-6 mb-12 flex flex-wrap items-center justify-center gap-2"
              role="group"
              aria-label={locale === 'ko' ? '이야기 주제 필터' : locale === 'jp' ? 'ストーリーテーマフィルター' : 'Story theme filter'}
            >
              <span className="text-xs font-semibold text-gray-400 mr-1">
                {locale === 'ko' ? '이야기 주제' : locale === 'jp' ? 'ストーリー' : 'Stories about'}
              </span>
              {(['All', ...themesPresent] as (VoiceTheme | 'All')[]).map((t) => {
                const active = selectedTheme === t;
                return (
                  <button
                    key={t}
                    onClick={() => setSelectedTheme(t)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      active ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-900'
                    }`}
                  >
                    {t === 'All' ? (locale === 'ko' ? '전체' : locale === 'jp' ? 'すべて' : 'All') : themeLabel(t, locale)}
                  </button>
                );
              })}
            </div>
          )}

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredMembers.map((m) => (
              <li key={m.id}>
                <PortraitTile member={m} locale={locale} size="sm" onOpen={() => setSpotlightId(m.id)} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Beat 4 — Culture & Principles ── */}
      <Section variant="default">
        <Container>
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <Eyebrow className="mb-3 justify-center">Our Culture</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep">
              {locale === 'ko' ? '딥핑소스가 일하는 문화' : locale === 'jp' ? 'DEEPINGSOURCE の働く文化' : 'How we work together'}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {CULTURE_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-8 rounded-2xl border border-gray-200 bg-white hover:shadow-card transition-shadow duration-300 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary-lighter flex items-center justify-center mb-5 text-primary">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2.5 break-keep">
                    {locale === 'ko' ? item.titleKo : locale === 'jp' ? item.titleJp : item.titleEn}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-keep flex-1">
                    {locale === 'ko' ? item.descKo : locale === 'jp' ? item.descJp : item.descEn}
                  </p>
                  {/* 선언 아래, 그 원칙을 증언하는 구성원의 문장 (클릭 → 스포트라이트) */}
                  {item.voiceOf?.map((id) => {
                    const m = TEAM_MEMBERS.find((x) => x.id === id);
                    if (!m) return null;
                    const vName = locale === 'ko' ? m.nameKo : m.nameEn;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSpotlightId(id)}
                        aria-haspopup="dialog"
                        aria-label={locale === 'ko' ? `${vName}의 이야기 크게 보기` : `Open ${vName}'s story`}
                        className="group mt-5 w-full text-left flex items-start gap-3 rounded-xl bg-gray-50 p-3.5 cursor-pointer transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <span
                          className="relative shrink-0 w-8 h-8 rounded-full overflow-hidden ring-1 ring-black/5"
                          style={{ backgroundColor: tintFor(m) }}
                          aria-hidden="true"
                        >
                          <Image src={m.avatarUrl} alt="" width={32} height={32} unoptimized className="w-full h-full object-cover mix-blend-multiply" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs text-gray-600 leading-relaxed break-keep line-clamp-3">
                            “{memberShort(m, locale)}”
                          </span>
                          <span className="mt-1 block text-2xs font-bold text-gray-400 group-hover:text-primary transition-colors">
                            {vName}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── Beat 5 — Join Us / Career CTA (dark via design token) ── */}
      <Section variant="dark">
        <Container className="text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-light mb-4">
            <Users className="w-3.5 h-3.5" aria-hidden="true" />
            Careers & Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-display break-keep">
            {locale === 'ko' ? '물리적 공간의 다음 혁신을 함께 만듭니다' : locale === 'jp' ? '次の空間イノベーションを共に創りましょう' : 'Shape the future of physical space'}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-xl mx-auto break-keep">
            {locale === 'ko'
              ? '프라이버시와 인공지능이 만나는 지점에서 전 세계 오프라인을 바꿀 훌륭한 동료를 찾고 있습니다.'
              : locale === 'jp'
              ? 'プライバシーとAIが出会う場所で、世界中のオフラインを変える素晴らしい仲間を探しています。'
              : 'Join our team to solve meaningful challenges at the intersection of AI, privacy, and physical space.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={localeHref(locale, '/company/career')} className="btn-primary btn-lg inline-flex items-center gap-2">
              <span>{locale === 'ko' ? '채용 포지션 및 문화 보기' : locale === 'jp' ? '採用ポジションを見る' : 'View open careers'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href={localeHref(locale, '/company/about')} className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl transition-colors">
              <span>{locale === 'ko' ? '회사 소개' : locale === 'jp' ? '会社紹介' : 'About DeepingSource'}</span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── Spotlight dialog ── */}
      {spotlightId && (
        <SpotlightDialog
          list={spotlightList}
          currentId={spotlightId}
          locale={locale}
          onNavigate={setSpotlightId}
          onClose={() => setSpotlightId(null)}
        />
      )}
    </div>
  );
}

/** PortraitTile — compact roster card: SMALL circular avatar (pastel tint) beside
 *  name/role. The large portrait is intentionally NOT here — all depth (full-size
 *  image, quote, browsing) lives in the spotlight dialog the card opens. */
function PortraitTile({
  member: m,
  locale,
  size,
  eager = false,
  onOpen,
}: {
  member: TeamMember;
  locale: Locale;
  size: 'lg' | 'sm';
  eager?: boolean;
  onOpen: () => void;
}) {
  const name = locale === 'ko' ? m.nameKo : m.nameEn;
  const role = locale === 'ko' ? m.roleKo : locale === 'jp' ? m.roleJp : m.roleEn;
  const short = memberShort(m, locale);
  const theme = m.voice?.theme;
  const tint = tintFor(m);
  const lg = size === 'lg';
  const avatarPx = lg ? 72 : 56;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={locale === 'ko' ? `${name} — ${role}, 크게 보기` : `${name} — ${role}, view large profile`}
      aria-haspopup="dialog"
      className={`group relative w-full text-left rounded-2xl bg-white border border-gray-200 cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${lg ? 'p-5' : 'p-4'}`}
    >
      <span className="flex items-start gap-4">
        {/* Small avatar — the wall stays quiet; the big portrait lives in the dialog */}
        <span
          className="relative shrink-0 rounded-full overflow-hidden ring-1 ring-black/5"
          style={{ backgroundColor: tint, width: avatarPx, height: avatarPx }}
          aria-hidden="true"
        >
          <Image
            src={m.avatarUrl}
            alt=""
            width={avatarPx}
            height={avatarPx}
            loading={eager ? 'eager' : 'lazy'}
            unoptimized
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </span>

        <span className="min-w-0 flex-1 pr-6">
          <span className="flex items-center gap-1.5">
            <h3 className={`truncate font-bold text-gray-900 font-display group-hover:text-primary transition-colors ${lg ? 'text-lg' : 'text-base'}`}>
              {name}
            </h3>
            {m.isLeadership && !lg && (
              <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-gray-100 text-2xs font-bold uppercase tracking-wider text-gray-600">
                Lead
              </span>
            )}
          </span>
          <p className={`font-semibold text-primary break-keep ${lg ? 'text-sm mt-0.5' : 'text-xs mt-0.5'}`}>{role}</p>
          {/* 한 줄 자랑 — 벽이 '사람 목록'이 아니라 '말풍선 벽'이 되게 (voice.short → 없으면 기존 인용구) */}
          <p className={`text-gray-500 leading-relaxed break-keep line-clamp-2 ${lg ? 'mt-2.5 text-sm' : 'mt-1.5 text-xs'}`}>
            “{short}”
          </p>
          {theme && (
            <span className="mt-2 inline-flex px-2 py-0.5 rounded-full bg-gray-100 text-2xs font-bold uppercase tracking-wider text-gray-500">
              {themeLabel(theme, locale)}
            </span>
          )}
        </span>
      </span>

      {/* Enlarge affordance — appears on hover/focus, signals "view large" */}
      <span
        className={`absolute top-1/2 -translate-y-1/2 text-gray-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:text-primary ${lg ? 'right-5' : 'right-4'}`}
        aria-hidden="true"
      >
        <Maximize2 className="w-4 h-4" />
      </span>
    </button>
  );
}

/** HeroVoiceTicker — one testimony at a time in the hero, rotating every 5s.
 *  Pauses on hover/focus (WCAG 2.2.2); static under prefers-reduced-motion.
 *  Click opens the member's spotlight. */
function HeroVoiceTicker({ locale, onOpen }: { locale: Locale; onOpen: (id: string) => void }) {
  const reduced = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const list = TEAM_MEMBERS;

  useEffect(() => {
    if (reduced || paused || list.length < 2) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % list.length), 5000);
    return () => clearInterval(t);
  }, [reduced, paused, list.length]);

  const m = list[idx % list.length];
  const name = locale === 'ko' ? m.nameKo : m.nameEn;
  const role = locale === 'ko' ? m.roleKo : locale === 'jp' ? m.roleJp : m.roleEn;

  return (
    <div className="mt-6 max-w-2xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <button
        type="button"
        onClick={() => onOpen(m.id)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-haspopup="dialog"
        aria-label={locale === 'ko' ? `${name}의 이야기 크게 보기` : `Open ${name}'s story`}
        className="group w-full text-left flex items-start gap-3 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur px-4 py-3.5 cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span key={m.id} className="flex items-start gap-3 min-w-0 animate-fade-in">
          <span
            className="relative shrink-0 w-9 h-9 rounded-full overflow-hidden ring-1 ring-black/5"
            style={{ backgroundColor: tintFor(m) }}
            aria-hidden="true"
          >
            <Image src={m.avatarUrl} alt="" width={36} height={36} unoptimized className="w-full h-full object-cover mix-blend-multiply" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm text-gray-700 leading-relaxed break-keep line-clamp-2">“{memberShort(m, locale)}”</span>
            <span className="mt-1 block text-xs font-semibold text-gray-400 truncate group-hover:text-primary transition-colors">
              {name} · {role}
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}

/** SpotlightDialog — one person, full attention. Esc closes; ←/→ browse. */
function SpotlightDialog({
  list,
  currentId,
  locale,
  onNavigate,
  onClose,
}: {
  list: TeamMember[];
  currentId: string;
  locale: Locale;
  onNavigate: (id: string) => void;
  onClose: () => void;
}) {
  const index = Math.max(0, list.findIndex((m) => m.id === currentId));
  const m = list[index] ?? list[0];
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      const next = (index + dir + list.length) % list.length;
      onNavigate(list[next].id);
    },
    [index, list, onNavigate],
  );

  // Scroll lock + initial focus + keyboard controls.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  const name = locale === 'ko' ? m.nameKo : m.nameEn;
  const role = locale === 'ko' ? m.roleKo : locale === 'jp' ? m.roleJp : m.roleEn;
  const short = memberShort(m, locale);
  const story = memberStory(m, locale);
  const groupLabel = locale === 'ko' ? GROUP_KO_MAP[m.group] : m.group;
  const tint = tintFor(m);
  const endorsed = m.endorses ? TEAM_MEMBERS.find((x) => x.id === m.endorses) : undefined;

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-spotlight-name"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm animate-fade-in" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full sm:max-w-2xl lg:max-w-3xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={locale === 'ko' ? '닫기' : 'Close'}
          className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-white/85 backdrop-blur border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="w-4.5 h-4.5" aria-hidden="true" />
        </button>

        <div className="grid sm:grid-cols-[minmax(0,42%)_1fr]">
          {/* Portrait */}
          <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[420px]" style={{ backgroundColor: tint }}>
            <Image
              key={m.id}
              src={m.avatarUrl}
              alt={locale === 'ko' ? `${name} 일러스트 초상` : `Illustrated portrait of ${name}`}
              fill
              sizes="(min-width:640px) 40vw, 100vw"
              unoptimized
              className="object-cover mix-blend-multiply"
            />
          </div>

          {/* Story */}
          <div className="p-7 sm:p-9 flex flex-col">
            <span className="flex flex-wrap items-center gap-1.5 mb-4">
              <span className="inline-flex px-2.5 py-1 rounded-full bg-gray-100 text-2xs font-bold uppercase tracking-wider text-gray-600">
                {groupLabel}
              </span>
              {m.voice && (
                <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-2xs font-bold uppercase tracking-wider text-primary">
                  {themeLabel(m.voice.theme, locale)}
                </span>
              )}
            </span>
            <h3 id="team-spotlight-name" className="text-2xl sm:text-3xl font-bold text-gray-900 font-display">
              {name}
            </h3>
            <p className="mt-1 text-sm font-bold text-primary break-keep">{role}</p>
            {locale === 'ko' && <p className="mt-0.5 text-xs font-semibold text-gray-500">{m.nameEn}</p>}

            <blockquote className="mt-6 flex-1 min-h-0 overflow-y-auto pr-1">
              <Quote className="w-5 h-5 text-primary/30 mb-2" aria-hidden="true" />
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium break-keep">“{short}”</p>
              {/* voice.story가 있으면 2~3문단 일화 — 클릭 보상 강화 */}
              {story.map((p, i) => (
                <p key={i} className="mt-3 text-sm text-gray-600 leading-relaxed break-keep">
                  {p}
                </p>
              ))}
              {m.voice?.askMeAbout && m.voice.askMeAbout.length > 0 && (
                <div className="mt-5">
                  <p className="text-2xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {locale === 'ko' ? '이런 이야기를 물어보세요' : locale === 'jp' ? 'こんな話を聞いてください' : 'Ask me about'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.voice.askMeAbout.map((chip) => (
                      <span key={chip} className="px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {endorsed && (
                <button
                  type="button"
                  onClick={() => onNavigate(endorsed.id)}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                >
                  {locale === 'ko'
                    ? `${endorsed.nameKo}님 이야기 보기`
                    : locale === 'jp'
                    ? `${endorsed.nameEn}さんのストーリーを見る`
                    : `See ${endorsed.nameEn}'s story`}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </blockquote>

            {/* Prev / next browsing */}
            <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 tabular-nums">
                {index + 1} / {list.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={locale === 'ko' ? '이전 팀원' : 'Previous person'}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={locale === 'ko' ? '다음 팀원' : 'Next person'}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
