'use client';

import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import { type Locale, localeHref } from '@/lib/i18n';

interface QuestionCopy {
  q: string;
  pass: string;
  fail: string;
}

interface LocaleCopy {
  eyebrow: string;
  heading: string;
  lead: string;
  passLabel: string;
  failLabel: string;
  passAria: string;
  failAria: string;
  cta: string;
  questions: QuestionCopy[];
}

const COPY: Record<Locale, LocaleCopy> = {
  ko: {
    eyebrow: '행동 강령',
    heading: '매일 호명되는 다섯 질문',
    lead: "우리가 만드는 모든 기능, 화면, 카피는 이 다섯 질문을 통과해야 합니다. 어느 하나라도 '아니오'면 그 일은 멈춥니다.",
    passLabel: '통과',
    failLabel: '탈락',
    passAria: '통과 기준',
    failAria: '탈락 기준',
    cta: '우리의 행동 강령 →',
    questions: [
      {
        q: '공간이 실제로 바뀌는 데 기여하는가?',
        pass: '매대·인력·발걸음의 변화로 이어지는 자리',
        fail: '대시보드에 카드가 한 장 더 늘어나는 자리',
      },
      {
        q: '사람의 고민을 늘리는가, 줄이는가?',
        pass: "점주가 '오늘 할 일'을 한 줄로 알아보는 자리",
        fail: "점주가 '해석해야 할 그래프'를 또 만나는 자리",
      },
      {
        q: "'왜'를 답하는가, '얼마'만 보여주는가?",
        pass: "'숫자'와 '원인'이 같은 화면에 있는 자리",
        fail: "'숫자만' — '왜 그런가'는 점주가 직접 풀어야 하는 자리",
      },
      {
        q: '동료처럼 들리는가, 감시자처럼 들리는가?',
        pass: "책임을 '공간의 상태'에 돌리고, 다음 행동을 함께 제안",
        fail: "직원 탓으로 돌리고 행동을 통보로 끝내는 알림",
      },
      {
        q: '다음 공간으로 이식될 수 있는가?',
        pass: "다른 매장·브랜드·공간으로 '라벨만 바꿔' 옮겨갈 수 있는 자리",
        fail: "이 한 매장의 사정에만 맞춘 '원셀(one-cell)' 자리",
      },
    ],
  },
  en: {
    eyebrow: 'Code of Conduct',
    heading: 'Five questions, asked every day',
    lead: "Every feature, screen, and line of copy we build must pass these five questions. If any one of them is 'no,' the work stops.",
    passLabel: 'Pass',
    failLabel: 'Fail',
    passAria: 'Passing criterion',
    failAria: 'Failing criterion',
    cta: 'Our code of conduct →',
    questions: [
      {
        q: 'Does it actually help the space change?',
        pass: 'Work that leads to changes in shelves, staffing, or foot traffic',
        fail: 'Work that just adds one more card to a dashboard',
      },
      {
        q: "Does it add to people's worries, or reduce them?",
        pass: "Where the owner reads 'today's task' in a single line",
        fail: "Where the owner meets yet another 'graph to interpret'",
      },
      {
        q: "Does it answer 'why,' or only show 'how much'?",
        pass: "Where the 'number' and the 'cause' share one screen",
        fail: "'Numbers only' — the owner must work out 'why' alone",
      },
      {
        q: 'Does it sound like a colleague, or a watchdog?',
        pass: "Attributes responsibility to 'the state of the space' and proposes the next action together",
        fail: "An alert that blames the staff and ends the action as a notice",
      },
      {
        q: 'Can it be transplanted to the next space?',
        pass: "Work you can move to another store, brand, or space by 'just changing the label'",
        fail: "A 'one-cell' fit tailored only to this single store",
      },
    ],
  },
  jp: {
    eyebrow: '行動規範',
    heading: '毎日問われる五つの質問',
    lead: 'わたしたちがつくるすべての機能・画面・コピーは、この五つの質問を通過しなければなりません。どれか一つでも「いいえ」なら、その仕事は止まります。',
    passLabel: '通過',
    failLabel: '不合格',
    passAria: '通過基準',
    failAria: '不合格基準',
    cta: '私たちの行動規範 →',
    questions: [
      {
        q: '空間が実際に変わることに貢献するか？',
        pass: '棚・人員・人の流れの変化につながる仕事',
        fail: 'ダッシュボードにカードが一枚増えるだけの仕事',
      },
      {
        q: '人の悩みを増やすか、減らすか？',
        pass: '店主が「今日やること」を一行で把握できる仕事',
        fail: '店主が「解釈すべきグラフ」にまた出会う仕事',
      },
      {
        q: '「なぜ」に答えるか、「いくら」だけを見せるか？',
        pass: '「数字」と「原因」が同じ画面にある仕事',
        fail: '「数字だけ」——「なぜそうなのか」は店主が自分で解く仕事',
      },
      {
        q: '同僚のように聞こえるか、監視者のように聞こえるか？',
        pass: '責任を「空間の状態」に向け、次の行動を共に提案する',
        fail: 'スタッフのせいにして、行動を通知で終わらせるアラート',
      },
      {
        q: '次の空間へ移植できるか？',
        pass: '別の店舗・ブランド・空間へ「ラベルを変えるだけ」で移せる仕事',
        fail: 'この一店舗の事情だけに合わせた「ワンセル（one-cell）」の仕事',
      },
    ],
  },
};

interface FiveQuestionsMockupProps {
  active?: boolean;
  locale?: Locale;
  className?: string;
}

export default function FiveQuestionsMockup({
  active = true,
  locale = 'en',
  className = '',
}: FiveQuestionsMockupProps) {
  const t = COPY[locale] ?? COPY.en;
  const reducedMotion = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const reveal = active && isVisible && !reducedMotion;

  return (
    <div
      ref={ref}
      className={`relative w-full rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 ${className}`}
    >
      <MockupBadge locale={locale} />

      <header className="mb-6 max-w-2xl">
        <SaaiHeader name="saai" tone="light" className="mb-1.5" />
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          {t.eyebrow}
        </p>
        <h2 className="mt-1.5 text-lg font-bold text-gray-900 sm:text-xl">
          {t.heading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.lead}</p>
        <a
          href={localeHref(locale, '/company')}
          className="mt-3 inline-flex items-center text-sm font-semibold text-primary underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {t.cta}
        </a>
      </header>

      <ol
        className="flex flex-col gap-4 md:grid md:grid-cols-5 md:gap-3"
        aria-label={t.heading}
      >
        {t.questions.map((item, i) => (
          <motion.li
            key={i}
            initial={reveal ? { opacity: 0, y: 16 } : false}
            animate={reveal ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
            className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:ring-1 hover:ring-primary/40 focus-within:border-primary/60"
          >
            <div className="flex items-baseline gap-2">
              <span
                aria-hidden="true"
                className="text-2xl font-extrabold leading-none text-primary"
              >
                Q{i + 1}
              </span>
            </div>

            <h3 className="mt-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-gray-900">
              {item.q}
            </h3>

            <dl className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-3">
              <div className="flex gap-2">
                <dt className="mt-0.5 shrink-0">
                  <Check
                    className="h-4 w-4 text-primary"
                    strokeWidth={3}
                    aria-label={t.passAria}
                    role="img"
                  />
                </dt>
                <dd className="text-xs leading-relaxed text-gray-700">
                  <span className="font-semibold text-primary">
                    {t.passLabel}
                  </span>{' '}
                  {item.pass}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="mt-0.5 shrink-0">
                  <X
                    className="h-4 w-4 text-gray-400"
                    strokeWidth={3}
                    aria-label={t.failAria}
                    role="img"
                  />
                </dt>
                <dd className="text-xs leading-relaxed text-gray-500">
                  <span className="font-semibold text-gray-500">
                    {t.failLabel}
                  </span>{' '}
                  {item.fail}
                </dd>
              </div>
            </dl>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
