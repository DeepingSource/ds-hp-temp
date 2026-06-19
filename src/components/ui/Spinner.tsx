/**
 * 폼 제출 중 표시되는 로딩 스피너.
 * currentColor를 사용하므로 부모가 text-* 클래스로 색상을 제어한다.
 */
export default function Spinner() {
  return (
    <svg className="animate-spin motion-reduce:animate-none h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
