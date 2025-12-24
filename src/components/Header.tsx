"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="heading-orbitron text-2xl font-bold bg-gradient-to-r from-brand-blue via-brand-teal to-brand-yellow bg-clip-text text-transparent">
          MARZ Wallet
        </Link>

        <nav className="flex items-center gap-6 text-slate-100">
          <Link href="/dashboard" className="hover:text-brand-yellow transition">Dashboard</Link>
          <Link href="/about" className="hover:text-brand-yellow transition">About</Link>
          <Link href="/contact" className="hover:text-brand-yellow transition">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
