/**
 * 목업 컴포넌트 중앙 레지스트리
 *
 * 모든 목업 및 디바이스 프레임을 이 파일에서 import하세요.
 *
 * 정적 import (SSR 가능):
 *   import { PhoneFrame, StoreCareMockup } from '@/components/mockups';
 *
 * 동적 import (클라이언트 전용):
 *   const StoreCareMockup = dynamic(() => import('@/components/mockups/StoreCareMockup'), { ssr: false });
 */

// ── 디바이스 프레임 ───────────────────────────────────────────────────────────
export { default as PhoneFrame } from './PhoneFrame';
export { default as TabletFrame } from './TabletFrame';
export { default as MacBookFrame } from './MacBookFrame';

// ── 폰 목업 ──────────────────────────────────────────────────────────────────
export { default as StoreCareMockup } from './StoreCareMockup';
export { default as StoreInsightMockup } from './StoreInsightMockup';
export { default as StoreCountCountingMockup } from './StoreCountCountingMockup';
export { default as StoreCareStatusMockup } from './StoreCareStatusMockup';
export { default as ActionCardMockup } from './ActionCardMockup';
export { default as ChatMockup } from './ChatMockup';
export { default as PushNotificationMockup } from './PushNotificationMockup';
export { BriefingMockup } from './BriefingMockup';   // named export 유지
export { default as MockupImage } from './MockupImage';

// ── 데스크톱 목업 ───────────────────────────────────────────────────────────
export { default as StoreInsightDesktopMockup } from './StoreInsightDesktopMockup';

// ── 멀티 매장·익명화 목업 ───────────────────────────────────────────────────
export { default as MultiStoreDashboardMockup } from './MultiStoreDashboardMockup';
export { default as AnonymizationMockup } from './AnonymizationMockup';

// ── S1 다이어그램 (회색조+브랜드블루) ─────────────────────────────────────────
export { default as IntegratedLoopDiagram } from './IntegratedLoopDiagram';
export { default as AutonomyLadderTimeline } from './AutonomyLadderTimeline';
export { default as PriorityEngineDiagram } from './PriorityEngineDiagram';
export { default as FunnelDiagram } from './FunnelDiagram';

// ── S2 기술 페이지 목업 (다크) ───────────────────────────────────────────────
export { default as SpatialTrajectoryMockup } from './SpatialTrajectoryMockup';
export { default as SealSdkMockup } from './SealSdkMockup';
export { default as EdgePerfMonitorMockup } from './EdgePerfMonitorMockup';

// ── S3~S5 목업 ───────────────────────────────────────────────────────────────
export { default as KakaoAlertMockup } from './KakaoAlertMockup';
export { default as HqMapDashboardMockup } from './HqMapDashboardMockup';
export { default as OrderFlowMockup } from './OrderFlowMockup';
export { default as ModelCatalogMockup } from './ModelCatalogMockup';
export { default as CaseStudyChartMockup } from './CaseStudyChartMockup';
export { default as FiveQuestionsMockup } from './FiveQuestionsMockup';
export { default as VisionCoordinatesMockup } from './VisionCoordinatesMockup';
export { default as RoiCalculatorWidget } from './RoiCalculatorWidget';

// ── 체험형 데모 (MOCKUP_PROPOSALS_v5) ─────────────────────────────────────────
export { default as AlertFatigueComparison } from './AlertFatigueComparison';
export { default as PrivacyJourneyMockup } from './PrivacyJourneyMockup';
export { default as AgentDaySimulator } from './AgentDaySimulator';
export { default as StoreDayTimelapse } from './StoreDayTimelapse';

// ── 공통 타입 ─────────────────────────────────────────────────────────────────
export type { BaseMockupProps } from './types';
