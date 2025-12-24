"use client";

import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { LocalAccountSigner } from "@alchemy/aa-core";

// MARZ Network Chain Definition
const marzChain = {
  id: 99999,
  name: "MARZ Network",
  network: "marz",
  nativeCurrency: {
    name: "MARZ",
    symbol: "MARZ",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.marz.network"] },
    public: { http: ["https://rpc.marz.network"] },
  },
  blockExplorers: {
    default: { name: "MARZ Explorer", url: "https://explorer.marz.network" },
  },
};

export async function getSmartWalletClient() {
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!;
  const policyId = process.env.NEXT_PUBLIC_ALCHEMY_POLICY_ID!;

  // For demo purposes, generate a random signer
  // In production, this should be derived from user authentication
  const signer = LocalAccountSigner.mnemonicToAccountSigner(
    "test test test test test test test test test test test junk"
  );

  return createModularAccountAlchemyClient({
    apiKey,
    chain: marzChain as any, // Use MARZ Network
    signer,
    gasManagerConfig: {
      policyId,
    },
  });
}
