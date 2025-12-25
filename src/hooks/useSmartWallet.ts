"use client";

import { useEffect, useState } from "react";
import { getSmartWalletClient } from "@/lib/smartWallet";

export function useSmartWallet() {
  const [client, setClient] = useState<Awaited<ReturnType<typeof getSmartWalletClient>> | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const c = await getSmartWalletClient();
        if (!mounted) return;
        setClient(c as Awaited<ReturnType<typeof getSmartWalletClient>>);

        // Guarded call in case client shape changes
        const maybeGetAddress = (c as unknown as { getAddress?: unknown }).getAddress;
        if (typeof maybeGetAddress === "function") {
          try {
            const addr = await (maybeGetAddress as () => Promise<string>)();
            if (mounted) setAddress(addr ?? null);
          } catch (err) {
            console.warn("getAddress failed:", err);
          }
        }
      } catch (error) {
        console.error("Failed to initialize wallet:", error);
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  return { client, address };
}
