"use client";

import { useEffect, useState } from "react";
import { getSmartWalletClient } from "@/lib/smartWallet";

export function useSmartWallet() {
  const [client, setClient] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const c = getSmartWalletClient();
      setClient(c);

      const addr = await c.getAddress();
      setAddress(addr);
    }
    init();
  }, []);

  return { client, address };
}
