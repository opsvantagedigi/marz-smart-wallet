"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<"smart" | "external" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has connected wallet
    // For now, redirect to onboarding if no wallet detected
    // In production, this would check localStorage or wallet state
    const checkWallet = async () => {
      // Simulate wallet check
      const hasWallet = false; // Replace with actual wallet check logic
      
      if (!hasWallet) {
        router.push("/onboarding");
      } else {
        setIsLoading(false);
      }
    };
    
    checkWallet();
  }, [router]);

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
        {isLoading && (
          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white">
            <h2 className="font-orbitron text-xl mb-2">Loading Dashboard…</h2>
            <p className="text-white/70 font-inter">Checking wallet connection status.</p>
          </div>
        )}

        {!isLoading && walletAddress && (
          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white space-y-4">
            <div>
              <h2 className="font-orbitron text-xl mb-2">
                {walletType === "smart" ? "Smart Wallet Connected" : "External Wallet Connected"}
              </h2>
              <p className="text-white/70 font-inter text-sm mb-2">
                Type: {walletType === "smart" ? "Alchemy Account Abstraction" : "WalletConnect / Coinbase"}
              </p>
              <p className="text-white/70 font-inter break-all text-xs">{walletAddress}</p>
            </div>
          </div>
        )}

        {!isLoading && !walletAddress && (
          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white">
            <h2 className="font-orbitron text-xl mb-2">No Wallet Connected</h2>
            <p className="text-white/70 font-inter mb-4">Please connect a wallet to continue.</p>
            <button
              onClick={() => router.push("/onboarding")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] text-black font-orbitron text-sm hover:scale-105 transition-all"
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
