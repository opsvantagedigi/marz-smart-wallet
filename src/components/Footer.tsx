export default function Footer() {
  return (
    <footer className="border-t border-white/10 dark:border-white/10 bg-black/60 dark:bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/60 dark:text-white/60">
        <p>© {new Date().getFullYear()} Marz Smart Wallet. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#faq" className="hover:text-cyan-400">
            FAQ
          </a>
          <a href="#comparison" className="hover:text-cyan-400">
            Compare
          </a>
        </div>
      </div>
    </footer>
  );
}
