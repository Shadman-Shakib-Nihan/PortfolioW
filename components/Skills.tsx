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
      className="relative border-b border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          index="02"
          eyebrow="Toolkit"
          title={
            <>
              A practical stack,{" "}
              <span className="serif-accent text-muted">used to build end to end.</span>
            </>
          }
          description="Grouped by how I use them — not by arbitrary proficiency percentages."
        />

        <div className="mt-12 border-t border-line lg:mt-16">
          {skillGroups.map((group, index) => {
            const Icon = iconMap[group.icon];

            return (
              <Reveal key={group.title} delay={index * 0.03}>
                <div className="group grid gap-3 border-b border-line py-6 transition-colors duration-300 hover:bg-surface/60 sm:grid-cols-[auto_minmax(0,0.32fr)_minmax(0,0.68fr)] sm:items-start sm:gap-6 sm:px-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tabular-nums text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted transition-colors group-hover:text-accent">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                  </div>

                  <h3 className="text-lg font-medium tracking-[-0.02em] sm:text-xl">
                    {group.title}
                  </h3>

                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-muted transition-colors group-hover:text-foreground/80">
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
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Tools are chosen for the problem — not the other way around.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
