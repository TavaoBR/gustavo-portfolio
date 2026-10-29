import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'emerald' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium select-none tap-feedback transition-all disabled:opacity-50 disabled:pointer-events-none rounded-lg text-sm';

    const variantStyles = {
      primary:
        'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 font-bold shadow-md shadow-emerald-950/50 border border-emerald-500/30',
      emerald:
        'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 font-bold shadow-md shadow-emerald-950/50 border border-emerald-500/30',
      secondary:
        'bg-graphite-850 border border-white/10 text-white hover:bg-graphite-800 hover:border-emerald-500/30 active:bg-graphite-750',
      ghost:
        'bg-transparent text-zinc-300 hover:text-white hover:bg-white/5 active:bg-white/10',
      outline:
        'border border-graphite-700 bg-graphite-900/80 text-white hover:bg-emerald-950/40 hover:border-emerald-600/50 hover:text-emerald-300 active:bg-emerald-900/40',
      danger:
        'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 active:bg-red-500/30',
    };

    const sizeStyles = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5',
      icon: 'h-10 w-10 p-0',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span>{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
