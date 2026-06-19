import type { Locale } from '@/lib/i18n';

const LABELS: Record<Locale, string> = {
  ko: '예시 화면',
  en: 'Example',
  jp: 'サンプル画面',
};

/**
 * 컴플라이언스 표기 뱃지. locale를 넘기면 해당 로케일 라벨, 없으면 label > en 순.
 */
export default function MockupBadge({ label, locale }: { label?: string; locale?: Locale }) {
  const text = label ?? (locale ? LABELS[locale] : LABELS.en);
  return (
    <div className="absolute top-12 right-4 bg-black/60 text-white text-3xs font-bold px-2 py-0.5 rounded-full z-10 backdrop-blur-md">
      {text}
    </div>
  );
}
