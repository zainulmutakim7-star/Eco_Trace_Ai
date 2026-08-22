"use client";

import Link from "next/link";
import {
  ScanLine,
  Users,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Recycle,
  BarChart3,
  Leaf,
  Globe,
  Zap,
  Calculator,
  MapPin,
  Trophy,
  ChevronDown,
  CheckCircle2,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ─── Animated Counter ─── */
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return (
    <span>
      {count.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

/* ─── All 5 Core Features ─── */
const features = [
  {
    icon: ScanLine,
    title: "AI Waste Scanner",
    description:
      "Pindai sampah menggunakan AI visi komputer untuk analisis jenis material, kategori daur ulang, dan rekomendasi langkah pengelolaan instan.",
    href: "/scanner",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: Calculator,
    title: "Kalkulator Jejak Karbon",
    description:
      "Ukur emisi karbon harianmu dari sektor transportasi, listrik, dan sampah dengan strategi pengurangan yang dipersonalisasi AI.",
    href: "/calculator",
    gradient: "from-teal-400 to-blue-400",
  },
  {
    icon: MapPin,
    title: "Peta Bank Sampah",
    description:
      "Temukan Bank Sampah & Drop Point Limbah B3 terdekat, pantau harga setoran per kg, serta jadwalkan penjemputan sampah gratis.",
    href: "/map",
    gradient: "from-blue-400 to-emerald-400",
  },
  {
    icon: Trophy,
    title: "Komunitas & Tantangan",
    description:
      "Ikuti tantangan hijau mingguan, kumpulkan EcoPoints, dan jadilah pemimpin di papan peringkat keberlanjutan wilayahmu.",
    href: "/community",
    gradient: "from-amber-400 to-emerald-400",
  },
  {
    icon: BarChart3,
    title: "Dashboard Analitik",
    description:
      "Pantau statistik real-time pengelolaan sampah komunitas, offset karbon total, dan tren mingguan secara transparan.",
    href: "/dashboard",
    gradient: "from-emerald-400 to-teal-500",
  },
];

/* ─── Stats Data ─── */
const stats = [
  { value: 12450, suffix: " kg", label: "Sampah Terkelola", icon: Recycle },
  { value: 3247, suffix: "+", label: "Anggota Komunitas", icon: Users },
  { value: 8, suffix: ".5 ton", label: "Karbon Dioffset", icon: Leaf },
  { value: 156, suffix: "+", label: "Komunitas Aktif", icon: Globe },
];

/* ─── Testimonials ─── */
const testimonials = [
  {
    quote: "AI Waste Scanner EcoTrace memudahkan warga kami mengedukasi diri tentang daur ulang. Dalam 2 bulan, sampah terpilah naik 40%!",
    name: "Dr. Bambang Setiawan",
    role: "Ketua RW 05 Menteng",
    avatar: "BS",
  },
  {
    quote: "Kalkulator Karbonnya sangat interaktif! Saya baru sadar kalau naik motor 20km/hari ternyata menghasilkan emisi yang lumayan.",
    name: "Nadia Putri",
    role: "Mahasiswi & Aktivis Lingkungan",
    avatar: "NP",
  },
  {
    quote: "Bisa langsung pesan penjemputan sampah ke Bank Sampah terdekat lewat aplikasi ini luar biasa praktis.",
    name: "Hendra Wijaya",
    role: "Pengelola Bank Sampah Berkah",
    avatar: "HW",
  },
];

/* ─── FAQs ─── */
const faqs = [
  {
    q: "Bagaimana cara kerja AI Waste Scanner?",
    a: "Anda cukup mengambil atau mengunggah foto sampah. Model AI computer vision kami menganalisis visual material, mencocokkan pola dengan dataset ribuan jenis sampah, lalu mengelompokkan kategori (Organik/Anorganik/B3) serta instruksi daur ulangnya secara otomatis dalam waktu kurang dari 3 detik.",
  },
  {
    q: "Apakah layanan EcoTrace AI bebas biaya?",
    a: "Ya! Seluruh fitur dasar termasuk AI Scanner, Kalkulator Karbon, Peta Bank Sampah, dan Dashboard Komunitas 100% gratis untuk seluruh masyarakat dan pengelola bank sampah.",
  },
  {
    q: "Bagaimana EcoPoints dihitung?",
    a: "Setiap laporan pengelolaan sampah terverifikasi atau tantangan lingkungan yang berhasil diselesaikan memberikan poin berdasarkan jumlah kg sampah yang dikelola dan potensi karbon yang dioffset.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [calcInputKg, setCalcInputKg] = useState<number>(10);

  return (
    <div className="grid-bg overflow-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center hero-gradient py-16">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-teal-400/8 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs font-medium text-emerald-300 mb-8 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Platform Ekosistem Komunitas Berkelanjutan Berbasis AI
          </div>

          <h1 className="animate-slide-up text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
            <span className="text-slate-100">Bangun Komunitas</span>
            <br />
            <span className="gradient-text">Berkelanjutan</span>
            <br />
            <span className="text-slate-100">dengan Kekuatan AI</span>
          </h1>

          <p className="animate-slide-up-delayed text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            EcoTrace AI mengintegrasikan kecerdasan buatan, pemetaan Bank Sampah, dan analitik jejak karbon untuk mewujudkan lingkungan yang lebih hijau & bersih.
          </p>

          <div className="animate-slide-up-delayed-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/scanner"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
            >
              <Zap className="w-4 h-4" />
              Mulai Analisis Sekarang
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass text-emerald-300 font-semibold text-sm hover:bg-emerald-500/10 transition-all duration-300"
            >
              <Calculator className="w-4 h-4" />
              Hitung Jejak Karbon
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ STATS BAR ═══════ */}
      <section className="relative py-16 border-y border-emerald-500/10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl glass-light hover:bg-emerald-500/5 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 mb-3">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-100">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES GRID ═══════ */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-medium text-emerald-400 mb-4">
              <Sparkles className="w-3 h-3" />
              Ekosistem Lengkap
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
              Fitur Unggulan <span className="gradient-text">EcoTrace AI</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              5 pilar inovasi teknologi pintar yang memperdayakan warga dan komunitas secara terintegrasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group card-glow rounded-2xl glass p-8 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-emerald-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-400 group-hover:translate-x-1 transition-all duration-300">
                    Buka Fitur <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ INTERACTIVE IMPACT ESTIMATOR ═══════ */}
      <section className="py-16 relative bg-slate-900/40 border-y border-emerald-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-medium text-emerald-400 mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Estimator Dampak Positif
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
            Berapa Banyak Karbon Yang Bisa Kamu Hemat?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-8">
            Geser slider untuk melihat dampak nyata jika kamu memilah sampah plastik/organik setiap minggu.
          </p>

          <div className="rounded-2xl glass p-6 sm:p-8 max-w-xl mx-auto border border-emerald-500/20 space-y-6">
            <div>
              <div className="flex justify-between text-sm text-slate-300 mb-2">
                <span>Sampah Didaur Ulang / Minggu</span>
                <span className="font-bold text-emerald-400">{calcInputKg} kg / minggu</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={calcInputKg}
                onChange={(e) => setCalcInputKg(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-left">
              <div className="p-4 rounded-xl bg-slate-900/60">
                <span className="text-xs text-slate-500 block">Reduksi Karbon / Tahun</span>
                <span className="text-xl font-bold text-emerald-400">
                  {(calcInputKg * 52 * 0.45).toFixed(1)} kg CO₂e
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60">
                <span className="text-xs text-slate-500 block">Setara Pohon Ditanam</span>
                <span className="text-xl font-bold text-teal-400">
                  {Math.round((calcInputKg * 52 * 0.45) / 20)} Pohon 🌳
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-3">
              Dipercaya Oleh <span className="gradient-text">Komunitas & Warga</span>
            </h2>
            <p className="text-slate-400 text-sm">Apa kata penggerak lingkungan yang telah menggunakan EcoTrace AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl glass p-6 border border-slate-800 flex flex-col justify-between">
                <div>
                  <Quote className="w-8 h-8 text-emerald-500/30 mb-3" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{t.name}</h4>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ SECTION ═══════ */}
      <section className="py-20 relative bg-slate-950/50 border-t border-emerald-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100 mb-2">Pertanyaan Umum (FAQ)</h2>
            <p className="text-slate-400 text-sm">Jawaban atas pertanyaan seputar platform EcoTrace AI</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl glass border border-slate-800/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left font-semibold text-slate-200 flex items-center justify-between text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-emerald-400 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA BANNER ═══════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-emerald-800/10 to-teal-900/20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
            Siap Bergabung dengan Gerakan Hijau?
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Mulai kontribusimu hari ini. Scan sampah pertamamu dan lihat bagaimana AI dapat membantu lingkungan.
          </p>
          <Link
            href="/scanner"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300"
          >
            <ScanLine className="w-4 h-4" />
            Mulai Analisis Sekarang
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
