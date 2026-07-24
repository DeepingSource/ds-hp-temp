import Link from 'next/link';
import {
  ArrowRight, Building2, Mail, Award, ShieldCheck, ScanEye, Eye, Search, Share2,
  SearchCheck, Languages, RefreshCw, CheckCircle2,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import Accordion from '@/components/ui/Accordion';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { CTA_TRACK_E, contactEnterpriseHref } from '@/lib/cta-canon';
import AnimatedSection from '@/components/ui/AnimatedSection';
import MidCta from '@/components/corporate/MidCta';
import MultiStoreDashboardMockup from '@/components/mockups/MultiStoreDashboardMockup';
import { HqMapDashboardMockup } from '@/components/mockups';
import siteContent from '@/data/generated/site-content.json';

/**
 * EnterpriseView — 단일 서사 재구성(⑤3-6 · 2026-07-24).
 * 문제(Hero→Trust→Pain) → 해법(Spine 3비트, Golden 5단계는 '맞춥니다' 내부 아코디언로 흡수)
 * → 증거(Dashboard→미드 CTA→증거 밴드; MasterPair는 인용 1줄로 강등) → 행동(Process→FAQ→CTA).
 * 1차 CTA는 전 구간 트랙 E 캐논('도입 상담 신청' · cta-canon) 단일화, 보조는 이메일.
 *
 * 카피 소스(J6): 핵심 카피는 CMS(content/site/enterprise.yaml → siteContent.enterprise).
 * 구조 배열(challenges·spineSteps·golden·process·faq·trustBrands)과 아이콘·링크는 코드 유지.
 */

type Step = { title: string; desc: string };

type CmsCopy = {
  badge: string; category: string;
  heroTitleA: string; heroTitleB: string; heroSub: string;
  ctaEmail: string; emailSubject: string; ownerEscape: string;
  challengesTitle: string; challengesSub: string; challengesRoot: string;
  spineEyebrow: string; spineTitle: string; spineBody: string;
  goldenDetailLabel: string; goldenLink: string;
  evidenceEyebrow: string; evidenceQuote: string;
  dashboardEyebrow: string; dashboardTitle: string; dashboardSub: string;
  midCtaLead: string;
  processTitle: string; processSub: string;
  faqEyebrow: string; faqTitle: string; faqSub: string;
  ctaTitleA: string; ctaTitleB: string; ctaSub: string; ctaReassure: string;
};

type CodeCopy = {
  trustBrands: string[];
  challenges: Step[];
  spineSteps: Step[];
  golden: { en: string; title: string; desc: string }[];
  process: Step[];
  processNoteStrong: string;
  processNoteRest: string;
  faq: { question: string; answer: string }[];
};

const CMS = siteContent.enterprise as Record<Locale, CmsCopy>;

const CODE: Record<Locale, CodeCopy> = {
  ko: {
    trustBrands: ['국내 1위 H&B', 'BGF CU', '코리아세븐', 'CJ푸드빌'],
    challenges: [
      { title: '운영 편차', desc: '같은 매뉴얼을 줘도 매장마다 결과가 다릅니다. 원인을 파악하기 어렵습니다.' },
      { title: '현장 파악 지연', desc: 'SV가 직접 방문하지 않으면 매장 상태를 알 수 없습니다.' },
      { title: '감에 의존하는 의사결정', desc: '데이터 없이 경험에 의존하는 의사결정이 반복됩니다.' },
    ],
    spineSteps: [
      { title: '읽습니다', desc: '전국 매장의 공간 신호 — 동선·체류·진열·이상을 익명으로 읽습니다.' },
      { title: '찾습니다', desc: '잘되는 매장의 패턴을, 당신의 매장 데이터 안에서 찾습니다.' },
      { title: '맞춥니다', desc: '그 패턴을 당신의 브랜드 표준으로 번역해 전 매장에 옮깁니다.' },
    ],
    golden: [
      { en: 'Discover', title: '발견', desc: '한 매장의 성공·문제를 store insight가 Golden Case 후보로 자동 표시합니다.' },
      { en: 'Verify', title: '검증', desc: "본사가 '왜 그런가'를 가설과 Case 기반 비교로 확인합니다." },
      { en: 'Translate', title: '번역', desc: "본사의 한 줄을 점주 언어로 옮깁니다 — '진열을 옮기면 객단가 +8%'." },
      { en: 'Sync', title: '전파', desc: '검증된 운영 패턴을 전 매장에 동시 적용·동기화합니다.' },
      { en: 'Re-measure', title: '재측정', desc: '성과를 다시 측정해 다음 Golden Case로 순환합니다.' },
    ],
    process: [
      { title: '도입 상담', desc: '운영 환경과 목표를 파악합니다.' },
      { title: '파일럿 운영', desc: '소수 매장에서 효과를 검증합니다.' },
      { title: '전체 확산', desc: '검증된 모델을 전 매장에 적용합니다.' },
    ],
    processNoteStrong: '기존 CCTV 그대로 시작합니다.',
    processNoteRest: ' 별도 하드웨어 교체 없이 소프트웨어만 연동하면 됩니다. 파일럿 기간 중 전담 컨설턴트가 함께합니다.',
    faq: [
      {
        question: '개인정보는 안전한가요? 매장에 손님 얼굴이 찍히는데요.',
        answer: '촬영되는 순간 익명화되어 개인을 식별할 수 있는 정보는 남지 않고, 원본 영상도 보존하지 않습니다(SEAL). 공간의 흐름만 데이터로 남습니다. 익명화 특허 기반 기술로 입력 단계에서 보호합니다.',
      },
      {
        question: '새 카메라나 장비를 설치해야 하나요?',
        answer: '아니요. 매장에 이미 달린 CCTV 위에서 동작합니다. 하드웨어 교체 없이 소프트웨어만 연동하면 되고, 파일럿도 기존 장비로 바로 시작합니다.',
      },
      {
        question: '파일럿 비용과 기간은 어떻게 되나요?',
        answer: '소수 매장으로 시작하는 파일럿부터 제안합니다. 매장 수·운영 환경에 따라 범위가 달라지므로, 상담 후 브랜드에 맞춘 파일럿 범위와 비용을 제안해 드립니다.',
      },
      {
        question: '전 매장 확산과 계약은 어떻게 진행되나요?',
        answer: '파일럿에서 효과를 검증한 뒤에만 확산합니다. 검증된 운영 패턴을 브랜드 표준으로 번역해 전 매장에 동기화하고, 확산 규모에 맞춘 계약을 제안합니다.',
      },
    ],
  },
  en: {
    trustBrands: ['Top H&B retailer', 'BGF CU', 'Korea Seven', 'CJ Foodville'],
    challenges: [
      { title: 'Operational variance', desc: 'Even with the same playbook, results differ store by store — and the cause is hard to pin down.' },
      { title: 'Delayed visibility', desc: "Without a supervisor on-site, there's no way to know a store's true state." },
      { title: 'Gut-feel decisions', desc: 'Decisions keep relying on experience instead of data.' },
    ],
    spineSteps: [
      { title: 'We read', desc: 'The spatial signals of every store — flow, dwell, merchandising, anomalies — anonymously.' },
      { title: 'We find', desc: 'The pattern behind the best stores, inside your own store data.' },
      { title: 'We tailor', desc: 'We translate that pattern into your brand standard and carry it to every store.' },
    ],
    golden: [
      { en: 'Discover', title: 'Discover', desc: 'store insight automatically flags a store’s success or problem as a Golden Case candidate.' },
      { en: 'Verify', title: 'Verify', desc: 'HQ confirms the "why" through hypotheses and case-based comparison.' },
      { en: 'Translate', title: 'Translate', desc: 'HQ turns one finding into the owner’s language — "move the display, lift basket size +8%".' },
      { en: 'Sync', title: 'Sync', desc: 'Roll out and sync the verified operating pattern to every store at once.' },
      { en: 'Re-measure', title: 'Re-measure', desc: 'Measure performance again and cycle into the next Golden Case.' },
    ],
    process: [
      { title: 'Consultation', desc: 'We map your operating environment and goals.' },
      { title: 'Pilot', desc: 'We validate impact across a small set of stores.' },
      { title: 'Full rollout', desc: 'We apply the proven model to every store.' },
    ],
    processNoteStrong: 'Start with your existing CCTV.',
    processNoteRest: ' No hardware swap required — just connect the software. A dedicated consultant works alongside you throughout the pilot.',
    faq: [
      {
        question: 'Is personal data safe? Customer faces are on our store cameras.',
        answer: 'Footage is anonymized the moment it’s captured, so no personally identifiable information remains, and the original footage is not retained (SEAL). Only the flow of the space remains as data, protected at the input stage by patented anonymization.',
      },
      {
        question: 'Do we need to install new cameras or hardware?',
        answer: 'No. It runs on the CCTV already installed in your stores. There’s no hardware swap — you connect the software, and the pilot starts on your existing equipment.',
      },
      {
        question: 'What’s the pilot cost and timeline?',
        answer: 'We propose a pilot on a small set of stores first. Scope depends on store count and operating environment, so after a consultation we tailor the pilot scope and cost to your brand.',
      },
      {
        question: 'How does full rollout and contracting work?',
        answer: 'We scale only after the pilot proves out. We translate the verified operating pattern into your brand standard, sync it across every store, and propose a contract matched to the rollout scale.',
      },
    ],
  },
  jp: {
    trustBrands: ['国内トップH&B', 'BGF CU', 'コリアセブン', 'CJフードビル'],
    challenges: [
      { title: '運営のばらつき', desc: '同じマニュアルを渡しても店舗ごとに結果が異なり、原因の把握が難しくなります。' },
      { title: '現場把握の遅れ', desc: 'スーパーバイザーが直接訪問しなければ、店舗の状態を知ることができません。' },
      { title: '勘に頼る意思決定', desc: 'データのないまま経験に依存した意思決定が繰り返されます。' },
    ],
    spineSteps: [
      { title: '読む', desc: '全店舗の空間信号 — 動線・滞在・陳列・異常を匿名で読み取ります。' },
      { title: '見つける', desc: 'うまくいく店舗のパターンを、御社の店舗データの中から見つけます。' },
      { title: '合わせる', desc: 'そのパターンを御社ブランドの標準に翻訳し、全店へ展開します。' },
    ],
    golden: [
      { en: 'Discover', title: '発見', desc: '一店舗の成功・課題を、store insightがGolden Case候補として自動的に表示します。' },
      { en: 'Verify', title: '検証', desc: '本部が「なぜそうなのか」を、仮説とCaseに基づく比較で確認します。' },
      { en: 'Translate', title: '翻訳', desc: '本部の一言を店主の言葉に置き換えます — 「陳列を変えれば客単価+8%」。' },
      { en: 'Sync', title: '展開', desc: '検証済みの運営パターンを全店舗へ同時に適用・同期します。' },
      { en: 'Re-measure', title: '再測定', desc: '成果を改めて測定し、次のGolden Caseへと循環させます。' },
    ],
    process: [
      { title: '導入相談', desc: '運営環境と目標を把握します。' },
      { title: 'パイロット運用', desc: '少数の店舗で効果を検証します。' },
      { title: '全店展開', desc: '検証済みのモデルを全店舗へ適用します。' },
    ],
    processNoteStrong: '既存のCCTVのまま始められます。',
    processNoteRest: ' ハードウェアの入れ替えは不要で、ソフトウェアを連携するだけです。パイロット期間中は専任コンサルタントが伴走します。',
    faq: [
      {
        question: '個人情報は安全ですか？店舗にお客様の顔が映ります。',
        answer: '撮影された瞬間に匿名化され、個人を識別できる情報は残らず、原本映像も保存しません(SEAL)。空間の流れだけがデータとして残り、特許に基づく匿名化技術で入力段階から保護します。',
      },
      {
        question: '新しいカメラや機器の設置は必要ですか？',
        answer: 'いいえ。店舗にすでにあるCCTVの上で動作します。ハードウェアの入れ替えは不要で、ソフトウェアを連携するだけ。パイロットも既存の機器ですぐに始められます。',
      },
      {
        question: 'パイロットの費用と期間はどのくらいですか？',
        answer: '少数店舗から始めるパイロットをご提案します。店舗数や運営環境により範囲が変わるため、ご相談のうえブランドに合わせたパイロット範囲と費用をご提案します。',
      },
      {
        question: '全店展開と契約はどう進みますか？',
        answer: 'パイロットで効果を検証してから展開します。検証済みの運営パターンをブランド標準に翻訳して全店へ同期し、展開規模に合わせた契約をご提案します。',
      },
    ],
  },
};

const challengeIcons = [Building2, Eye, Search];
const spineIcons = [ScanEye, Search, Share2];
const goldenIcons = [Search, SearchCheck, Languages, Share2, RefreshCw];

export default function EnterpriseView({ locale }: { locale: Locale }) {
  const t = CMS[locale];
  const c = CODE[locale];
  const proposalHref = localeHref(locale, contactEnterpriseHref());
  const emailHref = `mailto:${COMPANY.contactEmail}?subject=${encodeURIComponent(t.emailSubject)}`;
  const ctaPrimary = CTA_TRACK_E[locale];
  const credChips = [
    { icon: Award, label: 'NVIDIA Inception Partner' },
    { icon: ShieldCheck, label: locale === 'ko' ? `특허 ${COMPANY.patents}건` : locale === 'jp' ? `特許 ${COMPANY.patents}件` : `${COMPANY.patents} patents` },
    { icon: ScanEye, label: locale === 'ko' ? '촬영 순간 익명화 · 원본 미보존' : locale === 'jp' ? '撮影の瞬間に匿名化・原本非保存' : 'Anonymized at capture · no footage kept' },
  ];

  return (
    <>
      {/* 1 — Hero: 약속 1문장 + 단일 1차 CTA(도입 상담) + 보조(이메일).
          trustLine은 제거 — 소셜프루프는 아래 Trust band로 일원화(⑤3-6c). */}
      <section className="relative overflow-hidden bg-surface-dark noise-overlay">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20 lg:pt-40 lg:pb-24 text-center">
          <Breadcrumb items={[{ name: crumb('enterprise', locale), path: '/enterprise' }]} locale={locale} tone="dark" className="mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-300 uppercase tracking-wider mb-8">
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            {t.badge} · {t.category}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight break-keep">
            <WordRise text={t.heroTitleA} />
            <br className="hidden sm:block" />
            {' '}
            <WordRise text={t.heroTitleB} className="text-primary-light" />
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-9 break-keep">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={proposalHref}
              className="btn-primary btn-lg shadow-[0_0_20px_theme(colors.primary/0.3)] hover:shadow-[0_0_30px_theme(colors.primary/0.5)] transition-[box-shadow] inline-flex items-center gap-2"
            >
              {ctaPrimary}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={emailHref}
              className="btn-secondary btn-lg !bg-white/5 hover:!bg-white/10 !text-white !border-white/10 backdrop-blur-sm transition-colors inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {t.ctaEmail}
            </a>
          </div>
          {/* 세그먼트 분기(⑤3-6e) — 점주는 개별 매장 요금으로 */}
          <p className="mt-8 text-right">
            <Link
              href={localeHref(locale, '/pricing')}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              {t.ownerEscape}
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* 2 — Trust band: 소셜프루프 1회 (브랜드 + 크레덴셜) */}
      <AnimatedSection className="border-b border-gray-100 bg-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {c.trustBrands.map((b) => (
              <li key={b} className="text-base font-bold text-gray-400 tracking-tight break-keep">{b}</li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {credChips.map((chip) => {
              const Icon = chip.icon;
              return (
                <li key={chip.label} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-600 shadow-card">
                  <Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                  <span className="break-keep">{chip.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </AnimatedSection>

      {/* 3 — Pain: 3증상 → 1뿌리 ("본사가 매장 안을 못 읽는다") */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.challengesTitle}</h2>
            <p className="text-gray-500 break-keep">{t.challengesSub}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {c.challenges.map((item, i) => {
              const Icon = challengeIcons[i];
              return (
                <div key={item.title} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 break-keep">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 border-l-2 border-primary pl-4 text-lg font-semibold text-gray-900 break-keep max-w-3xl">
            {t.challengesRoot}
          </p>
        </div>
      </AnimatedSection>

      {/* 4 — 해법 척추(⑤3-6a): Pain을 받아 "그래서, 먼저 읽습니다" — 읽다·찾다·맞춘다 3비트.
          Golden 5단계는 '맞춥니다'의 내부 메커니즘으로 흡수(아코디언) — 이중 프로세스 해소. */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.spineEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.spineTitle}</h2>
            <p className="text-lg text-gray-600 leading-relaxed break-keep">{t.spineBody}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {c.spineSteps.map((s, i) => {
              const Icon = spineIcons[i];
              return (
                <div key={s.title} className="relative flex flex-col p-6 bg-white rounded-2xl border border-gray-200 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="text-2xs font-bold uppercase tracking-[0.15em] text-gray-400">{`0${i + 1}`}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 break-keep">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep">{s.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 max-w-3xl">
            <Accordion
              idPrefix="enterprise-golden"
              items={[
                {
                  question: t.goldenDetailLabel,
                  answer: (
                    <ol className="space-y-3">
                      {c.golden.map((g, i) => {
                        const Icon = goldenIcons[i];
                        return (
                          <li key={g.en} className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-lighter">
                              <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                            </span>
                            <p className="text-sm leading-relaxed break-keep text-gray-600">
                              <strong className="text-gray-900">{`${i + 1}. ${g.title}`}</strong>
                              {' — '}
                              {g.desc}
                            </p>
                          </li>
                        );
                      })}
                    </ol>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* 5 — Dashboard: 해법이 도는 실제 화면(제품 증거) + 직후 미드 CTA(전환 최적 지점) */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.dashboardEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.dashboardTitle}</h2>
            <p className="text-gray-500 break-keep">{t.dashboardSub}</p>
          </div>
          <MultiStoreDashboardMockup locale={locale} />
          <div className="mx-auto max-w-6xl mt-8">
            <HqMapDashboardMockup locale={locale} />
          </div>
          <MidCta locale={locale} lead={t.midCtaLead} className="mt-12" />
        </div>
      </AnimatedSection>

      {/* 6 — 증거 밴드: MasterPair 섹션은 인용 1줄로 강등(⑤3-6b) + 사례 5건 링크 */}
      <AnimatedSection className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">{t.evidenceEyebrow}</p>
          <blockquote className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep mb-6">
            “{t.evidenceQuote}”
          </blockquote>
          <Link href={localeHref(locale, '/resources/case-studies')} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            {t.goldenLink}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </AnimatedSection>

      {/* 7 — Adoption: 파일럿 → 검증 → 확산 (기존 CCTV = 리스크 제거) */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.processTitle}</h2>
            <p className="text-gray-500 break-keep">{t.processSub}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {c.process.map((item, i) => (
              <div key={item.title} className="p-6 rounded-2xl border border-gray-200 bg-gray-50">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-sm font-bold text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 break-keep">{item.title}</h3>
                <p className="text-sm text-gray-500 break-keep">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-primary-lighter/50 rounded-2xl border border-primary/15">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-gray-700 leading-relaxed break-keep">
                <strong className="text-gray-900">{c.processNoteStrong}</strong>{c.processNoteRest}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 8 — 반론 해소 FAQ */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.faqEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.faqTitle}</h2>
            <p className="text-gray-500 break-keep">{t.faqSub}</p>
          </div>
          <Accordion idPrefix="enterprise-faq" items={c.faq.map((f) => ({ question: f.question, answer: f.answer }))} />
        </div>
      </AnimatedSection>

      {/* 9 — Final CTA: 단일 1차 CTA 재호출 + 보조 이메일 */}
      <AnimatedSection className="relative py-20 lg:py-28 bg-surface-dark noise-overlay overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight break-keep">
            {t.ctaTitleA}
            <br className="hidden sm:block" />
            {' '}
            <span className="text-primary-light">{t.ctaTitleB}</span>
          </h2>
          <p className="text-lg text-gray-300 mb-10 break-keep">{t.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={proposalHref}
              className="btn-primary btn-lg shadow-[0_0_20px_theme(colors.primary/0.3)] hover:shadow-[0_0_30px_theme(colors.primary/0.5)] transition-[box-shadow]"
            >
              {ctaPrimary}
            </Link>
            <a
              href={emailHref}
              className="btn-secondary btn-lg !bg-white/5 hover:!bg-white/10 !text-white !border-white/10 backdrop-blur-sm transition-colors inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {t.ctaEmail}
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-400 break-keep">{t.ctaReassure}</p>
        </div>
      </AnimatedSection>
    </>
  );
}
