'use client';

import { Send, Bot, Sparkles, CloudRain, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSequencedLoop } from '@/hooks/useSequencedLoop';
import { AnimatePresence, motion } from 'framer-motion';
import TapIndicator from '@/components/ui/TapIndicator';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import MockupViewport from './MockupViewport';
import { motionEnter, motionAffordance } from '@/lib/mockup-motion';
import { MOCKUP_SCHEME, PRODUCT_THEME, MOCKUP_DEVICE } from '@/lib/mockup-tokens';

const S = MOCKUP_SCHEME.light;
const P = PRODUCT_THEME.StoreAgent;
const D = MOCKUP_DEVICE.phone;
import {
  chatScenarios as scenariosData,
  CHAT_INTERVAL_MS as INTERVAL_MS,
  CHAT_PAUSE_MS as PAUSE_MS,
} from '@/data/mockup-scenarios/storeagent';
import { type Locale } from '@/lib/i18n';
import { getChatI18n } from '@/data/storeagent-mock-i18n';

const chatIconMap: Record<string, LucideIcon> = {
  CloudRain, ShoppingCart, TrendingUp, Users,
};

/** 내보내는 이유: 호출부가 `scenarios` 오버라이드 prop을 만들 때 이 타입이 필요하다. */
export interface ChatMessage {
  role: 'ai' | 'user';
  text: string;
  time: string;
  action?: { icon: LucideIcon; label: string; color: string };
  stats?: { label: string; value: string; sub?: string; up?: boolean }[];
}

/** Merge structural data (icon/color/role/up) with localized strings by index. */
function buildScenarios(locale: Locale): ChatMessage[][] {
  const t = getChatI18n(locale);
  return scenariosData.map((scenario, si) =>
    scenario.map((msg, mi): ChatMessage => {
      const loc = t.scenarios[si]?.[mi];
      return {
        role: msg.role,
        text: loc?.text ?? msg.text,
        time: loc?.time ?? msg.time,
        action: msg.action
          ? {
              icon: chatIconMap[msg.action.iconKey] ?? CloudRain,
              label: loc?.actionLabel ?? msg.action.label,
              color: msg.action.color,
            }
          : undefined,
        stats: msg.stats
          ? msg.stats.map((s, k) => ({
              label: loc?.stats?.[k]?.label ?? s.label,
              value: loc?.stats?.[k]?.value ?? s.value,
              sub: loc?.stats?.[k]?.sub ?? s.sub,
              up: s.up,
            }))
          : undefined,
      };
    }),
  );
}

interface ChatMockupProps {
  active?: boolean;
  storeName?: string;
  locale?: Locale;
  /**
   * 페이지별 시나리오 오버라이드 (콘텐츠 재사용 규약 — docs/MOCKUP_SYSTEM_GUIDE.md).
   * 생략하면 data/mockup-scenarios/storeagent.ts + storeagent-mock-i18n.ts에서 파생한
   * 기본 시나리오를 그대로 쓴다. 다른 페이지에서 다른 대화 내용을 보여줘야 할 때,
   * 컴포넌트 파일을 복제하지 말고 이 prop으로 주입한다. 시나리오는 통째로 교체되며
   * (부분 병합 아님), 최소 1개 이상의 메시지 배열을 담아야 한다.
   */
  scenarios?: ChatMessage[][];
}

export default function ChatMockup({
  active = true,
  storeName,
  locale = 'en',
  scenarios: scenariosOverride,
}: ChatMockupProps) {
  const reducedMotion = usePrefersReducedMotion();
  const t = getChatI18n(locale);
  const scenarios = useMemo(
    () => scenariosOverride ?? buildScenarios(locale),
    [locale, scenariosOverride],
  );
  const resolvedStoreName = storeName ?? t.storeName;
  const [visibleCount, setVisibleCount] = useState(0);
  const [loopKey, setLoopKey] = useState(0);
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [inputText, setInputText] = useState(''); // text being "typed" into the input for a user turn
  const [sendPress, setSendPress] = useState(false); // triggers send-button press + tap indicator
  const scenarioIdxRef = useRef(-1); // tracks next scenario idx inside runLoop
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  // One pass of the conversation: a localized scenario plays out message by message,
  // user turns simulating typing → send-press → bubble. Timer/cancel/visibility/loop
  // scaffolding lives in useSequencedLoop; this just schedules the steps.
  useSequencedLoop(
    (sched) => {
      const EXIT_MS = 320;
      // User-turn typing simulation timing (deterministic, SSR-safe).
      const TYPE_CHAR_MS = 38;   // per-character interval while "typing" into the input
      const TYPE_MAX_MS = 1500;  // cap on total typing time for long messages
      const SEND_PRESS_MS = 260; // send-button press + tap indicator duration

      setVisibleCount(0);
      setInputText('');
      setSendPress(false);

      // Pick next scenario
      const nextIdx = (scenarioIdxRef.current + 1) % scenarios.length;
      const messages = scenarios[nextIdx];

      sched(() => {
        scenarioIdxRef.current = nextIdx;
        setScenarioIdx(nextIdx);
        setLoopKey(k => k + 1);
      }, EXIT_MS);

      // Sequentially schedule each message. User messages get an
      // input-typing → send-press → bubble sequence; AI messages keep the
      // typing-dot gap (the delay between visibleCount increments).
      let cursor = EXIT_MS;
      messages.forEach((msg, i) => {
        if (msg.role === 'user') {
          const text = msg.text;
          const perChar = Math.min(TYPE_CHAR_MS, Math.max(1, Math.floor(TYPE_MAX_MS / Math.max(1, text.length))));
          const typeStart = cursor + INTERVAL_MS;
          // Type the text into the input field character-by-character.
          for (let c = 1; c <= text.length; c++) {
            const slice = text.slice(0, c);
            sched(() => setInputText(slice), typeStart + c * perChar);
          }
          const typeEnd = typeStart + text.length * perChar;
          // Press the send button (tap indicator + whileTap animation).
          sched(() => setSendPress(true), typeEnd);
          // Clear the input, release the press, and reveal the user bubble.
          sched(() => {
            setInputText('');
            setSendPress(false);
            setVisibleCount(i + 1);
          }, typeEnd + SEND_PRESS_MS);
          cursor = typeEnd + SEND_PRESS_MS;
        } else {
          // AI message: reveal after the typing-dot gap.
          sched(() => setVisibleCount(i + 1), cursor + INTERVAL_MS);
          cursor += INTERVAL_MS;
        }
      });

      return cursor;
    },
    {
      active: active && isVisible,
      reducedMotion,
      onStatic: () => setVisibleCount(scenarios[0].length),
      pauseMs: PAUSE_MS,
      deps: [scenarios],
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

  const currentMessages = scenarios[scenarioIdx];

  return (
    // Phase 0 레퍼런스 마이그레이션(MM 0-5): MockupViewport 크기 계약 + SAAI 토큰
    // (--saai-* 변수, Viewport의 .saai-scope에서 해석) + mockup-motion(no spring).
    <div ref={containerRef}>
    <MockupViewport design="phone">
    <PhoneFrame>
    <PhoneScreen statusBarBg="bg-white" homeBg="bg-white">

      {/* Chat Header */}
      <div className={`shrink-0 ${S.headerBg} ${D.headerPadding} border-b-2 ${P.headerBorder}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-lighter rounded-full flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`${S.textPrimary} ${D.headerTitle} flex items-center gap-1.5`}>
              {t.assistant}
              <Sparkles className="w-3.5 h-3.5 text-(--saai-status-warning)" aria-hidden="true" />
            </h3>
            <p className={`${S.textSecondary} ${D.headerSub}`}>
              {`${resolvedStoreName} · ${[t.subBriefing, t.subPeak, t.subEvening][scenarioIdx] ?? t.subBriefing}`}
            </p>
          </div>
          <div className="w-2 h-2 bg-(--saai-status-success) rounded-full animate-pulse motion-reduce:animate-none shrink-0" aria-hidden="true" />
        </div>
      </div>

      {/* Chat Messages — D9: flex-col + mt-auto 스페이서로 대화가 입력바에 하단 고정
          (실제 메신저 동작). overflow 시에도 상단 스크롤 접근이 유지되는 안전 패턴. */}
      <div ref={scrollRef} className={`flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-3 ${S.bodyBg}`} aria-hidden="true">
        <div className="mt-auto" aria-hidden="true" />
        <AnimatePresence initial={false}>
          {currentMessages.slice(0, visibleCount).map((msg, i) => {
            const isUser = msg.role === 'user';
            return (
              <motion.div
                key={`${loopKey}-${i}`}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
                transition={motionEnter}
              >
                <div className="max-w-[85%]">
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    isUser
                      ? 'bg-(--saai-primary) text-(--saai-on-primary) rounded-br-md'
                      : 'bg-(--saai-bg-app) border border-(--saai-border-subtle) text-(--saai-fg-primary) rounded-bl-md shadow-card'
                  }`}>
                    {msg.text}
                    {/* Inline stats (AI messages only) */}
                    {!isUser && msg.stats && (
                      <div className={`mt-2 grid gap-2 ${
                        msg.stats.length === 1 ? 'grid-cols-1' :
                        msg.stats.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                      }`}>
                        {msg.stats.map((s) => (
                          <div key={s.label} className="bg-gray-50 rounded-lg p-1.5 border border-gray-100">
                            <p className="text-3xs text-gray-500 mb-0.5 leading-tight">{s.label}</p>
                            <p className="text-xs font-bold text-gray-900 tabular-nums leading-tight">{s.value}</p>
                            {s.sub && (
                              <p className={`text-3xs font-medium leading-tight ${
                                s.up === true ? 'text-(--saai-chart-positive)' : s.up === false ? 'text-(--saai-chart-negative)' : 'text-gray-500'
                              }`}>{s.sub}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {'action' in msg && msg.action && (
                    <div className="mt-1.5 flex gap-1.5">
                      <button type="button" tabIndex={-1} className={`inline-flex items-center gap-1 px-3 py-1.5 text-white text-xs font-medium rounded-lg ${msg.action.color}`}>
                        <msg.action.icon className="w-3 h-3" aria-hidden="true" />
                        {msg.action.label}
                      </button>
                      <button type="button" tabIndex={-1} className="px-3 py-1.5 text-gray-500 text-xs font-medium rounded-lg border border-gray-200 bg-white">
                        {t.later}
                      </button>
                    </div>
                  )}
                  <p className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : ''}`}>
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing indicator — only before an AI message (user turns type into the input instead) */}
        <AnimatePresence>
          {active && visibleCount > 0 && visibleCount < currentMessages.length &&
            currentMessages[visibleCount]?.role === 'ai' && inputText === '' && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={motionEnter}
            >
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-card">
                <div className="flex gap-1 items-center h-4">
                  {[0, 0.16, 0.32].map((delay, i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block"
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

      {/* Input Area */}
      <div className="shrink-0 bg-white border-t border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className={`flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm min-w-0 truncate ${
            inputText ? 'text-gray-800' : 'text-gray-500'
          }`}>
            {inputText
              ? <>{inputText}<span className="inline-block w-px h-3.5 align-middle bg-gray-400 ml-0.5 animate-pulse motion-reduce:animate-none" aria-hidden="true" /></>
              : t.inputPlaceholder}
          </div>
          <div className="relative shrink-0">
            <TapIndicator visible={sendPress} x={50} y={50} size={36} />
            <motion.button
              type="button"
              tabIndex={-1}
              aria-label={t.sendLabel}
              className="w-9 h-9 bg-(--saai-primary) rounded-full flex items-center justify-center"
              animate={sendPress ? { scale: 0.88 } : { scale: 1 }}
              whileTap={{ scale: 0.88 }}
              transition={motionAffordance}
            >
              <Send className="w-4 h-4 text-white" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>

    </PhoneScreen>
    </PhoneFrame>
    </MockupViewport>
    </div>
  );
}
