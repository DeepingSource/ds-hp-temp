import { Receipt, LineChart, Lock, Eye, BellRing, RefreshCw, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Card from '@/components/ui/Card';
import IconChip from '@/components/ui/IconChip';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { type Locale } from '@/lib/i18n';
import { signature, operatingLoop } from '@/lib/brand-canon';

/**
 * ProblemBeat — the tension before the solution (home #2).
 * Gives the rest of the page stakes, grounded in the funnel: between walking in
 * and checking out, most of what happens in the store goes unseen. Pain language
 * lifted from the
 * launch film (00:4–00:7, 01:2): POS only keeps who paid, the funnel of the
 * invisible majority who browse and leave, and the answer waiting in the space.
 * The funnel is drawn from the copy's own numbers (language-neutral, all locales).
 * Resolves into the SAAI answer (보는 AI를 넘어, 누구가 아니라 무엇을).
 */

type Pain = { icon: typeof Receipt; title: string; desc: string };
type FunnelStep = { n: string; pct: number; label: string };

const dict: Record<Locale, {
  eyebrow: string; heading: string; pains: Pain[]; bridge: string;
  funnelTitle: string; funnel: FunnelStep[]; leak: { n: string; label: string };
  methodTagline: string;
}> = {
  ko: {
    eyebrow: '매장 안, 무슨 일이 있었을까요?',
    heading: '들어온 손님이 결제까지 가는 사이, 매장에서 무슨 일이 있었는지 — 알고 계신가요?',
    funnelTitle: '어제, 우리 매장 안에서',
    funnel: [
      { n: '382', pct: 100, label: '입장' },
      { n: '300', pct: 79, label: '매대 방문' },
      { n: '214', pct: 56, label: '머묾' },
      { n: '138', pct: 36, label: '응시' },
      { n: '88', pct: 23, label: '픽업' },
      { n: '65', pct: 17, label: '결제' },
    ],
    leak: { n: '317', label: '매장 안에서 보고·머물고·집어 든 행동 — POS엔 없습니다' },
    pains: [
      { icon: Receipt, title: 'POS엔 결제한 손님만 남습니다', desc: '거래의 결과만 남고, 매장 안에서 일어난 행동은 사라집니다.' },
      { icon: LineChart, title: '본 건 매출과 재고 — 거래의 결과뿐', desc: '체류·동선·손길은 POS에 없습니다. 왜 안 팔렸는지도.' },
      { icon: Lock, title: 'CCTV는 흘러가고, 공간은 안 읽힙니다', desc: '답은 공간에 있는데, 얼굴을 다루는 순간 분석이 멈춥니다.' },
    ],
    bridge: signature.ko,
    methodTagline: '보는 데서 멈추지 않습니다 — 실행까지.',
  },
  en: {
    eyebrow: 'What happened inside your store?',
    heading: 'Between walking in and checking out, do you know what happened on your floor?',
    funnelTitle: 'Yesterday, inside your store',
    funnel: [
      { n: '382', pct: 100, label: 'entered' },
      { n: '300', pct: 79, label: 'at a shelf' },
      { n: '214', pct: 56, label: 'paused' },
      { n: '138', pct: 36, label: 'looked' },
      { n: '88', pct: 23, label: 'picked up' },
      { n: '65', pct: 17, label: 'checked out' },
    ],
    leak: { n: '317', label: 'looked, paused, reached for it — none of it in your POS' },
    pains: [
      { icon: Receipt, title: 'POS only keeps who paid', desc: 'Only the outcome remains; what happened inside the store disappears.' },
      { icon: LineChart, title: 'You see sales and stock — outcomes, not the show', desc: 'Dwell, paths, the reach of a hand aren’t in the POS. Nor is why it didn’t sell.' },
      { icon: Lock, title: 'CCTV just streams past — the space goes unread', desc: 'The answer is in the space, but analysis stops the moment it touches a face.' },
    ],
    bridge: signature.en,
    methodTagline: 'We don’t stop at seeing — we act.',
  },
  jp: {
    eyebrow: '店内で、何が起きていた?',
    heading: '入店から決済までの間、店舗で何が起きていたか — ご存知ですか?',
    funnelTitle: '昨日、店内で',
    funnel: [
      { n: '382', pct: 100, label: '入店' },
      { n: '300', pct: 79, label: '棚へ' },
      { n: '214', pct: 56, label: '滞留' },
      { n: '138', pct: 36, label: '注視' },
      { n: '88', pct: 23, label: '手に取る' },
      { n: '65', pct: 17, label: '会計' },
    ],
    leak: { n: '317', label: '見て・滞まり・手に取った行動 — POSにはありません' },
    pains: [
      { icon: Receipt, title: 'POSに残るのは、会計した客だけ', desc: '残るのは結果だけ。店内で起きた行動は消えます。' },
      { icon: LineChart, title: '見えるのは売上と在庫 — 取引の結果だけ', desc: '滞在・動線・手に取る瞬間はPOSにありません。なぜ売れなかったかも。' },
      { icon: Lock, title: 'CCTVは流れ去り、空間は読まれない', desc: '答えは空間にあるのに、顔に触れた瞬間に分析が止まります。' },
    ],
    bridge: signature.jp,
    methodTagline: '見るだけで終わらせない — 実行まで。',
  },
};

/**
 * Operating-loop ribbon — Observe · Analyze · Suggest · Learn (SAAI_AI_Handoff.md · A4).
 * The agentic wedge: others stop at seeing; we close the loop and learn.
 * label + time-phase from operatingLoop; last step (Learn) emphasized.
 */
const LOOP_ICONS = [Eye, LineChart, BellRing, RefreshCw] as const;

function methodSteps(locale: Locale) {
  const steps = operatingLoop[locale];
  return steps.map((s, i) => ({
    icon: LOOP_ICONS[i],
    label: s.label,
    phase: s.phase,
    emphasis: i === steps.length - 1,
  }));
}

export default function ProblemBeat({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section variant="alt">
      <Container>
        <div className="mb-10 max-w-3xl">
          <Eyebrow tone="muted" className="mb-3">{t.eyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display">{t.heading}</h2>
        </div>

        {/* Funnel of the invisible majority — built from the copy's own numbers (language-neutral) */}
        <div className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 sm:p-9 shadow-card">
          <p className="mb-6 text-2xs font-bold uppercase tracking-[0.2em] text-gray-500">{t.funnelTitle}</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-3 items-end">
            {t.funnel.map((s, i) => (
              <div key={s.label} className="text-center">
                <div className="flex items-end justify-center h-20 sm:h-28">
                  <div
                    className="w-full rounded-t-md bg-primary"
                    style={{ height: `${Math.max(s.pct, 8)}%`, opacity: 1 - i * 0.12 }}
                  />
                </div>
                <p className="mt-2 sm:mt-3 text-base sm:text-2xl font-bold text-gray-900 tabular-nums">{s.n}</p>
                <p className="text-2xs sm:text-xs text-gray-500 break-keep leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 flex items-baseline gap-2.5 border-t border-gray-100 pt-5 break-keep">
            <span className="text-2xl sm:text-3xl font-bold text-primary tabular-nums shrink-0">−{t.leak.n}</span>
            <span className="text-sm sm:text-base text-gray-600">{t.leak.label}</span>
          </p>
        </div>

        <StaggerContainer className="grid sm:grid-cols-3 gap-5">
          {t.pains.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.title} className="h-full">
                <Card className="h-full p-7">
                  <IconChip className="mb-5">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </IconChip>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 break-keep">{p.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep">{p.desc}</p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        <p className="mt-10 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 break-keep font-display tracking-tight">
          {t.bridge}
        </p>

        {/* Operating loop — Observe·Analyze·Suggest·Learn (close the loop, then learn) */}
        <div className="mt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {methodSteps(locale).map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className={[
                    'relative flex flex-col gap-4 rounded-2xl border p-5 sm:p-7',
                    s.emphasis
                      ? 'border-primary/30 bg-primary text-white shadow-card'
                      : 'border-gray-200 bg-white text-gray-900',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'inline-flex h-12 w-12 items-center justify-center rounded-xl',
                      s.emphasis ? 'bg-white/15' : 'bg-primary/10',
                    ].join(' ')}
                  >
                    <Icon
                      className={['h-6 w-6', s.emphasis ? 'text-white' : 'text-primary'].join(' ')}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p
                      className={[
                        'text-2xs font-bold uppercase tracking-[0.15em]',
                        s.emphasis ? 'text-white/70' : 'text-gray-400',
                      ].join(' ')}
                    >
                      {`0${i + 1} · ${s.phase}`}
                    </p>
                    <p className="mt-1 text-xl font-bold break-keep">{s.label}</p>
                  </div>
                  {i < 3 && (
                    <ArrowRight
                      className="absolute -right-3 top-1/2 hidden -translate-y-1/2 lg:block w-6 h-6 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-base text-gray-500 break-keep">{t.methodTagline}</p>
        </div>
      </Container>
    </Section>
  );
}
