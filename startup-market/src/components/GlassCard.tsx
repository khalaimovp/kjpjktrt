import type { ReactNode, MouseEvent, KeyboardEvent, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
}

export default function GlassCard({
  children,
  className = '',
  hover = false,
  onClick,
  role: roleProp,
  ...rest
}: GlassCardProps) {
  const base = 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl';
  const hoverClass = hover
    ? 'hover:bg-white/[0.08] hover:border-white/15 transition-all'
    : '';
  const clickableClass = onClick
    ? 'cursor-pointer active:scale-[0.98] transition-transform'
    : '';

  return (
    <div
      className={`${base} ${hoverClass} ${clickableClass} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : roleProp}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e: KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e);
              }
            }
          : undefined
      }
      {...rest}
    >
      {children}
    </div>
  );
}
