"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand-icon.png"
            alt="Marz logo"
            width={32}
            height={32}
            className="rounded-xl shadow-md"
          />
          <span className="bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] bg-clip-text text-transparent font-orbitron text-lg sm:text-xl font-bold tracking-wide">
            MARZ Smart Wallet
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-inter">
          <a href="#benefits" className="text-white/80 hover:text-cyan-400 transition-colors">
            Benefits
          </a>
          <a href="#features" className="text-white/80 hover:text-cyan-400 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-white/80 hover:text-cyan-400 transition-colors">
            How it works
          </a>
          <a href="#pricing" className="text-white/80 hover:text-cyan-400 transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-white/80 hover:text-cyan-400 transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full border border-white/20 bg-white/5 hover:border-cyan-400/70 hover:bg-white/10 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-300" />
            )}
          </button>
          <a
            href="#cta"
            className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] text-black text-sm font-semibold font-orbitron hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/40 transition-all duration-300"
          >
            Launch App
          </a>
        </div>
      </div>
    </header>
  );
}
