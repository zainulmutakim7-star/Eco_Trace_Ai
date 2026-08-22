import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoTrace AI — Platform Komunitas Berkelanjutan Berbasis AI",
  description:
    "EcoTrace AI menggunakan kecerdasan buatan untuk membantu komunitas dalam pengelolaan sampah, pengurangan jejak karbon, dan membangun lingkungan yang lebih berkelanjutan.",
  keywords: ["sustainability", "AI", "waste management", "carbon footprint", "komunitas berkelanjutan"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* SEO Meta Tags */}
        <title>EcoTrace AI – Platform Komunitas Berkelanjutan Berbasis AI</title>
        <meta name="description" content="EcoTrace AI menggunakan kecerdasan buatan untuk membantu komunitas dalam pengelolaan sampah, pengurangan jejak karbon, dan membangun lingkungan yang lebih berkelanjutan." />
        <meta name="keywords" content="sustainability, AI, waste management, carbon footprint, komunitas berkelanjutan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50 font-sans">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>


    </html>
  );
}
