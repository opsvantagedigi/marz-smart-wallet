import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "MARZ Smart Wallet",
  description: "Next-gen Smart Wallet powered by MARZ NeoSphere",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-slate-900">
        <Header />

        <main className="min-h-screen">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            {children}
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
