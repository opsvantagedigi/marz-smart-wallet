"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

type WalletStatus = "disconnected" | "connecting" | "connected" | "error";

interface WalletContextValue {
  address: string | null;
  status: WalletStatus;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  // Optional helper kept for compatibility with existing code
  createSmartWallet?: () => Promise<void>;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [status, setStatus] = useState<WalletStatus>("disconnected");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const connect = useCallback(async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      setError("MetaMask not found. Please install it.");
      setStatus("error");
      return;
    }

    const ethereum = (window as any).ethereum;

    try {
      setStatus("connecting");
      setError(null);

      const accounts: string[] = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const nextAddress = accounts[0] ?? null;
      setAddress(nextAddress);
      setStatus(nextAddress ? "connected" : "disconnected");

      if (nextAddress) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Wallet connect error:", err);
      setError("Failed to connect wallet.");
      setStatus("error");
    }
  }, [router]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setStatus("disconnected");
    setError(null);
    router.push("/");
  }, [router]);

  // Optional: hydrate from localStorage without setState loops in effects
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("marz_wallet_address");
    if (stored) {
      setAddress(stored);
      setStatus("connected");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (address) {
      window.localStorage.setItem("marz_wallet_address", address);
    } else {
      window.localStorage.removeItem("marz_wallet_address");
    }
  }, [address]);

  const value: WalletContextValue = {
    address,
    status,
    error,
    connect,
    disconnect,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = (): WalletContextValue => {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return ctx;
};

export default WalletContext;
