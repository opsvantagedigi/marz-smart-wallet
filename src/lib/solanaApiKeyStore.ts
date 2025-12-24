// In-memory Solana API key store for v0
import crypto from "crypto";

export type SolanaTier = "free" | "starter" | "pro" | "enterprise";

export interface SolanaTierConfig {
  name: string;
  monthlyRequestLimit: number; // HTTP RPC requests
  monthlyWsMessageLimit: number; // WS messages
  allowDevnet: boolean;
  allowMainnet: boolean;
  allowDevnetWs: boolean;
  allowMainnetWs: boolean;
}

export const SOLANA_TIER_CONFIG: Record<SolanaTier, SolanaTierConfig> = {
  free: {
    name: "Free",
    monthlyRequestLimit: 50_000,
    monthlyWsMessageLimit: 0,
    allowDevnet: true,
    allowMainnet: false,
    allowDevnetWs: false,
    allowMainnetWs: false,
  },
  starter: {
    name: "Starter",
    monthlyRequestLimit: 2_000_000,
    monthlyWsMessageLimit: 200_000,
    allowDevnet: true,
    allowMainnet: true,
    allowDevnetWs: true,
    allowMainnetWs: false,
  },
  pro: {
    name: "Pro",
    monthlyRequestLimit: 10_000_000,
    monthlyWsMessageLimit: 1_000_000,
    allowDevnet: true,
    allowMainnet: true,
    allowDevnetWs: true,
    allowMainnetWs: true,
  },
  enterprise: {
    name: "Enterprise",
    monthlyRequestLimit: Number.POSITIVE_INFINITY,
    monthlyWsMessageLimit: Number.POSITIVE_INFINITY,
    allowDevnet: true,
    allowMainnet: true,
    allowDevnetWs: true,
    allowMainnetWs: true,
  },
};

export function getTierConfig(tier: SolanaTier): SolanaTierConfig {
  return SOLANA_TIER_CONFIG[tier];
}

interface SolanaApiKey {
  key: string;
  userId: string;
  label?: string;
  createdAt: Date;
  tier: SolanaTier;
  // Billing fields for future Stripe integration
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  billingStatus?: "active" | "past_due" | "canceled" | "trialing";
  // legacy usage fields (kept for compatibility, primary usage is in analytics store)
  usageCount: number;
  resetAt: number; // timestamp (ms)
}


const keys: SolanaApiKey[] = [];

export async function createKey(userId: string, label?: string, tier: SolanaTier = "free"): Promise<string> {
  const key = `sk_${crypto.randomUUID()}`;
  const now = new Date();
  const resetAt = getNextResetTimestamp(now.getTime());
  keys.push({ key, userId, label, createdAt: now, tier, usageCount: 0, resetAt });
  return key;
}

export async function listKeys(userId: string): Promise<{ key: string; label?: string; createdAt: Date; tier: SolanaTier; usageCount: number; resetAt: number }[]> {
  return keys.filter(k => k.userId === userId).map(({ key, label, createdAt, tier, usageCount, resetAt }) => ({ key, label, createdAt, tier, usageCount, resetAt }));
}

export function getKey(key: string): SolanaApiKey | undefined {
  return keys.find(k => k.key === key);
}

export function incrementUsage(key: string): void {
  const k = getKey(key);
  if (k) k.usageCount += 1;
}

export function resetIfNeeded(key: string): void {
  const k = getKey(key);
  if (!k) return;
  const now = Date.now();
  if (now > k.resetAt) {
    k.usageCount = 0;
    k.resetAt = getNextResetTimestamp(now);
  }
}

export function getUsage(key: string): { usageCount: number; resetAt: number; tier: SolanaTier } | undefined {
  const k = getKey(key);
  if (!k) return undefined;
  return { usageCount: k.usageCount, resetAt: k.resetAt, tier: k.tier };
}

function getNextResetTimestamp(now: number): number {
  // Set to first day of next month, 00:00 UTC
  const d = new Date(now);
  d.setUTCMonth(d.getUTCMonth() + 1);
  d.setUTCDate(1);
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
}
