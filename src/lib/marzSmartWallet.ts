import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { LocalAccountSigner } from "@alchemy/aa-core";

// TODO: Update MARZ RPC + Chain ID once rollup provisioning completes.

export const createMarzSmartWallet = async () => {
  const signer = LocalAccountSigner.mnemonicToAccountSigner(
    "test test test test test test test test test test test junk"
  );

  const client = await createModularAccountAlchemyClient({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
    chain: {
      id: Number(process.env.NEXT_PUBLIC_MARZ_CHAIN_ID),
      rpcUrl: process.env.NEXT_PUBLIC_MARZ_RPC_URL!,
    } as any,
    signer,
    gasManagerConfig: {
      policyId: process.env.NEXT_PUBLIC_ALCHEMY_POLICY_ID!,
    },
  });

  return client;
};
