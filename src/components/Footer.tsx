import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content - Multi-column Grid */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-orbitron font-bold text-white mb-3">
              Marz Smart Wallets
            </h3>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">
              The future of digital asset management. Secure, smart, and built for you.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-white/60 hover:text-cyan-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-cyan-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-orbitron font-semibold text-white mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-cyan-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-cyan-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-cyan-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-cyan-400 transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-orbitron font-semibold text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-cyan-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-cyan-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-cyan-400 transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-sm font-orbitron font-semibold text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-cyan-400 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/60 hover:text-cyan-400 transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand Strip / Statement */}
        <div className="border-t border-white/5 py-6">
          <p className="text-center text-sm text-white/50 mb-4">
            Built with security-first architecture. Powered by Account Kit and Alchemy.
          </p>
          {/* Gradient Bar */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        </div>

        {/* Copyright Line */}
        <div className="py-6 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} OpsVantage Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
