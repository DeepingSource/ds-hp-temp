import { program } from '../data';

/** 섹션 5 — 현장 프로그램. 카드 3개(번호+아이콘+제목+설명). 배경 옅은 회청. */
export default function OnsiteProgram() {
  return (
    <section className="section" style={{ backgroundColor: 'var(--layer-section-alt)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight text-center mb-10 break-keep">
          {program.heading}
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {program.cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold text-primary/40">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 break-keep">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed break-keep">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
