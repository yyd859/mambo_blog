"use client";

import { useSyncExternalStore } from "react";

interface ThemeToggleProps {
  ariaLabel: string;
}

const THEME_EVENT = "mb-theme-change";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener(THEME_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(THEME_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") {
    return "light";
  }

  return localStorage.getItem("mb.theme") || document.documentElement.dataset.theme || "light";
}

function getServerSnapshot() {
  return "light";
}

export function ThemeToggle({ ariaLabel }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("mb.theme", next);
    document.documentElement.dataset.theme = next;
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button className="bar__icon" onClick={toggleTheme} aria-label={ariaLabel}>
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
  );
}
