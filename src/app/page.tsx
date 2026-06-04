import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div>
      <section style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "system-ui, sans-serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
          你好
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "52ch", lineHeight: 1.7 }}>
          这里是我的技术博客。记录编程、系统设计、以及思考过程。
          文字由人写就，思考不可替代。
        </p>
      </section>

      <section>
        <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem" }}>
          最近文章
        </h2>
        {posts.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>还没有文章，敬请期待。</p>
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
                  <span style={{ color: "var(--muted)", fontSize: "0.8rem", fontFamily: "system-ui, sans-serif", whiteSpace: "nowrap" }}>
                    {post.date}
                  </span>
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
            所有文章 →
          </Link>
        )}
      </section>
    </div>
  );
}
