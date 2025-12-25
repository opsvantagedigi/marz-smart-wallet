"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { connectWalletConnect } from "@/lib/marzWalletConnect";
import { createMarzSmartWallet } from "@/lib/marzSmartWallet";
import { getWalletState, setWalletState, clearWalletState, type WalletType } from "@/lib/wallet-state";

 type WalletContextValue = {
  address: string | null;
  type: WalletType;
  isLoading: boolean;
  error: string | null;
  connectExternal: (navigate?: boolean) => Promise<void>;
  createSmartWallet: (navigate?: boolean) => Promise<void>;
  disconnect: () => void;
  isInitialized?: boolean;
 };

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [address, setAddress] = useState<string | null>(null);
  const [type, setType] = useState<WalletType>("none");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage on client
    const st = getWalletState();
    if (st.type && st.address) {
      setAddress(st.address);
      setType(st.type);
    }
    // mark initialization complete so consumers don't prematurely redirect
    setIsInitialized(true);
  }, []);

  const connectExternal = async (navigate = true) => {
    setIsLoading(true);
    setError(null);
    try {
      // Try browser injected provider first (MetaMask)
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const w = (window as any).ethereum;
        const accounts: string[] = await w.request({ method: "eth_requestAccounts" });
        const addr = Array.isArray(accounts) && accounts.length > 0 ? accounts[0] : null;
        if (!addr) throw new Error("No accounts returned from injected provider");
          setAddress(addr);
          setType("external");
          setWalletState("external", addr);
          // wait a tick to allow state propagation before navigation
          await Promise.resolve();
          if (navigate) router.push("/dashboard");
          return;
      }

      // Fallback to WalletConnect
      const provider = await connectWalletConnect();
      // provider may expose accounts or require a request
      // Try common properties first
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyProv: any = provider;
      let accounts: string[] | undefined = anyProv.accounts as string[] | undefined;
      if (!accounts) {
        try {
          accounts = (await anyProv.request({ method: "eth_accounts" })) as string[];
        } catch (err) {
          // ignore
        }
      }
      const addr = Array.isArray(accounts) && accounts.length > 0 ? accounts[0] : null;
      if (!addr) throw new Error("No accounts returned from WalletConnect provider");
      setAddress(addr);
      setType("external");
      setWalletState("external", addr);
      await Promise.resolve();
      if (navigate) router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      console.error("connectExternal error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const createSmartWallet = async (navigate = true) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createMarzSmartWallet();
      // createMarzSmartWallet may return { client, address } or the client directly
      // Try to extract address safely
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyRes: any = result;
      const addr: string | null = (anyRes && (anyRes.address || anyRes.account?.address || anyRes.signer?.address)) ?? null;
      const finalAddr = addr ?? `smart-${Date.now().toString(36).slice(-8)}`;
      setAddress(finalAddr);
      setType("smart");
      setWalletState("smart", finalAddr);
      await Promise.resolve();
      if (navigate) router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      console.error("createSmartWallet error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    clearWalletState();
    setAddress(null);
    setType("none");
    router.push("/onboarding");
  };

  return (
    <WalletContext.Provider value={{ address, type, isLoading, error, connectExternal, createSmartWallet, disconnect, isInitialized }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}

export default WalletContext;
