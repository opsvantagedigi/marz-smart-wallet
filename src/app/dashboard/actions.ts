"use server";

import { getAlchemy } from "@/lib/alchemy";
import { AssetTransfersCategory } from "alchemy-sdk";

export async function getPortfolio(address: string, chain: string = "base-mainnet") {
  const alchemy = getAlchemy(chain);
  const balances = await alchemy.core.getTokenBalances(address);
  return balances;
}

export async function getNFTs(address: string, chain: string = "base-mainnet") {
  const alchemy = getAlchemy(chain);
  return alchemy.nft.getNftsForOwner(address);
}

export async function getActivity(address: string, chain: string = "base-mainnet") {
  const alchemy = getAlchemy(chain);
  return alchemy.core.getAssetTransfers({
    fromAddress: address,
    category: [
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.ERC721,
      AssetTransfersCategory.ERC1155,
    ],
    maxCount: 20,
  });
}
