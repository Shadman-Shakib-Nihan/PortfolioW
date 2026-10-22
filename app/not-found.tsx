import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-40 mask-fade" />
        <div className="absolute left-1/2 top-1/3 size-80 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
      </div>

      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">404</p>
        <h1 className="mt-4 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
          The link may be broken, or the page may have moved. The work is still worth a look.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-card/60 px-5 text-sm font-medium transition-colors hover:border-accent/40 hover:bg-card-muted"
          >
            View projects
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
