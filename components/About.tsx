import {
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Target,
  type LucideIcon,
} from "lucide-react";
import { profile } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const infoCards: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}[] = [
  {
    icon: GraduationCap,
    label: "Education",
    value: "BSc in Computer Science & Engineering",
    detail: "American International University-Bangladesh · 2023–2026",
  },
  {
    icon: Target,
    label: "Focus",
    value: "AI, computer vision & full-stack products",
    detail: "From trained models and APIs to polished interfaces.",
  },
  {
    icon: BriefcaseBusiness,
    label: "Most recently",
    value: "Laravel Developer Intern",
    detail: "Skylark Soft Limited · June–September 2026",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Dhaka, Bangladesh",
    detail: "Open to AI engineering and full-stack opportunities.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative border-t border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="About"
          title="Curious about how systems work. Focused on making them useful."
          headingId="about-heading"
          description="I care about the distance between a promising model and a dependable product — and I like working across it."
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <div className="space-y-5 text-[15px] leading-7 text-muted">
              <p>
                <span className="font-medium text-foreground">
                  I&apos;m a Computer Science graduate from American International
                  University-Bangladesh (AIUB).
                </span>{" "}
                My interest sits where machine learning meets product engineering: I want to
                understand the model, but I care just as much about the software built around it.
              </p>
              <p>
                That means working across the whole loop — framing the problem, preparing data,
                training and evaluating a model, exposing it through an API, and building the
                interface that makes the result usable. I&apos;ve applied that approach to computer
                vision research, LLM-powered tools, and full-stack web applications.
              </p>
              <p>
                My undergraduate thesis explores a unified forensic framework for detecting
                multimodal synthetic media. Longer term, I&apos;m working toward AI engineering and
                forward deployed engineering roles, where research-grade ideas have to become
                dependable systems in real use.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-accent/20 bg-accent-soft p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                Career focus
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {profile.careerGoals.map((goal) => (
                  <li
                    key={goal}
                    className="rounded-full border border-line bg-background/50 px-3 py-1 text-xs text-foreground/75"
                  >
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-3 sm:grid-cols-2">
            {infoCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.label}
                  className="card-inset flex h-full flex-col rounded-2xl border border-line bg-card p-5"
                >
                  <span className="grid size-9 place-items-center rounded-lg border border-line bg-background/60 text-accent">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                    {card.label}
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-snug">{card.value}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{card.detail}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
