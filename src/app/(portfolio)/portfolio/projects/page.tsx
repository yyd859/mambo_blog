import Link from "next/link";
import { portfolioProjects } from "@/lib/portfolio";

export const metadata = {
  title: "Projects",
  description: "Selected projects for Yingdong Yang.",
};

export default function ProjectsPage() {
  return (
    <div className="page page--portfolio">
      <div className="portfolio-shell">
        <header className="portfolio-header">
          <p className="portfolio-kicker">SELECTED PROJECTS</p>
          <h1 className="portfolio-title portfolio-title--compact">Projects</h1>
          <p className="portfolio-summary">
            A compact set of case-study style summaries built from the work currently visible in
            this repository. It gives the portfolio immediate substance while staying honest about
            what is already implemented.
          </p>
        </header>

        <div className="portfolio-projects">
          {portfolioProjects.map((project) => (
            <article key={project.title} className="portfolio-card portfolio-card--wide">
              <div className="portfolio-card__header">
                <div>
                  <p className="portfolio-card__eyebrow">Project</p>
                  <h2 className="portfolio-card__title">{project.title}</h2>
                </div>
                <Link href={project.href} className="portfolio-link">
                  {project.linkLabel}
                </Link>
              </div>
              <p className="portfolio-card__summary">{project.summary}</p>
              <p className="portfolio-card__impact">{project.impact}</p>
              <ul className="portfolio-list portfolio-list--tight">
                {project.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              <div className="portfolio-chiprow">
                {project.stack.map((item) => (
                  <span key={item} className="portfolio-chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
