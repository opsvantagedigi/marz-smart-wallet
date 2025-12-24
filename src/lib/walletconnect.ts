import EthereumProvider from "@walletconnect/ethereum-provider";

export async function initWalletConnect() {
  if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
    throw new Error("WalletConnect project ID is missing");
  }

  const provider = await EthereumProvider.init({
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains: [1, 8453], // Ethereum + Base
    showQrModal: true,
  });

  return provider;
}

// Alias for backward compatibility
export const getWalletConnect = initWalletConnect;
