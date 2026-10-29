import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'top',
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {elements.map((el, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
            filter: 'blur(10px)',
            y: direction === 'top' ? -18 : 18,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.5,
            delay: (index * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {el}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </span>
  );
};
