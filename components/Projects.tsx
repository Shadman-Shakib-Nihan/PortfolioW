import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { profile, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./BrandIcons";
import HorizontalShowcase from "./HorizontalShowcase";
import ProjectVisual from "./ProjectVisual";
import SectionHeading from "./SectionHeading";
import StatusBadge from "./StatusBadge";

export default function Projects() {
  return (
    <HorizontalShowcase
      id="projects"
      labelledBy="projects-heading"
      total={projects.length}
      itemLabel="Selected work"
      trackLabel="Selected projects, scroll horizontally to explore"
      heading={
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="04"
            eyebrow="Selected work"
            headingId="projects-heading"
            title={
              <>
                Built end to end,{" "}
                <span className="serif-accent text-muted">with the reasoning behind it.</span>
              </>
            }
            description="Full-stack products, machine learning services, AI tooling, and academic research — each documented as a case study."
            className="lg:flex-1"
          />

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/50 hover:text-accent lg:self-end"
          >
            <GithubIcon className="size-3.5" />
            More on GitHub
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      }
    >
      {projects.map((project, index) => {
        const reversed = index % 2 === 1;

        return (
          <article
            key={project.slug}
            data-slide
            className={cn(
              "group relative flex shrink-0 snap-center flex-col overflow-hidden border border-line bg-surface/45 transition-colors duration-500 hover:border-accent/30",
              index % 2 === 0
                ? "w-[86vw] md:w-[62vw] lg:w-[min(60vw,860px)]"
                : "w-[86vw] md:w-[56vw] lg:w-[min(52vw,760px)]",
            )}
          >
            <div
              className={cn(
                "grid gap-5 p-4 sm:p-5 md:gap-6 md:p-5",
                "lg:grid-cols-[0.9fr_1.1fr] lg:items-center",
                reversed && "lg:[&>*:first-child]:order-2",
              )}
            >
              <Link
                href={`/projects/${project.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className="relative block overflow-hidden rounded-sm border border-line bg-card"
              >
                <div className="transition-transform duration-700 ease-out group-hover:scale-[1.025]">
                  <ProjectVisual project={project} />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/55 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/80">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white backdrop-blur">
                    Open case study
                    <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </Link>

              <div className="flex min-w-0 flex-col">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-[10px] tabular-nums text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-5 bg-line" aria-hidden="true" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    {project.category}
                  </span>
                  <StatusBadge status={project.status} />
                </div>

                <h3 className="mt-2.5 text-balance text-[clamp(1.7rem,2.7vw,2.6rem)] font-medium leading-[1.04] tracking-[-0.045em]">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="transition-colors group-hover:text-accent"
                  >
                    {project.title}
                  </Link>
                </h3>

                <p className="mt-2.5 line-clamp-3 max-w-md text-sm leading-6 text-muted">
                  {project.description}
                </p>

                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="font-mono text-[9px] uppercase tracking-[0.1em] text-foreground/60"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center gap-5">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group/link inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                  >
                    View case study
                    <span className="grid size-7 place-items-center rounded-full border border-line transition-colors group-hover/link:border-accent/50">
                      <ArrowUpRight
                        className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>

                  <div className="flex items-center gap-4">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${project.title} on GitHub (opens in a new tab)`}
                        className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
                      >
                        <GithubIcon className="size-3.5" />
                        Code
                      </a>
                    ) : null}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${project.title} live demo (opens in a new tab)`}
                        className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
                      >
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                        Live
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </HorizontalShowcase>
  );
}
