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
  Wallet,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // ============================================================
  // HERO SECTION
  // ============================================================
  function HeroSection() {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-orbitron leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                The Future of Digital Asset Management
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 font-inter max-w-2xl mx-auto">
              Secure, smart, and built for you. Experience the next generation of
              crypto wallets with AI-powered features and gasless transactions.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 sm:px-10 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold font-orbitron text-base sm:text-lg hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-105 transition-all duration-300">
              Get Started
            </button>
            <button className="px-8 sm:px-10 py-3 sm:py-4 rounded-lg backdrop-blur-xl bg-white/10 border border-white/30 text-white font-bold font-orbitron text-base sm:text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center gap-2">
              View Pricing
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="pt-8 flex justify-center gap-6 sm:gap-10 text-white/40 text-sm sm:text-base font-inter">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Smart</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // BENEFITS SECTION
  // ============================================================
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
        description:
          "Military-grade encryption with passkey authentication.",
      },
    ];

    return (
      <section
        id="benefits"
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-orbitron text-center mb-4">
            Why Choose Marz?
          </h2>
          <p className="text-center text-white/70 font-inter mb-12 sm:mb-16">
            Built for the next generation of crypto users
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 group"
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg sm:text-xl font-bold font-orbitron mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base font-inter">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // FEATURES SECTION
  // ============================================================
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-orbitron text-center mb-4">
            Powerful Features
          </h2>
          <p className="text-center text-white/70 font-inter mb-12 sm:mb-16">
            Everything you need to manage your digital assets
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8 flex items-center gap-4 hover:bg-white/20 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-inter text-white">
                  {feature}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // HOW IT WORKS SECTION
  // ============================================================
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-orbitron text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-white/70 font-inter mb-12 sm:mb-16">
            Three simple steps to get started
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Card */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-white font-orbitron">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-orbitron mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/70 font-inter text-sm sm:text-base">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-cyan-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // FAQ SECTION
  // ============================================================
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-orbitron text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-white/70 font-inter mb-12 sm:mb-16">
            Have questions? We have answers.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/20 transition-all text-left"
                >
                  <h3 className="font-bold font-orbitron text-white text-base sm:text-lg">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${
                      openFAQ === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFAQ === idx && (
                  <div className="px-6 py-4 border-t border-white/20 bg-white/5">
                    <p className="text-white/70 font-inter text-sm sm:text-base">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // COMPARISON SECTION
  // ============================================================
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
        "MetaMask": false,
        "Coinbase Wallet": false,
        "Trust Wallet": false,
      },
      Passkeys: {
        Marz: true,
        "MetaMask": false,
        "Coinbase Wallet": true,
        "Trust Wallet": false,
      },
      "Multi-Chain": {
        Marz: true,
        "MetaMask": true,
        "Coinbase Wallet": true,
        "Trust Wallet": true,
      },
      "Embedded Wallets": {
        Marz: true,
        "MetaMask": false,
        "Coinbase Wallet": true,
        "Trust Wallet": false,
      },
      Rewards: {
        Marz: true,
        "MetaMask": false,
        "Coinbase Wallet": true,
        "Trust Wallet": false,
      },
      "AI Sentinel (Coming Soon)": {
        Marz: true,
        "MetaMask": false,
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-orbitron text-center mb-4">
            How Marz Compares
          </h2>
          <p className="text-center text-white/70 font-inter mb-12 sm:mb-16">
            See why Marz stands out from the competition
          </p>

          {/* Table - Desktop Only */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4 font-bold font-orbitron text-white">
                    Feature
                  </th>
                  {competitors.map((comp) => (
                    <th
                      key={comp}
                      className={`text-center py-4 px-4 font-bold font-orbitron ${
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
                    <td className="py-4 px-4 font-inter text-white">
                      {cat}
                    </td>
                    {competitors.map((comp) => (
                      <td
                        key={`${cat}-${comp}`}
                        className="text-center py-4 px-4"
                      >
                        {features[cat]?.[comp] ? (
                          <CheckCircle className="w-6 h-6 text-green-400 mx-auto" />
                        ) : (
                          <div className="w-6 h-6 border-2 border-white/20 rounded-full mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card Grid - Mobile */}
          <div className="lg:hidden grid grid-cols-1 gap-6">
            {competitors.map((comp) => (
              <div
                key={comp}
                className={`backdrop-blur-xl border rounded-2xl p-6 ${
                  comp === "Marz"
                    ? "bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border-cyan-400/50"
                    : "bg-white/10 border-white/20"
                }`}
              >
                <h3
                  className={`text-2xl font-bold font-orbitron mb-4 ${
                    comp === "Marz"
                      ? "text-cyan-400"
                      : "text-white"
                  }`}
                >
                  {comp}
                </h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div
                      key={`${comp}-${cat}`}
                      className="flex items-center justify-between"
                    >
                      <span className="text-white/70 font-inter text-sm">
                        {cat}
                      </span>
                      {features[cat]?.[comp] ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-white/20 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // CTA SECTION
  // ============================================================
  function CTASection() {
    return (
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-orbitron mb-4">
            Ready to Experience the Future?
          </h2>
          <p className="text-white/70 font-inter text-base sm:text-lg mb-8">
            Join thousands of crypto users who trust Marz with their digital assets.
          </p>
          <button className="px-8 sm:px-12 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold font-orbitron text-base sm:text-lg hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-105 transition-all duration-300">
            Launch App Now
          </button>
        </div>
      </section>
    );
  }

  // ============================================================
  // RENDER ALL SECTIONS
  // ============================================================
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
