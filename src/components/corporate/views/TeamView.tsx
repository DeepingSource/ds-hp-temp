'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, ShieldCheck, HeartHandshake, Zap, Quote } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import { TEAM_MEMBERS, type TeamGroup, type TeamMember } from '@/data/teamMembers';
import { localeHref, type Locale } from '@/lib/i18n';
import { crumb } from '@/lib/breadcrumb-labels';

const GROUPS: { key: TeamGroup | 'All'; labelKo: string; labelEn: string; labelJp: string }[] = [
  { key: 'All', labelKo: '전체 보기', labelEn: 'All People', labelJp: 'すべて' },
  { key: 'Leadership', labelKo: '리더십', labelEn: 'Leadership', labelJp: 'リーダーシップ' },
  { key: 'Research & AI', labelKo: 'AI & 연구', labelEn: 'Research & AI', labelJp: 'AI & 研究' },
  { key: 'Engineering', labelKo: '엔지니어링', labelEn: 'Engineering', labelJp: 'エンジニアリング' },
  { key: 'Product & Design', labelKo: '제품 & 디자인', labelEn: 'Product & Design', labelJp: 'プロダクト & デザイン' },
  { key: 'Business & Operations', labelKo: '비즈니스 & 운영', labelEn: 'Business & Operations', labelJp: 'ビジネス & オペレーション' },
];

const CULTURE_ITEMS = [
  {
    icon: ShieldCheck,
    titleKo: '프라이버시 First',
    titleEn: 'Privacy First',
    titleJp: 'プライバシーファースト',
    descKo: '단 한 사람의 개인정보도 남기지 않으면서 오프라인 공간을 완벽하게 이해하는 기술적 자부심을 공유합니다.',
    descEn: 'We hold pride in perfectly understanding physical spaces while leaving zero personal identity.',
    descJp: '個人情報を残さずにオフライン空間を完璧に理解する technical pride を共有します。',
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
    descJp: '高い自律と深いオーナーシップを持ち、フラットで honest なコミュニケーションで製品を作ります。',
  },
];

export default function TeamView({ locale }: { locale: Locale }) {
  const [selectedGroup, setSelectedGroup] = useState<TeamGroup | 'All'>('All');

  const leaderships = TEAM_MEMBERS.filter((m) => m.isLeadership);
  const filteredMembers = selectedGroup === 'All'
    ? TEAM_MEMBERS
    : TEAM_MEMBERS.filter((m) => m.group === selectedGroup);

  return (
    <div className="bg-white min-h-screen">
      {/* ── Beat 1 — Hero ── */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 bg-slate-900 text-white noise-overlay overflow-hidden">
        <Container className="relative z-10">
          <Breadcrumb items={[{ name: crumb('team', locale), path: '/company/team' }]} locale={locale} tone="dark" className="mb-6" />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-light mb-4">
              <SaaiSymbol className="w-3.5 h-3.5 text-primary-light" />
              {locale === 'ko' ? '딥핑소스 사람들 · People' : locale === 'jp' ? 'DEEPINGSOURCE の人々 · People' : 'DeepingSource People'}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight font-display break-keep mb-6">
              <WordRise text={locale === 'ko' ? '물리적 공간을 다시 만드는 사람들.' : locale === 'jp' ? '物理的空間を再構築する人々。' : 'Reinventing physical space.'} />
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed break-keep max-w-2xl">
              {locale === 'ko'
                ? 'AI 연구자, 소프트웨어 엔지니어, 리테일 전문가, 데이터 분석가가 모여 오프라인 공간의 무한한 가능성을 현실로 바꿉니다.'
                : locale === 'jp'
                ? 'AI研究者、ソフトウェアエンジニア、リテール専門家、データアナリストが集まり、空間の無限の可能性を現実へと変えます。'
                : 'AI researchers, software engineers, retail experts, and data analysts coming together to transform physical spaces.'}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Beat 2 — Leadership ── */}
      <Section variant="default" pad="default">
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-2">LEADERSHIP</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep">
              {locale === 'ko' ? '비전과 이노베이션을 이끄는 리더십' : locale === 'jp' ? 'ビジョンとイノベーションを導くリーダーシップ' : 'Leadership driving vision & innovation'}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaderships.map((m) => (
              <MemberCard key={m.id} member={m} locale={locale} isHeroCard={true} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Beat 3 — People Gallery (Interactive Filter) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-y border-gray-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Eyebrow className="mb-2 justify-center">THE PEOPLE</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep mb-3">
              {locale === 'ko' ? '딥핑소스의 멋진 팀원들을 만나보세요' : locale === 'jp' ? 'DEEPINGSOURCE の素晴らしいチームメンバー' : 'Meet the team behind SAAI'}
            </h2>
            <p className="text-base text-gray-600 break-keep">
              {locale === 'ko' ? '각자의 영역에서 최고 수준의 몰입으로 오프라인 공간의 가치를 혁신합니다.' : locale === 'jp' ? 'それぞれの領域で最高レベルの熱量を持って空間の価値を革新します。' : 'Innovating physical space with deep expertise across engineering, research, and product.'}
            </p>
          </div>

          {/* Abstract Group Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {GROUPS.map((g) => {
              const active = selectedGroup === g.key;
              const count = g.key === 'All' ? TEAM_MEMBERS.length : TEAM_MEMBERS.filter((m) => m.group === g.key).length;
              return (
                <button
                  key={g.key}
                  onClick={() => setSelectedGroup(g.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span>{locale === 'ko' ? g.labelKo : locale === 'jp' ? g.labelJp : g.labelEn}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-2xs ${active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid of Team Members with Quotes */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMembers.map((m) => (
              <MemberCard key={m.id} member={m} locale={locale} />
            ))}
          </div>
        </Container>
      </AnimatedSection>

      {/* ── Beat 4 — Culture & Principles ── */}
      <Section variant="default">
        <Container>
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <Eyebrow className="mb-2 justify-center">OUR CULTURE</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep">
              {locale === 'ko' ? '딥핑소스가 일하는 문화' : locale === 'jp' ? 'DEEPINGSOURCE の働く文化' : 'How we work together'}
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {CULTURE_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-8 rounded-3xl border border-gray-200 bg-white">
                  <div className="w-12 h-12 rounded-2xl bg-primary-lighter flex items-center justify-center mb-6 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 break-keep">
                    {locale === 'ko' ? item.titleKo : locale === 'jp' ? item.titleJp : item.titleEn}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep">
                    {locale === 'ko' ? item.descKo : locale === 'jp' ? item.descJp : item.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── Beat 5 — Join Us / Career CTA ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-900 text-white noise-overlay">
        <Container className="text-center max-w-3xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-light mb-4">
            <Users className="w-3.5 h-3.5" />
            CAREERS & OPPORTUNITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-display break-keep">
            {locale === 'ko' ? '물리적 공간의 다음 혁신을 함께 만듭니다' : locale === 'jp' ? '次の空間イノベーションを共に創りましょう' : 'Shape the future of physical space'}
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl mx-auto break-keep">
            {locale === 'ko'
              ? '프라이버시와 인공지능이 만나는 지점에서 전 세계 오프라인을 바꿀 훌륭한 동료를 찾고 있습니다.'
              : locale === 'jp'
              ? 'プライバシーとAIが出会う場所で、世界中のオフラインを変える素晴らしい仲間を探しています。'
              : 'Join our team to solve meaningful challenges at the intersection of AI, privacy, and physical space.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={localeHref(locale, '/company/career')} className="btn-primary btn-lg inline-flex items-center gap-2">
              <span>{locale === 'ko' ? '채용 포지션 및 문화 보기' : locale === 'jp' ? '採用ポジションを見る' : 'View open careers'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={localeHref(locale, '/company/about')} className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl transition-colors">
              <span>{locale === 'ko' ? '회사 소개' : locale === 'jp' ? '会社紹介' : 'About DeepingSource'}</span>
            </Link>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}

/** Individual Team Member Card with Avatar Placeholder & Quote */
function MemberCard({ member: m, locale, isHeroCard }: { member: TeamMember; locale: Locale; isHeroCard?: boolean }) {
  const name = locale === 'en' ? m.nameEn : m.nameKo;
  const quote = locale === 'en' ? m.quoteEn : m.quoteKo;

  return (
    <div
      className={`p-6 rounded-3xl border bg-white flex flex-col justify-between transition-all duration-300 hover:shadow-card hover:border-primary-light/50 ${
        isHeroCard ? 'border-primary/20 bg-gradient-to-b from-white to-primary/5' : 'border-gray-200'
      }`}
    >
      <div>
        {/* Avatar & Header Info */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="relative shrink-0">
            {m.avatarUrl ? (
              <div className="w-13 h-13 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative">
                <Image src={m.avatarUrl} alt={name} fill className="object-cover" />
              </div>
            ) : (
              <div
                className={`w-13 h-13 rounded-2xl ${
                  m.avatarColor ?? 'bg-gradient-to-br from-slate-800 to-gray-900 text-white'
                } flex items-center justify-center font-bold text-base shadow-sm border border-white/20`}
              >
                {m.nameKo.slice(0, 1)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 truncate">
              <span>{name}</span>
              {m.isLeadership && (
                <span className="px-2 py-0.5 rounded text-2xs font-bold uppercase bg-primary/10 text-primary shrink-0">
                  Lead
                </span>
              )}
            </h3>
            <p className="text-2xs font-semibold text-gray-500 uppercase tracking-wide truncate">{m.role}</p>
          </div>
        </div>

        {/* Member Quote */}
        <div className="relative p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-700 leading-relaxed break-keep mb-3">
          <Quote className="w-3.5 h-3.5 text-primary/30 absolute top-3 right-3" />
          <p className="pr-3 font-medium text-slate-700">"{quote}"</p>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-2xs text-gray-400 font-semibold">
        <span>{m.group}</span>
        <span>{m.nameEn}</span>
      </div>
    </div>
  );
}
