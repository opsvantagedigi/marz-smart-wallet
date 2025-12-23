"use client";

import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = {
    company: {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Careers", href: "#careers" },
        { label: "Contact", href: "#contact" },
      ],
    },
    product: {
      title: "Product",
      links: [
        { label: "Smart Wallet", href: "#wallet" },
        { label: "Dashboard", href: "#dashboard" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
    resources: {
      title: "Resources",
      links: [
        { label: "Docs", href: "#docs" },
        { label: "API", href: "#api" },
        { label: "Tutorials", href: "#tutorials" },
      ],
    },
    comingSoon: {
      title: "Coming Soon",
      links: [
        { label: "AI Sentinel", href: "#ai-sentinel" },
        { label: "Marz Token", href: "#token" },
        { label: "Rollup Chain", href: "#rollup" },
      ],
    },
  };

  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 backdrop-blur-xl bg-white/10 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(sections).map(([key, section]) => (
            <div key={key} className="flex flex-col">
              <h3 className="text-white font-bold font-orbitron mb-4 text-sm lg:text-base">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white text-xs sm:text-sm font-inter transition-colors duration-200 flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-white/60 text-xs sm:text-sm font-inter text-center sm:text-left">
            <p>
              © {currentYear} Marz Smart Wallet. Built with{" "}
              <Heart className="inline w-3 h-3 text-red-400 mx-1" />
              for crypto users.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="#twitter"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#github"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#linkedin"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#email"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
