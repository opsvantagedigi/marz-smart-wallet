"use client";

import { useEffect, useState } from "react";
import { getWalletState, clearWalletState } from "@/lib/wallet-state";

export function WalletDebugPanel() {
  const [state, setState] = useState(getWalletState());

  useEffect(() => {
    const interval = setInterval(() => {
      setState(getWalletState());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-xs rounded-lg border border-yellow-400/60 bg-black/80 px-4 py-3 text-xs text-yellow-100 shadow-lg">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold">MARZ Debug</span>
        <button
          onClick={() => {
            clearWalletState();
            setState({ type: "none", address: null });
          }}
          className="text-[10px] text-red-300 hover:text-red-200"
        >
          Clear state
        </button>
      </div>
      <div>Type: {state.type}</div>
      <div className="break-all">
        Address: {state.address ?? "null"}
      </div>
    </div>
  );
}
