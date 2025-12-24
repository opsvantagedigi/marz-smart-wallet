"use client";
import React, { useState } from "react";

const sections = [
  { label: "Introduction", href: "#introduction" },
  { label: "Quickstart", href: "#quickstart" },
  { label: "Authentication", href: "#authentication" },
  { label: "RPC Methods", href: "#rpc-methods" },
  { label: "Rate Limits", href: "#rate-limits" },
  { label: "Webhooks", href: "#webhooks" },
  { label: "Errors", href: "#errors" },
];

export default function DocsSidebar({ mobile = false }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="font-orbitron">
      {mobile ? (
        <div className="p-4 flex items-center justify-between">
          <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            Docs Menu
          </span>
          <button
            className="ml-2 p-2 rounded-lg bg-white/10 hover:bg-white/20"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle docs menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      ) : null}
      <ul className={`transition-all ${mobile ? (open ? "max-h-96" : "max-h-0 overflow-hidden") : "block"} px-2`}> 
        {sections.map((section) => (
          <li key={section.href} className="mb-2">
            <a
              href={section.href}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-white/90 hover:bg-gradient-to-r hover:from-green-400/20 hover:to-yellow-400/20 transition-colors"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
