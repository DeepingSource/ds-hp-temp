/**
 * 비전 모델 단일 소스 (MOCKUP_REVIEW_v2 C2)
 *
 * ModelsView(/technology/models)와 ModelCatalogMockup이 같은 상태·매핑을 쓰도록
 * 모델 stage를 여기서 단일 정의한다. 두 화면이 다른 주장을 하던 모순(flow-density·
 * queue-detect 등)을 해소. stage 값은 ModelsView 기준을 SOT로 승격.
 */

export type ModelStage = 'Live' | 'Building' | 'Planned';

/** 모델 id → 출시 단계 (SOT). ModelsView·ModelCatalog 모두 참조. */
export const MODEL_STAGES: Record<string, ModelStage> = {
  'face-anon': 'Live',
  'body-anon': 'Live',
  'plate-anon': 'Live',
  'person-detect': 'Live',
  'object-detect': 'Live',
  'pose-estimate': 'Live',
  'reid-embed': 'Live',
  'mtmc-track': 'Live',
  'cam-calibrate': 'Building',
  'floor-project': 'Building',
  'flow-density': 'Building',
  'dwell-estimate': 'Building',
  'queue-detect': 'Building',
  'change-detect': 'Building',
  'shelf-state': 'Planned',
  'event-classify': 'Planned',
  'scene-caption': 'Planned',
  'synth-frame': 'Planned',
};

export type CatalogProduct = 'Insight' | 'Care' | 'Agent' | 'SAAI';

/** ModelCatalogMockup 표·CCTV 오버레이용 메타 (id는 MODEL_STAGES와 일치) */
export interface CatalogModel {
  id: string;
  input: string;   // 예: CCTV, CCTV+POS
  output: string;  // 예: mosaic, bbox, pose, path, count, dwell, box
  product: CatalogProduct;
  /** CCTV 스틸 오버레이 종류 */
  overlay: 'mosaic' | 'plate' | 'bbox' | 'pose' | 'reid' | 'path' | 'count' | 'dwell' | 'shelf';
}

/** 카탈로그가 노출하는 13종 (제품 화면 매핑 기준 정렬) */
export const CATALOG_MODELS: CatalogModel[] = [
  { id: 'face-anon',     input: 'CCTV',     output: 'mosaic', product: 'SAAI',    overlay: 'mosaic' },
  { id: 'body-anon',     input: 'CCTV',     output: 'mosaic', product: 'SAAI',    overlay: 'mosaic' },
  { id: 'plate-anon',    input: 'CCTV',     output: 'mosaic', product: 'SAAI',    overlay: 'plate' },
  { id: 'person-detect', input: 'CCTV',     output: 'bbox',   product: 'Insight', overlay: 'bbox' },
  { id: 'pose-estimate', input: 'CCTV',     output: 'pose',   product: 'Insight', overlay: 'pose' },
  { id: 'reid-embed',    input: 'CCTV',     output: 'vector', product: 'Insight', overlay: 'reid' },
  { id: 'mtmc-track',    input: 'CCTV',     output: 'path',   product: 'Insight', overlay: 'path' },
  { id: 'flow-density',  input: 'CCTV',     output: 'count',  product: 'Insight', overlay: 'count' },
  { id: 'queue-detect',  input: 'CCTV',     output: 'count',  product: 'Care',    overlay: 'count' },
  { id: 'dwell-estimate',input: 'CCTV',     output: 'time',   product: 'Insight', overlay: 'dwell' },
  { id: 'shelf-state',   input: 'CCTV+POS', output: 'box',    product: 'Care',    overlay: 'shelf' },
  { id: 'event-classify',input: 'CCTV',     output: 'label',  product: 'Agent',   overlay: 'bbox' },
  { id: 'scene-caption', input: 'CCTV',     output: 'text',   product: 'SAAI',    overlay: 'bbox' },
];

/** 모델명 3로케일 짧은 설명 (카탈로그 표용) */
export const MODEL_PROMISE: Record<string, { ko: string; en: string; jp: string }> = {
  'face-anon':      { ko: '얼굴 비식별화',       en: 'Face anonymization',     jp: '顔の匿名化' },
  'body-anon':      { ko: '전신 비식별화',       en: 'Body anonymization',     jp: '全身の匿名化' },
  'plate-anon':     { ko: '번호판 비식별화',     en: 'Plate anonymization',    jp: 'ナンバー匿名化' },
  'person-detect':  { ko: '사람 검출',           en: 'Person detection',       jp: '人物検出' },
  'pose-estimate':  { ko: '자세 추정',           en: 'Pose estimation',        jp: '姿勢推定' },
  'reid-embed':     { ko: '재식별 임베딩',       en: 'Re-ID embedding',        jp: '再識別の埋め込み' },
  'mtmc-track':     { ko: '다중 카메라 추적',     en: 'Multi-camera tracking',  jp: 'マルチカメラ追跡' },
  'flow-density':   { ko: '밀도·흐름 집계',       en: 'Density & flow',         jp: '密度・流れの集計' },
  'queue-detect':   { ko: '대기열 감지',         en: 'Queue detection',        jp: '待機列の検知' },
  'dwell-estimate': { ko: '체류 시간 추정',       en: 'Dwell-time estimation',  jp: '滞在時間の推定' },
  'shelf-state':    { ko: '진열·재고 상태',       en: 'Shelf state',            jp: '陳列・在庫状態' },
  'event-classify': { ko: '이벤트 분류',         en: 'Event classification',   jp: 'イベント分類' },
  'scene-caption':  { ko: '장면 설명 생성',       en: 'Scene captioning',       jp: 'シーン説明生成' },
};
