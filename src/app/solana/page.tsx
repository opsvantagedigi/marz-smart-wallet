import Link from "next/link";
import { FC } from "react";
import { Zap, Shield, Globe, Activity, Server, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

const SolanaHero: FC = () => (
  <section className="relative min-h-[70vh] bg-marz-bg-dark text-white overflow-hidden">
    <div className="absolute inset-0 bg-marz-gradient opacity-25" />
    <div className="absolute -top-20 -right-10 w-[320px] h-[320px] rounded-full bg-marz-green/20 blur-3xl" />
    <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <Reveal>
          <p className="uppercase tracking-[0.3em] text-xs text-marz-yellow font-orbitron">
            MARZ · SOLANA RPC
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron leading-tight">
            Solana RPC that feels{" "}
            <span className="text-marz-green">alive</span>, not just available.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base md:text-lg text-slate-200 font-inter max-w-xl">
            MARZ Solana RPC gives your apps fast, observable, emotionally aware
            infrastructure — with dashboards, rituals, and safety baked in.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-marz-blue px-5 py-3 font-inter font-semibold hover:bg-marz-yellow transition-colors"
            >
              Go to RPC Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xl border border-glass-border bg-glass-dark px-5 py-3 font-inter text-slate-100 hover:bg-glass-light transition-colors"
            >
              View RPC Docs
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-300 font-inter pt-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-marz-yellow" />
              <span>Optimized Solana RPC · production‑ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-marz-green" />
              <span>Rate‑limiting & tenant‑aware safety</span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="flex-1 flex justify-center" delay={0.1}>
        <GlassCard className="w-full max-w-md glass rounded-3xl p-6 bg-marz-bg-dark/80 border border-glass-border shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-marz-green" />
              <span className="font-orbitron text-sm text-slate-200">
                Solana RPC · MARZ
              </span>
            </div>
            <span className="text-xs text-marz-yellow font-inter">
              Status: Healthy
            </span>
          </div>
          <div className="space-y-3 text-sm font-inter">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Environment</span>
              <span className="text-slate-100">Mainnet‑beta</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">P95 latency</span>
              <span className="text-marz-green">~ TBD ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Requests / min</span>
              <span className="text-slate-100">Live in dashboard</span>
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </div>
  </section>
);

const SolanaFeatures: FC = () => (
  <section className="bg-marz-bg-dark py-16 md:py-20">
    <div className="max-w-6xl mx-auto px-6">
      <SectionHeader
        title="RPC that respects both engineers and guardians"
        subtitle="Fast enough for trading, legible enough for founders, safe enough for guardians."
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Reveal>
          <GlassCard className="h-full flex flex-col gap-3">
            <Zap className="w-6 h-6 text-marz-yellow" />
            <h3 className="font-orbitron text-white text-lg">Ultra‑fast routing</h3>
            <p className="text-sm text-slate-300 font-inter">
              Optimized pipelines for Solana RPC that respect low latency,
              reliability, and composability.
            </p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.05}>
          <GlassCard className="h-full flex flex-col gap-3">
            <Shield className="w-6 h-6 text-marz-green" />
            <h3 className="font-orbitron text-white text-lg">Rate‑limited by design</h3>
            <p className="text-sm text-slate-300 font-inter">
              API keys, tenant‑aware limits, and rituals for handling abuse without
              punishing real users.
            </p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassCard className="h-full flex flex-col gap-3">
            <Globe className="w-6 h-6 text-marz-yellow" />
            <h3 className="font-orbitron text-white text-lg">Global, observable surface</h3>
            <p className="text-sm text-slate-300 font-inter">
              Dashboards, logs, and stories around your traffic — more than just
              metrics, it’s narrative.
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  </section>
);

const SolanaUsage: FC = () => (
  <section className="bg-marz-bg-dark py-16 md:py-20 border-t border-glass-border/40">
    <div className="max-w-6xl mx-auto px-6">
      <SectionHeader
        title="Wire MARZ Solana RPC into your stack"
        subtitle="Simple keys, clear limits, and a story for every request."
      />
      <Reveal>
        <GlassCard className="mt-8 p-5 font-mono text-xs md:text-sm text-slate-100 bg-black/60">
          <p className="mb-2 text-slate-400">// Example: using MARZ Solana RPC</p>
          <pre className="whitespace-pre-wrap">
{`const connection = new Connection(
  process.env.NEXT_PUBLIC_MARZ_SOLANA_RPC!,
  "confirmed"
);

// Use in your app:
// - trading bots
// - dashboards
// - indexers
// - rituals that need Solana data`}
          </pre>
        </GlassCard>
      </Reveal>
    </div>
  </section>
);

const SolanaCTA: FC = () => (
  <section className="bg-marz-bg-dark py-16 md:py-20 border-t border-glass-border/40">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <Reveal>
        <h2 className="font-orbitron text-2xl md:text-3xl text-white mb-3">
          Ready to onboard your first app to MARZ RPC?
        </h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="text-sm md:text-base text-slate-300 font-inter mb-8">
          Start with a single API key, one dashboard, and one story about what your
          Solana traffic means.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-marz-green text-marz-blue px-5 py-3 font-inter font-semibold hover:bg-marz-yellow transition-colors"
          >
            Open RPC Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-glass-border bg-glass-dark px-5 py-3 font-inter text-slate-100 hover:bg-glass-light transition-colors"
          >
            Back to Smart Wallets
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

const SolanaLandingPage: FC = () => (
  <div className="min-h-screen bg-marz-bg-dark text-white">
    <SolanaHero />
    <SolanaFeatures />
    <SolanaUsage />
    <SolanaCTA />
  </div>
);

export default SolanaLandingPage;
