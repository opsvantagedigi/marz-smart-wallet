import { NextRequest, NextResponse } from "next/server";
import { getKey, getTierConfig } from "@/lib/solanaApiKeyStore";
import { getSummaryForKey, getUsageForKey } from "@/lib/solanaAnalyticsStore";

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) return NextResponse.json({ error: "Missing API key" }, { status: 401 });
  const keyObj = getKey(apiKey);
  if (!keyObj) return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  const summary = getSummaryForKey(apiKey);
  const usage = getUsageForKey(apiKey) || { httpRequests: 0, wsMessages: 0, periodStart: Date.now() };
  const tierConfig = getTierConfig(keyObj.tier as any);

  const httpUsed = usage.httpRequests;
  const wsUsed = usage.wsMessages;
  const httpLimit = tierConfig.monthlyRequestLimit;
  const wsLimit = tierConfig.monthlyWsMessageLimit;
  const httpRemaining = Number.isFinite(httpLimit) ? Math.max(0, httpLimit - httpUsed) : Infinity;
  const wsRemaining = Number.isFinite(wsLimit) ? Math.max(0, wsLimit - wsUsed) : Infinity;
  const httpPercent = Number.isFinite(httpLimit) ? (httpUsed / Math.max(1, httpLimit)) : 0;
  const wsPercent = Number.isFinite(wsLimit) ? (wsUsed / Math.max(1, wsLimit)) : 0;

  return NextResponse.json({
    tier: keyObj.tier,
    tierName: tierConfig.name,
    http: {
      used: httpUsed,
      limit: httpLimit,
      remaining: httpRemaining,
      usagePercent: httpPercent,
    },
    ws: {
      used: wsUsed,
      limit: wsLimit,
      remaining: wsRemaining,
      usagePercent: wsPercent,
    },
    summary,
  });
}
