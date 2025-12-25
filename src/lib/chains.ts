// MARZ NeoSphere OP Stack Chain Definition
export const marzChain = {
  id: 1205614524712072,
  name: "Marz NeoSphere",
  network: "marz-neosphere",
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_MARZ_RPC_URL || "https://rpc.devnet.alchemy.com/0969bab5-2013-4458-a04b-61e5e39185dd"],
      webSocket: [process.env.NEXT_PUBLIC_MARZ_WS_URL || "wss://ws.devnet.alchemy.com/0969bab5-2013-4458-a04b-61e5e39185dd"],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_MARZ_RPC_URL || "https://rpc.devnet.alchemy.com/0969bab5-2013-4458-a04b-61e5e39185dd"],
      webSocket: [process.env.NEXT_PUBLIC_MARZ_WS_URL || "wss://ws.devnet.alchemy.com/0969bab5-2013-4458-a04b-61e5e39185dd"],
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
      url: "https://explorer-1205614524712072.devnet.alchemy.com/",
    },
  },
};
