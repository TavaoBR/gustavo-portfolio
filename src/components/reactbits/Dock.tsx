import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion';

export interface DockItemData {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  badge?: string;
  isExternal?: boolean;
}

interface DockProps {
  items: DockItemData[];
  className?: string;
  magnification?: number;
  distance?: number;
}

export const Dock: React.FC<DockProps> = ({
  items,
  className = '',
  magnification = 58,
  distance = 120,
}) => {
  const mouseX = useMotionValue<number>(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-30 hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-emerald-500/20 bg-graphite-900/90 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.75)] ${className}`}
      role="toolbar"
      aria-label="Acesso rápido — Dock"
    >
      {items.map((item) => (
        <DockIcon
          key={item.id}
          mouseX={mouseX}
          item={item}
          magnification={magnification}
          distance={distance}
        />
      ))}
    </motion.div>
  );
};

interface DockIconProps {
  mouseX: MotionValue<number>;
  item: DockItemData;
  magnification: number;
  distance: number;
}

const DockIcon: React.FC<DockIconProps> = ({ mouseX, item, magnification, distance }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distanceFromMouse = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceFromMouse,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthSync, { mass: 0.1, stiffness: 350, damping: 22 });

  return (
    <div className="relative flex items-center justify-center">
      {/* Tooltip flutuante com física de mola */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute pointer-events-none px-2.5 py-1 rounded-md bg-graphite-900 border border-emerald-500/30 text-[11px] font-mono text-emerald-200 shadow-xl whitespace-nowrap z-50"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        style={{ width, height: width }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={item.onClick}
        whileTap={{ scale: 0.88 }}
        className="relative flex items-center justify-center rounded-full bg-graphite-800/80 border border-graphite-700/70 hover:border-emerald-500/50 hover:bg-emerald-500/15 text-graphite-300 hover:text-white transition-colors focus:outline-none"
        aria-label={item.label}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          {item.icon}
        </div>

        {item.badge && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-graphite-900" />
        )}
      </motion.button>
    </div>
  );
};
