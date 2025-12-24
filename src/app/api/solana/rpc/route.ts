import { NextRequest, NextResponse } from "next/server";
import { getKey, resetIfNeeded, incrementUsage, getUsage, RATE_LIMITS } from "@/lib/solanaApiKeyStore";
import { addLog } from "@/lib/solanaAnalyticsStore";

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

  // Rate limiting
  resetIfNeeded(apiKey);
  const usage = getUsage(apiKey);
  const tier = keyObj.tier;
  const limit = RATE_LIMITS[tier];
  if (usage && usage.usageCount >= limit) {
    return NextResponse.json(
      { error: "Rate limit exceeded", limit },
      { status: 429 }
    );
  }
  incrementUsage(apiKey);

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
    usage: usage?.usageCount,
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
