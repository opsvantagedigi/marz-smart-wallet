import { createSmartAccountClient } from "@alchemy/aa-core";
import { LocalAccountSigner } from "@alchemy/aa-core";
import { AlchemyProvider } from "@alchemy/aa-ethers";

export function getSmartWalletClient() {
  const apiKey = process.env.ALCHEMY_WALLET_API_KEY!;
  const appId = process.env.ALCHEMY_WALLET_APP_ID!;
  const bundlerKey = process.env.ALCHEMY_BUNDLER_API_KEY!;
  const gasPolicy = process.env.ALCHEMY_GAS_MANAGER_POLICY_ID!;

  const provider = new AlchemyProvider({
    apiKey,
    chain: "base-mainnet", // default chain for MARZ
  });

  const signer = LocalAccountSigner.privateKeyToAccountSigner(
    process.env.ALCHEMY_WALLET_PRIVATE_KEY!
  );

  return createSmartAccountClient({
    signer,
    chain: provider.chain,
    rpcClient: provider,
    gasManagerConfig: {
      policyId: gasPolicy,
    },
    opts: {
      txMaxRetries: 3,
      txRetryIntervalMs: 1500,
    },
  });
}
