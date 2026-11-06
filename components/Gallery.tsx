import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { profile, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import ProjectVisual from "./ProjectVisual";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative border-b border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          index="06"
          eyebrow="Gallery"
          title={
            <>
              A portrait and{" "}
              <span className="serif-accent text-muted">selected previews.</span>
            </>
          }
          description="A closer look at the person behind the work, alongside visual previews from selected builds."
        />

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <Reveal className="min-w-0 lg:col-span-5">
            <figure className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line bg-card-muted">
                <Image
                  src={profile.photo}
                  alt={profile.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-center"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
                    Portrait
                  </p>
                  <p className="mt-1.5 text-xl font-medium text-white">{profile.name}</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-white/70">
                    <MapPin className="size-3" aria-hidden="true" />
                    {profile.location}
                  </p>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:col-span-7">
            {projects.map((project, index) => (
              <Reveal
                key={project.slug}
                delay={index * 0.04}
                className={cn("min-w-0", index === projects.length - 1 && "sm:col-span-2")}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block overflow-hidden rounded-sm border border-line bg-card transition-colors hover:border-accent/40"
                  aria-label={`View ${project.title} project`}
                >
                  <div className="relative overflow-hidden">
                    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      <ProjectVisual project={project} />
                    </div>
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-4 border-t border-line px-4 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium transition-colors group-hover:text-accent">
                        {project.title}
                      </p>
                      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                        {project.category}
                      </p>
                    </div>
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-accent/50 group-hover:text-accent">
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </figcaption>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
