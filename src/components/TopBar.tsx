"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export function TopBar() {
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

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
        <Link href="/portfolio" className="bar__link">
          Portfolio
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
      <ThemeToggle ariaLabel="切换深色模式" />
    </header>
  );
}
