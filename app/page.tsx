import type { Metadata } from "next";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { profile, siteConfig } from "@/data/portfolio";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteConfig.url,
  image: `${siteConfig.url}${profile.photo}`,
  jobTitle: "AI/ML Engineer & Full-Stack Developer",
  email: `mailto:${profile.email}`,
  description: profile.summary,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "Machine Learning",
    "Computer Vision",
    "Generative AI",
    "Retrieval-Augmented Generation",
    "Full-Stack Development",
    "Python",
    "PyTorch",
    "Next.js",
    "Laravel",
    "FastAPI",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Gallery />
      <Experience />
      <Education />
      <Certifications />
      <Contact />
    </>
  );
}
