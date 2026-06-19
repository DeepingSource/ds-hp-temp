/**
 * 공용 saai 워드마크 헤더 (MOCKUP_REVIEW_v2 B1 · D1 표기)
 *
 * 목업 상단에 `saai | {구현체명}` 형식 표기를 일관 부착한다.
 * 다이어그램/위젯은 작은 인라인 워드마크로, 기술 페이지는 dark tone으로.
 */

type Tone = 'light' | 'dark';

export default function SaaiHeader({
  name,
  tone = 'light',
  className = '',
}: {
  /** 구현체명 (예: 'store care', 'seal', 'spatial ai') */
  name: string;
  tone?: Tone;
  className?: string;
}) {
  const saai = tone === 'dark' ? 'text-slate-400' : 'text-gray-400';
  const sep = tone === 'dark' ? 'text-slate-600' : 'text-gray-300';
  const product = tone === 'dark' ? 'text-slate-200' : 'text-gray-700';
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold lowercase tracking-tight ${className}`}>
      <span className={`font-normal ${saai}`}>saai</span>
      <span className={sep}>|</span>
      <span className={product}>{name}</span>
    </span>
  );
}
