// MARZ NeoSphere OP Stack Chain Definition
export const marzChain = {
  id: 1205614524712072,
  name: "Marz NeoSphere",
  network: "marz-neosphere",
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_MARZ_RPC_URL || "https://marz-neosphere.rpc.caldera.xyz/http"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_MARZ_RPC_URL || "https://marz-neosphere.rpc.caldera.xyz/http"],
    },
  },
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "MARZ Explorer",
      url: "https://marz-neosphere.explorer.caldera.xyz",
    },
  },
} as const;
