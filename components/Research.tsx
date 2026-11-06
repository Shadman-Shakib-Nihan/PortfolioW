import { ArrowUpRight, Award } from "lucide-react";
import Link from "next/link";
import { posterAward, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import HorizontalShowcase from "./HorizontalShowcase";
import ProjectVisual from "./ProjectVisual";
import SectionHeading from "./SectionHeading";

const thesisDisplayTitle =
  "A Unified Forensic Framework for Multimodal Synthetic Media Detection";

export default function Research() {
  const researchProject = projects.find(
    (project) => project.slug === "deepfake-synthetic-media-detection",
  );

  if (!researchProject?.research) return null;

  const { research } = researchProject;
  const total = research.areas.length + 1;

  return (
    <HorizontalShowcase
      id="research"
      labelledBy="research-heading"
      total={total}
      itemLabel="Research record"
      trackLabel="Research thesis and record, scroll horizontally to explore"
      heading={
        <SectionHeading
          index="05"
          eyebrow="Research"
          headingId="research-heading"
          title={
            <>
              A unified forensic framework{" "}
              <span className="serif-accent text-muted">for multimodal synthetic media.</span>
            </>
          }
          description="Undergraduate thesis research and a public research record. No publications, authors, journals, or DOI records are claimed until verified documentation is available."
        />
      }
    >
      <article
        data-slide
        className="group relative flex w-[92vw] shrink-0 snap-center flex-col overflow-hidden border border-line bg-surface/45 md:w-[78vw] lg:w-[min(58vw,860px)]"
      >
        <div className="grid gap-5 p-4 sm:p-5 md:gap-6 md:p-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Link
            href={`/projects/${researchProject.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className="relative block overflow-hidden rounded-sm border border-line bg-card"
          >
            <div className="transition-transform duration-700 ease-out group-hover:scale-[1.025]">
              <ProjectVisual project={researchProject} size="detail" />
            </div>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-4 top-4 flex items-center justify-end">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white">
                <Award className="size-3" aria-hidden="true" />
                {posterAward.title}
              </span>
            </div>
          </Link>

          <div className="flex min-w-0 flex-col">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[10px] tabular-nums text-accent">01</span>
              <span className="h-px w-5 bg-line" aria-hidden="true" />
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                Undergraduate thesis
              </span>
            </div>

            <h3 className="mt-2.5 text-balance text-[clamp(1.6rem,2.3vw,2.3rem)] font-medium leading-[1.06] tracking-[-0.045em]">
              {thesisDisplayTitle}
            </h3>

            <p className="mt-2.5 line-clamp-3 max-w-xl text-sm leading-6 text-muted">
              {researchProject.solution}
            </p>

            <dl className="mt-4 grid gap-x-4 gap-y-3 border-t border-line pt-3.5 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                  Research area
                </dt>
                <dd className="mt-1 text-xs leading-5 text-foreground/80">
                  Multimodal synthetic media forensics
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                  Methodology
                </dt>
                <dd className="mt-1 text-xs leading-5 text-foreground/80">
                  Unified forensic framework
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                  Publication
                </dt>
                <dd className="mt-1 text-xs leading-5 text-foreground/80">Not published</dd>
              </div>
            </dl>

            <Link
              href={`/projects/${researchProject.slug}`}
              className="group/link mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Open the research record
              <span className="grid size-7 place-items-center rounded-full border border-line transition-colors group-hover/link:border-accent/50">
                <ArrowUpRight
                  className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        </div>
      </article>

      {research.areas.map((area, index) => {
        const notPublished = area.status === "not-published";
        const width =
          index % 2 === 0
            ? "w-[84vw] md:w-[48vw] lg:w-[min(36vw,540px)]"
            : "w-[84vw] md:w-[42vw] lg:w-[min(30vw,460px)]";

        return (
          <article
            key={area.label}
            data-slide
            className={cn(
              "group relative flex shrink-0 snap-center flex-col justify-between overflow-hidden border border-line transition-colors duration-500 hover:border-accent/30",
              width,
              index % 2 === 0 ? "bg-card/45" : "bg-surface/45",
            )}
          >
            <div className="relative p-5 md:p-6">
              <span
                className="pointer-events-none absolute right-0 -top-5 select-none text-[7rem] font-semibold leading-none tracking-[-0.08em] text-line/45"
                aria-hidden="true"
              >
                {String(index + 2).padStart(2, "0")}
              </span>

              <div className="relative flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] tabular-nums text-accent">
                  {String(index + 2).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em]",
                    notPublished
                      ? "border-accent/25 bg-accent-soft text-accent"
                      : "border-line bg-surface text-muted",
                  )}
                >
                  {notPublished ? "Not published" : "To be documented"}
                </span>
              </div>

              <h3 className="relative mt-8 max-w-[18ch] text-[clamp(1.65rem,2.5vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.04em]">
                {area.label}
              </h3>

              <p className="relative mt-4 text-sm leading-7 text-muted">{area.body}</p>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line px-5 py-4 md:px-6">
              <div className="col-span-2">
                <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                  Research area
                </dt>
                <dd className="mt-1 text-xs leading-5 text-foreground/75">
                  Multimodal synthetic media forensics
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                  Methodology
                </dt>
                <dd className="mt-1 text-xs leading-5 text-foreground/75">Pending documentation</dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                  Publication
                </dt>
                <dd className="mt-1 text-xs leading-5 text-foreground/75">Not published</dd>
              </div>
            </dl>
          </article>
        );
      })}
    </HorizontalShowcase>
  );
}
