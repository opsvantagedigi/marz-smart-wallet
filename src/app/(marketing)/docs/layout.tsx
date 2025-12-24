import React from "react";
import DocsSidebar from "./sidebar/DocsSidebar";
import "./docs.css";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a1837] to-[#0e2e2e]">
      {/* Sidebar */}
      <aside className="hidden lg:block sticky top-0 h-screen w-64 p-6 bg-white/10 backdrop-blur-lg border-r border-white/10 shadow-xl z-20">
        <DocsSidebar />
      </aside>
      {/* Mobile sidebar */}
      <aside className="lg:hidden w-full sticky top-0 z-30 bg-white/10 backdrop-blur-lg border-b border-white/10">
        <DocsSidebar mobile />
      </aside>
      {/* Main content */}
      <main className="flex-1 px-4 py-8 md:px-12 max-w-3xl mx-auto">
        <div className="glassmorphic-card rounded-2xl p-6 md:p-10 border border-white/10 bg-white/10 backdrop-blur-lg shadow-lg">
          {children}
        </div>
      </main>
    </div>
  );
}
