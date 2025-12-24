import React, { useState } from "react";

interface SolanaKey {
  key: string;
  label?: string;
  createdAt: string;
  tier: string;
  usageCount: number;
  resetAt: number;
}


interface AnalyticsSummary {
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

interface ExtendedAnalytics {
  tier: string;
  tierName: string;
  http: {
    used: number;
    limit: number;
    remaining: number | number;
    usagePercent: number;
  };
  ws: {
    used: number;
    limit: number;
    remaining: number | number;
    usagePercent: number;
  };
  summary: AnalyticsSummary;
}

export function SolanaRpcPanel({ userId }: { userId: string }) {
  const [keys, setKeys] = useState<SolanaKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<Record<string, ExtendedAnalytics | AnalyticsSummary>>({});


  async function fetchKeys() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/solana/keys", {
        headers: { "x-user-id": userId },
      });
      const data = await res.json();
      setKeys(data.keys || []);
      // Fetch analytics for each key
      const analyticsObj: Record<string, AnalyticsSummary> = {};
      await Promise.all(
        (data.keys || []).map(async (k: SolanaKey) => {
          const aRes = await fetch("/api/solana/analytics", {
            headers: { "x-api-key": k.key },
          });
          const aData = await aRes.json();
          analyticsObj[k.key] = aData;
        })
      );
      setAnalytics(analyticsObj);
    } catch (e) {
      setError("Failed to load keys or analytics");
    } finally {
      setLoading(false);
    }
  }

  async function createKey() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/solana/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": userId },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setKeys(data.keys || []);
    } catch (e) {
      setError("Failed to create key");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (userId) fetchKeys();
    // eslint-disable-next-line
  }, [userId]);

  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2 heading-orbitron">Solana RPC Access</h2>
      <p className="text-gray-700 mb-4">
        High-reliability Solana RPC & WebSocket endpoints, powered by OpsVantage Digital.
      </p>
      <button
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] text-black font-orbitron text-sm hover:scale-105 transition-all mb-4"
        onClick={createKey}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create API Key"}
      </button>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="space-y-4">
        {keys.length === 0 && <div className="text-gray-500">No API keys yet.</div>}
        {keys.map((k) => {
          // prefer extended analytics from the analytics API
          const a = analytics[k.key] as ExtendedAnalytics | undefined;
          const tierName = a?.tierName || k.tier;
          const httpUsed = a?.http?.used ?? k.usageCount;
          const httpLimit = a?.http?.limit ?? (k.tier === "starter" ? 2000000 : 50000);
          const httpRemaining = typeof a?.http?.remaining === "number" ? a!.http.remaining : Math.max(0, httpLimit - httpUsed);
          const httpPercent = a?.http?.usagePercent ?? (httpUsed / Math.max(1, httpLimit));
          // WebSocket analytics
          let wsConnections = 0, wsMessages = 0, wsErrors = 0;
          if (a) {
            const extended = a as Partial<ExtendedAnalytics>;
            const s: AnalyticsSummary = extended.summary !== undefined ? extended.summary : (a as AnalyticsSummary);
            wsConnections = (s.byMethod["WEBSOCKET_CONNECTION"] || 0) - (s.byMethod["WEBSOCKET_CLOSE"] || 0);
            wsMessages = s.byMethod["WEBSOCKET_MESSAGE"] || 0;
            wsErrors = s.byMethod["WEBSOCKET_ERROR"] || 0;
          }
          return (
            <div key={k.key} className="p-4 rounded-xl bg-white/60 border border-white/20 shadow mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{k.label || "Unnamed key"}</span>
                <span className="text-xs text-gray-500">{new Date(k.createdAt).toLocaleString()}</span>
              </div>
              <div className="mb-2 flex gap-2 items-center">
                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-bold">Tier: {tierName}</span>
                <button onClick={() => alert("Upgrade flow coming soon")} className="ml-2 px-2 py-1 rounded bg-yellow-300 text-black text-xs font-semibold hover:bg-yellow-200 transition-colors">Upgrade</button>
              </div>
              <div className="text-xs mb-2">Requests used this month: <span className="font-mono font-bold">{httpUsed}</span></div>
              <div className="text-xs mb-2">Requests remaining: <span className="font-mono font-bold">{httpRemaining}</span> / {httpLimit}</div>
              <div className="w-full bg-gray-200 h-2 rounded-full mb-2 overflow-hidden">
                <div className="h-2 bg-green-500" style={{ width: `${Math.min(100, Math.round(httpPercent * 100))}%` }} />
              </div>
              {httpPercent > 0.8 && <div className="text-xs text-yellow-700 mb-2">You're nearing your plan limit. Consider upgrading.</div>}
              <div className="text-xs mb-2">Reset date: <span className="font-mono">{new Date(k.resetAt).toLocaleString()}</span></div>
              <div className="text-xs font-mono break-all mb-2">{k.key}</div>
              <div className="text-xs text-gray-700 mb-1">Example endpoints:</div>
              <div className="text-xs font-mono bg-gray-100 rounded p-2 mb-1">HTTPS (devnet): https://api.marz-ops.solana.dev/v1/{k.key}</div>
              <div className="text-xs font-mono bg-gray-100 rounded p-2 mb-1">HTTPS (mainnet): https://api.marz-ops.solana.mainnet/v1/{k.key}</div>

              {/* WebSocket Streaming Endpoints */}
              <div className="mt-4">
                <div className="font-semibold text-xs mb-1">WebSocket Streaming Endpoints</div>
                <div className="text-xs font-mono bg-gray-100 rounded p-2 mb-1">Devnet: wss://api.marz-ops.solana.dev/v1/{k.key}?network=devnet</div>
                <div className="text-xs font-mono bg-gray-100 rounded p-2 mb-1">Mainnet: wss://api.marz-ops.solana.mainnet/v1/{k.key}?network=mainnet</div>
              </div>

              {/* Usage Analytics Section */}
              <div className="mt-4 rounded-xl bg-white/80 backdrop-blur-xl border border-white/30 shadow p-4">
                <h3 className="text-lg font-bold mb-2 heading-orbitron">Usage Analytics</h3>
                {!a ? (
                  <div className="text-gray-500">Loading analytics…</div>
                ) : (
                  <div className="space-y-2">
                    {(() => {
                      const extended = a as Partial<ExtendedAnalytics>;
                      const s: AnalyticsSummary = extended.summary !== undefined ? extended.summary : (a as AnalyticsSummary);
                      return (
                        <>
                          <div className="text-xs">Total requests: <span className="font-mono font-bold">{s.total}</span></div>
                          <div className="text-xs">Errors: <span className="font-mono font-bold">{s.errors}</span></div>
                          <div className="text-xs">Avg response time: <span className="font-mono font-bold">{s.avgDuration.toFixed(1)} ms</span></div>
                          <div className="text-xs">Requests by method:</div>
                          <ul className="text-xs ml-4">
                            {Object.entries(s.byMethod).map(([m, c]) => (
                              <li key={m}>{m}: <span className="font-mono">{c}</span></li>
                            ))}
                          </ul>
                          <div className="text-xs">Requests by network:</div>
                          <ul className="text-xs ml-4">
                            {Object.entries(s.byNetwork).map(([n, c]) => (
                              <li key={n}>{n}: <span className="font-mono">{c}</span></li>
                            ))}
                          </ul>
                          <div className="text-xs">Last 10 requests:</div>
                          <ul className="text-xs ml-4">
                            {s.recent.map((r, i) => (
                              <li key={i}>
                                {new Date(r.timestamp).toLocaleString()} — <span className="font-mono">{r.method}</span> — <span className={r.success ? "text-green-600" : "text-red-600"}>{r.success ? "✔" : "✖"}</span> — <span className="font-mono">{r.durationMs} ms</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* WebSocket Activity Section */}
              <div className="mt-4 rounded-xl bg-white/80 backdrop-blur-xl border border-white/30 shadow p-4">
                <h3 className="text-lg font-bold mb-2 heading-orbitron">WebSocket Activity</h3>
                {!a ? (
                  <div className="text-gray-500">Loading analytics…</div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-xs">Active connections: <span className="font-mono font-bold">{wsConnections}</span></div>
                    <div className="text-xs">Messages forwarded: <span className="font-mono font-bold">{wsMessages}</span></div>
                    <div className="text-xs">Errors: <span className="font-mono font-bold">{wsErrors}</span></div>
                  </div>
                )}
              </div>

              {/* Client Example */}
              <div className="mt-6">
                <div className="text-xs font-semibold mb-1">Client Example:</div>
                <pre className="bg-gray-900 text-green-200 rounded p-3 text-xs overflow-x-auto select-all">
{`import { Connection } from "@solana/web3.js";

const connection = new Connection(
  "https://api.marz-ops.solana.dev/v1/<KEY>",
  "confirmed"
);

const slot = await connection.getSlot();
console.log("Current slot:", slot);`}
                </pre>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6">
        <div className="text-xs font-semibold mb-1">Client Example:</div>
        <pre className="bg-gray-900 text-green-200 rounded p-3 text-xs overflow-x-auto select-all">
{`import { Connection } from "@solana/web3.js";

const connection = new Connection(
  "https://api.marz-ops.solana.dev/v1/<KEY>",
  "confirmed"
);

const slot = await connection.getSlot();
console.log("Current slot:", slot);`}
        </pre>
      </div>
    </div>
  );
}
