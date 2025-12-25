import { NextRequest, NextResponse } from "next/server";

// Mock secret for Hello webhook signature
const HELLO_WEBHOOK_SECRET = process.env.HELLO_WEBHOOK_SECRET || "test_secret";

// Helper: Validate Hello webhook signature (HMAC SHA256)
function validateHelloSignature(req: NextRequest, body: string): boolean {
  const signature = req.headers.get("x-hello-signature");
  if (!signature) return false;
  // In real usage, use crypto.subtle or Node's crypto to verify HMAC
  // Here, we mock validation for demo
  // TODO: Replace with real HMAC validation
  return signature === "mocked-valid-signature";
}

// Mock: Update user billing status
async function updateUserBillingStatus(userId: string, status: string) {
  // Replace with real DB logic
  console.log(`Billing status for user ${userId} set to ${status}`);
}

export async function POST(req: NextRequest) {
  const body = await req.text();

  // Validate signature
  if (!validateHelloSignature(req, body)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: unknown;
  try {
    event = JSON.parse(body);
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof event !== "object" || event === null) {
    return NextResponse.json({ error: "Invalid event shape" }, { status: 400 });
  }

  const ev = event as Record<string, unknown>;
  const type = typeof ev.type === "string" ? ev.type : undefined;
  const data = ev.data as Record<string, unknown> | undefined;
  if (!type || !data) {
    return NextResponse.json({ error: "Missing event type or data" }, { status: 400 });
  }

  // Handle events
  switch (type) {
    case "subscription.created": {
      if (typeof data.userId === "string") await updateUserBillingStatus(data.userId, "active");
      break;
    }
    case "subscription.updated": {
      if (typeof data.userId === "string") await updateUserBillingStatus(data.userId, (typeof data.status === "string" ? data.status : "active"));
      break;
    }
    case "subscription.canceled": {
      if (typeof data.userId === "string") await updateUserBillingStatus(data.userId, "canceled");
      break;
    }
    case "invoice.paid": {
      if (typeof data.userId === "string") await updateUserBillingStatus(data.userId, "paid");
      break;
    }
    case "invoice.payment_failed": {
      if (typeof data.userId === "string") await updateUserBillingStatus(data.userId, "payment_failed");
      break;
    }
    default:
      return NextResponse.json({ error: "Unhandled event type" }, { status: 400 });
  }

  return NextResponse.json({ received: true });
}
