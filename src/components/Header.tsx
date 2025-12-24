"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-transparent z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="heading-orbitron text-2xl font-bold text-slate-900">
          MARZ Wallet
        </Link>

        <nav className="flex items-center gap-4 text-slate-700">
          <Link href="/dashboard" className="hover:text-slate-900 transition">Dashboard</Link>
          <Link href="/about" className="hover:text-slate-900 transition">About</Link>
          <Link href="/contact" className="hover:text-slate-900 transition">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
