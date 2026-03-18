import { useState } from "react";
import Badge from "../components/Badge";
import GlassCard from "../components/GlassCard";
import Avatar from "../components/Avatar";
import AuroraBackground from "../components/AuroraBackground";
import type { UserData } from "../types";

/* ------------------------------------------------------------------ */
/*  SVG Icons                                                          */
/* ------------------------------------------------------------------ */

interface IconProps {
  className?: string;
}

function PencilIcon({ className = "" }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12.7 3.3a1.5 1.5 0 0 1 2.1 2.1L6.5 13.7l-3.2.8.8-3.2L12.7 3.3Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon({ className = "" }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 8V13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="5.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab definitions                                                    */
/* ------------------------------------------------------------------ */

const PROFILE_TABS = ["О себе", "Активность", "Настройки"];

/* ------------------------------------------------------------------ */
/*  Investor "About" tab                                               */
/* ------------------------------------------------------------------ */

function InvestorAbout({ user }: { user: UserData }) {
  const rows = [
    { label: "Секторы",    value: user.sectors   || "Не указано" },
    { label: "Стадии",     value: user.stages    || "Не указано" },
    { label: "Чек",        value: user.ticket    || "Не указано" },
    { label: "География",  value: user.geo       || "Не указано" },
  ];

  const metrics = [
    { label: "Просмотрено", value: user.viewed   ?? 34 },
    { label: "Сохранено",   value: user.saved    ?? 8  },
    { label: "Запросы",     value: user.requests ?? 3  },
  ];

  return (
    <div className="flex flex-col gap-4 animate-slide-up">
      {/* Info rows */}
      <GlassCard className="p-5 flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-3">
            <span className="text-zinc-500 text-sm flex-shrink-0">{row.label}</span>
            <span className="text-zinc-200 text-sm text-right leading-relaxed">{row.value}</span>
          </div>
        ))}
      </GlassCard>

      {/* Metric columns */}
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((m) => (
          <GlassCard key={m.label} className="p-4 flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-white font-heading animate-count-up">
              {m.value}
            </span>
            <span className="text-zinc-500 text-xs font-medium text-center">
              {m.label}
            </span>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Startup "About" tab                                                */
/* ------------------------------------------------------------------ */

function StartupAbout({ user }: { user: UserData }) {
  const rows = [
    { label: "Проект",      value: user.startupName || "Не указано" },
    { label: "Описание",    value: user.tagline     || user.bio || "Не указано" },
    { label: "Сектор",      value: user.sector      || "Не указано" },
    { label: "Стадия",      value: user.stage       || "Не указано" },
    { label: "Привлечение", value: user.raise       || "Не указано" },
  ];

  const metrics = [
    { label: "Просмотры",   value: user.views    ?? 0,    placeholder: "--" },
    { label: "Сохранения",  value: user.saved    ?? 0,    placeholder: "--" },
    { label: "Привлечено",  value: user.raised   ?? "$0", placeholder: "--" },
  ];

  const hasNoMetrics = !user.views && !user.saved && !user.raised;

  return (
    <div className="flex flex-col gap-4 animate-slide-up">
      {/* Info rows */}
      <GlassCard className="p-5 flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-3">
            <span className="text-zinc-500 text-sm flex-shrink-0">{row.label}</span>
            <span className="text-zinc-200 text-sm text-right leading-relaxed max-w-[60%]">
              {row.value}
            </span>
          </div>
        ))}
      </GlassCard>

      {/* Metric pills */}
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((m) => {
          const display = m.value === 0 || m.value === "$0" ? m.placeholder : m.value;
          return (
            <GlassCard key={m.label} className="p-4 flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-white font-heading animate-count-up">
                {display}
              </span>
              <span className="text-zinc-500 text-xs font-medium text-center">
                {m.label}
              </span>
            </GlassCard>
          );
        })}
      </div>

      {/* Info banner for new startups */}
      {hasNoMetrics && (
        <div className="bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-xl rounded-3xl p-4 flex items-start gap-3 animate-slide-up stagger-2">
          <span className="text-indigo-400 flex-shrink-0 mt-0.5">
            <InfoIcon />
          </span>
          <p className="text-indigo-200 text-sm leading-relaxed">
            Заполните профиль проекта, чтобы инвесторы могли вас найти. Статистика появится после первых просмотров.
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Activity feed tab                                                  */
/* ------------------------------------------------------------------ */

function ActivityFeed() {
  const activities = [
    {
      icon: "\u{1F441}\uFE0F",
      text: "Вы просмотрели NeuroPay",
      time: "2 часа назад",
      color: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      icon: "\u{1F4AC}",
      text: "Запрос контакта отправлен GreenRoute",
      time: "5 часов назад",
      color: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      icon: "\u2B50",
      text: "MedScan AI добавлен в избранное",
      time: "Вчера",
      color: "bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: "\u{1F4CA}",
      text: "Вы посмотрели аналитику рынка",
      time: "Вчера",
      color: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: "\u{1F441}\uFE0F",
      text: "Вы просмотрели EduFlow",
      time: "2 дня назад",
      color: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      icon: "\u{1F4AC}",
      text: "Запрос контакта отправлен CyberShield",
      time: "3 дня назад",
      color: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      icon: "\u2705",
      text: "Профиль заполнен на 100%",
      time: "Неделю назад",
      color: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: "\u{1F680}",
      text: "Вы зарегистрировались на платформе",
      time: "2 недели назад",
      color: "bg-violet-500/10 border-violet-500/20",
    },
  ];

  return (
    <div className="flex flex-col gap-3 animate-slide-up">
      {activities.map((activity, i) => (
        <GlassCard key={i} className="p-4 flex items-start gap-3">
          <span
            className={`flex-shrink-0 w-10 h-10 rounded-xl ${activity.color} border flex items-center justify-center text-lg`}
          >
            {activity.icon}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-zinc-200 text-sm">{activity.text}</p>
            <p className="text-zinc-500 text-xs mt-0.5">{activity.time}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Settings panel tab                                                 */
/* ------------------------------------------------------------------ */

function SettingsPanel() {
  const [notifications, setNotifications] = useState(true);
  const [emailNews, setEmailNews] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  const toggles = [
    { label: "Уведомления", value: notifications, toggle: () => setNotifications(v => !v) },
    { label: "Email-рассылка", value: emailNews, toggle: () => setEmailNews(v => !v) },
    { label: "Тёмная тема", value: darkTheme, toggle: () => setDarkTheme(v => !v) },
  ];

  return (
    <div className="flex flex-col gap-3 animate-slide-up">
      <GlassCard className="p-5 flex flex-col gap-4">
        {toggles.map((t, i) => (
          <div key={t.label}>
            {i > 0 && <div className="w-full h-px bg-white/10 mb-4" />}
            <div className="flex items-center justify-between">
              <span className="text-zinc-200 text-sm">{t.label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={t.value}
                onClick={t.toggle}
                className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                  t.value ? "bg-indigo-500/30" : "bg-white/10"
                }`}
              >
                <div className={`w-5 h-5 rounded-full transition-all ${
                  t.value ? "bg-indigo-400 ml-auto" : "bg-zinc-500"
                }`} />
              </button>
            </div>
          </div>
        ))}
      </GlassCard>

      <GlassCard className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-zinc-200 text-sm">Язык</span>
          <span className="text-zinc-400 text-sm">Русский</span>
        </div>
        <div className="w-full h-px bg-white/10" />
        <div className="flex items-center justify-between">
          <span className="text-zinc-200 text-sm">Версия</span>
          <span className="text-zinc-400 text-sm">1.0.0</span>
        </div>
      </GlassCard>

      <button
        type="button"
        className="w-full border border-rose-500/20 bg-rose-500/10 text-rose-400 rounded-2xl py-3.5 text-sm font-medium transition-all hover:bg-rose-500/15 active:scale-[0.98]"
      >
        Выйти из аккаунта
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Profile Component                                             */
/* ------------------------------------------------------------------ */

interface ProfileProps {
  user: UserData;
  onEdit: () => void;
}

export default function Profile({ user, onEdit }: ProfileProps) {
  const [activeTab, setActiveTab] = useState(0);

  const role = user?.role || "startup";
  const name = user?.name || "Пользователь";
  const initials = name.length >= 2 ? name.slice(0, 2).toUpperCase() : (role === "investor" ? "И" : "С");
  const title = user?.title || (role === "investor" ? "Инвестор" : "Основатель");
  const bio = user?.bio;

  return (
    <div className="min-h-screen bg-zinc-950 px-4 pt-6 pb-24 relative overflow-hidden">
      {/* Aurora blobs */}
      <AuroraBackground />

      <div className="relative z-10 flex flex-col gap-5">
        {/* ---- Avatar ---- */}
        <div className="flex flex-col items-center gap-3 animate-slide-up">
          {/* Gradient ring avatar */}
          <div className="p-0.5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500">
            <Avatar initials={initials} gradient={role === "investor" ? "from-indigo-500 to-cyan-500" : "from-emerald-500 to-cyan-400"} size="lg" rounded="rounded-full" />
          </div>

          {/* Name */}
          <h2 className="font-heading font-extrabold text-xl text-white text-center tracking-tight">
            {name}
          </h2>

          {/* Title / Role */}
          <p className="text-zinc-400 text-sm text-center -mt-1">{title}</p>

          {/* Role badge */}
          <Badge color={role === "investor" ? "amber" : "emerald"}>
            {role === "investor" ? "Инвестор" : "Стартап"}
          </Badge>

          {/* Bio */}
          {bio && (
            <p className="text-zinc-300 text-sm text-center leading-relaxed max-w-xs">
              {bio}
            </p>
          )}
        </div>

        {/* ---- Tab Switcher ---- */}
        <div className="animate-slide-up stagger-2">
          <GlassCard className="p-1.5 flex gap-1" role="tablist" aria-label="Разделы профиля">
            {PROFILE_TABS.map((tab, i) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === i}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  activeTab === i
                    ? "bg-white/10 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </GlassCard>
        </div>

        {/* ---- Tab Content ---- */}
        <div className="animate-slide-up stagger-3" role="tabpanel">
          {activeTab === 0 && role === "investor" && <InvestorAbout user={user} />}
          {activeTab === 0 && role !== "investor" && <StartupAbout user={user} />}
          {activeTab === 1 && <ActivityFeed />}
          {activeTab === 2 && <SettingsPanel />}
        </div>

        {/* ---- Edit Button ---- */}
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="w-full border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-xl
                       text-zinc-300 hover:text-white rounded-2xl py-3.5
                       flex items-center justify-center gap-2
                       transition-all duration-200 active:scale-[0.98]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60
                       animate-slide-up stagger-4"
          >
            <PencilIcon />
            <span className="text-sm font-medium">Редактировать профиль</span>
          </button>
        )}
      </div>
    </div>
  );
}
