import { useState, useEffect } from "react";
import Badge from "../components/Badge";
import DetailHeader from "../components/DetailHeader";
import type { Investor } from "../types";

interface InvestorDetailProps {
  investor: Investor;
  onBack: () => void;
}

export default function InvestorDetail({ investor, onBack }: InvestorDetailProps) {
  const inv = investor;
  const [saved, setSaved] = useState<boolean>(() => {
    try { return JSON.parse(localStorage.getItem(`inv_saved_${investor.id}`) ?? "false") || false; } catch { return false; }
  });
  const [proposed, setProposed] = useState<boolean>(() => {
    try { return JSON.parse(localStorage.getItem(`inv_proposed_${investor.id}`) ?? "false") || false; } catch { return false; }
  });

  useEffect(() => { localStorage.setItem(`inv_saved_${investor.id}`, JSON.stringify(saved)); }, [saved, investor.id]);
  useEffect(() => { localStorage.setItem(`inv_proposed_${investor.id}`, JSON.stringify(proposed)); }, [proposed, investor.id]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-28 app-container">
      {/* ===== Sticky Header ===== */}
      <DetailHeader onBack={onBack} title="Профиль инвестора" />

      <div className="px-4 pt-6 flex flex-col gap-5">
        {/* ===== Profile Card ===== */}
        <section className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden animate-slide-up stagger-1">
          {/* Aurora blobs */}
          <div className="absolute w-40 h-40 rounded-full bg-indigo-500/10 blur-[60px] -top-10 -right-10 pointer-events-none" />
          <div className="absolute w-32 h-32 rounded-full bg-cyan-500/8 blur-[50px] -bottom-8 -left-8 pointer-events-none" />

          <div className="relative flex flex-col items-center text-center">
            {/* Avatar with gradient ring */}
            <div className="rounded-full p-[3px] bg-gradient-to-br from-indigo-500 to-cyan-500 mb-4">
              <img src={inv.avatar} alt={inv.name} loading="lazy" className="w-20 h-20 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>

            <div className="flex items-center gap-2">
              <h2 className="font-heading text-xl font-extrabold tracking-tight">{inv.name}</h2>
              {inv.verified && (
                <span className="text-amber-400 text-base" title="Верифицирован">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L14.09 4.26L17 3.29L17.27 6.32L20.16 7.48L19.12 10.35L21.41 12.54L19.53 14.97L20.54 17.87L17.65 18.59L16.86 21.54L13.86 20.93L12 23.14L10.14 20.93L7.14 21.54L6.35 18.59L3.46 17.87L4.47 14.97L2.59 12.54L4.88 10.35L3.84 7.48L6.73 6.32L7 3.29L9.91 4.26L12 2Z" />
                    <path d="M10 14.2L7.8 12L6.4 13.4L10 17L18 9L16.6 7.6L10 14.2Z" fill="#18181b" />
                  </svg>
                </span>
              )}
            </div>

            <p className="text-zinc-400 text-sm mt-1">{inv.title}</p>
            <p className="text-indigo-300 text-sm font-medium mt-0.5">{inv.fund}</p>
            <span className="text-zinc-500 text-xs flex items-center gap-1 mt-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              {inv.location}
            </span>
          </div>
        </section>

        {/* ===== Bio ===== */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 animate-slide-up stagger-2">
          <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">О себе</h3>
          <p className="text-zinc-300 text-sm leading-relaxed">{inv.bio}</p>
        </section>

        {/* ===== Metrics ===== */}
        <section className="grid grid-cols-3 gap-3 animate-slide-up stagger-2">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex flex-col items-center gap-1 text-center">
            <span className="text-white font-bold text-base font-heading">{inv.totalInvested}</span>
            <span className="text-zinc-400 text-xs">Вложено</span>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex flex-col items-center gap-1 text-center">
            <span className="text-white font-bold text-base font-heading">{inv.portfolio}</span>
            <span className="text-zinc-400 text-xs">Проектов</span>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex flex-col items-center gap-1 text-center">
            <span className="text-white font-bold text-base font-heading">{inv.ticketSize}</span>
            <span className="text-zinc-400 text-xs">Чек</span>
          </div>
        </section>

        {/* ===== Investment Focus ===== */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 animate-slide-up stagger-3">
          <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">Фокус инвестиций</h3>

          {/* Sectors */}
          <div className="mb-4">
            <span className="text-zinc-500 text-xs font-medium mb-2 block">Секторы</span>
            <div className="flex flex-wrap gap-2">
              {inv.sectors?.map((sector) => (
                <Badge key={sector} color="emerald">{sector}</Badge>
              ))}
            </div>
          </div>

          {/* Stages */}
          <div>
            <span className="text-zinc-500 text-xs font-medium mb-2 block">Стадии</span>
            <div className="flex flex-wrap gap-2">
              {inv.stages?.map((stage) => (
                <Badge key={stage} color="indigo">{stage}</Badge>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Portfolio ===== */}
        <section className="animate-slide-up stagger-4">
          <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">Портфолио</h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4" role="region" aria-label="Портфолио инвестора" tabIndex={0}>
            {inv.deals?.map((deal) => (
              <div
                key={deal}
                className="bg-white/5 rounded-2xl px-4 py-3 border border-white/10 flex-shrink-0 flex items-center gap-2 min-w-[120px]"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-sm select-none">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-300" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span className="text-white text-sm font-medium whitespace-nowrap">{deal}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Joined Info ===== */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 animate-slide-up stagger-5">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 text-sm">На платформе с</span>
            <span className="text-white text-sm font-semibold">{inv.joined}</span>
          </div>
        </section>
      </div>

      {/* ===== Fixed Bottom CTAs ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 app-container">
        <div className="flex gap-3">
          <button
            onClick={() => setProposed(true)}
            aria-pressed={proposed}
            className={`flex-1 py-4 rounded-2xl font-bold text-sm active:scale-[0.98] transition-all ${
              proposed
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-white text-zinc-900"
            }`}
          >
            {proposed ? "\u2713 Запрос отправлен" : "Предложить проект"}
          </button>
          <button
            onClick={() => setSaved(!saved)}
            aria-pressed={saved}
            className={`py-4 px-6 rounded-2xl font-bold text-sm active:scale-[0.98] transition-all ${
              saved
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                : "bg-white/5 backdrop-blur-sm border border-white/10 text-white"
            }`}
          >
            {saved ? "\u2605 Сохранено" : "В избранное"}
          </button>
        </div>
      </div>
    </div>
  );
}
