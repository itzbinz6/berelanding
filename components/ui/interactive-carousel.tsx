'use client';

import { useState, useRef, useEffect, ReactNode, Children } from 'react';
import { motion, useMotionValue, useSpring, PanInfo } from 'motion/react';

interface InteractiveCarouselProps {
  children: ReactNode;
  className?: string;
}

export function InteractiveCarousel({ children, className = '' }: InteractiveCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const items = Children.toArray(children);
  const length = items.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 7000);
    return () => clearInterval(timer);
  }, [length]);

  const handleDragEnd = (e: any, info: PanInfo) => {
    const swipe = info.offset.x;
    if (swipe < -50) {
      setCurrentIndex((prev) => (prev + 1) % length);
    } else if (swipe > 50) {
      setCurrentIndex((prev) => (prev - 1 + length) % length);
    }
  };

  const getPosition = (index: number) => {
    let diff = (index - currentIndex) % length;
    if (diff < -Math.floor(length / 2)) diff += length;
    if (diff > Math.floor(length / 2)) diff -= length;
    if (length % 2 === 0 && diff === Math.floor(length / 2)) {
      diff = length / 2;
    }
    return diff;
  };

  return (
    <div className={`relative w-full overflow-hidden py-8 md:py-12 ${className}`} ref={containerRef}>
      <div className="relative h-[520px] md:h-[580px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
        {items.map((item, index) => {
          const position = getPosition(index);

          let x = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 10;

          if (position === 0) {
            x = 0; scale = 1; opacity = 1; zIndex = 20;
          } else if (position === 1) {
            x = 105; scale = 0.85; opacity = 0.5; zIndex = 10;
          } else if (position === -1) {
            x = -105; scale = 0.85; opacity = 0.5; zIndex = 10;
          } else {
            x = position > 0 ? 200 : -200;
            scale = 0.7; opacity = 0; zIndex = 0;
          }

          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          const xValue = isMobile ? x * 0.85 : x;

          return (
            <motion.div
              key={index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{ x: `${xValue}%`, scale, opacity, zIndex }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="absolute w-[85vw] md:w-[420px] h-full"
              style={{ originX: 0.5, originY: 0.5 }}
            >
              {item}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
