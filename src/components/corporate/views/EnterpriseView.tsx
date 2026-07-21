import Link from 'next/link';
import { ArrowRight, Building2, BarChart3, Shield, Eye, LayoutGrid, Zap, Users, CheckCircle2, Search, SearchCheck, Languages, Share2, RefreshCw } from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import AnimatedSection from '@/components/ui/AnimatedSection';
import MasterPair from '@/components/corporate/MasterPair';
import MultiStoreDashboardMockup from '@/components/mockups/MultiStoreDashboardMockup';
import { HqMapDashboardMockup } from '@/components/mockups';

type Copy = {
  badge: string;
  heroTitleA: string;
  heroTitleB: string;
  heroSub1: string;
  heroSub2: string;
  heroCta: string;
  challengesTitle: string;
  challengesSub: string;
  challenges: { title: string; desc: string }[];
  benefitsTitle: string;
  benefits: { title: string; description: string }[];
  dashboardEyebrow: string;
  dashboardTitle: string;
  dashboardSub1: string;
  dashboardSub2: string;
  goldenEyebrow: string;
  goldenTitle: string;
  goldenSub: string;
  golden: { en: string; title: string; desc: string }[];
  goldenLink: string;
  processTitle: string;
  processSub: string;
  process: { title: string; desc: string }[];
  processNoteStrong: string;
  processNoteRest: string;
  ctaTitleA: string;
  ctaTitleB: string;
  ctaSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const ko: Copy = {
  badge: 'Enterprise',
  heroTitleA: '다점포 운영,',
  heroTitleB: '데이터로 표준화하세요',
  heroSub1: '프랜차이즈 본사, 슈퍼바이저, 운영 담당자를 위한 딥핑소스.',
  heroSub2: '매장 간 편차를 줄이고, 전체 운영 수준을 높입니다.',
  heroCta: '도입 상담 신청',
  challengesTitle: '본사가 겪는 핵심 과제',
  challengesSub: '매장이 늘수록 관리는 복잡해지고, 편차는 커집니다.',
  challenges: [
    { title: '운영 편차', desc: '같은 매뉴얼을 줘도 매장마다 결과가 다릅니다. 원인을 파악하기 어렵습니다.' },
    { title: '현장 파악 지연', desc: 'SV가 직접 방문하지 않으면 매장 상태를 알 수 없습니다.' },
    { title: '감에 의존하는 의사결정', desc: '데이터 없이 경험에 의존하는 의사결정이 반복됩니다.' },
  ],
  benefitsTitle: '딥핑소스가 해결합니다',
  benefits: [
    { title: '전 매장 실시간 AI 상황 감지', description: '전 매장 설비·위생·진열을 실시간 파악하고 이상 시 알림을 받습니다.' },
    { title: '성공 매장의 패턴을 전 매장에', description: '매장별 동선·매출 패턴을 비교 분석하고, 잘되는 매장의 방식을 모든 매장에 적용합니다.' },
    { title: '운영 표준화 자동화', description: 'AI가 검증된 운영 패턴을 매장별로 맞춤 제안합니다.' },
    { title: '프라이버시 철저 보호', description: `${COMPANY.patents}개 특허 기반 익명화 기술로 개인정보를 입력 단계에서 보호합니다.` },
  ],
  dashboardEyebrow: 'Live Dashboard',
  dashboardTitle: '전 매장을, 한눈에',
  dashboardSub1: '본사 슈퍼바이저는 전체 매장의 매출·방문자·알림을 실시간으로 파악하고,',
  dashboardSub2: '문제 매장을 바로 식별할 수 있습니다.',
  goldenEyebrow: 'Golden Case',
  goldenTitle: '한 매장의 성공을, 전국으로',
  goldenSub: '잘 되는 매장 하나를 찾아 전 매장으로 옮기는 본사 운영 사이클 — 발견에서 재측정까지 다섯 단계로 돕습니다.',
  golden: [
    { en: 'Discover', title: '발견', desc: '한 매장의 성공·문제를 store insight가 Golden Case 후보로 자동 표시합니다.' },
    { en: 'Verify', title: '검증', desc: "본사가 '왜 그런가'를 가설과 Case 기반 비교로 확인합니다." },
    { en: 'Translate', title: '번역', desc: "본사의 한 줄을 점주 언어로 옮깁니다 — '진열을 옮기면 객단가 +8%'." },
    { en: 'Sync', title: '전파', desc: '검증된 운영 패턴을 전 매장에 동시 적용·동기화합니다.' },
    { en: 'Re-measure', title: '재측정', desc: '성과를 다시 측정해 다음 Golden Case로 순환합니다.' },
  ],
  goldenLink: '5단계를 대표하는 도입 사례 5건 보기',
  processTitle: '도입 프로세스',
  processSub: '파일럿부터 시작해 검증된 모델만 확산합니다.',
  process: [
    { title: '도입 상담', desc: '운영 환경과 목표를 파악합니다' },
    { title: '파일럿 운영', desc: '소수 매장에서 효과를 검증합니다' },
    { title: '전체 확산', desc: '검증된 모델을 전 매장에 적용합니다' },
  ],
  processNoteStrong: '기존 CCTV 그대로 시작합니다.',
  processNoteRest: ' 별도 하드웨어 교체 없이 소프트웨어만 연동하면 됩니다. 파일럿 기간 중 전담 컨설턴트가 함께합니다.',
  ctaTitleA: '다점포 운영의 새로운 기준,',
  ctaTitleB: '지금 상담하세요',
  ctaSub: '운영 환경에 맞는 맞춤 제안을 드립니다.',
  ctaPrimary: '맞춤 플랜 상담',
  ctaSecondary: '제품 둘러보기',
};

const en: Copy = {
  badge: 'Enterprise',
  heroTitleA: 'Standardize multi-store',
  heroTitleB: 'operations with data',
  heroSub1: 'DeepingSource for franchise headquarters, supervisors, and operations leaders.',
  heroSub2: 'Reduce variance between stores and raise the bar across your entire network.',
  heroCta: 'Request a consultation',
  challengesTitle: 'The core challenges HQ faces',
  challengesSub: 'As stores multiply, management grows complex and variance widens.',
  challenges: [
    { title: 'Operational variance', desc: 'Even with the same playbook, results differ store by store — and the cause is hard to pin down.' },
    { title: 'Delayed visibility', desc: "Without a supervisor on-site, there's no way to know a store's true state." },
    { title: 'Gut-feel decisions', desc: 'Decisions keep relying on experience instead of data.' },
  ],
  benefitsTitle: 'How DeepingSource solves it',
  benefits: [
    { title: 'Real-time AI situation sensing across every store', description: 'Track equipment, hygiene, and merchandising across all stores in real time, with alerts the moment something is off.' },
    { title: 'Roll the winning store’s playbook out to all', description: 'Compare traffic-flow and sales patterns store by store, then apply what the best stores do across every location.' },
    { title: 'Automated operational standardization', description: 'AI recommends verified operating patterns tailored to each store.' },
    { title: 'Rigorous privacy protection', description: `Anonymization technology built on ${COMPANY.patents} patents protects personal data at the source.` },
  ],
  dashboardEyebrow: 'Live Dashboard',
  dashboardTitle: 'Every store, at a glance',
  dashboardSub1: 'HQ supervisors see sales, visitors, and alerts across all stores in real time —',
  dashboardSub2: 'and pinpoint problem stores instantly.',
  goldenEyebrow: 'Golden Case',
  goldenTitle: 'One store’s success, across the network',
  goldenSub: 'The HQ operating cycle that finds one thriving store and replicates it everywhere — five stages from discovery to re-measurement.',
  golden: [
    { en: 'Discover', title: 'Discover', desc: 'store insight automatically flags a store’s success or problem as a Golden Case candidate.' },
    { en: 'Verify', title: 'Verify', desc: 'HQ confirms the "why" through hypotheses and case-based comparison.' },
    { en: 'Translate', title: 'Translate', desc: 'HQ turns one finding into the owner’s language — "move the display, lift basket size +8%".' },
    { en: 'Sync', title: 'Sync', desc: 'Roll out and sync the verified operating pattern to every store at once.' },
    { en: 'Re-measure', title: 'Re-measure', desc: 'Measure performance again and cycle into the next Golden Case.' },
  ],
  goldenLink: 'See 5 case studies, one per stage',
  processTitle: 'Rollout process',
  processSub: 'Start with a pilot and scale only what’s proven.',
  process: [
    { title: 'Consultation', desc: 'We map your operating environment and goals' },
    { title: 'Pilot', desc: 'We validate impact across a small set of stores' },
    { title: 'Full rollout', desc: 'We apply the proven model to every store' },
  ],
  processNoteStrong: 'Start with your existing CCTV.',
  processNoteRest: ' No hardware swap required — just connect the software. A dedicated consultant works alongside you throughout the pilot.',
  ctaTitleA: 'The new standard for multi-store operations —',
  ctaTitleB: 'let’s talk today',
  ctaSub: 'We’ll tailor a proposal to your operating environment.',
  ctaPrimary: 'Discuss a tailored plan',
  ctaSecondary: 'Explore the product',
};

const jp: Copy = {
  badge: 'Enterprise',
  heroTitleA: '多店舗運営を、',
  heroTitleB: 'データで標準化しましょう',
  heroSub1: 'フランチャイズ本部・スーパーバイザー・運営担当者のためのDeepingSourceです。',
  heroSub2: '店舗間のばらつきを抑え、運営全体の水準を高めます。',
  heroCta: '導入のご相談',
  challengesTitle: '本部が抱える主な課題',
  challengesSub: '店舗が増えるほど管理は複雑になり、ばらつきも大きくなります。',
  challenges: [
    { title: '運営のばらつき', desc: '同じマニュアルを渡しても店舗ごとに結果が異なり、原因の把握が難しくなります。' },
    { title: '現場把握の遅れ', desc: 'スーパーバイザーが直接訪問しなければ、店舗の状態を知ることができません。' },
    { title: '勘に頼る意思決定', desc: 'データのないまま経験に依存した意思決定が繰り返されます。' },
  ],
  benefitsTitle: 'DeepingSourceが解決します',
  benefits: [
    { title: '全店舗のリアルタイムAI状況検知', description: '全店舗の設備・衛生・陳列をリアルタイムで把握し、異常時には通知を受け取れます。' },
    { title: '成功店舗のパターンを全店舗へ', description: '店舗ごとの動線・売上パターンを比較分析し、うまくいく店舗のやり方を全店舗に適用します。' },
    { title: '運営標準化の自動化', description: 'AIが検証済みの運営パターンを店舗ごとに合わせて提案します。' },
    { title: '徹底したプライバシー保護', description: `${COMPANY.patents}件の特許に基づく匿名化技術で、個人情報を根本から保護します。` },
  ],
  dashboardEyebrow: 'Live Dashboard',
  dashboardTitle: '全店舗を、ひと目で',
  dashboardSub1: '本部のスーパーバイザーは全店舗の売上・来店者・通知をリアルタイムで把握し、',
  dashboardSub2: '問題のある店舗をすぐに特定できます。',
  goldenEyebrow: 'Golden Case',
  goldenTitle: '一店舗の成功を、全国へ',
  goldenSub: 'うまくいっている一店舗を見つけ、全店舗へ広げる本部の運営サイクル — 発見から再測定まで五つの段階でお手伝いします。',
  golden: [
    { en: 'Discover', title: '発見', desc: '一店舗の成功・課題を、store insightがGolden Case候補として自動的に表示します。' },
    { en: 'Verify', title: '検証', desc: '本部が「なぜそうなのか」を、仮説とCaseに基づく比較で確認します。' },
    { en: 'Translate', title: '翻訳', desc: '本部の一言を店主の言葉に置き換えます — 「陳列を変えれば客単価+8%」。' },
    { en: 'Sync', title: '展開', desc: '検証済みの運営パターンを全店舗へ同時に適用・同期します。' },
    { en: 'Re-measure', title: '再測定', desc: '成果を改めて測定し、次のGolden Caseへと循環させます。' },
  ],
  goldenLink: '5つの段階を代表する導入事例5件を見る',
  processTitle: '導入プロセス',
  processSub: 'パイロットから始め、検証できたモデルのみを展開します。',
  process: [
    { title: '導入相談', desc: '運営環境と目標を把握します' },
    { title: 'パイロット運用', desc: '少数の店舗で効果を検証します' },
    { title: '全店展開', desc: '検証済みのモデルを全店舗へ適用します' },
  ],
  processNoteStrong: '既存のCCTVのまま始められます。',
  processNoteRest: ' ハードウェアの入れ替えは不要で、ソフトウェアを連携するだけです。パイロット期間中は専任コンサルタントが伴走します。',
  ctaTitleA: '多店舗運営の新しい基準を、',
  ctaTitleB: '今すぐご相談ください',
  ctaSub: '運営環境に合わせた最適なご提案を差し上げます。',
  ctaPrimary: '最適プランのご相談',
  ctaSecondary: '製品を見る',
};

const C: Record<Locale, Copy> = { ko, en, jp };

const benefitIcons = [Eye, LayoutGrid, Zap, Shield];
const challengeIcons = [BarChart3, Eye, Users];
const goldenIcons = [Search, SearchCheck, Languages, Share2, RefreshCw];

export default function EnterpriseView({ locale }: { locale: Locale }) {
  const t = C[locale];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-dark noise-overlay">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20 lg:pt-40 lg:pb-28 text-center">
          <Breadcrumb items={[{ name: crumb('enterprise', locale), path: '/enterprise' }]} locale={locale} tone="dark" className="mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-300 uppercase tracking-wider mb-8">
            <Building2 className="w-3.5 h-3.5" />
            {t.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight break-keep">
            <WordRise text={t.heroTitleA} />
            <br className="hidden sm:block" />
            {' '}
            <WordRise text={t.heroTitleB} className="text-primary-light" />
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 break-keep">
            {t.heroSub1}
            <br className="hidden sm:block" />
            {t.heroSub2}
          </p>
          <Link
            href={localeHref(locale, '/contact') + '?type=enterprise'}
            className="btn-primary btn-lg shadow-[0_0_20px_theme(colors.primary/0.3)] hover:shadow-[0_0_30px_theme(colors.primary/0.5)] transition-[box-shadow] inline-flex items-center gap-2"
          >
            {t.heroCta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 본부 ↔ 매장 미러 (about에서 이관 — 본부·매장 약속의 새 집) */}
      <MasterPair locale={locale} />

      {/* 핵심 과제 */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.challengesTitle}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t.challengesSub}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {t.challenges.map((item, i) => {
              const Icon = challengeIcons[i];
              return (
                <div key={item.title} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* 제공하는 가치 */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.benefitsTitle}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {t.benefits.map((benefit, i) => {
              const Icon = benefitIcons[i];
              return (
                <div key={benefit.title} className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary-lighter flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* 다점포 대시보드 */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.dashboardEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.dashboardTitle}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t.dashboardSub1}<br className="hidden sm:block" />
              {' '}
              {t.dashboardSub2}
            </p>
          </div>
          <MultiStoreDashboardMockup locale={locale} />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8">
            <HqMapDashboardMockup locale={locale} />
          </div>
        </div>
      </AnimatedSection>

      {/* Golden Case 5단계 */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 lg:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.goldenEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.goldenTitle}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl break-keep">
              {t.goldenSub}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.golden.map((g, i) => {
              const Icon = goldenIcons[i];
              const n = String(i + 1).padStart(2, '0');
              return (
                <div key={n} className="relative flex flex-col p-6 bg-white rounded-2xl border border-gray-200 h-full">
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </span>
                    <span className="text-2xl font-bold text-gray-200 tabular-nums">{n}</span>
                  </div>
                  <p className="text-2xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">{g.en}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{g.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep flex-1">{g.desc}</p>
                  {i < t.golden.length - 1 && (
                    <span className="hidden lg:block absolute top-1/2 -right-2.5 w-5 h-px bg-gray-300" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <Link href={localeHref(locale, '/resources/case-studies')} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              {t.goldenLink}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* 도입 프로세스 */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.processTitle}
            </h2>
            <p className="text-gray-500">{t.processSub}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {t.process.map((item, i) => (
              <div key={item.title} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-sm font-bold text-primary">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong className="text-gray-900">{t.processNoteStrong}</strong>{t.processNoteRest}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="relative py-20 lg:py-28 bg-slate-900 noise-overlay overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight break-keep">
            {t.ctaTitleA}
            <br className="hidden sm:block" />
            {' '}
            {t.ctaTitleB}
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            {t.ctaSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={localeHref(locale, '/contact') + '?type=enterprise'}
              className="btn-primary btn-lg shadow-[0_0_20px_theme(colors.primary/0.3)] hover:shadow-[0_0_30px_theme(colors.primary/0.5)] transition-[box-shadow]"
            >
              {t.ctaPrimary}
            </Link>
            <Link
              href={localeHref(locale, '/')}
              className="btn-secondary btn-lg !bg-white/5 hover:!bg-white/10 !text-white !border-white/10 backdrop-blur-sm transition-colors inline-flex items-center gap-1"
            >
              {t.ctaSecondary}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
