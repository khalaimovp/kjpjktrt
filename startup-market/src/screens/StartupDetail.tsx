import Badge from "../components/Badge";
import DetailHeader from "../components/DetailHeader";
import type { Startup } from "../types";

/* ---------- helpers ---------- */
const parseAmount = (str: string) => {
  if (!str) return 0;
  const cleaned = str.replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  if (str.includes("M")) return num * 1_000_000;
  if (str.includes("K")) return num * 1_000;
  return num;
};

interface StartupDetailProps {
  startup: Startup;
  onBack: () => void;
  onContact: (startup: Startup) => void;
}

export default function StartupDetail({ startup, onBack, onContact }: StartupDetailProps) {
  const s = startup;

  const metricItems = [
    { label: "MRR", value: s.metrics?.mrr, sub: s.metrics?.growth },
    { label: "Пользователи", value: s.metrics?.users, sub: null },
    { label: "Retention", value: s.metrics?.retention, sub: null },
    { label: "Оценка", value: s.valuation, sub: null },
  ].filter((m) => m.value);

  const raisedAmount = parseAmount(s.raised);
  const raiseGoal = parseAmount(s.raise);
  const progressPct = raiseGoal > 0 ? Math.min((raisedAmount / raiseGoal) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-28 app-container">
      {/* ===== Sticky Header ===== */}
      <DetailHeader onBack={onBack} title={s.name} rightSlot={<Badge color="indigo">{s.stage}</Badge>} />

      {/* ===== Hero Banner ===== */}
      <div className="h-48 -mx-4 -mt-4 mb-4 overflow-hidden rounded-b-3xl">
        <img src={s.hero} alt="" aria-hidden="true" loading="eager" fetchPriority="high" className="w-full h-full object-cover opacity-60" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      </div>

      <div className="px-4 pt-4 flex flex-col gap-5">
        {/* ===== Hero Card ===== */}
        <section className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 overflow-hidden animate-slide-up stagger-1">
          {/* Aurora blobs */}
          <div className="absolute w-40 h-40 rounded-full bg-indigo-500/10 blur-[60px] -top-10 -right-10 pointer-events-none" />
          <div className="absolute w-32 h-32 rounded-full bg-cyan-500/8 blur-[50px] -bottom-8 -left-8 pointer-events-none" />

          <div className="relative flex items-start gap-4">
            <img src={s.logo} alt={s.name} loading="lazy" className="w-16 h-16 rounded-2xl object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div className="flex-1 min-w-0">
              <h2 className="font-heading text-xl font-extrabold tracking-tight">{s.name}</h2>
              <p className="text-zinc-400 text-sm mt-0.5">{s.tagline}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                <Badge color="cyan">{s.sector}</Badge>
                <span className="text-zinc-500 text-xs flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  {s.location}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Description ===== */}
        <section className="animate-slide-up stagger-2">
          <p className="text-zinc-300 text-sm leading-relaxed">{s.description}</p>
        </section>

        {/* ===== Key Metrics ===== */}
        <section className="animate-slide-up stagger-2">
          <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Ключевые метрики
          </h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4" role="region" aria-label="Ключевые метрики" tabIndex={0}>
            {metricItems.map((m) => (
              <div
                key={m.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 min-w-[140px] flex-shrink-0 flex flex-col gap-1"
              >
                <span className="text-zinc-400 text-xs font-medium">{m.label}</span>
                <span className="text-white font-bold text-base font-heading">{m.value}</span>
                {m.sub && <span className="text-emerald-400 text-xs font-medium">{m.sub}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* ===== Investment Terms ===== */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 animate-slide-up stagger-3">
          <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Условия инвестирования
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">Раунд</span>
              <span className="text-white text-sm font-semibold">{s.stage}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">Доля</span>
              <span className="text-white text-sm font-semibold">{s.equity}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">Мин. инвестиция</span>
              <span className="text-emerald-400 text-sm font-semibold">{s.minInvestment}</span>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">Привлечено</span>
              <span className="text-white text-sm font-semibold">{s.raised} / {s.raise}</span>
            </div>

            {/* Progress bar */}
            <div
              className="w-full h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden"
              role="progressbar"
              aria-valuenow={Math.round(progressPct)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Привлечено ${s.raised} из ${s.raise}`}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-zinc-500 text-xs text-right">{Math.round(progressPct)}% от цели</span>
          </div>
        </section>

        {/* ===== Tags ===== */}
        <section className="animate-slide-up stagger-3">
          <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">Теги</h3>
          <div className="flex flex-wrap gap-2">
            {s.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* ===== Materials ===== */}
        <section className="animate-slide-up stagger-4">
          <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">Материалы</h3>
          <div className="flex gap-3">
            {s.deck && (
              <button type="button" className="flex-1 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border border-indigo-500/20 rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-[0.98] transition-transform" aria-label="Скачать Pitch Deck">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-lg" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-300" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <span className="text-white text-xs font-semibold">Pitch Deck</span>
                <span className="text-zinc-400 text-xs">PDF</span>
              </button>
            )}
            {s.video && (
              <button type="button" className="flex-1 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-[0.98] transition-transform" aria-label="Смотреть видео-питч">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-lg" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-300" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="text-white text-xs font-semibold">Видео-питч</span>
                <span className="text-zinc-400 text-xs">3 мин</span>
              </button>
            )}
          </div>
        </section>

        {/* ===== Founder ===== */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 animate-slide-up stagger-5">
          <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">Основатель</h3>
          <div className="flex items-center gap-3">
            <img src={s.logo} alt={s.name} loading="lazy" className="w-12 h-12 rounded-2xl object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{s.founderName}</p>
              <p className="text-zinc-400 text-xs">Команда: {s.team} чел.</p>
            </div>
          </div>
        </section>

        {/* ===== Stats ===== */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 animate-slide-up stagger-6">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center gap-1">
              <span className="text-white font-bold text-lg font-heading">{s.views?.toLocaleString()}</span>
              <span className="text-zinc-400 text-xs">Просмотров</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-white font-bold text-lg font-heading">{s.savedBy}</span>
              <span className="text-zinc-400 text-xs">В избранном</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-white font-bold text-lg font-heading">{s.founded}</span>
              <span className="text-zinc-400 text-xs">Основан</span>
            </div>
          </div>
        </section>
      </div>

      {/* ===== Fixed Bottom CTA ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 app-container">
        <button
          onClick={() => onContact(startup)}
          className="w-full py-4 rounded-2xl bg-white text-zinc-900 font-bold text-sm active:scale-[0.98] transition-transform"
        >
          Запросить контакт основателя
        </button>
      </div>
    </div>
  );
}
