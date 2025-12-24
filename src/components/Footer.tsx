import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12 mb-10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-orbitron text-lg sm:text-xl font-bold text-white">
              Marz Smart Wallets
            </h3>
            <p className="text-sm sm:text-base text-white/70 font-inter">
              The future of digital asset management. Secure, smart, and built for you.
            </p>
            <div className="flex items-center gap-4 text-white/70">
              <a href="#" aria-label="Twitter" className="hover:text-cyan-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-cyan-400">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-cyan-400">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-white/70 font-inter">
              <li><a href="#" className="hover:text-cyan-400">About</a></li>
              <li><a href="#" className="hover:text-cyan-400">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-400">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400">Press</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-white/70 font-inter">
              <li><a href="#" className="hover:text-cyan-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyan-400">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-cyan-400">Security</a></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-white/70 font-inter">
              <li><a href="#" className="hover:text-cyan-400">Contact</a></li>
              <li><a href="#" className="hover:text-cyan-400">Support</a></li>
              <li><a href="#" className="hover:text-cyan-400">Status</a></li>
            </ul>
          </div>
        </div>

        {/* Brand Statement + Gradient Bar */}
        <div className="space-y-3 border-t border-white/10 pt-4">
          <p className="text-xs sm:text-sm text-white/60 font-inter">
            Built with security-first architecture. Powered by Account Kit and Alchemy.
          </p>
          <div className="h-1 w-full bg-gradient-to-r from-[#007F7F] via-[#00BFFF] to-[#FFD700] rounded-full" />
        </div>

        {/* Copyright */}
        <div className="mt-4 text-xs sm:text-sm text-white/50 font-inter">
          © 2025 OpsVantage Digital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
