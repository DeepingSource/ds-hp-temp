import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import {
  ArrowRight, Newspaper, Mic, Tag, Award, Cpu, FileText, Quote,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';

/**
 * NewsView — shared locale-aware Press & Media composition.
 * Rendered by `/company/news` (en), `/ko/company/news`, `/jp/company/news`.
 */

type Copy = {
  badge: string;
  heroMaster: string;
  heroMasterAccent: string;
  heroSub: string;
  categories: string[];
  filterNote: string;
  coverageEyebrow: string;
  coverageHeading: string;
  coverageNotePre: string;
  coverageNoteIllustrative: string;
  coverageNotePost: string;
  coverage: { date: string; outlet: string; category: string; title: string }[];
  badgesEyebrow: string;
  badgesHeading: string;
  badgesSub: string;
  badges: { label: string; sub: string }[];
  kitHeading: string;
  kitBody: string;
  comingSoon: string;
  pressHeading: string;
  pressBody: string;
  mailSubject: string;
  ctaHeading: string;
  ctaSub: string;
  ctaButton: string;
};

const C: Record<Locale, Copy> = {
  ko: {
    badge: 'Press & Media',
    heroMaster: '모든 매장을 한 매장처럼.',
    heroMasterAccent: '그 여정을 언론이 기록합니다',
    heroSub: '익명화 AI와 오프라인 공간 인텔리전스에 관한 보도자료, 수상·인증, 미디어 언급을 한곳에 모았습니다.',
    categories: ['전체', '보도자료', '수상·인증', '미디어 언급'],
    filterNote: '카테고리 — 보도자료 · 수상·인증 · 미디어 언급 (필터 기능은 추후 제공 예정)',
    coverageEyebrow: 'Coverage',
    coverageHeading: '대표 미디어 커버리지',
    coverageNotePre: `※ 아래는 회사 사실(NVIDIA Inception 합류, 특허 ${COMPANY.patents}건, ${COMPANY.partnerBrands}개 파트너 등)에 기반한 구성`,
    coverageNoteIllustrative: ' 예시 항목',
    coverageNotePost: '입니다. 실제 보도 링크는 추후 연동 예정입니다.',
    coverage: [
      { date: '2025', outlet: '예시 매체', category: '미디어 언급', title: 'SAAI, 오프라인 공간 Agentic AI 플랫폼으로 리테일 운영 자동화 주목 (예시 항목)' },
      { date: '2024', outlet: '예시 매체', category: '보도자료', title: `딥핑소스, 누적 특허 ${COMPANY.patents}건 돌파 — 익명화 AI 기술 포트폴리오 고도화 (예시 항목)` },
      { date: '2024', outlet: '예시 매체', category: '미디어 언급', title: `${COMPANY.partnerBrands}개 파트너 브랜드와 매장 데이터 협력 확대, ${COMPANY.industries}개 업종 적용 (예시 항목)` },
      { date: '2023', outlet: '예시 매체', category: '수상·인증', title: '개인정보를 건드리지 않는 익명화 처리 기술, 프라이버시 보호 솔루션으로 조명 (예시 항목)' },
      { date: '2020', outlet: '예시 매체', category: '수상·인증', title: `${COMPANY.nvidiaPartner} 합류 — 글로벌 AI 생태계 파트너십 확보 (예시 항목)` },
    ],
    badgesEyebrow: 'Awards & Credentials',
    badgesHeading: '증명된 기술, 검증된 신뢰',
    badgesSub: '수상과 인증, 그리고 누적된 특허가 딥핑소스의 기술력을 뒷받침합니다.',
    badges: [
      { label: COMPANY.nvidiaPartner, sub: '글로벌 AI 스타트업 프로그램' },
      { label: `특허 ${COMPANY.patents}건`, sub: COMPANY.patentsLabel },
      { label: `${COMPANY.industries}개 업종`, sub: '검증된 적용 레퍼런스' },
      { label: `${COMPANY.partnerBrands}개 파트너`, sub: '브랜드 협력' },
    ],
    kitHeading: '미디어 키트',
    kitBody: `회사 소개, 로고, 핵심 팩트시트(설립 ${COMPANY.foundingYear}년 · 특허 ${COMPANY.patents}건 · ${COMPANY.nvidiaPartner})를 담은 미디어 키트를 준비 중입니다. 공개 시 본 페이지에서 다운로드할 수 있습니다.`,
    comingSoon: '준비 중',
    pressHeading: '보도 · 인터뷰 문의',
    pressBody: '보도자료 요청, 자료 확인, 인터뷰 제안은 아래 메일로 연락 주세요. 신속히 회신드립니다.',
    mailSubject: '보도 문의',
    ctaHeading: '취재 · 인터뷰 문의',
    ctaSub: '보도자료 요청이나 인터뷰 제안은 언제든 연락 주세요',
    ctaButton: '미디어 문의',
  },
  en: {
    badge: 'Press & Media',
    heroMaster: 'Every store, like one.',
    heroMasterAccent: 'The press records the journey',
    heroSub: 'Press releases, awards and credentials, and media mentions about anonymization AI and offline spatial intelligence — gathered in one place.',
    categories: ['All', 'Press releases', 'Awards & credentials', 'Media mentions'],
    filterNote: 'Categories — Press releases · Awards & credentials · Media mentions (filtering coming soon)',
    coverageEyebrow: 'Coverage',
    coverageHeading: 'Selected media coverage',
    coverageNotePre: `※ The items below are an illustrative selection based on company facts (NVIDIA Inception membership, ${COMPANY.patents} patents, ${COMPANY.partnerBrands} partners, etc.) —`,
    coverageNoteIllustrative: ' Illustrative',
    coverageNotePost: '. Actual press links will be connected later.',
    coverage: [
      { date: '2025', outlet: 'Illustrative outlet', category: 'Media mentions', title: 'SAAI spotlighted as an offline-space Agentic AI platform automating retail operations (Illustrative)' },
      { date: '2024', outlet: 'Illustrative outlet', category: 'Press releases', title: `DeepingSource surpasses ${COMPANY.patents} cumulative patents — advancing its anonymization AI portfolio (Illustrative)` },
      { date: '2024', outlet: 'Illustrative outlet', category: 'Media mentions', title: `Store-data collaboration expands with ${COMPANY.partnerBrands} partner brands across ${COMPANY.industries} industries (Illustrative)` },
      { date: '2023', outlet: 'Illustrative outlet', category: 'Awards & credentials', title: 'Anonymization technology that never touches personal data, highlighted as a privacy-protecting solution (Illustrative)' },
      { date: '2020', outlet: 'Illustrative outlet', category: 'Awards & credentials', title: `Joined ${COMPANY.nvidiaPartner} — securing a global AI ecosystem partnership (Illustrative)` },
    ],
    badgesEyebrow: 'Awards & Credentials',
    badgesHeading: 'Proven technology, verified trust',
    badgesSub: 'Awards, credentials, and a growing patent portfolio back DeepingSource’s technical strength.',
    badges: [
      { label: COMPANY.nvidiaPartner, sub: 'Global AI startup program' },
      { label: `${COMPANY.patents} patents`, sub: 'Registered 66 · Pending 37' },
      { label: `${COMPANY.industries} industries`, sub: 'Verified deployment references' },
      { label: `${COMPANY.partnerBrands} partners`, sub: 'Brand collaborations' },
    ],
    kitHeading: 'Media kit',
    kitBody: `A media kit with our company overview, logos, and core fact sheet (founded ${COMPANY.foundingYear} · ${COMPANY.patents} patents · ${COMPANY.nvidiaPartner}) is in preparation. It will be downloadable here once published.`,
    comingSoon: 'Coming soon',
    pressHeading: 'Press & interview inquiries',
    pressBody: 'For press requests, fact-checking, or interview proposals, reach us at the email below. We respond promptly.',
    mailSubject: 'Press inquiry',
    ctaHeading: 'Press & interview inquiries',
    ctaSub: 'Reach out anytime for press requests or interview proposals.',
    ctaButton: 'Media inquiry',
  },
  jp: {
    badge: 'Press & Media',
    heroMaster: 'すべての店舗を、ひとつの店舗のように。',
    heroMasterAccent: 'その歩みをメディアが記録します',
    heroSub: '匿名化AIとオフライン空間インテリジェンスに関するプレスリリース、受賞・認証、メディア掲載を一か所にまとめました。',
    categories: ['すべて', 'プレスリリース', '受賞・認証', 'メディア掲載'],
    filterNote: 'カテゴリー — プレスリリース · 受賞・認証 · メディア掲載 (フィルター機能は今後提供予定)',
    coverageEyebrow: 'Coverage',
    coverageHeading: '主なメディア掲載',
    coverageNotePre: `※ 以下は会社の事実(NVIDIA Inception参加、特許${COMPANY.patents}件、${COMPANY.partnerBrands}社のパートナーなど)に基づく構成`,
    coverageNoteIllustrative: ' 例',
    coverageNotePost: 'です。実際の報道リンクは今後連携予定です。',
    coverage: [
      { date: '2025', outlet: '例 メディア', category: 'メディア掲載', title: 'SAAI、オフライン空間Agentic AIプラットフォームとしてリテール運営の自動化で注目 (例)' },
      { date: '2024', outlet: '例 メディア', category: 'プレスリリース', title: `ディーピングソース、累計特許${COMPANY.patents}件を突破 — 匿名化AI技術ポートフォリオを高度化 (例)` },
      { date: '2024', outlet: '例 メディア', category: 'メディア掲載', title: `${COMPANY.partnerBrands}社のパートナーブランドと店舗データ連携を拡大、${COMPANY.industries}業種に適用 (例)` },
      { date: '2023', outlet: '例 メディア', category: '受賞・認証', title: '個人情報に触れない匿名化処理技術が、プライバシー保護ソリューションとして注目 (例)' },
      { date: '2020', outlet: '例 メディア', category: '受賞・認証', title: `${COMPANY.nvidiaPartner}に参加 — グローバルAIエコシステムのパートナーシップを獲得 (例)` },
    ],
    badgesEyebrow: 'Awards & Credentials',
    badgesHeading: '証明された技術、検証された信頼',
    badgesSub: '受賞と認証、そして積み重ねた特許が、ディーピングソースの技術力を支えます。',
    badges: [
      { label: COMPANY.nvidiaPartner, sub: 'グローバルAIスタートアッププログラム' },
      { label: `特許${COMPANY.patents}件`, sub: '登録66件 · 出願37件' },
      { label: `${COMPANY.industries}業種`, sub: '検証された適用リファレンス' },
      { label: `${COMPANY.partnerBrands}社のパートナー`, sub: 'ブランド協力' },
    ],
    kitHeading: 'メディアキット',
    kitBody: `会社紹介、ロゴ、主要ファクトシート(設立${COMPANY.foundingYear}年 · 特許${COMPANY.patents}件 · ${COMPANY.nvidiaPartner})を収めたメディアキットを準備中です。公開時には本ページからダウンロードいただけます。`,
    comingSoon: '準備中',
    pressHeading: '取材 · インタビューのお問い合わせ',
    pressBody: 'プレスリリースのご請求、資料確認、インタビューのご提案は下記メールまでご連絡ください。迅速にご返信いたします。',
    mailSubject: '取材のお問い合わせ',
    ctaHeading: '取材 · インタビューのお問い合わせ',
    ctaSub: 'プレスリリースのご請求やインタビューのご提案はいつでもご連絡ください。',
    ctaButton: 'メディアお問い合わせ',
  },
};

const badgeIcons = [Cpu, Award, Newspaper, Tag];

export default function NewsView({ locale }: { locale: Locale }) {
  const t = C[locale];
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(55,106,226,0.18),transparent)]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('news', locale), path: '/company/news' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <Newspaper className="w-3.5 h-3.5" />
            {t.badge}
          </HeroBadge>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6 break-keep">
            {t.heroMaster}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-primary-light">
              {t.heroMasterAccent}
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* ── 카테고리 필터 안내 ── */}
      <AnimatedSection className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
            <Tag className="w-4 h-4" />
            <span>{t.filterNote}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {t.categories.map((c, i) => (
              <span
                key={c}
                className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                  i === 0
                    ? 'bg-primary/5 border-primary/20 text-primary'
                    : 'bg-slate-50 border-gray-100 text-gray-500'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── 대표 미디어 커버리지 리스트 ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.coverageEyebrow}</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 break-keep">{t.coverageHeading}</h2>
            <p className="text-sm text-gray-500 break-keep">
              {t.coverageNotePre}
              <strong className="text-gray-500">{t.coverageNoteIllustrative}</strong>{t.coverageNotePost}
            </p>
          </div>
          <StaggerContainer className="space-y-4">
            {t.coverage.map((item, i) => (
              <StaggerItem key={i}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-2xl border border-gray-100 bg-slate-50 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-[background-color,box-shadow] duration-300">
                  <div className="flex items-center gap-3 sm:w-44 shrink-0">
                    <span className="text-sm font-black text-gray-900">{item.date}</span>
                    <span className="text-xs font-semibold text-primary px-2.5 py-1 rounded-full bg-primary/5">{item.category}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-gray-900 break-keep mb-1">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.outlet}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 수상·인증 배지 그리드 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.badgesEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.badgesHeading}</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto break-keep">
              {t.badgesSub}
            </p>
          </div>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {t.badges.map((b, i) => {
              const Icon = badgeIcons[i];
              return (
                <StaggerItem key={b.label}>
                  <div className="p-7 bg-white rounded-3xl border border-gray-100 h-full text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-base font-black text-gray-900 mb-1.5 break-keep">{b.label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed break-keep">{b.sub}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 미디어 키트 / 보도 문의 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 lg:p-10 rounded-3xl border border-gray-100 bg-slate-50 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 break-keep">{t.kitHeading}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 break-keep">
                {t.kitBody}
              </p>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="mt-auto self-start inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-gray-500 text-sm font-semibold cursor-not-allowed"
              >
                <FileText className="w-4 h-4" /> {t.comingSoon}
              </button>
            </div>
            <div className="p-8 lg:p-10 rounded-3xl border border-primary/15 bg-primary/[0.03] flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Quote className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 break-keep">{t.pressHeading}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 break-keep">
                {t.pressBody}
              </p>
              <a
                href={`mailto:${COMPANY.contactEmail}?subject=${encodeURIComponent(t.mailSubject)}`}
                className="mt-auto self-start btn-primary gap-2 rounded-xl"
              >
                {COMPANY.contactEmail} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Mic className="w-12 h-12 text-primary mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep">
            {t.ctaHeading}
          </h2>
          <p className="text-slate-300 text-lg mb-10 break-keep">
            {t.ctaSub}
          </p>
          <Link href={localeHref(locale, '/contact')} className="btn-primary-dark btn-lg gap-2 rounded-xl">
            {t.ctaButton} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
