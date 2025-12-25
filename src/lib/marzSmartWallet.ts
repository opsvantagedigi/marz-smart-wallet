import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { LocalAccountSigner } from "@alchemy/aa-core";
import type { Chain } from "viem";

// TODO: Update MARZ RPC + Chain ID once rollup provisioning completes.

export const createMarzSmartWallet = async () => {
  const signer = LocalAccountSigner.mnemonicToAccountSigner(
    "test test test test test test test test test test test junk"
  );

  const client = await createModularAccountAlchemyClient({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chain: ({
      id: Number(process.env.NEXT_PUBLIC_MARZ_CHAIN_ID),
      rpcUrl: process.env.NEXT_PUBLIC_MARZ_RPC_URL!,
    } as unknown) as Chain,
    signer,
    gasManagerConfig: {
      policyId: process.env.NEXT_PUBLIC_ALCHEMY_POLICY_ID!,
    },
  });

  // Try to derive an address from the signer if available
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
};
