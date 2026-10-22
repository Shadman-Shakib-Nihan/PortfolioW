export type NavLink = {
  id: string;
  label: string;
};

export type SocialItem = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
  external: boolean;
};

export type SkillGroup = {
  title: string;
  icon: "code" | "brain" | "sparkles" | "chart" | "globe" | "database" | "wrench";
  items: string[];
  wide?: boolean;
};

export type ProjectStatus = "completed" | "in-progress" | "research";

export type ProjectAccent = "violet" | "blue" | "cyan" | "indigo";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  status: ProjectStatus;
  accent: ProjectAccent;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
  imageAlt: string;
  problem: string;
  solution: string;
  architecture: { title: string; body: string }[];
  highlights: string[];
  learnings: string[];
  research?: {
    thesisTitle: string;
    note: string;
    areas: { label: string; body: string; status: "pending" | "not-published" }[];
  };
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const siteConfig = {
  url: siteUrl,
  resumePath: "/resume.pdf",
  resumeFileName: "Shadman-Shakib-Resume.pdf",
  title: "Shadman Shakib — AI/ML Engineer & Full-Stack Developer",
  description:
    "AI/ML-focused computer science graduate and full-stack developer building machine learning systems, computer vision tools, and end-to-end web applications.",
};

export const profile = {
  name: "Shadman Shakib",
  initials: "SS",
  title: "AI/ML Engineer | Full-Stack Developer | Computer Vision Researcher",
  shortTitle: "AI/ML Engineer · Full-Stack Developer",
  location: "Dhaka, Bangladesh",
  email: "nihanshadman1@gmail.com",
  github: "https://github.com/Shadman-Shakib-Nihan",
  linkedin: "https://www.linkedin.com/in/shadman-shakib-39a55a30b",
  summary:
    "AI/ML-focused Computer Science graduate from AIUB who builds end-to-end software — from machine learning and computer vision to full-stack applications and AI-powered systems.",
  intro:
    "I work where machine learning meets product engineering: training and evaluating models, exposing them through reliable APIs, and building the interfaces that make them genuinely useful.",
  availability: "Open to AI, ML & full-stack opportunities",
  careerGoals: [
    "AI Engineering",
    "Full-Stack Development",
    "Computer Vision",
    "Forward Deployed Engineering",
  ],
  focus: ["AI engineering", "Computer vision", "Full-stack product development", "LLM applications"],
  photo: "/images/profile.jpg",
  photoAlt: "Portrait of Shadman Shakib",
};

export const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "gallery", label: "Gallery" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const socials: SocialItem[] = [
  {
    label: "GitHub",
    href: profile.github,
    icon: "github",
    external: true,
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: "linkedin",
    external: true,
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: "mail",
    external: false,
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    icon: "code",
    items: ["Python", "R", "C++", "PHP", "JavaScript"],
  },
  {
    title: "AI and Machine Learning",
    icon: "brain",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "CNNs",
      "Classification",
      "Regression",
      "Clustering",
    ],
  },
  {
    title: "LLMs and Generative AI",
    icon: "sparkles",
    items: ["LangChain", "RAG", "Prompt Engineering", "Fine-tuning Concepts", "LLM APIs"],
  },
  {
    title: "Data Science",
    icon: "chart",
    items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Statistical Modeling"],
  },
  {
    title: "Web Development",
    icon: "globe",
    items: [
      "Laravel",
      "Vue.js",
      "Inertia.js",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "FastAPI",
      "REST APIs",
    ],
  },
  {
    title: "Databases",
    icon: "database",
    items: ["PostgreSQL", "MySQL", "SQLite", "SQL"],
  },
  {
    title: "Tools and DevOps",
    icon: "wrench",
    items: ["Git", "GitHub", "Docker", "Linux", "n8n"],
    wide: true,
  },
];

export const projects: Project[] = [
  {
    slug: "rokomari-clone",
    title: "Rokomari Clone",
    tagline: "A full-stack e-commerce platform with a storefront and a complete admin back office.",
    description:
      "An e-commerce platform built with Laravel, Vue 3, and Inertia.js — covering authentication, catalog management, image uploads, a shopping cart, and role-based administration.",
    category: "Full-Stack",
    status: "completed",
    accent: "violet",
    tech: ["Laravel 12", "Vue 3", "Inertia.js", "Tailwind CSS", "SQLite"],
    github: "https://github.com/Shadman-Shakib-Nihan/RokomariClone.git",
    imageAlt: "Storefront and admin dashboard preview for the Rokomari Clone project",
    problem:
      "An online bookstore needs two connected experiences: a clear storefront for customers and a practical back office for managing products, categories, brands, and orders. Building those as separate systems quickly creates duplicated logic and inconsistent data.",
    solution:
      "A single Laravel application serves both the storefront and the admin dashboard through Inertia.js. Vue 3 pages handle the interface while Laravel owns routing, authentication, validation, and data access. Product, category, and brand CRUD cover catalog management; image uploads handle listing media; and the cart and role-based access cover the customer and administrator journeys.",
    architecture: [
      {
        title: "Interface layer",
        body: "Vue 3 single-file components rendered through Inertia.js and styled with Tailwind CSS, giving the storefront and admin area a shared component model without a separate API.",
      },
      {
        title: "Application layer",
        body: "Laravel 12 controllers, middleware, form validation, and authentication handle requests, protect admin routes, and keep business logic server-side.",
      },
      {
        title: "Data layer",
        body: "SQLite with Laravel's Eloquent ORM models products, categories, brands, users, and cart data. Product images are handled through Laravel's filesystem support.",
      },
      {
        title: "Administration",
        body: "Role-based access separates customer and admin capabilities, with CRUD screens for products, categories, and brands alongside image upload workflows.",
      },
    ],
    highlights: [
      "Authentication and account flows",
      "CRUD management for products, categories, and brands",
      "Image uploads for catalog assets",
      "Shopping cart experience",
      "Role-based admin features",
    ],
    learnings: [
      "Modeling a complete commerce domain cleanly across related entities.",
      "Using Inertia.js to connect a Laravel backend to a Vue frontend without building a separate API.",
      "Designing authorization boundaries that keep administrative actions protected.",
      "Keeping server-side validation as the source of truth for user input.",
    ],
  },
  {
    slug: "linkedin-post-agent",
    title: "LinkedIn Post Agent",
    tagline: "A CLI tool that turns an idea into a structured LinkedIn post using LangChain.",
    description:
      "A Python command-line application that generates LinkedIn posts with a clear hook, value section, and call to action. Tone and language are configurable per run.",
    category: "AI / LLM",
    status: "completed",
    accent: "blue",
    tech: ["Python", "LangChain", "LLM APIs"],
    github: "https://github.com/Shadman-Shakib-Nihan/LinkedIN_post_Agent.git",
    imageAlt: "Illustration of an AI-assisted LinkedIn post generator interface",
    problem:
      "Drafting consistently useful social content is repetitive. A generic prompt often produces a wall of text without a clear opening, a focused point, or a reason for the reader to respond.",
    solution:
      "The agent uses LangChain to orchestrate a structured generation flow around an LLM API. It collects the topic and audience preferences from the command line, applies a prompt template that enforces a hook, value section, and call to action, and supports configurable tone and language so the same workflow can produce different voices.",
    architecture: [
      {
        title: "Command-line interface",
        body: "A Python CLI accepts the topic and generation preferences, keeping the workflow scriptable and easy to run locally.",
      },
      {
        title: "Prompt orchestration",
        body: "LangChain coordinates prompt templates and the model call, giving the post a consistent structure instead of relying on one open-ended instruction.",
      },
      {
        title: "Generation settings",
        body: "Tone and language are passed through the prompt layer, allowing the output to adapt without changing the application code.",
      },
      {
        title: "Output formatting",
        body: "The generated response is organized into a hook, value section, and call to action so it is ready to review and publish.",
      },
    ],
    highlights: [
      "Structured output: hook, value section, and call to action",
      "Configurable tone and language",
      "CLI-first workflow built in Python",
      "LangChain-based prompt orchestration with LLM APIs",
    ],
    learnings: [
      "Designing prompt templates that produce a predictable document shape.",
      "Separating generation settings from prompts so the same tool can serve different contexts.",
      "Working with LLM APIs through LangChain and handling the surrounding Python workflow.",
      "Treating AI output as a draft that a person reviews rather than something published automatically.",
    ],
  },
  {
    slug: "heart-disease-prediction-api",
    title: "Heart Disease Prediction API",
    tagline: "A containerized machine learning service with validated inputs and probability-based predictions.",
    description:
      "A FastAPI service that serves a Scikit-learn heart disease prediction model, with health and model metadata endpoints, Pydantic validation, and Docker packaging.",
    category: "Machine Learning",
    status: "completed",
    accent: "cyan",
    tech: ["Python", "FastAPI", "Scikit-learn", "Pydantic", "Docker"],
    github: "https://github.com/Shadman-Shakib-Nihan/Heart_deseaseModel_FAST_API.git",
    demo: "https://heart-deseasemodel-fast-api.onrender.com",
    imageAlt: "Illustration of the heart disease prediction API request and response",
    problem:
      "A trained model is only useful when other software can call it reliably. Without a stable interface, input validation, and a predictable response contract, a notebook model is difficult to integrate into a real product.",
    solution:
      "The model is packaged behind a FastAPI service with explicit endpoints and Pydantic request validation. Predictions return probability-based output rather than a bare label, and the service includes operational endpoints for health checks and model information. A Docker image keeps the runtime reproducible and makes the service portable.",
    architecture: [
      {
        title: "Request validation",
        body: "Pydantic models define the expected clinical input schema and reject malformed requests before inference.",
      },
      {
        title: "Inference service",
        body: "FastAPI loads the trained Scikit-learn model and runs prediction against validated input, returning a probability-based result.",
      },
      {
        title: "API surface",
        body: "Three endpoints separate concerns: /health for runtime checks, /info for model metadata, and /predict for inference.",
      },
      {
        title: "Packaging and deployment",
        body: "A Docker image captures the Python environment and service configuration for consistent deployment on Render.",
      },
    ],
    highlights: [
      "/health, /info, and /predict endpoints",
      "Pydantic validation for request payloads",
      "Probability-based prediction output",
      "Dockerized Python service",
      "Public live demo on Render",
    ],
    learnings: [
      "Turning a notebook model into a documented service with a clear input and output contract.",
      "Using Pydantic to validate inference requests at the API boundary.",
      "Packaging a Python ML service with Docker for reproducible deployment.",
      "Communicating model output as a probability so it can be interpreted responsibly.",
    ],
  },
  {
    slug: "deepfake-synthetic-media-detection",
    title: "Deepfake & Synthetic Media Detection",
    tagline:
      "Undergraduate thesis research toward a unified forensic framework for multimodal synthetic media.",
    description:
      "Academic research on identifying artifacts in deepfakes and generative AI content, organized around a unified forensic framework spanning multiple media modalities.",
    category: "Research",
    status: "research",
    accent: "indigo",
    tech: ["Computer Vision", "Deep Learning", "Multimodal Forensics", "Python"],
    imageAlt: "Research illustration representing multimodal synthetic media forensics",
    problem:
      "Synthetic media produced by deepfakes and generative models is increasingly difficult to distinguish from authentic content. Detection research often studies individual modalities or artifact families in isolation, which can leave gaps when a single piece of media carries more than one kind of manipulation.",
    solution:
      "This thesis proposes a unified forensic framework for detecting multimodal synthetic media. It brings artifact analysis across modalities into one organized workflow, with the goal of making synthetic and manipulated content easier to examine consistently. The work is academic research; results and documentation are not published yet and are not claimed on this site.",
    architecture: [
      {
        title: "Multimodal artifact analysis",
        body: "The framework examines forensic signals associated with synthetic and manipulated media rather than relying on a single detection cue.",
      },
      {
        title: "Unified detection workflow",
        body: "The research organizes analysis steps into a common framework so different artifact types can be studied together.",
      },
      {
        title: "Evaluation design",
        body: "Datasets, metrics, and model architecture will be documented as the thesis material is finalized. No results are presented here yet.",
      },
    ],
    highlights: [
      "Unified forensic perspective on synthetic media detection",
      "Focus on artifacts in deepfakes and generative AI content",
      "Multimodal framing of the detection problem",
      "Academic thesis research — not published",
    ],
    learnings: [
      "Framing a computer vision research problem around a coherent forensic question.",
      "Thinking across modalities instead of treating each artifact type independently.",
      "Planning evaluation carefully enough that future results can be reported honestly.",
    ],
    research: {
      thesisTitle:
        "A Unified Forensic Framework for the Detection of Multimodal Synthetic Media: Identifying Artifacts in Deepfakes and Generative AI Content",
      note: "This page is a research record, not a publication. Methodology, datasets, architecture details, metrics, and results will be added only when the thesis documentation is ready.",
      areas: [
        {
          label: "Methodology",
          body: "The methods used to collect, examine, and compare forensic artifacts will be documented here as the research material is finalized.",
          status: "pending",
        },
        {
          label: "Dataset details",
          body: "Dataset selection, composition, and preprocessing details are not published on this site yet.",
          status: "pending",
        },
        {
          label: "Model architecture",
          body: "The detection models and supporting architecture will be documented alongside the thesis implementation.",
          status: "pending",
        },
        {
          label: "Evaluation metrics",
          body: "The evaluation protocol and metrics will be published with the thesis documentation.",
          status: "pending",
        },
        {
          label: "Results",
          body: "No performance results are claimed here. This section will be updated only when verified thesis results are available.",
          status: "not-published",
        },
        {
          label: "Research documentation",
          body: "The thesis documentation is being prepared. It is not published or publicly linked from this portfolio yet.",
          status: "not-published",
        },
      ],
    },
  },
];

export const experience = [
  {
    role: "Laravel Developer Intern",
    company: "Skylark Soft Limited",
    period: "June 8, 2026 – September 3, 2026",
    type: "Internship",
    summary:
      "Worked on professional web applications across the Laravel stack, contributing to application features, database work, and API integrations.",
    responsibilities: [
      "Developed and maintained web applications using Laravel, PHP, MySQL, Vue.js, and Inertia.js.",
      "Implemented application features and fixed bugs.",
      "Worked with databases and API integrations.",
    ],
    tech: ["Laravel", "PHP", "MySQL", "Vue.js", "Inertia.js"],
  },
];

export const education = {
  degree: {
    title: "BSc in Computer Science and Engineering",
    institution: "American International University-Bangladesh (AIUB)",
    period: "January 2023 – September 2026",
    gpa: "3.71 / 4.00",
    location: "Dhaka, Bangladesh",
    summary:
      "Computer science foundation spanning software engineering, algorithms, machine learning, and applied research, with a thesis focused on synthetic media forensics.",
  },
  secondary: [
    {
      title: "Higher Secondary Certificate",
      shortTitle: "HSC",
      institution: "",
      period: "",
      note: "Institution and result details available on request.",
    },
    {
      title: "Secondary School Certificate",
      shortTitle: "SSC",
      institution: "",
      period: "",
      note: "Institution and result details available on request.",
    },
  ],
};

export const achievements = [
  {
    title: "Dean's List",
    detail: "American International University-Bangladesh (AIUB).",
    icon: "award" as const,
  },
  {
    title: "Gold Award",
    detail: "The Duke of Edinburgh's Award, completed through AIUB.",
    icon: "medal" as const,
  },
  {
    title: "Undergraduate Thesis",
    detail:
      "A Unified Forensic Framework for the Detection of Multimodal Synthetic Media: Identifying Artifacts in Deepfakes and Generative AI Content.",
    icon: "flask" as const,
    href: "/projects/deepfake-synthetic-media-detection",
  },
];

export const certification = {
  title: "AI Engineering Bootcamp",
  provider: "Ostad",
  label: "Professional training",
  description:
    "Focused training in building and shipping AI applications, from LLM-powered systems and retrieval pipelines to model adaptation and production deployment.",
  topics: ["LLMs", "RAG pipelines", "Model fine-tuning", "Production AI deployment"],
};
