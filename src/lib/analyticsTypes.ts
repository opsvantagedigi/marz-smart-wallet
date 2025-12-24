import { SolanaTier } from "./solanaApiKeyStore";

/**
 * Core summary metrics for a key.
 * Add new fields here when adding more summary statistics (e.g., p99, median).
 */
export interface AnalyticsSummary {
  total: number;
  errors: number;
  avgDuration: number;
  byMethod: Record<string, number>;
  byNetwork: Record<string, number>;
  recent: Array<{
    timestamp: number;
    method: string;
    success: boolean;
    network: string;
    durationMs: number;
  }>;
}

/**
 * Usage metrics for a single resource (HTTP or WS).
 * To extend for other tracked resources, add new UsageMetrics fields
 * and include them in `UsageBundle`.
 */
export interface UsageMetrics {
  used: number;
  limit: number;
  remaining: number;
  usagePercent: number;
}

/**
 * Human-friendly tier information.
 * Extend with billing fields (billingStatus, seats, etc.) if needed.
 */
export interface TierInfo {
  tier: SolanaTier;
  tierName: string;
}

/**
 * Container for HTTP and WS usage metrics.
 * Future additions: tokenIndexing?: UsageMetrics, simulation?: UsageMetrics
 */
export interface UsageBundle {
  http: UsageMetrics;
  ws: UsageMetrics;
}

/**
 * The single source-of-truth payload returned by the analytics API.
 * - Always include `tier`, `tierName`, `usage`, `summary`, and `timestamp`.
 * - Extend this payload when adding new analytics surfaces. Keep additions
 *   backward-compatible by appending optional fields.
 */
export interface SolanaAnalyticsPayload {
  tier: SolanaTier;
  tierName: string;
  usage: UsageBundle;
  summary: AnalyticsSummary;
  timestamp: number;
}

// Guidance:
// - To add new analytics fields, add them to AnalyticsSummary or UsageBundle.
// - To add billing/state info, extend TierInfo and include it on the payload.
// - Keep all additions optional unless they are required for existing consumers.
