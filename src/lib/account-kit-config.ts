"use client";

import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { base, alchemy } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      // Section 1: Email
      [{ type: "email" }],
      // Section 2: Passkeys + Social
      [
        { type: "passkey" },
        { type: "social", authProviderId: "google", mode: "popup" },
      ],
      // Section 3: External wallets via WalletConnect
      [
        {
          type: "external_wallets",
          walletConnect: {
            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
          },
          wallets: ["wallet_connect", "coinbase_wallet"],
          chainType: ["evm"],
          moreButtonText: "More wallets",
          hideMoreButton: false,
          numFeaturedWallets: 1,
        },
      ],
    ],
    addPasskeyOnSignup: true,
  },
  supportUrl: "support@opsvantagedigital.online",
};

export const config = createConfig(
  {
    transport: alchemy({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    chain: base,
    ssr: false, // IMPORTANT: disable SSR for the onboarding page to avoid hydration issues
    enablePopupOauth: true,
  },
  uiConfig
);

export const queryClient = new QueryClient();
