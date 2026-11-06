import { ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { navLinks, overflowLinks, profile, socials } from "@/data/portfolio";
import SocialLinks from "./SocialLinks";

const iconMap = {
  github: "GitHub",
  linkedin: "LinkedIn",
  mail: "Email",
} as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="overflow-hidden border-b border-line" aria-hidden="true">
        <div className="marquee marquee-slow py-6 md:py-8">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-8 pr-8">
              <span className="whitespace-nowrap text-[clamp(3rem,9vw,8rem)] font-semibold leading-none tracking-[-0.06em]">
                Shadman <span className="serif-accent font-normal text-accent">Shakib</span>
              </span>
              <span className="text-3xl text-accent md:text-5xl">✳</span>
              <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                AI engineering · Software
              </span>
              <span className="text-3xl text-accent md:text-5xl">✳</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full border border-line text-[10px] font-semibold tracking-[0.06em]">
                {profile.initials}
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-medium">{profile.name}</span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  AI · Software
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Building intelligent software for real-world problems — across machine learning,
              computer vision, and full-stack engineering.
            </p>

            <SocialLinks className="mt-5" />

            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-5 inline-block text-sm text-muted hover:text-foreground"
            >
              {profile.email}
            </a>
          </div>

          <div>
            <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Navigate</h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link, index) => (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <span className="font-mono text-[9px] tabular-nums text-accent/70">
                      0{index + 1}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">More</h2>
            <ul className="mt-4 space-y-2.5">
              {overflowLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em]">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
          <Link
            href="/#home"
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUp
              className="size-3.5 transition-transform group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
