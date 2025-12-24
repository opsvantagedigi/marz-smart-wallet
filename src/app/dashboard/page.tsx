"use client";

import { AlchemyAccountProvider, useUser } from "@account-kit/react";
import { config, queryClient } from "@/lib/account-kit-config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function DashboardContent() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    // If no user is authenticated, redirect to onboarding
    if (user === null) {
      router.push("/onboarding");
    }
  }, [user, router]);

  if (user === undefined) {
    // Loading state
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
            <h2 className="font-orbitron text-xl mb-2">Loading Dashboard…</h2>
            <p className="text-white/70 font-inter">Checking authentication status.</p>
          </div>
        </div>
      </main>
    );
  }

  if (user === null) {
    // Will redirect, show loading
    return null;
  }

  // User is authenticated
  const address = user.address;

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
            <h2 className="font-orbitron text-xl mb-2">Your Smart Wallet is Ready</h2>
            <p className="text-white/70 font-inter text-sm mb-2">
              Type: Alchemy Smart Account
            </p>
            <p className="text-white/70 font-inter break-all text-xs font-mono bg-black/40 p-3 rounded border border-white/5">
              {address}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] text-black font-orbitron text-sm hover:scale-105 transition-all"
              onClick={() => {
                // Copy address to clipboard
                navigator.clipboard.writeText(address);
                alert("Address copied to clipboard!");
              }}
            >
              Copy Address
            </button>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white">
            <h3 className="font-orbitron text-lg mb-2">Balances</h3>
            <p className="text-white/50 font-inter text-sm">Coming soon...</p>
          </div>
          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white">
            <h3 className="font-orbitron text-lg mb-2">NFTs</h3>
            <p className="text-white/50 font-inter text-sm">Coming soon...</p>
          </div>
          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white">
            <h3 className="font-orbitron text-lg mb-2">Activity</h3>
            <p className="text-white/50 font-inter text-sm">Coming soon...</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <AlchemyAccountProvider config={config} queryClient={queryClient}>
      <DashboardContent />
    </AlchemyAccountProvider>
  );
}
