import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 style={{ fontFamily: "system-ui, sans-serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
        所有文章
      </h1>
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
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                {post.summary && (
                  <p style={{ color: "var(--muted)", fontSize: "0.875rem", margin: 0, lineHeight: 1.6, flex: 1 }}>
                    {post.summary}
                  </p>
                )}
                <span style={{ color: "var(--muted)", fontSize: "0.75rem", fontFamily: "system-ui, sans-serif", whiteSpace: "nowrap" }}>
                  {post.readingTime}
                </span>
              </div>
              {post.tags.length > 0 && (
                <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {post.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: "0.75rem", fontFamily: "system-ui, sans-serif", color: "var(--muted)", background: "#f0f0ee", padding: "0.1em 0.5em", borderRadius: "3px" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
