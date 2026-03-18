import type { TabDef } from "../types";

const gridColsMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

interface BottomNavProps {
  tabs?: TabDef[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export default function BottomNav({ tabs = [], activeTab, onTabChange }: BottomNavProps) {
  const gridCols = gridColsMap[tabs.length] || 'grid-cols-4';

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]"
      role="tablist"
      aria-label="Main navigation"
    >
      <div className={`grid ${gridCols} w-full bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 app-container`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              className={`flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
                isActive ? 'text-indigo-300' : 'text-zinc-500'
              }`}
              onClick={() => onTabChange(tab.key)}
            >
              <div className="relative flex flex-col items-center">
                {isActive && (
                  <span className="absolute -top-1 w-1 h-1 rounded-full bg-indigo-400" />
                )}
                <span className="text-xl mt-1">
                  {tab.icon(isActive)}
                </span>
              </div>
              <span className="text-xs font-medium font-body">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
