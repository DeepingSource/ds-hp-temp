import Link from 'next/link';
import { RefreshCw, Building2, Camera, ShieldCheck, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, faqPage } from '@/lib/structured-data';

/**
 * HomeOrientation — the grounding band (랜딩_전환재정렬_v2 §4), home #1.5.
 * Completes the hero's grounding logic (범용 AI는 당신의 공간 신호를 못 받는다), states the
 * company identity (익명화 공간 AI 회사), and anchors the HQ path. Server-rendered prose +
 * a FAQPage JSON-LD so answer engines can lift the four facts (AEO). The competitor foot-
 * note names ChatGPT·Claude, once and lightly (§10-2).
 */

type Fact = { icon: typeof RefreshCw; label: string; body: string };

const dict: Record<
  Locale,
  {
    eyebrow: string;
    heading: string;
    lead: string;
    facts: Fact[];
    saai: string;
    footnote: string;
    faq: { question: string; answer: string }[];
  }
> = {
  ko: {
    eyebrow: '왜 공간 AI인가',
    heading: '일반적인 답 말고 — 당신의 매장에 맞는 답.',
    lead: '딥핑소스는 2018년부터 영상 익명화를 깎아 온, 공간을 그대로 읽는 익명화 공간 AI 회사입니다. 신호는 받되, 누구인지는 남기지 않습니다.',
    facts: [
      { icon: RefreshCw, label: '무엇을', body: '어제를 분석하고(insight), 지금을 감지하고(care), 다음을 실행하는(agent) 하나의 운영 루프.' },
      { icon: Building2, label: '누구를 위해', body: '전국 매장을 한 화면에서 보는 프랜차이즈·다점포 본사부터, 개별 매장까지.' },
      { icon: Camera, label: '어떻게', body: '새 장비 없이, 쓰던 CCTV 위에서.' },
      { icon: ShieldCheck, label: '왜 안전한가', body: '촬영 순간 익명화, 원본 미보존 (SEAL).' },
    ],
    saai: 'SAAI란',
    footnote: '* 범용 AI(ChatGPT·Claude 등)는 텍스트·이미지엔 강하지만, 당신의 매대·동선은 보지 못합니다 — 그래서 답이 원론적입니다.',
    faq: [
      { question: '왜 범용 AI로는 매장이 바뀌지 않나요?', answer: '범용 AI(ChatGPT·Claude 등)는 텍스트와 이미지엔 강하지만 당신 매장의 매대·동선 신호를 받지 못해 원론적인 답만 합니다. SAAI는 공간의 신호를 그대로 받아 당신의 매장에 맞는 답과 실행을 제시합니다.' },
      { question: '익명화 공간 AI란 무엇인가요?', answer: '공간을 그대로 읽되 누구인지는 남기지 않는 AI입니다. 촬영 순간 익명화하고 원본을 보존하지 않으며(SEAL), 어제를 분석하고 지금을 감지하고 다음을 실행하는 하나의 운영 루프로 매장을 운영합니다.' },
      { question: '새 장비를 설치해야 하나요?', answer: '아니요. 매장에 이미 달린 CCTV 위에서 동작합니다. 새 카메라나 별도 장비 없이 도입할 수 있습니다.' },
      { question: '개인정보는 안전한가요?', answer: '촬영되는 순간 익명화되어 개인을 식별할 수 있는 정보는 남지 않고, 원본 영상도 보존하지 않습니다(SEAL). 공간의 흐름만 데이터로 남습니다.' },
    ],
  },
  en: {
    eyebrow: 'Why spatial AI',
    heading: 'Not a generic answer — the answer for your store.',
    lead: 'DeepingSource has honed video anonymization since 2018 — an Anonymized Spatial AI company that reads the space as it is. It receives the signals, yet leaves no one identifiable.',
    facts: [
      { icon: RefreshCw, label: 'What', body: 'One operating loop — analyze yesterday (insight), detect the now (care), act on next (agent).' },
      { icon: Building2, label: 'For whom', body: 'From franchise & multi-store HQs that watch every store on one screen, to a single store.' },
      { icon: Camera, label: 'How', body: 'No new hardware — on the CCTV you already have.' },
      { icon: ShieldCheck, label: 'Why it’s safe', body: 'Anonymized at capture, no footage retained (SEAL).' },
    ],
    saai: 'What is SAAI',
    footnote: '* General AI (ChatGPT, Claude, etc.) is strong on text and images, but it can’t see your shelves or paths — so its answers stay generic.',
    faq: [
      { question: 'Why won’t a general AI change my store?', answer: 'General AI (ChatGPT, Claude, etc.) is strong on text and images but doesn’t receive the shelf and flow signals of your store, so it only gives generic answers. SAAI receives the signals of the space and gives the answer — and the action — for your store.' },
      { question: 'What is Anonymized Spatial AI?', answer: 'An AI that reads the space as it is while leaving no one identifiable. It anonymizes at the moment of capture and retains no footage (SEAL), and runs the store on one operating loop — analyze yesterday, detect the now, act on next.' },
      { question: 'Do I need to install new hardware?', answer: 'No. It runs on the CCTV already installed in your store. You can adopt it with no new cameras or extra equipment.' },
      { question: 'Is personal data safe?', answer: 'It is anonymized the moment it’s captured, so no personally identifiable information remains, and the original footage is not retained (SEAL). Only the flow of the space remains as data.' },
    ],
  },
  jp: {
    eyebrow: 'なぜ空間AIか',
    heading: '一般論ではなく — あなたの店舗に合った答え。',
    lead: 'ディーピングソースは2018年から映像の匿名化を磨いてきた、空間をそのまま読み取る匿名化空間AIの会社です。信号は受け取り、誰かは残しません。',
    facts: [
      { icon: RefreshCw, label: '何を', body: '昨日を分析し(insight)、今を検知し(care)、次を実行する(agent)、ひとつの運営ループ。' },
      { icon: Building2, label: '誰のために', body: '全店舗をひとつの画面で見るフランチャイズ・多店舗本部から、個々の店舗まで。' },
      { icon: Camera, label: 'どうやって', body: '新しい機器なしで、すでにあるCCTVの上で。' },
      { icon: ShieldCheck, label: 'なぜ安全か', body: '撮影の瞬間に匿名化、原本は保存しません(SEAL)。' },
    ],
    saai: 'SAAIとは',
    footnote: '* 汎用AI(ChatGPT・Claudeなど)はテキストや画像には強いものの、あなたの棚や動線は見えません — だから答えが一般論になります。',
    faq: [
      { question: 'なぜ汎用AIでは店舗が変わらないのですか?', answer: '汎用AI(ChatGPT・Claudeなど)はテキストや画像には強いものの、あなたの店舗の棚や動線の信号を受け取れず、一般論しか返せません。SAAIは空間の信号をそのまま受け取り、あなたの店舗に合った答えと実行を提示します。' },
      { question: '匿名化空間AIとは何ですか?', answer: '空間をそのまま読み取りつつ、誰かを残さないAIです。撮影の瞬間に匿名化し原本を保存せず(SEAL)、昨日を分析し・今を検知し・次を実行するひとつの運営ループで店舗を運営します。' },
      { question: '新しい機器の設置は必要ですか?', answer: 'いいえ。店舗にすでにあるCCTVの上で動作します。新しいカメラや別途の機器なしで導入できます。' },
      { question: '個人情報は安全ですか?', answer: '撮影された瞬間に匿名化され、個人を識別できる情報は残らず、原本映像も保存しません(SEAL)。空間の流れだけがデータとして残ります。' },
    ],
  },
};

export default function HomeOrientation({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section variant="default">
      <JsonLd data={faqPage(t.faq)} />
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-start">
          {/* LEFT — the thesis (SSR prose for AEO) */}
          <div className="lg:col-span-5">
            <Eyebrow tone="primary" className="mb-3">{t.eyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display tracking-tight">
              {t.heading}
            </h2>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed break-keep">{t.lead}</p>
            <div className="mt-7">
              <Link
                href={localeHref(locale, '/products/saai')}
                className="group inline-flex items-center gap-1.5 py-1.5 text-sm font-semibold text-primary"
              >
                {t.saai}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* RIGHT — the four facts as a definition list (what · who · how · why safe).
              Hairline rows, not cards — the last row (why it's safe · SEAL) carries the accent. */}
          <div className="lg:col-span-7">
            <dl className="border-t border-gray-200">
              {t.facts.map((f, i) => {
                const Icon = f.icon;
                const seal = i === t.facts.length - 1;
                return (
                  <div
                    key={f.label}
                    className="flex flex-col gap-2 border-b border-gray-200 py-5 sm:flex-row sm:gap-6"
                  >
                    <div className="flex w-full items-center gap-2.5 sm:w-36 sm:shrink-0">
                      <Icon
                        className={`h-4 w-4 shrink-0 ${seal ? 'text-primary' : 'text-gray-500'}`}
                        aria-hidden="true"
                      />
                      <dt
                        className={`text-xs font-bold uppercase tracking-[0.12em] ${seal ? 'text-primary' : 'text-gray-500'}`}
                      >
                        {f.label}
                      </dt>
                    </div>
                    <dd className="text-sm text-gray-700 leading-relaxed break-keep sm:text-base">{f.body}</dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-6 text-xs text-gray-500 leading-relaxed break-keep">{t.footnote}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
