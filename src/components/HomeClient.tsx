"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface Props {
  posts: PostMeta[];
  allTags: string[];
}

export function HomeClient({ posts, allTags }: Props) {
  const [activeTag, setActiveTag] = useState("全部");

  const filtered = useMemo(() => {
    if (activeTag === "全部") return posts;
    return posts.filter((p) => p.tags.includes(activeTag));
  }, [posts, activeTag]);

  return (
    <div className="page">
      <div className="wrap">
        <header className="mast">
          <div className="mast__kicker">Mambo · 博客 · EST. 2024</div>
          <h1 className="mast__title">
            记录身边有趣的，<br />值得学习的地方。
          </h1>
          <p className="mast__sub">
            技术、设计、读书，和那些
            <span className="hand">本以为理所当然</span>
            、后来发现值得深究的事。
          </p>
        </header>

        <div className="toolrow">
          {["全部", ...allTags].map((tag) => (
            <button
              key={tag}
              className={`tag${activeTag === tag ? " is-active" : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="list">
          {filtered.length === 0 ? (
            <p className="empty">没有找到相关文章 —— 换个标签试试。</p>
          ) : (
            filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="post"
                style={{ display: "block" }}
              >
                <span className="post__date">{post.date}</span>
                <p className="post__title">{post.title}</p>
                {post.summary && (
                  <p className="post__sum">{post.summary}</p>
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
