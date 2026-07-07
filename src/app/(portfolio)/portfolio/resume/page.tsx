import Link from "next/link";
import {
  portfolioProfile,
  portfolioProjects,
  portfolioStrengths,
  resumeTemplates,
} from "@/lib/portfolio";

export const metadata = {
  title: "Resume",
  description: "Online resume page for Yingdong Yang.",
};

export default function ResumePage() {
  return (
    <div className="page page--portfolio">
      <div className="portfolio-shell">
        <header className="portfolio-header">
          <p className="portfolio-kicker">ONLINE RESUME</p>
          <h1 className="portfolio-title portfolio-title--compact">Resume</h1>
          <p className="portfolio-summary">
            This page is fully in English and structured as a clean, editable resume surface. Swap
            in your role history, metrics, and education details without changing the layout.
          </p>
        </header>

        <p className="portfolio-note">
          Current contact details are filled in. Experience and education blocks are ready for your
          own specifics.
        </p>

        <div className="portfolio-resume">
          <div className="portfolio-column">
            <section className="portfolio-block">
              <p className="portfolio-kicker">PROFILE</p>
              <h2>{portfolioProfile.name}</h2>
              <p className="portfolio-summary portfolio-summary--compact">
                {portfolioProfile.role}. I enjoy building clear interfaces, editing information
                architecture, and making content-heavy products feel calmer and easier to use.
              </p>
            </section>

            <section className="portfolio-block">
              <p className="portfolio-kicker">EXPERIENCE TEMPLATE</p>
              <div className="portfolio-timeline">
                {resumeTemplates.experience.map((entry) => (
                  <article key={entry.title} className="portfolio-entry">
                    <div className="portfolio-entry__head">
                      <h3>{entry.title}</h3>
                      <span>{entry.period}</span>
                    </div>
                    <ul className="portfolio-list">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="portfolio-block">
              <p className="portfolio-kicker">EDUCATION TEMPLATE</p>
              <ul className="portfolio-list">
                {resumeTemplates.education.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="portfolio-sidebar">
            <section className="portfolio-block">
              <p className="portfolio-kicker">CONTACT</p>
              <ul className="portfolio-list portfolio-list--tight">
                <li>{portfolioProfile.location}</li>
                <li>
                  <a href={`mailto:${portfolioProfile.email}`}>{portfolioProfile.email}</a>
                </li>
                <li>
                  <a
                    href={portfolioProfile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </section>

            <section className="portfolio-block">
              <p className="portfolio-kicker">CORE STRENGTHS</p>
              <ul className="portfolio-list portfolio-list--tight">
                {portfolioStrengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="portfolio-block">
              <p className="portfolio-kicker">SELECTED PROJECTS</p>
              <ul className="portfolio-list portfolio-list--tight">
                {portfolioProjects.map((project) => (
                  <li key={project.title}>
                    <Link href={project.href}>{project.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
