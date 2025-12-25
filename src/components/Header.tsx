"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="w-full glass bg-white/5 backdrop-blur-md border border-white/10">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 relative flex-shrink-0">
              <Image src="/brand-icon.png" alt="MARZ icon" fill sizes="40px" className="object-contain" />
            </div>
            <span className="font-orbitron text-lg md:text-2xl font-bold bg-gradient-to-r from-[#003366] via-[#006633] to-[#FFCC00] text-transparent bg-clip-text">
              MARZ NeoSphere
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-white/90">
            <Link href="/dashboard" className="hover:opacity-90 transition">Dashboard</Link>
            <Link href="/about" className="hover:opacity-90 transition">About</Link>
            <Link href="/contact" className="hover:opacity-90 transition">Contact</Link>
            <Link href="/create-wallet" className="hover:opacity-90 transition">Smart Wallet</Link>
            <Link href="/solana" className="hover:opacity-90 transition">Solana RPC</Link>
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md text-white/90 hover:bg-white/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className="md:hidden w-full px-4 pb-4">
            <div className="flex flex-col gap-3 text-white/95">
              <Link href="/dashboard" onClick={() => setOpen(false)} className="block py-2">Dashboard</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="block py-2">About</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="block py-2">Contact</Link>
              <Link href="/dashboard" onClick={() => setOpen(false)} className="block py-2">Smart Wallet</Link>
              <Link href="/solana" onClick={() => setOpen(false)} className="block py-2">Solana RPC</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
