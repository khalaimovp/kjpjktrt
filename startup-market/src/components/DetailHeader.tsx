import type { ReactNode } from "react";
import { ChevronLeftIcon } from "./Icons";

interface DetailHeaderProps {
  onBack: () => void;
  title: string;
  rightSlot?: ReactNode;
}

export default function DetailHeader({ onBack, title, rightSlot }: DetailHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center gap-3">
      <button
        onClick={onBack}
        className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm active:scale-95 transition-transform"
        aria-label="Назад"
      >
        <ChevronLeftIcon />
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="font-heading text-base font-extrabold tracking-tight truncate">{title}</h1>
      </div>
      {rightSlot}
    </header>
  );
}
