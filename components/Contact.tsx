"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Info,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

type FormField = "name" | "email" | "message";
type FormErrors = Partial<Record<FormField, string>>;

type Draft = {
  subject: string;
  body: string;
  mailto: string;
  gmail: string;
};

const initialForm = { name: "", email: "", message: "" };

const inputClass =
  "h-11 w-full rounded-xl border border-line bg-background/70 px-3.5 text-base text-foreground sm:text-sm placeholder:text-muted/55 transition-colors focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20";

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "app" | "gmail">("idle");
  const [copied, setCopied] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const copyTimer = useRef<number | null>(null);
  const draftCopyTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      if (draftCopyTimer.current) window.clearTimeout(draftCopyTimer.current);
    };
  }, []);

  function updateField(field: FormField, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setDraft(null);
    setStatus("idle");
    setCopiedDraft(false);
    setCopyFailed(false);
  }

  function validate() {
    const nextErrors: FormErrors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (form.message.trim().length < 20) {
      nextErrors.message = "Please add a little more detail (at least 20 characters).";
    }

    return nextErrors;
  }

  function buildDraft() {
    const nextErrors = validate();
    setErrors(nextErrors);

    const firstError = (Object.keys(nextErrors) as FormField[])[0];

    if (firstError) {
      document.getElementById(firstError)?.focus();
      return null;
    }

    const subject = `Portfolio inquiry from ${form.name.trim()}`;
    const body = `Hi Shadman,\n\n${form.message.trim()}\n\n—\n${form.name.trim()}\n${form.email.trim()}`;
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      profile.email,
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const nextDraft = { subject, body, mailto, gmail };
    setDraft(nextDraft);
    setCopiedDraft(false);
    setCopyFailed(false);
    return nextDraft;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextDraft = buildDraft();

    if (!nextDraft) return;

    setStatus("app");

    try {
      window.location.href = nextDraft.mailto;
    } catch {
      return;
    }
  }

  async function copyEmail() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);

      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  async function copyDraft() {
    if (!draft) return;

    const text = `To: ${profile.email}\nSubject: ${draft.subject}\n\n${draft.body}`;

    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setCopiedDraft(true);
      setCopyFailed(false);

      if (draftCopyTimer.current) window.clearTimeout(draftCopyTimer.current);
      draftCopyTimer.current = window.setTimeout(() => setCopiedDraft(false), 2000);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-t border-line/70 py-24 md:py-32"
    >
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-6 sm:p-8 lg:p-12 xl:p-14">
          <div
            className="pointer-events-none absolute inset-0 -z-0 bg-grid opacity-50 mask-fade"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full bg-violet-600/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-sky-500/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title="Let's build something useful."
                headingId="contact-heading"
                description="I'm open to AI engineering, computer vision, and full-stack roles — and to conversations about interesting problems."
              />

              <div className="mt-8 rounded-xl border border-line bg-background/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-card text-accent">
                      <Mail className="size-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                        Email
                      </p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="mt-1 block truncate text-sm font-medium transition-colors hover:text-accent"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    title="Copy email address"
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-card/70 text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                  >
                    {copied ? (
                      <Check className="size-4 text-emerald-500" aria-hidden="true" />
                    ) : (
                      <Copy className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <span className="sr-only" role="status" aria-live="polite">
                  {copied ? "Email address copied to clipboard." : ""}
                </span>
              </div>

              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-2 py-2.5 text-sm transition-colors hover:border-line hover:bg-background/40"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <LinkedinIcon className="size-4 text-muted" />
                      <span>LinkedIn</span>
                      <span className="hidden truncate text-xs text-muted/70 sm:inline">/in/shadman-shakib-39a55a30b</span>
                    </span>
                    <ArrowUpRight
                      className="size-3.5 text-muted transition-colors group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-2 py-2.5 text-sm transition-colors hover:border-line hover:bg-background/40"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <GithubIcon className="size-4 text-muted" />
                      <span>GitHub</span>
                      <span className="hidden truncate text-xs text-muted/70 sm:inline">/Shadman-Shakib-Nihan</span>
                    </span>
                    <ArrowUpRight
                      className="size-3.5 text-muted transition-colors group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li className="flex items-center gap-3 px-2 py-2.5 text-sm text-muted">
                  <MapPin className="size-4" aria-hidden="true" />
                  {profile.location}
                  <span className="ml-1 size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                </li>
              </ul>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-line bg-background/50 p-5 sm:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted"
                  >
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass}
                    placeholder="Your name"
                  />
                  {errors.name ? (
                    <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted"
                  >
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                  {errors.email ? (
                    <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted"
                >
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(inputClass, "h-auto resize-y py-3 leading-6")}
                  placeholder="Tell me what you're working on, or what kind of role you have in mind."
                />
                {errors.message ? (
                  <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                <Send className="size-4" aria-hidden="true" />
                Compose email
              </button>

              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
                <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                This form opens your email app with the message filled in. Nothing is sent to a
                server from this site, and you can review it before sending.
              </p>

              <p className="mt-2 min-h-5 text-xs leading-5 text-muted" role="status" aria-live="polite">
                {status === "app"
                  ? "Your email app should be opening. If nothing happened, use the options below."
                  : status === "gmail"
                    ? "Gmail opened in a new tab with your message filled in."
                    : ""}
              </p>

              {draft ? (
                <div className="mt-3 rounded-xl border border-line bg-card/70 p-3.5">
                  <p className="text-xs font-medium">Email app didn&apos;t open?</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Continue in Gmail with the same draft, or copy it and paste it into any mail
                    client.
                  </p>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <a
                      href={draft.gmail}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => setStatus("gmail")}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-foreground px-4 text-xs font-medium text-background transition-colors hover:bg-foreground/90"
                    >
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                      Continue in Gmail
                    </a>
                    <button
                      type="button"
                      onClick={copyDraft}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-line bg-background/50 px-4 text-xs font-medium transition-colors hover:border-accent/40 hover:bg-card-muted"
                    >
                      {copiedDraft ? (
                        <Check className="size-3.5 text-emerald-500" aria-hidden="true" />
                      ) : (
                        <Copy className="size-3.5" aria-hidden="true" />
                      )}
                      {copiedDraft ? "Draft copied" : "Copy draft"}
                    </button>
                  </div>

                  {copyFailed ? (
                    <p className="mt-2 text-xs leading-5 text-amber-700 dark:text-amber-300" role="status">
                      Copy didn&apos;t work here. Open the draft below and copy it manually.
                    </p>
                  ) : null}

                  <span className="sr-only" role="status" aria-live="polite">
                    {copiedDraft ? "Draft copied to clipboard." : ""}
                  </span>

                  <details className="mt-3 rounded-lg border border-line bg-background/50 p-3">
                    <summary className="cursor-pointer text-xs font-medium">
                      View draft text
                    </summary>
                    <textarea
                      readOnly
                      rows={7}
                      aria-label="Email draft text"
                      value={`To: ${profile.email}\nSubject: ${draft.subject}\n\n${draft.body}`}
                      className={cn(
                        inputClass,
                        "mt-3 h-auto resize-y py-3 font-mono text-[12px] leading-5",
                      )}
                    />
                  </details>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
