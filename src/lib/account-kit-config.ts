"use client";

import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { base, alchemy } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [
        { type: "passkey" },
        { type: "social", authProviderId: "google", mode: "popup" },
      ],
      [
        {
          type: "external_wallets",
          walletConnect: {
            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
          },
        },
      ],
    ],
    addPasskeyOnSignup: true,
  },
  supportUrl: "support@opsvantagedigital.online",
};

export const config = createConfig(
  {
    transport: alchemy({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "" }),
    chain: base,
    ssr: true,
  },
  uiConfig
);

export const queryClient = new QueryClient();
