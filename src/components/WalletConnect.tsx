"use client";
import React from "react";
import { useWallet } from "@/context/WalletContext";
import { Wallet, Zap, ArrowLeftRight, Download } from "lucide-react";

export default function WalletConnectPanel() {
  const { connectExternal, createSmartWallet, isLoading, error } = useWallet();

  const handleSmartWallet = async () => {
    await createSmartWallet();
  };

  const handleWalletConnect = async () => {
    await connectExternal();
  };

  return (
    <div className="space-y-6">
      {/* Main Wallet Access Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-brand-blue to-brand-teal rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 heading-orbitron">
            Wallet Access
          </h3>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSmartWallet}
            disabled={isLoading}
            className="w-full group relative overflow-hidden px-4 py-4 bg-gradient-to-r from-brand-blue to-brand-teal text-white rounded-xl shadow hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">Create MARZ Smart Wallet</div>
                  <div className="text-xs text-white/80">Gas-sponsored transactions</div>
                </div>
              </div>
              <ArrowLeftRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={handleWalletConnect}
            disabled={isLoading}
            className="w-full group px-4 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">Connect Existing Wallet</div>
                  <div className="text-xs text-white/70">WalletConnect compatible</div>
                </div>
              </div>
              <ArrowLeftRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {(error || isLoading) && (
            <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <p className="text-sm text-slate-700 font-medium text-center">
                {isLoading ? "Processing…" : error}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Info Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200 p-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-3 heading-orbitron">
          Wallet Benefits
        </h4>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-teal mt-1.5"></div>
            <p className="text-sm text-slate-600">Gasless transactions on MARZ</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-teal mt-1.5"></div>
            <p className="text-sm text-slate-600">Multi-chain support ready</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-teal mt-1.5"></div>
            <p className="text-sm text-slate-600">Account abstraction enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
}
