import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPost } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — mambo blog`, description: post.summary };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <header style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontFamily: "system-ui, sans-serif", fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
          {post.title}
        </h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span style={{ color: "var(--muted)", fontSize: "0.85rem", fontFamily: "system-ui, sans-serif" }}>
            {post.date}
          </span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span style={{ color: "var(--muted)", fontSize: "0.85rem", fontFamily: "system-ui, sans-serif" }}>
            {post.readingTime}
          </span>
        </div>
        {post.tags.length > 0 && (
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{ fontSize: "0.75rem", fontFamily: "system-ui, sans-serif", color: "var(--muted)", background: "#f0f0ee", padding: "0.1em 0.5em", borderRadius: "3px" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose">
        <MDXRemote source={post.content} />
      </div>

      <footer style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
        <Link
          href="/posts"
          style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.85rem", color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: "3px" }}
        >
          ← 所有文章
        </Link>
      </footer>
    </article>
  );
}
