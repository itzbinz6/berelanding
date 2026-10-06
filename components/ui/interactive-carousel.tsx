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
  /** Background the carousel sits on. Controls the neumorphic dot shading. */
  tone?: 'light' | 'dark';
}

const SLIDE_MS = 600;
const AUTOPLAY_MS = 7000;
const SWIPE_DISTANCE = 50;
const SWIPE_VELOCITY = 500;
// Grace period when the pointer crosses the gap between two cards, so the
// pill glides across instead of vanishing and reappearing.
const HIDE_DELAY_MS = 160;

// Scale of the cards sitting behind the active one.
const SIDE_SCALE = 0.85;

/*
 * Neumorphic dot styles (classes written out in full so Tailwind sees them).
 * - Inactive: a soft inset "well".
 * - Active: a raised terracotta pill (same accent as the CTA button).
 */
const DOT_INACTIVE = {
  light:
    'bg-stone-200 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(255,255,255,0.95)] group-hover:bg-stone-300',
  dark:
    'bg-stone-900 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(255,255,255,0.07)] group-hover:bg-stone-800',
} as const;

const DOT_ACTIVE_SHADOW = {
  light:
    'shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),inset_-1px_-1px_2px_rgba(0,0,0,0.25),1px_2px_6px_rgba(0,0,0,0.22)]',
  dark:
    'shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.35),0_2px_8px_rgba(0,0,0,0.6)]',
} as const;

/*
 * Neumorphic Prev/Next pill: raised by default (light edge top-left, soft
 * shadow bottom-right), pressed in while the mouse button is held.
 */
const PILL_SHADOW = {
  light: {
    raised:
      'shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),5px_6px_14px_rgba(0,0,0,0.28),inset_1px_1px_2px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.2)]',
    pressed:
      'shadow-[inset_3px_3px_6px_rgba(0,0,0,0.35),inset_-2px_-2px_5px_rgba(255,255,255,0.25)]',
  },
  dark: {
    raised:
      'shadow-[-3px_-3px_8px_rgba(255,255,255,0.08),5px_6px_14px_rgba(0,0,0,0.7),inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-2px_-2px_4px_rgba(0,0,0,0.3)]',
    pressed:
      'shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.12)]',
  },
} as const;

export function InteractiveCarousel({
  children,
  className = '',
  tone = 'light',
}: InteractiveCarouselProps) {
  const items = Children.toArray(children);
  const length = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [cursorDirection, setCursorDirection] = useState<'prev' | 'next'>('next');


  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const didDragRef = useRef(false);
  const hoverRef = useRef(false); // mirrors isCardHovered for use in callbacks
  const hideTimerRef = useRef<number | null>(null);

  // Pill position is stored relative to the stage.
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { damping: 28, stiffness: 420 });
  const smoothCursorY = useSpring(cursorY, { damping: 28, stiffness: 420 });

  /*
   * Desktop = wide screen AND a real mouse. Touch devices never get the pill.
   */
  const isDesktop = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)')
      .matches;

  const goToPrevious = useCallback(() => {
    if (length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  const goToNext = useCallback(() => {
    if (length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % length);
  }, [length]);

<<<<<<< HEAD
  useEffect(() => {
    if (length > 0 && currentIndex >= length) setCurrentIndex(0);
  }, [length, currentIndex]);

  const getPosition = (index: number) => {
    const half = Math.floor(length / 2);
    let diff = (index - normalizedIndex) % length;

    if (diff < -half) diff += length;
    if (diff > half) diff -= length;

    return diff;
  };

  /*
   * Autoplay: restarts after every change, paused while hovering/dragging.
   */
  const isPaused = isCardHovered || isDragging;

  useEffect(() => {
    if (length <= 1 || isPaused) return;

    const timer = window.setTimeout(goToNext, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [length, currentIndex, isPaused, goToNext]);

  /* -------------------------------------------------------------------- *
   * Hover tracking (one pill for the whole carousel)
   *
   * Instead of per-card mouse handlers, we look at where the pointer is and
   * work out which visible card (active, previous or next) is under it. That
   * lets the pill follow the pointer from the active card onto a neighbour
   * without anything having to be re-entered or repositioned, and it stays
   * correct while cards are sliding underneath a stationary pointer.
   * -------------------------------------------------------------------- */
  const clearHideTimer = () => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const hideHover = () => {
    clearHideTimer();
    hoverRef.current = false;
    setIsCardHovered(false);
  };

  /*
   * Works out what is under the pointer from the FINAL, fixed layout of the
   * three visible slots (previous / active / next), never from the on-screen
   * rect of a card that is still sliding. That is what stops the pill from
   * flashing "Prev" (or sticking to the card that just moved away) right
   * after a click, and it keeps click direction correct during an animation.
   *
   * The side offset is read from the same CSS variable that positions the
   * cards, so CSS stays the single source of truth for mobile vs desktop.
   */
  const hitTest = (px: number, py: number) => {
    const stage = stageRef.current;
    const ref = cardRefs.current[0];
    if (!stage || !ref || length <= 1) return null;

    const stageRect = stage.getBoundingClientRect();
    const cardW = ref.offsetWidth; // layout width, unaffected by transforms
    const cardH = stageRect.height;
    const sideOffset =
      (parseFloat(
        getComputedStyle(stage).getPropertyValue('--carousel-offset'),
      ) || 100) / 100;

    const dx = px - (stageRect.left + stageRect.width / 2);
    const dy = py - (stageRect.top + stageRect.height / 2);
    const x = px - stageRect.left;
    const y = py - stageRect.top;

    // Active card: left half = prev, right half = next.
    if (Math.abs(dx) <= cardW / 2 && Math.abs(dy) <= cardH / 2) {
      return {
        zone: 'center' as const,
        direction: (dx < 0 ? 'prev' : 'next') as 'prev' | 'next',
        x,
        y,
      };
    }

    // Cards behind the active one: left one = prev, right one = next.
    const sideHalfW = (cardW * SIDE_SCALE) / 2;
    const sideHalfH = (cardH * SIDE_SCALE) / 2;
    if (Math.abs(dy) <= sideHalfH) {
      const hasRight = items.some((_, i) => getPosition(i) === 1);
      const hasLeft = items.some((_, i) => getPosition(i) === -1);

      if (hasRight && Math.abs(dx - cardW * sideOffset) <= sideHalfW) {
        return { zone: 'side' as const, direction: 'next' as const, x, y };
      }
      if (hasLeft && Math.abs(dx + cardW * sideOffset) <= sideHalfW) {
        return { zone: 'side' as const, direction: 'prev' as const, x, y };
      }
    }

    return null;
  };

  const syncHover = () => {
    const stage = stageRef.current;
    if (!stage || length <= 1 || !isDesktop()) return;

    const { x: px, y: py } = lastPointerRef.current;
    const hit = hitTest(px, py);

    if (hit) {
      cursorX.set(hit.x);
      cursorY.set(hit.y);

      // First appearance: snap to the pointer instead of flying in.
      if (!hoverRef.current) {
        smoothCursorX.jump(hit.x);
        smoothCursorY.jump(hit.y);
      }

      setCursorDirection(hit.direction);

      clearHideTimer();
      hoverRef.current = true;
      setIsCardHovered(true);
      return;
    }

    // Not over any card (e.g. in the gap between two): hide after a short
    // grace period so crossing the gap doesn't flicker.
    if (hoverRef.current && hideTimerRef.current === null) {
      hideTimerRef.current = window.setTimeout(() => {
        hideTimerRef.current = null;
        hoverRef.current = false;
        setIsCardHovered(false);
      }, HIDE_DELAY_MS);
    }
  };

  // Always call the latest closure (it captures the current index/items).
  const syncRef = useRef(syncHover);
  syncRef.current = syncHover;

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      syncRef.current();
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (hideTimerRef.current !== null) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  /*
   * Drag / swipe.
   */
  const handleDragStart = () => {
    didDragRef.current = false;
    setIsDragging(true);
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

    const { offset, velocity } = info;

    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) {
      goToNext();
    } else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) {
      goToPrevious();
    }

    window.setTimeout(() => {
      didDragRef.current = false;
    }, 0);
  };

  /*
   * Click handling, decided from the pointer position against the fixed slot
   * layout (so it is right even while cards are still sliding).
   * - Card behind the active one: bring it forward (works on touch too).
   * - Active card (desktop): left half = prev, right half = next.
   * - Clicks on links/buttons/inputs inside the active card are left alone.
   */
  const handleStageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (didDragRef.current) return;

    const hit = hitTest(event.clientX, event.clientY);
    if (!hit) return;

    if (hit.zone === 'center') {
      if (!isDesktop()) return;

      const target = event.target as HTMLElement;
      if (
        target.closest('a, button, input, textarea, select, [data-carousel-ignore]')
      ) {
        return;
      }
    }

    if (hit.direction === 'prev') goToPrevious();
    else goToNext();
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

  const showPill = isCardHovered && !isDragging;

  return (
    <div
      // On mobile, break out of the section's side padding so the cards behind
      // the active one can peek in from the screen edges.
      className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden pb-8 pt-12 outline-none md:left-0 md:w-full md:translate-x-0 ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/*
        * Grid stack: every card sits in the same grid cell, so the stage is as
        * tall as the tallest card and nothing is clipped on small screens.
        */}
      <div
        ref={stageRef}
        onMouseLeave={() => {
          hideHover();
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        // --carousel-offset = how far (as % of card width) the cards behind the
        // active one are pushed sideways. Smaller on mobile so they tuck in
        // behind the active card and peek out at the edges.
        onClick={handleStageClick}
        className="relative grid min-h-[480px] w-full justify-items-center [--carousel-offset:95%] md:min-h-[550px] md:[--carousel-offset:105%]"
      >
        {items.map((item, index) => {
          const position = getPosition(index);
          const isCenter = position === 0;
          const isVisible = Math.abs(position) <= 1;

          let offsetMultiplier = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 10;

          if (position === 0) {
            zIndex = 20;
          } else if (position === 1 || position === -1) {
            offsetMultiplier = position;
            scale = SIDE_SCALE;
            opacity = 0.5;
          } else {
            offsetMultiplier = position > 0 ? 2 : -2;
            scale = 0.7;
            opacity = 0;
            zIndex = 0;
          }

          const key = isValidElement(item) && item.key != null ? item.key : index;

          return (
            /*
             * Outer layer: positioning (x / scale / opacity).
             * Inner layer: drag.
             *
             * `data-active` + the named group lets any card style itself when
             * active, e.g. `group-data-[active=true]/slide:opacity-100`.
             */
            <div
              key={key}
              data-active={isCenter}
              data-position={position}
              className="group/slide relative col-start-1 row-start-1 w-[76vw] max-w-[380px] will-change-transform motion-reduce:transition-none md:w-[420px] md:max-w-none"
              style={{
                transform: `translateX(calc(var(--carousel-offset) * ${offsetMultiplier})) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: isVisible ? 'auto' : 'none',
                transition: `transform ${SLIDE_MS}ms cubic-bezier(0.32, 0.72, 0, 1), opacity ${SLIDE_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`,
              }}
              aria-hidden={!isCenter}
            >
              <motion.div
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                drag={isCenter && length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                className={`relative h-full w-full ${
                  isVisible && isCardHovered
                    ? 'md:cursor-none'
                    : isCenter
                      ? ''
                      : 'cursor-pointer'
                }`}
              >
                {item}
              </motion.div>
            </div>
          );
        })}

        {/*
          * Single Prev/Next pill, desktop only. Lives on the stage (not inside
          * a card) so it can follow the pointer across the active card and
          * onto its neighbours.
          */}
        {length > 1 && (
          <motion.div
            style={{ left: smoothCursorX, top: smoothCursorY, x: '-50%', y: '-50%' }}
            initial={false}
            animate={{ opacity: showPill ? 1 : 0, scale: showPill ? 1 : 0.9 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={`pointer-events-none absolute z-50 hidden h-9 w-[86px] items-center justify-center rounded-full border border-white/20 bg-terracotta text-[11px] font-semibold tracking-tight text-white transition-shadow duration-150 [text-shadow:0_1px_1px_rgba(0,0,0,0.25)] md:flex ${
              isPressed ? PILL_SHADOW[tone].pressed : PILL_SHADOW[tone].raised
            }`}
            aria-hidden="true"
          >
            {cursorDirection === 'next' ? 'Next →' : '← Prev'}
          </motion.div>
        )}
      </div>

      {/* Pagination dots: follow the active card, click to jump. */}
      {length > 1 && (
        <div
          className="mt-8 flex items-center justify-center"
          role="tablist"
          aria-label="Choose slide"
        >
          {items.map((_, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${index + 1} of ${length}`}
                onClick={() => setCurrentIndex(index)}
                className="group flex h-6 items-center px-1.5 outline-none"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ease-out group-focus-visible:ring-2 group-focus-visible:ring-terracotta/60 ${
                    isActive
                      ? `w-8 bg-terracotta ${DOT_ACTIVE_SHADOW[tone]}`
                      : `w-2.5 ${DOT_INACTIVE[tone]}`
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}