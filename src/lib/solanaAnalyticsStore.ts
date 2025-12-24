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
