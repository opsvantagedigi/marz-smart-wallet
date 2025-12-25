"use client";

import { useState } from "react";
import Link from "next/link";
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


import { FC, useState } from "react";

export const HeroSection: FC = () => (
  // ...existing code for HeroSection...
);

export const BenefitsSection: FC = () => (
  // ...existing code for BenefitsSection...
);

export const FeaturesSection: FC = () => (
  // ...existing code for FeaturesSection...
);

export const HowItWorksSection: FC = () => (
  // ...existing code for HowItWorksSection...
);

export const PricingSection: FC = () => (
  // ...existing code for PricingSection...
);

export const FAQSection: FC = () => (
  // ...existing code for FAQSection...
);

export const ComparisonSection: FC = () => (
  // ...existing code for ComparisonSection...
);

export const CTASection: FC = () => (
  // ...existing code for CTASection...
);

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  return (
    <div className="w-full">
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
