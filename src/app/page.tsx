"use client";

import { useState } from "react";
import {
  Zap,
  Lock,
  Globe,
  Shield,
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Smartphone,
  TrendingUp,
  Wallet,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // HERO
  function HeroSection() {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-inter mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Live on mainnet • Gasless smart wallet
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                The Future of Digital Asset Management
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-base sm:text-lg md:text-xl text-white/80 font-inter max-w-2xl mx-auto">
              Secure, smart, and built for you. Experience the next generation
              of crypto wallets with AI-powered insights and gasless
              transactions.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button className="px-7 sm:px-9 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold font-orbitron text-sm sm:text-base md:text-lg hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-105 transition-all duration-300 animate-glowPulse">
                Get Started
              </button>
              <button className="px-7 sm:px-9 py-3 sm:py-4 rounded-lg backdrop-blur-xl bg-white/10 border border-white/30 text-white font-bold font-orbitron text-sm sm:text-base md:text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center gap-2">
                View Pricing
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="pt-4 flex flex-wrap justify-center gap-4 sm:gap-8 text-white/50 text-xs sm:text-sm font-inter">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Non-custodial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Gasless transactions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Multi-chain by default</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  // BENEFITS
  function BenefitsSection() {
    const benefits = [
      {
        icon: Zap,
        title: "Gasless Transactions",
        description: "Send funds without worrying about gas fees. We cover it.",
      },
      {
        icon: Smartphone,
        title: "One-Tap Wallet Creation",
        description:
          "Create a secure wallet in seconds with just a tap. No complex setup needed.",
      },
      {
        icon: Globe,
        title: "Multi-Chain Support",
        description:
          "Access assets across Ethereum, Polygon, Base, and more chains.",
      },
      {
        icon: Shield,
        title: "Enterprise-Grade Security",
        description: "Military-grade encryption with passkey authentication.",
      },
    ];

    return (
      <section
        id="benefits"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Why Choose Marz?"
            subtitle="Built for the next generation of crypto users"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={benefit.title} delay={idx * 80}>
                  <GlassCard className="p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 group">
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg sm:text-xl font-bold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base font-inter">
                      {benefit.description}
                    </p>
                  </GlassCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // FEATURES
  function FeaturesSection() {
    const features = [
      "Smart Wallet Engine",
      "Alchemy SDK Integration",
      "Passkey Login",
      "Session Keys",
      "Embedded Wallets",
      "Real-Time Analytics Dashboard",
    ];

    return (
      <section
        id="features"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Powerful Features"
            subtitle="Everything you need to manage your digital assets"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Reveal key={feature} delay={idx * 80}>
                <GlassCard className="p-6 sm:p-8 flex items-center gap-4 hover:border-cyan-400/50 hover:bg-white/15">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-inter text-white">
                    {feature}
                  </h3>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // HOW IT WORKS
  function HowItWorksSection() {
    const steps = [
      {
        num: 1,
        title: "Create Wallet",
        desc: "Sign up with passkey or email. Your wallet is created instantly.",
      },
      {
        num: 2,
        title: "Connect & Transact",
        desc: "Connect to dApps and execute transactions gaslessly.",
      },
      {
        num: 3,
        title: "Earn Rewards",
        desc: "Earn points and rewards for every transaction you make.",
      },
    ];

    return (
      <section
        id="how-it-works"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="How It Works"
            subtitle="Three simple steps to get started"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <Reveal key={step.title} delay={idx * 100}>
                <div className="relative">
                  <GlassCard className="p-8 text-center hover:bg-white/20">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl sm:text-2xl font-bold text-white font-orbitron">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/70 font-inter text-sm sm:text-base">
                      {step.desc}
                    </p>
                  </GlassCard>
                  {idx < steps.length - 1 && (
                    <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-cyan-400" />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // FAQ
  function FAQSection() {
    const faqs = [
      {
        q: "What is a smart wallet?",
        a: "A smart wallet is an advanced crypto wallet that uses smart contracts to enable gasless transactions, session keys, and enhanced security features beyond traditional wallets.",
      },
      {
        q: "How do gasless transactions work?",
        a: "We cover gas fees for your transactions through gas sponsorship. Your wallet submits transactions to our relayer network, which handles the costs.",
      },
      {
        q: "What about security?",
        a: "Marz uses military-grade encryption, passkey authentication, and multi-chain support. Your private keys never leave your device.",
      },
      {
        q: "Do you charge any fees?",
        a: "Marz is free to use. We monetize through premium features and partnerships with dApps.",
      },
      {
        q: "Which chains are supported?",
        a: "We support Ethereum, Polygon, Base, Arbitrum, Optimism, and more. Multi-chain support is a core feature.",
      },
    ];

    return (
      <section
        id="faq"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Have questions? We have answers."
          />
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Reveal key={faq.q} delay={idx * 80}>
                <GlassCard className="overflow-hidden">
                  <button
                    onClick={() =>
                      setOpenFAQ(openFAQ === idx ? null : idx)
                    }
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/10 transition-all text-left"
                  >
                    <h3 className="font-bold text-white text-base sm:text-lg">
                      {faq.q}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${
                        openFAQ === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFAQ === idx && (
                    <div className="px-6 py-4 border-t border-white/10 bg-white/5">
                      <p className="text-white/70 font-inter text-sm sm:text-base">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // COMPARISON
  function ComparisonSection() {
    const competitors = ["Marz", "MetaMask", "Coinbase Wallet", "Trust Wallet"];
    const categories = [
      "Gasless Transactions",
      "Passkeys",
      "Multi-Chain",
      "Embedded Wallets",
      "Rewards",
      "AI Sentinel (Coming Soon)",
    ];

    const features: { [key: string]: { [key: string]: boolean } } = {
      "Gasless Transactions": {
        Marz: true,
        MetaMask: false,
        "Coinbase Wallet": false,
        "Trust Wallet": false,
      },
      Passkeys: {
        Marz: true,
        MetaMask: false,
        "Coinbase Wallet": true,
        "Trust Wallet": false,
      },
      "Multi-Chain": {
        Marz: true,
        MetaMask: true,
        "Coinbase Wallet": true,
        "Trust Wallet": true,
      },
      "Embedded Wallets": {
        Marz: true,
        MetaMask: false,
        "Coinbase Wallet": true,
        "Trust Wallet": false,
      },
      Rewards: {
        Marz: true,
        MetaMask: false,
        "Coinbase Wallet": true,
        "Trust Wallet": false,
      },
      "AI Sentinel (Coming Soon)": {
        Marz: true,
        MetaMask: false,
        "Coinbase Wallet": false,
        "Trust Wallet": false,
      },
    };

    return (
      <section
        id="comparison"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="How Marz Compares"
            subtitle="See why Marz stands out from the competition"
          />
          <Reveal>
            <div className="hidden lg:block overflow-x-auto">
              <GlassCard className="p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 font-bold text-white">
                        Feature
                      </th>
                      {competitors.map((comp) => (
                        <th
                          key={comp}
                          className={`text-center py-3 px-4 font-bold ${
                            comp === "Marz"
                              ? "text-cyan-400"
                              : "text-white/70"
                          }`}
                        >
                          {comp}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr key={cat} className="border-b border-white/10">
                        <td className="py-3 px-4 font-inter text-white">
                          {cat}
                        </td>
                        {competitors.map((comp) => (
                          <td
                            key={`${cat}-${comp}`}
                            className="text-center py-3 px-4"
                          >
                            {features[cat]?.[comp] ? (
                              <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-white/20 rounded-full mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GlassCard>
            </div>
          </Reveal>

          {/* Mobile cards */}
          <div className="lg:hidden grid grid-cols-1 gap-6 mt-6">
            {competitors.map((comp, idx) => (
              <Reveal key={comp} delay={idx * 80}>
                <GlassCard
                  className={`p-6 ${
                    comp === "Marz"
                      ? "bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border-cyan-400/50"
                      : ""
                  }`}
                >
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      comp === "Marz" ? "text-cyan-300" : "text-white"
                    }`}
                  >
                    {comp}
                  </h3>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <div
                        key={`${comp}-${cat}`}
                        className="flex items-center justify-between text-xs sm:text-sm"
                      >
                        <span className="text-white/70 font-inter">
                          {cat}
                        </span>
                        {features[cat]?.[comp] ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-white/20 rounded-full" />
                        )}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // CTA
  function CTASection() {
    return (
      <section
        id="cta"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <GlassCard className="p-8 sm:p-12 text-center border-cyan-400/40 bg-gradient-to-br from-black/40 via-black/60 to-cyan-900/10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Ready to Experience the Future?
              </h2>
              <p className="text-white/70 font-inter text-base sm:text-lg mb-8">
                Join thousands of crypto users who trust Marz with their digital
                assets.
              </p>
              <button className="px-8 sm:px-12 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold font-orbitron text-base sm:text-lg hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-105 transition-all duration-300">
                Launch App Now
              </button>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    );
  }

  // RENDER ALL SECTIONS
  return (
    <div className="w-full">
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <ComparisonSection />
      <CTASection />
    </div>
  );
}
