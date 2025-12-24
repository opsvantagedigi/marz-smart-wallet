"use client";

import { useEffect, useState } from "react";
import { getSmartWalletClient } from "@/lib/smartWallet";

export function useSmartWallet() {
  const [client, setClient] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const c = await getSmartWalletClient();
        setClient(c);

        const addr = await c.getAddress();
        setAddress(addr);
      } catch (error) {
        console.error("Failed to initialize wallet:", error);
      }
    }
    init();
  }, []);

  return { client, address };
}
