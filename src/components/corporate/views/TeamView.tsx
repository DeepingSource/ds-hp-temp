'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, X, Users, ShieldCheck, HeartHandshake, Zap, Quote } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import { TEAM_MEMBERS, type TeamGroup, type TeamMember } from '@/data/teamMembers';
import { localeHref, type Locale } from '@/lib/i18n';
import { crumb } from '@/lib/breadcrumb-labels';

/**
 * TeamView — light-toned "portrait wall + spotlight" (DESIGN_v2 §6.3: no full-page
 * dark for marketing; dark reserved for the closing CTA via Section variant="dark").
 *
 * Focus-on-people pattern: the wall stays quiet (illustration + name + role only,
 * per-person pastel tint unified with mix-blend-multiply), and depth lives in the
 * SPOTLIGHT — click any tile to open an accessible dialog with the large portrait,
 * quote, and prev/next browsing (arrow keys / Esc). Leadership leads with larger
 * tiles + a visible one-line quote; everyone else sits in the denser gallery grid.
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

const CULTURE_ITEMS = [
  {
    icon: ShieldCheck,
    titleKo: '프라이버시 First',
    titleEn: 'Privacy First',
    titleJp: 'プライバシーファースト',
    descKo: '단 한 사람의 개인정보도 남기지 않으면서 오프라인 공간을 완벽하게 이해하는 기술적 자부심을 공유합니다.',
    descEn: 'We hold pride in perfectly understanding physical spaces while leaving zero personal identity.',
    descJp: '個人情報を残さずにオフライン空間を完璧に理解する技術的誇りを共有します。',
  },
  {
    icon: Zap,
    titleKo: '권고는 AI가, 결정은 사람이',
    titleEn: 'AI Advises, People Decide',
    titleJp: 'AIが提案し、人が決定する',
    descKo: 'AI 기술로 현장 종사자의 번거로움을 줄이고, 인간의 결정과 서비스 가치를 극대화합니다.',
    descEn: 'We use AI to eliminate frontline friction and maximize human decision-making and service value.',
    descJp: 'AI技術で現場の煩わしさを減らし、人間の決定とサービス価値を最大化します。',
  },
  {
    icon: HeartHandshake,
    titleKo: '자율과 책임의 문화',
    titleEn: 'Autonomy & Ownership',
    titleJp: '自律と責任の文化',
    descKo: '각자의 분야에서 뛰어난 몰입과 주도성을 갖고, 수평적이고 솔직한 커뮤니케이션으로 제품을 만듭니다.',
    descEn: 'We thrive on high autonomy and deep ownership, creating products through honest and flat collaboration.',
    descJp: '高い自律と深いオーナーシップを持ち、フラットで率直なコミュニケーションで製品を作ります。',
  },
];

export default function TeamView({ locale }: { locale: Locale }) {
  const [selectedGroup, setSelectedGroup] = useState<TeamGroup | 'All'>('All');
  const [spotlightId, setSpotlightId] = useState<string | null>(null);

  const leaderships = useMemo(() => TEAM_MEMBERS.filter((m) => m.isLeadership), []);
  const filteredMembers = useMemo(
    () => (selectedGroup === 'All' ? TEAM_MEMBERS : TEAM_MEMBERS.filter((m) => m.group === selectedGroup)),
    [selectedGroup],
  );

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
              {locale === 'ko' ? '카드를 누르면 각 팀원의 이야기를 볼 수 있어요.' : locale === 'jp' ? 'カードを押すと各メンバーのストーリーが見られます。' : 'Tap any card to read each person’s story.'}
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

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
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
                <div key={i} className="p-8 rounded-2xl border border-gray-200 bg-white hover:shadow-card transition-shadow duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary-lighter flex items-center justify-center mb-5 text-primary">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2.5 break-keep">
                    {locale === 'ko' ? item.titleKo : locale === 'jp' ? item.titleJp : item.titleEn}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-keep">
                    {locale === 'ko' ? item.descKo : locale === 'jp' ? item.descJp : item.descEn}
                  </p>
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

/** PortraitTile — the quiet unit of the wall: pastel tint + illustration + name/role.
 *  All depth (quote, browsing) lives in the spotlight the tile opens. */
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
  const name = locale === 'en' ? m.nameEn : m.nameKo;
  const role = locale === 'ko' ? m.roleKo : locale === 'jp' ? m.roleJp : m.roleEn;
  const quote = locale === 'en' ? m.quoteEn : m.quoteKo;
  const tint = tintFor(m);
  const lg = size === 'lg';

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={locale === 'ko' ? `${name} — ${role}, 자세히 보기` : `${name} — ${role}, view profile`}
      aria-haspopup="dialog"
      className="group w-full text-left rounded-2xl bg-white border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: tint }}>
        <Image
          src={m.avatarUrl}
          alt=""
          fill
          sizes={lg ? '(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw' : '(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw'}
          loading={eager ? 'eager' : 'lazy'}
          unoptimized
          className="object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {m.isLeadership && !lg && (
          <span className="absolute left-3 top-3 px-2 py-0.5 rounded-full bg-white/85 backdrop-blur text-2xs font-bold uppercase tracking-wider text-gray-700">
            Lead
          </span>
        )}
      </div>
      <div className={lg ? 'p-6' : 'p-4'}>
        <h3 className={`font-bold text-gray-900 font-display group-hover:text-primary transition-colors ${lg ? 'text-xl' : 'text-base'}`}>
          {name}
        </h3>
        <p className={`font-semibold text-primary break-keep ${lg ? 'text-sm mt-1' : 'text-xs mt-0.5'}`}>{role}</p>
        {lg && (
          <p className="mt-3 text-sm text-gray-500 leading-relaxed break-keep line-clamp-2">“{quote}”</p>
        )}
      </div>
    </button>
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

  const name = locale === 'en' ? m.nameEn : m.nameKo;
  const role = locale === 'ko' ? m.roleKo : locale === 'jp' ? m.roleJp : m.roleEn;
  const quote = locale === 'en' ? m.quoteEn : m.quoteKo;
  const groupLabel = locale === 'ko' ? GROUP_KO_MAP[m.group] : m.group;
  const tint = tintFor(m);

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
            <span className="inline-flex self-start px-2.5 py-1 rounded-full bg-gray-100 text-2xs font-bold uppercase tracking-wider text-gray-600 mb-4">
              {groupLabel}
            </span>
            <h3 id="team-spotlight-name" className="text-2xl sm:text-3xl font-bold text-gray-900 font-display">
              {name}
            </h3>
            <p className="mt-1 text-sm font-bold text-primary break-keep">{role}</p>
            {locale !== 'en' && <p className="mt-0.5 text-xs font-semibold text-gray-500">{m.nameEn}</p>}

            <blockquote className="mt-6 flex-1">
              <Quote className="w-5 h-5 text-primary/30 mb-2" aria-hidden="true" />
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium break-keep">“{quote}”</p>
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
