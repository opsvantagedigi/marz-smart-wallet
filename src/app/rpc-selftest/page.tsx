"use client";

import { useEffect, useState } from "react";
import { rpc } from "@/lib/rpc";

function hexToInt(h: string) {
  try {
    return parseInt(h, 16);
  } catch {
    return NaN;
  }
}

export default function RpcSelfTestPage() {
  const [ethBlock, setEthBlock] = useState<number | null>(null);
  const [baseBlock, setBaseBlock] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const ethHex = await rpc<string>("eth_blockNumber", [], "eth-mainnet");
        const baseHex = await rpc<string>("eth_blockNumber", [], "base-mainnet");
        setEthBlock(hexToInt(ethHex));
        setBaseBlock(hexToInt(baseHex));
      } catch (e: any) {
        setErr(e?.message ?? "Unknown error");
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="font-orbitron text-2xl mb-2">RPC Proxy Self Test</h1>
      <p className="font-inter text-white/70 mb-4">
        Testing /api/rpc on eth-mainnet and base-mainnet.
      </p>
      {err ? (
        <p className="text-red-400 font-inter">Error: {err}</p>
      ) : (
        <div className="space-y-2 font-inter">
          <div>
            eth-mainnet block:{" "}
            <span className="text-cyan-300">{ethBlock ?? "…"}</span>
          </div>
          <div>
            base-mainnet block:{" "}
            <span className="text-cyan-300">{baseBlock ?? "…"}</span>
          </div>
        </div>
      )}
    </main>
  );
}
