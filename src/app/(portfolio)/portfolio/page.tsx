import Link from "next/link";
import {
  portfolioProfile,
  portfolioProjects,
  portfolioStrengths,
} from "@/lib/portfolio";

export const metadata = {
  title: "Portfolio",
  description: "Overview of resume, projects, and contact details for Yingdong Yang.",
};

export default function PortfolioPage() {
  return (
    <div className="page page--portfolio">
      <div className="portfolio-shell">
        <section className="portfolio-hero">
          <div>
            <p className="portfolio-kicker">ENGLISH PORTFOLIO</p>
            <h1 className="portfolio-title">
              Thoughtful web experiences, content systems, and product-minded execution.
            </h1>
            <p className="portfolio-summary">{portfolioProfile.summary}</p>
            <div className="portfolio-actions">
              <Link href="/portfolio/resume" className="portfolio-button">
                View resume
              </Link>
              <Link
                href="/portfolio/projects"
                className="portfolio-button portfolio-button--ghost"
              >
                Browse projects
              </Link>
            </div>
          </div>

          <aside className="portfolio-panel">
            <p className="portfolio-panel__eyebrow">Quick snapshot</p>
            <div className="portfolio-facts">
              <div>
                <span>Name</span>
                <strong>{portfolioProfile.name}</strong>
              </div>
              <div>
                <span>Focus</span>
                <strong>{portfolioProfile.role}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>{portfolioProfile.location}</strong>
              </div>
              <div>
                <span>Contact</span>
                <strong>{portfolioProfile.email}</strong>
              </div>
            </div>
          </aside>
        </section>

        <section className="portfolio-section">
          <div className="portfolio-section__head">
            <p className="portfolio-kicker">SELECTED WORK</p>
            <h2>Projects shaped around writing, frontend craft, and simple publishing systems.</h2>
          </div>

          <div className="portfolio-grid">
            {portfolioProjects.map((project) => (
              <article key={project.title} className="portfolio-card">
                <p className="portfolio-card__eyebrow">Case study</p>
                <h3 className="portfolio-card__title">{project.title}</h3>
                <p className="portfolio-card__summary">{project.summary}</p>
                <p className="portfolio-card__impact">{project.impact}</p>
                <div className="portfolio-chiprow">
                  {project.stack.map((item) => (
                    <span key={item} className="portfolio-chip">
                      {item}
                    </span>
                  ))}
                </div>
                <Link href={project.href} className="portfolio-link">
                  {project.linkLabel}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-section portfolio-section--split">
          <div className="portfolio-block">
            <p className="portfolio-kicker">STRENGTHS</p>
            <h2>How I like to work</h2>
            <ul className="portfolio-list">
              {portfolioStrengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="portfolio-block">
            <p className="portfolio-kicker">CONTACT</p>
            <h2>Easy next steps</h2>
            <p className="portfolio-summary portfolio-summary--compact">
              The portfolio is intentionally lightweight: a short overview, an online resume, and
              selected projects. It is ready for you to swap in more detailed role history and
              project evidence as you refine your job-search story.
            </p>
            <div className="portfolio-actions portfolio-actions--stacked">
              <a className="portfolio-button" href={`mailto:${portfolioProfile.email}`}>
                Email me
              </a>
              <a
                className="portfolio-button portfolio-button--ghost"
                href={portfolioProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn profile
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
