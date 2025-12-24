export type WalletType = "smart" | "external" | "none";

const WALLET_TYPE_KEY = "marz_wallet_type";
const WALLET_ADDRESS_KEY = "marz_wallet_address";

export function setWalletState(type: WalletType, address: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WALLET_TYPE_KEY, type);
  localStorage.setItem(WALLET_ADDRESS_KEY, address);
}

export function getWalletState(): { type: WalletType; address: string | null } {
  if (typeof window === "undefined") {
    return { type: "none", address: null };
  }

  const type = (localStorage.getItem(WALLET_TYPE_KEY) as WalletType) || "none";
  const address = localStorage.getItem(WALLET_ADDRESS_KEY);
  return { type, address };
}

export function clearWalletState() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(WALLET_TYPE_KEY);
  localStorage.removeItem(WALLET_ADDRESS_KEY);
}
