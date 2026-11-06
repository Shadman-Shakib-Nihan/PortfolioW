import Image from "next/image";
import { profile } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const facts = [
  {
    label: "Education",
    value: "BSc Computer Science & Engineering",
    detail: "AIUB · 2023–2026",
  },
  {
    label: "Focus",
    value: "AI, computer vision & full-stack products",
    detail: "Models, APIs, and the interfaces around them",
  },
  {
    label: "Most recently",
    value: "Laravel Developer Intern",
    detail: "Skylark Soft Limited · 2026",
  },
  {
    label: "Based in",
    value: "Dhaka, Bangladesh",
    detail: "Open to AI and full-stack opportunities",
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative border-b border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              Curious about how systems work.{" "}
              <span className="serif-accent text-muted">Focused on making them useful.</span>
            </>
          }
          description="I care about the distance between a promising model and a dependable product — and I like working across it."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <figure className="group relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line bg-card-muted">
                <Image
                  src={profile.photo}
                  alt={profile.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 440px, 90vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
                      Dhaka, Bangladesh
                    </p>
                    <p className="mt-1 text-base font-medium text-white">{profile.name}</p>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
                    2026
                  </span>
                </figcaption>
              </div>

              <div className="mt-3 flex items-center justify-between gap-4 border-t border-line pt-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  AI · ML · Full-stack
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                  Open to work
                </span>
              </div>
            </figure>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-pretty text-[clamp(1.35rem,2.1vw,1.9rem)] leading-[1.3] tracking-[-0.02em]">
                <span className="serif-accent text-accent">I&apos;m a Computer Science graduate</span>{" "}
                from American International University-Bangladesh (AIUB), working where machine
                learning meets product engineering.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-8 grid gap-5 text-[15px] leading-7 text-muted">
                <p>
                  I want to understand the model, but I care just as much about the software built
                  around it. That means working across the whole loop — framing the problem,
                  preparing data, training and evaluating a model, exposing it through an API, and
                  building the interface that makes the result usable.
                </p>
                <p>
                  I&apos;ve applied that approach to computer vision research, LLM-powered tools, and
                  full-stack web applications. My undergraduate thesis explores a unified forensic
                  framework for detecting multimodal synthetic media.
                </p>
                <p>
                  Longer term, I&apos;m working toward AI engineering and forward deployed
                  engineering roles, where research-grade ideas have to become dependable systems
                  in real use.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 border-t border-line pt-6">
                <p className="editorial-label">Career focus</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {profile.careerGoals.map((goal) => (
                    <li
                      key={goal}
                      className="inline-flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-2">
                {facts.map((fact, index) => (
                  <div
                    key={fact.label}
                    className={`flex flex-col gap-1 border-b border-line py-5 ${
                      index % 2 === 0 ? "sm:border-r sm:pr-6" : "sm:pl-6"
                    }`}
                  >
                    <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium leading-snug">{fact.value}</dd>
                    <dd className="text-xs leading-relaxed text-muted">{fact.detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
