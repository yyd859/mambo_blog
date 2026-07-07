export interface PortfolioProject {
  title: string;
  summary: string;
  impact: string;
  stack: string[];
  href: string;
  linkLabel: string;
  notes: string[];
}

export const portfolioProfile = {
  name: "Yingdong Yang",
  role: "Software builder with a strong writing and design instinct",
  summary:
    "I care about clear interfaces, calm information design, and systems that make publishing and iteration easier. This portfolio is written entirely in English and sits alongside my Chinese blog without sharing the same site chrome.",
  location: "New York, NY",
  email: "yingdongyang0305@gmail.com",
  linkedin: "https://www.linkedin.com/in/yingdong-yang/",
};

export const portfolioStrengths = [
  "Frontend architecture that keeps content easy to publish and maintain",
  "Editorial interface design for long-form reading and structured portfolios",
  "Static-site workflows with App Router, markdown content, and responsive layouts",
  "Product-minded communication that turns rough ideas into shippable experiences",
];

export const resumeTemplates = {
  experience: [
    {
      title: "Current or Most Recent Role",
      period: "Add dates here",
      bullets: [
        "Describe your scope, the team or product you worked on, and the users you supported.",
        "Add one or two outcomes with numbers: growth, performance, conversion, adoption, or efficiency.",
        "Highlight the tools, systems, or workflows you personally shaped.",
      ],
    },
    {
      title: "Previous Role or Internship",
      period: "Add dates here",
      bullets: [
        "Keep this section concise and focus on work that supports the jobs you want next.",
        "Mention collaboration, ownership, and any notable product or technical wins.",
      ],
    },
  ],
  education: [
    "Add your school, program, graduation year, and any details that help your story.",
    "If relevant, include research, awards, or leadership work in one short line.",
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Mambo Blog",
    summary:
      "A personal publication focused on thoughtful writing in Chinese, with a reading-first interface and lightweight static deployment.",
    impact:
      "Built the site with the Next.js App Router and static export so it can stay simple to host while still feeling intentional and polished.",
    stack: ["Next.js 16", "TypeScript", "MD/MDX", "Tailwind CSS 4"],
    href: "/",
    linkLabel: "Visit the blog",
    notes: [
      "Created a quiet editorial layout centered on long-form reading.",
      "Added search, tag filtering, and article metadata without introducing backend complexity.",
    ],
  },
  {
    title: "Portfolio Experience",
    summary:
      "A dedicated English portfolio that lives in the same repository as the blog but has its own layout, navigation, and tone.",
    impact:
      "Used route groups and separate root layouts to split the site into two clear experiences while keeping the deployment model simple.",
    stack: ["App Router", "Route Groups", "Multiple Root Layouts", "Static Export"],
    href: "/portfolio/resume",
    linkLabel: "Open the resume page",
    notes: [
      "Separated language and information architecture between the blog and job-search experience.",
      "Kept the blog routes stable while introducing a fully English portfolio section.",
    ],
  },
  {
    title: "Markdown Publishing Pipeline",
    summary:
      "A compact content system that turns markdown files into styled article pages with frontmatter, reading time, and rich HTML output.",
    impact:
      "Made publishing low-friction by storing posts in simple files and rendering them during build time.",
    stack: ["gray-matter", "remark", "remark-gfm", "remark-html"],
    href: "/posts",
    linkLabel: "See the article archive",
    notes: [
      "Reads frontmatter metadata directly from content files.",
      "Keeps content portable and reviewable without a CMS.",
    ],
  },
];
