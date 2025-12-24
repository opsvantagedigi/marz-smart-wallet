export const runtime = "edge";
export const revalidate = 30;

import { NextResponse } from "next/server";

const PLACEHOLDER = "https://api.example.com/analytics/stats";

export async function GET(){
  try{
    const res = await fetch(PLACEHOLDER, { method: "GET", cache: "force-cache" });
    if(!res.ok) return NextResponse.json({error:"Upstream error", status: res.status}, { status: 502 });
    const data = await res.json();
    return NextResponse.json(data, { status: 200, headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=60" } });
  }catch(err){
    return NextResponse.json({ error: "Fetch failed", detail: String(err) }, { status: 502 });
  }
}
