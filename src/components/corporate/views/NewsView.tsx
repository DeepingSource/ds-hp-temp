import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import {
  ArrowRight, Newspaper, Mic, Tag, Award, Cpu, FileText, Quote, ShieldCheck,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import WordRise from '@/components/ui/WordRise';
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
  coverageEyebrow: string;
  coverageHeading: string;
  coverageNote: string;
  coverage: { date: string; outlet: string; category: string; title: string; url: string }[];
  badgesEyebrow: string;
  badgesHeading: string;
  badgesSub: string;
  badges: { label: string; sub: string }[];
  kitHeading: string;
  kitBody: string;
  kitCta: string;
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
    heroMaster: '모든 공간을, 완벽하게.',
    heroMasterAccent: '그 여정을 언론이 기록합니다',
    heroSub: '익명화 AI와 오프라인 공간 인텔리전스에 관한 보도자료, 수상·인증, 미디어 언급을 한곳에 모았습니다.',
    coverageEyebrow: 'Coverage',
    coverageHeading: '대표 미디어 커버리지',
    coverageNote: '외부 매체 보도로 연결됩니다 (새 창에서 열림).',
    coverage: [
      { date: '2025.06', outlet: 'ZDNet Korea', category: '보도자료', title: '딥핑소스, KDDI 오픈 이노베이션 펀드 3호서 전략투자 유치', url: 'https://zdnet.co.kr/view/?no=20250610175314' },
      { date: '2025.03', outlet: '벤처스퀘어', category: '보도자료', title: '딥핑소스, 금상호 신임 CBO 영입 — 글로벌 사업 가속', url: 'https://www.venturesquare.net/1067079' },
      { date: '2023.05', outlet: '아시아경제', category: '미디어 언급', title: '[AI혁명] 딥핑소스 “세상 모든 데이터 안전하게 쓰도록 만든다”', url: 'https://www.asiae.co.kr/article/2023051209490460590' },
      { date: '2020.08', outlet: '전자신문', category: '미디어 언급', title: '[오늘의 CEO] 김태훈 딥핑소스 대표 “데이터 익명화로 AI 고도화 난제 해결”', url: 'https://www.etnews.com/20200817000108' },
      { date: '2020.01', outlet: '플래텀', category: '보도자료', title: '딥핑소스, 55억 규모 시리즈A 투자 유치', url: 'https://platum.kr/archives/134568' },
    ],
    badgesEyebrow: 'Awards & Credentials',
    badgesHeading: '증명된 기술, 검증된 신뢰',
    badgesSub: '수상과 인증, 그리고 누적된 특허가 딥핑소스의 기술력을 뒷받침합니다.',
    badges: [
      { label: 'SOC 2', sub: '정보보안 통제 인증 (2024)' },
      { label: 'NextRise 2024', sub: '‘Top Innovator’ 수상' },
      { label: COMPANY.nvidiaPartner, sub: '글로벌 AI 스타트업 프로그램' },
      { label: `특허 ${COMPANY.patents}건`, sub: COMPANY.patentsLabel },
    ],
    kitHeading: '미디어 키트',
    kitBody: `회사 소개, 로고, 핵심 팩트시트(설립 ${COMPANY.foundingYear}년 · 특허 ${COMPANY.patents}건 · ${COMPANY.nvidiaPartner})가 필요하시면 요청해 주세요. 메일로 보내드립니다.`,
    kitCta: '미디어 키트 요청',
    pressHeading: '보도 · 인터뷰 문의',
    pressBody: '보도자료 요청, 자료 확인, 인터뷰 제안은 아래 메일로 연락 주세요. 신속히 회신드립니다.',
    mailSubject: '보도 문의',
    ctaHeading: '취재 · 인터뷰 문의',
    ctaSub: '보도자료 요청이나 인터뷰 제안은 언제든 연락 주세요',
    ctaButton: '미디어 문의',
  },
  en: {
    badge: 'Press & Media',
    heroMaster: 'Perfect every space.',
    heroMasterAccent: 'The press records the journey',
    heroSub: 'Press releases, awards and credentials, and media mentions about anonymization AI and offline spatial intelligence — gathered in one place.',
    coverageEyebrow: 'Coverage',
    coverageHeading: 'Selected media coverage',
    coverageNote: 'Links open external coverage in a new tab.',
    coverage: [
      { date: '2025.06', outlet: 'ZDNet Korea', category: 'Press releases', title: 'DeepingSource raises strategic investment from KDDI Open Innovation Fund III', url: 'https://zdnet.co.kr/view/?no=20250610175314' },
      { date: '2025.03', outlet: 'VentureSquare', category: 'Press releases', title: 'DeepingSource appoints Sang-ho Geum as new CBO to accelerate global business', url: 'https://www.venturesquare.net/1067079' },
      { date: '2023.05', outlet: 'Asia Economy', category: 'Media mentions', title: '[AI Revolution] DeepingSource: “making all the world’s data safe to use”', url: 'https://www.asiae.co.kr/article/2023051209490460590' },
      { date: '2020.08', outlet: 'etnews', category: 'Media mentions', title: '[CEO Today] Tae-Hoon Kim of DeepingSource: solving AI’s hard problems with data anonymization', url: 'https://www.etnews.com/20200817000108' },
      { date: '2020.01', outlet: 'Platum', category: 'Press releases', title: 'DeepingSource raises a ~₩5.5B Series A', url: 'https://platum.kr/archives/134568' },
    ],
    badgesEyebrow: 'Awards & Credentials',
    badgesHeading: 'Proven technology, verified trust',
    badgesSub: 'Awards, credentials, and a growing patent portfolio back DeepingSource’s technical strength.',
    badges: [
      { label: 'SOC 2', sub: 'Security controls certification (2024)' },
      { label: 'NextRise 2024', sub: '‘Top Innovator’ award' },
      { label: COMPANY.nvidiaPartner, sub: 'Global AI startup program' },
      { label: `${COMPANY.patents} patents`, sub: 'Registered 66 · Pending 37' },
    ],
    kitHeading: 'Media kit',
    kitBody: `Need our company overview, logos, or core fact sheet (founded ${COMPANY.foundingYear} · ${COMPANY.patents} patents · ${COMPANY.nvidiaPartner})? Request it and we’ll send it over by email.`,
    kitCta: 'Request media kit',
    pressHeading: 'Press & interview inquiries',
    pressBody: 'For press requests, fact-checking, or interview proposals, reach us at the email below. We respond promptly.',
    mailSubject: 'Press inquiry',
    ctaHeading: 'Press & interview inquiries',
    ctaSub: 'Reach out anytime for press requests or interview proposals.',
    ctaButton: 'Media inquiry',
  },
  jp: {
    badge: 'Press & Media',
    heroMaster: 'すべての空間を、完璧に。',
    heroMasterAccent: 'その歩みをメディアが記録します',
    heroSub: '匿名化AIとオフライン空間インテリジェンスに関するプレスリリース、受賞・認証、メディア掲載を一か所にまとめました。',
    coverageEyebrow: 'Coverage',
    coverageHeading: '主なメディア掲載',
    coverageNote: '外部メディアの記事を新しいタブで開きます。',
    coverage: [
      { date: '2025.06', outlet: 'ZDNet Korea', category: 'プレスリリース', title: 'ディーピングソース、KDDIオープンイノベーションファンド3号から戦略投資を調達', url: 'https://zdnet.co.kr/view/?no=20250610175314' },
      { date: '2025.03', outlet: 'VentureSquare', category: 'プレスリリース', title: 'ディーピングソース、新CBOにクム・サンホ氏を迎えグローバル事業を加速', url: 'https://www.venturesquare.net/1067079' },
      { date: '2023.05', outlet: 'アジア経済', category: 'メディア掲載', title: '[AI革命] ディーピングソース「世界中のデータを安全に使えるようにする」', url: 'https://www.asiae.co.kr/article/2023051209490460590' },
      { date: '2020.08', outlet: 'etnews', category: 'メディア掲載', title: '[本日のCEO] キム・テフン代表「データ匿名化でAI高度化の難題を解決」', url: 'https://www.etnews.com/20200817000108' },
      { date: '2020.01', outlet: 'Platum', category: 'プレスリリース', title: 'ディーピングソース、55億ウォン規模のシリーズAを調達', url: 'https://platum.kr/archives/134568' },
    ],
    badgesEyebrow: 'Awards & Credentials',
    badgesHeading: '証明された技術、検証された信頼',
    badgesSub: '受賞と認証、そして積み重ねた特許が、ディーピングソースの技術力を支えます。',
    badges: [
      { label: 'SOC 2', sub: '情報セキュリティ統制認証 (2024)' },
      { label: 'NextRise 2024', sub: '「Top Innovator」受賞' },
      { label: COMPANY.nvidiaPartner, sub: 'グローバルAIスタートアッププログラム' },
      { label: `特許${COMPANY.patents}件`, sub: '登録66件 · 出願37件' },
    ],
    kitHeading: 'メディアキット',
    kitBody: `会社紹介、ロゴ、主要ファクトシート(設立${COMPANY.foundingYear}年 · 特許${COMPANY.patents}件 · ${COMPANY.nvidiaPartner})が必要な場合はご請求ください。メールでお送りします。`,
    kitCta: 'メディアキットを請求',
    pressHeading: '取材 · インタビューのお問い合わせ',
    pressBody: 'プレスリリースのご請求、資料確認、インタビューのご提案は下記メールまでご連絡ください。迅速にご返信いたします。',
    mailSubject: '取材のお問い合わせ',
    ctaHeading: '取材 · インタビューのお問い合わせ',
    ctaSub: 'プレスリリースのご請求やインタビューのご提案はいつでもご連絡ください。',
    ctaButton: 'メディアお問い合わせ',
  },
};

const badgeIcons = [ShieldCheck, Award, Cpu, Tag];

export default function NewsView({ locale }: { locale: Locale }) {
  const t = C[locale];
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-surface-dark" aria-hidden="true" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('news', locale), path: '/company/news' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <Newspaper className="w-3.5 h-3.5" />
            {t.badge}
          </HeroBadge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            <WordRise text={t.heroMaster} /><br />
            <WordRise text={t.heroMasterAccent} className="text-primary-light" />
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* ── 대표 미디어 커버리지 리스트 (실제 보도) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.coverageEyebrow}</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 break-keep">{t.coverageHeading}</h2>
            <p className="text-sm text-gray-500 break-keep">{t.coverageNote}</p>
          </div>
          <StaggerContainer className="space-y-4">
            {t.coverage.map((item) => (
              <StaggerItem key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-2xl border border-gray-100 bg-slate-50 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-[background-color,box-shadow] duration-300"
                >
                  <div className="flex items-center gap-3 sm:w-32 shrink-0">
                    <span className="text-sm font-bold text-gray-900 tabular-nums">{item.date}</span>
                    <span className="text-xs font-medium text-primary px-2.5 py-1 rounded-full bg-primary/5 break-keep">{item.category}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-gray-900 break-keep mb-1 group-hover:text-primary transition-colors">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.outlet}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary shrink-0 hidden sm:block" />
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 수상·인증 배지 그리드 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.badgesEyebrow}</p>
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
                    <p className="text-base font-bold text-gray-900 mb-1.5 break-keep">{b.label}</p>
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
              <a
                href={`mailto:${COMPANY.contactEmail}?subject=${encodeURIComponent(t.kitCta)}`}
                className="mt-auto self-start btn-ghost gap-2 rounded-xl"
              >
                <FileText className="w-4 h-4" /> {t.kitCta}
              </a>
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
