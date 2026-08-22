"use client";

import { useEffect, useState } from "react";
import {
  Recycle,
  Leaf,
  Users,
  TrendingDown,
  TrendingUp,
  MapPin,
  Clock,
  Award,
  Sparkles,
  BarChart3,
  Activity,
  ArrowUpRight,
} from "lucide-react";

/* ─── Animated Counter ─── */
function AnimatedCounter({ end, decimals = 0, duration = 2000 }: { end: number; decimals?: number; duration?: number }) {
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
        setCount(Number(start.toFixed(decimals)));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, decimals, duration]);
  return <span>{decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}</span>;
}

/* ─── Weekly Chart Data ─── */
const weeklyData = [
  { day: "Sen", organic: 120, inorganic: 85, b3: 15 },
  { day: "Sel", organic: 95, inorganic: 110, b3: 22 },
  { day: "Rab", organic: 140, inorganic: 75, b3: 10 },
  { day: "Kam", organic: 110, inorganic: 95, b3: 18 },
  { day: "Jum", organic: 160, inorganic: 120, b3: 25 },
  { day: "Sab", organic: 200, inorganic: 150, b3: 30 },
  { day: "Min", organic: 180, inorganic: 130, b3: 12 },
];

const maxTotal = Math.max(...weeklyData.map((d) => d.organic + d.inorganic + d.b3));

/* ─── Recent Reports Data ─── */
const reports = [
  {
    name: "Rina Sari",
    avatar: "RS",
    action: "melaporkan 5.2 kg plastik daur ulang",
    location: "Kecamatan Menteng",
    time: "2 menit lalu",
    type: "recycle" as const,
  },
  {
    name: "Budi Santoso",
    avatar: "BS",
    action: "menyelesaikan komposting 3 kg sisa makanan",
    location: "Kecamatan Kebayoran",
    time: "15 menit lalu",
    type: "compost" as const,
  },
  {
    name: "Dewi Lestari",
    avatar: "DL",
    action: "menyetor 8 baterai bekas ke drop point",
    location: "Kecamatan Tanah Abang",
    time: "32 menit lalu",
    type: "b3" as const,
  },
  {
    name: "Ahmad Hidayat",
    avatar: "AH",
    action: "mengumpulkan 12 kg kardus bekas",
    location: "Kecamatan Cempaka Putih",
    time: "1 jam lalu",
    type: "recycle" as const,
  },
  {
    name: "Siti Nurhaliza",
    avatar: "SN",
    action: "menyelesaikan challenge mingguan pengelolaan sampah",
    location: "Kecamatan Setiabudi",
    time: "2 jam lalu",
    type: "achievement" as const,
  },
  {
    name: "Fajar Pratama",
    avatar: "FP",
    action: "melaporkan 2.8 kg sampah organik untuk kompos",
    location: "Kecamatan Tebet",
    time: "3 jam lalu",
    type: "compost" as const,
  },
];

const reportTypeConfig = {
  recycle: { color: "text-blue-400", bg: "bg-blue-500/15", icon: Recycle },
  compost: { color: "text-emerald-400", bg: "bg-emerald-500/15", icon: Leaf },
  b3: { color: "text-red-400", bg: "bg-red-500/15", icon: TrendingDown },
  achievement: { color: "text-amber-400", bg: "bg-amber-500/15", icon: Award },
};

/* ─── Metric Cards Data ─── */
const metrics = [
  {
    label: "Total Sampah Terkelola",
    value: 12450,
    unit: "kg",
    change: "+12.5%",
    changeType: "up" as const,
    icon: Recycle,
    gradient: "from-emerald-500 to-teal-400",
    decimals: 0,
  },
  {
    label: "Karbon yang Dioffset",
    value: 8.5,
    unit: "ton CO₂",
    change: "+8.3%",
    changeType: "up" as const,
    icon: Leaf,
    gradient: "from-teal-400 to-blue-400",
    decimals: 1,
  },
  {
    label: "Anggota Komunitas Aktif",
    value: 3247,
    unit: "orang",
    change: "+156",
    changeType: "up" as const,
    icon: Users,
    gradient: "from-blue-400 to-emerald-400",
    decimals: 0,
  },
];

/* ─── Category Breakdown ─── */
const categories = [
  { label: "Organik", percentage: 45, color: "bg-emerald-500", textColor: "text-emerald-400" },
  { label: "Anorganik Daur Ulang", percentage: 38, color: "bg-blue-500", textColor: "text-blue-400" },
  { label: "B3 (Berbahaya)", percentage: 12, color: "bg-red-500", textColor: "text-red-400" },
  { label: "Residu", percentage: 5, color: "bg-slate-500", textColor: "text-slate-400" },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-medium text-emerald-400 mb-4">
            <Activity className="w-3 h-3" aria-label="Aktivitas real-time" />
            Pembaruan Real-time
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            Community <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-slate-400 max-w-lg">
            Pantau kontribusi komunitas secara real-time dan lihat dampak positif yang kita ciptakan bersama.
          </p>
        </div>

        {/* ═══════ METRICS GRID ═══════ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="card-glow rounded-2xl glass p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" aria-label={metric.label} />
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10">
                    <TrendingUp className="w-3 h-3 text-emerald-400" aria-label="Kenaikan" />
                    <span className="text-xs font-semibold text-emerald-400">{metric.change}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-100 mb-1">
                  {mounted ? (
                    <AnimatedCounter end={metric.value} decimals={metric.decimals} />
                  ) : (
                    "0"
                  )}
                  <span className="text-lg font-normal text-slate-500 ml-1.5">{metric.unit}</span>
                </div>
                <p className="text-sm text-slate-500">{metric.label}</p>
              </div>
            );
          })}
        </div>

        {/* ═══════ CHART + CATEGORY GRID ═══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Weekly Trends Chart */}
          <div className="lg:col-span-2 rounded-2xl glass p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  Tren Pengurangan Sampah Mingguan
                </h2>
                <p className="text-xs text-slate-500 mt-1">Volume sampah terkelola per hari (kg)</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                  <span className="text-slate-500">Organik</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                  <span className="text-slate-500">Anorganik</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-500" />
                  <span className="text-slate-500">B3</span>
                </span>
              </div>
            </div>

            {/* SVG Bar Chart */}
            <div className="relative h-64">
              <svg viewBox="0 0 700 250" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="40"
                    y1={20 + i * 50}
                    x2="680"
                    y2={20 + i * 50}
                    stroke="rgba(148,163,184,0.08)"
                    strokeDasharray="4 4"
                  />
                ))}
                {/* Y-axis labels */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <text
                    key={i}
                    x="32"
                    y={24 + i * 50}
                    textAnchor="end"
                    className="fill-slate-600 text-[10px]"
                  >
                    {Math.round(maxTotal - (maxTotal / 4) * i)}
                  </text>
                ))}

                {/* Bars */}
                {weeklyData.map((d, i) => {
                  const x = 60 + i * 90;
                  const barWidth = 50;
                  const totalHeight = 200;

                  const organicH = (d.organic / maxTotal) * totalHeight;
                  const inorganicH = (d.inorganic / maxTotal) * totalHeight;
                  const b3H = (d.b3 / maxTotal) * totalHeight;

                  const b3Y = 220 - b3H;
                  const inorganicY = b3Y - inorganicH;
                  const organicY = inorganicY - organicH;

                  return (
                    <g key={d.day}>
                      {/* B3 */}
                      <rect
                        x={x}
                        y={mounted ? b3Y : 220}
                        width={barWidth}
                        height={mounted ? b3H : 0}
                        fill="#ef4444"
                        rx="2"
                        className="chart-bar"
                        style={{ transition: "all 1s ease-out", transitionDelay: `${i * 100}ms` }}
                      />
                      {/* Inorganic */}
                      <rect
                        x={x}
                        y={mounted ? inorganicY : 220}
                        width={barWidth}
                        height={mounted ? inorganicH : 0}
                        fill="#3b82f6"
                        rx="0"
                        className="chart-bar"
                        style={{ transition: "all 1s ease-out", transitionDelay: `${i * 100 + 50}ms` }}
                      />
                      {/* Organic */}
                      <rect
                        x={x}
                        y={mounted ? organicY : 220}
                        width={barWidth}
                        height={mounted ? organicH : 0}
                        fill="#10b981"
                        rx="4"
                        className="chart-bar"
                        style={{ transition: "all 1s ease-out", transitionDelay: `${i * 100 + 100}ms` }}
                      />
                      {/* Day label */}
                      <text
                        x={x + barWidth / 2}
                        y="240"
                        textAnchor="middle"
                        className="fill-slate-500 text-[11px] font-medium"
                      >
                        {d.day}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="rounded-2xl glass p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Komposisi Sampah
            </h2>
            <div className="space-y-5">
              {categories.map((cat) => (
                <div key={cat.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">{cat.label}</span>
                    <span className={`text-sm font-semibold ${cat.textColor}`}>{cat.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800/50 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cat.color} transition-all duration-1000 ease-out`}
                      style={{ width: mounted ? `${cat.percentage}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 pt-5 border-t border-slate-800/50">
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-400">
                  Pengurangan sampah <span className="text-emerald-400 font-semibold">23%</span> dari bulan lalu
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ RECENT REPORTS FEED ═══════ */}
        <div className="rounded-2xl glass p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              Laporan Komunitas Terbaru
            </h2>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">Live</span>
            </div>
          </div>

          <div className="space-y-1">
            {reports.map((report, i) => {
              const typeConf = reportTypeConfig[report.type];
              const TypeIcon = typeConf.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-800/30 transition-colors group"
                >
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full ${typeConf.bg} flex items-center justify-center shrink-0`}>
                    <span className={`text-xs font-bold ${typeConf.color}`}>{report.avatar}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300">
                      <span className="font-semibold text-slate-100">{report.name}</span>{" "}
                      {report.action}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {report.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {report.time}
                      </span>
                    </div>
                  </div>

                  {/* Type icon */}
                  <div className={`w-8 h-8 rounded-lg ${typeConf.bg} flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <TypeIcon className={`w-4 h-4 ${typeConf.color}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* View all */}
          <div className="mt-4 pt-4 border-t border-slate-800/50 text-center">
            <button className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
              Lihat Semua Laporan
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
