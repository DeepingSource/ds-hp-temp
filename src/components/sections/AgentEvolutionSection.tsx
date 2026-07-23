import Link from 'next/link';
import { Eye, MessageSquare, Bell, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import type { Locale } from '@/lib/i18n';
import siteContent from '@/data/generated/site-content.json';

/**
 * AgentEvolutionSection — the Viewer → Interactive → Proactive story on the
 * saai agent product page (PLAN_SA_AGENTIC_ROLES_v2 §4.1).
 *
 * 재정돈(2026-07): 텍스트 카드 3장 → 미니목업 카드 3장. 각 단계를 "설명하는 글"
 * 대신 "그 단계의 화면"(미니 차트 · 채팅 Q&A · 푸시 알림)으로 보여준다. 캡션은
 * CMS(store-agent.yaml)에서 1줄로, 목업 안의 화면 텍스트는 재현이므로 코드에 산다.
 *
 * This is deliberately framed as the evolution of what the CUSTOMER gets, not
 * as a technical explanation — the "why we build it this way" half lives at
 * /technology/agentic-ai. The third rung links to #proactive (the action-card
 * mockup further down the page) so the direction is shown, not just claimed.
 */

type Tri = { ko: string; en: string; jp: string };
const tri = (ko: string, en: string, jp: string): Tri => ({ ko, en, jp });

type Stage = { tag: string; title: string; desc: string };
type Copy = {
  evolutionEyebrow: string;
  evolutionHeading: string;
  evolutionSub: string;
  evolutionProactiveCta: string;
  evolution: Stage[];
};

const SA = siteContent.storeAgent as Record<Locale, Copy>;

/** Order matches content/site/store-agent.yaml `evolution`. */
const STAGE_ICONS = [Eye, MessageSquare, Bell] as const;

const VISUAL_COPY = {
  chartLabel: tri('어제 방문 · 구역별 체류', 'Yesterday · dwell by zone', '昨日の来店 · ゾーン別滞在'),
  q: tri('어제 왜 매출이 떨어졌지?', 'Why did sales drop yesterday?', '昨日はなぜ売上が落ちた?'),
  a: tri('전환이 줄었어요 — 근거 차트를 열었습니다.', 'Conversion fell — here’s the evidence.', '転換が減少 — 根拠チャートを開きました。'),
  pushApp: tri('store agent · 지금', 'store agent · now', 'store agent · 今'),
  pushTitle: tri('인기 음료 3종, 1시간 내 품절 예상', '3 top drinks sell out within the hour', '人気ドリンク3種、1時間で品切れ見込み'),
  pushBody: tri('지금 매대부터 채울까요?', 'Restock the shelf now?', '今、棚から補充しますか?'),
  /** 화면 재현에는 예시 표기를 단다 — 페이지 내 다른 목업(AgentMockupShowcase ·
   *  AgentHqMiniMockup · AgentDayTimeline)과 같은 컴플라이언스 규칙. */
  caption: tri(
    '* 샘플 화면 · 데이터 예시',
    '* Sample screens · illustrative data',
    '* サンプル画面 · データは例示',
  ),
};

/** 단계별 미니목업 — 설명 대신 그 단계의 화면을 보여준다. */
function StageVisual({ stage, locale }: { stage: number; locale: Locale }) {
  const T = (x: Tri) => x[locale];

  // ① Viewer — 미니 바 차트 (보여주기만 한다)
  if (stage === 0) {
    const bars = [42, 68, 55, 88, 61, 74, 49];
    return (
      <div className="mb-5 h-[5.5rem] rounded-xl border border-gray-100 bg-gray-50 p-3" aria-hidden="true">
        <p className="mb-2 text-2xs font-medium text-gray-400">{T(VISUAL_COPY.chartLabel)}</p>
        <div className="flex h-12 items-end gap-1">
          {bars.map((b, i) => (
            <span key={i} className="flex-1 rounded-t-sm bg-primary/30" style={{ height: `${b}%` }} />
          ))}
        </div>
      </div>
    );
  }

  // ② Interactive — 채팅 Q&A 버블 (물으면 답한다)
  if (stage === 1) {
    return (
      <div className="mb-5 flex h-[5.5rem] flex-col justify-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50 px-3" aria-hidden="true">
        <span className="max-w-full self-end truncate rounded-2xl rounded-br-sm bg-primary px-3 py-1.5 text-2xs font-medium text-white">
          {T(VISUAL_COPY.q)}
        </span>
        <span className="max-w-full self-start truncate rounded-2xl rounded-bl-sm border border-gray-200 bg-white px-3 py-1.5 text-2xs text-gray-700">
          {T(VISUAL_COPY.a)}
        </span>
      </div>
    );
  }

  // ③ Proactive — 푸시 알림 카드 (먼저 말을 건다)
  return (
    <div className="mb-5 flex h-[5.5rem] items-center rounded-xl border border-gray-100 bg-gray-50 px-3" aria-hidden="true">
      <div className="w-full rounded-xl border border-gray-200 bg-white p-2.5 shadow-card">
        <p className="mb-1 flex items-center gap-1.5 text-3xs font-bold uppercase tracking-wide text-gray-400">
          <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded bg-primary text-white">
            <Bell className="h-2 w-2" />
          </span>
          {T(VISUAL_COPY.pushApp)}
        </p>
        <p className="truncate text-2xs font-bold leading-snug text-gray-900">{T(VISUAL_COPY.pushTitle)}</p>
        <p className="truncate text-3xs text-gray-500">{T(VISUAL_COPY.pushBody)}</p>
      </div>
    </div>
  );
}

export default function AgentEvolutionSection({ locale }: { locale: Locale }) {
  const t = SA[locale];

  return (
    <Section variant="alt" pad="default">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-3">{t.evolutionEyebrow}</Eyebrow>
          <h2 className="font-display text-3xl font-bold break-keep text-gray-900 sm:text-4xl">
            {t.evolutionHeading}
          </h2>
          <p className="mt-4 text-base leading-relaxed break-keep text-gray-600">
            {t.evolutionSub}
          </p>
        </div>

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.evolution.map((stage, i) => {
            const Icon = STAGE_ICONS[i] ?? Eye;
            const isCurrent = i === 1;
            const isNext = i === 2;
            return (
              <li
                key={stage.title}
                className={`flex flex-col rounded-2xl border p-6 ${
                  isCurrent ? 'border-primary bg-white shadow-md' : 'border-gray-200 bg-white'
                }`}
              >
                <StageVisual stage={i} locale={locale} />
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span
                    className={`rounded-xl p-2.5 ${
                      isCurrent ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isCurrent
                        ? 'bg-primary/10 text-primary'
                        : 'border border-gray-200 text-gray-500'
                    }`}
                  >
                    {stage.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold break-keep text-gray-900">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed break-keep text-gray-600">
                  {stage.desc}
                </p>
                {isNext && (
                  <Link
                    href="#proactive"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    {t.evolutionProactiveCta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        <p className="mt-8 text-center text-2xs text-gray-400">
          {VISUAL_COPY.caption[locale]}
        </p>
      </Container>
    </Section>
  );
}
