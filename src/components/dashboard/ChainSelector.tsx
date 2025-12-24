"use client";

export function ChainSelector({ chain, setChain }: any) {
  const chains = [
    { id: "base-mainnet", label: "Base", emoji: "🔵" },
    { id: "eth-mainnet", label: "Ethereum", emoji: "⟠" },
    { id: "polygon-mainnet", label: "Polygon", emoji: "🟣" },
    { id: "arbitrum-mainnet", label: "Arbitrum", emoji: "🔷" },
    { id: "optimism-mainnet", label: "Optimism", emoji: "🔴" },
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
