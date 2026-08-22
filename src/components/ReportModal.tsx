"use client";

import { useState } from "react";
import { X, Upload, CheckCircle2, Sparkles, AlertCircle, MapPin, Tag, Weight } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (reportData: any) => void;
}

export default function ReportModal({ isOpen, onClose, onSuccess }: ReportModalProps) {
  const [category, setCategory] = useState("Plastik Daur Ulang");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("Kecamatan Menteng");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess({
          category,
          weight: parseFloat(weight),
          location,
          notes,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        });
      }
    }, 1500);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setWeight("");
    setNotes("");
    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl glass p-6 sm:p-8 border border-emerald-500/20 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100">Laporan Berhasil Terkirim!</h3>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              Terima kasih atas kontribusimu! Poin komunitas & jejak karbonmu telah diperbarui.
            </p>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-left text-xs space-y-1">
              <p className="text-emerald-300 font-semibold">Ringkasan Laporan:</p>
              <p className="text-slate-300">
                • {category} — <span className="font-bold text-emerald-400">{weight} kg</span>
              </p>
              <p className="text-slate-300">• Lokasi: {location}</p>
              <p className="text-slate-300">
                • Potensi Reduksi Karbon: <span className="text-emerald-400 font-bold">{(parseFloat(weight || "0") * 0.45).toFixed(2)} kg CO₂e</span>
              </p>
            </div>
            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Tutup & Lihat Dampak
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Lapor Kontribusi Sampah</h3>
                <p className="text-xs text-slate-400">Catat kontribusi harianmu untuk komunitas</p>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                Kategori Sampah
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="Plastik Daur Ulang">Plastik Daur Ulang (PET/HDPE)</option>
                <option value="Sampah Organik / Sisa Makanan">Sampah Organik / Sisa Makanan</option>
                <option value="Kertas & Kardus">Kertas & Kardus</option>
                <option value="Limbah B3 & Elektronik">Limbah B3 & Elektronik</option>
                <option value="Kaca & Logam">Kaca & Logam</option>
              </select>
            </div>

            {/* Weight & Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Weight className="w-3.5 h-3.5 text-emerald-400" />
                  Berat (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  required
                  placeholder="Contoh: 3.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Lokasi / Kecamatan
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="Kecamatan Menteng">Menteng</option>
                  <option value="Kecamatan Kebayoran Baru">Kebayoran Baru</option>
                  <option value="Kecamatan Tanah Abang">Tanah Abang</option>
                  <option value="Kecamatan Setiabudi">Setiabudi</option>
                  <option value="Kecamatan Tebet">Tebet</option>
                  <option value="Kecamatan Cempaka Putih">Cempaka Putih</option>
                </select>
              </div>
            </div>

            {/* Upload simulation */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Foto Bukti (Opsional)
              </label>
              <div className="border border-dashed border-slate-700/80 rounded-xl p-4 text-center hover:border-emerald-500/50 transition-colors cursor-pointer bg-slate-900/40">
                <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <span className="text-xs text-slate-400">
                  {file ? file.name : "Klik atau seret foto sampah di sini"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="report-file"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Catatan Tambahan</label>
              <textarea
                rows={2}
                placeholder="Catatan mengenai kondisi sampah atau bank sampah tujuan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={resetAndClose}
                className="flex-1 py-2.5 rounded-xl glass text-slate-400 font-semibold text-sm hover:text-slate-200 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
