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

type Direction = 'prev' | 'next';

const SLIDE_MS = 600;
const AUTOPLAY_MS = 7000;
const SWIPE_DISTANCE = 50;
const SWIPE_VELOCITY = 500;

// Scale of the cards sitting behind the active one. Keep in sync with the
// `scale` used for position -1 / +1 below.
const SIDE_SCALE = 0.85;

export function InteractiveCarousel({
  children,
  className = '',
}: InteractiveCarouselProps) {
  const items = Children.toArray(children);
  const length = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const normalizedIndex = length > 0 ? currentIndex % length : 0;

  // null = pointer is not over any card, so the Next/Prev pill is hidden.
  const [pillDirection, setPillDirection] = useState<Direction | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const didDragRef = useRef(false);

  // ONE pill for the whole carousel. It is positioned relative to the stage
  // (which never moves), so it can never get stuck on a card that is sliding
  // away. The spring only smooths the pill's own movement.
  const pillX = useMotionValue(0);
  const pillY = useMotionValue(0);
  const smoothPillX = useSpring(pillX, { damping: 45, stiffness: 650 });
  const smoothPillY = useSpring(pillY, { damping: 45, stiffness: 650 });

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

  // Pause autoplay while the pointer is over the carousel or while dragging.
  const isPaused = pillDirection !== null || isDragging;

  useEffect(() => {
    if (length <= 1 || isPaused) return;

    const timer = window.setTimeout(goToNext, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [length, normalizedIndex, isPaused, goToNext]);

  const getPosition = (index: number) => {
    const half = Math.floor(length / 2);
    let diff = (index - normalizedIndex) % length;

    if (diff < -half) diff += length;
    if (diff > half) diff -= length;

    return diff;
  };

  /*
   * Works out what is under the pointer using the FINAL, fixed layout of the
   * three visible slots (left / centre / right), not the on-screen position of
   * cards that may still be mid-animation. This is what keeps the pill (and
   * click direction) correct during and right after a slide.
   *
   * The side offset is read from the same CSS variable that positions the
   * cards, so CSS stays the single source of truth for desktop vs mobile.
   */
  const hitTest = (clientX: number, clientY: number) => {
    const stage = stageRef.current;
    const slot = slotRef.current;
    if (!stage || !slot || length <= 1) return null;

    const rect = stage.getBoundingClientRect();
    const cardW = slot.offsetWidth; // layout size, unaffected by transforms
    const cardH = slot.offsetHeight;
    const sideOffset =
      (parseFloat(
        getComputedStyle(stage).getPropertyValue('--carousel-offset')
      ) || 100) / 100;

    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Centre (active) card: left half = previous, right half = next.
    if (Math.abs(dx) <= cardW / 2 && Math.abs(dy) <= cardH / 2) {
      return { zone: 'center' as const, direction: (dx < 0 ? 'prev' : 'next') as Direction, x, y };
    }

    // Cards sitting behind the active one.
    const sideHalfW = (cardW * SIDE_SCALE) / 2;
    const sideHalfH = (cardH * SIDE_SCALE) / 2;
    if (Math.abs(dy) <= sideHalfH) {
      const hasRight = items.some((_, i) => getPosition(i) === 1);
      const hasLeft = items.some((_, i) => getPosition(i) === -1);

      if (hasRight && Math.abs(dx - cardW * sideOffset) <= sideHalfW) {
        return { zone: 'side' as const, direction: 'next' as Direction, x, y };
      }
      if (hasLeft && Math.abs(dx + cardW * sideOffset) <= sideHalfW) {
        return { zone: 'side' as const, direction: 'prev' as Direction, x, y };
      }
    }

    return null;
  };

  const updatePill = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop() || isDragging) {
      setPillDirection(null);
      return;
    }

    const hit = hitTest(event.clientX, event.clientY);
    if (!hit) {
      setPillDirection(null);
      return;
    }

    // Appearing from hidden: snap to the pointer instead of flying in from
    // wherever the pill was last seen.
    if (pillDirection === null) {
      smoothPillX.jump(hit.x);
      smoothPillY.jump(hit.y);
    }
    pillX.set(hit.x);
    pillY.set(hit.y);
    setPillDirection(hit.direction);
  };

  const handleStageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (didDragRef.current) return;

    // Never hijack links, buttons or anything marked to be ignored.
    const target = event.target as HTMLElement;
    if (
      target.closest('a, button, input, textarea, select, [data-carousel-ignore]')
    ) {
      return;
    }

    const hit = hitTest(event.clientX, event.clientY);
    if (!hit) return;

    // Mobile: tapping the centre card does nothing, tapping a card behind it
    // brings it forward. Desktop: the pill's direction decides.
    if (!isDesktop() && hit.zone === 'center') return;

    if (hit.direction === 'prev') goToPrevious();
    else goToNext();
  };

  const handleDragStart = () => {
    didDragRef.current = false;
    setIsDragging(true);
    setPillDirection(null);
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  if (length === 0) return null;

  return (
    <div
      // On mobile the section has 24px side padding. Bleed out of it so the
      // cards behind the active one can peek in from the screen edges.
      className={`relative -mx-6 overflow-hidden py-12 outline-none md:mx-0 ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={stageRef}
        // --carousel-offset = how far (as % of card width) the cards behind
        // the active one are pushed sideways. Smaller on mobile so they tuck
        // in behind the active card and peek out at the edges.
        className={`relative flex h-[480px] w-full items-center justify-center [--carousel-offset:95%] md:h-[550px] md:[--carousel-offset:105%] ${
          pillDirection !== null ? 'md:cursor-none' : ''
        }`}
        onMouseEnter={updatePill}
        onMouseMove={updatePill}
        onMouseLeave={() => setPillDirection(null)}
        onClick={handleStageClick}
      >
        {items.map((item, index) => {
          const position = getPosition(index);
          const isCenter = position === 0;
          const isSide = Math.abs(position) === 1;

          // Position is expressed in CSS (not JS) so mobile / desktop can use
          // different offsets without a re-render flash after hydration.
          let offsetMultiplier = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 20;

          if (isSide) {
            offsetMultiplier = position;
            scale = SIDE_SCALE;
            opacity = 0.5;
            zIndex = 10;
          } else if (!isCenter) {
            offsetMultiplier = position > 0 ? 2 : -2;
            scale = 0.7;
            opacity = 0;
            zIndex = 0;
          }

          const key =
            isValidElement(item) && item.key != null ? item.key : index;

          return (
            <div
              key={key}
              ref={index === 0 ? slotRef : undefined}
              data-carousel-slot
              data-position={position}
              aria-hidden={!isCenter}
              className="absolute h-full w-[76vw] max-w-[380px] will-change-transform motion-reduce:transition-none md:w-[420px] md:max-w-none"
              style={{
                transform: `translateX(calc(var(--carousel-offset) * ${offsetMultiplier})) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: isSide || isCenter ? 'auto' : 'none',
                transition: `transform ${SLIDE_MS}ms cubic-bezier(0.32, 0.72, 0, 1), opacity ${SLIDE_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`,
              }}
            >
              <motion.div
                drag={isCenter && length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                className="relative h-full w-full"
              >
                {item}
              </motion.div>
            </div>
          );
        })}

        {/* The single Next / Prev pill (desktop only). */}
        {length > 1 && (
          <motion.div
            style={{ left: smoothPillX, top: smoothPillY }}
            initial={false}
            animate={{
              opacity: pillDirection !== null && !isDragging ? 1 : 0,
              scale: pillDirection !== null && !isDragging ? 1 : 0.92,
            }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="pointer-events-none absolute z-40 hidden h-9 w-[86px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-terracotta px-3 text-[11px] font-semibold tracking-tight text-white shadow-[0_6px_16px_rgba(200,80,26,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] md:flex"
            aria-hidden="true"
          >
            {pillDirection === 'prev' ? '← Prev' : 'Next →'}
          </motion.div>
        )}
      </div>
    </div>
  );
}