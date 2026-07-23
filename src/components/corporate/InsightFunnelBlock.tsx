'use client';

import { Receipt, LineChart, Lock } from 'lucide-react';
import Card from '@/components/ui/Card';
import IconChip from '@/components/ui/IconChip';
import { CountUp } from '@/components/ui/CountUp';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { type Locale } from '@/lib/i18n';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * InsightFunnelBlock — 홈 ProblemBeat에서 이식한 매장 전체 퍼널 증거 블록
 * (홈 정제계획 §8-2 · C2: 콘텐츠 폐기가 아니라 자산 재배치).
 * 어제 하루 입장 382 → 결제 65의 단계 이탈과, POS엔 없는 −317의 행동,
 * 그리고 그 이유 3가지(POS·CCTV·본사 편차). saai insight 페이지 Beat 4 소속 —
 * 숫자 세계관은 Beat 4 kpis(지나감 1,160 · 입장 382 · 체류 317 · 결제 65)와 동일.
 */

type Pain = { icon: typeof Receipt; title: string; desc: string };
type FunnelStep = { n: string; pct: number; label: string };

const dict: Record<Locale, {
  funnelTitle: string; funnel: FunnelStep[]; leak: { n: string; label: string };
  pains: Pain[];
  posTag: string; legendInvisible: string; legendPos: string; funnelAria: string;
}> = {
  ko: {
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
  },
  en: {
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
  },
  jp: {
    posTag: 'POS記録',
    legendInvisible: '見えない',
    legendPos: 'POS記録',
    funnelAria: '昨日入店382人のうち会計まで到達した転換ファネル',
    funnelTitle: '昨日, 店内で',
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
      { icon: Receipt, title: 'POSには決済した客しか残りません', desc: '何が売れたかは分かっても, なぜ売れなかったかは分かりません。' },
      { icon: Lock, title: 'CCTVは溜まっても, 読み解かれません', desc: '答えは店内の行動にあるのに、顔が関わった瞬間に分析が止まります。' },
      { icon: LineChart, title: '店舗が100あれば、ばらつきも100', desc: '本部はどこで漏れているか分かりません — 良い店舗の理由も、悪い店舗の原因も、ひとつの画面にないからです。' },
    ],
  },
};

export default function InsightFunnelBlock({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const { ref: funnelRef, isVisible: barsShow } = useScrollAnimation<HTMLUListElement>({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  return (
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

      {/* RIGHT — the −317 consequence + why POS/CCTV/HQ can't tell you */}
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
  );
}
