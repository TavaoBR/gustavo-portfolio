import React, { useRef, useEffect, useCallback } from 'react';

interface Spark {
  x: number;
  y: number;
  angle: number;
  speed: number;
  radius: number;
  color: string;
  alpha: number;
}

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children?: React.ReactNode;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#ffffff',
  sparkSize = 10,
  sparkRadius = 24,
  sparkCount = 8,
  duration = 450,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      sparksRef.current.forEach((spark) => {
        const currentDistance = sparkRadius * ease;
        const currentX = spark.x + Math.cos(spark.angle) * currentDistance;
        const currentY = spark.y + Math.sin(spark.angle) * currentDistance;
        const currentAlpha = (1 - progress) * 0.85;

        ctx.save();
        ctx.beginPath();
        ctx.arc(currentX, currentY, spark.radius * (1 - progress * 0.5), 0, 2 * Math.PI);
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = spark.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      if (progress < 1 && sparksRef.current.length > 0) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        sparksRef.current = [];
        startTimeRef.current = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
    [duration, sparkRadius]
  );

  const handleClick = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    const newSparks: Spark[] = Array.from({ length: sparkCount }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / sparkCount + (Math.random() * 0.4 - 0.2);
      return {
        x,
        y,
        angle,
        speed: 1 + Math.random(),
        radius: (sparkSize / 2) * (0.8 + Math.random() * 0.4),
        color: sparkColor,
        alpha: 1,
      };
    });

    sparksRef.current = newSparks;
    startTimeRef.current = null;
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  return (
    <div onClick={handleClick} className="relative w-full">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
        aria-hidden="true"
      />
      {children}
    </div>
  );
};
