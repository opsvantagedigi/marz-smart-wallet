import Link from "next/link";
import { useWallet } from "@/context/WalletContext";
import { createMarzSmartWallet } from "@/lib/marzSmartWallet";

export default function CreateWalletPage() {
  const ctx = useWallet() as any;
  const { createSmartWallet } = ctx ?? {};
  const isLoading = ctx?.status === "connecting";

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-orbitron text-4xl mb-4">Create Smart Wallet</h1>
        <p className="font-inter text-lg text-slate-700 mb-6">Create a new MARZ Smart Wallet deployed on MARZ NeoSphere.</p>
        <div className="space-y-4">
          <button
            onClick={async () => {
              if (typeof createSmartWallet === "function") {
                await createSmartWallet();
              } else {
                // fallback to direct call
                await createMarzSmartWallet();
              }
            }}
              disabled={isLoading}
            className="px-4 py-3 rounded-lg bg-gradient-to-r from-[#003366] via-[#006633] to-[#FFCC00] text-black font-orbitron"
          >
            {isLoading ? "Creating…" : "Create Smart Wallet"}
          </button>
          <Link href="/dashboard" className="text-slate-600 hover:underline">Skip and go to Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
