import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * HubDataBand — "the hub completes when you drop in revenue" (home, P0 per PRD
 * saai insight). The strongest proof of the hub promise: HQ's own sales, dragged
 * in as a spreadsheet, meet measured dwell on one time axis. Mechanism copy only;
 * no figures or named customers. A dual-line SVG shows dwell (measured) and
 * revenue (provided) diverging — the moment "why" becomes visible.
 */

const dict: Record<
  Locale,
  {
    eyebrow: string;
    heading: string;
    sub: string;
    steps: string[];
    punch: string;
    cta: string;
    svgLabel: string;
    dwellLabel: string;
    revenueLabel: string;
  }
> = {
  ko: {
    eyebrow: '들어오는 데이터는 우리 것만이 아닙니다',
    heading: '매출을 끌어다 놓으면, 체류와 매출이 한 축에서 만납니다.',
    sub: '본사는 이미 매장별 매출을 갖고 있습니다. 문제는 그 숫자가 체류와 다른 곳에 있어, 한 시간축에서 볼 수 없다는 것입니다. 스프레드시트를 그대로 끌어다 놓으세요.',
    steps: [
      '운영팀이 쓰던 스프레드시트 그대로. 매장·날짜·매출 세 열이면 충분하고, 템플릿도 드립니다.',
      '열 이름이나 매장 코드가 우리와 달라도, 처음 한 번만 맞추면 다음부터 기억합니다.',
      '올리는 즉시 어느 매장의 어느 기간이 들어왔고 무엇이 빠졌는지 보여줍니다.',
    ],
    punch: '체류는 그대로인데 매출만 빠진 매장은 매장 안에서 무언가 새고 있는 것이고, 체류부터 빠진 매장은 유입과 상권의 문제입니다.',
    cta: '매출 업로드 템플릿 받기',
    svgLabel: '같은 시간축 위에서 체류(측정값)는 유지되는데 매출(제공값)만 후반에 떨어지는 두 선 그래프',
    dwellLabel: '체류 (측정값)',
    revenueLabel: '매출 (제공값)',
  },
  en: {
    eyebrow: "The data coming in isn't only ours",
    heading: 'Drop in your revenue, and dwell meets sales on one axis.',
    sub: "HQ already has revenue per store. The problem is that the number lives apart from dwell, so you can't see them on one timeline. Just drag in the spreadsheet as-is.",
    steps: [
      'The same spreadsheet your ops team already uses. Three columns — store, date, revenue — are enough, and we provide a template.',
      'Even if your column names or store codes differ from ours, map them once and it remembers from then on.',
      "The moment you upload, it shows which store, which period came in, and what's missing.",
    ],
    punch: 'A store whose dwell holds but revenue drops is leaking something inside; a store whose dwell drops first has a traffic and trade-area problem.',
    cta: 'Get the revenue upload template',
    svgLabel: 'A two-line chart where dwell (measured) holds while revenue (provided) drops later, on one time axis',
    dwellLabel: 'Dwell (measured)',
    revenueLabel: 'Revenue (provided)',
  },
  jp: {
    eyebrow: '入ってくるデータは、私たちのものだけではありません',
    heading: '売上を取り込めば、滞在と売上がひとつの軸で出会います。',
    sub: '本部はすでに店舗ごとの売上を持っています。問題は、その数字が滞在とは別の場所にあり、ひとつの時間軸で見られないことです。スプレッドシートをそのまま取り込んでください。',
    steps: [
      '運営チームが使ってきたスプレッドシートのまま。店舗・日付・売上の三列があれば十分で、テンプレートもお渡しします。',
      '列名や店舗コードが私たちと違っても、最初の一度だけ合わせれば、次からは記憶します。',
      'アップロードした瞬間、どの店舗のどの期間が入り、何が欠けているかを表示します。',
    ],
    punch: '滞在はそのままで売上だけが落ちた店舗は、店内で何かが漏れています。滞在から落ちた店舗は、集客と商圏の問題です。',
    cta: '売上アップロード用テンプレートを入手',
    svgLabel: '同じ時間軸の上で、滞在（計測値）は保たれるのに売上（提供値）だけが後半で落ちる二本線のグラフ',
    dwellLabel: '滞在（計測値）',
    revenueLabel: '売上（提供値）',
  },
};

export default function HubDataBand({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section variant="alt">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — copy + steps */}
          <div>
            <Eyebrow tone="primary" className="mb-3">{t.eyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display mb-4">{t.heading}</h2>
            <p className="text-lg text-gray-600 leading-relaxed break-keep mb-8">{t.sub}</p>

            <AnimatedSection>
              <ol className="flex flex-col gap-4 mb-8">
                {t.steps.map((s, i) => (
                  <li key={i} className="stagger-child flex items-start gap-3.5">
                    <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed break-keep pt-0.5">{s}</p>
                  </li>
                ))}
              </ol>
            </AnimatedSection>

            <p className="text-base text-gray-900 font-medium leading-relaxed break-keep border-l-2 border-primary pl-4 mb-8">
              {t.punch}
            </p>

            <Link href={localeHref(locale, '/contact')} className="btn-primary">
              {t.cta}
            </Link>
          </div>

          {/* Right — dual-line timeline mockup (dwell vs revenue diverge) */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
            <svg viewBox="0 0 440 240" role="img" aria-label={t.svgLabel} className="w-full h-auto">
              {/* horizontal gridlines */}
              {[60, 110, 160].map((y) => (
                <line key={y} x1="40" y1={y} x2="410" y2={y} stroke="#F1F3F5" strokeWidth="1" />
              ))}
              {/* time axis */}
              <line x1="40" y1="200" x2="410" y2="200" stroke="#E5E7EB" strokeWidth="1.5" />
              {/* divergence highlight band */}
              <rect x="300" y="40" width="110" height="160" fill="var(--color-primary)" fillOpacity="0.04" />
              {/* dwell — measured (holds) */}
              <polyline
                points="40,90 100,80 160,86 220,78 280,84 340,92 410,98"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* revenue — provided (drops late) */}
              <polyline
                points="40,98 100,88 160,94 220,86 280,98 340,134 410,168"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-4 h-0.5 rounded bg-primary" aria-hidden="true" />
                {t.dwellLabel}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-4 h-0.5 rounded bg-amber-500" aria-hidden="true" />
                {t.revenueLabel}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
