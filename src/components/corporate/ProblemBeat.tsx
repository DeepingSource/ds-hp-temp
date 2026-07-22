'use client';

import { Receipt, LineChart, Lock, Eye, BellRing, RefreshCw, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Card from '@/components/ui/Card';
import IconChip from '@/components/ui/IconChip';
import { CountUp } from '@/components/ui/CountUp';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { type Locale } from '@/lib/i18n';
import { signature, operatingLoop } from '@/lib/brand-canon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

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
  posTag: string; legendInvisible: string; legendPos: string; funnelAria: string;
}> = {
  ko: {
    eyebrow: '공간 최적화의 첫 걸음 · 보이지 않는 다수',
    heading: '어제 들어온 손님 10명 중 8명은, 결제 없이 나갑니다 — 어디서 놓쳤을까요?',
    posTag: 'POS 기록',
    legendInvisible: '보이지 않음',
    legendPos: 'POS 기록',
    funnelAria: '어제 입장 382명 중 결제까지 17%만 도달한 전환 퍼널',
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
      { icon: Receipt, title: 'POS엔 결제한 손님만 남습니다', desc: '무엇이 팔렸는지는 알아도, 왜 안 팔렸는지는 모릅니다.' },
      { icon: Lock, title: 'CCTV는 쌓여도, 읽히지 않습니다', desc: '답은 매장 안 행동에 있는데, 얼굴이 걸리는 순간 분석이 멈춥니다.' },
      { icon: LineChart, title: '매장이 100개면, 편차도 100개', desc: '본사는 어디서 새는지 모릅니다 — 잘되는 매장의 이유도, 안되는 매장의 원인도 한 화면에 없으니까요.' },
    ],
    bridge: signature.ko,
    methodTagline: '보는 데서 멈추지 않습니다 — 실행까지.',
  },
  en: {
    eyebrow: 'The invisible majority',
    heading: 'Of every 10 who came in yesterday, 8 left without paying — where did you lose them?',
    posTag: 'In POS',
    legendInvisible: 'Invisible',
    legendPos: 'In POS',
    funnelAria: 'Yesterday: of 382 who entered, only 17% reached checkout',
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
      { icon: Receipt, title: 'Your POS keeps only the shoppers who paid', desc: 'It shows what sold — never why the rest didn’t.' },
      { icon: Lock, title: 'CCTV piles up, but goes unread', desc: 'The answer is in what happens on your floor — yet analysis stops the moment a face is involved.' },
      { icon: LineChart, title: '100 stores mean 100 variances', desc: 'HQ can’t tell where it leaks — neither why the best store works nor why the worst doesn’t is on one screen.' },
    ],
    bridge: signature.en,
    methodTagline: 'We don’t stop at seeing — we act.',
  },
  jp: {
    eyebrow: '見えない多数',
    heading: '昨日入った10人のうち8人は、決済せずに出ていきます — どこで取りこぼしたのでしょう?',
    posTag: 'POS記録',
    legendInvisible: '見えない',
    legendPos: 'POS記録',
    funnelAria: '昨日入店382人のうち会計まで到達した転換ファネル',
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
      { icon: Receipt, title: 'POSには決済した客しか残りません', desc: '何が売れたかは分かっても、なぜ売れなかったかは分かりません。' },
      { icon: Lock, title: 'CCTVは溜まっても、読み解かれません', desc: '答えは店内の行動にあるのに、顔が関わった瞬間に分析が止まります。' },
      { icon: LineChart, title: '店舗が100あれば、ばらつきも100', desc: '本部はどこで漏れているか分かりません — 良い店舗の理由も、悪い店舗の原因も、ひとつの画面にないからです。' },
    ],
    bridge: signature.jp,
    methodTagline: '見るだけで終わらせない — 実行まで。',
  },
};

/**
 * Operating-loop ribbon — Analyze · Detect · Act · Learn (제품체계 재설계 v1 · A4).
 * The agentic wedge: others stop at seeing; we close the loop and learn.
 * label + time-phase from operatingLoop; last step (Learn) emphasized.
 */
// Order follows operatingLoop (insight·care·agent·learn) so each mode keeps its icon:
// insight=LineChart(분석) · care=Eye(감지) · agent=BellRing(실행) · learn=RefreshCw(학습).
const LOOP_ICONS = [LineChart, Eye, BellRing, RefreshCw] as const;

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
  const { ref: funnelRef, isVisible: barsShow } = useScrollAnimation<HTMLUListElement>({ threshold: 0.4 });
  const { ref: loopRef, isVisible: loopShow } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  return (
    <Section variant="alt">
      <Container>
        <div className="mb-10 max-w-3xl">
          <Eyebrow tone="primary" className="mb-3">{t.eyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display">{t.heading}</h2>
        </div>

        {/* Evidence band — funnel (the invisible majority) beside its consequence (−317 + why POS can't tell you) */}
        <StaggerContainer className="grid gap-6 lg:grid-cols-12 items-stretch">
          {/* LEFT — funnel hero: horizontal bars narrowing top→bottom; the last row is the only one POS keeps */}
          <StaggerItem className="lg:col-span-7 flex">
            <Card className="p-6 sm:p-8 flex flex-1 flex-col justify-center">
              <div className="mb-5 flex items-center justify-between gap-3">
                <p className="text-2xs font-bold uppercase tracking-[0.2em] text-gray-500">{t.funnelTitle}</p>
                <div className="flex items-center gap-3 text-2xs text-gray-400">
                  <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary/20" aria-hidden="true" />{t.legendInvisible}</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary" aria-hidden="true" />{t.legendPos}</span>
                </div>
              </div>
              <ul ref={funnelRef} className="space-y-2" aria-label={t.funnelAria}>
                {t.funnel.map((s, i) => {
                  const paid = i === t.funnel.length - 1;
                  return (
                    <li key={s.label} className="flex items-center gap-3 sm:gap-4">
                      <span className="w-9 sm:w-12 shrink-0 text-right text-base sm:text-lg font-bold text-gray-900 tabular-nums">
                        <CountUp to={Number(s.n)} />
                      </span>
                      <span className="w-12 sm:w-16 shrink-0 text-2xs sm:text-xs text-gray-500 break-keep leading-tight">{s.label}</span>
                      <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-gray-100">
                        <div
                          className={`absolute inset-y-0 left-0 origin-left rounded-md ${paid ? 'bg-primary' : 'bg-primary/20'}`}
                          style={{
                            width: `${Math.max(s.pct, 6)}%`,
                            transform: barsShow ? 'scaleX(1)' : 'scaleX(0)',
                            transition: reduced ? undefined : 'transform 0.5s var(--ease-out-cubic)',
                            transitionDelay: reduced ? undefined : `${0.1 + i * 0.08}s`,
                          }}
                        />
                        {paid && <span className="absolute inset-y-0 right-2 flex items-center text-2xs font-bold text-primary">{t.posTag}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </StaggerItem>

          {/* RIGHT — consequence: the −317 leak + the 3 reasons POS can't tell you */}
          <StaggerItem className="lg:col-span-5">
            <div className="rounded-2xl border border-primary/15 bg-primary-lighter/50 p-6">
              <p className="text-5xl font-bold text-primary tabular-nums leading-none">−<CountUp to={Number(t.leak.n)} /></p>
              <p className="mt-3 text-sm text-gray-700 break-keep leading-relaxed">{t.leak.label}</p>
            </div>
            <ul className="mt-5 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
              {t.pains.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.title} className="flex gap-4 p-5">
                    <IconChip size="sm">
                      <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                    </IconChip>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 break-keep">{p.title}</h3>
                      <p className="mt-1 text-xs text-gray-500 leading-relaxed break-keep">{p.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </StaggerItem>
        </StaggerContainer>
        <p className="mt-10 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 break-keep font-display tracking-tight">
          {t.bridge}
        </p>

        {/* Operating loop — Analyze·Detect·Act·Learn (close the loop, then learn) */}
        <div className="mt-8">
          <div ref={loopRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
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
                  style={{
                    opacity: loopShow ? 1 : 0,
                    transform: loopShow ? 'translateX(0)' : 'translateX(-12px)',
                    transition: reduced ? undefined : 'opacity 0.5s var(--ease-out-cubic), transform 0.5s var(--ease-out-cubic)',
                    transitionDelay: reduced ? undefined : `${i * 0.12}s`,
                  }}
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
                      style={{
                        opacity: loopShow ? 1 : 0,
                        transition: reduced ? undefined : 'opacity 0.4s var(--ease-out-cubic)',
                        transitionDelay: reduced ? undefined : `${i * 0.12 + 0.32}s`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-700 break-keep">
              💡 <strong>리테일·F&B·무인매장·대형 공간</strong> 등 업종별 실제 공간 최적화 유스케이스가 준비되어 있습니다.
            </p>
            <a href={`/${locale === 'en' ? '' : locale + '/'}solutions`} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline shrink-0">
              업종별 유스케이스 보기 →
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
