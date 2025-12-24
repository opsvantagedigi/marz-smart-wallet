"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPortfolio, getNFTs, getActivity } from "./actions";
import { getWalletState, clearWalletState, type WalletType } from "@/lib/wallet-state";

export default function DashboardPage() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<WalletType>("none");
  const [isLoading, setIsLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [nfts, setNfts] = useState<any>(null);
  const [activity, setActivity] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(false);

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
  }, [router]);

  useEffect(() => {
    // Fetch wallet data when address is available and valid
    if (walletAddress && walletAddress !== "0x0000000000000000000000000000000000000000" && !dataLoading) {
      setDataLoading(true);
      Promise.all([
        getPortfolio(walletAddress),
        getNFTs(walletAddress),
        getActivity(walletAddress),
      ])
        .then(([portfolioData, nftsData, activityData]) => {
          setPortfolio(portfolioData);
          setNfts(nftsData);
          setActivity(activityData);
        })
        .catch((error) => {
          console.error("Error fetching wallet data:", error);
        })
        .finally(() => {
          setDataLoading(false);
        });
    }
  }, [walletAddress, dataLoading]);

  if (isLoading || walletType === "none") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-[#001a1a] to-[#003333] py-20 px-4">
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
    <main className="min-h-screen bg-gradient-to-br from-black via-[#001a1a] to-[#003333] py-20 px-4">
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
          <div>
            <h2 className="font-orbitron text-xl mb-2">
              {walletType === "smart" ? "Smart Wallet Connected" : "External Wallet Connected"}
            </h2>
            <p className="text-white/70 font-inter text-sm mb-2">
              Type: {walletType === "smart" ? "Alchemy Smart Account (Setup Required)" : "WalletConnect / External"}
            </p>
            {walletAddress && (
              <p className="text-white/70 break-all text-xs font-mono bg-black/40 p-3 rounded border border-white/5">
                {walletAddress}
              </p>
            )}
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

        {/* Coming Soon Section */}
        <div className="grid grid-cols-1 gap-6">
          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white">
            <h3 className="font-orbitron text-lg mb-4">Balances</h3>
            {dataLoading ? (
              <p className="text-white/50 font-inter text-sm">Loading balances...</p>
            ) : portfolio ? (
              <pre className="text-white/70 text-sm overflow-x-auto">{JSON.stringify(portfolio, null, 2)}</pre>
            ) : (
              <p className="text-white/50 font-inter text-sm">No data available</p>
            )}
          </div>
          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white">
            <h3 className="font-orbitron text-lg mb-4">NFTs</h3>
            {dataLoading ? (
              <p className="text-white/50 font-inter text-sm">Loading NFTs...</p>
            ) : nfts ? (
              <pre className="text-white/70 text-sm overflow-x-auto">{JSON.stringify(nfts, null, 2)}</pre>
            ) : (
              <p className="text-white/50 font-inter text-sm">No data available</p>
            )}
          </div>
          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white">
            <h3 className="font-orbitron text-lg mb-4">Activity</h3>
            {dataLoading ? (
              <p className="text-white/50 font-inter text-sm">Loading activity...</p>
            ) : activity ? (
              <pre className="text-white/70 text-sm overflow-x-auto">{JSON.stringify(activity, null, 2)}</pre>
            ) : (
              <p className="text-white/50 font-inter text-sm">No data available</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
