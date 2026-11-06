import {
  ArrowUpRight,
  Award,
  FlaskConical,
  GraduationCap,
  Medal,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { achievements, education } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const iconMap: Record<(typeof achievements)[number]["icon"], LucideIcon> = {
  award: Award,
  medal: Medal,
  flask: FlaskConical,
};

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative border-b border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          index="07"
          eyebrow="Education & achievements"
          title={
            <>
              A computer science foundation,{" "}
              <span className="serif-accent text-muted">applied to real systems.</span>
            </>
          }
          description="Formal training in computer science, complemented by research, awards, and hands-on product work."
        />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="border-t border-line py-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                    <GraduationCap className="size-3.5 text-accent" aria-hidden="true" />
                    BSc · Degree
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {education.degree.period}
                  </span>
                </div>

                <h3 className="mt-5 text-balance text-[clamp(1.7rem,3.2vw,2.7rem)] font-medium leading-[1.06] tracking-[-0.04em]">
                  {education.degree.title}
                </h3>
                <p className="mt-2 text-base text-muted">{education.degree.institution}</p>

                <div className="mt-8 grid gap-6 border-t border-line pt-5 sm:grid-cols-3">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                      GPA
                    </p>
                    <p className="mt-1.5 text-2xl font-medium tracking-[-0.03em]">
                      {education.degree.gpa}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                      Period
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-foreground/80">
                      {education.degree.period}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                      Location
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-foreground/80">
                      {education.degree.location}
                    </p>
                  </div>
                </div>

                <p className="mt-6 max-w-xl text-sm leading-7 text-muted">
                  {education.degree.summary}
                </p>
              </div>
            </Reveal>

            <div className="grid gap-x-8 gap-y-6 border-t border-line pt-6 sm:grid-cols-2">
              {education.secondary.map((item, index) => (
                <Reveal key={item.title} delay={0.05 + index * 0.04}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                        {item.shortTitle}
                      </span>
                      <span className="h-px flex-1 bg-line" aria-hidden="true" />
                    </div>
                    <h3 className="mt-3 text-sm font-medium">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{item.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="border-t border-line">
              <div className="flex items-center justify-between gap-3 py-5">
                <span className="editorial-label">Recognition</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  {String(achievements.length).padStart(2, "0")} items
                </span>
              </div>

              <ul>
                {achievements.map((item) => {
                  const Icon = iconMap[item.icon];
                  const content = (
                    <>
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line bg-surface text-accent">
                        <Icon className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-3">
                          <span className="text-sm font-medium leading-snug">{item.title}</span>
                          {item.href ? (
                            <ArrowUpRight
                              className="mt-0.5 size-3.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                              aria-hidden="true"
                            />
                          ) : null}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted">
                          {item.detail}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={item.title} className="border-t border-line py-4">
                      {item.href ? (
                        <Link href={item.href} className="group flex gap-3">
                          {content}
                        </Link>
                      ) : (
                        <div className="flex gap-3">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
