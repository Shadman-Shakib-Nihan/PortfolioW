import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { socials } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
} as const;

type SocialLinksProps = {
  className?: string;
  itemClassName?: string;
  iconClassName?: string;
};

export default function SocialLinks({
  className,
  itemClassName,
  iconClassName,
}: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map((social) => {
        const Icon = iconMap[social.icon];

        return (
          <li key={social.label}>
            <a
              href={social.href}
              target={social.external ? "_blank" : undefined}
              rel={social.external ? "noreferrer noopener" : undefined}
              aria-label={
                social.external ? `${social.label} (opens in a new tab)` : social.label
              }
              title={social.label}
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full border border-line bg-card/60 text-muted transition-colors hover:border-accent/40 hover:bg-card-muted hover:text-foreground",
                itemClassName,
              )}
            >
              <Icon className={cn("size-4", iconClassName)} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
