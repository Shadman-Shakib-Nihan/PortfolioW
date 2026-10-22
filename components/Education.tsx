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
      className="relative border-t border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Education & achievements"
          title="A computer science foundation, applied to real systems."
          headingId="education-heading"
          description="Formal training in computer science, complemented by research, awards, and hands-on product work."
        />

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <Reveal>
              <div className="card-inset rounded-2xl border border-line bg-card p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-xl border border-line bg-background/60 text-accent">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-line bg-background/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                    BSc
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-medium leading-snug tracking-[-0.015em]">
                  {education.degree.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted">{education.degree.institution}</p>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line/70 pt-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      Period
                    </p>
                    <p className="mt-1.5 text-sm text-foreground/80">
                      {education.degree.period}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      GPA
                    </p>
                    <p className="mt-1.5 text-sm text-foreground/80">{education.degree.gpa}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-muted">{education.degree.summary}</p>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {education.secondary.map((item, index) => (
                <Reveal key={item.title} delay={0.05 + index * 0.04}>
                  <div className="card-inset h-full rounded-2xl border border-line bg-card p-5">
                    <div className="flex items-center justify-between gap-3">
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
            <div className="card-inset h-full rounded-2xl border border-line bg-card p-6 md:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-line bg-background/60 text-accent">
                  <Award className="size-4" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-medium">Achievements & research</h3>
              </div>

              <ul className="mt-5 divide-y divide-line/70">
                {achievements.map((item) => {
                  const Icon = iconMap[item.icon];
                  const content = (
                    <>
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-background/50 text-accent">
                        <Icon className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-start justify-between gap-3">
                          <span className="text-sm font-medium leading-snug">{item.title}</span>
                          {item.href ? (
                            <ArrowUpRight
                              className="mt-0.5 size-3.5 shrink-0 text-muted transition-colors group-hover:text-accent"
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
                    <li key={item.title} className="py-4 first:pt-0 last:pb-0">
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="group flex gap-3 rounded-lg transition-colors"
                        >
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
