import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { profile, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./BrandIcons";
import ProjectVisual from "./ProjectVisual";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import StatusBadge from "./StatusBadge";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative border-b border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="04"
            eyebrow="Selected work"
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

        <div className="mt-12 border-t border-line lg:mt-16">
          {projects.map((project, index) => {
            const reversed = index % 2 === 1;

            return (
              <Reveal key={project.slug}>
                <article className="group grid items-center gap-8 border-b border-line py-10 md:py-14 lg:grid-cols-12 lg:gap-14">
                  <div
                    className={cn(
                      "lg:col-span-5",
                      reversed ? "lg:order-2 lg:pl-4" : "lg:pr-4",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[10px] tabular-nums text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-6 bg-line" aria-hidden="true" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                        {project.category}
                      </span>
                      <StatusBadge status={project.status} />
                    </div>

                    <h3 className="mt-4 text-balance text-[clamp(1.7rem,3vw,2.60rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="transition-colors group-hover:text-accent"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-7 text-muted">
                      {project.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                      {project.tech.map((tech) => (
                        <li
                          key={tech}
                          className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/65"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap items-center gap-5">
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
                            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
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
                            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
                          >
                            <ExternalLink className="size-3.5" aria-hidden="true" />
                            Live
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className={cn("lg:col-span-7", reversed && "lg:order-1")}>
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
                        className="pointer-events-none absolute inset-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/55 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/80">
                          {project.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white backdrop-blur">
                          Open case study
                          <ArrowUpRight className="size-3" />
                        </span>
                      </div>
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-col gap-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono uppercase tracking-[0.14em]">
              {String(projects.length).padStart(2, "0")} projects · case studies included
            </p>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-accent"
            >
              Let&apos;s work together
              <ArrowUpRight
                className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
