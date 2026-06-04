import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div>
      <section style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "system-ui, sans-serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
          你好 / Hello
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "52ch", lineHeight: 1.7, marginBottom: "0.5rem" }}>
          这里是我的技术博客。记录编程、系统设计以及思考过程。
        </p>
        <p style={{ color: "var(--muted)", maxWidth: "52ch", lineHeight: 1.7 }}>
          A tech blog where I write about programming, system design, and thinking.
          Posts appear in Chinese or English — sometimes both.
        </p>
      </section>

      <section>
        <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem" }}>
          最近文章 / Recent Posts
        </h2>
        {posts.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>还没有文章，敬请期待。/ No posts yet, stay tuned.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {posts.map((post) => (
              <li key={post.slug} style={{ paddingBottom: "1.5rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", marginBottom: "0.4rem" }}>
                  <Link
                    href={`/posts/${post.slug}`}
                    style={{ fontFamily: "system-ui, sans-serif", fontWeight: 600, fontSize: "1rem", textDecoration: "none", color: "var(--fg)" }}
                  >
                    {post.title}
                  </Link>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexShrink: 0 }}>
                    <span style={{
                      fontSize: "0.7rem",
                      fontFamily: "system-ui, sans-serif",
                      color: "var(--muted)",
                      background: "#f0f0ee",
                      padding: "0.1em 0.45em",
                      borderRadius: "3px",
                    }}>
                      {post.lang === "en" ? "EN" : "中"}
                    </span>
                    <span style={{ color: "var(--muted)", fontSize: "0.8rem", fontFamily: "system-ui, sans-serif" }}>
                      {post.date}
                    </span>
                  </div>
                </div>
                {post.summary && (
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem", margin: 0, lineHeight: 1.6 }}>
                    {post.summary}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
        {posts.length > 0 && (
          <Link
            href="/posts"
            style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.85rem", color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            所有文章 / All posts →
          </Link>
        )}
      </section>
    </div>
  );
}
