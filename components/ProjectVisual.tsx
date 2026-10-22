import Image from "next/image";
import { Sparkles } from "lucide-react";
import type { Project, ProjectAccent } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const accentBackground: Record<ProjectAccent, string> = {
  violet: "bg-gradient-to-br from-violet-500/20 via-card-muted to-sky-500/10",
  blue: "bg-gradient-to-br from-sky-500/20 via-card-muted to-blue-600/10",
  cyan: "bg-gradient-to-br from-cyan-500/15 via-card-muted to-emerald-500/10",
  indigo: "bg-gradient-to-br from-indigo-500/20 via-card-muted to-fuchsia-500/10",
};

type ProjectVisualProps = {
  project: Project;
  className?: string;
  size?: "card" | "detail";
};

export default function ProjectVisual({
  project,
  className,
  size = "card",
}: ProjectVisualProps) {
  if (project.image) {
    return (
      <div
        className={cn("relative aspect-[16/10] w-full overflow-hidden bg-card-muted", className)}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={project.imageAlt}
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden",
        accentBackground[project.accent],
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-70 mask-fade" aria-hidden="true" />
      <div
        className="absolute -bottom-16 -left-10 size-48 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-10 -top-16 size-44 rounded-full bg-accent-blue/15 blur-3xl"
        aria-hidden="true"
      />

      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center p-5 sm:p-7",
          size === "detail" && "sm:p-10",
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            "w-full",
            size === "detail" ? "max-w-[460px]" : "max-w-[340px]",
          )}
        >
          {project.slug === "rokomari-clone" ? <StorefrontMock /> : null}
          {project.slug === "linkedin-post-agent" ? <PostMock /> : null}
          {project.slug === "heart-disease-prediction-api" ? <ApiMock /> : null}
          {project.slug === "deepfake-synthetic-media-detection" ? <ForensicsMock /> : null}
        </div>
      </div>
    </div>
  );
}

function StorefrontMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-background/90 shadow-2xl shadow-black/20 backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-1.5 rounded-full bg-red-400/70" />
        <span className="size-1.5 rounded-full bg-amber-400/70" />
        <span className="size-1.5 rounded-full bg-emerald-400/70" />
        <div className="ml-2 flex h-4 flex-1 items-center rounded-full border border-line bg-card-muted px-2">
          <span className="h-1 w-16 rounded-full bg-line" />
        </div>
      </div>

      <div className="flex gap-3 p-3">
        <div className="hidden w-14 shrink-0 space-y-1.5 border-r border-line pr-2.5 sm:block">
          <div className="h-1.5 w-full rounded-full bg-accent/60" />
          <div className="h-1 w-4/5 rounded-full bg-line" />
          <div className="h-1 w-3/5 rounded-full bg-line" />
          <div className="h-1 w-4/5 rounded-full bg-line" />
          <div className="h-1 w-2/3 rounded-full bg-line" />
          <div className="mt-3 h-8 rounded-md border border-accent/20 bg-accent/10" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="relative flex h-16 items-end rounded-lg border border-line bg-gradient-to-br from-violet-500/25 via-violet-500/10 to-sky-500/15 p-2.5">
            <div className="space-y-1">
              <div className="h-1.5 w-24 rounded-full bg-foreground/50" />
              <div className="h-1 w-16 rounded-full bg-foreground/20" />
            </div>
            <span className="absolute right-2 top-2 rounded-full border border-line bg-background/70 px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-[0.14em] text-muted">
              shop
            </span>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-md border border-line bg-card p-1.5">
                <div className="relative h-8 rounded bg-card-muted">
                  <div className="absolute inset-x-1.5 bottom-1 h-4 rounded-sm bg-gradient-to-r from-violet-500/30 to-sky-500/20" />
                </div>
                <div className="mt-1 h-1 w-3/4 rounded-full bg-line" />
                <div className="mt-0.5 h-1 w-1/2 rounded-full bg-line/70" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PostMock() {
  return (
    <div className="w-full -rotate-1 rounded-xl border border-line bg-background/95 p-3.5 shadow-2xl shadow-black/20 backdrop-blur">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white">
            <Sparkles className="size-3" />
          </span>
          <div>
            <div className="h-1.5 w-16 rounded-full bg-foreground/40" />
            <div className="mt-1 h-1 w-10 rounded-full bg-line" />
          </div>
        </div>
        <span className="rounded-full border border-line bg-card-muted px-2 py-0.5 font-mono text-[6px] uppercase tracking-[0.14em] text-muted">
          tone: clear
        </span>
      </div>

      <div className="mt-3 rounded-lg border border-line bg-card p-3">
        <div className="font-mono text-[7px] uppercase tracking-[0.16em] text-accent">Hook</div>
        <div className="mt-1.5 h-1.5 w-11/12 rounded-full bg-foreground/50" />
        <div className="mt-1 h-1.5 w-3/5 rounded-full bg-foreground/50" />

        <div className="mt-3 font-mono text-[7px] uppercase tracking-[0.16em] text-accent">
          Value
        </div>
        <div className="mt-1.5 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="size-1 rounded-full bg-accent" />
            <div className="h-1 w-4/5 rounded-full bg-line" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-1 rounded-full bg-accent" />
            <div className="h-1 w-3/5 rounded-full bg-line" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-1 rounded-full bg-accent" />
            <div className="h-1 w-11/12 rounded-full bg-line" />
          </div>
        </div>

        <div className="mt-3 inline-flex rounded-full border border-accent/20 bg-accent/10 px-2 py-1 font-mono text-[6px] uppercase tracking-[0.12em] text-accent">
          Call to action
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1.5 font-mono text-[6px] uppercase tracking-[0.12em] text-muted">
        <span className="size-1 rounded-full bg-emerald-400" />
        structured draft
      </div>
    </div>
  );
}

function ApiMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-background/95 shadow-2xl shadow-black/20 backdrop-blur">
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-red-400/70" />
          <span className="size-1.5 rounded-full bg-amber-400/70" />
          <span className="size-1.5 rounded-full bg-emerald-400/70" />
        </div>
        <span className="font-mono text-[7px] tracking-wide text-muted">
          heart-disease-api
        </span>
      </div>

      <div className="p-3 font-mono text-[8px] leading-relaxed">
        <div className="flex items-center gap-1.5 text-muted">
          <span className="text-emerald-700 dark:text-emerald-400">$</span>
          <span>curl -X POST /predict</span>
        </div>

        <div className="mt-2 rounded-md border border-line bg-card p-2.5">
          <span className="text-muted">200 OK</span>
          <span className="mx-1.5 text-line">·</span>
          <span className="text-emerald-700 dark:text-emerald-400">validated</span>
          <div className="mt-1.5 text-foreground/80">{"{"}</div>
          <div className="pl-3 text-cyan-700 dark:text-cyan-300">
            &quot;probability&quot;: <span className="text-muted">&lt;model output&gt;</span>
          </div>
          <div className="text-foreground/80">{"}"}</div>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {["/health", "/info", "/predict"].map((endpoint, index) => (
            <div
              key={endpoint}
              className="flex items-center justify-center gap-1 rounded border border-line bg-card px-1.5 py-1 text-[6px] text-muted"
            >
              <span
                className={cn(
                  "size-1 rounded-full",
                  index === 2 ? "bg-cyan-400" : "bg-emerald-400",
                )}
              />
              {endpoint}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ForensicsMock() {
  return (
    <div className="grid w-full grid-cols-[1.05fr_0.95fr] gap-2.5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-background/80">
        <div className="absolute inset-0 bg-grid opacity-50" />

        <svg
          viewBox="0 0 100 120"
          fill="none"
          stroke="currentColor"
          className="absolute inset-0 h-full w-full p-4 text-accent/70"
        >
          <ellipse cx="50" cy="41" rx="22" ry="28" strokeWidth="0.8" />
          <path d="M31 35c4-15 34-15 38 0" strokeWidth="0.6" opacity="0.65" />
          <circle cx="42" cy="41" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="58" cy="41" r="1.4" fill="currentColor" stroke="none" />
          <path d="M50 43v11l-3.5 2.5h7" strokeWidth="0.6" />
          <path d="M43 60c4 3 10 3 14 0" strokeWidth="0.6" />
          <path d="M50 70v13M27 111c3-17 12-24 23-24s20 7 23 24" strokeWidth="0.7" />
          <path d="M20 25h8M20 25v8M80 25h-8M80 25v8M20 95h8M20 95v-8M80 95h-8M80 95v-8" strokeWidth="0.8" />
          <path d="M22 53h12M66 53h12M22 71h8M70 71h8" strokeWidth="0.5" opacity="0.6" />
        </svg>

        <div className="absolute inset-x-3 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
        <span className="absolute inset-x-0 bottom-2 text-center font-mono text-[6px] uppercase tracking-[0.2em] text-muted">
          multimodal scan
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="rounded-md border border-line bg-background/80 p-2">
          <div className="font-mono text-[6px] uppercase tracking-[0.16em] text-accent">
            artifact map
          </div>
          <div className="mt-1.5 space-y-1">
            <div className="h-1 w-full rounded-full bg-line" />
            <div className="h-1 w-2/3 rounded-full bg-line" />
          </div>
        </div>

        {[
          { label: "visual", width: "w-4/5", color: "bg-indigo-400" },
          { label: "audio", width: "w-3/5", color: "bg-fuchsia-400" },
          { label: "metadata", width: "w-2/3", color: "bg-sky-400" },
        ].map((row) => (
          <div
            key={row.label}
            className="rounded-md border border-line bg-background/80 px-2 py-1.5"
          >
            <div className="flex items-center justify-between font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
              <span>{row.label}</span>
              <span className={cn("size-1 rounded-full", row.color)} />
            </div>
            <div className="mt-1 h-1 rounded-full bg-line">
              <div className={cn("h-full rounded-full", row.color, row.width, "opacity-70")} />
            </div>
          </div>
        ))}

        <div className="rounded-md border border-dashed border-accent/30 bg-accent/5 p-2">
          <div className="font-mono text-[6px] uppercase tracking-[0.14em] text-accent">
            unified framework
          </div>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-accent/60" />
            <span className="h-px flex-1 bg-accent/30" />
            <span className="size-1.5 rounded-full bg-accent/60" />
            <span className="h-px flex-1 bg-accent/30" />
            <span className="size-1.5 rounded-full bg-accent/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
