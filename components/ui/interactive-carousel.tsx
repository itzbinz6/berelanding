'use client';

import {
  Children,
  isValidElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion, PanInfo, useMotionValue, useSpring } from 'motion/react';

interface InteractiveCarouselProps {
  children: ReactNode;
  className?: string;
}

const SLIDE_MS = 600;
const AUTOPLAY_MS = 7000;
const SWIPE_DISTANCE = 50;
const SWIPE_VELOCITY = 500;

export function InteractiveCarousel({
  children,
  className = '',
}: InteractiveCarouselProps) {
  const items = Children.toArray(children);
  const length = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [cursorDirection, setCursorDirection] = useState<'prev' | 'next'>('next');
  const [isDragging, setIsDragging] = useState(false);

  // One set of motion values is enough because the pill belongs to the card
  // currently under the pointer. Its coordinates are recalculated from that
  // card's own bounding rect on every move.
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { damping: 28, stiffness: 420 });
  const smoothCursorY = useSpring(cursorY, { damping: 28, stiffness: 420 });

  const lastPointerRef = useRef({ x: -9999, y: -9999 });
  const didDragRef = useRef(false);

  const isDesktop = () =>
    typeof window !== 'undefined' && window.innerWidth >= 768;

  const goToPrevious = useCallback(() => {
    if (length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  const goToNext = useCallback(() => {
    if (length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % length);
  }, [length]);

  useEffect(() => {
    if (length > 0 && currentIndex >= length) {
      setCurrentIndex(0);
    }
  }, [length, currentIndex]);

  // Pause autoplay while the user is interacting with a card.
  const isPaused = hoveredCardIndex !== null || isDragging;

  useEffect(() => {
    if (length <= 1 || isPaused) return;

    const timer = window.setTimeout(goToNext, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [length, currentIndex, isPaused, goToNext]);

  // Keep the latest physical pointer position. This lets the newly active
  // card immediately take over the hover pill when the pointer stays still
  // while the carousel advances.
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      lastPointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  /*
   * After a slide finishes, determine which card is now under the cursor.
   * This is deliberately NOT tied to one "primary card" ref. Every rendered
   * card can become the hovered/active interaction target.
   */
  useEffect(() => {
    if (!isDesktop() || length <= 1) {
      setHoveredCardIndex(null);
      return;
    }

    const timer = window.setTimeout(() => {
      const { x: px, y: py } = lastPointerRef.current;

      // Find the visible card whose actual DOM rectangle contains the cursor.
      const cards = Array.from(
        document.querySelectorAll<HTMLElement>('[data-interactive-carousel-card]')
      );

      let foundIndex: number | null = null;

      cards.forEach((card) => {
        const index = Number(card.dataset.carouselIndex);
        const rect = card.getBoundingClientRect();

        if (
          rect.width > 0 &&
          rect.height > 0 &&
          px >= rect.left &&
          px <= rect.right &&
          py >= rect.top &&
          py <= rect.bottom
        ) {
          foundIndex = index;
        }
      });

      setHoveredCardIndex(foundIndex);

      if (foundIndex !== null) {
        const card = cards.find(
          (el) => Number(el.dataset.carouselIndex) === foundIndex
        );

        if (card) {
          const rect = card.getBoundingClientRect();
          const x = Math.max(0, Math.min(rect.width, px - rect.left));
          const y = Math.max(0, Math.min(rect.height, py - rect.top));

          cursorX.set(x);
          cursorY.set(y);
          smoothCursorX.jump(x);
          smoothCursorY.jump(y);
          setCursorDirection(x < rect.width / 2 ? 'prev' : 'next');
        }
      }
    }, SLIDE_MS + 50);

    return () => window.clearTimeout(timer);
  }, [currentIndex, length, cursorX, cursorY, smoothCursorX, smoothCursorY]);

  const handleDragStart = () => {
    didDragRef.current = false;
    setIsDragging(true);
    setHoveredCardIndex(null);
  };

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (Math.abs(info.offset.x) > 8) {
      didDragRef.current = true;
    }
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setIsDragging(false);

    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) {
      goToNext();
    } else if (
      info.offset.x > SWIPE_DISTANCE ||
      info.velocity.x > SWIPE_VELOCITY
    ) {
      goToPrevious();
    }

    window.setTimeout(() => {
      didDragRef.current = false;
    }, 0);
  };

  /*
   * Every visible card gets its own hover target.
   *
   * This is the key change: the pill is no longer rendered only inside the
   * first/primary card. When a different card becomes the card under the
   * pointer, that card owns the pill and the coordinates are calculated from
   * THAT card's rectangle.
   */
  const handleCardMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (!isDesktop() || length <= 1) return;

    lastPointerRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));

    cursorX.set(x);
    cursorY.set(y);
    smoothCursorX.jump(x);
    smoothCursorY.jump(y);
    setCursorDirection(x < rect.width / 2 ? 'prev' : 'next');
    setHoveredCardIndex(index);
  };

  const handleCardMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (!isDesktop() || length <= 1) return;

    lastPointerRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));

    cursorX.set(x);
    cursorY.set(y);
    setCursorDirection(x < rect.width / 2 ? 'prev' : 'next');

    if (hoveredCardIndex !== index) {
      setHoveredCardIndex(index);
    }
  };

  const handleCardMouseLeave = (index: number) => {
    if (hoveredCardIndex === index) {
      setHoveredCardIndex(null);
    }
  };

  /*
   * Clicking any visible card:
   * - side card -> bring that card to the center
   * - current/center card -> left half prev, right half next
   * - links/buttons inside cards are not hijacked
   */
  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number,
    position: number,
  ) => {
    if (didDragRef.current) return;

    const target = event.target as HTMLElement;
    if (
      target.closest(
        'a, button, input, textarea, select, [data-carousel-ignore]'
      )
    ) {
      return;
    }

    if (position !== 0) {
      if (Math.abs(position) === 1) {
        setCurrentIndex(index);
      }
      return;
    }

    if (!isDesktop() || length <= 1) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;

    if (x < rect.width / 2) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  const getPosition = (index: number) => {
    const half = Math.floor(length / 2);
    let diff = (index - currentIndex) % length;

    if (diff < -half) diff += length;
    if (diff > half) diff -= length;

    return diff;
  };

  if (length === 0) return null;

  return (
    <div
      className={`relative w-full overflow-hidden py-12 outline-none ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="relative flex h-[480px] w-full items-center justify-center md:h-[550px]">
        {items.map((item, index) => {
          const position = getPosition(index);
          const isCenter = position === 0;
          const isVisible = Math.abs(position) <= 1;
          const isHovered = hoveredCardIndex === index;

          let x = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 10;

          if (position === 0) {
            x = 0;
            scale = 1;
            opacity = 1;
            zIndex = 20;
          } else if (position === 1 || position === -1) {
            x = position * 105;
            scale = 0.85;
            opacity = 0.5;
            zIndex = 10;
          } else {
            x = position > 0 ? 200 : -200;
            scale = 0.7;
            opacity = 0;
            zIndex = 0;
          }

          const key =
            isValidElement(item) && item.key != null ? item.key : index;

          return (
            <motion.div
              key={key}
              initial={false}
              animate={{ x: `${x}%`, scale, opacity }}
              transition={{
                duration: SLIDE_MS / 1000,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="absolute h-full w-[80vw] md:w-[420px]"
              style={{
                originX: 0.5,
                originY: 0.5,
                zIndex,
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
              aria-hidden={!isCenter}
            >
              <motion.div
                drag={isCenter && length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onMouseEnter={(event) => handleCardMouseEnter(event, index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
                onMouseMove={(event) => handleCardMouseMove(event, index)}
                onClick={(event) => handleCardClick(event, index, position)}
                data-interactive-carousel-card
                data-carousel-index={index}
                className={`relative h-full w-full ${
                  isHovered && isDesktop() ? 'md:cursor-none' : ''
                } ${!isCenter ? 'cursor-pointer' : ''}`}
              >
                {item}

                {/*
                 * IMPORTANT:
                 * The navigation pill exists INSIDE EVERY CARD, not only the
                 * original primary card. Whichever visible card is hovered
                 * gets the pill, so it follows the card through the carousel.
                 */}
                {length > 1 && (
                  <motion.div
                    style={{
                      left: smoothCursorX,
                      top: smoothCursorY,
                    }}
                    initial={false}
                    animate={{
                      opacity: isHovered && !isDragging ? 1 : 0,
                      scale: isHovered && !isDragging ? 1 : 0.92,
                    }}
                    transition={{
                      duration: 0.16,
                      ease: 'easeOut',
                    }}
                    className="pointer-events-none absolute z-30 hidden h-9 w-[86px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-stone-100/90 px-3 text-[11px] font-semibold tracking-tight text-stone-700 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.95),inset_-2px_-2px_5px_rgba(0,0,0,0.12),2px_3px_8px_rgba(0,0,0,0.12)] backdrop-blur-sm md:flex"
                    aria-hidden="true"
                  >
                    {cursorDirection === 'next' ? 'Next →' : '← Prev'}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
