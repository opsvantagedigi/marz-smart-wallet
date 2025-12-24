"use client";

export function SectionCard({ title, children }: any) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
      <h2 className="font-orbitron text-xl mb-4 text-white">{title}</h2>
      {children}
    </div>
  );
}
