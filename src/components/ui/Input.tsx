import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            'flex h-11 w-full rounded-xl border border-graphite-700/80 bg-[#090d0b] px-4 py-2.5 text-sm text-white placeholder:text-graphite-400 transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]',
            'focus:border-emerald-500 focus:bg-[#0c120f] focus:outline-none focus:ring-2 focus:ring-emerald-500/25',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-400 font-mono">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={cn(
            'flex min-h-[120px] w-full rounded-xl border border-graphite-700/80 bg-[#090d0b] px-4 py-3 text-sm text-white placeholder:text-graphite-400 transition-all resize-y shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]',
            'focus:border-emerald-500 focus:bg-[#0c120f] focus:outline-none focus:ring-2 focus:ring-emerald-500/25',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-400 font-mono">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
