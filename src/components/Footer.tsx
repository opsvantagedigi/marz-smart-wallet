export default function Footer() {
  return (
    <footer className="backdrop-blur-xl bg-white/10 border-t border-white/20 shadow-lg mt-16">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-slate-200">
        <p className="heading-orbitron text-lg bg-gradient-to-r from-brand-blue via-brand-teal to-brand-yellow bg-clip-text text-transparent">
          MARZ NeoSphere
        </p>
        <p className="text-sm text-slate-300 mt-2">
          © {new Date().getFullYear()} OpsVantage Digital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
