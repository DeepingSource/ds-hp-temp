'use client';

import { Bot } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSequencedLoop } from '@/hooks/useSequencedLoop';
import { AnimatePresence, motion } from 'framer-motion';
import BrowserChrome from './BrowserChrome';
import MockupViewport from './MockupViewport';
import MockupReplayButton from '@/components/ui/MockupReplayButton';
import { motionEnter } from '@/lib/mockup-motion';
import { type Locale } from '@/lib/i18n';

/**
 * GenericAiMockup — 홈 비교 섹션 좌측 "범용 AI" 데모.
 *
 * "같은 질문, 다른 대답": 우측 SAAI(StoreInsightMockup)와 같은 피크타임 질문을
 * 받지만, 매장을 볼 수 없어 일반론만 답하는 데스크톱 챗봇 창. 대비 축 3가지 —
 * ① 데이터 없음 vs 실데이터 ② 일반론 vs 오늘의 행동 ③ 액션 버튼 없음 vs 실행 버튼.
 *
 * 비주얼 규약(홈 랜딩 정제계획 §3-2): PhoneFrame을 쓰지 않는다(SAAI 폰과 실루엣
 * 분리). 의도적으로 브랜드 블루·퍼플을 배제한 무채색 slate 팔레트 — "범용"의
 * 익명성 연출이므로 --saai-* 토큰 대신 slate를 직접 쓴다(D2 색 계약의 의도적 예외).
 *
 * 크기 계약(§v2-2): MockupViewport design="card"(480 고정 설계 캔버스) 래핑.
 *
 * 모션 정책(§4): 뷰포트 50% 진입 시 1회 재생 → 최종 프레임(두 답변 모두 노출)
 * 정지 + ↻ 재생 버튼. reduced-motion은 최종 프레임 정적 표시.
 */

interface GenericAiMessage {
  role: 'user' | 'ai';
  text: string;
}

interface GenericAiCopy {
  header: string;
  inputPlaceholder: string;
  messages: GenericAiMessage[];
}

const COPY: Record<Locale, GenericAiCopy> = {
  ko: {
    header: '범용 AI 챗봇',
    inputPlaceholder: '메시지를 입력하세요…',
    messages: [
      { role: 'user', text: '우리 매장 지금 피크타임인데 계산 대기가 너무 길어. 어떻게 해?' },
      {
        role: 'ai',
        text: '죄송하지만 매장의 실시간 상황은 확인할 수 없습니다. 일반적으로 대기 시간이 길 경우 ① 계산대 추가 오픈 ② 직원 재배치 ③ 셀프계산대 도입을 고려해 보세요.',
      },
      { role: 'user', text: '그래서 지금 몇 명 대기 중인데?' },
      {
        role: 'ai',
        text: '실시간 매장 데이터에 접근할 수 없어 답변드릴 수 없습니다. POS나 CCTV 시스템을 직접 확인해 주세요.',
      },
    ],
  },
  en: {
    header: 'Generic AI chatbot',
    inputPlaceholder: 'Type a message…',
    messages: [
      { role: 'user', text: "It's peak time and the checkout line is way too long. What should I do?" },
      {
        role: 'ai',
        text: "I'm sorry, but I can't see your store's real-time situation. In general, when waits get long you could consider ① opening another register ② reassigning staff ③ adding self-checkout.",
      },
      { role: 'user', text: 'So how many people are waiting right now?' },
      {
        role: 'ai',
        text: "I don't have access to live store data, so I can't answer that. Please check your POS or CCTV directly.",
      },
    ],
  },
  jp: {
    header: '汎用AIチャットボット',
    inputPlaceholder: 'メッセージを入力…',
    messages: [
      { role: 'user', text: '今ピークタイムでレジ待ちが長すぎる。どうすればいい？' },
      {
        role: 'ai',
        text: '申し訳ありませんが、店舗のリアルタイムの状況は確認できません。一般的に待ち時間が長い場合は、①レジの追加オープン ②スタッフの再配置 ③セルフレジの導入をご検討ください。',
      },
      { role: 'user', text: 'それで、今何人待っているの？' },
      {
        role: 'ai',
        text: 'リアルタイムの店舗データにアクセスできないため、お答えできません。POSやCCTVシステムを直接ご確認ください。',
      },
    ],
  },
};

// 메시지 리듬 (ms) — 총 4메시지 1패스 ≈ 7초
const FIRST_DELAY_MS = 600; // 진입 후 첫 유저 버블까지
const USER_GAP_MS = 1500; // AI 답변 후 다음 유저 버블까지
const AI_GAP_MS = 1900; // 유저 버블 후 AI 답변까지 (타이핑 인디케이터 구간)
const SETTLE_MS = 900; // 마지막 답변 후 정지 프레임 확정까지

interface GenericAiMockupProps {
  active?: boolean;
  locale?: Locale;
  /** 1회 재생이 끝났을 때 호출 — 비교 섹션의 순차 재생(좌 → 우) 체이닝용 */
  onComplete?: () => void;
}

export default function GenericAiMockup({
  active = true,
  locale = 'ko',
  onComplete,
}: GenericAiMockupProps) {
  const reducedMotion = usePrefersReducedMotion();
  const t = COPY[locale];
  const messages = t.messages;
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  // safetyNet: false — 1회 재생 게이트라 실제 뷰포트 진입만 신호로 쓴다
  // (기본 3초 폴백이 켜져 있으면 화면 밖에서 재생이 소진됨)
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.5, safetyNet: false });

  useSequencedLoop(
    (sched) => {
      setVisibleCount(0);
      setDone(false);

      let cursor = FIRST_DELAY_MS;
      messages.forEach((msg, i) => {
        if (i > 0) cursor += msg.role === 'ai' ? AI_GAP_MS : USER_GAP_MS;
        sched(() => setVisibleCount(i + 1), cursor);
      });

      return cursor + SETTLE_MS;
    },
    {
      active: active && isVisible,
      reducedMotion,
      onStatic: () => {
        // reduced-motion: 최종 프레임 정적 표시 — 순차 재생 체인도 즉시 완료 처리
        setVisibleCount(messages.length);
        setDone(true);
        onComplete?.();
      },
      once: true,
      onComplete: () => {
        setDone(true);
        onComplete?.();
      },
      deps: [messages, replayKey],
    },
  );

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (visibleCount === 0) {
      el.scrollTop = 0;
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [visibleCount]);

  const replay = () => setReplayKey((k) => k + 1);

  return (
    <div ref={containerRef}>
    <MockupViewport design="card">
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <BrowserChrome variant="light" size="sm">
        <Bot className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
        {t.header}
      </BrowserChrome>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="h-[340px] space-y-3 overflow-y-auto bg-slate-50 p-4"
        aria-hidden="true"
      >
        <AnimatePresence initial={false}>
          {messages.slice(0, visibleCount).map((msg, i) => {
            const isUser = msg.role === 'user';
            return (
              <motion.div
                key={`${replayKey}-${i}`}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, scale: 0.88, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={motionEnter}
                style={{ transformOrigin: isUser ? 'bottom right' : 'bottom left' }}
              >
                {!isUser && (
                  <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center self-end rounded-full bg-slate-200">
                    <Bot className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    isUser
                      ? 'rounded-br-md bg-slate-700 text-white'
                      : 'rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-card'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing indicator — AI 답변 대기 구간에만 */}
        <AnimatePresence>
          {!done && visibleCount > 0 && visibleCount < messages.length &&
            messages[visibleCount]?.role === 'ai' && (
            <motion.div
              className="flex justify-start pl-9"
              initial={{ opacity: 0, scale: 0.8, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 4 }}
              transition={motionEnter}
              style={{ transformOrigin: 'bottom left' }}
            >
              <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-2.5 shadow-card">
                <div className="flex h-4 items-center gap-1">
                  {[0, 0.16, 0.32].map((delay, i) => (
                    <motion.span
                      key={i}
                      className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.65,
                        repeat: Infinity,
                        delay,
                        ease: [0.45, 0, 0.55, 1],
                        repeatDelay: 0.12,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input strip — 정적 (범용 AI 쪽은 실행 버튼이 없다는 대비의 일부) */}
      <div className="border-t border-slate-200 bg-white px-4 py-3">
        <div className="rounded-full bg-slate-100 px-4 py-2.5 text-sm text-slate-400">
          {t.inputPlaceholder}
        </div>
      </div>

      {done && !reducedMotion && (
        <MockupReplayButton locale={locale} onReplay={replay} className="bottom-[4.25rem]" />
      )}
    </div>
    </MockupViewport>
    </div>
  );
}
