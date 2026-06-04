import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mambo blog",
  description: "Tech blog — thinking and understanding cannot be replaced",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1.5rem" }}>
          <header style={{ padding: "2.5rem 0 2rem", borderBottom: "1px solid var(--border)" }}>
            <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <Link
                href="/"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  textDecoration: "none",
                  color: "var(--fg)",
                  letterSpacing: "-0.02em",
                }}
              >
                Mambo blog
              </Link>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "baseline" }}>
                <Link href="/posts" style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.9rem", fontFamily: "system-ui, sans-serif" }}>
                  文章 / Posts
                </Link>
                <Link href="/about" style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.9rem", fontFamily: "system-ui, sans-serif" }}>
                  关于 / About
                </Link>
              </div>
            </nav>
          </header>
          <main style={{ padding: "2.5rem 0" }}>
            {children}
          </main>
          <footer style={{ padding: "1.5rem 0", borderTop: "1px solid var(--border)", textAlign: "center" }}>
            <p style={{ color: "var(--muted)", fontSize: "0.8rem", fontFamily: "system-ui, sans-serif", margin: 0 }}>
              thinking and understanding cannot be replaced
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
