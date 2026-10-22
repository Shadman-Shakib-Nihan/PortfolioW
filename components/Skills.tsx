import {
  BarChart3,
  BrainCircuit,
  Code2,
  Database,
  Globe2,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillGroups, type SkillGroup } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const iconMap: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  brain: BrainCircuit,
  sparkles: Sparkles,
  chart: BarChart3,
  globe: Globe2,
  database: Database,
  wrench: Wrench,
};

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative border-t border-line/70 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden="true"
      />
      <div className="container-page">
        <SectionHeading
          eyebrow="Technical skills"
          title="A practical toolkit for building end to end."
          headingId="skills-heading"
          description="Grouped by how I use them — not by arbitrary proficiency percentages."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = iconMap[group.icon];

            return (
              <Reveal
                key={group.title}
                delay={index * 0.035}
                className={cn(group.wide && "sm:col-span-2 lg:col-span-3")}
              >
                <div className="card-inset group h-full rounded-2xl border border-line bg-card p-5 transition-colors hover:border-accent/30 hover:bg-card-muted/50 md:p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg border border-line bg-background/60 text-accent transition-colors group-hover:border-accent/30">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-sm font-medium">{group.title}</h3>
                  </div>

                  <ul
                    className={cn(
                      "mt-4 flex flex-wrap gap-1.5",
                      group.wide && "sm:mt-5",
                    )}
                  >
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-line/80 bg-background/60 px-2.5 py-1 font-mono text-[11px] tracking-tight text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Tools are chosen for the problem — not the other way around.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
