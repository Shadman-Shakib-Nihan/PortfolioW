import { ArrowUpRight, CalendarDays, CircleDot } from "lucide-react";
import { experience } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative border-t border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience"
          title="Professional work, in a real codebase."
          headingId="experience-heading"
          description="A team environment where features, bugs, databases, and integrations all had to ship together."
        />

        <div className="relative mt-12 pl-6 sm:pl-8 lg:mt-16">
          <div
            className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-accent/60 via-line to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-accent bg-background ring-4 ring-background"
            aria-hidden="true"
          />

          {experience.map((role) => (
            <Reveal key={`${role.company}-${role.role}`}>
              <article className="card-inset overflow-hidden rounded-2xl border border-line bg-card">
                <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-soft px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                        <CircleDot className="size-2.5" aria-hidden="true" />
                        {role.type}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-medium tracking-[-0.02em]">{role.role}</h3>
                    <p className="mt-1 text-sm text-muted">{role.company}</p>

                    <p className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-tight text-muted">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {role.period}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {role.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-line/80 bg-background/50 px-2 py-1 font-mono text-[10px] text-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:border-l lg:border-line/70 lg:pl-10">
                    <p className="text-sm leading-7 text-muted">{role.summary}</p>
                    <h4 className="mt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                      Responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {role.responsibilities.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-foreground/80">
                          <span
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-dashed border-line bg-card/30 px-4 py-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2">
                <span
                  className="size-1.5 shrink-0 rounded-full bg-emerald-400"
                  aria-hidden="true"
                />
                Currently looking for full-time AI engineering and full-stack roles.
              </span>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-accent"
              >
                Get in touch
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
