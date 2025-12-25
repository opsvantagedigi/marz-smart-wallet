import { SolanaTier, SolanaTierConfig, SOLANA_TIER_CONFIG } from "./solanaApiKeyStore";
import { AnalyticsSummary, UsageMetrics, UsageBundle, SolanaAnalyticsPayload } from "./analyticsTypes";

type SolanaLogEntry = {
  key: string;
  timestamp: number;
  method: string;
  network: string;
  success: boolean;
  durationMs: number;
};

const logs: SolanaLogEntry[] = [];

export function addLog(entry: SolanaLogEntry) {
  logs.push(entry);
}

export function getLogsForKey(key: string) {
  return logs.filter(l => l.key === key);
}

export function getSummaryForKey(key: string): AnalyticsSummary {
  const entries = getLogsForKey(key);
  const total = entries.length;
  const errors = entries.filter(e => !e.success).length;
  const avgDuration = total > 0
    ? entries.reduce((a, b) => a + b.durationMs, 0) / total
    : 0;

  const byMethod: Record<string, number> = {};
  entries.forEach(e => {
    byMethod[e.method] = (byMethod[e.method] || 0) + 1;
  });

  const byNetwork: Record<string, number> = {};
  entries.forEach(e => {
    byNetwork[e.network] = (byNetwork[e.network] || 0) + 1;
  });

  return {
    total,
    errors,
    avgDuration,
    byMethod,
    byNetwork,
    recent: entries.slice(-10).reverse()
  };
}

// --- Usage counters per key (in-memory)
export interface SolanaUsageCounters {
  httpRequests: number;
  wsMessages: number;
  periodStart: number; // timestamp ms
}

const usageByKey: Map<string, SolanaUsageCounters> = new Map();

function getPeriodStart(now = Date.now()): number {
  const d = new Date(now);
  d.setUTCDate(1);
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
}

function getOrInitUsage(key: string): SolanaUsageCounters {
  const now = Date.now();
  let usage = usageByKey.get(key);
  if (!usage) {
    usage = { httpRequests: 0, wsMessages: 0, periodStart: getPeriodStart(now) };
    usageByKey.set(key, usage);
    return usage;
  }
  // Reset if period expired
  if (usage.periodStart < getPeriodStart(now)) {
    usage.httpRequests = 0;
    usage.wsMessages = 0;
    usage.periodStart = getPeriodStart(now);
  }
  return usage;
}

export function incrementHttpUsage(key: string, count = 1) {
  const u = getOrInitUsage(key);
  u.httpRequests += count;
}

export function incrementWsUsage(key: string, count = 1) {
  const u = getOrInitUsage(key);
  u.wsMessages += count;
}

export function getUsageForKey(key: string): SolanaUsageCounters {
  return getOrInitUsage(key);
}

// --- Builders for strongly-typed analytics payloads
export function buildUsageMetrics(used: number, limit: number): UsageMetrics {
  const remaining = Number.isFinite(limit) ? Math.max(0, limit - used) : Number.POSITIVE_INFINITY;
  const usagePercent = Number.isFinite(limit) ? used / Math.max(1, limit) : 0;
  return { used, limit, remaining, usagePercent };
}

export function buildUsageBundle(key: string, tierConfig: SolanaTierConfig): UsageBundle {
  const usage = getOrInitUsage(key);
  const httpUsed = usage.httpRequests;
  const wsUsed = usage.wsMessages;
  const httpLimit = tierConfig.monthlyRequestLimit;
  const wsLimit = tierConfig.monthlyWsMessageLimit;
  return {
    http: buildUsageMetrics(httpUsed, httpLimit),
    ws: buildUsageMetrics(wsUsed, wsLimit),
  };
}

/**
 * Assemble a SolanaAnalyticsPayload for the API.
 * - `key` is the API key string
 * - `tier` is the tier id (e.g., "free") for the key
 * - `keyRecord` is the key object from the key store (used for future fields)
 * - `summary` is optional; if omitted we compute it from logs
 */
export function buildAnalyticsPayload(key: string, tier: SolanaTier, keyRecord: unknown, summary?: AnalyticsSummary): SolanaAnalyticsPayload {
  const tierConfig = SOLANA_TIER_CONFIG[tier] as SolanaTierConfig;
  const s = summary ?? getSummaryForKey(key);
  const usage = buildUsageBundle(key, tierConfig);
  return {
    tier,
    tierName: tierConfig.name,
    usage,
    summary: s,
    timestamp: Date.now(),
  };
}
