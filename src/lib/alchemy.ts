import { Alchemy, Network } from "alchemy-sdk";

const apiKey = process.env.ALCHEMY_DATA_API_KEY!;

export function getAlchemy(chain: string = "base-mainnet") {
  const networkMap: Record<string, Network> = {
    "eth-mainnet": Network.ETH_MAINNET,
    "base-mainnet": Network.BASE_MAINNET,
    "polygon-mainnet": Network.MATIC_MAINNET,
    "arbitrum-mainnet": Network.ARB_MAINNET,
    "optimism-mainnet": Network.OPT_MAINNET,
  };

  return new Alchemy({
    apiKey,
    network: networkMap[chain] || Network.BASE_MAINNET,
  });
}
