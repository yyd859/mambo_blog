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
          这里是我的博客, Mambo是我的小猫的名字。这个博客记录一切我身边有趣的，值得学习的地方，包括技术、设计、读书，思考方式等等。希望你也能在这里找到有价值的内容，和我一起成长。
        </p>
        <p style={{ color: "var(--muted)", maxWidth: "52ch", lineHeight: 1.7 }}>
          A blog where I write about everything interesting and worth learning around me, including technology, design, reading, and thinking methods. I hope you can find valuable content here and grow with me.
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
