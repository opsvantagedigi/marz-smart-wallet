import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="font-orbitron text-4xl">Contact MARZ</h1>
        <p className="font-inter text-lg text-slate-700">For support and partnership inquiries:</p>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-lg">
          <h2 className="font-orbitron text-2xl mb-2">Support</h2>
          <p className="font-inter text-slate-700">Email: <a href="mailto:support@marz.example" className="text-[#00BFFF]">support@marz.example</a></p>
          <p className="font-inter text-slate-700">For urgent incidents, open a support ticket in your dashboard.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-lg">
          <h2 className="font-orbitron text-2xl mb-2">Partnerships</h2>
          <p className="font-inter text-slate-700">If you'd like to integrate MARZ RPC or co-develop features, reach out at <a href="mailto:partners@marz.example" className="text-[#00BFFF]">partners@marz.example</a>.</p>
        </div>

        <div>
          <Link href="/" className="text-slate-600 hover:underline">← Home</Link>
        </div>
      </div>
    </main>
  );
}
