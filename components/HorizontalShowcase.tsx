"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type ReactNode,
  type UIEvent,
} from "react";
import { cn } from "@/lib/utils";

type HorizontalShowcaseProps = {
  id: string;
  labelledBy: string;
  heading: ReactNode;
  children: ReactNode;
  total: number;
  itemLabel: string;
  trackLabel: string;
  className?: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function HorizontalShowcase({
  id,
  labelledBy,
  heading,
  children,
  total,
  itemLabel,
  trackLabel,
  className,
}: HorizontalShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const progress = useMotionValue(0);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setPinned(query.matches && !reduceMotion);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, [reduceMotion]);

  useEffect(() => {
    if (!pinned) {
      x.set(0);
      progress.set(0);

      const frame = requestAnimationFrame(() => setActive(1));
      return () => cancelAnimationFrame(frame);
    }

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    track.scrollLeft = 0;
    let frame = 0;

    const update = () => {
      const maxDistance = Math.max(0, track.scrollWidth - window.innerWidth);
      setDistance((previous) =>
        Math.abs(previous - maxDistance) > 1 ? maxDistance : previous,
      );

      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      const nextProgress = clamp(-section.getBoundingClientRect().top / range, 0, 1);
      const nextActive = Math.min(
        total,
        Math.max(1, Math.round(nextProgress * (total - 1)) + 1),
      );

      x.set(-nextProgress * maxDistance);
      progress.set(nextProgress);
      setActive((previous) => (previous === nextActive ? previous : nextActive));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    schedule();

    const observer = new ResizeObserver(schedule);
    observer.observe(track);
    observer.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule).catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pinned, total, x, progress]);

  function handleTrackScroll(event: UIEvent<HTMLDivElement>) {
    if (pinned) return;

    const element = event.currentTarget;
    const maximum = element.scrollWidth - element.clientWidth;
    const nextProgress = maximum > 0 ? element.scrollLeft / maximum : 0;
    const nextActive = Math.min(
      total,
      Math.max(1, Math.round(nextProgress * (total - 1)) + 1),
    );

    progress.set(nextProgress);
    setActive((previous) => (previous === nextActive ? previous : nextActive));
  }

  function handleFocus(event: FocusEvent<HTMLDivElement>) {
    if (!pinned) return;

    const target = event.target as HTMLElement;
    if (!target.matches(":focus-visible")) return;

    const track = trackRef.current;
    const section = sectionRef.current;
    const slide = target.closest<HTMLElement>("[data-slide]");
    if (!track || !section || !slide) return;

    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-slide]"));
    const index = slides.indexOf(slide);
    if (index < 0 || total <= 1) return;

    const range = Math.max(0, section.offsetHeight - window.innerHeight);
    const top =
      section.getBoundingClientRect().top +
      window.scrollY +
      (index / (total - 1)) * range;

    window.scrollTo({ top, behavior: "instant" });
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative border-b border-line/70",
        !pinned && "py-24 md:py-32",
        className,
      )}
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div
        className={cn(
          pinned && "sticky top-0 flex h-[100svh] flex-col overflow-hidden",
          !pinned && "relative",
        )}
      >
        <div className={cn("shrink-0", pinned && "pt-24 md:pt-28")}>
          <div className="container-page">{heading}</div>
        </div>

        <div
          className={cn(
            "relative",
            pinned ? "flex min-h-0 flex-1 items-center py-6" : "mt-10 md:mt-12",
          )}
        >
          <motion.div
            ref={trackRef}
            style={pinned ? { x } : undefined}
            onScroll={handleTrackScroll}
            onFocus={handleFocus}
            tabIndex={pinned ? undefined : 0}
            role={pinned ? undefined : "group"}
            aria-label={pinned ? undefined : trackLabel}
            data-lenis-prevent={pinned ? undefined : true}
            className={cn(
              "flex snap-x snap-mandatory",
              pinned
                ? "showcase-gutter w-max items-center gap-5 will-change-transform md:gap-6 lg:gap-8"
                : "showcase-gutter no-scrollbar w-full items-start gap-4 overflow-x-auto pb-5 md:gap-6 lg:gap-8",
            )}
          >
            {children}
          </motion.div>
        </div>

        <div className={cn("shrink-0", pinned ? "pb-5 md:pb-6" : "mt-2")}>
          <div className="container-page">
            <div
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={active}
              aria-valuetext={`${active} of ${total}`}
              aria-label={`${itemLabel} progress`}
            >
              <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                <span>{itemLabel}</span>
                <span className="hidden sm:inline">
                  {pinned ? "Scroll to explore" : "Swipe or scroll to explore"}
                </span>
                <span className="tabular-nums text-accent">
                  {String(active).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-2.5 h-px w-full overflow-hidden bg-line" aria-hidden="true">
                <motion.div
                  className="h-full w-full origin-left bg-accent"
                  style={{ scaleX: progress }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
