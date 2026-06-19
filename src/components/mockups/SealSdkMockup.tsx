'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import MacBookFrame from './MacBookFrame';
import MockupBadge from './MockupBadge';

/**
 * #6 SealSdkMockup — privacy-first spatial SDK code editor + live output.
 * D5 dark IDE inside a MacBook frame. Restrained grayscale + one brand-blue accent.
 * D7: edit ONLY the CODE_LINES / LOG_LINES arrays to update the demo.
 */

// ── D7: keep demo content in data arrays. Only these change later. ──
const CODE_LINES: string[] = [
  'import { SEAL } from "@saai/seal"',
  '',
  'const seal = SEAL.init({ mode: "on-device", retain: "none" })',
  'seal.anonymize(["face", "plate"])          // irreversible at capture',
  '',
  'const stream = seal.connect(camera)',
  'stream.on("signal", (s) => {',
  '  // Pattern · Detection · Priority · Response · Context · Outcome',
  '  hub.emit(s.category, s.payload)',
  '})',
];

interface LogLine {
  tag?: string;
  text: string;
}

const LOG_LINES: LogLine[] = [
  { text: 'stream connected' },
  { text: '4 faces anonymized' },
  { tag: 'Detection', text: '4 persons' },
  { tag: 'Pattern', text: 'dwell + flow' },
  { tag: 'Priority', text: 'zone B raised' },
  { tag: 'Response', text: 'staff routed' },
  { tag: 'Context', text: 'on-device only' },
  { tag: 'Outcome', text: '0 PII stored · 28ms' },
];

type Beat = 'typing' | 'running' | 'done';

interface Copy {
  fileName: string;
  terminalTitle: string;
  badge: string;
  runHint: string;
  thumbTitle: string;
  thumbCaption: string;
  ariaCode: string;
  ariaTerminal: string;
}

const COPY: Record<Locale, Copy> = {
  en: {
    fileName: 'seal.init.ts',
    terminalTitle: 'output',
    badge: 'Example',
    runHint: '$ seal run',
    thumbTitle: 'anonymized frame',
    thumbCaption: 'faces & plates removed at capture',
    ariaCode: 'SEAL SDK initialization pseudocode',
    ariaTerminal: 'Simulated SEAL runtime output log',
  },
  ko: {
    fileName: 'seal.init.ts',
    terminalTitle: '출력',
    badge: '예시',
    runHint: '$ seal run',
    thumbTitle: '익명화된 프레임',
    thumbCaption: '캡처 시점에 얼굴·번호판 제거',
    ariaCode: 'SEAL SDK 초기화 의사코드',
    ariaTerminal: 'SEAL 런타임 출력 로그 (시뮬레이션)',
  },
  jp: {
    fileName: 'seal.init.ts',
    terminalTitle: '出力',
    badge: '例',
    runHint: '$ seal run',
    thumbTitle: '匿名化フレーム',
    thumbCaption: 'キャプチャ時に顔・ナンバーを除去',
    ariaCode: 'SEAL SDK 初期化の擬似コード',
    ariaTerminal: 'SEAL ランタイム出力ログ（シミュレーション）',
  },
};

// Syntax tokens — restrained: 2 grays + brand-blue only. No green, no rainbow.
const COLORS = {
  base: '#c9d1d9', // gray 1 (default text)
  comment: '#6b7280', // gray 2 (dim)
  keyword: '#376AE2', // brand-blue
  string: '#9aa4b2', // muted gray-blue (was green)
  brand: '#376AE2',
};

function renderCodeLine(line: string) {
  // Lightweight, deterministic highlighter — no rainbow.
  const commentIdx = line.indexOf('//');
  const code = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
  const comment = commentIdx >= 0 ? line.slice(commentIdx) : '';

  const parts: { text: string; color: string }[] = [];
  // Strings first.
  const strRe = /"[^"]*"/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = strRe.exec(code)) !== null) {
    if (m.index > last) parts.push({ text: code.slice(last, m.index), color: COLORS.base });
    parts.push({ text: m[0], color: COLORS.string });
    last = m.index + m[0].length;
  }
  if (last < code.length) parts.push({ text: code.slice(last), color: COLORS.base });

  const keywords = /\b(import|const|from|SEAL)\b/g;
  const out: { text: string; color: string }[] = [];
  for (const p of parts) {
    if (p.color !== COLORS.base) {
      out.push(p);
      continue;
    }
    let l2 = 0;
    let km: RegExpExecArray | null;
    const s = p.text;
    keywords.lastIndex = 0;
    while ((km = keywords.exec(s)) !== null) {
      if (km.index > l2) out.push({ text: s.slice(l2, km.index), color: COLORS.base });
      out.push({ text: km[0], color: COLORS.keyword });
      l2 = km.index + km[0].length;
    }
    if (l2 < s.length) out.push({ text: s.slice(l2), color: COLORS.base });
  }

  return (
    <>
      {out.map((p, i) => (
        <span key={i} style={{ color: p.color }}>
          {p.text}
        </span>
      ))}
      {comment && <span style={{ color: COLORS.comment }}>{comment}</span>}
    </>
  );
}

export default function SealSdkMockup({
  active = true,
  locale = 'en',
  className = '',
}: {
  active?: boolean;
  locale?: Locale;
  className?: string;
}) {
  const c = COPY[locale] ?? COPY.en;
  const reducedMotion = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const animate = isVisible && active && !reducedMotion;

  const fullText = CODE_LINES.join('\n');

  // SSR-safe: hook returns false on first client render (matches SSR), so these
  // initializers match the server output. The effect below reconciles to the
  // static fallback when !animate (reduced-motion or inactive).
  const [typed, setTyped] = useState('');
  const [beat, setBeat] = useState<Beat>('typing');
  const [logCount, setLogCount] = useState(0);

  useEffect(() => {
    if (!animate) {
      // Static fallback: full code + full log.
      setTyped(fullText);
      setBeat('done');
      setLogCount(LOG_LINES.length);
      return;
    }

    let cancelled = false;
    // Bounded: each fired timer removes itself, so the set never grows across
    // loop cycles. Cleanup clears every still-pending timer.
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const at = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        timers.delete(t);
        if (!cancelled) fn();
      }, ms);
      timers.add(t);
    };

    function runLoop() {
      if (cancelled) return;
      // Beat 1 — type code.
      setBeat('typing');
      setTyped('');
      setLogCount(0);
      let i = 0;
      const typeNext = () => {
        if (cancelled) return;
        i += 1;
        setTyped(fullText.slice(0, i));
        if (i < fullText.length) {
          // faster over newlines/spaces
          const ch = fullText[i - 1];
          at(typeNext, ch === '\n' ? 60 : 18);
        } else {
          // Beat 2 — run + stream log.
          at(() => {
            setBeat('running');
            let j = 0;
            const logNext = () => {
              if (cancelled) return;
              j += 1;
              setLogCount(j);
              if (j < LOG_LINES.length) {
                at(logNext, 320);
              } else {
                // Beat 3 — thumbnail settle, then loop.
                at(() => {
                  setBeat('done');
                  at(runLoop, 2600);
                }, 500);
              }
            };
            at(logNext, 240);
          }, 420);
        }
      };
      at(typeNext, 200);
    }

    runLoop();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, [animate, fullText]);

  const showThumb = beat === 'done' || logCount >= 2;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <MockupBadge locale={locale} />
      <MacBookFrame>
        <div className="bg-[#0d1117] text-gray-200">
          {/* IDE title bar */}
          <div className="flex items-center gap-2 px-3 h-7 bg-[#161b22] border-b border-white/5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="ml-2 text-3xs font-mono text-gray-400">{c.fileName}</span>
          </div>

          {/* Body: code (left ~60%) + terminal/thumb (right ~40%) */}
          <div className="flex flex-col md:flex-row min-h-[320px]">
            {/* Code panel */}
            <div className="relative md:w-[60%] border-b md:border-b-0 md:border-r border-white/5">
              {/* Example badge per D7 */}
              <span className="absolute top-2 right-2 z-10 rounded-full bg-primary/15 text-primary text-[9px] font-semibold px-2 py-0.5 border border-primary/30">
                {c.badge}
              </span>
              <pre
                aria-label={c.ariaCode}
                className="m-0 p-4 pr-16 text-2xs leading-[1.7] font-mono overflow-x-auto whitespace-pre"
                style={{ color: COLORS.base }}
              >
                {/* Reduced-motion / static: full highlighted code. */}
                {beat === 'done' || !animate
                  ? CODE_LINES.map((line, i) => (
                      <div key={i} className="min-h-[1.2em]">
                        {renderCodeLine(line)}
                      </div>
                    ))
                  : (
                      /* Typing: completed lines colorize per-line; the active
                         line shows raw text + cursor until it completes. */
                      (() => {
                        const typedLines = typed.split('\n');
                        const activeIdx = typedLines.length - 1;
                        return (
                          <span aria-hidden="true">
                            {typedLines.map((line, i) => (
                              <div key={i} className="min-h-[1.2em]">
                                {i < activeIdx ? (
                                  renderCodeLine(line)
                                ) : (
                                  <>
                                    {line}
                                    <span
                                      className="inline-block w-[7px] h-[13px] -mb-[2px] bg-primary animate-pulse"
                                      aria-hidden="true"
                                    />
                                  </>
                                )}
                              </div>
                            ))}
                          </span>
                        );
                      })()
                    )}
              </pre>
            </div>

            {/* Terminal + thumbnail panel */}
            <div className="md:w-[40%] flex flex-col bg-[#0b0e13]">
              {/* Terminal */}
              <div className="flex-1 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono">
                    {c.terminalTitle}
                  </span>
                  <span className="text-[9px] text-gray-600 font-mono">{c.runHint}</span>
                </div>

                {/* Text-alternative log (always present for a11y) */}
                <ul
                  aria-label={c.ariaTerminal}
                  className="space-y-1 font-mono text-3xs leading-snug"
                >
                  {LOG_LINES.slice(0, logCount).map((l, i) => (
                    <motion.li
                      key={i}
                      initial={animate ? { opacity: 0, x: -4 } : false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-baseline gap-1.5"
                    >
                      <span className="text-gray-600" aria-hidden="true">
                        ›
                      </span>
                      {l.tag ? (
                        <span className="text-primary">[{l.tag}]</span>
                      ) : null}
                      <span className="text-gray-300">{l.text}</span>
                    </motion.li>
                  ))}
                  {beat === 'running' && animate && (
                    <li className="text-gray-600" aria-hidden="true">
                      <span className="inline-block w-1.5 h-3 bg-gray-500 animate-pulse align-middle" />
                    </li>
                  )}
                </ul>
              </div>

              {/* Anonymized frame thumbnail */}
              <div className="p-3 border-t border-white/5">
                <motion.div
                  initial={animate ? { opacity: 0.2 } : false}
                  animate={{ opacity: showThumb ? 1 : 0.2 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-md overflow-hidden border border-white/10"
                  style={{ background: '#11161d' }}
                  aria-label={c.thumbTitle}
                  role="img"
                >
                  {/* abstract gray mosaic "scene" */}
                  <div className="grid grid-cols-8 gap-px p-1 bg-black/30">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-[1px]"
                        style={{
                          background: `rgba(255,255,255,${0.03 + ((i * 37) % 11) / 90})`,
                        }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  {/* mosaic "faces" — anonymized blocks */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3" aria-hidden="true">
                    {[0, 1].map((k) => (
                      <div
                        key={k}
                        className="w-7 h-8 rounded-sm grid grid-cols-3 grid-rows-3 gap-px overflow-hidden border border-primary/40"
                      >
                        {Array.from({ length: 9 }).map((_, j) => (
                          <span
                            key={j}
                            style={{
                              background: `rgba(120,130,150,${0.25 + ((j * 53) % 9) / 18})`,
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="px-2 py-1 text-4xs text-gray-500 font-mono border-t border-white/5">
                    {c.thumbCaption}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </MacBookFrame>
    </div>
  );
}
