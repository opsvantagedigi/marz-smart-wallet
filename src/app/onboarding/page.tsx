"use client";

import {
  AlchemyAccountProvider,
  useAuthModal,
} from "@account-kit/react";
import { config, queryClient } from "@/lib/account-kit-config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function OnboardingContent() {
  const { openAuthModal } = useAuthModal();
  const router = useRouter();

  // Auto-open auth modal on mount
  useEffect(() => {
    openAuthModal();
  }, [openAuthModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00010a] via-[#02192b] to-[#003333] flex items-center justify-center px-4">
      <div className="max-w-xl w-full p-8 bg-black/70 rounded-2xl border border-white/15 shadow-xl">
        <h1 className="font-orbitron text-3xl text-white mb-3 text-center bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] bg-clip-text text-transparent">
          Welcome to MARZ
        </h1>
        <p className="text-white/70 text-base mb-6 text-center font-inter">
          Choose how you want to connect
        </p>
        <div className="text-center">
          <button
            onClick={() => openAuthModal()}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] text-black font-orbitron text-sm hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300"
          >
            Connect Wallet
          </button>
        </div>
        <p className="text-white/50 text-xs mt-6 text-center font-inter">
          Smart Wallet with gasless transactions or connect your existing wallet
        </p>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <AlchemyAccountProvider config={config} queryClient={queryClient}>
      <OnboardingContent />
    </AlchemyAccountProvider>
  );
}
