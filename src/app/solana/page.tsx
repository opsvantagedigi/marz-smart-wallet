export default function SolanaLandingPage() {
  return (
    <div className="min-h-screen bg-marz-gradient text-white flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl md:text-7xl font-orbitron font-bold animate-slide-up">
          Solana RPC by MARZ
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-2xl font-inter animate-fade-in">
          Ultra-fast, reliable, production-grade Solana RPC infrastructure powered by MARZ NeoSphere.
        </p>

        <div className="mt-10 flex gap-4 animate-fade-in">
          <a
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-white/20 backdrop-blur-lg border border-white/20 hover:bg-white/30 transition"
          >
            Go to Dashboard
          </a>

          <a
            href="/docs"
            className="px-6 py-3 rounded-xl bg-black/30 backdrop-blur-lg border border-white/20 hover:bg-black/40 transition"
          >
            View Docs
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-black/20 backdrop-blur-xl">
        <h2 className="text-4xl font-orbitron text-center mb-12">Why Choose MARZ RPC</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="glass p-6 rounded-2xl text-center">
            <h3 className="text-2xl font-orbitron mb-3">⚡ Ultra Fast</h3>
            <p className="font-inter">Optimized Solana RPC nodes with sub‑second response times.</p>
          </div>

          <div className="glass p-6 rounded-2xl text-center">
            <h3 className="text-2xl font-orbitron mb-3">🛡️ Secure</h3>
            <p className="font-inter">Protected by MARZ Sentinel and enterprise‑grade rate limiting.</p>
          </div>

          <div className="glass p-6 rounded-2xl text-center">
            <h3 className="text-2xl font-orbitron mb-3">📈 Scalable</h3>
            <p className="font-inter">Auto‑scaling RPC infrastructure built for production workloads.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white/80 font-inter">
        © {new Date().getFullYear()} MARZ NeoSphere — Solana RPC Infrastructure
      </footer>
    </div>
  );
}
