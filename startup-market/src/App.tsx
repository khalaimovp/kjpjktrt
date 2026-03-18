import { useState, useCallback, lazy, Suspense } from "react";
import { MOCK_STARTUPS, MOCK_INVESTORS, SECTORS, STAGES } from "./data/mockData";
import { useTelegramAuth } from "./hooks/useTelegramAuth";
import Onboarding from "./screens/Onboarding";
import StartupCatalog from "./screens/StartupCatalog";
import BottomNav from "./components/BottomNav";
import type { Startup, Investor, UserData, TabDef } from "./types";

// Lazy-loaded screens
const InvestorCatalog = lazy(() => import("./screens/InvestorCatalog"));
const StartupDetail = lazy(() => import("./screens/StartupDetail"));
const InvestorDetail = lazy(() => import("./screens/InvestorDetail"));
const ContactModal = lazy(() => import("./screens/ContactModal"));
const Analytics = lazy(() => import("./screens/Analytics"));
const Profile = lazy(() => import("./screens/Profile"));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const TABS: TabDef[] = [
  {
    key: "startups",
    label: "Стартапы",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#818cf8" : "#71717a"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.29-1.5 3.5-1.5 3.5s2.21 0 3.5-1.5c.74-.82.74-2.17 0-3 0 0-1.18 0-2 1z" />
        <path d="M12 13c-1.94-2.03-2.07-5.27 0-7.5C14.07 7.73 13.94 10.97 12 13z" />
        <path d="M12 13c2.03-1.94 5.27-2.07 7.5 0-2.23 2.07-5.47 1.94-7.5 0z" />
        <path d="M12 13c-2.03-1.94-5.27-2.07-7.5 0 2.23 2.07 5.47 1.94 7.5 0z" />
        <path d="M12 13V21" />
      </svg>
    ),
  },
  {
    key: "investors",
    label: "Инвесторы",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#818cf8" : "#71717a"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    key: "analytics",
    label: "Аналитика",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#818cf8" : "#71717a"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
  },
  {
    key: "profile",
    label: "Профиль",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#818cf8" : "#71717a"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function App() {
  const tgAuth = useTelegramAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState("startups");
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [contactTarget, setContactTarget] = useState<Startup | null>(null);

  const handleBackFromStartup = useCallback(() => setSelectedStartup(null), []);
  const handleBackFromInvestor = useCallback(() => setSelectedInvestor(null), []);
  const handleCloseContact = useCallback(() => setContactTarget(null), []);
  const handleTabChange = useCallback((key: string) => {
    setTab(key);
    window.scrollTo(0, 0);
  }, []);

  // Loading Telegram auth
  if (tgAuth.loading) return <LoadingFallback />;

  // Onboarding / editing
  if (editing || !user) {
    const tgName = tgAuth.user
      ? `${tgAuth.user.firstName}${tgAuth.user.lastName ? ` ${tgAuth.user.lastName}` : ""}`
      : undefined;
    return (
      <Onboarding
        defaultName={tgName}
        onComplete={(userData: UserData) => { setUser(userData); setEditing(false); }}
      />
    );
  }

  // Startup Detail
  if (selectedStartup)
    return (
      <Suspense fallback={<LoadingFallback />}>
        <StartupDetail startup={selectedStartup} onBack={handleBackFromStartup} onContact={setContactTarget} />
        {contactTarget && <ContactModal startup={contactTarget} onClose={handleCloseContact} />}
      </Suspense>
    );

  // Investor Detail
  if (selectedInvestor)
    return (
      <Suspense fallback={<LoadingFallback />}>
        <InvestorDetail investor={selectedInvestor} onBack={handleBackFromInvestor} />
      </Suspense>
    );

  // Subtitle for header
  const subtitle =
    tab === "startups"
      ? "Каталог стартапов"
      : tab === "investors"
        ? "Каталог инвесторов"
        : tab === "analytics"
          ? "Аналитика рынка"
          : "Мой профиль";

  // Main tabbed view
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-24 app-container">
      {/* Skip navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-zinc-900 focus:px-4 focus:py-2 focus:rounded-xl focus:font-bold focus:text-sm"
      >
        Перейти к содержимому
      </a>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-extrabold text-lg text-white tracking-tight leading-tight">
              <span className="gradient-text">РынокСтартапов</span>
            </h1>
            <p className="text-zinc-400 text-xs">
              {subtitle}
            </p>
          </div>
          <img src="/images/logo.webp" alt="" className="w-8 h-8 rounded-xl" />
        </div>
      </header>

      {/* Content */}
      <main id="main-content" className="pb-20">
        {tab === "startups" && (
          <StartupCatalog
            startups={MOCK_STARTUPS}
            sectors={SECTORS}
            stages={STAGES}
            onStartupClick={setSelectedStartup}
          />
        )}

        <Suspense fallback={<LoadingFallback />}>
          {tab === "investors" && (
            <InvestorCatalog
              investors={MOCK_INVESTORS}
              onInvestorClick={setSelectedInvestor}
            />
          )}

          {tab === "analytics" && <Analytics />}

          {tab === "profile" && <Profile user={user} onEdit={() => setEditing(true)} />}
        </Suspense>
      </main>

      {/* Bottom Navigation */}
      <BottomNav tabs={TABS} activeTab={tab} onTabChange={handleTabChange} />
    </div>
  );
}
