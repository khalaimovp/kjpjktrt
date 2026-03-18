import { useState } from "react";
import GlassCard from "../components/GlassCard";
import AuroraBackground from "../components/AuroraBackground";

/* ------------------------------------------------------------------ */
/*  SVG Icons                                                          */
/* ------------------------------------------------------------------ */

interface IconProps {
  className?: string;
}

function TrendUpIcon({ className = "" }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 14L8 9L11 12L17 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6H17V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrainIcon({ className = "" }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M9 2C6.8 2 5 3.8 5 6C5 7.1 5.4 8 6.1 8.7L6 9.5C5.4 10.2 5 11.1 5 12C5 14.2 6.8 16 9 16C11.2 16 13 14.2 13 12C13 11.1 12.6 10.2 12 9.5L11.9 8.7C12.6 8 13 7.1 13 6C13 3.8 11.2 2 9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 8V12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 10H11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LeafIcon({ className = "" }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 15C4 15 5 5 14 3C14 3 15 12 6 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 15C7 12 10 9 14 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartBarIcon({ className = "" }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="10" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="7.5" y="6" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13" y="2" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 5V9L12 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const LABEL_COLORS: Record<string, string> = {
  indigo:  "text-indigo-400",
  cyan:    "text-cyan-400",
  emerald: "text-emerald-400",
  amber:   "text-amber-400",
};

const PERIODS = ["Неделя", "Месяц", "Год"];

const PERIOD_DATA = [
  // index 0: Неделя
  {
    heroValue: "$12M",
    heroSub: "+$2.1M за неделю",
    heroLabel: "Привлечено за неделю",
    kpis: [
      { value: "18",  label: "Стартапов",    sub: "+4",   color: "indigo" },
      { value: "7",   label: "Инвесторов",   sub: "+2",   color: "cyan"   },
      { value: "23",  label: "Коннектов",    sub: "+8",   color: "emerald" },
      { value: "$2.1M", label: "Средний раунд", sub: "+5%",  color: "amber" },
    ],
    sectors: [
      { name: "AI / ML",     pct: 32, count: 6,  growth: "+3%", color: "#6366f1" },
      { name: "FinTech",     pct: 24, count: 4,  growth: "+1%", color: "#06b6d4" },
      { name: "MedTech",     pct: 18, count: 3,  growth: "+5%", color: "#f43f5e" },
      { name: "GreenTech",   pct: 12, count: 2,  growth: "+12%", color: "#10b981" },
      { name: "Остальное",   pct: 14, count: 3,  growth: "+1%", color: "#f59e0b" },
    ],
    totalStartups: 18,
  },
  // index 1: Месяц
  {
    heroValue: "$48M",
    heroSub: "+$8M за месяц",
    heroLabel: "Привлечено за месяц",
    kpis: [
      { value: "247",  label: "Стартапов",    sub: "+23",  color: "indigo" },
      { value: "89",   label: "Инвесторов",   sub: "+12",  color: "cyan"   },
      { value: "312",  label: "Коннектов",    sub: "+47",  color: "emerald" },
      { value: "$18M", label: "Средний раунд", sub: "+15%", color: "amber" },
    ],
    sectors: [
      { name: "AI / ML",     pct: 28, count: 69,  growth: "+18%", color: "#6366f1" },
      { name: "FinTech",     pct: 21, count: 52,  growth: "+9%",  color: "#06b6d4" },
      { name: "MedTech",     pct: 17, count: 42,  growth: "+24%", color: "#f43f5e" },
      { name: "GreenTech",   pct: 14, count: 35,  growth: "+67%", color: "#10b981" },
      { name: "Остальное",   pct: 20, count: 49,  growth: "+5%",  color: "#f59e0b" },
    ],
    totalStartups: 247,
  },
  // index 2: Год
  {
    heroValue: "$420M",
    heroSub: "+$120M за год",
    heroLabel: "Привлечено за год",
    kpis: [
      { value: "1 847", label: "Стартапов",    sub: "+312", color: "indigo" },
      { value: "534",   label: "Инвесторов",   sub: "+89",  color: "cyan"   },
      { value: "4 210", label: "Коннектов",    sub: "+890", color: "emerald" },
      { value: "$22M",  label: "Средний раунд", sub: "+28%", color: "amber" },
    ],
    sectors: [
      { name: "AI / ML",     pct: 31, count: 573,  growth: "+45%", color: "#6366f1" },
      { name: "FinTech",     pct: 22, count: 407,  growth: "+22%", color: "#06b6d4" },
      { name: "MedTech",     pct: 16, count: 296,  growth: "+38%", color: "#f43f5e" },
      { name: "GreenTech",   pct: 15, count: 277,  growth: "+120%", color: "#10b981" },
      { name: "Остальное",   pct: 16, count: 294,  growth: "+12%",  color: "#f59e0b" },
    ],
    totalStartups: 1847,
  },
];

const TRENDS = [
  {
    icon: BrainIcon,
    text: "AI-стартапы привлекают в среднем на 40% больше капитала",
    borderColor: "border-indigo-500/50",
    iconColor: "text-indigo-400",
  },
  {
    icon: LeafIcon,
    text: "GreenTech — максимальный рост интереса инвесторов +67% МоМ",
    borderColor: "border-emerald-500/50",
    iconColor: "text-emerald-400",
  },
  {
    icon: ChartBarIcon,
    text: "Медиан чек вырос до $250K в этом году",
    borderColor: "border-cyan-500/50",
    iconColor: "text-cyan-400",
  },
  {
    icon: ClockIcon,
    text: "Series A закрывается в среднем за 4.2 месяца",
    borderColor: "border-amber-500/50",
    iconColor: "text-amber-400",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Analytics() {
  const [activePeriod, setActivePeriod] = useState(1); // default "Месяц"
  const period = PERIOD_DATA[activePeriod];

  /* Build conic-gradient dynamically from period sectors */
  const conicStops = period.sectors.reduce<string[]>((acc, s, i) => {
    const start = period.sectors.slice(0, i).reduce((sum, prev) => sum + prev.pct, 0);
    const end = start + s.pct;
    acc.push(`${s.color} ${start}% ${end}%`);
    return acc;
  }, []);
  const conicGradient = `conic-gradient(${conicStops.join(", ")})`;

  return (
    <div className="min-h-screen bg-zinc-950 px-4 pt-6 pb-24 relative overflow-hidden">
      {/* Aurora blobs */}
      <AuroraBackground />

      {/* Title */}
      <div className="relative z-10 flex flex-col gap-6">
        <h2 className="font-heading font-extrabold text-xl text-white tracking-tight animate-slide-up">
          Аналитика рынка
        </h2>

        {/* ---- Hero Stat Card ---- */}
        <GlassCard className="p-6 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 animate-slide-up stagger-1">
          <div className="flex items-center gap-2 mb-3">
            <TrendUpIcon className="text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">{period.heroSub}</span>
          </div>
          <p className="text-6xl font-heading font-black text-white animate-count-up leading-none mb-2">
            {period.heroValue}
          </p>
          <p className="text-zinc-400 text-sm">{period.heroLabel}</p>
        </GlassCard>

        {/* ---- KPI Grid 2x2 ---- */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up stagger-2">
          {period.kpis.map((kpi) => (
            <GlassCard key={kpi.label} className="p-4 flex flex-col gap-1.5">
              <span className="text-3xl font-bold text-white font-heading">
                {kpi.value}
              </span>
              <span className={`text-xs font-medium ${LABEL_COLORS[kpi.color]}`}>
                {kpi.label}
              </span>
              <span className="text-emerald-400 text-xs font-medium">
                {kpi.sub}
              </span>
            </GlassCard>
          ))}
        </div>

        {/* ---- Period Switcher ---- */}
        <div className="animate-slide-up stagger-3">
          <GlassCard className="p-1.5 flex gap-1" role="tablist" aria-label="Период аналитики">
            {PERIODS.map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={activePeriod === i}
                onClick={() => setActivePeriod(i)}
                className={`flex-1 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  activePeriod === i
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}
          </GlassCard>
        </div>

        {/* ---- Tab Content ---- */}
        <div role="tabpanel" className="flex flex-col gap-6">
          {/* ---- Sector Donut Chart ---- */}
          <GlassCard className="p-5 animate-slide-up stagger-4">
            <h2 className="font-heading font-bold text-white text-base tracking-tight mb-4">
              Секторы
            </h2>
            <div className="flex items-center gap-5">
              {/* Donut */}
              <div className="relative flex-shrink-0">
                <div
                  className="rounded-full"
                  style={{
                    width: 160,
                    height: 160,
                    background: conicGradient,
                  }}
                  role="img"
                  aria-label="Круговая диаграмма распределения по секторам"
                />
                {/* Inner circle for donut effect */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 rounded-full flex items-center justify-center"
                  style={{ width: 90, height: 90 }}
                  aria-hidden="true"
                >
                  <span className="font-heading font-bold text-white text-lg">{period.totalStartups}</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-2.5 min-w-0 flex-1">
                {period.sectors.map((s) => (
                  <div key={s.name} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: s.color }}
                      aria-hidden="true"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-white text-xs font-medium truncate">
                        {s.name}
                      </span>
                      <span className="text-zinc-400 text-xs">
                        {s.count} &middot;{" "}
                        <span className="text-emerald-400">{s.growth}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* ---- Trend Cards ---- */}
          <div className="flex flex-col gap-3 animate-slide-up stagger-5">
            <h2 className="font-heading font-bold text-white text-base tracking-tight">
              Тренды
            </h2>
            {TRENDS.map((trend, i) => {
              const Icon = trend.icon;
              return (
                <GlassCard
                  key={i}
                  className={`p-4 border-l-2 ${trend.borderColor} flex items-start gap-3`}
                >
                  <span className={`flex-shrink-0 mt-0.5 ${trend.iconColor}`}>
                    <Icon />
                  </span>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {trend.text}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
