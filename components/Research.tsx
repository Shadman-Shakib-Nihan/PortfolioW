import { ArrowUpRight, Award, FlaskConical } from "lucide-react";
import Link from "next/link";
import { posterAward, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import ProjectVisual from "./ProjectVisual";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Research() {
  const researchProject = projects.find(
    (project) => project.slug === "deepfake-synthetic-media-detection",
  );

  if (!researchProject?.research) return null;

  const { research } = researchProject;

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="relative border-b border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          index="05"
          eyebrow="Research"
          title={
            <>
              A unified forensic framework{" "}
              <span className="serif-accent text-muted">for multimodal synthetic media.</span>
            </>
          }
          description="Undergraduate thesis research on identifying artifacts in deepfakes and generative AI content across multiple modalities."
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <Reveal>
            <div className="border border-line bg-surface/60 p-6 md:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
                <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                  <FlaskConical className="size-3.5" aria-hidden="true" />
                  Undergraduate thesis
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                  <Award className="size-3.5" aria-hidden="true" />
                  {posterAward.title}
                </span>
              </div>

              <blockquote className="mt-6">
                <p className="text-balance text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-[1.25] tracking-[-0.025em]">
                  {research.thesisTitle}
                </p>
              </blockquote>

              <p className="mt-6 max-w-xl text-sm leading-7 text-muted">{researchProject.solution}</p>

              <div className="mt-6 border-l border-accent/40 pl-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  Award note
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground/80">{posterAward.note}</p>
              </div>

              <Link
                href={`/projects/${researchProject.slug}`}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                Open the research record
                <span className="grid size-7 place-items-center rounded-full border border-line transition-colors group-hover:border-accent/50">
                  <ArrowUpRight
                    className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col">
              <div className="overflow-hidden rounded-sm border border-line bg-card">
                <ProjectVisual project={researchProject} size="detail" />
              </div>

              <dl className="mt-6 divide-y divide-line border-t border-line">
                <div className="flex items-start justify-between gap-4 py-3.5">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    Recognition
                  </dt>
                  <dd className="max-w-[15rem] text-right text-sm text-foreground/80">
                    {posterAward.title}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 py-3.5">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    Modalities
                  </dt>
                  <dd className="max-w-[15rem] text-right text-sm text-foreground/80">
                    Multiple media modalities
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 py-3.5">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    Publication
                  </dt>
                  <dd className="text-right text-sm text-foreground/80">Not published</dd>
                </div>
              </dl>

              <p className="mt-4 text-xs leading-6 text-muted">{research.note}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 border-t border-line pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="editorial-label">Research record</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                Details pending · not published
              </p>
            </div>

            <div className="mt-6 grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
              {research.areas.map((area, index) => {
                const notPublished = area.status === "not-published";

                return (
                  <div
                    key={area.label}
                    className="border-t border-line py-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[9px] tabular-nums text-accent/80">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-sm font-medium">{area.label}</h3>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.08em]",
                          notPublished
                            ? "border-accent/25 bg-accent-soft text-accent"
                            : "border-line bg-surface text-muted",
                        )}
                      >
                        {notPublished ? "Not published" : "To be documented"}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-muted">{area.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
