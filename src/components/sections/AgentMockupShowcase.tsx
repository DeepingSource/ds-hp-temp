'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Bell, ClipboardCheck, CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import ChatMockup from '@/components/mockups/ChatMockup';
import PushNotificationMockup from '@/components/mockups/PushNotificationMockup';
import ActionCardMockup from '@/components/mockups/ActionCardMockup';
import { springGentle } from '@/lib/spring-config';
import SlidingIndicator from '@/components/ui/SlidingIndicator';
import { type Locale } from '@/lib/i18n';
import { showcaseCopy } from '@/data/storeagent-mock-i18n';

type TabKey = 'action' | 'chat' | 'push';

const TAB_ICONS: Record<TabKey, typeof ClipboardCheck> = {
  action: ClipboardCheck,
  chat: MessageCircle,
  push: Bell,
};

const TAB_MOCKUPS: Record<TabKey, React.ComponentType<{ active: boolean; locale?: Locale }>> = {
  action: ActionCardMockup,
  chat: ChatMockup,
  push: PushNotificationMockup,
};

export default function AgentMockupShowcase({ locale = 'en' }: { locale?: Locale }) {
  const c = showcaseCopy[locale] ?? showcaseCopy.en;
  const tabs = c.tabs;
  const [activeTab, setActiveTab] = useState<TabKey>('action');
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const reducedMotion = usePrefersReducedMotion();

  const handleTabKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % tabs.length;
      setActiveTab(tabs[next].key);
      (e.currentTarget.parentElement?.children[next] as HTMLElement)?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prev].key);
      (e.currentTarget.parentElement?.children[prev] as HTMLElement)?.focus();
    }
  }, [tabs]);

  return (
    <section ref={ref} className="py-14 lg:py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* 섹션 헤더 — 웹앱(위)의 모바일 보조 뷰라 비중 축소 */}
        <div className={`text-center mb-10 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{c.eyebrow}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">
            {c.heading}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {c.sub}
          </p>
        </div>

        <div className={`flex flex-col lg:flex-row gap-6 lg:gap-10 ${isVisible ? 'scroll-visible delay-200' : 'scroll-hidden'}`}>

          {/* ── 왼쪽: 탭 선택 + 확장 설명 ── */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            <div
              role="tablist"
              aria-label={c.tablistLabel}
              aria-orientation="vertical"
              className="space-y-3"
            >
            {tabs.map((tab, index) => {
              const Icon = TAB_ICONS[tab.key];
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  id={`agent-tab-${tab.key}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`agent-panel-${tab.key}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.key)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className={`relative w-full text-left rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? 'bg-white border-primary/20 shadow-lg'
                      : 'bg-transparent border-transparent hover:bg-white/60 hover:border-gray-100'
                  }`}
                >
                  {/* 슬라이딩 액티브 바 (좌측 레일, 탭 간 글라이딩) */}
                  {isActive && <SlidingIndicator layoutId="agent-tab-bar" className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-primary" />}
                  {/* 탭 헤더 (항상 표시) */}
                  <div className="flex items-center gap-4 p-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-primary/10' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                        {tab.label}
                      </h3>
                      <p className={`text-xs mt-0.5 transition-colors ${isActive ? 'text-primary font-medium' : 'text-gray-500'}`}>
                        {tab.tagline}
                      </p>
                    </div>
                  </div>

                  {/* 확장 영역 (선택된 탭만 표시) */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reducedMotion ? 0 : -4 }}
                        transition={reducedMotion ? { duration: 0 } : springGentle}
                        className="px-4 pb-5"
                      >
                        <div className="border-t border-gray-100 pt-4">
                          {/* 재정돈: 설명 문단 삭제 — 폰 목업이 보여주는 내용의 중복. 체크리스트만 유지 */}
                          <ul className="space-y-2">
                            {tab.features.map((f) => (
                              <li key={f} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}

            </div>
            <p className="text-xs text-gray-500 px-1">
              {c.disclaimer}
            </p>
          </div>

          {/* ── 오른쪽: 고정 프레임 + 내부 콘텐츠 전환 ── */}
          <div className="w-full lg:w-auto lg:flex-shrink-0 flex justify-center min-h-[520px] lg:min-h-[660px]">
            <div className="relative w-full max-w-[360px]">
              {/* 배경 글로우 */}
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl scale-90 pointer-events-none" aria-hidden="true" />
              {/* 프레임: grid 스택으로 항상 동일 크기 유지, opacity로 전환 */}
              <div
                className="grid h-full"
                style={{ gridTemplateAreas: '"stack"' }}
              >
                {tabs.map(({ key }) => {
                  const Mockup = TAB_MOCKUPS[key];
                  // min-w-0: MockupViewport 고정폭이 그리드 트랙 min-content로 전파돼
                  // 셀이 캔버스 폭까지 벌어지는 것을 차단(scale 1 자기고정 방지).
                  return (
                    <div
                      key={key}
                      id={`agent-panel-${key}`}
                      role="tabpanel"
                      aria-labelledby={`agent-tab-${key}`}
                      aria-hidden={activeTab !== key}
                      style={{ gridArea: 'stack' }}
                      className={`min-w-0 ${reducedMotion ? '' : 'transition-[opacity,transform] duration-300'} ${activeTab === key ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                    >
                      <Mockup active={activeTab === key} locale={locale} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
