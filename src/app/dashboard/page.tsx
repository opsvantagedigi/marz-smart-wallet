"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPortfolio, getNFTs, getActivity } from "./actions";
import { getWalletState, clearWalletState, type WalletType } from "@/lib/wallet-state";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { TokenCard } from "@/components/dashboard/TokenCard";
import { NFTGrid } from "@/components/dashboard/NFTGrid";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { ChainSelector } from "@/components/dashboard/ChainSelector";
import { TokenCardSkeleton, NFTSkeleton, ActivitySkeleton } from "@/components/dashboard/Skeleton";

import { SolanaRpcPanel } from "@/components/dashboard/SolanaRpcPanel";

// TODO: Update MARZ RPC + Chain ID once rollup provisioning completes.

export default function DashboardPage() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<WalletType>("none");
  const [isLoading, setIsLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<{
    tokenBalances: Array<{ symbol: string; balance: string; decimals?: number }>;
  } | null>(null);
  const [nfts, setNfts] = useState<{ ownedNfts: Array<{ title?: string; media?: Array<{ gateway?: string }>; contract?: { name?: string } }> } | null>(null);
  const [activity, setActivity] = useState<{ transfers: Array<{ from?: string; asset?: string; category?: string; value?: number; blockNum?: string; hash?: string }> } | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedChain, setSelectedChain] = useState("marz-neosphere"); // Default to MARZ NeoSphere

  useEffect(() => {
    // Check wallet connection using centralized state
    const { type, address } = getWalletState();

    if (type === "none" || !address) {
      // No wallet connected, redirect to onboarding
      router.replace("/onboarding");
      return;
    }

    setWalletType(type);
    setWalletAddress(address);
    setIsLoading(false);
    // If you want to avoid cascading renders, you could use a single state object for wallet info
    // or use React's batch updates (which is default in event handlers and effects in React 18+)
  }, [router]);

  useEffect(() => {
    // Fetch wallet data when address is available and valid
    if (walletAddress && walletAddress !== "0x0000000000000000000000000000000000000000" && !dataLoading) {
      setDataLoading(true);
      Promise.all([
        getPortfolio(walletAddress, selectedChain),
        getNFTs(walletAddress, selectedChain),
        getActivity(walletAddress, selectedChain),
      ])
        .then(([portfolioData, nftsData, activityData]) => {
          setPortfolio(
            portfolioData
              ? {
                  tokenBalances: Array.isArray(portfolioData.tokenBalances)
                    ? portfolioData.tokenBalances
                        .filter((t: any) => t && t.symbol && t.balance)
                        .map((t: any) => ({
                          symbol: t.symbol,
                          balance: t.balance,
                          decimals: t.decimals,
                        }))
                    : [],
                }
              : { tokenBalances: [] }
          );
          setNfts(nftsData);
          setActivity(
            activityData
              ? {
                  transfers: activityData.transfers.map((t: any) => ({
                    ...t,
                    asset: t.asset === null ? undefined : t.asset,
                  })),
                }
              : null
          );
        })
        .catch((error) => {
          console.error("Error fetching wallet data:", error);
        })
        .finally(() => {
          setDataLoading(false);
        });
    }
  }, [walletAddress, selectedChain, dataLoading]);

  if (isLoading || walletType === "none") {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h1 className="font-orbitron text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] bg-clip-text text-transparent mb-4">
              MARZ Dashboard
            </h1>
            <p className="font-inter text-white/70 text-lg">
              Your Smart Wallet Command Center
            </p>
          </div>

          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white">
            <h2 className="font-orbitron text-xl mb-2">Redirecting to onboarding…</h2>
            <p className="text-white/70 font-inter">No wallet connected.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-orbitron text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] bg-clip-text text-transparent mb-4">
            MARZ Dashboard
          </h1>
          <p className="font-inter text-white/70 text-lg">
            Your Smart Wallet Command Center
          </p>
        </div>

        {/* Wallet Status */}
        <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-orbitron text-xl">
                  {walletType === "smart" ? "Smart Wallet Connected" : "External Wallet Connected"}
                </h2>
                {selectedChain === "marz-neosphere" && (
                  <span className="px-2 py-1 rounded-full bg-gradient-to-r from-[#007F7F] to-[#00BFFF] text-xs font-orbitron">
                    🚀 MARZ NeoSphere
                  </span>
                )}
              </div>
              <p className="text-white/70 font-inter text-sm mb-2">
                Type: {walletType === "smart" ? "Alchemy Smart Account on MARZ NeoSphere" : "WalletConnect / External"}
              </p>
              <p className="text-white/60 font-inter text-xs mb-2">
                Chain ID: {selectedChain === "marz-neosphere" ? "1205614524712072" : "Other"}
              </p>
              {walletAddress && (
                <p className="text-white/70 break-all text-xs font-mono bg-black/40 p-3 rounded border border-white/5">
                  {walletAddress}
                </p>
              )}
            </div>
            <div>
              <ChainSelector chain={selectedChain} setChain={setSelectedChain} />
            </div>
          </div>
          <div className="flex gap-3">
            {walletAddress && (
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] text-black font-orbitron text-sm hover:scale-105 transition-all"
                onClick={() => {
                  navigator.clipboard.writeText(walletAddress);
                  alert("Address copied!");
                }}
              >
                Copy Address
              </button>
            )}
            <button
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-white font-inter text-sm transition-all"
              onClick={() => {
                clearWalletState();
                router.push("/onboarding");
              }}
            >
              Disconnect
            </button>
          </div>
        </div>

        {/* MARZ Network Warning for Smart Wallets */}
        {walletType === "smart" && selectedChain !== "marz-neosphere" && (
          <div className="p-4 rounded-xl bg-yellow-900/40 border border-yellow-500/50 text-yellow-100">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-orbitron text-sm font-semibold mb-1">
                  Smart Wallet Network Warning
                </h3>
                <p className="text-xs text-yellow-200/80">
                  Your Smart Wallet is deployed on MARZ NeoSphere (Chain ID: 1205614524712072). Switch to MARZ NeoSphere for optimal performance and to access your full wallet features.
                </p>
                <button
                  onClick={() => setSelectedChain("marz-neosphere")}
                  className="mt-2 px-3 py-1 rounded bg-yellow-500 text-black text-xs font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Switch to MARZ NeoSphere
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="space-y-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Token Balances */}
          <div className="md:col-span-2 space-y-6">
            <SectionCard title="Token Balances">
              {dataLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <TokenCardSkeleton />
                  <TokenCardSkeleton />
                  <TokenCardSkeleton />
                  <TokenCardSkeleton />
                </div>
              ) : (portfolio?.tokenBalances ?? []).length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(portfolio?.tokenBalances ?? []).slice(0, 8).map((token: any, i: number) => (
                    <TokenCard
                      key={i}
                      symbol={token.symbol || "Unknown"}
                      balance={parseFloat(token.balance) / Math.pow(10, token.decimals || 18)}
                      price={0}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-white/50 text-center py-8">No tokens found</div>
              )}
            </SectionCard>

            {/* NFTs */}
            <SectionCard title="NFT Collection">
              {dataLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <NFTSkeleton />
                  <NFTSkeleton />
                  <NFTSkeleton />
                  <NFTSkeleton />
                </div>
              ) : (
                <NFTGrid nfts={nfts} />
              )}
            </SectionCard>

            {/* Activity */}
            <SectionCard title="Recent Activity">
              {dataLoading ? (
                <div className="space-y-3">
                  <ActivitySkeleton />
                  <ActivitySkeleton />
                  <ActivitySkeleton />
                </div>
              ) : (
                <ActivityTimeline activity={activity} />
              )}
            </SectionCard>
          </div>
          <div className="md:col-span-1">
            {walletAddress && <SolanaRpcPanel userId={walletAddress} />}
          </div>
        </div>
      </div>
    </main>
  );
}
