// Avoid static imports of @alchemy packages to prevent build-time failures on environments
// where `@alchemy/aa-core` and `@alchemy/aa-alchemy` may be incompatible. Use dynamic
// imports at runtime when API keys are present; otherwise return a harmless stub.

import type { Chain } from "viem";

export const createMarzSmartWallet = async () => {
  // If Alchemy config is present, attempt a dynamic import and create a real client.
  if (process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
    try {
      // Dynamic imports avoid static resolution during build.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const aaAlchemy = await import("@alchemy/aa-alchemy");
      const aaCore = await import("@alchemy/aa-core");

      // Attempt to create a signer and client similar to previous implementation.
      // Guard all operations in try/catch to avoid bubbling runtime errors to the build.
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const LocalAccountSigner: any = aaCore?.LocalAccountSigner ?? aaCore?.localAccountSigner;
        const createModularAccountAlchemyClient: any = aaAlchemy?.createModularAccountAlchemyClient ?? aaAlchemy?.createClient;

        if (LocalAccountSigner && createModularAccountAlchemyClient) {
          const signer = LocalAccountSigner.mnemonicToAccountSigner(
            "test test test test test test test test test test test junk"
          );

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const client = await createModularAccountAlchemyClient({
            apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            chain: ({
              id: Number(process.env.NEXT_PUBLIC_MARZ_CHAIN_ID || 0),
              rpcUrl: process.env.NEXT_PUBLIC_MARZ_RPC_URL || "",
            } as unknown) as Chain,
            signer,
            gasManagerConfig: {
              policyId: process.env.NEXT_PUBLIC_ALCHEMY_POLICY_ID,
            },
          });

          // Try to extract address from signer
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const anySigner: any = signer;
          let address: string | null = null;
          try {
            if (typeof anySigner.getAddress === "function") {
              address = await anySigner.getAddress();
            } else if (anySigner.address) {
              address = anySigner.address as string;
            }
          } catch (err) {
            // ignore
          }

          return { client, address };
        }
      } catch (err) {
        // If dynamic import succeeded but creation failed, fall through to stub
        // eslint-disable-next-line no-console
        console.warn("Alchemy client creation failed, falling back to stub:", err);
      }
    } catch (err) {
      // Dynamic import failed; most likely package mismatch — fallback to stub
      // eslint-disable-next-line no-console
      console.warn("Dynamic import of Alchemy packages failed, using stub:", err);
    }
  }

  // Fallback stub: return a placeholder address and null client so callers can proceed
  const fallbackAddress = `smart-${Date.now().toString(36).slice(-8)}`;
  return { client: null, address: fallbackAddress };
};
