"use client";

import { motion } from "framer-motion";

export function NFTGrid({ nfts }: any) {
  if (!nfts?.ownedNfts?.length) {
    return <div className="text-white/50 text-center py-8">No NFTs found</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {nfts.ownedNfts.slice(0, 12).map((nft: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-xl overflow-hidden bg-white/10 border border-white/10 hover:border-white/30 transition-all cursor-pointer"
        >
          {nft.media?.[0]?.gateway ? (
            <img src={nft.media[0].gateway} alt={nft.title} className="w-full h-40 object-cover" />
          ) : (
            <div className="w-full h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <span className="text-white/30 text-xs">No Image</span>
            </div>
          )}
          <div className="p-2">
            <div className="text-white text-sm truncate">{nft.title || "Untitled NFT"}</div>
            <div className="text-white/50 text-xs truncate">{nft.contract?.name || ""}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
