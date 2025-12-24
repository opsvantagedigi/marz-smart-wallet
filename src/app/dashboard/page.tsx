"use client";

import { useSmartWallet } from "@/hooks/useSmartWallet";

export default function DashboardPage() {
  const { client, address } = useSmartWallet();

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

        {/* Smart Wallet Status */}
        {!address && (
          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white">
            <h2 className="font-orbitron text-xl mb-2">Setting up your MARZ Smart Wallet…</h2>
            <p className="text-white/70 font-inter">Please wait while we deploy your smart account.</p>
          </div>
        )}

        {address && (
          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-white">
            <h2 className="font-orbitron text-xl mb-2">Your Smart Wallet is Ready</h2>
            <p className="text-white/70 font-inter break-all">{address}</p>
          </div>
        )}

        {/* Test Transaction Button */}
        {client && (
          <button
            onClick={async () => {
              await client.sendUserOperation({
                target: address!,
                data: "0x",
              });
              alert("Gasless test transaction sent!");
            }}
            className="
              mt-4 px-6 py-3 rounded-lg
              bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700]
              text-black font-orbitron text-sm
              hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/50
              transition-all duration-300
            "
          >
            Send Gasless Test Transaction
          </button>
        )}
      </div>
    </main>
  );
}
