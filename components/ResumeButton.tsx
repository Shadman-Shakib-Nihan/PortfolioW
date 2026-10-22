"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, FileWarning, Loader2, Mail, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { profile, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ResumeButtonProps = {
  variant?: "primary" | "secondary" | "nav";
  label?: string;
  className?: string;
};

const variantStyles = {
  primary:
    "h-12 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90",
  secondary:
    "h-12 rounded-full border border-line bg-card/60 px-6 text-sm font-medium text-foreground hover:border-accent/40 hover:bg-card-muted",
  nav: "h-9 rounded-full border border-line bg-card/70 px-3.5 text-xs font-medium text-foreground hover:border-accent/40 hover:bg-card-muted",
};

export default function ResumeButton({
  variant = "primary",
  label = "Resume",
  className,
}: ResumeButtonProps) {
  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  function closeDialog() {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.setTimeout(() => triggerRef.current?.focus(), 0);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  async function handleDownload() {
    if (checking) return;
    setChecking(true);

    try {
      const response = await fetch(siteConfig.resumePath, {
        method: "HEAD",
        cache: "no-store",
      });
      const contentType = response.headers.get("content-type") ?? "";
      const isPdf = response.ok && !contentType.includes("text/html");

      if (isPdf) {
        const link = document.createElement("a");
        link.href = siteConfig.resumePath;
        link.download = siteConfig.resumeFileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    } finally {
      setChecking(false);
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleDownload}
        disabled={checking}
        aria-busy={checking}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-colors disabled:cursor-wait disabled:opacity-70",
          variantStyles[variant],
          className,
        )}
      >
        {checking ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Download
            className={cn(variant === "nav" ? "size-3.5" : "size-4")}
            aria-hidden="true"
          />
        )}
        {label}
      </button>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={closeDialog}
                    aria-hidden="true"
                  />

                  <motion.div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="resume-dialog-title"
                    aria-describedby="resume-dialog-description"
                    className="relative w-full max-w-md rounded-2xl border border-line bg-card p-6 shadow-2xl sm:p-7"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={closeDialog}
                      className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-line bg-background/60 text-muted transition-colors hover:text-foreground"
                      aria-label="Close dialog"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>

                    <span className="grid size-11 place-items-center rounded-xl border border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-300">
                      <FileWarning className="size-5" aria-hidden="true" />
                    </span>

                    <h2
                      id="resume-dialog-title"
                      className="mt-5 pr-8 text-xl font-medium tracking-tight"
                    >
                      Resume not uploaded yet
                    </h2>
                    <p
                      id="resume-dialog-description"
                      className="mt-2 text-sm leading-relaxed text-muted"
                    >
                      The PDF hasn&apos;t been added to this site yet. Email me at{" "}
                      <span className="break-all text-foreground">{profile.email}</span> and
                      I&apos;ll send the latest version directly.
                    </p>

                    <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                      <a
                        href={`mailto:${profile.email}?subject=Resume%20request`}
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                      >
                        <Mail className="size-4" aria-hidden="true" />
                        Email me
                      </a>
                      <button
                        type="button"
                        onClick={closeDialog}
                        className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-line bg-background/50 px-5 text-sm font-medium text-foreground transition-colors hover:bg-card-muted"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
