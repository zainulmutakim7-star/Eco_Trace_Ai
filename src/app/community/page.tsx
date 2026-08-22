"use client";

import { useState } from "react";
import {
  Trophy,
  Award,
  Users,
  Sparkles,
  CheckCircle2,
  Flame,
  Target,
  Leaf,
  Recycle,
  PlusCircle,
  ShieldCheck,
  Star,
  ChevronRight,
} from "lucide-react";
import ReportModal from "@/components/ReportModal";

/* ─── Mock Leaderboard Data ─── */
const topMembers = [
  { rank: 1, name: "Rina Sari", location: "Menteng", points: 1450, weightKg: 182, co2Saved: 81.9, avatar: "RS", title: "Zero Waste Hero 🥇" },
  { rank: 2, name: "Budi Santoso", location: "Kebayoran Baru", points: 1280, weightKg: 154, co2Saved: 69.3, avatar: "BS", title: "Compost Master 🥈" },
  { rank: 3, name: "Dewi Lestari", location: "Tanah Abang", points: 1120, weightKg: 138, co2Saved: 62.1, avatar: "DL", title: "Carbon Pioneer 🥉" },
  { rank: 4, name: "Ahmad Hidayat", location: "Cempaka Putih", points: 980, weightKg: 115, co2Saved: 51.7, avatar: "AH", title: "Eco Ambassador" },
  { rank: 5, name: "Siti Nurhaliza", location: "Setiabudi", points: 890, weightKg: 98, co2Saved: 44.1, avatar: "SN", title: "Recycle Warrior" },
];

const topDistricts = [
  { rank: 1, name: "Kecamatan Menteng", totalMembers: 840, totalKg: 4250, co2Tons: 1.9 },
  { rank: 2, name: "Kecamatan Kebayoran Baru", totalMembers: 710, totalKg: 3680, co2Tons: 1.6 },
  { rank: 3, name: "Kecamatan Tebet", totalMembers: 650, totalKg: 3120, co2Tons: 1.4 },
  { rank: 4, name: "Kecamatan Tanah Abang", totalMembers: 590, totalKg: 2840, co2Tons: 1.2 },
];

/* ─── Mock Challenges ─── */
const initialChallenges = [
  {
    id: "ch-1",
    title: "Tantangan 7 Hari Bebas Plastik Sekali Pakai",
    description: "Gunakan tumbler & kantong belanja kain selama 7 hari berturut-turut.",
    reward: "+250 EcoPoints",
    participants: 412,
    daysLeft: 3,
    progress: 80,
    joined: false,
    category: "Gaya Hidup",
  },
  {
    id: "ch-2",
    title: "Komposter Rumah 5 kg Makanan",
    description: "Olah sisa makanan dapur menjadi kompos organik seberat minimal 5 kg.",
    reward: "+300 EcoPoints",
    participants: 289,
    daysLeft: 8,
    progress: 45,
    joined: true,
    category: "Organik",
  },
  {
    id: "ch-3",
    title: "Penyetoran Limbah B3 & Baterai Bekas",
    description: "Kumpulkan minimal 5 baterai / e-waste ke Drop Point B3 terdekat.",
    reward: "+200 EcoPoints",
    participants: 195,
    daysLeft: 12,
    progress: 20,
    joined: false,
    category: "B3",
  },
];

/* ─── Badges Showcase ─── */
const badges = [
  { title: "Zero Waste Hero", desc: "Kelola 100kg+ sampah", icon: Trophy, unlocked: true, color: "text-amber-400 bg-amber-500/15" },
  { title: "Compost Master", desc: "Komposting 25kg organik", icon: Leaf, unlocked: true, color: "text-emerald-400 bg-emerald-500/15" },
  { title: "Carbon Shield", desc: "Kurangi 50kg CO₂e", icon: ShieldCheck, unlocked: true, color: "text-blue-400 bg-blue-500/15" },
  { title: "Eco Pioneer", desc: "Lapor 10 kali kontribusi", icon: Star, unlocked: false, color: "text-purple-400 bg-purple-500/15" },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"members" | "districts">("members");
  const [challenges, setChallenges] = useState(initialChallenges);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const toggleJoinChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, joined: !c.joined, participants: c.joined ? c.participants - 1 : c.participants + 1 } : c))
    );
  };

  return (
    <div className="min-h-screen grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-medium text-emerald-400 mb-4">
            <Trophy className="w-3 h-3" />
            Papan Peringkat & Aksi Kolektif
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
            Komunitas & <span className="gradient-text">Tantangan Hijau</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Bergabunglah dalam tantangan mingguan, kumpulkan EcoPoints, naikkan posisi di leaderboard, dan jadilah penggerak keberlanjutan.
          </p>
        </div>

        {/* ═══════ LEADERBOARD & BADGES (TOP SECTION) ═══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Leaderboard Table */}
          <div className="lg:col-span-8 rounded-2xl glass p-6 border border-emerald-500/20">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  Papan Peringkat Komunitas
                </h2>
                <p className="text-xs text-slate-400">Peringkat kontribusi berdasarkan EcoPoints & CO₂ Offset</p>
              </div>

              {/* Tab Switcher */}
              <div className="flex p-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab("members")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    activeTab === "members" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Anggota Teratas
                </button>
                <button
                  onClick={() => setActiveTab("districts")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    activeTab === "districts" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Wilayah / Kecamatan
                </button>
              </div>
            </div>

            {activeTab === "members" ? (
              <div className="space-y-3">
                {topMembers.map((member) => (
                  <div
                    key={member.rank}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      member.rank === 1
                        ? "bg-amber-500/10 border-amber-500/30"
                        : member.rank === 2
                        ? "bg-slate-300/10 border-slate-400/30"
                        : member.rank === 3
                        ? "bg-amber-700/10 border-amber-700/30"
                        : "bg-slate-900/50 border-slate-800/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center bg-slate-800 text-slate-300">
                        #{member.rank}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                          {member.name}
                          <span className="text-[10px] font-normal text-amber-400">{member.title}</span>
                        </div>
                        <div className="text-xs text-slate-500">{member.location} • {member.weightKg} kg sampah</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">{member.points} pts</div>
                      <div className="text-[11px] text-slate-400">-{member.co2Saved} kg CO₂e</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {topDistricts.map((district) => (
                  <div
                    key={district.rank}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center bg-emerald-500/20 text-emerald-400">
                        #{district.rank}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-100">{district.name}</div>
                        <div className="text-xs text-slate-500">{district.totalMembers} Anggota Aktif</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">{district.totalKg.toLocaleString()} kg</div>
                      <div className="text-[11px] text-slate-400">{district.co2Tons} ton CO₂ offset</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Badges Showcase (Right) */}
          <div className="lg:col-span-4 rounded-2xl glass p-6 border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-slate-100">Lencana Pencapaian</h3>
              </div>
              <p className="text-xs text-slate-400 mb-5">Kumpulkan lencana prestisius melalui kontribusi aktifmu.</p>

              <div className="grid grid-cols-2 gap-3">
                {badges.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={i}
                      className={`p-3.5 rounded-xl border text-center relative overflow-hidden transition-all ${
                        b.unlocked ? "bg-slate-900/80 border-emerald-500/30" : "bg-slate-950/40 border-slate-800/60 opacity-60"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl ${b.color} flex items-center justify-center mx-auto mb-2`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-200">{b.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-1">{b.desc}</p>

                      {b.unlocked && (
                        <div className="mt-2 text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 py-0.5 rounded-full">
                          Terbuka
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Lapor Sampah & Tambah Poin
              </button>
            </div>
          </div>
        </div>

        {/* ═══════ ECO-CHALLENGES SECTION ═══════ */}
        <div className="rounded-2xl glass p-6 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                Tantangan Komunitas Aktif
              </h2>
              <p className="text-xs text-slate-400">Ikuti tantangan mingguan untuk klaim EcoPoints & lencana eksklusif</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((ch) => (
              <div
                key={ch.id}
                className="rounded-xl bg-slate-900/60 p-5 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                      {ch.category}
                    </span>
                    <span className="text-amber-400 font-bold text-xs">{ch.reward}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 mb-2 leading-snug">{ch.title}</h3>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">{ch.description}</p>

                  <div className="space-y-2 mb-4 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Progres Komunitas</span>
                      <span className="font-bold text-emerald-400">{ch.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${ch.progress}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                      <span>{ch.participants} Peserta</span>
                      <span>Sisa {ch.daysLeft} Hari</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleJoinChallenge(ch.id)}
                  className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${
                    ch.joined
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center gap-1.5"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {ch.joined ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Sedang Diikuti
                    </>
                  ) : (
                    "Ikuti Tantangan Ini"
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
    </div>
  );
}
