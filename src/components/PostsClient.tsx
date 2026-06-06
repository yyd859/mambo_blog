"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface Props {
  posts: PostMeta[];
  allTags: string[];
}

export function PostsClient({ posts, allTags }: Props) {
  const [activeTag, setActiveTag] = useState("全部");
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) setQuery(q);
    } catch {}
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const okTag = activeTag === "全部" || p.tags.includes(activeTag);
      const okQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return okTag && okQ;
    });
  }, [posts, activeTag, query]);

  return (
    <div className="page">
      <div className="wrap">
        <header className="mast" style={{ paddingBottom: 0 }}>
          <h1 className="mast__title" style={{ fontSize: "clamp(30px,4vw,42px)" }}>
            所有文章
          </h1>
        </header>

        <div className="toolrow" style={{ marginTop: 24 }}>
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

        {query && (
          <p
            style={{
              textAlign: "center",
              fontFamily: "var(--mono)",
              fontSize: 13,
              color: "var(--ink-faint)",
              margin: "12px 0 0",
            }}
          >
            搜索："{query}"
            <button
              onClick={() => setQuery("")}
              style={{
                background: "none",
                border: 0,
                cursor: "pointer",
                color: "var(--accent)",
                marginLeft: 8,
                fontFamily: "var(--mono)",
                fontSize: 13,
              }}
            >
              清除
            </button>
          </p>
        )}

        <div className="list">
          {filtered.length === 0 ? (
            <p className="empty">没有找到相关文章 —— 换个词或标签试试。</p>
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
