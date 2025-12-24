import { NextRequest, NextResponse } from "next/server";
import { createKey, listKeys } from "@/lib/solanaApiKeyStore";

// Placeholder: Replace with real user auth
function getUserId(req: NextRequest): string | null {
  // In production, extract user from session/cookie/JWT
  return req.headers.get("x-user-id") || null;
}

export async function GET(req: NextRequest) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const keys = await listKeys(userId);
  return NextResponse.json({ keys });
}

export async function POST(req: NextRequest) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { label } = await req.json();
  const key = await createKey(userId, label);
  const keys = await listKeys(userId);
  return NextResponse.json({ keys });
}
