"use client";

import { useState, FC } from "react";
import Link from "next/link";
import {
  Zap,
  Lock,
  Globe,
  Shield,
  ArrowRight,
  Smartphone,
  TrendingUp,
  Wallet,
  CheckCircle,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

/* =============================
   HERO SECTION
   ============================= */

const HeroSection: FC = () => (
  <section className="w-full relative overflow-hidden bg-marz-bg-dark text-marz-text-dark">
    <div className="absolute inset-0 bg-marz-gradient opacity-20 pointer-events-none" />
    <div className="relative w-full max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <Reveal>
          <p className="uppercase tracking-[0.3em] text-xs text-marz-green font-orbitron">
            MARZ NEOSPHERE · SMART WALLETS
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron text-white leading-tight">
            Smart wallets for{" "}
            <span className="text-marz-green">real humans</span>,{" "}
            <span className="text-marz-yellow">not protocols</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-base md:text-lg text-slate-300 font-inter max-w-xl">
            MARZ Smart Wallets anchor identity, safety, and legacy on NeoSphere —
            with gas abstraction, social recovery, and emotionally honest UX.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-marz-green text-marz-blue px-5 py-3 font-inter font-semibold hover:bg-marz-yellow transition-colors"
            >
              Launch Smart Wallet Console
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-glass-border bg-glass-dark px-5 py-3 font-inter text-slate-100 hover:bg-glass-light transition-colors glass"
            >
              How it works
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-400 font-inter pt-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-marz-green" />
              <span>Account abstraction · NeoSphere native</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-marz-yellow" />
              <span>Social recovery & guardians</span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="flex-1 flex justify-center" delay={0.1}>
        <div className="relative w-full max-w-md">
          <GlassCard className="rounded-3xl p-6 animate-fade-in w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-marz-green" />
                <span className="font-orbitron text-sm text-slate-200">
                  MARZ Smart Wallet
                </span>
              </div>
              <span className="text-xs text-marz-yellow font-inter">
                NeoSphere · Live
              </span>
            </div>

            <div className="space-y-3 text-sm font-inter">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Owner</span>
                <span className="text-slate-100 truncate max-w-[55%]">
                  0xMARZ…NE0SPHERE
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Security mode</span>
                <span className="text-marz-green flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Guardian protected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Chain</span>
                <span className="text-slate-100">MARZ NeoSphere</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
              <GlassCard className="flex flex-col items-start gap-1">
                <span className="text-slate-400">Actions</span>
                <span className="text-slate-100 font-medium">Batch & automate</span>
              </GlassCard>
              <GlassCard className="flex flex-col items-start gap-1">
                <span className="text-slate-400">Fees</span>
                <span className="text-slate-100 font-medium">Gas abstracted</span>
              </GlassCard>
              <GlassCard className="flex flex-col items-start gap-1">
                <span className="text-slate-400">Guardians</span>
                <span className="text-slate-100 font-medium">3 of 5 active</span>
              </GlassCard>
            </div>
          </GlassCard>
        </div>
      </Reveal>
      </div>
    </section>
  );

/* =============================
   BENEFITS SECTION
   ============================= */

const BenefitsSection: FC = () => (
  <section className="bg-marz-bg-dark py-16 md:py-20">
    <div className="w-full max-w-7xl mx-auto px-6">
      <SectionHeader
        title="Safety, sovereignty, and story in one wallet"
        subtitle="Not just keys and balances — MARZ Smart Wallets encode how you want to be remembered."
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Reveal>
          <GlassCard className="h-full flex flex-col gap-3">
            <Zap className="w-6 h-6 text-marz-yellow" />
            <h3 className="font-orbitron text-lg text-white">
              Frictionless for everyday humans
            </h3>
            <p className="text-sm text-slate-300 font-inter">
              Abstract gas, simplify signing, and let your people interact with web3
              without ever seeing a seed phrase.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.05}>
          <GlassCard className="h-full flex flex-col gap-3">
            <Lock className="w-6 h-6 text-marz-green" />
            <h3 className="font-orbitron text-lg text-white">
              Social recovery, not single points of failure
            </h3>
            <p className="text-sm text-slate-300 font-inter">
              Guardians, time‑locks, and rituals — your safety model can match your
              values, not just your threat model.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="h-full flex flex-col gap-3">
            <Globe className="w-6 h-6 text-marz-yellow" />
            <h3 className="font-orbitron text-lg text-white">
              NeoSphere‑native identity
            </h3>
            <p className="text-sm text-slate-300 font-inter">
              Anchor your presence on MARZ NeoSphere — the home chain designed for
              identity, legacy, and community.
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  </section>
);

/* =============================
   FEATURES SECTION
   ============================= */

const FeaturesSection: FC = () => (
  <section className="bg-marz-bg-dark py-16 md:py-20">
    <div className="w-full max-w-7xl mx-auto px-6">
      <SectionHeader
        title="What your Smart Wallet can actually do"
        subtitle="From batching and automation to guardian flows — built for real use, not just demos."
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal>
          <GlassCard className="flex gap-4 items-start">
            <Smartphone className="w-6 h-6 text-marz-green mt-1" />
            <div>
              <h3 className="font-orbitron text-white text-base mb-1">
                Mobile‑first, ritual‑aware UX
              </h3>
              <p className="text-sm text-slate-300 font-inter">
                Flows designed around real life: pay, gift, secure, recover — each
                one treated as a meaningful ritual, not just a transaction.
              </p>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.05}>
          <GlassCard className="flex gap-4 items-start">
            <TrendingUp className="w-6 h-6 text-marz-yellow mt-1" />
            <div>
              <h3 className="font-orbitron text-white text-base mb-1">
                Programmable actions & automation
              </h3>
              <p className="text-sm text-slate-300 font-inter">
                Batch operations, scheduled sends, recurring support — all
                orchestrated like a personal financial ceremony.
              </p>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="flex gap-4 items-start">
            <Shield className="w-6 h-6 text-marz-green mt-1" />
            <div>
              <h3 className="font-orbitron text-white text-base mb-1">
                Guardian‑grade safety
              </h3>
              <p className="text-sm text-slate-300 font-inter">
                Multi‑layer security with guardian approvals, time delays, and
                recovery paths documented for your future self.
              </p>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.15}>
          <GlassCard className="flex gap-4 items-start">
            <Wallet className="w-6 h-6 text-marz-yellow mt-1" />
            <div>
              <h3 className="font-orbitron text-white text-base mb-1">
                Chain‑aware, NeoSphere‑anchored
              </h3>
              <p className="text-sm text-slate-300 font-inter">
                Your wallet lives on MARZ NeoSphere, but can be surfaced in
                dashboards, CLIs, and rituals across your ecosystem.
              </p>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  </section>
);

/* =============================
   HOW IT WORKS SECTION
   ============================= */

const HowItWorksSection: FC = () => (
  <section
    id="how-it-works"
    className="w-full bg-marz-bg-dark py-16 md:py-20 border-t border-glass-border/40"
  >
    <div className="w-full max-w-7xl mx-auto px-6">
      <SectionHeader
        title="How a MARZ Smart Wallet comes alive"
        subtitle="Each step is a small ritual — intentional, reversible, and documented."
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm font-inter">
        {[
          {
            step: "01",
            title: "Connect identity",
            body: "Link your existing wallet or authentication method — no forced migration, no surprise deployments.",
          },
          {
            step: "02",
            title: "Define guardians",
            body: "Choose the humans, devices, or entities you trust to help you recover and protect your wallet.",
          },
          {
            step: "03",
            title: "Anchor on NeoSphere",
            body: "We deploy your Smart Wallet on MARZ NeoSphere as your home chain — sovereign and future‑proof.",
          },
          {
            step: "04",
            title: "Live with rituals",
            body: "Use the console, CLI, or rituals API to keep every action legible, logged, and emotionally meaningful.",
          },
        ].map((item, idx) => (
          <Reveal key={item.step} delay={idx * 0.05}>
            <GlassCard className="h-full flex flex-col gap-2">
              <span className="text-xs tracking-[0.25em] uppercase text-marz-green font-orbitron">
                {item.step}
              </span>
              <h3 className="text-white font-orbitron text-base">{item.title}</h3>
              <p className="text-slate-300 text-xs">{item.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* =============================
   PRICING SECTION (PLACEHOLDER)
   ============================= */

const PricingSection: FC = () => (
  <section className="bg-marz-bg-dark py-16 md:py-20 border-t border-glass-border/40">
    <div className="w-full max-w-7xl mx-auto px-6">
      <SectionHeader
        title="Founder‑friendly, ritual‑aware pricing"
        subtitle="Start with experiments, grow into rituals, and scale into ecosystems."
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Reveal>
          <GlassCard className="flex flex-col gap-3 h-full">
            <h3 className="font-orbitron text-white text-lg">Builder</h3>
            <p className="text-sm text-slate-300 font-inter">
              For experimentation, demos, and early rituals. Fair limits, no traps.
            </p>
            <p className="text-2xl text-marz-green font-orbitron">TBA</p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.05}>
          <GlassCard className="flex flex-col gap-3 h-full border-marz-yellow/60 border">
            <h3 className="font-orbitron text-white text-lg">Legacy</h3>
            <p className="text-sm text-slate-300 font-inter">
              For families, communities, and DAOs anchoring long‑term identity and
              rituals on NeoSphere.
            </p>
            <p className="text-2xl text-marz-yellow font-orbitron">TBA</p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassCard className="flex flex-col gap-3 h-full">
            <h3 className="font-orbitron text-white text-lg">Enterprise</h3>
            <p className="text-sm text-slate-300 font-inter">
              Custom flows, compliance support, and dedicated governance rituals for
              institutions and ecosystems.
            </p>
            <p className="text-2xl text-marz-green font-orbitron">Talk to us</p>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  </section>
);

/* =============================
   FAQ SECTION
   ============================= */

const FAQ_ITEMS = [
  {
    q: "What chain do MARZ Smart Wallets live on?",
    a: "MARZ Smart Wallets are anchored on MARZ NeoSphere as the sovereign home chain — no silent fallback, no hidden L1.",
  },
  {
    q: "Do I need a seed phrase?",
    a: "No. You can still use traditional wallets as signers, but Smart Wallets are designed to move you beyond raw seed phrases.",
  },
  {
    q: "Can I migrate an existing wallet?",
    a: "Yes. You can map existing addresses into Smart Wallet rituals and gradually shift into guardian‑backed safety.",
  },
];

const FAQSection: FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-marz-bg-dark py-16 md:py-20 border-t border-glass-border/40">
        <div className="w-full max-w-4xl mx-auto px-6">
        <SectionHeader
          title="Questions guardians would actually ask"
          subtitle="We treat every concern as a design requirement, not a blocker."
        />

        <div className="mt-8 space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <Reveal key={item.q} delay={idx * 0.03}>
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full text-left glass rounded-2xl px-4 py-3 md:px-5 md:py-4 flex items-start justify-between gap-3"
              >
                <div>
                  <p className="font-orbitron text-sm md:text-base text-white">
                    {item.q}
                  </p>
                  {open === idx && (
                    <p className="mt-2 text-xs md:text-sm text-slate-300 font-inter">
                      {item.a}
                    </p>
                  )}
                </div>
                <span className="text-marz-green text-xs md:text-sm mt-1">
                  {open === idx ? "−" : "+"}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =============================
   COMPARISON SECTION (L1 vs Smart Wallets)
   ============================= */

const ComparisonSection: FC = () => (
  <section className="bg-marz-bg-dark py-16 md:py-20 border-t border-glass-border/40">
    <div className="max-w-6xl mx-auto px-6">
      <SectionHeader
        title="Seed‑phrase wallets vs MARZ Smart Wallets"
        subtitle="Same cryptography, very different human experience."
      />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-inter">
        <GlassCard className="h-full bg-black/40">
          <h3 className="font-orbitron text-white text-lg mb-3">
            Traditional wallets
          </h3>
          <ul className="space-y-2 text-slate-300 text-xs">
            <li>• Single point of failure: one phrase, one device, one mistake.</li>
            <li>• Recovery stories are improvised, undocumented, and stressful.</li>
            <li>• Flows are chain‑centric, not identity‑centric.</li>
          </ul>
        </GlassCard>

        <GlassCard className="h-full border border-marz-green/60 bg-marz-bg-dark/80">
          <h3 className="font-orbitron text-white text-lg mb-3">
            MARZ Smart Wallets
          </h3>
          <ul className="space-y-2 text-slate-300 text-xs">
            <li>• Guardian‑backed recovery with documented rituals and approvals.</li>
            <li>• Actions are logged as meaningful milestones, not just tx hashes.</li>
            <li>• Anchored on NeoSphere as a long‑term home, not a temporary address.</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  </section>
);

/* =============================
   CTA SECTION
   ============================= */

const CTASection: FC = () => (
  <section className="bg-marz-bg-dark py-16 md:py-20 border-t border-glass-border/40">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <Reveal>
        <h2 className="font-orbitron text-2xl md:text-3xl text-white mb-3">
          Ready to anchor your first Smart Wallet?
        </h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="text-sm md:text-base text-slate-300 font-inter mb-8">
          Start with a single wallet, a single guardian, and a single ritual.
          We’ll grow the rest together.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-marz-green text-marz-blue px-5 py-3 font-inter font-semibold hover:bg-marz-yellow transition-colors"
          >
            Open Smart Wallet Console
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/solana"
            className="inline-flex items-center gap-2 rounded-xl border border-glass-border bg-glass-dark px-5 py-3 font-inter text-slate-100 hover:bg-glass-light transition-colors"
          >
            Explore Solana RPC Surface
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

/* =============================
   HOME PAGE COMPOSITION
   ============================= */

export default function Home() {
  return (
    <div className="w-full bg-marz-bg-dark text-marz-text-dark">
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <ComparisonSection />
      <CTASection />
    </div>
  );
}
