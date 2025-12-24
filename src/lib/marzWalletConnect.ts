import { EthereumProvider } from "@walletconnect/ethereum-provider";

// TODO: Update MARZ RPC + Chain ID once rollup provisioning completes.

export const connectWalletConnect = async () => {
  const provider = await EthereumProvider.init({
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
    chains: [Number(process.env.NEXT_PUBLIC_MARZ_CHAIN_ID)],
    rpcMap: {
      [process.env.NEXT_PUBLIC_MARZ_CHAIN_ID!]:
        process.env.NEXT_PUBLIC_MARZ_RPC_URL!,
    },
    showQrModal: true,
  });

  await provider.connect();
  return provider;
};
