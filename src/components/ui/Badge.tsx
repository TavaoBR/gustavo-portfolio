import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'status' | 'tech';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center text-xs font-mono font-medium rounded-full transition-colors';

  const variantStyles = {
    default: 'px-2.5 py-0.5 bg-white/10 text-white border border-white/10',
    outline: 'px-2.5 py-0.5 bg-transparent text-zinc-300 border border-white/15',
    status:
      'px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 gap-2',
    tech:
      'px-3 py-1 bg-white/[0.03] text-zinc-300 border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/[0.08] cursor-default',
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {variant === 'status' && (
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      )}
      {children}
    </span>
  );
};
