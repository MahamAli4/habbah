import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habbah Educational Trust",
  description: "Empowering Future Leaders Through Education",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans text-gray flex flex-col">
        <Navbar />
        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <main className="grow pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
