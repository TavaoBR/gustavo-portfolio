import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { useSpotlight } from '@/hooks/useSpotlight';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  enableSpotlight?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, enableSpotlight = false, children, onPointerMove, ...props }, ref) => {
    const { elementRef, handlePointerMove } = useSpotlight<HTMLDivElement>();

    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (enableSpotlight) {
        handlePointerMove(e);
      }
      onPointerMove?.(e);
    };

    return (
      <div
        ref={(node) => {
          elementRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        onPointerMove={onMove}
        className={cn(
          'rounded-xl border border-white/10 bg-card p-6 text-text-primary transition-all duration-300',
          enableSpotlight && 'spotlight-card',
          className
        )}
        {...props}
      >
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    );
  }
);

Card.displayName = 'Card';
