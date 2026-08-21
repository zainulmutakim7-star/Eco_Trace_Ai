# EcoTrace AI — Platform Ekosistem Komunitas Berkelanjutan Berbasis AI 🌿🤖

**EcoTrace AI** adalah aplikasi web modern berbasis **Next.js (App Router)** dan **Tailwind CSS** yang dirancang untuk membantu masyarakat dan komunitas dalam pengelolaan sampah, pengurangan jejak karbon, serta pemetaan Bank Sampah secara cerdas dan terintegrasi.

---

## 🌟 Fitur Utama Platform

1. **AI Waste Scanner (`/scanner`)**
   - Menggunakan kecerdasan buatan visi komputer untuk memindai foto sampah.
   - Mengidentifikasi nama barang, kategori (Organik, Anorganik Daur Ulang, B3/Elektronik), estimasi reduksi karbon (kg CO₂), dan memberikan panduan daur ulang *step-by-step*.

2. **Kalkulator Jejak Karbon (`/calculator`)**
   - Hitung estimasi emisi karbon harian/bulanan dari sektor Transportasi, Listrik Rumah, Sampah, dan Pola Makan.
   - Dibandingkan secara visual dengan Rata-Rata Nasional Indonesia & Target Net-Zero.
   - Rekomendasi tindakan nyata berbasis AI dan tombol komitmen pengurangan emisi.

3. **Peta & Direktori Bank Sampah (`/map`)**
   - Direktori Bank Sampah & Drop Point Limbah B3 dengan pencarian kata kunci dan filter wilayah (Kecamatan) & kategori.
   - Daftar harga setoran per kilogram (Botol PET, Kardus, Kaleng, Minyak Jelantah).
   - Fitur **Jadwal Penjemputan Sampah** interaktif langsung ke mitra Bank Sampah.

4. **Komunitas & Tantangan Hijau (`/community`)**
   - Papan peringkat (*Leaderboard*) anggota & wilayah teraktif.
   - Tantangan lingkungan mingguan (*Eco-Challenges*) berhadiah EcoPoints.
   - Galeri lencana pencapaian (*Achievement Badges*).
   - Modal formulir **Lapor Kontribusi Sampah** mandiri.

5. **Dashboard Analitik Real-Time (`/dashboard`)**
   - Metrik utama: Total Sampah Terkelola (kg), Karbon Dioffset (ton CO₂), dan Anggota Komunitas Aktif.
   - Grafik tren harian/mingguan berbasis SVG stacked bar chart.
   - Feed aktivitas kontribusi warga secara *live*.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Emerald/Green dark mode aesthetic, glassmorphism)
- **Icons**: `lucide-react`
- **Charts**: Custom SVG Charting System

---

## 🚀 Cara Menjalankan Aplikasi

```bash
# 1. Pastikan Node.js sudah terinstal
npm install

# 2. Jalankan Server Pengembang
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada peramban Anda.

---

## 🏗️ Struktur Proyek

```
src/
├── app/
│   ├── layout.tsx           # Layout utama + Navbar + Footer
│   ├── page.tsx             # Landing Page (Hero, Stats, Features, Calculator, FAQ)
│   ├── globals.css          # Tema Tailwind v4 & Glassmorphism
│   ├── scanner/             # AI Waste Scanner Page
│   │   └── page.tsx
│   ├── calculator/          # Kalkulator Jejak Karbon Page
│   │   └── page.tsx
│   ├── map/                 # Peta & Direktori Bank Sampah Page
│   │   └── page.tsx
│   ├── community/           # Leaderboard & Tantangan Hijau Page
│   │   └── page.tsx
│   └── dashboard/           # Dashboard Analitik Page
│       └── page.tsx
└── components/
    ├── Navbar.tsx           # Sticky Nav + Lapor Sampah Trigger
    ├── Footer.tsx           # Footer Komprehensif
    └── ReportModal.tsx      # Modal Lapor Kontribusi Sampah
```

---

## 📄 Lisensi & Kredit

Dikembangkan untuk Kompetisi Web Development & Inovasi AI Berkelanjutan 2026.
Hak Cipta © 2026 EcoTrace AI.
