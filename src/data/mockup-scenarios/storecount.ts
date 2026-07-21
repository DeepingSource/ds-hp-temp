/**
 * store count(StoreCount) 카운팅 목업 시나리오 — 로케일 무관 수치·좌표.
 * 표시 문자열은 컴포넌트 내 C: Record<Locale,…>. 색은 앱 고유(사이트 브랜드 토큰과 분리).
 * 정본: StoreCount 설치·사용 설명서 p7·p10.
 */

/** 앱 고유 라인 색 (유동인구=cyan, 유입=pink) */
export const LINE_FOOTFALL = '#38BDF8'; // sky-400
export const LINE_ENTRY = '#EC4899'; // pink-500

/** 카메라 오버레이 SVG viewBox (가로 320 × 세로 180) 기준 좌표 */
export const VIEWBOX = { w: 320, h: 180 };

/** 유동인구 기준선 2개 (매장 앞 통로를 가로지름) */
export const footfallLines = [
  { id: 'f1', x1: 18, y1: 96, x2: 150, y2: 66 },
  { id: 'f2', x1: 162, y1: 62, x2: 302, y2: 92 },
];

/** 유입 기준선 1개 (출입구, 화살표는 매장 안쪽=위 방향) */
export const entryLine = { id: 'e1', x1: 96, y1: 140, x2: 214, y2: 120 };

/**
 * 크로싱 워커 — 카메라 뷰를 가로지르는 사람 dot. 아래→위로 이동하며
 * 유입선(먼저)·유동선(나중)을 지난다. `entry:true`면 유입선도 통과.
 * 각 워커는 delay 후 dur 동안 (fromX,fromY)→(toX,toY) 선형 이동, 주기 loopMs로 반복.
 */
export const walkers = [
  { id: 'w1', fromX: 120, fromY: 182, toX: 138, toY: 24, delay: 300, dur: 2200, entry: true },
  { id: 'w2', fromX: 210, fromY: 182, toX: 176, toY: 30, delay: 1100, dur: 2400, entry: false },
  { id: 'w3', fromX: 60, fromY: 182, toX: 96, toY: 28, delay: 1900, dur: 2000, entry: true },
];
export const walkerLoopMs = 3200;

/** 하단 실시간 카드 최종값 (유입률 = entry/footfall ≈ 18%) */
export const countTargets = { footfall: 127, entry: 23, conversion: 18 };

/** 측정 타이머 정적 표시값 (reduced-motion / 초기) */
export const staticElapsed = '1:10';

/** 측정 완료 후 CSV 요약 (보조 대시보드 §1.6, 설명서 p10) */
export const csvSummary = {
  visits: 224,
  footfall: 1125,
  conversion: 19.9,
  genderMale: 45,
  genderFemale: 55,
  /** 연령대 분포(%) 20~40대 집중 — 미니 막대용 */
  ageBuckets: [3, 8, 28, 35, 15, 7, 4],
};
