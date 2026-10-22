import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { profile, projects } from "@/data/portfolio";
import ProjectVisual from "./ProjectVisual";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative border-t border-line/70 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden="true"
      />
      <div className="container-page">
        <SectionHeading
          eyebrow="Gallery"
          title="A portrait and selected project previews."
          headingId="gallery-heading"
          description="A closer look at the person behind the work, alongside visual previews from selected builds."
        />

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:mt-16 lg:columns-3">
          <Reveal className="mb-4 break-inside-avoid">
            <figure className="card-inset relative overflow-hidden rounded-2xl border border-line bg-card">
              <div className="relative aspect-[4/5] overflow-hidden bg-card-muted">
                <Image
                  src={profile.photo}
                  alt={profile.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
                    Portrait
                  </p>
                  <p className="mt-1.5 text-lg font-medium text-white">{profile.name}</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-white/70">
                    <MapPin className="size-3" aria-hidden="true" />
                    {profile.location}
                  </p>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={0.05 + index * 0.04}
              className="mb-4 break-inside-avoid"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-accent/35"
                aria-label={`View ${project.title} project`}
              >
                <figure>
                  <div className="relative overflow-hidden">
                    <ProjectVisual project={project} />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-4 p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium transition-colors group-hover:text-accent">
                        {project.title}
                      </p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                        {project.category} · Project preview
                      </p>
                    </div>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-background/50 text-muted transition-colors group-hover:border-accent/40 group-hover:text-foreground">
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
