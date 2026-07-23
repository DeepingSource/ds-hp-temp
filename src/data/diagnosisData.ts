import { solutionsData } from '@/data/solutionsData';

/**
 * diagnosisData — matching logic for the /solutions/diagnosis guided Q&A ("Akinator-style"
 * problem finder). See project handoff docs (diagnosis-mapping-table.md) for the full
 * read-through this was derived from.
 *
 * content/solutions/*.yaml has no "problem cluster" field, so CLUSTER_MAP hand-assigns each
 * scenario slug to a cluster based on a full read of all 21 files' `problem` + `relatedSolutions`
 * fields. Everything else — which industries have any solutions, which clusters exist per
 * industry, whether a cluster needs a follow-up tiebreak question — is DERIVED from
 * solutionsData at runtime, so the flow stays correct as scenarios are added/removed; only
 * CLUSTER_MAP needs a new entry for a brand-new slug (and getClustersForIndustry throws in
 * dev if one is missing, instead of silently dropping a scenario from the diagnosis).
 */

export type ClusterId =
  | 'theft_loss'
  | 'inventory'
  | 'merchandising'
  | 'congestion'
  | 'ops_safety'
  | 'security_ops';

/** slug → cluster id. Update this when a new content/solutions/*.yaml file ships. */
export const CLUSTER_MAP: Record<string, ClusterId> = {
  'convenience-night-theft': 'theft_loss',
  'convenience-inventory-loss': 'inventory',
  'convenience-planogram': 'merchandising',
  'cafe-peak-hour-management': 'congestion',
  'cafe-customer-wait-time': 'congestion',
  'cafe-low-seat-turnover': 'merchandising',
  'drugstore-vmd-optimization': 'merchandising',
  'drugstore-zone-performance': 'merchandising',
  'drugstore-tester-interaction': 'merchandising',
  'mart-checkout-congestion': 'congestion',
  'mart-cart-path-optimization': 'merchandising',
  'mart-zone-conversion': 'merchandising',
  'exhibition-crowd-flow': 'congestion',
  'exhibition-visitor-dwell-time': 'merchandising',
  'exhibition-booth-performance': 'merchandising',
  'logistics-worker-safety': 'ops_safety',
  'logistics-ppe-compliance': 'ops_safety',
  'logistics-efficiency-zones': 'ops_safety',
  'unmanned-theft-prevention': 'security_ops',
  'unmanned-anomaly-detection': 'security_ops',
  'unmanned-remote-monitoring': 'security_ops',
};

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
        throw new Error(`[diagnosisData] "${s.slug}" has no CLUSTER_MAP entry — add one before shipping.`);
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
