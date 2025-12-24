// In-memory Solana API key store for v0
import crypto from "crypto";


interface SolanaApiKey {
  key: string;
  userId: string;
  label?: string;
  createdAt: Date;
  tier: "free" | "starter";
  usageCount: number;
  resetAt: number; // timestamp (ms)
}


const keys: SolanaApiKey[] = [];

export const RATE_LIMITS = {
  free: 50000,
  starter: 2000000,
};


export async function createKey(userId: string, label?: string, tier: "free" | "starter" = "free"): Promise<string> {
  const key = `sk_${crypto.randomUUID()}`;
  const now = new Date();
  const resetAt = getNextResetTimestamp(now.getTime());
  keys.push({ key, userId, label, createdAt: now, tier, usageCount: 0, resetAt });
  return key;
}


export async function listKeys(userId: string): Promise<{ key: string; label?: string; createdAt: Date; tier: string; usageCount: number; resetAt: number }[]> {
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

export function getUsage(key: string): { usageCount: number; resetAt: number; tier: string } | undefined {
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
