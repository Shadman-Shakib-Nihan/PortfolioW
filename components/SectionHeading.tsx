import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
  align?: "left" | "center";
  headingId?: string;
  index?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  headingId,
  index,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "grid gap-6 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-12",
        align === "center" && "text-center",
        className,
      )}
    >
      <div className={cn("flex items-start gap-3", align === "center" && "justify-center")}>
        <span className="font-mono text-[10px] tabular-nums text-accent">
          {index ?? "—"}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          {eyebrow}
        </span>
      </div>

      <div className={cn(align === "center" && "mx-auto max-w-3xl")}>
        <h2
          id={headingId}
          className="text-balance text-[clamp(2rem,4.4vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.045em]"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
