"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  accent: boolean;
};

type Rgb = { r: number; g: number; b: number };

function toRgb(value: string, fallback: Rgb): Rgb {
  const hex = value.trim().replace("#", "");
  if (hex.length === 3) {
    return {
      r: Number.parseInt(hex[0] + hex[0], 16),
      g: Number.parseInt(hex[1] + hex[1], 16),
      b: Number.parseInt(hex[2] + hex[2], 16),
    };
  }
  if (hex.length >= 6) {
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) return { r, g, b };
  }
  return fallback;
}

export default function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = context;
    const canvasEl: HTMLCanvasElement = canvas;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    let particles: Particle[] = [];
    let ink: Rgb = { r: 150, g: 146, b: 130 };
    let accent: Rgb = { r: 188, g: 63, b: 16 };
    const pointer = { x: -9999, y: -9999, active: false };

    function readColors() {
      const styles = getComputedStyle(document.documentElement);
      ink = toRgb(styles.getPropertyValue("--foreground"), ink);
      accent = toRgb(styles.getPropertyValue("--accent"), accent);
    }

    function seed() {
      const count = Math.round(Math.min(96, Math.max(28, (width * height) / 18000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        radius: Math.random() * 1.4 + 0.5,
        accent: Math.random() > 0.82,
      }));
    }

    function resize() {
      const parent = canvasEl.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasEl.width = Math.round(width * dpr);
      canvasEl.height = Math.round(height * dpr);
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (prefersReduced) draw(false);
    }

    function draw(update: boolean) {
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        if (update) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < -24) particle.x = width + 24;
          if (particle.x > width + 24) particle.x = -24;
          if (particle.y < -24) particle.y = height + 24;
          if (particle.y > height + 24) particle.y = -24;

          if (pointer.active) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 150 && distance > 0.01) {
              const force = ((150 - distance) / 150) * 0.55;
              particle.x += (dx / distance) * force;
              particle.y += (dy / distance) * force;
            }
          }
        }
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > 126) continue;
          const alpha = (1 - distance / 126) * 0.16;
          ctx.strokeStyle = `rgba(${ink.r}, ${ink.g}, ${ink.b}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (pointer.active) {
        for (const particle of particles) {
          const distance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
          if (distance > 170) continue;
          const alpha = (1 - distance / 170) * 0.24;
          ctx.strokeStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      for (const particle of particles) {
        const color = particle.accent ? accent : ink;
        const alpha = particle.accent ? 0.55 : 0.42;
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function tick() {
      if (visible) draw(true);
      frame = requestAnimationFrame(tick);
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active =
        pointer.x > -40 && pointer.x < rect.width + 40 && pointer.y > -40 && pointer.y < rect.height + 40;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onThemeChange = () => {
      readColors();
      if (prefersReduced) draw(false);
    };

    const resizeObserver = new ResizeObserver(resize);
    if (canvasEl.parentElement) resizeObserver.observe(canvasEl.parentElement);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "120px" },
    );
    intersectionObserver.observe(canvasEl);

    readColors();
    resize();

    if (!prefersReduced) {
      frame = requestAnimationFrame(tick);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }

    window.addEventListener("portfolio-theme-change", onThemeChange);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("portfolio-theme-change", onThemeChange);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
