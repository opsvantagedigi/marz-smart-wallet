"use client";

import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { LocalAccountSigner } from "@alchemy/aa-core";
import { marzChain } from "./chains";

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
    chain: marzChain as unknown, // Use MARZ NeoSphere OP Stack chain
    signer,
    gasManagerConfig: {
      policyId,
    },
  });
}
