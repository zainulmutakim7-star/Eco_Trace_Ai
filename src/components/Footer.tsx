import { Leaf, ExternalLink, Heart } from "lucide-react";
import Link from "next/link";
import CompetitionLogos from "./CompetitionLogos";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-500/10 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="gradient-text">EcoTrace</span>
                <span className="text-slate-400 ml-1 font-light">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Platform ekosistem pintar berbasis AI untuk memperdayakan masyarakat dalam pengelolaan limbah, pengurangan jejak karbon, serta percepatan pencapaian target Net Zero Emission di Indonesia.
            </p>
          </div>

          {/* Navigasi Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Fitur Utama</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/scanner" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">
                  AI Waste Scanner
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">
                  Kalkulator Karbon
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">
                  Peta Bank Sampah
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">
                  Komunitas & Tantangan
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">
                  Analitik Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Competition Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Kompetisi</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Dikembangkan untuk kompetisi bertema: &ldquo;Shaping Tomorrow: Digital Technology, Artificial Intelligence, and Sustainable Communities.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/zainulmutakim7-star/Eco_Trace_Ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                aria-label="GitHub Repository"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <CompetitionLogos />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2026 EcoTrace AI. Hak cipta dilindungi undang-undang.
          </p>
          <p className="text-xs text-slate-600 flex items-center gap-1">
            Dibuat dengan <Heart className="w-3 h-3 text-emerald-500 inline fill-emerald-500" /> untuk bumi yang lebih hijau & bersih
          </p>
        </div>
      </div>
    </footer>
  );
}
