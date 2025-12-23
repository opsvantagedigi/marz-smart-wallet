"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-black/40 dark:bg-black/40 bg-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 animate-glowPulse" />
          <span className="font-orbitron text-lg sm:text-xl tracking-wide">
            Marz
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-inter">
          <a href="#benefits" className="hover:text-cyan-400">
            Benefits
          </a>
          <a href="#features" className="hover:text-cyan-400">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-cyan-400">
            How it works
          </a>
          <a href="#pricing" className="hover:text-cyan-400">
            Pricing
          </a>
          <a href="#faq" className="hover:text-cyan-400">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full border border-white/20 dark:border-white/20 bg-black/40 dark:bg-black/40 hover:border-cyan-400/70 hover:bg-black/70 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
          <a
            href="#cta"
            className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-sm font-semibold font-orbitron hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/40 transition-transform"
          >
            Launch App
          </a>
        </div>
      </div>
    </header>
  );
}
