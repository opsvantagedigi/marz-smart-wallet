import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="font-orbitron text-4xl">About MARZ NeoSphere</h1>
        <p className="font-inter text-lg text-slate-700">
          MARZ NeoSphere combines account abstraction, gas sponsorship, and a
          developer-friendly RPC platform. Our Smart Wallets provide a safer,
          more flexible user experience with optional guardians, social
          recovery, and gasless UX.
        </p>

        <section className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-lg">
          <h2 className="font-orbitron text-2xl mb-2">For Builders</h2>
          <p className="font-inter text-slate-700">
            Integrate MARZ RPC for low-latency endpoints, tenant-aware rate
            limits, and observability tools to understand traffic and failures.
          </p>
        </section>

        <section className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-lg">
          <h2 className="font-orbitron text-2xl mb-2">For Users</h2>
          <p className="font-inter text-slate-700">
            Use Smart Wallets to avoid managing seed phrases, recover access with
            guardians, and enjoy gas-sponsored transactions on MARZ NeoSphere.
          </p>
        </section>

        <div>
          <Link href="/" className="text-slate-600 hover:underline">← Home</Link>
        </div>
      </div>
    </main>
  );
}
