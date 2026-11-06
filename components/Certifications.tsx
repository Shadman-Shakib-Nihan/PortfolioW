import { BadgeCheck, GraduationCap } from "lucide-react";
import { certification } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative border-b border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          index="08"
          eyebrow="Certifications"
          title={
            <>
              Structured training{" "}
              <span className="serif-accent text-muted">in applied AI.</span>
            </>
          }
          description="Focused learning that complements the degree, research, and project work."
        />

        <Reveal className="mt-12 lg:mt-16">
          <div className="grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full border border-line bg-surface text-accent">
                  <GraduationCap className="size-5" aria-hidden="true" />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                  <BadgeCheck className="size-3" aria-hidden="true" />
                  {certification.label}
                </span>
              </div>

              <h3 className="mt-5 text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium leading-[1.08] tracking-[-0.03em]">
                {certification.title}
              </h3>
              <p className="mt-2 text-base text-muted">{certification.provider}</p>
            </div>

            <div className="lg:border-l lg:border-line/70 lg:pl-12">
              <p className="text-[15px] leading-7 text-muted">{certification.description}</p>

              <div className="mt-6 border-t border-line pt-5">
                <p className="editorial-label">Topics</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {certification.topics.map((topic) => (
                    <li key={topic} className="text-sm text-foreground/80">
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
