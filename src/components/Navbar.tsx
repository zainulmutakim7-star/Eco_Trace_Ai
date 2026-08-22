"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Leaf,
  Menu,
  X,
  ScanLine,
  LayoutDashboard,
  Home,
  Calculator,
  MapPin,
  Trophy,
  PlusCircle,
} from "lucide-react";
import ReportModal from "./ReportModal";

const navLinks = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/scanner", label: "AI Scanner", icon: ScanLine },
  { href: "/calculator", label: "Kalkulator Karbon", icon: Calculator },
  { href: "/map", label: "Bank Sampah", icon: MapPin },
  { href: "/community", label: "Komunitas", icon: Trophy },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="gradient-text">EcoTrace</span>
                <span className="text-slate-400 ml-1 font-light">AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-emerald-500/15 text-emerald-400 shadow-sm shadow-emerald-500/10"
                        : "text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Action & Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setReportModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-xs shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:scale-105 transition-all duration-300"
              >
                <PlusCircle className="w-4 h-4" />
                Lapor Sampah
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 space-y-1 border-t border-emerald-500/10 pt-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileOpen(false);
                setReportModalOpen(true);
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-xs shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              Lapor Sampah
            </button>
          </div>
        </div>
      </nav>

      {/* Global Report Modal */}
      <ReportModal isOpen={reportModalOpen} onClose={() => setReportModalOpen(false)} />
    </>
  );
}
