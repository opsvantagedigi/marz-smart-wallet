"use client";

import { useState } from "react";
import Link from "next/link";
import { initWalletConnect } from "@/lib/walletconnect";
import { setWalletState } from "@/lib/wallet-state";
import { Wallet, Mail, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleWalletConnect() {
    setIsConnecting(true);
    setError(null);
    try {
      const provider = await initWalletConnect();
      const accounts = await provider.enable();

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts returned from WalletConnect");
      }

      const address = accounts[0];
      setWalletState("external", address);
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("WalletConnect error:", err);
      setError(err?.message || "Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  }

  function handleSmartWallet() {
    setError(null);
    try {
      // For Smart Wallet, set type and redirect to dashboard for setup
      // We'll set a placeholder address that dashboard will replace
      setWalletState("smart", "0x0000000000000000000000000000000000000000");
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Smart Wallet error:", err);
      setError("Failed to initialize Smart Wallet. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00010a] via-[#02192b] to-[#003333] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] bg-clip-text text-transparent mb-4">
            Welcome to MARZ
          </h1>
          <p className="text-white/70 font-inter text-lg">
            Choose how you want to connect
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-900/70 border border-red-500/60">
            <p className="text-red-100 font-inter text-sm">{error}</p>
          </div>
        )}

        {/* Connection Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Smart Wallet Option */}
          <button
            onClick={handleSmartWallet}
            className="group p-8 rounded-xl bg-black/40 border-2 border-white/10 hover:border-[#00BFFF]/50 hover:bg-black/60 transition-all duration-300 text-left"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#007F7F] to-[#00BFFF] flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#00BFFF] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-orbitron text-xl text-white mb-2">Smart Wallet</h3>
            <p className="text-white/60 font-inter text-sm mb-4">
              Sign in with email or social accounts. Gasless transactions included.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded bg-green-400/20 text-green-400 text-xs font-inter">
                Recommended
              </span>
              <span className="px-2 py-1 rounded bg-white/10 text-white/60 text-xs font-inter">
                No seed phrase
              </span>
            </div>
          </button>

          {/* External Wallet Option */}
          <button
            onClick={handleWalletConnect}
            disabled={isConnecting}
            className="group p-8 rounded-xl bg-black/40 border-2 border-white/10 hover:border-[#FFD700]/50 hover:bg-black/60 transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
                <Wallet className="w-6 h-6 text-black" />
              </div>
              <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#FFD700] group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-orbitron text-xl text-white mb-2">
              {isConnecting ? "Connecting..." : "External Wallet"}
            </h3>
            <p className="text-white/60 font-inter text-sm mb-4">
              Connect MetaMask, Coinbase Wallet, or any WalletConnect wallet.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded bg-white/10 text-white/60 text-xs font-inter">
                MetaMask
              </span>
              <span className="px-2 py-1 rounded bg-white/10 text-white/60 text-xs font-inter">
                Coinbase
              </span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/50 font-inter text-sm mb-4">
            New to crypto wallets?{" "}
            <a href="#" className="text-[#00BFFF] hover:underline">
              Learn more
            </a>
          </p>
          <Link
            href="/"
            className="text-white/40 hover:text-white/70 font-inter text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
