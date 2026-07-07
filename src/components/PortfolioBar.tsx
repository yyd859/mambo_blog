"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export function PortfolioBar() {
  const pathname = usePathname();
  const isOverviewActive = pathname === "/portfolio";
  const isResumeActive = pathname === "/portfolio/resume";
  const isProjectsActive = pathname === "/portfolio/projects";

  return (
    <header className="bar bar--portfolio">
      <Link href="/portfolio" className="bar__brand">
        <span className="mark">Y</span>
        Yingdong Yang · Portfolio
      </Link>
      <nav className="bar__nav">
        <Link
          href="/portfolio"
          className={`bar__link${isOverviewActive ? " is-active" : ""}`}
        >
          Overview
        </Link>
        <Link
          href="/portfolio/resume"
          className={`bar__link${isResumeActive ? " is-active" : ""}`}
        >
          Resume
        </Link>
        <Link
          href="/portfolio/projects"
          className={`bar__link${isProjectsActive ? " is-active" : ""}`}
        >
          Projects
        </Link>
        <Link href="/" className="bar__link">
          Blog
        </Link>
      </nav>
      <div className="bar__spacer" />
      <a className="bar__pill" href="mailto:yingdongyang0305@gmail.com">
        Email
      </a>
      <ThemeToggle ariaLabel="Toggle color theme" />
    </header>
  );
}
