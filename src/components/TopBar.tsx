"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function TopBar() {
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("mb.theme") || "light";
    setTheme(saved);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("mb.theme", next);
    document.documentElement.dataset.theme = next;
  }, [theme]);

  const handleSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && query.trim()) {
        router.push(`/posts?q=${encodeURIComponent(query.trim())}`);
        setQuery("");
      }
    },
    [query, router]
  );

  const isPostsActive =
    pathname === "/posts" || pathname.startsWith("/posts/");
  const isAboutActive = pathname === "/about";

  return (
    <header className="bar">
      <Link href="/" className="bar__brand">
        <span className="mark">M</span>
        Mambo · blog
      </Link>
      <nav className="bar__nav">
        <Link
          href="/posts"
          className={`bar__link${isPostsActive ? " is-active" : ""}`}
        >
          文章
        </Link>
        <Link
          href="/about"
          className={`bar__link${isAboutActive ? " is-active" : ""}`}
        >
          关于
        </Link>
      </nav>
      <div className="bar__spacer" />
      <div className="search">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M15 15l-3-3" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder="搜索文章…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          aria-label="搜索文章"
        />
      </div>
      <button className="bar__icon" onClick={toggleTheme} aria-label="切换深色模式">
        {theme === "dark" ? (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="10" cy="10" r="4" />
            <path
              d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path
              d="M17 11.5A7 7 0 0 1 8.5 3c0 0-4.5 1-4.5 7a7 7 0 0 0 7 7c3.5 0 5.5-2 5.5-2a7 7 0 0 1-1.5-3.5z"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </header>
  );
}
