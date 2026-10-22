"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, profile } from "@/data/portfolio";
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateActive = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
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

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }, 100);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line/80 bg-background/85 shadow-[0_8px_30px_-24px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-3 md:h-20">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex shrink-0 items-center gap-3 rounded-lg"
          >
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-lg border border-accent/30 bg-gradient-to-br from-violet-500/20 to-sky-500/20 text-[11px] font-semibold tracking-[0.08em] transition-colors group-hover:border-accent/50">
              {profile.initials}
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-medium tracking-tight">{profile.name}</span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/70">
                AI / ML Engineer
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = currentActive === link.id;
              const href = pathname === "/" ? `#${link.id}` : `/#${link.id}`;

              return (
                <Link
                  key={link.id}
                  href={href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-sm transition-colors",
                    isActive ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-accent to-transparent transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <ResumeButton variant="nav" className="hidden sm:inline-flex" />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-card/70 text-foreground transition-colors hover:border-accent/40 hover:bg-card-muted lg:hidden"
            >
              {open ? (
                <X className="size-4" aria-hidden="true" />
              ) : (
                <Menu className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-background/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="container-page pb-6 pt-2">
              <nav aria-label="Mobile" className="divide-y divide-line/70">
                {navLinks.map((link) => {
                  const href = pathname === "/" ? `#${link.id}` : `/#${link.id}`;
                  const isActive = currentActive === link.id;

                  return (
                    <Link
                      key={link.id}
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "flex items-center justify-between py-3.5 text-base transition-colors",
                        isActive ? "text-foreground" : "text-muted hover:text-foreground",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-accent/70">
                          0{navLinks.indexOf(link) + 1}
                        </span>
                        {link.label}
                      </span>
                      <ArrowUpRight className="size-4 text-muted" aria-hidden="true" />
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 flex flex-col gap-4">
                <ResumeButton
                  variant="secondary"
                  label="Download resume"
                  className="w-full"
                />
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-xs text-muted">
                    <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                    {profile.location}
                  </span>
                  <SocialLinks />
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
