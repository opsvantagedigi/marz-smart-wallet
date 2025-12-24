import { NextRequest, NextResponse } from "next/server";
import { getKey } from "@/lib/solanaApiKeyStore";
import { getSummaryForKey } from "@/lib/solanaAnalyticsStore";

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) return NextResponse.json({ error: "Missing API key" }, { status: 401 });
  const keyObj = getKey(apiKey);
  if (!keyObj) return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  const summary = getSummaryForKey(apiKey);
  return NextResponse.json(summary);
}
