import { Receipt, LineChart, Lock, Eye, BellRing, Zap, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Card from '@/components/ui/Card';
import IconChip from '@/components/ui/IconChip';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { type Locale } from '@/lib/i18n';
import { signature, readAlertAct, solutionTaglines } from '@/lib/brand-canon';

/**
 * ProblemBeat — the tension before the solution (home #2).
 * Gives the rest of the page stakes: the store is a stage, not a warehouse —
 * but most of what happens on it goes unseen. Pain language lifted from the
 * launch film (00:4–00:7, 01:2): POS only keeps who paid, the funnel of the
 * invisible majority who browse and leave, and the answer waiting in the space.
 * The funnel is drawn from the copy's own numbers (language-neutral, all locales).
 * Resolves into the SAAI answer (보는 AI를 넘어, 누가가 아니라 무엇을).
 */

type Pain = { icon: typeof Receipt; title: string; desc: string };
type FunnelStep = { n: string; pct: number; label: string };

const dict: Record<Locale, {
  eyebrow: string; heading: string; pains: Pain[]; bridge: string;
  funnelTitle: string; funnel: FunnelStep[]; leak: { n: string; label: string };
  methodTagline: string;
}> = {
  ko: {
    eyebrow: '무대 위를, 보고 있나요?',
    heading: '매장은 창고가 아니라 무대입니다 — 그런데 무대 위에서 무슨 일이 일어나는지, 보고 계신가요?',
    funnelTitle: '어제, 우리 매장 앞에서',
    funnel: [
      { n: '1,160', pct: 100, label: '앞을 지나감' },
      { n: '382', pct: 33, label: '매장에 입장' },
      { n: '65', pct: 6, label: '결제까지' },
    ],
    leak: { n: '317', label: '둘러보다 그냥 나간 손님 — POS엔 없습니다' },
    pains: [
      { icon: Receipt, title: 'POS엔 결제한 손님만 남습니다', desc: '어제 매장 앞을 지나간 1,160명, 들어온 382명, 결제한 65명. 둘러보다 그냥 나간 317명은 어디에도 없습니다.' },
      { icon: LineChart, title: '본 건 매출과 재고 — 거래의 결과뿐', desc: '체류도, 동선도, 손길도 — 무대 위의 경험은 POS에 남지 않습니다. 왜 안 팔렸는지는, 숫자가 말해주지 않습니다.' },
      { icon: Lock, title: 'CCTV는 흘러가고, 공간은 안 읽힙니다', desc: '답은 공간에 있는데, 손님의 얼굴을 다루는 순간 멈춥니다. 그래서 그 화면은, 흘러갈 뿐입니다.' },
    ],
    bridge: signature.ko,
    methodTagline: '보는 데서 멈추지 않습니다 — 실행까지.',
  },
  en: {
    eyebrow: 'Are you watching the stage?',
    heading: 'Your store is a stage, not a warehouse — so are you watching what happens on it?',
    funnelTitle: 'Yesterday, at your storefront',
    funnel: [
      { n: '1,160', pct: 100, label: 'walked past' },
      { n: '382', pct: 33, label: 'came inside' },
      { n: '65', pct: 6, label: 'checked out' },
    ],
    leak: { n: '317', label: 'browsed and left — nowhere in your POS' },
    pains: [
      { icon: Receipt, title: 'POS only keeps who paid', desc: '1,160 walked past your store yesterday, 382 came in, 65 checked out. The 317 who browsed and left aren’t anywhere.' },
      { icon: LineChart, title: 'You see sales and stock — outcomes, not the show', desc: 'Dwell, paths, the reach of a hand — what happens on the stage never lands in the POS. The numbers won’t tell you why it didn’t sell.' },
      { icon: Lock, title: 'CCTV just streams past — the space goes unread', desc: 'The answer is in the space, but analysis stops the moment it touches a face. So the footage only flows by.' },
    ],
    bridge: signature.en,
    methodTagline: 'We don’t stop at seeing — we act.',
  },
  jp: {
    eyebrow: '舞台の上を、見ていますか?',
    heading: '店舗は倉庫ではなく、舞台です — その舞台で何が起きているか、見ていますか?',
    funnelTitle: '昨日、店の前で',
    funnel: [
      { n: '1,160', pct: 100, label: '通り過ぎ' },
      { n: '382', pct: 33, label: '入店' },
      { n: '65', pct: 6, label: '会計まで' },
    ],
    leak: { n: '317', label: '見て回って出ていった客 — POSにいません' },
    pains: [
      { icon: Receipt, title: 'POSに残るのは、会計した客だけ', desc: '昨日、店の前を通った1,160人、入った382人、会計した65人。見て回って出ていった317人は、どこにもいません。' },
      { icon: LineChart, title: '見えるのは売上と在庫 — 取引の結果だけ', desc: '滞在も、動線も、手に取る瞬間も — 舞台の上の体験はPOSに残りません。なぜ売れなかったかは、数字では分かりません。' },
      { icon: Lock, title: 'CCTVは流れ去り、空間は読まれない', desc: '答えは空間にあるのに、客の顔に触れた瞬間に止まります。だからその映像は、ただ流れていくだけです。' },
    ],
    bridge: signature.jp,
    methodTagline: '見るだけで終わらせない — 実行まで。',
  },
};

/**
 * Read→Alert→Act method ribbon — our agentic wedge: others stop at "suggest", we act.
 * Verbs lifted from readAlertAct (읽고/알리고/실행한다 → Read/Alert/Act), step labels
 * from solutionTaglines per product (insight/care/agent). Third step (Act) emphasized.
 */
const RIBBON = [
  { key: 'insight', icon: Eye, emphasis: false },
  { key: 'care', icon: BellRing, emphasis: false },
  { key: 'agent', icon: Zap, emphasis: true },
] as const;

function methodSteps(locale: Locale) {
  const verbs = readAlertAct[locale].split(/[,.、]\s*/).filter(Boolean);
  return RIBBON.map((s, i) => ({
    ...s,
    verb: verbs[i] ?? '',
    label: solutionTaglines[s.key][locale],
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
          <p className="mb-6 text-2xs font-bold uppercase tracking-[0.2em] text-gray-400">{t.funnelTitle}</p>
          <div className="grid grid-cols-3 gap-3 sm:gap-8 items-end">
            {t.funnel.map((s, i) => (
              <div key={s.label} className="text-center">
                <div className="flex items-end justify-center h-24 sm:h-28">
                  <div
                    className="w-full rounded-t-md bg-primary"
                    style={{ height: `${Math.max(s.pct, 8)}%`, opacity: 1 - i * 0.28 }}
                  />
                </div>
                <p className="mt-3 text-2xl sm:text-4xl font-extrabold text-gray-900 tabular-nums">{s.n}</p>
                <p className="text-xs sm:text-sm text-gray-500 break-keep">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 flex items-baseline gap-2.5 border-t border-gray-100 pt-5 break-keep">
            <span className="text-2xl sm:text-3xl font-extrabold text-primary tabular-nums shrink-0">−{t.leak.n}</span>
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
        <p className="mt-10 text-xl sm:text-2xl font-bold text-gray-900 break-keep font-display">
          {t.bridge}
        </p>

        {/* Read→Alert→Act method ribbon — stakes the agentic wedge (others stop at suggest, we act) */}
        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {methodSteps(locale).map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.key} className="flex items-center gap-2 sm:gap-3">
                  <span
                    className={[
                      'inline-flex items-center gap-2 rounded-full border px-3.5 py-2',
                      s.emphasis
                        ? 'border-primary/30 bg-primary text-white shadow-card'
                        : 'border-gray-200 bg-white text-gray-700',
                    ].join(' ')}
                  >
                    <Icon
                      className={['w-4 h-4 shrink-0', s.emphasis ? 'text-white' : 'text-primary'].join(' ')}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-bold break-keep">{s.verb}</span>
                    <span
                      className={[
                        'text-2xs break-keep',
                        s.emphasis ? 'text-white/80' : 'text-gray-400',
                      ].join(' ')}
                    >
                      {s.label}
                    </span>
                  </span>
                  {i < 2 && (
                    <ArrowRight className="w-4 h-4 shrink-0 text-gray-300" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-gray-500 break-keep">{t.methodTagline}</p>
        </div>
      </Container>
    </Section>
  );
}
