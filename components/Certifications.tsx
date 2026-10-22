import { BadgeCheck, GraduationCap } from "lucide-react";
import { certification } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative border-t border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Certifications"
          title="Structured training in applied AI."
          headingId="certifications-heading"
          description="Focused learning that complements the degree, research, and project work."
        />

        <Reveal className="mt-12 lg:mt-16">
          <div className="card-inset relative overflow-hidden rounded-2xl border border-line bg-card p-6 md:p-8">
            <div
              className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl border border-line bg-background/60 text-accent">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                    <BadgeCheck className="size-3" aria-hidden="true" />
                    {certification.label}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-medium tracking-[-0.015em]">
                  {certification.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{certification.provider}</p>
              </div>

              <div className="lg:border-l lg:border-line/70 lg:pl-10">
                <p className="text-sm leading-7 text-muted">{certification.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {certification.topics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-md border border-line/80 bg-background/50 px-2.5 py-1 font-mono text-[10px] text-muted"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
