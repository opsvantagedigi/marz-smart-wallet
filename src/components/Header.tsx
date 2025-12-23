"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#dashboard", label: "Dashboard" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-xl sm:text-2xl font-bold font-orbitron bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Marz
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm lg:text-base font-inter text-white hover:bg-white/10 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold font-inter hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-200">
            Launch App
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-xl bg-white/10 border-b border-white/20">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 rounded-lg text-white hover:bg-white/10 font-inter transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold font-inter hover:shadow-lg hover:shadow-cyan-400/50 transition-all">
              Launch App
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
