import { ArrowLeft, ArrowRight, Check, FlaskConical, Lightbulb } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectVisual from "@/components/ProjectVisual";
import StatusBadge from "@/components/StatusBadge";
import { profile, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — Shadman Shakib`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-grid opacity-40 mask-fade" />
        <div className="absolute -top-32 right-[10%] size-80 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute left-[5%] top-40 size-72 rounded-full bg-sky-500/10 blur-[120px]" />
      </div>

      <div className="container-page pb-20 pt-8 md:pb-28 md:pt-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full py-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All projects
        </Link>

        <header className="mt-8 grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {project.category}
              </span>
            </div>

            <h1 className="mt-5 text-balance text-4xl font-medium leading-[1.06] tracking-[-0.04em] sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{project.tagline}</p>

            {project.research ? (
              <blockquote className="mt-5 border-l-2 border-accent/45 pl-4 text-sm italic leading-6 text-muted">
                {project.research.thesisTitle}
              </blockquote>
            ) : null}

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted">{project.description}</p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-line/80 bg-card/60 px-2.5 py-1 font-mono text-[10px] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-card/70 px-5 text-sm font-medium transition-colors hover:border-accent/40 hover:bg-card-muted"
                >
                  <GithubIcon />
                  Source code
                </a>
              ) : null}

              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  <ExternalIcon />
                  Live demo
                </a>
              ) : null}

              {project.research ? (
                <a
                  href="#research"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-card/70 px-5 text-sm font-medium transition-colors hover:border-accent/40 hover:bg-card-muted"
                >
                  <FlaskConical className="size-4" aria-hidden="true" />
                  Research record
                </a>
              ) : null}
            </div>
          </div>

          <div className="card-inset overflow-hidden rounded-2xl border border-line bg-card shadow-2xl shadow-black/10">
            <ProjectVisual project={project} size="detail" />
          </div>
        </header>

        <div className="mt-14 grid gap-12 border-t border-line pt-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="min-w-0 space-y-12">
            <ContentSection number="01" title="The problem" headingId="problem-heading">
              <p>{project.problem}</p>
            </ContentSection>

            <ContentSection number="02" title="The approach" headingId="solution-heading">
              <p>{project.solution}</p>
            </ContentSection>

            <section aria-labelledby="architecture-heading">
              <SectionLabel number="03" title="Architecture" headingId="architecture-heading" />
              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.architecture.map((step, index) => (
                  <li
                    key={step.title}
                    className="card-inset rounded-xl border border-line bg-card p-5"
                  >
                    <span className="font-mono text-[10px] text-accent/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-sm font-medium">{step.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-muted">{step.body}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="highlights-heading">
              <SectionLabel
                number="04"
                title={project.research ? "Research scope" : "Key features"}
                headingId="highlights-heading"
              />
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 rounded-lg border border-line/70 bg-card/40 px-3.5 py-3 text-sm text-foreground/80"
                  >
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-emerald-500 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="learnings-heading">
              <SectionLabel number="05" title="What I learned" headingId="learnings-heading" />
              <ul className="mt-5 space-y-3">
                {project.learnings.map((learning) => (
                  <li key={learning} className="flex gap-3 text-sm leading-6 text-muted">
                    <Lightbulb
                      className="mt-0.5 size-4 shrink-0 text-accent/80"
                      aria-hidden="true"
                    />
                    {learning}
                  </li>
                ))}
              </ul>
            </section>

            {project.research ? (
              <section id="research" aria-labelledby="research-heading" className="scroll-mt-28">
                <SectionLabel
                  number="06"
                  title="Research documentation"
                  headingId="research-heading"
                />

                <div className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">
                    <FlaskConical className="size-3.5" aria-hidden="true" />
                    Academic research · not published
                  </div>
                  <p className="mt-2 text-xs leading-6 text-muted">{project.research.note}</p>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {project.research.areas.map((area) => {
                    const notPublished = area.status === "not-published";

                    return (
                      <div
                        key={area.label}
                        className="card-inset rounded-xl border border-line bg-card p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-sm font-medium">{area.label}</h3>
                          <span
                            className={cn(
                              "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em]",
                              notPublished
                                ? "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                                : "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
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
              </section>
            ) : null}
          </div>

          <aside>
            <div className="space-y-4 lg:sticky lg:top-28">
              <div className="card-inset rounded-2xl border border-line bg-card p-5">
                <h2 className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  Project details
                </h2>

                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-xs text-muted">Category</dt>
                    <dd className="mt-1 text-sm text-foreground/80">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Status</dt>
                    <dd className="mt-1.5">
                      <StatusBadge status={project.status} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Stack</dt>
                    <dd className="mt-1 text-sm leading-6 text-foreground/80">
                      {project.tech.join(" · ")}
                    </dd>
                  </div>
                  {project.research ? (
                    <div>
                      <dt className="text-xs text-muted">Publication</dt>
                      <dd className="mt-1 text-sm text-foreground/80">Not published</dd>
                    </div>
                  ) : null}
                </dl>
              </div>

              <div className="rounded-2xl border border-line bg-card/60 p-5">
                <p className="text-sm font-medium">Want to dig deeper?</p>
                <p className="mt-1.5 text-xs leading-6 text-muted">
                  Happy to walk through the architecture, trade-offs, or research direction.
                </p>
                <div className="mt-4 space-y-2">
                  <a
                    href={`mailto:${profile.email}?subject=${encodeURIComponent(
                      `Question about ${project.title}`,
                    )}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-4 py-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90"
                  >
                    Email me
                  </a>
                  <Link
                    href="/#contact"
                    className="inline-flex w-full items-center justify-center rounded-full border border-line px-4 py-2.5 text-xs font-medium transition-colors hover:bg-card-muted"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <nav
          aria-label="Project navigation"
          className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2"
        >
          <Link
            href={`/projects/${previousProject.slug}`}
            className="group rounded-xl border border-line bg-card/50 p-4 transition-colors hover:border-accent/35 hover:bg-card"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              <ArrowLeft className="size-3" aria-hidden="true" />
              Previous
            </span>
            <span className="mt-2 block text-sm font-medium transition-colors group-hover:text-accent">
              {previousProject.title}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group rounded-xl border border-line bg-card/50 p-4 text-right transition-colors hover:border-accent/35 hover:bg-card"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              Next
              <ArrowRight className="size-3" aria-hidden="true" />
            </span>
            <span className="mt-2 block text-sm font-medium transition-colors group-hover:text-accent">
              {nextProject.title}
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

function SectionLabel({
  number,
  title,
  headingId,
}: {
  number: string;
  title: string;
  headingId: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] text-accent/80">{number}</span>
      <h2 id={headingId} className="text-lg font-medium tracking-[-0.015em]">
        {title}
      </h2>
      <span className="h-px flex-1 bg-line/70" aria-hidden="true" />
    </div>
  );
}

function ContentSection({
  number,
  title,
  headingId,
  children,
}: {
  number: string;
  title: string;
  headingId: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={headingId}>
      <SectionLabel number={number} title={title} headingId={headingId} />
      <div className="mt-4 text-[15px] leading-7 text-muted">{children}</div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.863 10.917c.575.106.786-.25.786-.556 0-.274-.01-1.167-.015-2.116-3.2.696-3.876-1.542-3.876-1.542-.523-1.33-1.277-1.684-1.277-1.684-1.044-.714.079-.7.079-.7 1.155.081 1.762 1.187 1.762 1.187 1.026 1.758 2.693 1.25 3.35.956.104-.744.402-1.25.731-1.538-2.554-.29-5.238-1.277-5.238-5.686 0-1.256.448-2.283 1.184-3.088-.119-.291-.513-1.462.112-3.047 0 0 .966-.31 3.165 1.179a11.02 11.02 0 0 1 5.762 0c2.198-1.49 3.163-1.179 3.163-1.179.626 1.585.232 2.756.114 3.047.738.805 1.183 1.832 1.183 3.088 0 4.42-2.689 5.392-5.251 5.677.413.355.781 1.056.781 2.128 0 1.537-.014 2.779-.014 3.157 0 .309.207.668.792.555A11.502 11.502 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5Z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}
