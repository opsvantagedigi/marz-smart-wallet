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

export function getSummaryForKey(key: string) {
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

export function getUsageForKey(key: string): SolanaUsageCounters | undefined {
  return getOrInitUsage(key);
}
