"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, BrainCircuit, Code2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/portfolio";
import ResumeButton from "./ResumeButton";
import SocialLinks from "./SocialLinks";

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const coreStack = ["Python", "PyTorch", "FastAPI", "Next.js", "Laravel"];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const animationProps = reduceMotion
    ? {}
    : ({ initial: "hidden", animate: "show" } as const);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pb-20 pt-12 sm:pt-16 md:pb-28 md:pt-20 lg:pb-32 lg:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid mask-fade opacity-60" />
        <div className="absolute -top-32 left-[6%] size-80 rounded-full bg-violet-600/20 blur-[110px] dark:bg-violet-600/25" />
        <div className="absolute right-[2%] top-20 size-96 rounded-full bg-sky-500/10 blur-[130px] dark:bg-sky-500/15" />
        <div className="absolute bottom-0 left-1/3 size-64 rounded-full bg-fuchsia-500/10 blur-[120px]" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">
          <motion.div variants={stagger} {...animationProps}>
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3 py-1.5 text-xs text-muted shadow-sm backdrop-blur">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {profile.availability}
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-7 font-mono text-[11px] uppercase tracking-[0.24em] text-accent"
            >
              {profile.name}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              id="hero-heading"
              className="mt-3 max-w-[19ch] text-balance text-[2.6rem] font-medium leading-[1.03] tracking-[-0.045em] sm:text-5xl md:text-6xl xl:text-[4.2rem]"
            >
              Building <span className="text-gradient">intelligent software</span> for real-world
              problems.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-sm font-medium leading-relaxed text-foreground/80"
            >
              {profile.title}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-pretty text-[15px] leading-7 text-muted sm:text-base"
            >
              {profile.intro}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="#projects"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Explore my projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <ResumeButton
                variant="secondary"
                label="Download resume"
                className="w-full sm:w-auto"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted"
            >
              <SocialLinks />
              <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 text-xs">
                <MapPin className="size-3.5" aria-hidden="true" />
                {profile.location}
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-5"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                Core stack
              </span>
              {coreStack.map((item) => (
                <span
                  key={item}
                  className="font-mono text-[11px] tracking-tight text-foreground/60"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            {...animationProps}
            className="relative mx-auto w-full max-w-[26rem] lg:max-w-none"
          >
            <div
              className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-tr from-violet-600/25 via-fuchsia-500/5 to-sky-500/25 blur-2xl"
              aria-hidden="true"
            />

            <div className="card-inset relative rounded-[2rem] border border-line bg-card/80 p-2.5 shadow-2xl shadow-black/20">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.55rem] bg-card-muted">
                <Image
                  src={profile.photo}
                  alt={profile.photoAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 430px, (min-width: 640px) 416px, 90vw"
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
                        AI · ML · Full-stack
                      </p>
                      <p className="mt-1.5 text-lg font-medium text-white">{profile.name}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] text-white/85 backdrop-blur">
                      <MapPin className="size-3" aria-hidden="true" />
                      Dhaka, BD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-float absolute -left-4 top-10 hidden items-center gap-2.5 rounded-xl border border-line bg-card/90 px-3 py-2 shadow-xl shadow-black/20 backdrop-blur sm:flex">
              <span className="grid size-7 place-items-center rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-300">
                <BrainCircuit className="size-3.5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-medium leading-tight">AI & vision</p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                  models + research
                </p>
              </div>
            </div>

            <div className="animate-float-slow absolute -bottom-4 -right-3 hidden items-center gap-2.5 rounded-xl border border-line bg-card/90 px-3 py-2 shadow-xl shadow-black/20 backdrop-blur md:flex">
              <span className="grid size-7 place-items-center rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-300">
                <Code2 className="size-3.5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-medium leading-tight">Full-stack systems</p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                  product delivery
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
