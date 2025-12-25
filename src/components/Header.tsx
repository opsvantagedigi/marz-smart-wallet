"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-transparent z-50">
      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-orbitron text-2xl font-bold text-white">
          MARZ Wallet
        </Link>

        <nav className="flex items-center gap-4 text-white/80">
          <Link href="/dashboard" className="hover:text-marz-yellow transition">Dashboard</Link>
          <Link href="/about" className="hover:text-marz-yellow transition">About</Link>
          <Link href="/contact" className="hover:text-marz-yellow transition">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
