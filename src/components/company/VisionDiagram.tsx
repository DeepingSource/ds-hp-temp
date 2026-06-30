import { Building2, Shield, Brain, Store, Landmark, Music } from 'lucide-react';
import { type Locale } from '@/lib/i18n';

const spaceIcons = [Store, Building2, Landmark, Music];

const C: Record<Locale, {
  spaces: string[];
  shieldTitle: string;
  shieldSub: string;
  aiLoop: string;
}> = {
  ko: {
    spaces: ['매장', '빌딩', '공공', '레저'],
    shieldTitle: '완전 익명화',
    shieldSub: '개인정보 제거',
    aiLoop: '관찰 → 분석 → 실행 → 학습',
  },
  en: {
    spaces: ['Retail', 'Buildings', 'Public', 'Leisure'],
    shieldTitle: 'Full Anonymization',
    shieldSub: 'PII removed',
    aiLoop: 'Observe → Analyze → Act → Learn',
  },
  jp: {
    spaces: ['店舗', 'ビル', '公共', 'レジャー'],
    shieldTitle: '完全匿名化',
    shieldSub: '個人情報を除去',
    aiLoop: '観察 → 分析 → 実行 → 学習',
  },
};

export default function VisionDiagram({ locale = 'en' }: { locale?: Locale }) {
  const t = C[locale];
  const spaces = spaceIcons.map((icon, i) => ({ icon, label: t.spaces[i] }));

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-center justify-center gap-0">
        {/* Physical World */}
        <div className="flex-1 max-w-[220px]">
          <div className="rounded-2xl border border-slate-700 bg-slate-800/60 backdrop-blur-sm p-6 text-center">
            <p className="text-3xs font-bold text-slate-400 uppercase tracking-widest mb-4">Physical World</p>
            <div className="grid grid-cols-2 gap-3">
              {spaces.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-lg bg-slate-700/80 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-300" />
                    </div>
                    <span className="text-3xs text-slate-400 font-medium">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Arrow 1 */}
        <div className="flex items-center px-2">
          <div className="relative w-10 h-px bg-primary/50 vision-dash-h">
            <span className="vision-packet vision-packet-h" aria-hidden="true" />
          </div>
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-primary/60" />
        </div>

        {/* Privacy Shield */}
        <div className="flex-1 max-w-[180px]">
          <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm p-6 text-center">
            <p className="text-3xs font-bold text-primary-light uppercase tracking-widest mb-3">Privacy Shield</p>
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-7 h-7 text-primary-light" />
            </div>
            <p className="text-xs text-primary-light font-medium">{t.shieldTitle}</p>
            <p className="text-3xs text-slate-400 mt-1">{t.shieldSub}</p>
          </div>
        </div>

        {/* Arrow 2 */}
        <div className="flex items-center px-2">
          <div className="relative w-10 h-px bg-primary/50 vision-dash-h">
            <span className="vision-packet vision-packet-h" aria-hidden="true" />
          </div>
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-primary/60" />
        </div>

        {/* AI Engine */}
        <div className="flex-1 max-w-[220px]">
          <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm p-6 text-center">
            <p className="text-3xs font-bold text-primary-light uppercase tracking-widest mb-3">Spatial AI</p>
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-3 vision-pulse">
              <Brain className="w-7 h-7 text-primary-light" />
            </div>
            <p className="text-xs text-primary-light font-medium">Agentic AI</p>
            <p className="text-3xs text-slate-400 mt-1">{t.aiLoop}</p>
          </div>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="flex sm:hidden flex-col items-center gap-0">
        {/* Physical World */}
        <div className="w-full max-w-[260px]">
          <div className="rounded-2xl border border-slate-700 bg-slate-800/60 backdrop-blur-sm p-5 text-center">
            <p className="text-3xs font-bold text-slate-400 uppercase tracking-widest mb-3">Physical World</p>
            <div className="flex justify-center gap-4">
              {spaces.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg bg-slate-700/80 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-300" />
                    </div>
                    <span className="text-[9px] text-slate-400 font-medium">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Vertical arrow */}
        <div className="flex flex-col items-center py-1">
          <div className="relative w-px h-6 bg-primary/50 vision-dash-v">
            <span className="vision-packet vision-packet-v" aria-hidden="true" />
          </div>
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-primary/60" />
        </div>

        {/* Privacy Shield */}
        <div className="w-full max-w-[220px]">
          <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm p-5 text-center">
            <p className="text-3xs font-bold text-primary-light uppercase tracking-widest mb-2">Privacy Shield</p>
            <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-primary-light" />
            </div>
            <p className="text-xs text-primary-light font-medium">{t.shieldTitle}</p>
          </div>
        </div>

        {/* Vertical arrow */}
        <div className="flex flex-col items-center py-1">
          <div className="relative w-px h-6 bg-primary/50 vision-dash-v">
            <span className="vision-packet vision-packet-v" aria-hidden="true" />
          </div>
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-primary/60" />
        </div>

        {/* AI Engine */}
        <div className="w-full max-w-[260px]">
          <div className="rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm p-5 text-center">
            <p className="text-3xs font-bold text-primary-light uppercase tracking-widest mb-2">Spatial AI</p>
            <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-2 vision-pulse">
              <Brain className="w-6 h-6 text-primary-light" />
            </div>
            <p className="text-xs text-primary-light font-medium">Agentic AI</p>
            <p className="text-3xs text-slate-400 mt-1">{t.aiLoop}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
