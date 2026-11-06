import { ArrowUpRight } from "lucide-react";
import { experience } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative border-b border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title={
            <>
              Professional work,{" "}
              <span className="serif-accent text-muted">in a real codebase.</span>
            </>
          }
          description="A team environment where features, bugs, databases, and integrations all had to ship together."
        />

        <div className="mt-12 lg:mt-16">
          {experience.map((role, index) => (
            <Reveal key={`${role.company}-${role.role}`}>
              <article className="grid gap-8 border-t border-line py-10 md:py-14 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
                <div className="flex flex-row gap-6 lg:flex-col lg:justify-between">
                  <div>
                    <span className="font-mono text-[10px] tabular-nums text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {role.type}
                    </p>
                  </div>
                  <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-muted lg:mt-10">
                    {role.period}
                  </p>
                </div>

                <div>
                  <h3 className="text-balance text-[clamp(1.8rem,3.2vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                    {role.role}
                  </h3>
                  <p className="mt-2 text-lg text-muted">
                    <span className="serif-accent text-accent">{role.company}</span>
                  </p>

                  <p className="mt-5 max-w-md text-sm leading-7 text-muted">{role.summary}</p>

                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                    {role.tech.map((tech) => (
                      <li
                        key={tech}
                        className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/70"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:border-l lg:border-line/70 lg:pl-10">
                  <p className="editorial-label">Responsibilities</p>
                  <ul className="mt-4 space-y-3">
                    {role.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-foreground/80"
                      >
                        <span
                          className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="flex flex-col gap-3 border-t border-line pt-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
              Currently looking for full-time AI engineering and full-stack roles.
            </span>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-accent"
            >
              Get in touch
              <ArrowUpRight
                className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
