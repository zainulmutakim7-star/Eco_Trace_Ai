"use client";

import { useState } from "react";
import {
  MapPin,
  Search,
  Clock,
  Phone,
  Recycle,
  Tag,
  Calendar,
  Sparkles,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

interface WasteBank {
  id: string;
  name: string;
  category: "Plastik & Anorganik" | "Organik & Kompos" | "B3 & Elektronik" | "Serba Ada";
  district: string;
  address: string;
  distance: string;
  hours: string;
  isOpen: boolean;
  phone: string;
  priceList: { item: string; price: string }[];
  rating: number;
}

const mockWasteBanks: WasteBank[] = [
  {
    id: "wb-1",
    name: "Bank Sampah Berkah Menteng",
    category: "Serba Ada",
    district: "Menteng",
    address: "Jl. Pegangsaan Timur No. 12, Menteng, Jakarta Pusat",
    distance: "1.2 km",
    hours: "Senin - Sabtu (08:00 - 16:00)",
    isOpen: true,
    phone: "+62 812-3456-7890",
    rating: 4.9,
    priceList: [
      { item: "Botol Plastik PET", price: "Rp 4.500 / kg" },
      { item: "Kardus & Kertas", price: "Rp 2.200 / kg" },
      { item: "Kaleng Alumunium", price: "Rp 14.000 / kg" },
      { item: "Minyak Jelantah", price: "Rp 6.000 / liter" },
    ],
  },
  {
    id: "wb-2",
    name: "EcoHub Kompos Mandiri Kebayoran",
    category: "Organik & Kompos",
    district: "Kebayoran Baru",
    address: "Jl. Gandaria I No. 45, Kebayoran Baru, Jakarta Selatan",
    distance: "2.8 km",
    hours: "Setiap Hari (07:00 - 17:00)",
    isOpen: true,
    phone: "+62 813-9876-5432",
    rating: 4.8,
    priceList: [
      { item: "Sisa Makanan Sayur/Buah", price: "Rp 1.000 / kg (Kredit Kompos)" },
      { item: "Ampas Kopi / Teh", price: "Rp 1.500 / kg" },
      { item: "Daun Kering Kebun", price: "Rp 800 / kg" },
    ],
  },
  {
    id: "wb-3",
    name: "Drop Point Limbah B3 Kelurahan Tanah Abang",
    category: "B3 & Elektronik",
    district: "Tanah Abang",
    address: "Kantor Kelurahan Kebon Kacang, Tanah Abang, Jakarta Pusat",
    distance: "3.5 km",
    hours: "Senin - Jumat (08:00 - 15:00)",
    isOpen: true,
    phone: "+62 821-1122-3344",
    rating: 4.7,
    priceList: [
      { item: "Baterai Bekas AA/AAA", price: "Free Disposal (Poin Komunitas)" },
      { item: "Lampu TL / Neon", price: "Free Disposal" },
      { item: "E-Waste / HP Rusak", price: "Kompensasi Rp 10.000 - Rp 50.000" },
    ],
  },
  {
    id: "wb-4",
    name: "Bank Sampah Hijau Tebet",
    category: "Plastik & Anorganik",
    district: "Tebet",
    address: "Jl. Tebet Barat Dalam No. 8, Tebet, Jakarta Selatan",
    distance: "4.1 km",
    hours: "Selasa - Minggu (08:30 - 16:30)",
    isOpen: true,
    phone: "+62 857-7788-9900",
    rating: 4.9,
    priceList: [
      { item: "Plastik Gelas (PP)", price: "Rp 3.800 / kg" },
      { item: "Buku / Majalah Bekas", price: "Rp 2.000 / kg" },
      { item: "Besi Scraps", price: "Rp 5.500 / kg" },
    ],
  },
  {
    id: "wb-5",
    name: "EcoCenter Setiabudi Zero Waste",
    category: "Serba Ada",
    district: "Setiabudi",
    address: "Jl. H.R. Rasuna Said Blok X5, Setiabudi, Jakarta Selatan",
    distance: "5.0 km",
    hours: "Senin - Sabtu (09:00 - 17:00)",
    isOpen: true,
    phone: "+62 819-4455-6677",
    rating: 4.8,
    priceList: [
      { item: "Plastik HDPE (Botol Shampo)", price: "Rp 4.000 / kg" },
      { item: "Minyak Goreng Bekas", price: "Rp 7.000 / liter" },
      { item: "Kertas Dupleks", price: "Rp 1.800 / kg" },
    ],
  },
];

export default function WasteMapPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedDistrict, setSelectedDistrict] = useState("Semua");

  // Modal pickup state
  const [selectedBankForPickup, setSelectedBankForPickup] = useState<WasteBank | null>(null);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupWeight, setPickupWeight] = useState("");
  const [pickupSuccess, setPickupSuccess] = useState(false);

  const categories = ["Semua", "Serba Ada", "Plastik & Anorganik", "Organik & Kompos", "B3 & Elektronik"];
  const districts = ["Semua", "Menteng", "Kebayoran Baru", "Tanah Abang", "Tebet", "Setiabudi"];

  const filteredBanks = mockWasteBanks.filter((bank) => {
    const matchesSearch =
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.priceList.some((p) => p.item.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "Semua" || bank.category === selectedCategory;
    const matchesDistrict = selectedDistrict === "Semua" || bank.district === selectedDistrict;

    return matchesSearch && matchesCategory && matchesDistrict;
  });

  const handleSchedulePickup = (e: React.FormEvent) => {
    e.preventDefault();
    setPickupSuccess(true);
    setTimeout(() => {
      setPickupSuccess(false);
      setSelectedBankForPickup(null);
      setPickupDate("");
      setPickupWeight("");
    }, 2500);
  };

  return (
    <div className="min-h-screen grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-medium text-emerald-400 mb-4">
            <MapPin className="w-3 h-3" />
            Peta & Direktori Terverifikasi
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            Bank Sampah & <span className="gradient-text">Drop Point B3</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Temukan lokasi Bank Sampah terdekat, lihat daftar harga setoran per kilogram, dan jadwalkan penjemputan sampah daur ulang secara langsung.
          </p>
        </div>

        {/* ═══════ SEARCH & FILTERS ═══════ */}
        <div className="rounded-2xl glass p-6 mb-10 border border-emerald-500/20 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama bank sampah, plastik PET, kardus, minyak jelantah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* District Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    Kecamatan: {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    Kategori: {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ═══════ DIRECTORY GRID ═══════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBanks.map((bank) => (
            <div
              key={bank.id}
              className="card-glow rounded-2xl glass p-6 border border-emerald-500/15 flex flex-col justify-between"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                    {bank.category}
                  </span>
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    ★ {bank.rating} • <span className="text-emerald-400">{bank.distance}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 mb-2">{bank.name}</h3>

                <p className="text-xs text-slate-400 flex items-start gap-1.5 mb-3 leading-relaxed">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  {bank.address}
                </p>

                <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  {bank.hours}
                </p>

                {/* Price List Table */}
                <div className="rounded-xl bg-slate-900/60 p-3 mb-4 space-y-1.5 border border-slate-800/80">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Estimasi Harga Setoran:
                  </div>
                  {bank.priceList.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-slate-300">• {item.item}</span>
                      <span className="font-semibold text-emerald-400">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <a
                  href={`https://wa.me/${bank.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl glass text-emerald-400 font-semibold text-xs text-center flex items-center justify-center gap-1.5 hover:bg-emerald-500/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Hubungi WA
                </a>
                <button
                  onClick={() => setSelectedBankForPickup(bank)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Jadwal Jemput
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBanks.length === 0 && (
          <div className="text-center py-16 rounded-2xl glass border border-slate-800">
            <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-200 mb-1">Tidak ada Bank Sampah ditemukan</h3>
            <p className="text-sm text-slate-400">Coba ubah kata kunci pencarian atau pilih kecamatan lain.</p>
          </div>
        )}

        {/* ═══════ PICKUP SCHEDULER MODAL ═══════ */}
        {selectedBankForPickup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-md rounded-2xl glass p-6 border border-emerald-500/20 shadow-2xl">
              <button
                onClick={() => setSelectedBankForPickup(null)}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              {pickupSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="text-xl font-bold text-slate-100">Penjemputan Dijadwalkan!</h3>
                  <p className="text-xs text-slate-400">
                    Tim dari <span className="text-emerald-400 font-semibold">{selectedBankForPickup.name}</span> akan mengonfirmasi penjemputan via WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSchedulePickup} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 mb-1">Jadwal Penjemputan Sampah</h3>
                    <p className="text-xs text-slate-400">Mitra: {selectedBankForPickup.name}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Tanggal Penjemputan</label>
                    <input
                      type="date"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Estimasi Berat total (kg)</label>
                    <input
                      type="number"
                      required
                      placeholder="Minimal 5 kg untuk opsi jemput gratis"
                      value={pickupWeight}
                      onChange={(e) => setPickupWeight(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 text-[11px] text-emerald-300">
                    💡 Penjemputan gratis untuk akumulasi sampah diatas 5 kg di area Kecamatan {selectedBankForPickup.district}.
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-sm shadow-md"
                  >
                    Konfirmasi Penjemputan
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
