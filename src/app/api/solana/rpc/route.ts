import { NextRequest, NextResponse } from "next/server";
import { getKey, getTierConfig } from "@/lib/solanaApiKeyStore";
import { addLog, incrementHttpUsage, getUsageForKey } from "@/lib/solanaAnalyticsStore";

const NETWORKS = {
  devnet: process.env.SOLANA_UPSTREAM_DEVNET_RPC!,
  mainnet: process.env.SOLANA_UPSTREAM_MAINNET_RPC!,
};

export async function POST(req: NextRequest) {
  const start = Date.now();
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) return NextResponse.json({ error: "Missing API key" }, { status: 401 });
  const keyObj = getKey(apiKey);
  if (!keyObj) return NextResponse.json({ error: "Invalid API key" }, { status: 401 });

  // Rate limiting based on tier config + analytics counters
  const tier = keyObj.tier as any;
  const tierConfig = getTierConfig(tier);
  const usage = getUsageForKey(apiKey);
  const used = usage?.httpRequests ?? 0;
  if (used >= tierConfig.monthlyRequestLimit) {
    return NextResponse.json({ error: "Request limit exceeded for your plan. Please upgrade your tier." }, { status: 429 });
  }
  // increment usage (record before forwarding so spikes count)
  incrementHttpUsage(apiKey, 1);
  // warn at 80% (console for now)
  if (used / Math.max(1, tierConfig.monthlyRequestLimit) >= 0.8) {
    console.warn(`API key ${apiKey} at ${Math.round((used / tierConfig.monthlyRequestLimit) * 100)}% of HTTP request limit`);
  }

  const { searchParams } = new URL(req.url);
  const network = searchParams.get("network") === "mainnet" ? "mainnet" : "devnet";
  const upstream = NETWORKS[network];
  if (!upstream) return NextResponse.json({ error: "Invalid network" }, { status: 400 });

  const body = await req.json();
  const { method } = body;

  // Log usage
  console.log("Solana RPC usage", {
    key: apiKey,
    method,
    network,
    usage: used,
    tier,
    timestamp: new Date().toISOString(),
  });

  // Forward to upstream
  let success = true;
  let data;
  let status = 200;
  try {
    const upstreamRes = await fetch(upstream, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    status = upstreamRes.status;
    data = await upstreamRes.json();
    success = upstreamRes.ok;
  } catch (err) {
    success = false;
    data = { error: "Upstream error" };
    status = 502;
  }
  const durationMs = Date.now() - start;
  addLog({
    key: apiKey,
    timestamp: Date.now(),
    method,
    network,
    success,
    durationMs,
  });
  return NextResponse.json(data, { status });
}
