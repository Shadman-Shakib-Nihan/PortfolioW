"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const onHome = window.location.pathname === "/";
      const isHash = href.startsWith("#") || (href.startsWith("/#") && onHome);
      if (!isHash || !href.includes("#")) return;

      const hash = href.slice(href.indexOf("#") + 1);
      if (!hash) return;

      const section = document.getElementById(hash);
      if (!section) return;

      event.preventDefault();
      lenis.scrollTo(section, { offset: -84, duration: 1.2 });
      window.history.replaceState(null, "", `#${hash}`);
    };

    const onResize = () => lenis.resize();

    const onMenuToggle = (event: Event) => {
      const open = (event as CustomEvent<{ open: boolean }>).detail?.open;
      if (open) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    document.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    window.addEventListener("portfolio-menu-toggle", onMenuToggle);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("portfolio-menu-toggle", onMenuToggle);
      lenis.destroy();
    };
  }, []);

  return null;
}
