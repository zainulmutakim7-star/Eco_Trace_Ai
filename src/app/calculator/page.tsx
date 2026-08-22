"use client";

import { useState } from "react";
import {
  Calculator,
  Car,
  Zap,
  Trash2,
  Utensils,
  Leaf,
  Sparkles,
  Award,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  TrendingDown,
  Info,
  ShieldCheck,
} from "lucide-react";

export default function CarbonCalculatorPage() {
  // Inputs
  const [transportMode, setTransportMode] = useState<"car" | "motorcycle" | "public">("motorcycle");
  const [distanceKm, setDistanceKm] = useState<number>(20); // km/day
  const [electricityKwh, setElectricityKwh] = useState<number>(150); // kWh/month
  const [wasteRecyclePercent, setWasteRecyclePercent] = useState<number>(30); // % recycled
  const [dietType, setDietType] = useState<"meat" | "balanced" | "plant">("balanced");

  const [pledged, setPledged] = useState<boolean>(false);

  // Calculation Logic (Monthly Emission in kg CO2e)
  // Transport: Car ~ 0.19 kg/km, Motorcycle ~ 0.08 kg/km, Public ~ 0.03 kg/km (daily * 30)
  const transportFactor = transportMode === "car" ? 0.19 : transportMode === "motorcycle" ? 0.08 : 0.03;
  const transportEmission = Math.round(distanceKm * 30 * transportFactor);

  // Electricity: ~ 0.85 kg CO2e per kWh (Indonesia grid average)
  const energyEmission = Math.round(electricityKwh * 0.85);

  // Waste: Base ~ 40 kg CO2e/month per person, reduced by recycling %
  const wasteEmission = Math.round(40 * (1 - wasteRecyclePercent / 100));

  // Diet: Meat ~ 150 kg/mo, Balanced ~ 90 kg/mo, Plant ~ 50 kg/mo
  const dietEmission = dietType === "meat" ? 150 : dietType === "balanced" ? 90 : 50;

  const totalMonthlyCO2 = transportEmission + energyEmission + wasteEmission + dietEmission;
  const totalAnnualTonCO2 = Number((totalMonthlyCO2 * 12 / 1000).toFixed(2));

  // National average is ~ 2.1 ton/year per capita (175 kg/mo), Net-Zero target is 1.0 ton/year (83 kg/mo)
  const isBelowAverage = totalAnnualTonCO2 <= 2.1;

  const resetForm = () => {
    setTransportMode("motorcycle");
    setDistanceKm(20);
    setElectricityKwh(150);
    setWasteRecyclePercent(30);
    setDietType("balanced");
    setPledged(false);
  };

  return (
    <div className="min-h-screen grid-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-medium text-emerald-400 mb-4">
            <Sparkles className="w-3 h-3" />
            Kalkulator Emisi Berbasis AI
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            Kalkulator <span className="gradient-text">Jejak Karbon</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Hitung perkiraan emisi karbon harianmu, identifikasi sumber emisi terbesar, dan dapatkan strategi AI untuk hidup lebih ramah lingkungan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ═══════ WIZARD FORM (LEFT) ═══════ */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Transportasi */}
            <div className="rounded-2xl glass p-6 border border-emerald-500/15">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-100">1. Mobilitas & Transportasi</h3>
                  <p className="text-xs text-slate-400">Moda transportasi harian utama</p>
                </div>
              </div>

              {/* Mode selector */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { id: "motorcycle", label: "Motor", icon: "🛵" },
                  { id: "car", label: "Mobil", icon: "🚗" },
                  { id: "public", label: "KRL / Bus", icon: "🚌" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTransportMode(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      transportMode === item.id
                        ? "bg-emerald-500/15 border-emerald-500 text-emerald-300 font-semibold"
                        : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-xs">{item.label}</div>
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span>Jarak Perjalanan Harian</span>
                  <span className="font-bold text-emerald-400">{distanceKm} km / hari</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  step="2"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* 2. Energi Rumah Tangga */}
            <div className="rounded-2xl glass p-6 border border-emerald-500/15">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-100">2. Konsumsi Listrik Rumah</h3>
                  <p className="text-xs text-slate-400">Estimasi penggunaan daya listrik per bulan</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span>Listrik Bulanan (kWh)</span>
                  <span className="font-bold text-amber-400">{electricityKwh} kWh / bulan</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="600"
                  step="10"
                  value={electricityKwh}
                  onChange={(e) => setElectricityKwh(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500 mt-2">
                  *Sekitar Rp {(electricityKwh * 1444).toLocaleString("id-ID")} per bulan (Tarif PLN R-1/900VA-1300VA)
                </p>
              </div>
            </div>

            {/* 3. Pengelolaan Sampah */}
            <div className="rounded-2xl glass p-6 border border-emerald-500/15">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-100">3. Daur Ulang & Kompos</h3>
                  <p className="text-xs text-slate-400">Persentase sampah yang berhasil didaur ulang / komposting</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span>Tingkat Daur Ulang Mandiri</span>
                  <span className="font-bold text-emerald-400">{wasteRecyclePercent}% Didaur Ulang</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={wasteRecyclePercent}
                  onChange={(e) => setWasteRecyclePercent(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* 4. Pola Konsumsi Makanan */}
            <div className="rounded-2xl glass p-6 border border-emerald-500/15">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center text-teal-400">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-100">4. Pola Makan</h3>
                  <p className="text-xs text-slate-400">Frekuensi konsumsi daging / bahan pangan olahan</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "meat", label: "Tinggi Daging", desc: "Hampir tiap hari", icon: "🥩" },
                  { id: "balanced", label: "Seimbang", desc: "Daging 2-3x / minggu", icon: "🥗" },
                  { id: "plant", label: "Vegetarian", desc: "Mayoritas Nabati", icon: "🌱" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDietType(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      dietType === item.id
                        ? "bg-teal-500/15 border-teal-500 text-teal-300 font-semibold"
                        : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-xs font-semibold">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <div className="text-right">
              <button
                onClick={resetForm}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Kalkulator
              </button>
            </div>
          </div>

          {/* ═══════ SUMMARY & AI RECOMMENDATIONS (RIGHT) ═══════ */}
          <div className="lg:col-span-5 space-y-6">
            {/* Total Result Card */}
            <div className="rounded-2xl glass p-6 border border-emerald-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Jejak Karbon</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${isBelowAverage ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                  {isBelowAverage ? "Di Bawah Rata-Rata Nasional" : "Di Atas Rata-Rata"}
                </span>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-extrabold text-slate-100 flex items-baseline gap-2">
                  <span className="gradient-text">{totalMonthlyCO2}</span>
                  <span className="text-lg text-slate-400 font-medium">kg CO₂e / bulan</span>
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  Setara dengan <span className="text-emerald-400 font-semibold">{totalAnnualTonCO2} ton CO₂e</span> per tahun
                </div>
              </div>

              {/* Progress Bar Comparison */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Jejak Karbon Anda</span>
                    <span className="font-bold text-slate-200">{totalAnnualTonCO2} ton/thn</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (totalAnnualTonCO2 / 4) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-500 mb-1">
                    <span>Rata-Rata Nasional ID</span>
                    <span>2.10 ton/thn</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-blue-500/60 rounded-full" style={{ width: "52%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-500 mb-1">
                    <span>Target Net-Zero</span>
                    <span>1.00 ton/thn</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500/40 rounded-full" style={{ width: "25%" }} />
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/60">
                  <span className="text-slate-500 block">Transportasi</span>
                  <span className="font-bold text-blue-400">{transportEmission} kg CO₂e</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60">
                  <span className="text-slate-500 block">Listrik Rumah</span>
                  <span className="font-bold text-amber-400">{energyEmission} kg CO₂e</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60">
                  <span className="text-slate-500 block">Sampah</span>
                  <span className="font-bold text-emerald-400">{wasteEmission} kg CO₂e</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60">
                  <span className="text-slate-500 block">Pola Makan</span>
                  <span className="font-bold text-teal-400">{dietEmission} kg CO₂e</span>
                </div>
              </div>
            </div>

            {/* AI Custom Recommendations */}
            <div className="rounded-2xl glass p-6 border border-emerald-500/15 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-200">Rekomendasi AI Pengurangan Emisi</h3>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                {wasteRecyclePercent < 50 && (
                  <li className="flex gap-2 items-start p-2.5 rounded-xl bg-emerald-500/10">
                    <Leaf className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Tingkatkan daur ulang ke <strong className="text-emerald-300">50%+</strong> melalui Bank Sampah untuk menghemat hingga <strong className="text-emerald-300">12 kg CO₂e/bulan</strong>.
                    </span>
                  </li>
                )}

                {transportMode === "car" && (
                  <li className="flex gap-2 items-start p-2.5 rounded-xl bg-blue-500/10">
                    <Car className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>
                      Gunakan moda transportasi publik 2 hari seminggu untuk memangkas <strong className="text-blue-300">45 kg CO₂e/bulan</strong>.
                    </span>
                  </li>
                )}

                {electricityKwh > 200 && (
                  <li className="flex gap-2 items-start p-2.5 rounded-xl bg-amber-500/10">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      Ganti ke lampu LED hemat energi & matikan AC saat tidak terpakai untuk hemat <strong className="text-amber-300">30 kWh/bulan</strong>.
                    </span>
                  </li>
                )}

                <li className="flex gap-2 items-start p-2.5 rounded-xl bg-teal-500/10">
                  <Utensils className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>
                    Dukung gerakan <strong className="text-teal-300">Meatless Monday</strong> untuk mengurangi emisi pangan hingga <strong className="text-teal-300">15 kg CO₂e/bulan</strong>.
                  </span>
                </li>
              </ul>
            </div>

            {/* Pledge Card */}
            <div className="rounded-2xl glass p-6 text-center space-y-4 border border-emerald-500/20">
              <Award className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-100">Komitmen Hijau 2026</h3>
              <p className="text-xs text-slate-400">
                Ambil komitmen untuk memangkas setidaknya 10% jejak karbonmu bulan ini dan dapatkan lencana apresiasi komunitas.
              </p>

              {pledged ? (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Komitmen Terdaftar! +150 EcoPoints Terbuka
                </div>
              ) : (
                <button
                  onClick={() => setPledged(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-xs shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all"
                >
                  Saya Berkomitmen Kurangi 10% Karbon
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
