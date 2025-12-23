import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className="font-sans text-white min-h-screen"
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
