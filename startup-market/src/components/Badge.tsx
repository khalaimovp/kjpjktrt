import type { ReactNode } from "react";

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  rose: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
  white: 'bg-white/10 text-zinc-200 border-white/20',
};

interface BadgeProps {
  children: ReactNode;
  color?: string;
}

export default function Badge({ children, color = 'indigo' }: BadgeProps) {
  const colors = colorMap[color] || colorMap.indigo;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${colors}`}
    >
      {children}
    </span>
  );
}
