import { CheckCircle2, Clock } from 'lucide-react';
import { type Locale } from '@/lib/i18n';

/**
 * AdoptionJourney — 도입 프로세스 3스텝 "파일럿 → 검증 → 전 지점 확산" (①1-2 · MASTER 레인 D).
 * 구 "발견에서 재측정까지, 다섯 단계"(무관 지표 5종 나열)를 대체 — 본사 관점의
 * 안심 단계(④): 각 스텝은 기간 + 리스크 해소 한 줄을 함께 보여 도입 부담을 낮춘다.
 * 기간은 대표 예시 각주로 과장 방지(§5-4).
 */

const STEP_KEYS = ['pilot', 'validate', 'rollout'] as const;
type StepKey = (typeof STEP_KEYS)[number];

type StepCopy = { title: string; period: string; body: string; risk: string };
const L: Record<Locale, {
  eyebrow: string;
  heading: string;
  note: string;
  labels: Record<StepKey, StepCopy>;
}> = {
  ko: {
    eyebrow: '도입 프로세스',
    heading: '파일럿에서 전 지점까지, 세 단계',
    note: '* 기간은 대표 예시 — 매장 수와 현장 조건에 따라 달라집니다.',
    labels: {
      pilot: {
        title: '파일럿',
        period: '2~4주',
        body: '매장 1~3곳에서, 이미 달린 CCTV 그대로 시작합니다.',
        risk: '신규 장비·초기 비용 부담 없음',
      },
      validate: {
        title: '검증',
        period: '4~8주',
        body: 'KPI 기준선을 잡고 개선 효과를 수치로 확인합니다.',
        risk: '효과가 없으면 여기서 멈추면 됩니다',
      },
      rollout: {
        title: '전 지점 확산',
        period: '본사 일정에 맞춰',
        body: '검증된 운영 기준을 전 지점에 같은 방식으로 복제합니다.',
        risk: '지점별 편차 없이 같은 기준으로 표준화',
      },
    },
  },
  en: {
    eyebrow: 'Adoption process',
    heading: 'Three steps, from pilot to every store',
    note: '* Durations are illustrative — they vary with store count and site conditions.',
    labels: {
      pilot: {
        title: 'Pilot',
        period: '2–4 weeks',
        body: 'Start in 1–3 stores, on the CCTV you already have.',
        risk: 'No new hardware, no upfront burden',
      },
      validate: {
        title: 'Validate',
        period: '4–8 weeks',
        body: 'Set a KPI baseline and confirm the improvement in numbers.',
        risk: 'If it does not work, you can stop right here',
      },
      rollout: {
        title: 'Roll out',
        period: 'On your HQ schedule',
        body: 'Replicate the validated standard across every store, the same way.',
        risk: 'Standardized without per-store variance',
      },
    },
  },
  jp: {
    eyebrow: '導入プロセス',
    heading: 'パイロットから全店舗まで、3つのステップ',
    note: '* 期間は代表例 — 店舗数や現場条件により異なります。',
    labels: {
      pilot: {
        title: 'パイロット',
        period: '2〜4週間',
        body: '1〜3店舗で、すでにあるCCTVのまま始めます。',
        risk: '新規機器・初期費用の負担なし',
      },
      validate: {
        title: '検証',
        period: '4〜8週間',
        body: 'KPIのベースラインを定め、改善効果を数値で確認します。',
        risk: '効果がなければ、ここで止めて構いません',
      },
      rollout: {
        title: '全店舗展開',
        period: '本部のスケジュールに合わせて',
        body: '検証済みの運営基準を、全店舗に同じ方法で複製します。',
        risk: '店舗ごとのバラつきなく標準化',
      },
    },
  },
};

export default function AdoptionJourney({ locale }: { locale: Locale }) {
  const t = L[locale];
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 text-center">
        <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.eyebrow}</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep">{t.heading}</h2>
      </div>

      <ol className="grid gap-4 sm:grid-cols-3">
        {STEP_KEYS.map((key, i) => {
          const step = t.labels[key];
          return (
            <li key={key} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-card">
              <span className="text-3xl font-bold text-primary/20 tabular-nums leading-none">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-2 text-lg font-bold text-gray-900 break-keep">{step.title}</p>
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
                <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {step.period}
              </p>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed break-keep">{step.body}</p>
              <p className="mt-auto pt-4 inline-flex items-start gap-1.5 text-xs font-medium text-emerald-700 break-keep">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                {step.risk}
              </p>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-center text-xs text-gray-400">{t.note}</p>
    </div>
  );
}
