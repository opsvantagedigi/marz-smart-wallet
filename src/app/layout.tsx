import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Marz Smart Wallet",
  description: "Secure, smart digital asset management for the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className="text-white"
        style={{
          fontFamily: "Inter, Orbitron, sans-serif",
        }}
      >
        <Header />
        <main className="pt-16 pb-64">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
