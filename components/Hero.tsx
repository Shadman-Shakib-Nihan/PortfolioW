"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import ParticleField from "./ParticleField";
import ResumeButton from "./ResumeButton";
import { profile } from "@/data/portfolio";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const line: Variants = {
  hidden: { opacity: 0, y: "110%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const nameY = useTransform(scrollY, [0, 700], [0, 90]);
  const nameOpacity = useTransform(scrollY, [0, 520], [1, 0.25]);

  const animationProps = reduceMotion ? {} : { initial: "hidden", animate: "show" };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden border-b border-line/70 pt-24 md:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <ParticleField className="opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_35%,transparent_20%,var(--background)_92%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container-page flex min-h-[calc(100svh-6rem)] flex-col md:min-h-[calc(100svh-7rem)]">
        <motion.div
          variants={container}
          {...animationProps}
          className="flex items-center justify-between gap-4 border-b border-line/70 py-4 text-[10px] uppercase tracking-[0.22em] text-muted"
        >
          <motion.span variants={fade} className="font-mono">
            Portfolio — 2026
          </motion.span>
          <motion.span variants={fade} className="hidden font-mono sm:inline">
            {profile.shortTitle}
          </motion.span>
          <motion.span variants={fade} className="inline-flex items-center gap-1.5 font-mono">
            <MapPin className="size-3" aria-hidden="true" />
            {profile.location}
          </motion.span>
        </motion.div>

        <motion.div
          variants={container}
          {...animationProps}
          className="flex flex-1 flex-col justify-center py-14 md:py-16"
        >
          <motion.div variants={fade} className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/80">
              <span className="relative flex size-1.5" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              Available for work
            </span>
            <span className="hidden h-3 w-px bg-line sm:block" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {profile.shortTitle}
            </span>
          </motion.div>

          <motion.div
            style={reduceMotion ? undefined : { y: nameY, opacity: nameOpacity }}
            className="mt-6 origin-left"
          >
            <h1
              id="hero-heading"
              className="text-[clamp(3.5rem,13.5vw,11.5rem)] font-semibold leading-[0.8] tracking-[-0.06em]"
            >
              <span className="block overflow-hidden pb-1">
                <motion.span variants={line} {...animationProps} className="block">
                  Shadman
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span variants={line} {...animationProps} className="block">
                  <span className="serif-accent font-normal text-accent">Shakib</span>
                  <span className="text-accent">.</span>
                </motion.span>
              </span>
            </h1>
          </motion.div>

          <div className="mt-10 grid gap-8 border-t border-line/70 pt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <motion.p
              variants={fade}
              {...animationProps}
              className="max-w-2xl text-pretty text-[clamp(1.4rem,2.4vw,2.15rem)] leading-[1.16] tracking-[-0.03em] text-foreground"
            >
              Building <span className="serif-accent">intelligent software</span> for real-world
              problems.
            </motion.p>

            <motion.div variants={fade} {...animationProps}>
              <p className="max-w-md text-pretty text-sm leading-7 text-muted sm:text-[15px]">
                {profile.intro}
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <Link
                  href="#projects"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-white"
                >
                  View projects
                  <ArrowDownRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="#contact"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line px-6 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  Contact me
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <ResumeButton
                  variant="glow"
                  label="Download CV"
                  className="resume-glow"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={fade}
          {...animationProps}
          className="flex flex-col gap-3 border-t border-line/70 py-5 text-[10px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="font-mono">{profile.availability}</span>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono sm:inline">Core stack</span>
            <span className="font-mono normal-case tracking-normal text-foreground/70">
              Python · PyTorch · FastAPI · Next.js · Laravel
            </span>
          </div>
          <a
            href="#about"
            className="group inline-flex items-center gap-1.5 font-mono text-foreground/70 transition-colors hover:text-accent"
          >
            Scroll
            <ArrowDownRight
              className="size-3.5 animate-bounce"
              style={{ animationDuration: "2.4s" }}
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
