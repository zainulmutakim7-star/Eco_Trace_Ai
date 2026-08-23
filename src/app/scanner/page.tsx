"use client";

import { useState, useCallback } from "react";
import {
  Upload,
  ScanLine,
  Loader2,
  CheckCircle2,
  Recycle,
  Leaf,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ImageIcon,
  Lightbulb,
  Footprints,
  Tag,
  FileText,
} from "lucide-react";

/* ─── Types ─── */
type WasteCategory = "Anorganik Daur Ulang" | "Organik" | "B3 (Berbahaya)";

interface AnalysisResult {
  itemName: string;
  category: WasteCategory;
  carbonReduction: string;
  confidence: number;
  description: string;
  steps: string[];
  tips: string[];
}

/* ─── Mock AI Analysis Data ─── */
const mockResults: AnalysisResult[] = [
  {
    itemName: "Botol Plastik PET",
    category: "Anorganik Daur Ulang",
    carbonReduction: "0.5 kg CO₂",
    confidence: 94,
    description:
      "Botol plastik jenis PET (Polyethylene Terephthalate) yang umum digunakan untuk kemasan air mineral dan minuman ringan. Material ini dapat didaur ulang menjadi serat polyester, karpet, atau botol baru.",
    steps: [
      "Kosongkan sisa cairan dari dalam botol.",
      "Bilas botol dengan air bersih untuk menghilangkan residu.",
      "Lepaskan label dan tutup botol (beda jenis plastik).",
      "Remas botol agar menghemat ruang penyimpanan.",
      "Masukkan ke tempat sampah khusus plastik daur ulang.",
      "Setor ke bank sampah atau pusat daur ulang terdekat.",
    ],
    tips: [
      "Hindari membuang botol PET ke tempat sampah umum.",
      "Botol PET dapat dijual ke pengepul dengan harga Rp 3.000-5.000/kg.",
      "Satu botol PET yang didaur ulang menghemat energi untuk menyalakan lampu 3 jam.",
    ],
  },
  {
    itemName: "Sisa Makanan Organik",
    category: "Organik",
    carbonReduction: "0.3 kg CO₂",
    confidence: 89,
    description:
      "Limbah organik dari sisa makanan yang dapat dikomposkan menjadi pupuk alami berkualitas tinggi. Proses pengomposan mengurangi emisi metana dari tempat pembuangan akhir.",
    steps: [
      "Pisahkan sisa makanan dari kemasan plastik atau non-organik.",
      "Potong sisa makanan menjadi bagian kecil untuk mempercepat dekomposisi.",
      "Masukkan ke komposter atau lubang biopori di halaman.",
      "Campurkan dengan bahan kering (daun kering, serbuk gergaji) dengan rasio 1:1.",
      "Aduk kompos setiap 3-5 hari untuk aerasi yang baik.",
      "Kompos siap digunakan dalam 4-8 minggu sebagai pupuk tanaman.",
    ],
    tips: [
      "Hindari memasukkan daging atau produk susu ke komposter rumahan.",
      "Kompos yang baik memiliki bau tanah, bukan bau busuk.",
      "Gunakan kompos untuk kebun komunitas dan tingkatkan kesuburan tanah.",
    ],
  },
  {
    itemName: "Baterai Bekas AA",
    category: "B3 (Berbahaya)",
    carbonReduction: "0.8 kg CO₂",
    confidence: 97,
    description:
      "Baterai alkaline bekas mengandung bahan kimia berbahaya seperti merkuri, kadmium, dan timbal yang dapat mencemari tanah dan air jika dibuang sembarangan. Memerlukan penanganan khusus.",
    steps: [
      "JANGAN buang baterai ke tempat sampah rumah tangga biasa.",
      "Simpan baterai bekas di wadah tertutup yang aman dan kering.",
      "Tempelkan selotip pada kutub baterai untuk mencegah korsleting.",
      "Kumpulkan hingga jumlah memadai sebelum menyetor.",
      "Setor ke drop point limbah B3 di kantor kelurahan atau mall.",
      "Laporkan melalui aplikasi EcoTrace untuk pencatatan dampak lingkungan.",
    ],
    tips: [
      "Pertimbangkan beralih ke baterai isi ulang (rechargeable) untuk mengurangi limbah.",
      "Satu baterai yang bocor dapat mencemari 1 meter kubik tanah.",
      "Beberapa produsen elektronik menyediakan program take-back baterai bekas.",
    ],
  },
];

/* ─── Category Config ─── */
const categoryConfig: Record<WasteCategory, { color: string; bgColor: string; icon: typeof Recycle }> = {
  "Anorganik Daur Ulang": { color: "text-blue-400", bgColor: "bg-blue-500/15", icon: Recycle },
  Organik: { color: "text-emerald-400", bgColor: "bg-emerald-500/15", icon: Leaf },
  "B3 (Berbahaya)": { color: "text-red-400", bgColor: "bg-red-500/15", icon: AlertTriangle },
};

/* ─── Page States ─── */
type PageState = "idle" | "preview" | "analyzing" | "result";

export default function ScannerPage() {
  const [state, setState] = useState<PageState>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const name = file.name;
    setFileName(name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
      // Auto-detect waste type based on file name
      const lowerName = name.toLowerCase();
      let selectedResult: AnalysisResult | undefined;
      if (lowerName.includes("botol") || lowerName.includes("plastic")) {
        selectedResult = mockResults.find(r => r.category === "Anorganik Daur Ulang");
      } else if (lowerName.includes("makanan") || lowerName.includes("organic") || lowerName.includes("sisa") || lowerName.includes("food")) {
        selectedResult = mockResults.find(r => r.category === "Organik");
      } else if (lowerName.includes("baterai") || lowerName.includes("battery")) {
        selectedResult = mockResults.find(r => r.category === "B3 (Berbahaya)");
      }
      const resultToUse = selectedResult || mockResults[0];
      setState("result");
      setResult(resultToUse);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );



  const reset = useCallback(() => {
    setState("idle");
    setPreviewUrl(null);
    setFileName("");
    setResult(null);
  }, []);

  const config = result ? categoryConfig[result.category] : null;

  return (
    <div className="min-h-screen grid-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-medium text-emerald-400 mb-4">
            <Sparkles className="w-3 h-3" />
            Didukung Kecerdasan Buatan
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            AI Waste <span className="gradient-text">Scanner</span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Unggah foto sampah dan biarkan AI mengidentifikasi jenis, kategori, serta memberikan rekomendasi
            pengelolaan yang tepat.
          </p>
        </div>

        {/* ── IDLE: Upload Zone ── */}
        {state === "idle" && (
          <div className="animate-slide-up">
            <label
              htmlFor="file-upload"
              className={`drop-zone rounded-2xl glass p-12 sm:p-16 flex flex-col items-center justify-center cursor-pointer ${
                dragOver ? "drag-over" : ""
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Upload className="w-10 h-10 text-emerald-400" />
              </div>
              <p className="text-lg font-semibold text-slate-200 mb-2">
                Seret & lepas gambar di sini
              </p>
              <p className="text-sm text-slate-500 mb-6">atau klik untuk memilih file</p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors">
                <ImageIcon className="w-4 h-4" />
                Pilih Gambar
              </div>
              <p className="text-xs text-slate-600 mt-4">PNG, JPG, WEBP — Maks 10MB</p>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInputChange}
              />
            </label>
          </div>
        )}

        {/* ── ANALYZING: Loading State ── */}
        {state === "analyzing" && (
          <div className="animate-slide-up">
            <div className="rounded-2xl glass p-12 sm:p-16 flex flex-col items-center justify-center text-center">
              {/* Scanning animation */}
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-emerald-400 animate-spin-slow" />
                </div>
                {/* Scan line */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan-line" />
              </div>
              <p className="text-lg font-semibold text-slate-200 mb-2">
                AI sedang menganalisis komposisi sampah...
              </p>
              <p className="text-sm text-slate-500">
                Mengidentifikasi material, kategori, dan potensi daur ulang
              </p>
              {/* Progress dots */}
              <div className="flex gap-1.5 mt-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    style={{
                      animation: `pulse-glow 1.4s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── RESULT: Analysis Result Card ── */}
        {state === "result" && result && config && (
          <div className="animate-slide-up space-y-6">
            {/* Result Header */}
            <div className="rounded-2xl glass overflow-hidden">
              {/* Image + overlay */}
              {previewUrl && (
                <div className="relative h-48 sm:h-56 bg-slate-900/50 overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Analyzed"
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-400">Analisis Selesai</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{result.itemName}</h2>
                  </div>
                </div>
              )}

              {/* Info grid */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Category */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50">
                  <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                    <Tag className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Kategori</p>
                    <p className={`text-sm font-semibold ${config.color}`}>{result.category}</p>
                  </div>
                </div>

                {/* Carbon */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                    <Footprints className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Potensi Pengurangan</p>
                    <p className="text-sm font-semibold text-emerald-400">{result.carbonReduction}</p>
                  </div>
                </div>

                {/* Confidence */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Akurasi AI</p>
                    <p className="text-sm font-semibold text-amber-400">{result.confidence}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl glass p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-200">Deskripsi</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{result.description}</p>
            </div>

            {/* Steps */}
            <div className="rounded-2xl glass p-6">
              <div className="flex items-center gap-2 mb-5">
                <Recycle className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-200">Langkah Pengelolaan</h3>
              </div>
              <div className="space-y-3">
                {result.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                      <span className="text-xs font-bold text-emerald-400">{i + 1}</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="rounded-2xl glass p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-slate-200">Tips Tambahan</h3>
              </div>
              <div className="space-y-2">
                {result.tips.map((tip, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-400">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset */}
            <div className="text-center pt-4">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl glass text-emerald-400 font-semibold text-sm hover:bg-emerald-500/10 hover:scale-105 transition-all duration-300"
              >
                <RotateCcw className="w-4 h-4" />
                Scan Lagi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
