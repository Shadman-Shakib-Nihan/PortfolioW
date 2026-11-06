import { Download } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ResumeButtonProps = {
  variant?: "primary" | "secondary" | "nav" | "glow";
  label?: string;
  className?: string;
};

const variantStyles = {
  primary:
    "h-12 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90",
  secondary:
    "h-12 rounded-full border border-line bg-card/60 px-6 text-sm font-medium text-foreground hover:border-accent/40 hover:bg-card-muted",
  nav: "h-9 rounded-full border border-line bg-card/70 px-3.5 text-xs font-medium text-foreground hover:border-accent/40 hover:bg-card-muted",
  glow:
    "resume-glow h-12 rounded-full border border-accent/35 bg-accent/10 px-6 text-sm font-medium text-accent hover:border-accent/60 hover:bg-accent hover:text-white",
};

export default function ResumeButton({
  variant = "primary",
  label = "Resume",
  className,
}: ResumeButtonProps) {
  return (
    <a
      href={siteConfig.resumePath}
      download={siteConfig.resumeFileName}
      data-resume-download
      aria-label={`${label} (PDF)`}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden transition-colors",
        variantStyles[variant],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_28%,rgba(255,255,255,0.22)_50%,transparent_72%)] transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      {variant === "glow" ? (
        <span
          aria-hidden="true"
          className="resume-shine pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)]"
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2">
        <Download
          className={cn(
            "transition-transform duration-300 group-hover:translate-y-0.5",
            variant === "nav" ? "size-3.5" : "size-4",
          )}
          aria-hidden="true"
        />
        {label}
      </span>
    </a>
  );
}
