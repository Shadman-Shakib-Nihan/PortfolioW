"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { profile, projects } from "@/data/portfolio";
import { GithubIcon } from "./BrandIcons";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

const SCROLL_DURATION_MS = 750;
const WHEEL_STEP_INTERVAL_MS = 850;

const scrollAnimations = new WeakMap<HTMLDivElement, number>();

function easeInOutCubic(progress: number) {
  return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
}

function scrollProjectsBy(track: HTMLDivElement, direction: -1 | 1) {
  const firstSlide = track.querySelector<HTMLElement>("[data-project-slide]");

  if (!firstSlide) return;

  const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");
  const distance = firstSlide.getBoundingClientRect().width + gap;
  const maxScroll = track.scrollWidth - track.clientWidth;
  const from = track.scrollLeft;
  const to = Math.max(0, Math.min(maxScroll, from + direction * distance));

  if (Math.abs(to - from) < 1) return;

  const runningAnimation = scrollAnimations.get(track);

  if (runningAnimation !== undefined) {
    cancelAnimationFrame(runningAnimation);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    track.scrollLeft = to;
    scrollAnimations.delete(track);
    return;
  }

  const startedAt = performance.now();
  track.style.scrollSnapType = "none";

  function finish() {
    track.scrollLeft = to;
    track.style.scrollSnapType = "";
    scrollAnimations.delete(track);
  }

  function animate(now: number) {
    const progress = Math.min(1, (now - startedAt) / SCROLL_DURATION_MS);
    track.scrollLeft = from + (to - from) * easeInOutCubic(progress);

    if (progress < 1) {
      scrollAnimations.set(track, requestAnimationFrame(animate));
      return;
    }

    finish();
  }

  scrollAnimations.set(track, requestAnimationFrame(animate));
}

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    setCanScrollLeft(track.scrollLeft > 4);
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);

    return () => observer.disconnect();
  }, [updateScrollState]);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const carousel = track;
    let nextStepAt = 0;

    function onWheel(event: WheelEvent) {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (event.deltaY === 0) return;

      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      if (maxScroll <= 0) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const atEnd = carousel.scrollLeft >= maxScroll - 1;
      const atStart = carousel.scrollLeft <= 1;

      if ((direction === 1 && atEnd) || (direction === -1 && atStart)) return;

      event.preventDefault();

      const now = Date.now();

      if (now < nextStepAt) return;

      nextStepAt = now + WHEEL_STEP_INTERVAL_MS;
      scrollProjectsBy(carousel, direction);
    }

    carousel.addEventListener("wheel", onWheel, { passive: false });

    return () => carousel.removeEventListener("wheel", onWheel);
  }, []);

  function scrollProjects(direction: -1 | 1) {
    const track = trackRef.current;

    if (!track) return;

    scrollProjectsBy(track, direction);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    scrollProjects(event.key === "ArrowLeft" ? -1 : 1);
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative border-t border-line/70 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden="true"
      />
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured projects"
            title="Selected work, built end to end."
            headingId="projects-heading"
            description="Full-stack products, machine learning services, AI tooling, and academic research — each with the reasoning behind it."
          />

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-end">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-card/60 px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-foreground"
            >
              <GithubIcon className="size-3.5" />
              More on GitHub
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollProjects(-1)}
                disabled={!canScrollLeft}
                aria-label="Previous projects"
                className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-card/60 text-muted transition-colors hover:border-accent/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollProjects(1)}
                disabled={!canScrollRight}
                aria-label="Next projects"
                className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-card/60 text-muted transition-colors hover:border-accent/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          tabIndex={0}
          onScroll={updateScrollState}
          onKeyDown={handleKeyDown}
          className="project-track mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 pt-1 lg:mt-14 lg:gap-6"
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              data-project-slide
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${projects.length}: ${project.title}`}
              className="w-[86%] shrink-0 snap-start sm:w-[70%] md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-1.5rem)/2)]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-card/50 p-5 sm:flex-row sm:items-center md:px-6">
          <p className="text-sm text-muted">
            Scroll down to move right, up to move left, or swipe through all {projects.length}{" "}
            projects. More work lives on GitHub.
          </p>
          <Link
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            Let&apos;s work together
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
