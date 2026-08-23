"use client";

export default function CompetitionLogos() {
  return (
    <div className="mt-5 space-y-3">
      <p className="text-xs text-slate-600 uppercase tracking-wider font-medium">
        Part of Jack 2026 Competition
      </p>
      <div className="flex items-center gap-5">
        {/* Official UKM Triple-C / TCC Logo */}
        <img
          src="/assets/competition/ukm-triple-c-logo.png"
          alt="Official UKM Triple-C / TCC Logo - Universitas Trunojoyo Madura Creative Computer Club"
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain flex-shrink-0"
        />
        {/* Official Jack 2026 Logo */}
        <img
          src="/assets/competition/jack-2026-logo.png"
          alt="Official Jack 2026 Logo"
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain flex-shrink-0"
        />
      </div>
    </div>
  );
}
