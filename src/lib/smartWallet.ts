"use client";

import { marzChain } from "./chains";
import type { Chain } from "viem";

export async function getSmartWalletClient() {
  // Avoid static imports of @alchemy packages so the bundler doesn't include them
  // at build time. Use dynamic import at runtime only when API keys are present.
  if (process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
    try {
      const aaAlchemy: any = await import("@alchemy/aa-alchemy");
      const aaCore: any = await import("@alchemy/aa-core");

      // Support multiple export shapes across versions
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const LocalAccountSigner: any = aaCore?.LocalAccountSigner ?? aaCore?.localAccountSigner;
      const createModularAccountAlchemyClient: any = aaAlchemy?.createModularAccountAlchemyClient ?? aaAlchemy?.createClient;

      if (LocalAccountSigner && createModularAccountAlchemyClient) {
        const signer = LocalAccountSigner.mnemonicToAccountSigner(
          "test test test test test test test test test test test junk"
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const client = await createModularAccountAlchemyClient({
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
          chain: marzChain as unknown as Chain,
          signer,
          gasManagerConfig: {
            policyId: process.env.NEXT_PUBLIC_ALCHEMY_POLICY_ID,
          },
        });

        return client;
      }
    } catch (err) {
      // Dynamic import failed or client creation failed; fall back to stub below
      // eslint-disable-next-line no-console
      console.warn("Failed to initialize Alchemy smart wallet client:", err);
    }
  }

  // Fallback stub client exposing a safe `getAddress` method so callers can
  // continue to operate in development or when Alchemy isn't configured.
  return {
    // eslint-disable-next-line @typescript-eslint/require-await
    getAddress: async () => `stub-${Date.now().toString(36).slice(-8)}`,
  } as const;
}

export interface SmartWalletInfo {
  address: string;
  guardians: number;
  requiredGuardians: number;
  chain: "neosphere" | string;
  hasGasAbstraction: boolean;
}

export function getSmartWallet(ownerAddress: string): SmartWalletInfo | null {
  if (!ownerAddress) return null;

  return {
    address: ownerAddress,
    guardians: 3,
    requiredGuardians: 2,
    chain: "neosphere",
    hasGasAbstraction: true,
  };
}
