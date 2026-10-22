import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import Link from "next/link";
import type { Project } from "@/data/portfolio";
import StatusBadge from "./StatusBadge";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-inset group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_24px_70px_-40px_var(--glow)]">
      <Link
        href={`/projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block overflow-hidden border-b border-line"
      >
        <div className="transition-transform duration-500 group-hover:scale-[1.015]">
          <ProjectVisual project={project} />
        </div>
        <div className="absolute left-4 top-4">
          <StatusBadge status={project.status} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
          <span className="text-accent/85">{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>Case study</span>
        </div>

        <h3 className="mt-2.5 text-xl font-medium tracking-[-0.02em]">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors group-hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line/80 bg-background/50 px-2 py-1 font-mono text-[10px] tracking-tight text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            View details
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>

          <div className="flex items-center gap-1">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} on GitHub (opens in a new tab)`}
                title="View source on GitHub"
                className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-background/40 text-muted transition-colors hover:border-accent/40 hover:text-foreground"
              >
                <GithubIcon className="size-4" />
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} live demo (opens in a new tab)`}
                title="Open live demo"
                className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-background/40 text-muted transition-colors hover:border-accent/40 hover:text-foreground"
              >
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
