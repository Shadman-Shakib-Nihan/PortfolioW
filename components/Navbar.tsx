"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, overflowLinks, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import ResumeButton from "./ResumeButton";
import SocialLinks from "./SocialLinks";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const currentActive = pathname === "/" ? active : "";
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionOrder = [
      "home",
      "about",
      "skills",
      "experience",
      "projects",
      "research",
      "gallery",
      "education",
      "certifications",
      "contact",
    ];

    const sections = sectionOrder
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateActive = () => {
      const marker = window.scrollY + window.innerHeight * 0.4;
      let current = sections[0]?.id ?? "home";

      for (const section of sections) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = section.id;
      }

      setActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("portfolio-menu-toggle", { detail: { open: true } }));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }, 120);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(new CustomEvent("portfolio-menu-toggle", { detail: { open: false } }));
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line/80 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${profile.name} — home`}
          >
            <span className="grid size-8 place-items-center rounded-full border border-line text-[10px] font-semibold tracking-[0.06em] transition-colors group-hover:border-accent/50 group-hover:text-accent">
              {profile.initials}
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[13px] font-medium tracking-[-0.01em]">{profile.name}</span>
              <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-muted">
                {profile.shortTitle}
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link, index) => {
              const isActive = currentActive === link.id;
              const href = pathname === "/" ? `#${link.id}` : `/#${link.id}`;

              return (
                <Link
                  key={link.id}
                  href={href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "group relative inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors",
                    isActive ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "text-[8px] tabular-nums transition-colors",
                      isActive ? "text-accent" : "text-muted/60",
                    )}
                  >
                    0{index + 1}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <ResumeButton variant="nav" className="hidden sm:inline-flex" />
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="group inline-flex h-9 items-center gap-2 rounded-full border border-line px-3.5 text-[10px] font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
              <span className="relative flex h-3 w-4 flex-col justify-between" aria-hidden="true">
                <span
                  className={cn(
                    "h-px w-full bg-current transition-transform duration-300",
                    open && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-full bg-current transition-opacity duration-300",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-full bg-current transition-transform duration-300",
                    open && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id="site-menu"
            data-lenis-prevent
            className="absolute inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line/70 bg-background md:top-[4.5rem] md:h-[calc(100dvh-4.5rem)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="container-page flex min-h-[calc(100dvh-4rem)] flex-col justify-between py-10 md:min-h-[calc(100dvh-4.5rem)]">
              <div>
                <p className="editorial-label">Menu</p>
                <nav aria-label="Site sections" className="mt-8">
                  <ul>
                    {navLinks.map((link, index) => {
                      const href = pathname === "/" ? `#${link.id}` : `/#${link.id}`;
                      const isActive = currentActive === link.id;

                      return (
                        <motion.li
                          key={link.id}
                          initial={{ opacity: 0, y: 22 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 + index * 0.045, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="border-b border-line/70"
                        >
                          <Link
                            href={href}
                            onClick={() => setOpen(false)}
                            aria-current={isActive ? "location" : undefined}
                            className="group flex items-baseline justify-between gap-4 py-4 md:py-5"
                          >
                            <span className="flex items-baseline gap-4 md:gap-6">
                              <span className="font-mono text-[10px] tabular-nums text-accent">
                                0{index + 1}
                              </span>
                              <span
                                className={cn(
                                  "text-[clamp(2rem,6vw,3.6rem)] font-medium leading-none tracking-[-0.04em] transition-colors",
                                  isActive ? "text-accent" : "text-foreground group-hover:text-accent",
                                )}
                              >
                                {link.label}
                              </span>
                            </span>
                            <ArrowUpRight
                              className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                              aria-hidden="true"
                            />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                  {overflowLinks.map((link) => {
                    const href = pathname === "/" ? `#${link.id}` : `/#${link.id}`;
                    return (
                      <Link
                        key={link.id}
                        href={href}
                        onClick={() => setOpen(false)}
                        className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-6 border-t border-line/70 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    Get in touch
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="link-underline mt-2 inline-block text-lg font-medium"
                  >
                    {profile.email}
                  </a>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {profile.location}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4 sm:items-end">
                  <SocialLinks />
                  <ResumeButton variant="secondary" label="Download resume" />
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
