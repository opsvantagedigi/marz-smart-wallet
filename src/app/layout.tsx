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
      <body className="min-h-screen bg-[url('/stars.svg')] bg-cover bg-fixed bg-center bg-no-repeat text-slate-900">
        <Header />

        <main className="min-h-screen backdrop-blur-xl bg-white/5">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
