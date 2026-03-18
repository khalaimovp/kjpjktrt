import { useState, useEffect, useMemo, memo } from "react";
import { SearchIcon, EmptySearchIcon } from "../components/Icons";
import type { Investor } from "../types";

/* ------------------------------------------------------------------ */
/*  InvestorCard                                                      */
/* ------------------------------------------------------------------ */

interface InvestorCardProps {
  investor: Investor;
  onClick: (investor: Investor) => void;
  index?: number;
}

const InvestorCard = memo(function InvestorCard({ investor, onClick, index = 0 }: InvestorCardProps) {
  const staggerClass = index < 6 ? `stagger-${index + 1}` : "";

  return (
    <div
      onClick={() => onClick(investor)}
      className={`bg-white/[0.06] border border-white/10 rounded-3xl p-4 hover:bg-white/[0.08] hover:border-white/15 transition-all cursor-pointer active:scale-[0.98] animate-fade-slide ${staggerClass}`}
      role="button"
      tabIndex={0}
      aria-label={`Открыть профиль ${investor.name} — ${investor.fund}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(investor);
        }
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar with gradient ring */}
        <div className="flex-shrink-0 p-0.5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500">
          <img src={investor.avatar} alt={investor.name} loading="lazy" className="w-12 h-12 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-bold font-heading text-sm">
              {investor.name}
            </h3>
            {/* Verification indicator */}
            {investor.verified && (
              <div className="flex items-center gap-1" role="img" aria-label="Верифицирован">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
              </div>
            )}
          </div>
          <p className="text-zinc-400 text-xs mt-0.5">
            {investor.title} &middot; {investor.fund}
          </p>
          <p className="text-zinc-500 text-xs">{investor.location}</p>
        </div>
      </div>

      {/* Sector badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {investor.sectors.slice(0, 4).map((sector) => (
          <span
            key={sector}
            className="inline-flex items-center bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-full px-2 py-0.5 text-xs font-medium"
          >
            {sector}
          </span>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-white/[0.03] rounded-xl p-2 text-center">
          <div className="text-white font-bold text-sm font-heading">
            {investor.totalInvested}
          </div>
          <div className="text-zinc-400 text-xs">Вложил</div>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2 text-center">
          <div className="text-white font-bold text-sm font-heading">
            {investor.portfolio}
          </div>
          <div className="text-zinc-400 text-xs">Проектов</div>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2 text-center">
          <div className="text-indigo-300 font-bold text-xs font-heading leading-tight">
            {investor.ticketSize}
          </div>
          <div className="text-zinc-400 text-xs">Чек</div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
        {investor.bio}
      </p>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/*  InvestorCatalog                                                   */
/* ------------------------------------------------------------------ */

interface InvestorCatalogProps {
  investors: Investor[];
  onInvestorClick: (investor: Investor) => void;
}

export default function InvestorCatalog({
  investors,
  onInvestorClick,
}: InvestorCatalogProps) {
  const [search, setSearch] = useState("");
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch]);

  // Filter investors internally
  const filteredInvestors = useMemo(() => investors.filter((inv) => {
    const q = search.toLowerCase();
    return (
      !q ||
      inv.name.toLowerCase().includes(q) ||
      inv.fund.toLowerCase().includes(q) ||
      inv.sectors.some((s) => s.toLowerCase().includes(q))
    );
  }), [investors, search]);

  return (
    <div className="">
      {/* -------- Search Bar -------- */}
      <div className="px-4 pt-4 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Поиск инвесторов..."
            className="w-full bg-white/5 border-0 rounded-2xl py-3 pl-10 pr-4 text-white text-sm placeholder-zinc-500 outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
            aria-label="Поиск инвесторов"
          />
        </div>
      </div>

      {/* -------- Empty State -------- */}
      {filteredInvestors.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <EmptySearchIcon />
          <p className="text-zinc-400 text-sm font-medium">
            Инвесторы не найдены
          </p>
          <p className="text-zinc-400 text-xs mt-1 text-center">
            Попробуйте изменить параметры поиска
          </p>
        </div>
      )}

      {/* -------- Card List -------- */}
      {filteredInvestors.length > 0 && (
        <div className="px-4 space-y-3">
          {filteredInvestors.map((investor, i) => (
            <InvestorCard
              key={investor.id}
              investor={investor}
              onClick={onInvestorClick}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
