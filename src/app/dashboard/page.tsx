"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/context/WalletContext";
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
  const { address, status, disconnect } = useWallet();
  const [walletInfo, setWalletInfo] = useState<{ address: string | null; type: WalletType; isLoading: boolean }>({ address: null, type: "none", isLoading: true });
  const [portfolio, setPortfolio] = useState<{
    tokenBalances: Array<{ symbol: string; balance: string; decimals?: number }>;
  } | null>(null);
  const [nfts, setNfts] = useState<{ ownedNfts: Array<{ title?: string; media?: Array<{ gateway?: string }>; contract?: { name?: string } }> } | null>(null);
  const [activity, setActivity] = useState<{ transfers: Array<{ from?: string; asset?: string; category?: string; value?: number; blockNum?: string; hash?: string }> } | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedChain, setSelectedChain] = useState("marz-neosphere"); // Default to MARZ NeoSphere

  useEffect(() => {
    // If there's no wallet, redirect to onboarding
    if (!address) {
      router.replace("/onboarding");
      return;
    }

    // Use functional update to merge state safely
    setWalletInfo((prev) => ({ ...prev, address, type: "external", isLoading: false }));
  }, [address, type, router]);

  useEffect(() => {
    // Fetch wallet data when address is available and valid
    if (walletInfo.address && walletInfo.address !== "0x0000000000000000000000000000000000000000" && !dataLoading) {
      let cancelled = false;
      async function fetchData() {
        setDataLoading(true);
        try {
          const [portfolioData, nftsData, activityData] = await Promise.all([
            getPortfolio(walletInfo.address!, selectedChain),
            getNFTs(walletInfo.address!, selectedChain),
            getActivity(walletInfo.address!, selectedChain),
          ]);

          // map portfolioData safely
          setPortfolio(
            portfolioData
              ? {
                  tokenBalances: Array.isArray(portfolioData.tokenBalances)
                    ? portfolioData.tokenBalances
                        .filter((t: unknown) => {
                          if (!t || typeof t !== "object") return false;
                          const obj = t as Record<string, unknown>;
                          const symbol = obj.symbol ?? (obj.tokenMetadata && (obj.tokenMetadata as Record<string, unknown>).symbol);
                          const balance = obj.balance ?? obj.tokenBalance;
                          return typeof symbol === "string" && typeof balance === "string";
                        })
                        .map((t: unknown) => {
                          const obj = t as Record<string, unknown>;
                          const metadata = (obj.tokenMetadata ?? {}) as Record<string, unknown>;
                          const symbol = (obj.symbol as string) ?? (metadata.symbol as string) ?? (obj.contractAddress as string) ?? "Unknown";
                          const balance = (obj.balance as string) ?? (obj.tokenBalance as string) ?? "0";
                          const decimals = typeof obj.decimals === "number" ? obj.decimals : (typeof metadata.decimals === "number" ? (metadata.decimals as number) : undefined);
                          return { symbol, balance, decimals };
                        })
                    : [],
                }
              : { tokenBalances: [] }
          );
          setNfts(nftsData);
          setActivity(
            activityData
              ? {
                  transfers: Array.isArray(activityData.transfers)
                    ? activityData.transfers.map((t: unknown) => {
                        const obj = (t as Record<string, unknown>) ?? {};
                        const asset = obj.asset === null ? undefined : (typeof obj.asset === "string" ? (obj.asset as string) : undefined);
                        return {
                          from: typeof obj.from === "string" ? (obj.from as string) : undefined,
                          asset,
                          category: typeof obj.category === "string" ? (obj.category as string) : undefined,
                          value: typeof obj.value === "number" ? (obj.value as number) : undefined,
                          blockNum: typeof obj.blockNum === "string" ? (obj.blockNum as string) : undefined,
                          hash: typeof obj.hash === "string" ? (obj.hash as string) : undefined,
                        };
                      })
                    : [],
                }
              : null
          );
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        } finally {
          if (!cancelled) setDataLoading(false);
        }
      }

      void fetchData();
      return () => {
        cancelled = true;
      };
    }
  }, [walletInfo.address, selectedChain, dataLoading]);

  if (status === "connecting" || walletInfo.isLoading || !address) {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h1 className="font-orbitron text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] bg-clip-text text-transparent mb-4">
              MARZ Dashboard
            </h1>
            <p className="font-inter text-white/70 text-lg">Your Smart Wallet Command Center</p>
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
                  {walletInfo.type === "smart" ? "Smart Wallet Connected" : "External Wallet Connected"}
                </h2>
                {selectedChain === "marz-neosphere" && (
                  <span className="px-2 py-1 rounded-full bg-gradient-to-r from-[#007F7F] to-[#00BFFF] text-xs font-orbitron">
                    🚀 MARZ NeoSphere
                  </span>
                )}
              </div>
              <p className="text-white/70 font-inter text-sm mb-2">
                Type: {walletInfo.type === "smart" ? "Alchemy Smart Account on MARZ NeoSphere" : "WalletConnect / External"}
              </p>
              <p className="text-white/60 font-inter text-xs mb-2">
                Chain ID: {selectedChain === "marz-neosphere" ? "1205614524712072" : "Other"}
              </p>
              {walletInfo.address && (
                <p className="text-white/70 break-all text-xs font-mono bg-black/40 p-3 rounded border border-white/5">
                  {walletInfo.address}
                </p>
              )}
            </div>
            <div>
              <ChainSelector chain={selectedChain} setChain={setSelectedChain} />
            </div>
          </div>
          <div className="flex gap-3">
            {walletInfo.address && (
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] text-black font-orbitron text-sm hover:scale-105 transition-all"
                onClick={() => {
                  navigator.clipboard.writeText(walletInfo.address ?? "");
                  alert("Address copied!");
                }}
              >
                Copy Address
              </button>
            )}
            <button
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-white font-inter text-sm transition-all"
              onClick={() => {
                disconnect();
              }}
            >
              Disconnect
            </button>
          </div>
        </div>

        {/* MARZ Network Warning for Smart Wallets */}
        {walletInfo.type === "smart" && selectedChain !== "marz-neosphere" && (
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
                  {(portfolio?.tokenBalances ?? []).slice(0, 8).map((token: { symbol: string; balance: string; decimals?: number }, i: number) => (
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
            {walletInfo.address && <SolanaRpcPanel userId={walletInfo.address} />}
          </div>
        </div>
      </div>
    </main>
  );
}
