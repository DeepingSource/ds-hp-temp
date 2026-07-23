import { Bell, FileText, UserCheck, Repeat, Check, type LucideIcon } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import type { Locale } from '@/lib/i18n';
import siteContent from '@/data/generated/site-content.json';

/**
 * AgentDayTimeline — "saai agent의 하루" (재정돈: How-it-works 4카드 → 타임라인).
 *
 * 텍스트 카드 4장이 하던 설명을 하루의 4개 시점 + 마이크로 목업으로 옮긴다.
 * 캡션(title/desc)은 CMS(content/site/store-agent.yaml `steps`)에서 오고,
 * 시각·아이콘·목업 안의 시나리오 텍스트(+18%, 삼각김밥 40개…)는 화면 재현이므로
 * 코드에 산다 — 본문에서 지운 숫자는 삭제된 게 아니라 목업 안으로 이동한 것.
 */

type Tri = { ko: string; en: string; jp: string };
const tri = (ko: string, en: string, jp: string): Tri => ({ ko, en, jp });

type StepCopy = { title: string; desc: string };
type Copy = { stepsHeading: string; stepsSub: string; steps: Record<string, StepCopy> };
const SA = siteContent.storeAgent as Record<Locale, Copy>;

/** Micro-mockup content per moment — scenario details live INSIDE the screen. */
const MOMENTS: {
  id: string;
  time: string;
  icon: LucideIcon;
  badge: Tri;
  line1: Tri;
  line2: Tri;
  action?: Tri;
}[] = [
  {
    id: 'restock',
    time: '11:50',
    icon: Bell,
    badge: tri('푸시 알림', 'Push alert', 'プッシュ通知'),
    line1: tri('인기 음료 3종, 1시간 내 품절 예상', '3 top drinks sell out within the hour', '人気ドリンク3種、1時間で品切れ見込み'),
    line2: tri('점심 방문 +18% · 백룸 재고 있음', 'Lunch traffic +18% · backroom in stock', '昼の来店+18% · バックルーム在庫あり'),
    action: tri('지금 채우기', 'Restock now', '今すぐ補充'),
  },
  {
    id: 'order',
    time: '15:00',
    icon: FileText,
    badge: tri('발주서', 'Purchase order', '発注書'),
    line1: tri('삼각김밥 40개 — 오픈 전 입고', '40 rice balls — in before open', 'おにぎり40個 — 開店前入荷'),
    line2: tri('내일 점심 수요 예측 반영', 'Sized to tomorrow’s lunch demand', '明日のランチ需要を反映'),
    action: tri('발주서 보내기', 'Send the PO', '発注書を送る'),
  },
  {
    id: 'human',
    time: '18:00',
    icon: UserCheck,
    badge: tri('승인 대기', 'Awaiting approval', '承認待ち'),
    line1: tri('오늘 권고 5건 — 4건 승인됨', 'Today’s 5 calls — 4 approved', '本日の推奨5件 — 4件承認'),
    line2: tri('실행은 승인 후에만 진행됩니다', 'Nothing runs before you approve', '実行は承認後にのみ進みます'),
    action: tri('승인', 'Approve', '承認'),
  },
  {
    id: 'improve',
    time: '21:30',
    icon: Repeat,
    badge: tri('주간 리포트', 'Weekly report', '週次レポート'),
    line1: tri('“폐기율 차트도 넣어줘” — 반영 완료', '“Add the waste chart” — done', '「廃棄率チャートも」— 反映済み'),
    line2: tri('대화는 흐름을 기억합니다', 'The conversation keeps its thread', '会話は流れを覚えています'),
  },
];

export default function AgentDayTimeline({ locale }: { locale: Locale }) {
  const t = SA[locale];
  const T = (x: Tri) => x[locale];

  return (
    <Section variant="default" pad="default">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold break-keep text-gray-900 sm:text-4xl">
            {t.stepsHeading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed break-keep text-gray-500">{t.stepsSub}</p>
        </div>

        <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* 연결선 (lg 이상) */}
          <div
            className="absolute top-[9px] left-[12.5%] right-[12.5%] hidden h-px bg-gray-200 lg:block"
            aria-hidden="true"
          />
          {MOMENTS.map((m) => {
            const copy = t.steps[m.id];
            const Icon = m.icon;
            return (
              <li key={m.id} className="relative flex flex-col">
                {/* 타임라인 점 + 시각 */}
                <div className="flex items-center gap-2 lg:flex-col lg:items-center lg:gap-1.5">
                  <span
                    className="relative z-10 h-[18px] w-[18px] rounded-full border-[3px] border-white bg-primary ring-1 ring-primary-light"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-sm font-bold tabular-nums text-primary">{m.time}</span>
                </div>

                <h3 className="mt-3 text-base font-bold break-keep text-gray-900 lg:text-center">
                  {copy?.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed break-keep text-gray-500 lg:text-center">
                  {copy?.desc}
                </p>

                {/* 마이크로 목업 — 시나리오 디테일은 화면 안에 */}
                <div className="mt-4 flex-1 rounded-2xl border border-gray-200 bg-white p-4 shadow-card">
                  <div className="mb-2.5 flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-lighter text-primary">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-2xs font-bold uppercase tracking-wide text-gray-400">
                      {T(m.badge)}
                    </span>
                  </div>
                  <p className="text-sm font-semibold leading-snug break-keep text-gray-900">{T(m.line1)}</p>
                  <p className="mt-1 text-xs leading-relaxed break-keep text-gray-500">{T(m.line2)}</p>
                  {m.action ? (
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      {T(m.action)}
                    </span>
                  ) : (
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary-lighter px-3 py-1.5 text-xs font-bold text-primary">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      {T(tri('학습됨', 'Learned', '学習済み'))}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
