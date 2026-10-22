import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  headingId?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  headingId,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-px w-8 bg-gradient-to-r from-accent to-accent/0" aria-hidden="true" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </span>
      </div>
      <h2
        id={headingId}
        className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-[-0.035em] sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
