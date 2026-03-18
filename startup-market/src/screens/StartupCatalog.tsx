import { useState, useEffect, useMemo, memo } from "react";
import Badge from "../components/Badge";
import { SearchIcon, FilterIcon, EyeIcon, BookmarkIcon, WalletIcon, EmptySearchIcon } from "../components/Icons";
import type { Startup } from "../types";

/* ------------------------------------------------------------------ */
/*  StartupCard                                                       */
/* ------------------------------------------------------------------ */

interface StartupCardProps {
  startup: Startup;
  onClick: (startup: Startup) => void;
  index?: number;
  featured?: boolean;
}

const StartupCard = memo(function StartupCard({ startup, onClick, index = 0, featured = false }: StartupCardProps) {
  const staggerClass = index < 6 ? `stagger-${index + 1}` : "";

  return (
    <div
      onClick={() => onClick(startup)}
      className={`${featured ? "w-72 flex-shrink-0 snap-start" : ""} bg-white/[0.06] border border-white/10 rounded-3xl ${featured ? "p-5" : "p-4"} hover:bg-white/[0.08] hover:border-white/15 transition-all cursor-pointer active:scale-[0.98] animate-fade-slide ${staggerClass}`}
      role="button"
      tabIndex={0}
      aria-label={`Открыть ${startup.name} — ${startup.tagline}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(startup);
        }
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <img src={startup.logo} alt={startup.name} loading="lazy" className={`${featured ? "w-14 h-14" : "w-12 h-12"} rounded-2xl object-cover`} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`text-white font-bold font-heading ${featured ? "text-base" : "text-sm"}`}>
              {startup.name}
            </h3>
            <Badge color="indigo">{startup.stage}</Badge>
          </div>
          <p className="text-zinc-400 text-xs mt-0.5 truncate">
            {startup.tagline}
          </p>
        </div>
      </div>

      {/* Sector */}
      <div className="mb-3">
        <span className="inline-flex items-center bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full px-2 py-0.5 text-xs font-medium">
          {startup.sector}
        </span>
      </div>

      {/* Description snippet (featured only) */}
      {featured && startup.description && (
        <p className="text-zinc-400 text-xs line-clamp-2 mb-3 leading-relaxed">
          {startup.description}
        </p>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-white/[0.03] rounded-xl p-2 text-center">
          <div className="text-white font-bold text-sm font-heading">
            {startup.raise}
          </div>
          <div className="text-zinc-400 text-xs">Раунд</div>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2 text-center">
          <div className="text-emerald-400 font-bold text-sm font-heading">
            <span aria-hidden="true">&#8593;</span>{startup.metrics.growth}
          </div>
          <div className="text-zinc-400 text-xs">Рост MRR</div>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2 text-center">
          <div className="text-white font-bold text-sm font-heading">
            {startup.equity}
          </div>
          <div className="text-zinc-400 text-xs">Доля</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-zinc-500 text-xs">
        <span className="flex items-center gap-1">
          <EyeIcon />
          {startup.views.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <BookmarkIcon />
          {startup.savedBy}
        </span>
        <span className="flex items-center gap-1">
          <WalletIcon />
          min {startup.minInvestment}
        </span>
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/*  StartupCatalog                                                    */
/* ------------------------------------------------------------------ */

interface StartupCatalogProps {
  startups: Startup[];
  sectors: string[];
  stages: string[];
  onStartupClick: (startup: Startup) => void;
}

export default function StartupCatalog({
  startups,
  sectors,
  stages,
  onStartupClick,
}: StartupCatalogProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("Все");
  const [stageFilter, setStageFilter] = useState("Все");
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch]);

  // Filter startups internally
  const filteredStartups = useMemo(() => startups.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.sector.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q));
    const matchSector = sectorFilter === "Все" || s.sector === sectorFilter || s.tags.includes(sectorFilter);
    const matchStage = stageFilter === "Все" || s.stage === stageFilter;
    return matchSearch && matchSector && matchStage;
  }), [startups, search, sectorFilter, stageFilter]);

  const featured = filteredStartups.length > 0 ? filteredStartups[0] : null;
  const rest = filteredStartups.length > 1 ? filteredStartups.slice(1) : [];

  return (
    <div className="pb-24">
      {/* -------- Search + Filter Toggle -------- */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          {/* Search bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Поиск по имени, сектору, тегу..."
              className="w-full bg-white/5 border-0 rounded-2xl py-3 pl-10 pr-4 text-white text-sm placeholder-zinc-500 outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
              aria-label="Поиск стартапов"
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${
              showFilters
                ? "bg-indigo-500/20 border border-indigo-500/40 text-indigo-300"
                : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
            }`}
            aria-label="Показать фильтры"
            aria-expanded={showFilters}
            aria-controls="filters-panel"
          >
            <FilterIcon />
          </button>
        </div>
      </div>

      {/* -------- Filters Panel -------- */}
      {showFilters && (
        <div id="filters-panel" className="px-4 pb-3 animate-fade-slide">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 space-y-4">
            {/* Sectors */}
            <div>
              <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
                Сектор
              </p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {sectors.map((sector) => {
                  const isActive =
                    sectorFilter === sector ||
                    (sector === "Все" && sectorFilter === "Все");
                  return (
                    <button
                      key={sector}
                      onClick={() =>
                        setSectorFilter(sector)
                      }
                      className={`flex-shrink-0 rounded-full text-xs font-medium py-2 px-3 min-h-[44px] border transition-all ${
                        isActive
                          ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                          : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-300"
                      }`}
                    >
                      {sector}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stages */}
            <div>
              <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
                Стадия
              </p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {stages.map((stage) => {
                  const isActive =
                    stageFilter === stage ||
                    (stage === "Все" && stageFilter === "Все");
                  return (
                    <button
                      key={stage}
                      onClick={() =>
                        setStageFilter(stage)
                      }
                      className={`flex-shrink-0 rounded-full text-xs font-medium py-2 px-3 min-h-[44px] border transition-all ${
                        isActive
                          ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                          : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-300"
                      }`}
                    >
                      {stage}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------- Empty State -------- */}
      {filteredStartups.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <EmptySearchIcon />
          <p className="text-zinc-400 text-sm font-medium">
            Стартапы не найдены
          </p>
          <p className="text-zinc-400 text-xs mt-1 text-center">
            Попробуйте изменить параметры поиска или фильтры
          </p>
        </div>
      )}

      {/* -------- Featured Section (horizontal scroll) -------- */}
      {featured && (
        <div className="px-4 pt-2 pb-3">
          <h2 className="text-white text-base font-bold font-heading mb-3">
            Рекомендуемые
          </h2>
          <div
            className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 pb-2"
            role="region"
            aria-label="Рекомендуемые стартапы"
            tabIndex={0}
          >
            <StartupCard
              startup={featured}
              onClick={onStartupClick}
              index={0}
              featured
            />
            {/* Show second startup as featured too if available */}
            {rest.length > 0 && (
              <StartupCard
                startup={rest[0]}
                onClick={onStartupClick}
                index={1}
                featured
              />
            )}
          </div>
        </div>
      )}

      {/* -------- Card List -------- */}
      {rest.length > 0 && (
        <div className="px-4 space-y-3">
          <h2 className="text-white text-base font-bold font-heading">
            Все стартапы
          </h2>
          {rest.map((startup, i) => (
            <StartupCard
              key={startup.id}
              startup={startup}
              onClick={onStartupClick}
              index={i + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
