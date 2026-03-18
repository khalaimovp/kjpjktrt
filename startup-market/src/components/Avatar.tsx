import { useState } from 'react';

type AvatarSize = 'sm' | 'md' | 'lg';

const sizeMap: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-xl',
  lg: 'w-16 h-16 text-3xl',
};

const initialsSizeMap: Record<AvatarSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-lg',
};

const ringSizeMap: Record<AvatarSize, string> = {
  sm: 'p-[2px]',
  md: 'p-[2.5px]',
  lg: 'p-[3px]',
};

interface AvatarProps {
  emoji?: string;
  src?: string;
  initials?: string;
  gradient?: string;
  size?: AvatarSize;
  ring?: boolean;
  rounded?: string;
}

export default function Avatar({
  emoji,
  src,
  initials,
  gradient = 'from-indigo-500 to-cyan-500',
  size = 'md',
  ring = false,
  rounded = 'rounded-2xl',
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const sizeClass = sizeMap[size];
  const initialsSize = initialsSizeMap[size];

  // Priority: src (if not errored) > emoji > initials > fallback "?"
  const hasSrc = src && !imgError;
  const hasEmoji = !hasSrc && emoji;
  const hasInitials = !hasSrc && !hasEmoji && initials;

  // Use gradient bg when showing initials or fallback, glass bg when showing emoji or image
  const usesGradientBg = !hasSrc && !hasEmoji;

  const bgClass = usesGradientBg
    ? `bg-gradient-to-br ${gradient}`
    : 'bg-white/5 backdrop-blur-xl border border-white/10';

  const inner = (
    <div
      className={`${sizeClass} ${rounded} flex items-center justify-center ${bgClass} select-none overflow-hidden`}
    >
      {hasSrc && (
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover ${rounded}`}
        />
      )}
      {hasEmoji && emoji}
      {hasInitials && initials && (
        <span className={`font-heading font-bold text-white ${initialsSize}`}>
          {initials.slice(0, 2).toUpperCase()}
        </span>
      )}
      {!hasSrc && !hasEmoji && !hasInitials && (
        <span className={`font-heading font-bold text-white ${initialsSize}`}>?</span>
      )}
    </div>
  );

  if (!ring) {
    return inner;
  }

  const ringPadding = ringSizeMap[size];

  return (
    <div
      className={`${rounded} ${ringPadding} bg-gradient-to-br ${gradient}`}
    >
      {inner}
    </div>
  );
}
