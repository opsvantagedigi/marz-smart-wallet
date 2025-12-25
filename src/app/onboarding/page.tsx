"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWallet } from "@/context/WalletContext";
import { Wallet, Mail, ArrowRight, UserPlus, Shield } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { connectExternal, createSmartWallet, isLoading, error: ctxError } = useWallet();
  const [step, setStep] = useState(0);
  const [isWorking, setIsWorking] = useState(false);
  const [guardians, setGuardians] = useState<string[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);

  const steps = ["Connect", "Create Wallet", "Configure Guardians", "Complete"];

  async function handleConnect() {
    setIsWorking(true);
    setLocalError(null);
    try {
      await connectExternal(false); // don't auto-navigate — control steps here
      setStep(1);
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : String(err ?? "Failed to connect"));
    } finally {
      setIsWorking(false);
    }
  }

  async function handleCreate() {
    setIsWorking(true);
    setLocalError(null);
    try {
      await createSmartWallet(false);
      setStep(2);
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : String(err ?? "Failed to create wallet"));
    } finally {
      setIsWorking(false);
    }
  }

  function addGuardian(address: string) {
    if (!address) return;
    setGuardians((s) => Array.from(new Set([...s, address.trim()])));
  }

  function removeGuardian(address: string) {
    setGuardians((s) => s.filter((g) => g !== address));
  }

  function finishOnboarding() {
    // Finalize and navigate to dashboard
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00010a] via-[#02192b] to-[#003333] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] bg-clip-text text-transparent mb-2">Get started with MARZ</h1>
          <p className="text-white/70 font-inter">Follow the steps to connect and configure your Smart Wallet.</p>
        </div>

        {/* Stepper */}
        <div className="mb-6 flex items-center gap-4 justify-center">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i <= step ? "bg-gradient-to-r from-[#003366] via-[#006633] to-[#FFCC00] text-black" : "bg-white/5 text-white/70"}`}>
                {i + 1}
              </div>
              <div className={`text-sm ${i === step ? "font-orbitron text-white" : "text-white/60 font-inter"}`}>{s}</div>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl">
          {step === 0 && (
            <div className="space-y-4">
              <p className="font-inter text-white/80">Connect an external wallet, or create a MARZ Smart Wallet.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={handleCreate} disabled={isWorking} className="p-6 rounded-xl bg-gradient-to-r from-[#003366] via-[#006633] to-[#FFCC00] text-black font-orbitron">{isWorking ? "Working…" : "Create Smart Wallet"}</button>
                <button onClick={handleConnect} disabled={isWorking} className="p-6 rounded-xl bg-slate-900 text-white font-inter">{isWorking ? "Connecting…" : "Connect External Wallet"}</button>
              </div>
              {(localError || ctxError) && <div className="mt-4 text-sm text-red-300">{localError ?? ctxError}</div>}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-orbitron text-2xl">Smart Wallet Created</h2>
              <p className="font-inter text-white/70">Your Smart Wallet has been created. Next, configure guardians who can recover your account.</p>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-4 py-2 rounded bg-[#00BFFF] text-black">Configure Guardians</button>
                <button onClick={finishOnboarding} className="px-4 py-2 rounded bg-white/10 text-white">Skip to Dashboard</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-orbitron text-2xl">Configure Guardians</h2>
              <p className="font-inter text-white/70">Add addresses that may help recover your Smart Wallet.</p>
              <GuardianForm onAdd={addGuardian} />
              <div className="mt-4">
                <h3 className="font-inter text-sm text-white/80 mb-2">Guardians</h3>
                <ul className="space-y-2">
                  {guardians.map((g) => (
                    <li key={g} className="flex items-center justify-between bg-white/5 p-2 rounded">
                      <span className="font-mono text-sm">{g}</span>
                      <button onClick={() => removeGuardian(g)} className="text-sm text-red-300">Remove</button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => setStep(3)} className="px-4 py-2 rounded bg-gradient-to-r from-[#003366] via-[#006633] to-[#FFCC00] text-black">Finish</button>
                  <button onClick={() => setStep(1)} className="px-4 py-2 rounded bg-white/10 text-white">Back</button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <h2 className="font-orbitron text-2xl">All Set</h2>
              <p className="font-inter text-white/70">You're ready. Proceed to your dashboard to manage your Smart Wallet.</p>
              <div className="flex justify-center gap-3">
                <button onClick={finishOnboarding} className="px-4 py-2 rounded bg-gradient-to-r from-[#003366] via-[#006633] to-[#FFCC00] text-black">Go to Dashboard</button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-white/40 hover:text-white/70 font-inter text-sm transition-colors">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}

function GuardianForm({ onAdd }: { onAdd: (addr: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex gap-2">
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="0x... or email" className="flex-1 p-2 rounded bg-white/5 text-white" />
      <button onClick={() => { onAdd(value); setValue(""); }} className="px-3 py-2 rounded bg-[#00BFFF]">Add</button>
    </div>
  );
}
