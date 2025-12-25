export const runtime = "edge";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = new Set([
  "http://localhost:3000",
  "https://opsvantagedigital.online",
  "https://www.opsvantagedigital.online",
]);

function originIsAllowed(o?: string|null){return !!o && ALLOWED_ORIGINS.has(o);}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && !originIsAllowed(origin)) return new NextResponse(JSON.stringify({error:"Origin not allowed"}), {status:403, headers:{ "Content-Type":"application/json"}});
  const apiKey = req.headers.get("x-marz-api-key");
  if (!apiKey) return new NextResponse(JSON.stringify({error:"Missing API key"}),{status:401, headers:{ "Content-Type":"application/json"}});
  const upstream = process.env.SOLANA_RPC_UPSTREAM;
  if (!upstream) return new NextResponse(JSON.stringify({error:"Upstream not configured"}),{status:500, headers:{ "Content-Type":"application/json"}});
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new NextResponse(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
  try{
    const upstreamRes = await fetch(upstream, { method:"POST", headers: { "Content-Type":"application/json","x-marz-api-key":apiKey }, body: JSON.stringify(payload), cache:"no-store" });
    const bodyText = await upstreamRes.text();
    const contentType = upstreamRes.headers.get("content-type") || "application/json";
    const headers = new Headers({ "Content-Type": contentType, "Cache-Control":"no-store, no-cache, must-revalidate, proxy-revalidate" });
    return new NextResponse(bodyText, { status: upstreamRes.status, headers });
  }catch(err){
    return new NextResponse(JSON.stringify({error:"Upstream fetch failed", detail:String(err)}),{status:502, headers:{ "Content-Type":"application/json"}});
  }
}
