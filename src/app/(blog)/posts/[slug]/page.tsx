import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPost } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Mambo blog`, description: post.summary };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="page">
      <article className="read">
        <Link href="/posts" className="read__back">
          ← 返回文章列表
        </Link>

        <header className="read__head">
          <div className="read__meta">
            <span>{post.date}</span>
            <span className="read__dot" />
            <span>{post.readingTime}</span>
            {post.tags.length > 0 && (
              <>
                <span className="read__dot" />
                <span>{post.tags[0]}</span>
              </>
            )}
            <span className="read__dot" />
            <span>{post.lang === "en" ? "EN" : "中文"}</span>
          </div>
          <h1 className="read__title">{post.title}</h1>
          {post.summary && <p className="read__lede">{post.summary}</p>}
        </header>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

        {post.tags.length > 0 && (
          <footer className="read__foot">
            <div className="read__tags">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/posts?q=${encodeURIComponent(tag)}`}
                  className="tag--mini"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </footer>
        )}
      </article>
    </div>
  );
}
