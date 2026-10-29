import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 2,
  prefix = '',
  suffix = '',
  separator = '.',
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<string>(
    `${prefix}${from.toLocaleString('pt-BR')}${suffix}`
  );
  const elementRef = useRef<HTMLSpanElement>(null);
  const counterObj = useRef<{ val: number }>({ val: from });

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(counterObj.current, {
            val: to,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              const current = Math.floor(counterObj.current.val);
              const formatted = current
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
              setDisplayValue(`${prefix}${formatted}${suffix}`);
            },
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [to, from, duration, prefix, suffix, separator]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
};
