type JsonRpcError = { code: number; message: string; data?: unknown };
type JsonRpcResponse<T = unknown> = {
  jsonrpc: "2.0";
  id: number | string;
  result?: T;
  error?: JsonRpcError;
};

export type SupportedChain =
  | "eth-mainnet"
  | "base-mainnet"
  | "polygon-mainnet"
  | "arbitrum-mainnet"
  | "optimism-mainnet";

export async function rpc<T = unknown>(
  method: string,
  params: unknown[] = [],
  chain: SupportedChain = "base-mainnet"
): Promise<T> {
  const res = await fetch("/api/rpc", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-chain": chain,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`RPC HTTP ${res.status}${text ? `: ${text}` : ""}`);
  }

  const data = (await res.json()) as JsonRpcResponse<T>;
  if (data.error) {
    throw new Error(data.error.message || "RPC error");
  }
  return data.result as T;
}
