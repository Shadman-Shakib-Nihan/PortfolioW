import { ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { navLinks, profile, socials } from "@/data/portfolio";
import SocialLinks from "./SocialLinks";

const iconMap = {
  github: "GitHub",
  linkedin: "LinkedIn",
  mail: "Email",
} as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-card/20">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg border border-accent/30 bg-gradient-to-br from-violet-500/20 to-sky-500/20 text-[11px] font-semibold tracking-[0.08em]">
                {profile.initials}
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-medium">{profile.name}</span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  AI / ML Engineer
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Building intelligent software for real-world problems — across machine learning,
              computer vision, and full-stack engineering.
            </p>

            <SocialLinks className="mt-5" />
          </div>

          <div>
            <h2 className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
              Navigate
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noreferrer noopener" : undefined}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {iconMap[social.icon]}
                    {social.icon === "mail" ? null : (
                      <ArrowUpRight
                        className="size-3 text-muted/70 transition-colors group-hover:text-accent"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/#contact"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Start a conversation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {profile.name}. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS & Framer Motion.</p>
          <Link
            href="/#home"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
