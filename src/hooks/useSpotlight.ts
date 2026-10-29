import { useRef, useCallback } from 'react';

export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const elementRef = useRef<T | null>(null);
  const frameId = useRef<number | null>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent<T>) => {
    const el = elementRef.current;
    if (!el) return;

    if (frameId.current) {
      cancelAnimationFrame(frameId.current);
    }

    const clientX = e.clientX;
    const clientY = e.clientY;

    frameId.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
  }, []);

  return { elementRef, handlePointerMove };
}
