import { solutionsData } from '@/data/solutionsData';
import siteContent from '@/data/generated/site-content.json';

/**
 * diagnosisData — matching logic for the /solutions/diagnosis guided Q&A ("Akinator-style"
 * problem finder).
 *
 * v4 E1(MASTER Stage 3-2): CLUSTER_MAP은 더 이상 수동 하드코딩이 아니다 —
 * content/solutions/*.yaml 각 파일의 `diagnosis.cluster` 태그(SOT)에서 파생된다.
 * "새 시나리오 = YAML 한 파일" 원칙: 시나리오와 태그가 한 파일에 있어 태깅 누락이
 * 구조적으로 어렵고, gen-site-content의 빌드 검증 ①이 블록 누락 시 빌드를 중단한다.
 * Everything else — which industries have any solutions, which clusters exist per
 * industry, whether a cluster needs a follow-up tiebreak question — is DERIVED from
 * solutionsData at runtime, so the flow stays correct as scenarios are added/removed.
 */

export type ClusterId =
  | 'theft_loss'
  | 'inventory'
  | 'merchandising'
  | 'congestion'
  | 'ops_safety'
  | 'security_ops';

/** slug → cluster id — content/solutions/*.yaml 의 diagnosis.cluster 태그에서 파생. */
export const CLUSTER_MAP: Record<string, ClusterId> = Object.fromEntries(
  (siteContent.solutionPages as { slug: string; diagnosis?: { cluster?: string } }[])
    .filter((p) => p.diagnosis?.cluster)
    .map((p) => [p.slug, p.diagnosis!.cluster as ClusterId]),
);

export interface ClusterOption {
  clusterId: ClusterId;
  /** Composite lookup key for diagnosis-i18n.ts ("<industrySlug>:<clusterId>"). */
  key: string;
  /** 1 slug = go straight to the result; 2+ = ask the Q4 tiebreak question for `key`. */
  slugs: string[];
}

const industriesWithData = new Set(solutionsData.map((s) => s.industry));

/** Whether an industry (from industryList) currently has any mapped solution scenario. */
export function industryHasSolutions(industrySlug: string): boolean {
  return industriesWithData.has(industrySlug);
}

/** Problem-cluster options for an industry (Q3's choices), derived from live content. */
export function getClustersForIndustry(industrySlug: string): ClusterOption[] {
  const scenarios = solutionsData.filter((s) => s.industry === industrySlug);
  const byCluster = new Map<ClusterId, string[]>();

  for (const s of scenarios) {
    const clusterId = CLUSTER_MAP[s.slug];
    if (!clusterId) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(`[diagnosisData] "${s.slug}": content/solutions/${s.slug}.yaml 에 diagnosis.cluster 태그가 없습니다 — 태그를 추가하세요.`);
      }
      continue;
    }
    byCluster.set(clusterId, [...(byCluster.get(clusterId) ?? []), s.slug]);
  }

  return Array.from(byCluster.entries()).map(([clusterId, slugs]) => ({
    clusterId,
    key: `${industrySlug}:${clusterId}`,
    slugs,
  }));
}
