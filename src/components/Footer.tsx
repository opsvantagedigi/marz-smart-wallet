export default function Footer() {
  return (
    <footer className="mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-center text-slate-600">
        <p className="heading-orbitron text-lg text-slate-800">MARZ NeoSphere</p>
        <p className="text-sm text-slate-600 mt-2">© {new Date().getFullYear()} OpsVantage Digital. All rights reserved.</p>
      </div>
    </footer>
  );
}
