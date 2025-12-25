"use client";

interface ChainSelectorProps {
  chain: string;
  setChain: (chain: string) => void;
}

export function ChainSelector({ chain, setChain }: ChainSelectorProps) {
  const chains = [
    { id: "marz-neosphere", label: "MARZ NeoSphere", emoji: "🚀", chainId: 1205614524712072 },
    { id: "base-mainnet", label: "Base", emoji: "🔵", chainId: 8453 },
    { id: "eth-mainnet", label: "Ethereum", emoji: "⟠", chainId: 1 },
    { id: "polygon-mainnet", label: "Polygon", emoji: "🟣", chainId: 137 },
    { id: "arbitrum-mainnet", label: "Arbitrum", emoji: "🔷", chainId: 42161 },
    { id: "optimism-mainnet", label: "Optimism", emoji: "🔴", chainId: 10 },
  ];

  return (
    <select
      value={chain}
      onChange={(e) => setChain(e.target.value)}
      className="bg-black/40 border border-white/20 text-white px-4 py-2 rounded-lg font-inter text-sm focus:outline-none focus:border-[#00BFFF] transition-colors"
    >
      {chains.map((c) => (
        <option key={c.id} value={c.id}>
          {c.emoji} {c.label}
        </option>
      ))}
    </select>
  );
}
