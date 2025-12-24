import EthereumProvider from "@walletconnect/ethereum-provider";

export async function getWalletConnect() {
  return await EthereumProvider.init({
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [1, 8453], // Ethereum + Base
    showQrModal: true,
  });
}
