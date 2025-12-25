"use client";

import { useWallet } from "@/context/WalletContext";
import { Loader2, Wallet as WalletIcon } from "lucide-react";

interface WalletConnectButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
}

export const WalletConnectButton = ({
  variant = "primary",
  className = "",
}: WalletConnectButtonProps) => {
  const { status, address, connect, disconnect, error } = useWallet() as any;

  const isConnecting = status === "connecting";

  const handleClick = async () => {
    if (status === "connected") {
      disconnect();
    } else {
      await connect();
    }
  };

  const label =
    status === "connected"
      ? address
        ? `Connected: ${address.slice(0, 6)}…${address.slice(-4)}`
        : "Connected"
      : isConnecting
      ? "Connecting…"
      : "Connect Wallet";

  const base =
    variant === "primary"
      ? "bg-marz-green text-marz-blue hover:bg-marz-yellow"
      : "border border-glass-border bg-glass-dark text-slate-100 hover:bg-glass-light";

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        disabled={isConnecting}
        className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-inter font-semibold transition-colors ${base}`}
      >
        {isConnecting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <WalletIcon className="w-4 h-4" />
        )}
        <span className="truncate max-w-[200px]">{label}</span>
      </button>
      {error && (
        <p className="text-xs text-red-400 font-inter">{error}</p>
      )}
    </div>
  );
};
