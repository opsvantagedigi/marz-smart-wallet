import { Alchemy, Network } from "alchemy-sdk";

const apiKey = process.env.ALCHEMY_DATA_API_KEY!;

export function getAlchemy(chain: string = "marz-mainnet") {
  const networkMap: Record<string, Network> = {
    "marz-mainnet": Network.BASE_MAINNET, // Fallback to Base for Alchemy SDK (MARZ not natively supported)
    "eth-mainnet": Network.ETH_MAINNET,
    "base-mainnet": Network.BASE_MAINNET,
    "polygon-mainnet": Network.MATIC_MAINNET,
    "arbitrum-mainnet": Network.ARB_MAINNET,
    "optimism-mainnet": Network.OPT_MAINNET,
  };

  // For MARZ network, we'll need to use custom RPC
  // Since Alchemy SDK doesn't natively support MARZ, we default to BASE_MAINNET
  // In production, you'd use a custom provider for MARZ
  return new Alchemy({
    apiKey,
    network: networkMap[chain] || Network.BASE_MAINNET,
  });
}
